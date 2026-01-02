'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Privacy-Friendly Analytics Component
 * 
 * Supports both Plausible and Fathom Analytics (cookieless, GDPR-compliant)
 * Falls back to Google Analytics if privacy-friendly options are not configured
 * 
 * Usage:
 * - Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN for Plausible
 * - Set NEXT_PUBLIC_FATHOM_SITE_ID for Fathom
 * - Set NEXT_PUBLIC_GOOGLE_ANALYTICS_ID for Google Analytics (fallback)
 */
export default function PrivacyFriendlyAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Plausible Analytics (privacy-friendly, cookieless)
    if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);

      // Track page views
      if (pathname && (window as any).plausible) {
        (window as any).plausible('pageview');
      }
    }

    // Fathom Analytics (privacy-friendly, cookieless)
    if (process.env.NEXT_PUBLIC_FATHOM_SITE_ID) {
      const script = document.createElement('script');
      script.src = 'https://cdn.usefathom.com/script.js';
      script.setAttribute('data-site', process.env.NEXT_PUBLIC_FATHOM_SITE_ID);
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [pathname]);

  // Google Analytics fallback (only if privacy-friendly options not available)
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ||
      process.env.NEXT_PUBLIC_FATHOM_SITE_ID
    ) {
      return; // Use privacy-friendly option if available
    }

    const FALLBACK_GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-MMLQCFN4ZJ';

    // Only load GA if no privacy-friendly option is configured
    const gaId = FALLBACK_GA_ID;
    if (!gaId) return;

    // Load gtag
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        anonymize_ip: true,
        respect_dnt: true
      });
    `;
    document.head.appendChild(script2);

    // Track page view
    if (pathname && (window as any).gtag) {
      (window as any).gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}


























