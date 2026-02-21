import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Microscope, HeartHandshake, Clock } from 'lucide-react';
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
  title: 'Vertebroplasty & Kyphoplasty Hyderabad | Fracture Treatment',
  description: 'Expert Vertebroplasty & Kyphoplasty in Hyderabad. Instant pain relief for Osteoporotic Spine Fractures. Minimally Invasive Cement Injection by Dr Sayuj.',
  canonicalPath: '/services/kyphoplasty-vertebroplasty-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/kyphoplasty-vertebroplasty-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Vertebroplasty%20%26%20Kyphoplasty&subtitle=Fracture%20Care%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Vertebroplasty Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Vertebroplasty%20%26%20Kyphoplasty&subtitle=Fracture%20Care%20in%20Hyderabad`],
  },
};

const fractureStories = patientStories
  .filter((story) => story.tags.includes('fracture') || story.tags.includes('spine'))
  .slice(0, 2);

const ARTICLE_SOURCES = getServiceSources('minimally-invasive-spine-surgery'); // Re-using spine sources as relevant

// Google Business Profile JSON-LD

const COSTS = [
  {
    procedure: 'Vertebroplasty (Single Level)',
    range: '₹1,10,000 - ₹1,40,000',
    recovery: '1-2 days',
    includes: ['Bone cement', 'Surgeon fees', 'Fluoroscopy', 'Day care stay']
  },
  {
    procedure: 'Balloon Kyphoplasty',
    range: '₹1,50,000 - ₹2,00,000',
    recovery: '1-2 days',
    includes: ['Kyphoplasty Balloon Kit', 'Bone cement', 'Height restoration']
  },
  {
    procedure: 'Vertebral Biopsy + Cement',
    range: '₹1,25,000 - ₹1,60,000',
    recovery: '2 days',
    includes: ['Biopsy needle', 'Histopathology', 'Cement injection']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'Diagnosis',
    description: 'MRI and X-ray to confirm acute fracture and edema.'
  },
  {
    title: 'Pre-Procedure',
    description: 'Basic blood work. No general anaesthesia required usually.'
  },
  {
    title: 'The Procedure',
    description: '30-45 mins per level under local anaesthesia and sedation.'
  },
  {
    title: 'Immediate Relief',
    description: 'Pain relief is often instantaneous as the cement stabilizes the bone.'
  },
  {
    title: 'Mobilization',
    description: 'Walk within 2-3 hours after the procedure.'
  },
  {
    title: 'Discharge',
    description: 'Go home the same evening or next morning.'
  }
];

export default function VertebroplastyKyphoplastyPage() {
  const procedures = [
    {
      title: 'Vertebroplasty',
      description: 'Injection of medical-grade bone cement into a fractured vertebra to stabilize it and relieve pain.',
      benefits: ['Instant pain relief', 'Prevents further collapse', 'Local anaesthesia', 'Day care procedure'],
      recovery: '1-2 days'
    },
    {
      title: 'Balloon Kyphoplasty',
      description: 'Uses a small balloon to restore the height of the collapsed vertebra before injecting cement.',
      benefits: ['Restores spine height', 'Corrects kyphosis (hunchback)', 'Reduces cement leakage risk', 'Quick recovery'],
      recovery: '1-2 days'
    },
    {
      title: 'Vertebral Body Biopsy',
      description: 'Taking a small sample of bone during the procedure to rule out infection or tumor.',
      benefits: ['Accurate diagnosis', 'Done in same sitting', 'Minimally invasive', 'Safe'],
      recovery: '1-2 days'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between Vertebroplasty and Kyphoplasty?',
      answer:
        'Vertebroplasty involves injecting cement directly into the fractured bone to stabilize it. Kyphoplasty uses a balloon first to create a cavity and restore height before injecting cement. Kyphoplasty is better if there is significant height loss.'
    },
    {
      question: 'Is general anaesthesia required?',
      answer:
        'Usually, no. Both procedures can be performed under local anaesthesia with mild sedation (Monitored Anaesthesia Care), making it safe for elderly patients with other health issues.'
    },
    {
      question: 'How quickly does the pain go away?',
      answer:
        'Most patients experience significant pain relief within 2 to 24 hours after the procedure. The cement hardens in minutes, providing immediate stability.'
    },
    {
      question: 'Are these procedures safe for elderly patients?',
      answer:
        'Yes, these are specifically designed for elderly patients with osteoporosis. Since they are minimally invasive and avoid general anaesthesia, they are very safe even for those 80+ years old.'
    },
    {
      question: 'Can I walk after surgery?',
      answer:
        'Yes, we encourage patients to walk within 2-3 hours after the procedure. Early mobilization helps prevent complications like blood clots and pneumonia.'
    },
    {
      question: 'What is the cost of Vertebroplasty in Hyderabad?',
      answer:
        'The cost typically ranges from ₹1.1 Lakh to ₹1.4 Lakh depending on the number of levels and type of cement used. Insurance usually covers this procedure.'
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
          { name: 'Vertebroplasty & Kyphoplasty', path: '/services/kyphoplasty-vertebroplasty-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/kyphoplasty-vertebroplasty-hyderabad`} />
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Vertebroplasty & Kyphoplasty in Hyderabad</h1>
          <AuthorByline
            publishedOn="2025-10-27"
            updatedOn="2026-01-15"
            className="justify-center mb-4"
          />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Advanced <strong>Cement Augmentation</strong> for Osteoporotic Fractures.
            Experience <span className="text-blue-700 font-semibold">Instant Pain Relief</span> and
            <span className="text-blue-700 font-semibold"> Same-Day Discharge</span> at Yashoda Hospital.
          </p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100 shadow-sm text-center">
          <p className="text-gray-800 text-lg mb-4">
            <strong>Yashoda Hospital, Malakpet</strong> • Room No. 317, OPD Block
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
             <a href="tel:+919778280044" className="flex items-center text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
               📞 +91-9778280044
             </a>
             <Link href="/appointments" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
               Book Appointment
             </Link>
          </div>
        </section>

        <section className="mb-12">
            <LocalPathways mode="service" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Vertebroplasty?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Vertebroplasty and Kyphoplasty are minimally invasive procedures used to treat painful <strong>vertebral compression fractures (VCFs)</strong> in the spine, most commonly caused by osteoporosis.
            </p>
            <p className="text-gray-700 mb-6">
              When a spinal bone fractures, it collapses, causing severe back pain and a hunched posture. These procedures involve injecting a special medical cement into the fractured bone. This cement hardens quickly, stabilizing the fracture and providing significant pain relief.
            </p>
             <p className="text-gray-700 mb-6">
              If you have been diagnosed with an <Link href="/conditions/osteoporotic-spine-fracture-hyderabad" className="text-blue-600 hover:underline">osteoporotic spine fracture</Link>, early intervention can prevent long-term deformity.
            </p>
          </div>
        </section>

        <PatientJourneySection title="Procedure Steps" steps={JOURNEY_STEPS} />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Procedures We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{procedure.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{procedure.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {procedure.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-blue-600 font-medium mt-auto">
                  Recovery: {procedure.recovery}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-lg border border-blue-100 shadow-sm p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Why Choose Dr. Sayuj Krishnan?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Precision</h3>
              <p className="text-sm text-gray-600">High-resolution fluoroscopy guidance for perfect cement placement.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-sm text-gray-600">Strict protocols to prevent cement leakage complications.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Recovery</h3>
              <p className="text-sm text-gray-600">90% of patients go home the same day or next morning.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Geriatric Care</h3>
              <p className="text-sm text-gray-600">Specialized team for managing elderly patients with comorbidities.</p>
            </div>
          </div>
        </section>

        <CostTransparencySection costs={COSTS} />

        <OutcomeMetricsSection procedure="Vertebroplasty/Kyphoplasty" />

        <section className="mb-12">
          <TeleconsultationForm pageSlug="/services/kyphoplasty-vertebroplasty-hyderabad" service="Vertebroplasty" />
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

        <SourceList sources={ARTICLE_SOURCES} heading="Medical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2026-01-15" />
          <NAP />
        </section>
      </div>
    </div>
    </>
  );
}
