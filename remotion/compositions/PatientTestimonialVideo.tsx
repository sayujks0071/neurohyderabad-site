/**
 * Patient Testimonial Video (30 seconds @ 30fps = 900 frames)
 *
 * Animated patient success story reel — rating intro followed by
 * individual testimonial cards with smooth transitions.
 *
 * Scene breakdown (for 3 testimonials):
 * - Frames 0-210 (7s): Rating intro with animated stars
 * - Frames 210-440 (7.7s): Testimonial 1
 * - Frames 440-670 (7.7s): Testimonial 2
 * - Frames 670-900 (7.7s): Testimonial 3
 */
import { AbsoluteFill, Sequence } from 'remotion';
import type { PatientTestimonialProps } from '../types/PatientTestimonialProps';
import { GradientBackground } from '../components/shared/GradientBackground';
import { BrandWatermark } from '../components/shared/BrandWatermark';
import { RatingIntroScene } from '../components/PatientTestimonial/RatingIntroScene';
import { TestimonialCardScene } from '../components/PatientTestimonial/TestimonialCardScene';

export const PatientTestimonialVideo: React.FC<PatientTestimonialProps> = ({
  testimonials,
  doctorName,
  overallRating,
  totalReviews,
}) => {
  const introDuration = 210; // 7 seconds
  const remainingFrames = 900 - introDuration;
  const testimonialDuration = Math.floor(remainingFrames / testimonials.length);

  return (
    <AbsoluteFill>
      <GradientBackground preset="vitality-cyan" animated>
        {/* Rating intro */}
        <Sequence from={0} durationInFrames={introDuration}>
          <RatingIntroScene
            doctorName={doctorName}
            overallRating={overallRating}
            totalReviews={totalReviews}
          />
        </Sequence>

        {/* Individual testimonials */}
        {testimonials.map((testimonial, index) => (
          <Sequence
            key={index}
            from={introDuration + index * testimonialDuration}
            durationInFrames={testimonialDuration}
          >
            <TestimonialCardScene
              quote={testimonial.quote}
              patientInitials={testimonial.patientInitials}
              procedure={testimonial.procedure}
              rating={testimonial.rating}
              recoveryHighlight={testimonial.recoveryHighlight}
              testimonialNumber={index + 1}
              totalTestimonials={testimonials.length}
            />
          </Sequence>
        ))}

        <BrandWatermark position="bottom-right" delay={15} variant="light" />
      </GradientBackground>
    </AbsoluteFill>
  );
};
