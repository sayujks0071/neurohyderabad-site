# SEO Audit Priorities

| Issue | Evidence | Affected URLs | Fix Summary | Impact | Effort | Risk | Do Now? |
|---|---|---|---|---|---|---|---|
| **404 Blog Posts** | Crawl (8 URLs 404) | `/blog/*` (new posts) | Set `dynamicParams = true` in `app/blog/[slug]/page.tsx` to enable ISR for new slugs. | 5 | 1 | Low | **Yes** |
| **Missing Surgical Procedure Schema** | Competitor Gap Analysis | `/services/*` | Create `MedicalProcedureSchema.tsx` with `SurgicalProcedure`, `howPerformed`, `recoveryTime`. | 4 | 3 | Low | **Yes** |
| **Hardcoded Schema Dates** | `MedicalWebPageSchema.tsx` | All pages using this schema | Update schema component to accept `datePublished` prop. | 2 | 2 | Low | **Yes** |
| **Duplicate H1 (Disclaimer)** | `duplicates.md` | `/disclaimer`, `/medical-disclaimer` | Unique H1s for disclaimer pages. | 1 | 1 | Low | No |
| **Lighthouse Performance** | Lighthouse Reports | Homepage, Service Pages | Optimize images (LCP) and reduce TBT (JS execution). | 3 | 4 | Med | No |

## Top 3 "Do Now" Fixes (Low/Med Risk)

1.  **Fix 404 Blog Posts:** Update `app/blog/[slug]/page.tsx`.
2.  **Add MedicalProcedure Schema:** Create and implement `MedicalProcedureSchema.tsx`.
3.  **Improve Schema Dates:** Update `MedicalWebPageSchema.tsx`.
