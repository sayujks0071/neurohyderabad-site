"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong | Dr. Sayuj Krishnan</title>
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="rounded-3xl border border-gray-200 p-10 shadow-lg">
            <h1 className="text-3xl font-bold text-blue-800">We hit a snag</h1>
            <p className="mt-4 text-lg text-gray-600">
              The page could not be displayed right now. You can try refreshing
              or head back to the homepage while we sort things out.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={reset}
                className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Retry
              </button>
              <Link
                href="/"
                className="rounded-full border border-blue-400 px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
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
