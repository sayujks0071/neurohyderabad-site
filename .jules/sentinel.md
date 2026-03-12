## 2024-05-15 - [API Key Verification Timing Attack]
**Vulnerability:** API key verification used standard string equality (`===`) instead of `crypto.timingSafeEqual`, making the endpoints vulnerable to timing attacks.
**Learning:** Found multiple instances of `apiKey === validKey` in `app/api/workflows/*/route.ts`. Standard string comparison exits early on the first mismatched character, allowing an attacker to guess the API key character by character by measuring the response time.
**Prevention:** Always use `crypto.timingSafeEqual` after hashing both the input and expected keys with SHA-256 for secure comparison.

## 2024-05-20 - [CRON_SECRET Verification Timing Attack]
**Vulnerability:** CRON_SECRET verification used standard string equality (`!==`) instead of `crypto.timingSafeEqual`, making the cron job endpoints vulnerable to timing attacks.
**Learning:** Found instances of `authHeader !== \`Bearer \${process.env.CRON_SECRET}\`` in cron job routes like `app/api/workflows/newsletter/route.ts`, `app/api/workflows/appointment-reminders/route.ts`, and `app/api/cron/reindex-rag/route.ts`. Standard string comparison exits early on the first mismatched character, allowing an attacker to guess the secret character by character by measuring the response time.
**Prevention:** Always use `crypto.timingSafeEqual` after hashing both the input and expected keys with SHA-256 for secure comparison.
