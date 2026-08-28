import { Link, Outlet, useLocation } from "react-router-dom";
import { MessageSquare, MapPin, Search, Grid, User, Info, Menu, X, CheckCircle, Moon, Sun, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/store";

const NAV_ITEMS = [
  { name: "Home", path: "/", icon: Search },
  { name: "Chat", path: "/chat", icon: MessageSquare },
  { name: "Nearby", path: "/nearby", icon: MapPin },
  { name: "Verify", path: "/verify", icon: CheckCircle },
  { name: "Categories", path: "/categories", icon: Grid },
];

export function Shell() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme, user, isAdminAuth } = useAppStore();

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 md:flex">
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.ibb.co/1fNhY6LV/1-Naija-Mind-Logo.png" alt="NaijaMind AI Logo" className="h-8 w-auto object-contain rounded-md" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">NaijaMind AI</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
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
          <Link
            to="/about"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              location.pathname === "/about" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Info className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            About Creator
          </Link>
          
          {isAdminAuth && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              <Shield className="h-5 w-5" />
              Admin Panel
            </Link>
          )}

          {user ? (
            <Link
              to="/profile"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                location.pathname === "/profile" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              Profile
            </Link>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white bg-slate-200/50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Sign up for free
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.ibb.co/1fNhY6LV/1-Naija-Mind-Logo.png" alt="NaijaMind AI Logo" className="h-8 w-auto object-contain rounded-md" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">NaijaMind AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 flex flex-col border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-lg md:hidden">
            <nav className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")} />
                    {item.name}
                  </Link>
                );
              })}
              <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
              >
                <Info className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                About Creator
              </Link>
              
              {isAdminAuth && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                >
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </Link>
              )}

              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                >
                  <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  Profile
                </Link>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-slate-900 dark:text-white bg-slate-200/50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Sign up for free
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
