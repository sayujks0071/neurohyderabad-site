import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../utils/colorTokens';
import { PrepStepItem } from './PrepStepItem';
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
        {prepSteps.map((step, index) => (
          <PrepStepItem
            key={step.step}
            step={step}
            delay={30 + index * 50}
          />
        ))}
      </div>
    </div>
  );
};
