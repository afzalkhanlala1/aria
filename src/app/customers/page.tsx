import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Proof } from "@/components/proof";
import { CaseStudies } from "@/components/case-studies";

export const metadata: Metadata = {
  title: "Customers — Frontlea",
  description:
    "Operator stories from 36 deployments across TX, FL, AZ, NV, SoCal and NY/NJ. Real numbers, real receipts.",
};

const SEGMENTS = [
  { name: "Med spas", count: "21 clinics", focus: "Injectables · skin · body" },
  { name: "Cosmetic dental", count: "6 clinics", focus: "Veneers · Invisalign · whitening" },
  { name: "Plastic surgery", count: "5 clinics", focus: "Surgical + non-surgical mix" },
  { name: "Dermatology", count: "4 clinics", focus: "Cosmetic dermatology + IPL" },
];

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customers"
        title={
          <>
            36 clinics, six states,{" "}
            <em className="italic text-emerald">one number that matters.</em>
          </>
        }
        intro={
          <>
            Frontlea is the AI front desk for operators who care about a P&L receipt — not a dashboard
            with vanity charts. These are the operators we serve, and what they&apos;ve seen.
          </>
        }
        meta={
          <ul className="grid grid-cols-3 gap-4 text-sm">
            <li>
              <div className="font-serif text-2xl">36</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">Active clinics</div>
            </li>
            <li>
              <div className="font-serif text-2xl">$3.4M</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">Annualized recovered revenue</div>
            </li>
            <li>
              <div className="font-serif text-2xl">94%</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">Year-2 retention</div>
            </li>
          </ul>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((s) => (
            <li key={s.name} className="card rounded-3xl p-5">
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                {s.count}
              </div>
              <div className="mt-2 font-serif text-2xl">{s.name}</div>
              <div className="mt-2 text-sm text-ink-soft">{s.focus}</div>
            </li>
          ))}
        </ul>
      </section>

      <CaseStudies />

      <Proof />

      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10 lg:py-28">
        <div className="card mx-auto max-w-3xl rounded-3xl p-10">
          <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
            We&apos;ll connect you with{" "}
            <em className="italic text-emerald">a renewing operator.</em>
          </h3>
          <p className="mt-4 text-ink-soft">
            Want to talk to a clinic owner running Frontlea today? We&apos;ll set you up with one in
            your specialty or region — no NDAs, no salespeople on the call.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/audit" className="btn-primary">
              Talk to an operator <span aria-hidden>→</span>
            </Link>
            <Link href="/demo" className="btn-ghost">
              Try the demo first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
