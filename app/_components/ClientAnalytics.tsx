'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import WebVitals to reduce initial bundle size
const WebVitals = dynamic(
  () => import("../../src/components/WebVitals"),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("../../src/components/CookieConsent"),
  { ssr: false }
);

const StatsigAnalytics = dynamic(
  () => import("../../src/components/StatsigAnalytics"),
  { ssr: false, loading: () => null }
);

const GoogleAdsConversions = dynamic(
  () => import("../../src/components/GoogleAdsConversions"),
  { ssr: false, loading: () => null }
);

const FloatingWhatsApp = dynamic(
  () => import("../../src/components/FloatingWhatsApp"),
  { ssr: false, loading: () => null }
);

const PrivacyFriendlyAnalytics = dynamic(
  () => import("../components/PrivacyFriendlyAnalytics"),
  { ssr: false, loading: () => null }
);

export default function ClientAnalytics() {
  const [enableAnalytics, setEnableAnalytics] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(false);
  // Separate heavier scripts to load later to reduce TBT
  const [shouldLoadHeavy, setShouldLoadHeavy] = React.useState(false);

  React.useEffect(() => {
    if (shouldLoad) {
      // Stagger heavy scripts by 2.5s to avoid main thread blocking
      const timer = setTimeout(() => {
        setShouldLoadHeavy(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShouldLoadHeavy(false);
    }
  }, [shouldLoad]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const hasConsent = () => {
      const analyticsConsent = localStorage.getItem("analytics-consent");
      // Accept legacy key for backward compatibility
      const legacyConsent = localStorage.getItem("cookie-consent");
      return analyticsConsent === "true" || legacyConsent === "accepted";
    };
    if (hasConsent()) {
      setEnableAnalytics(true);
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setEnableAnalytics(detail === "accepted" || detail === "true");
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
    let interactionHandle: number | null = null;

    const enable = () => setShouldLoad(true);

    const win = window as typeof window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    // Try multiple strategies for optimal loading
    const strategies = [
      // Strategy 1: Idle callback (preferred)
      () => {
        if (win.requestIdleCallback) {
          // Increased timeout to 2500ms to allow LCP to finish first
          idleHandle = win.requestIdleCallback(enable, { timeout: 2500 });
          return true;
        }
        return false;
      },
      // Strategy 2: User interaction
      () => {
        const handleInteraction = () => {
          enable();
          document.removeEventListener('mousedown', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        };
        
        document.addEventListener('mousedown', handleInteraction, { passive: true });
        document.addEventListener('touchstart', handleInteraction, { passive: true });
        document.addEventListener('keydown', handleInteraction, { passive: true });
        
        // Fallback timeout
        interactionHandle = window.setTimeout(enable, 2000);
        return true;
      },
      // Strategy 3: Timeout fallback
      () => {
        timeoutHandle = window.setTimeout(enable, 1000);
        return true;
      }
    ];

    // Try strategies in order
    for (const strategy of strategies) {
      if (strategy()) break;
    }

    return () => {
      if (idleHandle !== null && win.cancelIdleCallback) {
        win.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle);
      }
      if (interactionHandle !== null) {
        clearTimeout(interactionHandle);
      }
    };
  }, [enableAnalytics]);

  return (
    <>
      <CookieConsent />
      {enableAnalytics && <GoogleAdsConversions />}
      {shouldLoad && (
        <>
          <WebVitals />
          <PrivacyFriendlyAnalytics />
        </>
      )}
      {shouldLoadHeavy && (
        <>
          <StatsigAnalytics />
          <FloatingWhatsApp />
        </>
      )}
    </>
  );
}
