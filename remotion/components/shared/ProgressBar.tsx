import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../../utils/colorTokens';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Memoize the progress calculation for performance
  const progress = useMemo(() => {
    return Math.min(Math.max(frame / durationInFrames, 0), 1);
  }, [frame, durationInFrames]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: COLORS.accent,
            opacity: 0.8,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
