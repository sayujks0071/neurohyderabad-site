# Validation Evidence Capture

Use this folder to store proof that the new pages meet schema, performance, and QA requirements before merging **seo/benchmark-r1**.

## Files to Supply
- `rr_<slug>_ok.png` — Rich Results Test screenshot showing “0 errors / 0 warnings”.
- `schema_<slug>.json` — (optional) Pretty-printed JSON-LD export for archival.
- `lh-mobile_<slug>.png` — Lighthouse mobile report screenshot with scores ≥ target.
- `redirects_validation.txt` — Output of `bash /out/scripts/test-redirects.sh`.
- `gsc_sitemap_submission.png` — Screenshot of sitemap submission confirmation.
- `ga4_events_<component>.png` — (optional) GA4 DebugView or network proof of event firing.

## Capture Steps
1. Deploy preview of branch `seo/benchmark-r1`.
2. For each new page:
   - Run the URL through [Rich Results Test](https://search.google.com/test/rich-results).
   - Save screenshot as `rr_<slug>_ok.png`.
   - Optionally export detected schema JSON.
   - Run Lighthouse (Chrome DevTools → Lighthouse → Mobile → Performance, Best Practices, Accessibility, SEO).
   - Save mobile report screenshot.
3. After redirects configured, run `bash /out/scripts/test-redirects.sh` (update base URL inside file if needed) and save terminal output.
4. Submit the updated sitemap to Google Search Console; capture a screenshot.
5. Upload all evidence files into this folder before opening the PR.

## Naming Conventions
- Use the slug exactly as it appears in the path. Example:
  - `rr_trigeminal-neuralgia-treatment-hyderabad_ok.png`
  - `lh-mobile_brain-tumor-surgery-hyderabad.png`
- Keep filenames lowercase with hyphen separators; avoid spaces.

## Checklist Reminder
- Complete `../qa_checklist.md` alongside evidence.
- Link to each evidence file in the PR description for quick reviewer access.
