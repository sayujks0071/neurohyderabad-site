## 2025-03-07 - Replace setTimeout scroll tracking with requestAnimationFrame
**Learning:** High-frequency event listeners (like scroll tracking in `StatsigAnalytics`) using `setTimeout`/`clearTimeout` for debouncing cause excessive main-thread overhead and layout thrashing, which negatively impacts Total Blocking Time (TBT) and responsiveness.
**Action:** Replaced the `setTimeout` trailing-edge debounce pattern with a highly-performant `requestAnimationFrame` throttle pattern to decouple DOM reads from scroll events.

## 2025-03-07 - Replace continuous mousemove with mouseleave for exit intent
**Learning:** Detecting user exit intent (moving the cursor to close the tab) using a continuous `mousemove` listener on the `window` to check `clientY` generates significant CPU and main-thread overhead by firing on every single mouse movement.
**Action:** Replaced the `mousemove` listener with a `mouseleave` listener on the `document`. The `mouseleave` event only fires exactly when the cursor exits the document boundaries (like moving up to the tab bar), achieving the exact same exit-intent detection with zero overhead during normal page interaction.

## 2025-03-11 - Pause continuous WebGL rendering loops when off-screen
**Learning:** Continuous `requestAnimationFrame` render loops (like Three.js or WebGL canvas renderers) that keep running even when the canvas is completely scrolled out of the viewport cause a severe and silent drain on CPU/GPU resources and battery life, significantly impacting the page's overall responsiveness (TBT/INP).
**Action:** Implemented an `IntersectionObserver` to pause the WebGL render loop when the component is off-screen and resume it when it becomes visible again.

## 2025-03-12 - Prevent memory leaks in interaction-based lazy-loading fallbacks
**Learning:** When using global interaction events (like `mousedown`, `touchstart`, `keydown`) as a fallback strategy to lazily load non-critical components (such as third-party analytics scripts), failing to properly clean up those listeners if the primary strategy (e.g., `requestIdleCallback` or a timeout) executes first results in hanging event listeners. These orphaned listeners remain bound to the `document` indefinitely, firing useless handlers on every user interaction, silently degrading main-thread performance and causing memory leaks over the lifespan of the SPA.
**Action:** Re-structured the interaction fallback strategy in `ClientAnalytics.tsx` to explicitly expose and execute its cleanup logic (`removeEventListener`) within the component's main `useEffect` teardown function, ensuring that regardless of which loading strategy ultimately triggers the load, all fallback listeners are reliably destroyed.
