/**
 * Specializations scene — animated grid of the doctor's specialization areas.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn, staggerDelay } from '../../utils/animations';

interface SpecializationsSceneProps {
  specializations: string[];
  tagline: string;
}

const SPEC_ICONS = ['🔬', '🧠', '🦴', '💡', '🏥', '⚕️'];

export const SpecializationsScene: React.FC<SpecializationsSceneProps> = ({
  specializations,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = fadeIn({ frame, fps, delay: 5 });
  const headingY = slideIn({ frame, fps, delay: 5, direction: 'up' });
  const taglineOpacity = fadeIn({ frame, fps, delay: 60 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING[12],
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: FONTS.primary,
          fontSize: '48px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          marginBottom: SPACING[10],
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
        }}
      >
        Areas of Expertise
      </h2>

      {/* Specialization grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(specializations.length, 3)}, 1fr)`,
          gap: SPACING[6],
          maxWidth: '1400px',
          width: '90%',
        }}
      >
        {specializations.map((spec, i) => {
          const delay = staggerDelay(i, 15, 12);
          const cardOpacity = fadeIn({ frame, fps, delay });
          const cardScale = scaleIn({ frame, fps, delay, from: 0.8 });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: SPACING[6],
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: SPACING[3] }}>
                {SPEC_ICONS[i % SPEC_ICONS.length]}
              </div>
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '24px',
                  fontWeight: 600,
                  color: COLORS.surface,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {spec}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: FONTS.secondary,
          fontSize: '30px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          marginTop: SPACING[12],
          opacity: taglineOpacity,
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        "{tagline}"
      </p>
    </div>
  );
};
