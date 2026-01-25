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

  // Spring animations for entrance
  const calendarScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    durationInFrames: 40,
    config: {
      damping: 12,
    },
  });

  const calendarOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  // Delayed text animation
  const textOpacity = spring({
    frame: frame - 20, // Start 20 frames later
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
          }}
        >
          {/* Calendar header */}
          <div
            style={{
              backgroundColor: COLORS.accent,
              padding: SPACING[6],
              textAlign: 'center',
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

          {/* Day number */}
          <div
            style={{
              padding: `${SPACING[12]} ${SPACING[8]}`,
              textAlign: 'center',
              backgroundColor: COLORS.surface,
            }}
          >
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
