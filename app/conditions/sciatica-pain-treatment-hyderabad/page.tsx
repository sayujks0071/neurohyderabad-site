import React from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import MedicalWebPageSchema from "../../components/schemas/MedicalWebPageSchema";
import FAQPageSchema from "../../components/schemas/FAQPageSchema";
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

const baseMetadata = makeMetadata({
  title: "Sciatica Treatment in Hyderabad | Cost, Relief & Recovery | Dr. Sayuj",
  description: "Expert sciatica treatment in Hyderabad by Dr. Sayuj Krishnan. From nerve blocks to endoscopic surgery. Check estimated costs and patient success stories.",
  canonicalPath: '/conditions/sciatica-pain-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "sciatica treatment hyderabad",
    "sciatica pain relief",
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
    q: "What is the cost of sciatica surgery in Hyderabad?",
    a: "The cost depends on the procedure. A simple nerve root block may cost ₹15,000–₹25,000, while endoscopic spine surgery typically ranges from ₹1.5 Lakhs to ₹2.5 Lakhs depending on the hospital category and implant requirements."
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
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Sciatica Treatment in Hyderabad | Expert Leg Pain Relief
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Get relief from shooting leg pain with Dr. Sayuj Krishnan's comprehensive sciatica treatment protocols.
        From accurate diagnosis to advanced minimally invasive solutions, we target the root cause of your pain.
      </p>

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
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Us for Sciatica?</h3>
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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Treatment Options</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">1. Conservative Care</h3>
            <p className="text-gray-700">
              Initial treatment includes anti-inflammatory medications, muscle relaxants, and specialized
              physiotherapy exercises to relieve nerve pressure.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">2. Pain Interventions</h3>
            <p className="text-gray-700">
              For persistent pain, targeted nerve root blocks (epidural steroid injections) can provide
              significant relief and reduce inflammation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">3. Surgical Solutions</h3>
            <p className="text-gray-700">
              If conservative measures fail, <strong>Endoscopic Discectomy</strong> is a leading minimally invasive option
              to permanently remove the pressure off the nerve.
            </p>
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
        title="Sciatica Treatment in Hyderabad | Leg Pain Relief"
        description="Expert sciatica treatment in Hyderabad by Dr. Sayuj Krishnan. Diagnosis and treatment for radiating leg pain and slip discs."
        pageSlug="/conditions/sciatica-pain-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Sciatica Treatment"
        breadcrumbs={breadcrumbs}
      />

      <FAQPageSchema />
      <BreadcrumbSchema items={breadcrumbs} />

      <AuthorByline
        publishedOn="2026-01-03"
        updatedOn="2026-01-10"
      />

      <SourceList sources={sources['sciatica-treatment-hyderabad'] || []} />

      <ReviewedBy />
</main>
  );
}
