import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { IconDrive, IconOneDrive, IconDropbox, IconMega } from "../components/icons.jsx";

const PROVIDERS = [
  { name: "Google Drive", icon: <IconDrive />, used: "15.6 GB", total: "25 GB", pct: 62, connected: true },
  { name: "OneDrive", icon: <IconOneDrive />, used: "12.4 GB", total: "25 GB", pct: 50, connected: true },
  { name: "Dropbox", icon: <IconDropbox />, used: "9.2 GB", total: "20 GB", pct: 46, connected: true },
  { name: "MEGA", icon: <IconMega />, used: "8.0 GB", total: "15 GB", pct: 53, connected: true },
];

export default function CloudProviders() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 border-b border-line bg-surface px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <h1 className="text-xl font-semibold text-ink">Connected Clouds</h1>
          <p className="text-sm text-muted">Manage your cloud accounts</p>
        </div>
        <button className="btn-primary">+ Add Cloud</button>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-8">
        {PROVIDERS.map((p) => (
          <div key={p.name} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-ink">{p.icon}</div>
                <div>
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-muted">{p.used} used of {p.total}</p>
                </div>
              </div>
              <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint-dark">Connected</span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-cobalt" style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
