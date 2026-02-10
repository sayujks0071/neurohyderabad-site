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

const CANONICAL = `${SITE_URL}/conditions/cervical-myelopathy-decompression-hyderabad`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Cervical Myelopathy Decompression Surgery in Hyderabad",
    description:
      "Endoscopic and minimally invasive cervical decompression surgery for spinal cord compression (myelopathy) in Hyderabad with Dr. Sayuj Krishnan.",
    url: CANONICAL,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Sayuj Krishnan — Brain & Spine Clinic",
      url: SITE_URL,
    },
    about: {
      "@type": "MedicalCondition",
      name: "Cervical Myelopathy",
      alternateName: ["Spinal Cord Compression", "Cervical Stenosis with Myelopathy"],
      medicalSpecialty: "Neurosurgery",
      signOrSymptom: [
        "Hand clumsiness and difficulty with fine motor tasks",
        "Gait imbalance and frequent falls",
        "Numbness in hands and feet",
        "Weakness in arms and legs",
        "Bowel or bladder dysfunction",
      ],
      possibleTreatment: [
        "Anterior cervical discectomy and fusion (ACDF)",
        "Posterior cervical laminoplasty",
        "Endoscopic cervical decompression",
        "Cervical laminectomy with fusion",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are early warning signs of cervical myelopathy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Early signs include hand clumsiness (difficulty buttoning shirts, writing), gait unsteadiness, dropping objects frequently, and subtle numbness in hands. These symptoms progressively worsen without treatment.",
        },
      },
      {
        "@type": "Question",
        name: "Can cervical myelopathy be reversed with surgery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surgery halts progression and often leads to improvement, especially when performed early. However, longstanding spinal cord damage may not fully reverse. Early intervention offers the best chance for recovery.",
        },
      },
      {
        "@type": "Question",
        name: "What is endoscopic cervical decompression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Endoscopic approach uses small incisions and HD camera to decompress the spinal cord while preserving posterior neck muscles. This minimally invasive technique reduces postoperative pain and accelerates recovery.",
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
        name: "Cervical Myelopathy Decompression Hyderabad",
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
        name: "Endoscopic Cervical Decompression",
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
    question: "What are early warning signs of cervical myelopathy?",
    answer:
      "Early symptoms include hand clumsiness (dropping cups, difficulty with buttons or writing), gait unsteadiness, frequent trips or falls, and subtle numbness in hands and feet. Many patients also notice stiffness in legs and difficulty going up stairs. These symptoms are progressive and worsen without treatment.",
  },
  {
    question: "Can cervical myelopathy be reversed with surgery?",
    answer:
      "Surgery stops progression and often improves function, particularly when performed early. Mild to moderate myelopathy can show significant recovery. However, severe longstanding cord compression may have caused irreversible damage. The key is not to delay — early decompression offers the best outcomes.",
  },
  {
    question: "What is endoscopic cervical decompression?",
    answer:
      "Endoscopic cervical decompression uses minimally invasive techniques with HD endoscope to remove bone and disc compressing the spinal cord. The posterior muscles remain intact, reducing postoperative pain and allowing faster return to activities. This is ideal for single or two-level disease.",
  },
  {
    question: "How long is recovery after cervical myelopathy surgery?",
    answer:
      "Most patients are walking the same day and discharged in 2-4 days. Neck collar is worn for 4-6 weeks. Desk work resumes in 2-3 weeks; driving after collar is removed. Neurological recovery continues over 3-6 months with physiotherapy support.",
  },
  {
    question: "When should I seek urgent care for myelopathy symptoms?",
    answer:
      "Seek immediate neurosurgical consultation if you develop sudden weakness in arms or legs, loss of hand function, difficulty walking, or bowel/bladder problems. Rapid progression of myelopathy symptoms requires urgent imaging and surgical planning.",
  },
] as const;

const references = [
  {
    label: "AANS — Cervical Myelopathy",
    url: "https://www.aans.org/patients/conditions-treatments/cervical-myelopathy/",
  },
  {
    label: "North American Spine Society — Cervical Stenosis & Myelopathy",
    url: "https://www.spine.org/KnowYourBack/Conditions/DegenerativeConditions/CervicalStenosis",
  },
  {
    label: "Journal of Neurosurgery: Spine — Outcomes in Cervical Myelopathy Surgery",
    url: "https://thejns.org/spine",
  },
] as const;

export const metadata: Metadata = {
  title: "Cervical Myelopathy Surgery Hyderabad | Cord Decompression",
  description:
    "Expert Cervical Myelopathy Surgery in Hyderabad. Endoscopic Spinal Cord Decompression by Dr. Sayuj Krishnan. Restore hand function & gait. Book Consult.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Cervical Myelopathy Decompression Surgery in Hyderabad",
    description:
      "Endoscopic and minimally invasive cervical decompression for spinal cord compression (myelopathy) by fellowship-trained spine surgeon.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Cervical Myelopathy Surgery — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cervical Myelopathy Decompression Surgery in Hyderabad",
    description:
      "Endoscopic and minimally invasive cervical decompression for spinal cord compression (myelopathy) by fellowship-trained spine surgeon.",
  },
};

export default function CervicalMyelopathyPage() {
  return (
    <main className="bg-white">
      <SchemaScript id="cervical-myelopathy-jsonld" data={schemaData} />

      {/* Warning Banner for Progressive Symptoms */}
      <section className="bg-orange-600 py-4 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-lg font-bold">
            ⚠️ Cervical myelopathy is progressive — Early treatment prevents permanent spinal cord damage
          </p>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-200">
            Cervical Spine Surgery · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Cervical Myelopathy Decompression Surgery in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-slate-100">
            Dr. Sayuj Krishnan specializes in endoscopic and minimally invasive surgical decompression for 
            cervical myelopathy (spinal cord compression). Early intervention prevents permanent neurological 
            damage and restores quality of life.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.drsayuj.info/appointments?utm_source=seo&utm_medium=page&utm_campaign=cervical_myelopathy"
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600"
            >
              Request Surgical Consultation
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

      {/* When to Seek Help */}
      <section className="bg-orange-50 py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-lg border-4 border-orange-500 bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-orange-700">
              ⚠️ When to Seek Neurosurgical Help for Neck & Hand Problems
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-900">
              See a spine surgeon promptly if you experience any of these progressive symptoms:
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">✋</span>
                <div>
                  <h3 className="font-bold text-orange-700">Hand Clumsiness</h3>
                  <p className="text-sm text-gray-700">Difficulty buttoning shirts, writing, using chopsticks, or dropping objects</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">🚶</span>
                <div>
                  <h3 className="font-bold text-orange-700">Gait Problems</h3>
                  <p className="text-sm text-gray-700">Unsteady walking, frequent trips, difficulty climbing stairs</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">💪</span>
                <div>
                  <h3 className="font-bold text-orange-700">Progressive Weakness</h3>
                  <p className="text-sm text-gray-700">Weakness in arms and legs that gets worse over weeks/months</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">📍</span>
                <div>
                  <h3 className="font-bold text-orange-700">Numbness</h3>
                  <p className="text-sm text-gray-700">Numbness in hands and feet, "like wearing gloves or socks"</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">🚽</span>
                <div>
                  <h3 className="font-bold text-orange-700">Bowel/Bladder Changes</h3>
                  <p className="text-sm text-gray-700">Urgency, hesitancy, or loss of control (seek URGENT care)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-orange-700">Electric Shocks</h3>
                  <p className="text-sm text-gray-700">Shock-like sensation down spine when bending neck (Lhermitte's sign)</p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-orange-600 p-4 text-white">
              <p className="font-bold">
                ⏰ DON'T WAIT: Cervical myelopathy is progressive. Delaying treatment can lead to permanent 
                spinal cord damage. If you have hand clumsiness + gait problems, see a neurosurgeon within 1-2 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Understanding Cervical Myelopathy
            </h2>
            <p className="mt-4 text-gray-700">
              Cervical myelopathy occurs when the spinal cord in the neck becomes compressed, typically due to 
              degenerative changes like disc herniation, bone spurs (osteophytes), or thickened ligaments. 
              Unlike radiculopathy (pinched nerve causing arm pain), myelopathy affects the spinal cord itself, 
              causing problems with hand function, balance, and coordination.
            </p>
            <p className="mt-4 text-gray-700">
              This is a <strong>progressive condition</strong> that does not improve on its own. Without surgical 
              decompression, patients gradually lose hand dexterity, develop gait instability, and may eventually 
              become wheelchair-dependent. The spinal cord has limited ability to recover once severely damaged, 
              making early diagnosis and treatment critical.
            </p>
            <p className="mt-4 text-gray-700">
              Most patients over 50 have some degree of cervical stenosis on MRI, but not all develop myelopathy. 
              We correlate your MRI findings with clinical examination to determine if surgery is warranted.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">
              Clinical Evaluation Process
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Detailed neurological exam assessing hand coordination, gait, reflexes, and sensory function</li>
              <li>MRI cervical spine to visualize cord compression and signal changes</li>
              <li>Assessment of myelopathy severity using mJOA score</li>
              <li>Discussion of conservative vs. surgical management</li>
              <li>Preoperative planning and risk assessment</li>
              <li>Multidisciplinary approach with physiotherapy and rehabilitation</li>
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
                Anterior Cervical Discectomy & Fusion (ACDF)
              </h3>
              <p className="mt-3 text-gray-700">
                Gold-standard procedure for 1-3 level cervical myelopathy caused by disc herniations and anterior 
                compression. Through a small neck incision, we remove the diseased disc, decompress the spinal cord, 
                and stabilize with a cage and plate. Most patients go home in 24-48 hours.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Best for anterior cord compression</li>
                <li>• High fusion rates (95%+)</li>
                <li>• Immediate stability</li>
                <li>• Proven long-term outcomes</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Posterior Cervical Laminoplasty
              </h3>
              <p className="mt-3 text-gray-700">
                Motion-preserving procedure ideal for multi-level stenosis and ossification of posterior longitudinal 
                ligament (OPLL). The lamina is hinged open like a door to expand the spinal canal while preserving 
                neck range of motion. Suitable for patients with preserved cervical lordosis.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Preserves neck motion</li>
                <li>• Treats multi-level disease</li>
                <li>• Lower adjacent segment disease risk</li>
                <li>• Popular in Asia for OPLL</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Endoscopic Cervical Decompression
              </h3>
              <p className="mt-3 text-gray-700">
                Minimally invasive endoscopic approach for selected cases of posterior compression. Using tubular 
                retractors and HD endoscope, we decompress the spinal cord while preserving paraspinal muscles. 
                This reduces postoperative neck pain and allows faster rehabilitation.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Muscle-preserving technique</li>
                <li>• Reduced blood loss</li>
                <li>• Faster recovery</li>
                <li>• Outpatient or 1-night stay</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">
                Cervical Laminectomy with Fusion
              </h3>
              <p className="mt-3 text-gray-700">
                For severe multi-level stenosis with loss of cervical curve (kyphosis), we perform laminectomy 
                (removing the back part of vertebrae) combined with instrumented fusion using screws and rods. 
                This provides durable decompression and prevents post-laminectomy kyphosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recovery Timeline &amp; Rehabilitation
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Day 0-1</h3>
            <p className="mt-2 text-gray-700">
              Walking within hours of surgery. Pain control with oral medications. Collar fitted for anterior 
              procedures.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Week 1-2</h3>
            <p className="mt-2 text-gray-700">
              Gradual return to light activities. Wound check and X-rays. Start physiotherapy for neck 
              strengthening.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Week 4-6</h3>
            <p className="mt-2 text-gray-700">
              Collar removed after fusion procedures. Return to desk work. Driving permitted. Progressive 
              increase in activity.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Month 3-6</h3>
            <p className="mt-2 text-gray-700">
              Continued neurological recovery. Hand function and gait continue to improve. Fusion confirmed 
              on X-ray/CT.
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
                href="/services/endoscopic-spine-surgery-hyderabad"
                className="text-blue-700 underline"
              >
                Endoscopic Spine Surgery Services
              </Link>
            </li>
            <li>
              <Link
                href="/conditions/spinal-stenosis-treatment-hyderabad"
                className="text-blue-700 underline"
              >
                Spinal Stenosis Treatment
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
      <SourceList sources={sources['cervical-myelopathy-decompression-hyderabad'] || []} />
      
      <ReviewedBy />
    </main>
  );
}

