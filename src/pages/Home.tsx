import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, CheckCircle, Navigation, Briefcase, HeartPulse, Home as HomeIcon, GraduationCap, ShieldAlert, Store, Utensils, Mic, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "Transport", icon: Navigation, color: "bg-blue-100 text-blue-700" },
  { name: "Health", icon: HeartPulse, color: "bg-red-100 text-red-700" },
  { name: "Housing", icon: HomeIcon, color: "bg-orange-100 text-orange-700" },
  { name: "Education", icon: GraduationCap, color: "bg-indigo-100 text-indigo-700" },
  { name: "Safety", icon: ShieldAlert, color: "bg-slate-100 dark:bg-slate-800 text-slate-700" },
  { name: "Markets", icon: Store, color: "bg-green-100 text-green-700" },
  { name: "Services", icon: Briefcase, color: "bg-purple-100 text-purple-700" },
  { name: "Food", icon: Utensils, color: "bg-yellow-100 text-yellow-700" },
];

export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
          Ask NaijaMind AI <span className="text-emerald-600">Anything</span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400 md:text-xl">
          From transport and places to schools, services, current affairs and everyday Nigerian life.
        </p>

        {/* Search Composer */}
        <form 
          onSubmit={handleSearch}
          className="relative flex w-full max-w-3xl items-center overflow-hidden rounded-2xl bg-white dark:bg-slate-950 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-emerald-500"
        >
          <div className="flex h-12 w-12 items-center justify-center text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to know?"
            className="flex-1 bg-transparent px-2 text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button 
            type="button"
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400"
            title="Voice input not connected yet"
          >
            <Mic className="h-5 w-5" />
          </button>
          <button 
            type="submit"
            disabled={!query.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/chat?q=How do I get there?" className="group flex flex-col rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-emerald-200">
            <Navigation className="mb-4 h-8 w-8 text-blue-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600">How do I get there?</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Find bus, BRT, and ride options.</p>
          </Link>
          <Link to="/nearby" className="group flex flex-col rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-emerald-200">
            <MapPin className="mb-4 h-8 w-8 text-emerald-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600">What's near me?</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Discover verified local places.</p>
          </Link>
          <Link to="/verify" className="group flex flex-col rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-emerald-200">
            <CheckCircle className="mb-4 h-8 w-8 text-purple-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600">Verify this</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Check news and claims.</p>
          </Link>
          <Link to="/categories" className="group flex flex-col rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-emerald-200">
            <Briefcase className="mb-4 h-8 w-8 text-orange-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600">Find a service</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Mechanics, artisans & more.</p>
          </Link>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Explore by Category</h2>
          <Link to="/categories" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/categories/${cat.name.toLowerCase()}`}
              className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-950 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-colors hover:bg-slate-50 dark:bg-slate-900"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}`}>
                <cat.icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-slate-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
