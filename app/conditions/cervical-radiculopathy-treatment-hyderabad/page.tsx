import type { Metadata } from "next";
import Link from "next/link";
import SchemaScript from "@/app/_components/SchemaScript";
import LocalNAP from "@/app/_components/LocalNAP";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import { SITE_URL } from "@/src/lib/seo";

const CANONICAL = `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Cervical Radiculopathy Treatment in Hyderabad",
    description:
      "Understand symptoms, diagnosis, and minimally invasive treatment options for cervical radiculopathy with Dr. Sayuj Krishnan in Hyderabad.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Cervical Radiculopathy",
      alternateName: "Pinched nerve in the neck",
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Neck pain radiating to arm",
        "Numbness or tingling in fingers",
        "Grip weakness",
        "Cervicogenic headache",
      ],
      possibleTreatment: [
        "Physiotherapy",
        "Epidural steroid injection",
        "Endoscopic foraminotomy",
        "Anterior cervical discectomy and fusion",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does every cervical radiculopathy case require surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Most patients improve with conservative treatment. Surgery is recommended when pain persists, weakness develops, or imaging shows significant compression.",
        },
      },
      {
        "@type": "Question",
        name: "How fast is recovery after endoscopic foraminotomy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many patients return to desk work within one to two weeks and resume full activity by six weeks, depending on rehabilitation progress.",
        },
      },
      {
        "@type": "Question",
        name: "Can cervical problems cause headaches?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Cervicogenic headaches and occipital neuralgia often arise from cervical nerve compression. Treating the underlying issue reduces head pain.",
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
        name: "Cervical Radiculopathy Treatment Hyderabad",
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
    question: "Does every cervical radiculopathy need surgery?",
    answer:
      "No. Up to 80% of cases improve with physiotherapy, medication, and posture correction. Surgery is reserved for persistent pain, progressive weakness, or severe compression on imaging.",
  },
  {
    question: "How soon can I return to work after endoscopic foraminotomy?",
    answer:
      "Most patients resume light duties in one to two weeks and return to full activity by six weeks, provided rehabilitation milestones are met.",
  },
  {
    question: "Is fusion always required?",
    answer:
      "Fusion (ACDF) is necessary when instability, multi-level degeneration, or recurrent herniation exists. Whenever feasible, we prioritise motion-preserving options such as endoscopic foraminotomy or disc replacement.",
  },
  {
    question: "Can cervical radiculopathy cause headaches?",
    answer:
      "Yes. Cervicogenic headaches and occipital neuralgia often stem from upper cervical nerve irritation. Addressing the root cause typically relieves head pain.",
  },
  {
    question: "What happens if I ignore symptoms?",
    answer:
      "Untreated compression can lead to chronic pain, permanent numbness, or weakness. Early assessment helps prevent long-term nerve damage.",
  },
] as const;

const references = [
  {
    label: "North American Spine Society (NASS) — Cervical Radiculopathy Guidelines",
    url: "https://www.spine.org/Research-Clinical-Care/Quality-Improvement/Clinical-Guidelines",
  },
  {
    label: "American Academy of Orthopaedic Surgeons (AAOS) — Cervical Radiculopathy",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/cervical-radiculopathy-pinched-nerve/",
  },
  {
    label: "National Institute for Health and Care Excellence (NICE) — Spinal conditions management",
    url: "https://www.nice.org.uk/guidance/ng59",
  },
] as const;

export const metadata: Metadata = {
  title: "Cervical Radiculopathy Treatment Hyderabad — Neck & Arm Pain Relief",
  description:
    "Comprehensive evaluation, conservative therapy, and minimally invasive surgery for cervical radiculopathy with Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Cervical Radiculopathy Treatment in Hyderabad",
    description:
      "Discover conservative care, nerve blocks, and minimally invasive surgery pathways for neck and arm pain.",
    url: CANONICAL,
    type: "article",
  },
};

export default function CervicalRadiculopathyTreatmentPage() {
  return (
    <main className="bg-white">
      <SchemaScript
        id="cervical-radiculopathy-jsonld"
        data={schemaData}
      />

      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-indigo-200">
            Spine &amp; Nerve Clinic · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Cervical Radiculopathy Treatment in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Neck pain radiating into the arm, tingling fingers, or weak grip may
            signal cervical radiculopathy. We offer a conservative-first approach,
            escalating to minimally invasive or motion-preserving surgery only
            when necessary.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.drsayuj.com/appointments?utm_source=seo&utm_medium=page&utm_campaign=cervical_radiculopathy"
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600"
            >
              Book Neuro Spine Evaluation
            </a>
            <a
              href="https://wa.me/919778280044"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-blue-900"
            >
              Share MRI via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Symptoms to watch for
            </h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Sharp or burning pain from neck into shoulder and arm</li>
              <li>• Numbness or tingling in fingers</li>
              <li>• Weak grip or difficulty lifting objects</li>
              <li>• Symptoms that worsen with neck extension or rotation</li>
              <li>• Cervicogenic headaches and reduced balance in severe cases</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Seek emergency care immediately for sudden weakness, loss of bowel
              or bladder control, or difficulty walking—these may indicate spinal
              cord compression.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Common causes
            </h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>• Degenerative disc disease and disc herniation</li>
              <li>• Foraminal stenosis narrowing nerve exit pathways</li>
              <li>• Postural strain (“tech neck”) leading to chronic inflammation</li>
              <li>• Traumatic injuries such as whiplash</li>
              <li>• Less commonly: tumours, infections, or congenital anomalies</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Diagnostic pathway at Yashoda Hospital, Malakpet
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-gray-700">
            <li>Clinical examination including Spurling test, reflexes, and strength grading.</li>
            <li>MRI cervical spine to identify disc herniation, stenosis, or cord compression.</li>
            <li>Nerve conduction / EMG studies when symptoms overlap with peripheral neuropathy.</li>
            <li>Dynamic X-rays to assess instability when surgery is considered.</li>
            <li>Collaborative review with pain specialists and physiotherapists.</li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Treatment options
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Conservative management
            </h3>
            <p className="mt-3 text-gray-700">
              Physiotherapy, postural coaching, ergonomic adjustments, and
              medication form the first line. We emphasise cervical stabilisation,
              scapular strengthening, and habit change.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Image-guided injections
            </h3>
            <p className="mt-3 text-gray-700">
              Selective nerve root blocks or epidural steroids offer diagnostic
              clarity and bridging relief while rehabilitation progresses.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Endoscopic foraminotomy &amp; ULBD
            </h3>
            <p className="mt-3 text-gray-700">
              Through 8 mm incisions, we remove bone spurs or disc fragments to
              decompress nerves while preserving motion. Most patients return to
              desk work within two weeks.
            </p>
          </article>
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Fusion or disc replacement
            </h3>
            <p className="mt-3 text-gray-700">
              ACDF stabilises the spine when instability exists. Disc replacement
              maintains motion in selected patients. Navigation and neuromonitoring
              guide precise implant placement.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recovery roadmap
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Return to activity</h3>
              <p className="mt-2 text-gray-700">
                Desk work generally resumes within 1–2 weeks after minimally
                invasive procedures; manual labour requires staged clearance.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Physiotherapy milestones</h3>
              <p className="mt-2 text-gray-700">
                Structured rehab begins within days to rebuild strength and
                prevent recurrence. We review progress at 2, 6, and 12 weeks.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-700">Lifestyle coaching</h3>
              <p className="mt-2 text-gray-700">
                Ergonomics, sleep, and stress management strategies keep symptoms
                controlled long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
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
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/services/minimally-invasive-spine-surgery"
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-400"
            >
              <h3 className="font-semibold text-blue-700">
                Learn about Minimally Invasive Spine Surgery
              </h3>
              <p className="mt-2 text-gray-700">
                Discover MISS techniques, recovery timelines, and patient stories.
              </p>
            </Link>
            <Link
              href="/services/spinal-fusion-surgery-hyderabad"
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-400"
            >
              <h3 className="font-semibold text-blue-700">Explore Cervical Fusion Care</h3>
              <p className="mt-2 text-gray-700">
                Understand when ACDF or disc replacement is necessary and how we
                preserve function.
              </p>
            </Link>
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
