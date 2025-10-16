'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Lazy load analytics components with SSR disabled and deferred loading
const GoogleAnalytics = dynamic(
  () => import("../../src/components/GoogleAnalytics"),
  { ssr: false }
);

const WebVitals = dynamic(
  () => import("../../src/components/WebVitals"),
  { ssr: false }
);

// Defer non-critical analytics until after page load
const StatsigAnalytics = dynamic(
  () => import("../../src/components/StatsigAnalytics"),
  { ssr: false, loading: () => null }
);

const StatsigSessionReplay = dynamic(
  () => import("../../src/components/StatsigSessionReplay"),
  { ssr: false, loading: () => null }
);

const PhoneClickTracker = dynamic(
  () => import("../../src/components/PhoneClickTracker"),
  { ssr: false, loading: () => null }
);

const SEOOptimizer = dynamic(
  () => import("../../src/components/SEOOptimizer"),
  { ssr: false, loading: () => null }
);

const FloatingWhatsApp = dynamic(
  () => import("../../src/components/FloatingWhatsApp"),
  { ssr: false, loading: () => null }
);

const CookieConsent = dynamic(
  () => import("../../src/components/CookieConsent"),
  { ssr: false, loading: () => null }
);

export default function ClientAnalytics() {
  return (
    <>
      {/* Critical analytics - load immediately */}
      <GoogleAnalytics />
      <WebVitals />
      
      {/* Non-critical analytics - defer until after page load */}
      <DeferredAnalytics />
    </>
  );
}

// Defer non-critical analytics to reduce main-thread blocking
function DeferredAnalytics() {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    // Defer loading until after page is fully loaded
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <StatsigAnalytics />
      <StatsigSessionReplay />
      <PhoneClickTracker />
      <SEOOptimizer pageType="home" pageSlug="/" />
      <FloatingWhatsApp />
      <CookieConsent />
    </>
  );
}
