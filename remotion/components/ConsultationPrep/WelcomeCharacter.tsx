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
      durationInFrames: 25,
      config: { damping: 12, stiffness: 100 },
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
      config: { damping: 12 },
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
