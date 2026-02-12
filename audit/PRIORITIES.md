# Prioritized Fix Backlog

| Issue | Impact (1-5) | Effort (1-5) | Risk | Do Now? | Fix Summary |
|---|---|---|---|---|---|
| **Sitemap Redirect Loop** | 5 | 2 | Low | **YES** | Fix `app/sitemap.xml/route.ts` and `next.config.mjs` redirect conflict causing 308 loop. |
| **Multiple H1 Tags (Homepage)** | 4 | 2 | Low | **YES** | Refactor Homepage (`app/page.tsx`) to have single H1. Downgrade secondary H1s to H2. |
| **Homepage Performance (TBT/LCP)** | 3 | 4 | Med | **YES** | Optimize critical rendering path. Defer non-essential scripts. Optimize hero image loading. |
| **Title Tags Too Long** | 3 | 3 | Low | No | Shorten titles on inner pages (About, Contact, etc.) to < 60 chars. |
| **Missing Meta Descriptions** | 3 | 3 | Low | No | Add unique meta descriptions to pages flagged in audit. |
| **Schema Enhancement** | 2 | 3 | Low | No | Ensure `Physician` schema is robust and includes reviews/aggregateRating if possible. |
| **Broken Links (404s)** | 3 | 2 | Low | No | Fix internal 404s found in crawl (if any). |

## Selected "Do Now" Tasks

1.  **Fix Sitemap Redirect Loop**: Critical for indexability.
2.  **Fix Multiple H1 Tags**: Critical for on-page relevance and structure.
3.  **Homepage Performance**: Improve Core Web Vitals (LCP/TBT) for better UX and ranking signal.
