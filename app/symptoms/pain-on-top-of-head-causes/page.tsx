import type { Metadata } from "next";
import Link from "next/link";
import SchemaScript from "@/app/_components/SchemaScript";
import LocalNAP from "@/app/_components/LocalNAP";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import { SITE_URL } from "@/src/lib/seo";

const CANONICAL = `${SITE_URL}/symptoms/pain-on-top-of-head-causes`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Pain on Top of Head Causes",
    description:
      "Learn common and serious causes of vertex headaches, red flags, and treatment options available in Hyderabad with Dr. Sayuj Krishnan.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Headache",
      alternateName: "Vertex headache",
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Pain on the crown of the head",
        "Neck stiffness",
        "Occipital neuralgia",
        "Cervicogenic headache",
      ],
      possibleTreatment: [
        "Physiotherapy",
        "Medication management",
        "Occipital nerve block",
        "Minimally invasive spine surgery",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is pain on the top of my head always serious?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most cases relate to tension or posture. Seek medical care when pain is severe, persistent, or accompanied by neurological symptoms.",
        },
      },
      {
        "@type": "Question",
        name: "Can cervical spine problems cause vertex headaches?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Cervical radiculopathy and facet arthropathy frequently refer pain to the top of the head. Imaging and examination confirm the diagnosis.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an MRI for head pain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MRI is recommended when headaches persist despite treatment, present with red flags, or occur alongside neurological deficits. Your specialist will advise based on symptoms.",
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
        name: "Symptoms",
        item: `${SITE_URL}/symptoms`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pain on Top of Head Causes",
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
    question: "Is pain on the top of my head always serious?",
    answer:
      "Most vertex headaches relate to tension, migraine, or posture strain. However, severe or persistent pain—especially with neurological symptoms—should be reviewed urgently.",
  },
  {
    question: "Can cervical spine issues cause pain on top of the head?",
    answer:
      "Yes. Cervicogenic headaches and cervical radiculopathy often refer pain to the vertex. Imaging and clinical examination help confirm the source.",
  },
  {
    question: "Do I need an MRI immediately?",
    answer:
      "Not always. MRI is recommended if headaches persist despite care, present with red flags, or occur alongside neurological deficits. We guide the timing after assessment.",
  },
  {
    question: "What home strategies can help?",
    answer:
      "Ergonomic adjustments, posture exercises, hydration, sleep hygiene, and stress management reduce muscle tension. Persistent pain still warrants medical review.",
  },
  {
    question: "Are nerve blocks safe?",
    answer:
      "Occipital nerve blocks are minimally invasive and effective when performed by experienced specialists. They help both diagnose and treat occipital neuralgia.",
  },
] as const;

const references = [
  {
    label: "National Health Service (NHS) — Headaches overview",
    url: "https://www.nhs.uk/conditions/headaches/",
  },
  {
    label: "American Migraine Foundation — Cervicogenic headache",
    url: "https://americanmigrainefoundation.org/resource-library/understanding-cervicogenic-headache/",
  },
  {
    label: "National Institute of Neurological Disorders and Stroke (NINDS) — Occipital Neuralgia",
    url: "https://www.ninds.nih.gov/health-information/disorders/occipital-neuralgia",
  },
] as const;

export const metadata: Metadata = {
  title: "Pain on Top of Head Causes — Vertex Headache Guide Hyderabad",
  description:
    "Explore posture, migraine, cervicogenic, and occipital neuralgia causes of vertex headaches, plus red flags needing neurosurgical review in Hyderabad.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Pain on Top of Head — Causes & Care Pathway",
    description:
      "Understand vertex headache causes, red flags, and when to consult Dr. Sayuj Krishnan for cervical spine or nerve evaluation in Hyderabad.",
    url: CANONICAL,
    type: "article",
  },
};

export default function PainOnTopOfHeadCausesPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="pain-top-head-jsonld" data={schemaData} />

      <section className="bg-emerald-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-emerald-200">
            Headache &amp; Spine Clinic · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Pain on Top of the Head — Causes &amp; Next Steps
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Vertex headaches can stem from posture, migraines, or nerve
            compression. Discover the most common causes, urgent warning signs,
            and when to escalate to a neurosurgical evaluation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Common causes of vertex head pain
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-700">
              Tension-type headache
            </h3>
            <p className="mt-3 text-gray-700">
              Triggered by long desk hours, stress, dehydration, or eye strain.
              Presents as a tight band or pressure around the scalp and often
              improves with rest, hydration, and stretching.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-700">Migraine</h3>
            <p className="mt-3 text-gray-700">
              Moderate to severe throbbing pain that may migrate to the top of
              the head. Often accompanied by nausea, light sensitivity, or aura.
              Acute medication and prophylaxis reduce attack frequency.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-700">
              Posture-related strain (“tech neck”)
            </h3>
            <p className="mt-3 text-gray-700">
              Forward head posture stresses upper cervical muscles and joints.
              Common among IT professionals and students. Ergonomics and targeted
              strengthening deliver relief.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-700">
              Cervicogenic headache
            </h3>
            <p className="mt-3 text-gray-700">
              Pain that starts in the neck and radiates to the scalp due to facet
              or disc pathology. Worsens with neck movement; often linked to
              cervical radiculopathy or stenosis.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
            <h3 className="text-lg font-semibold text-emerald-700">
              Occipital neuralgia
            </h3>
            <p className="mt-3 text-gray-700">
              Irritation of the occipital nerves causes stabbing or burning pain
              radiating to the crown. May follow muscle spasm, nerve entrapment,
              or whiplash injuries. Nerve blocks or minimally invasive release can
              provide long-term relief.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Red flags — seek urgent medical care
          </h2>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>• Sudden “thunderclap” headache or severe pain with vomiting</li>
            <li>• Headache with fever, neck stiffness, or rash</li>
            <li>• Neurological symptoms: weakness, vision loss, speech changes</li>
            <li>• Pain after head injury with drowsiness or confusion</li>
            <li>• Progressive headaches in adults over 50 with systemic symptoms</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Visit the nearest emergency department immediately if any red flag is
            present. Early intervention can rule out life-threatening causes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Diagnostic approach at Yashoda Hospital, Malakpet
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-gray-700">
          <li>Detailed history including triggers, occupation, sleep, and stress.</li>
          <li>Neurological and cervical spine examination for posture and nerve function.</li>
          <li>
            Imaging: MRI brain/CT head for red flags; MRI cervical spine when nerve compression is
            suspected.
          </li>
          <li>Blood pressure, blood tests, or eye evaluation as indicated.</li>
          <li>Multidisciplinary review with physiotherapy, pain medicine, or neurology.</li>
        </ol>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Treatment pathways
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-700">
                Lifestyle optimisation
              </h3>
              <p className="mt-3 text-gray-700">
                Ergonomic assessments, posture correction, hydration goals, and
                sleep hygiene reduce muscle tension. We provide stretching
                sequences for desk work.
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-700">
                Physiotherapy &amp; manual therapy
              </h3>
              <p className="mt-3 text-gray-700">
                Cervical stabilisation, scapular strengthening, and manual
                release address cervicogenic headaches and posture-driven pain.
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-700">
                Medication management
              </h3>
              <p className="mt-3 text-gray-700">
                Tailored plans for migraine, tension-type, or neuralgia include
                acute and preventive therapies. We monitor side effects closely.
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-700">
                Nerve blocks &amp; interventional pain care
              </h3>
              <p className="mt-3 text-gray-700">
                Occipital nerve blocks, radiofrequency ablation, or trigger point
                injections relieve refractory cases and help confirm diagnosis.
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
              <h3 className="text-lg font-semibold text-emerald-700">
                Minimally invasive spine surgery
              </h3>
              <p className="mt-3 text-gray-700">
                When MRI shows nerve compression, endoscopic foraminotomy or
                decompression offers motion-preserving relief. Surgery is a last
                resort after conservative measures.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Living well during recovery
        </h2>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>• Keep a headache diary noting triggers, food, sleep, and stress.</li>
          <li>• Take microbreaks every 45 minutes to stretch and reset posture.</li>
          <li>• Use a cervical-support pillow and avoid stomach sleeping.</li>
          <li>• Stay hydrated and maintain balanced meals to avoid hypoglycaemia.</li>
          <li>• Engage in core and neck-strengthening exercises under guidance.</li>
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/conditions/cervical-radiculopathy-treatment-hyderabad"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-emerald-400"
          >
            <h3 className="font-semibold text-emerald-700">
              Cervical Radiculopathy Treatment
            </h3>
            <p className="mt-2 text-gray-700">
              Learn how nerve compression in the neck can trigger vertex
              headaches and how we resolve it.
            </p>
          </Link>
          <Link
            href="/services/minimally-invasive-spine-surgery"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-emerald-400"
          >
            <h3 className="font-semibold text-emerald-700">
              Minimally Invasive Spine Surgery
            </h3>
            <p className="mt-2 text-gray-700">
              Explore motion-preserving procedures for cervical and lumbar nerve
              compression.
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
                <summary className="cursor-pointer text-lg font-semibold text-emerald-700">
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
                  className="text-emerald-700 underline"
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
