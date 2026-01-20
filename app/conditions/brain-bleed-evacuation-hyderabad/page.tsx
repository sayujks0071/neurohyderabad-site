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

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/conditions/brain-bleed-evacuation-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Emergency Brain Bleed Evacuation in Hyderabad",
    description:
      "24/7 emergency endoscopic and microsurgical evacuation of intracerebral hemorrhage (ICH), subdural hematoma, and epidural hematoma in Hyderabad with Dr. Sayuj Krishnan.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Intracerebral Hemorrhage",
      alternateName: ["Brain Bleed", "ICH", "Intracranial Hemorrhage"],
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Sudden severe headache",
        "Weakness on one side of body",
        "Difficulty speaking or understanding speech",
        "Loss of consciousness",
        "Vomiting",
        "Seizures",
      ],
      possibleTreatment: [
        "Emergency endoscopic hematoma evacuation",
        "Microsurgical craniotomy",
        "Minimally invasive catheter drainage",
        "ICU monitoring and blood pressure control",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When is surgery needed for a brain bleed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surgery is considered when the bleed causes significant mass effect, neurological deterioration, or is in a surgically accessible location. Small bleeds may be managed medically with blood pressure control and close monitoring.",
        },
      },
      {
        "@type": "Question",
        name: "What is endoscopic brain bleed evacuation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Endoscopic evacuation uses a small tube with a camera to remove blood clots through a minimally invasive approach. This reduces brain trauma compared to traditional open surgery and can lead to faster recovery.",
        },
      },
      {
        "@type": "Question",
        name: "How long is recovery after brain bleed surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recovery varies based on bleed size, location, and baseline health. ICU stay is typically 3-7 days, followed by inpatient rehabilitation. Many patients show significant improvement over 3-6 months with structured therapy.",
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
        name: "Brain Bleed Evacuation Hyderabad",
        item: CANONICAL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Sayuj Krishnan",
    medicalSpecialty: ["Neurosurgery", "Emergency Neurosurgery", "Endoscopic Brain Surgery"],
    url: SITE_URL,
    sameAs: ["https://www.linkedin.com/in/dr-sayuj-krishnan-s-275baa66"],
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
    yearsOfExperience: 15,
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Emergency Brain Bleed Evacuation",
      },
      {
        "@type": "MedicalProcedure",
        name: "Endoscopic Hematoma Evacuation",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr. Sayuj Krishnan - Brain & Spine Clinic, Yashoda Hospital Malakpet",
    url: SITE_URL,
    areaServed: ["Hyderabad", "Telangana", "Jubilee Hills", "Banjara Hills", "Hi-Tech City", "Gachibowli", "Malakpet", "Secunderabad"],
    telephone: "+91 9778280044",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 317, OPD Block, Yashoda Hospital, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
      description: "24/7 Emergency Neurosurgical Care",
    },
  },
] as const;

const faqItems = [
  {
    question: "When is surgery needed for a brain bleed?",
    answer:
      "Emergency surgery is indicated when imaging shows significant mass effect, midline shift, or when the patient is deteriorating neurologically despite medical therapy. Small, deep bleeds may be managed conservatively with blood pressure control, reversal of anticoagulation, and close ICU monitoring.",
  },
  {
    question: "What is endoscopic brain bleed evacuation?",
    answer:
      "Endoscopic evacuation uses a narrow tube with HD camera and specialized instruments to access the hematoma through a small burr hole. The technique minimizes brain retraction, reduces surgical trauma, and enables early rehabilitation compared to conventional craniotomy.",
  },
  {
    question: "How long is the ICU stay after surgery?",
    answer:
      "Most patients require 3-7 days in neuro-ICU for ventilator support, intracranial pressure monitoring, and blood pressure management. Transfer to high-dependency or rehabilitation ward follows once vital signs stabilize.",
  },
  {
    question: "What causes spontaneous brain bleeds?",
    answer:
      "Hypertension is the leading cause. Other contributors include cerebral amyloid angiopathy in elderly patients, anticoagulation therapy, aneurysm rupture, arteriovenous malformations, and underlying tumors. Imaging helps identify the cause.",
  },
  {
    question: "Can brain bleeds be prevented?",
    answer:
      "Control hypertension, manage diabetes, limit alcohol, avoid smoking, and have regular monitoring if on blood thinners. Early intervention for aneurysms or AVMs identified on screening also reduces risk.",
  },
] as const;

const references = [
  {
    label: "American Heart Association — Hemorrhagic Stroke Guidelines",
    url: "https://www.ahajournals.org/doi/10.1161/STR.0000000000000211",
  },
  {
    label: "AANS — Intracerebral Hemorrhage",
    url: "https://www.aans.org/patients/conditions-treatments/hemorrhagic-stroke-bleeding/",
  },
  {
    label: "National Institute of Neurological Disorders and Stroke — Stroke Information",
    url: "https://www.ninds.nih.gov/health-information/disorders/stroke",
  },
] as const;

export const metadata: Metadata = {
  title: "Emergency Brain Bleed Evacuation Hyderabad | Intracerebral Hemorrhage Surgery | Dr. Sayuj Krishnan",
  description:
    "24/7 emergency endoscopic and microsurgical brain bleed evacuation in Hyderabad. Expert treatment for intracerebral hemorrhage, subdural hematoma, and epidural hematoma by Dr. Sayuj Krishnan at Yashoda Hospital.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Emergency Brain Bleed Evacuation in Hyderabad",
    description:
      "24/7 emergency neurosurgical care for intracerebral hemorrhage with endoscopic and minimally invasive techniques.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Emergency Brain Bleed Evacuation — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Brain Bleed Evacuation in Hyderabad",
    description:
      "24/7 emergency neurosurgical care for intracerebral hemorrhage with endoscopic and minimally invasive techniques.",
  },
};

export default function BrainBleedEvacuationPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="brain-bleed-jsonld" data={schemaData} />

      {/* Emergency Red Banner */}
      <section className="bg-red-600 py-4 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-lg font-bold">
            ⚠️ BRAIN BLEED IS A MEDICAL EMERGENCY — CALL 108 or +91 9778280044 IMMEDIATELY
          </p>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-red-200">
            Emergency Neurosurgery · 24/7 · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Emergency Brain Bleed Evacuation in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-slate-100">
            Dr. Sayuj Krishnan provides 24/7 emergency neurosurgical care for intracerebral hemorrhage (brain bleeds), 
            subdural hematomas, and epidural hematomas using endoscopic and minimally invasive techniques at Yashoda Hospital, Malakpet.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:+919778280044"
              className="rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-red-600"
            >
              Emergency Call: +91 9778280044
            </a>
            <a
              href="https://wa.me/919778280044"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-slate-900"
            >
              WhatsApp Emergency Team
            </a>
          </div>
        </div>
      </section>

      {/* When to Seek Emergency Help */}
      <section className="bg-red-50 py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-lg border-4 border-red-500 bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-red-700">
              ⚠️ When to Go to Emergency Instead of OPD
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-900">
              Call 108 or go to the nearest emergency room IMMEDIATELY if you or someone experiences:
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <span className="text-2xl">🚨</span>
                <div>
                  <h3 className="font-bold text-red-700">Sudden Severe Headache</h3>
                  <p className="text-sm text-gray-700">"Worst headache of my life" or thunderclap onset</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <span className="text-2xl">💪</span>
                <div>
                  <h3 className="font-bold text-red-700">Sudden Weakness</h3>
                  <p className="text-sm text-gray-700">One-sided arm/leg weakness, facial droop</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <span className="text-2xl">🗣️</span>
                <div>
                  <h3 className="font-bold text-red-700">Speech Problems</h3>
                  <p className="text-sm text-gray-700">Slurred speech, difficulty understanding others</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <span className="text-2xl">😵</span>
                <div>
                  <h3 className="font-bold text-red-700">Loss of Consciousness</h3>
                  <p className="text-sm text-gray-700">Confusion, drowsiness, or fainting</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <span className="text-2xl">🤢</span>
                <div>
                  <h3 className="font-bold text-red-700">Severe Vomiting</h3>
                  <p className="text-sm text-gray-700">With headache and altered awareness</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-red-700">Seizures</h3>
                  <p className="text-sm text-gray-700">New-onset seizure or convulsions</p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-red-600 p-4 text-white">
              <p className="font-bold">
                TIME IS BRAIN: Every minute counts in brain bleeds. Do NOT wait for symptoms to get worse. 
                Go to emergency immediately or call for ambulance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Understanding Brain Bleeds (Intracerebral Hemorrhage)
            </h2>
            <p className="mt-4 text-gray-700">
              A brain bleed (intracerebral hemorrhage or ICH) occurs when a blood vessel ruptures inside 
              the brain, causing blood to accumulate and create pressure on brain tissue. This is a 
              life-threatening emergency requiring immediate neurosurgical evaluation.
            </p>
            <p className="mt-4 text-gray-700">
              The most common cause is uncontrolled high blood pressure, which weakens blood vessel walls 
              over time. Other causes include head trauma, blood-thinning medications, aneurysms, 
              arteriovenous malformations (AVMs), and cerebral amyloid angiopathy in elderly patients.
            </p>
            <p className="mt-4 text-gray-700">
              Early recognition and rapid treatment significantly improve survival and functional outcomes. 
              Our emergency team at Yashoda Hospital provides 24/7 access to CT scanning, neurosurgical 
              consultation, and immediate operative intervention when needed.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Emergency Evaluation Workflow
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Immediate triage and ABC (airway, breathing, circulation) stabilization</li>
              <li>Emergency CT brain scan within 15-30 minutes of arrival</li>
              <li>Neurosurgical consultation and treatment decision</li>
              <li>Blood pressure management and reversal of anticoagulation</li>
              <li>ICU admission with intracranial pressure monitoring if indicated</li>
              <li>Surgical evacuation for life-threatening bleeds</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Surgical Treatment Options
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Endoscopic Hematoma Evacuation
              </h3>
              <p className="mt-3 text-gray-700">
                Minimally invasive endoscopic approach through a small burr hole allows us to evacuate 
                the blood clot with minimal brain retraction. The HD endoscope provides excellent 
                visualization while preserving healthy brain tissue. This technique reduces surgical 
                trauma and accelerates recovery compared to traditional open craniotomy.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Small 2-3 cm incision</li>
                <li>• Reduced brain retraction</li>
                <li>• Faster recovery</li>
                <li>• Lower complication rates</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Microsurgical Craniotomy
              </h3>
              <p className="mt-3 text-gray-700">
                For large, superficial hemorrhages or when endoscopic access is not suitable, we perform 
                microsurgical craniotomy using operative microscope and advanced neuromonitoring. This 
                provides complete visualization and allows thorough hemostasis.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Best for superficial bleeds</li>
                <li>• Complete clot evacuation</li>
                <li>• Control of bleeding source</li>
                <li>• Decompressive effect</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Minimally Invasive Catheter Drainage
              </h3>
              <p className="mt-3 text-gray-700">
                For select deep bleeds, stereotactic catheter placement with thrombolytic agents can 
                gradually dissolve and drain the clot. This is performed under image guidance with 
                continuous monitoring in ICU.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Decompressive Craniectomy
              </h3>
              <p className="mt-3 text-gray-700">
                When brain swelling is severe and life-threatening, removing a section of skull 
                (craniectomy) provides emergency decompression. The bone flap is replaced 6-8 weeks 
                later once swelling resolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          ICU Care &amp; Recovery
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Neuro-ICU Phase (3-7 days)</h3>
            <p className="mt-2 text-gray-700">
              Intensive monitoring of vital signs, intracranial pressure, and neurological status. 
              Ventilator support if needed, blood pressure control, seizure prophylaxis, and early 
              DVT prevention measures.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Rehabilitation (2-12 weeks)</h3>
            <p className="mt-2 text-gray-700">
              Physical therapy, occupational therapy, and speech therapy as needed. Most patients 
              transfer to inpatient rehabilitation facility for structured recovery program. 
              Progressive mobilization and functional training.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Long-term Follow-up</h3>
            <p className="mt-2 text-gray-700">
              Regular neurosurgical follow-up, MRI/CT imaging at intervals, blood pressure monitoring, 
              and management of underlying causes. Vascular imaging to rule out aneurysm or AVM if 
              appropriate.
            </p>
          </div>
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
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-700">
            Related Resources
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <Link
                href="/emergency-rehabilitation"
                className="text-blue-700 underline"
              >
                Emergency Neurosurgical Care &amp; Rehabilitation
              </Link>
            </li>
            <li>
              <Link
                href="/services/brain-tumor-surgery-hyderabad"
                className="text-blue-700 underline"
              >
                Brain Surgery Services
              </Link>
            </li>
            <li>
              <Link
                href="/appointments"
                className="text-blue-700 underline"
              >
                Book Follow-up Appointment
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <LocalNAP />
          <div className="mt-8">
            <YMYLAttribution lastReviewed="2025-11-01" />
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
        </div>
      </section>
      
      <AuthorByline 
        publishedOn="2025-11-01"
        updatedOn="2025-11-01"
      />
      


      <div className="mt-12">
        <LocalPathways mode="condition" />
      </div>
      <SourceList sources={sources['brain-bleed-evacuation-hyderabad'] || []} />
      
      <ReviewedBy />
    </main>
  );
}

