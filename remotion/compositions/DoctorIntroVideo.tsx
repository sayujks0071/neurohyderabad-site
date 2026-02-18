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
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import type { DoctorIntroProps } from '../types/DoctorIntroProps';
import { GradientBackground } from '../components/shared/GradientBackground';
import { BrandWatermark } from '../components/shared/BrandWatermark';
import { NameRevealScene } from '../components/DoctorIntro/NameRevealScene';
import { CredentialsScene } from '../components/DoctorIntro/CredentialsScene';
import { SpecializationsScene } from '../components/DoctorIntro/SpecializationsScene';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const DEFAULT_CREDENTIALS = ['MBBS, DNB Neurosurgery', 'Fellowship \u2014 Minimally Invasive Spine Surgery', 'Observer-ship \u2014 Germany', 'AO Spine International', 'Neurological Society of India', 'Congress of Neurological Surgeons'];
const DEFAULT_SPECIALIZATIONS = ['Endoscopic Spine Surgery', 'Brain Tumor Surgery', 'Awake Craniotomy', 'ROSA Robotic DBS', 'Epilepsy Surgery', 'Spinal Fusion'];
const DEFAULT_NAME = 'Dr. Sayuj Krishnan S';
const DEFAULT_TITLE = 'German-Trained Neurosurgeon';
const DEFAULT_HOSPITAL = 'Yashoda Hospital';
const DEFAULT_LOCATION = 'Malakpet, Hyderabad';
const DEFAULT_EXPERIENCE = '9+ Years';
const DEFAULT_PROCEDURES = '1,000+';
const DEFAULT_TAGLINE = 'German precision with compassionate care.';

// Transition configuration
const TRANSITION_DURATION = 30;

// Scene timing calculation
const SCENE_1_DURATION = 270;
const SCENE_1_EXIT_START = SCENE_1_DURATION - TRANSITION_DURATION; // 240

const SCENE_2_START = SCENE_1_EXIT_START; // 240
const SCENE_2_DURATION = 330; // 300 content + 30 overlap
const SCENE_2_EXIT_START = SCENE_2_START + SCENE_2_DURATION - TRANSITION_DURATION; // 540

const SCENE_3_START = SCENE_2_EXIT_START; // 540
const SCENE_3_DURATION = 360; // 330 content + 30 overlap

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
  const frame = useCurrentFrame();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scene 1 Exit: 240-270
  const scene1ExitOpacity = interpolate(frame, [SCENE_1_EXIT_START, SCENE_1_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene1ExitScale = prefersReducedMotion ? 1 : interpolate(frame, [SCENE_1_EXIT_START, SCENE_1_DURATION], [1, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene 2 Enter: 240-270 | Exit: 540-570
  const scene2EnterOpacity = interpolate(frame, [SCENE_2_START, SCENE_2_START + TRANSITION_DURATION], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene2ExitOpacity = interpolate(frame, [SCENE_2_EXIT_START, SCENE_2_EXIT_START + TRANSITION_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene2EnterScale = prefersReducedMotion ? 1 : interpolate(frame, [SCENE_2_START, SCENE_2_START + TRANSITION_DURATION], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene2ExitScale = prefersReducedMotion ? 1 : interpolate(frame, [SCENE_2_EXIT_START, SCENE_2_EXIT_START + TRANSITION_DURATION], [1, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene 3 Enter: 540-570
  const scene3EnterOpacity = interpolate(frame, [SCENE_3_START, SCENE_3_START + TRANSITION_DURATION], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene3EnterScale = prefersReducedMotion ? 1 : interpolate(frame, [SCENE_3_START, SCENE_3_START + TRANSITION_DURATION], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <GradientBackground preset="dark-professional" animated>
        {/* Scene 1: Name Reveal */}
        <Sequence from={0} durationInFrames={SCENE_1_DURATION}>
          <AbsoluteFill style={{ opacity: scene1ExitOpacity, transform: `scale(${scene1ExitScale})` }}>
            <NameRevealScene
              name={name}
              title={title}
              hospital={hospital}
              location={location}
            />
          </AbsoluteFill>
        </Sequence>

        {/* Scene 2: Credentials (Overlap with Scene 1 and Scene 3) */}
        <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
          <AbsoluteFill
            style={{
              opacity: scene2EnterOpacity * scene2ExitOpacity,
              transform: `scale(${scene2EnterScale * scene2ExitScale})`,
            }}
          >
            <CredentialsScene
              credentials={credentials}
              experience={experience}
              procedures={procedures}
            />
          </AbsoluteFill>
        </Sequence>

        {/* Scene 3: Specializations (Overlap with Scene 2) */}
        <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
          <AbsoluteFill style={{ opacity: scene3EnterOpacity, transform: `scale(${scene3EnterScale})` }}>
            <SpecializationsScene
              specializations={specializations}
              tagline={tagline}
            />
          </AbsoluteFill>
        </Sequence>

        <BrandWatermark position="bottom-right" delay={20} variant="light" />
      </GradientBackground>
    </AbsoluteFill>
  );
};
