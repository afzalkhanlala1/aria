"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { who: "you" | "aria"; text: string; tag?: string };

type Intent = {
  keywords: string[];
  reply: (q: string) => Msg | Msg[];
};

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

const INTENTS: Intent[] = [
  {
    keywords: ["botox", "tox", "wrinkle"],
    reply: () => ({
      who: "aria",
      text:
        "Of course — our Botox starts at $13/unit. Most patients use 20–40 units depending on areas treated. Forehead-only is usually 20–25u (~$260–$325). Want me to pencil in a complimentary consult with Dr. Patel this week?",
    }),
  },
  {
    keywords: ["filler", "lip", "cheek", "jaw"],
    reply: () => ({
      who: "aria",
      text:
        "Jawline filler typically runs $1,400–$2,200 (most patients need 2–3 syringes) and lip filler starts at $750/syringe. Both include a complimentary consult with Dr. Patel. Want a slot Thursday or Friday?",
    }),
  },
  {
    keywords: ["morpheus", "skin tightening", "rf microneedling"],
    reply: () => ({
      who: "aria",
      text:
        "Our holiday Morpheus8 package is 3 sessions for $2,100 (normally $2,700). Includes pre/post-care kit and a follow-up two weeks after. I can hold a consult Saturday at 1pm — interested?",
    }),
  },
  {
    keywords: ["hydrafacial", "facial", "peel"],
    reply: () => ({
      who: "aria",
      text:
        "Signature Hydrafacial is $185, the Deluxe is $245, and Platinum (includes LED + lymphatic) is $295. Lunchtime slots are popular — I have openings tomorrow at 12pm or 12:45pm.",
    }),
  },
  {
    keywords: ["tonight", "after hours", "late", "evening", "right now"],
    reply: () => ({
      who: "aria",
      text:
        "We're closed for treatments after 7pm, but I can book any morning, afternoon or evening slot through Saturday — and confirm by text in 10 seconds. What treatment were you thinking?",
    }),
  },
  {
    keywords: ["book", "schedule", "appointment", "consult", "consultation"],
    reply: () => ({
      who: "aria",
      text:
        "Happy to book it. I'll need a few seconds — what treatment, which provider (or 'any'), and which day works for you? I'll text you confirmation while we're still on this thread.",
    }),
  },
  {
    keywords: ["price", "pricing", "cost", "how much"],
    reply: () => ({
      who: "aria",
      text:
        "Most-asked prices: Botox $13/unit · Lip filler from $750 · Hydrafacial from $185 · Morpheus8 from $700/session. Anything specific you want a quote on?",
    }),
  },
  {
    keywords: ["payment", "credit", "carecredit", "financing", "afford"],
    reply: () => ({
      who: "aria",
      text:
        "We accept all major cards, CareCredit, Cherry, and offer 0% financing through Affirm for packages over $1,000. Want me to text you the financing link?",
    }),
  },
  {
    keywords: ["address", "where", "location", "directions", "park"],
    reply: () => ({
      who: "aria",
      text:
        "We're at 1820 Whitis Ave, Suite 200, Austin TX 78705 — free valet at the door. Closest cross street: MLK Jr Blvd. Want me to text you the link?",
    }),
  },
  {
    keywords: ["hour", "open", "closed", "time"],
    reply: () => ({
      who: "aria",
      text:
        "Mon–Fri 9am–7pm and Saturday 10am–4pm. Last appointment 45 minutes before close. Want me to find a slot?",
    }),
  },
  {
    keywords: ["miss", "no show", "missed", "didn't come", "rescheduled"],
    reply: () => ({
      who: "aria",
      text:
        "No worries — these things happen. We waive the no-show fee for first-time skips and I can rebook you in 20 seconds. Want Friday 11am or Monday 2pm?",
    }),
  },
  {
    keywords: ["human", "real person", "talk to a human", "agent", "not ai", "is this ai"],
    reply: () => ({
      who: "aria",
      text:
        "Yes, I'm Aria — Luxe's AI front desk. I can hand you off to our team during business hours (Mon–Sat). Want me to text our concierge to call you within 15 minutes?",
    }),
  },
  {
    keywords: ["hipaa", "private", "data", "record"],
    reply: () => ({
      who: "aria",
      text:
        "Conversations are recorded with disclosure and stored under HIPAA-grade transmission. We don't share data outside the clinic and any sensitive medical question is routed to a human provider.",
    }),
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    reply: () => ({
      who: "aria",
      text:
        "Hi! 👋 Happy to help. Want pricing on something, a quick booking, or a recommendation for first-time patients?",
    }),
  },
  {
    keywords: ["thanks", "thank you", "ty"],
    reply: () => ({
      who: "aria",
      text: "Anytime. I'll be here 24/7 — just message or call.",
    }),
  },
];

function findIntent(text: string): Msg {
  const q = text.toLowerCase();

  // Pattern: "book me ___ at ___" — extract simple slot
  const slotMatch = q.match(/(book|schedule).*?(mon|tue|wed|thu|fri|sat|sun|tomorrow|tonight)\s*(at\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?/i);
  if (slotMatch) {
    const day = slotMatch[2];
    const hour = slotMatch[4];
    const min = slotMatch[5] ?? "00";
    const ampm = slotMatch[6] ?? "";
    const slot = hour ? `${day} at ${hour}:${min}${ampm}` : `${day}`;
    return {
      who: "aria",
      text: `Got it — pencilling in ${slot}. What's the treatment, and can I grab a mobile number for the confirmation text?`,
      tag: "Slot held",
    };
  }

  for (const intent of INTENTS) {
    if (intent.keywords.some((k) => q.includes(k))) {
      const r = intent.reply(text);
      return Array.isArray(r) ? r[0] : r;
    }
  }

  return {
    who: "aria",
    text:
      "Good question — I'd want to confirm that with our team. Want me to text our concierge to follow up within the hour, or would you like to pick a consult slot instead?",
  };
}

export function AskAria() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { who: "you", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const reply = findIntent(trimmed);
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 700 + Math.random() * 700);
  }

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
                  className="rounded-full border border-line bg-bg-elev/60 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-emerald hover:text-ink"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-line bg-bg-soft/40 p-4 text-xs text-ink-soft">
          <strong className="text-ink">Note:</strong> this is a public sandbox with no scheduler
          attached. In your deployment Aria reads live availability and books in-call.
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
                Sandbox · live
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages([GREETING])}
            className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint hover:text-ink"
          >
            Reset
          </button>
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
            placeholder="Ask anything…"
            className="flex-1 rounded-full border border-line bg-bg-elev/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-emerald"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid size-10 place-items-center rounded-full bg-ink text-bg transition-transform hover:translate-x-0.5"
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
