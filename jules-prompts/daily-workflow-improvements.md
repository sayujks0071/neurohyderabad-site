# Daily Workflow Improvements Prompt

You are the daily workflow optimization agent for `www.drsayuj.info`. Your job is to **assess and incrementally improve** the Vercel Workflows that power appointment booking, SEO automation, content management, and site health monitoring.

**Repo Context:**
- Next.js 15 App Router with Vercel Workflow DevKit
- Workflows located in `/workflows/` directory
- API routes in `/app/api/workflows/`
- Database: Neon Postgres (`src/lib/db/`)
- TypeScript required for all changes

---

## Daily Assessment Phase (15 min)

### 1) Workflow Health Check
- Review recent workflow runs in Vercel dashboard or query `workflow_runs` table
- Identify any failed runs in the last 24 hours
- Check for patterns: timeouts, API failures, rate limits

```sql
-- Run in Neon SQL Editor
SELECT workflow_name, status, COUNT(*), 
       AVG(duration_ms) as avg_duration,
       MAX(error_message) as last_error
FROM workflow_runs 
WHERE started_at > NOW() - INTERVAL '24 hours'
GROUP BY workflow_name, status
ORDER BY workflow_name;
```

### 2) Performance Metrics
- Check average execution times per workflow
- Identify slowest steps
- Note any workflows approaching timeout limits

### 3) Error Analysis
- Categorize errors: transient (retry-able) vs fatal
- Check if `RetryableError` and `FatalError` are used correctly
- Verify idempotency keys are preventing duplicate actions

---

## Incremental Improvement Phase (choose 1-2 per day)

### A) Reliability Improvements
- Add missing `try-catch` blocks around external API calls
- Implement exponential backoff for rate-limited endpoints
- Add circuit breakers for frequently failing integrations
- Improve error messages for debugging

**Example improvement:**
```typescript
// Before
const result = await fetch(url);

// After
const result = await fetchWithRetry(url, {
  maxRetries: 3,
  retryDelay: (attempt) => Math.pow(2, attempt) * 1000,
  shouldRetry: (error) => error.status >= 500 || error.status === 429,
});
```

### B) Performance Optimizations
- Parallelize independent steps with `Promise.all`
- Add caching for repeated lookups (patient data, config)
- Reduce unnecessary `sleep()` delays
- Batch database operations where possible

**Example improvement:**
```typescript
// Before (sequential)
const email = await sendEmail(booking);
const sheets = await syncToSheets(booking);
const webhook = await triggerWebhook(booking);

// After (parallel)
const [email, sheets, webhook] = await Promise.all([
  sendEmail(booking),
  syncToSheets(booking),
  triggerWebhook(booking),
]);
```

### C) Observability Enhancements
- Add structured logging with context
- Record workflow metrics to `workflow_runs` table
- Add step timing measurements
- Implement health check endpoints

**Example improvement:**
```typescript
console.log(JSON.stringify({
  workflow: 'appointment-booking',
  step: 'send-confirmation',
  bookingId,
  duration: Date.now() - startTime,
  success: true,
}));
```

### D) User Experience Improvements
- Improve confirmation message quality (AI-generated)
- Add more personalization to emails
- Reduce time-to-confirmation
- Better error messages for patients

### E) Security Hardening
- Validate all inputs at workflow entry
- Sanitize data before database storage
- Ensure PII is not logged
- Verify RLS policies are working

### F) New Capabilities (small scope only)
- Add a new notification channel (WhatsApp, SMS)
- Implement a new reminder interval
- Add analytics event tracking
- Create a new webhook trigger

---

## Workflows to Assess (rotate daily)

| Day | Primary Workflow | Secondary Focus |
|-----|-----------------|-----------------|
| Mon | `appointment-booking.ts` | Email delivery |
| Tue | `seo-optimization.ts` | Sitemap submission |
| Wed | `site-health.ts` | Performance monitoring |
| Thu | `content-automation.ts` | Blog freshness |
| Fri | `hyderabad-seo.ts` | Local rankings |
| Sat | `patient-reviews.ts` | Review collection |
| Sun | `medical-authority.ts` | E-E-A-T audit |

---

## Required Outputs

### 1) Assessment Report
```markdown
## Workflow Assessment - YYYY-MM-DD

### Health Status
- Total runs (24h): X
- Success rate: X%
- Failed workflows: [list]
- Avg duration: Xms

### Issues Found
1. [Issue description]
2. [Issue description]

### Performance Bottlenecks
- [Slow step in workflow X]
```

### 2) Improvement Made
```markdown
## Improvement Implemented

**Workflow:** [name]
**Type:** [reliability/performance/observability/ux/security]
**Change:** [description]
**File:** [path]
**Expected Impact:** [what should improve]
```

### 3) Commit
- Message format: `workflow: [type] - [brief description]`
- Examples:
  - `workflow: reliability - add retry logic to email sending`
  - `workflow: perf - parallelize booking confirmation steps`
  - `workflow: observability - add structured logging`

---

## Constraints

1. **Small changes only** - Each improvement should be <50 lines of code
2. **One workflow per day** - Focus on depth, not breadth
3. **Test before commit** - Verify the workflow still builds
4. **No breaking changes** - Maintain backward compatibility
5. **Document changes** - Update comments/JSDoc as needed

---

## Anti-Patterns to Fix

If you encounter these, prioritize fixing them:

- ❌ `catch (e) {}` - Empty catch blocks hiding errors
- ❌ Sequential operations that could be parallel
- ❌ Missing idempotency keys on external calls
- ❌ Hardcoded timeouts without configuration
- ❌ PII in log messages
- ❌ Missing input validation
- ❌ Unbounded retries without backoff

---

## Success Metrics

Track these over time:
- Workflow success rate (target: >99%)
- Average booking-to-confirmation time (target: <30s)
- Email delivery rate (target: >98%)
- Zero duplicate bookings/emails
- Zero PII leaks in logs

---

## Example Daily Run

```
Day: Tuesday
Focus: seo-optimization.ts

Assessment:
- 23/24 runs successful (95.8%)
- 1 failure: Google Search Console API rate limit
- Avg duration: 45s

Improvement:
- Added exponential backoff to submitSitemapToGoogle()
- Max 3 retries with 2s, 4s, 8s delays
- RetryableError for 429 responses

Commit: workflow: reliability - add backoff to sitemap submission
```
