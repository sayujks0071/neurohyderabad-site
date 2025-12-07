'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OptimizedImage from '../_components/OptimizedImage';
import SiteSearch from './SiteSearch';

/**
 * Refactored Header Component - Grade 2 Enhancement
 * Implements:
 * - Sticky navigation
 * - Simplified 5-item menu (per report recommendations)
 * - Prominent "Book Appointment" CTA
 * - Mobile hamburger menu with full-screen overlay
 * - Clinical Blue color scheme
 */

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Conditions',
    href: '/conditions',
    dropdown: [
      { label: 'Spine Conditions', href: '/spine-surgery' },
      { label: 'Brain Conditions', href: '/brain-surgery' },
      { label: 'Nerve Conditions', href: '/services' },
      { label: 'Pain Management', href: '/services' },
    ],
  },
  {
    label: 'Dr. Sayuj',
    href: '/about',
    dropdown: [
      { label: 'About Dr. Sayuj', href: '/about' },
      { label: 'Credentials', href: '/about#credentials' },
      { label: 'Philosophy', href: '/about#philosophy' },
      { label: 'Why Choose Us', href: '/best-neurosurgeon-in-hyderabad' },
    ],
  },
  {
    label: 'Patient Resources',
    href: '/knowledge-base',
    dropdown: [
      { label: 'Medical Knowledge Base', href: '/knowledge-base' },
      { label: 'Disease Guides', href: '/disease-guides' },
      { label: 'Patient Stories', href: '/patient-stories' },
      { label: 'Neurosurgery Blog', href: '/blog' },
      { label: 'Emergency & Rehabilitation', href: '/emergency-rehabilitation' },
    ],
  },
  {
    label: 'Locations',
    href: '/locations',
  },
];

export default function HeaderRefactored() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`sticky-nav sticky top-0 z-50 border-b transition-shadow ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
        role="banner"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 rounded"
            aria-label="Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery homepage"
          >
            <OptimizedImage
              src="/images/logo.svg"
              alt="Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <span className="sr-only md:not-sr-only font-semibold text-[var(--color-text-primary)]">
              Dr. Sayuj Krishnan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-[var(--color-text-primary)] hover:text-[var(--color-primary-500)] transition-colors font-medium text-sm py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 rounded"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[var(--color-border)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                    <ul className="space-y-2">
                      {item.dropdown.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)] rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA & Search */}
          <div className="hidden lg:flex items-center gap-4">
            <SiteSearch />
            <Link
              href="/appointments"
              className="btn-primary"
              aria-label="Book an appointment"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <SiteSearch />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 rounded"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Menu */}
        <nav
          id="mobile-navigation"
          className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Menu
              </span>
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] rounded"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="py-2">
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block px-4 py-3 text-base font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <ul className="mt-2 space-y-1 pl-4">
                      {item.dropdown.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={toggleMobileMenu}
                            className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="p-4 border-t">
              <Link
                href="/appointments"
                onClick={toggleMobileMenu}
                className="btn-primary w-full text-center block"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
















