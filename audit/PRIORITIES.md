# Prioritized Fix List (SEO Audit)

| Issue | Affected URLs | Fix Summary | Impact | Effort | Risk | Do Now? |
|-------|---------------|-------------|--------|--------|------|---------|
| **Sitemap Fragmentation** | All | Consolidated fragmented sitemap routes (`sitemap-*.xml`) into a single `app/sitemap.ts` and cleaned up `robots.txt`. | 5 | 2 | Low | **Yes** |
| **Missing Schema Image** | Homepage / Global | Updated `PhysicianSchema` to use `dr-sayuj-krishnan-portrait-optimized.jpg` instead of missing image. | 5 | 1 | Low | **Yes** |
| **Canonical URL Logic** | Homepage | Refactored `app/page.tsx` to use robust `makeMetadata` utility for canonical generation. | 4 | 2 | Low | **Yes** |
| **Broken Sitemap Links** | Robots.txt | Fixed `robots.txt` pointing to non-existent sitemaps (before consolidation). | 5 | 1 | Low | **Yes** |
| **Missing Content/Keywords** | Competitor Gap | Create dedicated pages for "Spine Surgery Cost" and specific conditions found in competitor analysis. | 4 | 4 | Low | No |
| **Performance (CLS)** | Homepage | Dynamic imports are already using `loading` placeholders, but verify heights match exactly. | 3 | 3 | Med | No |
