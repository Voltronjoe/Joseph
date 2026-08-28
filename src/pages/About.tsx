import { useEffect, useState } from "react";
import { Mail, Globe, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export function About() {
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      try {
        const data = await api.getCreator();
        setCreator(data);
      } catch (error) {
        console.error("Failed to load creator info", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCreator();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-slate-400">Loading information...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-950 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="h-32 bg-emerald-600 md:h-48"></div>
        <div className="px-6 pb-12 md:px-12">
          <div className="relative -mt-16 mb-6 flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 dark:bg-slate-800 shadow-md">
            <User className="h-12 w-12 text-slate-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {creator?.name || "[Creator Name]"}
          </h1>
          <p className="mt-2 text-lg text-emerald-600 font-medium">Creator, NaijaMind AI</p>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">About the Project</h2>
            <div className="mt-4 prose prose-slate">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {creator?.bio || "[Short Biography and purpose of the application]"}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
            <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Contact & Links</h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a 
                href={creator?.email ? `mailto:${creator.email}` : "#"}
                className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-900 px-5 py-3 text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800"
              >
                <Mail className="h-5 w-5 text-slate-400" />
                <span className="font-medium">{creator?.email || "[Contact Email]"}</span>
              </a>
              <a 
                href={creator?.website || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-900 px-5 py-3 text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800"
              >
                <Globe className="h-5 w-5 text-slate-400" />
                <span className="font-medium">
                  {creator?.website ? new URL(creator.website).hostname : "[Website Link]"}
                </span>
              </a>
            </div>
          </div>
          
          {/* Admin Link */}
          <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8 flex justify-center">
            <Link 
              to="/admin/login" 
              className="flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <Lock className="h-4 w-4" />
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
