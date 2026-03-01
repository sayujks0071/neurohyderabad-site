# SEO Prioritized Fix List & Backlog

| Issue | Affected URLs | Fix Summary | Impact | Effort | Risk | Do Now? |
|---|---|---|---|---|---|---|
| Fix Next.js Cache Header Warning | All assets | Remove manual `Cache-Control` overrides for `/_next/static/*` | 4 | 1 | Low | Done |
| Cleanup `next-sitemap` & Restore Exclusions | Sitemap generation | Remove obsolete package. Add exclusion logic to `app/sitemap.xml/route.ts` | 4 | 2 | Low | Done |
| Enhance Article Schema | All `/blog/*` posts | Update schema to include explicit `author` and `reviewedBy` (Dr. Sayuj) | 4 | 2 | Low | Done |
| Short Titles | `/contact`, `/services`, etc. | Top 10 urls showed some generic, short titles. Need keyword enrichment (e.g., "Contact Dr. Sayuj Krishnan - Neurosurgeon") | 3 | 2 | Low | No |
| Performance / Unused JS | Homepage | Lighthouse identifies 243KiB savings. Next.js bundle optimizations (dynamic imports) required | 4 | 4 | Med | No |
| FAQPage Schema | Top Condition Pages | Competitor gap: explicitly add dynamic FAQ JSON-LD to `Slip Disc`, `Trigeminal Neuralgia` pages | 3 | 3 | Low | No |
| Missing Schema Linking | Location pages | The Location MedicalClinic schema doesn't explicitly refer back to the Physician entity | 2 | 2 | Low | No |
