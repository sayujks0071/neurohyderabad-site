# Middleware Use Cases for www.drsayuj.info

## Overview

This document outlines the most common monitoring use cases implemented for www.drsayuj.info using Middleware.

## Use Cases

### 1. Appointment Booking API Performance

**Why it matters:** The appointment booking API (`/api/appointments/submit`) is critical for business operations. Slow or failing bookings directly impact revenue.

**What we monitor:**
- Response time (target: < 2 seconds)
- Error rate (target: < 1%)
- Success rate (target: > 99%)
- Request throughput

**Alerts:**
- Response time > 2s for 5 minutes
- Error rate > 1% for 5 minutes
- Success rate < 95% for 15 minutes (critical)

**Dashboard:** API Performance Dashboard

### 2. Chatbot/AI Chat Performance

**Why it matters:** The chatbot (`/api/ai/chat`) is a primary user engagement tool. Poor performance affects user experience and conversions.

**What we monitor:**
- Response time (target: < 3 seconds)
- Error rate (target: < 5%)
- User satisfaction (if tracked)
- Message throughput

**Alerts:**
- Response time > 3s for 5 minutes
- Error rate > 5% for 5 minutes

**Dashboard:** API Performance Dashboard

### 3. Core Web Vitals Monitoring

**Why it matters:** Core Web Vitals directly impact SEO rankings and user experience. Google uses these metrics for search ranking.

**What we monitor:**
- **LCP (Largest Contentful Paint)**: Target < 2.5s
- **CLS (Cumulative Layout Shift)**: Target < 0.1
- **INP (Interaction to Next Paint)**: Target < 200ms
- **FCP (First Contentful Paint)**: Target < 1.8s
- **TTFB (Time to First Byte)**: Target < 600ms

**Alerts:**
- LCP > 2.5s for 10 minutes
- CLS > 0.1 for 10 minutes
- INP > 200ms for 10 minutes

**Dashboard:** Website Performance Overview

### 4. Error Tracking

**Why it matters:** Errors affect user experience and can indicate bugs or infrastructure issues.

**What we monitor:**
- JavaScript error rate
- API error rate
- 404 error rate
- Top error messages
- Error trends over time

**Alerts:**
- Overall error rate > 1% for 5 minutes
- 404 rate > 5% for 10 minutes
- JavaScript error spike (> 2x baseline)

**Dashboard:** Error Tracking Dashboard

### 5. Critical Pages Performance

**Why it matters:** Key pages (homepage, appointments, services) are entry points for users. Slow pages reduce conversions.

**What we monitor:**
- Homepage (`/`) load time
- Appointments page (`/appointments`) load time
- Services page (`/services`) load time
- Contact page (`/contact`) load time

**Alerts:**
- Any critical page load time > 3s for 10 minutes

**Dashboard:** Critical Pages Performance Dashboard

### 6. Deployment Health

**Why it matters:** Deployments can introduce bugs or performance regressions. Monitoring post-deployment metrics helps catch issues early.

**What we monitor:**
- Error rate before/after deployment
- Response time before/after deployment
- Core Web Vitals before/after deployment
- Deployment success/failure (via Vercel webhooks)

**Integration:** Vercel webhooks → Middleware correlation

**Alerts:**
- Error rate increase > 50% after deployment
- Response time increase > 30% after deployment

### 7. Form Submission Success Rate

**Why it matters:** Form failures (appointment, contact, lead) directly impact business. Low success rates indicate technical issues.

**What we monitor:**
- Appointment form success rate
- Contact form success rate
- Lead form success rate
- Form submission errors

**Alerts:**
- Form success rate < 90% for 15 minutes (critical)
- Form error rate > 10% for 10 minutes

**Dashboard:** User Engagement Dashboard

### 8. User Engagement Metrics

**Why it matters:** Understanding user behavior helps optimize conversion funnels.

**What we monitor:**
- Page views by page
- Form submissions by type
- Chatbot interactions
- CTA click rates (if tracked)
- Session duration

**Dashboard:** User Engagement Dashboard

## Implementation

### Setup Scripts

1. **Create Dashboards:**
   ```bash
   pnpm tsx scripts/setup-middleware-monitoring.ts
   ```

2. **Create Alerts:**
   ```bash
   # First, create a rule in the dashboard, then:
   pnpm tsx scripts/setup-middleware-alerts.ts <rule-id>
   ```

### Webhook Handler

The webhook handler at `/api/webhooks/middleware` receives alerts and:
- Logs all alerts
- Handles critical alerts immediately
- Forwards to existing monitoring infrastructure
- Integrates with Vercel deployment monitoring

### Integration Points

1. **Vercel Webhooks** → Correlate deployments with performance
2. **Existing Monitoring** → Forward alerts to `MONITORING_WEBHOOK_URL`
3. **Analytics** → Correlate Middleware metrics with GA4 data
4. **Error Tracking** → Combine with sourcemap uploads for readable stack traces

## Dashboards

### 1. Website Performance Overview
- Core Web Vitals (LCP, CLS, INP, FCP, TTFB)
- Overall performance trends
- Performance by page

### 2. API Performance
- Appointment API response time
- Chatbot API response time
- Lead API response time
- API error rates

### 3. Critical Pages Performance
- Homepage load time
- Appointments page load time
- Services page load time
- Contact page load time

### 4. Error Tracking
- JavaScript error rate
- API error rate
- 404 error rate
- Top errors table

### 5. User Engagement
- Page views
- Form submissions
- Chatbot interactions
- Appointment booking success rate

## Alert Configuration

### Critical Alerts (Immediate Action)
- Form submission success rate < 90%
- Complete API failure
- Security issues

### High Severity Alerts
- Error rate > 1%
- LCP > 2.5s
- API response time > 2s

### Medium Severity Alerts
- CLS > 0.1
- INP > 200ms
- 404 rate > 5%

## Best Practices

1. **Monitor Before Optimizing**: Establish baselines before making changes
2. **Correlate Metrics**: Combine client-side (RUM) and server-side (APM) metrics
3. **Set Realistic Thresholds**: Use percentiles (p95, p99) not averages
4. **Review Regularly**: Check dashboards weekly, adjust thresholds monthly
5. **Automate Responses**: Use webhooks to trigger automated responses

## Next Steps

1. ✅ Set up dashboards (run setup script)
2. ✅ Configure alerts (run alert setup script)
3. ✅ Test webhook handler
4. ⏳ Review metrics after 1 week
5. ⏳ Adjust thresholds based on actual data
6. ⏳ Set up automated responses for critical alerts

## Related Documentation

- [Middleware API Integration](./middleware-api-integration.md)
- [Middleware Configuration](./middleware-configuration.md)
- [Middleware RUM Integration](./middleware-rum-integration.md)
- [Middleware Website Improvement Guide](./middleware-website-improvement-guide.md)

## Last Updated
January 26, 2026
