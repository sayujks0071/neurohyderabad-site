import { Composition } from 'remotion';
import { ConsultationPrepVideo } from './compositions/ConsultationPrepVideo';
import { ServiceShowcaseVideo } from './compositions/ServiceShowcaseVideo';
import { OutcomeDashboardVideo } from './compositions/OutcomeDashboardVideo';
import { BlogToReelVideo } from './compositions/BlogToReelVideo';
import { DoctorIntroVideo } from './compositions/DoctorIntroVideo';
import { PatientTestimonialVideo } from './compositions/PatientTestimonialVideo';
import type { ConsultationPrepProps } from './types/ConsultationPrepProps';
import type { ServiceShowcaseProps } from './types/ServiceShowcaseProps';
import type { OutcomeDashboardProps } from './types/OutcomeDashboardProps';
import type { BlogToReelProps } from './types/BlogToReelProps';
import type { DoctorIntroProps } from './types/DoctorIntroProps';
import type { PatientTestimonialProps } from './types/PatientTestimonialProps';

/**
 * Remotion Root file — registers all video compositions for www.drsayuj.info
 *
 * Templates:
 * 1. ConsultationPrep — Personalized patient consultation prep video
 * 2. ServiceShowcase — Animated highlight reel of neurosurgical services
 * 3. OutcomeDashboard — Animated statistics/metrics dashboard
 * 4. BlogToReel — Blog article → social media reel converter
 * 5. DoctorIntro — Professional animated doctor introduction
 * 6. PatientTestimonial — Animated patient success story reel
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Template #1: Personalized Consultation Prep Video */}
      <Composition
        id="ConsultationPrep"
        component={ConsultationPrepVideo as any}
        durationInFrames={900} // 30 seconds @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          patientName: 'John Doe',
          surgeryType: 'Endoscopic Spine Surgery',
          appointmentDate: '2026-02-15',
          appointmentTime: '10:00 AM',
          prepSteps: [
            {
              step: 1,
              title: 'Fast 6 hours before surgery',
              description: 'No food or water after midnight before your procedure',
            },
            {
              step: 2,
              title: 'Bring your MRI scans',
              description: 'Physical copies of recent MRI/CT scans are required',
            },
            {
              step: 3,
              title: 'Arrive 15 minutes early',
              description: 'Complete pre-operative paperwork and consent forms',
            },
          ],
        } as ConsultationPrepProps}
      />

      {/* Template #2: Service Showcase Video */}
      <Composition
        id="ServiceShowcase"
        component={ServiceShowcaseVideo as any}
        durationInFrames={1260} // 42 seconds @ 30fps (6s title + 4x9s services)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          doctorName: 'Dr. Sayuj Krishnan',
          tagline: 'German-Trained Neurosurgeon in Hyderabad',
          services: [
            {
              title: 'Endoscopic Spine Surgery',
              subtitle: 'Minimally invasive procedures with same-day discharge',
              icon: '🦴',
              highlights: [
                '6-8mm incision — minimal scarring',
                '80% same-day discharge rate',
                'Return to work in 1-3 weeks',
                '1,000+ procedures performed',
              ],
              color: '#00A3E0',
            },
            {
              title: 'Brain Tumor Surgery',
              subtitle: 'Advanced microsurgical techniques with neuronavigation',
              icon: '🧠',
              highlights: [
                'Awake craniotomy for eloquent areas',
                'Intraoperative brain mapping',
                'Neuronavigation-guided precision',
                'Endoscopic skull-base approaches',
              ],
              color: '#2E7D32',
            },
            {
              title: 'Epilepsy Surgery',
              subtitle: 'Comprehensive evaluation for drug-resistant epilepsy',
              icon: '⚡',
              highlights: [
                'Video-EEG monitoring & SEEG',
                'Laser ablation (LITT)',
                'Temporal lobectomy',
                'Vagus nerve stimulation (VNS)',
              ],
              color: '#FF9800',
            },
            {
              title: 'ROSA Robotic DBS',
              subtitle: 'Robotic-assisted deep brain stimulation',
              icon: '🤖',
              highlights: [
                'Sub-millimeter targeting accuracy',
                "Parkinson's & movement disorders",
                'Reduced operative time',
                'Enhanced patient safety',
              ],
              color: '#9C27B0',
            },
          ],
        } as ServiceShowcaseProps}
      />

      {/* Template #3: Outcome Dashboard Video */}
      <Composition
        id="OutcomeDashboard"
        component={OutcomeDashboardVideo as any}
        durationInFrames={750} // 25 seconds @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          doctorName: 'Dr. Sayuj Krishnan',
          specialty: 'Neurosurgeon & Spine Specialist',
          hospitalName: 'Yashoda Hospital, Malakpet',
          stats: [
            {
              label: 'Endoscopic Procedures',
              value: 1000,
              suffix: '+',
              description: 'Full endoscopic spine surgeries performed',
              color: '#00A3E0',
            },
            {
              label: 'Same-Day Discharge',
              value: 80,
              suffix: '%',
              description: 'MISS patients walking out same day',
              color: '#2E7D32',
            },
            {
              label: 'Years Experience',
              value: 9,
              suffix: '+',
              description: 'Of dedicated neurosurgical practice',
              color: '#FF9800',
            },
            {
              label: 'Patient Rating',
              value: 49,
              suffix: '/5',
              description: 'Based on verified patient reviews',
              color: '#FFB800',
            },
          ],
        } as OutcomeDashboardProps}
      />

      {/* Template #4: Blog-to-Reel Video (vertical for social media) */}
      <Composition
        id="BlogToReel"
        component={BlogToReelVideo as any}
        durationInFrames={900} // 30 seconds @ 30fps
        fps={30}
        width={1080}
        height={1920} // Vertical format for Instagram/YouTube Shorts
        defaultProps={{
          title: 'Does Endoscopic Spine Surgery Work for Sciatica?',
          subtitle: 'Evidence-based insights from a German-trained neurosurgeon',
          category: 'Spine Surgery',
          readTime: '5 min',
          authorName: 'Dr. Sayuj Krishnan',
          callToAction: 'Book a consultation to discuss your treatment options',
          keyPoints: [
            {
              heading: '90% Success Rate',
              body: 'Studies show endoscopic discectomy achieves excellent outcomes in properly selected patients with sciatica from disc herniation.',
              icon: '📊',
            },
            {
              heading: 'Same-Day Recovery',
              body: 'Unlike open surgery, endoscopic procedures use a 6-8mm incision allowing most patients to walk within hours and go home the same day.',
              icon: '🏃',
            },
            {
              heading: 'When Surgery Is Right',
              body: 'If 6 weeks of physiotherapy and medication have not resolved leg-dominant pain, endoscopic decompression may be the next step.',
              icon: '🩺',
            },
          ],
        } as BlogToReelProps}
      />

      {/* Template #5: Doctor Introduction Video */}
      <Composition
        id="DoctorIntro"
        component={DoctorIntroVideo as any}
        durationInFrames={900} // 30 seconds @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          name: 'Dr. Sayuj Krishnan S',
          title: 'German-Trained Neurosurgeon',
          hospital: 'Yashoda Hospital',
          location: 'Malakpet, Hyderabad, Telangana',
          credentials: [
            'MBBS, DNB Neurosurgery (Direct 6 Years)',
            'Fellowship in Minimally Invasive & Advanced Spine Surgery',
            'Observer-ship in Full Endoscopic Spine Surgery — Germany',
            'Member, AO Spine International',
            'Member, Neurological Society of India (NSI)',
            'Member, Congress of Neurological Surgeons (CNS)',
          ],
          specializations: [
            'Endoscopic Spine Surgery',
            'Brain Tumor Surgery',
            'Awake Craniotomy',
            'ROSA Robotic DBS',
            'Epilepsy Surgery',
            'Spinal Fusion & Decompression',
          ],
          experience: '9+ Years',
          procedures: '1,000+',
          tagline:
            'Combining German precision with compassionate care to deliver safer, faster recoveries.',
        } as DoctorIntroProps}
      />

      {/* Template #6: Patient Testimonial Video */}
      <Composition
        id="PatientTestimonial"
        component={PatientTestimonialVideo as any}
        durationInFrames={900} // 30 seconds @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          doctorName: 'Dr. Sayuj Krishnan',
          overallRating: 4.9,
          totalReviews: 500,
          testimonials: [
            {
              quote:
                'I was speaking normally the next day and felt safe throughout the awake mapping. Dr. Sayuj explained every step before and after surgery.',
              patientInitials: 'RM',
              procedure: 'Meningioma Surgery',
              rating: 5,
              recoveryHighlight: 'Speaking normally next day',
            },
            {
              quote:
                'I could stand straight the very next morning and walked the corridor with the physio. The endoscopic approach meant almost no pain.',
              patientInitials: 'PK',
              procedure: 'TLIF Spine Surgery',
              rating: 5,
              recoveryHighlight: 'Walking next morning',
            },
            {
              quote:
                'After years of unbearable facial pain, the MVD surgery gave me my life back. I can eat and talk without fear now.',
              patientInitials: 'SA',
              procedure: 'Trigeminal Neuralgia MVD',
              rating: 5,
              recoveryHighlight: 'Pain-free after years of suffering',
            },
          ],
        } as PatientTestimonialProps}
      />
    </>
  );
};
