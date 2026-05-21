import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Timeline } from "@/components/timeline";
import { ArchitectureDiagram } from "@/components/architecture";
import { IntegrationsGrid } from "@/components/integrations-grid";

export const metadata: Metadata = {
  title: "How it works — Frontlea",
  description:
    "From kickoff to first booked patient in two weeks. See the architecture, integrations, and four-stage rollout we run for every clinic.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="The build"
        title={
          <>
            14 days to a working{" "}
            <em className="italic text-emerald">managed AI front desk.</em>
          </>
        }
        intro={
          <>
            We don&apos;t hand you a tool. We architect, deploy and operate the entire system in
            your brand voice — with a single owner dashboard, a single monthly review, and a
            single bill.
          </>
        }
        meta={
          <ul className="grid grid-cols-3 gap-4 text-sm">
            <li>
              <div className="font-serif text-2xl">14d</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                Kickoff → live
              </div>
            </li>
            <li>
              <div className="font-serif text-2xl">5</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                Channels
              </div>
            </li>
            <li>
              <div className="font-serif text-2xl">16+</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                Native integrations
              </div>
            </li>
          </ul>
        }
      />

      <Timeline />
      <ArchitectureDiagram />

      <Principles />

      <IntegrationsGrid />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="card grid items-center gap-8 rounded-3xl p-8 lg:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <span className="eyebrow">Ready for the audit?</span>
            <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              See where the leaks are in your front desk —{" "}
              <em className="italic text-emerald">before you sign anything.</em>
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-nowrap">
            <Link href="/audit" className="btn-primary">
              Free revenue audit <span aria-hidden>→</span>
            </Link>
            <Link href="/pricing" className="btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const PRINCIPLES = [
  {
    label: "01",
    title: "We run it, not you.",
    body:
      "You don't learn a tool. You don't manage prompts. We tune, monitor, and review weekly during onboarding and monthly forever.",
  },
  {
    label: "02",
    title: "Done day-one, not day-90.",
    body:
      "Database reactivation runs on day one. Most clinics book their first appointment from Frontlea within 48 hours of go-live.",
  },
  {
    label: "03",
    title: "Single number you measure us against.",
    body:
      "Net new revenue from Frontlea-attributed bookings. Everything else is internal plumbing. If we don't show it monthly, fire us.",
  },
  {
    label: "04",
    title: "Hand-off, not lock-out.",
    body:
      "Frontlea escalates surgical, post-op, medical or emotional calls to your team — by design. Humans always own what matters.",
  },
];

function Principles() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="max-w-3xl">
        <span className="eyebrow">Operating principles</span>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Four rules we run every deployment by.
        </h2>
      </div>

      <ul className="mt-12 grid gap-px bg-line lg:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <li
            key={p.label}
            className="bg-bg-elev p-7 lg:p-9"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-emerald">
                {p.label}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <h3 className="mt-5 font-serif text-2xl">{p.title}</h3>
            <p className="mt-3 text-ink-soft">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
