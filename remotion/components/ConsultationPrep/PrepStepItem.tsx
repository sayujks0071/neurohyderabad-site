import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface PrepStepItemProps {
  step: {
    step: number;
    title: string;
    description: string;
  };
  delay?: number;
}

export const PrepStepItem: React.FC<PrepStepItemProps> = ({ step, delay = 0 }) => {
  const absoluteFrame = useCurrentFrame();
  const frame = absoluteFrame - delay;
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // 1. Entrance Animation - Slide up from bottom
  const opacity = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  }), [frame, fps, prefersReducedMotion]);

  const translateY = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame,
    fps,
    from: 50,
    to: 0,
    durationInFrames: 35,
    config: {
      damping: 15,
    },
  }), [frame, fps, prefersReducedMotion]);

  // 2. Container Scale Animation (Subtle pulse on entrance)
  const scale = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 5,
    fps,
    from: 0.95,
    to: 1,
    durationInFrames: 25,
    config: {
      damping: 12,
      stiffness: 120,
    },
  }), [frame, fps, prefersReducedMotion]);

  // 3. Checkmark Drawing Animation
  // Path length approx 25 for M4 12 L9 17 L20 6
  const checkmarkLength = 25;

  const checkmarkProgress = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 10,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 35,
    config: {
      damping: 100, // No overshoot for drawing
    },
  }), [frame, fps, prefersReducedMotion]);

  // 4. Circle Pop Animation
  const circleScale = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 5,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 25,
    config: {
      damping: 12,
      stiffness: 100,
    },
  }), [frame, fps, prefersReducedMotion]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: SPACING[6],
        backgroundColor: COLORS.surface,
        padding: SPACING[8],
        borderRadius: '16px',
        border: `3px solid ${COLORS.accent}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {/* Checkmark icon container */}
      <div
        style={{
          transform: `scale(${circleScale})`,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: COLORS.success,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginTop: '2px' }}
        >
          <path
            d="M4 12 L9 17 L20 6"
            stroke={COLORS.surface}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
                strokeDasharray: checkmarkLength,
                strokeDashoffset: checkmarkLength * (1 - checkmarkProgress),
            }}
          />
        </svg>
      </div>

      {/* Text content */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: FONTS.primary,
            fontSize: '32px',
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            marginBottom: SPACING[2],
          }}
        >
          {step.step}. {step.title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.primary,
            fontSize: '24px',
            fontWeight: 400,
            color: COLORS.textSecondary,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
};
