/**
 * Testimonial card scene — displays a single patient testimonial with quote animation.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn, staggerDelay } from '../../utils/animations';

interface TestimonialCardSceneProps {
  quote: string;
  patientInitials: string;
  procedure: string;
  rating: number;
  recoveryHighlight: string;
  testimonialNumber: number;
  totalTestimonials: number;
}

export const TestimonialCardScene: React.FC<TestimonialCardSceneProps> = ({
  quote,
  patientInitials,
  procedure,
  rating,
  recoveryHighlight,
  testimonialNumber,
  totalTestimonials,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quote mark animation
  const quoteMarkScale = scaleIn({ frame, fps, delay: 0, from: 0 });
  const quoteMarkOpacity = fadeIn({ frame, fps, delay: 0 });

  // Quote text
  const quoteOpacity = fadeIn({ frame, fps, delay: 12 });
  const quoteY = slideIn({ frame, fps, delay: 12, direction: 'up' });

  // Patient info
  const infoOpacity = fadeIn({ frame, fps, delay: 30 });

  // Recovery highlight
  const highlightOpacity = fadeIn({ frame, fps, delay: 45 });
  const highlightScale = scaleIn({ frame, fps, delay: 45, from: 0.9 });

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
      {/* Large quote marks */}
      <div
        style={{
          opacity: quoteMarkOpacity * 0.3,
          transform: `scale(${quoteMarkScale})`,
          position: 'absolute',
          top: '120px',
          left: '140px',
        }}
      >
        <svg width="120" height="100" viewBox="0 0 120 100" fill={COLORS.accent}>
          <text x="0" y="90" fontSize="150" fontFamily={FONTS.secondary} fontWeight="700">
            &ldquo;
          </text>
        </svg>
      </div>

      {/* Quote text */}
      <p
        style={{
          fontFamily: FONTS.secondary,
          fontSize: '42px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: COLORS.surface,
          margin: 0,
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          textAlign: 'center',
          maxWidth: '1100px',
          lineHeight: 1.5,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Patient info */}
      <div
        style={{
          opacity: infoOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: SPACING[4],
          marginTop: SPACING[10],
        }}
      >
        {/* Avatar circle */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.primary,
              fontSize: '24px',
              fontWeight: 700,
              color: COLORS.surface,
            }}
          >
            {patientInitials}
          </span>
        </div>

        <div>
          <p
            style={{
              fontFamily: FONTS.primary,
              fontSize: '22px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
            }}
          >
            Patient — {procedure}
          </p>

          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={i < rating ? '#FFB800' : 'rgba(255,255,255,0.2)'}
                />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery highlight pill */}
      <div
        style={{
          opacity: highlightOpacity,
          transform: `scale(${highlightScale})`,
          marginTop: SPACING[8],
          backgroundColor: `${COLORS.success}25`,
          borderRadius: '30px',
          padding: '12px 32px',
          border: `2px solid ${COLORS.success}50`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '22px',
            fontWeight: 600,
            color: COLORS.success,
          }}
        >
          {recoveryHighlight}
        </span>
      </div>

      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          display: 'flex',
          gap: SPACING[3],
          opacity: fadeIn({ frame, fps, delay: 50 }),
        }}
      >
        {Array.from({ length: totalTestimonials }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i + 1 === testimonialNumber ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor:
                i + 1 === testimonialNumber ? COLORS.accent : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
