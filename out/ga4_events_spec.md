# GA4 Event Specification

Use these definitions when wiring analytics for the new condition and symptom pages. Measurement ID placeholder: **G-XXXXXXXXXX** (replace with production ID when available).

## Global Concepts
- **page_type**: `condition`, `symptom`, `service`, `location`, `story`, `appointment`
- **cluster**: `brain`, `spine`, `peripheral-nerve`, `general`
- **device**: `mobile`, `desktop`, `tablet` (derive from `window.navigator.userAgent` or GA4 default)
- **is_after_hours**: boolean based on clinic hours (08:00–20:00 IST)
- **local_hour**: 0–23 (Asia/Kolkata timezone)

## Event Definitions

### 1. view_service_page
- **Trigger**: On page load for service, condition, and symptom pages (fire once per page load).
- **Parameters**:
  - `page_type` (string; required)
  - `cluster` (string; required)
  - `device` (string; optional fallback: `unknown`)
  - `slug` (string; e.g., `trigeminal-neuralgia-treatment-hyderabad`)
  - `is_returning_user` (boolean; optional)
- **Example**:
  ```ts
  gaEvent("view_service_page", {
    page_type: "condition",
    cluster: "brain",
    device: getDeviceType(),
    slug: "trigeminal-neuralgia-treatment-hyderabad",
  });
  ```

### 2. click_call
- **Trigger**: User clicks any `tel:` link.
- **Parameters**:
  - `page_type`
  - `cluster`
  - `device`
  - `local_hour`
  - `is_after_hours`
  - `cta_location` (string; e.g., `nap_block`, `hero_cta`, `footer`)
- **Example**:
  ```ts
  gaEvent("click_call", {
    page_type: "condition",
    cluster: "spine",
    device: getDeviceType(),
    local_hour: getLocalHour(),
    is_after_hours: isAfterHours(),
    cta_location: "header_cta",
  });
  ```

### 3. click_whatsapp
- **Trigger**: User clicks the WhatsApp CTA (`https://wa.me/...`).
- **Parameters**:
  - `page_type`
  - `cluster`
  - `device`
  - `is_after_hours`
  - `cta_location`
- **Example**:
  ```ts
  gaEvent("click_whatsapp", {
    page_type: "symptom",
    cluster: "brain",
    device: getDeviceType(),
    is_after_hours: isAfterHours(),
    cta_location: "nap_block",
  });
  ```

### 4. book_appointment
- **Trigger**: Appointment form journey.
- **Parameters**:
  - `step` (`start`, `success`, `abandon`)
  - `page_type`
  - `cluster`
  - `device`
  - `time_in_form` (number; milliseconds; include on `success`/`abandon`)
  - `variant` (string; use for CRO experiments)
  - `utm_source`, `utm_medium`, `utm_campaign` (if available)
- **Examples**:
  ```ts
  gaEvent("book_appointment", {
    step: "start",
    page_type: "condition",
    cluster: "spine",
    device: getDeviceType(),
  });

  gaEvent("book_appointment", {
    step: "success",
    page_type: "appointment",
    cluster: "brain",
    device: getDeviceType(),
    time_in_form: elapsedMs,
    variant: "sticky_cta_v1",
  });
  ```

## Helper Snippets

```ts
export function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  const ua = window.navigator.userAgent;
  if (/mobile/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

export function getLocalHour() {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: false,
  });
}

export function isAfterHours() {
  const hour = Number(getLocalHour());
  return hour < 8 || hour >= 20;
}
```

## Debugging
- Use GA4 DebugView with `?gtm_debug=x` or by enabling the GA debugger Chrome extension.
- Ensure events appear with correct parameters; attach screenshots to `/out/validation_evidence`.
