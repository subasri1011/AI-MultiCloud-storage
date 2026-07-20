import DashboardLayout from "../layouts/DashboardLayout.jsx";

// Small reusable placeholder shell for pages not yet fully spec'd.
// Swap the body of each export for real content when you're ready.
function Placeholder({ title, subtitle }) {
  return (
    <DashboardLayout>
      <div className="border-b border-line bg-surface px-4 py-5 sm:px-8">
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      <div className="p-8">
        <div className="card py-16 text-center text-sm text-muted">Nothing here yet.</div>
      </div>
    </DashboardLayout>
  );
}

export function SharedFiles() {
  return <Placeholder title="Shared Files" subtitle="Files you've shared or that have been shared with you" />;
}

export function RecycleBin() {
  return <Placeholder title="Recycle Bin" subtitle="Deleted files, kept for 30 days before permanent removal" />;
}

export function Settings() {
  return <Placeholder title="Settings" subtitle="Account, notifications, and connected-app preferences" />;
}
