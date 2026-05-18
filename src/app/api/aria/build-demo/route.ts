import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { scrapeClinicSite } from "@/lib/scrape";
import { extractClinicProfile, buildSystemPromptForClinic } from "@/lib/clinic-profile";
import { newDemoId, putDemo } from "@/lib/demo-store";

export const runtime = "nodejs";

const BUILD_WINDOW_MS = 60_000;
const BUILD_MAX = 5; // 5 builds per minute per IP

export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req);
  const limit = rateLimit("build-demo-ip", ip, {
    windowMs: BUILD_WINDOW_MS,
    max: BUILD_MAX,
  });
  if (!limit.allowed) {
    return json(
      {
        error: "rate_limited",
        detail: `Too many demo builds — try again in ${limit.retryAfter}s.`,
      },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(
      {
        error: "missing_api_key",
        detail:
          "Set OPENAI_API_KEY in aria/.env.local (see .env.local.example) and restart the dev server.",
      },
      500,
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "bad_body" }, 400);
  const url = (body as { url?: unknown }).url;
  if (typeof url !== "string" || url.length < 6) {
    return json({ error: "bad_url" }, 400);
  }

  const scrape = await scrapeClinicSite(url);
  if (!scrape.ok) {
    return json({ error: "scrape_failed", detail: scrape.reason }, 422);
  }

  const profileOrError = await extractClinicProfile(scrape.url, scrape.combinedText);
  if ("error" in profileOrError) {
    return json({ error: "extraction_failed", detail: profileOrError.error }, 502);
  }

  const profile = profileOrError;
  const systemPrompt = buildSystemPromptForClinic(profile);
  const demoId = newDemoId();
  putDemo({ demoId, profile, systemPrompt, createdAt: Date.now() });

  return json({
    demoId,
    profile: {
      brandName: profile.brandName,
      industry: profile.industry,
      city: profile.city,
      state: profile.state,
      services: profile.services.length,
      providers: profile.providers.length,
      website: profile.website,
    },
  });
}

function json(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extra,
    },
  });
}
