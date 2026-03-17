'use client';

import { useEffect } from 'react';

/**
 * UTMTracker Component
 * 
 * Captures UTM parameters from the URL and persists them in sessionStorage.
 * This allows the booking flow to retrieve attribution data even if the user
 * navigates through multiple pages before booking.
 */
export default function UTMTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
    };

    // Only store if at least source is present (prevents overwriting with empty values)
    if (utms.utm_source) {
      sessionStorage.setItem('dr_sayuj_utm_data', JSON.stringify(utms));
      console.log('[UTMTracker] Captured attribution:', utms);
    }
  }, []);

  return null; // Invisible component
}

/**
 * Helper to retrieve stored UTM data for booking webhooks.
 */
export function getStoredUTMs() {
  if (typeof window === 'undefined') return {};
  try {
    const data = sessionStorage.getItem('dr_sayuj_utm_data');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
