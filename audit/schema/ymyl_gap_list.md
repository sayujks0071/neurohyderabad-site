# Schema & Medical / YMYL Compliance (E-E-A-T)

## Current Status
- `PhysicianSchema` effectively handles Dr. Sayuj's global credentials, fellowships, and areas served.
- `HospitalSchema` accurately links the physician to Yashoda Hospital, Malakpet.

## Gaps Identified
- No explicit `Article` schema with a `reviewer` property for `Medical Knowledge Base` or `Blog` articles (crucial for YMYL authority).
- `MedicalClinic` schema is handled for location pages but lacks structured connection back to `PhysicianSchema` (via 'department' or 'employee').

## Recommended Additions
- Add Author / ReviewedBy E-E-A-T structured data to `app/blog/[slug]/page.tsx` within `BlogLayout.tsx`.
