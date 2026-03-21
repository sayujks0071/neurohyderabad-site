## 2024-05-15 - [API Key Verification Timing Attack]
**Vulnerability:** API key verification used standard string equality (`===`) instead of `crypto.timingSafeEqual`, making the endpoints vulnerable to timing attacks.
**Learning:** Found multiple instances of `apiKey === validKey` in `app/api/workflows/*/route.ts`. Standard string comparison exits early on the first mismatched character, allowing an attacker to guess the API key character by character by measuring the response time.
**Prevention:** Always use `crypto.timingSafeEqual` after hashing both the input and expected keys with SHA-256 for secure comparison.
## 2024-05-24 - JSON-LD XSS Vulnerability Prevention
**Vulnerability:** Found multiple instances of `JSON.stringify` directly injected into `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ... }}>`. This allows an attacker to break out of the script block using `</script><script>malicious_code()</script>` if any strings contain user-controlled data.
**Learning:** React's `dangerouslySetInnerHTML` does not automatically escape `<` and `>` characters within script tags, relying solely on JSON representation which doesn't guarantee HTML safety.
**Prevention:** Always use the local utility `safeJsonLdStringify` from `@/src/lib/seo/jsonld` (which uses `.replace(/</g, '\\u003c')`) instead of plain `JSON.stringify` when embedding JSON-LD schemas.
## 2025-01-20 - [XSS vulnerability via JSON.stringify in Script tags]
**Vulnerability:** Found multiple blog pages using `JSON.stringify` directly within `dangerouslySetInnerHTML` for Schema.org JSON-LD `<script>` tags.
**Learning:** `JSON.stringify` does not escape specific characters (like `<`) that can be used to break out of the script tag and inject malicious code, leading to Cross-Site Scripting (XSS).
**Prevention:** Always use the custom utility `safeJsonLdStringify` from `@/src/lib/seo/jsonld` when rendering JSON-LD structured data via `dangerouslySetInnerHTML`.
