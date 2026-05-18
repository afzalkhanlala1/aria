"use client";

import { useEffect, useRef, useState } from "react";

type Channel = "voice" | "dm" | "sms" | "web";
type EventKind = "booked" | "answered" | "transferred" | "reactivated" | "no_show_recovered";

type LiveEvent = {
  id: number;
  ts: string;
  channel: Channel;
  source: string;
  what: string;
  kind: EventKind;
  value?: number;
};

const SOURCES_VOICE = [
  "+1 512 ··· 4801",
  "+1 737 ··· 1120",
  "+1 480 ··· 9013",
  "+1 305 ··· 2278",
  "+1 949 ··· 0162",
];
const SOURCES_DM = ["@meganrhys", "@_aileenk", "@dr.patel.luxe", "@cosmetic.fl", "@kj_aesthetics"];

const SAMPLE_EVENTS: Omit<LiveEvent, "id" | "ts">[] = [
  { channel: "voice", source: SOURCES_VOICE[0], what: "Booked — Botox 25u · Thu 3:30pm", kind: "booked", value: 540 },
  { channel: "dm",    source: SOURCES_DM[0],    what: "Answered — Morpheus8 pricing", kind: "answered" },
  { channel: "voice", source: SOURCES_VOICE[1], what: "Booked — Lip filler consult · Fri 11am", kind: "booked", value: 1100 },
  { channel: "sms",   source: "Reactivation #42", what: "Booked — Hydrafacial · Mon 5pm", kind: "reactivated", value: 280 },
  { channel: "voice", source: SOURCES_VOICE[2], what: "Transferred — surgical inquiry → Dr. Patel", kind: "transferred" },
  { channel: "web",   source: "luxeaesth.co",   what: "Booked — Microneedling consult", kind: "booked", value: 320 },
  { channel: "voice", source: SOURCES_VOICE[3], what: "Recovered no-show — rebooked Sat 1pm", kind: "no_show_recovered", value: 850 },
  { channel: "dm",    source: SOURCES_DM[1],    what: "Booked — Holiday Morpheus8 pkg · Sat 2pm", kind: "booked", value: 2100 },
  { channel: "voice", source: SOURCES_VOICE[4], what: "Answered — pre-op questions about CoolSculpting", kind: "answered" },
  { channel: "sms",   source: "Reactivation #43", what: "Booked — Botox refresh · Wed 10am", kind: "reactivated", value: 540 },
  { channel: "voice", source: SOURCES_VOICE[0], what: "Booked — Consult Dr. Patel · Thu 4pm", kind: "booked", value: 0 },
  { channel: "dm",    source: SOURCES_DM[2],    what: "Answered — financing & CareCredit", kind: "answered" },
];

const KIND_TAG: Record<EventKind, { label: string; cls: string }> = {
  booked:             { label: "BOOKED",       cls: "bg-emerald-soft text-emerald" },
  answered:           { label: "ANSWERED",     cls: "bg-bg-soft text-ink-soft border border-line" },
  transferred:        { label: "TRANSFER",     cls: "bg-rose/15 text-ink-soft border border-rose/30" },
  reactivated:        { label: "REACTIVATED",  cls: "bg-gold/15 text-emerald" },
  no_show_recovered:  { label: "NO-SHOW RCVD", cls: "bg-emerald/15 text-emerald" },
};

const CHANNEL_ICON: Record<Channel, React.ReactNode> = {
  voice: <PhoneIconMini />,
  dm:    <DmIconMini />,
  sms:   <SmsIconMini />,
  web:   <WebIconMini />,
};

function ts() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
}

export function MissionControl() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [running, setRunning] = useState(true);
  const [totals, setTotals] = useState({ answered: 0, booked: 0, revenue: 0, simultaneous: 0 });
  const counter = useRef(0);
  const live = useRef<{ kind: Channel; until: number }[]>([]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      const sample = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
      counter.current += 1;
      const next: LiveEvent = { ...sample, id: counter.current, ts: ts() };

      const now = Date.now();
      live.current = live.current.filter((c) => c.until > now);
      const dur = next.channel === "voice" ? 4200 : 2400;
      live.current.push({ kind: next.channel, until: now + dur });

      setEvents((prev) => [next, ...prev].slice(0, 24));
      setTotals((t) => ({
        answered: t.answered + 1,
        booked:
          t.booked +
          (next.kind === "booked" || next.kind === "reactivated" || next.kind === "no_show_recovered" ? 1 : 0),
        revenue: t.revenue + (next.value ?? 0),
        simultaneous: live.current.length,
      }));
    }, 1900);
    return () => window.clearInterval(interval);
  }, [running]);

  // initial seed so the dashboard isn't empty on first render
  useEffect(() => {
    const seed: LiveEvent[] = SAMPLE_EVENTS.slice(0, 6).map((e, i) => ({
      ...e,
      id: -i - 1,
      ts: ts(),
    }));
    setEvents(seed);
    setTotals({
      answered: 6,
      booked: 3,
      revenue: 2820,
      simultaneous: 2,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-line bg-bg-soft/70 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="tag-live">Mission Control</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
            aria · luxe aesthetics · austin
          </span>
        </div>
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-full border border-line bg-bg-elev/60 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft hover:border-ink-soft"
        >
          {running ? "Pause feed" : "Resume feed"}
        </button>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-4">
        <Metric label="Conversations · today" value={totals.answered} sub="all channels" />
        <Metric label="Booked by Aria" value={totals.booked} sub="incl. reactivation" accent />
        <Metric
          label="Revenue captured"
          value={`$${totals.revenue.toLocaleString()}`}
          sub="rolling 24h"
        />
        <Metric
          label="Concurrent now"
          value={totals.simultaneous}
          sub="voice + chat"
          live
        />
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[2fr_1fr]">
        <div className="bg-bg-elev/60">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
              Live feed
            </span>
            <span className="font-mono text-[0.65rem] text-ink-faint">most recent first</span>
          </div>
          <ul className="relative max-h-[440px] overflow-hidden">
            {running && (
              <span
                aria-hidden
                className="scan-line pointer-events-none absolute inset-x-0 z-10 h-12 bg-gradient-to-b from-transparent via-emerald/8 to-transparent"
              />
            )}
            {events.map((e) => (
              <li
                key={e.id}
                className="rise flex items-center gap-3 border-b border-line/60 px-4 py-2.5 last:border-b-0 sm:px-5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-line text-ink-soft">
                  {CHANNEL_ICON[e.channel]}
                </span>
                <span className="hidden w-16 shrink-0 font-mono text-[0.65rem] text-ink-faint sm:inline">
                  {e.ts}
                </span>
                <span className="hidden w-44 shrink-0 truncate font-mono text-xs text-ink-soft md:inline">
                  {e.source}
                </span>
                <span className="flex-1 truncate text-sm">{e.what}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${KIND_TAG[e.kind].cls}`}
                >
                  {KIND_TAG[e.kind].label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-bg-soft/40">
          <div className="border-b border-line px-5 py-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
              Channel mix
            </span>
          </div>
          <div className="space-y-4 px-5 py-5">
            <ChannelBar label="Voice" value={62} icon={<PhoneIconMini />} />
            <ChannelBar label="Instagram DM" value={22} icon={<DmIconMini />} />
            <ChannelBar label="Web chat" value={9} icon={<WebIconMini />} />
            <ChannelBar label="SMS reactivation" value={7} icon={<SmsIconMini />} />
          </div>
          <div className="mx-5 mb-5 rounded-2xl border border-dashed border-line bg-bg-elev/40 p-4 text-xs text-ink-soft">
            <strong className="text-ink">What this is:</strong> the live feed your owner sees
            inside the Aria console — each event is something Aria handled in real time, so you can
            audit transcripts in one click.
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  accent,
  live,
}: {
  label: string;
  value: number | string;
  sub: string;
  accent?: boolean;
  live?: boolean;
}) {
  return (
    <div
      className={[
        "px-5 py-5",
        accent ? "bg-accent-bg text-accent-fg" : "bg-bg-elev/60",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-widest",
          accent ? "text-accent-fg/60" : "text-ink-faint",
        ].join(" ")}
      >
        <span>{label}</span>
        {live && <span className="tag-live">live</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-serif text-3xl leading-none">{value}</span>
        <span
          className={[
            "text-xs",
            accent ? "text-accent-fg/60" : "text-ink-faint",
          ].join(" ")}
        >
          {sub}
        </span>
      </div>
    </div>
  );
}

function ChannelBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-md border border-line text-ink-soft">
            {icon}
          </span>
          {label}
        </span>
        <span className="font-mono text-xs text-ink-faint">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg-elev">
        <div
          className="h-full bg-emerald transition-all"
          style={{ width: `${value}%`, boxShadow: "0 0 18px var(--emerald-glow)" }}
        />
      </div>
    </div>
  );
}

function PhoneIconMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 3a.7.7 0 0 1 .7-.7h1.6c.36 0 .67.26.73.62l.38 2.27a.7.7 0 0 1-.38.74L5.5 6.5a6 6 0 0 0 3.99 4l.57-1.04a.7.7 0 0 1 .74-.38l2.27.38c.36.06.62.37.62.73v1.6a.7.7 0 0 1-.7.7h-1.6C7.05 13 3 9 3 3.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DmIconMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 11l3.5-6 2.5 3.5L13 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmsIconMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 4.5C3 3.67 3.67 3 4.5 3h7C12.33 3 13 3.67 13 4.5v5c0 .83-.67 1.5-1.5 1.5H6l-3 2.5v-9z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WebIconMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 8h11M8 2.5c2 2 2 9 0 11M8 2.5c-2 2-2 9 0 11" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
