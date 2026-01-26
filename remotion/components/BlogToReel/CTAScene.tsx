/**
 * Call-to-action scene for blog-to-reel videos.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn } from '../../utils/animations';

interface CTASceneProps {
  callToAction: string;
  authorName: string;
}

export const CTAScene: React.FC<CTASceneProps> = ({
  callToAction,
  authorName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaOpacity = fadeIn({ frame, fps, delay: 5 });
  const ctaScale = scaleIn({ frame, fps, delay: 5, from: 0.9 });
  const authorOpacity = fadeIn({ frame, fps, delay: 25 });
  const urlOpacity = fadeIn({ frame, fps, delay: 40 });
  const urlScale = scaleIn({ frame, fps, delay: 40, from: 0.8 });

  // Subtle pulse for the CTA button
  const pulse = 1 + Math.sin(frame / 8) * 0.015;

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
      {/* CTA text */}
      <h2
        style={{
          fontFamily: FONTS.primary,
          fontSize: '56px',
          fontWeight: 800,
          color: COLORS.surface,
          margin: 0,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          textAlign: 'center',
          maxWidth: '1000px',
          lineHeight: 1.3,
        }}
      >
        {callToAction}
      </h2>

      {/* Author */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '26px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          marginTop: SPACING[8],
          opacity: authorOpacity,
        }}
      >
        By {authorName}
      </p>

      {/* URL button */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `scale(${urlScale * pulse})`,
          marginTop: SPACING[12],
          backgroundColor: COLORS.accent,
          borderRadius: '40px',
          padding: '20px 48px',
          boxShadow: `0 10px 40px ${COLORS.accent}60`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '28px',
            fontWeight: 700,
            color: COLORS.surface,
            letterSpacing: '0.5px',
          }}
        >
          www.drsayuj.info/blog
        </span>
      </div>
    </div>
  );
};
