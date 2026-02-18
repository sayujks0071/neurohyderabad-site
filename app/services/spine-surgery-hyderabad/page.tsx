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
import { getServiceSources } from '../sources';
import MedicalWebPageSchema from '../../components/schemas/MedicalWebPageSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import SurgeryComparisonTable from '@/src/components/SurgeryComparisonTable';

const SERVICE_SLUG = 'spine-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Spine Surgery Hyderabad | Endoscopic Specialist | Dr Sayuj',
  description:
    'Top Spine Surgeon Hyderabad. Endoscopic keyhole surgery for slip disc & sciatica. 90% success, affordable cost. Walk same day. Book at Yashoda Malakpet.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'spine surgery hyderabad',
    'spine surgeon near me',
    'minimally invasive spine surgery hyderabad',
    'spine specialist yashoda hospital',
    'endoscopic spine surgery hyderabad',
    'spine surgery consultation hyderabad',
  ],
  openGraph: {
    title: 'Spine Surgery Hyderabad | Minimally Invasive Specialist',
    description:
      'Minimally invasive spine surgery in Hyderabad. Walk the next day with keyhole endoscopic techniques for slip disc & sciatica. Expert care at Yashoda.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Spine Surgery in Hyderabad'
        )}&subtitle=${encodeURIComponent('MISS, Endoscopic & Complex Reconstruction')}`,
        width: 1200,
        height: 630,
        alt: 'Spine Surgery in Hyderabad – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const serviceSchema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Comprehensive Spine Surgery in Hyderabad',
  description:
    'Full-spectrum spine surgery including minimally invasive, endoscopic and complex reconstruction care delivered at Yashoda Hospital, Malakpet by Dr. Sayuj Krishnan.',
});

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const faqs = [
  {
    question: 'How do I know if I need spine surgery instead of physiotherapy?',
    answer:
      'If pain persists beyond 6-8 weeks of guided physiotherapy, causes progressive weakness, or interferes with bladder/bowel control, advanced imaging and surgical consultation are essential. Dr. Sayuj reviews MRI findings personally to explain conservative versus surgical options.',
  },
  {
    question: 'What is the recovery time after minimally invasive spine surgery?',
    answer:
      'Most minimally invasive lumbar decompressions allow assisted walking within 3-4 hours and discharge within 24 hours. Desk professionals generally resume work within 10-14 days, while manual workers may require 4-6 weeks and a staged return-to-work protocol.',
  },
  {
    question: 'Do you treat patients from outside Hyderabad?',
    answer:
      'Yes. Our coordination team assists patients travelling from across Telangana, Andhra Pradesh, and neighbouring states with scheduling, accommodation, and follow-up teleconsultations.',
  },
  {
    question: 'Is insurance and cashless treatment available for spine surgery?',
    answer:
      'Yes, we accept all major insurance providers and offer cashless facilities at Yashoda Hospitals. Our team handles the pre-authorization paperwork for seamless processing.',
  },
  {
    question: 'How do robotic and endoscopic spine surgeries differ?',
    answer:
      'Endoscopic surgery uses a keyhole camera for decompression. Robotic surgery uses a mechanical arm for precise screw placement during fusion. We offer both technologies at Yashoda Malakpet for optimal results.',
  },
];

export default function SpineSurgeryHyderabadPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: 'Spine Surgery in Hyderabad', path: `/services/${SERVICE_SLUG}/` },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <MedicalWebPageSchema
        title="Spine Surgery Hyderabad | Minimally Invasive Specialist - Dr. Sayuj"
        description="Advanced minimally invasive spine surgery in Hyderabad. Walk the next day with keyhole endoscopic techniques for slip disc & sciatica. Expert care at Yashoda Malakpet."
        pageSlug={`/services/${SERVICE_SLUG}/`}
        pageType="service"
        serviceOrCondition="Spine Surgery"
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/${SERVICE_SLUG}`} />
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Spine Surgery in Hyderabad', href: `/services/${SERVICE_SLUG}/` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">
              Comprehensive Spine Surgery
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Advanced Spine Surgery in Hyderabad
            </h1>
            <AuthorByline
              publishedOn="2025-09-08"
              updatedOn="2025-10-19"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              Living with chronic back or neck pain can affect every part of your life. At Yashoda Hospital, Malakpet, Dr. Sayuj
              Krishnan delivers advanced spine surgery solutions for slipped discs, stenosis, instability, and deformity with a
              strong focus on minimally invasive techniques. If you are suffering from radiating leg pain, learn more about our specialized <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-700 underline font-medium">sciatica relief</Link> protocols.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book a Spine Consultation
              </Link>
              <Link
                href="/patient-stories/"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                View Spine Case Stories
              </Link>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">What Sets Malakpet Care Apart</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Fellowship-trained spine surgeon with advanced endoscopic expertise</li>
              <li>• On-site imaging and day-care MISS OT within Yashoda Hospital, Malakpet</li>
              <li>• Dedicated physiotherapy and return-to-work planning for Hyderabad&rsquo;s workforce</li>
              <li>• Personalised counselling for patients and family members at every step</li>
            </ul>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Endoscopic vs. Traditional Spine Surgery</h2>
          <p className="text-gray-700 mb-6">
            Understanding the difference between traditional open surgery and modern endoscopic techniques is crucial for making an informed decision. Dr. Sayuj prioritizes tissue-preserving methods, especially <Link href="/services/endoscopic-spine-surgery-hyderabad/" className="text-blue-700 underline hover:text-blue-800">endoscopic spine surgery</Link>, that allow for faster recovery.
          </p>
          <SurgeryComparisonTable />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Advanced Surgical Solutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Endoscopic Spine Surgery</h3>
              <p className="text-gray-700 text-sm mb-4">
                Ultra-minimally invasive &quot;keyhole&quot; surgery for slip discs and sciatica. 7mm incision, no muscle cutting, and same-day walking.
              </p>
              <Link href="/services/endoscopic-spine-surgery-hyderabad/" className="text-blue-600 font-semibold hover:underline text-sm">
                Learn about Keyhole Surgery →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Microdiscectomy</h3>
              <p className="text-gray-700 text-sm mb-4">
                Gold-standard microscopic removal of herniated disc fragments relieving nerve compression. Precise visualization ensures nerve safety.
              </p>
              <Link href="/services/microdiscectomy-surgery-hyderabad/" className="text-blue-600 font-semibold hover:underline text-sm">
                Explore Microdiscectomy →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Spinal Fusion (TLIF/PLIF)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Stabilization for slipped vertebrae (spondylolisthesis) or spinal instability. Uses screws and cages to restore alignment and relieve pain.
              </p>
              <Link href="/services/spinal-fusion-surgery-hyderabad/" className="text-blue-600 font-semibold hover:underline text-sm">
                View Fusion Details →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Cervical Disc Replacement</h3>
              <p className="text-gray-700 text-sm mb-4">
                Motion-preserving surgery for neck disc herniations. Maintains natural neck movement unlike traditional fusion surgery.
              </p>
              <Link href="/services/cervical-disc-replacement-hyderabad/" className="text-blue-600 font-semibold hover:underline text-sm">
                Check Disc Replacement →
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Conditions We Treat with Spine Surgery</h2>
          <p className="text-gray-700 mb-4">
            Surgery is typically considered when targeted physiotherapy, medication, and pain procedures fail to control symptoms
            or when neurological deficits threaten long-term function. We routinely help Hyderabad patients dealing with:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">
                <Link href="/conditions/slip-disc-treatment-hyderabad" className="hover:underline hover:text-blue-600">
                  Lumbar &amp; Cervical Disc Herniation:
                </Link>
              </strong>{' '}
              Persistent arm/leg pain, numbness, or weakness due to nerve compression.
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">
                <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="hover:underline hover:text-blue-600">
                  Spinal Canal Stenosis:
                </Link>
              </strong>{' '}
              Walking intolerance and heaviness relieved by rest, often seen in older adults.
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">
                <Link href="/conditions/spondylolisthesis-treatment-hyderabad" className="hover:underline hover:text-blue-600">
                  Spondylolisthesis:
                </Link>
              </strong>{' '}
              Slippage causing mechanical back pain or nerve symptoms that require stabilization.
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <strong className="text-blue-800">
                <Link href="/conditions/spine-tumor-surgery-hyderabad" className="hover:underline hover:text-blue-600">
                  Spine Tumors &amp; Infections:
                </Link>
              </strong>{' '}
              Lesions requiring biopsy, decompression, or stabilization for spinal cord protection.
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <div className="bg-white border border-green-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Is Spine Surgery Safe for Elderly Patients?</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Advanced age is no longer a barrier to spine surgery. Our &quot;Awake&quot; and &quot;Twilight&quot; anesthesia protocols allow many procedures to be performed without general anesthesia, significantly reducing risks for heart and lung complications.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-700">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> No General Anesthesia (Awake/Twilight options)</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Minimal Blood Loss (Endoscopic technique)</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Early Mobilization (Walk same day)</li>
                </ul>
                <Link href="/services/awake-spine-surgery-hyderabad" className="text-green-700 font-semibold hover:underline">
                  Learn about Awake Spine Surgery →
                </Link>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                 <h3 className="font-bold text-green-900 mb-2">Robotic Precision</h3>
                 <p className="text-sm text-gray-700 mb-4">
                   For complex cases in older adults, we utilize <Link href="/services/robotic-spine-surgery-hyderabad" className="text-green-700 font-medium hover:underline">Robotic Spine Surgery</Link> to ensure 99.9% accuracy in implant placement, further enhancing safety.
                 </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">⚠️</span> Red Flags: When Spine Surgery Cannot Wait
            </h2>
            <p className="text-red-900 mb-6 font-medium">
              While most spine conditions can be managed conservatively, certain symptoms indicate a medical emergency requiring immediate neurosurgical attention to prevent permanent paralysis.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-red-100">
                <h3 className="font-bold text-red-800 mb-2">Cauda Equina Syndrome</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Loss of bowel or bladder control (incontinence or retention)</li>
                  <li>• Numbness in the groin or saddle area</li>
                  <li>• Severe weakness in both legs</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border border-red-100">
                <h3 className="font-bold text-red-800 mb-2">Progressive Neurological Deficits</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Sudden &quot;Foot Drop&quot; (inability to lift the foot)</li>
                  <li>• Rapidly worsening arm or leg weakness</li>
                  <li>• Unbearable pain despite strong medication</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-red-800 text-sm mb-3">
                <strong>If you experience these symptoms, do not wait.</strong> Go to the nearest emergency room or contact us immediately.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Contact Emergency Team
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">What to Expect at Yashoda Hospital, Malakpet</h2>
            <p className="text-gray-700 mb-6">
              Every patient meets Dr. Sayuj personally for a detailed review of symptoms, neurological exam, and imaging studies.
              When conservative therapy fails or weakness progresses, surgical decompression or stabilization provides durable
              protection for the spinal cord and nerves. Whenever possible, full endoscopic or tubular approaches are used to
              minimise tissue disruption.
            </p>
            <p className="text-gray-700">
              For unstable or deformity cases, navigation-guided fusion constructs ensure precise alignment and long-term
              stability. Our care team in Malakpet coordinates physiotherapy, pain management, and return-to-work planning for
              office professionals and manual workers alike.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">The Consultation Pathway</h3>
            <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
              <li>Bring MRI/CT scans to your first visit for an on-the-spot review.</li>
              <li>Receive a detailed explanation of the pathology and all treatment options.</li>
              <li>Discuss minimally invasive or fusion approaches tailored to your lifestyle.</li>
              <li>Plan post-operative milestones with structured physiotherapy support.</li>
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Serving Patients Across Hyderabad</h2>
          <p className="text-gray-700 mb-6">
            Our Malakpet location is convenient for patients travelling from Dilsukhnagar, LB Nagar, Charminar, and Koti. We
            assist with corporate and insurance approvals, travel planning for families, and tele-follow-ups for those who cannot
            attend frequent in-person visits.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pre-Visit Preparation</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Bring MRI/CT scans and prior medical reports for review</li>
                <li>• Inform us of blood thinners, diabetes, or other comorbidities</li>
                <li>• Coordinate ahead for insurance or corporate cashless paperwork</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Post-Operative Support</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Structured physiotherapy at Yashoda Hospital and partner clinics</li>
                <li>• Teleconsults for progress tracking after discharge</li>
                <li>• Return-to-work guidance tailored to desk or manual roles</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Clinic Location & Contact</h2>
            <p className="text-gray-700">
              Consultations and surgeries are performed at Yashoda Hospital, Malakpet—equipped with dedicated neurosurgical OT
              suites, neurocritical care, and intraoperative neuromonitoring. Call ahead for MRI review clinics or to schedule a
              second opinion on prior surgical plans.
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
              href="/blog/return-to-work-after-endoscopic-discectomy-hyderabad/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Read Recovery Guidance
            </Link>
          </div>
        </section>



      <div className="mt-12">
        <LocalPathways mode="service" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
        <ReviewedBy lastReviewed="2025-10-19" />
      </main>
    </>
  );
}
