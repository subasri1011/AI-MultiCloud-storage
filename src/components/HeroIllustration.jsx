// The single memorable visual for the landing page: four provider nodes
// (Drive / OneDrive / Dropbox / MEGA) each send an animated dashed line
// toward a central vault, which pulses to signal "actively protected."
const NODES = [
  { label: "Drive", x: 40, y: 60, color: "#3457D5" },
  { label: "OneDrive", x: 40, y: 240, color: "#00A4EF" },
  { label: "Dropbox", x: 360, y: 60, color: "#0061FF" },
  { label: "MEGA", x: 360, y: 240, color: "#E8862E" },
];
const CENTER = { x: 200, y: 150 };

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto" role="img" aria-label="Four cloud providers syncing into a central secure vault">
      {NODES.map((n) => (
        <line
          key={n.label}
          x1={n.x}
          y1={n.y}
          x2={CENTER.x}
          y2={CENTER.y}
          stroke={n.color}
          strokeWidth="2"
          className="sync-line"
          opacity="0.55"
        />
      ))}

      {NODES.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="26" fill="#FFFFFF" stroke={n.color} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="8" fill={n.color} />
          <text x={n.x} y={n.y + 42} textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif" fill="#5B6273">
            {n.label}
          </text>
        </g>
      ))}

      {/* Pulsing rings behind the vault to signal live protection */}
      <circle cx={CENTER.x} cy={CENTER.y} r="34" fill="none" stroke="#00C2A8" strokeWidth="2" className="pulse-ring" />

      <circle cx={CENTER.x} cy={CENTER.y} r="34" fill="#14171F" />
      <path
        d="M200 128 220 137v14c0 13-8.5 24.7-20 28-11.5-3.3-20-15-20-28v-14l20-9Z"
        fill="#00C2A8"
      />
      <path
        d="M191 150a9 9 0 0 1 15-6.6M209 150a9 9 0 0 1-15 6.6"
        stroke="#14171F"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
