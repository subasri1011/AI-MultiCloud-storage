import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyFiles from "./pages/MyFiles.jsx";
import Assistant from "./pages/Assistant.jsx";
import CloudProviders from "./pages/CloudProviders.jsx";
import SecurityCenter from "./pages/SecurityCenter.jsx";
import Duplicates from "./pages/Duplicates.jsx";
import ActivityLogs from "./pages/ActivityLogs.jsx";
import Analytics from "./pages/Analytics.jsx";
import { SharedFiles, RecycleBin, Settings } from "./pages/Placeholder.jsx";

// Central route table. "/" and "/login" are public; everything else is a
// dashboard-side page sharing DashboardLayout (sidebar + content area).
// In production, the dashboard routes would sit behind an auth guard.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/files" element={<MyFiles />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/clouds" element={<CloudProviders />} />
      <Route path="/security" element={<SecurityCenter />} />
      <Route path="/duplicates" element={<Duplicates />} />
      <Route path="/activity" element={<ActivityLogs />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/shared" element={<SharedFiles />} />
      <Route path="/recycle-bin" element={<RecycleBin />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
