'use client';

import Script from 'next/script';

export default function MiddlewareRUM() {
  return (
    <Script
      id="middleware-rum"
      src="https://cdnjs.middleware.io/browser/libs/0.0.2/middleware-rum.min.js"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).Middleware) {
          (window as any).Middleware.track({
            serviceName: "drsayuj-website",
            projectName: "drsayuj-website",
            accountKey: "svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea",
            target: "https://hjptv.middleware.io",
            tracePropagationTargets: ["https://www.drsayuj.info/"],
            defaultAttributes: {
              "app.version": "1.0.0",
            },
          });
        }
      }}
    />
  );
}
