# SEO Prioritized Fix List
Generated: 2026-03-20T00:29:28.949Z

| Issue | Evidence | Affected URLs | Fix Summary | Impact (1-5) | Effort (1-5) | Risk | Do now? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Missing BreadcrumbList Schema** | `audit/schema/schema_issues.csv` | /blog, /conditions, /services | Add BreadcrumbList JSON-LD to key layout or page templates | 4 | 2 | Low | **Yes** |
| **Missing MedicalClinic/Physician Schema on Homepage** | `audit/schema/schema_issues.csv` | / | Inject `MedicalClinic` and `Physician` schema into the homepage to solidify local entity | 5 | 1 | Low | **Yes** |
| **robots.txt dynamic generation** | `audit/tech/tech_issues.csv` | /robots.txt | Ensure `app/robots.ts` or `app/robots.txt/route.ts` is implemented according to memory constraints | 3 | 1 | Low | **Yes** |
| **Missing Author/Reviewer schemas on Article** | `audit/schema/ymyl_gap_list.md` | /blog/* | Update Article JSON-LD with YMYL reviewer/author details | 4 | 2 | Low | No |
| **Multiple H1s or missing metadata** | `audit/onpage/onpage_issues.csv` | various | Consolidate H1 tags, enforce length limits for title/desc | 3 | 3 | Med | No |
| **Render-blocking resources (Lighthouse)** | `audit/lighthouse/summary.md` | / | Defer scripts, optimize fonts, implement next/font | 3 | 4 | Med | No |
