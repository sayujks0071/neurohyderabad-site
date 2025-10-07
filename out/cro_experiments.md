# CRO Experiments Plan

Run initial 50/50 experiments across mobile and desktop unless stated. Use Statsig/Optimizely (existing tooling) or a simple environment flag if experiments must be coded.

## Experiment 1 — Reassurance Microcopy
- **Goal**: Increase conversions from condition pages by highlighting medical expertise near CTAs.
- **Variant A (Control)**: Existing CTA text and layout.
- **Variant B**: Add microcopy beneath CTA — “Consultation reviewed by Dr. Sayuj Krishnan, MS (Neurosurgery). MRI reviewed before surgery.”
- **Primary Metric**: `book_appointment` (step = start, success).
- **Secondary Metrics**: `click_call`, `click_whatsapp`.
- **Guardrails**:
  - No drop >10% in `page_view` to CTA sections.
  - Monitor `book_appointment` abandon rate.

## Experiment 2 — Trust Strip
- **Goal**: Increase scroll depth and CTA engagement via visual proof.
- **Variant A**: No trust strip (current layout).
- **Variant B**: Insert trust strip component featuring hospital logos, fellowship, and patient review count near mid-page.
- **Primary Metric**: `book_appointment` success.
- **Secondary Metrics**: Scroll depth events (if available), `view_service_page`.
- **Guardrails**:
  - Performance: LCP must remain < 2.5s on mobile (track via Lighthouse or Web Vitals).
  - Accessibility: All logos need alt text; maintain AA contrast.

## Experiment 3 — Sticky CTA (Mobile Focus)
- **Goal**: Improve mobile appointment starts after-hours.
- **Variant A**: Standard CTA (no sticky element).
- **Variant B**: Sticky bottom bar with “Book Consultation | Call | WhatsApp”.
- **Trigger**: Show after 50% scroll or on exit intent.
- **Primary Metric**: `book_appointment` step = start (mobile).
- **Secondary Metrics**: `click_call`, `click_whatsapp`.
- **Guardrails**:
  - Bounce rate must not increase by more than 5%.
  - Track `is_after_hours` parameter to ensure after-hours engagement improves.
  - Provide close button with accessible label.

## Implementation Notes
- Tag each variant interaction with `variant` parameter in GA4 events.
- Document start/end dates, sample size, and SRM (sample ratio mismatch) checks in an analytics runbook.
- Run experiments for at least 1–2 weeks or until each arm collects ≥300 conversions (or an agreed statistical threshold).
