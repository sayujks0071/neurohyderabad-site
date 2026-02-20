# Prioritized SEO Fixes

**Date:** 2025-02-18
**Based on:** Full Site Crawl, Lighthouse Audit, Competitor Benchmark

## 🚨 Critical Issues (Do Now)

| Issue | Impact (1-5) | Effort (1-5) | Risk | Action Plan |
|---|---|---|---|---|
| **LCP & TBT High** (LCP: ~3.1s, TBT: ~522ms) | 5 | 3 | Med | Optimize fonts (preload critical), lazy load non-critical resources, review `next/script` usage. |
| **Title Tags Too Long** (>60 chars) | 4 | 1 | Low | Truncate and optimize titles for 28 pages. Inject "Same Day Discharge" where possible. |
| **Competitor Content Gap** (Lack of Procedure Details) | 4 | 2 | Low | Add "Procedure at a Glance" table (Duration, Anesthesia, Recovery) to service pages. |
| **Schema Duplication** | 3 | 2 | Low | De-duplicate `Physician` and `Breadcrumb` schema injections in `layout.tsx` vs individual pages. |

## ⚠️ High Priority (Do Next)

| Issue | Impact | Effort | Risk | Notes |
|---|---|---|---|---|
| **Keyword Gap: "Full Endoscopic"** | 4 | 2 | Low | Update content to include "Full Endoscopic" and "Uniportal" terminology. |
| **Accessibility (Color Contrast)** | 3 | 2 | Low | Fix color contrast issues flagged by Lighthouse (likely blue text on light blue bg). |
| **Unused JavaScript** | 4 | 4 | Med | Analyze bundle analyzer report and tree-shake unused dependencies. |

## ℹ️ Maintenance (Backlog)

- Monitor 404s (None found in this crawl).
- Expand blog content for "recovery" keywords.
- Create more video testimonials.

## Selected Top 3 Fixes for Implementation

1.  **Metadata & Content Polish**:
    - Fix "Title Too Long" for 28 pages.
    - Add "Procedure Highlights" table to `endoscopic-spine-surgery-hyderabad` and `brain-tumor-surgery-hyderabad`.
2.  **Performance Quick Wins**:
    - Ensure fonts are preloaded/swapped correctly.
    - Defer non-critical scripts (chat widget, analytics) further.
3.  **Schema Deduplication**:
    - Clean up schema injection logic to prevent duplicate JSON-LD blocks.
