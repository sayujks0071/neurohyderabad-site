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
import { getLocationById } from '@/src/data/locations';
import dynamic from 'next/dynamic';
import PatientEducationVideosSkeleton from '@/app/_components/skeletons/PatientEducationVideosSkeleton';

const PatientEducationVideos = dynamic(() => import('@/app/_components/PatientEducationVideos'), {
  loading: () => <PatientEducationVideosSkeleton />
});

const baseMetadata = makeMetadata({
  title: "Sciatica Treatment Hyderabad | Non-Surgical Cure | Dr Sayuj",
  description: "Expert Sciatica treatment in Hyderabad. 90% recover without surgery using advanced blocks & meds. Endoscopic spine surgery available. Book Dr Sayuj today.",
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

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

const FAQ = [
  {
    q: "What are the latest non-surgical treatments for Sciatica in Hyderabad?",
    a: "Recent advancements include targeted epidural steroid injections, cooled radiofrequency ablation, and specialized decompression physiotherapy, which help the vast majority of our patients avoid surgery."
  },
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
    q: "How long does it take to recover from sciatica surgery?",
    a: "With minimally invasive endoscopic spine surgery, recovery is significantly faster than traditional surgery. Most patients are discharged the same day, can walk immediately, and return to light activities within 1-2 weeks."
  },
  {
    q: "Is surgery for sciatica safe?",
    a: "Yes. Endoscopic spine surgery for sciatica is highly safe and precise. It involves a tiny incision (less than 1 cm), minimizing damage to surrounding muscles and tissues, leading to less pain and lower risk of complications."
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
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Dr. Sayuj as Your Sciatica Specialist in Hyderabad?</h3>
          <p className="text-gray-700 mb-4">
            As a leading spine and sciatica specialist in Hyderabad, Dr. Sayuj Krishnan focuses on an evidence-based, conservative-first approach to provide lasting relief from radiating leg pain.
          </p>
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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">When to See a Doctor for Sciatica in Hyderabad (Red Flags)</h2>
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
          <p className="text-sm text-red-700 mt-4 mb-4">
            These could be signs of Cauda Equina Syndrome, a medical emergency requiring immediate surgery.
          </p>
          <div className="mt-4">
            <Link href="/appointments" className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm">
              Book Urgent Appointment
            </Link>
          </div>
        </div>
      </section>

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
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b-2 border-blue-100 pb-2">Your Symptom-to-Surgery Pathway</h2>
        <p className="text-gray-700 mb-8 max-w-3xl text-lg">
          Navigating severe sciatica can be confusing. We follow an evidence-based, step-wise pathway. Surgery is never the first option, but we recognize its profound value when conservative measures are exhausted.
        </p>

        <div className="space-y-6">
          {/* Phase 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 relative">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-4 border-white shadow"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 pl-4">Phase 1: Diagnosis & Optimization (Weeks 1-3)</h3>
            <div className="pl-4">
              <p className="text-gray-700 mb-3">
                We halt the inflammatory cascade. This involves high-resolution MRI correlation to guarantee the diagnosis is accurate, coupled with neuropathic medications and targeted pelvic control physiotherapy to offload the compressed nerve.
              </p>
              <span className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">Success Rate: ~70% of Patients</span>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 relative">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center border-4 border-white shadow"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 pl-4">Phase 2: Targeted Interventions (Weeks 4-6)</h3>
            <div className="pl-4">
              <p className="text-gray-700 mb-3">
                If pain persists despite rest and physical therapy, we escalate to a <strong>Transforaminal Epidural Steroid Injection (TFESI)</strong>. Under precise live C-arm guidance, anti-inflammatory medication is bathed directly over the swollen nerve root.
              </p>
              <span className="inline-block bg-yellow-50 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full">Success Rate: ~20% of Remaining Patients</span>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-600 relative bg-gradient-to-r from-blue-50 to-white">
            <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow"></div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4 pl-4">Phase 3: The Surgical Solution (Beyond 6 Weeks)</h3>
            <div className="pl-4">
              <p className="text-gray-800 font-medium mb-4 text-lg">
                When the compressive lesion (herniated disc) is too large to resorb naturally, or if there is impending nerve damage, we proceed to surgery.
              </p>

              <div className="bg-white bg-opacity-80 p-5 rounded-lg border border-blue-200 mb-4">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                  <span className="text-xl mr-2">🔬</span> Endoscopic Spine Surgery: The Modern Gold Standard
                </h4>
                <p className="text-gray-700 mb-3">
                  Unlike traditional open laminectomy which requires extensive muscle detachment, Dr. Sayuj utilizes a precision <strong>8mm endoscope</strong>. We enter through the natural foraminal window (from the side) or a microscopic interlaminar approach.
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-800">
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Zero bone destruction</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Negligible blood loss</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Out-of-bed in 2 hours</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Same-day discharge at Yashoda</li>
                </ul>
              </div>

              <Link href="/services/endoscopic-spine-surgery-hyderabad" className="inline-flex items-center text-blue-700 font-bold hover:text-blue-900 transition-colors group">
                Explore the Endoscopic Spine pathway
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
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

      <section className="mb-12 border border-red-100 bg-red-50 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-red-800 mb-6">⚠️ Exercises to Avoid with Sciatica</h2>
        <p className="text-gray-800 mb-6 font-medium">
          While movement is key to recovery, the <strong>wrong exercises</strong> can make your pain worse. Avoid these common mistakes until cleared by Dr. Sayuj or your physiotherapist.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
            <h3 className="text-lg font-bold text-red-700 mb-2">1. Forward Bends (Toe Touches)</h3>
            <p className="text-sm text-gray-700"><strong>Why Avoid:</strong> Bending forward increases pressure on the lumbar discs by up to 100%, potentially worsening a herniated disc.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
            <h3 className="text-lg font-bold text-red-700 mb-2">2. Double Leg Lifts</h3>
            <p className="text-sm text-gray-700"><strong>Why Avoid:</strong> Lifting both legs while lying on your back puts massive strain on your core and lower back muscles, which can aggravate sciatica.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
            <h3 className="text-lg font-bold text-red-700 mb-2">3. High Impact Activities</h3>
            <p className="text-sm text-gray-700"><strong>Why Avoid:</strong> Running, jumping, or high-intensity aerobics cause repeated impact on the spine, compressing the discs further.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
            <h3 className="text-lg font-bold text-red-700 mb-2">4. Deep Hamstring Stretches</h3>
            <p className="text-sm text-gray-700"><strong>Why Avoid:</strong> Stretching the hamstrings too aggressively can pull on the sciatic nerve (neural tension), increasing pain and inflammation.</p>
          </div>
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
          <Link href="/blog/sciatica-exercises-for-office-workers-hyderabad" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-blue-800 mb-2">Sciatica Exercises for Office Workers</h3>
            <p className="text-gray-600 text-sm">Simple desk exercises to relieve back pain and prevent sciatica for IT professionals in Hyderabad.</p>
          </Link>
          <Link href="/blog/sciatica-exercises-to-avoid-hyderabad" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-red-700 mb-2">Exercises to Avoid with Sciatica</h3>
            <p className="text-gray-600 text-sm">Don't make it worse! Learn which common gym exercises can aggravate your sciatic nerve pain.</p>
          </Link>
        </div>
      </section>

      {/* Recovery Roadmap Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Sciatica Recovery Roadmap</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-300">
            <h3 className="font-bold text-lg mb-2">Day 0-3</h3>
            <p className="text-sm text-gray-600">Rest & medication. Apply ice/heat. Gentle walking as tolerated.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">Week 1-2</h3>
            <p className="text-sm text-gray-600">Start gentle nerve glides. Pain should reduce by 50%. If not, consider <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-600 hover:underline">injection therapy</Link>.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-700">
            <h3 className="font-bold text-lg mb-2">Week 3-6</h3>
            <p className="text-sm text-gray-600">Active physiotherapy. Core strengthening. Return to desk work.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-600">
            <h3 className="font-bold text-lg mb-2">Week 8+</h3>
            <p className="text-sm text-gray-600">Full activity. If pain persists &gt;6 weeks, <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-600 hover:underline">endoscopic surgery</Link> may be discussed.</p>
          </div>
        </div>
      </section>

      {/* Pre-FAQ CTA & Trust Signals */}
      <section className="mb-12 border border-blue-100 bg-blue-50 rounded-2xl p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Book Your Consultation</h2>
            <p className="text-gray-700 mb-6">
              Living with sciatica can be debilitating. Get a proper diagnosis and start your journey to a pain-free life today. Book a consultation with Dr. Sayuj Krishnan to discuss your non-surgical and surgical treatment options.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/appointments"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all text-center font-semibold"
              >
                Book Appointment Online
              </Link>
              <a
                href={`https://wa.me/${getLocationById('hyderabad')?.whatsapp || '919778280044'}?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20for%20sciatica`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all text-center font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${getLocationById('hyderabad')?.telephone || '+919778280044'}`}
                className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all text-center font-semibold"
              >
                Call: {getLocationById('hyderabad')?.telephone || '+91 9778280044'}
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Clinic Information</h3>
            <NAP variant="default" showEmail={false} />
            <div className="mt-4 pt-3 border-t">
              <a
                href={getLocationById('hyderabad')?.directions_url || "https://maps.google.com/?q=Yashoda+Hospitals+Malakpet"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Get Directions
              </a>
            </div>
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

      <LocalPathways mode="condition" currentSlug="sciatica-pain-treatment-hyderabad" />

      <section className="mb-12 space-y-6">
        <ReviewedBy />
        <NAP />
      </section>

      {/* Schema Markup */}
      <MedicalWebPageSchema
        title="Sciatica Treatment Hyderabad | Non-Surgical Cure | Dr Sayuj"
        description="Expert Sciatica treatment in Hyderabad. 90% recover without surgery using advanced blocks & meds. Endoscopic spine surgery available. Book Dr Sayuj today."
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
        updatedOn="2025-05-23"
      />

      <SourceList sources={sources['sciatica-pain-treatment-hyderabad'] || []} />
    </main>
  );
}
