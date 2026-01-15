/**
 * Fetch GA4 property details (Admin API).
 *
 * Usage:
 *   GA4_PROPERTY_ID=449396301 GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json npx tsx scripts/get-ga4-property-details.ts
 *   npx tsx scripts/get-ga4-property-details.ts --property-id 449396301
 *
 * Auth priority:
 *   1) GOOGLE_ANALYTICS_KEY_JSON (service account JSON string)
 *   2) GOOGLE_INDEXING_KEY_JSON  (fallback service account JSON string)
 *   3) GOOGLE_APPLICATION_CREDENTIALS (path to JSON key file)
 */

import { google } from "googleapis";

function parseArgs(argv: string[]) {
  const args = [...argv];
  const out: { propertyId?: string } = {};
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--property-id" && args[i + 1]) {
      out.propertyId = args[i + 1];
      i += 1;
      continue;
    }
  }
  return out;
}

function getPropertyId(): string {
  const fromArgs = parseArgs(process.argv.slice(2)).propertyId;
  const id = fromArgs || process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error("Missing GA4 property id. Set GA4_PROPERTY_ID or pass --property-id.");
  if (!/^\d+$/.test(id)) throw new Error("GA4 property id must be numeric (e.g. 449396301).");
  return id;
}

async function getAuthClient() {
  const json = process.env.GOOGLE_ANALYTICS_KEY_JSON || process.env.GOOGLE_INDEXING_KEY_JSON;
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!json && !keyFile) {
    throw new Error(
      "Missing credentials. Set GOOGLE_ANALYTICS_KEY_JSON or GOOGLE_INDEXING_KEY_JSON, or set GOOGLE_APPLICATION_CREDENTIALS to a JSON key file path."
    );
  }

  const auth = new google.auth.GoogleAuth({
    ...(json ? { credentials: JSON.parse(json) } : {}),
    ...(keyFile ? { keyFile } : {}),
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });

  return auth;
}

async function main() {
  const propertyId = getPropertyId();
  const auth = await getAuthClient();

  const admin = google.analyticsadmin({
    version: "v1beta",
    auth,
  });

  const name = `properties/${propertyId}`;
  const res = await admin.properties.get({ name });

  console.log(JSON.stringify(res.data, null, 2));
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});

