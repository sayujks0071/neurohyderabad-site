# SEO Priorities & Backlog

| Issue | Impact | Effort | Risk | Do Now? | Notes |
|---|---|---|---|---|---|
| **Build Failure (BookingForm.tsx)** | 5 | 1 | Low | **Yes** | Critical: Cannot deploy. Fixed locally. |
| **Title Tags Too Long** | 4 | 2 | Low | **Yes** | Truncation in SERPs. Update `makeMetadata` or layout template. |
| **Cost Content Gap** | 4 | 3 | Low | **Yes** | Competitors win on pricing transparency. Add pricing table. |
| **Missing Specific Procedure Pages** | 3 | 4 | Med | No | Requires new content creation (Thoracic, etc). |
| **Console Logs in Production** | 2 | 2 | Low | No | Performance/Hygiene issue. |
| **Schema Extraction** | 2 | 2 | Low | No | Schema exists but using `@graph` which audit script missed. |

## Selected "Do Now" Tasks
1. **Fix Build Error**: Commit the fix in `packages/appointment-form/BookingForm.tsx`.
2. **Optimize Title Tags**: Modify `app/layout.tsx` title template to be shorter, or adjust `makeMetadata` helper.
   - Current template: `%s | Dr. Sayuj Krishnan`
   - Issue: Page titles often append `| Dr. Sayuj Krishnan` resulting in >60 chars.
   - Fix: Use shorter suffix or absolute titles for long pages.
3. **Add Pricing Table**: Create a component `PricingTable` and add it to `app/services/spine-surgery-cost-hyderabad/page.tsx` (or similar).
