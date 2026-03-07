## 2025-03-07 - Replace setTimeout scroll tracking with requestAnimationFrame
**Learning:** High-frequency event listeners (like scroll tracking in `StatsigAnalytics`) using `setTimeout`/`clearTimeout` for debouncing cause excessive main-thread overhead and layout thrashing, which negatively impacts Total Blocking Time (TBT) and responsiveness.
**Action:** Replaced the `setTimeout` trailing-edge debounce pattern with a highly-performant `requestAnimationFrame` throttle pattern to decouple DOM reads from scroll events.
