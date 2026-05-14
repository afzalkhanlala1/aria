import Link from "next/link";
import { Logo } from "./logo";

const links = [
  { href: "#demo", label: "Live demo" },
  { href: "#calculator", label: "ROI" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
        <Link href="/" className="text-ink hover:opacity-80">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#audit" className="btn-primary text-sm">
            Free revenue audit
            <span aria-hidden>→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
