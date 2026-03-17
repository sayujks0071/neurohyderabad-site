## 2025-03-07 - Replace setTimeout scroll tracking with requestAnimationFrame
**Learning:** High-frequency event listeners (like scroll tracking in `StatsigAnalytics`) using `setTimeout`/`clearTimeout` for debouncing cause excessive main-thread overhead and layout thrashing, which negatively impacts Total Blocking Time (TBT) and responsiveness.
**Action:** Replaced the `setTimeout` trailing-edge debounce pattern with a highly-performant `requestAnimationFrame` throttle pattern to decouple DOM reads from scroll events.

## 2025-03-07 - Replace continuous mousemove with mouseleave for exit intent
**Learning:** Detecting user exit intent (moving the cursor to close the tab) using a continuous `mousemove` listener on the `window` to check `clientY` generates significant CPU and main-thread overhead by firing on every single mouse movement.
**Action:** Replaced the `mousemove` listener with a `mouseleave` listener on the `document`. The `mouseleave` event only fires exactly when the cursor exits the document boundaries (like moving up to the tab bar), achieving the exact same exit-intent detection with zero overhead during normal page interaction.

## 2025-03-11 - Pause continuous WebGL rendering loops when off-screen
**Learning:** Continuous `requestAnimationFrame` render loops (like Three.js or WebGL canvas renderers) that keep running even when the canvas is completely scrolled out of the viewport cause a severe and silent drain on CPU/GPU resources and battery life, significantly impacting the page's overall responsiveness (TBT/INP).
**Action:** Implemented an `IntersectionObserver` to pause the WebGL render loop when the component is off-screen and resume it when it becomes visible again.

## 2025-03-11 - Extract interaction handler references to properly unbind fallback events
**Learning:** When attaching global interaction events (`mousedown`, `touchstart`, `keydown`) to trigger lazy-loading (such as in `ClientAnalytics` fallback strategies), declaring the handler function inline within the strategy execution block causes the reference to be lost. This prevents the `useEffect` cleanup function from successfully removing those exact event listeners when the component unmounts, creating a silent memory and performance leak.
**Action:** Extracted the `handleInteraction` function reference out of the strategy closure and into the `useEffect`'s block scope. This ensured the cleanup function had access to the correct reference, allowing `document.removeEventListener` to successfully detach the listeners and prevent main-thread overhead.
