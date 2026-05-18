const INCLUDES = [
  "Voice receptionist (24/7) — calls, qualifies, books",
  "Web + Instagram DM concierge",
  "No-show recovery (SMS + voice callbacks)",
  "One-time database reactivation campaign",
  "Reviews & referrals automation",
  "Owner dashboard + monthly performance review",
  "Up to 1,500 voice minutes / 3,000 SMS included",
  "Prompt tuning, menu updates, ongoing ops",
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            One flat retainer.{" "}
            <em className="italic text-emerald">Net new revenue, guaranteed measurable.</em>
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            No seat licenses. No usage gotchas. One number you can wire monthly. If we don&apos;t
            recover at least 3× our fee in your first 90 days, we extend the engagement free until
            we do.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Tile label="Setup" value="$3,500" sub="One-time · 14-day build" />
            <Tile label="Monthly" value="$2,500" sub="Cancel anytime after 90 days" accent />
            <Tile label="Annual prepay" value="−20%" sub="Locks pricing for the year" />
            <Tile label="Overage" value="Pass-through" sub="Twilio/ElevenLabs + 30%" />
          </div>
        </div>

        <div className="card relative overflow-hidden rounded-3xl">
          <div className="absolute right-0 top-0 rounded-bl-2xl bg-accent-bg px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent-fg">
            Managed front desk
          </div>
          <div className="p-7 lg:p-9">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-6xl">$2,500</span>
              <span className="text-ink-faint">/ month</span>
            </div>
            <p className="mt-1 text-sm text-ink-faint">+ $3,500 one-time build · cancel after 90 days</p>

            <ul className="mt-7 space-y-3">
              {INCLUDES.map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-1 grid size-4 place-items-center rounded-full bg-emerald-soft text-emerald">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.2 3L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <a href="/audit" className="btn-primary mt-8 w-full">
              Get my free revenue audit first
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Most clinics start with a free audit, not a sales call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-4",
        accent ? "border-emerald bg-bg-elev" : "border-line bg-bg-elev/60",
      ].join(" ")}
    >
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl">{value}</div>
      <div className="text-xs text-ink-faint">{sub}</div>
    </div>
  );
}
