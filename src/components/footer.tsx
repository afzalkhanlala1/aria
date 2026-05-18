import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-ink-soft">
              Aria is the managed AI front desk for aesthetic clinics — voice, web, IG, no-show
              recovery, and reactivation, in one service.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="tag-live">Booking Q3 2026</span>
              <span className="kbd">v2.4</span>
            </div>
          </div>
          <FooterCol
            title="Product"
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
              ["Free revenue audit", "/audit"],
              ["hello@aria.work", "mailto:hello@aria.work"],
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Aria Front Desk Systems · All rights reserved.</span>
          <span className="font-mono">
            <span className="text-emerald">●</span> live · TX · FL · AZ · NV · SoCal · NY/NJ
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
