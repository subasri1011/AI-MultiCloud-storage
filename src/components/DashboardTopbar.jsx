import { IconSearch, IconUpload, IconBell } from "./icons.jsx";

export default function DashboardTopbar() {
  return (
    <div className="flex flex-col gap-4 border-b border-line bg-surface px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-ink">Good morning, Aditi</h1>
        <p className="text-sm text-muted">Here's what's happening across your cloud accounts.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <IconSearch />
          </span>
          <input
            type="search"
            placeholder="Search all files…"
            className="w-64 rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cobalt"
          />
        </div>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink">
          <IconBell />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-coral" />
        </button>

        <button className="btn-primary">
          <IconUpload />
          Upload File
        </button>
      </div>
    </div>
  );
}
