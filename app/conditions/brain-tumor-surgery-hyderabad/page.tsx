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
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import { PhysicianSchema } from "@/src/components/schema/PhysicianSchema";

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/conditions/brain-tumor-surgery-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Brain Tumor Surgery in Hyderabad",
    description:
      "Detailed guidance on brain tumour diagnosis, microsurgery, radiosurgery, and recovery with Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Brain Tumor",
      alternateName: "Intracranial Neoplasm",
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Headache with vomiting",
        "Seizures",
        "Vision or speech changes",
        "Weakness or balance problems",
      ],
      possibleTreatment: [
        "Microsurgical resection",
        "Endoscopic tumour removal",
        "Stereotactic radiosurgery",
        "Chemotherapy and radiation",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is brain tumour surgery always necessary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surgery is advised when the benefits outweigh risks, such as relieving pressure or obtaining diagnosis. Some benign tumours can be monitored with routine imaging.",
        },
      },
      {
        "@type": "Question",
        name: "Will I need radiation after surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "High-grade tumours often need adjuvant radiotherapy or chemotherapy. Benign tumours may not require further treatment if fully removed.",
        },
      },
      {
        "@type": "Question",
        name: "How safe is awake craniotomy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Awake craniotomy is carefully planned with anaesthetists and neuropsychologists to preserve speech or motor function. Complications are rare with experienced teams.",
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
        name: "Brain Tumor Surgery Hyderabad",
        item: CANONICAL,
      },
    ],
  }
] as const;

const faqItems = [
  {
    question: "Is brain tumour surgery always necessary?",
    answer:
      "Not in every case. We balance tumour type, symptom burden, and imaging findings. Some benign or asymptomatic tumours are observed with regular scans, while others benefit from early surgery.",
  },
  {
    question: "Will I need radiation or chemotherapy after surgery?",
    answer:
      "High-grade gliomas typically require chemoradiation. Benign tumours may not need adjuvant therapy if completely removed. Your tumour board plan outlines the next steps.",
  },
  {
    question: "How safe is awake craniotomy?",
    answer:
      "Awake craniotomy is carefully rehearsed with anaesthetists and neuropsychologists, allowing us to map speech and motor function. It helps preserve quality of life when tumours reside in eloquent cortex.",
  },
  {
    question: "How long will I be in hospital?",
    answer:
      "Most people stay three to five days, depending on tumour location and recovery speed. Complex cases may need a longer ICU or rehabilitation stay.",
  },
  {
    question: "Do you offer second opinions?",
    answer:
      "Yes. Share your existing MRI, biopsy report, and treatment plan. We coordinate in-person or teleconsult second opinions and liaise with your referring team.",
  },
] as const;

const references = [
  {
    label: "National Cancer Institute — Adult Brain Tumor Treatment (PDQ®)",
    url: "https://www.cancer.gov/types/brain/patient/adult-brain-treatment-pdq",
  },
  {
    label: "American Association of Neurological Surgeons — Brain Tumor Overview",
    url: "https://www.aans.org/patients/conditions-treatments/brain-tumors/",
  },
  {
    label: "European Association of Neuro-Oncology (EANO) Guidelines",
    url: "https://www.eano.eu/publications/guidelines/",
  },
] as const;

export const metadata: Metadata = {
  title: "Brain Tumor Surgery Hyderabad | Dr. Sayuj Krishnan",
  description:
    "Comprehensive brain tumour evaluation, neuronavigation-guided microsurgery, radiosurgery, and rehabilitation with Dr. Sayuj Krishnan at Yashoda Hospital, Hyderabad.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Brain Tumor Surgery in Hyderabad",
    description:
      "Advanced neurosurgical care including awake craniotomy, endoscopic techniques, and multidisciplinary tumour board support.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Brain Tumor Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Tumor Surgery in Hyderabad",
    description:
      "Advanced neurosurgical care including awake craniotomy, endoscopic techniques, and multidisciplinary tumour board support.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        alt: "Brain Tumor Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function BrainTumorSurgeryConditionPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="brain-tumor-condition-jsonld" data={schemaData} />
      <PhysicianSchema />

      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-200">
            Brain Tumour Programme · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Brain Tumor Surgery in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-slate-100">
            Precision planning, neuronavigation, and intraoperative monitoring
            help us remove tumours safely while protecting speech, memory, and
            motor function. Each plan is reviewed in a multidisciplinary tumour
            board to align surgery, radiosurgery, and oncologic care.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.drsayuj.info/appointments?utm_source=seo&utm_medium=page&utm_campaign=brain_tumor_condition"
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600"
            >
              Request Surgical Opinion
            </a>
            <a
              href="https://wa.me/919778280044"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-slate-900"
            >
              WhatsApp CT / MRI
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Understanding Brain Tumours
            </h2>
            <p className="mt-4 text-gray-700">
              Brain tumours may be benign, atypical, or malignant. Surgery often
              relieves pressure, improves symptoms, and provides tissue for
              precise diagnosis. Decisions account for tumour size, location,
              growth rate, and your overall health. We help patients and families
              understand options clearly before proceeding.
            </p>
            <p className="mt-4 text-gray-700">
              Many lesions benefit from early removal—especially when causing
              seizures, neurological deficits, or mass effect. Others can be
              observed under close MRI surveillance. Together, we decide which
              pathway best protects long-term function.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Diagnostic &amp; Planning Workflow
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Detailed neurological examination and symptom mapping.</li>
              <li>MRI brain with contrast; add fMRI, DTI, or MR spectroscopy for eloquent areas.</li>
              <li>PET-CT or stereotactic biopsy for ambiguous lesions.</li>
              <li>Pre-operative counselling covering goals, risks, and recovery.</li>
              <li>Multidisciplinary tumour board to finalise surgery and adjuvant care.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Surgical &amp; Adjunct Options
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Microsurgical Resection
              </h3>
              <p className="mt-3 text-gray-700">
                Standard craniotomy using high-powered microscopes, ultrasonic
                aspirators, and neuromonitoring. Awake craniotomy preserves speech
                and motor function when tumours rest in eloquent cortex.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Endoscopic &amp; Keyhole Surgery
              </h3>
              <p className="mt-3 text-gray-700">
                Ideal for ventricular tumours, pituitary adenomas, and select
                meningiomas. Smaller incisions reduce bone removal and accelerate
                recovery time.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Stereotactic Biopsy
              </h3>
              <p className="mt-3 text-gray-700">
                Needle biopsy obtains tissue in high-risk or deep-seated lesions
                when open surgery is not immediately feasible. Results guide
                oncology planning.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Radiosurgery &amp; Adjuvant Therapy
              </h3>
              <p className="mt-3 text-gray-700">
                Gamma Knife, LINAC-based radiosurgery, fractionated radiotherapy,
                and chemotherapy are coordinated with partnering oncologists to
                consolidate control after surgery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Safety Measures in Theatre
        </h2>
        <ul className="mt-6 grid gap-4 text-gray-700 md:grid-cols-2">
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • Intraoperative neuromonitoring to protect motor, sensory, and
            cranial nerve function.
          </li>
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • 3D neuronavigation ensuring precise localisation and minimal brain
            retraction.
          </li>
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • Advanced haemostasis techniques to limit blood loss; neuro-anaesthesia
            expertise for complex cases.
          </li>
          <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            • Early post-operative MRI/CT to confirm resection extent and rule out
            complications.
          </li>
        </ul>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recovery &amp; Support
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Hospital Stay</h3>
              <p className="mt-2 text-gray-700">
                Most patients stay three to five days. Early mobilisation, pain
                control, and DVT prophylaxis start in ICU.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Rehabilitation</h3>
              <p className="mt-2 text-gray-700">
                Physiotherapy, occupational therapy, and speech therapy support
                recovery. Return to desk work in four to six weeks for many
                patients.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Follow-up</h3>
              <p className="mt-2 text-gray-700">
                MRI at 48 hours, three months, and then tailored to histology.
                Survivorship plans integrate oncology appointments and imaging.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h3 className="text-lg font-semibold text-blue-700">
              When to Seek Urgent Care
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Sudden severe headache with vomiting</li>
              <li>• New-onset seizures</li>
              <li>• Worsening weakness, speech difficulty, or vision loss</li>
              <li>• Discharge from wound, fever, or altered consciousness</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Patient Support &amp; Next Steps
        </h2>
        <p className="mt-4 text-gray-700">
          Nurse navigators coordinate imaging, financial counselling, and
          rehabilitation. Psych-oncology services help families manage anxiety
          before and after surgery. Teleconsult slots are available for outstation
          follow-ups.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/services/brain-tumor-surgery-hyderabad"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-400"
          >
            <h3 className="font-semibold text-blue-700">
              Explore the Brain Tumor Surgery Service
            </h3>
            <p className="mt-2 text-gray-700">
              Learn about operative techniques, technology, and day-by-day
              recovery expectations.
            </p>
          </Link>
          <Link
            href="/symptoms/signs-of-brain-tumor"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-400"
          >
            <h3 className="font-semibold text-blue-700">
              Recognise Early Warning Signs
            </h3>
            <p className="mt-2 text-gray-700">
              Understand headache, seizure, and cognitive red flags that require
              urgent imaging.
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4 mb-12">
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
          <LocalPathways mode="condition" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <LocalNAP />
        <div className="mt-8">
          <YMYLAttribution lastReviewed="2025-02-14" />
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
        publishedOn="2025-02-15"
        updatedOn="2025-10-19"
      />
      
      <SourceList sources={sources['brain-tumor-surgery-cost-hyderabad']} />
      
      <ReviewedBy />
    </main>
  );
}
