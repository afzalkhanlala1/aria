type Node = {
  id: string;
  label: string;
  sub: string;
  col: 1 | 2 | 3 | 4;
  row: number;
  tone?: "input" | "core" | "output" | "data";
};

const NODES: Node[] = [
  // Inputs
  { id: "voice", label: "Voice", sub: "Twilio number", col: 1, row: 0, tone: "input" },
  { id: "web", label: "Web chat", sub: "Site widget", col: 1, row: 1, tone: "input" },
  { id: "ig", label: "Instagram", sub: "DM inbox", col: 1, row: 2, tone: "input" },
  { id: "sms", label: "SMS", sub: "Reactivation + reply", col: 1, row: 3, tone: "input" },

  // Core
  { id: "router", label: "Frontlea Router", sub: "Channel + intent", col: 2, row: 1, tone: "core" },
  { id: "rag", label: "RAG context", sub: "Menu · pricing · FAQs", col: 2, row: 2, tone: "data" },

  // Brain
  { id: "llm", label: "Reasoning core", sub: "GPT-5 · Claude Opus", col: 3, row: 1, tone: "core" },
  { id: "voice-ai", label: "Voice engine", sub: "ElevenLabs · Vapi", col: 3, row: 2, tone: "core" },

  // Outputs
  { id: "sched", label: "Scheduler", sub: "Boulevard / AR / Mangomint", col: 4, row: 0, tone: "output" },
  { id: "crm", label: "CRM", sub: "GoHighLevel · Klaviyo", col: 4, row: 1, tone: "output" },
  { id: "dash", label: "Owner dashboard", sub: "Live metrics + transcripts", col: 4, row: 2, tone: "output" },
  { id: "ops", label: "Human handoff", sub: "Your team · escalations", col: 4, row: 3, tone: "output" },
];

const EDGES: [string, string][] = [
  ["voice", "router"],
  ["web", "router"],
  ["ig", "router"],
  ["sms", "router"],
  ["router", "llm"],
  ["rag", "llm"],
  ["router", "voice-ai"],
  ["llm", "sched"],
  ["llm", "crm"],
  ["llm", "dash"],
  ["llm", "ops"],
  ["voice-ai", "ops"],
];

const COL_X = [60, 290, 540, 800];
const ROW_Y = [60, 160, 260, 360];
const NODE_W = 200;
const NODE_H = 76;

function nodeCenter(n: Node) {
  return {
    x: COL_X[n.col - 1] + NODE_W / 2,
    y: ROW_Y[n.row] + NODE_H / 2,
  };
}

const TONE_COLORS: Record<Required<Node>["tone"], { bg: string; ring: string; label: string }> = {
  input:  { bg: "fill-bg-elev",   ring: "stroke-line",   label: "fill-ink" },
  data:   { bg: "fill-bg-elev",   ring: "stroke-line",   label: "fill-ink" },
  core:   { bg: "fill-accent-bg", ring: "stroke-emerald",label: "fill-accent-fg" },
  output: { bg: "fill-bg-elev",   ring: "stroke-line",   label: "fill-ink" },
};

export function ArchitectureDiagram() {
  return (
    <section className="bg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="eyebrow">Under the hood</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              One graph from{" "}
              <em className="italic text-emerald">first touch to booked.</em>
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Every channel routes through the same brain. Same knowledge, same booking power,
              same handoff rules — whether a lead calls at 11am or DMs at 11pm.
            </p>
          </div>
          <div className="hidden gap-2 text-xs text-ink-faint sm:flex">
            <Legend dot="bg-line"     label="Input / output" />
            <Legend dot="bg-emerald"  label="Frontlea core" />
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-line bg-bg-elev/60">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(50%_50%_at_50%_50%,var(--halo)_0%,transparent_70%)]" />
          <div className="overflow-x-auto">
          <svg
            viewBox="0 0 1000 440"
            className="block min-w-[760px] w-full"
            role="img"
            aria-label="Frontlea architecture diagram"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0 0 L10 5 L0 10 z" className="fill-ink-faint" />
              </marker>
            </defs>

            {EDGES.map(([from, to]) => {
              const a = NODES.find((n) => n.id === from)!;
              const b = NODES.find((n) => n.id === to)!;
              const ac = nodeCenter(a);
              const bc = nodeCenter(b);
              const ax = ac.x + NODE_W / 2;
              const bx = bc.x - NODE_W / 2;
              const midX = (ax + bx) / 2;
              const d = `M ${ax} ${ac.y} C ${midX} ${ac.y}, ${midX} ${bc.y}, ${bx} ${bc.y}`;
              const isCore = a.tone === "core" || b.tone === "core";
              return (
                <path
                  key={`${from}-${to}`}
                  d={d}
                  className={isCore ? "stroke-emerald" : "stroke-line"}
                  strokeWidth={isCore ? 1.4 : 1}
                  fill="none"
                  markerEnd="url(#arrow)"
                  opacity={isCore ? 0.85 : 0.7}
                />
              );
            })}

            {NODES.map((n) => {
              const tone = TONE_COLORS[n.tone ?? "input"];
              const x = COL_X[n.col - 1];
              const y = ROW_Y[n.row];
              return (
                <g key={n.id}>
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={14}
                    className={`${tone.bg} ${tone.ring}`}
                    strokeWidth={1}
                  />
                  <text
                    x={x + 16}
                    y={y + 30}
                    className={`${tone.label} font-serif`}
                    style={{ fontSize: 18 }}
                  >
                    {n.label}
                  </text>
                  <text
                    x={x + 16}
                    y={y + 52}
                    className="fill-ink-faint font-mono"
                    style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    {n.sub}
                  </text>
                </g>
              );
            })}
          </svg>
          </div>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Spec label="Avg pickup" value="1.8s" />
          <Spec label="Booking confirmation" value="In-call SMS" />
          <Spec label="Failover" value="Vapi → Retell" />
          <Spec label="Storage" value="Zero-retention" />
        </ul>
      </div>
    </section>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/60 px-3 py-1.5">
      <span className={`size-1.5 rounded-full ${dot}`} />
      <span>{label}</span>
    </span>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded-2xl border border-line bg-bg-elev/60 p-4">
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl">{value}</div>
    </li>
  );
}
