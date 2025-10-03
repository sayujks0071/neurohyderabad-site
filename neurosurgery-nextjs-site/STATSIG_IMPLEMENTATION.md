# Statsig A/B Testing & Analytics Implementation

## Overview

This implementation provides comprehensive A/B testing and analytics for the Dr Sayuj Krishnan medical website, with privacy-safe tracking and medical compliance features.

## Features Implemented

### 🔬 A/B Testing Experiments

1. **Hero CTA Test** - Testing different call-to-action copy and styles
2. **Sticky CTA Test** - Mobile sticky bottom CTA bar
3. **Social Proof Test** - Trust badges and review snippets
4. **Insurance Band Test** - Insurance acceptance messaging
5. **Form Layout Test** - Full form vs 2-step form (ready for implementation)
6. **Local H1 Test** - H1 phrasing for local SEO intent
7. **FAQ Display Test** - FAQ expansion behavior
8. **Nav Label Test** - Navigation CTA labels

### 📊 Event Tracking

**Core Funnel Events:**
- `Page_View` - Page visits with context
- `Hero_CTA_Click` - Hero section CTA interactions
- `Sticky_CTA_Click` - Mobile sticky CTA clicks
- `Nav_CTA_Click` - Navigation CTA clicks
- `Appointment_Start` - Form interaction start
- `Appointment_Submit` - Form submission attempts
- `Appointment_Success` - Successful bookings

**Assist Events:**
- `Phone_Click` - Phone number interactions
- `WhatsApp_Click` - WhatsApp link clicks
- `Directions_Click` - Directions link clicks
- `Form_Error` - Form validation errors (privacy-masked)
- `FAQ_Toggle` - FAQ interactions
- `Core_Web_Vitals` - Performance metrics
- `Scroll_Depth` - Page engagement tracking

### 🛡️ Privacy & Compliance

- **Consent Management** - GDPR-compliant consent banner
- **Data Masking** - Automatic masking of sensitive form fields
- **Session Replay** - Privacy-safe session recording with field masking
- **Data Retention** - Configurable retention periods
- **Opt-out Support** - User can disable tracking

### 📈 Core Web Vitals Monitoring

- **LCP** (Largest Contentful Paint)
- **INP** (Interaction to Next Paint)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

## File Structure

```
src/
├── lib/
│   ├── statsig.ts              # Event tracking functions
│   └── statsig-config.ts       # Experiment configurations
├── components/
│   ├── StatsigProvider.tsx     # Main provider with consent
│   ├── ABTestComponents.tsx    # A/B testing components
│   ├── WebVitals.tsx           # Core Web Vitals tracking
│   ├── ScrollDepthTracker.tsx  # Scroll depth monitoring
│   ├── AppointmentFormTracker.tsx # Form interaction tracking
│   └── StatsigSessionReplay.tsx # Session replay with privacy
```

## Usage Examples

### Basic Event Tracking

```typescript
import { trackPageView, trackHeroCTAClick } from '../lib/statsig';

// Track page view
trackPageView('home', '/', 'endoscopic_spine_surgery');

// Track CTA click
trackHeroCTAClick('/', 'Book Consultation', 'endoscopic_spine_surgery');
```

### A/B Testing Components

```tsx
import { HeroCTA, StickyCTA, SocialProof } from '../components/ABTestComponents';

// Hero CTA with A/B testing
<HeroCTA 
  pageSlug="/"
  service="endoscopic_spine_surgery"
/>

// Sticky mobile CTA
<StickyCTA pageSlug="/" />

// Social proof section
<SocialProof pageSlug="/" />
```

### Form Tracking

```tsx
import AppointmentFormTracker from '../components/AppointmentFormTracker';

<AppointmentFormTracker
  pageSlug="/appointments"
  service="endoscopic_spine_surgery"
  insuranceFlag={true}
  locationHint="malakpet"
/>
```

## Dashboard Configurations

### 1. Conversion Dashboard
- Appointment funnel conversion rates
- CTA performance by module
- Phone/WhatsApp click tracking
- Experiment lift analysis

### 2. SEO & Core Web Vitals Dashboard
- Performance metrics distribution
- Organic traffic conversion rates
- Scroll depth vs conversion correlation
- Page group performance

### 3. Local Behavior Dashboard
- Location-based interactions
- Appointment success by location
- Time-based usage patterns
- Local SEO performance

## Privacy Features

### Consent Management
- GDPR-compliant consent banner
- Granular opt-out options
- Consent state persistence
- Anonymous user IDs

### Data Masking
- Automatic form field masking
- Sensitive data protection
- Session replay privacy controls
- Configurable retention periods

### Medical Compliance
- No PII collection
- Anonymized user tracking
- Short session timeouts
- Disabled replay on sensitive pages

## Environment Variables

```env
NEXT_PUBLIC_STATSIG_CLIENT_KEY=your_statsig_client_key
```

## Getting Started

1. **Set up Statsig account** and get your client key
2. **Configure experiments** in Statsig dashboard
3. **Deploy the implementation** with environment variables
4. **Monitor results** through Statsig dashboards

## Experiment Setup in Statsig

### 1. Create Feature Gates
- `hero_cta_test` - Hero CTA variants
- `sticky_cta_test` - Sticky CTA toggle
- `social_proof_test` - Social proof toggle
- `insurance_band_test` - Insurance band toggle
- `local_h1_test` - H1 variants
- `faq_display_test` - FAQ behavior
- `nav_label_test` - Nav label variants

### 2. Configure Experiments
- Set up proper traffic allocation
- Define success metrics
- Set up guardrails
- Configure audience targeting

### 3. Monitor Performance
- Track conversion rates
- Monitor Core Web Vitals
- Watch for negative impacts
- Analyze user behavior

## Best Practices

### A/B Testing
- Test one element at a time
- Run tests for sufficient duration
- Monitor guardrails closely
- Document learnings

### Privacy
- Always get user consent
- Mask sensitive data
- Respect opt-out requests
- Regular privacy audits

### Performance
- Monitor Core Web Vitals
- Test on mobile devices
- Watch for layout shifts
- Optimize for speed

## Troubleshooting

### Common Issues
1. **Events not firing** - Check consent status
2. **Experiments not working** - Verify feature gate setup
3. **Performance issues** - Check Core Web Vitals
4. **Privacy concerns** - Review masking configuration

### Debug Mode
Enable debug logging by setting `localStorage.setItem('statsig-debug', 'true')` in browser console.

## Support

For technical support or questions about the implementation, refer to:
- Statsig documentation
- Component source code
- Configuration files
- Dashboard setups
