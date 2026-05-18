import Link from "next/link";
import { DashboardPreview } from "./dashboard";
import { UrlDemo } from "./url-demo";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mesh absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <span className="chip">
              <span className="size-1.5 rounded-full bg-emerald" />
              Now booking Q3 clinics — Texas, FL, AZ
            </span>

            <h1 className="mt-7 font-serif text-[2rem] leading-[1.06] tracking-tight sm:text-[3rem] lg:text-[4.2rem]">
              The AI front desk{" "}
              <span className="hidden lg:inline">
                <br />
              </span>
              that turns missed calls{" "}
              <span className="hidden sm:inline">
                <br />
              </span>
              into{" "}
              <em className="italic text-emerald">booked appointments.</em>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-soft">
              Aria answers every call, DM and after-hours lead for your clinic in your brand voice —
              qualifies them, books them into Boulevard, Aesthetic Record or Mangomint, and texts a
              confirmation while they&apos;re still on the line. Done-for-you. No new hires.
            </p>

            <div className="mt-8">
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald">
                ↳ Try Aria trained on YOUR site
              </div>
              <div className="mt-2.5">
                <UrlDemo />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/audit" className="btn-ghost">
                Or get a free revenue audit
                <span aria-hidden>→</span>
              </Link>
              <Link href="/demo" className="text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink hover:decoration-emerald">
                <PlayIcon /> Watch the sandbox demo
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6 text-sm">
              <Stat value="24/7" label="Calls answered" />
              <Stat value="<3s" label="Pickup time" />
              <Stat value="40%+" label="Avg. lead recovery" />
            </ul>
          </div>

          <div className="relative min-w-0">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald/10 via-transparent to-rose/10 blur-2xl" />
            <DashboardPreview />
          </div>
        </div>
      </div>

      <TrustStrip />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <li>
      <div className="font-serif text-2xl text-ink">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">{label}</div>
    </li>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 3l9 5-9 5V3z" fill="currentColor" />
    </svg>
  );
}

const integrations = [
  "Boulevard",
  "Aesthetic Record",
  "Mangomint",
  "Mindbody",
  "Symplast",
  "GoHighLevel",
  "Vapi",
  "Retell AI",
  "ElevenLabs",
  "Twilio",
  "Make.com",
  "Pinecone",
];

function TrustStrip() {
  return (
    <div className="border-y border-line/60 bg-bg-soft/60">
      <div className="mx-auto max-w-7xl overflow-hidden px-5 py-5 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-ink-faint">
            Integrates with
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-bg-soft to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-bg-soft to-transparent"
              aria-hidden
            />
            <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
              {[...integrations, ...integrations].map((name, i) => (
                <span
                  key={i}
                  className="font-serif text-lg text-ink-soft/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
