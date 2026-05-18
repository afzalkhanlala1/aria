import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { PageHeader } from "@/components/page-header";
import { AskAria } from "@/components/ask-aria";
import type { ClinicProfile } from "@/lib/demo-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type DemoResponse = {
  demoId: string;
  profile: ClinicProfile;
  createdAt: number;
};

async function fetchDemo(demoId: string): Promise<DemoResponse | null> {
  // Build an absolute URL from the incoming request so this works in dev,
  // preview, and prod without an env var.
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const res = await fetch(`${proto}://${host}/api/aria/demo/${encodeURIComponent(demoId)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as DemoResponse;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ demoId: string }>;
}): Promise<Metadata> {
  const { demoId } = await params;
  const data = await fetchDemo(demoId);
  if (!data) return { title: "Demo expired — Aria" };
  return {
    title: `Custom Aria for ${data.profile.brandName}`,
    description: `Try Aria — the AI front desk — trained on ${data.profile.brandName}'s public website. Ask anything a real patient would.`,
    robots: { index: false, follow: false }, // per-clinic demo URLs shouldn't be indexed
  };
}

export default async function CustomDemoPage({
  params,
}: {
  params: Promise<{ demoId: string }>;
}) {
  const { demoId } = await params;
  const data = await fetchDemo(demoId);
  if (!data) return notFound();
  const { profile } = data;
  const location = [profile.city, profile.state].filter(Boolean).join(", ");

  // Pick clinic-specific quick prompts from their actual services + a few staples.
  const serviceNames = profile.services.slice(0, 3).map((s) => s.name);
  const quick = [
    ...serviceNames.map((n) => `How much is ${n.toLowerCase()}?`),
    "Do you have anything tomorrow?",
    "Is this AI? I want a human.",
    "Where are you located?",
    "What's the cancellation policy?",
  ].slice(0, 7);

  return (
    <>
      <PageHeader
        eyebrow={`Custom demo · ${profile.industry}`}
        title={
          <>
            Meet{" "}
            <em className="italic text-emerald">Aria for {profile.brandName}.</em>
          </>
        }
        intro={
          <>
            We just read{" "}
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-emerald/40 underline-offset-4 hover:decoration-emerald"
            >
              {new URL(profile.website).hostname}
            </a>{" "}
            and trained an AI front desk on what we found. Ask her anything a real{" "}
            {location ? `${location} ` : ""}patient would.
          </>
        }
        meta={
          <ul className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <Stat label="Services found" value={profile.services.length.toString()} />
            <Stat label="Providers" value={profile.providers.length.toString()} />
            <Stat label="Tone" value={profile.tone} />
            <Stat label="Location" value={location || "—"} />
          </ul>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <AskAria
          demoId={demoId}
          brandName={profile.brandName}
          quickPrompts={quick}
          intro={{
            eyebrow: `Sandbox · trained on ${new URL(profile.website).hostname}`,
            heading: (
              <>
                Aria, for{" "}
                <em className="italic text-emerald">{profile.brandName}.</em>
              </>
            ),
            body: (
              <>
                <p>
                  This Aria knows what your website says — services, providers, hours, brand voice.
                  She{`'`}ll flag anything missing (we found{" "}
                  <strong className="text-ink">
                    {profile.knownGaps.length} gap{profile.knownGaps.length === 1 ? "" : "s"}
                  </strong>{" "}
                  on the site).
                </p>
                {profile.knownGaps.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                    {profile.knownGaps.slice(0, 4).map((g) => (
                      <li key={g} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 rounded-full bg-rose" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ),
          }}
        />
      </section>

      <section className="border-t border-line bg-bg-soft/50">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="eyebrow">Want this live for {profile.brandName}?</span>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Same AI, but{" "}
                <em className="italic text-emerald">connected to your scheduler.</em>
              </h2>
              <p className="mt-4 text-ink-soft">
                In the 14-day build we replace this public sandbox with a managed deployment —
                voice + DM + web, plugged into Boulevard / Aesthetic Record / Mangomint, ringing
                your real phone number, and audited weekly. The free revenue audit shows you the
                exact dollars sitting on the table today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/audit" className="btn-primary">
                Get my free audit <span aria-hidden>→</span>
              </Link>
              <Link href="/pricing" className="btn-ghost">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-serif text-base capitalize text-ink">{value}</div>
    </li>
  );
}
