import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, Users, Activity, Settings, User, LogOut, FileText, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../../store/store";
import { cn } from "../../lib/utils";

const ADMIN_NAV = [
  { name: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Content", path: "/admin/content", icon: FileText },
  { name: "AI Usage", path: "/admin/ai-usage", icon: Activity },
  { name: "Creator Profile", path: "/admin/creator", icon: User },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export function AdminShell() {
  const { isAdminAuth, logoutAdmin, isDarkMode, toggleTheme } = useAppStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAdminAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 md:flex">
        <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src="https://i.ibb.co/1fNhY6LV/1-Naija-Mind-Logo.png" alt="NaijaMind AI Logo" className="h-8 w-auto object-contain rounded-md" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-1">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                Dark Mode
              </>
            )}
          </button>
          <button
            onClick={logoutAdmin}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
          >
            <LogOut className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 md:hidden">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src="https://i.ibb.co/1fNhY6LV/1-Naija-Mind-Logo.png" alt="NaijaMind AI Logo" className="h-8 w-auto object-contain rounded-md" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Panel</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 flex flex-col border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-xl md:hidden">
            <nav className="flex flex-col space-y-1">
              {ADMIN_NAV.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")} />
                    {item.name}
                  </Link>
                );
              })}
              <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutAdmin();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
              >
                <LogOut className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                Sign Out
              </button>
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
