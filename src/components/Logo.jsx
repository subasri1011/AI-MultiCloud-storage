// Reusable wordmark + icon. The icon is a shield (security) wrapping a
// sync arrow (multi-cloud sync) — the two ideas the whole product rests on.
export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 2.5 25.5 6.5v7.2c0 6.8-4.3 12.7-10.5 15-6.2-2.3-10.5-8.2-10.5-15V6.5L15 2.5Z"
          fill="#3457D5"
        />
        <path
          d="M10.5 15a4.5 4.5 0 0 1 7.6-3.3M19.5 15a4.5 4.5 0 0 1-7.6 3.3"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M17.6 10.6h1.5v1.5M12.4 19.4h-1.5v-1.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-ink">
        CloudVault<span className="text-cobalt">AI</span>
      </span>
    </div>
  );
}
