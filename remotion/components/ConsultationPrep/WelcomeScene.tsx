import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../../utils/colorTokens';
import { useMemo, useState, useEffect } from 'react';

export interface WelcomeSceneProps {
  patientName: string;
}

// Hook to detect reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ patientName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = useReducedMotion();

  // Spring-based fade-in animation
  const opacity = useMemo(() => spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  }), [frame, fps]);

  // Spring-based scale animation
  const scaleSpring = useMemo(() => spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 30,
    config: {
      damping: 15,
    },
  }), [frame, fps]);

  const scale = prefersReducedMotion ? 1 : scaleSpring;

  // Subtle breathing animation for continuous movement
  const breathingScale = useMemo(() =>
    prefersReducedMotion ? 1 : (1 + Math.sin(frame / 45) * 0.01),
  [frame, prefersReducedMotion]);

  const nameChars = useMemo(() => `Hi ${patientName}!`.split(''), [patientName]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${COLORS.accent} 0%, #0077A3 100%)`,
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
            color: COLORS.surface, // Improved contrast (was COLORS.text)
            margin: 0,
            marginBottom: '24px',
          }}
        >
          {nameChars.map((char, i) => {
            const charOpacity = spring({
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
            color: COLORS.surface, // Improved contrast (was COLORS.text)
            margin: 0,
          }}
        >
          Welcome to Dr. Sayuj Krishnan's Practice
        </p>
      </div>
    </div>
  );
};
