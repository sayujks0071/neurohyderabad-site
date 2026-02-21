import React, { useMemo } from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface CalendarSceneProps {
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string;
}

export const CalendarScene: React.FC<CalendarSceneProps> = ({
  appointmentDate,
  appointmentTime,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Parse the date
  const date = new Date(appointmentDate + 'T00:00:00');
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const dayNumber = date.getDate();
  const year = date.getFullYear();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  // 1. Main Card Entrance (Pop in with 3D rotation)
  const calendarScale = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    durationInFrames: 25,
    config: {
      damping: 12,
      stiffness: 100,
    },
  }), [frame, fps, prefersReducedMotion]);

  const calendarRotateX = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame,
    fps,
    from: 45,
    to: 0,
    durationInFrames: 30,
    config: { damping: 15 },
  }), [frame, fps, prefersReducedMotion]);

  const calendarOpacity = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  }), [frame, fps, prefersReducedMotion]);

  // 2. Day Number Pop (Staggered) - Enhanced Stiffness
  const dayNumberScale = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 15,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
    config: {
      damping: 10,
      stiffness: 200, // Increased from 120 for more pop
    },
  }), [frame, fps, prefersReducedMotion]);

  // 3. Highlight Ring Animation
  const ringProgress = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 20,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 40,
    config: { damping: 100 },
  }), [frame, fps, prefersReducedMotion]);

  // Ring Pulse (triggers after drawing)
  const ringPulseDriver = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame: frame - 50,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
    config: { damping: 100 },
  }), [frame, fps, prefersReducedMotion]);

  const ringScale = interpolate(ringPulseDriver, [0, 0.5, 1], [1, 1.15, 1]);

  // 4. Time Section Slide Up (Staggered)
  const timeSlide = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame: frame - 25,
    fps,
    from: 50,
    to: 0,
    durationInFrames: 25,
    config: { damping: 15 },
  }), [frame, fps, prefersReducedMotion]);

  const timeOpacity = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 25,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  }), [frame, fps, prefersReducedMotion]);

  // Floating animation for "alive" feel
  const floatingY = prefersReducedMotion ? 0 : Math.sin(frame / 60) * 8;

  // Background Grid Animation
  const bgPos = prefersReducedMotion ? 0 : frame * 0.5;

  // Shadow Animation
  const shadowBlur = interpolate(calendarScale, [0.8, 1], [20, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ripple Effect (Secondary Ring)
  const rippleScale = useMemo(() => prefersReducedMotion ? 1 : spring({
    frame: frame - 25,
    fps,
    from: 0.8,
    to: 1.4,
    durationInFrames: 40,
    config: { damping: 100 },
  }), [frame, fps, prefersReducedMotion]);

  const rippleOpacity = interpolate(rippleScale, [0.8, 1.4], [0.6, 0]);

  // Sheen Effect (Visual Polish)
  const sheenDriver = useMemo(() => prefersReducedMotion ? 0 : spring({
    frame: frame - 45, // Start after card entrance
    fps,
    from: 0,
    to: 1,
    durationInFrames: 40,
    config: { damping: 100 },
  }), [frame, fps, prefersReducedMotion]);

  const sheenLeft = interpolate(sheenDriver, [0, 1], [-100, 200]);

  // Blur Animations
  const calendarBlur = prefersReducedMotion ? 0 : interpolate(frame, [0, 20], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dayNumberBlur = prefersReducedMotion ? 0 : interpolate(frame - 15, [0, 20], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Staggered Text Animation
  const successText = "Your Appointment is Scheduled";
  const words = successText.split(' ');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.surface,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING[16],
        perspective: '1000px', // Add perspective for 3D effect
      }}
    >
      <div
        style={{
          opacity: calendarOpacity,
          transform: `scale(${calendarScale}) rotateX(${calendarRotateX}deg) translateY(${floatingY}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Calendar card */}
        <div
          style={{
            width: '400px',
            backgroundColor: COLORS.surface,
            borderRadius: '24px',
            boxShadow: `0 20px ${shadowBlur}px rgba(0, 0, 0, 0.15)`,
            overflow: 'hidden',
            border: `4px solid ${COLORS.accent}`,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative', // For background grid
            filter: `blur(${calendarBlur}px)`,
          }}
        >
          {/* Background Grid Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(${COLORS.textSecondary} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: `${bgPos}px ${bgPos}px`,
              opacity: 0.1,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Sheen Effect */}
          {!prefersReducedMotion && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sheenLeft}%`,
                width: '60%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-20deg)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Calendar header */}
          <div
            style={{
              backgroundColor: COLORS.accent,
              padding: SPACING[6],
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.primary,
                fontSize: '24px',
                fontWeight: 700,
                color: COLORS.surface,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {monthName}
            </p>
          </div>

          {/* Day number container */}
          <div
            style={{
              padding: `${SPACING[12]} ${SPACING[8]}`,
              textAlign: 'center',
              backgroundColor: 'transparent', // Make transparent to show grid
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {/* Highlight Ring */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
               {/* Ripple Effect */}
               <div
                 style={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: `translate(-50%, -50%) scale(${rippleScale})`,
                   width: '170px',
                   height: '170px',
                   borderRadius: '50%',
                   border: `2px solid ${COLORS.accent}`,
                   opacity: rippleOpacity,
                 }}
               />

               <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                style={{
                  transform: `rotate(-90deg) scale(${ringScale})`, // Add scale pulse
                  pointerEvents: 'none',
                }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke={COLORS.accent}
                  strokeWidth="4"
                  strokeDasharray={534} // 2 * PI * 85 ≈ 534
                  strokeDashoffset={534 * (1 - ringProgress)}
                  strokeLinecap="round"
                  opacity={0.3}
                />
              </svg>
            </div>

            <div style={{ transform: `scale(${dayNumberScale})`, filter: `blur(${dayNumberBlur}px)` }}>
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '120px',
                  fontWeight: 700,
                  color: COLORS.text,
                  margin: 0,
                  lineHeight: 1,
                  textShadow: '0 4px 12px rgba(0,0,0,0.1)', // Added text shadow
                }}
              >
                {dayNumber}
              </p>
            </div>
            <p
              style={{
                fontFamily: FONTS.primary,
                fontSize: '28px',
                fontWeight: 500,
                color: COLORS.textSecondary,
                margin: 0,
                marginTop: SPACING[2],
              }}
            >
              {dayName}
            </p>
            <p
              style={{
                fontFamily: FONTS.primary,
                fontSize: '20px',
                fontWeight: 400,
                color: COLORS.textSecondary,
                margin: 0,
                marginTop: SPACING[1],
              }}
            >
              {year}
            </p>
          </div>

          {/* Time */}
          <div
            style={{
              backgroundColor: COLORS.background,
              padding: SPACING[6],
              textAlign: 'center',
              borderTop: `2px solid ${COLORS.accent}`,
              transform: `translateY(${timeSlide}px)`,
              opacity: timeOpacity,
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.primary,
                fontSize: '32px',
                fontWeight: 600,
                color: COLORS.primary,
                margin: 0,
              }}
            >
              {appointmentTime}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{ marginTop: SPACING[12], display: 'flex', gap: '0.4em', justifyContent: 'center' }}>
        {words.map((word, i) => {
          const delay = 35 + i * 3;
          const wordOpacity = prefersReducedMotion ? 1 : spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 1,
            durationInFrames: 20,
          });
          const wordY = prefersReducedMotion ? 0 : spring({
            frame: frame - delay,
            fps,
            from: 10,
            to: 0,
            durationInFrames: 20,
          });

          return (
            <span
              key={i}
              style={{
                fontFamily: FONTS.primary,
                fontSize: '36px',
                fontWeight: 600,
                color: COLORS.text,
                margin: 0,
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
  );
};
