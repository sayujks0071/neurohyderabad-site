# Prioritized Fix Backlog

| Issue | Evidence | Affected URLs | Fix Summary | Impact | Effort | Risk | Do Now? |
|---|---|---|---|---|---|---|---|
| **Missing YMYL Schema** | `audit/schema/ymyl_gap_list.md` | Service & Condition Pages | Inject `MedicalWebPage` and `FAQPage` JSON-LD. | 5 | 2 | Low | **Yes** |
| **Title Tags Too Long** | `audit/onpage/onpage_issues.csv` | ~40 pages (Service/Blog) | Shorten titles to < 60 chars to prevent truncation. | 4 | 2 | Low | **Yes** |
| **Title Tags Too Short** | `audit/onpage/onpage_issues.csv` | `/services/awake-spine-surgery-hyderabad` | Expand title with keywords. | 3 | 1 | Low | **Yes** |
| **Missing Cache Headers** | `audit/headers/headers_report.md` | All Pages | Add `Cache-Control` headers in `next.config.mjs`. | 4 | 2 | Med | No |
| **Missing Content Depth** | `audit/competitors/competitor_gap.md` | Insurance/Cost Pages | Create new pages for "Cost of Surgery" and "Insurance". | 4 | 5 | Low | No |

## "Do Now" Selection
1.  **Implement `MedicalWebPage` Schema:** Critical for E-E-A-T and YMYL compliance.
2.  **Optimize Titles (Short/Long):** Quick win for CTR.
3.  **Fix `awake-spine-surgery` Title:** Specific targeting.
