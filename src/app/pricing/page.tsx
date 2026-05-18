import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Pricing } from "@/components/pricing";
import { PricingAddons } from "@/components/pricing-addons";
import { Comparison } from "@/components/comparison";

export const metadata: Metadata = {
  title: "Pricing — Aria",
  description:
    "One flat retainer. No seat licenses, no usage gotchas. If we don't recover 3× our fee in 90 days, we extend the engagement free.",
};

const GUARANTEES = [
  {
    title: "3× ROI in 90 days — or free.",
    body:
      "If Aria doesn't recover at least 3× our monthly fee within your first 90 days, we extend the engagement at no charge until it does.",
  },
  {
    title: "Cancel after 90 days.",
    body:
      "Initial 90-day term so we can prove the work. After that, fully month-to-month. No annual handcuffs unless you take the 20% prepay.",
  },
  {
    title: "No surprise overages.",
    body:
      "Twilio, ElevenLabs and LLM costs are passed through with a transparent 30% margin. You see every number on a single line in your dashboard.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            One flat retainer.{" "}
            <em className="italic text-emerald">Net new revenue, guaranteed measurable.</em>
          </>
        }
        intro={
          <>
            No seat licenses. No usage gotchas. One number you wire monthly. The build is one-time.
            The guarantee is in writing.
          </>
        }
        meta={
          <div className="grid grid-cols-3 gap-4 text-sm">
            <Stat value="$2.5k" label="Monthly" />
            <Stat value="$3.5k" label="One-time setup" />
            <Stat value="14d" label="To live" />
          </div>
        }
      />

      <Pricing />
      <PricingAddons />

      <section className="bg-bg-soft/40">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow">Guarantees</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              We&apos;ll put it{" "}
              <em className="italic text-emerald">in writing.</em>
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {GUARANTEES.map((g) => (
              <li key={g.title} className="card rounded-3xl p-6 lg:p-7">
                <div className="grid size-10 place-items-center rounded-full bg-emerald-soft text-emerald">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5l3.2 3L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight">{g.title}</h3>
                <p className="mt-3 text-ink-soft">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Comparison />

      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10 lg:py-28">
        <div className="card mx-auto max-w-3xl rounded-3xl p-10">
          <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
            Still cheaper than{" "}
            <em className="italic text-emerald">one front-desk hire.</em>
          </h3>
          <p className="mt-4 text-ink-soft">
            Fully loaded, a single front-desk hire costs $52,000–$74,000/year, only works business
            hours, gets sick, and quits. Aria is $30k/yr, works 168 hours/week, never quits,
            and ships a P&L receipt every month.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/audit" className="btn-primary">
              Run the audit <span aria-hidden>→</span>
            </Link>
            <Link href="/roi" className="btn-ghost">
              Open the calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">{label}</div>
    </div>
  );
}
