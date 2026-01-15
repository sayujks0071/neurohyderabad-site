/**
 * Verify Google Analytics Data API access by running a simple report.
 *
 * Usage:
 *   GA4_PROPERTY_ID=123456789 GOOGLE_ANALYTICS_KEY_JSON='{"type":"service_account",...}' npx tsx scripts/verify-ga4-data.ts
 *
 * Env:
 *   GA4_PROPERTY_ID            (required) numeric property id
 *   GOOGLE_ANALYTICS_KEY_JSON  (preferred) Service Account JSON key
 *   GOOGLE_INDEXING_KEY_JSON   (fallback)  Reused key (if it has GA access)
 */

import { google } from "googleapis";

function getServiceAccountJson(): string {
  const json = process.env.GOOGLE_ANALYTICS_KEY_JSON || process.env.GOOGLE_INDEXING_KEY_JSON;
  if (!json) {
    throw new Error(
      "Missing credentials. Set GOOGLE_ANALYTICS_KEY_JSON (preferred) or GOOGLE_INDEXING_KEY_JSON."
    );
  }
  return json;
}

function getPropertyId(): string {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error("Missing GA4_PROPERTY_ID (numeric GA4 property id).");
  if (!/^\d+$/.test(id)) throw new Error("GA4_PROPERTY_ID must be numeric (e.g. 123456789).");
  return id;
}

async function main() {
  const propertyId = getPropertyId();
  const raw = getServiceAccountJson();
  const credentials = JSON.parse(raw);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      // Data API reporting access
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  });

  const analyticsData = google.analyticsdata({
    version: "v1beta",
    auth,
  });

  console.log(`🔍 GA Data API: running report for properties/${propertyId}…`);

  const res = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: "10",
    },
  });

  const rows = res.data.rows || [];
  console.log(`✅ Rows returned: ${rows.length}`);

  if (!rows.length) {
    console.log(
      "⚠️ No rows returned. This can happen if the property has no data yet, or if the service account lacks access."
    );
    return;
  }

  console.log("\nTop pages (last 7 days):");
  for (const row of rows) {
    const pagePath = row.dimensionValues?.[0]?.value ?? "(unknown)";
    const pageViews = row.metricValues?.[0]?.value ?? "0";
    const activeUsers = row.metricValues?.[1]?.value ?? "0";
    console.log(`- ${pagePath} — views: ${pageViews}, activeUsers: ${activeUsers}`);
  }
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});

