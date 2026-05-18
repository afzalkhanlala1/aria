"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  VOICE_SCENARIOS,
  VOICE_SCRIPT,
  type VoiceScenarioId,
  type VoiceTurn,
} from "@/lib/voice-scripts";

/**
 * Plays a scripted call between Aria and a caller.
 *
 * Audio strategy (in order of preference):
 *   1) MP3 files at `/voice/<scenario>/<who>-<index>.mp3` (generated via
 *      `npm run voice:generate`). Best quality.
 *   2) Browser `speechSynthesis` API. Free, no API key, mediocre quality.
 *   3) Fixed-delay text-only playback (silent fallback if 1 and 2 fail).
 *
 * The stop button cancels every queued timeout, the current audio element,
 * and any in-flight speechSynthesis utterance — fixing the bug where stopping
 * mid-call did nothing.
 */
export function VoiceDemo() {
  const [scenarioId, setScenarioId] = useState<VoiceScenarioId>("new");
  const [playing, setPlaying] = useState(false);
  const [turnsShown, setTurnsShown] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [audioMode, setAudioMode] = useState<"file" | "speech" | "silent">("silent");

  // Refs hold everything that needs to be cancelled when the user stops the
  // call. Storing them in state would cause re-renders we don't want.
  const tickRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);
  const speechVoicesRef = useRef<{ aria?: SpeechSynthesisVoice; caller?: SpeechSynthesisVoice }>({});
  const transcriptRef = useRef<HTMLDivElement>(null);

  const script = VOICE_SCRIPT[scenarioId];

  const scenarioMeta = useMemo(
    () => VOICE_SCENARIOS.find((s) => s.id === scenarioId),
    [scenarioId],
  );

  // Pick the best available voices once when the SpeechSynthesis API has
  // loaded its voice list.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    function pickVoices() {
      const all = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
      if (all.length === 0) return;
      const female =
        all.find((v) => /samantha|jenny|aria|female|google us english/i.test(v.name)) ||
        all.find((v) => v.name.toLowerCase().includes("female")) ||
        all[0];
      const male =
        all.find((v) => /daniel|alex|guy|david|male/i.test(v.name)) ||
        all.find((v) => v !== female) ||
        all[0];
      speechVoicesRef.current = { aria: female, caller: male };
    }

    pickVoices();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", pickVoices);
  }, []);

  const stopAllAudio = useCallback(() => {
    cancelledRef.current = true;
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = "";
      } catch {}
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    utteranceRef.current = null;
    if (pauseTimeoutRef.current !== null) {
      window.clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    stopAllAudio();
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    setPlaying(false);
  }, [stopAllAudio]);

  const reset = useCallback(() => {
    stop();
    setTurnsShown(0);
    setElapsed(0);
  }, [stop]);

  const start = useCallback(async () => {
    reset();
    cancelledRef.current = false;
    setPlaying(true);

    tickRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    await playSequence(script, scenarioId);

    if (cancelledRef.current) return;
    // Linger on the booked confirmation for a moment, then mark as done.
    pauseTimeoutRef.current = window.setTimeout(() => {
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
      setPlaying(false);
    }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId, reset]);

  async function playSequence(turns: VoiceTurn[], scenario: VoiceScenarioId) {
    for (let i = 0; i < turns.length; i++) {
      if (cancelledRef.current) return;
      const turn = turns[i];
      setTurnsShown(i + 1);
      await new Promise((r) => requestAnimationFrame(() => r(null))); // let the bubble render before audio starts
      const played = await tryPlayAudio(turn, scenario, i);
      if (cancelledRef.current) return;
      if (!played) {
        // No audio available — fall back to the scripted delay so the
        // transcript still has natural pacing.
        await wait(Math.max(900, turn.delay));
      }
      if (cancelledRef.current) return;
      // Small natural gap between turns.
      await wait(280);
    }
  }

  async function tryPlayAudio(turn: VoiceTurn, scenario: VoiceScenarioId, index: number): Promise<boolean> {
    const src = `/voice/${scenario}/${turn.who}-${index}.mp3`;
    const fileOk = await playFile(src);
    if (fileOk === "ok") {
      setAudioMode("file");
      return true;
    }
    if (cancelledRef.current) return true;
    if (fileOk === "missing") {
      const spoke = await speakText(turn);
      if (spoke) {
        setAudioMode("speech");
        return true;
      }
      setAudioMode("silent");
    }
    return false;
  }

  function playFile(src: string): Promise<"ok" | "missing" | "cancelled"> {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve("missing");
      const audio = new Audio(src);
      audio.preload = "auto";
      audioRef.current = audio;

      let settled = false;
      const finish = (result: "ok" | "missing" | "cancelled") => {
        if (settled) return;
        settled = true;
        audio.onended = null;
        audio.onerror = null;
        audio.oncanplay = null;
        resolve(result);
      };

      audio.onended = () => finish("ok");
      audio.onerror = () => finish("missing");

      audio.play().catch(() => finish("missing"));

      // If we get cancelled mid-clip the parent will pause the audio and
      // null out audioRef; we should resolve quickly so the loop exits.
      const cancelPoll = window.setInterval(() => {
        if (cancelledRef.current) {
          window.clearInterval(cancelPoll);
          finish("cancelled");
        } else if (settled) {
          window.clearInterval(cancelPoll);
        }
      }, 80);
    });
  }

  function speakText(turn: VoiceTurn): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return resolve(false);
      }
      try {
        const utter = new SpeechSynthesisUtterance(turn.text);
        const voice = speechVoicesRef.current[turn.who];
        if (voice) utter.voice = voice;
        utter.rate = turn.who === "aria" ? 1.0 : 1.05;
        utter.pitch = turn.who === "aria" ? 1.05 : 0.95;
        utter.volume = 1;
        utteranceRef.current = utter;

        let settled = false;
        const finish = (ok: boolean) => {
          if (settled) return;
          settled = true;
          utter.onend = null;
          utter.onerror = null;
          resolve(ok);
        };

        utter.onend = () => finish(true);
        utter.onerror = () => finish(false);
        window.speechSynthesis.speak(utter);

        // Safety net: if speech doesn't start within 5s, give up so the loop
        // doesn't stall forever (some browsers throttle background tabs).
        const watchdog = window.setTimeout(() => finish(false), 25_000);

        const cancelPoll = window.setInterval(() => {
          if (cancelledRef.current) {
            window.clearInterval(cancelPoll);
            window.clearTimeout(watchdog);
            try {
              window.speechSynthesis.cancel();
            } catch {}
            finish(true);
          } else if (settled) {
            window.clearInterval(cancelPoll);
            window.clearTimeout(watchdog);
          }
        }, 80);
      } catch {
        resolve(false);
      }
    });
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const id = window.setTimeout(() => resolve(), ms);
      // If cancelled, short-circuit the wait.
      const cancelPoll = window.setInterval(() => {
        if (cancelledRef.current) {
          window.clearTimeout(id);
          window.clearInterval(cancelPoll);
          resolve();
        }
      }, 60);
    });
  }

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [turnsShown]);

  useEffect(
    () => () => {
      // Unmount cleanup — kill all timers / audio / speech.
      cancelledRef.current = true;
      stopAllAudio();
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    },
    [stopAllAudio],
  );

  // When the user switches scenarios while a call is running, fully reset.
  function pickScenario(id: VoiceScenarioId) {
    if (id === scenarioId) return;
    reset();
    setScenarioId(id);
  }

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
              Incoming call · {scenarioMeta?.sub}
            </span>
          </div>
          <span className="font-mono text-[0.7rem] text-ink-faint">
            {minutes}:{seconds}
          </span>
        </div>

        <div className="flex items-center gap-4 border-b border-line px-5 py-5">
          <div className="relative">
            <div className="grid size-14 place-items-center rounded-full bg-accent-bg text-accent-fg shadow-inner">
              <PhoneIcon />
            </div>
            {playing && (
              <span className="pulse-ring absolute inset-0 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-serif text-xl">Aria · Luxe Aesthetics</div>
            <div className="text-sm text-ink-faint">
              Voice:{" "}
              <span className="text-ink-soft">
                {audioMode === "file"
                  ? '"Shimmer" — OpenAI TTS'
                  : audioMode === "speech"
                    ? "Browser TTS (fallback)"
                    : "Text only — add audio with npm run voice:generate"}
              </span>
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
            <div className="rise mt-3 rounded-2xl border border-emerald/30 bg-emerald-soft/60 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-emerald">
                <CheckIcon /> Confirmation sent
              </div>
              <div className="mt-2 text-sm text-ink">
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
            onClick={playing ? stop : start}
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
          {VOICE_SCENARIOS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => pickScenario(s.id)}
                className={[
                  "w-full text-left rounded-2xl border px-4 py-3 transition-all",
                  scenarioId === s.id
                    ? "border-emerald bg-bg-elev shadow-sm"
                    : "border-line bg-bg-elev/60 hover:border-ink-faint hover:bg-bg-elev",
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

function TranscriptBubble({ turn }: { turn: VoiceTurn }) {
  const isAria = turn.who === "aria";
  return (
    <div className={`rise flex ${isAria ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[85%]">
        <div
          className={`mb-1 font-mono text-[0.65rem] uppercase tracking-widest ${
            isAria ? "text-emerald" : "text-ink-faint"
          }`}
        >
          {isAria ? "Aria" : "Caller"}
        </div>
        <div
          className={[
            "rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed",
            isAria
              ? "bg-accent-bg text-accent-fg"
              : "bg-bg-elev text-ink border border-line",
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
          isAria ? "bg-accent-bg/90 text-accent-fg" : "bg-bg-elev text-ink border border-line",
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
          className={`wave-bar inline-block w-0.5 rounded-full bg-emerald`}
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
