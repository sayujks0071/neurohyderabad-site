import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container mx-auto p-8 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <div className="text-sm text-gray-500">
            <p>Or try these popular pages:</p>
            <div className="mt-2 space-x-4">
              <Link href="/services/" className="text-blue-600 hover:text-blue-800 underline">
                Services
              </Link>
              <Link href="/conditions/" className="text-blue-600 hover:text-blue-800 underline">
                Conditions
              </Link>
              <Link href="/contact/" className="text-blue-600 hover:text-blue-800 underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

