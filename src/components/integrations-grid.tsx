type Integration = {
  name: string;
  category: string;
  blurb: string;
};

const INTEGRATIONS: Integration[] = [
  { name: "Boulevard", category: "Scheduling", blurb: "Direct API · slots, deposits, providers." },
  { name: "Aesthetic Record", category: "Scheduling", blurb: "Two-way appt sync + patient profiles." },
  { name: "Mangomint", category: "Scheduling", blurb: "Native availability + memberships." },
  { name: "Mindbody", category: "Scheduling", blurb: "OAuth + class/appointment booking." },
  { name: "Symplast", category: "EMR", blurb: "Patient lookup + appt scheduling." },
  { name: "GoHighLevel", category: "CRM", blurb: "Lead routing + workflow handoff." },
  { name: "Vapi", category: "Voice runtime", blurb: "Low-latency voice orchestration." },
  { name: "Retell AI", category: "Voice runtime", blurb: "Fallback voice runtime." },
  { name: "ElevenLabs", category: "Voice", blurb: "Premium voice cloning + delivery." },
  { name: "OpenAI", category: "Reasoning", blurb: "GPT-5 enterprise w/ zero retention." },
  { name: "Anthropic", category: "Reasoning", blurb: "Claude Opus for nuance + safety." },
  { name: "Pinecone", category: "Retrieval", blurb: "Menu, FAQ, provider knowledge base." },
  { name: "Twilio", category: "Telephony", blurb: "Numbers, SMS, transfer + recording." },
  { name: "Postscript", category: "SMS", blurb: "Compliant reactivation campaigns." },
  { name: "Make.com", category: "Glue", blurb: "Internal automations + bespoke logic." },
  { name: "Instagram", category: "Channels", blurb: "Direct DM responses + booking." },
];

export function IntegrationsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <span className="eyebrow">Integration stack</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Plugs into the systems{" "}
            <em className="italic text-emerald">you already run.</em>
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            We swap layers without rebuilding the rest. Switching schedulers or voice runtimes
            never touches your booking flow.
          </p>
        </div>
        <p className="max-w-sm text-sm text-ink-soft">
          Don&apos;t see your stack? We&apos;ve shipped 14 custom integrations in the past 12 months.
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {INTEGRATIONS.map((i) => (
          <li
            key={i.name}
            className="group relative overflow-hidden rounded-2xl border border-line bg-bg-elev/70 p-4 transition-all hover:border-emerald hover:bg-bg-elev"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-emerald/8 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-faint">
              {i.category}
            </div>
            <div className="mt-1.5 font-serif text-xl">{i.name}</div>
            <div className="mt-2 text-xs text-ink-soft">{i.blurb}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
