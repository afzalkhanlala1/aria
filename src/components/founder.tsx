import Image from "next/image";
import Link from "next/link";

const PHONE = "+1 (816) 859-9999";
const PHONE_HREF = "tel:+18168599999";
const EMAIL = "ariapersonalagent@gmail.com";

export function Founder() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-emerald/20 via-transparent to-rose/15 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-line bg-bg-elev shadow-[0_30px_80px_-30px_rgba(13,15,14,0.35)]">
              <Image
                src="/founder.png"
                alt="Afzal Khan — founder of Aria"
                width={320}
                height={400}
                priority
                className="size-[240px] object-cover sm:size-[300px] lg:size-[340px]"
              />
            </div>
            <span className="tag-live absolute -bottom-3 left-4">Founder · talks to every clinic</span>
          </div>

          <div className="max-w-2xl">
            <span className="eyebrow">Built by an operator, not a SaaS</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
              Hi — I&apos;m{" "}
              <em className="italic text-emerald">Afzal.</em>{" "}
              I run every Aria build personally.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Aria isn&apos;t a self-serve app you log into and figure out. It&apos;s a managed
              service. I sit with you on the audit call, build the voice and chat agents myself,
              tune them with your team for 14 days, and stay on your monthly review. If something
              breaks at 2am, you text me — not a ticket queue.
            </p>

            <ul className="mt-7 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-emerald" />
                Single owner, single point of contact
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-emerald" />
                Built &amp; maintained for &lt; 40 clinics by design
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-emerald" />
                Texts answered same hour during business days
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-emerald" />
                Monthly revenue review on Loom
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={PHONE_HREF} className="btn-primary text-sm">
                <PhoneIcon /> Call or text {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn-ghost text-sm">
                <MailIcon /> {EMAIL}
              </a>
              <Link href="/audit" className="text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink hover:decoration-emerald">
                Or just book the free audit →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4.5h2.78a1 1 0 0 1 .99.84l.66 4.06a1 1 0 0 1-.58 1.07l-1.57.74A8.5 8.5 0 0 0 12.8 17a1 1 0 0 0 1.07-.58l.74-1.57a1 1 0 0 1 1.07-.58l4.06.66a1 1 0 0 1 .84.99V18.7A1.7 1.7 0 0 1 18.88 20.4H17.5C10.6 20.4 5 14.8 5 7.9V6.2C5 5.42 5.42 5 6.2 5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
