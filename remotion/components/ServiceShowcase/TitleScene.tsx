/**
 * Title scene for Service Showcase video.
 * Displays doctor name and tagline with animated entrance.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn } from '../../utils/animations';

interface TitleSceneProps {
  doctorName: string;
  tagline: string;
}

export const TitleScene: React.FC<TitleSceneProps> = ({
  doctorName,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineOpacity = fadeIn({ frame, fps, delay: 0 });
  const lineScale = scaleIn({ frame, fps, delay: 0, from: 0 });
  const nameOpacity = fadeIn({ frame, fps, delay: 10 });
  const nameY = slideIn({ frame, fps, delay: 10, direction: 'up' });
  const taglineOpacity = fadeIn({ frame, fps, delay: 25 });
  const taglineY = slideIn({ frame, fps, delay: 25, direction: 'up' });
  const subtextOpacity = fadeIn({ frame, fps, delay: 40 });

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
      {/* Decorative line */}
      <div
        style={{
          width: `${lineScale * 120}px`,
          height: '4px',
          backgroundColor: COLORS.accent,
          borderRadius: '2px',
          opacity: lineOpacity,
          marginBottom: SPACING[8],
        }}
      />

      {/* Doctor name */}
      <h1
        style={{
          fontFamily: FONTS.primary,
          fontSize: '72px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          textAlign: 'center',
          letterSpacing: '-1px',
        }}
      >
        {doctorName}
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '36px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.85)',
          margin: 0,
          marginTop: SPACING[4],
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: 'center',
        }}
      >
        {tagline}
      </p>

      {/* Subtext */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '24px',
          fontWeight: 500,
          color: COLORS.accent,
          margin: 0,
          marginTop: SPACING[10],
          opacity: subtextOpacity,
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        Our Services
      </p>
    </div>
  );
};
