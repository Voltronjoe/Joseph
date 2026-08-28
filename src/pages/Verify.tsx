import { CheckCircle, AlertTriangle, Search } from "lucide-react";

export function Verify() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Verify This</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Check WhatsApp messages, news, and claims against reliable Nigerian sources.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <form className="mb-8" onSubmit={e => e.preventDefault()}>
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-purple-500">
            <textarea
              rows={4}
              placeholder="Paste the message, news headline, or claim here..."
              className="w-full resize-none border-0 bg-transparent p-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none sm:text-lg"
            />
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Supports text and links</span>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
              >
                <Search className="h-4 w-4" /> Verify Claim
              </button>
            </div>
          </div>
        </form>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-semibold text-amber-800">Verification service not connected</h3>
              <p className="mt-1 text-sm text-amber-700">
                Live verification requires connection to a fact-checking database or search API. This is currently running in DEMO mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
