import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface WelcomeCharacterProps {
  char: string;
  delay: number;
  index: number;
}

export const WelcomeCharacter: React.FC<WelcomeCharacterProps> = ({ char, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Entrance animations
  const opacity = useMemo(() =>
    prefersReducedMotion ? 1 : spring({
      frame: frame - delay,
      fps,
      from: 0,
      to: 1,
      durationInFrames: 25,
    }),
    [frame, fps, delay, prefersReducedMotion]
  );

  const scale = useMemo(() =>
    prefersReducedMotion ? 1 : spring({
      frame: frame - delay,
      fps,
      from: 0.5,
      to: 1,
      durationInFrames: 25,
    config: { damping: 15, stiffness: 100 },
    }),
    [frame, fps, delay, prefersReducedMotion]
  );

  const yOffset = useMemo(() =>
    prefersReducedMotion ? 0 : spring({
      frame: frame - delay,
      fps,
      from: 30,
      to: 0,
      durationInFrames: 25,
    config: { damping: 15 },
    }),
    [frame, fps, delay, prefersReducedMotion]
  );

  const blur = useMemo(() =>
    prefersReducedMotion ? 0 : interpolate(
      frame - delay,
      [0, 20],
      [10, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ),
    [frame, delay, prefersReducedMotion]
  );

  // Micro-animation: subtle wave after entrance
  // Only start after entrance is done (approx delay + 25 frames)
  const waveStartFrame = delay + 25;
  const waveY = useMemo(() => {
    if (prefersReducedMotion || frame < waveStartFrame) return 0;
    // Continuous sine wave
    return Math.sin((frame - waveStartFrame) / 25 + index * 0.5) * 3;
  }, [frame, waveStartFrame, index, prefersReducedMotion]);

  return (
    <span
      style={{
        display: 'inline-block',
        opacity,
        transform: `translateY(${yOffset + waveY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        whiteSpace: 'pre',
      }}
    >
      {char}
    </span>
  );
};
