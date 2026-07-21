import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { IconFolder, IconUpload, IconSearch, IconDrive, IconOneDrive, IconDropbox, IconMega } from "../components/icons.jsx";

const TABS = ["All", "Documents", "Images", "Videos", "Audio", "Others"];

const FOLDERS = [
  { name: "Study", count: 25, color: "bg-amber-light text-amber" },
  { name: "Projects", count: 18, color: "bg-cobalt-50 text-cobalt" },
  { name: "Personal", count: 32, color: "bg-mint/10 text-mint-dark" },
  { name: "Reports", count: 12, color: "bg-coral-light text-coral" },
];

const FILES = [
  { name: "AI-Basics.pdf", size: "2.4 MB", source: "Google Drive", type: "PDF", icon: <IconDrive />, tint: "bg-coral-light text-coral" },
  { name: "Diagram.png", size: "1.6 MB", source: "Dropbox", type: "Image", icon: <IconDropbox />, tint: "bg-cobalt-50 text-cobalt" },
  { name: "Video.mp4", size: "15.6 MB", source: "OneDrive", type: "Video", icon: <IconOneDrive />, tint: "bg-mint/10 text-mint-dark" },
  { name: "Song.mp3", size: "4.3 MB", source: "MEGA", type: "Audio", icon: <IconMega />, tint: "bg-amber-light text-amber" },
  { name: "Budget-2026.xlsx", size: "890 KB", source: "Google Drive", type: "Documents", icon: <IconDrive />, tint: "bg-coral-light text-coral" },
  { name: "Team-photo.jpg", size: "3.1 MB", source: "OneDrive", type: "Images", icon: <IconOneDrive />, tint: "bg-cobalt-50 text-cobalt" },
];

export default function MyFiles() {
  const [tab, setTab] = useState("All");
  const visible = tab === "All" ? FILES : FILES.filter((f) => f.type === tab || (tab === "Others" && !TABS.includes(f.type)));

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 border-b border-line bg-surface px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <h1 className="text-xl font-semibold text-ink">My Files</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"><IconSearch /></span>
            <input
              type="search"
              placeholder="Search files or folders…"
              className="w-56 rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cobalt sm:w-64"
            />
          </div>
          <button className="btn-primary"><IconUpload />Upload</button>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tab === t ? "bg-cobalt text-white" : "border border-line bg-surface text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FOLDERS.map((f) => (
            <div key={f.name} className="card flex flex-col items-start gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}>
                <IconFolder />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{f.name}</p>
                <p className="text-xs text-muted">{f.count} files</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((f) => (
            <div key={f.name} className="card">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${f.tint}`}>
                {f.icon}
              </div>
              <p className="truncate text-sm font-medium text-ink">{f.name}</p>
              <p className="mt-1 text-xs text-muted">{f.size} · {f.source}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
