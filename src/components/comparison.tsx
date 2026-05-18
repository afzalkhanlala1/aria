type Row = {
  feature: string;
  aria: { v: string | true | false; note?: string };
  desk: { v: string | true | false; note?: string };
  generic: { v: string | true | false; note?: string };
};

const ROWS: Row[] = [
  {
    feature: "Answers every call 24/7",
    aria: { v: true },
    desk: { v: false, note: "Hours only" },
    generic: { v: true },
  },
  {
    feature: "Speaks your treatment menu fluently",
    aria: { v: true, note: "RAG-tuned per clinic" },
    desk: { v: true, note: "If trained" },
    generic: { v: false, note: "Generic scripts" },
  },
  {
    feature: "Books directly into Boulevard / AR / Mangomint",
    aria: { v: true },
    desk: { v: true },
    generic: { v: "Limited" },
  },
  {
    feature: "Reactivates dormant CRM (day-1 ROI)",
    aria: { v: true },
    desk: { v: false },
    generic: { v: false },
  },
  {
    feature: "Handles IG DMs + web with same brain",
    aria: { v: true },
    desk: { v: false },
    generic: { v: "Voice-only" },
  },
  {
    feature: "Cuts no-show rate (auto-callbacks)",
    aria: { v: "−13pp", note: "Avg" },
    desk: { v: false },
    generic: { v: false },
  },
  {
    feature: "Owner dashboard + monthly review",
    aria: { v: true },
    desk: { v: false },
    generic: { v: "Self-serve" },
  },
  {
    feature: "Monthly cost",
    aria: { v: "$2,500" },
    desk: { v: "$4,800+", note: "Loaded payroll" },
    generic: { v: "$199–$899", note: "Plus setup labor" },
  },
];

export function Comparison() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="max-w-3xl">
        <span className="eyebrow">Why owners choose Aria</span>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          More than a phone bot.{" "}
          <em className="italic text-emerald">A managed revenue function.</em>
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          Most "AI voice" tools hand you a dashboard and a bill. We hand you a fully operated
          front desk — and a monthly receipt of what it brought in.
        </p>
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-bg-elev/60">
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-line bg-bg-soft/50 text-[0.65rem] uppercase tracking-widest text-ink-faint">
              <div className="px-5 py-4">Capability</div>
              <div className="border-l border-line bg-accent-bg px-5 py-4 text-accent-fg">
                <div className="flex items-center gap-2 font-mono">
                  <span className="size-1.5 rounded-full bg-emerald" />
                  Aria
                </div>
              </div>
              <div className="border-l border-line px-5 py-4">In-house receptionist</div>
              <div className="border-l border-line px-5 py-4">Generic AI voice tool</div>
            </div>
            <ul>
              {ROWS.map((r) => (
                <li
                  key={r.feature}
                  className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-line/70 last:border-b-0"
                >
                  <div className="px-5 py-4 text-sm">{r.feature}</div>
                  <Cell value={r.aria.v} note={r.aria.note} accent />
                  <Cell value={r.desk.v} note={r.desk.note} />
                  <Cell value={r.generic.v} note={r.generic.note} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-faint sm:hidden">
        ← Scroll to compare →
      </p>
    </section>
  );
}

function Cell({
  value,
  note,
  accent,
}: {
  value: string | true | false;
  note?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "border-l border-line/70 px-5 py-4 text-sm",
        accent ? "bg-emerald-soft/40" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        {value === true ? (
          <span className="grid size-5 place-items-center rounded-full bg-emerald text-[#06120e]">
            <CheckIcon />
          </span>
        ) : value === false ? (
          <span className="grid size-5 place-items-center rounded-full border border-line text-ink-faint">
            <DashIcon />
          </span>
        ) : (
          <span className="font-serif text-base text-ink">{value}</span>
        )}
      </div>
      {note && <div className="mt-1 text-xs text-ink-faint">{note}</div>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5l3.2 3L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
