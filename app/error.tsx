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
    <html>
      <body className="min-h-screen bg-white flex items-center justify-center px-4">
        <main className="max-w-xl w-full text-center space-y-4 border border-gray-200 rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Something went wrong</h1>
          <p className="text-gray-700">
            We hit an unexpected error. Please try again or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Retry loading this page"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex justify-center rounded-full border border-gray-300 px-5 py-2 font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Go back to homepage"
            >
              Go home
            </Link>
          </div>
          {process.env.NODE_ENV === "development" && (
            <p className="text-xs text-gray-500 break-all">
              {error?.message || "Unknown error"} {error?.digest && `(Digest: ${error.digest})`}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
