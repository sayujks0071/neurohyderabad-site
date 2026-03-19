## 2024-03-05 - Add aria-labels to icon-only interactive controls

**Learning:** It's important to verify that interactive controls (like buttons with SVG icons) have `aria-label` attributes to ensure they are accessible. Often when implementing complex features like AI chat widgets, the submit button is styled with an SVG and can lack an accessible name. A simple search for `<button` combined with `<svg` can highlight these instances.
**Action:** Added `aria-label` attributes to the submit buttons in `app/ai-sandbox/page.tsx` and `app/ai-sandbox/_components/SandboxClient.tsx` that previously only contained an SVG. Also added an `aria-label` to the Escape button in the `SiteSearchModal` which didn't have a screen reader friendly descriptive text.

## 2025-05-18 - [Add aria-hidden to decorative required asterisks]
**Learning:** Decorative characters like `*` for required form fields should be hidden from screen readers using `aria-hidden="true"`. This prevents redundant announcements like "asterisk". The `required` or `aria-required` attribute on the input itself is what should convey this state to assistive technologies.
**Action:** Added `aria-hidden="true"` to the `*` span elements in `Input.tsx`, `Select.tsx`, and `Textarea.tsx` within `packages/appointment-form/ui/`.

## 2024-05-15 - Dynamic ARIA Labels for Feedback Buttons
**Learning:** For interactive buttons that change state without navigating (like "Copy to clipboard"), `title` is often not read reliably by screen readers when state changes.
**Action:** Used `aria-live="polite"` combined with a dynamic `aria-label={copied ? "Copied" : "Copy"}` to provide immediate, accessible feedback for micro-interactions without using visual toast notifications.

## 2025-03-15 - Add aria-label and aria-busy to interactive loading buttons
**Learning:** Icon-only interactive buttons (like the `SpeechButton` using the `Volume2` or `Loader2` lucide-react icons) often rely solely on a `title` attribute for accessibility. While `title` provides a tooltip, it is not consistently read by all screen readers. Providing an explicit `aria-label` guarantees that an accessible name is provided. Additionally, when a button has an interactive loading state (e.g., waiting for speech generation), adding `aria-busy={true}` informs assistive technologies that the element is currently updating.
**Action:** Added `aria-label="Listen to AI analysis"` and `aria-busy={isPlaying}` to the `<button>` in `app/appointments/_components/neuralink/SpeechButton.tsx`.
## 2026-03-19 - [Add aria-labels to stateful toggle buttons]
**Learning:** For dynamic or toggleable chat widgets (e.g. `ChatBot.tsx`, `LiveAssistant.tsx`), floating action buttons or close icons that conditionally change states or purely display an icon often lack an accessible name. A dynamic `aria-label` (like `isOpen ? "Close AI Chat" : "Open AI Chat"`) combined with standard descriptive labels for action buttons (like `aria-label="Send message"`) ensures screen-reader users have equal context for micro-interactions without changing visual layout.
**Action:** Added semantic `aria-label` attributes to the floating action button, close buttons, and send buttons in `ChatBot.tsx` and `LiveAssistant.tsx` components.
