# Navigation & Footer Updates

## Header Navigation
1. **Patient Stories**
   - Add a top-level link labelled “Patient Stories”.
   - URL: `/patient-stories`
   - Position: After “Services”, before “Appointments”.
   - Purpose: Drive social proof visits for CRO goals.

2. **Locations**
   - Add a top-level link labelled “Locations”.
   - URL: `/locations`
   - Position: Next to “Contact”.
   - Include a dropdown (if available) linking to:
     - `/neurosurgeon-hyderabad`
     - `/neurosurgeon-jubilee-hills`
     - `/neurosurgeon-banjara-hills`
     - `/neurosurgeon-hitech-city`

3. **Appointments CTA**
   - Keep existing CTA but update `onClick` to fire GA4 event `book_appointment` with parameters from `/out/ga4_events_spec.md`.

## Footer Adjustments
1. **Clinic NAP Block**
   - Embed the NAP snippet from `/out/snippets/nap.html`.
   - Ensure links include UTM parameters where noted.

2. **Quick Links Column**
   - Include the five new pages once live:
     - `/conditions/trigeminal-neuralgia-treatment-hyderabad`
     - `/conditions/brain-tumor-surgery-hyderabad`
     - `/symptoms/signs-of-brain-tumor`
     - `/symptoms/pain-on-top-of-head-causes`
     - `/conditions/cervical-radiculopathy-treatment`

3. **Conversion Links**
   - Add “Book Consultation”, “WhatsApp”, “Get Directions (Malakpet)” with GA4 tagging.

4. **Patient Stories & Success Metrics**
   - Link `/patient-stories` and `/stories` under Trust/Social Proof column.

## Acceptance Checks
- Desktop and mobile navigation show Patient Stories and Locations links without wrapping.
- Header CTA still uses contrasting colour (AA compliant) and remains keyboard accessible.
- Footer NAP matches standardised details exactly.
- No duplicate links leading to redirect chains.
