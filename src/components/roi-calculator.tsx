"use client";

import { useMemo, useState } from "react";

function fmtCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function RoiCalculator() {
  const [callsPerWeek, setCallsPerWeek] = useState(95);
  const [missedRate, setMissedRate] = useState(28); // %
  const [bookingRate, setBookingRate] = useState(28); // % of answered calls that become appts
  const [avgValue, setAvgValue] = useState(1500); // first-year value per new patient
  const [noShowRate, setNoShowRate] = useState(22); // %

  const monthly = useMemo(() => {
    const callsMonth = callsPerWeek * 4.3;
    const missed = callsMonth * (missedRate / 100);
    const lostAppts = missed * (bookingRate / 100);
    const lostRevenue = lostAppts * avgValue;

    // Frontlea recovers ~85% of missed by answering 24/7
    const ariaCalls = missed * 0.85;
    const ariaAppts = ariaCalls * (bookingRate / 100);
    const ariaRevenue = ariaAppts * avgValue;

    // No-show recovery: cut no-show rate from current → ~12%
    const noShowAppts = (callsMonth - missed) * (bookingRate / 100);
    const currentLostNoShow = noShowAppts * (noShowRate / 100) * avgValue;
    const ariaLostNoShow = noShowAppts * 0.12 * avgValue;
    const noShowRecovery = Math.max(0, currentLostNoShow - ariaLostNoShow);

    const totalRecovered = ariaRevenue + noShowRecovery;
    const ariaCost = 2500; // monthly
    const setup = 3500; // one-time
    const roi = totalRecovered / ariaCost;
    const paybackDays = totalRecovered > 0 ? (setup / (totalRecovered / 30)) : 0;

    return {
      callsMonth,
      missed,
      lostRevenue,
      ariaRevenue,
      noShowRecovery,
      totalRecovered,
      ariaCost,
      net: totalRecovered - ariaCost,
      roi,
      paybackDays,
    };
  }, [callsPerWeek, missedRate, bookingRate, avgValue, noShowRate]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
      <div className="card rounded-3xl p-6 lg:p-8">
        <span className="eyebrow">Inputs</span>
        <h3 className="mt-3 font-serif text-2xl">Tell us about your clinic</h3>
        <p className="mt-1 text-sm text-ink-faint">
          Defaults are typical for a 1‑location med spa. Move the sliders.
        </p>

        <div className="mt-7 space-y-7">
          <Slider
            label="Inbound calls per week"
            value={callsPerWeek}
            onChange={setCallsPerWeek}
            min={20}
            max={500}
            step={5}
            unit=""
          />
          <Slider
            label="Calls missed (no answer / voicemail)"
            value={missedRate}
            onChange={setMissedRate}
            min={5}
            max={70}
            step={1}
            unit="%"
          />
          <Slider
            label="Booking rate on answered calls"
            value={bookingRate}
            onChange={setBookingRate}
            min={10}
            max={70}
            step={1}
            unit="%"
          />
          <Slider
            label="Average first‑year patient value"
            value={avgValue}
            onChange={setAvgValue}
            min={500}
            max={10000}
            step={50}
            unit="$"
            currency
          />
          <Slider
            label="Current no‑show rate"
            value={noShowRate}
            onChange={setNoShowRate}
            min={5}
            max={50}
            step={1}
            unit="%"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-accent-line bg-accent-bg p-6 text-accent-fg lg:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 size-64 rounded-full bg-emerald/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 size-52 rounded-full bg-rose/20 blur-3xl"
        />

        <span className="eyebrow text-accent-fg/70">Today, without Frontlea</span>
        <div className="mt-3 flex items-end gap-3">
          <span className="font-serif text-5xl leading-none">
            {fmtCurrency(monthly.lostRevenue)}
          </span>
          <span className="pb-2 text-sm text-accent-fg/70">/ month leaking</span>
        </div>
        <p className="mt-1 text-sm text-accent-fg/70">
          {Math.round(monthly.missed)} missed calls × {bookingRate}% would-book × {fmtCurrency(avgValue)}
        </p>

        <div className="my-7 h-px bg-accent-line" />

        <span className="eyebrow text-accent-fg/70">With Frontlea managed front desk</span>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <ResultStat
            label="Recovered missed calls"
            value={fmtCurrency(monthly.ariaRevenue)}
          />
          <ResultStat
            label="Recovered no-shows"
            value={fmtCurrency(monthly.noShowRecovery)}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-accent-line bg-white/5 p-5 backdrop-blur-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-accent-fg/70">
              Total recovered
            </span>
            <span className="font-serif text-3xl">
              {fmtCurrency(monthly.totalRecovered)}
              <span className="ml-1 text-sm text-accent-fg/70">/mo</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between text-sm">
            <span className="text-accent-fg/70">Frontlea managed service</span>
            <span>−{fmtCurrency(monthly.ariaCost)}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between border-t border-accent-line pt-3">
            <span className="text-accent-fg/85">Net monthly impact</span>
            <span className="font-serif text-2xl text-accent-emerald">
              {fmtCurrency(monthly.net)}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Badge label="ROI" value={`${monthly.roi.toFixed(1)}×`} />
          <Badge
            label="Setup payback"
            value={monthly.paybackDays > 0 ? `${Math.ceil(monthly.paybackDays)} days` : "—"}
          />
        </div>

        <a
          href="/audit"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-accent-emerald px-5 py-3 text-sm font-medium text-[#06120e] transition-transform hover:translate-y-[-1px]"
        >
          Get a free, clinic-specific audit
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  currency,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  currency?: boolean;
}) {
  const display = currency
    ? fmtCurrency(value)
    : unit === "%"
    ? `${value}%`
    : `${value.toLocaleString()}`;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm text-ink-soft">{label}</label>
        <span className="font-serif text-xl text-ink">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-fx mt-3"
      />
    </div>
  );
}

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-accent-line bg-white/5 p-4 backdrop-blur-sm">
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-fg/70">
        {label}
      </div>
      <div className="mt-1.5 font-serif text-2xl">{value}</div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-full border border-accent-line bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
      <span className="text-accent-fg/70 uppercase tracking-widest text-[0.7rem]">
        {label}
      </span>
      <span className="font-serif text-lg">{value}</span>
    </div>
  );
}
