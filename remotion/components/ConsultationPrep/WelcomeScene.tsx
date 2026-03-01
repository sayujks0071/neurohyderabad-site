import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../../utils/colorTokens';
import { GradientBackground } from '../shared/GradientBackground';
import { WelcomeCharacter } from './WelcomeCharacter';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface WelcomeSceneProps {
  patientName: string;
}

const FloatingParticles: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const frame = useCurrentFrame();

  // Static particle configuration
  const particles = useMemo(() => [
    { x: 0.2, y: 0.3, size: 300, color: 'rgba(255,255,255,0.03)', speed: 1.2 },
    { x: 0.8, y: 0.7, size: 250, color: 'rgba(255,255,255,0.03)', speed: 0.8 },
    { x: 0.5, y: 0.5, size: 400, color: 'rgba(255,255,255,0.02)', speed: 1.0 },
    { x: 0.1, y: 0.8, size: 200, color: 'rgba(255,255,255,0.02)', speed: 1.5 },
    { x: 0.9, y: 0.2, size: 350, color: 'rgba(255,255,255,0.025)', speed: 0.9 },
  ], []);

  if (reducedMotion) return null;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {particles.map((p, i) => {
        const xOffset = Math.sin(frame / 100 * p.speed + i) * 30;
        const yOffset = Math.cos(frame / 120 * p.speed + i) * 30;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x * 100}%`,
              top: `${p.y * 100}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              transform: `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px)`,
              filter: 'blur(40px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ patientName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Spring-based fade-in animation for main container
  const opacity = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  }), [frame, fps, prefersReducedMotion]);

  // Spring-based scale animation for main container
  // Adjusted damping for a slightly bouncier/friendlier feel (15 -> 10)
  const scale = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 30,
    config: {
      damping: 10,
    },
  }), [frame, fps, prefersReducedMotion]);

  // Subtle breathing animation for continuous movement
  const breathingScale = useMemo(() => prefersReducedMotion ? 1 : 1 + Math.sin(frame / 45) * 0.01, [frame, prefersReducedMotion]);

  // Subtitle animation (starts after title)
  const subtitleStartFrame = 15;
  const subtitleText = "Welcome to Dr. Sayuj Krishnan's Practice";
  const subtitleWords = useMemo(() => subtitleText.split(' '), []);

  return (
    <GradientBackground preset="clinical-blue" animated={!prefersReducedMotion}>
      <FloatingParticles reducedMotion={prefersReducedMotion} />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
          zIndex: 1, // Ensure text is above particles
        }}
      >
        <div
          style={{
            transform: `scale(${scale * breathingScale})`,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: FONTS.primary,
              fontSize: '72px',
              fontWeight: 700,
              color: COLORS.surface,
              margin: 0,
              marginBottom: '24px',
              textShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {`Hi ${patientName}!`.split('').map((char, i) => (
              <WelcomeCharacter
                key={i}
                char={char}
                index={i}
                delay={i * 2}
              />
            ))}
          </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: FONTS.primary,
              fontSize: '32px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
            }}
          >
            {subtitleWords.map((word, index) => {
              const delay = subtitleStartFrame + index * 3;
              const wordOpacity = prefersReducedMotion ? 1 : spring({
                frame: frame - delay,
                fps,
                from: 0,
                to: 1,
                durationInFrames: 40,
              });

              const wordY = prefersReducedMotion ? 0 : spring({
                frame: frame - delay,
                fps,
                from: 20,
                to: 0,
                durationInFrames: 40,
                config: { damping: 12 },
              });

              return (
                <span
                  key={index}
                  style={{
                    opacity: wordOpacity,
                    transform: `translateY(${wordY}px)`,
                    display: 'inline-block',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};
