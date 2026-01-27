/**
 * Brand watermark / logo overlay for all Remotion compositions.
 * Displays "www.drsayuj.info" in a subtle, branded manner.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FONTS, COLORS } from '../../utils/colorTokens';
import { fadeIn } from '../../utils/animations';

interface BrandWatermarkProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  variant?: 'light' | 'dark';
}

export const BrandWatermark: React.FC<BrandWatermarkProps> = ({
  position = 'bottom-right',
  delay = 10,
  variant = 'light',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn({ frame, fps, delay }) * 0.7;

  const posStyle: React.CSSProperties = {};
  if (position.includes('top')) posStyle.top = '32px';
  if (position.includes('bottom')) posStyle.bottom = '32px';
  if (position.includes('left')) posStyle.left = '40px';
  if (position.includes('right')) posStyle.right = '40px';

  const textColor =
    variant === 'light'
      ? 'rgba(255,255,255,0.85)'
      : 'rgba(0,0,0,0.5)';

  return (
    <div
      style={{
        position: 'absolute',
        ...posStyle,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 50,
      }}
    >
      {/* Pill badge */}
      <div
        style={{
          backgroundColor:
            variant === 'light'
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(0,94,184,0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '10px 24px',
          border: `1px solid ${
            variant === 'light'
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(0,94,184,0.15)'
          }`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: '20px',
            fontWeight: 600,
            color: textColor,
            letterSpacing: '0.5px',
          }}
        >
          www.drsayuj.info
        </span>
      </div>
    </div>
  );
};
