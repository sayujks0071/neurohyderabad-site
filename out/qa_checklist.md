# SEO Benchmark R1 — QA Checklist

Use this log to confirm implementation status before merging. Record **Issue → Impact → Fix → Owner** along with evidence file paths.

| Area | Issue | Impact | Fix Implemented | Owner | Evidence |
| ---- | ----- | ------ | --------------- | ----- | -------- |
| Canonicals |  |  |  | Dev | Screenshot of page source showing `<link rel="canonical">` |
| Hreflang |  |  |  | Dev | View-source snippet / GSC coverage |
| Metadata | Homepage meta >155 characters trimmed to ≤155 | Avoid SERP truncation |  | Content | Screenshot of updated meta |
| Schema | MedicalWebPage + MedicalCondition/Procedure + FAQPage + BreadcrumbList + Physician + MedicalClinic linked | Enables Rich Results |  | Dev/SEO | `out/screenshots/rr_<slug>_ok.png` |
| FAQ On-Page | Visible FAQ content matches schema text | Prevents manual actions |  | Content | Screenshot of FAQ section |
| Internal Links | Anchors applied per `out/internal_link_plan.csv` | Improves crawlability |  | Dev | Screengrab of anchor placement |
| Navigation | Patient Stories & Locations links live | CRO uplift |  | Dev | Header screenshot mobile + desktop |
| Redirects | Legacy URLs 301 to new slugs | Recover link equity |  | Dev | `redirects_validation.txt` |
| Sitemap | XML & HTML sitemap updated, submitted | Indexation |  | SEO | `gsc_sitemap_submission.png` |
| Robots | Pages are indexable, no unintended `noindex` | Ensure crawling |  | Dev | HTTP header / HTML check |
| Performance | LCP < 2.5s, CLS < 0.1 (mobile) | CWV compliance |  | Dev | Lighthouse mobile screenshot |
| Accessibility | ARIA labels + contrast pass | A11y compliance |  | Dev | Lighthouse Accessibility score |
| GA4 Events | view_service_page, click_call, click_whatsapp, book_appointment firing | Measurement ready |  | Analytics | Debug screenshot |
| CRO Experiments | Flags configured for variants | Test readiness |  | Dev/Analytics | Feature flag screenshot |
| Local SEO | GBP posts published (3) | Local visibility |  | SEO | GBP dashboard screenshot |
| Citations | Top 10 directories updated | NAP consistency |  | SEO | Tracker updated |
| Security Headers | HSTS + CSP + Referrer-Policy verified | Hardening |  | Dev/Ops | `curl -I` output |

Add additional rows if new issues surface. Keep the table updated during QA and reference it in the PR description.
