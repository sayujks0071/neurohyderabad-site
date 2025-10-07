# Sitemap Update Instructions

## If Using `app/sitemap.ts`
1. Open `app/sitemap.ts`.
2. Append entries for the five new URLs:
   - `/conditions/trigeminal-neuralgia-treatment-hyderabad`
   - `/conditions/brain-tumor-surgery-hyderabad`
   - `/symptoms/signs-of-brain-tumor`
   - `/symptoms/pain-on-top-of-head-causes`
   - `/conditions/cervical-radiculopathy-treatment`
3. Set `changeFrequency: "weekly"` and `priority: 0.8` (adjust per convention).
4. Update `lastModified` to `new Date()` for each item.

## If Using Static `public/sitemap.xml`
1. Add `<url>` blocks for each path with `<loc>https://www.drsayuj.com/...`</loc>.
2. Include `<lastmod>` in ISO format, e.g., `2025-02-14`.
3. Regenerate using your existing sitemap script if available (`next-sitemap`).

## HTML Sitemap (if present)
- Add the five URLs to the HTML sitemap page (commonly `app/sitemap/page.tsx`).
- Group them under appropriate headings (Conditions / Symptoms).

## Post-Deployment Steps
1. Deploy preview and confirm sitemap includes new URLs.
2. Submit sitemap in Google Search Console:
   - `https://www.drsayuj.com/sitemap.xml`
   - Capture screenshot (`gsc_sitemap_submission.png`) for evidence.
3. Optional: Submit sitemap to Bing Webmaster Tools.
4. Use “URL Inspection” tool for each new page and request indexing.
