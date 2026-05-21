"use client";

import { useState } from "react";

const QA = [
  {
    q: "Will my patients know it's AI?",
    a: "Frontlea sounds genuinely natural — ElevenLabs voice, conversational pacing, real understanding of your menu. We disclose that callers are speaking with an AI assistant at the start, but in practice 90%+ of callers don't notice unless told. The agent transfers seamlessly to a human for anything sensitive or outside scope.",
  },
  {
    q: "Does this work with my scheduling software?",
    a: "Direct API integrations with Boulevard, Aesthetic Record, Mangomint, Mindbody and Symplast. For systems without an open API, we use GoHighLevel or a lightweight middleware layer. You won't change your workflow.",
  },
  {
    q: "Is this HIPAA compliant?",
    a: "Frontlea focuses on cash-pay aesthetic services — front-desk operations, not protected health information storage. We sign BAAs with all subprocessors (Twilio, OpenAI/Anthropic enterprise) and follow HIPAA-grade transmission/storage practices. We provide your compliance documentation as part of onboarding.",
  },
  {
    q: "What if Frontlea mishandles a sensitive call?",
    a: "By design, the agent transfers anything medical, surgical, post-op complications, or anyone explicitly asking for a human. Calls are recorded (with disclosure), transcribed and reviewable in your dashboard. We tune prompts weekly during the first 60 days.",
  },
  {
    q: "Can it handle my brand voice?",
    a: "Yes. We script and tune Frontlea specifically for your clinic — name, tone, signature greetings, your team's vocabulary. You'll approve a 5-minute sample call before go-live.",
  },
  {
    q: "How does the 'database reactivation' work?",
    a: "On day one we ingest your dormant leads (typically 500–3,000). Frontlea runs a respectful, opt-out-compliant SMS sequence (and optional voice outreach for high-value segments) tied to a current promotion. Most clinics see 15–40 appointments booked in the first month. This alone usually pays for the whole year of service.",
  },
  {
    q: "What if I want to cancel?",
    a: "No long contracts. The build is one-time; the monthly is month-to-month after a 90-day initial term so we can prove ROI properly. Annual prepay is optional and unlocks 20% off.",
  },
  {
    q: "You're not in the US — is that a problem?",
    a: "No, and many of our clients prefer it. The Frontlea service is delivered through US infrastructure (Twilio, US-region LLM endpoints, your scheduling software). The team behind it works async, with one weekly live touchpoint and on-call coverage during your business hours. Owners care about results — and we deliver them in writing every month.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-24 lg:py-32">
      <span className="eyebrow">FAQ</span>
      <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
        Questions clinic owners ask{" "}
        <em className="italic text-emerald">before they sign.</em>
      </h2>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {QA.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-emerald"
              >
                <span className="font-serif text-xl leading-snug">{item.q}</span>
                <span
                  className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line transition-transform ${
                    isOpen ? "rotate-45 bg-emerald text-[#06120e] border-emerald" : ""
                  }`}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="rise pb-6 pr-12 text-ink-soft">{item.a}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
