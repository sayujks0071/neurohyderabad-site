import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import JsonLd from '@/components/JsonLd';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import PatientJourneySection from '@/src/components/PatientJourneySection';

const baseMetadata = makeMetadata({
  title: 'Cervical Disc Replacement Surgery Hyderabad | Artificial Disc',
  description: 'Expert cervical disc replacement (ADR) by Dr. Sayuj Krishnan. Motion-preserving alternative to fusion for cervical spondylosis & neck pain.',
  canonicalPath: '/services/cervical-disc-replacement-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "cervical disc replacement hyderabad",
    "artificial disc replacement india",
    "cervical arthroplasty cost hyderabad",
    "neck surgery without fusion",
    "best spine surgeon for adr"
  ],
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/cervical-disc-replacement-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Cervical%20Disc%20Replacement&subtitle=Motion%20Preservation`,
        width: 1200,
        height: 630,
        alt: 'Cervical Disc Replacement - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

// Google Business Profile JSON-LD

const COSTS = [
  {
    procedure: 'Cervical Disc Replacement (ADR)',
    range: '₹3,50,000 - ₹4,50,000',
    recovery: '3-4 weeks',
    includes: ['US-FDA Approved Disc', 'Surgeon Fees', '3 Days Hospital Stay']
  },
  {
    procedure: 'ACDF (Fusion - Comparison)',
    range: '₹2,50,000 - ₹3,00,000',
    recovery: '6-8 weeks',
    includes: ['Cage & Plate', 'Surgeon Fees', '3 Days Hospital Stay']
  },
  {
    procedure: 'Hybrid Surgery (Fusion + ADR)',
    range: '₹4,00,000 - ₹5,00,000',
    recovery: '4-6 weeks',
    includes: ['Dual Implants', 'Complex Correction', '4 Days Stay']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'MRI & X-Ray',
    description: 'Confirming soft disc herniation and healthy facet joints suitable for replacement.'
  },
  {
    title: 'Implant Selection',
    description: 'Choosing the correct artificial disc size to match your natural anatomy.'
  },
  {
    title: 'Disc Replacement',
    description: 'Removing the damaged disc and inserting the mobile artificial disc to restore height and motion.'
  },
  {
    title: 'Immediate Motion',
    description: 'Unlike fusion, neck movement is preserved immediately after surgery.'
  },
  {
    title: 'Rapid Recovery',
    description: 'No bone healing required. Return to desk work in 2-3 weeks.'
  }
];

export default function CervicalADRPage() {
  const faqs = [
    {
      question: 'What is cervical disc replacement?',
      answer: 'Cervical disc replacement (ADR) is a surgery where a damaged spinal disc is removed and replaced with an artificial device that mimics natural motion, unlike fusion which locks the bones.'
    },
    {
      question: 'Is replacement better than fusion?',
      answer: 'For younger patients with healthy joints, replacement is often better as it preserves neck movement and prevents "adjacent segment disease" (wear and tear on other discs).'
    },
    {
      question: 'Am I a candidate for disc replacement?',
      answer: 'You are likely a candidate if you have arm pain/weakness from a soft disc herniation but do not have severe arthritis, instability, or osteoporosis.'
    },
    {
      question: 'How long does the artificial disc last?',
      answer: 'Modern artificial discs are designed to last 40-50 years, making them a long-term solution for younger active patients.'
    },
    {
      question: 'What is the recovery time?',
      answer: 'Recovery is faster than fusion because no bone knitting is required. Most patients go home in 1-2 days and return to light work in 2-3 weeks.'
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
          { name: 'Cervical Disc Replacement', path: '/services/cervical-disc-replacement-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/cervical-disc-replacement-hyderabad`} />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Cervical Disc Replacement Surgery (ADR)</h1>
            <AuthorByline
              publishedOn="2026-01-17"
              updatedOn="2026-01-17"
              className="justify-center mb-4"
            />
            <p className="text-lg text-gray-600">Motion-Preserving Alternative to Spinal Fusion.</p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-center">
              <strong>Suffering from Neck Pain?</strong>
              <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a>
            </p>
          </section>

          <section className="mb-12">
             <LocalPathways mode="service" currentSlug="cervical-disc-replacement-hyderabad" />
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Cervical Artificial Disc Replacement?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Cervical Artificial Disc Replacement (ADR) or Arthroplasty is an advanced spine surgery that replaces a diseased disc with a medical-grade device.
                Unlike traditional ACDF (Fusion), which locks the vertebrae, ADR <strong>preserves natural neck motion</strong> and reduces stress on adjacent levels.
              </p>
              <p className="text-gray-700 mb-6">
                Dr. Sayuj specializes in motion-preservation techniques, offering patients an alternative that maintains flexibility and speeds up recovery.
              </p>
            </div>
          </section>

           <PatientJourneySection title="ADR Surgery Journey" steps={JOURNEY_STEPS} />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose ADR over Fusion?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Preserves Motion</h3>
                <p className="text-gray-600">
                  Maintain normal neck rotation, flexion, and extension, allowing for a more active lifestyle post-surgery.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Protects Adjacent Discs</h3>
                <p className="text-gray-600">
                  By maintaining normal biomechanics, ADR significantly reduces the risk of adjacent segment disease, common after fusion.
                </p>
              </div>
            </div>
          </section>

          <CostTransparencySection costs={COSTS} />

          <OutcomeMetricsSection procedure="Cervical Disc Replacement" />

           <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Conditions Treated</h2>
             <div className="grid md:grid-cols-2 gap-4">
                <ul className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700 list-disc list-inside">
                  <li><strong>Cervical Disc Herniation:</strong> Soft disc pressing on nerves.</li>
                  <li><strong>Cervical Radiculopathy:</strong> Arm pain, numbness, or weakness.</li>
                </ul>
                <ul className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700 list-disc list-inside">
                  <li><strong>Cervical Myelopathy:</strong> Spinal cord compression (mild to moderate).</li>
                  <li><strong>Failed Conservative Care:</strong> When physio and meds don't help.</li>
                </ul>
             </div>
          </section>

          <section className="mb-12">
            <TeleconsultationForm pageSlug="/services/cervical-disc-replacement-hyderabad" service="Cervical Disc Replacement" />
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

          <section className="mt-12 space-y-6">
            <ReviewedBy lastReviewed="2026-01-17" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
