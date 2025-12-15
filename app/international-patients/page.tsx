import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/src/lib/seo';
import { makeMetadata } from '@/app/_lib/meta';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import AuthorByline from '@/app/_components/AuthorByline';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';

const baseMetadata = makeMetadata({
  title: 'International Patients | Video Second Opinion & Surgery Planning in Hyderabad',
  description:
    'International patient pathway for neurosurgery in Hyderabad: $35 video second opinion, MRI sharing via WhatsApp, travel planning, and post-op follow-up. Dr. Sayuj Krishnan S (Yashoda Hospital, Malakpet).',
  canonicalPath: '/international-patients',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/international-patients`,
    siteName: 'Dr. Sayuj Krishnan S - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('International Patients')}&subtitle=${encodeURIComponent(
          'Video second opinion • Surgery planning in Hyderabad'
        )}`,
        width: 1200,
        height: 630,
        alt: 'International Patients – Dr. Sayuj Krishnan S',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [
      `${SITE_URL}/api/og?title=${encodeURIComponent('International Patients')}&subtitle=${encodeURIComponent(
        'Video second opinion • Surgery planning in Hyderabad'
      )}`,
    ],
  },
};

const FAQS = [
  {
    question: 'Do you offer international video consultations?',
    answer:
      'Yes. We offer an international video second opinion for $35 for patients outside India. You can share MRI/CT reports in advance and we will guide you through diagnosis, treatment options, and next steps.',
  },
  {
    question: 'What is the OPD consultation fee in Hyderabad?',
    answer:
      'Local OPD consultation fees are typically listed on local booking platforms (e.g., ₹700). Final fees can vary by hospital policy and appointment type; our team will confirm the current fee when you book.',
  },
  {
    question: 'How do I share MRI scans?',
    answer:
      'You can share key images/reports via WhatsApp for fast triage. For full-resolution studies (DICOM), we can guide you on secure upload options during scheduling.',
  },
  {
    question: 'Can you help with travel planning for surgery in Hyderabad?',
    answer:
      'Yes. Once surgery is advised, our coordinator shares a surgery plan, expected length of stay, pre-op tests, and a follow-up schedule so you can plan flights and accommodation.',
  },
  {
    question: 'Do you provide post-op follow-up after international surgery?',
    answer:
      'Yes. Post-op follow-ups can be done via teleconsult after discharge, and you will receive a written recovery plan with red flags and rehabilitation milestones.',
  },
];

export default function InternationalPatientsPage() {
  const pageUrl = `${SITE_URL}/international-patients`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'International Patients', path: '/international-patients' },
        ]}
      />
      <FAQPageSchema faqs={FAQS} pageUrl={pageUrl} />

      <main className="prose mx-auto max-w-5xl px-4 py-12">
        <header className="not-prose mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Medical tourism support</p>
          <h1 className="text-4xl font-bold text-blue-900">International Patients</h1>
          <p className="mt-4 text-lg text-gray-700">
            If you’re outside India and want a clear plan before travelling, we offer a structured video second opinion and surgery
            planning pathway in Hyderabad.
          </p>
          <AuthorByline publishedOn="2025-12-15" updatedOn="2025-12-15" className="mt-4" />
        </header>

        <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-blue-900">Quick start</h2>
          <ul className="mt-3 space-y-2 text-gray-800">
            <li>
              • <strong>International video second opinion:</strong> $35
            </li>
            <li>
              • <strong>WhatsApp triage:</strong> share MRI report + symptom summary
            </li>
            <li>
              • <strong>Surgery planning:</strong> written estimate + expected length of stay
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/appointments"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Book a consult
            </Link>
            <a
              href="https://wa.me/919778280044"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-green-300 px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              WhatsApp MRI
            </a>
          </div>
        </section>

        <h2 className="text-2xl font-semibold text-blue-800">What to send before your call</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• MRI/CT reports (and DICOM if available)</li>
          <li>• Symptom timeline (when it started, what worsened, current limitations)</li>
          <li>• Medication list + allergies</li>
          <li>• Prior surgery/discharge summaries (if any)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-800">If surgery is advised</h2>
        <p>
          We share a written plan covering recommended procedure, estimated length of stay, pre-operative tests, and follow-up schedule.
          For cost transparency formatting, see:{' '}
          <Link href="/services/spine-surgery-cost-hyderabad">Spine Surgery Cost in Hyderabad</Link>.
        </p>

        <ReviewedBy lastReviewed="2025-12-15" reviewerName="Dr. Sayuj Krishnan S" />
        <NAP />
      </main>
    </>
  );
}

