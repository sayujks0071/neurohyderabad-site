import { AbsoluteFill, Sequence } from 'remotion';
import type { ConsultationPrepProps } from '../types/ConsultationPrepProps';
import { WelcomeScene } from '../components/ConsultationPrep/WelcomeScene';
import { CalendarScene } from '../components/ConsultationPrep/CalendarScene';
import { PrepStepsScene } from '../components/ConsultationPrep/PrepStepsScene';

/**
 * Personalized Consultation Prep Video (30 seconds @ 30fps = 900 frames)
 *
 * Scene breakdown:
 * - Frames 0-180 (6s): Welcome Scene - Patient greeting
 * - Frames 181-450 (9s): Calendar Scene - Appointment date visualization
 * - Frames 451-900 (15s): Prep Steps Scene - 3 preparation steps
 */
export const ConsultationPrepVideo: React.FC<ConsultationPrepProps> = ({
  patientName,
  surgeryType,
  appointmentDate,
  appointmentTime,
  prepSteps,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Scene 1: Welcome (6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <WelcomeScene patientName={patientName} />
      </Sequence>

      {/* Scene 2: Calendar (9 seconds) */}
      <Sequence from={180} durationInFrames={270}>
        <CalendarScene
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
        />
      </Sequence>

      {/* Scene 3: Prep Steps (15 seconds) */}
      <Sequence from={450} durationInFrames={450}>
        <PrepStepsScene
          surgeryType={surgeryType}
          prepSteps={prepSteps}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
