const TOTAL_GB = 190;
const USED_GB = 57.2;
const PCT = Math.round((USED_GB / TOTAL_GB) * 100);

const BREAKDOWN = [
  { label: "Documents", pct: 34, color: "bg-cobalt" },
  { label: "Media", pct: 41, color: "bg-mint" },
  { label: "Archives", pct: 15, color: "bg-amber" },
  { label: "Other", pct: 10, color: "bg-coral" },
];

export default function StorageUsage() {
  return (
    <div className="card">
      <h3 className="mb-1 font-semibold text-ink">Storage Usage</h3>
      <p className="mb-5 text-xs text-muted">Across all connected providers</p>

      <div className="flex items-end gap-2">
        <span className="font-mono text-3xl font-semibold text-ink">{USED_GB}</span>
        <span className="mb-1 text-sm text-muted">GB of {TOTAL_GB} GB used</span>
      </div>

      <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-line">
        {BREAKDOWN.map((b) => (
          <div key={b.label} className={b.color} style={{ width: `${(b.pct / 100) * PCT}%` }} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {BREAKDOWN.map((b) => (
          <div key={b.label} className="flex items-center gap-2 text-xs text-muted">
            <span className={`h-2 w-2 rounded-full ${b.color}`} />
            {b.label} · {b.pct}%
          </div>
        ))}
      </div>
    </div>
  );
}
