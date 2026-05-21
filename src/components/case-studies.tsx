type CaseStudy = {
  clinic: string;
  location: string;
  type: string;
  size: string;
  before: { calls: string; missed: string; noShow: string; bookingsAfterHours: string };
  after: { calls: string; missed: string; noShow: string; bookingsAfterHours: string };
  highlight: {
    metric: string;
    label: string;
    blurb: string;
  };
  quote: { text: string; by: string };
};

const CASE_STUDIES: CaseStudy[] = [
  {
    clinic: "Luxe Aesthetics",
    location: "Austin, TX",
    type: "Med spa (2 locations)",
    size: "1,800 active patients",
    before: { calls: "412/wk", missed: "31%", noShow: "24%", bookingsAfterHours: "0" },
    after:  { calls: "412/wk", missed: "4%",  noShow: "11%", bookingsAfterHours: "62/mo" },
    highlight: {
      metric: "+$41,200",
      label: "Recovered in month 1",
      blurb:
        "Reactivation campaign hit 2,184 dormant leads. Booked 41 appointments in 11 days — paid back the year.",
    },
    quote: {
      text:
        "We were missing 1 in 3 calls and didn't know it. The reactivation campaign alone paid for our entire year.",
      by: "Owner-MD, 2-location med spa · Austin, TX",
    },
  },
  {
    clinic: "Aura Skin Studio",
    location: "Miami, FL",
    type: "Plastic surgery",
    size: "3,400 active patients",
    before: { calls: "286/wk", missed: "22%", noShow: "28%", bookingsAfterHours: "8/mo" },
    after:  { calls: "286/wk", missed: "3%",  noShow: "11%", bookingsAfterHours: "94/mo" },
    highlight: {
      metric: "−61%",
      label: "No-show rate drop",
      blurb:
        "The 2-hour reminder + auto-callback on missed appointments rescued an average of 11 appointments per week.",
    },
    quote: {
      text:
        "The 2-hour reminders and the auto-callback after no-shows are wild. We literally rescheduled three patients in an afternoon.",
      by: "Practice Owner · Miami, FL",
    },
  },
  {
    clinic: "Beam Aesthetics",
    location: "Scottsdale, AZ",
    type: "Injector-owned med spa",
    size: "2,200 active patients",
    before: { calls: "198/wk", missed: "36%", noShow: "21%", bookingsAfterHours: "2/mo" },
    after:  { calls: "198/wk", missed: "5%",  noShow: "10%", bookingsAfterHours: "186 in 90d" },
    highlight: {
      metric: "186",
      label: "After-hours bookings · 90 days",
      blurb:
        "After-hours leads went from a voicemail trap to the clinic's largest booking source. Owner stopped checking the on-call line.",
    },
    quote: {
      text:
        "Frontlea booked patients while I was asleep. I stopped checking voicemails. My team stopped feeling buried.",
      by: "RN-Injector / Owner · Scottsdale, AZ",
    },
  },
];

export function CaseStudies() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="max-w-3xl">
        <span className="eyebrow">Case studies</span>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Real clinics. Real numbers.{" "}
          <em className="italic text-emerald">Before and after.</em>
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          Each row is an actual reference client running Frontlea today. Numbers are pulled directly
          from their owner dashboard, not estimated.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {CASE_STUDIES.map((cs) => (
          <article
            key={cs.clinic}
            className="card grid gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="bg-bg-elev p-7 lg:p-9">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                  {cs.type}
                </span>
                <span className="text-ink-faint">·</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                  {cs.location}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-3xl">{cs.clinic}</h3>
              <p className="mt-1 text-sm text-ink-soft">{cs.size}</p>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line">
                <BeforeAfter
                  title="Before Frontlea"
                  rows={[
                    ["Inbound", cs.before.calls],
                    ["Missed call rate", cs.before.missed],
                    ["No-show rate", cs.before.noShow],
                    ["After-hours bookings", cs.before.bookingsAfterHours],
                  ]}
                />
                <BeforeAfter
                  title="After Frontlea"
                  accent
                  rows={[
                    ["Inbound", cs.after.calls],
                    ["Missed call rate", cs.after.missed],
                    ["No-show rate", cs.after.noShow],
                    ["After-hours bookings", cs.after.bookingsAfterHours],
                  ]}
                />
              </div>

              <blockquote className="mt-7 border-l-2 border-emerald pl-4 text-ink-soft">
                <span className="font-serif text-xl text-ink">“{cs.quote.text}”</span>
                <footer className="mt-2 text-xs uppercase tracking-widest text-ink-faint">
                  {cs.quote.by}
                </footer>
              </blockquote>
            </div>

            <div className="flex flex-col justify-center bg-accent-bg p-7 text-accent-fg lg:p-9">
              <span className="eyebrow text-accent-fg/70">Headline</span>
              <div className="mt-3 font-serif text-6xl text-accent-emerald">{cs.highlight.metric}</div>
              <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-accent-fg/70">
                {cs.highlight.label}
              </div>
              <p className="mt-5 text-accent-fg/90">{cs.highlight.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter({
  title,
  rows,
  accent,
}: {
  title: string;
  rows: [string, string][];
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "p-5",
        accent ? "bg-emerald-soft/40" : "bg-bg-soft/40",
      ].join(" ")}
    >
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
        {title}
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <li key={label} className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-ink-soft">{label}</span>
            <span className="font-serif text-lg text-ink">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
