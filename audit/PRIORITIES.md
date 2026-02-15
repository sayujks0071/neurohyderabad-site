# SEO Audit Priorities & Fix Backlog

| ID | Issue | Affected URLs | Impact (1-5) | Effort (1-5) | Risk | Status |
|---|---|---|---|---|---|---|
| **P1** | **Critical LCP (16s)** | Global (Homepage, Service Pages) | 5 (High) | 3 (Med) | Low | **DO NOW** |
| **P2** | **Missing Metadata & H1** | `/brain-tumor-surgery` | 5 (High) | 1 (Low) | Low | **DO NOW** |
| **P3** | **Schema Gaps (MedicalClinic)** | Location Pages (`/locations/*`) | 4 (High) | 2 (Low) | Low | **DO NOW** |
| P4 | CTR Optimization (Meta Desc) | Service Pages | 3 (Med) | 2 (Low) | Low | Backlog |
| P5 | Thin Content | `/drafts`, `/knowledge-base` | 2 (Low) | 2 (Low) | Low | Backlog |
| P6 | Missing H1 | `/knowledge-base` | 2 (Low) | 1 (Low) | Low | Backlog |

## Detailed Execution Plan for Top 3

### 1. Fix LCP (Hero Image Optimization)
- **Problem**: LCP is 16s. Likely late loading of hero image.
- **Solution**:
    - Identify the Hero component (likely in `app/page.tsx` or `app/_components/Hero.tsx`).
    - Add `priority` prop to `next/image`.
    - Use `sizes` attribute correctly.
    - Ensure font loading is optimized (e.g. `next/font` with `swap`).

### 2. Fix Metadata & H1 on `/brain-tumor-surgery`
- **Problem**: Page lacks `metadata` export and explicit H1.
- **Solution**:
    - Add `export const metadata: Metadata = { ... }` to `app/brain-tumor-surgery/page.tsx`.
    - Ensure H1 tag wraps the main title.

### 3. Enhance Schema on Location Pages
- **Problem**: Location pages need strong Local SEO signals.
- **Solution**:
    - Verify `app/locations/[slug]/page.tsx` uses `MedicalClinic` schema.
    - Ensure it pulls data from `src/data/locations.ts` correctly.
    - Add `geo` coordinates and `openingHours` if missing.
