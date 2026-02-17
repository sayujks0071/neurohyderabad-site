# SEO Audit Priorities & Fix Backlog

| ID | Issue | Affected URLs | Impact (1-5) | Effort (1-5) | Risk | Status |
|---|---|---|---|---|---|---|
| **P1** | **Critical LCP (16s)** | Global (Homepage, Service Pages) | 5 (High) | 3 (Med) | Low | **Investigating** |
| **P2** | **Missing Metadata & H1** | `/brain-tumor-surgery` | 5 (High) | 1 (Low) | Low | **Resolved** (Redirects) |
| **P3** | **Schema Gaps (MedicalClinic)** | Location Pages (`/locations/*`) | 4 (High) | 2 (Low) | Low | **Resolved** |
| **P4** | **Canonical Mismatches** | Blog Pages (Trailing Slash) | 4 (High) | 1 (Low) | Low | **Resolved** |
| **P5** | **Title Too Long** | Global | 3 (Med) | 1 (Low) | Low | **In Progress** |
| P6 | Thin Content | `/drafts`, `/knowledge-base` | 2 (Low) | 2 (Low) | Low | Backlog |

## Status Updates (2026-02-16)

### Resolved: Canonical Mismatches & Title Optimization
- **Fix:** Removed trailing slashes from `canonicalUrl` in `src/lib/blog-seo.ts` and `app/_components/BlogLayout.tsx` to align with `next.config.mjs` (`trailingSlash: false`).
- **Fix:** Shortened blog title suffix from ` | Dr. Sayuj Krishnan - Neurosurgeon Hyderabad` to ` | Dr. Sayuj Krishnan` to prevent SERP truncation and improve CTR.

### Resolved: Schema Gaps
- Validated `MedicalClinic`, `Physician`, and `BreadcrumbList` schemas are present and valid on key pages.

### Resolved: Multiple H1 False Positives
- Updated audit script to correctly count H1 tags, confirming only single H1s exist on key pages like Homepage and Appointments.

### Next Steps (P1 LCP)
- The LCP issue needs deeper profiling. Hero images already use `priority`.
- Potential causes: Blocking JS (Middleware/Analytics) or server response time (TTFB).
- **Action:** Monitor TTFB in Vercel Analytics after deployment.
