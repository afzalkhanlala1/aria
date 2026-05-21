const FEATURES = [
  {
    title: "Voice receptionist",
    sub: "24/7 calls answered",
    body:
      "ElevenLabs-quality voice on Vapi/Retell. Greets in your brand voice, answers treatment & pricing questions, qualifies, and books — under 2s pickup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path
          d="M5 4.5h2.78a1 1 0 0 1 .99.84l.66 4.06a1 1 0 0 1-.58 1.07l-1.57.74A8.5 8.5 0 0 0 12.8 17a1 1 0 0 0 1.07-.58l.74-1.57a1 1 0 0 1 1.07-.58l4.06.66a1 1 0 0 1 .84.99V18.7A1.7 1.7 0 0 1 18.88 20.4H17.5C10.6 20.4 5 14.8 5 7.9V6.2C5 5.42 5.42 5 6.2 5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    title: "Web & IG concierge",
    sub: "Always-on chat",
    body:
      "RAG-powered chatbot on your site + Instagram DMs. Knows your menu, pricing tiers, providers, policies. Same booking power as the voice agent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path
          d="M4 6.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-13z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "No-show recovery",
    sub: "Cut from 25% → 12%",
    body:
      "AI-personalized 24h + 2h SMS reminders. Auto voice callback within 30 min of any no-show offering to reschedule. Pure revenue recovery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 8v4l3 1.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Database reactivation",
    sub: "Done day-one",
    body:
      "Single biggest day-1 ROI: AI-driven SMS + voice campaign to your dormant CRM. Typically books 15–40 appts in month one and pays for the year.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path
          d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3v10c0 1.7-3.6 3-8 3s-8-1.3-8-3V7z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    title: "Reviews & referrals",
    sub: "Compounding growth",
    body:
      "Post-appointment AI follow-up routes happy patients to Google/Yelp, unhappy ones to private feedback. Referral asks built for high-value treatments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path
          d="M12 3l2.6 5.4L20 9l-4 3.9.9 5.6L12 16l-4.9 2.6L8 12.9 4 9l5.4-.6L12 3z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Owner dashboard",
    sub: "Why clients renew",
    body:
      "Calls answered vs. missed (before/after), leads by source, appts booked by Frontlea, no-show delta, reviews generated, revenue recovered. Monthly review call.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path
          d="M4 19V5M9 19V11M14 19V8M19 19V13"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="max-w-3xl">
        <span className="eyebrow">What&apos;s in the box</span>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Six systems. One managed service.{" "}
          <em className="italic text-emerald">Zero new hires.</em>
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          Frontlea isn&apos;t software you have to learn. It&apos;s a fully managed AI front desk
          we build, run and optimize for your clinic — measured against a single number: net new
          revenue.
        </p>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <li
            key={f.title}
            className="card group relative overflow-hidden rounded-3xl p-6 transition-all hover:border-emerald"
          >
            <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-emerald/8 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-5 grid size-11 place-items-center rounded-xl bg-accent-bg text-accent-fg">
                {f.icon}
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                0{i + 1} · {f.sub}
              </div>
              <h3 className="mt-1 font-serif text-2xl">{f.title}</h3>
              <p className="mt-3 text-ink-soft">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
