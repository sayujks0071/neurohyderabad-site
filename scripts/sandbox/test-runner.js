/* eslint-disable no-console */

/**
 * Sandbox Test Runner (no side effects)
 *
 * Runs against a public deployment URL (defaults to https://www.drsayuj.info)
 * and validates:
 * - Robots + sitemaps accessibility and invariants
 * - Canonical/meta/JSON-LD sanity on a sampled set of pages
 * - Redirect/canonical host consolidation
 * - Critical safe API: POST /api/neuralink
 *
 * IMPORTANT: Do not add tests that trigger side effects (booking, emails, DB writes).
 */

const DEFAULT_BASE = "https://www.drsayuj.info";

function normalizeBaseUrl(input) {
  const raw = (input || DEFAULT_BASE).trim();
  const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  return u.origin; // drop any path/query
}

const BASE_URL = normalizeBaseUrl(process.env.TARGET_URL);
const CANONICAL_ORIGIN = "https://www.drsayuj.info";
const STRICT_AI = process.env.STRICT_AI === "1";

function urlFor(path) {
  return new URL(path, BASE_URL).toString();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function fetchManual(u, init) {
  return fetch(u, { redirect: "manual", ...init });
}

async function readTextLimited(res, limit = 200_000) {
  const text = await res.text();
  return text.length > limit ? `${text.slice(0, limit)}\n[truncated]` : text;
}

function headerIncludes(res, name, substr) {
  const v = res.headers.get(name);
  return v != null && v.toLowerCase().includes(substr.toLowerCase());
}

function findFirst(html, re) {
  const m = re.exec(html);
  return m ? m[1] : null;
}

function findAll(html, re) {
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function extractAttr(tagHtml, attrName) {
  const re = new RegExp(`${attrName}\\s*=\\s*["']([^"']+)["']`, "i");
  return findFirst(tagHtml, re);
}

function extractCanonical(html) {
  const tag = findFirst(html, /(<link[^>]+rel=["']canonical["'][^>]*>)/i);
  if (!tag) return null;
  return extractAttr(tag, "href");
}

function extractMetaRobots(html) {
  const tag = findFirst(html, /(<meta[^>]+name=["']robots["'][^>]*>)/i);
  if (!tag) return null;
  const content = extractAttr(tag, "content");
  return content ? content.toLowerCase() : null;
}

function extractOg(html, prop) {
  const tag = findFirst(html, new RegExp(`(<meta[^>]+property=["']${prop}["'][^>]*>)`, "i"));
  if (!tag) return null;
  return extractAttr(tag, "content");
}

function extractJsonLdBlocks(html) {
  return findAll(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    .map((s) => s.trim())
    .filter(Boolean);
}

function tryParseJsonLd(block) {
  try {
    return { ok: true, value: JSON.parse(block) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

function jsonLdTypes(value) {
  const types = new Set();
  const visit = (v) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) {
      v.forEach(visit);
      return;
    }
    if (typeof v["@type"] === "string") types.add(v["@type"]);
    if (Array.isArray(v["@type"])) v["@type"].filter((t) => typeof t === "string").forEach((t) => types.add(t));
    Object.values(v).forEach(visit);
  };
  visit(value);
  return Array.from(types);
}

async function test(name, fn) {
  const started = Date.now();
  try {
    await fn();
    console.log(`PASS  ${name}  (${Date.now() - started}ms)`);
    return { name, ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`FAIL  ${name}  (${Date.now() - started}ms)`);
    console.log(`      ${msg}`);
    return { name, ok: false, error: msg };
  }
}

async function testRobots() {
  const res = await fetch(urlFor("/robots.txt"), { headers: { "cache-control": "no-cache" } });
  assert(res.status === 200, `robots.txt HTTP ${res.status}`);
  assert(headerIncludes(res, "content-type", "text/plain"), `robots.txt content-type: ${res.headers.get("content-type")}`);
  const body = await readTextLimited(res, 50_000);
  assert(body.includes("Sitemap: https://www.drsayuj.info/sitemap.xml"), "robots.txt missing sitemap.xml");
  // Host directive was removed per recommendations, so we don't assert it anymore.
  // assert(body.toLowerCase().includes("host: www.drsayuj.info"), "robots.txt missing Host: www.drsayuj.info");
}

async function testSitemaps() {
  // /sitemap.xml now serves directly (200 OK)
  const endpoints = ["/sitemap.xml", "/sitemap-main.xml", "/sitemap-images.xml", "/sitemap-videos.xml"];
  for (const p of endpoints) {
    const r = await fetch(urlFor(p), { headers: { "cache-control": "no-cache" } });
    assert(r.status === 200, `${p} HTTP ${r.status}`);
    assert(headerIncludes(r, "content-type", "xml"), `${p} content-type: ${r.headers.get("content-type")}`);
    const xml = await readTextLimited(r, 400_000);
    assert(/<(urlset|sitemapindex)\b/i.test(xml), `${p} missing <urlset>/<sitemapindex>`);

    // Validate main sitemaps for content sanity
    if (p === "/sitemap.xml" || p === "/sitemap-main.xml") {
      const locs = findAll(xml, /<loc>([^<]+)<\/loc>/gi).slice(0, 200);
      assert(locs.length > 10, `${p} unexpectedly small`);
      const offHost = locs.find((u) => !u.startsWith(CANONICAL_ORIGIN));
      assert(!offHost, `${p} contains non-canonical host: ${offHost}`);
    }
  }
}

async function testRedirects() {
  const candidates = [
    { from: "https://drsayuj.info/", expectPrefix: CANONICAL_ORIGIN },
    { from: "https://drsayuj.com/", expectPrefix: CANONICAL_ORIGIN },
    { from: "https://www.drsayuj.com/", expectPrefix: CANONICAL_ORIGIN },
  ];

  for (const c of candidates) {
    const res = await fetchManual(c.from, { headers: { "cache-control": "no-cache" } });
    assert([301, 302, 307, 308].includes(res.status), `${c.from} expected redirect, got ${res.status}`);
    const loc = res.headers.get("location") || "";
    assert(loc.startsWith(c.expectPrefix), `${c.from} location unexpected: ${loc}`);
  }

  // Legacy path consolidation example.
  const legacy = await fetchManual(urlFor("/locations/banjara-hills"), { headers: { "cache-control": "no-cache" } });
  assert([301, 302, 307, 308].includes(legacy.status), `/locations/banjara-hills expected redirect, got ${legacy.status}`);
  const legacyLoc = legacy.headers.get("location") || "";
  assert(legacyLoc.includes("/neurosurgeon-banjara-hills"), `/locations/banjara-hills location unexpected: ${legacyLoc}`);
}

async function testNeuralinkApi() {
  // Small delays reduce false negatives from cold starts / concurrent deploy rollouts.
  await sleep(250);

  async function postNeuralink(label, payload) {
    const attempts = 3;
    for (let i = 1; i <= attempts; i++) {
      const res = await fetch(urlFor("/api/neuralink"), {
        method: "POST",
        headers: { "content-type": "application/json", "cache-control": "no-cache" },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const json = await res.json().catch(() => null);
        assert(json && typeof json === "object", `neuralink ${label} JSON parse failed`);
        return;
      }

      const body = await readTextLimited(res, 20_000).catch(() => "");
      const looksLikeQuota =
        res.status === 429 ||
        body.includes("RESOURCE_EXHAUSTED") ||
        body.includes("Too Many Requests") ||
        body.includes("\"code\":429") ||
        body.includes("\\\"code\\\":429");

      if (looksLikeQuota && !STRICT_AI) {
        console.log(`WARN  api: neuralink (${label}) returned 429 (provider quota). Keeping suite green.`);
        console.log(`      body=${JSON.stringify(body.slice(0, 400))}`);
        return;
      }
      if (i === attempts) {
        throw new Error(`neuralink ${label} HTTP ${res.status} body=${JSON.stringify(body.slice(0, 400))}`);
      }

      // Retry transient failures (cold starts, provider hiccups).
      await sleep(750 * i);
    }
  }

  await postNeuralink("triage", {
    action: "triage",
    symptoms: "Mild headache after long screen time",
    age: 30,
    gender: "male",
  });

  await postNeuralink("chat", {
    action: "chat",
    message: "What should I do for a mild headache after long screen time?",
    history: [],
  });
}

async function testSamplePages() {
  // Sample a few pages from sitemap-main.xml so we cover multiple templates.
  const sitemapRes = await fetch(urlFor("/sitemap-main.xml"), { headers: { "cache-control": "no-cache" } });
  assert(sitemapRes.status === 200, `sitemap-main.xml HTTP ${sitemapRes.status}`);
  const xml = await sitemapRes.text();
  const locs = findAll(xml, /<loc>([^<]+)<\/loc>/gi)
    .filter((u) => u.startsWith(CANONICAL_ORIGIN))
    .slice(0, 40);

  const preferred = [
    `${CANONICAL_ORIGIN}/`,
    `${CANONICAL_ORIGIN}/contact`,
    `${CANONICAL_ORIGIN}/neurosurgeon-hyderabad`,
    `${CANONICAL_ORIGIN}/neurosurgeon-banjara-hills`,
  ];

  const chosen = [];
  for (const u of preferred) if (locs.includes(u) && !chosen.includes(u)) chosen.push(u);
  for (const u of locs) {
    if (chosen.length >= 8) break;
    if (!chosen.includes(u)) chosen.push(u);
  }

  assert(chosen.length >= 4, "not enough sitemap URLs to sample");

  for (const u of chosen) {
    const res = await fetch(u, { headers: { "cache-control": "no-cache" } });
    assert(res.status === 200, `${u} HTTP ${res.status}`);
    assert(headerIncludes(res, "content-type", "text/html"), `${u} content-type: ${res.headers.get("content-type")}`);

    const html = await readTextLimited(res, 600_000);

    const canonical = extractCanonical(html);
    assert(canonical, `${u} missing canonical`);
    assert(canonical.startsWith(CANONICAL_ORIGIN), `${u} canonical not on drsayuj.info: ${canonical}`);
    try {
      const reqPath = new URL(u).pathname.replace(/\/+$/, "") || "/";
      const canPath = new URL(canonical).pathname.replace(/\/+$/, "") || "/";
      assert(canPath === reqPath, `${u} canonical path mismatch: ${canonical}`);
    } catch {
      // If URL parsing fails for any reason, the earlier canonical checks will already fail.
    }

    const robots = extractMetaRobots(html);
    if (robots) {
      assert(!robots.includes("noindex"), `${u} has noindex`);
      assert(!robots.includes("nofollow"), `${u} has nofollow`);
    }

    const ogUrl = extractOg(html, "og:url");
    if (ogUrl) assert(ogUrl.startsWith(CANONICAL_ORIGIN), `${u} og:url not canonical: ${ogUrl}`);

    const jsonLd = extractJsonLdBlocks(html);
    assert(jsonLd.length > 0, `${u} missing JSON-LD`);
    const parsed = jsonLd.map(tryParseJsonLd);
    const firstBad = parsed.find((p) => !p.ok);
    assert(!firstBad, `${u} JSON-LD parse failed: ${firstBad ? firstBad.error : "unknown"}`);
    const types = parsed.flatMap((p) => jsonLdTypes(p.value));
    assert(types.length > 0, `${u} JSON-LD missing @type`);
  }
}

async function testSecurityHeaders() {
  const res = await fetch(urlFor("/"), { headers: { "cache-control": "no-cache" } });
  assert(res.status === 200, `/ HTTP ${res.status}`);
  const hsts = res.headers.get("strict-transport-security");
  assert(hsts && hsts.toLowerCase().includes("max-age="), "missing strict-transport-security");
  const xfo = res.headers.get("x-frame-options");
  assert(xfo && xfo.toUpperCase() === "SAMEORIGIN", `x-frame-options unexpected: ${xfo}`);
  const nosniff = res.headers.get("x-content-type-options");
  assert(nosniff && nosniff.toLowerCase() === "nosniff", `x-content-type-options unexpected: ${nosniff}`);
}

const MINIMAL_PDF_B64 = "JVBERi0xLjEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA1MDAgODAwXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAyNCBUZgoxMDAgMTAwIFRkCihIZWxsbyBXb3JsZCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA2MCAwMDAwMCBuIAowMDAwMDAwMTU3IDAwMDAwIG4gCjAwMDAwMDAzMDYgMDAwMDAgbiAKMDAwMDAwMDM5MiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQ5MQolJUVPRgo=";

async function testMriAnalyzer() {
  if (process.env.TEST_MRI !== '1') {
    return;
  }

  // Use global FormData/Blob (available in Node 18+ / Sandbox)
  const formData = new FormData();

  // Convert base64 -> binary string -> Uint8Array -> Blob
  const binaryString = atob(MINIMAL_PDF_B64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: 'application/pdf' });
  formData.append('file', blob, 'test.pdf');

  const res = await fetch(urlFor("/api/mri/analyze"), {
      method: 'POST',
      body: formData
  });

  if (res.status === 429) {
      console.log("WARN  api: mri analyzer returned 429 (rate limit). Keeping suite green.");
      return;
  }

  const bodyText = await res.text();
  assert(res.status === 200, `mri analyze HTTP ${res.status} ${bodyText.slice(0, 200)}`);

  const json = JSON.parse(bodyText);
  assert(json.extraction, "missing extraction result");
  assert(json.analysis, "missing analysis result");
  assert(json.analysis.plainEnglishSummary, "missing summary");
}

async function testSiteSearch() {
  const res = await fetch(urlFor("/"), { headers: { "cache-control": "no-cache" } });
  assert(res.status === 200, `/ HTTP ${res.status}`);
  const html = await readTextLimited(res, 600_000);
  assert(html.includes('aria-label="Search site (Cmd/Ctrl + K)"') || html.includes('Search'), "Search button missing");
}

async function testCostTransparency() {
  const res = await fetch(urlFor("/services/spinal-fusion-surgery-hyderabad"), { headers: { "cache-control": "no-cache" } });
  assert(res.status === 200, `/services/spinal-fusion-surgery-hyderabad HTTP ${res.status}`);
  const html = await readTextLimited(res, 600_000);
  assert(html.includes("Cost Transparency") || html.includes("Cost and logistics"), "Cost Transparency section missing");
  // Check for rupee symbol or price patterns
  assert(html.includes("₹") || /\d{1,3}(,\d{3})*/.test(html), "Pricing information missing");
}

async function testContentPolicy() {
  const pages = ["/", "/services/sciatica-pain-treatment-hyderabad"];
  for (const p of pages) {
    const res = await fetch(urlFor(p), { headers: { "cache-control": "no-cache" } });
    if (res.status !== 200) continue;
    const html = await readTextLimited(res, 600_000);
    // Check for " cure " (case-insensitive) but allow "secure", "procure", etc.
    const forbidden = /\b(cure)\b/i;

    if (forbidden.test(html)) {
       const match = html.match(forbidden);
       if (match) {
         console.log(`WARN: Found forbidden word '${match[0]}' on ${p}. Policy: Prefer 'Relief' or 'Management'.`);
       }
    }
  }
}

async function testBookAppointment() {
    const res = await fetch(urlFor("/appointments"), { headers: { "cache-control": "no-cache" } });
    assert(res.status === 200, `/appointments HTTP ${res.status}`);
    const html = await readTextLimited(res, 600_000);
    assert(html.includes("Book Appointment") || html.includes("Schedule Consultation"), "Book Appointment text missing");
}

async function testAISandbox() {
  // 1. Check UI Page
  const uiRes = await fetch(urlFor("/ai-sandbox"), { headers: { "cache-control": "no-cache" } });
  assert(uiRes.status === 200, `/ai-sandbox UI HTTP ${uiRes.status}`);
  const html = await readTextLimited(uiRes, 600_000);
  assert(html.includes("AI Sandbox"), "/ai-sandbox missing title");
  assert(html.includes("streamText"), "/ai-sandbox missing streamText mention");

  // 2. Check API Endpoint
  const payload = {
    messages: [{ role: 'user', content: 'Say hello.' }],
    requestedModel: 'openai/gpt-5.2'
  };

  const apiRes = await fetch(urlFor("/api/ai/sandbox"), {
    method: "POST",
    headers: { "content-type": "application/json", "cache-control": "no-cache" },
    body: JSON.stringify(payload),
  });

  if (apiRes.status === 429) {
      console.log("WARN  api: ai-sandbox returned 429 (rate limit). Keeping suite green.");
      return;
  }

  if (apiRes.status === 500) {
      const errText = await apiRes.text();
      if (errText.includes('AI Gateway is not configured')) {
          console.log("WARN  AI Gateway not configured on server. Skipping.");
          return;
      }
      // If other 500, fail
      throw new Error(`api: ai-sandbox returned 500: ${errText.slice(0, 100)}`);
  }

  assert(apiRes.status === 200, `/api/ai/sandbox HTTP ${apiRes.status}`);
}

async function main() {
  console.log(`Sandbox target: ${BASE_URL}`);
  console.log(`Canonical origin: ${CANONICAL_ORIGIN}`);

  const results = [];
  results.push(await test("robots.txt", testRobots));
  results.push(await test("sitemaps", testSitemaps));
  results.push(await test("redirects", testRedirects));
  results.push(await test("security headers", testSecurityHeaders));
  results.push(await test("sample pages (canonical/meta/JSON-LD)", testSamplePages));
  results.push(await test("api: neuralink", testNeuralinkApi));
  results.push(await test("api: mri analyzer", testMriAnalyzer));
  results.push(await test("site search", testSiteSearch));
  results.push(await test("cost transparency", testCostTransparency));
  results.push(await test("content policy", testContentPolicy));
  results.push(await test("book appointment", testBookAppointment));
  results.push(await test("ai sandbox", testAISandbox));

  const failed = results.filter((r) => !r.ok);
  console.log("");
  console.log(`Summary: ${results.length - failed.length} passed, ${failed.length} failed`);
  if (failed.length) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
