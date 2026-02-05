import React from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import MedicalWebPageSchema from "../../components/schemas/MedicalWebPageSchema";
import FAQPageSchema from "@/app/_components/FAQPageSchema";
import BreadcrumbSchema from "../../components/schemas/BreadcrumbSchema";
import { SITE_URL } from "../../../src/lib/seo";
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { sources } from '../../blog/sources';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import TrustProof from '@/app/_components/TrustProof';
import { patientStories } from '@/src/content/stories';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import dynamic from 'next/dynamic';
import PatientEducationVideosSkeleton from '@/app/_components/skeletons/PatientEducationVideosSkeleton';

const PatientEducationVideos = dynamic(() => import('@/app/_components/PatientEducationVideos'), {
  loading: () => <PatientEducationVideosSkeleton />
});

const baseMetadata = makeMetadata({
  title: "Sciatica Treatment Hyderabad | 90% Non-Surgical | Dr Sayuj",
  description: "Relief from Sciatica leg pain in Hyderabad. 90% non-surgical success with Dr. Sayuj Krishnan. Nerve blocks, Physio & Endoscopic options. Book Consult.",
  canonicalPath: '/conditions/sciatica-pain-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "sciatica treatment hyderabad",
    "sciatica pain relief",
    "non-surgical sciatica treatment",
    "leg pain treatment",
    "sciatica doctor hyderabad",
    "radiating leg pain treatment",
    "sciatica surgery cost hyderabad",
    "endoscopic spine surgery for sciatica"
  ],
  alternates: {
    canonical: `${SITE_URL}/conditions/sciatica-pain-treatment-hyderabad/`,
  },
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const FAQ = [
  {
    q: "What is sciatica?",
    a: "Sciatica is not a condition itself, but a symptom of an underlying problem. It refers to pain that radiates along the path of the sciatic nerve, which branches from your lower back through your hips and buttocks and down each leg."
  },
  {
    q: "Can sciatica be cured without surgery?",
    a: "Yes. In fact, 90% of our patients recover completely with non-surgical methods like targeted nerve blocks, medication, and specialized physiotherapy. Surgery is a last resort, not the first step."
  },
  {
    q: "What causes sciatica?",
    a: "The most common cause is a herniated (slipped) disc compressing the nerve root. Other causes include spinal stenosis (narrowing of the spine), bone spurs, or rarely, a tumor or diabetic neuropathy."
  },
  {
    q: "Does sciatica always require surgery?",
    a: "No. 80-90% of sciatica cases resolve with conservative treatments like medication, physiotherapy, and rest. Surgery (endoscopic discectomy) is only recommended if pain persists after 6 weeks or if there is severe weakness."
  },
  {
    q: "How is sciatica diagnosed?",
    a: "Diagnosis starts with a physical exam to check muscle strength and reflexes (Straight Leg Raise test). An MRI scan is the gold standard to visualize the nerve compression and identify the exact cause."
  },
  {
    q: "What are the warning signs of severe sciatica?",
    a: "Seek immediate medical attention if you experience: sudden severe pain after an accident, loss of bowel/bladder control (Cauda Equina Syndrome), or progressive weakness/numbness in the leg."
  },
  {
    q: "What is the cost of sciatica treatment in Hyderabad?",
    a: "The cost depends on the procedure. A simple nerve root block may cost ₹15,000–₹25,000, while endoscopic spine surgery typically ranges from ₹1.5 Lakhs to ₹2.5 Lakhs depending on the hospital category and implant requirements."
  },
  {
    q: "Is my office chair causing my sciatica?",
    a: "Prolonged sitting is a major risk factor. Poor ergonomics can increase pressure on lumbar discs by 40%, potentially triggering or worsening sciatica. We recommend ergonomic adjustments and taking breaks every 30 minutes."
  },
  {
    q: "Is it Sciatica or Piriformis Syndrome?",
    a: "True sciatica comes from the spine (nerve root compression). Piriformis syndrome is when a muscle in the buttock compresses the sciatic nerve. Dr. Sayuj uses specific clinical tests to distinguish them, as treatments differ significantly (spine decompression vs. muscle release)."
  },
  {
    q: "Is sciatica common during pregnancy?",
    a: "Yes, up to 50% of women experience some sciatic pain during pregnancy due to the baby's weight and postural changes. We offer safe, medication-free physiotherapy protocols to manage this pain without risking the baby's health."
  },
  {
    q: "Can I drive with sciatica?",
    a: "Driving often worsens sciatica due to the vibration and leg position. We recommend short trips, using a lumbar support cushion, and stopping every 30 minutes to stretch. If you have foot weakness (foot drop), do not drive."
  },
  {
    q: "What exercises should I avoid with sciatica?",
    a: "Avoid heavy hamstring stretches, straight leg raises, and twisting movements like golf until cleared by a physio. These can increase nerve tension."
  }
];

const sciaticaCosts = [
  {
    procedure: "Conservative Management",
    range: "₹5,000 - ₹15,000",
    recovery: "2-4 Weeks",
    includes: ["Consultation", "MRI Scan (approx)", "Medications (1 week)", "Physiotherapy Assessment"]
  },
  {
    procedure: "Nerve Root Block (Injection)",
    range: "₹20,000 - ₹35,000",
    recovery: "Same Day Discharge",
    includes: ["Procedure Charges", "C-Arm Guidance", "Day Care Stay", "Post-proc medicines"]
  },
  {
    procedure: "Endoscopic Discectomy",
    range: "₹1.50 Lakh - ₹2.50 Lakh",
    recovery: "1-2 Weeks",
    includes: ["Surgery Charges", "Hospital Stay (1-2 Days)", "Anesthesia", "Standard Consumables"]
  }
];

export default function SciaticaTreatmentPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Conditions", path: "/conditions/" },
    { name: "Sciatica Treatment", path: "/conditions/sciatica-pain-treatment-hyderabad/" }
  ];

  // Filter relevant stories (spine, leg pain)
  const relatedStories = patientStories.filter(story =>
    story.tags.includes('spine') ||
    story.tags.includes('fusion') ||
    story.tags.includes('sciatica') ||
    story.condition.toLowerCase().includes('leg pain')
  ).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 leading-tight">
        Sciatica Treatment in Hyderabad <span className="block text-2xl md:text-3xl text-blue-600 mt-2 font-medium">Non-Surgical Relief First</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Get relief from shooting leg pain with Dr. Sayuj Krishnan's <strong>"Conservative-First"</strong> protocol.
        We successfully treat <strong>90% of sciatica patients without surgery</strong> using targeted nerve blocks and advanced physiotherapy.
      </p>

      {/* New Non-Surgical Highlight Section */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Avoiding Surgery for Sciatica</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
             <p className="text-gray-700 mb-4 text-lg">
               Many patients are told they need surgery too soon. At our Hyderabad clinic, we believe in exhausting all non-invasive options first.
             </p>
             <ul className="space-y-4">
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">1</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Precision Diagnosis</h3>
                      <p className="text-sm text-gray-600">We don't just treat "pain". We identify the exact nerve root (L4, L5, or S1) causing your symptoms using MRI and clinical correlation.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">2</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Targeted Nerve Blocks</h3>
                      <p className="text-sm text-gray-600">A powerful anti-inflammatory injection placed precisely around the irritated nerve. This often provides immediate relief and prevents the need for surgery.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">3</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Spine-Specialized Rehab</h3>
                      <p className="text-sm text-gray-600">Once the pain is managed, we strengthen your core to prevent recurrence.</p>
                   </div>
                </li>
             </ul>
             <div className="mt-8">
                <Link
                  href="/appointments"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get a Non-Surgical Opinion
                </Link>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
             <div className="text-center mb-6">
                <span className="block text-5xl font-bold text-green-600 mb-2">90%</span>
                <span className="text-gray-600 font-medium">Success Rate Without Surgery</span>
             </div>
             <p className="text-sm text-gray-500 text-center italic border-t pt-4">
                *Surgery is reserved for cases with severe weakness or loss of bladder/bowel control.
             </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Understanding Sciatica</h2>
          <p className="text-gray-700 mb-4">
            Sciatica is a distinct type of pain affecting the sciatic nerve, the large nerve extending
            from the lower back down the back of each leg. It is often described as a sharp, burning,
            or electric shock-like sensation.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-blue-700">Common Symptoms</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Pain radiating from lower back to buttock and leg</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Burning or tingling sensation down the leg</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Weakness or numbness in the leg or foot</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Pain that worsens with coughing or sitting</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Dr. Sayuj?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Precise Diagnosis:</strong> Identifying the exact nerve root involved</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Step-ladder Approach:</strong> Meds → Physio → Injections → Surgery</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Minimally Invasive:</strong> Endoscopic options if surgery is needed</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Holistic Care:</strong> Focus on long-term spine health</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="mb-12">
        <TrustProof
          stories={relatedStories}
          serviceType="spine"
          className="bg-gradient-to-br from-white to-blue-50/50"
        />
      </div>

      {/* Elderly Safety Section (Competitor Gap) */}
      <section className="mb-12 bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Is Endoscopic Spine Surgery Safe for Elderly Patients?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Age is often a concern when considering spine surgery. However, traditional open surgery risks (like blood loss and long anesthesia times) are minimized with our endoscopic approach.
            </p>
            <p className="text-gray-700 mb-4">
              For patients over 60 suffering from <Link href="/symptoms/back-pain" className="text-blue-600 underline">severe back pain</Link> or sciatica, we use a specialized "Awake" or "Twilight" sedation protocol. This avoids general anesthesia and allows the patient to communicate with Dr. Sayuj during the procedure, ensuring safety.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span> No General Anesthesia Risks
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span> Minimal Cardiac Stress
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span> Early Mobilization (Walk Same Day)
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl">
             <h3 className="font-bold text-blue-800 mb-2">Second Opinion Service</h3>
             <p className="text-sm text-gray-600 mb-4">
               Have you been advised open surgery? Get a second opinion to see if <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-700 font-semibold hover:underline">Endoscopic Spine Surgery</Link> is a safer option for you or your elderly parent.
             </p>
             <Link
               href="/appointments"
               className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
             >
               Get a Second Opinion
             </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Our Treatment Ladder</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h3 className="text-lg font-bold mb-3 text-gray-900">Step 1: Conservative Care</h3>
            <p className="text-gray-700 mb-3">
              Most patients start here. We use specific anti-inflammatory medications (not just painkillers) and muscle relaxants.
            </p>
            <p className="text-sm font-semibold text-green-700">Success Rate: ~70%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
            <h3 className="text-lg font-bold mb-3 text-gray-900">Step 2: Pain Interventions</h3>
            <p className="text-gray-700 mb-3">
              If pain persists, we use <strong>Transforaminal Nerve Root Blocks</strong>. This is a day-care procedure that delivers medication directly to the nerve root.
            </p>
            <p className="text-sm font-semibold text-yellow-700">Success Rate: ~20% (of remaining)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 className="text-lg font-bold mb-3 text-gray-900">Step 3: Surgical Solution</h3>
            <p className="text-gray-700 mb-3">
              <strong>Endoscopic Discectomy</strong> is the gold standard when conservative care fails. It's a keyhole procedure with same-day walking.
            </p>
            <p className="text-sm font-semibold text-blue-700">Reserved for: ~10% of cases</p>
          </div>
        </div>
      </section>

      {/* Cost Transparency Section */}
      <CostTransparencySection
        costs={sciaticaCosts}
        disclaimer="Estimates for general guidance. Final cost depends on hospital category (Economy/Private/Deluxe), specific implants (if any), and medical complexity. Insurance cashless facility available."
      />

      <section className="mb-12 rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Is it a Slip Disc?</h2>
        <p className="text-gray-700 mb-4">
          Most sciatica is caused by a herniated disc. Learn more about our specialized minimally invasive treatment for slip discs.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/conditions/slip-disc-treatment-hyderabad" className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors">
            View Slip Disc Treatment
          </Link>
          <a
            href="https://wa.me/919778280044"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-300 px-5 py-2 text-sm font-semibold text-green-800 hover:bg-green-100 transition-colors"
          >
            Chat with Doctor
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Red Flags: When to See a Doctor Urgently</h2>
        <div className="bg-red-50 p-6 rounded-lg border border-red-100">
          <p className="text-gray-700 mb-4 font-semibold">
            Do not ignore sciatica if you have:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span>Sudden, severe pain or numbness in both legs</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span>Loss of bowel or bowel control (incontinence)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span>"Saddle anesthesia" - numbness in the groin area</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span>Foot drop (difficulty lifting the front of your foot)</span>
            </li>
          </ul>
          <p className="text-sm text-red-700 mt-4">
            These could be signs of Cauda Equina Syndrome, a medical emergency requiring immediate surgery.
          </p>
        </div>
      </section>

      <PatientEducationVideos category="sciatica" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Patient Education Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/blog/sciatica-pain-relief-exercises-hyderabad" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-blue-800 mb-2">5 Ways to Manage Sciatica at Home</h3>
            <p className="text-gray-600 text-sm">Learn effective home remedies and exercises to reduce nerve pain while waiting for your appointment.</p>
          </Link>
          <Link href="/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-blue-800 mb-2">Endoscopic Surgery for Sciatica</h3>
            <p className="text-gray-600 text-sm">Understand how minimally invasive surgery can permanently relieve sciatica when medicines fail.</p>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Book Your Consultation</h2>
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 mb-6">
            Living with sciatica can be debilitating. Get a proper diagnosis and start your
            journey to a pain-free life today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointments"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Book Appointment
            </Link>
            <a
              href="tel:+919778280044"
              className="bg-white text-blue-600 px-8 py-3 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-colors text-lg font-semibold"
            >
              Call: +91 9778280044
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Frequently Asked Questions</h2>
        <div className="space-y-4">
      {FAQ.map(({ q, a }, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-blue-700">{q}</h3>
          <p className="text-gray-700">{a}</p>
        </div>
      ))}
    </div>
  </section>

  <LocalPathways mode="condition" />

  <section className="mb-12 space-y-6">
    <ReviewedBy />
    <NAP />
  </section>

  {/* Schema Markup */}
  <MedicalWebPageSchema
        title="Sciatica Treatment in Hyderabad | Non-Surgical & Endoscopic Options"
        description="Expert sciatica treatment in Hyderabad by Dr. Sayuj Krishnan. 90% of patients recover without surgery. Get a precise diagnosis and non-surgical relief plan."
        pageSlug="/conditions/sciatica-pain-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Sciatica Treatment"
        breadcrumbs={breadcrumbs}
      />

      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/conditions/sciatica-pain-treatment-hyderabad/`}
      />

      <AuthorByline
        publishedOn="2025-01-03"
        updatedOn="2025-01-15"
      />

      <SourceList sources={sources['sciatica-pain-treatment-hyderabad'] || []} />
</main>
  );
}
