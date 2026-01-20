# Prioritized SEO Fixes

| Issue | Impact (1-5) | Effort (1-5) | Risk | Do now? | Fix Summary |
|-------|--------------|--------------|------|---------|-------------|
| **LCP Poor (16s)** | 5 | 3 | Med | **Yes** | Optimize Hero Image (Verified `priority={true}` is present, added `sizes` attribute). |
| **Sitemap Redirects** | 3 | 1 | Low | **Yes** | Remove `locations/neurosurgeon-near-jubilee-hills` and non-canonical location pages from `sitemap.ts`. |
| **Schema Missing Fields** | 4 | 2 | Low | **Yes** | Add `priceRange` to Physician schema. Add `reviewedBy` to MedicalWebPage schema. |
| **Missing H1 Tags** | 4 | 2 | Low | No | Add H1 to pages flagged in onpage_issues.csv (Requires content update). |
| **Duplicate Titles** | 3 | 2 | Low | No | Update metadata for conflicting pages. |
| **Orphan Pages** | 3 | 3 | Med | No | Add internal links to `spine-surgery`, `pediatric-neurosurgery`. |
| **Telugu Content** | 2 | 4 | Low | No | Create `/te/` landing page. |

## Top 3 "Do Now"
1. **Fix Sitemap:** Clean up redirects and non-canonicals.
2. **Schema Update:** Fix Physician and Blog schema gaps.
3. **Performance LCP:** Hero image optimization (sizes attribute added).
