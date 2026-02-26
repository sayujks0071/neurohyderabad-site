# Best Use Cases for Middleware with www.drsayuj.info

This guide outlines the top priority use cases for implementing Middleware monitoring and observability on `www.drsayuj.info`. It is designed to help you maximize the value of the platform by focusing on business-critical metrics that directly impact patient bookings, user experience, and revenue.

## Top 10 Priority Use Cases

### 1. Appointment Booking Success Rate Monitoring
- **Why:** Every failed booking represents lost revenue and a frustrated patient.
- **Monitor:**
  - `form.success_rate` (Target > 95%)
  - API response time for `/api/appointments/submit`
  - Form abandonment rate
- **ROI:** Each recovered booking can generate ₹500-2000 in consultation fees.
- **Alert:** Critical if `form.success_rate < 90%` over a 15-minute window.
- **Code/Configuration:**
  ```typescript
  // From scripts/setup-middleware-alerts.ts
  {
    name: 'Form Submission Failure',
    condition: {
      metric: 'form.success_rate',
      threshold: 0.9, // 90%
      operator: '<',
      window: '15m',
    },
    severity: 'critical',
  }
  ```

### 2. Real-Time Error Detection & Triage
- **Why:** Errors break the user experience. Medical websites require high reliability (99.9% uptime).
- **Monitor:**
  - JavaScript errors (`error_type: javascript`)
  - API errors (`error_type: api`)
  - Top error messages table
- **ROI:** Prevents reputation damage and maintains patient confidence.
- **Alert:** Error rate > 1% for 5 minutes (High Priority).
- **Code/Configuration:**
  ```typescript
  // From scripts/setup-middleware-monitoring.ts
  {
    name: 'JavaScript Error Rate',
    query: {
      metric: 'error.rate',
      filters: [{ key: 'error_type', value: 'javascript' }],
    },
  }
  ```

### 3. Core Web Vitals for SEO
- **Why:** Google uses these metrics for ranking. Poor metrics lead to lower visibility in search results.
- **Monitor:**
  - **LCP (Largest Contentful Paint):** < 2.5s
  - **CLS (Cumulative Layout Shift):** < 0.1
  - **INP (Interaction to Next Paint):** < 200ms
  - FCP and TTFB
- **ROI:** 10% improvement can lead to 5-10% more organic traffic.
- **Alert:** LCP > 2.5s for 10 minutes.
- **Code/Configuration:**
  ```typescript
  // From scripts/setup-middleware-alerts.ts
  {
    name: 'Poor LCP',
    condition: {
      metric: 'web_vitals.lcp',
      threshold: 2500, // 2.5s
      operator: '>',
      window: '10m',
    },
    severity: 'high',
  }
  ```

### 4. Chatbot/AI Assistant Performance
- **Why:** The AI assistant is a primary engagement tool. Slow responses lead to lost conversions.
- **Monitor:**
  - Response time for `/api/ai/chat` (Target < 3s)
  - Error rate (< 5%)
  - Chat completion rate
- **ROI:** 1 second faster response = 5-10% more conversations completed.
- **Alert:** Response time > 3s for 5 minutes.
- **Code/Configuration:**
  ```typescript
  // From scripts/setup-middleware-monitoring.ts
  {
    name: 'Chatbot API Response Time',
    query: {
      metric: 'http.response_time',
      filters: [
        { key: 'endpoint', value: '/api/ai/chat' },
      ],
    },
  }
  ```

### 5. Deployment Health Monitoring
- **Why:** Bad deployments can break the site for users.
- **Monitor:**
  - Error rate before vs. after deployment
  - Response time changes
  - Core Web Vitals regression
- **ROI:** Preventing downtime maintains patient trust.
- **Alert:** Error rate increase > 50% after deployment.

### 6. Critical Page Performance
- **Why:** Key pages are entry points. Slow loading means lost patients.
- **Monitor:**
  - Load times for: Homepage (`/`), Appointments (`/appointments`), Services (`/services`), Contact (`/contact`)
- **ROI:** 1 second faster load time = ~7% improvement in conversion.
- **Alert:** Any critical page load > 3s for 10 minutes.
- **Code/Configuration:**
  ```typescript
  // From scripts/setup-middleware-monitoring.ts
  {
    name: 'Homepage Load Time',
    query: {
      metric: 'http.response_time',
      filters: [{ key: 'page', value: '/' }],
    },
  }
  ```

### 7. Peak Traffic Performance
- **Why:** Medical sites experience peak hours (typically 9 AM - 6 PM).
- **Monitor:**
  - Request rate
  - Response time under load
  - Error rate during peak hours
- **ROI:** Handling 20% more traffic = 20% more potential bookings.
- **Action:** Scale resources if thresholds are consistently breached during peak times.

### 8. Form Submission Funnel Analysis
- **Why:** Understand where patients drop off in the booking process.
- **Monitor:**
  - Page View → Form Start → Submit → Success
- **ROI:** 5% improvement in funnel conversion = 5% more bookings.
- **Action:** Identify and optimize the highest drop-off step.

### 9. Mobile vs. Desktop Performance
- **Why:** 60-70% of traffic comes from mobile devices.
- **Monitor:**
  - Compare LCP, CLS, and Error Rates between Mobile and Desktop
- **ROI:** Critical for revenue as the majority of users are on mobile.
- **Alert:** Mobile LCP > 3s.

### 10. API Endpoint Health Dashboard
- **Why:** All modern features (appointments, chat, search) depend on APIs.
- **Monitor:**
  - `/api/appointments/submit`
  - `/api/ai/chat`
  - `/api/lead`
- **ROI:** Preventing feature downtime ensures consistent service availability.
- **Alert:** Any critical API response time > 2s.

---

## Recommended Dashboards

The following dashboards are pre-configured in `scripts/setup-middleware-monitoring.ts`:

### 1. Business Critical Dashboard
*Focus: Revenue and Conversions*
- Appointment Booking Success Rate (Gauge)
- Form Submissions (Line)
- Chatbot Interactions (Line)
- Top Errors (Table - to see blockers)

### 2. Performance Dashboard
*Focus: User Experience & SEO*
- Core Web Vitals (LCP, CLS, INP, FCP, TTFB)
- Critical Page Load Times (Home, Appointments, Services)

### 3. Operational Dashboard
*Focus: Infrastructure & Health*
- API Performance (Response Times for Appointments, Chat, Lead APIs)
- Error Tracking (JS Errors, API Errors, 404 Rates)

---

## Critical Alerts (Priority Order)

These alerts are configured in `scripts/setup-middleware-alerts.ts`:

### Priority 1: Critical (Immediate Action Required)
- **Form Submission Failure:** Success rate < 90% (Window: 15m)
- **Appointment API Down:** 5xx errors > 0 (Window: 1m)
- **Critical Global Error Rate:** Error rate > 5% (Window: 5m)

### Priority 2: High (Urgent Investigation)
- **High Error Rate:** Error rate > 1% (Window: 5m)
- **Poor LCP:** LCP > 2.5s (Window: 10m)
- **Chatbot API Latency:** Response time > 3s (Window: 5m)
- **Critical Page Load:** Home/Appointments load > 3s (Window: 10m)

### Priority 3: Monitor (Optimization Opportunities)
- **High CLS:** CLS > 0.1
- **Slow INP:** INP > 200ms
- **High 404 Rate:** > 5%

---

## Success Metrics (KPIs)

Track these monthly to measure improvement:

- **Booking Success Rate:** Target > 95%
- **Average Page Load Time:** Target < 2s
- **Error Rate:** Target < 0.5%
- **Core Web Vitals:** All metrics in the "Good" range
- **API Uptime:** Target > 99.9%
- **Mobile Performance:** Parity with desktop metrics

---

## Implementation Roadmap

### Week 1: Critical Monitoring
- **Dashboards:** Run the setup script to create initial dashboards.
  ```bash
  pnpm middleware:setup
  ```
- **Alerts:** Configure critical alerts for immediate notification of issues.
  ```bash
  pnpm middleware:alerts <rule-id>
  ```
- **Verification:** Ensure the Appointment Booking API is being monitored correctly.

### Week 2: Performance Optimization
- Monitor Core Web Vitals using the **Performance Dashboard**.
- Identify the slowest pages and optimize images/scripts.
- Tune alerts based on baseline performance.

### Week 3: Advanced Analytics & Funnels
- Set up conversion funnels to track user journeys.
- Analyze Mobile vs. Desktop performance discrepancies.
- Optimize peak traffic handling.

### Week 4: Automation
- Automate weekly performance reports.
- Integrate deployment health checks into the CI/CD pipeline.
- Set up regression detection for key metrics.

---

## Usage Instructions

### Prerequisites
1. Ensure `MIDDLEWARE_ACCESS_TOKEN` and `MIDDLEWARE_WEBHOOK_SECRET` are set in your `.env.local` file.
2. Obtain a Rule ID from the Middleware dashboard for alert creation.

### Setup Scripts

**1. Create Dashboards:**
```bash
pnpm middleware:setup
```
This script reads the configuration from `scripts/setup-middleware-monitoring.ts` and creates the standard dashboards.

**2. Create Alerts:**
```bash
pnpm middleware:alerts <rule-id>
```
This script reads from `scripts/setup-middleware-alerts.ts` and creates alerts attached to the specified rule ID.
