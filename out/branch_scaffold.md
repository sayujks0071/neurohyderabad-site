# Branch Scaffold — seo/benchmark-r1

Use this checklist to build the working branch before committing changes.

## 1. Create Branch
```bash
git checkout -b seo/benchmark-r1
```

## 2. Copy Components & Utilities
- `out/components/JsonLd.tsx` → `app/_components/JsonLd.tsx` (or preferred path)
- `out/components/YMYLAttribution.tsx` → `app/_components/YMYLAttribution.tsx`
- `out/components/LocalNAP.tsx` → `app/_components/LocalNAP.tsx`
- `out/snippets/nap.html` → include in footer partial if needed.

## 3. Add New Routes (App Router)
Create the following files with content from `/out/drafts` + metadata + schema bundles:
- `app/conditions/trigeminal-neuralgia-treatment-hyderabad/page.tsx`
- `app/conditions/brain-tumor-surgery-hyderabad/page.tsx`
- `app/symptoms/signs-of-brain-tumor/page.tsx`
- `app/symptoms/pain-on-top-of-head-causes/page.tsx`
- `app/conditions/cervical-radiculopathy-treatment/page.tsx`

### Required Imports per Page
```ts
import JsonLd from "@/app/_components/JsonLd";
import LocalNAP from "@/app/_components/LocalNAP";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import Link from "next/link";
```

### Metadata Guideline
```ts
export const metadata: Metadata = {
  title: "...",              // ≤60 chars
  description: "...",        // ≤155 chars
  alternates: {
    canonical: "https://www.drsayuj.com/path",
    languages: {
      "en-IN": "https://www.drsayuj.com/path",
      "x-default": "https://www.drsayuj.com/path",
    },
  },
};
```

### JSON-LD Injection
```tsx
<JsonLd id="tn-jsonld" data={schemaArray} />
```
Where `schemaArray` matches the relevant file in `/out/schema`.

## 4. Redirects
- Copy mappings from `/out/redirects.csv` into `next.config.js` `async redirects()` array.
- Run `npm run lint` after edits.

## 5. Sitemap
- Update `app/sitemap.ts` or `public/sitemap.xml` (see `/out/sitemap_update.md`).
- Update HTML sitemap page if present.

## 6. Internal Links & Navigation
- Implement anchors from `/out/internal_link_plan.csv`.
- Apply navigation adjustments from `/out/nav_footer_updates.md`.

## 7. Analytics
- Add GA helpers from `/out/ga4_events_spec.md` to relevant components.
- Ensure events fire from CTAs/links.

## 8. Local SEO Assets
- Store GBP post drafts and citations tracker within `/ops` or internal docs as needed.

## 9. QA Prep
- Follow `/out/qa_checklist.md`.
- Capture evidence in `/out/validation_evidence`.

Once complete, commit with message `feat: launch seo benchmark r1` and open PR targeting main branch.
