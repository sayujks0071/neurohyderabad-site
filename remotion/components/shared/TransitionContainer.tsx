import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export type TransitionType = 'none' | 'fade' | 'slideUp' | 'slideUpFade';

export interface TransitionContainerProps {
  children: React.ReactNode;
  entrance?: TransitionType;
  exit?: TransitionType;
  entranceDuration?: number;
  exitDuration?: number;
  exitStartFrame?: number;
}

export const TransitionContainer: React.FC<TransitionContainerProps> = ({
  children,
  entrance = 'none',
  exit = 'none',
  entranceDuration = 30,
  exitDuration = 30,
  exitStartFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Entrance calculations
  let entranceOpacity = 1;
  let entranceTranslateY = 0;

  if (entrance !== 'none' && !prefersReducedMotion) {
    if (entrance === 'fade' || entrance === 'slideUpFade') {
      entranceOpacity = interpolate(frame, [0, entranceDuration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }

    if (entrance === 'slideUp' || entrance === 'slideUpFade') {
      entranceTranslateY = spring({
        frame,
        fps,
        from: 50,
        to: 0,
        config: { damping: 15 },
      });
    }
  }

  // Exit calculations
  let exitOpacity = 1;
  let exitTranslateY = 0;

  if (exit !== 'none' && exitStartFrame !== undefined && !prefersReducedMotion) {
    const exitEndFrame = exitStartFrame + exitDuration;

    if (exit === 'fade' || exit === 'slideUpFade') {
      exitOpacity = interpolate(frame, [exitStartFrame, exitEndFrame], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }

    if (exit === 'slideUp' || exit === 'slideUpFade') {
      // Slide up (negative Y) for exit
      exitTranslateY = interpolate(frame, [exitStartFrame, exitEndFrame], [0, -50], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  }

  // Combined styles
  const opacity = entranceOpacity * exitOpacity;
  const translateY = entranceTranslateY + exitTranslateY;

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
