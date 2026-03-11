## 2024-05-15 - [API Key Verification Timing Attack]
**Vulnerability:** API key verification used standard string equality (`===`) instead of `crypto.timingSafeEqual`, making the endpoints vulnerable to timing attacks.
**Learning:** Found multiple instances of `apiKey === validKey` in `app/api/workflows/*/route.ts`. Standard string comparison exits early on the first mismatched character, allowing an attacker to guess the API key character by character by measuring the response time.
**Prevention:** Always use `crypto.timingSafeEqual` after hashing both the input and expected keys with SHA-256 for secure comparison.
