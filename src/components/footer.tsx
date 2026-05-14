import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              Aria is the managed AI front desk for aesthetic clinics — voice, web, IG, no-show
              recovery, and reactivation, in one service.
            </p>
          </div>
          <FooterCol
            title="Product"
            links={[
              ["Live demo", "#demo"],
              ["ROI calculator", "#calculator"],
              ["How it works", "#how"],
              ["Pricing", "#pricing"],
            ]}
          />
          <FooterCol
            title="Clinics we serve"
            links={[
              ["Med spas", "#"],
              ["Cosmetic dental", "#"],
              ["Plastic surgery", "#"],
              ["Dermatology", "#"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["FAQ", "#faq"],
              ["Get an audit", "#audit"],
              ["Email us", "mailto:hello@aria.work"],
              ["LinkedIn", "#"],
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row">
          <span>© {new Date().getFullYear()} Aria Front Desk Systems. All rights reserved.</span>
          <span className="font-mono">Built for med spas in TX · FL · AZ · NV · SoCal · NY/NJ</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">{title}</div>
      <ul className="mt-4 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-ink-soft hover:text-ink">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
