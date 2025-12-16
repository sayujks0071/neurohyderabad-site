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
    label: 'About',
    href: '/about',
    dropdown: [
      { label: 'Credentials', href: '/about#credentials' },
      { label: 'German Training', href: '/german-training' },
      { label: 'Why Patients Choose Me', href: '/best-neurosurgeon-in-hyderabad' },
      { label: 'Technology & Innovation', href: '/technology-innovation' },
    ],
  },
  {
    label: 'What I Treat',
    href: '/services',
    dropdown: [
      { label: 'Minimally Invasive Spine Surgery', href: '/services/minimally-invasive-spine-surgery' },
      { label: 'Awake Spine Surgery', href: '/services/awake-spine-surgery-hyderabad' },
      { label: 'Endoscopic Discectomy', href: '/services/endoscopic-discectomy-hyderabad' },
      { label: 'Brain Tumor & Awake Surgery', href: '/services/brain-tumor-surgery-hyderabad' },
      { label: 'ROSA Robotic DBS & Epilepsy', href: '/services/epilepsy-surgery-hyderabad' },
      { label: 'Trigeminal Neuralgia', href: '/conditions/trigeminal-neuralgia-treatment-hyderabad' },
      { label: 'Conditions A–Z', href: '/conditions' },
    ],
  },
  {
    label: 'Resources',
    href: '/knowledge-base',
    dropdown: [
      { label: 'Medical Knowledge Base', href: '/knowledge-base' },
      { label: 'Patient Stories', href: '/patient-stories' },
      { label: 'Neurosurgery Blog', href: '/blog' },
      { label: 'Disease Guides', href: '/disease-guides' },
      { label: 'Emergency & Rehabilitation', href: '/emergency-rehabilitation' },
    ],
  },
  {
    label: 'Locations',
    href: '/locations',
    dropdown: [
      { label: 'Malakpet (Primary)', href: '/neurosurgeon-malakpet' },
      { label: 'Secunderabad', href: '/neurosurgeon-secunderabad' },
      { label: 'Banjara & Jubilee Hills', href: '/neurosurgeon-banjara-hills' },
      { label: 'Hitech City & Gachibowli', href: '/neurosurgeon-hitech-city' },
    ],
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
            <a
              href="tel:+919778280044"
              className="text-sm font-semibold text-[var(--color-primary-700)] hover:text-[var(--color-primary-500)] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 rounded"
              aria-label="Call Dr. Sayuj Krishnan's coordinator"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.05 3.152a1 1 0 01-.502 1.21l-1.516.758a11.042 11.042 0 005.516 5.516l.758-1.516a1 1 0 011.21-.502l3.152 1.05a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +91 97782 80044
            </a>
            <a
              href="https://wa.me/919778280044"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-green-700 hover:text-green-600 flex items-center gap-2 px-3 py-2 border border-green-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="WhatsApp the care coordinator"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
              WhatsApp
            </a>
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
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="tel:+919778280044"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.05 3.152a1 1 0 01-.502 1.21l-1.516.758a11.042 11.042 0 005.516 5.516l.758-1.516a1 1 0 011.21-.502l3.152 1.05a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
                <a
                  href="https://wa.me/919778280044"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-green-200 px-4 py-3 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

















