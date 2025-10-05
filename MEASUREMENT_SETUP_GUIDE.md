# Measurement Setup Guide

## Statsig Dashboards

### 1. Appointment Success Dashboard
- **Event**: `appointment_start`
- **Dimensions**: 
  - `service_cluster` (spine/brain/epilepsy/nerve)
  - `device_type` (mobile/desktop/tablet)
  - `traffic_source` (organic/paid/direct/social)
- **Metrics**: Conversion rate, session duration, bounce rate

### 2. CTA Performance Dashboard
- **Events**: `phone_click`, `whatsapp_click`, `appointment_start`
- **Dimensions**: 
  - `page_type` (service/condition/blog)
  - `cta_position` (header/footer/sticky)
  - `experiment_variant`
- **Metrics**: Click-through rate, conversion rate

### 3. Scroll Depth Analysis
- **Events**: `scroll_depth_25`, `scroll_depth_50`, `scroll_depth_75`, `scroll_depth_90`, `scroll_depth_100`
- **Dimensions**: 
  - `page_type`
  - `content_length`
  - `device_type`
- **Metrics**: Engagement rate, time on page

### 4. Experiment Performance
- **Experiments**: 
  - `exp_reassurance_microcopy`
  - `exp_trust_strip`
  - `exp_sticky_cta`
- **Metrics**: Conversion rate, engagement, bounce rate

## GA4 Custom Page Groups

### 1. Spine Hub
- **Pages**: `/services/minimally-invasive-spine-surgery`, `/services/spinal-fusion`, `/conditions/sciatica-treatment-hyderabad`
- **Custom Dimension**: `content_cluster` = "spine"

### 2. Brain Hub
- **Pages**: `/services/brain-tumor-surgery-hyderabad`, `/services/epilepsy-surgery-hyderabad`, `/blog/awake-craniotomy-guide`
- **Custom Dimension**: `content_cluster` = "brain"

### 3. Nerve Hub
- **Pages**: `/services/peripheral-nerve-surgery-hyderabad`, `/services/microvascular-decompression`
- **Custom Dimension**: `content_cluster` = "nerve"

### 4. Local Pages
- **Pages**: `/near/*`, `/neurosurgeon-*`, `/locations/*`
- **Custom Dimension**: `content_cluster` = "local"

## Query Tracking Setup

### 1. Hyderabad Long-tail Keywords
- **Pattern**: `*hyderabad*`, `*malakpet*`, `*yashoda*`
- **Custom Dimension**: `location_intent` = "hyderabad"

### 2. Service-specific Queries
- **Pattern**: `*surgery*`, `*treatment*`, `*procedure*`
- **Custom Dimension**: `service_intent` = "treatment"

### 3. Urgency Indicators
- **Pattern**: `*emergency*`, `*urgent*`, `*immediate*`
- **Custom Dimension**: `urgency_level` = "high"

## SRM (Sample Ratio Mismatch) Monitoring

### 1. Experiment Health Checks
- **Frequency**: Daily
- **Threshold**: ±5% from expected ratio
- **Alerts**: Email/Slack notification

### 2. Traffic Quality Monitoring
- **Metrics**: Bounce rate, session duration, pages per session
- **Threshold**: 20% deviation from baseline
- **Action**: Investigate traffic sources

## Missing Context Alerts

### 1. High Bounce Rate Pages
- **Threshold**: >70% bounce rate
- **Action**: Review content quality and user intent

### 2. Low Conversion Pages
- **Threshold**: <2% conversion rate
- **Action**: A/B test CTA placement and copy

### 3. High Exit Rate
- **Threshold**: >50% exit rate
- **Action**: Improve internal linking and content flow

## Implementation Checklist

- [ ] Set up Statsig experiments
- [ ] Configure GA4 custom dimensions
- [ ] Create custom audiences
- [ ] Set up conversion goals
- [ ] Configure automated reports
- [ ] Set up alert thresholds
- [ ] Test measurement accuracy
- [ ] Document dashboard access
- [ ] Train team on interpretation
- [ ] Schedule regular reviews
