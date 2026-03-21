import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { PrepStepItem } from './PrepStepItem';
import { GradientBackground } from '../shared/GradientBackground';
import type { ConsultationPrepProps } from '../../types/ConsultationPrepProps';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface PrepStepsSceneProps {
  surgeryType: string;
  prepSteps: ConsultationPrepProps['prepSteps'];
}

export const PrepStepsScene: React.FC<PrepStepsSceneProps> = ({ surgeryType, prepSteps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Title animation
  const titleOpacity = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 100, stiffness: 100 },
  }), [frame, fps, prefersReducedMotion]);

  const titleY = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame,
    fps,
    from: -30,
    to: 0,
    config: { damping: 14, stiffness: 120 },
  }), [frame, fps, prefersReducedMotion]);

  // Subtitle staggered animation
  const subtitleOpacity = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 10,
    fps,
    from: 0,
    to: 1,
    config: { damping: 100, stiffness: 100 },
  }), [frame, fps, prefersReducedMotion]);

  const subtitleY = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame: frame - 10,
    fps,
    from: -20,
    to: 0,
    config: { damping: 14, stiffness: 120 },
  }), [frame, fps, prefersReducedMotion]);

  return (
    <GradientBackground preset="light-clean" animated={!prefersReducedMotion}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: SPACING[16],
          paddingTop: SPACING[12],
        }}
      >
        {/* Title & Subtitle */}
        <div style={{ marginBottom: SPACING[12] }}>
          <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
            <h2
              style={{
                fontFamily: FONTS.primary,
                fontSize: '48px',
                fontWeight: 700,
                color: COLORS.text,
                margin: 0,
                marginBottom: SPACING[2],
                textAlign: 'center',
              }}
            >
              Preparing for Your {surgeryType}
            </h2>
          </div>
          <div style={{ opacity: subtitleOpacity, transform: `translateY(${subtitleY}px)` }}>
            <p
              style={{
                fontFamily: FONTS.primary,
                fontSize: '24px',
                fontWeight: 400,
                color: COLORS.textSecondary,
                margin: 0,
                textAlign: 'center',
              }}
            >
              Follow these important steps:
            </p>
          </div>
        </div>

        {/* Prep steps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[8],
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {prepSteps.map((step, index) => (
            <PrepStepItem
              key={step.step}
              step={step}
              delay={30 + index * 50}
            />
          ))}
        </div>
      </div>
    </GradientBackground>
  );
};
