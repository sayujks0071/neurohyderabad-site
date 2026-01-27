/**
 * Hook scene — opening 'attention grabber' for blog-to-reel conversion.
 * Shows category badge, title, and reading metadata.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { fadeIn, slideIn, scaleIn } from '../../utils/animations';

interface HookSceneProps {
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
}

export const HookScene: React.FC<HookSceneProps> = ({
  title,
  subtitle,
  category,
  readTime,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeOpacity = fadeIn({ frame, fps, delay: 5 });
  const badgeScale = scaleIn({ frame, fps, delay: 5, from: 0.5 });
  const titleOpacity = fadeIn({ frame, fps, delay: 15 });
  const titleY = slideIn({ frame, fps, delay: 15, direction: 'up' });
  const subtitleOpacity = fadeIn({ frame, fps, delay: 30 });
  const subtitleY = slideIn({ frame, fps, delay: 30, direction: 'up' });
  const metaOpacity = fadeIn({ frame, fps, delay: 45 });

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
      {/* Category badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          backgroundColor: COLORS.accent,
          borderRadius: '24px',
          padding: '10px 28px',
          marginBottom: SPACING[8],
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '20px',
            fontWeight: 700,
            color: COLORS.surface,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {category}
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: FONTS.secondary,
          fontSize: '64px',
          fontWeight: 700,
          color: COLORS.surface,
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: '1200px',
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: FONTS.primary,
          fontSize: '30px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
          marginTop: SPACING[6],
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textAlign: 'center',
          maxWidth: '900px',
        }}
      >
        {subtitle}
      </p>

      {/* Read time */}
      <div
        style={{
          opacity: metaOpacity,
          marginTop: SPACING[10],
          display: 'flex',
          alignItems: 'center',
          gap: SPACING[4],
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '22px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {readTime} read
        </span>
      </div>
    </div>
  );
};
