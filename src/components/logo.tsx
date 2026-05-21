/**
 * Frontlea logomark.
 *
 * Mark: a stylized "F" formed by two horizontal rules off a vertical
 * stem — a literal "front" reception desk seen from the side, and a
 * subtle nod to a typesetter's gallery rule. No status dots, no halos.
 *
 * Wordmark: Instrument Serif italic, set tight, in --ink.
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
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          rx="5"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <path
          d="M9.5 24 V8 H22.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M9.5 15.6 H18.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
        />
      </svg>
      {showWordmark && (
        <span className="font-serif text-[1.5rem] leading-none tracking-tight italic">
          Frontlea
        </span>
      )}
    </span>
  );
}
