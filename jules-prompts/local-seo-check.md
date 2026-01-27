# Local SEO Health Check

Verify the Local SEO signals for "Dr. Sayuj Krishnan".
1. Check `src/data/locations.ts` for accuracy.
2. Verify that NAP (Name, Address, Phone) is consistent across the site.
3. Verify that `AppointmentSchema` in `app/appointments/_components/AppointmentSchema.tsx` produces valid JSON-LD for `Physician` and `MedicalClinic`.
4. Ensure the Google Maps embed (`LocationMapEmbed`) is working and correct on the contact page.

**Action:**
- Run `npm run check:schemas` (if available) or use a validator script on key pages.
- If errors are found, fix them in a PR.

<!-- Jules Automation -->
<!-- Managed by Jules -->
<!-- v1.3 -->
