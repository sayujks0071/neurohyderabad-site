/**
 * Rating intro scene — shows overall rating with animated stars.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn, animatedCounter, staggerDelay } from '../../utils/animations';

interface RatingIntroSceneProps {
  doctorName: string;
  overallRating: number;
  totalReviews: number;
}

export const RatingIntroScene: React.FC<RatingIntroSceneProps> = ({
  doctorName,
  overallRating,
  totalReviews,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = fadeIn({ frame, fps, delay: 5 });
  const headingY = slideIn({ frame, fps, delay: 5, direction: 'up' });
  const ratingOpacity = fadeIn({ frame, fps, delay: 20 });
  const ratingScale = scaleIn({ frame, fps, delay: 20, from: 0.5 });
  const reviewCount = animatedCounter({
    frame,
    fps,
    target: totalReviews,
    delay: 40,
    durationInFrames: 40,
  });
  const reviewOpacity = fadeIn({ frame, fps, delay: 40 });

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
      {/* Badge */}
      <div
        style={{
          opacity: fadeIn({ frame, fps, delay: 0 }),
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '10px 28px',
          marginBottom: SPACING[6],
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '20px',
            fontWeight: 700,
            color: COLORS.accent,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Patient Reviews
        </span>
      </div>

      {/* Doctor name */}
      <h1
        style={{
          fontFamily: FONTS.primary,
          fontSize: '64px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
        }}
      >
        {doctorName}
      </h1>

      {/* Star rating */}
      <div
        style={{
          opacity: ratingOpacity,
          transform: `scale(${ratingScale})`,
          display: 'flex',
          alignItems: 'center',
          gap: SPACING[4],
          marginTop: SPACING[8],
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '72px',
            fontWeight: 800,
            color: '#FFB800',
          }}
        >
          {overallRating.toFixed(1)}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const delay = staggerDelay(i, 30, 8);
            const starScale = scaleIn({ frame, fps, delay, from: 0 });

            return (
              <div
                key={i}
                style={{ transform: `scale(${starScale})` }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={i < Math.round(overallRating) ? '#FFB800' : 'rgba(255,255,255,0.2)'}
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review count */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '28px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          marginTop: SPACING[4],
          opacity: reviewOpacity,
        }}
      >
        Based on {reviewCount}+ verified patient reviews
      </p>
    </div>
  );
};
