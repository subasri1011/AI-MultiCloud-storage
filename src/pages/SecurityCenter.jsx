import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { IconCheck, IconWarning, IconShield } from "../components/icons.jsx";

const SCORE = 92;
const CIRCUMFERENCE = 2 * Math.PI * 64;

const CHECKS = [
  { label: "Encrypted Files", detail: "128 files", ok: true },
  { label: "Public Links", detail: "2 links", ok: true },
  { label: "MFA Enabled", detail: "Active", ok: true },
  { label: "Weak Passwords", detail: "1 detected", ok: false },
];

export default function SecurityCenter() {
  const offset = CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE;

  return (
    <DashboardLayout>
      <div className="border-b border-line bg-surface px-4 py-5 sm:px-8">
        <h1 className="text-xl font-semibold text-ink">Security Center</h1>
        <p className="text-sm text-muted">Your files are safe</p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-8 lg:grid-cols-2">
        <div className="card flex flex-col items-center justify-center py-12 text-center">
          <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
            <circle cx="80" cy="80" r="64" fill="none" stroke="#E4E7EE" strokeWidth="12" />
            <circle
              cx="80" cy="80" r="64" fill="none" stroke="#00C2A8" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
            />
            <text x="80" y="78" textAnchor="middle" transform="rotate(90 80 80)" className="font-mono" fontSize="34" fontWeight="700" fill="#14171F">{SCORE}</text>
            <text x="80" y="102" textAnchor="middle" transform="rotate(90 80 80)" fontSize="12" fill="#5B6273">/100</text>
          </svg>
          <p className="mt-4 text-sm font-semibold text-mint-dark">Excellent</p>
          <button className="btn-primary mt-6">
            <IconShield /> Run Full Security Scan
          </button>
        </div>

        <div className="card">
          <h3 className="mb-5 font-semibold text-ink">Security Checklist</h3>
          <div className="divide-y divide-line">
            {CHECKS.map((c) => (
              <div key={c.label} className="flex items-center gap-3 py-3.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${c.ok ? "bg-mint/10 text-mint-dark" : "bg-coral-light text-coral"}`}>
                  {c.ok ? <IconCheck /> : <IconWarning />}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{c.label}</p>
                  <p className="text-xs text-muted">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
