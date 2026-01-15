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
  title: 'Spinal Decompression Surgery in Hyderabad | Cost & Recovery | Dr. Sayuj',
  description: 'Expert spinal decompression surgery by Dr. Sayuj Krishnan. Minimally invasive treatment for nerve compression, sciatica, and spinal stenosis. Check costs.',
  canonicalPath: '/services/spinal-decompression-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/spinal-decompression-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Spinal%20Decompression&subtitle=Nerve%20Relief%20Surgery`,
        width: 1200,
        height: 630,
        alt: 'Spinal Decompression Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Spinal%20Decompression&subtitle=Nerve%20Relief%20Surgery`],
  },
};

// Reuse sources if available, or empty if not
const ARTICLE_SOURCES = getServiceSources('lumbar-laminectomy-surgery-hyderabad') || [];

const gbpSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Spinal Decompression Surgery | Dr. Sayuj Krishnan",
  "url": "https://www.drsayuj.info/services/spinal-decompression-surgery-hyderabad/?utm_source=google&utm_medium=organic&utm_campaign=gbp_decompression",
  "image": "https://www.drsayuj.info/images/og-default.jpg",
  "description": "Expert spinal decompression surgery (laminectomy/discectomy) by Dr. Sayuj Krishnan in Hyderabad to relieve nerve compression.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.drsayuj.info/services/spinal-decompression-surgery-hyderabad/"
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
    procedure: 'Endoscopic Decompression (Keyhole)',
    range: '₹1,50,000 - ₹2,50,000',
    recovery: '1-2 Days',
    includes: ['Surgeon fees', 'Endoscope Use', 'Consumables', 'Hospital Stay']
  },
  {
    procedure: 'Microscopic Decompression',
    range: '₹1,20,000 - ₹1,80,000',
    recovery: '2-3 Days',
    includes: ['Microscope Use', 'Ward Stay', 'Medications']
  },
  {
    procedure: 'Laminectomy (Open)',
    range: '₹1,10,000 - ₹1,40,000',
    recovery: '3-5 Days',
    includes: ['Traditional Surgery', 'Standard Room', 'Physiotherapy']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'Diagnosis & MRI',
    description: 'Pinpointing the exact location of nerve compression (stenosis or disc herniation).'
  },
  {
    title: 'Pre-Op Planning',
    description: 'Selecting the least invasive approach (Endoscopic vs Microscopic) for your case.'
  },
  {
    title: 'The Procedure',
    description: 'Removing bone or disc material pressing on the nerve roots to restore blood flow.'
  },
  {
    title: 'Immediate Relief',
    description: 'Leg pain often disappears immediately after waking up from anesthesia.'
  },
  {
    title: 'Walking Same Day',
    description: 'Most patients walk within 6-12 hours after surgery.'
  },
  {
    title: 'Back to Life',
    description: 'Return to desk work in 1-2 weeks; full activity in 4-6 weeks.'
  }
];

export default function SpinalDecompressionPage() {
  const faqs = [
    {
      question: 'What is spinal decompression surgery?',
      answer: 'Spinal decompression is a general term for surgical procedures performed to alleviate pain caused by pinched nerves. Common types include laminectomy (removing bone), discectomy (removing disc), and foraminotomy (widening nerve exit).'
    },
    {
      question: 'How much does spinal decompression surgery cost in Hyderabad?',
      answer: 'The cost typically ranges from ₹1.2 Lakhs to ₹2.5 Lakhs depending on the technique (Endoscopic vs Open), the hospital room category, and whether implants are needed.'
    },
    {
      question: 'Is it major surgery?',
      answer: 'It depends on the technique. Dr. Sayuj specializes in "Minimally Invasive Decompression," which uses keyhole incisions (<1cm). This is considered safe, with minimal blood loss and rapid recovery compared to traditional open back surgery.'
    },
    {
      question: 'Can I walk after surgery?',
      answer: 'Yes! We encourage walking on the same day or the next morning. Early mobility prevents complications and speeds up healing.'
    },
    {
      question: 'What conditions does it treat?',
      answer: 'It effectively treats Spinal Stenosis (narrowing of canal), Herniated Discs (slip disc), Sciatica, and Spondylolisthesis (slipped vertebrae).'
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
          { name: 'Spinal Decompression', path: '/services/spinal-decompression-surgery-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/spinal-decompression-surgery-hyderabad`} />

      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Spinal Decompression Surgery in Hyderabad</h1>
            <AuthorByline
              publishedOn="2026-01-10"
              updatedOn="2026-01-10"
              className="justify-center mb-4"
            />
            <p className="text-lg text-gray-600">Advanced relief for pinched nerves, spinal stenosis, and sciatica.</p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8 text-center">
            <p className="text-lg">
              <strong>Suffering from Leg Pain or Numbness?</strong>
              <br/>
              Get a precision diagnosis and minimally invasive plan.
              <br/>
              <a href="tel:+919778280044" className="text-blue-600 font-bold hover:underline mt-2 inline-block">Call Now: +91-9778280044</a>
            </p>
          </section>

          <section className="mb-12">
             <LocalPathways mode="service" />
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Spinal Decompression?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Spinal decompression surgery refers to a group of procedures performed to relieve pressure on the spinal cord or nerve roots.
                Pressure on these nerves (often caused by bone spurs or herniated discs) can lead to severe pain, numbness, weakness, and difficulty walking.
              </p>
              <p className="mb-4">
                The goal is to create space ("decompress") the nerves, allowing them to heal and function normally again.
              </p>
              <h3 className="text-xl font-semibold text-blue-700 mt-6 mb-3">Common Types of Decompression:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Laminectomy:</strong> Removal of the entire bony arch (lamina) covering the nerves.</li>
                <li><strong>Laminotomy:</strong> Removal of just a small portion of the lamina (less invasive).</li>
                <li><strong>Discectomy:</strong> Removal of a portion of a herniated disc compressing the nerve.</li>
                <li><strong>Foraminotomy:</strong> Enlarging the opening (foramen) where nerve roots exit the spine.</li>
              </ul>
            </div>
          </section>

           <PatientJourneySection title="Treatment Journey" steps={JOURNEY_STEPS} />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Minimally Invasive Advantage</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Endoscopic Decompression</h3>
                <p className="text-gray-600">
                  Using a tiny camera and specialized instruments, Dr. Sayuj can perform decompression through a sub-centimeter incision.
                  This means less muscle damage, less pain, and a faster return to daily life.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Microscopic Decompression</h3>
                <p className="text-gray-600">
                  Using a high-powered operating microscope allows for extreme precision, ensuring that the nerve is freed without touching or damaging it.
                </p>
              </div>
            </div>
          </section>

          <CostTransparencySection costs={COSTS} disclaimer="Estimates include hospital stay and surgeon fees. Implants (if fusion is required) are charged separately." />

          <OutcomeMetricsSection procedure="Spinal Decompression" />

           <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Who Needs Surgery?</h2>
             <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="text-lg mb-4">Surgery is recommended when:</p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Nerve pain (sciatica) persists despite medication and physiotherapy.</li>
                  <li>You have difficulty walking or standing for long periods (claudication).</li>
                  <li>There is progressive numbness or weakness in the legs or feet.</li>
                  <li>Loss of bowel or bladder control (Cauda Equina Syndrome) - <strong>Emergency!</strong></li>
                </ul>
             </div>
          </section>

          <section className="mb-12">
            <TeleconsultationForm pageSlug="/services/spinal-decompression-surgery-hyderabad" service="Spinal Decompression" />
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
            <ReviewedBy lastReviewed="2026-01-10" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
