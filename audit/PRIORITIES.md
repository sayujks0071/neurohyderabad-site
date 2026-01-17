# Prioritized Fix List

| Priority | Issue | Affected URLs | Impact | Effort | Risk | Do Now? |
|---|---|---|---|---|---|---|
| **1** | **Missing Article Schema on Hardcoded Blogs** | `/blog/sciatica-pain-management-hyderabad`, etc. | High | Medium | Low | **Yes** |
| **2** | **Sitemap Conflict (Static vs Dynamic)** | `/sitemap.xml` | High | Low | Low | **Yes** |
| **3** | **Long Title Tags (> 65 chars)** | Homepage, Service Pages | Medium | Low | Low | **Yes** |
| 4 | Missing FAQPage Schema on Service Pages | `/services/*` | Medium | Medium | Low | No |
| 5 | "No Surgery" Content Gap | Sciatica Page | Medium | Medium | Low | No |

## Execution Plan
1. **Fix Sitemap:** Configure `next-sitemap` to stop generating `sitemap.xml` (keep image/video sitemaps) so `app/sitemap.ts` takes precedence.
2. **Fix Blog Schema:** Refactor one hardcoded blog page to use `BlogLayout` OR manually add `Article` schema to it. *Decision:* Since migrating to MDX is larger effort, I will add `BlogLayout` wrapper or schema injection to `app/blog/sciatica-pain-management-hyderabad/page.tsx` as a proof of concept/fix.
3. **Fix Titles:** Update `app/layout.tsx` metadata template or individual page titles to be shorter.
