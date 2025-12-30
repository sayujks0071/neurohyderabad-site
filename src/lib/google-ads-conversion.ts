/**
 * Google Ads Conversion Tracking Utility
 * 
 * Helper functions to track Google Ads conversions for contact and appointment forms
 */

const ADS_ID = "AW-17680191922";
const CONTACT_SEND_TO = `${ADS_ID}/zBshCJ3e2M0bELKjye5B`;

let gtagLoadPromise: Promise<void> | null = null;

function hasAnalyticsConsent(): boolean {
  try {
    const analyticsConsent = localStorage.getItem("analytics-consent");
    const legacyConsent = localStorage.getItem("cookie-consent");
    return analyticsConsent === "true" || legacyConsent === "accepted";
  } catch {
    return false;
  }
}

async function ensureGtagLoaded(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  if ((window as any).gtag) return;
  if (gtagLoadPromise) return gtagLoadPromise;

  gtagLoadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${ADS_ID}"]`,
    );

    const init = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag =
        (window as any).gtag ||
        function gtag() {
          (window as any).dataLayer.push(arguments);
        };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", ADS_ID);
      resolve();
    };

    if (existing) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    script.onload = init;
    script.onerror = () => reject(new Error("Failed to load gtag.js"));
    document.head.appendChild(script);
  });

  return gtagLoadPromise;
}

/**
 * Track a contact conversion
 * Use this when a user submits a contact form or makes an inquiry
 * 
 * @param url - Optional URL to navigate to after tracking (for mailto links or redirects)
 * @returns false if conversion was tracked, true otherwise
 */
export function trackContactConversion(url?: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Respect consent: do not fire Ads conversions without opt-in.
  if (!hasAnalyticsConsent()) {
    return false;
  }

  // Fire conversion asynchronously; do not block navigation (e.g. mailto: flows).
  void (async () => {
    try {
      await ensureGtagLoaded();
      (window as any).gtag?.("event", "conversion", {
        send_to: CONTACT_SEND_TO,
      });
    } catch {
      // no-op: avoid blocking user flows on script failures
    }
  })();

  return false;
}

/**
 * Track a conversion without navigation
 * Use this for API-based form submissions that don't redirect
 */
export function trackConversionOnly(): void {
  trackContactConversion(undefined);
}

