# Prioritized Fix Backlog

| Issue | Evidence | Affected URLs | Fix Summary | Impact | Effort | Risk | Do now? |
|-------|----------|---------------|-------------|--------|--------|------|---------|
| **Schema: Missing Medical Reviewer** | `audit/schema/ymyl_gap_list.md` | All Condition/Service Pages | Add `reviewedBy` to `MedicalWebPage` schema pointing to Dr. Sayuj. | 5 | 3 | Low | **Yes** |
| **Sitemap: Redirects & 404s** | `audit/tech/robots_sitemap_notes.md` | `sitemap.xml` | Remove 308/404 URLs (e.g. `/disease-guides`, `/sciatica-treatment-hyderabad`) from `app/sitemap.ts`. | 4 | 2 | Low | **Yes** |
| **OnPage: Multiple H1 Tags** | `audit/onpage/onpage_issues.csv` | `/appointments` | Ensure only one H1 exists (likely hidden H1 conflict). | 3 | 1 | Low | **Yes** |
| **OnPage: Missing Canonical** | `audit/onpage/onpage_issues.csv` | `/knowledge-base` | Add canonical tag to `knowledge-base` page. | 4 | 1 | Low | **Yes** |
| **Content: Cost & Recovery Table** | `audit/competitors/competitor_gap.md` | `/services/endoscopic-spine-surgery-hyderabad` | Add summary cost table to match competitors. | 4 | 3 | Med | No (Content Task) |
| **Content: Specific Procedures** | `audit/competitors/competitor_gap.md` | Service Pages | Add sections for TESS/Interlaminar approaches. | 4 | 4 | Med | No (Content Task) |
| **Performance: TTFB Optimization** | `audit/headers/headers_report.md` | All | Optimize server-side data fetching. | 3 | 4 | Med | No |
| **Title Tags Too Long** | `audit/onpage/onpage_issues.csv` | Most Pages | Shorten titles to <60 chars. | 3 | 2 | Low | No (Bulk Task) |

## Selected "Do Now" Fixes
1. **Schema Enhancement:** Add `reviewedBy`.
2. **Sitemap Cleanup:** Fix `app/sitemap.ts`.
3. **Tech Fixes:** Single H1 on `/appointments` and Canonical on `/knowledge-base`.
