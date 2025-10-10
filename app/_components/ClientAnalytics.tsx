'use client';

import dynamic from 'next/dynamic';

// Lazy load analytics components with SSR disabled
const GoogleAnalytics = dynamic(
  () => import("../../src/components/GoogleAnalytics"),
  { ssr: false }
);

const WebVitals = dynamic(
  () => import("../../src/components/WebVitals"),
  { ssr: false }
);

const StatsigAnalytics = dynamic(
  () => import("../../src/components/StatsigAnalytics"),
  { ssr: false }
);

const StatsigSessionReplay = dynamic(
  () => import("../../src/components/StatsigSessionReplay"),
  { ssr: false }
);

const PhoneClickTracker = dynamic(
  () => import("../../src/components/PhoneClickTracker"),
  { ssr: false }
);

const SEOOptimizer = dynamic(
  () => import("../../src/components/SEOOptimizer"),
  { ssr: false }
);

const FloatingWhatsApp = dynamic(
  () => import("../../src/components/FloatingWhatsApp"),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("../../src/components/CookieConsent"),
  { ssr: false }
);

export default function ClientAnalytics() {
  return (
    <>
      <GoogleAnalytics />
      <WebVitals />
      <StatsigAnalytics />
      <StatsigSessionReplay />
      <PhoneClickTracker />
      <SEOOptimizer pageType="home" pageSlug="/" />
      <FloatingWhatsApp />
      <CookieConsent />
    </>
  );
}
