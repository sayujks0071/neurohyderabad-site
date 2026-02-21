import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface TransitionFlashProps {
  startFrame: number;
  duration?: number;
  color?: string;
  maxOpacity?: number;
}

export const TransitionFlash: React.FC<TransitionFlashProps> = ({
  startFrame,
  duration = 15,
  color = 'white',
  maxOpacity = 0.4,
}) => {
  const frame = useCurrentFrame();
  const prefersReducedMotion = usePrefersReducedMotion();

  // If reduced motion is preferred, we skip the flash as it can be jarring
  if (prefersReducedMotion) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration / 2, startFrame + duration],
    [0, maxOpacity, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // If opacity is 0, don't render to save performance
  if (opacity <= 0.01) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity,
        pointerEvents: 'none',
        zIndex: 100, // Ensure it's on top
      }}
    />
  );
};
