/**
 * Shared animation utilities for all Remotion compositions.
 * Provides reusable spring presets, easing helpers, and transition patterns.
 */
import { spring, interpolate } from 'remotion';

/** Spring configuration presets matching the clinical brand feel */
export const SPRING_CONFIGS = {
  /** Gentle entrance — used for titles and large elements */
  gentle: { damping: 20, mass: 1, stiffness: 80 },
  /** Snappy pop — used for badges, icons, and small elements */
  snappy: { damping: 12, mass: 0.8, stiffness: 200 },
  /** Bouncy — used for attention-grabbing stat counters */
  bouncy: { damping: 10, mass: 0.6, stiffness: 170 },
  /** Smooth slide — used for card entrances */
  smooth: { damping: 18, mass: 1, stiffness: 120 },
} as const;

/**
 * Fade-in animation with configurable delay and duration.
 */
export function fadeIn(opts: {
  frame: number;
  fps: number;
  delay?: number;
  durationInFrames?: number;
}) {
  return spring({
    frame: opts.frame - (opts.delay ?? 0),
    fps: opts.fps,
    from: 0,
    to: 1,
    durationInFrames: opts.durationInFrames ?? 25,
  });
}

/**
 * Slide-in animation from a given direction.
 */
export function slideIn(opts: {
  frame: number;
  fps: number;
  delay?: number;
  durationInFrames?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
}) {
  const direction = opts.direction ?? 'up';
  const distance = opts.distance ?? 40;
  const from =
    direction === 'left' || direction === 'up' ? -distance : distance;

  return spring({
    frame: opts.frame - (opts.delay ?? 0),
    fps: opts.fps,
    from,
    to: 0,
    durationInFrames: opts.durationInFrames ?? 30,
    config: SPRING_CONFIGS.smooth,
  });
}

/**
 * Scale-in animation (0 → 1 with spring physics).
 */
export function scaleIn(opts: {
  frame: number;
  fps: number;
  delay?: number;
  durationInFrames?: number;
  from?: number;
}) {
  return spring({
    frame: opts.frame - (opts.delay ?? 0),
    fps: opts.fps,
    from: opts.from ?? 0,
    to: 1,
    durationInFrames: opts.durationInFrames ?? 30,
    config: SPRING_CONFIGS.snappy,
  });
}

/**
 * Animated counter that counts from 0 to a target value.
 * Returns the current interpolated number.
 */
export function animatedCounter(opts: {
  frame: number;
  fps: number;
  target: number;
  delay?: number;
  durationInFrames?: number;
}) {
  const progress = spring({
    frame: opts.frame - (opts.delay ?? 0),
    fps: opts.fps,
    from: 0,
    to: 1,
    durationInFrames: opts.durationInFrames ?? 60,
    config: SPRING_CONFIGS.gentle,
  });
  return Math.round(interpolate(progress, [0, 1], [0, opts.target]));
}

/**
 * Progress bar animation (0% → target%).
 */
export function animatedProgress(opts: {
  frame: number;
  fps: number;
  target: number;
  delay?: number;
  durationInFrames?: number;
}) {
  const progress = spring({
    frame: opts.frame - (opts.delay ?? 0),
    fps: opts.fps,
    from: 0,
    to: 1,
    durationInFrames: opts.durationInFrames ?? 50,
    config: SPRING_CONFIGS.gentle,
  });
  return interpolate(progress, [0, 1], [0, opts.target]);
}

/**
 * Stagger delay calculator for list items.
 */
export function staggerDelay(index: number, baseDelay = 0, interval = 15) {
  return baseDelay + index * interval;
}

/**
 * Cross-fade transition helper.
 * Returns opacity values for outgoing and incoming elements.
 */
export function crossFade(opts: {
  frame: number;
  fps: number;
  transitionStart: number;
  durationInFrames?: number;
}) {
  const duration = opts.durationInFrames ?? 20;
  const outOpacity = interpolate(
    opts.frame,
    [opts.transitionStart, opts.transitionStart + duration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const inOpacity = interpolate(
    opts.frame,
    [opts.transitionStart, opts.transitionStart + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  return { outOpacity, inOpacity };
}
