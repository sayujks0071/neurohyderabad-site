/**
 * Key point scene — displays a single takeaway from the blog article.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn } from '../../utils/animations';

interface KeyPointSceneProps {
  heading: string;
  body: string;
  icon: string;
  pointNumber: number;
  totalPoints: number;
}

export const KeyPointScene: React.FC<KeyPointSceneProps> = ({
  heading,
  body,
  icon,
  pointNumber,
  totalPoints,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconScale = scaleIn({ frame, fps, delay: 0, from: 0 });
  const iconOpacity = fadeIn({ frame, fps, delay: 0 });
  const headingOpacity = fadeIn({ frame, fps, delay: 12 });
  const headingY = slideIn({ frame, fps, delay: 12, direction: 'up' });
  const bodyOpacity = fadeIn({ frame, fps, delay: 25 });
  const bodyY = slideIn({ frame, fps, delay: 25, direction: 'up' });
  const progressOpacity = fadeIn({ frame, fps, delay: 35 });

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
      {/* Icon */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          fontSize: '100px',
          marginBottom: SPACING[8],
        }}
      >
        {icon}
      </div>

      {/* Point number */}
      <div
        style={{
          opacity: headingOpacity,
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '8px 24px',
          marginBottom: SPACING[6],
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '18px',
            fontWeight: 700,
            color: COLORS.accent,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Key Point {pointNumber} of {totalPoints}
        </span>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontFamily: FONTS.primary,
          fontSize: '52px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
          maxWidth: '1100px',
        }}
      >
        {heading}
      </h2>

      {/* Body */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '28px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
          marginTop: SPACING[6],
          opacity: bodyOpacity,
          transform: `translateY(${bodyY}px)`,
          textAlign: 'center',
          maxWidth: '900px',
          lineHeight: 1.5,
        }}
      >
        {body}
      </p>

      {/* Progress dots */}
      <div
        style={{
          opacity: progressOpacity,
          display: 'flex',
          gap: SPACING[3],
          marginTop: SPACING[12],
        }}
      >
        {Array.from({ length: totalPoints }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i + 1 === pointNumber ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor:
                i + 1 === pointNumber ? COLORS.accent : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};
