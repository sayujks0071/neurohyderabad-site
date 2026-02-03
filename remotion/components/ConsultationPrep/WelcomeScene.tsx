import React, { useState, useEffect } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../../utils/colorTokens';
import { GradientBackground } from '../shared/GradientBackground';

export interface WelcomeSceneProps {
  patientName: string;
}

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  return prefersReducedMotion;
};

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ patientName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Spring-based fade-in animation
  const opacity = prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  // Spring-based scale animation
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
  // Disable breathing if reduced motion is preferred
  const breathingScale = prefersReducedMotion ? 1 : 1 + Math.sin(frame / 45) * 0.01;

  return (
    <GradientBackground preset="clinical-blue" animated={!prefersReducedMotion}>
      <div
        style={{
          width: '100%',
          height: '100%',
          // Background handled by GradientBackground wrapper
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
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
              color: COLORS.surface, // Changed to surface (white) for better contrast on gradient
              margin: 0,
              marginBottom: '24px',
              textShadow: '0 4px 12px rgba(0,0,0,0.1)', // Added text shadow for legibility
            }}
          >
            {`Hi ${patientName}!`.split('').map((char, i) => {
              const charOpacity = prefersReducedMotion ? 1 : spring({
                frame: frame - i * 3,
                fps,
                from: 0,
                to: 1,
                durationInFrames: 20,
              });

              const charY = prefersReducedMotion ? 0 : spring({
                frame: frame - i * 3,
                fps,
                from: 20,
                to: 0,
                durationInFrames: 20,
                config: { damping: 10 },
              });

              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: charOpacity,
                    transform: `translateY(${charY}px)`,
                    whiteSpace: 'pre',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
          <p
            style={{
              fontFamily: FONTS.primary,
              fontSize: '32px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)', // White with slight transparency
              margin: 0,
            }}
          >
            Welcome to Dr. Sayuj Krishnan's Practice
          </p>
        </div>
      </div>
    </GradientBackground>
  );
};
