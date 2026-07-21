import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { IconUpload, IconShare, IconCloud, IconTrash } from "../components/icons.jsx";

const GROUPS = [
  {
    label: "Today",
    items: [
      { icon: <IconUpload />, tint: "bg-cobalt-50 text-cobalt", text: "You uploaded Project-Report.pdf", time: "2 hours ago" },
      { icon: <IconShare />, tint: "bg-mint/10 text-mint-dark", text: "You shared Design-Mockup.png", time: "5 hours ago" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { icon: <IconCloud />, tint: "bg-amber-light text-amber", text: "You connected Dropbox", time: "1 day ago" },
      { icon: <IconTrash />, tint: "bg-coral-light text-coral", text: "You deleted Old-File.docx", time: "2 days ago" },
    ],
  },
];

export default function ActivityLogs() {
  return (
    <DashboardLayout>
      <div className="border-b border-line bg-surface px-4 py-5 sm:px-8">
        <h1 className="text-xl font-semibold text-ink">Activity Logs</h1>
        <p className="text-sm text-muted">Everything that's happened across your accounts</p>
      </div>

      <div className="space-y-8 p-4 sm:p-8">
        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{g.label}</p>
            <div className="card divide-y divide-line p-0">
              {g.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3.5 px-6 py-4">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.tint}`}>
                    {item.icon}
                  </div>
                  <p className="flex-1 text-sm text-ink">{item.text}</p>
                  <span className="shrink-0 text-xs text-muted">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
