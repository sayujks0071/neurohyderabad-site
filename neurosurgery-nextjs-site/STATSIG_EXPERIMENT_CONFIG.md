# Statsig Experiment Configuration

## Experiments to Configure in Statsig Dashboard

### 1. Hero CTA Copy Test
**Experiment Name:** `exp_hero_cta_copy`
**Target:** Home + top service pages (discectomy/foraminotomy/ULBD/cervical/MVD/radiosurgery)
**Traffic Allocation:** 100%
**Variants:**
- `control`: "Book Consultation"
- `book_appointment_today`: "Book Appointment Today" 
- `talk_to_neurosurgeon`: "Talk to a Neurosurgeon"

**Success Metrics:**
- `Appointment_Success` rate
- `Hero_CTA_Click` / `Page_View` (CTA CTR)
- `Phone_Click` count

**Guardrails:**
- Bounce rate
- LCP/INP
- CLS

**Targeting Rules:**
- Page type: home, service
- Device: all
- Location: all

### 2. Sticky CTA Mobile Test
**Experiment Name:** `exp_sticky_cta_mobile`
**Target:** All service/condition pages on mobile only
**Traffic Allocation:** 100%
**Variants:**
- `control`: Off (false)
- `treatment`: On (true)

**Success Metrics:**
- `Appointment_Start` (mobile)
- `Appointment_Success` (mobile)
- `Sticky_CTA_Click` count

**Guardrails:**
- INP/CLS
- Scroll depth

**Targeting Rules:**
- Page type: service, condition
- Device: mobile only
- Location: all

### 3. Social Proof Band Test
**Experiment Name:** `exp_social_proof_band`
**Target:** Services (above the fold, beneath hero on desktop)
**Traffic Allocation:** 100%
**Variants:**
- `control`: Off (false)
- `treatment`: On (true)

**Success Metrics:**
- `Hero_CTA_Click` rate
- Appointment funnel conversion
- `Page_View` engagement

**Guardrails:**
- LCP/CLS
- Bounce rate

**Targeting Rules:**
- Page type: service
- Device: desktop, tablet
- Location: all

## Feature Gates to Configure

### 1. Admin Experiments
**Gate Name:** `fg_admin_experiments`
**Purpose:** Show test components to admins only (for QA)
**Default Value:** false
**Targeting:** Admin users only

### 2. Session Replay
**Gate Name:** `fg_session_replay_enabled`
**Purpose:** Enable session replay only after consent is "accepted"
**Default Value:** false
**Targeting:** Users with analytics consent

### 3. Sticky CTA
**Gate Name:** `fg_sticky_cta`
**Purpose:** Used by exp_sticky_cta_mobile assignment to show/hide
**Default Value:** false
**Targeting:** Controlled by experiment assignment

## Event Taxonomy

### Core Funnel Events
All events include: `page_type`, `page_slug`, `device`, `service_or_condition`, `experiment_variant`

1. **Page_View**
   - Description: Page view tracking with context
   - Props: page_type, page_slug, service_or_condition, device, source_medium, experiment_variant

2. **Hero_CTA_Click**
   - Description: Hero section CTA clicks
   - Props: page_slug, cta_label, device, service_or_condition, experiment_variant

3. **Sticky_CTA_Click**
   - Description: Sticky bottom CTA clicks
   - Props: page_slug, cta_label, device

4. **Nav_CTA_Click**
   - Description: Navigation CTA clicks
   - Props: page_slug, cta_label, device

5. **Appointment_Start**
   - Description: Appointment form interaction start
   - Props: page_slug, service_or_condition, device, insurance_flag, location_hint

6. **Appointment_Submit**
   - Description: Appointment form submission attempt
   - Props: page_slug, form_errors_count, device

7. **Appointment_Success**
   - Description: Successful appointment booking
   - Props: page_slug, device, service_or_condition

### Assist Events

8. **Phone_Click**
   - Description: Phone number clicks
   - Props: page_slug, phone_type, device

9. **WhatsApp_Click**
   - Description: WhatsApp link clicks
   - Props: page_slug, device

10. **Directions_Click**
    - Description: Directions link clicks
    - Props: page_slug, device

11. **Form_Error**
    - Description: Form validation errors (masked)
    - Props: page_slug, field_name, error_type, device

12. **Form_Rage_Clicks**
    - Description: Rapid clicking on form elements
    - Props: page_slug, click_count, device

13. **FAQ_Toggle**
    - Description: FAQ expansion/collapse
    - Props: page_slug, faq_id, opened, device

14. **Core_Web_Vitals**
    - Description: Performance metrics
    - Props: metric_name, metric_value, page_slug, device

15. **Scroll_Depth**
    - Description: Page scroll depth tracking
    - Props: page_slug, device, depth_percentage

## Dashboard Configurations

### 1. Conversion Dashboard
**Name:** Conversion Dashboard
**Description:** Primary conversion funnel and CTA performance

**Metrics:**
- `Appointment_Start` and `Appointment_Success` (counts and rates) by page_slug, device
- CTA CTRs: Hero/Sticky/Nav
- `Phone_Click`/`WhatsApp_Click` and `Directions_Click` counts
- Experiment lift for exp_hero_cta_copy, exp_sticky_cta_mobile, exp_social_proof_band

**Segments:**
- device (mobile/desktop/tablet)
- page_type (home/service/condition/blog)
- service_or_condition
- traffic_source
- city_locale

### 2. SEO + Core Web Vitals Dashboard
**Name:** SEO & Core Web Vitals Dashboard
**Description:** SEO performance and Core Web Vitals monitoring

**Metrics:**
- LCP, INP, CLS distributions by page group (home/services/conditions/blogs)
- Organic entry pages (GSC pages in props) with `Appointment_Success` rate
- Scroll depth vs `Appointment_Start` correlation

**Segments:**
- page_group
- device
- traffic_source

### 3. Local Behavior Dashboard
**Name:** Local Behavior Dashboard
**Description:** Local SEO and location-based behavior

**Metrics:**
- Location pages: calls/directions by area
- `Appointment_Success` by service and location
- Hour-of-day/weekday heatmaps for call volumes

**Segments:**
- location
- service
- device
- time_of_day

## Privacy and Compliance Settings

### Session Replay Configuration
- **Enabled:** true
- **Retention:** 14 days
- **Mask Selectors:**
  - `input[type="email"]`
  - `input[type="tel"]`
  - `input[name*="phone"]`
  - `input[name*="email"]`
  - `input[name*="name"]`
  - `input[name*="address"]`
  - `textarea[name*="message"]`
  - `textarea[name*="details"]`
  - `.sensitive-data`
  - `[data-sensitive="true"]`
- **Disable on Pages:** `/appointments/confirm`, `/appointments/success`

### Consent Management
- **Required:** true
- **Opt-out Available:** true
- **Consent Storage Key:** `analytics-consent`
- **Consent Banner:** enabled

### Data Retention
- **Events:** 90 days
- **User Data:** 30 days
- **Session Data:** 14 days

## Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Configure experiments in Statsig dashboard
- [ ] Set up feature gates
- [ ] Deploy analytics tracking code
- [ ] Test event firing in development

### Phase 2: Launch (Week 2)
- [ ] Start experiments with 50/50 splits
- [ ] Monitor guardrails closely
- [ ] Set up dashboard alerts
- [ ] QA all experiment variants

### Phase 3: Optimization (Week 3-4)
- [ ] Analyze experiment results
- [ ] Adjust traffic allocation based on performance
- [ ] Implement winning variants
- [ ] Plan next experiment cycle

## Success Criteria

### Primary KPIs
- **Appointment_Success Rate:** Target 15%+ improvement
- **CTA CTR:** Target 20%+ improvement
- **Phone_Click:** Target 25%+ increase

### Guardrail Thresholds
- **Bounce Rate:** < 5% increase
- **LCP:** < 2.5s (no degradation)
- **INP:** < 200ms (no degradation)
- **CLS:** < 0.1 (no degradation)

### Statistical Significance
- **Minimum Sample Size:** 1000 users per variant
- **Confidence Level:** 95%
- **Minimum Test Duration:** 2 weeks
