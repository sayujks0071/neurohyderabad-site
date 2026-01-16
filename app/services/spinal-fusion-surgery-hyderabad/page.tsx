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
  title: 'Spinal Fusion Surgery in Hyderabad | TLIF & Fixation Surgery',
  description: 'Expert spinal fusion surgery (TLIF/PLIF) by Dr. Sayuj Krishnan. Stabilization for spondylolisthesis and fractures. Minimally invasive screw fixation.',
  canonicalPath: '/services/spinal-fusion-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "spinal fusion surgery hyderabad",
    "lumbar fusion surgery",
    "spinal fixation surgery",
    "spondylolisthesis surgery hyderabad",
    "TLIF surgery cost hyderabad",
    "spine screw surgery"
  ],
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/spinal-fusion-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Spinal%20Fusion&subtitle=Stabilization%20Surgery`,
        width: 1200,
        height: 630,
        alt: 'Spinal Fusion - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

// Google Business Profile JSON-LD
const gbpSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Spinal Fusion Surgery | Dr. Sayuj Krishnan",
  "url": "https://www.drsayuj.info/services/spinal-fusion-surgery-hyderabad/?utm_source=google&utm_medium=organic&utm_campaign=gbp_fusion",
  "image": "https://www.drsayuj.info/images/og-default.jpg",
  "description": "Expert spinal fusion surgery for instability and spondylolisthesis by Dr. Sayuj Krishnan in Hyderabad. Minimally invasive TLIF options available.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.drsayuj.info/services/spinal-fusion-surgery-hyderabad/"
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
  "priceRange": "₹₹₹",
  "sameAs": [
    "https://www.instagram.com/drsayujneurohyd",
    "https://www.linkedin.com/in/drsayujkrishnan",
    "https://www.youtube.com/@drsayujneurohyd"
  ]
};

const COSTS = [
  {
    procedure: 'Open TLIF (Fusion)',
    range: '₹2,50,000 - ₹3,20,000',
    recovery: '6-8 weeks',
    includes: ['Surgeon fees', 'Implants (Indian/US)', '5 Days Hospital Stay']
  },
  {
    procedure: 'Minimally Invasive TLIF (MIS-TLIF)',
    range: '₹3,00,000 - ₹3,80,000',
    recovery: '4-6 weeks',
    includes: ['Keyhole Incision', 'Advanced Implants', '3-4 Days Stay']
  },
  {
    procedure: 'Instrumentation Only (Fixation)',
    range: '₹2,00,000 - ₹2,50,000',
    recovery: '4-6 weeks',
    includes: ['Screw Fixation', '3-4 Days Stay', 'Medications']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'X-Ray & MRI',
    description: 'Dynamic X-rays confirm instability (bones moving abnormally) requiring fusion.'
  },
  {
    title: 'Surgical Planning',
    description: 'Choosing the right size of screws and cages customized to your anatomy.'
  },
  {
    title: 'Decompression & Fixation',
    description: 'Nerves are freed (laminectomy) and bones are fixed with screws/rods to stop painful movement.'
  },
  {
    title: 'Fusion Process',
    description: 'Bone graft is placed to help the vertebrae grow together into one solid bone over 3-6 months.'
  },
  {
    title: 'Post-Op Rehab',
    description: 'Walking from Day 2. Brace support for 4-6 weeks while bone healing starts.'
  }
];

export default function SpinalFusionPage() {
  const faqs = [
    {
      question: 'What is spinal fusion surgery?',
      answer: 'Spinal fusion is a surgery to permanently connect two or more vertebrae in your spine, eliminating motion between them. It uses screws, rods, and bone grafts to create a solid bridge of bone.'
    },
    {
      question: 'When is spinal fusion necessary?',
      answer: 'It is needed when the spine is unstable, such as in spondylolisthesis (slipped vertebra), fractures, severe arthritis, or after removing a large spinal tumor. Simple back pain rarely needs fusion.'
    },
    {
      question: 'Will I lose flexibility?',
      answer: 'Fusion limits motion only at the fused segment. Since most motion comes from the hip and cervical spine, fusing one or two lumbar levels typically does not noticeably restrict daily activities.'
    },
    {
      question: 'What is the success rate?',
      answer: 'For properly selected patients with instability, success rates are over 90%. Pain relief is significant once the fusion solidifies.'
    },
    {
      question: 'How long do implants stay in the body?',
      answer: 'The titanium screws and rods are designed to stay in your body permanently. They do not trigger metal detectors and rarely need removal unless there is an infection or discomfort.'
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
          { name: 'Spinal Fusion', path: '/services/spinal-fusion-surgery-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/spinal-fusion-surgery-hyderabad`} />
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Spinal Fusion Surgery (TLIF/PLIF)</h1>
            <AuthorByline
              publishedOn="2026-01-03"
              updatedOn="2026-01-03"
              className="justify-center mb-4"
            />
            <p className="text-lg text-gray-600">Stabilizing the spine to treat Spondylolisthesis and Instability.</p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-center">
              <strong>Diagnosed with Spondylolisthesis?</strong>
              <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a>
            </p>
          </section>

          <section className="mb-12">
             <LocalPathways mode="service" />
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Spinal Fusion?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Spinal fusion (often called "Fixation Surgery") is a procedure to weld two or more vertebrae together.
                The goal is to stop painful motion caused by instability. Dr. Sayuj uses advanced titanium implants and bone grafts to ensure a solid fusion.
              </p>
              <p className="text-gray-700 mb-6">
                The most common technique we use is <strong>TLIF (Transforaminal Lumbar Interbody Fusion)</strong>, which allows for nerve decompression and 360-degree fusion with minimal nerve retraction.
              </p>
            </div>
          </section>

           <PatientJourneySection title="Fusion Surgery Journey" steps={JOURNEY_STEPS} />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj for Spinal Fixation?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Precision & Safety</h3>
                <p className="text-gray-600">
                  Using C-arm fluoroscopy and intraoperative navigation, screw placement is precise to the millimeter, avoiding nerve injury.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Minimally Invasive TLIF</h3>
                <p className="text-gray-600">
                  For suitable candidates, MIS-TLIF is performed through small incisions, reducing blood loss and muscle damage compared to open surgery.
                </p>
              </div>
            </div>
          </section>

          <CostTransparencySection costs={COSTS} />

          <OutcomeMetricsSection procedure="Spinal Fusion" />

           <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Conditions Treated</h2>
             <div className="grid md:grid-cols-2 gap-4">
                <ul className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700 list-disc list-inside">
                  <li><strong>Spondylolisthesis:</strong> Slippage of one vertebra over another.</li>
                  <li><strong>Spinal Fractures:</strong> Due to trauma or osteoporosis.</li>
                </ul>
                <ul className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700 list-disc list-inside">
                  <li><strong>Recurrent Disc Herniation:</strong> After failed previous surgeries.</li>
                  <li><strong>Spinal Tumors:</strong> Requiring reconstruction after removal.</li>
                </ul>
             </div>
          </section>

          <section className="mb-12">
            <TeleconsultationForm pageSlug="/services/spinal-fusion-surgery-hyderabad" service="Spinal Fusion" />
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
