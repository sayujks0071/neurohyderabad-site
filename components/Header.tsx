'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('nav') && !target.closest('button[aria-controls]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        
        {/* Desktop Navigation */}
        <nav 
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <Link 
            href="/" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Services
          </Link>
          <Link 
            href="/conditions" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Conditions
          </Link>
          <Link 
            href="/blog" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            About
          </Link>
          <Link 
            href="/knowledge-base" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Knowledge Base
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Contact
          </Link>
          <Link
            href="/appointments"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Book a consultation appointment"
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="md:hidden border-t bg-white"
          aria-label="Main navigation"
        >
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-600 hover:text-blue-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block text-gray-600 hover:text-blue-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/conditions"
              className="block text-gray-600 hover:text-blue-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Conditions
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 hover:text-blue-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-blue-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-blue-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/appointments"
              className="block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Book a consultation appointment"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
