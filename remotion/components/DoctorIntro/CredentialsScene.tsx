/**
 * Credentials scene — animated list of doctor qualifications and specializations.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn, staggerDelay } from '../../utils/animations';

interface CredentialsSceneProps {
  credentials: string[];
  experience: string;
  procedures: string;
}

export const CredentialsScene: React.FC<CredentialsSceneProps> = ({
  credentials,
  experience,
  procedures,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = fadeIn({ frame, fps, delay: 5 });
  const headingY = slideIn({ frame, fps, delay: 5, direction: 'up' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: SPACING[12],
        gap: SPACING[12],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Left: Credentials list */}
      <div style={{ flex: 1, maxWidth: '750px' }}>
        <h2
          style={{
            fontFamily: FONTS.primary,
            fontSize: '44px',
            fontWeight: 800,
            color: COLORS.surface,
            margin: 0,
            marginBottom: SPACING[8],
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          Qualifications
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[5] }}>
          {credentials.map((cred, i) => {
            const delay = staggerDelay(i, 15, 15);
            const credOpacity = fadeIn({ frame, fps, delay });
            const credX = slideIn({ frame, fps, delay, direction: 'left', distance: 40 });
            const checkScale = scaleIn({ frame, fps, delay: delay + 5, from: 0 });

            return (
              <div
                key={i}
                style={{
                  opacity: credOpacity,
                  transform: `translateX(${credX}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING[4],
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: `${SPACING[4]} ${SPACING[6]}`,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Check circle */}
                <div
                  style={{
                    transform: `scale(${checkScale})`,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: COLORS.success,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke={COLORS.surface}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: '24px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  {cred}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Stats */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[8],
          alignItems: 'center',
        }}
      >
        {[
          { value: experience, label: 'Experience' },
          { value: procedures, label: 'Procedures' },
        ].map((stat, i) => {
          const delay = staggerDelay(i, 30, 20);
          const statOpacity = fadeIn({ frame, fps, delay });
          const statScale = scaleIn({ frame, fps, delay, from: 0.7 });

          return (
            <div
              key={i}
              style={{
                opacity: statOpacity,
                transform: `scale(${statScale})`,
                width: '280px',
                backgroundColor: 'rgba(0,163,224,0.15)',
                borderRadius: '24px',
                padding: SPACING[8],
                textAlign: 'center',
                border: `2px solid ${COLORS.accent}40`,
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '52px',
                  fontWeight: 800,
                  color: COLORS.accent,
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0,
                  marginTop: SPACING[2],
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
