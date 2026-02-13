# Prioritized Fix Backlog

**Date:** 2026-02-13
**Audit Run:** #1

## Summary of Findings
-   **Critical On-Page Issues:** 46 pages have missing or duplicate H1s, titles too long, or missing meta descriptions.
-   **Performance:** Homepage LCP is poor (6.5s). Inner pages are decent (3.2s) but can be improved.
-   **Competitor Gap:** Missing structured cost info, recovery timelines, and extensive FAQs on service pages.
-   **Schema:** Basic schema exists but lacks depth (FAQPage, Article specific fields).

## Priority Matrix

| Issue | Evidence | Affected URLs | Fix Summary | Impact (1-5) | Effort (1-5) | Risk | Do now? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Missing/Duplicate H1s & Meta Titles** | `audit/onpage/onpage_issues.csv` | 46 pages (e.g., conditions/sciatica...) | Audit and fix metadata in `page.tsx` or `layout.tsx`. Ensure unique H1 per page. | 5 | 2 | Low | **Yes** |
| **Missing FAQPage Schema** | `audit/competitors/competitor_gap.md` | Service & Condition Pages | Add `FAQPage` JSON-LD to `app/services/[slug]/page.tsx` and `app/conditions/[slug]/page.tsx`. Populate with content. | 4 | 3 | Low | **Yes** |
| **Homepage LCP (6.5s)** | `audit/lighthouse/home.report.json` | `/` | Optimize hero image (preload, priority), reduce unused JS, defer non-critical scripts. | 5 | 3 | Med | **Yes** |
| **Missing Cost & Recovery Info** | `audit/competitors/competitor_gap.md` | Service Pages | Add "Cost of Surgery" and "Recovery Timeline" sections to service templates. | 4 | 4 | Med | No |
| **Unused JavaScript** | `audit/lighthouse/summary.md` | All Pages | Analyze bundle, code split heavy components, lazy load third-party scripts. | 3 | 4 | High | No |
| **Thin Content (<300 words)** | `audit/crawl/url_inventory.csv` | Some blog/condition pages | Expand content with "Symptoms", "Diagnosis", "Treatment" sections. | 3 | 5 | Low | No |
| **Image Alt Text** | `audit/onpage/onpage_issues.csv` | Various | Add descriptive alt text to images. | 2 | 2 | Low | No |

## Top 3 "Do Now" Fixes

1.  **Fix Critical On-Page Issues (Metadata & H1s):**
    -   **Why:** Direct impact on CTR and rankings. Low risk.
    -   **Action:** Review `audit/onpage/onpage_issues.csv` and fix the top offenders in the codebase.

2.  **Add FAQPage Schema to Service/Condition Pages:**
    -   **Why:** Competitors use it. Increases SERP real estate (Rich Snippets).
    -   **Action:** Implement `FAQSchema` component or inject JSON-LD in `page.tsx` for these routes.

3.  **Optimize Homepage LCP:**
    -   **Why:** 6.5s is too slow. First impression matters.
    -   **Action:** optimize Hero section images and loading strategy.
