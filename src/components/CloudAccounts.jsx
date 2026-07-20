import { IconDrive, IconOneDrive, IconDropbox, IconMega } from "./icons.jsx";

const ACCOUNTS = [
  { name: "Google Drive", icon: <IconDrive />, used: "38.2 GB", total: "100 GB", pct: 38, connected: true },
  { name: "OneDrive", icon: <IconOneDrive />, used: "12.6 GB", total: "50 GB", pct: 25, connected: true },
  { name: "Dropbox", icon: <IconDropbox />, used: "6.4 GB", total: "20 GB", pct: 32, connected: true },
  { name: "MEGA", icon: <IconMega />, used: "0 GB", total: "20 GB", pct: 0, connected: false },
];

export default function CloudAccounts() {
  return (
    <div className="card">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-ink">Connected Cloud Accounts</h3>
        <button className="text-xs font-semibold text-cobalt hover:underline">Manage</button>
      </div>

      <div className="space-y-4">
        {ACCOUNTS.map((a) => (
          <div key={a.name} className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper text-ink">
              {a.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">{a.name}</p>
                {a.connected ? (
                  <span className="text-xs text-muted">{a.used} / {a.total}</span>
                ) : (
                  <button className="text-xs font-semibold text-cobalt hover:underline">Connect</button>
                )}
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full rounded-full ${a.connected ? "bg-cobalt" : "bg-line"}`}
                  style={{ width: `${a.pct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
