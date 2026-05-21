import Link from "next/link";

type Teaser = {
  href: string;
  label: string;
  title: string;
  desc: string;
  meta?: string;
  icon: React.ReactNode;
};

const TEASERS: Teaser[] = [
  {
    href: "/demo",
    label: "Live demo",
    title: "Talk to Frontlea — right now.",
    desc:
      "Open the interactive sandbox. Ask anything a real patient would, watch her book scripted scenarios, and tour the live mission control.",
    meta: "3 interactive demos",
    icon: <DemoIcon />,
  },
  {
    href: "/how-it-works",
    label: "How it works",
    title: "From kickoff to first booked patient — in 14 days.",
    desc:
      "See the architecture, the integrations, and the four-stage rollout we run for every clinic. No black box.",
    meta: "Architecture · Integrations",
    icon: <BuildIcon />,
  },
  {
    href: "/roi",
    label: "ROI calculator",
    title: "See the number your front desk doesn't want you to see.",
    desc:
      "Move the sliders. We compute conservatively — typical clinics recover more than this in real deployments.",
    meta: "Live calculator",
    icon: <RoiIcon />,
  },
  {
    href: "/customers",
    label: "Customers",
    title: "Operator stories. Real numbers. Real receipts.",
    desc:
      "What renewing operators are seeing — month over month — across 36 deployments in TX, FL, AZ, NV, SoCal, NY/NJ.",
    meta: "36 active clinics",
    icon: <StarIcon />,
  },
];

export function RouteTeasers() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <span className="eyebrow">Pick your rabbit hole</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            One landing page won&apos;t do it justice.{" "}
            <em className="italic text-emerald">Go deeper.</em>
          </h2>
        </div>
        <p className="max-w-sm text-ink-soft">
          Each section below is its own page with the full story, demos, numbers and integrations.
        </p>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {TEASERS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="card group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 transition-all hover:-translate-y-0.5 hover:border-emerald"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-emerald/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-accent-bg text-accent-fg">
                  {t.icon}
                </div>
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-faint">
                  {t.meta}
                </span>
              </div>

              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                  {t.label}
                </div>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{t.title}</h3>
                <p className="mt-3 text-ink-soft">{t.desc}</p>
              </div>

              <div className="mt-auto flex items-center gap-2 text-sm text-ink-soft transition-colors group-hover:text-emerald">
                Explore {t.label.toLowerCase()}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DemoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4l14 8-14 8V4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RoiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 18V8m6 10V4m6 14v-7m6 7v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l2.6 5.4L20 9l-4 3.9.9 5.6L12 16l-4.9 2.6L8 12.9 4 9l5.4-.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
