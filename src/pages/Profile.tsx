import { User, Settings, Bell, Lock, LogOut, ShieldCheck, Mail, Phone, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/store";

export function Profile() {
  const { user, logoutUser } = useAppStore();

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google': return <Mail className="h-4 w-4" />;
      case 'apple': return <Apple className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <ShieldCheck className="h-4 w-4" />;
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case 'google': return "Google";
      case 'apple': return "Apple";
      case 'phone': return "Phone";
      case 'email': return "Email";
      default: return "Unknown";
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">Profile & Settings</h1>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 rounded-3xl bg-white dark:bg-slate-950 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          {user ? (
            user.picture ? (
              <img src={user.picture} alt={user.name} className="h-20 w-20 rounded-full object-cover ring-2 ring-emerald-500/20" referrerPolicy="no-referrer" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 font-bold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500">
              <User className="h-10 w-10" />
            </div>
          )}
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user ? user.name : "Guest User"}</h2>
            <p className="text-slate-500 dark:text-slate-400">{user ? (user.email || user.phone) : "You are not signed in."}</p>
            
            {user && (
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 w-fit px-3 py-1.5 rounded-full">
                {getProviderIcon(user.authProvider)}
                <span>Signed in with {getProviderName(user.authProvider)}</span>
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-0">
            {user ? (
              <button onClick={logoutUser} className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-900 px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 px-6 py-2.5 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
                  Sign up for free
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Settings Sections */}
        <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-950 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Preferences</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <button className="flex w-full items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Settings className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <span>Language & Region</span>
              </div>
              <span className="text-sm text-slate-400 dark:text-slate-500">English (NG)</span>
            </button>
            <button className="flex w-full items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Bell className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <span>Notifications</span>
              </div>
            </button>
          </div>
        </div>

        {/* Admin Link for testing */}
        <div className="pt-8">
          <Link 
            to="/admin/login" 
            className="flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <Lock className="h-4 w-4" />
            Admin Access
          </Link>
        </div>
      </div>
    </div>
  );
}
