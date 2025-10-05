# CRO Experiments Configuration

## Experiment 1: Reassurance Microcopy Test

### Objective
Test if reassuring microcopy about minimally invasive options increases conversion rates.

### Hypothesis
"Minimally invasive options first—surgery only when needed" will reduce anxiety and increase appointment bookings.

### Configuration
```json
{
  "experiment_name": "exp_reassurance_microcopy",
  "traffic_allocation": 0.5,
  "variants": {
    "control": {
      "weight": 0.5,
      "microcopy": "Expert neurosurgical care with advanced techniques"
    },
    "treatment": {
      "weight": 0.5,
      "microcopy": "Minimally invasive options first—surgery only when needed"
    }
  },
  "targeting": {
    "service_clusters": ["spine", "brain", "epilepsy", "nerve"]
  }
}
```

### Success Metrics
- Primary: Appointment conversion rate
- Secondary: Time on page, scroll depth, bounce rate

## Experiment 2: Trust Strip Test

### Objective
Test if enhanced trust signals improve user confidence and conversion.

### Hypothesis
Yashoda association + credentials + "MRI reviewed" will increase trust and conversions.

### Configuration
```json
{
  "experiment_name": "exp_trust_strip",
  "traffic_allocation": 0.5,
  "variants": {
    "control": {
      "weight": 0.5,
      "elements": [
        {"icon": "🏥", "text": "Yashoda Hospital"},
        {"icon": "🎓", "text": "Expert Neurosurgeon"},
        {"icon": "🔬", "text": "Advanced Diagnostics"}
      ]
    },
    "treatment": {
      "weight": 0.5,
      "elements": [
        {"icon": "🏥", "text": "Yashoda Hospital Association"},
        {"icon": "🎓", "text": "Board Certified Neurosurgeon"},
        {"icon": "🔬", "text": "MRI Reviewed by Dr. Sayuj"}
      ]
    }
  }
}
```

### Success Metrics
- Primary: CTA click-through rate
- Secondary: Page engagement, trust signals

## Experiment 3: Sticky CTA Test

### Objective
Test if sticky CTA improves conversion rates on mobile devices.

### Hypothesis
Sticky CTA will increase conversion rates by 15% on mobile devices.

### Configuration
```json
{
  "experiment_name": "exp_sticky_cta",
  "traffic_allocation": 0.5,
  "variants": {
    "control": {
      "weight": 0.5,
      "sticky_cta": false
    },
    "treatment": {
      "weight": 0.5,
      "sticky_cta": true,
      "trigger_scroll": 0.5,
      "mobile_only": true
    }
  },
  "targeting": {
    "device_types": ["mobile", "tablet"]
  }
}
```

### Success Metrics
- Primary: Mobile conversion rate
- Secondary: CTA click rate, session duration

## Experiment 4: Variant D Rollout Plan

### Objective
Systematically roll out enhanced service page variants across clusters.

### Rollout Schedule
1. **Week 1-2**: Spine cluster (3 pages)
2. **Week 3-4**: Brain cluster (3 pages)
3. **Week 5-6**: Epilepsy cluster (2 pages)
4. **Week 7-8**: Nerve cluster (2 pages)

### Variant D Features
- Enhanced hero section with patient testimonials
- Interactive treatment timeline
- Cost transparency section
- Enhanced CTA placement
- Trust signals integration

### Configuration
```json
{
  "experiment_name": "exp_variant_d_rollout",
  "traffic_allocation": 0.5,
  "variants": {
    "control": {
      "weight": 0.5,
      "variant": "current"
    },
    "treatment": {
      "weight": 0.5,
      "variant": "enhanced",
      "features": [
        "patient_testimonials",
        "treatment_timeline",
        "cost_transparency",
        "enhanced_cta",
        "trust_signals"
      ]
    }
  },
  "targeting": {
    "clusters": ["spine", "brain", "epilepsy", "nerve"],
    "rollout_phase": "progressive"
  }
}
```

## Experiment 5: After-hours WhatsApp Test

### Objective
Test if disabling after-hours WhatsApp reduces noise and improves quality leads.

### Hypothesis
Disabling after-hours WhatsApp will reduce low-quality inquiries and improve conversion rates.

### Configuration
```json
{
  "experiment_name": "exp_after_hours_whatsapp",
  "traffic_allocation": 0.5,
  "variants": {
    "control": {
      "weight": 0.5,
      "whatsapp_24_7": true
    },
    "treatment": {
      "weight": 0.5,
      "whatsapp_24_7": false,
      "business_hours": "9:00-18:00",
      "timezone": "IST"
    }
  }
}
```

### Success Metrics
- Primary: Lead quality score
- Secondary: Response time, conversion rate

## Implementation Guidelines

### 1. Statistical Significance
- Minimum sample size: 1000 users per variant
- Confidence level: 95%
- Minimum test duration: 2 weeks

### 2. Monitoring
- Daily performance checks
- Weekly statistical significance review
- Bi-weekly experiment health assessment

### 3. Success Criteria
- Primary metric improvement: >10%
- Secondary metrics: No significant degradation
- Statistical significance: p < 0.05

### 4. Rollout Strategy
- Start with 10% traffic allocation
- Increase to 50% after 1 week
- Full rollout after 2 weeks of positive results

### 5. Risk Mitigation
- Automated rollback triggers
- Real-time monitoring alerts
- Emergency stop procedures
- A/B test isolation

## Measurement Framework

### 1. Event Tracking
```javascript
// Reassurance microcopy
analytics.track('experiment_view', {
  experiment: 'exp_reassurance_microcopy',
  variant: 'treatment',
  service_type: 'spine'
});

// Trust strip interaction
analytics.track('trust_signal_view', {
  experiment: 'exp_trust_strip',
  variant: 'treatment',
  signal_type: 'yashoda_association'
});

// Sticky CTA interaction
analytics.track('sticky_cta_show', {
  experiment: 'exp_sticky_cta',
  variant: 'treatment',
  scroll_depth: 0.75
});
```

### 2. Conversion Tracking
```javascript
// Enhanced conversion tracking
analytics.track('appointment_start', {
  experiment: 'exp_variant_d_rollout',
  variant: 'enhanced',
  service_cluster: 'spine',
  conversion_path: 'enhanced_cta'
});
```

### 3. Quality Metrics
- Lead quality score (1-10)
- Response time (minutes)
- Conversion rate by source
- Customer satisfaction score
