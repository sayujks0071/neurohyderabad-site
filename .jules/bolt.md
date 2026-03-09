## 2025-03-07 - Replace setTimeout scroll tracking with requestAnimationFrame
**Learning:** High-frequency event listeners (like scroll tracking in `StatsigAnalytics`) using `setTimeout`/`clearTimeout` for debouncing cause excessive main-thread overhead and layout thrashing, which negatively impacts Total Blocking Time (TBT) and responsiveness.
**Action:** Replaced the `setTimeout` trailing-edge debounce pattern with a highly-performant `requestAnimationFrame` throttle pattern to decouple DOM reads from scroll events.

## 2025-03-07 - Replace continuous mousemove with mouseleave for exit intent
**Learning:** Detecting user exit intent (moving the cursor to close the tab) using a continuous `mousemove` listener on the `window` to check `clientY` generates significant CPU and main-thread overhead by firing on every single mouse movement.
**Action:** Replaced the `mousemove` listener with a `mouseleave` listener on the `document`. The `mouseleave` event only fires exactly when the cursor exits the document boundaries (like moving up to the tab bar), achieving the exact same exit-intent detection with zero overhead during normal page interaction.
