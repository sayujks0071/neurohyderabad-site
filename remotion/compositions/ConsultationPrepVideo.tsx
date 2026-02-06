import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import type { ConsultationPrepProps } from '../types/ConsultationPrepProps';
import { WelcomeScene } from '../components/ConsultationPrep/WelcomeScene';
import { CalendarScene } from '../components/ConsultationPrep/CalendarScene';
import { PrepStepsScene } from '../components/ConsultationPrep/PrepStepsScene';

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

  // Scene 1 Exit: Push up and fade out
  const scene1ExitOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene1ExitY = interpolate(frame, [150, 180], [0, -50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene 2 Entrance: Spring up and fade in
  const scene2EnterSpring = spring({
    frame: frame - 150,
    fps,
    from: 50,
    to: 0,
    config: { damping: 15 },
  });
  const scene2EnterOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene 2 Exit: Push up and fade out
  const scene2ExitOpacity = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene2ExitY = interpolate(frame, [420, 450], [0, -50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene 3 Entrance: Spring up and fade in
  const scene3EnterSpring = spring({
    frame: frame - 420,
    fps,
    from: 50,
    to: 0,
    config: { damping: 15 },
  });
  const scene3EnterOpacity = interpolate(frame, [420, 440], [0, 1], {
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
            transform: `translateY(${scene1ExitY}px)`,
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
            transform: `translateY(${scene2EnterSpring + scene2ExitY}px)`,
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
            transform: `translateY(${scene3EnterSpring}px)`,
          }}
        >
          <PrepStepsScene
            surgeryType={surgeryType}
            prepSteps={prepSteps}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
