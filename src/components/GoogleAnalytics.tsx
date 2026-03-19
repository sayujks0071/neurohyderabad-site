'use client';

import Script from 'next/script';
import { GA4_MEASUREMENT_ID, GOOGLE_TAG_ID } from '../lib/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Tag (GT-MJKVR5ZT) — unified tag for GA4, Ads, etc. */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
      />
      <Script
        id="google-tag"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
          `,
        }}
      />
      {/* GA4 config — keeps existing event tracking working */}
      {GA4_MEASUREMENT_ID !== GOOGLE_TAG_ID && (
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', '${GA4_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                custom_map: {
                  'custom_parameter_1': 'medical_specialty',
                  'custom_parameter_2': 'location'
                }
              });
            `,
          }}
        />
      )}
    </>
  );
}
