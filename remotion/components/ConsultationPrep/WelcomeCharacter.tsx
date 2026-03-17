import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate, interpolateColors } from 'remotion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { COLORS } from '../../utils/colorTokens';

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
      config: { damping: 10, stiffness: 150 }, // Bouncier, natural spring without fixed duration
    }),
    [frame, fps, delay, prefersReducedMotion]
  );

  const yOffset = useMemo(() =>
    prefersReducedMotion ? 0 : spring({
      frame: frame - delay,
      fps,
      from: 30,
      to: 0,
      config: { damping: 14, stiffness: 120 }, // Smoother slide up
    }),
    [frame, fps, delay, prefersReducedMotion]
  );

  // Color interpolation: Start with accent color and fade to white
  const color = useMemo(() =>
    prefersReducedMotion ? COLORS.surface : interpolateColors(
      frame - delay,
      [0, 30],
      [COLORS.accent, COLORS.surface]
    ),
    [frame, delay, prefersReducedMotion]
  );

  // Subtle continuous floating wave effect after entrance
  const waveY = useMemo(() => {
    if (prefersReducedMotion || frame <= delay + 25) return 0;
    // Slow wave oscillation for floating effect
    return Math.sin((frame - delay - 25) / 15) * 4;
  }, [frame, delay, prefersReducedMotion]);

  return (
    <span
      style={{
        display: 'inline-block',
        opacity,
        transform: `translateY(${yOffset + waveY}px) scale(${scale})`,
        color: color,
        whiteSpace: 'pre',
      }}
    >
      {char}
    </span>
  );
};
