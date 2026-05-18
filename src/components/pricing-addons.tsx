const ADDONS = [
  {
    name: "Additional location",
    price: "+$900 / mo",
    desc: "Second/third clinic on the same brand. Shared brain, separate scheduling + analytics.",
  },
  {
    name: "Reactivation refresh",
    price: "$1,500 / quarter",
    desc: "Fresh AI-driven campaign hitting newly-dormant patients. Most operators run two per year.",
  },
  {
    name: "Bespoke voice clone",
    price: "+$600 / mo",
    desc: "Replace the default Aria voice with a custom-cloned voice (consent-signed talent).",
  },
  {
    name: "Multilingual desk",
    price: "+$400 / mo",
    desc: "Spanish, Mandarin or Vietnamese on the same number. Auto-detected from first utterance.",
  },
  {
    name: "Dedicated success ops",
    price: "+$1,200 / mo",
    desc: "Weekly tuning + a dedicated operator who attends your team meeting.",
  },
  {
    name: "Outbound campaigning",
    price: "Custom",
    desc: "Targeted AI outbound for new treatment launches, events, and post-trade-show follow-up.",
  },
];

export function PricingAddons() {
  return (
    <section className="bg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <span className="eyebrow">Add-ons</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            For when one location{" "}
            <em className="italic text-emerald">isn&apos;t the ceiling.</em>
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Stack only what you need. Most clinics start lean and add a single line item once
            they&apos;ve seen their first month of ROI.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((a) => (
            <li
              key={a.name}
              className="card flex flex-col gap-3 rounded-3xl p-6 transition-colors hover:border-emerald"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl">{a.name}</h3>
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-emerald">
                  {a.price}
                </span>
              </div>
              <p className="text-sm text-ink-soft">{a.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
