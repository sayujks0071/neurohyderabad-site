/**
 * Verify Google Analytics Admin API access for a Service Account.
 *
 * Usage:
 *   GOOGLE_ANALYTICS_KEY_JSON='{"type":"service_account",...}' npx tsx scripts/verify-ga4-admin.ts
 *
 * Env:
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

async function main() {
  const raw = getServiceAccountJson();
  const credentials = JSON.parse(raw);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      // Admin API read access
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  });

  const admin = google.analyticsadmin({
    version: "v1beta",
    auth,
  });

  console.log("🔍 GA Admin API: listing account summaries…");
  const res = await admin.accountSummaries.list({});

  const summaries = res.data.accountSummaries || [];
  console.log(`✅ Accessible accounts: ${summaries.length}`);

  let propertyCount = 0;
  for (const s of summaries) {
    const properties = s.propertySummaries || [];
    propertyCount += properties.length;
  }
  console.log(`✅ Accessible properties: ${propertyCount}`);

  if (propertyCount > 0) {
    console.log("\nFirst few properties:");
    const shown: string[] = [];
    for (const s of summaries) {
      for (const p of s.propertySummaries || []) {
        if (!p.property) continue;
        shown.push(`${p.property} (${p.displayName || "Unnamed property"})`);
        if (shown.length >= 10) break;
      }
      if (shown.length >= 10) break;
    }
    shown.forEach((line) => console.log(`- ${line}`));
    console.log("\nTip: the numeric GA4 Property ID is the number in `properties/123456789`.");
  } else {
    console.log(
      "\n⚠️ No properties visible. Add the service account email to GA4 Property Access Management with Viewer access, then rerun."
    );
  }
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});

