import React from "react";
import { useEffect, useState } from "react";
import { Users, Activity, MessageSquare, Edit3, Save } from "lucide-react";
import { api } from "../../lib/api";
import { useAppStore } from "../../store/store";

export function AdminDashboard() {
  const { adminToken } = useAppStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingCreator, setIsEditingCreator] = useState(false);
  const [creatorForm, setCreatorForm] = useState({ name: "", bio: "", email: "", website: "" });
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        if (adminToken) {
          const res = await api.getAdminDashboard(adminToken);
          setData(res);
          setCreatorForm(res.creator);
        }
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [adminToken]);

  const handleCreatorUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const res = await api.updateCreator(adminToken, creatorForm);
      setData((prev: any) => ({ ...prev, creator: res.creator }));
      setIsEditingCreator(false);
      setSaveMessage("Profile updated successfully");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">Loading dashboard...</div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Application usage and metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Users</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.stats.users.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Users</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.stats.active.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">AI Queries</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.stats.queries.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Creator Profile</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">This information is shown on the public About page.</p>
          </div>
          {!isEditingCreator && (
            <button 
              onClick={() => setIsEditingCreator(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {saveMessage && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm">
            {saveMessage}
          </div>
        )}

        {isEditingCreator ? (
          <form onSubmit={handleCreatorUpdate} className="bg-white dark:bg-slate-950 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Creator Name</label>
              <input
                type="text"
                value={creatorForm.name}
                onChange={e => setCreatorForm({...creatorForm, name: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Biography / Description</label>
              <textarea
                value={creatorForm.bio}
                onChange={e => setCreatorForm({...creatorForm, bio: e.target.value})}
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={creatorForm.email}
                  onChange={e => setCreatorForm({...creatorForm, email: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Website</label>
                <input
                  type="url"
                  value={creatorForm.website}
                  onChange={e => setCreatorForm({...creatorForm, website: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsEditingCreator(false);
                  setCreatorForm(data.creator);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white dark:bg-slate-950 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl p-6 max-w-2xl space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Name</h3>
              <p className="text-slate-900 dark:text-white mt-1">{data.creator.name || "[Not provided]"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Biography</h3>
              <p className="text-slate-900 dark:text-white mt-1">{data.creator.bio || "[Not provided]"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500">Email</h3>
                <p className="text-slate-900 dark:text-white mt-1">{data.creator.email || "[Not provided]"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Website</h3>
                <p className="text-slate-900 dark:text-white mt-1">{data.creator.website ? (
                  <a href={data.creator.website} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                    {data.creator.website}
                  </a>
                ) : "[Not provided]"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
