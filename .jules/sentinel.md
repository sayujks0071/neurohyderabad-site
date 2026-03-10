## 2024-11-21 - [DOM XSS via Exit Intent Modal]
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `app/_components/ExitIntentHandler.tsx` where the `offerMessage` prop was directly interpolated into an HTML string using `.innerHTML`.
**Learning:** Using `innerHTML` for displaying dynamically provided string props or variables (even basic ones like `offerMessage`) allows script injection if a parent component ever pulls the variable from a user-supplied or external source without proper sanitization.
**Prevention:** Avoid `innerHTML` entirely when constructing UI dynamically. Use React JSX natively when possible, or strictly utilize secure DOM API methods like `document.createElement()` and `Node.textContent` for plain text string assignments.

## 2026-03-10 - [Timing Attack Prevention in API Key Verification]
**Vulnerability:** The verifyApiKey function in multiple workflow API routes used a standard string comparison ('===') for verifying the API key. This string comparison fails fast, which exposes the endpoint to timing attacks where an attacker could potentially guess the key character by character.
**Learning:** In a Node.js/Next.js environment, comparing sensitive strings like API keys or tokens must be done securely to avoid timing leaks.
**Prevention:** Always use 'crypto.timingSafeEqual' for comparing API keys or sensitive tokens. To safely handle keys of potentially different lengths without throwing errors or leaking the expected length, hash both the provided and expected keys (e.g., using 'crypto.createHash("sha256")') before passing them to 'timingSafeEqual'.
