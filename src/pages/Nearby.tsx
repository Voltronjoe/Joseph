import { MapPin, Search, Navigation } from "lucide-react";

export function Nearby() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nearby Places</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Find services and locations around you in Nigeria.</p>
      </div>

      <div className="relative mb-8 max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search hospitals, mechanics, etc."
          className="w-full rounded-2xl border-0 bg-white dark:bg-slate-950 py-4 pl-12 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-emerald-500"
        />
      </div>

      <div className="mb-6 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
        <p className="text-sm font-medium text-amber-800">
          Live data isn't connected yet. This feature will become available when the required service is connected. Displaying DEMO DATA below.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Mock Data Item */}
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
            Map Placeholder
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Mainland Hospital (DEMO)</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Yaba, Lagos</p>
              </div>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                Verified
              </span>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800">
                <Navigation className="h-4 w-4" /> Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
