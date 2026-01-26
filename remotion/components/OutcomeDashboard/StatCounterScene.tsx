/**
 * Animated statistic counter grid scene for the Outcome Dashboard.
 * Displays all stats with animated counting numbers and progress bars.
 */
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import {
  fadeIn,
  slideIn,
  scaleIn,
  animatedCounter,
  animatedProgress,
  staggerDelay,
} from '../../utils/animations';
import type { OutcomeDashboardProps } from '../../types/OutcomeDashboardProps';

interface StatCounterSceneProps {
  stats: OutcomeDashboardProps['stats'];
}

export const StatCounterScene: React.FC<StatCounterSceneProps> = ({
  stats,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING[12],
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(stats.length, 2)}, 1fr)`,
          gap: SPACING[10],
          maxWidth: '1400px',
          width: '90%',
        }}
      >
        {stats.map((stat, index) => {
          const delay = staggerDelay(index, 5, 20);
          const cardOpacity = fadeIn({ frame, fps, delay });
          const cardY = slideIn({ frame, fps, delay, direction: 'up', distance: 30 });
          const counterVal = animatedCounter({
            frame,
            fps,
            target: stat.value,
            delay: delay + 10,
            durationInFrames: 50,
          });
          const progress = animatedProgress({
            frame,
            fps,
            target: Math.min(stat.value, 100),
            delay: delay + 15,
            durationInFrames: 45,
          });

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: SPACING[10],
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Stat value */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  marginBottom: SPACING[3],
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: '80px',
                    fontWeight: 800,
                    color: stat.color,
                    lineHeight: 1,
                  }}
                >
                  {counterVal.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: '40px',
                    fontWeight: 700,
                    color: stat.color,
                  }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '28px',
                  fontWeight: 700,
                  color: COLORS.surface,
                  margin: 0,
                  marginBottom: SPACING[2],
                }}
              >
                {stat.label}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '20px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                  marginBottom: SPACING[4],
                  lineHeight: 1.4,
                }}
              >
                {stat.description}
              </p>

              {/* Progress bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: stat.color,
                    borderRadius: '3px',
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
