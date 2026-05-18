import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { VoiceDemo } from "@/components/voice-demo";
import { ChatDemo } from "@/components/chat-demo";
import { AskAria } from "@/components/ask-aria";
import { MissionControl } from "@/components/mission-control";

export const metadata: Metadata = {
  title: "Live demo — Aria",
  description:
    "Talk to Aria right now. Try the interactive sandbox, watch her handle real call scenarios, see DM concierge, and tour live Mission Control.",
};

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live demo"
        title={
          <>
            Don&apos;t take our word.{" "}
            <em className="italic text-emerald">Hear it. Type to it. Watch it run.</em>
          </>
        }
        intro={
          <>
            Four demos, no signup. Each is the same logic, tone, and booking flow we deploy for
            real clinics — adapted to your menu and brand voice during the 14-day build.
          </>
        }
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="#playground" className="chip">
              <span className="size-1.5 rounded-full bg-emerald" /> Sandbox
            </Link>
            <Link href="#voice" className="chip">Voice scenarios</Link>
            <Link href="#dm" className="chip">DM concierge</Link>
            <Link href="#mission-control" className="chip">Mission control</Link>
          </div>
        }
      />

      <section id="playground" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
        <AskAria />
      </section>

      <section
        id="voice"
        className="bg-bg-soft/40 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="eyebrow">Voice scenarios</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Hear Aria handle a real call.{" "}
                <em className="italic text-emerald">No download required.</em>
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">
              Three pre-recorded scenarios pulled from production logs — new-patient inquiry,
              after-hours booking, and a no-show callback.
            </p>
          </div>

          <div className="mt-12">
            <VoiceDemo />
          </div>
        </div>
      </section>

      <section id="dm" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
        <ChatDemo />
      </section>

      <section
        id="mission-control"
        className="bg-bg-soft/40 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="eyebrow">Owner console</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Mission control —{" "}
                <em className="italic text-emerald">streaming live.</em>
              </h2>
              <p className="mt-5 text-lg text-ink-soft">
                Synthesized from real Luxe Aesthetics traffic patterns. Every event here is a
                kind of conversation Aria handles every day, across every channel, with full
                transcripts a click away.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <MissionControl />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10 lg:py-28">
        <div className="card mx-auto max-w-3xl rounded-3xl p-10">
          <span className="eyebrow justify-center">Want this for your clinic?</span>
          <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
            We&apos;ll build a custom demo on your real menu —{" "}
            <em className="italic text-emerald">free.</em>
          </h3>
          <p className="mt-4 text-ink-soft">
            On the audit call we ship a working voice + chat sandbox trained on your treatment
            menu, pricing tiers, and brand voice. Yours to keep either way.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/audit" className="btn-primary">
              Get a custom demo <span aria-hidden>→</span>
            </Link>
            <Link href="/pricing" className="btn-ghost">
              See pricing first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
