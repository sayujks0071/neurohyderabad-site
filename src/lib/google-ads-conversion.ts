/**
 * Google Ads Conversion Tracking Utility
 * 
 * Helper functions to track Google Ads conversions for contact and appointment forms
 */

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

  if (window.gtag_report_conversion) {
    return window.gtag_report_conversion(url);
  }

  // Fallback: track conversion directly if function not available
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17680191922/zBshCJ3e2M0bELKjye5B',
    });
  }

  return false;
}

/**
 * Track a conversion without navigation
 * Use this for API-based form submissions that don't redirect
 */
export function trackConversionOnly(): void {
  trackContactConversion(undefined);
}

