const SCORE = 82;
const CIRCUMFERENCE = 2 * Math.PI * 42;

export default function SecurityScore() {
  const offset = CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE;

  return (
    <div className="card flex items-center gap-6">
      <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0 -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#E4E7EE" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#00C2A8"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          transform="rotate(90 50 50)"
          className="font-mono"
          fontSize="22"
          fontWeight="600"
          fill="#14171F"
        >
          {SCORE}
        </text>
      </svg>
      <div>
        <h3 className="font-semibold text-ink">Security Score</h3>
        <p className="mt-1 text-sm text-muted">Good — 3 recommendations available to reach 100.</p>
      </div>
    </div>
  );
}
