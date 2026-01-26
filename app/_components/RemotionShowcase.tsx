'use client';

/**
 * RemotionShowcase — Embeddable @remotion/player component for previewing
 * Remotion video compositions directly on the website.
 *
 * Usage: <RemotionShowcase compositionId="ServiceShowcase" />
 */
import { Player } from '@remotion/player';
import React, { lazy, Suspense, useState } from 'react';

// Lazy-load the composition components to avoid bundling Remotion in the main chunk
const ServiceShowcaseVideo = lazy(
  () => import('../../remotion/compositions/ServiceShowcaseVideo').then(m => ({ default: m.ServiceShowcaseVideo })),
);
const OutcomeDashboardVideo = lazy(
  () => import('../../remotion/compositions/OutcomeDashboardVideo').then(m => ({ default: m.OutcomeDashboardVideo })),
);
const BlogToReelVideo = lazy(
  () => import('../../remotion/compositions/BlogToReelVideo').then(m => ({ default: m.BlogToReelVideo })),
);
const DoctorIntroVideo = lazy(
  () => import('../../remotion/compositions/DoctorIntroVideo').then(m => ({ default: m.DoctorIntroVideo })),
);
const PatientTestimonialVideo = lazy(
  () => import('../../remotion/compositions/PatientTestimonialVideo').then(m => ({ default: m.PatientTestimonialVideo })),
);

/** Default props for each composition preview */
const COMPOSITION_CONFIG = {
  ServiceShowcase: {
    component: ServiceShowcaseVideo,
    durationInFrames: 1260,
    fps: 30,
    width: 1920,
    height: 1080,
    title: 'Service Showcase',
    description: 'Animated highlight reel of neurosurgical services',
    inputProps: {
      doctorName: 'Dr. Sayuj Krishnan',
      tagline: 'German-Trained Neurosurgeon in Hyderabad',
      services: [
        {
          title: 'Endoscopic Spine Surgery',
          subtitle: 'Minimally invasive procedures with same-day discharge',
          icon: '🦴',
          highlights: ['6-8mm incision', '80% same-day discharge', 'Return to work in 1-3 weeks', '1,000+ procedures'],
          color: '#00A3E0',
        },
        {
          title: 'Brain Tumor Surgery',
          subtitle: 'Advanced microsurgical techniques with neuronavigation',
          icon: '🧠',
          highlights: ['Awake craniotomy', 'Brain mapping', 'Neuronavigation-guided', 'Skull-base approaches'],
          color: '#2E7D32',
        },
        {
          title: 'Epilepsy Surgery',
          subtitle: 'Comprehensive evaluation for drug-resistant epilepsy',
          icon: '⚡',
          highlights: ['Video-EEG & SEEG', 'Laser ablation (LITT)', 'Temporal lobectomy', 'VNS implantation'],
          color: '#FF9800',
        },
        {
          title: 'ROSA Robotic DBS',
          subtitle: 'Robotic-assisted deep brain stimulation',
          icon: '🤖',
          highlights: ['Sub-millimeter accuracy', 'Movement disorders', 'Reduced operative time', 'Enhanced safety'],
          color: '#9C27B0',
        },
      ],
    },
  },
  OutcomeDashboard: {
    component: OutcomeDashboardVideo,
    durationInFrames: 750,
    fps: 30,
    width: 1920,
    height: 1080,
    title: 'Outcome Dashboard',
    description: 'Animated practice statistics and metrics',
    inputProps: {
      doctorName: 'Dr. Sayuj Krishnan',
      specialty: 'Neurosurgeon & Spine Specialist',
      hospitalName: 'Yashoda Hospital, Malakpet',
      stats: [
        { label: 'Endoscopic Procedures', value: 1000, suffix: '+', description: 'Full endoscopic spine surgeries', color: '#00A3E0' },
        { label: 'Same-Day Discharge', value: 80, suffix: '%', description: 'MISS patients walking out same day', color: '#2E7D32' },
        { label: 'Years Experience', value: 9, suffix: '+', description: 'Of dedicated neurosurgical practice', color: '#FF9800' },
        { label: 'Patient Rating', value: 49, suffix: '/5', description: 'Based on verified reviews', color: '#FFB800' },
      ],
    },
  },
  BlogToReel: {
    component: BlogToReelVideo,
    durationInFrames: 900,
    fps: 30,
    width: 1080,
    height: 1920,
    title: 'Blog-to-Reel',
    description: 'Blog articles converted to social media reels',
    inputProps: {
      title: 'Does Endoscopic Spine Surgery Work for Sciatica?',
      subtitle: 'Evidence-based insights from a German-trained neurosurgeon',
      category: 'Spine Surgery',
      readTime: '5 min',
      authorName: 'Dr. Sayuj Krishnan',
      callToAction: 'Book a consultation to discuss your options',
      keyPoints: [
        { heading: '90% Success Rate', body: 'Excellent outcomes for properly selected patients.', icon: '📊' },
        { heading: 'Same-Day Recovery', body: '6-8mm incision allows walking within hours.', icon: '🏃' },
        { heading: 'When Surgery Is Right', body: 'After 6 weeks of conservative treatment fails.', icon: '🩺' },
      ],
    },
  },
  DoctorIntro: {
    component: DoctorIntroVideo,
    durationInFrames: 900,
    fps: 30,
    width: 1920,
    height: 1080,
    title: 'Doctor Introduction',
    description: 'Professional animated introduction for Dr. Sayuj',
    inputProps: {
      name: 'Dr. Sayuj Krishnan S',
      title: 'German-Trained Neurosurgeon',
      hospital: 'Yashoda Hospital',
      location: 'Malakpet, Hyderabad',
      credentials: [
        'MBBS, DNB Neurosurgery',
        'Fellowship — Minimally Invasive Spine Surgery',
        'Observer-ship — Germany',
        'AO Spine International',
        'Neurological Society of India',
        'Congress of Neurological Surgeons',
      ],
      specializations: [
        'Endoscopic Spine Surgery',
        'Brain Tumor Surgery',
        'Awake Craniotomy',
        'ROSA Robotic DBS',
        'Epilepsy Surgery',
        'Spinal Fusion',
      ],
      experience: '9+ Years',
      procedures: '1,000+',
      tagline: 'German precision with compassionate care.',
    },
  },
  PatientTestimonial: {
    component: PatientTestimonialVideo,
    durationInFrames: 900,
    fps: 30,
    width: 1920,
    height: 1080,
    title: 'Patient Testimonials',
    description: 'Animated patient success story reel',
    inputProps: {
      doctorName: 'Dr. Sayuj Krishnan',
      overallRating: 4.9,
      totalReviews: 500,
      testimonials: [
        { quote: 'I was speaking normally the next day.', patientInitials: 'RM', procedure: 'Meningioma Surgery', rating: 5, recoveryHighlight: 'Speaking normally next day' },
        { quote: 'I could stand straight the very next morning.', patientInitials: 'PK', procedure: 'TLIF Spine Surgery', rating: 5, recoveryHighlight: 'Walking next morning' },
        { quote: 'The MVD surgery gave me my life back.', patientInitials: 'SA', procedure: 'Trigeminal Neuralgia MVD', rating: 5, recoveryHighlight: 'Pain-free after years' },
      ],
    },
  },
} as const;

type CompositionId = keyof typeof COMPOSITION_CONFIG;

interface RemotionShowcaseProps {
  compositionId?: CompositionId;
}

/**
 * Interactive Remotion video showcase with tabbed navigation.
 */
export default function RemotionShowcase({ compositionId }: RemotionShowcaseProps) {
  const compositionIds = Object.keys(COMPOSITION_CONFIG) as CompositionId[];
  const [activeId, setActiveId] = useState<CompositionId>(compositionId ?? compositionIds[0]);
  const config = COMPOSITION_CONFIG[activeId];

  const isVertical = config.width < config.height;
  const playerWidth = isVertical ? 360 : 800;
  const playerHeight = isVertical ? 640 : 450;

  return (
    <div style={{ width: '100%' }}>
      {/* Tab navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {compositionIds.map((id) => {
          const c = COMPOSITION_CONFIG[id];
          const isActive = id === activeId;
          return (
            <button
              key={id}
              onClick={() => setActiveId(id)}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: isActive ? '2px solid #005EB8' : '2px solid #e2e8f0',
                backgroundColor: isActive ? '#005EB8' : 'white',
                color: isActive ? 'white' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {c.title}
            </button>
          );
        })}
      </div>

      {/* Player area */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: isVertical ? 'flex-start' : 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Player */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            flexShrink: 0,
          }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  width: playerWidth,
                  height: playerHeight,
                  backgroundColor: '#1a1a2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                Loading preview...
              </div>
            }
          >
            <Player
              component={config.component as any}
              inputProps={config.inputProps as any}
              durationInFrames={config.durationInFrames}
              compositionWidth={config.width}
              compositionHeight={config.height}
              fps={config.fps}
              style={{ width: playerWidth, height: playerHeight }}
              controls
              autoPlay={false}
              loop
            />
          </Suspense>
        </div>

        {/* Info panel */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '8px',
              marginTop: 0,
            }}
          >
            {config.title}
          </h3>
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              marginBottom: '16px',
              marginTop: 0,
            }}
          >
            {config.description}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Duration
              </span>
              <span style={{ fontSize: '15px', color: '#334155', fontWeight: 500 }}>
                {Math.round(config.durationInFrames / config.fps)}s
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Resolution
              </span>
              <span style={{ fontSize: '15px', color: '#334155', fontWeight: 500 }}>
                {config.width}x{config.height}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Format
              </span>
              <span style={{ fontSize: '15px', color: '#334155', fontWeight: 500 }}>
                {isVertical ? 'Vertical (Reel)' : 'Landscape (16:9)'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Composition ID
              </span>
              <code style={{ fontSize: '14px', color: '#005EB8', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                {activeId}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
