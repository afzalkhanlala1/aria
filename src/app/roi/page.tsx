import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { RoiCalculator } from "@/components/roi-calculator";

export const metadata: Metadata = {
  title: "ROI calculator — Frontlea",
  description:
    "Move the sliders. See the number your front desk doesn't want you to see. Conservative estimates — real deployments recover more.",
};

const BENCHMARKS = [
  {
    metric: "$38k–$72k",
    label: "Monthly missed revenue · single location med spa",
    sub: "Based on 95 avg weekly inbound + 28% miss rate + $1,500 first-year value.",
  },
  {
    metric: "85%",
    label: "Average recovery on missed calls",
    sub: "Frontlea answers in 1.8s. The remaining 15% are scams, wrong numbers, and abandoned dials.",
  },
  {
    metric: "−12pp",
    label: "Average no-show rate drop",
    sub: "AI-personalized 24h + 2h reminders plus 30-min auto-callbacks after missed appointments.",
  },
  {
    metric: "15–40",
    label: "Reactivation bookings · month one",
    sub: "Day-one campaign against dormant CRM. Typically pays the year of service alone.",
  },
];

const ASSUMPTIONS: [string, string][] = [
  ["Frontlea answer rate", "85% of currently-missed calls"],
  ["No-show rate target", "12% (down from your current baseline)"],
  ["Average first-year patient value", "Your input — defaults to $1,500"],
  ["Booking conversion on answered calls", "Your input — defaults to 28%"],
  ["Cost basis", "$2,500/mo retainer · $3,500 one-time build"],
  ["Excludes", "Reactivation revenue, reviews uplift, referral compounding"],
];

export default function RoiPage() {
  return (
    <>
      <PageHeader
        eyebrow="ROI calculator"
        title={
          <>
            The number your front desk{" "}
            <em className="italic text-emerald">doesn&apos;t want you to see.</em>
          </>
        }
        intro={
          <>
            Most clinics underestimate missed revenue by 60%. Move the sliders below — we&apos;ll
            give you a conservative monthly number, and your audit will replace it with real
            recordings from your line.
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <RoiCalculator />
      </section>

      <section className="bg-bg-soft/40">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow">Benchmarks</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              What we typically see —{" "}
              <em className="italic text-emerald">across 36 deployments.</em>
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              These are the medians, not best cases. Your audit will benchmark you against the
              cohort closest to your specialty + region.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENCHMARKS.map((b) => (
              <li
                key={b.label}
                className="card flex flex-col gap-3 rounded-3xl p-6"
              >
                <div className="font-serif text-4xl text-emerald">{b.metric}</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                  {b.label}
                </div>
                <p className="text-sm text-ink-soft">{b.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">What&apos;s under the hood</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              How we calculate it.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              No magic. The calculator multiplies your inputs by industry-standard assumptions,
              then subtracts our fee. You can sanity-check every line.
            </p>
            <Link href="/audit" className="btn-primary mt-7 inline-flex">
              Replace this with your real numbers <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="card overflow-hidden rounded-3xl">
            <ul className="divide-y divide-line">
              {ASSUMPTIONS.map(([label, value]) => (
                <li key={label} className="grid grid-cols-[1fr_1.2fr] gap-4 px-6 py-4">
                  <span className="text-sm text-ink-soft">{label}</span>
                  <span className="font-mono text-xs text-ink">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
