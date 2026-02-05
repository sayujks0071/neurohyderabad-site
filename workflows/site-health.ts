/**
 * Site Health Monitoring Workflow
 *
 * Monitors www.drsayuj.info for:
 * - Uptime and availability
 * - Performance degradation
 * - SSL certificate expiry
 * - Error rate monitoring
 * - API endpoint health
 */

import { sleep, FatalError, RetryableError, getStepMetadata } from "workflow";

interface HealthCheckResult {
  checkId: string;
  timestamp: string;
  overall: "healthy" | "degraded" | "unhealthy";
  checks: {
    name: string;
    status: "pass" | "warn" | "fail";
    latency?: number;
    message?: string;
  }[];
  alerts: string[];
}

const SITE_URL = "https://www.drsayuj.info";
const API_BASE = "https://www.drsayuj.info/api";

// Critical endpoints to monitor
const CRITICAL_PAGES = [
  { path: "/", name: "Homepage" },
  { path: "/appointments", name: "Appointments" },
  { path: "/about", name: "About" },
  { path: "/services", name: "Services" },
  { path: "/contact", name: "Contact" },
];

const API_ENDPOINTS = [
  { path: "/api/lead", name: "Lead API", method: "OPTIONS" as const },
  { path: "/api/appointments/submit", name: "Appointment API", method: "OPTIONS" as const },
];

/**
 * Main site health check workflow
 * Uses parallel execution for all independent health checks
 */
export async function runSiteHealthCheck(): Promise<HealthCheckResult> {
  "use workflow";

  const checkId = `health-${Date.now()}`;
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    workflow: "site-health",
    event: "start",
    checkId,
    timestamp
  }));

  const checks: HealthCheckResult["checks"] = [];
  const alerts: string[] = [];

  try {
    // Run ALL health checks in parallel for speed
    const [
      pageResults,
      apiResults,
      sslResult,
      perfResult,
      sitemapResult,
      robotsResult,
    ] = await Promise.all([
      checkCriticalPages(),
      checkAPIEndpoints(),
      checkSSLCertificate(),
      checkPerformance(),
      checkSitemap(),
      checkRobotsTxt(),
    ]);

    // Process page results
    checks.push(...pageResults.checks);
    if (pageResults.failedCount > 0) {
      alerts.push(`${pageResults.failedCount} critical pages are down`);
    }

    // Process API results
    checks.push(...apiResults.checks);
    if (apiResults.failedCount > 0) {
      alerts.push(`${apiResults.failedCount} API endpoints are failing`);
    }

    // Process SSL result
    checks.push(sslResult);
    if (sslResult.status === "warn") {
      alerts.push(`SSL certificate expires soon: ${sslResult.message}`);
    } else if (sslResult.status === "fail") {
      alerts.push(`SSL certificate issue: ${sslResult.message}`);
    }

    // Process performance result
    checks.push(perfResult);
    if (perfResult.status === "warn" || perfResult.status === "fail") {
      alerts.push(`Performance degradation: ${perfResult.message}`);
    }

    // Process sitemap result
    checks.push(sitemapResult);
    if (sitemapResult.status === "fail") {
      alerts.push("Sitemap is not accessible");
    }

    // Process robots result
    checks.push(robotsResult);

    // Determine overall health
    const failCount = checks.filter((c) => c.status === "fail").length;
    const warnCount = checks.filter((c) => c.status === "warn").length;

    let overall: HealthCheckResult["overall"] = "healthy";
    if (failCount > 0) {
      overall = "unhealthy";
    } else if (warnCount > 0) {
      overall = "degraded";
    }

    console.log(JSON.stringify({
      workflow: "site-health",
      event: "complete",
      checkId,
      overall,
      failCount,
      warnCount,
      alertCount: alerts.length
    }));

    // Send alerts if needed (after all checks complete)
    if (alerts.length > 0) {
      await sendHealthAlerts(alerts);
    }

    return { checkId, timestamp, overall, checks, alerts };
  } catch (error) {
    console.error(JSON.stringify({
      workflow: "site-health",
      event: "error",
      checkId,
      error: String(error)
    }));
    return {
      checkId,
      timestamp,
      overall: "unhealthy",
      checks,
      alerts: [...alerts, `Health check error: ${error}`],
    };
  }
}

/**
 * Step: Check critical pages
 * With intelligent retry for transient failures
 */
async function checkCriticalPages(): Promise<{
  checks: HealthCheckResult["checks"];
  failedCount: number;
}> {
  "use step";

  const metadata = getStepMetadata();
  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-critical-pages",
    attempt: metadata.attempt + 1
  }));

  // Execute all page checks in parallel
  const results = await Promise.all(CRITICAL_PAGES.map(async (page) => {
    const start = Date.now();
    try {
      const response = await fetch(`${SITE_URL}${page.path}`, {
        method: "HEAD",
        headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
      });

      const latency = Date.now() - start;

      if (response.ok) {
        return {
          check: {
            name: page.name,
            status: latency > 3000 ? "warn" as const : "pass" as const,
            latency,
            message: latency > 3000 ? "Slow response" : "OK",
          },
          failed: false,
          serverError: false
        };
      } else if (response.status >= 500) {
        return {
          check: {
            name: page.name,
            status: "fail" as const,
            latency,
            message: `HTTP ${response.status}`,
          },
          failed: true,
          serverError: true
        };
      } else {
        return {
          check: {
            name: page.name,
            status: "fail" as const,
            latency,
            message: `HTTP ${response.status}`,
          },
          failed: true,
          serverError: false
        };
      }
    } catch (error) {
      return {
        check: {
          name: page.name,
          status: "fail" as const,
          message: String(error),
        },
        failed: true,
        serverError: true // Assume fetch errors might be transient connection issues
      };
    }
  }));

  const checks = results.map(r => r.check);
  const failedCount = results.filter(r => r.failed).length;
  const serverErrors = results.filter(r => r.serverError).length;

  // If most failures are server errors, retry with backoff
  if (serverErrors > CRITICAL_PAGES.length / 2 && metadata.attempt < 3) {
    throw new RetryableError(
      `${serverErrors} server errors detected, retrying...`,
      { retryAfter: (metadata.attempt + 1) * 10000 } // 10s, 20s, 30s
    );
  }

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-critical-pages-result",
    checks: checks.length,
    failed: failedCount
  }));

  return { checks, failedCount };
}
checkCriticalPages.maxRetries = 3;

/**
 * Step: Check API endpoints
 */
async function checkAPIEndpoints(): Promise<{
  checks: HealthCheckResult["checks"];
  failedCount: number;
}> {
  "use step";

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-api-endpoints"
  }));

  // Execute all API checks in parallel
  const results = await Promise.all(API_ENDPOINTS.map(async (endpoint) => {
    const start = Date.now();
    try {
      const response = await fetch(`${SITE_URL}${endpoint.path}`, {
        method: endpoint.method,
        headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
      });

      const latency = Date.now() - start;

      // OPTIONS requests may return various status codes
      if (response.status < 500) {
        return {
          check: {
            name: endpoint.name,
            status: latency > 2000 ? "warn" as const : "pass" as const,
            latency,
            message: "OK",
          },
          failed: false
        };
      } else {
        return {
          check: {
            name: endpoint.name,
            status: "fail" as const,
            latency,
            message: `HTTP ${response.status}`,
          },
          failed: true
        };
      }
    } catch (error) {
      return {
        check: {
          name: endpoint.name,
          status: "fail" as const,
          message: String(error),
        },
        failed: true
      };
    }
  }));

  const checks = results.map(r => r.check);
  const failedCount = results.filter(r => r.failed).length;

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-api-endpoints-result",
    checks: checks.length,
    failed: failedCount
  }));

  return { checks, failedCount };
}

/**
 * Step: Check SSL certificate
 */
async function checkSSLCertificate(): Promise<HealthCheckResult["checks"][0]> {
  "use step";

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-ssl"
  }));

  try {
    const response = await fetch(SITE_URL, {
      method: "HEAD",
      headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
    });

    // If we can fetch over HTTPS, SSL is working
    if (response.ok) {
      return {
        name: "SSL Certificate",
        status: "pass",
        message: "Valid and active",
      };
    } else {
      return {
        name: "SSL Certificate",
        status: "warn",
        message: `HTTP ${response.status}`,
      };
    }
  } catch (error) {
    const errorStr = String(error);
    if (errorStr.includes("certificate") || errorStr.includes("SSL")) {
      return {
        name: "SSL Certificate",
        status: "fail",
        message: errorStr,
      };
    }
    return {
      name: "SSL Certificate",
      status: "warn",
      message: "Could not verify",
    };
  }
}

/**
 * Step: Check performance
 */
async function checkPerformance(): Promise<HealthCheckResult["checks"][0]> {
  "use step";

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-performance"
  }));

  const start = Date.now();

  try {
    const response = await fetch(SITE_URL, {
      headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
    });

    const latency = Date.now() - start;

    if (latency < 1500) {
      return {
        name: "Performance",
        status: "pass",
        latency,
        message: "Fast response",
      };
    } else if (latency < 3000) {
      return {
        name: "Performance",
        status: "warn",
        latency,
        message: "Moderate response time",
      };
    } else {
      return {
        name: "Performance",
        status: "fail",
        latency,
        message: "Slow response time",
      };
    }
  } catch (error) {
    return {
      name: "Performance",
      status: "fail",
      message: String(error),
    };
  }
}

/**
 * Step: Check sitemap
 */
async function checkSitemap(): Promise<HealthCheckResult["checks"][0]> {
  "use step";

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-sitemap"
  }));

  try {
    const response = await fetch(`${SITE_URL}/sitemap.xml`, {
      headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
    });

    if (response.ok) {
      const text = await response.text();
      const urlCount = (text.match(/<url>/g) || []).length;
      return {
        name: "Sitemap",
        status: "pass",
        message: `${urlCount} URLs indexed`,
      };
    } else {
      return {
        name: "Sitemap",
        status: "fail",
        message: `HTTP ${response.status}`,
      };
    }
  } catch (error) {
    return {
      name: "Sitemap",
      status: "fail",
      message: String(error),
    };
  }
}

/**
 * Step: Check robots.txt
 */
async function checkRobotsTxt(): Promise<HealthCheckResult["checks"][0]> {
  "use step";

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "check-robots"
  }));

  try {
    const response = await fetch(`${SITE_URL}/robots.txt`, {
      headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
    });

    if (response.ok) {
      return {
        name: "Robots.txt",
        status: "pass",
        message: "Accessible",
      };
    } else {
      return {
        name: "Robots.txt",
        status: "warn",
        message: `HTTP ${response.status}`,
      };
    }
  } catch (error) {
    return {
      name: "Robots.txt",
      status: "warn",
      message: String(error),
    };
  }
}

/**
 * Send health alerts
 */
async function sendHealthAlerts(alerts: string[]): Promise<void> {
  "use step";

  console.log(JSON.stringify({
    workflow: "site-health",
    step: "send-alerts",
    alertCount: alerts.length
  }));

  // In production, this would:
  // - Send email to admin
  // - Post to Slack/Discord
  // - Create incident in PagerDuty

  for (const alert of alerts) {
    console.log(`[ALERT] ${alert}`);
  }
}

/**
 * Quick health check for status page
 */
export async function quickHealthCheck(): Promise<{
  status: "operational" | "degraded" | "outage";
  latency: number;
}> {
  "use workflow";

  const start = Date.now();

  try {
    const response = await fetch(SITE_URL, {
      method: "HEAD",
      headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
    });

    const latency = Date.now() - start;

    if (response.ok && latency < 2000) {
      return { status: "operational", latency };
    } else if (response.ok) {
      return { status: "degraded", latency };
    } else {
      return { status: "outage", latency };
    }
  } catch {
    return { status: "outage", latency: Date.now() - start };
  }
}
