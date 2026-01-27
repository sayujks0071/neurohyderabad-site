/**
 * Reusable gradient background component for Remotion compositions.
 * Provides consistent brand-aligned backgrounds with optional animated patterns.
 */
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../../utils/colorTokens';

export type GradientPreset =
  | 'clinical-blue'
  | 'vitality-cyan'
  | 'surgical-teal'
  | 'warm-trust'
  | 'dark-professional'
  | 'light-clean';

const GRADIENTS: Record<GradientPreset, string> = {
  'clinical-blue': `linear-gradient(135deg, ${COLORS.primary} 0%, #003A70 50%, #001F3F 100%)`,
  'vitality-cyan': `linear-gradient(135deg, ${COLORS.accent} 0%, #0077B6 60%, ${COLORS.primary} 100%)`,
  'surgical-teal': `linear-gradient(135deg, ${COLORS.secondary} 0%, #00796B 60%, #004D40 100%)`,
  'warm-trust': `linear-gradient(135deg, #1A237E 0%, ${COLORS.primary} 50%, ${COLORS.accent} 100%)`,
  'dark-professional': `linear-gradient(135deg, #0D1B2A 0%, #1B2838 50%, #1A3A5C 100%)`,
  'light-clean': `linear-gradient(135deg, #F8FAFC 0%, #E8EFF5 50%, ${COLORS.background} 100%)`,
};

interface GradientBackgroundProps {
  preset: GradientPreset;
  children: React.ReactNode;
  animated?: boolean;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  preset,
  children,
  animated = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle animated glow effect
  const glowX = animated ? 50 + Math.sin(frame / (fps * 0.8)) * 15 : 50;
  const glowY = animated ? 50 + Math.cos(frame / (fps * 0.6)) * 10 : 50;

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS[preset],
        overflow: 'hidden',
      }}
    >
      {animated && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};
