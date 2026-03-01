# SEO Daily Ops Report - 2026-02-28

## Competitor Advantage Summary
- **What competitors do better (today's notes):**
  1. Top ranking competitors (like Apollo Hospitals, Yashoda Hospitals) use robust `VideoObject` and `FAQPage` schema on their procedure pages.
  2. Competitors often have deep hub-and-spoke internal linking strategies for spine conditions and their respective surgical treatments.
  3. Competitor pages feature clearer trust signals (e.g., patient testimonials with structured data) above the fold.
- **Gaps/opportunities on our site:**
  1. Missing `VideoObject` schema on pages that feature embedded YouTube videos (like Minimally Invasive Spine Surgery).
  2. Lack of comprehensive FAQ schema on service pages.
  3. Opportunity to interlink better between condition pages (e.g., Herniated Disc) and treatment pages (e.g., Endoscopic Discectomy).

## Selected Improvement
- **The ONE change chosen:** Add `VideoObject` schema to `app/services/minimally-invasive-spine-surgery/page.tsx` for the existing YouTube embed.
- **Why (Scoring):**
  - Expected SEO impact: High (Google favors rich results for video, improving CTR on SERPs).
  - Confidence: High (Using existing `<VideoObjectSchema />` component).
  - Risk: Low (Invisible to users, well-tested component).
  - Effort: Low (Simple component injection).
  - *Score is highly favorable.*

## Target Details
- **Pages affected:** `/services/minimally-invasive-spine-surgery`
- **Target intent/queries:** "Minimally invasive spine surgery hyderabad", "spine surgery procedure video", "benefits of minimally invasive spine surgery".

## Verification
- **Before/after checks run:**
  - Ran `pnpm lint` (passed without new issues).
  - Ran `pnpm test` and `pnpm build` (noted preexisting issues in unrelated areas like `@mongodb-js/zstd`, but no regressions caused by this change).
  - Ran local dev server and verified via Playwright script that the `<script type="application/ld+json">` tag for `VideoObject` is successfully injected into the DOM.
  - Inspected frontend UI with Playwright screenshots to ensure no visual regressions (schema is strictly metadata).

## Risks & Rollback Notes
- **Risks:** Extremely low. The schema is visually hidden and uses an established component.
- **Roll-back:** If any issues arise (e.g., Search Console validation errors), simply remove the `<VideoObjectSchema />` import and component from `app/services/minimally-invasive-spine-surgery/page.tsx`.
