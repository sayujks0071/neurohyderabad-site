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

const baseMetadata = makeMetadata({
  title: "Slip Disc Treatment in Hyderabad | Endoscopic Discectomy | Dr. Sayuj Krishnan",
  description: "Comprehensive slip disc treatment in Hyderabad: Conservative care, Pain Management, and Minimally Invasive Endoscopic Discectomy. Expert care by Dr. Sayuj Krishnan.",
  canonicalPath: '/conditions/slip-disc-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "slip disc treatment hyderabad",
    "herniated disc",
    "endoscopic discectomy",
    "spine surgery",
    "dr sayuj krishnan",
    "non-surgical spine treatment",
    "sciatica treatment"
  ],
  alternates: {
    canonical: `${SITE_URL}/conditions/slip-disc-treatment-hyderabad/`,
  },
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const FAQ = [
  {
    q: "What is a slip disc and how is it treated?",
    a: "A slip disc (herniated disc) occurs when the soft center of a spinal disc pushes through a crack in the outer ring. Treatment begins with conservative measures like medication and physiotherapy. If symptoms persist, Dr. Sayuj Krishnan specializes in endoscopic discectomy, a minimally invasive procedure for lasting relief."
  },
  {
    q: "Do I always need surgery for a slip disc?",
    a: "No. 80-90% of slip disc patients recover with conservative treatment (medications, rest, physiotherapy) within 6 weeks. Surgery is only recommended if there is severe pain, weakness, or no improvement after non-surgical care."
  },
  {
    q: "How long does endoscopic discectomy take?",
    a: "The endoscopic discectomy procedure typically takes 45-60 minutes. Most patients can walk the same day and return to desk work within 1-2 weeks. Physical jobs may require 4-8 weeks with a graded return plan."
  },
  {
    q: "What are the benefits of endoscopic discectomy over traditional surgery?",
    a: "Endoscopic discectomy offers several advantages: smaller incision (6-8mm vs 3-4 inches), less muscle damage, minimal blood loss, same-day discharge, faster recovery, and reduced risk of complications. The procedure preserves normal spinal anatomy while effectively treating the herniated disc."
  },
  {
    q: "Who is a candidate for endoscopic discectomy?",
    a: "Candidates include patients with leg-dominant pain from herniated discs who haven't improved with conservative treatment (medications, physiotherapy). Dr. Krishnan evaluates each case individually, considering MRI findings, symptoms, and overall health to determine the best treatment approach."
  },
  {
    q: "What is the success rate of endoscopic discectomy?",
    a: "Endoscopic discectomy has a high success rate of 85-95% for appropriate candidates. Success depends on proper patient selection, surgeon experience, and following post-operative care instructions. Dr. Krishnan's extensive experience in minimally invasive spine surgery ensures optimal outcomes."
  }
];

export default function SlipDiscTreatmentPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Conditions", path: "/conditions/" },
    { name: "Slip Disc Treatment", path: "/conditions/slip-disc-treatment-hyderabad/" }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Slip Disc Treatment in Hyderabad | Comprehensive Care
      </h1>
      
      <p className="text-lg text-gray-700 mb-8">
        Expert slip disc treatment in Hyderabad offering a complete care pathway: from
        <strong> Conservative Management</strong> (Medication & Physio) to advanced
        <strong> Endoscopic Discectomy</strong>. Dr. Sayuj Krishnan ensures the right treatment
        at the right time for your spine health.
      </p>

      {/* Red Flag Symptoms Section */}
      <section className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
        <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
          <span className="text-2xl mr-2">⚠️</span> When to See a Doctor Urgently (Red Flags)
        </h2>
        <p className="text-gray-800 mb-4">
          Most slip discs can be managed with time, but seek immediate medical attention if you experience:
        </p>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start">
            <span className="font-bold text-red-600 mr-2">•</span>
            <span><strong>Cauda Equina Syndrome:</strong> Loss of bladder or bowel control, or numbness in the groin/saddle area.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-red-600 mr-2">•</span>
            <span><strong>Progressive Weakness:</strong> Sudden foot drop (unable to lift foot) or worsening leg weakness.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-red-600 mr-2">•</span>
            <span><strong>Intractable Pain:</strong> Severe pain that does not improve with strong painkillers and prevents sleep.</span>
          </li>
        </ul>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">What is a Slip Disc?</h2>
          <p className="text-gray-700 mb-4">
            A slip disc, also known as a herniated disc, occurs when the soft center of a spinal 
            disc pushes through a crack in the outer ring. This can compress nearby nerves, 
            causing pain, numbness, or weakness in the arms or legs. This compression is often the primary cause of <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 underline">sciatica</Link>.
          </p>
          
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Common Symptoms</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>
                Sharp, shooting pain in the leg or arm (
                <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 underline">
                  Sciatica
                </Link>
                )
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Numbness or tingling in affected areas</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Muscle weakness in the leg or arm</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Pain that worsens with sitting, bending, or coughing</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Dr. Sayuj?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Holistic Approach:</strong> Conservative care is always the first option.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Advanced Diagnostics:</strong> Precise MRI evaluation to pinpoint the cause.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Minimally Invasive Expert:</strong> If surgery is needed, we use keyhole techniques (6-8mm).</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Faster Recovery:</strong> Same-day discharge for most endoscopic procedures.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* New Conservative Care Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Care Pathway</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Non-Surgical Care</h3>
            <p className="text-gray-600 mb-4 text-sm">
              The first line of defense. 80-90% of patients recover at this stage.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Medication:</strong> Anti-inflammatories & muscle relaxants.</li>
              <li>• <strong>Physiotherapy:</strong> Strengthening core muscles & posture correction.</li>
              <li>• <strong>Activity Modification:</strong> Avoiding heavy lifting & bending.</li>
              <li>• <strong>Rest:</strong> Short period of relative rest (2-3 days).</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pain Management</h3>
            <p className="text-gray-600 mb-4 text-sm">
              For persistent pain that doesn't respond to oral medication.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Nerve Root Blocks:</strong> Targeted injections to calm inflamed nerves.</li>
              <li>• <strong>Epidural Steroid Injections:</strong> Reduces inflammation around the disc.</li>
              <li>• <strong>Pain Clinic Referral:</strong> Specialized multi-modal pain management.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="border border-blue-200 rounded-xl p-6 shadow-md bg-blue-50">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Surgical Solution</h3>
            <p className="text-blue-800 mb-4 text-sm">
              When conservative care fails or neurological deficits appear.
            </p>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• <strong>Endoscopic Discectomy:</strong> Keyhole surgery (gold standard).</li>
              <li>• <strong>Microdiscectomy:</strong> Microscope-assisted removal.</li>
              <li>• <strong>Same-Day Discharge:</strong> Walk home within hours.</li>
              <li>• <strong>Tiny Incision:</strong> Minimal scarring (6-8mm).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">The Endoscopic Advantage</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">Procedure Overview</h3>
            <p className="text-gray-700 mb-4">
              If surgery is required, Dr. Sayuj utilizes advanced <strong>Endoscopic Spine Surgery</strong>.
              Unlike open surgery, this technique does not cut muscle or bone. A thin tube with a camera
              is inserted through a tiny incision to precisely remove the herniated disc fragment pressing on the nerve.
            </p>
            <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-600 font-medium hover:underline">
              Learn more about Endoscopic Spine Surgery →
            </Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
             <h3 className="text-lg font-semibold mb-3 text-blue-700">Why Patients Prefer It</h3>
             <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Local or General Anaesthesia options</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> No muscle tearing</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Minimal blood loss</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> High success rate (90%+)</li>
             </ul>
          </div>
        </div>
      </section>

      <section className="mb-12 rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Worried about general anaesthesia?</h2>
        <p className="text-gray-700 mb-4">
          For elderly or high-risk patients, Dr. Sayuj offers <strong>awake endoscopic spine surgery</strong> using spinal/epidural blocks with light sedation—minimising anaesthesia risk while keeping the incision tiny.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/services/awake-spine-surgery-hyderabad" className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700">
            Explore Awake Spine Surgery
          </Link>
          <a
            href="https://wa.me/919778280044"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-300 px-5 py-2 text-sm font-semibold text-green-800 hover:bg-green-100"
          >
            Share MRI on WhatsApp
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Candidates for Endoscopic Discectomy</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            Ideal candidates for endoscopic discectomy include:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Patients with leg-dominant pain from herniated discs</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Those who haven't improved with conservative treatment (6+ weeks)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Patients with clear MRI evidence of disc herniation</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Those seeking faster recovery and minimal scarring</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Book Your Consultation</h2>
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 mb-6">
            Don't let slip disc pain limit your daily activities. Book a consultation with 
            Dr. Sayuj Krishnan to discuss your treatment options and get back to your 
            normal life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Book Consultation
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

  <section className="mb-12 space-y-6">
    <ReviewedBy />
    <NAP />
  </section>

  {/* Schema Markup */}
  <MedicalWebPageSchema
        title="Slip Disc Treatment in Hyderabad | Endoscopic Discectomy"
        description="Expert slip disc treatment in Hyderabad. From conservative care to endoscopic discectomy. Same-day discharge, minimal pain. Book consultation with Dr. Sayuj Krishnan."
        pageSlug="/conditions/slip-disc-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Slip Disc Treatment"
        breadcrumbs={breadcrumbs}
      />

      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/conditions/slip-disc-treatment-hyderabad/`}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <AuthorByline
        publishedOn="2025-02-15"
        updatedOn="2025-10-19"
      />

      <div className="mt-12">
        <LocalPathways mode="condition" />
      </div>
      <SourceList sources={sources['slip-disc-treatment-hyderabad'] || []} />
</main>
  );
}
