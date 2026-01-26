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

export const OutcomeDashboardVideo: React.FC<OutcomeDashboardProps> = ({
  stats,
  doctorName,
  specialty,
  hospitalName,
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
