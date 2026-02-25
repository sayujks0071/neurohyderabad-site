# Prioritized Fixes

| Issue | Impact | Effort | Risk | Recommendation | Status |
|---|---|---|---|---|---|
| **1. Incomplete Sitemap (Conditions)** | High | Low | Low | **Do Now:** Update `app/sitemap-conditions.ts` to dynamically use `CONDITION_RESOURCES`. Ensuring all 30+ condition pages are indexed is critical for traffic. | Planned |
| **2. Incomplete Sitemap (Services)** | High | Low | Low | **Do Now:** Manually add ~10 missing service pages (e.g., cervical disc replacement) to `app/sitemap-services.ts`. These are high-value procedure pages. | Planned |
| **3. Missing FAQ Schema (Services)** | Med | Low | Low | **Do Now:** Add `FAQPageSchema` to `app/services/page.tsx`. The content exists but isn't marked up for Rich Results. | Planned |
| **4. Internal Redirects** | Med | Low | Low | **Do Now:** Update `src/data/conditionsIndex.ts` primaryPath for `degenerative-disc-disease` to direct `/conditions/...` URL, avoiding internal 301. | Planned |
| **5. Duplicate Content (Locations)** | Med | Med | Med | **Backlog:** Enhance location pages with unique content (landmarks, directions) to avoid "doorway page" risk. | Backlog |
| **6. Competitor Gap (Cost Pages)** | High | Med | Low | **Backlog:** Create dedicated "Cost of Spine Surgery" comparison pages vs Open Surgery. | Backlog |
| **7. Image Optimization** | Low | Low | Low | **Done:** `SmartImage` and `next/image` usage appears generally correct. Monitor LCP. | Done |
