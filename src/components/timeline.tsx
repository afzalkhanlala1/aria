const STEPS = [
  {
    range: "Days 1–3",
    title: "Discovery",
    body:
      "Owner kickoff. We capture your treatment menu, price tiers, providers, scheduling rules, brand voice, FAQs and after-hours protocol. We get API access to your PM system and set up call forwarding.",
  },
  {
    range: "Days 4–10",
    title: "Build & wire",
    body:
      "We build the voice agent, RAG knowledge base, SMS workflows, and dashboard. We integrate scheduling (Boulevard, Aesthetic Record, Mangomint or Mindbody) and launch your database reactivation campaign.",
  },
  {
    range: "Days 11–13",
    title: "Shadow mode",
    body:
      "Frontlea answers every call but transfers to your humans so you can validate transcripts. We tune prompts based on real conversations. By now reactivation has already booked appointments.",
  },
  {
    range: "Day 14",
    title: "Go live",
    body:
      "Frontlea handles everything that's safely automatable. Edge cases route to your team. Your dashboard goes live. We schedule the first monthly review.",
  },
];

export function Timeline() {
  return (
    <section id="how" className="bg-bg-soft/60">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="max-w-3xl">
          <span className="eyebrow">14 days to live</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            From kickoff to first booked patient{" "}
            <em className="italic text-emerald">in two weeks.</em>
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            We don&apos;t hand you a tool. We build, deploy and operate the entire system for you,
            in your brand voice — with a single owner-facing dashboard.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-accent-bg font-serif text-accent-fg">
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="hidden h-px flex-1 bg-line lg:block" />
                )}
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                {s.range}
              </div>
              <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
