"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * Inline Cal.com embed. The `link` defaults to the env var set in
 * `.env.local.example`. Owners flip it to their real Cal.com handle when ready.
 */
export function CalEmbed({
  link = process.env.NEXT_PUBLIC_CAL_LINK || "",
  height = 680,
}: {
  link?: string;
  height?: number;
}) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "aria-audit" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#b1431c",
            "cal-text": "#14110e",
            "cal-bg": "#ffffff",
          },
          dark: {
            "cal-brand": "#f5b97f",
            "cal-text": "#f4ecd9",
            "cal-bg": "#16162a",
          },
        },
      });
    })();
  }, []);

  if (!link) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-bg-soft/40 p-8 text-sm text-ink-soft">
        <strong className="text-ink">Cal.com booking</strong> — set{" "}
        <code className="rounded bg-bg-elev px-1.5 py-0.5 font-mono text-xs">
          NEXT_PUBLIC_CAL_LINK
        </code>{" "}
        in <code className="font-mono">.env.local</code> (e.g.{" "}
        <code className="font-mono">yourhandle/15min</code>) to enable inline booking.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-bg-elev shadow-[0_24px_60px_-30px_rgba(13,15,14,0.3)]">
      <Cal
        namespace="aria-audit"
        calLink={link}
        style={{ width: "100%", height, overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
