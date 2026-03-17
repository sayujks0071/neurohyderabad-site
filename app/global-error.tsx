"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.error("Global app error boundary caught:", error);
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong | Dr. Sayuj Krishnan</title>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-blue-800">We hit a snag</h1>
            <p className="mt-4 text-lg text-gray-600">
              The page could not be displayed right now. You can try refreshing
              or head back to the homepage while we sort things out.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full">
              <button
                type="button"
                onClick={reset}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Retry"
              >
                Retry
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 text-center"
                aria-label="Go to homepage"
              >
                Go to homepage
              </Link>
            </div>
            {error?.digest && (
              <p className="mt-6 text-sm text-gray-400">
                Error reference: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
