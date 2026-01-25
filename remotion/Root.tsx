import { Composition } from 'remotion';
import { ConsultationPrepVideo } from './compositions/ConsultationPrepVideo';
import type { ConsultationPrepProps } from './types/ConsultationPrepProps';

/**
 * Remotion Root file
 * Registers all available video compositions for rendering
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Template #1: Personalized Consultation Prep Video */}
      <Composition
        id="ConsultationPrep"
        component={ConsultationPrepVideo as any}
        durationInFrames={900} // 30 seconds @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          patientName: 'John Doe',
          surgeryType: 'Endoscopic Spine Surgery',
          appointmentDate: '2026-02-15',
          appointmentTime: '10:00 AM',
          prepSteps: [
            {
              step: 1,
              title: 'Fast 6 hours before surgery',
              description: 'No food or water after midnight before your procedure',
            },
            {
              step: 2,
              title: 'Bring your MRI scans',
              description: 'Physical copies of recent MRI/CT scans are required',
            },
            {
              step: 3,
              title: 'Arrive 15 minutes early',
              description: 'Complete pre-operative paperwork and consent forms',
            },
          ],
        } as ConsultationPrepProps}
      />

      {/* Future: Template #2 - Blog-to-Reel (deferred to Phase 2) */}
      {/* Future: Template #3 - Outcome Dashboard (deferred to Phase 2) */}
    </>
  );
};
