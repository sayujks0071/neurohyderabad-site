# Variant D - Cluster-Specific CTA Implementation

## Overview

Variant D adds cluster-specific CTA messaging to the existing `web_exp_hero_cta` experiment without requiring code changes. The component automatically detects the page cluster and displays appropriate messaging.

## 🎯 Implementation Approach

### Single Experiment Strategy
- **Experiment**: `web_exp_hero_cta` (existing)
- **Variant D Parameters**: Cluster-specific text via Statsig parameters
- **No Code Changes**: Component automatically picks correct text based on page cluster
- **Conflict-Free**: All keys remain prefixed with `web_`

## 📊 Statsig Console Configuration

### Variant D Parameters
```javascript
web_exp_hero_cta: {
  // Existing variants A/B/C remain unchanged
  
  // Variant D - Cluster-Specific
  variant_d: {
    // Cluster-specific CTA text
    cta_text_spine: "Schedule Your Spine Consultation",
    cta_text_tn: "Get Relief from Trigeminal Neuralgia", 
    cta_text_epilepsy: "Expert Epilepsy Surgery Consultation",
    cta_text_brain: "Second Opinion—Brain Tumor Care",
    cta_text_generic: "Book Consultation", // Fallback
    
    // Style (consistent with other variants)
    cta_style: "primary",
    
    // Optional: Reassurance microcopy
    reassurance_spine: "Minimally invasive options first—surgery only when needed.",
    reassurance_tn: "Medication-resistant TN evaluated for MVD or radiosurgery.",
    reassurance_epilepsy: "Comprehensive pre-surgical evaluation and seizure mapping.",
    reassurance_brain: "Image review. Multidisciplinary options. Surgery when needed.",
    reassurance_generic: "Typical consult 20–30 min"
  }
}
```

### Allocation Strategy
```javascript
// Iteration 2 (after baseline A/B/C completes)
allocation: {
  variant_a: 25,  // "Book Consultation"
  variant_b: 25,  // "Book Consultation with Dr. Sayuj (Hyderabad)"
  variant_c: 25,  // "Get Your MRI/Reports Reviewed Today"
  variant_d: 25   // Cluster-specific messaging
}

// Alternative allocation
allocation: {
  variant_a: 30,  // Control
  variant_b: 25,  // Dr. Sayuj variant
  variant_c: 25,  // MRI review variant
  variant_d: 20   // Cluster-specific (smaller initial test)
}
```

## 🔧 Component Logic

### HeroCTA Component Enhancement
```typescript
// Automatic cluster detection and text selection
const getVariantText = () => {
  if (!expEnabled || !hero) return defaultText;
  
  // Check for cluster-specific text first (Variant D)
  const clusterKey = `cta_text_${pageCtx.cluster}`;
  if (hero[clusterKey]) {
    return hero[clusterKey];
  }
  
  // Fall back to generic cluster text
  if (hero.cta_text_generic) {
    return hero.cta_text_generic;
  }
  
  // Fall back to original variant text (A/B/C)
  if (hero.cta_text) {
    switch (hero.cta_text) {
      case 'book_consultation_dr_sayuj':
        return 'Book Consultation with Dr. Sayuj (Hyderabad)';
      case 'mri_review_today':
        return 'Get Your MRI/Reports Reviewed Today';
      default:
        return 'Book Consultation';
    }
  }
  
  return defaultText;
};
```

### Page Cluster Detection
```typescript
// Automatic cluster detection based on URL
export function getPageContext(pathname: string) {
  let cluster = 'generic';
  
  if (pathname.includes('spine') || pathname.includes('discectomy') || pathname.includes('endoscopic')) {
    cluster = 'spine';
  } else if (pathname.includes('brain') || pathname.includes('tumor') || pathname.includes('awake')) {
    cluster = 'brain';
  } else if (pathname.includes('epilepsy') || pathname.includes('seizure')) {
    cluster = 'epilepsy';
  } else if (pathname.includes('trigeminal') || pathname.includes('neuralgia')) {
    cluster = 'tn';
  }
  
  return { cluster, /* other context */ };
}
```

## 🧪 QA Instructions for Variant D

### Testing Setup
1. **Statsig Console**: Add temporary user override for Variant D
2. **Test Pages**: Visit representative pages for each cluster
3. **Verify Events**: Check `web_CTA_Click` logs with correct context

### Test Cases
```javascript
// Spine pages
URL: /services/endoscopic-spine-surgery
Expected: "Schedule Your Spine Consultation"
Cluster: "spine"

// Trigeminal Neuralgia pages  
URL: /services/trigeminal-neuralgia
Expected: "Get Relief from Trigeminal Neuralgia"
Cluster: "tn"

// Epilepsy pages
URL: /services/epilepsy-surgery
Expected: "Expert Epilepsy Surgery Consultation" 
Cluster: "epilepsy"

// Brain tumor pages
URL: /services/brain-tumor-surgery
Expected: "Second Opinion—Brain Tumor Care"
Cluster: "brain"

// Generic pages
URL: /about
Expected: "Book Consultation" (cta_text_generic)
Cluster: "generic"
```

### Event Validation
```javascript
// Expected event structure
web_CTA_Click: {
  surface: "hero",
  page_type: "service|condition|home",
  cluster: "spine|tn|epilepsy|brain|generic",
  device: "mobile|desktop",
  // + referrer, entry_page, session_id, UTM
}
```

## 📈 Success Metrics

### Primary KPIs
- **CTR by Cluster**: `web_CTA_Click` per session segmented by cluster
- **Conversion by Cluster**: `web_Appointment_Success` per session by cluster
- **Cluster-Specific Lift**: Performance improvement on targeted pages

### Secondary Metrics
- **Cross-Cluster Impact**: Ensure Variant D doesn't hurt generic pages
- **Reassurance Effectiveness**: If microcopy is enabled, track engagement
- **Time-Based Performance**: After-hours WhatsApp switching effectiveness

### Guardrails
- **Cluster Balance**: Ensure all clusters receive adequate traffic
- **Event Coverage**: No missing page_type/cluster combinations
- **Performance**: No degradation in Core Web Vitals on cluster pages

## 🚀 Rollout Plan

### Phase 1: Baseline (Current)
- Run A/B/C variants (7-14 days)
- Establish baseline CTR and conversion rates
- Identify winning variants

### Phase 2: Variant D Introduction
- Add Variant D to experiment (25/25/25/25 or 30/25/25/20)
- Monitor cluster-specific performance
- Validate event coverage across all clusters

### Phase 3: Optimization
- Analyze cluster-specific results
- Adjust allocation based on performance
- Consider cluster-specific sticky CTA variants

## 🔧 Advanced Features

### Reassurance Microcopy
```typescript
// Optional microcopy under CTA
<HeroCTA 
  onClick={handleClick}
  showReassurance={true}  // Enable microcopy
/>
```

### After-Hours Sticky CTA
```javascript
// Automatic WhatsApp switching after 7 PM IST
web_exp_sticky_cta: {
  variant_d: {
    enable_after_hours: true,
    variant: "book_consultation"  // Switches to WhatsApp after 7 PM
  }
}
```

## 📊 Dashboard Queries

### Cluster Performance Analysis
```sql
-- CTR by cluster and variant
SELECT 
  cluster,
  variant,
  COUNT(CASE WHEN event_name = 'web_CTA_Click' THEN 1 END) as cta_clicks,
  COUNT(DISTINCT user_id) as sessions,
  COUNT(CASE WHEN event_name = 'web_CTA_Click' THEN 1 END) / COUNT(DISTINCT user_id) as ctr
FROM events 
WHERE experiment_name = 'web_exp_hero_cta'
AND timestamp >= NOW() - INTERVAL 7 DAY
GROUP BY cluster, variant
ORDER BY cluster, variant;
```

### Conversion Funnel by Cluster
```sql
-- Appointment conversion by cluster
SELECT 
  cluster,
  variant,
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Start' THEN user_id END) as starts,
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Success' THEN user_id END) as successes,
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Success' THEN user_id END) / 
  COUNT(DISTINCT CASE WHEN event_name = 'web_Appointment_Start' THEN user_id END) as conversion_rate
FROM events 
WHERE experiment_name = 'web_exp_hero_cta'
AND event_name IN ('web_Appointment_Start', 'web_Appointment_Success')
AND timestamp >= NOW() - INTERVAL 7 DAY
GROUP BY cluster, variant;
```

## 🚨 Rollback Plan

### Immediate Rollback
1. **Statsig Console**: Set Variant D allocation to 0%
2. **Monitor**: Watch for any negative impacts
3. **Verify**: All users revert to A/B/C variants

### Code Rollback
1. **Revert**: Remove cluster-specific logic from HeroCTA
2. **Deploy**: Push previous version
3. **Validate**: Ensure normal operation

## 📋 Implementation Checklist

### Pre-Launch
- [ ] Variant D parameters configured in Statsig
- [ ] Cluster detection logic verified
- [ ] QA testing completed across all clusters
- [ ] Event logging validated
- [ ] Performance impact assessed

### Launch
- [ ] Variant D allocation set (25% or 20%)
- [ ] Monitoring dashboards configured
- [ ] Guardrails enabled
- [ ] Team notified of launch

### Post-Launch
- [ ] Daily performance monitoring
- [ ] Cluster-specific analysis
- [ ] Cross-variant comparison
- [ ] Optimization recommendations

## 🎯 Success Criteria

### Launch Ready When:
- [ ] All cluster pages render correct messaging
- [ ] Events log with proper cluster context
- [ ] No performance degradation
- [ ] Cross-cluster balance maintained

### Success Metrics:
- [ ] Cluster-specific CTR improvement: +15% minimum
- [ ] Conversion lift on targeted pages: +10% minimum
- [ ] No negative impact on generic pages
- [ ] Event coverage: 100% across all clusters

This implementation provides powerful cluster-specific messaging while maintaining the simplicity and safety of the existing A/B testing framework.