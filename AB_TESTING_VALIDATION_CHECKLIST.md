# A/B Testing Validation Checklist

## 🎯 Pre-Launch Validation (15-30 minutes)

### ✅ Component Rendering & UX

#### HeroCTA Component
- [ ] **Variants render correctly**
  - Control: "Book Consultation"
  - Variant B: "Book Consultation with Dr. Sayuj (Hyderabad)"
  - Variant C: "Get Your MRI/Reports Reviewed Today"
- [ ] **No layout shift** - All variants have consistent sizing
- [ ] **aria-label present** - Accessibility attributes are set
- [ ] **Style variants work** - primary, outline, success styles render correctly
- [ ] **Event logging** - `web_CTA_Click` events fire with `surface: 'hero'`

#### StickyCTA Component
- [ ] **Mobile-only rendering** - Only shows on devices < 768px width
- [ ] **Respects gate** - Hidden when `web_exp_sticky_cta.enabled = false`
- [ ] **No overlap with footer** - Proper z-index and positioning
- [ ] **Contact variants work**:
  - Default: "Book Consultation"
  - Call variant: "📞 Call Now: +91-98484-17094 (9 AM–7 PM)"
  - WhatsApp variant: "💬 WhatsApp Us (after-hours)"
- [ ] **Phone/WhatsApp actions** - Click handlers work correctly
- [ ] **Accessibility** - aria-label attributes present

#### LocationBanner Component
- [ ] **Hyderabad scope only** - Only appears when `web_gate_location_banner = true`
- [ ] **Correct messaging** - "Consult Hyderabad's Neurosurgeon — Same-day appointments at Malakpet & Banjara Hills"
- [ ] **Dismissible** - Users can close the banner
- [ ] **CTA works** - "Book now" button navigates to appointments
- [ ] **Event logging** - `web_CTA_Click` events fire with `surface: 'banner'`

### ✅ Events in Statsig (Live Stream)

#### Core Events
- [ ] **web_CTA_Click events** firing for:
  - `surface: 'hero'` - Hero CTA clicks
  - `surface: 'sticky'` - Mobile sticky CTA clicks
  - `surface: 'header'` - Header CTA clicks
  - `surface: 'footer'` - Footer CTA clicks
  - `surface: 'card'` - Service card CTA clicks
  - `surface: 'banner'` - Location banner clicks

#### Appointment Funnel Events
- [ ] **web_Appointment_Start** firing with:
  - `page_type` (home|service|condition|blog|location)
  - `cluster` (spine|tn|epilepsy|brain|generic)
  - `device` (mobile|desktop)
  - `referrer` and `entry_page` for attribution

- [ ] **web_Appointment_Success** firing with:
  - All Appointment_Start properties
  - `appointment_type` (in-person|tele|unknown)
  - `session_id` for funnel tracking

#### Contact Method Events
- [ ] **web_WhatsApp_Click** - WhatsApp contact clicks
- [ ] **web_Call_Click** - Phone call clicks
- [ ] **web_Directions_Click** - Directions/location clicks

### ✅ Gates/Experiments

#### Global Controls
- [ ] **web_exp_enabled** - Toggling to `false` hides all variants globally
- [ ] **web_exp_hero_cta** - Shows reasonable exposure counts (34/33/33 split)
- [ ] **web_exp_sticky_cta** - Shows reasonable exposure counts (50/50 split)
- [ ] **web_gate_location_banner** - Can be enabled/disabled independently

#### Experiment Assignment
- [ ] **Consistent assignment** - Same user gets same variant across page loads
- [ ] **Proper targeting** - Experiments respect country/device targeting rules
- [ ] **No flicker** - Variants load without visual flash

### ✅ Performance/SEO Safety

#### Core Web Vitals
- [ ] **CLS unchanged** on key pages:
  - Home page (`/`)
  - Endoscopic Discectomy (`/services/endoscopic-spine-surgery`)
  - MISS (`/services/minimally-invasive-spine-surgery`)
  - Trigeminal Neuralgia (`/services/trigeminal-neuralgia`)
  - Epilepsy (`/services/epilepsy-surgery`)

- [ ] **INP unchanged** - Interaction latency remains stable
- [ ] **No hydration warnings** in browser console
- [ ] **Page load times** remain consistent

#### SEO Integrity
- [ ] **Schema unchanged**:
  - FAQ schema intact
  - MedicalWebPage schema intact
  - Physician schema intact
  - BreadcrumbList schema intact
- [ ] **Meta tags unchanged** - Title, description, OG tags preserved
- [ ] **Canonical URLs** preserved
- [ ] **Sitemap unaffected**

## 🚀 Launch Configuration

### Experiments Setup
```javascript
// Statsig Console Configuration
web_exp_enabled: true

web_exp_hero_cta: {
  split: "34/33/33",
  targeting: "country == 'IN'",
  variants: {
    control: { cta_text: "book_consultation", cta_style: "primary" },
    variant_b: { cta_text: "book_consultation_dr_sayuj", cta_style: "primary" },
    variant_c: { cta_text: "mri_review_today", cta_style: "success" }
  }
}

web_exp_sticky_cta: {
  split: "50/50",
  targeting: "country == 'IN' AND device == 'mobile'",
  variants: {
    control: { enabled: true, variant: "book_consultation" },
    treatment: { enabled: true, variant: "call_now" }
  }
}

web_gate_location_banner: false  // Start disabled
```

### Event Schema Validation
```javascript
// Expected event structure
web_CTA_Click: {
  surface: "hero|sticky|header|footer|card|banner",
  page_path: "/services/endoscopic-spine-surgery",
  page_type: "service",
  cluster: "spine",
  device: "mobile",
  referrer: "https://google.com",
  entry_page: "/",
  session_id: "abc123",
  utm_source: "google",
  utm_campaign: "neurosurgeon_hyderabad"
}

web_Appointment_Start: {
  page_path: "/services/endoscopic-spine-surgery",
  page_type: "service",
  cluster: "spine",
  device: "mobile",
  referrer: "https://google.com",
  entry_page: "/",
  session_id: "abc123"
}

web_Appointment_Success: {
  // All Appointment_Start properties +
  appointment_type: "in-person"
}
```

## 📊 Success Metrics & Guardrails

### Primary KPIs
- [ ] **CTR Improvement**: `web_CTA_Click` per session (target: +20%)
- [ ] **Conversion Lift**: `web_Appointment_Success` per session (target: +15%)
- [ ] **Funnel Conversion**: `web_Appointment_Success` / `web_Appointment_Start` (target: +10%)

### Secondary Metrics
- [ ] **Contact Method Clicks**: WhatsApp/Call/Directions click rates
- [ ] **Scroll Depth**: ≥50% on service/condition pages
- [ ] **Time on Page**: Engagement metrics by page type

### Guardrails
- [ ] **Bounce Rate**: < 5% increase
- [ ] **Time on Page**: No significant decrease
- [ ] **INP**: < 200ms (no degradation)
- [ ] **CLS**: < 0.1 (no degradation)

## 🔧 Debugging Tools

### Browser Console Commands
```javascript
// Enable debug mode
localStorage.setItem('statsig-debug', 'true');

// Check experiment assignment
console.log('Experiments:', window.statsig?.getAllExperiments());

// Check user context
console.log('User:', window.statsig?.getUser());

// Check events being sent
console.log('Events:', window.statsig?.getEventLog());
```

### Statsig Dashboard Queries
```sql
-- Check experiment exposure
SELECT 
  experiment_name,
  variant,
  COUNT(DISTINCT user_id) as users
FROM events 
WHERE experiment_name LIKE 'web_exp_%'
AND timestamp >= NOW() - INTERVAL 1 DAY
GROUP BY experiment_name, variant;

-- Check CTA performance
SELECT 
  surface,
  COUNT(*) as clicks,
  COUNT(DISTINCT user_id) as unique_users
FROM events 
WHERE event_name = 'web_CTA_Click'
AND timestamp >= NOW() - INTERVAL 1 DAY
GROUP BY surface;
```

## 🚨 Rollback Plan

### Immediate Rollback (30 seconds)
1. Set `web_exp_enabled = false` in Statsig console
2. All variants immediately revert to control behavior
3. Monitor for any negative impacts

### Code Rollback (5 minutes)
1. Revert to previous deployment in Vercel
2. Verify site functionality
3. Check Core Web Vitals

### Emergency Contacts
- Statsig Support: [support@statsig.com]
- Vercel Support: [vercel.com/support]
- Development Team: [your-team-contact]

## 📋 Post-Launch Monitoring (First 24 Hours)

### Hourly Checks
- [ ] Experiment exposure rates
- [ ] Event logging volume
- [ ] Core Web Vitals
- [ ] Error rates

### Daily Checks (First Week)
- [ ] Conversion rate trends
- [ ] CTR improvements
- [ ] User feedback/complaints
- [ ] Performance metrics

### Weekly Analysis
- [ ] Statistical significance
- [ ] Winner identification
- [ ] Next experiment planning
- [ ] Performance optimization

## ✅ Validation Script

Run the automated validation script:
```bash
npm run validate:ab-tests
# or
ts-node scripts/validate-ab-tests.ts
```

This script will automatically check:
- Component file existence
- Required props and attributes
- Event logging implementation
- Dependencies and configuration
- Accessibility compliance

## 🎯 Success Criteria

### Launch Ready When:
- [ ] All validation checks pass
- [ ] Events appear in Statsig within 5 minutes
- [ ] No console errors
- [ ] Core Web Vitals unchanged
- [ ] Schema markup intact
- [ ] Mobile experience works correctly

### Performance Targets:
- [ ] CTR improvement: +20% minimum
- [ ] Conversion lift: +15% minimum
- [ ] No negative impact on Core Web Vitals
- [ ] No increase in bounce rate > 5%

This checklist ensures a safe, successful launch of your A/B testing implementation with comprehensive monitoring and rollback capabilities.