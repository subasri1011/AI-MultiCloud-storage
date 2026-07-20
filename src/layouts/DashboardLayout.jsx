import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import UserProfile from "../components/UserProfile.jsx";
import {
  IconChart,
  IconFolder,
  IconSparkle,
  IconCloud,
  IconShare,
  IconDuplicate,
  IconClock,
  IconShield,
  IconTrash,
  IconSettings,
  IconLogout,
  IconMenu,
} from "../components/icons.jsx";

const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: <IconChart /> },
  { label: "My Files", to: "/files", icon: <IconFolder /> },
  { label: "AI Assistant", to: "/assistant", icon: <IconSparkle /> },
  { label: "Cloud Providers", to: "/clouds", icon: <IconCloud /> },
  { label: "Shared Files", to: "/shared", icon: <IconShare /> },
  { label: "Duplicates", to: "/duplicates", icon: <IconDuplicate /> },
  { label: "Activity Logs", to: "/activity", icon: <IconClock /> },
  { label: "Security Center", to: "/security", icon: <IconShield /> },
  { label: "Recycle Bin", to: "/recycle-bin", icon: <IconTrash /> },
  { label: "Settings", to: "/settings", icon: <IconSettings /> },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3">
      {NAV.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
              isActive ? "bg-cobalt-50 text-cobalt" : "text-muted hover:bg-paper hover:text-ink"
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

// Every dashboard-side page (Dashboard, My Files, AI Assistant, Cloud
// Providers, Security Center, Duplicates, Activity Logs, Analytics, etc.)
// renders inside this shell. On mobile the sidebar becomes a slide-in
// drawer triggered by a hamburger button in a small top strip.
export default function DashboardLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex bg-paper">
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface md:flex">
        <div className="px-6 py-6">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavItems />
        <div className="border-t border-line px-3 py-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted hover:bg-paper hover:text-ink">
            <IconLogout />
            Log out
          </button>
          <UserProfile />
        </div>
      </aside>

      {/* Mobile top strip + drawer */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-surface px-4 py-3 md:hidden">
        <Link to="/">
          <Logo />
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink"
        >
          <IconMenu />
        </button>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-surface shadow-panel">
            <div className="px-6 py-6">
              <Logo />
            </div>
            <NavItems onNavigate={() => setDrawerOpen(false)} />
            <div className="border-t border-line px-3 py-4">
              <UserProfile />
            </div>
          </aside>
        </div>
      )}

      <div className="min-h-screen flex-1 pt-14 md:pt-0">{children}</div>
    </div>
  );
}
