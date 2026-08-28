import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, AlertCircle, Sun, Moon } from "lucide-react";
import { api } from "../lib/api";
import { useAppStore } from "../store/store";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAdminAuth, isDarkMode, toggleTheme } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.adminLogin(password);
      setAdminAuth(true, data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 rounded-lg p-2 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="https://i.ibb.co/1fNhY6LV/1-Naija-Mind-Logo.png" alt="NaijaMind AI Logo" className="mb-4 h-16 w-auto object-contain rounded-xl" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Secure Access</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Please enter the administrative password to continue.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border-0 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Verifying..." : "Authenticate"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
