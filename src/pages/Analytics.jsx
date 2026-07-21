import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

const CLOUD_SPLIT = [
  { name: "Google Drive", value: 35, color: "#3457D5" },
  { name: "OneDrive", value: 27, color: "#00C2A8" },
  { name: "Dropbox", value: 20, color: "#E8862E" },
  { name: "MEGA", value: 18, color: "#E14F63" },
];

const FILE_TYPES = [
  { name: "Docs", value: 42 },
  { name: "Images", value: 30 },
  { name: "Videos", value: 18 },
  { name: "Others", value: 10 },
];

const TREND = [
  { day: "Apr 1", gb: 32 },
  { day: "Apr 8", gb: 38 },
  { day: "Apr 15", gb: 44 },
  { day: "Apr 22", gb: 49 },
  { day: "Apr 30", gb: 57 },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 border-b border-line bg-surface px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <h1 className="text-xl font-semibold text-ink">Analytics & Storage</h1>
        <select className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink outline-none focus:border-cobalt">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-8 lg:grid-cols-3">
        <div className="card">
          <h3 className="mb-4 font-semibold text-ink">Storage by Cloud</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={CLOUD_SPLIT} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2}>
                {CLOUD_SPLIT.map((c) => (
                  <Cell key={c.name} fill={c.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {CLOUD_SPLIT.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 font-semibold text-ink">Files by Type</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={FILE_TYPES}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#5B6273" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#3457D5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="mb-4 font-semibold text-ink">Storage Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={TREND}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5B6273" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="gb" stroke="#00C2A8" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
