## 2024-03-05 - Add aria-labels to icon-only interactive controls

**Learning:** It's important to verify that interactive controls (like buttons with SVG icons) have `aria-label` attributes to ensure they are accessible. Often when implementing complex features like AI chat widgets, the submit button is styled with an SVG and can lack an accessible name. A simple search for `<button` combined with `<svg` can highlight these instances.
**Action:** Added `aria-label` attributes to the submit buttons in `app/ai-sandbox/page.tsx` and `app/ai-sandbox/_components/SandboxClient.tsx` that previously only contained an SVG. Also added an `aria-label` to the Escape button in the `SiteSearchModal` which didn't have a screen reader friendly descriptive text.
