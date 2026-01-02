import type { Metadata } from "next";
import Link from "next/link";
import SchemaScript from "@/app/_components/SchemaScript";
import LocalNAP from "@/app/_components/LocalNAP";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import ReviewedBy from '@/app/_components/ReviewedBy';
import { SITE_URL } from "@/src/lib/seo";
import { sources } from '../../blog/sources';

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/conditions/spine-tumor-surgery-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Spine Tumor Surgery in Hyderabad",
    description:
      "Expert surgical care for spinal cord tumours, metastatic spine tumours, and vertebral lesions with Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Spinal Tumor",
      alternateName: "Spinal Neoplasm",
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Back pain worsening at night",
        "Loss of sensation or weakness in limbs",
        "Difficulty walking",
        "Loss of bowel or bladder control",
      ],
      possibleTreatment: [
        "Microsurgical resection",
        "Spinal stabilisation",
        "Stereotactic radiosurgery",
        "Decompression surgery",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are all spine tumours cancerous?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Many spinal tumours are benign (non-cancerous) but can still cause paralysis by compressing the spinal cord. Others may be metastases from cancer elsewhere.",
        },
      },
      {
        "@type": "Question",
        name: "Is paralysis after surgery common?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With modern intraoperative neuromonitoring and microsurgical techniques, the risk of new deficits is significantly minimised. The goal is often to prevent paralysis.",
        },
      },
      {
        "@type": "Question",
        name: "How long is the recovery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hospital stay is typically 4-7 days depending on whether spinal fusion was performed. Full rehabilitation may take weeks to months.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Conditions",
        item: `${SITE_URL}/conditions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Spine Tumor Surgery Hyderabad",
        item: CANONICAL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Sayuj Krishnan",
    medicalSpecialty: "Neurosurgery",
    url: SITE_URL,
    sameAs: [],
    telephone: "+91 9778280044",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 317, OPD Block, Yashoda Hospital, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
    },
    affiliation: {
      "@type": "MedicalClinic",
      name: "Yashoda Hospital Malakpet",
    },
  },
] as const;

const faqItems = [
  {
    question: "Are all spine tumours cancerous?",
    answer:
      "No. Many primary spinal tumours (like meningiomas or schwannomas) are benign but dangerous because they compress the spinal cord. Metastatic tumours (spread from lung, breast, etc.) are malignant and require comprehensive oncological care.",
  },
  {
    question: "Will I need spinal fusion?",
    answer:
      "If the tumour has destroyed the vertebral bone or if removing the tumour makes the spine unstable, we perform spinal fusion (fixation with screws and rods) to restore stability and alignment.",
  },
  {
    question: "How do you protect nerves during surgery?",
    answer:
      "We use continuous intraoperative neuromonitoring (IONM) which tests nerve function in real-time. This warns the surgeon immediately if any manipulation threatens nerve integrity, allowing for safer resection.",
  },
  {
    question: "What is the role of radiosurgery?",
    answer:
      "Stereotactic radiosurgery (like CyberKnife or Gamma Knife) delivers high-dose radiation to the tumour while sparing healthy spinal cord tissue. It is often used for metastatic tumours or residual benign tumours.",
  },
  {
    question: "Do you treat metastatic spine tumours?",
    answer:
      "Yes. We work closely with medical and radiation oncologists. Surgery is often the first step to relieve spinal cord compression and stabilise the spine before radiation or chemotherapy begins.",
  },
] as const;

const references = [
  {
    label: "American Association of Neurological Surgeons — Spinal Tumors",
    url: "https://www.aans.org/patients/conditions-treatments/spinal-tumors/",
  },
  {
    label: "National Cancer Institute — Spine Tumor Overview",
    url: "https://www.cancer.gov/types/spine",
  },
  {
    label: "Spine Universe — Types of Spinal Tumors",
    url: "https://www.spineuniverse.com/conditions/spinal-tumors",
  },
] as const;

export const metadata: Metadata = {
  title: "Spine Tumor Surgery Hyderabad | Dr. Sayuj Krishnan",
  description:
    "Specialized surgical treatment for spinal cord tumours and metastatic spine cancer. Microsurgery and spinal stabilisation by Dr. Sayuj Krishnan at Yashoda Hospital.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Spine Tumor Surgery in Hyderabad",
    description:
      "Advanced care for benign and malignant spinal tumours using microsurgery, neuronavigation, and intraoperative monitoring for safe removal.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Spine Tumor Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spine Tumor Surgery in Hyderabad",
    description:
      "Expert removal of spinal cord tumours and spine metastases with focus on preserving function and mobility.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        alt: "Spine Tumor Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function SpineTumorSurgeryConditionPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="spine-tumor-condition-jsonld" data={schemaData} />

      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-200">
            Spine Oncology Programme · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Spine Tumor Surgery in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-slate-100">
            Comprehensive management of spinal cord tumours and vertebral metastases.
            Combining microsurgical precision with advanced spinal reconstruction
            to relieve pain, restore stability, and preserve neurological function.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.drsayuj.info/appointments?utm_source=seo&utm_medium=page&utm_campaign=spine_tumor_condition"
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600"
            >
              Request Surgical Opinion
            </a>
            <a
              href="https://wa.me/919778280044"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-slate-900"
            >
              WhatsApp MRI Report
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Types of Spinal Tumours We Treat
            </h2>
            <p className="mt-4 text-gray-700">
              Spinal tumours can develop within the spinal cord (intramedullary),
              inside the covering but outside the cord (intradural-extramedullary),
              or in the bones/vertebrae (extradural).
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              <li><strong>Benign Tumours:</strong> Meningiomas, Schwannomas, Neurofibromas.</li>
              <li><strong>Malignant Tumours:</strong> Ependymomas, Astrocytomas.</li>
              <li><strong>Metastatic Tumours:</strong> Cancer spread from lung, breast, prostate, or kidney.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Early diagnosis and intervention are critical to prevent permanent
              paralysis and loss of bladder/bowel function.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              When is Surgery Needed?
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li><strong>Progressive Weakness:</strong> Growing paralysis or loss of sensation.</li>
              <li><strong>Intractable Pain:</strong> Severe pain not relieved by medication, often worse at night.</li>
              <li><strong>Spinal Instability:</strong> Tumour destroying bone, risking vertebral collapse.</li>
              <li><strong>Diagnosis:</strong> Need for biopsy to determine the exact tumour type for oncology treatment.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Surgical Techniques
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Microsurgical Resection
              </h3>
              <p className="mt-3 text-gray-700">
                Using high-magnification microscopes to delicately separate the tumour
                from the spinal cord and nerves. This is the gold standard for benign
                tumours like schwannomas and meningiomas.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Spinal Stabilisation (Fusion)
              </h3>
              <p className="mt-3 text-gray-700">
                If the tumour involves the vertebrae, screws and rods are used to
                rebuild the spine's strength and stability after tumour removal.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Decompression Surgery
              </h3>
              <p className="mt-3 text-gray-700">
                Removing the bone (laminectomy) pushing on the spinal cord to
                create space and immediately relieve pressure, often done in emergencies.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Separation Surgery
              </h3>
              <p className="mt-3 text-gray-700">
                Creating a safe gap between the spinal cord and the tumour to allow
                high-dose radiation (SBRT/CyberKnife) to be delivered safely post-surgery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Advanced Safety Protocols
        </h2>
        <ul className="mt-6 grid gap-4 text-gray-700 md:grid-cols-2">
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • <strong>Neuromonitoring (IONM):</strong> Continuous electrical testing of nerves during surgery to prevent injury.
          </li>
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • <strong>CUSA (Ultrasonic Aspirator):</strong> Device to gently liquefy and remove firm tumours without tugging on the cord.
          </li>
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • <strong>Intraoperative Navigation:</strong> GPS-like guidance to precisely locate deep-seated tumours.
          </li>
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • <strong>Multidisciplinary Care:</strong> Collaboration with medical and radiation oncologists for complete cancer care.
          </li>
        </ul>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recovery &amp; Rehabilitation
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">In-Hospital</h3>
              <p className="mt-2 text-gray-700">
                Pain management and early mobilisation (walking) usually within 24-48 hours.
                Drains are typically removed by day 2 or 3.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Physical Therapy</h3>
              <p className="mt-2 text-gray-700">
                Crucial for regaining strength, balance, and gait. Our team designs
                a specific plan based on your preoperative function.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Oncology Follow-up</h3>
              <p className="mt-2 text-gray-700">
                For malignant tumours, radiation or chemotherapy planning begins
                once the surgical wound has healed (usually 2-3 weeks).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Patient Support &amp; Next Steps
        </h2>
        <p className="mt-4 text-gray-700">
          A diagnosis of a spinal tumour can be overwhelming. We prioritise
          clear communication, rapid evaluation, and compassionate care.
          Dr. Sayuj Krishnan reviews all imaging personally to determine the
          safest and most effective treatment strategy.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/services/minimally-invasive-spine-surgery"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-400"
          >
            <h3 className="font-semibold text-blue-700">
              Minimally Invasive Spine Surgery
            </h3>
            <p className="mt-2 text-gray-700">
              Learn about how keyhole techniques can be applied to certain spinal conditions.
            </p>
          </Link>
          <Link
            href="/patient-stories"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-400"
          >
            <h3 className="font-semibold text-blue-700">
              Patient Success Stories
            </h3>
            <p className="mt-2 text-gray-700">
              Read about recovery journeys of patients who have undergone complex spinal surgeries.
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <summary className="cursor-pointer text-lg font-semibold text-blue-700">
                  {item.question}
                </summary>
                <p className="mt-3 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <LocalNAP />
        <div className="mt-8">
          <YMYLAttribution lastReviewed="2026-01-02" />
        </div>
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Key References</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            {references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AuthorByline
        publishedOn="2026-01-02"
        updatedOn="2026-01-02"
      />

      <SourceList sources={sources['spine-tumor-surgery-hyderabad']} />

      <ReviewedBy />
    </main>
  );
}
