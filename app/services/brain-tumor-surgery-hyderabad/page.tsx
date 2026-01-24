import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import MapEmbed from '@/components/MapEmbed';
import { makeMetadata } from '@/app/_lib/meta';
import { SITE_URL } from '@/src/lib/seo';
import { buildLocalServiceSchema } from '@/src/lib/schema/localService';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import TrustProof from '@/app/_components/TrustProof';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import { getServiceSources } from '../sources';
import { patientStories } from '@/src/content/stories';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import MedicalWebPageSchema from '../../components/schemas/MedicalWebPageSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const SERVICE_SLUG = 'brain-tumor-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Brain Tumor Surgery Hyderabad',
  description:
    'Expert brain tumor surgery in Hyderabad. Neuronavigation & Awake Craniotomy for max safety. High success rates with Dr. Sayuj Krishnan. Book Appointment.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'brain tumor surgery hyderabad',
    'brain surgeon hyderabad',
    'neuronavigation surgery hyderabad',
    'awake craniotomy hyderabad',
    'yashoda hospital brain tumor specialist',
    'brain tumor surgery cost hyderabad',
  ],
  openGraph: {
    title: 'Brain Tumor Surgery Hyderabad | Advanced Safety & Care',
    description:
      'Advanced brain tumor surgery in Hyderabad with Dr. Sayuj Krishnan. High success rates with Neuronavigation & Awake Craniotomy for faster recovery. Trusted Neuro-Oncology care.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Brain Tumor Surgery in Hyderabad'
        )}&subtitle=${encodeURIComponent('Neuronavigation & Neuromonitoring')}`,
        width: 1200,
        height: 630,
        alt: 'Brain Tumor Surgery in Hyderabad – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const serviceSchema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Advanced Brain Tumor Surgery in Hyderabad',
  description:
    'Neuronavigation-guided brain tumor surgery with neuromonitoring, awake craniotomy, and integrated oncology care at Yashoda Hospital Malakpet.',
});

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const treatmentHighlights = [
  {
    title: 'Neuronavigation Microsurgery',
    description:
      'Real-time navigation systems ensure maximal safe tumor resection while preserving eloquent brain structures.',
  },
  {
    title: 'Awake Craniotomy & Functional Mapping',
    description:
      'Speech and motor mapping techniques protect critical pathways during tumor removal in eloquent cortex.',
  },
  {
    title: 'Multidisciplinary Tumor Board',
    description:
      'Collaborative care with neuro-oncology, radiation oncology, and rehabilitation teams for comprehensive plans.',
  },
];

const tumorTypes = [
  'Gliomas and astrocytomas (Grade I-IV)',
  'Meningiomas and skull base tumors',
  'Pituitary adenomas and sellar lesions',
  'Metastatic brain tumors and radiosurgery planning',
  'Acoustic neuromas and cranial nerve tumors',
];

const patientSupport = [
  'Second-opinion service for complex tumors and recurrent disease',
  'Pre-surgical counselling with caregiver briefing and digital resources',
  'Post-operative ICU monitored care with daily neurosurgeon rounds',
  'Rehabilitation pathways for speech, swallowing, and motor recovery',
  'Financial counselling for insurance and corporate approvals',
];

const faqs = [
  {
    question: 'How quickly can surgery be scheduled after diagnosis?',
    answer:
      'Urgent cases with progressive neurological deficits are prioritised within 48-72 hours. Elective cases are scheduled after tumour board discussions and pre-anaesthesia evaluation, often within 5-7 working days.',
  },
  {
    question: 'Do you treat patients referred from other hospitals?',
    answer:
      'Yes. We regularly handle referrals for complex skull base tumours and recurrent gliomas. Bring imaging, histopathology reports, and prior treatment summaries for a complete review.',
  },
  {
    question: 'Is a craniotomy always required?',
    answer:
      'Not always. Some lesions are best managed with stereotactic biopsy, radiosurgery, or endoscopic skull base approaches. Surgical planning is individualised based on tumour type, size, and location.',
  },
  {
    question: 'How long does recovery take after brain tumor surgery?',
    answer: 'Most patients spend 1-2 days in the ICU for monitoring and move to the ward for another 3-4 days. You can usually return to light daily activities within 2-3 weeks, though full recovery depends on the specific tumor type and location.'
  },
  {
    question: 'What is the cost of brain tumor surgery in Hyderabad?',
    answer: 'The cost of brain tumor surgery varies significantly based on tumor complexity, ICU stay duration, and technology used (neuronavigation, monitoring). Biopsies may start from ₹1,00,000, while complex craniotomies can range higher. We provide transparent estimates after scan review.'
  }
];

const COSTS = [
  {
    procedure: 'Craniotomy (Tumor Excision)',
    range: 'Ask for Estimate',
    recovery: '5-7 Days (ICU + Ward)',
    includes: ['Microsurgery', 'Neuronavigation', 'ICU Stay (2-3 days)']
  },
  {
    procedure: 'Awake Craniotomy',
    range: 'Ask for Estimate',
    recovery: '3-5 Days',
    includes: ['Functional Mapping', 'Anaesthesia Team', 'Rapid Recovery Protocol']
  },
  {
    procedure: 'Stereotactic Biopsy',
    range: '₹1,00,000 - ₹1,50,000',
    recovery: '1-2 Days',
    includes: ['Needle Biopsy', 'Histopathology', 'Day Care/Short Stay']
  },
  {
    procedure: 'Endoscopic Pituitary Surgery',
    range: '₹2,00,000 - ₹3,00,000',
    recovery: '3-4 Days',
    includes: ['Transnasal Approach', 'Endocrinology Review', 'Skull Base Repair']
  }
];

// Google Business Profile JSON-LD for Brain Tumor Surgery

export default function BrainTumorSurgeryHyderabadPage() {
  const relevantStories = patientStories.filter(story => {
    const tags = story.tags.join(' ').toLowerCase();
    return tags.includes('brain') || tags.includes('meningioma');
  }).slice(0, 2);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: 'Brain Tumor Surgery in Hyderabad', path: `/services/${SERVICE_SLUG}/` },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <MedicalWebPageSchema
        title="Brain Tumor Surgery Hyderabad | Advanced Safety & Care – Dr. Sayuj"
        description="Advanced brain tumor surgery in Hyderabad with Dr. Sayuj Krishnan. High success rates with Neuronavigation & Awake Craniotomy for faster recovery. Trusted Neuro-Oncology care."
        pageSlug={`/services/${SERVICE_SLUG}/`}
        pageType="service"
        serviceOrCondition="Brain Tumor Surgery"
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/${SERVICE_SLUG}`} />

      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Brain Tumor Surgery in Hyderabad', href: `/services/${SERVICE_SLUG}/` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Neurosurgical Oncology</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Advanced Brain Tumor Surgery in Hyderabad
            </h1>
            <AuthorByline
              publishedOn="2024-09-04"
              updatedOn="2025-02-20"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              A brain tumor diagnosis demands expert surgical guidance. At Yashoda Hospital, Malakpet, Dr. Sayuj Krishnan provides
              compassionate, cutting-edge care using microsurgery, neuronavigation, and a full multidisciplinary team to deliver
              the safest possible outcomes for patients across Hyderabad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book a Neuro-Oncology Consult
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                About Dr. Sayuj
              </Link>
            </div>
          </div>
          <TrustProof serviceType="brain" className="mb-6" stories={relevantStories} />
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Why Malakpet Patients Trust Our Team</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• High-powered microsurgery protecting eloquent brain regions</li>
              <li>• Advanced neuronavigation and neuromonitoring suites in Yashoda Malakpet</li>
              <li>• Integrated tumour board with oncology, radiology, and pathology support</li>
              <li>• Dedicated counselling for families throughout diagnosis and recovery</li>
            </ul>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Types of Brain Tumors We Treat</h2>
          <p className="text-gray-700 mb-4">
            We routinely manage tumours ranging from benign meningiomas to high-grade gliomas. Each plan balances maximal safe
            resection with protection of critical structures.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">Gliomas &amp; Glioblastoma:</strong> Customized planning with adjuvant oncology
              coordination.
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">Meningiomas &amp; Skull Base Tumors:</strong> Precision microsurgery preserving
              cranial nerve function.
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">Pituitary &amp; Sellar Lesions:</strong> Endoscopic and minimally invasive
              approaches when appropriate.
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">Metastatic &amp; Pediatric Tumors:</strong> Integrated care with oncology and
              rehabilitation services.
            </li>
          </ul>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">What to Expect at Yashoda Hospital, Malakpet</h2>
            <p className="text-gray-700 mb-6">
              Your journey begins with a comprehensive review of symptoms, imaging, and medical history. When surgery is advised,
              Dr. Sayuj details the planned approach—whether a craniotomy, endoscopic skull base procedure, or biopsy—and
              explains how neuronavigation and neuromonitoring enhance safety.
            </p>
            <p className="text-gray-700">
              Post-operatively, patients recover in the neuro ICU with close neurosurgical supervision. Our Malakpet team coordinates
              adjuvant therapy planning, rehabilitation, and teleconsults to keep patients and families informed every step of the
              way.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">The Consultation Pathway</h3>
            <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
              <li>Bring MRI/CT scans and prior reports for a detailed review.</li>
              <li>Receive an explanation of surgical strategy and potential risks.</li>
              <li>Meet the oncology and rehabilitation teams when required.</li>
              <li>Plan post-operative visits and tele-follow-ups before discharge.</li>
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Trusted by Patients Across Telangana & AP</h2>
          <p className="text-gray-700 mb-6">
            We routinely handle referrals from oncology centres in Secunderabad, Warangal, Nalgonda, Guntur, and Vishakhapatnam.
            Our coordination team assists with medical visas, accommodation, and digital follow-up, ensuring continuity of care no
            matter where you live.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pre-Visit Checklist</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Latest MRI brain with contrast and CT angiogram if available</li>
                <li>• Histopathology reports or biopsy slides for review</li>
                <li>• Blood investigations and comorbidity records (diabetes, hypertension)</li>
                <li>• Insurance documentation for cashless admissions</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Post-Operative Follow-Up</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• In-person visits at 1 week, 1 month, and 3 months</li>
                <li>• Teleconsults for outstation and international patients</li>
                <li>• Coordination with local oncologists for adjuvant therapy</li>
                <li>• Rehabilitation and neuropsychology referrals as needed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Added CostTransparencySection */}
        <CostTransparencySection
          costs={COSTS}
          disclaimer="Costs for brain tumor surgery depend heavily on tumor size, ICU duration, and specialized equipment (neuronavigation). The above ranges are indicative. Insurance coverage is available for most procedures."
        />

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Clinic Location & Neuro-Oncology Desk</h2>
            <p className="text-gray-700">
              Brain tumor surgeries are performed at Yashoda Hospital, Malakpet, Hyderabad, equipped with hybrid OTs, intraoperative
              neuromonitoring, and 24/7 critical care. For urgent evaluations, call ahead and our neuro-oncology desk will facilitate
              immediate imaging review.
            </p>
            <NAP className="bg-gray-50 border border-gray-200 rounded-xl p-6" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Map & Directions</h3>
              <MapEmbed />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-semibold text-blue-800">Frequently Asked Questions</h3>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-blue-900">{faq.question}</p>
                <p className="text-sm text-blue-900/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
            <Link
              href="/blog/brain-tumor-surgery-cost-hyderabad/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Brain Tumor Resources
            </Link>
          </div>
        </section>

        <LocalPathways mode="service" />

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
        <ReviewedBy lastReviewed="2025-02-20" />
      </main>
    </>
  );
}
