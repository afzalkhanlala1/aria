export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M9 21 L16 8 L23 21"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 16 H19.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
      <span className="font-serif text-[1.35rem] leading-none">Aria</span>
    </span>
  );
}
