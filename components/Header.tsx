import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white" role="banner">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center gap-3"
          aria-label="Dr. Sayuj Krishnan - Home"
        >
          <div className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg">
            <span className="font-bold text-lg">Dr. Sayuj</span>
          </div>
          <span className="sr-only">Dr. Sayuj Krishnan</span>
        </Link>
        <nav 
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
          role="navigation"
        >
          <Link 
            href="/" 
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/conditions" 
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            Conditions
          </Link>
          <Link 
            href="/blog" 
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/appointments"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Book a consultation appointment"
          >
            Book Consultation
          </Link>
        </nav>
        {/* Mobile menu toggle would go here */}
      </div>
    </header>
  );
}
