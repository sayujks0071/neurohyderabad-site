import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';

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

  // Parse the date
  const date = new Date(appointmentDate + 'T00:00:00');
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const dayNumber = date.getDate();
  const year = date.getFullYear();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  // 1. Main Card Entrance (Pop in)
  const calendarScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    durationInFrames: 25,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const calendarOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  // 2. Day Number Pop (Staggered)
  const dayNumberScale = spring({
    frame: frame - 15,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
    config: {
      damping: 10,
      stiffness: 120,
    },
  });

  // 3. Highlight Ring Animation
  const ringProgress = spring({
    frame: frame - 20,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 40,
    config: { damping: 100 },
  });

  // 4. Time Section Slide Up (Staggered)
  const timeSlide = spring({
    frame: frame - 25,
    fps,
    from: 50,
    to: 0,
    durationInFrames: 25,
    config: { damping: 15 },
  });

  const timeOpacity = spring({
    frame: frame - 25,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  // 5. Bottom Text Animation
  const textOpacity = spring({
    frame: frame - 35,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 25,
  });

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
      }}
    >
      <div style={{ opacity: calendarOpacity, transform: `scale(${calendarScale})` }}>
        {/* Calendar card */}
        <div
          style={{
            width: '400px',
            backgroundColor: COLORS.surface,
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            border: `4px solid ${COLORS.accent}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
              backgroundColor: COLORS.surface,
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Highlight Ring */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-90deg)',
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

            <div style={{ transform: `scale(${dayNumberScale})` }}>
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '120px',
                  fontWeight: 700,
                  color: COLORS.text,
                  margin: 0,
                  lineHeight: 1,
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
              zIndex: 0,
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
      <div style={{ opacity: textOpacity, marginTop: SPACING[12] }}>
        <p
          style={{
            fontFamily: FONTS.primary,
            fontSize: '36px',
            fontWeight: 600,
            color: COLORS.text,
            margin: 0,
            textAlign: 'center',
          }}
        >
          Your Appointment is Scheduled
        </p>
      </div>
    </div>
  );
};
