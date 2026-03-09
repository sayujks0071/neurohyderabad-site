## 2024-11-21 - [DOM XSS via Exit Intent Modal]
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `app/_components/ExitIntentHandler.tsx` where the `offerMessage` prop was directly interpolated into an HTML string using `.innerHTML`.
**Learning:** Using `innerHTML` for displaying dynamically provided string props or variables (even basic ones like `offerMessage`) allows script injection if a parent component ever pulls the variable from a user-supplied or external source without proper sanitization.
**Prevention:** Avoid `innerHTML` entirely when constructing UI dynamically. Use React JSX natively when possible, or strictly utilize secure DOM API methods like `document.createElement()` and `Node.textContent` for plain text string assignments.
