"use client";

import { useEffect, useState } from "react";

export function DashboardPreview() {
  const [calls, setCalls] = useState(287);
  const [booked, setBooked] = useState(168);
  const [recovered, setRecovered] = useState(38400);

  useEffect(() => {
    const id = setInterval(() => {
      setCalls((c) => c + (Math.random() > 0.4 ? 1 : 0));
      setBooked((b) => b + (Math.random() > 0.65 ? 1 : 0));
      setRecovered((r) => r + Math.floor(Math.random() * 380));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(13,15,14,0.25)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-bg-soft/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose/70" />
          <span className="size-2.5 rounded-full bg-gold/70" />
          <span className="size-2.5 rounded-full bg-emerald/70" />
        </div>
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
          aria · luxe aesthetics, austin
        </span>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-soft px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-emerald-deep">
          <span className="pulse-ring size-1.5 rounded-full bg-emerald" />
          Live
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-3 p-4 lg:p-5">
        <DashCard label="Calls answered" value={calls.toString()} delta="+12 today" />
        <DashCard label="Booked by Aria" value={booked.toString()} delta="59% conv." accent />
        <DashCard
          label="Revenue recovered"
          value={`$${recovered.toLocaleString()}`}
          delta="this month"
          wide
        />
      </div>

      {/* Live call ticker */}
      <div className="border-t border-line bg-bg-soft/40 px-4 py-3 lg:px-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
            Recent activity
          </span>
          <span className="font-mono text-[0.65rem] text-ink-faint">auto-refresh</span>
        </div>
        <ul className="space-y-1.5">
          <TickerRow
            time="11:42"
            who="+1 512 · · · 4801"
            what="Booked Lip Filler — Tue 3:30pm"
            tag="BOOKED"
          />
          <TickerRow
            time="11:39"
            who="Instagram DM"
            what="Sent pricing for Morpheus8 package"
            tag="ANSWERED"
          />
          <TickerRow
            time="11:31"
            who="+1 737 · · · 1120"
            what="Transferred to Dr. Patel — surgical inquiry"
            tag="TRANSFER"
          />
          <TickerRow
            time="11:18"
            who="Reactivation campaign"
            what="3 replies, 1 booking — Botox promo"
            tag="REVENUE"
          />
        </ul>
      </div>
    </div>
  );
}

function DashCard({
  label,
  value,
  delta,
  accent,
  wide,
}: {
  label: string;
  value: string;
  delta: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-line p-4 transition-colors",
        accent ? "bg-emerald-deep text-bg" : "bg-white",
        wide ? "col-span-2" : "",
      ].join(" ")}
    >
      <div
        className={`font-mono text-[0.65rem] uppercase tracking-widest ${
          accent ? "text-bg/60" : "text-ink-faint"
        }`}
      >
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-serif text-3xl leading-none">{value}</span>
        <span
          className={`text-xs ${accent ? "text-emerald-soft" : "text-ink-faint"}`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

function TickerRow({
  time,
  who,
  what,
  tag,
}: {
  time: string;
  who: string;
  what: string;
  tag: "BOOKED" | "ANSWERED" | "TRANSFER" | "REVENUE";
}) {
  const tagColor: Record<typeof tag, string> = {
    BOOKED: "bg-emerald-soft text-emerald-deep",
    ANSWERED: "bg-bg text-ink-soft border border-line",
    TRANSFER: "bg-rose/15 text-ink-soft border border-rose/30",
    REVENUE: "bg-gold/20 text-emerald-deep",
  };
  return (
    <li className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-bg/60">
      <span className="w-10 font-mono text-[0.7rem] text-ink-faint">{time}</span>
      <span className="w-36 truncate text-sm text-ink-soft">{who}</span>
      <span className="flex-1 truncate text-sm text-ink">{what}</span>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${tagColor[tag]}`}
      >
        {tag}
      </span>
    </li>
  );
}
