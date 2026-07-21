import { IconDrive, IconOneDrive, IconDropbox } from "./icons.jsx";

const FILES = [
  { name: "Q3-financial-report.pdf", source: "Google Drive", icon: <IconDrive />, size: "4.2 MB", modified: "2h ago" },
  { name: "brand-assets-final.zip", source: "Dropbox", icon: <IconDropbox />, size: "128 MB", modified: "5h ago" },
  { name: "client-contract-v2.docx", source: "OneDrive", icon: <IconOneDrive />, size: "890 KB", modified: "Yesterday" },
  { name: "product-demo.mp4", source: "Google Drive", icon: <IconDrive />, size: "312 MB", modified: "2 days ago" },
  { name: "onboarding-notes.pdf", source: "Dropbox", icon: <IconDropbox />, size: "1.1 MB", modified: "3 days ago" },
];

export default function RecentFiles() {
  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-ink">Recent Files</h3>
        <button className="text-xs font-semibold text-cobalt hover:underline">View all</button>
      </div>

      <div className="divide-y divide-line">
        {FILES.map((f) => (
          <div key={f.name} className="flex items-center gap-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper text-ink">
              {f.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{f.name}</p>
              <p className="text-xs text-muted">{f.source}</p>
            </div>
            <div className="shrink-0 text-right text-xs text-muted">
              <p>{f.size}</p>
              <p>{f.modified}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
