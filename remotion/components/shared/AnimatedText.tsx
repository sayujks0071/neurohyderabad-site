/**
 * Reusable animated text component with various entrance effects.
 */
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FONTS, FONT_SIZES, COLORS } from '../../utils/colorTokens';
import { fadeIn, slideIn } from '../../utils/animations';

interface AnimatedTextProps {
  text: string;
  fontSize?: keyof typeof FONT_SIZES;
  fontFamily?: keyof typeof FONTS;
  color?: string;
  fontWeight?: number;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  maxWidth?: string;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'capitalize';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = 'lg',
  fontFamily = 'primary',
  color = COLORS.surface,
  fontWeight = 600,
  delay = 0,
  direction = 'up',
  textAlign = 'center',
  lineHeight = 1.3,
  maxWidth,
  letterSpacing,
  textTransform = 'none',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn({ frame, fps, delay });
  const translate = slideIn({ frame, fps, delay, direction });

  const isVertical = direction === 'up' || direction === 'down';
  const transform = isVertical
    ? `translateY(${translate}px)`
    : `translateX(${translate}px)`;

  return (
    <div
      style={{
        opacity,
        transform,
        fontFamily: FONTS[fontFamily],
        fontSize: FONT_SIZES[fontSize],
        fontWeight,
        color,
        textAlign,
        lineHeight,
        maxWidth,
        letterSpacing,
        textTransform,
      }}
    >
      {text}
    </div>
  );
};
