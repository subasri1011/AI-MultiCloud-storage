import DashboardLayout from "../layouts/DashboardLayout.jsx";
import DashboardTopbar from "../components/DashboardTopbar.jsx";
import CloudAccounts from "../components/CloudAccounts.jsx";
import StorageUsage from "../components/StorageUsage.jsx";
import RecentFiles from "../components/RecentFiles.jsx";
import SecurityScore from "../components/SecurityScore.jsx";
import AIAssistantPanel from "../components/AIAssistantPanel.jsx";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardTopbar />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-2">
            <StorageUsage />
            <SecurityScore />
          </div>
          <CloudAccounts />
          <RecentFiles />
        </div>

        <div className="lg:col-span-1">
          <AIAssistantPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
