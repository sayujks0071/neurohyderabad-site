/* eslint-disable no-console */

/**
 * SEO Conversion Audit — runs inside a Vercel Sandbox (or standalone against live site)
 *
 * Audits www.drsayuj.info for OPD booking conversion gaps:
 *   - CTA presence (Book Appointment / Schedule Consultation / Call Us)
 *   - Internal links to /appointments from each sampled page
 *   - JSON-LD schema action coverage (ReserveAction / ScheduleAction)
 *   - Open Graph completeness
 *   - WhatsApp CTA presence
 *
 * Usage:
 *   TARGET_URL=https://www.drsayuj.info node scripts/sandbox/seo-conversion-audit.js
 *
 * Output: JSON report to stdout + /tmp/seo-conversion-audit.json (when writable)
 */

const DEFAULT_BASE = "https://www.drsayuj.info";
const BASE_URL = new URL(
  (process.env.TARGET_URL || DEFAULT_BASE).startsWith("http")
    ? process.env.TARGET_URL || DEFAULT_BASE
    : `https://${process.env.TARGET_URL}`
).origin;

const CANONICAL_ORIGIN = "https://www.drsayuj.info";
const MAX_PAGES = 20; // pages to sample from sitemap

function urlFor(path) {
  return new URL(path, BASE_URL).toString();
}

async function readTextLimited(res, limit = 400_000) {
  const text = await res.text();
  return text.length > limit ? text.slice(0, limit) : text;
}

function findAll(html, re) {
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function extractCanonical(html) {
  const m = /(<link[^>]+rel=["']canonical["'][^>]*>)/i.exec(html);
  if (!m) return null;
  const h = /href\s*=\s*["']([^"']+)["']/i.exec(m[1]);
  return h ? h[1] : null;
}

function extractJsonLdBlocks(html) {
  return findAll(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    .map((s) => s.trim())
    .filter(Boolean);
}

function hasSchemaAction(jsonLdBlocks) {
  for (const block of jsonLdBlocks) {
    try {
      const obj = JSON.parse(block);
      const str = JSON.stringify(obj);
      if (
        str.includes("ReserveAction") ||
        str.includes("ScheduleAction") ||
        str.includes("OrderAction") ||
        str.includes("MedicalClinic") ||
        str.includes("Physician")
      ) {
        return true;
      }
    } catch {
      // skip malformed
    }
  }
  return false;
}

async function auditPage(url) {
  const issues = [];
  const info = {};

  let res;
  try {
    res = await fetch(url, { headers: { "cache-control": "no-cache" } });
  } catch (e) {
    return { url, status: "fetch_error", error: e.message, issues: ["Could not fetch page"] };
  }

  info.httpStatus = res.status;
  if (res.status !== 200) {
    issues.push(`HTTP ${res.status}`);
    return { url, ...info, issues };
  }

  const html = await readTextLimited(res);

  // 1. Booking CTA presence
  const hasCTA =
    html.includes("Book Appointment") ||
    html.includes("Schedule Consultation") ||
    html.includes("Book Now") ||
    html.includes("Book a Consultation");
  info.hasBookingCTA = hasCTA;
  if (!hasCTA) issues.push("Missing booking CTA (Book Appointment / Schedule Consultation)");

  // 2. Internal link to /appointments
  const hasAppointmentLink =
    html.includes("href=\"/appointments\"") ||
    html.includes("href='/appointments'") ||
    html.includes('href="/appointments') ||
    html.includes("/appointments");
  info.hasInternalAppointmentLink = hasAppointmentLink;
  if (!hasAppointmentLink) issues.push("No internal link to /appointments");

  // 3. WhatsApp CTA
  const hasWhatsApp =
    html.includes("wa.me") || html.includes("api.whatsapp.com") || html.toLowerCase().includes("whatsapp");
  info.hasWhatsAppCTA = hasWhatsApp;
  if (!hasWhatsApp) issues.push("No WhatsApp CTA");

  // 4. JSON-LD schema action
  const jsonLdBlocks = extractJsonLdBlocks(html);
  const hasAction = hasSchemaAction(jsonLdBlocks);
  info.hasSchemaAction = hasAction;
  info.jsonLdBlockCount = jsonLdBlocks.length;
  if (!hasAction) issues.push("JSON-LD missing ReserveAction / ScheduleAction / MedicalClinic / Physician");

  // 5. OG completeness
  const hasOgTitle = /<meta[^>]+property=["']og:title["'][^>]*>/i.test(html);
  const hasOgDesc = /<meta[^>]+property=["']og:description["'][^>]*>/i.test(html);
  const hasOgImage = /<meta[^>]+property=["']og:image["'][^>]*>/i.test(html);
  info.openGraph = { title: hasOgTitle, description: hasOgDesc, image: hasOgImage };
  if (!hasOgTitle) issues.push("Missing og:title");
  if (!hasOgDesc) issues.push("Missing og:description");
  if (!hasOgImage) issues.push("Missing og:image");

  // 6. Canonical
  const canonical = extractCanonical(html);
  info.canonical = canonical;
  if (!canonical) issues.push("Missing <link rel=canonical>");

  return { url, ...info, issues };
}

async function main() {
  console.error(`[SEO Conversion Audit] Base: ${BASE_URL}`);

  // 1. Fetch sitemap pages
  let pagesToAudit = [];
  try {
    const sitemapRes = await fetch(urlFor("/sitemap-main.xml"), {
      headers: { "cache-control": "no-cache" },
    });
    if (sitemapRes.status === 200) {
      const xml = await sitemapRes.text();
      pagesToAudit = findAll(xml, /<loc>([^<]+)<\/loc>/gi)
        .filter((u) => u.startsWith(CANONICAL_ORIGIN))
        .slice(0, MAX_PAGES);
    }
  } catch (e) {
    console.error("[SEO Conversion Audit] Failed to fetch sitemap:", e.message);
  }

  // Always include critical pages
  for (const p of ["/", "/appointments", "/services/spinal-fusion-surgery-hyderabad"]) {
    const full = urlFor(p);
    if (!pagesToAudit.includes(full)) pagesToAudit.unshift(full);
  }

  console.error(`[SEO Conversion Audit] Auditing ${pagesToAudit.length} pages...`);

  // 2. Audit pages
  const pageResults = [];
  for (const u of pagesToAudit) {
    const result = await auditPage(u);
    const status = result.issues.length === 0 ? "✅" : `⚠️  ${result.issues.length} issue(s)`;
    console.error(`  ${status}  ${u}`);
    pageResults.push(result);
  }

  // 3. Aggregate stats
  const total = pageResults.length;
  const withCTA = pageResults.filter((p) => p.hasBookingCTA).length;
  const withLink = pageResults.filter((p) => p.hasInternalAppointmentLink).length;
  const withWA = pageResults.filter((p) => p.hasWhatsAppCTA).length;
  const withSchema = pageResults.filter((p) => p.hasSchemaAction).length;
  const withOgImage = pageResults.filter((p) => p.openGraph?.image).length;

  const pagesNeedingCTA = pageResults
    .filter((p) => !p.hasBookingCTA && p.httpStatus === 200)
    .map((p) => p.url);
  const pagesNeedingLink = pageResults
    .filter((p) => !p.hasInternalAppointmentLink && p.httpStatus === 200)
    .map((p) => p.url);

  const report = {
    generatedAt: new Date().toISOString(),
    target: BASE_URL,
    pagesAudited: total,
    summary: {
      pagesWithBookingCTA: { count: withCTA, pct: Math.round((withCTA / total) * 100) },
      pagesWithAppointmentLink: { count: withLink, pct: Math.round((withLink / total) * 100) },
      pagesWithWhatsAppCTA: { count: withWA, pct: Math.round((withWA / total) * 100) },
      pagesWithSchemaAction: { count: withSchema, pct: Math.round((withSchema / total) * 100) },
      pagesWithOgImage: { count: withOgImage, pct: Math.round((withOgImage / total) * 100) },
    },
    topPriorities: {
      addBookingCTA: pagesNeedingCTA.slice(0, 10),
      addAppointmentLink: pagesNeedingLink.slice(0, 10),
    },
    pages: pageResults,
  };

  // 4. Output JSON
  const json = JSON.stringify(report, null, 2);
  console.log(json);

  // 5. Write to /tmp if possible
  try {
    const fs = await import("node:fs/promises");
    await fs.writeFile("/tmp/seo-conversion-audit.json", json, "utf8");
    console.error("[SEO Conversion Audit] Saved to /tmp/seo-conversion-audit.json");
  } catch {
    // /tmp not writable — stdout output is enough
  }

  // Exit with non-zero if more than 30% of pages missing booking CTA
  if (withCTA / total < 0.7) {
    console.error(
      `[SEO Conversion Audit] WARNING: Only ${withCTA}/${total} pages have booking CTAs (<70%). Needs improvement.`
    );
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("[SEO Conversion Audit] Fatal:", e);
  process.exitCode = 1;
});
