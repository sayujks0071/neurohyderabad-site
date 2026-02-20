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
import CostTransparencySection from '@/src/components/CostTransparencySection';

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Cervical Spondylosis & Radiculopathy Treatment Hyderabad",
    description:
      "Expert treatment for cervical spondylosis and pinched nerves (radiculopathy) in Hyderabad. Endoscopic keyhole surgery for arm pain, numbness, and neck pain by Dr. Sayuj Krishnan.",
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
      alternateName: ["Cervical Spondylosis", "Neck Arthritis", "Pinched Nerve in Neck", "Cervical Nerve Root Compression"],
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Shooting pain down the arm",
        "Numbness or tingling in fingers",
        "Weakness in arm or hand muscles",
        "Neck pain radiating to the shoulder blade",
        "Relief when lifting the arm over the head",
      ],
      possibleTreatment: [
        "Posterior Cervical Foraminotomy (Keyhole)",
        "Anterior Cervical Discectomy and Fusion (ACDF)",
        "Artificial Disc Replacement",
        "Physiotherapy and Nerve Blocks",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does a pinched nerve in the neck require surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always. 90% of cervical radiculopathy cases improve with medication and physiotherapy within 6-8 weeks. Surgery is recommended if there is severe weakness, intractable pain, or if conservative treatment fails.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best surgery for cervical radiculopathy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For pure nerve pinching without instability, a Minimally Invasive Posterior Cervical Foraminotomy (Keyhole Surgery) is excellent as it preserves motion and requires no fusion. For large central discs, ACDF or Disc Replacement may be better.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to recover from pinched nerve surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recovery is rapid. With endoscopic keyhole surgery, patients are often discharged the same day or next day. Desk work can resume in 1-2 weeks. Full return to sports takes about 6-12 weeks.",
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
        name: "Cervical Radiculopathy & Spondylosis",
        item: CANONICAL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Sayuj Krishnan",
    medicalSpecialty: ["Neurosurgery", "Spine Surgery", "Endoscopic Spine Surgery"],
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
        name: "Posterior Cervical Foraminotomy",
      },
      {
        "@type": "MedicalProcedure",
        name: "Anterior Cervical Discectomy and Fusion",
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
  },
] as const;

const faqItems = [
  {
    question: "Does a pinched nerve in the neck require surgery?",
    answer:
      "Not necessarily. Most cases (approx. 90%) of cervical radiculopathy resolve with non-surgical treatments like rest, anti-inflammatory medication, physiotherapy, and possibly a nerve block injection. Surgery is considered when pain is unmanageable, or if there is progressive weakness (motor deficit) in the arm or hand.",
  },
  {
    question: "What is the best surgery for cervical radiculopathy?",
    answer:
      "The 'best' surgery depends on the location of the compression. For nerves pinched by bone spurs or side-herniated discs, a **Posterior Cervical Foraminotomy (Keyhole Surgery)** is ideal because it relieves pressure without needing fusion or implants. For central disc herniations, **ACDF (Fusion)** or **Artificial Disc Replacement** provides the most reliable results.",
  },
  {
    question: "How long does it take to recover from pinched nerve surgery?",
    answer:
      "Recovery is generally quick, especially with minimally invasive techniques. Patients are typically walking hours after surgery and discharged within 24 hours. Most can return to desk jobs in 1-2 weeks. Heavy lifting and contact sports are usually restricted for 6-12 weeks to allow for healing.",
  },
  {
    question: "Can I use a computer after cervical spine surgery?",
    answer:
      "Yes, but you should take frequent breaks. We recommend keeping the monitor at eye level to avoid bending your neck. Short periods of computer use are allowed within a few days, gradually increasing as your neck comfort allows.",
  },
  {
    question: "What are the risks of leaving a pinched nerve untreated?",
    answer:
      "If the nerve is severely compressed for a long time, it can lead to permanent nerve damage, resulting in chronic numbness or muscle wasting (atrophy) in the arm or hand. If pain persists beyond 6-8 weeks or if you have weakness, surgical consultation is advised to prevent permanent loss of function.",
  },
] as const;

const references = [
  {
    label: "AANS — Cervical Radiculopathy",
    url: "https://www.aans.org/patients/conditions-treatments/cervical-radiculopathy/",
  },
  {
    label: "North American Spine Society — Cervical Radiculopathy",
    url: "https://www.spine.org/KnowYourBack/Conditions/DegenerativeConditions/CervicalRadiculopathy",
  },
  {
    label: "Johns Hopkins Medicine — Cervical Radiculopathy",
    url: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/cervical-radiculopathy",
  },
] as const;

const CERVICAL_COSTS = [
  {
    procedure: 'Post. Cervical Foraminotomy (Keyhole)',
    range: '₹1,50,000 - ₹2,00,000',
    recovery: '1-2 Days',
    includes: ['Endoscopic Surgery', 'No Implants', 'Day Care Stay', 'Medications']
  },
  {
    procedure: 'ACDF (Fusion)',
    range: '₹2,50,000 - ₹3,50,000',
    recovery: '2-3 Days',
    includes: ['Titanium Cage/Plate', 'Bone Graft', 'Hospital Stay', 'Post-op Collar']
  },
  {
    procedure: 'Artificial Disc Replacement',
    range: '₹3,50,000 - ₹4,50,000',
    recovery: '2-3 Days',
    includes: ['Artificial Disc Device', 'Motion Preservation', 'Specialized Instrumentation']
  }
];

export const metadata: Metadata = {
  title: "Cervical Radiculopathy & Spondylosis Treatment Hyderabad | Neck Specialist",
  description:
    "Expert treatment for Cervical Spondylosis & Radiculopathy in Hyderabad. 90% non-surgical relief. Keyhole surgery & ACDF cost and recovery details.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  keywords: [
    "cervical spondylosis treatment hyderabad",
    "cervical radiculopathy treatment",
    "pinched nerve in neck",
    "neck pain doctor hyderabad",
    "keyhole neck surgery cost",
    "acdf surgery cost hyderabad",
    "spondylosis exercises"
  ],
  openGraph: {
    title: "Cervical Spondylosis & Radiculopathy Treatment in Hyderabad",
    description:
      "Expert care for neck pain, spondylosis, and radiating arm pain. Minimally invasive surgical options available.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Cervical Spondylosis & Radiculopathy Treatment — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cervical Spondylosis & Radiculopathy Treatment Hyderabad",
    description:
      "Expert care for neck pain and spondylosis. Minimally invasive options available.",
  },
};

export default function CervicalRadiculopathyPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="cervical-radiculopathy-jsonld" data={schemaData} />

      {/* Warning Banner for Weakness */}
      <section className="bg-orange-600 py-4 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-lg font-bold">
            ⚠️ Warning: Sudden arm weakness or loss of grip strength requires urgent evaluation
          </p>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-200">
            Spine Conditions · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Cervical Spondylosis & Radiculopathy Treatment in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-slate-100">
            Suffering from <strong>severe neck pain</strong>, radiating arm pain, or "pins and needles"?
            Dr. Sayuj Krishnan provides advanced diagnosis for Cervical Spondylosis (Neck Arthritis) and
            Radiculopathy, helping you get back to a pain-free life.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.drsayuj.info/appointments?utm_source=seo&utm_medium=page&utm_campaign=cervical_radiculopathy"
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600"
            >
              Book an Appointment
            </a>
            <a
              href="https://wa.me/919778280044"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-slate-900"
            >
              WhatsApp MRI for Opinion
            </a>
          </div>
        </div>
      </section>

      {/* Symptoms Checklist */}
      <section className="bg-blue-50 py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-lg border border-blue-200 bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800">
              Is it Cervical Spondylosis or Radiculopathy?
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-900">
              Often, age-related wear (Spondylosis) causes the nerve pinching (Radiculopathy).
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-blue-800">Shooting Pain</h3>
                  <p className="text-sm text-gray-700">Sharp, electric-shock type pain radiating from the neck down the arm to the fingers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <span className="text-2xl">✋</span>
                <div>
                  <h3 className="font-bold text-blue-800">Numbness & Tingling</h3>
                  <p className="text-sm text-gray-700">"Pins and needles" sensation in specific fingers or the hand.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <span className="text-2xl">💪</span>
                <div>
                  <h3 className="font-bold text-blue-800">Muscle Weakness</h3>
                  <p className="text-sm text-gray-700">Weakness in lifting the arm, extending the wrist, or gripping objects.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <span className="text-2xl">🐢</span>
                <div>
                  <h3 className="font-bold text-blue-800">Stiffness & Grinding</h3>
                  <p className="text-sm text-gray-700">Neck stiffness in the morning or grinding sounds (crepitus) when turning the head.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              What Causes Cervical Radiculopathy?
            </h2>
            <p className="mt-4 text-gray-700">
              As we age, the discs in our spine lose height and water content. This degenerative process (Cervical Spondylosis) can lead
              to two main causes of nerve compression:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              <li><strong>Herniated Disc:</strong> The soft inner gel of the disc leaks out and presses directly on the nerve root. This is common in younger patients and often happens suddenly.</li>
              <li><strong>Bone Spurs (Osteophytes):</strong> Over time, the body creates extra bone to stabilize the spine, narrowing the "foramen" (exit tunnel) for the nerve. This is more common in older adults.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Regardless of the cause, the goal of treatment is to relieve the pressure on the nerve to stop the pain and allow the nerve to heal.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Diagnostic Approach
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Comprehensive physical exam to pinpoint which nerve is affected (C5, C6, C7, or C8)</li>
              <li>Reflex and strength testing</li>
              <li><strong>MRI Cervical Spine:</strong> The gold standard to visualize the nerve compression</li>
              <li>X-rays to check for instability or alignment issues</li>
              <li>Nerve Conduction Studies (EMG/NCS) if the diagnosis is unclear</li>
            </ol>
          </div>
        </div>
      </section>

      {/* New Self-Care Section */}
      <section className="bg-indigo-50 py-12 border-y border-indigo-100">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
            Self-Care for Neck Pain & Spondylosis
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <h3 className="font-bold text-indigo-800 mb-3">🛌 Pillow Height</h3>
              <p className="text-sm text-gray-700">
                Your pillow should keep your neck aligned with your spine. If you sleep on your back, use a thin pillow or a cervical contour pillow. Avoid stacking two pillows, as this flexes the neck forward all night.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <h3 className="font-bold text-indigo-800 mb-3">📱 Avoid "Tech Neck"</h3>
              <p className="text-sm text-gray-700">
                Looking down at a phone puts up to 27kg of pressure on your cervical spine. Lift your phone to eye level. When using a laptop, use a stand to raise the screen.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <h3 className="font-bold text-indigo-800 mb-3">🧘 Chin Tucks</h3>
              <p className="text-sm text-gray-700">
                Sit straight and gently pull your chin straight back (like making a double chin). Hold for 5 seconds. Repeat 10 times. This strengthens deep neck flexors and improves posture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Advanced Surgical Treatments
          </h2>
          <p className="mt-2 text-gray-700">
            While most patients recover without surgery, those with severe pain or weakness may need intervention.
            Dr. Sayuj Krishnan specializes in minimally invasive options:
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 mb-12">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                1. Posterior Cervical Foraminotomy (Keyhole)
              </h3>
              <p className="mt-3 text-gray-700">
                A minimally invasive procedure performed through the back of the neck. Using a small tube and microscope/endoscope,
                a small amount of bone/disc is removed to open the nerve tunnel.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• <strong>No Fusion Required:</strong> Preserves natural neck motion.</li>
                <li>• <strong>No Implants:</strong> No screws, plates, or cages.</li>
                <li>• <strong>Fast Recovery:</strong> Less swallowing difficulty than anterior surgery.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                2. Anterior Cervical Discectomy & Fusion (ACDF)
              </h3>
              <p className="mt-3 text-gray-700">
                The most common neck surgery. The disc is removed from the front of the neck to unpinch the nerve,
                and the space is filled with a cage/bone graft to fuse the bones.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Gold standard for central disc herniations.</li>
                <li>• Highly effective for relieving arm pain (95%+ success).</li>
                <li>• Prevents recurrence at that level.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                3. Artificial Disc Replacement (ADR)
              </h3>
              <p className="mt-3 text-gray-700">
                Similar to ACDF, but instead of fusion, a mobile artificial disc device is inserted. This maintains
                neck motion and reduces stress on adjacent discs.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Preserves range of motion.</li>
                <li>• Reduces risk of future surgery at other levels.</li>
                <li>• Ideal for younger patients with healthy bones.</li>
              </ul>
            </div>
          </div>

          <CostTransparencySection
            costs={CERVICAL_COSTS}
            disclaimer="Approximate cost estimates for self-pay patients at Yashoda Hospital Malakpet. Final pricing depends on room category (General/Sharing/Private) and specific implants used. We offer full assistance with insurance pre-authorization."
            showInsurance={true}
          />
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
                href="/conditions/cervical-myelopathy-decompression-hyderabad"
                className="text-blue-700 underline"
              >
                Cervical Myelopathy Decompression (Cord Compression)
              </Link>
            </li>
            <li>
              <Link
                href="/services/minimally-invasive-spine-surgery"
                className="text-blue-700 underline"
              >
                Minimally Invasive Spine Surgery
              </Link>
            </li>
            <li>
              <Link
                href="/patient-stories"
                className="text-blue-700 underline"
              >
                Patient Success Stories
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <LocalNAP />
          <div className="mt-8">
            <YMYLAttribution lastReviewed="2026-01-22" />
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
        publishedOn="2026-01-22"
        updatedOn="2026-01-22"
      />
      
      <div className="mt-12">
        <LocalPathways mode="condition" />
      </div>
      <SourceList sources={sources['cervical-radiculopathy-treatment-hyderabad'] || []} />
      
      <ReviewedBy />
    </main>
  );
}
