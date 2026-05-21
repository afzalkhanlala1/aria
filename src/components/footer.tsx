import Link from "next/link";
import { Logo } from "./logo";

const PHONE = "+1 (816) 859-9999";
const PHONE_HREF = "tel:+18168599999";
const EMAIL = "hello@frontlea.com";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-soft/50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-ink-soft">
              Frontlea is the managed front desk for aesthetic clinics — voice, web, IG, no-show
              recovery, and reactivation, under one roof.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm">
              <a href={PHONE_HREF} className="font-serif text-xl text-ink hover:text-emerald">
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="text-ink-soft hover:text-emerald">
                {EMAIL}
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
              <span>Booking Q3 2026</span>
              <span aria-hidden>·</span>
              <span>v2.5</span>
            </div>
          </div>
          <FooterCol
            title="Service"
            links={[
              ["Live demo", "/demo"],
              ["How it works", "/how-it-works"],
              ["Pricing", "/pricing"],
              ["ROI calculator", "/roi"],
            ]}
          />
          <FooterCol
            title="Clinics we serve"
            links={[
              ["Med spas", "/customers"],
              ["Cosmetic dental", "/customers"],
              ["Plastic surgery", "/customers"],
              ["Dermatology", "/customers"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["Customers", "/customers"],
              ["FAQ", "/faq"],
              ["Security & HIPAA", "/compliance"],
              ["Free revenue audit", "/audit"],
              [EMAIL, `mailto:${EMAIL}`],
              [PHONE, PHONE_HREF],
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Frontlea Front Desk Co. · All rights reserved.</span>
          <span className="font-mono uppercase tracking-[0.22em]">
            Serving TX · FL · AZ · NV · SoCal · NY/NJ
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label + href}>
            <Link
              href={href}
              className="text-sm text-ink-soft transition-colors hover:text-emerald"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
