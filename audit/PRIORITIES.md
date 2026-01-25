# Prioritized Fix Backlog

| Issue | Impact (1-5) | Effort (1-5) | Risk | Do Now? | Fix Summary |
|---|---|---|---|---|---|
| **Sitemap Orphans (32 pages)** | 5 | 2 | Low | **YES** | Update `app/sitemap.ts` lists to include all discovered orphans. |
| **Missing Physician Schema** | 5 | 3 | Low | **YES** | Add robust `Physician` schema to `layout.tsx` or key pages. |
| **Metadata Quality (Long Titles)** | 4 | 2 | Low | **YES** | Truncate/Rewrite titles on key Service pages to < 60 chars. |
| **Sitemap Redirect Loop** | 4 | 3 | Med | No | Investigate `next-sitemap` vs `app/sitemap.ts` conflict. |
| **LCP/Performance** | 3 | 4 | Med | No | (No Lab data to confirm) Optimize images later. |
| **Competitor Content Gaps** | 3 | 5 | Low | No | Write new content for "Cost" pages. |

## Selected for Implementation
1. **Sitemap Synchronization:** Manually add the 32 orphan routes to `app/sitemap.ts`.
2. **Schema Injection:** Ensure `Physician` schema with `medicalSpecialty` is present.
3. **Metadata Tuning:** Optimize titles for Home and top 5 service pages.
