import { Navigation, HeartPulse, Home, GraduationCap, ShieldAlert, Store, Briefcase, Utensils, AlertCircle } from "lucide-react";

const ALL_CATEGORIES = [
  { name: "Transport", icon: Navigation, desc: "Danfo, BRT, Interstate, Fares" },
  { name: "Health", icon: HeartPulse, desc: "Hospitals, Pharmacies, Emergency" },
  { name: "Housing", icon: Home, desc: "Rent, Landlords, Areas" },
  { name: "Education", icon: GraduationCap, desc: "Schools, Universities, Fees" },
  { name: "Safety", icon: ShieldAlert, desc: "Security, Police, Reports" },
  { name: "Markets", icon: Store, desc: "Prices, Locations, Goods" },
  { name: "Services", icon: Briefcase, desc: "Mechanics, Artisans, Repairs" },
  { name: "Food & Hotels", icon: Utensils, desc: "Restaurants, Lodging, Leisure" },
];

export function Categories() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Categories</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Browse Nigerian knowledge by topic.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            className="group flex flex-col items-start rounded-2xl bg-white dark:bg-slate-950 p-6 text-left shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-emerald-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-600">
              <cat.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cat.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
