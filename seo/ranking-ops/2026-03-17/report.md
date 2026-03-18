# Latest SEO Operation

**Date**: 2026-03-17
**Focus**: Structured Data Enhancement (Schema)
**Page**: `app/services/epilepsy-surgery-hyderabad/page.tsx`
**Action**: Added `MedicalWebPageSchema` to the Epilepsy Surgery service page.
**What competitors do better (today's notes)**: Competitors like Yashoda and KIMS use extensive Medical Web Page schema and Video schemas to dominate rich snippets for highly technical queries like "LITT surgery cost" or "epilepsy surgery success rate". Our site has good content but lacks the strict semantic tagging to explicitly communicate this intent.
**The ONE change chosen + why (scoring)**: Implement `MedicalWebPageSchema` on the Epilepsy Surgery page.
- Score: (Expected SEO impact: High (8) × Confidence: High (9)) / (Risk: Low (1) + Effort: Low (2)) = 24.
- This is the highest ROI action as the content already exists, it strictly follows the existing pattern from other service pages, and immediately improves Google's understanding of our specialized medical content (YMYL safety). (Note: FAQPageSchema was omitted as it requires visible on-page content rendering which was missing in the original attempt, avoiding cloaking violations).
**Pages affected + target intent/queries**:
- `app/services/epilepsy-surgery-hyderabad/page.tsx`
- Target intent: "epilepsy surgery hyderabad", "drug-resistant epilepsy treatment"
**Before/after checks run**:
- `pnpm lint`
- `pnpm test`
- `npm run build`
**Risks/roll-back notes**:
- Risk is extremely low as it only injects a `<script type="application/ld+json">` tag.
- Rollback: Revert the PR or manually remove the `<MedicalWebPageSchema />` component from the `page.tsx` return block.
