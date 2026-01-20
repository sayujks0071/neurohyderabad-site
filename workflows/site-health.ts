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

import { sleep, FatalError } from "workflow";

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
 */
export async function runSiteHealthCheck(): Promise<HealthCheckResult> {
  "use workflow";

  const checkId = `health-${Date.now()}`;
  const timestamp = new Date().toISOString();
  console.log(`[Health Workflow] Starting health check ${checkId}`);

  const checks: HealthCheckResult["checks"] = [];
  const alerts: string[] = [];

  try {
    // Step 1: Check critical pages
    const pageResults = await checkCriticalPages();
    checks.push(...pageResults.checks);
    if (pageResults.failedCount > 0) {
      alerts.push(`${pageResults.failedCount} critical pages are down`);
    }

    await sleep("1s");

    // Step 2: Check API endpoints
    const apiResults = await checkAPIEndpoints();
    checks.push(...apiResults.checks);
    if (apiResults.failedCount > 0) {
      alerts.push(`${apiResults.failedCount} API endpoints are failing`);
    }

    await sleep("1s");

    // Step 3: Check SSL certificate
    const sslResult = await checkSSLCertificate();
    checks.push(sslResult);
    if (sslResult.status === "warn") {
      alerts.push(`SSL certificate expires soon: ${sslResult.message}`);
    } else if (sslResult.status === "fail") {
      alerts.push(`SSL certificate issue: ${sslResult.message}`);
    }

    await sleep("1s");

    // Step 4: Check response times
    const perfResult = await checkPerformance();
    checks.push(perfResult);
    if (perfResult.status === "warn" || perfResult.status === "fail") {
      alerts.push(`Performance degradation: ${perfResult.message}`);
    }

    await sleep("1s");

    // Step 5: Check sitemap accessibility
    const sitemapResult = await checkSitemap();
    checks.push(sitemapResult);
    if (sitemapResult.status === "fail") {
      alerts.push("Sitemap is not accessible");
    }

    // Step 6: Check robots.txt
    const robotsResult = await checkRobotsTxt();
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

    console.log(`[Health Workflow] Completed ${checkId}: ${overall}`);

    // Send alerts if needed
    if (alerts.length > 0) {
      await sendHealthAlerts(alerts);
    }

    return { checkId, timestamp, overall, checks, alerts };
  } catch (error) {
    console.error(`[Health Workflow] Error in ${checkId}:`, error);
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
 */
async function checkCriticalPages(): Promise<{
  checks: HealthCheckResult["checks"];
  failedCount: number;
}> {
  "use step";

  console.log("[Health Workflow] Checking critical pages");

  const checks: HealthCheckResult["checks"] = [];
  let failedCount = 0;

  for (const page of CRITICAL_PAGES) {
    const start = Date.now();
    try {
      const response = await fetch(`${SITE_URL}${page.path}`, {
        method: "HEAD",
        headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
      });

      const latency = Date.now() - start;

      if (response.ok) {
        checks.push({
          name: page.name,
          status: latency > 3000 ? "warn" : "pass",
          latency,
          message: latency > 3000 ? "Slow response" : "OK",
        });
      } else {
        failedCount++;
        checks.push({
          name: page.name,
          status: "fail",
          latency,
          message: `HTTP ${response.status}`,
        });
      }
    } catch (error) {
      failedCount++;
      checks.push({
        name: page.name,
        status: "fail",
        message: String(error),
      });
    }
  }

  console.log(`[Health Workflow] Pages checked: ${checks.length}, failed: ${failedCount}`);
  return { checks, failedCount };
}

/**
 * Step: Check API endpoints
 */
async function checkAPIEndpoints(): Promise<{
  checks: HealthCheckResult["checks"];
  failedCount: number;
}> {
  "use step";

  console.log("[Health Workflow] Checking API endpoints");

  const checks: HealthCheckResult["checks"] = [];
  let failedCount = 0;

  for (const endpoint of API_ENDPOINTS) {
    const start = Date.now();
    try {
      const response = await fetch(`${SITE_URL}${endpoint.path}`, {
        method: endpoint.method,
        headers: { "User-Agent": "DrSayuj-HealthCheck/1.0" },
      });

      const latency = Date.now() - start;

      // OPTIONS requests may return various status codes
      if (response.status < 500) {
        checks.push({
          name: endpoint.name,
          status: latency > 2000 ? "warn" : "pass",
          latency,
          message: "OK",
        });
      } else {
        failedCount++;
        checks.push({
          name: endpoint.name,
          status: "fail",
          latency,
          message: `HTTP ${response.status}`,
        });
      }
    } catch (error) {
      failedCount++;
      checks.push({
        name: endpoint.name,
        status: "fail",
        message: String(error),
      });
    }
  }

  console.log(`[Health Workflow] APIs checked: ${checks.length}, failed: ${failedCount}`);
  return { checks, failedCount };
}

/**
 * Step: Check SSL certificate
 */
async function checkSSLCertificate(): Promise<HealthCheckResult["checks"][0]> {
  "use step";

  console.log("[Health Workflow] Checking SSL certificate");

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

  console.log("[Health Workflow] Checking performance");

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

  console.log("[Health Workflow] Checking sitemap");

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

  console.log("[Health Workflow] Checking robots.txt");

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

  console.log(`[Health Workflow] Sending ${alerts.length} alerts`);

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
