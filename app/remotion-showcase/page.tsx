import type { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import Section from '../_components/Section';
import RemotionShowcaseWrapper from '../_components/RemotionShowcaseWrapper';

export const metadata: Metadata = makeMetadata({
  title: 'Video Showcase | Remotion Animations | Dr. Sayuj Krishnan',
  description:
    'Interactive video showcase featuring animated service highlights, outcome dashboards, patient testimonials, and blog reels — powered by Remotion for www.drsayuj.info.',
  canonicalPath: '/remotion-showcase',
});

export default function RemotionShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-4">
              Powered by Remotion
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Video Showcase
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Interactive animated videos for patient education, service
              highlights, outcome metrics, and social media content.
            </p>
          </div>
        </div>
      </header>

      {/* Showcase */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <RemotionShowcaseWrapper />
        </div>
      </Section>

      {/* Use Cases Grid */}
      <Section background="gray" className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Best Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Service Showcase',
                description:
                  'Animated walkthrough of endoscopic spine surgery, brain tumor surgery, epilepsy surgery, and ROSA robotic DBS — used on landing pages and social ads.',
                useCase: 'Landing pages, social media ads, waiting room displays',
              },
              {
                title: 'Outcome Dashboard',
                description:
                  'Animated statistics with counting numbers, progress bars, and metrics — builds trust by showing 1,000+ procedures and 80% same-day discharge.',
                useCase: 'Homepage sections, investor presentations, conference talks',
              },
              {
                title: 'Blog-to-Reel',
                description:
                  'Converts medical blog articles into vertical social media reels with hook, key points, and CTA — optimized for Instagram Reels and YouTube Shorts.',
                useCase: 'Instagram Reels, YouTube Shorts, WhatsApp Status',
              },
              {
                title: 'Doctor Introduction',
                description:
                  'Professional animated intro showing credentials, experience, and specializations — makes a strong first impression on new patients.',
                useCase: 'About page, appointment booking flow, telemedicine lobby',
              },
              {
                title: 'Patient Testimonials',
                description:
                  'Animated patient success stories with star ratings and recovery highlights — builds social proof and reduces appointment anxiety.',
                useCase: 'Patient stories page, pre-consultation emails, social media',
              },
              {
                title: 'Consultation Prep',
                description:
                  'Personalized patient videos with appointment date, surgery type, and preparation steps — sent via WhatsApp/email before the appointment.',
                useCase: 'Pre-appointment emails, WhatsApp messages, patient portal',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-700 font-medium">
                    {item.useCase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Technical Details */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Technical Details
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Animation Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Spring physics for smooth, natural motion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Staggered entrance animations for lists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Animated counters and progress bars</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Cross-fade scene transitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Animated gradient backgrounds with glow effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Brand watermark overlay on all compositions</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Render Capabilities
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>1920x1080 landscape (16:9) for standard videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>1080x1920 vertical (9:16) for social media reels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>30fps with spring-based physics animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Local rendering via CLI or Lambda cloud rendering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Dynamic props — pass patient data for personalization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">&#x2713;</span>
                  <span>Webhook-based pipeline to Vercel Blob storage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
