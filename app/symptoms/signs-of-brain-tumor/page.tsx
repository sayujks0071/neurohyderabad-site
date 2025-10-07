import type { Metadata } from "next";
import Link from "next/link";
import SchemaScript from "@/app/_components/SchemaScript";
import LocalNAP from "@/app/_components/LocalNAP";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import { SITE_URL } from "@/src/lib/seo";

const CANONICAL = `${SITE_URL}/symptoms/signs-of-brain-tumor`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Signs of a Brain Tumor",
    description:
      "Identify early warning signs of brain tumours, emergency red flags, and diagnostic steps available in Hyderabad with Dr. Sayuj Krishnan.",
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
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Persistent headaches",
        "Seizures",
        "Vision or speech changes",
        "Cognitive or personality changes",
      ],
      possibleTreatment: [
        "Microsurgical resection",
        "Stereotactic radiosurgery",
        "Chemotherapy",
        "Radiation therapy",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are all persistent headaches caused by brain tumours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most headaches are caused by benign conditions such as migraine or tension. Seek specialist evaluation when headaches worsen, occur with neurological symptoms, or feel different from your usual pattern.",
        },
      },
      {
        "@type": "Question",
        name: "When should I get an MRI for headache or neurological symptoms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An MRI is recommended when headaches are progressive, accompanied by seizures, vision changes, or neurological deficits. Your neurosurgeon will advise the specific protocol.",
        },
      },
      {
        "@type": "Question",
        name: "Can lifestyle changes reverse brain tumour symptoms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lifestyle modifications support overall health but do not treat tumours. Early medical assessment ensures appropriate imaging and treatment planning.",
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
        name: "Signs of Brain Tumor",
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
    question: "Are all persistent headaches caused by brain tumours?",
    answer:
      "No. Most headaches stem from migraine, tension, or sinus issues. However, headaches that escalate, differ from your usual pattern, or occur with neurological symptoms require urgent evaluation.",
  },
  {
    question: "When should I get an MRI?",
    answer:
      "Arrange imaging if headaches worsen, you experience seizures, or you notice speech, vision, or limb changes. An MRI with contrast is the gold-standard scan, and we advise the appropriate protocol.",
  },
  {
    question: "Can lifestyle changes reverse brain tumour symptoms?",
    answer:
      "Lifestyle optimisation supports recovery but does not treat a tumour. Medical assessment ensures the right imaging and treatment plan if a tumour is present.",
  },
  {
    question: "Should I see a neurologist or neurosurgeon first?",
    answer:
      "If imaging already shows a mass, consult a neurosurgeon directly. When symptoms are unexplained, both neurologists and neurosurgeons can initiate scans and coordinate the next steps.",
  },
  {
    question: "Do brain tumour symptoms appear suddenly?",
    answer:
      "Some do, particularly bleeding tumours or those causing hydrocephalus. Many grow slowly with subtle changes in cognition, vision, or personality—another reason to seek early review.",
  },
] as const;

const references = [
  {
    label: "National Cancer Institute — Signs and Symptoms of Adult Brain Tumors",
    url: "https://www.cancer.gov/types/brain/patient/brain-treatment-pdq#_12",
  },
  {
    label: "NHS — Brain tumour symptoms",
    url: "https://www.nhs.uk/conditions/brain-tumour/symptoms/",
  },
  {
    label: "American Association of Neurological Surgeons — Brain Tumor FAQs",
    url: "https://www.aans.org/patients/conditions-treatments/brain-tumors/",
  },
] as const;

export const metadata: Metadata = {
  title: "Signs of Brain Tumor — When to Seek a Neurosurgeon in Hyderabad",
  description:
    "Understand early warning signs, emergency red flags, and the diagnostic pathway for suspected brain tumours with Dr. Sayuj Krishnan in Hyderabad.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Signs of a Brain Tumor",
    description:
      "Identify headache patterns, seizures, vision changes, and other red flags that warrant urgent imaging in Hyderabad.",
    url: CANONICAL,
    type: "article",
  },
};

export default function SignsOfBrainTumorPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="signs-brain-tumor-jsonld" data={schemaData} />

      <section className="bg-indigo-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-indigo-200">
            Neurology Awareness · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Signs of a Brain Tumor
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Persistent neurological symptoms deserve prompt medical attention.
            Learn which headaches, vision changes, seizures, or personality shifts
            require an urgent opinion from a neurosurgeon.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Why early recognition matters
            </h2>
            <p className="mt-4 text-gray-700">
              Brain tumours can compress critical areas controlling movement,
              speech, or vision. Some grow slowly with subtle symptoms; others
              progress quickly. Early evaluation minimises emergency
              presentations, allows safer surgery, and improves long-term
              outcomes.
            </p>
            <p className="mt-4 text-gray-700">
              While most headaches are benign, certain patterns—especially those
              with neurological signs—warrant immediate imaging. Documenting
              symptoms helps us triage and coordinate scans without delay.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-700">
              Common symptom clusters
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Headaches worse in the morning or with coughing/bending</li>
              <li>• New-onset seizures or focal jerking</li>
              <li>• Vision changes, double vision, or speech difficulty</li>
              <li>• Weakness, numbness, or clumsiness in a limb</li>
              <li>• Personality changes, memory lapses, or slowed thinking</li>
              <li>• Hormonal or menstrual changes (pituitary tumours)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-red-100 bg-red-50 p-6">
          <h3 className="text-lg font-semibold text-red-700">
            Emergency red flags — act immediately
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• “Thunderclap” headache or sudden severe pain with vomiting</li>
            <li>• Seizure lasting longer than five minutes or back-to-back seizures</li>
            <li>• Loss of consciousness or repeated vomiting</li>
            <li>• Rapid-onset weakness, speech loss, or vision loss</li>
            <li>• Signs of infection (fever, neck stiffness) with headache</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Visit the nearest emergency department or call local medical services
            immediately. Early intervention can be life-saving.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Diagnostic pathway at Yashoda Hospital, Malakpet
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-gray-700">
            <li>
              Neurological assessment to map symptoms, reflexes, and cranial nerve
              function.
            </li>
            <li>
              MRI brain with contrast; CT head when MRI is contraindicated.
            </li>
            <li>
              Functional imaging (fMRI, MR spectroscopy, DTI) for lesions near
              speech or motor areas.
            </li>
            <li>
              Endocrine or visual field testing when pituitary or optic pathway
              involvement is suspected.
            </li>
            <li>
              Tumour board review to decide on surgery, radiosurgery, or continued
              surveillance.
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          What to expect after imaging
        </h2>
        <p className="mt-4 text-gray-700">
          If imaging reveals a mass, Dr. Sayuj Krishnan discusses surgical and
          radiosurgical options, outlining risks, benefits, and expected recovery.
          Benign findings lead to referrals for migraine, ENT, or neurology care.
          Ambiguous lesions may require close monitoring or stereotactic biopsy.
        </p>
        <p className="mt-4 text-gray-700">
          Families receive counselling from nurse navigators and—when requested—
          psych-oncology support to manage anxiety during decision-making.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/conditions/brain-tumor-surgery-hyderabad"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-indigo-400"
          >
            <h3 className="font-semibold text-indigo-700">
              Explore Brain Tumour Treatment Options
            </h3>
            <p className="mt-2 text-gray-700">
              Understand microsurgery, endoscopic techniques, radiosurgery, and
              support services available locally.
            </p>
          </Link>
          <Link
            href="/appointments"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-indigo-400"
          >
            <h3 className="font-semibold text-indigo-700">Book a Consultation</h3>
            <p className="mt-2 text-gray-700">
              Bring your MRI or CT for a comprehensive review and treatment plan.
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
                <summary className="cursor-pointer text-lg font-semibold text-indigo-700">
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
                  className="text-indigo-700 underline"
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
