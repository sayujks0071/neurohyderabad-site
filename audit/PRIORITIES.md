
# Prioritized SEO Fixes

**Date:** 2025-05-23

| Issue | Affected Pages | Fix Summary | Impact (1-5) | Effort (1-5) | Risk | Do Now? |
|-------|----------------|-------------|--------------|--------------|------|---------|
| **Missing MedicalWebPage Schema** | All Condition Pages (`/conditions/[slug]`) | Update `ConditionStructuredData.tsx` to wrap schema in `MedicalWebPage` and add `reviewedBy` (Dr. Sayuj) + `author`. | 5 (High) | 2 (Low) | Low | **YES** |
| **Domain Redirect Split** | `drsayuj.com` | Update `next.config.mjs` to redirect `.com` to `.info` (Canonical) instead of keeping it on `.com`. | 4 (High) | 1 (Low) | Low | **YES** |
| **Blog Metadata Length** | ~10 Blog Posts | Update frontmatter in MDX files to shorten titles/descriptions to 60/160 chars. | 3 (Med) | 2 (Low) | Low | **YES** |
| **Missing Static Metadata** | `/about`, `/locations` | (False Positive) Audit script failed to parse, but manual check confirmed presence. | 1 | 1 | Low | No |
| **Competitor Content Gap** | "Sciatica Treatment" | Create deeper content or new landing page to match Dr. Raveesh. | 4 | 5 (High) | Low | No |
| **Site Speed (RUM)** | All | Continue monitoring. Current TTFB is good. | 3 | 3 | Low | No |

## "Do Now" Execution Plan

1.  **Schema:** Modify `app/conditions/ConditionStructuredData.tsx` to implement `MedicalWebPage` schema.
2.  **Tech:** Modify `next.config.mjs` to fix the `.com` redirect.
3.  **Content:** Manually fix the top 5 blog posts with long titles/descriptions from `audit/onpage/onpage_issues.csv`.
