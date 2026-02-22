import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { PrepStepItem } from './PrepStepItem';
import { GradientBackground } from '../shared/GradientBackground';
import type { ConsultationPrepProps } from '../../types/ConsultationPrepProps';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface PrepStepsSceneProps {
  surgeryType: string;
  prepSteps: ConsultationPrepProps['prepSteps'];
}

const FloatingShapes: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shapes = useMemo(() => [
    { x: 0.1, y: 0.2, size: 300, color: COLORS.primary, speed: 0.5, delay: 0 },
    { x: 0.8, y: 0.8, size: 250, color: COLORS.accent, speed: 0.3, delay: 20 },
    { x: 0.9, y: 0.1, size: 200, color: COLORS.secondary, speed: 0.4, delay: 10 },
    { x: 0.2, y: 0.9, size: 150, color: COLORS.primary, speed: 0.6, delay: 30 },
  ], []);

  if (reducedMotion) return null;

  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      {shapes.map((shape, i) => {
        const floatY = Math.sin((frame + shape.delay) / (fps * 2) * shape.speed) * 20;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${shape.x * 100}%`,
              top: `${shape.y * 100}%`,
              width: shape.size,
              height: shape.size,
              borderRadius: '50%',
              backgroundColor: shape.color,
              opacity: 0.04, // Very subtle
              transform: `translate(-50%, -50%) translateY(${floatY}px)`,
              filter: 'blur(60px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const PrepStepsScene: React.FC<PrepStepsSceneProps> = ({ surgeryType, prepSteps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Split title into words for staggered animation
  const titleText = `Preparing for Your ${surgeryType}`;
  const titleWords = titleText.split(' ');

  // Subtitle animation
  const subtitleOpacity = prefersReducedMotion ? 1 : spring({
    frame: frame - 20, // Start after title begins
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  const subtitleY = prefersReducedMotion ? 0 : spring({
    frame: frame - 20,
    fps,
    from: 10,
    to: 0,
    durationInFrames: 30,
    config: { damping: 12 },
  });

  return (
    <GradientBackground preset="light-clean" animated={!prefersReducedMotion}>
      <FloatingShapes reducedMotion={prefersReducedMotion} />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: SPACING[16],
          paddingTop: SPACING[12],
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Title Container */}
        <div style={{
          marginBottom: SPACING[2],
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.3em'
        }}>
          {titleWords.map((word, i) => {
            const delay = i * 3;
            const opacity = prefersReducedMotion ? 1 : spring({
              frame: frame - delay,
              fps,
              from: 0,
              to: 1,
              durationInFrames: 20,
            });
            const y = prefersReducedMotion ? 0 : spring({
              frame: frame - delay,
              fps,
              from: 20,
              to: 0,
              durationInFrames: 25,
              config: { damping: 12 },
            });

            return (
              <span
                key={i}
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '48px',
                  fontWeight: 700,
                  color: COLORS.text,
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: FONTS.primary,
            fontSize: '24px',
            fontWeight: 400,
            color: COLORS.textSecondary,
            margin: 0,
            marginBottom: SPACING[12],
            textAlign: 'center',
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Follow these important steps:
        </p>

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
              delay={35 + index * 40} // Adjusted delay for better flow
            />
          ))}
        </div>
      </div>
    </GradientBackground>
  );
};
