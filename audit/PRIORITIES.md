# Prioritized Fix Backlog

| Issue | Evidence | Affected URLs | Fix Summary | Impact | Effort | Risk | Do now? |
|-------|----------|---------------|-------------|--------|--------|------|---------|
| **Sitemap Redirects (308)** | `url_inventory.csv` (Status 308) | `/conditions/a-z/*`, `/locations/neurosurgeon-near-jubilee-hills` | Update `sitemap.xml` generation to exclude redirected URLs or point to final destination. | 5 | 2 | Low | **Yes** |
| **Missing FAQPage Schema** | `schema_issues.csv` | Condition & Service Pages | Implement `FAQPage` schema in `MedicalWebPage` or page templates. | 4 | 3 | Low | **Yes** |
| **Orphaned Pages** | `url_inventory.csv` (Inlinks: 0) | `/awake-brain-surgery`, etc. | Add internal links from `/services` or `/conditions` hubs. | 3 | 2 | Low | **Yes** |
| **Missing H1/Meta** | `onpage_issues.csv` | Few pages | Add missing H1 and Meta Description. | 4 | 1 | Low | No |
| **Performance (Fonts)** | `headers_report.md` | Global | Ensure fonts are subsetted and preloaded. (Already good, but verify) | 3 | 3 | Low | No |
| **Visual Recovery Timelines** | `competitor_gap.md` | Service Pages | Add visual timeline components. | 3 | 4 | Med | No |

## Top 3 "Do Now"
1. **Fix Sitemap Generation:** Ensure only 200 OK URLs are in sitemap. The 308s are likely due to `redirects` in `next.config.mjs` but sitemap includes the source URL.
2. **Implement FAQ Schema:** Add `FAQPage` schema to `src/components/schema/MedicalWebPage.tsx` or similar.
3. **Fix Orphaned Pages:** Link orphaned pages from their respective hub pages.
