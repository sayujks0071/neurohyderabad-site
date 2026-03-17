## 2024-10-24 - SVG Icons Accessibility

**Learning:** Sighted users perceive SVG icons alongside their text labels or inside self-explanatory interactive elements intuitively, but screen readers may explicitly announce every rendered `<svg>` component (e.g., as "graphic" or "image") if it lacks an `aria-hidden` attribute. Decorative and supplemental SVGs should be explicitly hidden from assistive technologies to reduce "noise."

**Action:** Added `aria-hidden="true"` to common reusable SVG icon components (like `ChevronDownIcon` and `MapPinIcon`) inside `packages/appointment-form/constants.tsx` to ensure screen readers skip over them naturally, relying on adjacent ARIA labels or visible text instead.