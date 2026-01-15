'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { GA4_MEASUREMENT_ID } from '../lib/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const readConsent = () => {
      const analyticsConsent = localStorage.getItem('analytics-consent');
      const legacyConsent = localStorage.getItem('cookie-consent');
      return analyticsConsent === 'true' || legacyConsent === 'accepted';
    };

    setHasConsent(readConsent());

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setHasConsent(detail === 'accepted' || detail === 'true');
    };

    window.addEventListener('cookie-consent-change', handler);
    return () => window.removeEventListener('cookie-consent-change', handler);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
    if (typeof window.gtag !== 'function') return;

    // Consent Mode: only grant analytics after user consent.
    window.gtag('consent', 'update', {
      analytics_storage: hasConsent ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    // Ensure we send a page view only after consent.
    if (hasConsent) {
      window.gtag('config', GA4_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
      });
    }
  }, [hasConsent]);

  if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        // Loaded site-wide (tracking gated by Consent Mode + cookie consent)
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        // Initialize Consent Mode with denied defaults (no tracking until user accepts)
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Consent Mode defaults (no cookies / no tracking until user opts in)
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
            gtag('js', new Date());
            // Do not send page_view until consent is granted (updated in React effect)
            gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: false });
          `,
        }}
      />
    </>
  );
}
