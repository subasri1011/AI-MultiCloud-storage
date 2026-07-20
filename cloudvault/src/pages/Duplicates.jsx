import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { IconTrash } from "../components/icons.jsx";

const DUPLICATES = [
  { id: 1, name: "IMG_2024012.jpg", size: "2.4 MB", source: "Google Drive" },
  { id: 2, name: "IMG_2024012.jpg", size: "2.4 MB", source: "Dropbox" },
  { id: 3, name: "Notes(1).pdf", size: "1.8 MB", source: "OneDrive" },
];

export default function Duplicates() {
  const [selected, setSelected] = useState(DUPLICATES.map((d) => d.id));

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const toggleAll = () =>
    setSelected((s) => (s.length === DUPLICATES.length ? [] : DUPLICATES.map((d) => d.id)));

  const freedMB = DUPLICATES.filter((d) => selected.includes(d.id))
    .reduce((sum, d) => sum + parseFloat(d.size), 0)
    .toFixed(1);

  return (
    <DashboardLayout>
      <div className="border-b border-line bg-surface px-4 py-5 sm:px-8">
        <h1 className="text-xl font-semibold text-ink">Duplicate Files</h1>
        <p className="text-sm text-muted">You can free up {freedMB} MB</p>
      </div>

      <div className="p-4 sm:p-8">
        <div className="card">
          <label className="mb-4 flex items-center gap-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={selected.length === DUPLICATES.length}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-line accent-cobalt"
            />
            Select all
          </label>

          <div className="divide-y divide-line">
            {DUPLICATES.map((d) => (
              <div key={d.id} className="flex items-center gap-3 py-3.5">
                <input
                  type="checkbox"
                  checked={selected.includes(d.id)}
                  onChange={() => toggle(d.id)}
                  className="h-4 w-4 rounded border-line accent-cobalt"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{d.name}</p>
                  <p className="text-xs text-muted">{d.source}</p>
                </div>
                <span className="text-xs text-muted">{d.size}</span>
                <span className="rounded-full bg-coral-light px-2.5 py-0.5 text-xs font-semibold text-coral">Duplicate</span>
              </div>
            ))}
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600">
            <IconTrash />
            Delete Selected ({selected.length}) · {freedMB} MB
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
