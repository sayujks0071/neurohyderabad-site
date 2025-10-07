# Medical YMYL & Structured Data Guidelines

This package standardises how to publish medical (YMYL) content for Dr. Sayuj Krishnan’s site. Follow these guardrails whenever you add, update, or review pages.

## Core Principles
- **Clinical accuracy first**: Every claim must trace back to reputable neurosurgical or neurological sources (AANS, NCI, NHS, NINDS, NICE, peer‑reviewed journals). Cite at least three per page.
- **Authorship & review**: Each page must show “Authored/Reviewed by Dr. Sayuj Krishnan, Neurosurgeon” plus a last-reviewed date. If multiple reviewers contribute, document them in the QA sheet.
- **Patient safety**: Avoid promising outcomes, surgery guarantees, or absolute language (“cure”). Highlight risks, alternatives, and when to seek emergency care.
- **Indian English tone**: Use patient-friendly Indian English; explain jargon and avoid US-centric insurance or cost framing unless the page is a cost guide.
- **Local intent**: Always reinforce Hyderabad, Telangana, and hospital context (Yashoda Hospital, Malakpet) in copy, schema, and NAP.

## Metadata & hreflang
- Titles ≤ 60 characters; meta descriptions ≤ 155 characters.
- Self-referential canonical URLs must be absolute and free of trailing slash.
- Provide hreflang for `en-IN` and `x-default` on every indexable page.
- Include structured FAQ content on-page before adding FAQ schema.

## JSON-LD Schema Stack
Inject a single `<Script type="application/ld+json">` per page with an array containing:
1. `MedicalWebPage`
2. `MedicalCondition` or `MedicalProcedure` (depending on page type)
3. `FAQPage`
4. `BreadcrumbList`
5. `Physician`
6. `MedicalClinic`

### Required Schema Fields
- `MedicalWebPage`: `name`, `description`, `url`, `inLanguage`, `isPartOf` (Website), `about`.
- `MedicalCondition/Procedure`: `name`, `alternateName`, `medicalSpecialty`, `possibleTreatment` or `howPerformed` (as applicable), `signOrSymptom`.
- `FAQPage`: `mainEntity` array with 5–8 question/answer pairs. The text must match visible FAQs exactly.
- `BreadcrumbList`: Provide at least Home → Section (Conditions/Symptoms/Services) → Page.
- `Physician`: `name`, `medicalSpecialty`, `sameAs` array (leave empty until supplied), `affiliation`, `address`, `telephone`.
- `MedicalClinic`: Clinic name, NAP, `areaServed: Hyderabad`.

### Authoritative Citations
- Include a “Key References” or “Citations” section linking to authoritative sources.
- Use `<ExternalLink rel="noopener noreferrer">` or equivalent to avoid SEO leakage while ensuring credibility.

## Rich Results Validation
1. Deploy or preview the page.
2. Open [richresults.google.com](https://search.google.com/test/rich-results).
3. Test against live URL, not code snippet.
4. Confirm **Detected Items** include:
   - `FAQPage`
   - `BreadcrumbList`
   - `MedicalWebPage`
5. Download/Save a screenshot showing “0 errors, 0 warnings”. Store as `out/screenshots/rr_<slug>_ok.png`.
6. If warnings appear (e.g., `sameAs` missing), document the decision in `out/change_log.md` and QA checklist.

## Structured Data QA Flow
1. Validate JSON-LD using [validator.schema.org](https://validator.schema.org).
2. Confirm no duplicate FAQ schema injections from other components.
3. Ensure `@id` values, if used, remain unique.
4. Review final HTML for only **one** `<script type="application/ld+json">` block.

## Accessibility & Performance Quick Checks
- Headings in logical order (`h1` → `h2` → `h3`).
- Hero imagery: Provide `alt` text and define `width`/`height`. Lazy load below-the-fold images.
- Buttons/links: Provide descriptive labels, ensure keyboard focus visible, maintain colour contrast ≥ 4.5:1.
- Font loading: Use `font-display: swap`.

## Audit Evidence Naming
- Rich Results screenshots: `rr_<slug>_ok.png`
- Lighthouse mobile screenshots: `lh-mobile_<slug>.png`
- Redirect validation output: Save terminal log as `redirects_validation.txt`
- GA4 tagging proof: `ga4_events_<component>.png` showing GTM/GA4 debug or network logs.

## Deployment Checklist
1. Copy /out components and route files into the repo.
2. Implement redirects and sitemap updates.
3. Run `npm run lint` and any project-specific tests.
4. Deploy preview and complete Rich Results + Lighthouse validations.
5. Populate `out/qa_checklist.md` and attach evidence in PR.
6. Request indexing for new URLs after sitemap submission.

Keep this guide in the repo root’s `/out` folder for reference during future SEO/content sprints.
