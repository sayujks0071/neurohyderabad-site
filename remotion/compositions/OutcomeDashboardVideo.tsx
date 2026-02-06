/**
 * Outcome Dashboard Video (25 seconds @ 30fps = 750 frames)
 *
 * Animated statistics dashboard showing Dr. Sayuj's practice metrics
 * with counting number animations and progress bars.
 *
 * Scene breakdown:
 * - Frames 0-240 (8s): Intro with doctor name and "By the Numbers"
 * - Frames 240-750 (17s): Animated stat counters grid
 */
import { AbsoluteFill, Sequence } from 'remotion';
import type { OutcomeDashboardProps } from '../types/OutcomeDashboardProps';
import { GradientBackground } from '../components/shared/GradientBackground';
import { BrandWatermark } from '../components/shared/BrandWatermark';
import { StatsIntroScene } from '../components/OutcomeDashboard/StatsIntroScene';
import { StatCounterScene } from '../components/OutcomeDashboard/StatCounterScene';

const DEFAULT_STATS = [
  { label: 'Endoscopic Procedures', value: 1000, suffix: '+', description: 'Full endoscopic spine surgeries', color: '#00A3E0' },
  { label: 'Same-Day Discharge', value: 80, suffix: '%', description: 'MISS patients walking same day', color: '#2E7D32' },
  { label: 'Years Experience', value: 9, suffix: '+', description: 'Dedicated neurosurgical practice', color: '#FF9800' },
  { label: 'Patient Rating', value: 49, suffix: '/5', description: 'Verified patient reviews', color: '#FFB800' },
];
const DEFAULT_DOCTOR_NAME = 'Dr. Sayuj Krishnan';
const DEFAULT_SPECIALTY = 'Neurosurgeon & Spine Specialist';
const DEFAULT_HOSPITAL_NAME = 'Yashoda Hospital, Malakpet';

export const OutcomeDashboardVideo: React.FC<OutcomeDashboardProps> = ({
  stats = DEFAULT_STATS,
  doctorName = DEFAULT_DOCTOR_NAME,
  specialty = DEFAULT_SPECIALTY,
  hospitalName = DEFAULT_HOSPITAL_NAME,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground preset="clinical-blue" animated>
        {/* Intro scene */}
        <Sequence from={0} durationInFrames={240}>
          <StatsIntroScene
            doctorName={doctorName}
            specialty={specialty}
            hospitalName={hospitalName}
          />
        </Sequence>

        {/* Stats grid */}
        <Sequence from={240} durationInFrames={510}>
          <StatCounterScene stats={stats} />
        </Sequence>

        <BrandWatermark position="bottom-right" delay={20} variant="light" />
      </GradientBackground>
    </AbsoluteFill>
  );
};
