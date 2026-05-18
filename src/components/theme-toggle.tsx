"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "group inline-flex h-9 items-center gap-1 rounded-full border border-line bg-bg-elev/60 p-1 text-[0.62rem] uppercase tracking-widest text-ink-faint backdrop-blur-md transition-colors hover:border-ink-soft",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "flex h-7 items-center gap-1.5 rounded-full px-2.5 transition-all",
          !isDark
            ? "bg-ink text-bg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)]"
            : "text-ink-faint",
        ].join(" ")}
      >
        <SunIcon />
        <span className="font-mono">L</span>
      </span>
      <span
        className={[
          "flex h-7 items-center gap-1.5 rounded-full px-2.5 transition-all",
          isDark
            ? "bg-emerald text-[#06120e] shadow-[0_0_0_1px_var(--emerald)] dark:shadow-[0_0_18px_-4px_var(--emerald-glow)]"
            : "text-ink-faint",
        ].join(" ")}
      >
        <MoonIcon />
        <span className="font-mono">D</span>
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 1.5v1.5M8 13v1.5M14.5 8H13M3 8H1.5M12.6 3.4l-1 1M4.4 11.6l-1 1M12.6 12.6l-1-1M4.4 4.4l-1-1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
