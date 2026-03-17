## 2025-03-07 - Replace setTimeout scroll tracking with requestAnimationFrame
**Learning:** High-frequency event listeners (like scroll tracking in `StatsigAnalytics`) using `setTimeout`/`clearTimeout` for debouncing cause excessive main-thread overhead and layout thrashing, which negatively impacts Total Blocking Time (TBT) and responsiveness.
**Action:** Replaced the `setTimeout` trailing-edge debounce pattern with a highly-performant `requestAnimationFrame` throttle pattern to decouple DOM reads from scroll events.

## 2025-03-07 - Replace continuous mousemove with mouseleave for exit intent
**Learning:** Detecting user exit intent (moving the cursor to close the tab) using a continuous `mousemove` listener on the `window` to check `clientY` generates significant CPU and main-thread overhead by firing on every single mouse movement.
**Action:** Replaced the `mousemove` listener with a `mouseleave` listener on the `document`. The `mouseleave` event only fires exactly when the cursor exits the document boundaries (like moving up to the tab bar), achieving the exact same exit-intent detection with zero overhead during normal page interaction.

## 2025-03-11 - Pause continuous WebGL rendering loops when off-screen
**Learning:** Continuous `requestAnimationFrame` render loops (like Three.js or WebGL canvas renderers) that keep running even when the canvas is completely scrolled out of the viewport cause a severe and silent drain on CPU/GPU resources and battery life, significantly impacting the page's overall responsiveness (TBT/INP).
**Action:** Implemented an `IntersectionObserver` to pause the WebGL render loop when the component is off-screen and resume it when it becomes visible again.

## 2025-03-11 - Optimize Vercel AI Gateway for deterministic endpoints
**Learning:** For deterministic AI endpoints (like semantic search, triage, analytics, predictive scheduling, and follow-up care), enabling caching via Vercel AI Gateway headers (`vercel-ai-gateway-cache: true`) significantly reduces API costs and improves response latency for repeated queries.
**Action:** Updated calls to `getTextModel` in deterministic service files to pass `{ cache: true }` to leverage the built-in Vercel AI Gateway caching mechanism.
