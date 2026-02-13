import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          aria-label="Go to Homepage"
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] mb-8"
        >
          Go to Homepage
        </Link>

        <div className="border-t border-gray-200/50 pt-6">
          <p className="text-sm text-gray-500 mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services/"
              className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 text-sm shadow-sm hover:shadow-md"
            >
              Services
            </Link>
            <Link
              href="/conditions/"
              className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 text-sm shadow-sm hover:shadow-md"
            >
              Conditions
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 text-sm shadow-sm hover:shadow-md"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
