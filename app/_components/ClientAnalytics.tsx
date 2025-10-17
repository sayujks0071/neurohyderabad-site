'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const WebVitals = dynamic(
  () => import("../../src/components/WebVitals"),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("../../src/components/CookieConsent"),
  { ssr: false }
);

const GoogleAnalytics = dynamic(
  () => import("../../src/components/GoogleAnalytics"),
  { ssr: false, loading: () => null }
);

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

const SEOOptimizerWrapper = dynamic(
  () =>
    import("../../src/components/SEOOptimizer").then((module) => ({
      default: module.default,
    })),
  { ssr: false, loading: () => null }
);

const FloatingWhatsApp = dynamic(
  () => import("../../src/components/FloatingWhatsApp"),
  { ssr: false, loading: () => null }
);

export default function ClientAnalytics() {
  const [enableAnalytics, setEnableAnalytics] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const hasConsent = () => localStorage.getItem("cookie-consent") === "accepted";
    if (hasConsent()) {
      setEnableAnalytics(true);
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setEnableAnalytics(detail === "accepted");
    };

    window.addEventListener("cookie-consent-change", handler);
    return () => window.removeEventListener("cookie-consent-change", handler);
  }, []);

  React.useEffect(() => {
    if (!enableAnalytics) {
      setShouldLoad(false);
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const enable = () => setShouldLoad(true);

    const win = window as typeof window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback) {
      idleHandle = win.requestIdleCallback(enable, { timeout: 1500 });
      return () => {
        if (idleHandle !== null && win.cancelIdleCallback) {
          win.cancelIdleCallback(idleHandle);
        }
      };
    }

    timeoutHandle = window.setTimeout(enable, 800);
    return () => {
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [enableAnalytics]);

  return (
    <>
      <CookieConsent />
      <WebVitals />
      {shouldLoad && (
        <>
          <GoogleAnalytics />
          <StatsigAnalytics />
          <StatsigSessionReplay />
          <PhoneClickTracker />
          <SEOOptimizerWrapper pageType="home" pageSlug="/" />
          <FloatingWhatsApp />
        </>
      )}
    </>
  );
}
