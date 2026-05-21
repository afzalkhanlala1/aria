import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Security & HIPAA-aligned operations — Frontlea",
  description:
    "How Frontlea handles PHI, BAAs, encryption in transit/at rest, sub-processors, access controls, retention, and incident response — purpose-built for aesthetic and medical practices.",
  alternates: { canonical: "/compliance" },
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Sign a BAA before we touch PHI",
    body:
      "Frontlea operates under a written Business Associate Agreement with every clinic that handles PHI. We countersign before any go-live, with our sub-processors covered downstream.",
  },
  {
    n: "02",
    title: "Encrypt in transit and at rest",
    body:
      "TLS 1.2+ for every call to our API, voice provider, scheduler, and CRM. AES-256 at rest in our object store, KMS-managed keys, no plaintext PHI on disk anywhere we control.",
  },
  {
    n: "03",
    title: "Least-privilege access by design",
    body:
      "Per-clinic data is logically isolated. SSO + 2FA for all human access, with role-based scopes; auto-revocation when a build engagement ends. No shared logins.",
  },
  {
    n: "04",
    title: "Recordings & transcripts are scoped",
    body:
      "Voice recordings are disclosed at the start of the call, stored for 30 days by default, and purged on request. Transcripts redact obvious PHI before going into long-term storage.",
  },
  {
    n: "05",
    title: "Sub-processors are listed and audited",
    body:
      "We use SOC 2 / HITRUST-aligned vendors for compute, voice, telephony, and storage. The list is published below and updated within 14 days of any change.",
  },
  {
    n: "06",
    title: "Incident response is a phone call",
    body:
      "If we suspect unauthorized access, you hear from a human within 24 hours with the facts, scope, and a remediation plan — not a templated email three weeks later.",
  },
];

const SUBPROCESSORS = [
  ["OpenAI", "LLM (text)", "BAA on enterprise plans · zero-retention API"],
  ["Vapi", "Voice agent runtime", "BAA available · TLS"],
  ["Twilio", "Telephony", "HIPAA-eligible products under BAA"],
  ["ElevenLabs", "TTS", "Project-scoped · no training on inputs"],
  ["Vercel", "Hosting & functions", "BAA on Enterprise"],
  ["AWS / Cloudflare R2", "Object storage", "BAA · KMS · encrypted at rest"],
  ["Pinecone", "Vector retrieval (metadata only)", "BAA · regional pinning"],
];

const NOT_YET = [
  "SOC 2 Type II — independent audit kicking off Q3 2026 with Drata.",
  "HITRUST e1 — targeted Q1 2027 after the SOC 2 baseline is in.",
  "ISO 27001 — under evaluation; not committed to a date yet.",
];

const PROMISES = [
  "Plain-English BAA, no boilerplate hidden gotchas.",
  "Annotated data-flow diagram for your specific stack.",
  "Sub-processor list updated in writing as it changes.",
  "Quarterly access review with the clinic owner.",
];

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Security & compliance"
        title={
          <>
            Built for clinics that handle{" "}
            <em className="italic text-emerald">real patient data.</em>
          </>
        }
        intro={
          <>
            Frontlea is operated under written BAAs with HIPAA-eligible sub-processors, encrypted
            end-to-end, with logging that&apos;s actually auditable. This page tells you exactly what
            that means today — and what we&apos;re not claiming yet.
          </>
        }
        meta={
          <ul className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["BAA", "Mutual · signed before go-live"],
              ["Encryption", "TLS 1.2+ · AES-256 at rest"],
              ["PHI retention", "30 days default · clinic-configurable"],
              ["Incident SLA", "24-hour human notification"],
            ].map(([label, value]) => (
              <li key={label}>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                  {label}
                </div>
                <div className="mt-1 font-serif text-base text-ink">{value}</div>
              </li>
            ))}
          </ul>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <span className="eyebrow">Operating principles</span>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Six things we won&apos;t cut corners on,{" "}
          <em className="italic text-emerald">in writing.</em>
        </h2>
        <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p.n} className="bg-bg-elev p-6 lg:p-7">
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-emerald">
                {p.n}
              </div>
              <h3 className="mt-3 font-serif text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-bg-soft/40">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="eyebrow">Sub-processors</span>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Every vendor that could touch your data,{" "}
                <em className="italic text-emerald">named.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink-soft">
              Updated within 14 days of any change. Clinics on the maintenance plan get a
              notification email before changes go live.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-bg-elev">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-soft/60 text-[0.65rem] uppercase tracking-widest text-ink-faint">
                <tr>
                  <th className="px-5 py-3 font-mono">Vendor</th>
                  <th className="px-5 py-3 font-mono">Purpose</th>
                  <th className="px-5 py-3 font-mono">Posture</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map(([vendor, purpose, posture]) => (
                  <tr key={vendor} className="border-t border-line/60">
                    <td className="px-5 py-4 font-serif text-base text-ink">{vendor}</td>
                    <td className="px-5 py-4 text-ink-soft">{purpose}</td>
                    <td className="px-5 py-4 text-ink-soft">{posture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">What we&apos;re not claiming</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Honesty over{" "}
              <em className="italic text-emerald">badge collecting.</em>
            </h2>
            <p className="mt-5 text-ink-soft">
              We could buy a logo wall. We&apos;d rather tell you exactly where we are. These
              certifications are not in place today; here&apos;s the timeline.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-soft">
              {NOT_YET.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 rounded-full bg-rose" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">What you get in writing</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              On day one,{" "}
              <em className="italic text-emerald">before kickoff.</em>
            </h2>
            <p className="mt-5 text-ink-soft">
              Every clinic that signs gets a packet, signed by the founder, with the documents
              below — not a 40-page PDF, just what your IT or compliance team actually needs.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-soft">
              {PROMISES.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[0.3rem] text-emerald">›</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-accent-bg text-accent-fg">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center lg:px-10 lg:py-28">
          <span className="eyebrow text-accent-fg/70 justify-center">Have a security questionnaire?</span>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">
            Send it over.{" "}
            <em className="italic text-accent-emerald">We&apos;ll fill it out in 48 hours.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-accent-fg/75">
            Email{" "}
            <a className="underline decoration-accent-emerald/60 hover:decoration-accent-emerald" href="mailto:hello@frontlea.com">
              hello@frontlea.com
            </a>{" "}
            or text <a className="underline decoration-accent-emerald/60 hover:decoration-accent-emerald" href="tel:+18168599999">+1 (816) 859-9999</a>. Founder runs every response personally.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/audit" className="btn-primary">
              Book a compliance scoping call <span aria-hidden>→</span>
            </Link>
            <Link href="/faq" className="btn-ghost">
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
