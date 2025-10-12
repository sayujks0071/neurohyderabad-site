import type { Metadata } from "next";
import Link from "next/link";
import SchemaScript from "@/app/_components/SchemaScript";
import LocalNAP from "@/app/_components/LocalNAP";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import { SITE_URL } from "@/src/lib/seo";

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Trigeminal Neuralgia Treatment in Hyderabad",
    description:
      "Explore medicines, microvascular decompression, radiosurgery and percutaneous options for trigeminal neuralgia in Hyderabad with Dr. Sayuj Krishnan.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Trigeminal Neuralgia",
      alternateName: "TN",
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Electric shock-like facial pain",
        "Trigger-based pain episodes",
        "Facial hypersensitivity",
      ],
      possibleTreatment: [
        "Carbamazepine therapy",
        "Microvascular decompression",
        "Gamma Knife radiosurgery",
        "Percutaneous rhizotomy",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is trigeminal neuralgia curable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many people achieve long-term relief with procedures like microvascular decompression or radiosurgery. Recurrence is possible, so regular follow-up is important.",
        },
      },
      {
        "@type": "Question",
        name: "How long does Gamma Knife radiosurgery take to work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pain relief usually develops progressively over two to eight weeks after radiosurgery. Medication tapering begins once sustained improvement is confirmed.",
        },
      },
      {
        "@type": "Question",
        name: "What are the risks of microvascular decompression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Complication rates are low in experienced hands but include hearing changes, facial numbness, or cerebrospinal fluid leak. Comprehensive monitoring reduces these risks.",
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
        name: "Trigeminal Neuralgia Treatment Hyderabad",
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
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr. Sayuj Krishnan - Brain & Spine Clinic",
    url: SITE_URL,
    areaServed: "Hyderabad",
    telephone: "+91 9778280044",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 317, OPD Block, Yashoda Hospital, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
    },
  },
] as const;

const faqItems = [
  {
    question: "Is trigeminal neuralgia curable?",
    answer:
      "Many patients achieve sustained pain relief with procedures such as microvascular decompression or radiosurgery. Recurrence can happen, so structured follow-up remains important.",
  },
  {
    question: "How long does Gamma Knife radiosurgery take to work?",
    answer:
      "Relief is gradual. Most people notice improvement two to eight weeks after treatment, and medicines are tapered only when symptoms remain controlled.",
  },
  {
    question: "What are the risks of MVD?",
    answer:
      "Serious complications are uncommon, particularly with neuromonitoring. Potential risks include hearing changes, facial numbness, or cerebrospinal fluid leak, all discussed before surgery.",
  },
  {
    question: "Can trigeminal neuralgia return after treatment?",
    answer:
      "Yes, especially years later. Recurrence does not rule out further treatment—repeat MVD, radiosurgery, or percutaneous options can still help.",
  },
  {
    question: "Is medication enough for everyone?",
    answer:
      "Medicines control pain for many people, but side effects or breakthrough pain may prompt procedures. We decide together based on symptom control and MRI findings.",
  },
] as const;

const references = [
  {
    label: "American Association of Neurological Surgeons (AANS) — Trigeminal Neuralgia",
    url: "https://www.aans.org/patients/conditions-treatments/trigeminal-neuralgia/",
  },
  {
    label: "National Institute of Neurological Disorders and Stroke (NINDS) — Trigeminal Neuralgia Information Page",
    url: "https://www.ninds.nih.gov/health-information/disorders/trigeminal-neuralgia",
  },
  {
    label: "National Institute for Health and Care Excellence (NICE) — Guideline NG173: Neuropathic pain in adults",
    url: "https://www.nice.org.uk/guidance/ng173",
  },
] as const;

export const metadata: Metadata = {
  title: "Trigeminal Neuralgia Treatment Hyderabad — Facial Pain Care",
  description:
    "Relief options including medicines, microvascular decompression, stereotactic radiosurgery and percutaneous procedures delivered in Hyderabad by Dr. Sayuj Krishnan.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Trigeminal Neuralgia Treatment in Hyderabad",
    description:
      "Personalised pathways for facial pain relief including MVD, radiosurgery and percutaneous procedures with Dr. Sayuj Krishnan.",
    url: CANONICAL,
    type: "article",
  },
};

export default function TrigeminalNeuralgiaTreatmentPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="tn-jsonld" data={schemaData} />
      <section className="bg-blue-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Facial Pain Clinic · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Trigeminal Neuralgia Treatment in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Fellowship-trained neurosurgeon Dr. Sayuj Krishnan offers the full
            spectrum of trigeminal neuralgia care—from medication optimisation to
            microvascular decompression (MVD), Gamma Knife radiosurgery, and
            percutaneous procedures—at Yashoda Hospital, Malakpet.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.drsayuj.info/appointments?utm_source=seo&utm_medium=page&utm_campaign=tn_condition"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Book Consultation
            </a>
            <a
              href="https://wa.me/919778280044"
              className="rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              WhatsApp Care Team
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Understanding Trigeminal Neuralgia
            </h2>
            <p className="mt-4 text-gray-700">
              Trigeminal neuralgia (TN) causes sudden, electric shock-like facial
              pain. Attacks may last seconds, cluster throughout the day, and be
              triggered by seemingly harmless activities such as brushing teeth,
              eating, smiling, or feeling a gust of wind. Most classical cases
              occur when a blood vessel compresses the trigeminal nerve at the
              brainstem. Secondary TN can stem from multiple sclerosis, tumours,
              or facial trauma, making specialist evaluation vital.
            </p>
            <p className="mt-4 text-gray-700">
              Early consultation allows us to separate classical TN from
              conditions that mimic it—atypical facial pain, cluster headache,
              dental issues, or sinus pathology. Getting the diagnosis right
              ensures we choose the safest path forward.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Common Symptoms &amp; Triggers
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Shock-like, stabbing facial pain lasting seconds to minutes</li>
              <li>• Pain typically restricted to one side (cheek, jaw, or forehead)</li>
              <li>• Triggers include touch, chewing, speaking, shaving, or wind</li>
              <li>• Anxiety about daily activities due to fear of triggering attacks</li>
              <li>• Background aching between episodes in mixed variants</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-700">
            Our Diagnostic Workflow
          </h3>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-gray-700">
            <li>
              Detailed history and neurological examination, mapping trigger
              zones and assessing cranial nerve function.
            </li>
            <li>
              High-resolution MRI brain with CISS/FIESTA sequences to visualise
              vascular compression, demyelination, or masses.
            </li>
            <li>
              MR angiography or CT angiography when vascular anatomy needs
              further definition.
            </li>
            <li>
              Dental or ENT consultation when symptoms suggest peripheral causes.
            </li>
            <li>
              Facial pain board review to align medical and surgical plans.
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Treatment Pathways We Offer
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                1. Medication Optimisation
              </h3>
              <p className="mt-3 text-gray-700">
                Carbamazepine and oxcarbazepine remain first-line. Alternatives
                such as gabapentin, baclofen, or lamotrigine are introduced if
                side effects emerge or control wanes. We monitor sodium levels,
                liver function, and blood counts to keep therapy safe.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                2. Microvascular Decompression (MVD)
              </h3>
              <p className="mt-3 text-gray-700">
                Through a small craniectomy, the compressing vessel is separated
                from the trigeminal nerve with a Teflon pad. With neuronavigation
                and neuromonitoring, MVD delivers the highest chance of durable
                pain freedom—over 70% at ten years in specialty centres.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                3. Gamma Knife Radiosurgery
              </h3>
              <p className="mt-3 text-gray-700">
                Outpatient stereotactic radiosurgery is ideal for patients who
                prefer a non-open option or have comorbidities. Relief typically
                builds over several weeks; dosing is planned to preserve normal
                sensation.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                4. Percutaneous Procedures
              </h3>
              <p className="mt-3 text-gray-700">
                Balloon compression, radiofrequency rhizotomy, or glycerol
                rhizolysis provide rapid relief, often as day-care procedures.
                They are useful for recurrence after MVD or when immediate pain
                control is required.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
              <h3 className="text-lg font-semibold text-blue-700">
                5. Managing Secondary TN
              </h3>
              <p className="mt-3 text-gray-700">
                When MRI shows a tumour, aneurysm, or demyelinating plaque, the
                care plan focuses on that underlying cause. Our team coordinates
                neurology, oncology, and rehabilitation inputs so every aspect is
                covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recovery &amp; Long-Term Follow-up
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">After MVD</h3>
            <p className="mt-2 text-gray-700">
              ICU monitoring for 24 hours and discharge by day three for most
              patients. Desk work often resumes in about two weeks; heavy lifting
              waits four to six weeks.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">After Radiosurgery</h3>
            <p className="mt-2 text-gray-700">
              Same-day discharge with follow-up at six weeks and three months.
              Medication taper starts once durable relief is confirmed.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">After Percutaneous Care</h3>
            <p className="mt-2 text-gray-700">
              Day-care procedure with transient numbness expected. Review within
              a week ensures sensation is settling and pain remains controlled.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-red-100 bg-red-50 p-6">
          <h3 className="text-lg font-semibold text-red-700">
            When to Seek Urgent Attention
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Severe pain despite medication titration</li>
            <li>• Medication side effects such as imbalance or allergic rash</li>
            <li>• Facial numbness, double vision, or weakness</li>
            <li>• Pain switching sides or becoming constant and burning</li>
          </ul>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-700">
            Related Resources
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <Link
                href="/services/minimally-invasive-spine-surgery"
                className="text-blue-700 underline"
              >
                Minimally Invasive Spine Surgery Services
              </Link>
            </li>
            <li>
              <Link
                href="/patient-stories"
                className="text-blue-700 underline"
              >
                Patient Stories — Facial Pain &amp; Neurosurgery Outcomes
              </Link>
            </li>
            <li>
              <Link
                href="/appointments"
                className="text-blue-700 underline"
              >
                Book an Appointment
              </Link>
            </li>
          </ul>
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
    </main>
  );
}
