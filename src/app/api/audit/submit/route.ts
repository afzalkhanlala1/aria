import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { resend, FROM, LEAD_INBOX, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3; // 3 submissions per minute per IP — anything more is a bot

type Payload = {
  name?: string;
  clinic?: string;
  email?: string;
  phone?: string;
  website?: string;
};

export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req);
  const limit = rateLimit("audit-submit-ip", ip, {
    windowMs: RATE_WINDOW_MS,
    max: RATE_MAX,
  });
  if (!limit.allowed) {
    return json(
      { error: "rate_limited", detail: `Try again in ${limit.retryAfter}s.` },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  const required = ["name", "clinic", "email", "phone", "website"] as const;
  const cleaned: Required<Payload> = { name: "", clinic: "", email: "", phone: "", website: "" };
  for (const k of required) {
    const v = (body[k] ?? "").toString().trim();
    if (!v || v.length > 200) {
      return json({ error: "bad_input", field: k }, 400);
    }
    cleaned[k] = v;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
    return json({ error: "bad_email" }, 400);
  }

  // Always log so leads aren't lost even if Resend isn't configured yet.
  console.info("[audit] new lead", {
    name: cleaned.name,
    clinic: cleaned.clinic,
    email: cleaned.email,
    phone: cleaned.phone,
    website: cleaned.website,
    ts: new Date().toISOString(),
    ip,
  });

  if (!resend) {
    // Soft success: lead is captured in server logs, but the founder needs to
    // set RESEND_API_KEY to start getting email notifications.
    return json({
      ok: true,
      delivered: false,
      detail:
        "Lead captured in logs. Set RESEND_API_KEY in aria/.env.local to enable email notifications.",
    });
  }

  try {
    const subject = `New Aria audit request — ${cleaned.clinic}`;
    const founderHtml = founderEmailHtml(cleaned, ip);
    const visitorHtml = visitorEmailHtml(cleaned);

    const [founderRes, visitorRes] = await Promise.allSettled([
      resend.emails.send({
        from: FROM,
        to: LEAD_INBOX,
        replyTo: cleaned.email,
        subject,
        html: founderHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: cleaned.email,
        subject: "We received your Aria audit request",
        html: visitorHtml,
      }),
    ]);

    const founderOk = founderRes.status === "fulfilled" && !founderRes.value.error;
    return json({
      ok: founderOk,
      delivered: founderOk,
      visitorEmail: visitorRes.status === "fulfilled" && !visitorRes.value.error,
    });
  } catch (err) {
    console.error("[audit] resend error", err);
    return json(
      {
        ok: true,
        delivered: false,
        detail: "Lead captured but email delivery failed. We'll still reach out.",
      },
      200,
    );
  }
}

function founderEmailHtml(d: Required<Payload>, ip: string): string {
  const ts = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
  return `<!doctype html><html><body style="font-family: -apple-system, system-ui, sans-serif; color: #14110e; padding: 24px;">
    <h2 style="margin:0 0 4px;font-family:Georgia,serif;color:#b1431c;">New audit request</h2>
    <p style="color:#837b6f;margin:0 0 20px;font-size:13px;">${escapeHtml(ts)} · ${escapeHtml(ip)}</p>
    <table cellpadding="6" style="border-collapse:collapse;font-size:15px;">
      <tr><td style="color:#837b6f;width:120px;">Name</td><td>${escapeHtml(d.name)}</td></tr>
      <tr><td style="color:#837b6f;">Clinic</td><td><strong>${escapeHtml(d.clinic)}</strong></td></tr>
      <tr><td style="color:#837b6f;">Email</td><td><a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></td></tr>
      <tr><td style="color:#837b6f;">Phone</td><td><a href="tel:${escapeHtml(d.phone)}">${escapeHtml(d.phone)}</a></td></tr>
      <tr><td style="color:#837b6f;">Website</td><td>${escapeHtml(d.website)}</td></tr>
    </table>
    <p style="color:#837b6f;font-size:13px;margin-top:20px;">Reply to this email to reach ${escapeHtml(d.name)} directly.</p>
  </body></html>`;
}

function visitorEmailHtml(d: Required<Payload>): string {
  return `<!doctype html><html><body style="font-family: -apple-system, system-ui, sans-serif; color: #14110e; padding: 24px; max-width: 560px; margin: 0 auto;">
    <h2 style="font-family:Georgia,serif;color:#14110e;margin:0 0 12px;">Got it, ${escapeHtml(d.name.split(" ")[0])} — your audit is queued.</h2>
    <p style="font-size:16px;line-height:1.5;color:#45403a;">
      We'll call <strong>${escapeHtml(d.clinic)}</strong> three times over the next business day —
      during business hours, at lunch, and after 6pm — and put together a 4-minute Loom walkthrough showing what happened,
      a dollar estimate of what those missed calls cost, and a custom Aria demo built on your real menu.
    </p>
    <p style="font-size:16px;line-height:1.5;color:#45403a;">Expect it in your inbox within one business day.</p>
    <p style="font-size:14px;line-height:1.5;color:#837b6f;margin-top:24px;">
      Any questions in the meantime, just reply to this email or text <strong>+1 (816) 859-9999</strong>.
    </p>
    <p style="font-size:14px;color:#837b6f;margin-top:32px;">— Aria · <span style="color:#b1431c;">●</span> live in TX · FL · AZ · NV · SoCal · NY/NJ</p>
  </body></html>`;
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
