"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * "Try Aria on your site" — URL → /api/aria/build-demo → /demo/c/[demoId].
 *
 * Designed for the hero, but works inline anywhere. Forgives users dropping
 * "clinicname.com" without protocol — we prepend https://.
 */
export function UrlDemo({
  size = "lg",
  hint = "Free · ~15 seconds · no signup",
}: {
  size?: "lg" | "md";
  hint?: string;
}) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<null | "fetching" | "thinking" | "building">(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    let value = url.trim();
    if (!value) return;
    if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
    setSubmitting(true);
    setError(null);
    setStage("fetching");

    // Tiny visual progression so the wait feels intentional, not broken.
    const stageTimer1 = window.setTimeout(() => setStage("thinking"), 2500);
    const stageTimer2 = window.setTimeout(() => setStage("building"), 5500);

    try {
      const res = await fetch("/api/aria/build-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = (await res.json()) as
        | { demoId: string; profile: { brandName: string } }
        | { error: string; detail?: string };

      window.clearTimeout(stageTimer1);
      window.clearTimeout(stageTimer2);

      if (!res.ok || "error" in data) {
        const detail = "detail" in data && data.detail ? data.detail : "Couldn't build a demo for that URL.";
        setError(detail);
        setStage(null);
        setSubmitting(false);
        return;
      }
      router.push(`/demo/c/${data.demoId}`);
    } catch (err) {
      window.clearTimeout(stageTimer1);
      window.clearTimeout(stageTimer2);
      setError(err instanceof Error ? err.message : "Network error.");
      setStage(null);
      setSubmitting(false);
    }
  }

  const big = size === "lg";

  return (
    <div className="w-full">
      <form
        onSubmit={submit}
        className={[
          "group flex w-full items-stretch overflow-hidden rounded-full border bg-bg-elev shadow-[0_6px_24px_-12px_rgba(177,67,28,0.35)] transition-all",
          submitting ? "border-emerald" : "border-line focus-within:border-emerald hover:border-emerald/60",
        ].join(" ")}
      >
        <div className="grid shrink-0 place-items-center pl-4 pr-2 text-emerald sm:pl-5">
          <GlobeIcon />
        </div>
        <input
          type="url"
          inputMode="url"
          autoComplete="off"
          required
          disabled={submitting}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your-clinic.com"
          className={[
            "flex-1 bg-transparent text-ink placeholder:text-ink-faint outline-none",
            big ? "py-4 text-base sm:text-lg" : "py-3 text-sm",
          ].join(" ")}
          aria-label="Your clinic website URL"
        />
        <button
          type="submit"
          disabled={submitting}
          className={[
            "btn-primary m-1.5 shrink-0 whitespace-nowrap",
            big ? "px-5 text-sm sm:px-6 sm:text-base" : "px-4 text-xs",
            "disabled:cursor-not-allowed disabled:opacity-90",
          ].join(" ")}
        >
          {submitting ? (
            <>
              <Spinner />
              {stage === "fetching"
                ? "Reading site…"
                : stage === "thinking"
                  ? "Learning your menu…"
                  : "Building Aria…"}
            </>
          ) : (
            <>
              Build my demo <span aria-hidden>→</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-2.5 flex items-center justify-between gap-3 px-1 text-xs">
        <span className="font-mono text-ink-faint">{hint}</span>
        {error ? (
          <span className="font-mono text-danger" role="alert">
            {error}
          </span>
        ) : (
          <span className="font-mono text-ink-faint">Powered by gpt-4o-mini</span>
        )}
      </div>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="size-3.5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
