# Performance Delivery Stack

## Observations
- Next.js automatically sets Cache-Control for immutable static assets under `/_next/`.
- `next.config.mjs` was manually overriding `/_next/static/css/:path*`, `/_next/static/js/:path*`, and `/_next/static/:path*` causing Next.js build warnings.
- Vercel automatically deploys with a global Edge Network caching strategy. Manual overrides on internal paths break optimal delivery.
- `TTFB`: ~200-500ms for dynamic pages, ~50ms for cached routes.

## Recommended Fix
- Remove custom `Cache-Control` headers for `/_next/static/` paths in `next.config.mjs` to restore native Next.js optimized caching behavior.
