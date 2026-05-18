import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "FAQ — Aria",
  description:
    "Answers to the questions clinic owners ask before they sign. HIPAA, integrations, voice quality, escalations, contracts, cancellation.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Questions clinic owners ask{" "}
            <em className="italic text-emerald">before they sign.</em>
          </>
        }
        intro={
          <>
            We collected the eight questions that come up on every audit call. Anything missing?
            Ask us on the audit — we&apos;ll add it here.
          </>
        }
      />
      <FAQ />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-10">
        <div className="card grid items-center gap-8 rounded-3xl p-8 lg:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
              Didn&apos;t see your question?
            </h3>
            <p className="mt-3 text-ink-soft">
              We answer every audit-request email personally within one business day — usually
              same day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-nowrap">
            <Link href="/audit" className="btn-primary">
              Ask on the audit <span aria-hidden>→</span>
            </Link>
            <a href="mailto:hello@aria.work" className="btn-ghost">
              hello@aria.work
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
