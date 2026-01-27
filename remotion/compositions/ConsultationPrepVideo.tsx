import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
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

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Scene 1: Welcome (6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <WelcomeScene patientName={patientName} />
      </Sequence>

      {/* Scene 2: Calendar (9 seconds + 1s overlap) */}
      <Sequence from={150} durationInFrames={300}>
        <AbsoluteFill style={{ opacity: interpolate(frame, [150, 180], [0, 1]) }}>
          <CalendarScene
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Prep Steps (15 seconds + 1s overlap) */}
      <Sequence from={420} durationInFrames={480}>
        <AbsoluteFill style={{ opacity: interpolate(frame, [420, 450], [0, 1]) }}>
          <PrepStepsScene
            surgeryType={surgeryType}
            prepSteps={prepSteps}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
