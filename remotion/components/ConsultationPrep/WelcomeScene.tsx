import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate } from 'remotion';
import { COLORS, FONTS } from '../../utils/colorTokens';
import { GradientBackground } from '../shared/GradientBackground';
import { WelcomeCharacter } from './WelcomeCharacter';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface WelcomeSceneProps {
  patientName: string;
  exitFrame?: number;
}

const FloatingParticles: React.FC<{ reducedMotion: boolean; opacity: number }> = ({ reducedMotion, opacity }) => {
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
    <AbsoluteFill style={{ overflow: 'hidden', opacity }}>
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

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ patientName, exitFrame = 150 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Spring-based fade-in animation for main container
  const entranceOpacity = prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  // Spring-based scale animation for main container
  const scale = prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 30,
    config: {
      damping: 15,
    },
  });

  // Subtle breathing animation for continuous movement
  const breathingScale = prefersReducedMotion ? 1 : 1 + Math.sin(frame / 45) * 0.01;

  // Subtitle animation configuration
  const subtitleText = "Welcome to Dr. Sayuj Krishnan's Practice";
  const subtitleWords = subtitleText.split(' ');
  const subtitleBaseDelay = 15;

  // --- EXIT ANIMATIONS ---
  // Start exiting at exitFrame, take 20 frames to slide out/fade
  const exitDuration = 20;

  const exitOpacity = interpolate(
    frame,
    [exitFrame, exitFrame + exitDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const exitY = prefersReducedMotion ? 0 : interpolate(
    frame,
    [exitFrame, exitFrame + exitDuration],
    [0, -50], // Slide up by 50px
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <GradientBackground preset="clinical-blue" animated={!prefersReducedMotion}>
      <FloatingParticles reducedMotion={prefersReducedMotion} opacity={exitOpacity} />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: entranceOpacity * exitOpacity, // Combine entrance and exit opacity
          transform: `translateY(${exitY}px)`, // Apply exit slide
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
          <p
            style={{
              fontFamily: FONTS.primary,
              fontSize: '32px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
            }}
          >
            {subtitleWords.map((word, i) => {
              const delay = subtitleBaseDelay + i * 5;
              const wordOpacity = prefersReducedMotion ? 1 : spring({
                frame: frame - delay,
                fps,
                from: 0,
                to: 1,
                durationInFrames: 30,
              });
              const wordY = prefersReducedMotion ? 0 : spring({
                frame: frame - delay,
                fps,
                from: 20,
                to: 0,
                durationInFrames: 30,
                config: { damping: 12 },
              });

              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: wordOpacity,
                    transform: `translateY(${wordY}px)`,
                    marginRight: i === subtitleWords.length - 1 ? 0 : '0.3em',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </GradientBackground>
  );
};
