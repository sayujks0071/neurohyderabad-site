'use client';

/**
 * RemotionVideoEmbed — Lightweight wrapper for embedding Remotion @remotion/player
 * into any page on www.drsayuj.info.
 *
 * Features:
 * - Lazy-loads via IntersectionObserver (only loads when near viewport)
 * - Dynamic import of composition to keep main bundle small
 * - Responsive sizing with aspect-ratio preservation
 * - Optional section header with title/description
 * - Controls toggle, autoplay, and loop support
 */
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';

/* ---------- Lazy-loaded compositions ---------- */
const compositionMap = {
  ServiceShowcase: lazy(() =>
    import('../../remotion/compositions/ServiceShowcaseVideo').then((m) => ({
      default: m.ServiceShowcaseVideo,
    })),
  ),
  OutcomeDashboard: lazy(() =>
    import('../../remotion/compositions/OutcomeDashboardVideo').then((m) => ({
      default: m.OutcomeDashboardVideo,
    })),
  ),
  BlogToReel: lazy(() =>
    import('../../remotion/compositions/BlogToReelVideo').then((m) => ({
      default: m.BlogToReelVideo,
    })),
  ),
  DoctorIntro: lazy(() =>
    import('../../remotion/compositions/DoctorIntroVideo').then((m) => ({
      default: m.DoctorIntroVideo,
    })),
  ),
  PatientTestimonial: lazy(() =>
    import('../../remotion/compositions/PatientTestimonialVideo').then((m) => ({
      default: m.PatientTestimonialVideo,
    })),
  ),
};

/* ---------- Default input props for each composition ---------- */
const defaultInputProps: Record<string, Record<string, unknown>> = {
  ServiceShowcase: {
    doctorName: 'Dr. Sayuj Krishnan',
    tagline: 'German-Trained Neurosurgeon in Hyderabad',
    services: [
      { title: 'Endoscopic Spine Surgery', subtitle: 'Same-day discharge MISS', icon: '\u{1F9B4}', highlights: ['6-8mm incision', '80% same-day discharge', '1-3 week recovery', '1,000+ procedures'], color: '#00A3E0' },
      { title: 'Brain Tumor Surgery', subtitle: 'Neuronavigation-guided microsurgery', icon: '\u{1F9E0}', highlights: ['Awake craniotomy', 'Brain mapping', 'Neuronavigation', 'Skull-base approaches'], color: '#2E7D32' },
      { title: 'Epilepsy Surgery', subtitle: 'Drug-resistant epilepsy treatment', icon: '\u26A1', highlights: ['Video-EEG & SEEG', 'Laser ablation', 'Temporal lobectomy', 'VNS'], color: '#FF9800' },
      { title: 'ROSA Robotic DBS', subtitle: 'Robotic deep brain stimulation', icon: '\u{1F916}', highlights: ['Sub-mm accuracy', 'Movement disorders', 'Reduced operative time', 'Enhanced safety'], color: '#9C27B0' },
    ],
  },
  OutcomeDashboard: {
    doctorName: 'Dr. Sayuj Krishnan',
    specialty: 'Neurosurgeon & Spine Specialist',
    hospitalName: 'Yashoda Hospital, Malakpet',
    stats: [
      { label: 'Endoscopic Procedures', value: 1000, suffix: '+', description: 'Full endoscopic spine surgeries', color: '#00A3E0' },
      { label: 'Same-Day Discharge', value: 80, suffix: '%', description: 'MISS patients walking same day', color: '#2E7D32' },
      { label: 'Years Experience', value: 9, suffix: '+', description: 'Dedicated neurosurgical practice', color: '#FF9800' },
      { label: 'Patient Rating', value: 49, suffix: '/5', description: 'Verified patient reviews', color: '#FFB800' },
    ],
  },
  BlogToReel: {
    title: 'Endoscopic Spine Surgery for Sciatica',
    subtitle: 'Evidence-based insights from a German-trained neurosurgeon',
    category: 'Spine Surgery',
    readTime: '5 min',
    authorName: 'Dr. Sayuj Krishnan',
    callToAction: 'Book a consultation to discuss your options',
    keyPoints: [
      { heading: '90% Success Rate', body: 'Excellent outcomes for properly selected patients.', icon: '\u{1F4CA}' },
      { heading: 'Same-Day Recovery', body: '6-8mm incision allows walking within hours.', icon: '\u{1F3C3}' },
      { heading: 'When Surgery Is Right', body: 'After 6 weeks of conservative treatment fails.', icon: '\u{1FA7A}' },
    ],
  },
  DoctorIntro: {
    name: 'Dr. Sayuj Krishnan S',
    title: 'German-Trained Neurosurgeon',
    hospital: 'Yashoda Hospital',
    location: 'Malakpet, Hyderabad',
    credentials: ['MBBS, DNB Neurosurgery', 'Fellowship \u2014 Minimally Invasive Spine Surgery', 'Observer-ship \u2014 Germany', 'AO Spine International', 'Neurological Society of India', 'Congress of Neurological Surgeons'],
    specializations: ['Endoscopic Spine Surgery', 'Brain Tumor Surgery', 'Awake Craniotomy', 'ROSA Robotic DBS', 'Epilepsy Surgery', 'Spinal Fusion'],
    experience: '9+ Years',
    procedures: '1,000+',
    tagline: 'German precision with compassionate care.',
  },
  PatientTestimonial: {
    doctorName: 'Dr. Sayuj Krishnan',
    overallRating: 4.9,
    totalReviews: 500,
    testimonials: [
      { quote: 'I was speaking normally the next day.', patientInitials: 'RM', procedure: 'Meningioma Surgery', rating: 5, recoveryHighlight: 'Speaking normally next day' },
      { quote: 'I could stand straight the very next morning.', patientInitials: 'PK', procedure: 'TLIF Spine Surgery', rating: 5, recoveryHighlight: 'Walking next morning' },
      { quote: 'The MVD surgery gave me my life back.', patientInitials: 'SA', procedure: 'Trigeminal Neuralgia MVD', rating: 5, recoveryHighlight: 'Pain-free after years' },
    ],
  },
};

/* ---------- Composition metadata ---------- */
const compositionMeta: Record<
  string,
  { durationInFrames: number; fps: number; width: number; height: number }
> = {
  ServiceShowcase: { durationInFrames: 1260, fps: 30, width: 1920, height: 1080 },
  OutcomeDashboard: { durationInFrames: 750, fps: 30, width: 1920, height: 1080 },
  BlogToReel: { durationInFrames: 900, fps: 30, width: 1080, height: 1920 },
  DoctorIntro: { durationInFrames: 900, fps: 30, width: 1920, height: 1080 },
  PatientTestimonial: { durationInFrames: 900, fps: 30, width: 1920, height: 1080 },
};

type CompositionId = keyof typeof compositionMap;

interface RemotionVideoEmbedProps {
  compositionId: CompositionId;
  /** Override default input props */
  inputProps?: Record<string, unknown>;
  /** Section heading displayed above the player */
  title?: string;
  /** Section description displayed above the player */
  description?: string;
  /** Show transport controls */
  controls?: boolean;
  /** Auto-play when visible */
  autoPlay?: boolean;
  /** Loop playback */
  loop?: boolean;
  /** Additional CSS class for outer wrapper */
  className?: string;
  /** Maximum width of the player container */
  maxWidth?: string;
  /** Skip intersection observer and load immediately (useful when wrapper handles lazy loading) */
  immediate?: boolean;
}

export default function RemotionVideoEmbed({
  compositionId,
  inputProps,
  title,
  description,
  controls = true,
  autoPlay = false,
  loop = true,
  className = '',
  maxWidth = '800px',
  immediate = false,
}: RemotionVideoEmbedProps) {
  const [isVisible, setIsVisible] = useState(immediate);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-load via IntersectionObserver
  useEffect(() => {
    if (immediate) return;

    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px', threshold: 0 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const Component = compositionMap[compositionId];
  const meta = compositionMeta[compositionId];
  const props = inputProps ?? defaultInputProps[compositionId] ?? {};

  if (!Component || !meta) return null;

  const isVertical = meta.width < meta.height;
  const aspectRatio = `${meta.width} / ${meta.height}`;

  return (
    <div ref={containerRef} className={className}>
      {/* Section header */}
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && (
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      )}

      {/* Player */}
      <div
        className="mx-auto"
        style={{
          maxWidth: isVertical ? '360px' : maxWidth,
          width: '100%',
        }}
      >
        {isVisible ? (
          <Suspense
            fallback={
              <div
                className="bg-gray-900 rounded-xl flex items-center justify-center"
                style={{ aspectRatio }}
              >
                <div className="text-white text-sm font-medium animate-pulse">
                  Loading video...
                </div>
              </div>
            }
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Player
                component={Component as any}
                inputProps={props as any}
                durationInFrames={meta.durationInFrames}
                compositionWidth={meta.width}
                compositionHeight={meta.height}
                fps={meta.fps}
                style={{ width: '100%', aspectRatio }}
                controls={controls}
                autoPlay={autoPlay}
                loop={loop}
              />
            </div>
          </Suspense>
        ) : (
          <div
            className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center"
            style={{ aspectRatio }}
          >
            <div className="text-center text-white/60">
              <svg
                className="w-12 h-12 mx-auto mb-2 opacity-40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">Scroll to load video</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
