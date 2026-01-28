# Prioritized SEO Fixes

## High Priority (Do Now)
1. **Truncate Long Meta Descriptions in MDX Blog Posts**
   - **Issue:** Several blog posts have descriptions > 160 characters (e.g., `brain-aneurysm-vs-migraine-warning-signs-hyderabad.mdx`).
   - **Fix:** Manually edit the MDX frontmatter to shorten descriptions.
   - **Impact:** High (CTR in SERP).
   - **Effort:** Low.
   - **Risk:** Low.

2. **Verify & Fix Blog Listing Metadata**
   - **Issue:** Static analysis suggested potential issues with `app/blog/page.tsx` metadata generation (though likely false positive, better safe).
   - **Fix:** Ensure static metadata is correctly exported and valid.
   - **Impact:** High (Main Blog landing page).
   - **Effort:** Low.
   - **Risk:** Low.

3. **Enhance Homepage Hero Image LCP**
   - **Issue:** Ensure the hero image (Doctor's portrait) has `priority` attribute (already confirmed present, but verifying sizes/formats).
   - **Fix:** Confirm `sizes` attribute is optimal.
   - **Impact:** Medium (CWV).
   - **Effort:** Low.
   - **Risk:** Low.

## Medium Priority (Backlog)
- Create dedicated "Cost of Surgery" landing page if the current blog/service page is insufficient.
- Add "Second Opinion" landing page.
- Implement more specific LocalBusiness schema for secondary locations.

## Low Priority
- Fix "Missing H1" false positives in static analysis script (tooling improvement).
