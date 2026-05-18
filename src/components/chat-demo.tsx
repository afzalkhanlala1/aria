"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { who: "lead" | "aria"; text: string; tag?: string };

const CONVO: Msg[] = [
  { who: "lead", text: "hi! saw your reel on jawline filler. how much is it usually?" },
  {
    who: "aria",
    text:
      "Hi! 👋 Jawline filler at Luxe usually runs $1,400–$2,200 depending on syringes (most patients need 2–3). It includes a consult with Dr. Patel + a follow-up 2 weeks after.",
  },
  { who: "lead", text: "do you have anything this week? im flexible" },
  {
    who: "aria",
    text:
      "Yes — I have Wednesday at 1:30pm or Friday at 4pm with Dr. Patel for the consult (complimentary). Which works?",
  },
  { who: "lead", text: "friday 4pm please" },
  {
    who: "aria",
    text:
      "Booked Fri 4pm 🌿 Want me to text you a confirmation + pre-care checklist? Just drop your mobile.",
  },
  { who: "lead", text: "512-555-0177" },
  {
    who: "aria",
    text:
      "All set! Confirmation sent. We'll also remind you 24h and 2h before. Anything else you'd like to ask about while we're here?",
    tag: "BOOKED — Jawline consult, Fri 4pm",
  },
];

export function ChatDemo() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shown >= CONVO.length) return;
    const next = CONVO[shown];
    setTyping(next.who === "aria");
    const t = window.setTimeout(
      () => {
        setShown((n) => n + 1);
        setTyping(false);
      },
      next.who === "aria" ? 1400 : 900
    );
    return () => window.clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [shown, typing]);

  function replay() {
    setShown(0);
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div>
        <span className="eyebrow">DM &amp; web concierge</span>
        <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
          The lead who won&apos;t pick up the phone but{" "}
          <em className="italic text-emerald">will DM you at 11pm.</em>
        </h3>
        <p className="mt-5 text-ink-soft">
          Aria lives on your website and Instagram inbox, trained on your treatment menu, providers,
          pricing and policies. She answers within seconds, qualifies the lead, and books — same brain,
          same booking power as the voice agent.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            "Trained on your menu, prices, providers and FAQs via RAG",
            "Books directly into Boulevard / Aesthetic Record / Mangomint",
            "Hands off cleanly to humans during business hours when needed",
            "Captures source (IG ad, organic, web) for clean attribution",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3 text-ink-soft">
              <span className="mt-1.5 size-1.5 rounded-full bg-emerald" />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <button onClick={replay} className="btn-ghost mt-8 text-sm">
          Replay conversation
        </button>
      </div>

      {/* Phone-mockup chat */}
      <div className="mx-auto w-full max-w-md">
        <div className="card overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(13,15,14,0.3)]">
          <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-rose/15 via-bg-soft to-emerald-soft/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-accent-bg font-serif text-accent-fg">
                L
              </div>
              <div>
                <div className="text-sm font-medium">luxeaesthetics</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                  Active now
                </div>
              </div>
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
              Instagram DM
            </span>
          </div>

          <div ref={ref} className="flex h-[440px] flex-col gap-2 overflow-y-auto px-4 py-4">
            {CONVO.slice(0, shown).map((m, i) => (
              <Bubble key={i} msg={m} />
            ))}
            {typing && <TypingBubble />}
          </div>

          <div className="flex items-center gap-2 border-t border-line bg-bg-soft/40 px-3 py-3">
            <input
              disabled
              placeholder="Message…"
              className="flex-1 rounded-full border border-line bg-bg-elev/70 px-4 py-2 text-sm text-ink-faint placeholder:text-ink-faint"
            />
            <button
              className="grid size-9 place-items-center rounded-full bg-ink text-bg"
              aria-label="Send"
              disabled
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
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isAria = msg.who === "aria";
  return (
    <div className={`rise flex flex-col ${isAria ? "items-start" : "items-end"}`}>
      <div
        className={[
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[0.92rem] leading-relaxed",
          isAria
            ? "bg-bg-soft text-ink border border-line"
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

function TypingBubble() {
  return (
    <div className="flex">
      <div className="rounded-2xl border border-line bg-bg-soft px-3.5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot size-1.5 rounded-full bg-ink-soft" style={{ animationDelay: "0s" }} />
          <span className="typing-dot size-1.5 rounded-full bg-ink-soft" style={{ animationDelay: "0.2s" }} />
          <span className="typing-dot size-1.5 rounded-full bg-ink-soft" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
