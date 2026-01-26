/**
 * Service card scene — displays one service with animated highlights.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn, staggerDelay } from '../../utils/animations';

interface ServiceCardSceneProps {
  title: string;
  subtitle: string;
  icon: string;
  highlights: string[];
  color: string;
  index: number;
}

export const ServiceCardScene: React.FC<ServiceCardSceneProps> = ({
  title,
  subtitle,
  icon,
  highlights,
  color,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance
  const cardOpacity = fadeIn({ frame, fps, delay: 0 });
  const cardScale = scaleIn({ frame, fps, delay: 0, from: 0.85 });

  // Title entrance
  const titleOpacity = fadeIn({ frame, fps, delay: 12 });
  const titleY = slideIn({ frame, fps, delay: 12, direction: 'up' });

  // Subtitle entrance
  const subtitleOpacity = fadeIn({ frame, fps, delay: 22 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING[16],
      }}
    >
      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          width: '85%',
          maxWidth: '1400px',
          display: 'flex',
          gap: SPACING[16],
          alignItems: 'center',
        }}
      >
        {/* Icon area */}
        <div
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '32px',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 20px 60px ${color}40`,
          }}
        >
          <span style={{ fontSize: '120px' }}>{icon}</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* Service number badge */}
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '20px',
              padding: '6px 20px',
              marginBottom: SPACING[4],
              opacity: titleOpacity,
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
              Service {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: FONTS.primary,
              fontSize: '56px',
              fontWeight: 800,
              color: COLORS.surface,
              margin: 0,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: FONTS.primary,
              fontSize: '26px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.75)',
              margin: 0,
              marginTop: SPACING[3],
              opacity: subtitleOpacity,
            }}
          >
            {subtitle}
          </p>

          {/* Highlights */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING[3],
              marginTop: SPACING[8],
            }}
          >
            {highlights.map((highlight, i) => {
              const delay = staggerDelay(i, 30, 12);
              const hOpacity = fadeIn({ frame, fps, delay });
              const hX = slideIn({
                frame,
                fps,
                delay,
                direction: 'left',
                distance: 30,
              });

              return (
                <div
                  key={i}
                  style={{
                    opacity: hOpacity,
                    transform: `translateX(${hX}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING[3],
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: '24px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    {highlight}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
