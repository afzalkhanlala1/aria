"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/demo", label: "Live demo" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/roi", label: "ROI" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
  { href: "/compliance", label: "Security" },
  { href: "/faq", label: "FAQ" },
];

const PHONE = "+1 (816) 859-9999";
const PHONE_HREF = "tel:+18168599999";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-line/80 bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-bg/40 backdrop-blur-md",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
        <Link href="/" className="text-ink transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={[
                    "relative inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink",
                  ].join(" ")}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-[19px] h-px bg-emerald"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint transition-colors hover:text-emerald xl:inline-flex"
          >
            {PHONE}
          </a>
          <div className="hidden md:inline-flex">
            <ThemeToggle />
          </div>
          <div className="hidden md:inline-flex">
            <Link href="/audit" className="btn-primary text-sm">
              Free revenue audit
              <span aria-hidden>→</span>
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 4.5h12M2 8h12M2 11.5h12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line/60 bg-bg/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-2.5 text-base transition-colors",
                      active
                        ? "bg-bg-soft text-ink"
                        : "text-ink-soft hover:bg-bg-soft hover:text-ink",
                    ].join(" ")}
                  >
                    {l.label}
                    <span aria-hidden className="text-ink-faint">→</span>
                  </Link>
                </li>
              );
            })}
            <li className="mt-3 flex flex-col gap-3 border-t border-line/60 px-3 pt-4">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-between rounded-xl px-1 text-sm text-ink-soft"
              >
                <span>Call or text</span>
                <span className="font-serif text-base text-ink">{PHONE}</span>
              </a>
              <div className="flex items-center justify-between gap-3">
                <ThemeToggle />
                <Link href="/audit" className="btn-primary text-sm">
                  Free revenue audit
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
