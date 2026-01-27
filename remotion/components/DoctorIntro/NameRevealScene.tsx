/**
 * Name reveal scene — dramatic entrance for the doctor's name and title.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn } from '../../utils/animations';

interface NameRevealSceneProps {
  name: string;
  title: string;
  hospital: string;
  location: string;
}

export const NameRevealScene: React.FC<NameRevealSceneProps> = ({
  name,
  title,
  hospital,
  location,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stethoscope icon
  const iconScale = scaleIn({ frame, fps, delay: 0, from: 0 });
  const iconOpacity = fadeIn({ frame, fps, delay: 0 });

  // Name
  const nameOpacity = fadeIn({ frame, fps, delay: 15 });
  const nameY = slideIn({ frame, fps, delay: 15, direction: 'up' });

  // Title
  const titleOpacity = fadeIn({ frame, fps, delay: 28 });
  const titleY = slideIn({ frame, fps, delay: 28, direction: 'up' });

  // Divider
  const dividerScale = scaleIn({ frame, fps, delay: 40, from: 0 });

  // Hospital + Location
  const hospitalOpacity = fadeIn({ frame, fps, delay: 50 });
  const locationOpacity = fadeIn({ frame, fps, delay: 60 });

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
      {/* Medical cross icon */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          marginBottom: SPACING[8],
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="30" y="5" width="20" height="70" rx="4" fill={COLORS.accent} />
          <rect x="5" y="30" width="70" height="20" rx="4" fill={COLORS.accent} />
        </svg>
      </div>

      {/* Doctor name */}
      <h1
        style={{
          fontFamily: FONTS.primary,
          fontSize: '82px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          textAlign: 'center',
          letterSpacing: '-1px',
        }}
      >
        {name}
      </h1>

      {/* Title */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '36px',
          fontWeight: 500,
          color: COLORS.accent,
          margin: 0,
          marginTop: SPACING[3],
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
        }}
      >
        {title}
      </p>

      {/* Divider */}
      <div
        style={{
          width: `${dividerScale * 150}px`,
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          marginTop: SPACING[8],
          marginBottom: SPACING[6],
        }}
      />

      {/* Hospital */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '28px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.85)',
          margin: 0,
          opacity: hospitalOpacity,
          textAlign: 'center',
        }}
      >
        {hospital}
      </p>

      {/* Location */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '24px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          margin: 0,
          marginTop: SPACING[2],
          opacity: locationOpacity,
          textAlign: 'center',
        }}
      >
        {location}
      </p>
    </div>
  );
};
