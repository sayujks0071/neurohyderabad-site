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
import CostTransparencySection from '@/src/components/CostTransparencySection';
import PatientJourneySection from '@/src/components/PatientJourneySection';

const baseMetadata = makeMetadata({
  title: 'Lumbar Laminectomy Surgery in Hyderabad | Spinal Decompression',
  description: 'Expert lumbar laminectomy surgery by Dr. Sayuj Krishnan. Relief from spinal stenosis and nerve compression. Advanced decompression techniques.',
  canonicalPath: '/services/lumbar-laminectomy-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/lumbar-laminectomy-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Lumbar%20Laminectomy&subtitle=Spinal%20Decompression%20Surgery`,
        width: 1200,
        height: 630,
        alt: 'Lumbar Laminectomy - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Lumbar%20Laminectomy&subtitle=Spinal%20Decompression%20Surgery`],
  },
};

const spineStoryHighlights = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('stenosis'))
  .slice(0, 2);

const ARTICLE_SOURCES = getServiceSources('lumbar-laminectomy-surgery-hyderabad');

// Google Business Profile JSON-LD
const gbpSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Lumbar Laminectomy Surgery | Dr. Sayuj Krishnan",
  "url": "https://www.drsayuj.info/services/lumbar-laminectomy-surgery-hyderabad/?utm_source=google&utm_medium=organic&utm_campaign=gbp_laminectomy",
  "image": "https://www.drsayuj.info/images/og-default.jpg",
  "description": "Expert lumbar laminectomy for spinal stenosis by Dr. Sayuj Krishnan in Hyderabad. Decompression surgery to relieve leg pain and numbness.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.drsayuj.info/services/lumbar-laminectomy-surgery-hyderabad/"
  },
  "medicalSpecialty": "Spine Surgery",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Hyderabad, Telangana, India"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Room No. 317, OPD Block, Yashoda Hospital, Malakpet",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500036",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 10:00-17:00",
  "telephone": "+91-97782-80044",
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.instagram.com/drsayujneurohyd",
    "https://www.linkedin.com/in/drsayujkrishnan",
    "https://www.youtube.com/@drsayujneurohyd"
  ]
};

const COSTS = [
  {
    procedure: 'Standard Laminectomy',
    range: '₹1,10,000 - ₹1,40,000',
    recovery: '3-4 weeks',
    includes: ['Surgeon fees', '3 Days Hospital Stay', 'Medications']
  },
  {
    procedure: 'Endoscopic ULBD (Minimally Invasive)',
    range: '₹1,20,000 - ₹1,60,000',
    recovery: '2 weeks',
    includes: ['Keyhole Incision', '1-2 Days Stay', 'Faster Rehab']
  },
  {
    procedure: 'Laminectomy + Fusion (TLIF)',
    range: '₹2,50,000 - ₹3,50,000',
    recovery: '6-8 weeks',
    includes: ['Implants (Screws)', 'Bone Graft', '5 Days Stay']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'MRI Evaluation',
    description: 'We check the severity of canal narrowing (stenosis) and nerve compression.'
  },
  {
    title: 'Pre-Anaesthesia Check',
    description: 'Cardiac and lung fitness clearance, especially for elderly patients.'
  },
  {
    title: 'The Surgery',
    description: 'Removing the back part of the vertebra (lamina) to free the compressed nerves.'
  },
  {
    title: 'Post-Op Monitoring',
    description: 'Observation for 2-3 days in the hospital to manage pain and ensure mobility.'
  },
  {
    title: 'Walking',
    description: 'Patients are encouraged to walk with support from the next day.'
  },
  {
    title: 'Recovery at Home',
    description: 'Suture removal after 14 days. Physiotherapy starts from week 3.'
  }
];

export default function LumbarLaminectomyPage() {
  const faqs = [
    {
      question: 'What is lumbar laminectomy?',
      answer: 'Lumbar laminectomy is a decompression surgery that creates space for the spinal cord and nerves by removing the lamina (the back part of the vertebra). It is commonly used to treat spinal stenosis.'
    },
    {
      question: 'Is laminectomy a major surgery?',
      answer: 'It is a common spine procedure. While traditional open laminectomy is a significant surgery, we now often perform "Endoscopic ULBD" (Unilateral Laminotomy for Bilateral Decompression), which is minimally invasive and has a much faster recovery.'
    },
    {
      question: 'How long does recovery take?',
      answer: 'For traditional laminectomy, full recovery takes 4-6 weeks. With endoscopic techniques, patients often return to desk work in 2 weeks. Walking is encouraged immediately after surgery.'
    },
    {
      question: 'Will my back pain go away completely?',
      answer: 'Laminectomy is primarily designed to relieve LEG pain (sciatica) and heaviness caused by nerve compression. While back pain often improves, the main goal is to stop the nerve damage and improve walking distance.'
    },
    {
      question: 'What are the risks?',
      answer: 'Risks include infection, bleeding, dural tear (spinal fluid leak), or nerve injury. Dr. Sayuj uses high-magnification microscopes or endoscopes to minimize these risks significantly.'
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
      <JsonLd data={gbpSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Lumbar Laminectomy', path: '/services/lumbar-laminectomy-surgery-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/lumbar-laminectomy-surgery-hyderabad`} />
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Lumbar Laminectomy (Decompression) Surgery</h1>
            <AuthorByline
              publishedOn="2026-01-03"
              updatedOn="2026-01-03"
              className="justify-center mb-4"
            />
            <p className="text-lg text-gray-600">Relief from spinal stenosis, leg heaviness, and neurogenic claudication.</p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-center">
              <strong>Need a Spine Opinion?</strong>
              <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a>
            </p>
          </section>

          <section className="mb-12">
             <LocalPathways mode="service" />
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Lumbar Laminectomy?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Lumbar laminectomy is a surgical procedure performed to relieve pressure on the spinal cord or nerves.
                This pressure is most commonly caused by <strong>lumbar spinal stenosis</strong>, a condition where the spinal canal narrows due to age-related changes like bone spurs or thickened ligaments.
              </p>
              <p className="text-gray-700 mb-6">
                By removing the lamina (the bony arch on the back of the vertebra), Dr. Sayuj creates more space for the nerves, alleviating symptoms like leg pain, numbness, and difficulty walking.
              </p>
            </div>
          </section>

           <PatientJourneySection title="Laminectomy Treatment Path" steps={JOURNEY_STEPS} />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj for Decompression?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Minimally Invasive Options</h3>
                <p className="text-gray-600">
                  Whenever possible, we opt for <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-600 hover:underline">Endoscopic ULBD</Link>.
                  This achieves the same decompression through a tiny keyhole incision, preserving muscle and stability.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Safety First</h3>
                <p className="text-gray-600">
                  We use intraoperative neural monitoring and high-speed drills to safely remove bone without touching the delicate nerves.
                </p>
              </div>
            </div>
          </section>

          <CostTransparencySection costs={COSTS} />

          <OutcomeMetricsSection procedure="Lumbar Laminectomy" />

           <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Who Needs Laminectomy?</h2>
             <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="text-lg mb-4">You might be a candidate if:</p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>You experience "Neurogenic Claudication" – pain/heaviness in legs that worsens with walking and improves when sitting or bending forward.</li>
                  <li>You have confirmed Spinal Stenosis on MRI.</li>
                  <li>Conservative treatments (physiotherapy, injections) have failed to improve your quality of life.</li>
                  <li>You have progressive muscle weakness or bladder issues.</li>
                </ul>
             </div>
          </section>

          <section className="mb-12">
            <TeleconsultationForm pageSlug="/services/lumbar-laminectomy-surgery-hyderabad" service="Lumbar Laminectomy" />
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
            <ReviewedBy lastReviewed="2026-01-03" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
