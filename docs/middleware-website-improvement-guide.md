# Using Middleware Agent to Improve Website Performance

## Overview

Middleware Agent provides infrastructure observability and monitoring that can help identify and fix performance issues, optimize resource usage, and improve overall website reliability.

## What Middleware Agent Monitors

The Middleware Agent collects:
- **Infrastructure metrics**: CPU, memory, disk, network usage
- **Application performance**: Response times, error rates, throughput
- **System health**: Process status, service availability
- **Resource utilization**: Identify bottlenecks and optimization opportunities

## How to Use Middleware to Improve Your Website

### 1. Access Middleware Dashboard

1. **Open the dashboard:**
   ```
   https://hjptv.middleware.io
   ```

2. **Login with your account** (associated with API key: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`)

3. **Navigate to your infrastructure** to see real-time metrics

### 2. Monitor Key Performance Metrics

#### A. Infrastructure Health

**What to monitor:**
- CPU usage (should be < 70% average)
- Memory usage (watch for memory leaks)
- Disk I/O (identify slow storage operations)
- Network latency (affects API response times)

**How it helps:**
- Identify resource bottlenecks affecting website performance
- Detect memory leaks causing slowdowns
- Find slow database queries or file operations
- Optimize server resources for better response times

#### B. Application Performance

**What to monitor:**
- API response times
- Error rates
- Request throughput
- Database query performance

**How it helps:**
- Identify slow API endpoints
- Find and fix error patterns
- Optimize database queries
- Improve overall user experience

### 3. Integration with Existing Monitoring

Your website already has:
- ✅ **Core Web Vitals tracking** (LCP, CLS, INP, FCP, TTFB)
- ✅ **Performance monitoring** (`PerformanceMonitor.tsx`)
- ✅ **Analytics tracking** (Google Analytics, Statsig)
- ✅ **Error tracking** (JavaScript errors, unhandled rejections)

**Middleware complements these by:**
- Providing **server-side metrics** (your existing tools focus on client-side)
- Monitoring **infrastructure health** (CPU, memory, network)
- Tracking **deployment health** (via Vercel webhooks)
- Identifying **resource bottlenecks** at the infrastructure level

### 4. Practical Improvement Workflows

#### Workflow 1: Identify Performance Bottlenecks

1. **Check Middleware dashboard** for high CPU/memory usage
2. **Correlate with website metrics:**
   - High CPU → Check for heavy computations in API routes
   - High Memory → Look for memory leaks in server components
   - High Disk I/O → Optimize file operations, caching

3. **Take action:**
   ```typescript
   // Example: If high CPU detected, optimize heavy computations
   // Before (synchronous, blocks CPU)
   const result = heavyComputation(data);
   
   // After (async, non-blocking)
   const result = await processInBackground(data);
   ```

#### Workflow 2: Optimize Based on Resource Usage

1. **Monitor resource patterns:**
   - Peak usage times
   - Resource-intensive operations
   - Memory growth patterns

2. **Optimize accordingly:**
   - **High memory usage** → Implement caching, reduce data loading
   - **High CPU usage** → Optimize algorithms, use background jobs
   - **High network usage** → Implement CDN, optimize assets

#### Workflow 3: Monitor Deployment Health

1. **Use Vercel webhooks** (already set up) to track deployments
2. **Correlate with Middleware metrics:**
   - After deployment → Check if performance degraded
   - Monitor error rates → Detect deployment issues early
   - Track resource usage → Ensure deployments don't overload system

3. **Access deployment status:**
   ```bash
   curl "https://www.drsayuj.info/api/webhooks/vercel/status?status=error&limit=5"
   ```

### 5. Specific Website Improvements

#### A. API Route Optimization

**Monitor in Middleware:**
- API response times
- Error rates per endpoint
- Resource usage per route

**Improve:**
```typescript
// Example: Optimize slow API route
// app/api/search-console/route.ts

// Add caching for expensive operations
const cache = new Map();
export async function GET(request: NextRequest) {
  const cacheKey = request.url;
  if (cache.has(cacheKey)) {
    return NextResponse.json(cache.get(cacheKey));
  }
  
  // Expensive operation
  const result = await expensiveOperation();
  cache.set(cacheKey, result);
  return NextResponse.json(result);
}
```

#### B. Database Query Optimization

**Monitor in Middleware:**
- Database connection pool usage
- Query execution times
- Connection errors

**Improve:**
- Add database query caching
- Optimize slow queries
- Use connection pooling effectively

#### C. Image and Asset Optimization

**Monitor in Middleware:**
- Network bandwidth usage
- File I/O operations
- CDN performance

**Improve:**
- Optimize image sizes (already using Next.js Image component)
- Implement better caching strategies
- Use CDN for static assets

#### D. Server-Side Rendering Optimization

**Monitor in Middleware:**
- SSR response times
- Memory usage during rendering
- CPU spikes during build

**Improve:**
- Implement ISR (Incremental Static Regeneration)
- Use React Server Components efficiently
- Optimize data fetching

### 6. Setting Up Alerts

Configure alerts in Middleware dashboard for:

1. **High CPU usage** (> 80%)
   - Action: Investigate heavy computations
   - Check: API routes, background jobs

2. **High memory usage** (> 85%)
   - Action: Check for memory leaks
   - Check: Server components, caching

3. **High error rates** (> 1%)
   - Action: Review error logs
   - Check: API routes, database connections

4. **Slow response times** (> 2s)
   - Action: Optimize slow endpoints
   - Check: Database queries, external APIs

### 7. Integration with Existing Tools

#### Combine Middleware + Vercel Webhooks

```typescript
// app/api/webhooks/vercel/handlers.ts
// When deployment succeeds, check Middleware metrics
export async function handleDeploymentSucceeded(payload: any, metadata: EventMetadata) {
  // After deployment, monitor:
  // 1. Error rates (should not increase)
  // 2. Response times (should not degrade)
  // 3. Resource usage (should be stable)
  
  // Send to monitoring service
  if (process.env.MONITORING_WEBHOOK_URL) {
    await fetch(process.env.MONITORING_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        type: 'deployment_succeeded',
        deploymentId: payload.deployment?.id,
        // Middleware can correlate this with infrastructure metrics
      }),
    });
  }
}
```

#### Combine Middleware + Performance Monitoring

Your website tracks Core Web Vitals. Middleware provides server-side context:

- **Client-side (existing)**: LCP, CLS, INP, FCP, TTFB
- **Server-side (Middleware)**: API response times, server CPU, memory

**Correlation example:**
- High TTFB (client) + High CPU (Middleware) → Server is overloaded
- High LCP (client) + High Disk I/O (Middleware) → Slow asset loading
- High INP (client) + High Memory (Middleware) → Memory pressure affecting responsiveness

### 8. Actionable Improvement Checklist

Use Middleware data to:

- [ ] **Identify slow API endpoints** → Optimize database queries, add caching
- [ ] **Detect memory leaks** → Review server components, fix memory issues
- [ ] **Find CPU bottlenecks** → Optimize heavy computations, use background jobs
- [ ] **Monitor deployment impact** → Track metrics before/after deployments
- [ ] **Optimize resource usage** → Right-size server resources
- [ ] **Improve error handling** → Correlate errors with infrastructure issues
- [ ] **Plan capacity** → Use usage patterns to plan scaling

### 9. Example: Real-World Improvement Scenario

**Problem:** Website is slow during peak hours

**Using Middleware:**
1. Check Middleware dashboard → High CPU usage (90%) during 2-4 PM
2. Check error rates → Increased errors during same time
3. Check API response times → `/api/appointments` taking 3+ seconds

**Solution:**
```typescript
// 1. Add caching to reduce CPU load
// app/api/appointments/route.ts
import { unstable_cache } from 'next/cache';

export async function GET() {
  const getAppointments = unstable_cache(
    async () => {
      // Expensive database query
      return await db.appointments.findMany();
    },
    ['appointments'],
    { revalidate: 60 } // Cache for 60 seconds
  );
  
  return NextResponse.json(await getAppointments());
}

// 2. Optimize database query
// Use indexes, limit results, pagination

// 3. Add rate limiting
// Prevent overload during peak hours
```

**Result:**
- CPU usage drops to 60%
- API response time: 3s → 300ms
- Error rate: 5% → 0.1%

### 10. Dashboard Access

**Access your Middleware dashboard:**
- URL: `https://hjptv.middleware.io`
- API Key: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`

**Key sections to monitor:**
- Infrastructure → CPU, Memory, Disk, Network
- Applications → Response times, Error rates
- Alerts → Configure thresholds
- Dashboards → Create custom views

## Next Steps

1. **Access the dashboard** and explore available metrics
2. **Set up alerts** for critical thresholds
3. **Correlate Middleware data** with your existing performance monitoring
4. **Create improvement tasks** based on identified bottlenecks
5. **Monitor improvements** over time

## Related Documentation

- [Middleware macOS Installation](./middleware-macos-installation.md)
- [Kubernetes Helm Setup](./kubernetes-helm-setup.md)
- [Vercel Webhooks](./vercel-webhooks-setup.md)
- [Performance Monitoring](./performance-budget.json)

## Last Updated
January 26, 2026
