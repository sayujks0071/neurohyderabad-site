import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import type { ConsultationPrepProps } from '../types/ConsultationPrepProps';
import { WelcomeScene } from '../components/ConsultationPrep/WelcomeScene';
import { CalendarScene } from '../components/ConsultationPrep/CalendarScene';
import { PrepStepsScene } from '../components/ConsultationPrep/PrepStepsScene';
import { TransitionFlash } from '../components/shared/TransitionFlash';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Personalized Consultation Prep Video (30 seconds @ 30fps = 900 frames)
 *
 * Scene breakdown:
 * - Frames 0-180 (6s): Welcome Scene - Patient greeting
 * - Frames 150-450 (10s): Calendar Scene - Appointment date visualization (starts with crossfade)
 * - Frames 420-900 (16s): Prep Steps Scene - 3 preparation steps (starts with crossfade)
 */
export const ConsultationPrepVideo: React.FC<ConsultationPrepProps> = ({
  patientName,
  surgeryType,
  appointmentDate,
  appointmentTime,
  prepSteps,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scene 1 Exit: Scale up (zoom in), fade out, and blur
  const scene1ExitOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene1ExitScale = prefersReducedMotion
    ? 1
    : interpolate(frame, [150, 180], [1, 1.05], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const scene1ExitBlur = prefersReducedMotion
    ? 0
    : interpolate(frame, [150, 180], [0, 10], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  // Scene 2 Entrance: Scale up (zoom out from back), fade in, and blur in
  const scene2EnterOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene2EnterScale = prefersReducedMotion
    ? 1
    : interpolate(frame, [150, 180], [0.95, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const scene2EnterBlur = prefersReducedMotion
    ? 0
    : interpolate(frame, [150, 180], [10, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  // Scene 2 Exit: Scale up (zoom in), fade out, and blur out
  const scene2ExitOpacity = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene2ExitScale = prefersReducedMotion
    ? 1
    : interpolate(frame, [420, 450], [1, 1.05], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const scene2ExitBlur = prefersReducedMotion
    ? 0
    : interpolate(frame, [420, 450], [0, 10], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  // Scene 3 Entrance: Scale up (zoom out from back), fade in, and blur in
  const scene3EnterOpacity = interpolate(frame, [420, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene3EnterScale = prefersReducedMotion
    ? 1
    : interpolate(frame, [420, 450], [0.95, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const scene3EnterBlur = prefersReducedMotion
    ? 0
    : interpolate(frame, [420, 450], [10, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Scene 1: Welcome (6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <AbsoluteFill
          style={{
            opacity: scene1ExitOpacity,
            transform: `scale(${scene1ExitScale})`,
            filter: `blur(${scene1ExitBlur}px)`,
          }}
        >
          <WelcomeScene patientName={patientName} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Calendar (9 seconds + 1s overlap) */}
      <Sequence from={150} durationInFrames={300}>
        <AbsoluteFill
          style={{
            opacity: scene2EnterOpacity * scene2ExitOpacity,
            transform: `scale(${scene2EnterScale * scene2ExitScale})`,
            filter: `blur(${Math.max(scene2EnterBlur, scene2ExitBlur)}px)`,
          }}
        >
          <CalendarScene
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Prep Steps (15 seconds + 1s overlap) */}
      <Sequence from={420} durationInFrames={480}>
        <AbsoluteFill
          style={{
            opacity: scene3EnterOpacity,
            transform: `scale(${scene3EnterScale})`,
            filter: `blur(${scene3EnterBlur}px)`,
          }}
        >
          <PrepStepsScene
            surgeryType={surgeryType}
            prepSteps={prepSteps}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Transition Flashes (Placed on top) */}
      <TransitionFlash startFrame={165} />
      <TransitionFlash startFrame={435} />
    </AbsoluteFill>
  );
};
