/**
 * Service Showcase Video (45 seconds @ 30fps = 1350 frames)
 *
 * Animated showcase of Dr. Sayuj's key neurosurgical services with
 * smooth transitions between service cards on a dark professional background.
 *
 * Scene breakdown:
 * - Frames 0-180 (6s): Title scene with doctor name and tagline
 * - Frames 180-450 (9s): Service 1 — Endoscopic Spine Surgery
 * - Frames 450-720 (9s): Service 2 — Brain Tumor Surgery
 * - Frames 720-990 (9s): Service 3 — Epilepsy / Functional Neurosurgery
 * - Frames 990-1350 (12s): Service 4 — ROSA Robotic DBS + closing CTA
 */
import { AbsoluteFill, Sequence } from 'remotion';
import type { ServiceShowcaseProps } from '../types/ServiceShowcaseProps';
import { GradientBackground } from '../components/shared/GradientBackground';
import { BrandWatermark } from '../components/shared/BrandWatermark';
import { TitleScene } from '../components/ServiceShowcase/TitleScene';
import { ServiceCardScene } from '../components/ServiceShowcase/ServiceCardScene';

const DEFAULT_SERVICES = [
  { title: 'Endoscopic Spine Surgery', subtitle: 'Same-day discharge MISS', icon: '\u{1F9B4}', highlights: ['6-8mm incision', '80% same-day discharge', '1-3 week recovery', '1,000+ procedures'], color: '#00A3E0' },
  { title: 'Brain Tumor Surgery', subtitle: 'Neuronavigation-guided microsurgery', icon: '\u{1F9E0}', highlights: ['Awake craniotomy', 'Brain mapping', 'Neuronavigation', 'Skull-base approaches'], color: '#2E7D32' },
  { title: 'Epilepsy Surgery', subtitle: 'Drug-resistant epilepsy treatment', icon: '\u26A1', highlights: ['Video-EEG & SEEG', 'Laser ablation', 'Temporal lobectomy', 'VNS'], color: '#FF9800' },
  { title: 'ROSA Robotic DBS', subtitle: 'Robotic deep brain stimulation', icon: '\u{1F916}', highlights: ['Sub-mm accuracy', 'Movement disorders', 'Reduced operative time', 'Enhanced safety'], color: '#9C27B0' },
];
const DEFAULT_DOCTOR_NAME = 'Dr. Sayuj Krishnan';
const DEFAULT_TAGLINE = 'German-Trained Neurosurgeon in Hyderabad';

export const ServiceShowcaseVideo: React.FC<ServiceShowcaseProps> = ({
  services = DEFAULT_SERVICES,
  doctorName = DEFAULT_DOCTOR_NAME,
  tagline = DEFAULT_TAGLINE,
}) => {
  const sceneDuration = 270; // 9 seconds per service

  return (
    <AbsoluteFill>
      <GradientBackground preset="dark-professional" animated>
        {/* Title scene */}
        <Sequence from={0} durationInFrames={180}>
          <TitleScene doctorName={doctorName} tagline={tagline} />
        </Sequence>

        {/* Service cards */}
        {services.map((service, index) => (
          <Sequence
            key={index}
            from={180 + index * sceneDuration}
            durationInFrames={sceneDuration}
          >
            <ServiceCardScene {...service} index={index} />
          </Sequence>
        ))}

        <BrandWatermark position="bottom-right" delay={15} variant="light" />
      </GradientBackground>
    </AbsoluteFill>
  );
};
