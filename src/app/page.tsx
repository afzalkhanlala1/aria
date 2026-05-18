import Link from "next/link";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Features } from "@/components/features";
import { RouteTeasers } from "@/components/route-teasers";
import { Proof } from "@/components/proof";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Features />
      <RouteTeasers />
      <Proof />
      <HomeCta />
    </>
  );
}

function HomeCta() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="mesh absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-10 lg:py-32">
        <span className="eyebrow justify-center">Step one</span>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
          Start with a free{" "}
          <em className="italic text-emerald">Missed Revenue Audit.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-soft">
          We&apos;ll call your clinic three times — business hours, lunch, and after 6pm — record
          what happens, and send you a 4-minute Loom showing the exact revenue you&apos;re leaving
          on the table.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/audit" className="btn-primary">
            Get my free audit <span aria-hidden>→</span>
          </Link>
          <Link href="/demo" className="btn-ghost">
            Or try the demo first
          </Link>
        </div>
        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
          No pitch · 1 business day turnaround · clinics in TX · FL · AZ · NV · SoCal · NY/NJ
        </p>
      </div>
    </section>
  );
}
