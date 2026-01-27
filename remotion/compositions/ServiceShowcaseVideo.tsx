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

export const ServiceShowcaseVideo: React.FC<ServiceShowcaseProps> = ({
  services,
  doctorName,
  tagline,
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
