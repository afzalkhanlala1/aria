/**
 * Aria logomark.
 *
 * The mark: a rising waveform that resolves into a stylized "A" — a phone
 * line, an inhale before a greeting. The dot is the always-on indicator.
 * The wordmark is set in Instrument Serif italic for warmth.
 */
export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="aria-mark" x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Soft halo ring */}
        <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        {/* "A" upstroke */}
        <path
          d="M8.5 23 L16 6.8 L23.5 23"
          stroke="url(#aria-mark)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Waveform crossbar — three rising ticks */}
        <path
          d="M11.8 18.2 L13.1 16.9 L13.1 19.5 L14.8 14.9 L14.8 20.6 L17.2 13.2 L17.2 22.4 L18.9 16.4 L18.9 19.9 L20.2 17.8"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        {/* Always-on dot */}
        <circle cx="24.6" cy="9" r="1.6" fill="var(--emerald, currentColor)" />
        <circle cx="24.6" cy="9" r="3" fill="var(--emerald, currentColor)" opacity="0.18" />
      </svg>
      {showWordmark && (
        <span className="flex items-baseline gap-0.5">
          <span className="font-serif text-[1.4rem] leading-none tracking-tight">Aria</span>
          <span
            aria-hidden
            className="ml-0.5 inline-block size-1 translate-y-[-0.3rem] rounded-full bg-emerald"
          />
        </span>
      )}
    </span>
  );
}
