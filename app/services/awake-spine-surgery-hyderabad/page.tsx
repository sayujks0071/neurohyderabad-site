import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/src/lib/seo';
import { makeMetadata } from '@/app/_lib/meta';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import AuthorByline from '@/app/_components/AuthorByline';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import MedicalWebPageSchema from '@/app/components/schemas/MedicalWebPageSchema';

const SERVICE_SLUG = 'awake-spine-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Awake Spine Surgery Hyderabad | Local Anesthesia | Dr. Sayuj',
  description:
    'Awake endoscopic spine surgery for high-risk patients. Local anesthesia, no general anesthesia needed. Faster recovery & same-day discharge in Hyderabad.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Awake%20Spine%20Surgery&subtitle=Endoscopic%20%7C%20Regional%20Anaesthesia`,
        width: 1200,
        height: 630,
        alt: 'Awake Spine Surgery in Hyderabad - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Awake%20Spine%20Surgery&subtitle=Endoscopic%20%7C%20Regional%20Anaesthesia`],
  },
};

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const FAQS = [
  {
    question: 'Who is a good candidate for awake spine surgery?',
    answer:
      'Patients with cardiac, pulmonary, or metabolic risks who should avoid prolonged general anaesthesia, elderly patients, and those needing short endoscopic decompressions or discectomy often benefit most.',
  },
  {
    question: 'What type of anaesthesia is used?',
    answer:
      'We combine spinal or epidural anaesthesia with light conscious sedation. You breathe on your own, feel no pain, and we monitor comfort throughout the case.',
  },
  {
    question: 'Is recovery faster than conventional surgery?',
    answer:
      'Yes. Awake endoscopic approaches use 6–8 mm incisions with minimal muscle disruption. Most patients sit up within hours and go home the same day or after one night of observation.',
  },
];

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Awake Spine Surgery', path: `/services/${SERVICE_SLUG}` },
];

export default function AwakeSpineSurgeryPage() {
  const pageUrl = `${SITE_URL}/services/${SERVICE_SLUG}`;

  return (
    <main className="prose mx-auto max-w-5xl px-4 py-12">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema faqs={FAQS} pageUrl={pageUrl} />
      <MedicalWebPageSchema
        title="Awake Spine Surgery in Hyderabad | Local Anesthesia Specialist"
        description="Awake endoscopic spine surgery in Hyderabad by Dr. Sayuj. No general anesthesia risks. Ideal for elderly and high-risk patients."
        pageSlug={`/services/${SERVICE_SLUG}`}
        pageType="service"
        serviceOrCondition="Awake Spine Surgery"
        breadcrumbs={breadcrumbs}
      />

      <h1 className="text-4xl font-bold text-blue-900">Awake Spine Surgery in Hyderabad</h1>
      <p className="text-lg text-gray-700">
        Awake endoscopic spine surgery lets high-risk or elderly patients avoid the stress of general anaesthesia while still receiving
        precise decompression or discectomy. I perform these procedures at Yashoda Hospital, Malakpet using regional blocks, conscious
        sedation, and full neuromonitoring so you stay safe and recover faster.
      </p>

      <AuthorByline publishedOn="2025-10-24" updatedOn="2025-10-24" className="mb-6" />

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-blue-900">Who benefits most</h2>
        <ul className="mt-3 space-y-2 text-gray-800">
          <li>• Patients with cardiac, lung, or metabolic risk factors who should minimise general anaesthesia exposure.</li>
          <li>• Elderly patients needing lumbar stenosis decompression or herniated disc removal.</li>
          <li>• Those seeking faster mobilisation with same-day or next-day discharge.</li>
          <li>• Workers who need to return to activity quickly with less postoperative grogginess.</li>
        </ul>
      </section>

      <h2 className="text-2xl font-semibold text-blue-800">How the awake endoscopic approach works</h2>
      <p>
        We use a spinal or epidural block with light IV sedation. You breathe on your own and do not feel pain. A 6–8 mm working channel
        endoscope allows targeted decompression with minimal muscle disruption. Throughout the procedure, we monitor comfort, leg movement,
        and nerve signals to keep the procedure safe and precise.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-blue-800">When we choose an awake plan</h3>
          <ul className="mt-2 space-y-2 text-gray-700">
            <li>• Lumbar stenosis or disc prolapse needing short-segment decompression</li>
            <li>• Patients with sleep apnoea, COPD, or heart disease where GA risk is higher</li>
            <li>• Prior anaesthesia intolerance (severe nausea, confusion, or agitation)</li>
            <li>• Desire for faster recovery and fewer opioids post-op</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-blue-800">Procedure flow</h3>
          <ol className="mt-2 space-y-2 text-gray-700 list-decimal list-inside">
            <li>Pre-op assessment with anaesthesia and cardiac clearance when needed.</li>
            <li>Regional block with light sedation; continuous monitoring of comfort.</li>
            <li>Endoscopic decompression through a keyhole 6–8 mm port.</li>
            <li>Immediate leg movement check in OT; walk with physiotherapist within hours.</li>
            <li>Same-day discharge for most patients; tele-follow-up at 48 hours.</li>
          </ol>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-blue-800">Cost and logistics</h2>
      <p>
        Awake endoscopic procedures typically mirror our minimally invasive spine packages, with savings from shorter hospital stay and reduced
        medication. Most patients are discharged the same day or after one night. Insurance and cashless options are available; share your MRI
        and policy details to receive a personalised estimate.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800">What to expect after surgery</h2>
      <ul className="space-y-2 text-gray-700">
        <li>• Walk within hours; guided physiotherapy before discharge.</li>
        <li>• Desk work in 7–10 days for most discectomy/stenosis cases.</li>
        <li>• Clear wound-care plan and 24/7 helpline for concerns.</li>
        <li>• Follow-up at 48 hours (tele), day 7, and day 30 with customised rehab.</li>
      </ul>

      <section className="not-prose mt-10 rounded-xl border border-green-100 bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-800">Schedule an awake spine consult</h3>
        <p className="text-gray-700">
          Share your MRI and symptoms to confirm if an awake endoscopic approach is right for you. High-risk or elderly patients often gain
          safer anaesthesia profiles and faster recovery with this protocol.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/appointments"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Book Consultation
          </Link>
          <a
            href="https://wa.me/919778280044"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-300 px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            WhatsApp MRI
          </a>
          <a
            href="tel:+919778280044"
            className="rounded-full border px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Call +91 97782 80044
          </a>
        </div>
      </section>

      <div className="not-prose mt-12">
        <LocalPathways mode="service" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} />
      <ReviewedBy lastReviewed="2025-10-24" reviewerName="Dr. Sayuj Krishnan" />
      <NAP />
    </main>
  );
}
