import { AbsoluteFill, Sequence } from 'remotion';
import type { ConsultationPrepProps } from '../types/ConsultationPrepProps';
import { WelcomeScene } from '../components/ConsultationPrep/WelcomeScene';
import { CalendarScene } from '../components/ConsultationPrep/CalendarScene';
import { PrepStepsScene } from '../components/ConsultationPrep/PrepStepsScene';
import { TransitionFlash } from '../components/shared/TransitionFlash';
import { TransitionContainer } from '../components/shared/TransitionContainer';

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
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Scene 1: Welcome (6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <TransitionContainer
          exit="slideUpFade"
          exitStartFrame={150}
          exitDuration={30}
        >
          <WelcomeScene patientName={patientName} />
        </TransitionContainer>
      </Sequence>

      {/* Scene 2: Calendar (9 seconds + 1s overlap) */}
      <Sequence from={150} durationInFrames={300}>
        <TransitionContainer
          entrance="slideUpFade"
          entranceDuration={20}
          exit="slideUpFade"
          exitStartFrame={270}
          exitDuration={30}
        >
          <CalendarScene
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
          />
        </TransitionContainer>
      </Sequence>

      {/* Scene 3: Prep Steps (15 seconds + 1s overlap) */}
      <Sequence from={420} durationInFrames={480}>
        <TransitionContainer
          entrance="slideUpFade"
          entranceDuration={20}
        >
          <PrepStepsScene
            surgeryType={surgeryType}
            prepSteps={prepSteps}
          />
        </TransitionContainer>
      </Sequence>

      {/* Transition Flashes (Placed on top) */}
      <TransitionFlash startFrame={165} />
      <TransitionFlash startFrame={435} />
    </AbsoluteFill>
  );
};
