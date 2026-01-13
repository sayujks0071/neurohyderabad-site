# Prioritized Fix Backlog

| Issue | Evidence | Affected URLs | Fix Summary | Impact | Effort | Risk | Do Now? |
|-------|----------|---------------|-------------|--------|--------|------|---------|
| **Sitemap Fragmentation** | `audit/crawl/url_inventory.csv` | Global (70+ orphan pages) | Consolidate `app/sitemap.ts` to include all routes detected in file system and `sitemap-blog.ts`. | 5 | 2 | Low | **Yes** |
| **Missing Metadata** | `audit/static_audit.csv` | `knowledge-base`, `brain-tumor-surgery` | Add `export const metadata` or fix component structure. | 5 | 2 | Low | **Yes** |
| **Missing H1 Tags** | `audit/static_audit.csv` | `app/appointments/page.tsx`, `auth/callback` | Add visible H1 for accessibility and SEO. | 4 | 1 | Low | **Yes** |
| **Missing Schema** | `audit/static_audit.csv` | `blog/*` pages | Ensure `BlogLayout` or page injects `BlogPosting` schema. | 4 | 2 | Low | **Yes** |
| **Performance: img vs Image** | `audit/static_audit.csv` | `app/api/og/route.tsx` | Use `next/image` or confirm it's intentional (OG images use standard img usually). | 2 | 2 | Low | No |
| **Ghost URLs** | `audit/crawl/url_inventory.csv` | 40+ URLs | Remove from sitemap or create redirects/pages. | 3 | 1 | Low | **Yes** |

## "Do Now" Plan
1.  **Fix Sitemap:** Update `app/sitemap.ts` to dynamically crawl `content/blog` (files) instead of using a hardcoded list, and include all app routes. (Done)
2.  **Fix Missing Metadata:** Add metadata to `app/knowledge-base/page.tsx` by refactoring to Server Component. (Done)
3.  **Fix Missing H1:** Add H1 to `app/appointments/page.tsx`. (Doing now)
4.  **Fix Schema:** Verified `BlogLayout` schema injection. (Done)
