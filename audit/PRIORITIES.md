# Prioritized Fix List (SEO Reprint 2026-02-13)

| Issue | Evidence | Affected URLs | Fix Summary | Impact | Effort | Risk | Do Now? |
|-------|----------|---------------|-------------|--------|--------|------|---------|
| Title Tags Too Long | Audit JSON (39 pages) | Homepage, About, Appointments, etc. | Shorten titles to <60 chars. Move brand to end or remove if needed. | High | Low | Low | Yes |
| Missing Breadcrumb Schema | Schema Audit | All Pages | Add `BreadcrumbList` JSON-LD to `app/layout.tsx` or `src/components/Schema.tsx`. | High | Med | Low | Yes |
| Missing MedicalClinic Schema | Schema Audit | Location/Contact Pages | Add `MedicalClinic` schema for Yashoda Hospital Malakpet on location pages. | High | Med | Low | Yes |
| Meta Description Length | Audit JSON (11 pages) | Service Pages | Truncate or rewrite to <160 chars. Focus on CTR. | Med | Low | Low | Yes |
| Competitor Keyword Gap | Competitor Analysis | New Content | Create "Cost of Spine Surgery" guide. | High | High | Low | No |
| Video Schema | Competitor Analysis | Service Pages | Implement `VideoObject` schema for embedded videos. | Med | Med | Low | No |

## "Do Now" Execution Plan
1. **Fix Metadata Length:**
   - Audit `src/lib/seo.ts` or `app/layout.tsx` for default templates.
   - Update individual page `metadata` exports in `app/**/page.tsx` to be concise.
   - Target: Homepage, About, Appointments, core Service pages.

2. **Enhance Schema:**
   - Verify/Add `BreadcrumbList` in a global component or layout.
   - Verify/Add `MedicalClinic` schema in `app/neurosurgeon-malakpet/page.tsx` and contact page.

3. **Verify:**
   - Re-run `seo:audit` or manual checks on fixed pages.
