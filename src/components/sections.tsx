import { VoiceDemo } from "./voice-demo";
import { ChatDemo } from "./chat-demo";
import { RoiCalculator } from "./roi-calculator";

export function DemoSection() {
  return (
    <section id="demo" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <span className="eyebrow">Live demo</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Hear Aria handle a real call.{" "}
            <em className="italic text-emerald">No download required.</em>
          </h2>
        </div>
        <p className="max-w-sm text-ink-soft">
          This is the same logic, tone, and booking flow we deploy for clinics — adapted to your
          menu and brand voice during the 14-day build.
        </p>
      </div>

      <div className="mt-12">
        <VoiceDemo />
      </div>

      <div className="mt-24 lg:mt-32">
        <ChatDemo />
      </div>
    </section>
  );
}

export function CalculatorSection() {
  return (
    <section id="calculator" className="bg-bg-soft/60">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="eyebrow">Missed revenue calculator</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The number your front desk doesn&apos;t want you to see.
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Move the sliders. We compute conservatively — typical clinics recover{" "}
            <em className="italic text-ink">more</em> than this in real deployments.
          </p>
        </div>

        <div className="mt-12">
          <RoiCalculator />
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24 text-center lg:py-32">
        <span className="eyebrow justify-center">The problem</span>
        <p className="mt-6 font-serif text-3xl leading-snug sm:text-5xl">
          The average aesthetic clinic{" "}
          <em className="italic text-emerald">loses 1 in 3 inbound leads</em>{" "}
          to missed calls, unanswered DMs and no-shows — while spending five figures a month on
          Meta and Google ads to <em className="italic">generate</em> those leads.
        </p>
        <div className="mx-auto mt-10 max-w-2xl text-lg text-ink-soft">
          <p>
            You don&apos;t need more leads. You need a front desk that doesn&apos;t sleep, doesn&apos;t
            quit, doesn&apos;t miss a call at 9:47pm when a patient is finally ready to book her
            Morpheus8 package.
          </p>
        </div>
      </div>
    </section>
  );
}
