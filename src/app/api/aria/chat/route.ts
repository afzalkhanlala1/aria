import OpenAI from "openai";
import { ARIA_SYSTEM_PROMPT, ARIA_WRAP_UP_INSTRUCTION } from "@/lib/aria-prompt";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Hard ceiling enforced server-side. After this many *user* turns we refuse
 * to call OpenAI at all — the demo is over.
 */
const HARD_LIMIT = 30;

/**
 * Once user turns reach this number we append an instruction telling Aria to
 * gracefully wrap up. The model usually does so within 1–2 replies.
 */
const WRAP_LIMIT = 20;

/** Per-IP rate limit (covers all sessions from one IP). */
const IP_WINDOW_MS = 60_000;
const IP_MAX_REQUESTS = 30;

/** Max chars we accept in a single user message — protects against absurd inputs. */
const MAX_USER_MESSAGE_CHARS = 800;

/** Trim history sent to OpenAI to the most recent N messages for cost control. */
const HISTORY_WINDOW = 24;

type ChatRole = "user" | "assistant";
type IncomingMessage = { role: ChatRole; content: string };

type SuccessResponse = {
  message: string;
  turn: number;
  status: "active" | "wrapping" | "ended";
};

type ErrorResponse = {
  error: string;
  detail?: string;
};

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request): Promise<Response> {
  if (!client) {
    return json<ErrorResponse>(
      {
        error: "missing_api_key",
        detail:
          "Set OPENAI_API_KEY in aria/.env.local (see .env.local.example) and restart `npm run dev`.",
      },
      500,
    );
  }

  const ip = getClientIp(req);
  const limit = rateLimit("chat-ip", ip, { windowMs: IP_WINDOW_MS, max: IP_MAX_REQUESTS });
  if (!limit.allowed) {
    return json<ErrorResponse>(
      { error: "rate_limited", detail: `Try again in ${limit.retryAfter}s.` },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json<ErrorResponse>({ error: "bad_json" }, 400);
  }

  if (!body || typeof body !== "object") {
    return json<ErrorResponse>({ error: "bad_body" }, 400);
  }

  const { sessionId, messages } = body as {
    sessionId?: unknown;
    messages?: unknown;
  };

  if (typeof sessionId !== "string" || !/^[a-zA-Z0-9_-]{8,64}$/.test(sessionId)) {
    return json<ErrorResponse>({ error: "bad_session" }, 400);
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return json<ErrorResponse>({ error: "no_messages" }, 400);
  }

  const sanitized: IncomingMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    if (trimmed.length > MAX_USER_MESSAGE_CHARS) {
      return json<ErrorResponse>(
        { error: "message_too_long", detail: `Keep each message under ${MAX_USER_MESSAGE_CHARS} characters.` },
        400,
      );
    }
    sanitized.push({ role, content: trimmed });
  }

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== "user") {
    return json<ErrorResponse>({ error: "last_message_must_be_user" }, 400);
  }

  const userTurnCount = sanitized.filter((m) => m.role === "user").length;

  // Hard backend cutoff: do not even call OpenAI.
  if (userTurnCount > HARD_LIMIT) {
    return json<SuccessResponse>({
      message:
        "We've hit the limit of this demo conversation. Refresh this page to start a fresh one — or book a free revenue audit at /audit and I'll show you the real thing customized to your clinic.",
      turn: userTurnCount,
      status: "ended",
    });
  }

  const isWrappingUp = userTurnCount >= WRAP_LIMIT;
  const systemPrompt = isWrappingUp
    ? ARIA_SYSTEM_PROMPT + ARIA_WRAP_UP_INSTRUCTION
    : ARIA_SYSTEM_PROMPT;

  const trimmedHistory = sanitized.slice(-HISTORY_WINDOW);

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 240,
      messages: [
        { role: "system", content: systemPrompt },
        ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return json<ErrorResponse>({ error: "empty_reply" }, 502);
    }

    const status: SuccessResponse["status"] =
      userTurnCount >= HARD_LIMIT ? "ended" : isWrappingUp ? "wrapping" : "active";

    return json<SuccessResponse>({ message: reply, turn: userTurnCount, status });
  } catch (err) {
    console.error("[/api/aria/chat] OpenAI error", err);
    const detail = err instanceof Error ? err.message : "unknown";
    return json<ErrorResponse>({ error: "openai_error", detail }, 502);
  }
}

function json<T>(data: T, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}
