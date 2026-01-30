# Prioritized Fix Backlog

| Issue | Impact (1-5) | Effort (1-5) | Risk | Status |
|-------|--------------|--------------|------|--------|
| **CRITICAL: Sitemap Redirect Loop** | 5 | 1 | Low | **Do Now** |
| **CRITICAL: 40+ Ghost URLs in Sitemap** | 5 | 2 | Low | **Do Now** |
| **SEO: Title Tag Truncation & Duplication** | 3 | 2 | Low | **Do Now** |
| Content: Missing Cost Tables | 4 | 3 | Med | Backlog |
| Content: Procedure Step-by-Step | 3 | 3 | Med | Backlog |
| Tech: 404s for specific conditions | 3 | 2 | Low | Backlog |

## Top 3 "Do Now" Plan

1. **Fix Sitemap Loop**:
   - Investigate `next.config.mjs` and `app/sitemap.ts`.
   - Remove conflicting redirect or fix trailing slash behavior.

2. **Fix Ghost URLs**:
   - Identify which URLs in `sitemap-*.ts` do not exist.
   - Comment them out or remove them until content is ready.

3. **Optimize Metadata**:
   - Update `app/layout.tsx` title template to be shorter or remove " | Dr. Sayuj Krishnan" if the page title already includes it.
   - Specific fix for `/appointments` title.
