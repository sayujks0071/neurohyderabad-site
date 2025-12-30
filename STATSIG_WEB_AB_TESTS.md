# Statsig Web A/B Testing Implementation

## Overview

This document describes the web-specific A/B testing implementation using Statsig, designed to be completely separate from the existing Telegram bot monitoring system. All experiments and events are prefixed with `web_` to avoid conflicts.

## 🎯 Experiments & Gates

### Gates (Feature Flags)

#### `web_exp_enabled`
- **Purpose**: Global kill switch for all web A/B tests
- **Default**: `true`
- **Usage**: Controls whether any web experiments are active

#### `web_gate_location_banner` (Optional)
- **Purpose**: Show Hyderabad-specific location banner
- **Default**: `false`
- **Targeting**: `country == "IN" AND city == "Hyderabad"`
- **Usage**: Test local reassurance messaging

### Experiments

#### `web_exp_hero_cta`
- **Purpose**: Test different hero CTA copy and styles
- **Split**: 34/33/33 (3 variants)
- **Targeting**: `country == "IN"`
- **Parameters**:
  - `cta_text`: "Book Consultation" | "Book Your Consultation Today" | "Schedule MRI Review"
  - `cta_style`: "primary" | "outline" | "success"

#### `web_exp_sticky_cta`
- **Purpose**: Test mobile sticky CTA behavior
- **Split**: 50/50
- **Targeting**: `country == "IN" AND device == "mobile"`
- **Parameters**:
  - `enabled`: `true` | `false`

## 📊 Event Taxonomy

### Core Events

#### `web_CTA_Click`
- **Purpose**: Track CTA button clicks across the site
- **Properties**:
  - `surface`: "hero" | "sticky" | "header" | "footer" | "card"
  - `page_path`: Current page path
  - `page_type`: "home" | "service" | "condition" | "blog" | "location"
  - `cluster`: "spine" | "brain" | "epilepsy" | "tn" | "generic"
  - `device`: "mobile" | "desktop"
  - `utm_source`: UTM source parameter
  - `utm_campaign`: UTM campaign parameter

#### `web_Appointment_Start`
- **Purpose**: Track when users begin appointment booking process
- **Properties**:
  - `page_path`: Current page path
  - `page_type`: Page type classification
  - `cluster`: Service cluster
  - `device`: Device type

#### `web_Appointment_Success`
- **Purpose**: Track successful appointment bookings
- **Properties**:
  - All `web_Appointment_Start` properties
  - `appointment_type`: "in-person" | "tele" | "unknown"

### Optional Events

#### `web_WhatsApp_Click`
- **Purpose**: Track WhatsApp contact clicks
- **Properties**: Same as core events

#### `web_Call_Click`
- **Purpose**: Track phone call clicks
- **Properties**: Same as core events

#### `web_Directions_Click`
- **Purpose**: Track directions/location clicks
- **Properties**: Same as core events

## 🛠️ Implementation

### Components

#### `HeroCTA`
```tsx
import HeroCTA from '@/app/components/ab/HeroCTA';

<HeroCTA 
  onClick={() => openAppointmentModal()} 
  defaultText="Book Consultation"
  defaultStyle="primary"
/>
```

#### `StickyCTA`
```tsx
import StickyCTA from '@/app/components/ab/StickyCTA';

<StickyCTA onClick={() => openAppointmentModal()} />
```

#### `LocationBanner`
```tsx
import LocationBanner from '@/app/components/ab/LocationBanner';

<LocationBanner />
```

### Hooks

#### `useAppointmentLogger`
```tsx
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';

const { logAppointmentCTA, logAppointmentStart, logAppointmentSuccess } = useAppointmentLogger();

// Log CTA clicks
logAppointmentCTA('header');

// Log appointment flow
logAppointmentStart(); // When form opens
logAppointmentSuccess('in-person'); // When booking completes
```

#### `useContactLogger`
```tsx
import { useContactLogger } from '@/app/hooks/useContactLogger';

const { logWhatsAppClick, logCallClick, logDirectionsClick } = useContactLogger();
```

### Page Context Detection

The system automatically detects page context:

- **Page Type**: home, service, condition, blog, location, appointment
- **Cluster**: spine, brain, epilepsy, tn, generic
- **Device**: mobile, desktop

## 🚀 Rollout Plan

### Phase 1: Setup (Week 1)
1. **Deploy code changes**
   - Add components and hooks
   - Update existing Statsig provider
   - Install dependencies: `npm i js-cookie`

2. **Configure Statsig**
   - Create experiments and gates in Statsig console
   - Set targeting rules
   - Configure event tracking

3. **Initial testing**
   - Verify components render correctly
   - Check event logging in Statsig
   - Test experiment assignment

### Phase 2: Launch (Week 2)
1. **Enable experiments**
   - Set `web_exp_enabled = true`
   - Start with 50/50 splits
   - Monitor for issues

2. **Monitor performance**
   - Track CTR improvements
   - Monitor conversion rates
   - Watch for negative impacts

### Phase 3: Optimization (Week 3-4)
1. **Analyze results**
   - Review experiment performance
   - Identify winning variants
   - Plan next experiments

2. **Scale successful tests**
   - Increase traffic to winning variants
   - Implement permanent changes
   - Plan new experiments

## 📈 Success Metrics

### Primary KPIs
- **CTA Click Rate**: Target 20%+ improvement
- **Appointment Conversion**: Target 15%+ improvement
- **Page Engagement**: Track scroll depth and time on page

### Guardrails
- **Core Web Vitals**: No degradation in LCP, INP, CLS
- **Bounce Rate**: < 5% increase
- **Page Load Speed**: No significant impact

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_STATSIG_CLIENT_KEY=your_client_key
NEXT_PUBLIC_SITE_ENV=production  # or staging
```

### Dependencies
```json
{
  "js-cookie": "^3.0.5"
}
```

## 🚨 Safety & Rollback

### Kill Switch
- Set `web_exp_enabled = false` to disable all experiments
- Individual experiments can be disabled in Statsig console
- Components gracefully fall back to default behavior

### Rollback Process
1. **Immediate**: Set `web_exp_enabled = false` in Statsig
2. **Code rollback**: Revert to previous deployment if needed
3. **Monitoring**: Watch for any negative impacts

## 🧪 QA Checklist

### Functionality
- [ ] Components render with correct text/styles
- [ ] No layout shifts or visual glitches
- [ ] Events appear in Statsig within minutes
- [ ] Appointment funnel events fire correctly
- [ ] No console errors

### Performance
- [ ] No impact on Core Web Vitals
- [ ] Page load times unchanged
- [ ] Mobile experience works correctly
- [ ] Structured data unaffected

### SEO
- [ ] Meta tags unchanged
- [ ] Schema markup intact
- [ ] Canonical URLs preserved
- [ ] Sitemap unaffected

## 📊 Dashboard Queries

### Statsig Dashboard Queries

#### CTA Performance
```sql
SELECT 
  surface,
  COUNT(*) as clicks,
  COUNT(*) / SUM(COUNT(*)) OVER() as percentage
FROM events 
WHERE event_name = 'web_CTA_Click'
AND timestamp >= NOW() - INTERVAL 7 DAY
GROUP BY surface
ORDER BY clicks DESC;
```

#### Conversion Funnel
```sql
SELECT 
  page_type,
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Start' THEN user_id END) as starts,
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Success' THEN user_id END) as successes,
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Success' THEN user_id END) / 
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Start' THEN user_id END) as conversion_rate
FROM events 
WHERE event_name IN ('web_Appointment_Start', 'web_Appointment_Success')
AND timestamp >= NOW() - INTERVAL 7 DAY
GROUP BY page_type;
```

#### Experiment Performance
```sql
SELECT 
  experiment_name,
  variant,
  COUNT(DISTINCT user_id) as users,
  COUNT(CASE WHEN event_name = 'web_CTA_Click' THEN 1 END) as cta_clicks,
  COUNT(CASE WHEN event_name = 'web_Appointment_Success' THEN 1 END) as conversions
FROM events 
WHERE experiment_name LIKE 'web_exp_%'
AND timestamp >= NOW() - INTERVAL 7 DAY
GROUP BY experiment_name, variant;
```

## 🔍 Troubleshooting

### Common Issues

1. **Experiments not showing**
   - Check `web_exp_enabled` gate is true
   - Verify user targeting rules
   - Check Statsig console for experiment status

2. **Events not logging**
   - Verify Statsig client key is correct
   - Check browser console for errors
   - Ensure components are wrapped in StatsigProvider

3. **Layout shifts**
   - Check experiment variants have consistent sizing
   - Verify CSS classes are properly applied
   - Test on different screen sizes

### Debug Mode
Enable debug logging in browser console:
```javascript
localStorage.setItem('statsig-debug', 'true');
```

## 📞 Support

For issues with the A/B testing implementation:
1. Check Statsig console for experiment status
2. Verify event logging in Statsig dashboard
3. Review browser console for errors
4. Test with debug mode enabled

## 🔄 Future Enhancements

### Phase 2: Server-Side Evaluation
- Add Edge middleware for SSR experiment evaluation
- Implement server-side user targeting
- Add GeoIP-based city detection

### Additional Experiments
- Form layout testing
- Social proof elements
- Insurance messaging
- Navigation improvements

### Advanced Analytics
- Cohort analysis
- User journey mapping
- Revenue attribution
- Long-term impact measurement