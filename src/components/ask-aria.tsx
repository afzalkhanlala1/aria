"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Msg = { who: "you" | "aria" | "system"; text: string; tag?: string };

type ChatStatus = "active" | "wrapping" | "ended";

const GREETING: Msg = {
  who: "aria",
  text:
    "Hi! I'm Aria — Luxe Aesthetics' AI front desk. Ask me anything a real patient would: pricing, booking, after-hours, even a tough question. I'll respond exactly the way I would on a live call.",
};

const QUICK = [
  "How much is Botox?",
  "Do you have anything tonight?",
  "Is this AI? I want a human.",
  "Can you book me Friday at 4pm?",
  "I missed my appointment yesterday",
  "Do you take CareCredit?",
  "What's your address?",
];

const SOFT_LIMIT = 20;
const HARD_LIMIT = 30;
const SESSION_STORAGE_KEY = "aria-sandbox-session";

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function AskAria() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [status, setStatus] = useState<ChatStatus>("active");
  const [turn, setTurn] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let id = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = generateSessionId();
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    sessionRef.current = id;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const reset = useCallback(() => {
    const id = generateSessionId();
    sessionRef.current = id;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    setMessages([GREETING]);
    setStatus("active");
    setTurn(0);
    setError(null);
    setTyping(false);
    setInput("");
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing || status === "ended") return;

      setError(null);
      const userMsg: Msg = { who: "you", text: trimmed };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setTyping(true);

      const apiMessages = nextMessages
        .filter((m) => m.who === "you" || m.who === "aria")
        .map((m) => ({
          role: (m.who === "you" ? "user" : "assistant") as "user" | "assistant",
          content: m.text,
        }));

      // Drop the very first greeting from history since it's assistant-led with no prior user turn;
      // OpenAI will still accept it, but trimming keeps the prompt clean.
      if (apiMessages.length > 0 && apiMessages[0].role === "assistant") {
        apiMessages.shift();
      }

      try {
        const res = await fetch("/api/aria/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionRef.current,
            messages: apiMessages,
          }),
        });

        const data = (await res.json()) as
          | { message: string; turn: number; status: ChatStatus }
          | { error: string; detail?: string };

        if (!res.ok || "error" in data) {
          const detail =
            "detail" in data && data.detail ? data.detail : `Request failed (${res.status}).`;
          const friendly =
            res.status === 429
              ? "Slow down — you're sending messages too quickly. Try again in a moment."
              : "error" in data && data.error === "missing_api_key"
                ? "The site owner hasn't set OPENAI_API_KEY yet. See aria/.env.local.example."
                : detail;
          setError(friendly);
          setMessages((prev) => [
            ...prev,
            {
              who: "system",
              text: friendly,
            },
          ]);
          return;
        }

        setMessages((prev) => [
          ...prev,
          {
            who: "aria",
            text: data.message,
            tag: data.status === "wrapping" ? "Wrapping up" : undefined,
          },
        ]);
        setStatus(data.status);
        setTurn(data.turn);
      } catch (err) {
        const detail = err instanceof Error ? err.message : "Network error.";
        setError(detail);
        setMessages((prev) => [
          ...prev,
          { who: "system", text: `Couldn't reach Aria — ${detail}` },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [messages, status, typing],
  );

  const turnsRemaining = Math.max(0, HARD_LIMIT - turn);
  const inputDisabled = typing || status === "ended";

  const counterColor = useMemo(() => {
    if (status === "ended") return "text-danger";
    if (status === "wrapping" || turn >= SOFT_LIMIT - 2) return "text-rose";
    return "text-ink-faint";
  }, [status, turn]);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      <div>
        <span className="eyebrow">Ask Aria — try her live</span>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Stop watching scripts.{" "}
          <em className="italic text-emerald">Talk to her.</em>
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          This is a sandbox of the same logic running for clinics — trained on a sample Luxe
          Aesthetics knowledge base. Ask anything a real patient would. Stress-test her.
        </p>

        <div className="mt-6">
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
            Quick prompts
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {QUICK.map((q) => (
              <li key={q}>
                <button
                  onClick={() => send(q)}
                  disabled={inputDisabled}
                  className="rounded-full border border-line bg-bg-elev/60 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-emerald hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-line bg-bg-soft/40 p-4 text-xs text-ink-soft">
          <strong className="text-ink">Note:</strong> this is a public sandbox with no scheduler
          attached — and conversations are capped at {HARD_LIMIT} turns to keep the demo affordable.
          In your deployment Aria reads live availability and books in-call.
        </div>
      </div>

      <div className="card overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(13,15,14,0.35)]">
        <div className="flex items-center justify-between border-b border-line bg-bg-soft/60 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-accent-bg font-serif text-accent-fg">
              A
            </div>
            <div>
              <div className="text-sm font-medium">Aria · Luxe Aesthetics</div>
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                Sandbox · live · gpt
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-[0.65rem] uppercase tracking-widest ${counterColor}`}>
              {status === "ended" ? "Demo ended" : `${turnsRemaining} turns left`}
            </span>
            <button
              onClick={reset}
              className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint hover:text-ink"
            >
              Reset
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex h-[480px] flex-col gap-3 overflow-y-auto px-4 py-4 sm:px-5"
        >
          {messages.map((m, i) => (
            <Bubble key={i} msg={m} />
          ))}
          {typing && <Typing />}
        </div>

        {status === "ended" ? (
          <div className="flex flex-col items-start gap-2 border-t border-line bg-bg-soft/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-soft">
              Demo limit reached ({HARD_LIMIT} turns). Want the real thing for your clinic?
            </p>
            <button
              onClick={reset}
              className="btn-ghost text-xs"
            >
              Start over
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-bg-soft/40 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                status === "wrapping"
                  ? "Aria's about to wrap up — last few replies…"
                  : "Ask anything…"
              }
              disabled={inputDisabled}
              maxLength={800}
              className="flex-1 rounded-full border border-line bg-bg-elev/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-emerald disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={inputDisabled || !input.trim()}
              className="grid size-10 place-items-center rounded-full bg-ink text-bg transition-transform hover:translate-x-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8 L14 8 M9 3 L14 8 L9 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        )}
        {error && status !== "ended" && (
          <div className="border-t border-line bg-danger/10 px-4 py-2 text-xs text-danger">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.who === "system") {
    return (
      <div className="flex justify-center">
        <div className="rounded-full border border-dashed border-line bg-bg-soft/60 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
          {msg.text}
        </div>
      </div>
    );
  }

  const isAria = msg.who === "aria";
  return (
    <div className={`rise flex flex-col ${isAria ? "items-start" : "items-end"}`}>
      <div
        className={[
          "max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[0.92rem] leading-relaxed",
          isAria
            ? "bg-bg-soft/70 text-ink border border-line"
            : "bg-accent-bg text-accent-fg",
        ].join(" ")}
      >
        {msg.text}
      </div>
      {msg.tag && (
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-soft px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-emerald">
          <span className="size-1 rounded-full bg-emerald" /> {msg.tag}
        </span>
      )}
    </div>
  );
}

function Typing() {
  return (
    <div className="flex">
      <div className="rounded-2xl border border-line bg-bg-soft/70 px-3.5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot size-1.5 rounded-full bg-ink-soft" style={{ animationDelay: "0s" }} />
          <span className="typing-dot size-1.5 rounded-full bg-ink-soft" style={{ animationDelay: "0.2s" }} />
          <span className="typing-dot size-1.5 rounded-full bg-ink-soft" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
