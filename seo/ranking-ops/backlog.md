# SEO Backlog

## Opportunities Identified
- [ ] **Content Gap:** Create a dedicated "Cost of Spine Surgery" page or enhance existing service pages with more concrete insurance/package details (Competitor: Dr. Raveesh).
- [ ] **Schema:** Audit FAQSchema on all service pages.
- [ ] **Performance:** Check LCP on mobile for `spine-surgery` page.
- [ ] **Structure:** Check for other orphan pages in `sitemap.ts` that might be duplicates.
- [ ] **Local SEO:** Enhance "Areas We Serve" section on location pages with specific landmarks.
- [ ] **Internal Linking:** Add links from "Condition" pages (e.g., Sciatica) to the new "Spine Surgery" FAQs.
- [x] **Multimedia:** Add `VideoObject` schema to Brain Surgery page if we can source or create an explainer video (Competitor Gap). (Done 2026-02-23 via PatientEducationVideos component)
- [ ] **Content:** Expand "Patient Journey" section on Brain Surgery page to match competitor depth.
- [x] [Content] Add specific cost guide for Brain Tumor Surgery (similar to Spine). (Done 2026-02-22)
- [ ] **Audit:** Check all "Patient Education Resources" sections on other Condition pages for broken links or missing content.
- [ ] **Multimedia:** Add embedded video testimonials/explainers to Service pages (Competitor Advantage).
- [ ] **Content:** Strengthen "Why Dr. Sayuj" sections on service pages with stronger USPs.
- [ ] **Schema:** Verify MedicalProcedure schema includes specific procedure codes (CPT/ICD-10) where possible.

## 2026-01-26
- **Content Gap:** "Risks & Safety Protocols" section for Endoscopic Spine Surgery. Competitors list specific risks (dural tear, infection) to build trust.
- [x] **Content Gap:** "Patient Education Video" embed. A 30-second animated explainer of the "Keyhole" vs "Open" difference. (Done 2026-02-23)
- **Content Gap:** "Anesthesia Protocol" dedicated page. "Awake vs Asleep" is a big patient concern.
- [ ] **Location Pages:** Apply 'Why Travel' pattern to other location pages (Banjara Hills, Gachibowli, etc.) to address distance objections.

## 2026-02-05
- **Opportunity:** Add "Pre-surgery Prep Checklist" downloadable/interactive widget.
- **Opportunity:** Add specific visual outcomes stats (e.g., "98% Walking Day 1") to Trust Strip.

## 2026-02-07
- [x] **Content Gap:** Replicate "Insurance & Cashless Treatment" block on other key service pages (Brain Tumor, Microdiscectomy) to improve financial transparency sitewide. (Done 2026-02-22)

## 2026-02-08
- **Internal Linking:** Ensure other "Service" pages (e.g., Epilepsy Surgery) have a clear "Red Flag" section linking back to "Condition" pages.

## 2026-02-09
- **Internal Linking:** Ensure all "Service" pages link to "Symptoms Checker" as a CTA.
- **Content Gap:** Add "What to Expect at Your First Consultation" section to Service pages.
- **Schema:** Enhance `FAQSchema` to include "acceptedAnswer" schema for more nuanced questions (e.g., specific recovery timelines).

## 2026-02-10
- **Opportunity:** Replicate "Endoscopic Procedure Steps" component on other procedure pages (e.g., Microdiscectomy, Brain Tumor Surgery) for consistent visual storytelling.
- **Optimization:** Check LCP/CLS impact of new component on mobile devices.

## 2026-02-12
- [x] **Content Improvement:** Added "Red Flags" emergency section to Spine Surgery page. (Done 2026-02-12)
- [ ] **Content Gap:** Add similar "Red Flags" sections to other critical pages (Brain Tumor, Epilepsy).
- [ ] **Technical Fix:** Investigate `middleware.ts` type definition properly (currently using `@ts-ignore`).

## 2026-02-15
*   **Opportunity:** Interactive "Symptom Checker" for Sciatica/Back Pain.
*   **Opportunity:** "Recovery Timeline" visualizer for key surgeries (Endoscopic Discectomy).
*   **Opportunity:** Video Testimonials embedded directly in service pages.

## 2026-02-17
*   **Content Gap:** The `app/conditions/brain-tumor-symptoms-hyderabad` page is duplicate content with `app/symptoms/signs-of-brain-tumor`. Consider redirecting or merging.
*   **Internal Linking:** Other service pages (e.g., `spine-surgery`) could benefit from a similar "Comprehensive Condition Guides" section linking to blog posts.
*   **Technical SEO:** Audit all other `app/symptoms/` pages for broken links to service pages.

## 2026-02-18
*   **Structure:** Replicate "Advanced Surgical Solutions" (Hub & Spoke procedure linking) section on other major service hubs like Brain Tumor Surgery to match competitor depth. (Done 2026-02-24)
*   **Content Gap:** Create dedicated service pages for "Endoscopic Skull Base Surgery" and "Stereotactic Biopsy" to fully support the Hub & Spoke model (currently just descriptions in the new component).

## 2026-02-21
*   **Schema Conflict:** Remove duplicate `FAQSchema` manual injection in `app/services/cervical-disc-replacement-hyderabad/page.tsx` as it conflicts with `<FAQPageSchema />` component.

## 2026-02-25
*   **Expansion:** Replicate the visual "Red Flags" grid on other emergency-related condition pages (e.g., Brain Tumor Symptoms).
*   **Consistency:** Ensure `TrustProof` components on other pages are updated to use the latest props and styling if applicable.
