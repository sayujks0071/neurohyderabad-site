/**
 * Blog-to-Reel Video (variable length, default 30 seconds @ 30fps = 900 frames)
 *
 * Converts blog article content into an engaging social media reel.
 * Hook scene → Key point cards → CTA scene.
 *
 * Scene breakdown (for 3 key points):
 * - Frames 0-180 (6s): Hook scene with title and category
 * - Frames 180-390 (7s): Key Point 1
 * - Frames 390-600 (7s): Key Point 2
 * - Frames 600-720 (4s): Key Point 3
 * - Frames 720-900 (6s): CTA scene
 */
import { AbsoluteFill, Sequence } from 'remotion';
import type { BlogToReelProps } from '../types/BlogToReelProps';
import { GradientBackground } from '../components/shared/GradientBackground';
import { BrandWatermark } from '../components/shared/BrandWatermark';
import { HookScene } from '../components/BlogToReel/HookScene';
import { KeyPointScene } from '../components/BlogToReel/KeyPointScene';
import { CTAScene } from '../components/BlogToReel/CTAScene';

export const BlogToReelVideo: React.FC<BlogToReelProps> = ({
  title,
  subtitle,
  keyPoints,
  callToAction,
  authorName,
  category,
  readTime,
}) => {
  const hookDuration = 180; // 6 seconds
  const pointDuration = 180; // 6 seconds per point
  const ctaDuration = 180; // 6 seconds

  return (
    <AbsoluteFill>
      <GradientBackground preset="warm-trust" animated>
        {/* Hook scene */}
        <Sequence from={0} durationInFrames={hookDuration}>
          <HookScene
            title={title}
            subtitle={subtitle}
            category={category}
            readTime={readTime}
          />
        </Sequence>

        {/* Key point scenes */}
        {keyPoints.map((point, index) => (
          <Sequence
            key={index}
            from={hookDuration + index * pointDuration}
            durationInFrames={pointDuration}
          >
            <KeyPointScene
              heading={point.heading}
              body={point.body}
              icon={point.icon}
              pointNumber={index + 1}
              totalPoints={keyPoints.length}
            />
          </Sequence>
        ))}

        {/* CTA scene */}
        <Sequence
          from={hookDuration + keyPoints.length * pointDuration}
          durationInFrames={ctaDuration}
        >
          <CTAScene callToAction={callToAction} authorName={authorName} />
        </Sequence>

        <BrandWatermark position="bottom-right" delay={10} variant="light" />
      </GradientBackground>
    </AbsoluteFill>
  );
};
