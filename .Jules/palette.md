## 2024-03-05 - Add aria-labels to icon-only interactive controls

**Learning:** It's important to verify that interactive controls (like buttons with SVG icons) have `aria-label` attributes to ensure they are accessible. Often when implementing complex features like AI chat widgets, the submit button is styled with an SVG and can lack an accessible name. A simple search for `<button` combined with `<svg` can highlight these instances.
**Action:** Added `aria-label` attributes to the submit buttons in `app/ai-sandbox/page.tsx` and `app/ai-sandbox/_components/SandboxClient.tsx` that previously only contained an SVG. Also added an `aria-label` to the Escape button in the `SiteSearchModal` which didn't have a screen reader friendly descriptive text.

## 2025-05-18 - [Add aria-hidden to decorative required asterisks]
**Learning:** Decorative characters like `*` for required form fields should be hidden from screen readers using `aria-hidden="true"`. This prevents redundant announcements like "asterisk". The `required` or `aria-required` attribute on the input itself is what should convey this state to assistive technologies.
**Action:** Added `aria-hidden="true"` to the `*` span elements in `Input.tsx`, `Select.tsx`, and `Textarea.tsx` within `packages/appointment-form/ui/`.

## 2024-05-15 - Dynamic ARIA Labels for Feedback Buttons
**Learning:** For interactive buttons that change state without navigating (like "Copy to clipboard"), `title` is often not read reliably by screen readers when state changes.
**Action:** Used `aria-live="polite"` combined with a dynamic `aria-label={copied ? "Copied" : "Copy"}` to provide immediate, accessible feedback for micro-interactions without using visual toast notifications.

## 2025-05-18 - [Add aria-live regions for dynamic analysis results]
**Learning:** For asynchronous AI analysis tools (like DICOM or PDF extractors) where results or errors populate dynamically after a loading state, the wrapper containing these outputs needs `aria-live="polite"` and `aria-atomic="true"`. Otherwise, screen reader users are left unaware when the long-running process completes and content appears on screen. Errors should ideally use `role="alert"`.
**Action:** Wrapped the dynamic `error` and `result` JSX elements in `app/dicom-analysis/page.tsx` and `app/lab-analysis/page.tsx` with a `<div aria-live="polite" aria-atomic="true">` container and added `role="alert"` to the error messages.
