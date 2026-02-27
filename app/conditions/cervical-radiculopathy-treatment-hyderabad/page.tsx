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
import MedicalWebPageSchema from "@/app/components/schemas/MedicalWebPageSchema";
import FAQPageSchema from "@/app/_components/FAQPageSchema";

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad`;

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
];

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
];

export const metadata: Metadata = {
  title: "Cervical Radiculopathy Treatment Hyderabad | Pinched Nerve Surgery",
  description:
    "Expert treatment for cervical radiculopathy (pinched nerve) in Hyderabad. Keyhole surgery (Foraminotomy) and ACDF by Dr. Sayuj Krishnan.",
  alternates: {
    canonical: CANONICAL,
    languages: {
      "en-IN": CANONICAL,
      "x-default": CANONICAL,
    },
  },
  openGraph: {
    title: "Cervical Radiculopathy (Pinched Nerve) Treatment in Hyderabad",
    description:
      "Expert care for radiating arm pain and neck pain caused by cervical radiculopathy. Minimally invasive surgical options available.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Cervical Radiculopathy Treatment — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cervical Radiculopathy Treatment in Hyderabad",
    description:
      "Expert care for radiating arm pain and neck pain caused by cervical radiculopathy. Minimally invasive surgical options available.",
  },
};

export default function CervicalRadiculopathyPage() {
  return (
    <main className="bg-white">
      <MedicalWebPageSchema
        pageType="condition"
        pageSlug="/conditions/cervical-radiculopathy-treatment-hyderabad"
        title="Cervical Radiculopathy Treatment Hyderabad | Pinched Nerve Surgery"
        description="Expert treatment for cervical radiculopathy (pinched nerve) in Hyderabad. Keyhole surgery (Foraminotomy) and ACDF by Dr. Sayuj Krishnan."
        serviceOrCondition="Cervical Radiculopathy"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Conditions", path: "/conditions" },
          { name: "Cervical Radiculopathy Treatment Hyderabad", path: "/conditions/cervical-radiculopathy-treatment-hyderabad" },
        ]}
      />
      <FAQPageSchema faqs={faqItems} pageUrl={CANONICAL} />

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
            Cervical Radiculopathy (Pinched Nerve) Treatment in Hyderabad
          </h1>
          <p className="mt-4 text-lg text-slate-100">
            Suffering from severe arm pain, numbness, or "pins and needles"? Dr. Sayuj Krishnan provides
            advanced diagnosis and minimally invasive treatment for cervical radiculopathy, helping you get
            back to a pain-free life faster.
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
              Signs of a Pinched Nerve (Radiculopathy)
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-900">
              Cervical radiculopathy happens when a nerve root in the neck is compressed. Common symptoms include:
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
                <span className="text-2xl">🛌</span>
                <div>
                  <h3 className="font-bold text-blue-800">Relief Position</h3>
                  <p className="text-sm text-gray-700">Many patients feel relief by resting their hand on top of their head (Shoulder Abduction Sign).</p>
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
              As we age, the discs in our spine lose height and water content. This degenerative process can lead
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

      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b-2 border-blue-100 pb-2">Your Symptom-to-Surgery Pathway</h2>
          <p className="mt-2 text-lg text-gray-700 mb-8 max-w-3xl">
            Treating a pinched nerve in the neck requires a precise, step-wise approach. We prioritize conservative care, but offer advanced microscopic and endoscopic solutions when needed.
          </p>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 relative">
              <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-4 border-white shadow"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 pl-4">Phase 1: Medical Optimization & Rest (Weeks 1-4)</h3>
              <div className="pl-4">
                <p className="text-gray-700 mb-3">
                  Our first goal is to reduce nerve inflammation. We use a combination of neuropathic medications, short-term cervical collars (for acute rest), and targeted cervical traction/physiotherapy to open the neural foramina.
                </p>
                <span className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">Success Rate: ~80% of Patients</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 relative">
              <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center border-4 border-white shadow"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 pl-4">Phase 2: Precision Injections (Weeks 4-6)</h3>
              <div className="pl-4">
                <p className="text-gray-700 mb-3">
                  If arm pain remains severe, we may use a <strong>Cervical Selective Nerve Root Block (SNRB)</strong> or Epidural Steroid Injection. This delivers potent anti-inflammatory medication directly to the pinched nerve under live X-ray guidance.
                </p>
                <span className="inline-block bg-yellow-50 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full">Success Rate: ~50% of Remaining Patients</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-md border-l-4 border-blue-600 relative">
              <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow"></div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 pl-4">Phase 3: The Surgical Solution (Beyond 6 Weeks or if Weakness Occurs)</h3>
              <div className="pl-4">
                <p className="text-gray-800 font-medium mb-4 text-lg">
                  When conservative measures fail, or if you develop muscle weakness, surgery provides reliable and rapid relief. Dr. Sayuj specializes in motion-preserving and minimally invasive techniques:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <span className="text-xl mr-2">🔬</span> Posterior Cervical Foraminotomy (Keyhole)
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Ideal for bone spurs or far-lateral disc herniations. Using a microscope or endoscope from the back of the neck, we unroof the nerve tunnel.
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600 font-medium">
                      <li>• <span className="text-green-600">No Fusion or Implants</span></li>
                      <li>• Maintains original neck motion</li>
                      <li>• Excellent arm pain relief</li>
                    </ul>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <span className="text-xl mr-2">⚙️</span> ACDF or Artificial Disc (ADR)
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Ideal for central disc herniations or severe degeneration. The disc is removed from the front and replaced with a fusion cage or an artificial mobile disc.
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600 font-medium">
                      <li>• <span className="text-blue-600">The Gold Standard procedure</span></li>
                      <li>• Near 95% success rate</li>
                      <li>• ADR preserves motion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
