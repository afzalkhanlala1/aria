const STORIES = [
  {
    metric: "+$41,200",
    metricLabel: "Recovered in month 1",
    quote:
      "We were missing 1 in 3 calls and didn't know it. The reactivation campaign alone paid for our entire year.",
    who: "Owner-MD, 2-location med spa · Austin, TX",
  },
  {
    metric: "−61%",
    metricLabel: "No-show rate dropped",
    quote:
      "The 2-hour reminders + the auto-callback after no-shows are wild. We literally rescheduled three patients in an afternoon.",
    who: "Practice Owner · Miami, FL",
  },
  {
    metric: "186",
    metricLabel: "After-hours bookings in 90 days",
    quote:
      "Aria booked patients while I was asleep. I stopped checking voicemails. My team stopped feeling buried.",
    who: "RN-Injector / Owner · Scottsdale, AZ",
  },
];

export function Proof() {
  return (
    <section className="bg-emerald-deep text-bg">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow text-emerald-soft/70">Operator stories</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The numbers that{" "}
              <em className="italic">made owners renew.</em>
            </h2>
          </div>
          <p className="max-w-md text-emerald-soft/80">
            Aggregate results from operator pilots and reference deployments. Your audit will use
            your real numbers — no fluff.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {STORIES.map((s) => (
            <li
              key={s.metric}
              className="rounded-3xl border border-emerald-soft/20 bg-white/[0.04] p-6 backdrop-blur-sm lg:p-7"
            >
              <div className="font-serif text-5xl text-bg">{s.metric}</div>
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-emerald-soft/70">
                {s.metricLabel}
              </div>
              <blockquote className="mt-6 text-lg leading-relaxed">
                <span className="font-serif text-2xl text-emerald-soft/80">“</span>
                {s.quote}
                <span className="font-serif text-2xl text-emerald-soft/80">”</span>
              </blockquote>
              <div className="mt-4 text-sm text-emerald-soft/70">{s.who}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
