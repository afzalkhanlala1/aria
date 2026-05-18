import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { AuditCTA } from "@/components/cta";
import { CalEmbed } from "@/components/cal-embed";

export const metadata: Metadata = {
  title: "Free Revenue Audit — Aria",
  description:
    "We'll call your clinic three times — business hours, lunch, and after 6pm — record what happens, and send you a 4-minute Loom showing the exact revenue you're leaving on the table. Free. 1 business day.",
};

const STEPS = [
  {
    n: "01",
    title: "You submit",
    body:
      "Drop your clinic name + website. Takes 60 seconds. We don't sell your info or auto-enroll you in anything.",
  },
  {
    n: "02",
    title: "We test your line",
    body:
      "Three live phone tests over 24 hours: business hours, lunch hour, and after 6pm. Recorded with disclosure.",
  },
  {
    n: "03",
    title: "We build a custom Aria demo",
    body:
      "We train a working voice + chat sandbox on your treatment menu, pricing tiers, and brand voice.",
  },
  {
    n: "04",
    title: "You get a 4-minute Loom",
    body:
      "Recording of the test calls, dollar estimate of what they cost, the custom demo link. No pitch, no obligation.",
  },
];

const TRUST = [
  ["Turnaround", "1 business day · usually same day"],
  ["What you get", "Audit Loom + custom demo link"],
  ["Cost", "Free · no obligation, no sales call"],
  ["If we don't deliver", "We buy you lunch. Seriously."],
];

export default function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free revenue audit"
        title={
          <>
            See the money your front desk{" "}
            <em className="italic text-emerald">leaks every month.</em>
          </>
        }
        intro={
          <>
            We test your phone line, build a custom Aria demo on your real menu, and send you a
            4-minute walkthrough — within one business day. No pitch, no obligation.
          </>
        }
        meta={
          <ul className="grid grid-cols-2 gap-4 text-sm">
            {TRUST.map(([label, value]) => (
              <li key={label}>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                  {label}
                </div>
                <div className="mt-1 font-serif text-base text-ink">{value}</div>
              </li>
            ))}
          </ul>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <span className="eyebrow">How the audit works</span>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Four steps, one business day,{" "}
          <em className="italic text-emerald">zero pitch.</em>
        </h2>

        <ol className="mt-12 grid gap-px bg-line lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-bg-elev p-6 lg:p-7">
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-emerald">
                {s.n}
              </div>
              <h3 className="mt-3 font-serif text-2xl leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <AuditCTA />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="eyebrow">Or skip the form</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Grab 15 minutes on{" "}
              <em className="italic text-emerald">Afzal&apos;s calendar.</em>
            </h2>
            <p className="mt-4 text-ink-soft">
              No demo decks, no SDR call. Just a quick scoping conversation to see if Aria is
              the right fit for your clinic. Founder runs the call.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-ink-soft sm:items-end">
            <a href="tel:+18168599999" className="font-serif text-2xl text-ink hover:text-emerald">
              +1 (816) 859-9999
            </a>
            <a
              href="mailto:ariapersonalagent@gmail.com"
              className="hover:text-emerald"
            >
              ariapersonalagent@gmail.com
            </a>
          </div>
        </div>
        <div className="mt-10">
          <CalEmbed />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-10 lg:py-20">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
          Trusted by 36 aesthetic operators · TX · FL · AZ · NV · SoCal · NY/NJ
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/customers" className="btn-ghost text-sm">
            Read customer stories
          </Link>
          <Link href="/faq" className="btn-ghost text-sm">
            Read the FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
