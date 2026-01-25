import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import type { ConsultationPrepProps } from '../../types/ConsultationPrepProps';

export interface PrepStepsSceneProps {
  surgeryType: string;
  prepSteps: ConsultationPrepProps['prepSteps'];
}

export const PrepStepsScene: React.FC<PrepStepsSceneProps> = ({ surgeryType, prepSteps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  const titleY = spring({
    frame,
    fps,
    from: -30,
    to: 0,
    durationInFrames: 25,
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.surface,
        display: 'flex',
        flexDirection: 'column',
        padding: SPACING[16],
        paddingTop: SPACING[12],
      }}
    >
      {/* Title */}
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <h2
          style={{
            fontFamily: FONTS.primary,
            fontSize: '48px',
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            marginBottom: SPACING[2],
            textAlign: 'center',
          }}
        >
          Preparing for Your {surgeryType}
        </h2>
        <p
          style={{
            fontFamily: FONTS.primary,
            fontSize: '24px',
            fontWeight: 400,
            color: COLORS.textSecondary,
            margin: 0,
            marginBottom: SPACING[12],
            textAlign: 'center',
          }}
        >
          Follow these important steps:
        </p>
      </div>

      {/* Prep steps */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[8],
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {prepSteps.map((step, index) => {
          // Stagger each step's entrance
          const stepDelay = 30 + index * 50; // 30, 80, 130 frames

          const stepOpacity = spring({
            frame: frame - stepDelay,
            fps,
            from: 0,
            to: 1,
            durationInFrames: 30,
          });

          const stepX = spring({
            frame: frame - stepDelay,
            fps,
            from: -50,
            to: 0,
            durationInFrames: 35,
            config: {
              damping: 15,
            },
          });

          // Checkmark animation
          const checkmarkScale = spring({
            frame: frame - stepDelay - 10,
            fps,
            from: 0,
            to: 1,
            durationInFrames: 25,
            config: {
              damping: 10,
            },
          });

          return (
            <div
              key={step.step}
              style={{
                opacity: stepOpacity,
                transform: `translateX(${stepX}px)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: SPACING[6],
                backgroundColor: COLORS.background,
                padding: SPACING[8],
                borderRadius: '16px',
                border: `3px solid ${COLORS.accent}`,
              }}
            >
              {/* Checkmark icon */}
              <div
                style={{
                  transform: `scale(${checkmarkScale})`,
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: COLORS.success,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginTop: '2px' }}
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke={COLORS.surface}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: '32px',
                    fontWeight: 700,
                    color: COLORS.text,
                    margin: 0,
                    marginBottom: SPACING[2],
                  }}
                >
                  {step.step}. {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: '24px',
                    fontWeight: 400,
                    color: COLORS.textSecondary,
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
