## 2026-03-03 - Prevent Timing Attacks in API Key Validation
**Vulnerability:** API key verification in workflow routes used simple string comparison (`===`), making the endpoints vulnerable to timing attacks.
**Learning:** Node.js/Next.js environment provides Web Crypto API. We already had an async `secureCompare` utility in `src/lib/security.ts` that wasn't being used in the workflow routes. Replacing simple comparison requires converting the validation function to async and properly awaiting it in the route handlers.
**Prevention:** Always use constant-time comparison (e.g., `crypto.timingSafeEqual` or a custom `secureCompare` utility) when comparing secrets, API keys, or passwords to prevent attackers from guessing values byte-by-byte.
