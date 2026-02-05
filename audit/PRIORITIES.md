# Prioritized SEO Fixes

## 1. Eliminate Ghost Pages (Critical Technical)
**Issue**: ~50 URLs listed in sitemaps return 404.
**Impact**: Wastes crawl budget, bad UX, "Soft 404" signals.
**Fix**: Remove these URLs from `app/sitemap-services.ts`, `app/sitemap-conditions.ts`, and `app/sitemap.ts`.
**Effort**: Low. **Risk**: Low.

## 2. Fix Schema Gaps (E-E-A-T)
**Issue**: `MedicalWebPage` schema is missing `medicalSpecialty` and `audience` fields. Some pages show `undefined` schema types.
**Impact**: Reduced rich snippet eligibility (Medical Knowledge Graph).
**Fix**: Update `MedicalWebPageSchema` component to include defaults or props for these fields.
**Effort**: Medium. **Risk**: Low.

## 3. Metadata Length Optimization (On-Page)
**Issue**: 120+ pages have titles > 60 chars.
**Impact**: Title truncation in SERPs (lower CTR).
**Fix**: Shorten the page-specific titles for key pages (Home, Services, Conditions).
**Effort**: Medium (repetitive). **Risk**: Low.

## 4. Performance (Lighthouse)
**Issue**: Lighthouse failed locally, but TTFB is good.
**Fix**: Ensure `next/image` is used properly (already seems so).
**Action**: Defer major performance overhaul until Lighthouse can be run, but verify `next/image` usage in key components.
