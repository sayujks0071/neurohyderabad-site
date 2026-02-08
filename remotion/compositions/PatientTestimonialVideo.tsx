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

const DEFAULT_TESTIMONIALS = [
  { quote: 'I was speaking normally the next day.', patientInitials: 'RM', procedure: 'Meningioma Surgery', rating: 5, recoveryHighlight: 'Speaking normally next day' },
  { quote: 'I could stand straight the very next morning.', patientInitials: 'PK', procedure: 'TLIF Spine Surgery', rating: 5, recoveryHighlight: 'Walking next morning' },
  { quote: 'The MVD surgery gave me my life back.', patientInitials: 'SA', procedure: 'Trigeminal Neuralgia MVD', rating: 5, recoveryHighlight: 'Pain-free after years' },
];
const DEFAULT_DOCTOR_NAME = 'Dr. Sayuj Krishnan';
const DEFAULT_OVERALL_RATING = 4.9;
const DEFAULT_TOTAL_REVIEWS = 500;

export const PatientTestimonialVideo: React.FC<PatientTestimonialProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  doctorName = DEFAULT_DOCTOR_NAME,
  overallRating = DEFAULT_OVERALL_RATING,
  totalReviews = DEFAULT_TOTAL_REVIEWS,
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
