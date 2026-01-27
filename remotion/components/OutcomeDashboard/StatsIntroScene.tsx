/**
 * Intro scene for the Outcome Dashboard video.
 * Shows the doctor info and "By the Numbers" heading.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn } from '../../utils/animations';

interface StatsIntroSceneProps {
  doctorName: string;
  specialty: string;
  hospitalName: string;
}

export const StatsIntroScene: React.FC<StatsIntroSceneProps> = ({
  doctorName,
  specialty,
  hospitalName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillOpacity = fadeIn({ frame, fps, delay: 5 });
  const pillScale = scaleIn({ frame, fps, delay: 5, from: 0.8 });
  const headingOpacity = fadeIn({ frame, fps, delay: 15 });
  const headingY = slideIn({ frame, fps, delay: 15, direction: 'up' });
  const subtitleOpacity = fadeIn({ frame, fps, delay: 30 });
  const lineScale = scaleIn({ frame, fps, delay: 40, from: 0 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING[16],
      }}
    >
      {/* Hospital pill */}
      <div
        style={{
          opacity: pillOpacity,
          transform: `scale(${pillScale})`,
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: '30px',
          padding: '12px 32px',
          marginBottom: SPACING[8],
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '22px',
            fontWeight: 600,
            color: COLORS.accent,
            letterSpacing: '1px',
          }}
        >
          {hospitalName}
        </span>
      </div>

      {/* Main heading */}
      <h1
        style={{
          fontFamily: FONTS.primary,
          fontSize: '80px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
          letterSpacing: '-1px',
        }}
      >
        {doctorName}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '32px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
          marginTop: SPACING[3],
          opacity: subtitleOpacity,
          textAlign: 'center',
        }}
      >
        {specialty}
      </p>

      {/* Divider line */}
      <div
        style={{
          width: `${lineScale * 200}px`,
          height: '3px',
          backgroundColor: COLORS.accent,
          borderRadius: '2px',
          marginTop: SPACING[10],
        }}
      />

      {/* "By The Numbers" */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '28px',
          fontWeight: 700,
          color: COLORS.accent,
          margin: 0,
          marginTop: SPACING[6],
          opacity: fadeIn({ frame, fps, delay: 50 }),
          letterSpacing: '4px',
          textTransform: 'uppercase',
        }}
      >
        By The Numbers
      </p>
    </div>
  );
};
