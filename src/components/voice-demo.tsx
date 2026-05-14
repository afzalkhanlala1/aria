"use client";

import { useEffect, useRef, useState } from "react";

type Turn = {
  who: "caller" | "aria";
  text: string;
  /** ms after previous turn before this one shows */
  delay: number;
};

const SCRIPT: Record<"new" | "after-hours" | "reschedule", Turn[]> = {
  new: [
    { who: "aria", text: "Thank you for calling Luxe Aesthetics, this is Aria. How can I help you today?", delay: 600 },
    { who: "caller", text: "Hi, I was wondering how much you charge for Botox?", delay: 1800 },
    { who: "aria", text: "Of course — our Botox starts at $13 per unit, with most patients using between 20 and 40 units. Are you new to Luxe, or have you been with us before?", delay: 1600 },
    { who: "caller", text: "I'm new. I'd love to try it for my forehead lines.", delay: 1500 },
    { who: "aria", text: "Wonderful. Most first-time forehead treatments are between 20 and 30 units. I have a complimentary consultation with Dr. Patel this Thursday at 3:30pm, or Friday at 11am — which works better?", delay: 1700 },
    { who: "caller", text: "Thursday at 3:30 works.", delay: 1200 },
    { who: "aria", text: "Perfect, I'm holding Thursday at 3:30pm with Dr. Patel. Can I grab your full name and a mobile number for the confirmation text?", delay: 1500 },
    { who: "caller", text: "Sarah Reeves, 512-555-4801.", delay: 1400 },
    { who: "aria", text: "Booked. You'll get a text right now with the appointment and our pre-care checklist. We'll see you Thursday, Sarah!", delay: 1500 },
  ],
  "after-hours": [
    { who: "aria", text: "Thanks for calling Luxe Aesthetics — we're closed for the evening, but I can help you book right now. What were you hoping to learn about?", delay: 700 },
    { who: "caller", text: "I saw your Morpheus8 special on Instagram, can I get info?", delay: 1700 },
    { who: "aria", text: "Yes! Our holiday Morpheus8 package is three sessions for $2,100 — typically $2,700. Is this for face, neck, or both?", delay: 1600 },
    { who: "caller", text: "Face and neck.", delay: 1100 },
    { who: "aria", text: "Lovely. I have a complimentary consultation tomorrow at 10am with Dr. Patel, or Saturday at 1pm. Which works?", delay: 1500 },
    { who: "caller", text: "Saturday 1pm.", delay: 1000 },
    { who: "aria", text: "Booked. Sending confirmation by text and email now. See you Saturday!", delay: 1300 },
  ],
  reschedule: [
    { who: "aria", text: "Hi Sarah, this is Aria from Luxe Aesthetics — I'm calling because we missed you for your 3:30 today. I'd love to help you reschedule. Is now a good time?", delay: 700 },
    { who: "caller", text: "Oh shoot, I totally forgot. Yes, I want to reschedule.", delay: 1700 },
    { who: "aria", text: "No problem — these things happen. I have Friday at 11am or Monday at 2pm with Dr. Patel. Any preference?", delay: 1500 },
    { who: "caller", text: "Friday 11am.", delay: 1000 },
    { who: "aria", text: "Done. You'll get a fresh confirmation text, plus a friendly reminder the day before. Thanks Sarah, see you Friday.", delay: 1500 },
  ],
};

const SCENARIOS: { id: keyof typeof SCRIPT; label: string; sub: string }[] = [
  { id: "new", label: "New patient inquiry", sub: "9:42 AM · Tuesday" },
  { id: "after-hours", label: "After‑hours booking", sub: "10:18 PM · Friday" },
  { id: "reschedule", label: "No‑show recovery", sub: "30 min after missed appt" },
];

export function VoiceDemo() {
  const [scenarioId, setScenarioId] = useState<keyof typeof SCRIPT>("new");
  const [playing, setPlaying] = useState(false);
  const [turnsShown, setTurnsShown] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const script = SCRIPT[scenarioId];

  function reset() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    setTurnsShown(0);
    setElapsed(0);
    setPlaying(false);
  }

  function start() {
    reset();
    setPlaying(true);
    setTurnsShown(0);

    let cumulative = 0;
    script.forEach((turn, i) => {
      cumulative += turn.delay;
      const id = window.setTimeout(() => {
        setTurnsShown(i + 1);
        if (i === script.length - 1) {
          window.setTimeout(() => setPlaying(false), 1200);
        }
      }, cumulative);
      if (i === 0) timerRef.current = id;
    });

    tickRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
  }

  useEffect(() => {
    if (!playing && tickRef.current) {
      window.clearInterval(tickRef.current);
    }
  }, [playing]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [turnsShown]);

  useEffect(() => () => reset(), []);

  const visible = script.slice(0, turnsShown);
  const lastTurn = visible[visible.length - 1];
  const booked = !playing && turnsShown === script.length;

  const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const seconds = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
      {/* Phone UI */}
      <div className="card relative overflow-hidden rounded-3xl">
        <div className="border-b border-line bg-bg-soft/70 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-emerald" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-soft">
              Incoming call · {SCENARIOS.find((s) => s.id === scenarioId)?.sub}
            </span>
          </div>
          <span className="font-mono text-[0.7rem] text-ink-faint">
            {minutes}:{seconds}
          </span>
        </div>

        <div className="flex items-center gap-4 border-b border-line px-5 py-5">
          <div className="relative">
            <div className="grid size-14 place-items-center rounded-full bg-emerald-deep text-bg shadow-inner">
              <PhoneIcon />
            </div>
            {playing && (
              <span className="pulse-ring absolute inset-0 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-serif text-xl">Aria · Luxe Aesthetics</div>
            <div className="text-sm text-ink-faint">
              Voice: <span className="text-ink-soft">"Rachel" — warm female, US</span>
            </div>
          </div>
          <Waveform active={playing} />
        </div>

        {/* Transcript */}
        <div
          ref={transcriptRef}
          className="max-h-[420px] min-h-[300px] space-y-3 overflow-y-auto px-5 py-5"
        >
          {visible.length === 0 && !playing && (
            <div className="grid h-full place-items-center pt-10 text-center text-ink-faint">
              <div>
                <p className="font-serif text-2xl text-ink">Press start to hear Aria handle a real scenario.</p>
                <p className="mt-2 text-sm">No download required. This is the actual logic and tone deployed for clients.</p>
              </div>
            </div>
          )}

          {visible.map((t, i) => (
            <TranscriptBubble key={i} turn={t} />
          ))}

          {playing && lastTurn && lastTurn.who === "caller" && turnsShown < script.length && (
            <TypingBubble who="aria" />
          )}
          {playing && lastTurn && lastTurn.who === "aria" && turnsShown < script.length && (
            <TypingBubble who="caller" subtle />
          )}

          {booked && (
            <div className="rise mt-3 rounded-2xl border border-emerald-soft bg-emerald-soft/60 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-emerald-deep">
                <CheckIcon /> Confirmation sent
              </div>
              <div className="mt-2 text-sm text-emerald-deep">
                <strong>SMS to caller:</strong> Hi Sarah! Confirmed: <em>Thu, Mar 14 · 3:30 PM</em> with Dr. Patel at Luxe Aesthetics. Pre-care:{" "}
                <a className="underline">luxeaesth.co/prep</a> · Reply C to cancel.
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg-soft/50 px-5 py-4">
          <div className="text-xs text-ink-faint">
            Real Aria deployments answer in 1.8s avg · ElevenLabs voice + Vapi orchestration
          </div>
          <button
            onClick={playing ? reset : start}
            className="btn-primary text-sm"
            aria-label={playing ? "Stop demo" : "Start demo"}
          >
            {playing ? "Stop" : booked ? "Replay" : "Start the call"}
            <span aria-hidden>{playing ? "■" : "▸"}</span>
          </button>
        </div>
      </div>

      {/* Side controls */}
      <div className="flex flex-col gap-4">
        <h3 className="font-serif text-2xl leading-tight">
          Pick a scenario. Watch Aria book the appointment.
        </h3>
        <p className="text-ink-soft">
          Each scenario reflects an actual flow we deploy — including knowledge of your menu, pricing, providers and after‑hours protocol.
        </p>
        <ul className="space-y-2">
          {SCENARIOS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => {
                  setScenarioId(s.id);
                  reset();
                }}
                className={[
                  "w-full text-left rounded-2xl border px-4 py-3 transition-all",
                  scenarioId === s.id
                    ? "border-ink bg-white shadow-sm"
                    : "border-line bg-white/60 hover:border-ink-faint hover:bg-white",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{s.label}</span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                    {s.sub}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2 rounded-2xl border border-dashed border-line bg-bg-soft/50 p-4 text-sm text-ink-soft">
          <strong className="text-ink">Want your own scenario?</strong> On the free audit call we&apos;ll build a demo using your exact treatment menu and brand voice.
        </div>
      </div>
    </div>
  );
}

function TranscriptBubble({ turn }: { turn: Turn }) {
  const isAria = turn.who === "aria";
  return (
    <div className={`rise flex ${isAria ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[85%]">
        <div
          className={`mb-1 font-mono text-[0.65rem] uppercase tracking-widest ${
            isAria ? "text-emerald-deep" : "text-ink-faint"
          }`}
        >
          {isAria ? "Aria" : "Caller"}
        </div>
        <div
          className={[
            "rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed",
            isAria
              ? "bg-emerald-deep text-bg"
              : "bg-white text-ink border border-line",
          ].join(" ")}
        >
          {turn.text}
        </div>
      </div>
    </div>
  );
}

function TypingBubble({
  who,
  subtle,
}: {
  who: "aria" | "caller";
  subtle?: boolean;
}) {
  const isAria = who === "aria";
  return (
    <div className={`flex ${isAria ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "rounded-2xl px-4 py-3",
          isAria ? "bg-emerald-deep/90 text-bg" : "bg-white text-ink border border-line",
          subtle ? "opacity-60" : "",
        ].join(" ")}
      >
        <div className="flex items-center gap-1.5">
          <span className="typing-dot size-1.5 rounded-full bg-current" style={{ animationDelay: "0s" }} />
          <span className="typing-dot size-1.5 rounded-full bg-current" style={{ animationDelay: "0.2s" }} />
          <span className="typing-dot size-1.5 rounded-full bg-current" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const bars = Array.from({ length: 18 });
  return (
    <div className="flex items-center gap-0.5">
      {bars.map((_, i) => (
        <span
          key={i}
          className={`wave-bar inline-block w-0.5 rounded-full bg-emerald-deep`}
          style={{
            height: `${10 + (i % 5) * 4}px`,
            animationDelay: `${(i % 9) * 0.07}s`,
            animationPlayState: active ? "running" : "paused",
            opacity: active ? 1 : 0.25,
          }}
        />
      ))}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4.5C5 4.22386 5.22386 4 5.5 4H8.27924C8.57158 4 8.81928 4.21257 8.86419 4.50146L9.46086 8.30946C9.49949 8.55564 9.36898 8.79739 9.14313 8.90362L7.57028 9.6394C7.34926 9.74324 7.22134 9.97648 7.26659 10.2169C7.62811 12.1349 9.0651 13.5719 10.9831 13.9334C11.2235 13.9787 11.4568 13.8507 11.5606 13.6297L12.2964 12.0569C12.4026 11.831 12.6444 11.7005 12.8905 11.7391L16.6985 12.3358C16.9874 12.3807 17.2 12.6284 17.2 12.9208V15.7C17.2 16.4732 16.5732 17.1 15.8 17.1H14.6C9.05172 17.1 4.5 12.5483 4.5 7L4.5 5.8C4.5 5.02681 5.12681 4.4 5.9 4.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5l3.2 3L13 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
