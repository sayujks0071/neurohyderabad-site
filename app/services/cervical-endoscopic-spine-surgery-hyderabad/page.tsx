import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
import { patientStories } from '../../../src/content/stories';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import JsonLd from '@/components/JsonLd';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';

const baseMetadata = makeMetadata({
  title: 'Cervical Endoscopic Spine Surgery Hyderabad | Dr. Sayuj Krishnan',
  description: 'Advanced cervical endoscopic spine surgery in Hyderabad. Treat neck pain and radiculopathy with keyhole surgery. Fast recovery, no fusion.',
  canonicalPath: '/services/cervical-endoscopic-spine-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/cervical-endoscopic-spine-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Cervical%20Endoscopic%20Spine%20Surgery&subtitle=Keyhole%20Neck%20Solutions%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Cervical Endoscopic Spine Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Cervical%20Endoscopic%20Spine%20Surgery&subtitle=Keyhole%20Neck%20Solutions%20in%20Hyderabad`],
  },
};

const spineStoryHighlights = patientStories
  .filter((story) => story.tags.includes('cervical') || story.tags.includes('spine'))
  .slice(0, 2);

const ARTICLE_SOURCES = getServiceSources('minimally-invasive-spine-surgery'); // Reusing MISS sources as they are relevant

// Google Business Profile JSON-LD

export default function CervicalEndoscopicSpineSurgeryPage() {
  const approaches = [
    {
      title: 'Posterior Cervical Foraminotomy',
      description: 'Endoscopic decompression of the nerve root from the back of the neck. Ideal for lateral disc herniations.',
      benefits: ['Avoids fusion', 'Preserves neck motion', 'No throat manipulation', 'Same-day discharge'],
      recovery: '1-2 weeks'
    },
    {
      title: 'Anterior Endoscopic Discectomy',
      description: 'Targeted removal of central disc herniations from the front using an endoscope, often without needing fusion.',
      benefits: ['Direct vision of cord', 'Minimal swallowing risk', 'Small incision', 'Rapid relief'],
      recovery: '2-3 weeks'
    }
  ];

  const faqs = [
    {
      question: 'What is Cervical Endoscopic Spine Surgery?',
      answer:
        'It is an advanced minimally invasive technique to treat neck pain and arm pain (radiculopathy) caused by disc herniations or stenosis. Using a high-definition endoscope and micro-instruments through a tiny incision (<1cm), Dr. Sayuj removes the compression while preserving the stability of the spine.'
    },
    {
      question: 'Does this surgery require fusion (screws and plates)?',
      answer:
        'In many cases, NO. The primary advantage of endoscopic cervical foraminotomy is that it preserves the natural motion of your neck. Unlike ACDF (Anterior Cervical Discectomy and Fusion), we do not need to place screws, plates, or cages.'
    },
    {
      question: 'Is it safe for voice and swallowing?',
      answer:
        'Yes, especially with the posterior approach. Traditional anterior neck surgery carries a small risk of temporary hoarseness or difficulty swallowing. The posterior endoscopic approach enters from the back of the neck, completely avoiding the throat and vocal cords.'
    },
    {
      question: 'What conditions can be treated?',
      answer:
        'It is highly effective for Cervical Radiculopathy (pinched nerve causing arm pain), Foraminal Stenosis, and Soft Disc Herniations. It may not be suitable for large central calcified discs or severe spinal cord compression (myelopathy), which may require other approaches.'
    },
    {
      question: 'How fast is the recovery?',
      answer:
        'Patients typically go home the same day or the next morning. You can walk and move your neck gently immediately after surgery. Most patients return to desk jobs within 1 week and driving within 2 weeks.'
    },
    {
      question: 'Why choose Dr. Sayuj for this procedure?',
      answer:
        'Dr. Sayuj Krishnan is one of the few neurosurgeons in Hyderabad proficient in both Anterior and Posterior Endoscopic Cervical techniques. His "Motion Preservation" philosophy prioritizes saving your natural spinal function whenever possible.'
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Cervical Endoscopic Surgery', path: '/services/cervical-endoscopic-spine-surgery-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/cervical-endoscopic-spine-surgery-hyderabad`} />
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Cervical Endoscopic Spine Surgery in Hyderabad</h1>
          <AuthorByline
            publishedOn="2026-01-03"
            updatedOn="2026-01-03"
            className="justify-center mb-4"
          />
          <p className="text-lg text-gray-600">Advanced keyhole neck surgery to relieve arm pain without fusion.</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <Link href="/appointments" className="text-blue-600 hover:underline ml-2">Book Consultation</Link>
          </p>
        </section>

        <section className="mb-12">
            <LocalPathways mode="service" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Relief from Neck & Arm Pain Without Fusion</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Suffering from neck pain that shoots down your arm? You might have a pinched nerve (cervical radiculopathy).
              Historically, surgery for this meant removing the entire disc and fusing the bones (ACDF).
              Today, <strong>Cervical Endoscopic Spine Surgery</strong> allows Dr. Sayuj to free the nerve through a tiny incision,
              often preserving your disc and natural neck motion.
            </p>
            <p className="text-gray-700 mb-6">
              This "Keyhole" approach is performed at Yashoda Hospital, Malakpet, utilizing high-definition endoscopes for maximum safety and precision.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Approaches</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {approaches.map((approach, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{approach.title}</h3>
                <p className="text-gray-600 mb-4">{approach.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {approach.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Recovery: {approach.recovery}
                </div>
              </div>
            ))}
          </div>
        </section>

        <OutcomeMetricsSection procedure="Endoscopic Cervical Foraminotomy" />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Patient Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
             {spineStoryHighlights.length > 0 ? (
                spineStoryHighlights.map((story) => (
                  <article key={story.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {story.patientInitials.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-800">{story.patientInitials}</div>
                        <div className="text-sm text-gray-600">{story.procedure}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">“{story.quote}”</p>
                    <Link
                      href={`/patient-stories/${story.slug}`}
                      className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                    >
                      Read full story →
                    </Link>
                  </article>
                ))
             ) : (
                <p className="text-gray-600">Patient stories coming soon.</p>
             )}
          </div>
        </section>

        <section className="mb-12">
          <TeleconsultationForm pageSlug="/services/cervical-endoscopic-spine-surgery-hyderabad" service="Cervical Endoscopic Spine Surgery" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <article key={faq.question} className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Are you a candidate?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj will review your MRI to see if you qualify for motion-preserving endoscopic surgery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <a
              href="https://wa.me/919778280044"
              className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-full hover:bg-green-600 hover:text-white transition-colors"
            >
              WhatsApp MRI
            </a>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Scientific References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2026-01-03" />
          <NAP />
        </section>
      </div>
    </div>
    </>
  );
}
