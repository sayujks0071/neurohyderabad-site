/**
 * Doctor Introduction Video (30 seconds @ 30fps = 900 frames)
 *
 * Professional animated introduction for Dr. Sayuj Krishnan,
 * showcasing credentials, experience, and specializations.
 *
 * Scene breakdown:
 * - Frames 0-270 (9s): Name reveal — dramatic doctor name entrance
 * - Frames 270-570 (10s): Credentials — qualifications & experience stats
 * - Frames 570-900 (11s): Specializations — expertise grid + tagline
 */
import { AbsoluteFill, Sequence } from 'remotion';
import type { DoctorIntroProps } from '../types/DoctorIntroProps';
import { GradientBackground } from '../components/shared/GradientBackground';
import { BrandWatermark } from '../components/shared/BrandWatermark';
import { NameRevealScene } from '../components/DoctorIntro/NameRevealScene';
import { CredentialsScene } from '../components/DoctorIntro/CredentialsScene';
import { SpecializationsScene } from '../components/DoctorIntro/SpecializationsScene';

const DEFAULT_CREDENTIALS = ['MBBS, DNB Neurosurgery', 'Fellowship \u2014 Minimally Invasive Spine Surgery', 'Observer-ship \u2014 Germany', 'AO Spine International', 'Neurological Society of India', 'Congress of Neurological Surgeons'];
const DEFAULT_SPECIALIZATIONS = ['Endoscopic Spine Surgery', 'Brain Tumor Surgery', 'Awake Craniotomy', 'ROSA Robotic DBS', 'Epilepsy Surgery', 'Spinal Fusion'];
const DEFAULT_NAME = 'Dr. Sayuj Krishnan S';
const DEFAULT_TITLE = 'German-Trained Neurosurgeon';
const DEFAULT_HOSPITAL = 'Yashoda Hospital';
const DEFAULT_LOCATION = 'Malakpet, Hyderabad';
const DEFAULT_EXPERIENCE = '9+ Years';
const DEFAULT_PROCEDURES = '1,000+';
const DEFAULT_TAGLINE = 'German precision with compassionate care.';

export const DoctorIntroVideo: React.FC<DoctorIntroProps> = ({
  name = DEFAULT_NAME,
  title = DEFAULT_TITLE,
  hospital = DEFAULT_HOSPITAL,
  location = DEFAULT_LOCATION,
  credentials = DEFAULT_CREDENTIALS,
  specializations = DEFAULT_SPECIALIZATIONS,
  experience = DEFAULT_EXPERIENCE,
  procedures = DEFAULT_PROCEDURES,
  tagline = DEFAULT_TAGLINE,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground preset="dark-professional" animated>
        {/* Scene 1: Name Reveal */}
        <Sequence from={0} durationInFrames={270}>
          <NameRevealScene
            name={name}
            title={title}
            hospital={hospital}
            location={location}
          />
        </Sequence>

        {/* Scene 2: Credentials */}
        <Sequence from={270} durationInFrames={300}>
          <CredentialsScene
            credentials={credentials}
            experience={experience}
            procedures={procedures}
          />
        </Sequence>

        {/* Scene 3: Specializations */}
        <Sequence from={570} durationInFrames={330}>
          <SpecializationsScene
            specializations={specializations}
            tagline={tagline}
          />
        </Sequence>

        <BrandWatermark position="bottom-right" delay={20} variant="light" />
      </GradientBackground>
    </AbsoluteFill>
  );
};
