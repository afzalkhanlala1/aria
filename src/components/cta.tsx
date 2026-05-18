"use client";

import { useState } from "react";

type FormState = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  website: string;
};

const INITIAL: FormState = {
  name: "",
  clinic: "",
  email: "",
  phone: "",
  website: "",
};

export function AuditCTA() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const prev = JSON.parse(localStorage.getItem("aria-audits") || "[]");
      prev.push({ ...data, ts: new Date().toISOString() });
      localStorage.setItem("aria-audits", JSON.stringify(prev));
    } catch {}
    setSubmitted(true);
  }

  return (
    <section id="audit" className="bg-bg-soft/60">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <span className="eyebrow">Step 1 — Diagnosis, not pitch</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Get a free{" "}
              <em className="italic text-emerald">Missed Revenue Audit</em>{" "}
              of your clinic.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              We&apos;ll call your clinic three times — business hours, lunch, and after 6pm —
              record what happens, and send you a 4-minute Loom showing the exact revenue you&apos;re
              leaving on the table. No pitch, no obligation.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "3 live phone-test recordings of your front desk",
                "Lost-revenue estimate based on your average ticket",
                "A 4-minute Loom walkthrough with your name on it",
                "Sample Aria voice agent trained on your menu",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-1.5 size-1.5 rounded-full bg-emerald" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-dashed border-line bg-bg-elev/60 p-5 text-sm text-ink-soft">
              <strong className="text-ink">Turnaround:</strong> we deliver every audit within{" "}
              <strong className="text-ink">1 business day</strong>. If you don&apos;t learn
              something actionable, we&apos;ll buy you lunch on us. Yes, really.
            </div>
          </div>

          {!submitted ? (
            <form
              onSubmit={submit}
              className="card rounded-3xl p-7 lg:p-8 shadow-[0_20px_60px_-30px_rgba(13,15,14,0.25)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" value={data.name} onChange={(v) => update("name", v)} required />
                <Field label="Clinic name" value={data.clinic} onChange={(v) => update("clinic", v)} required />
                <Field label="Email" type="email" value={data.email} onChange={(v) => update("email", v)} required />
                <Field label="Phone" type="tel" value={data.phone} onChange={(v) => update("phone", v)} required />
                <div className="sm:col-span-2">
                  <Field label="Clinic website or Instagram" value={data.website} onChange={(v) => update("website", v)} required />
                </div>
              </div>
              <button type="submit" className="btn-primary mt-6 w-full">
                Send me my audit (it&apos;s free)
                <span aria-hidden>→</span>
              </button>
              <p className="mt-3 text-center text-xs text-ink-faint">
                We&apos;ll never sell your info, send spam, or auto-enroll you in anything.
              </p>
            </form>
          ) : (
            <div className="card flex flex-col justify-center rounded-3xl p-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-soft text-emerald">
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5l3.2 3L13 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-3xl">You&apos;re in.</h3>
              <p className="mt-3 text-ink-soft">
                We&apos;ll run your audit and deliver the Loom to{" "}
                <strong className="text-ink">{data.email}</strong> within 1 business day. Keep an
                eye on your inbox — it&apos;ll come from <em>audits@aria.work</em>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setData(INITIAL);
                }}
                className="btn-ghost mx-auto mt-6 text-sm"
              >
                Submit another clinic
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-emerald"
      />
    </label>
  );
}
