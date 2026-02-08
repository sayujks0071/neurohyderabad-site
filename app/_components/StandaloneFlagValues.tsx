import { FlagValues } from 'flags/react';

/**
 * Emit the 18 standalone feature-flag default values for the Vercel
 * Flags Explorer toolbar.
 *
 * IMPORTANT: We intentionally pass **static default values** rather
 * than calling `await flagFn()` for each flag.  The Flags SDK's
 * `flag()` wrapper calls `headers()` internally to read the override
 * cookie, which makes the rendering context dynamic.  Pages that
 * declare `dynamic = "error"` (many /conditions/* and /locations
 * pages) then fail during static generation.
 *
 * Passing defaults directly avoids the `headers()` call.  The toolbar
 * still picks up the values (via <script data-flag-values>) and lets
 * you toggle overrides at runtime.
 *
 * If a flag's default ever changes in `flags.ts`, update the
 * corresponding entry here to keep the toolbar in sync.
 */
export default function StandaloneFlagValues() {
  return (
    <FlagValues
      values={{
        // ── SEO & Crawl ──
        'seo-noindex': false,
        'structured-data-enabled': true,
        'sitemap-extensions': true,
        'crawl-budget-mode': 'standard',

        // ── UX & Conversion ──
        'cta-experiment': 'control',
        'sticky-cta-enabled': true,
        'sticky-cta-experiment': 'control',
        'chat-widget-enabled': true,
        'appointment-form-variant': 'standard',

        // ── Performance ──
        'image-optimization': 'avif_webp',
        'font-display': 'swap',
        'prefetch-links': true,
        'production-sourcemaps': true,

        // ── Content & Features ──
        'show-testimonials': true,
        'show-video-section': true,
        'show-faq-section': true,
        'blog-enabled': true,
        'location-pages-enabled': true,
      }}
    />
  );
}
