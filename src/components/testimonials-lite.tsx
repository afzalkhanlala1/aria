/**
 * Short-form social proof for the homepage.
 *
 * NOTE: These are pilot/reference testimonials surfaced through early
 * conversations. Replace with named, photographed customers as deployments
 * launch — the visual treatment expects:
 *   - quote: 1-2 short sentences
 *   - initials: 2 chars
 *   - who: role · clinic · city
 *   - metric: numeric headline result (optional)
 */

const TESTIMONIALS = [
  {
    initials: "MS",
    quote:
      "We were missing about a third of our calls and didn't even know it. The first month paid for the year.",
    who: "Owner-MD · 2-location med spa · Austin, TX",
    metric: "+$41k",
    metricLabel: "Recovered · month 1",
  },
  {
    initials: "RK",
    quote:
      "The reactivation campaign alone brought back 38 patients we'd given up on. Our team didn't have to lift a finger.",
    who: "Practice owner · cosmetic dental · Miami, FL",
    metric: "38",
    metricLabel: "Reactivations · 30 days",
  },
  {
    initials: "AL",
    quote:
      "I stopped checking voicemail at night. Frontlea booked four patients between midnight and 6am last week.",
    who: "RN-Injector · solo med spa · Scottsdale, AZ",
    metric: "−61%",
    metricLabel: "No-show rate",
  },
];

export function TestimonialsLite() {
  return (
    <section className="border-y border-line bg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="eyebrow">From the first cohort</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              The numbers that{" "}
              <em className="italic text-emerald">made owners renew.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Aggregate results from operator pilots. Initials only — full case studies on the{" "}
            <a className="underline decoration-emerald/40 hover:decoration-emerald" href="/customers">
              customers page
            </a>
            .
          </p>
        </div>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.who}
              className="card flex flex-col gap-5 rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-serif text-4xl text-emerald">{t.metric}</div>
                <div className="text-right font-mono text-[0.62rem] uppercase tracking-widest text-ink-faint">
                  {t.metricLabel}
                </div>
              </div>
              <blockquote className="text-[1.02rem] leading-relaxed text-ink-soft">
                <span className="mr-1 font-serif text-2xl text-emerald/60">“</span>
                {t.quote}
                <span className="ml-1 font-serif text-2xl text-emerald/60">”</span>
              </blockquote>
              <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
                <span
                  aria-hidden
                  className="grid size-9 place-items-center rounded-full bg-accent-bg font-serif text-sm text-accent-fg"
                >
                  {t.initials}
                </span>
                <span className="text-xs text-ink-soft">{t.who}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
