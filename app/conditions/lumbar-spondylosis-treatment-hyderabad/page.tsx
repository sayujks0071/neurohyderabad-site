import React from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import MedicalWebPageSchema from "../../components/schemas/MedicalWebPageSchema";
import FAQPageSchema from "@/app/_components/FAQPageSchema";
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
  title: "Lumbar Spondylosis Treatment Hyderabad | Non-Surgical | Dr Sayuj",
  description: "Effective treatment for Lumbar Spondylosis in Hyderabad. Physiotherapy, lifestyle changes & medication. Minimally invasive options for severe cases. Dr. Sayuj Krishnan.",
  canonicalPath: '/conditions/lumbar-spondylosis-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "lumbar spondylosis treatment hyderabad",
    "spondylosis exercises",
    "back pain in elderly",
    "lumbar spondylosis surgery cost hyderabad",
    "spondylosis causes",
    "spinal arthritis treatment hyderabad",
    "spine specialist for spondylosis"
  ],
  alternates: {
    canonical: `${SITE_URL}/conditions/lumbar-spondylosis-treatment-hyderabad/`,
  },
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const FAQ = [
  {
    q: "What is Lumbar Spondylosis?",
    a: "Lumbar Spondylosis is the medical term for age-related wear and tear (osteoarthritis) of the lower back. It involves the degeneration of spinal discs and the formation of bone spurs (osteophytes) which can cause stiffness and pain."
  },
  {
    q: "Can Lumbar Spondylosis be cured permanently?",
    a: "While the degenerative changes (aging of the spine) cannot be reversed, the symptoms can be effectively managed. Most patients live pain-free lives with proper exercise, posture correction, and occasional medication."
  },
  {
    q: "Is walking good for Lumbar Spondylosis?",
    a: "Yes, walking is a low-impact exercise that increases blood flow to the spine and strengthens the muscles supporting your back. However, you should avoid walking on uneven surfaces if you have severe pain."
  },
  {
    q: "How is Spondylosis different from a Slip Disc?",
    a: "A slip disc is a sudden herniation of the soft inner core of the disc, often affecting younger people. Spondylosis is a gradual, chronic process of wear and tear affecting discs and joints, typically seen in people over 40."
  },
  {
    q: "When is surgery needed for Spondylosis?",
    a: "Surgery is rarely needed for Spondylosis alone. It is considered only if the degeneration leads to severe spinal stenosis (narrowing of the nerve canal) or spondylolisthesis (slippage) causing nerve damage or inability to walk."
  },
  {
    q: "What exercises should I avoid?",
    a: "Avoid high-impact activities like running or jumping, and heavy weightlifting that compresses the spine. Deep forward bending and twisting should also be done with caution."
  },
  {
    q: "What is the cost of treatment?",
    a: "Conservative treatment (physio/meds) is very affordable. If minimally invasive surgery is required for complications like stenosis, costs range from ₹1.5 Lakhs to ₹3.0 Lakhs depending on the procedure."
  }
];

const spondylosisCosts = [
  {
    procedure: "Physiotherapy Protocol",
    range: "₹500 - ₹1,000 / session",
    recovery: "Ongoing",
    includes: ["Manual Therapy", "Core Strengthening", "Ultrasonic Therapy", "Ergonomic Advice"]
  },
  {
    procedure: "Pain Management Injection",
    range: "₹15,000 - ₹25,000",
    recovery: "Same Day",
    includes: ["Facet Joint Block", "Epidural Steroid", "C-Arm Guidance", "Day Care"]
  },
  {
    procedure: "Decompression Surgery",
    range: "₹1.50 Lakh - ₹2.50 Lakh",
    recovery: "1-2 Weeks",
    includes: ["Endoscopic/Microscopic Decompression", "Hospital Stay", "Anesthesia", "If Stenosis present"]
  }
];

export default function LumbarSpondylosisPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Conditions", path: "/conditions/" },
    { name: "Lumbar Spondylosis", path: "/conditions/lumbar-spondylosis-treatment-hyderabad/" }
  ];

  // Filter relevant stories
  const relatedStories = patientStories.filter(story =>
    story.tags.includes('spine') ||
    story.tags.includes('elderly') ||
    story.tags.includes('stenosis')
  ).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 leading-tight">
        Lumbar Spondylosis Treatment in Hyderabad <span className="block text-2xl md:text-3xl text-blue-600 mt-2 font-medium">Manage Spine Aging Effectively</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Expert care for age-related back pain by Dr. Sayuj Krishnan. We focus on <strong>pain relief, mobility restoration, and preventing progression</strong> through non-surgical methods.
      </p>

      {/* Conservative Care Highlight */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Living Pain-Free with Spondylosis</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
             <p className="text-gray-700 mb-4 text-lg">
               Spondylosis is a natural part of aging, like gray hair. It doesn't mean you have to live in pain. Our holistic approach keeps you active.
             </p>
             <ul className="space-y-4">
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">1</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Active Physiotherapy</h3>
                      <p className="text-sm text-gray-600">Specific exercises to strengthen the core muscles that act as a natural corset for your spine.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">2</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Lifestyle Modifications</h3>
                      <p className="text-sm text-gray-600">Simple changes in how you sit, lift, and sleep can reduce strain on degenerated discs.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">3</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Interventional Pain Relief</h3>
                      <p className="text-sm text-gray-600">For flare-ups, targeted joint blocks can provide relief for months, allowing you to resume exercise.</p>
                   </div>
                </li>
             </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
             <div className="text-center mb-6">
                <span className="block text-5xl font-bold text-blue-600 mb-2">80+</span>
                <span className="text-gray-600 font-medium">Patients Treated Daily</span>
             </div>
             <p className="text-sm text-gray-500 text-center italic border-t pt-4">
                *Most patients manage well without surgery.
             </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Symptoms of Spondylosis</h2>
          <p className="text-gray-700 mb-4">
            Symptoms often develop slowly over time. They are usually worse in the morning and improve with mild movement.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Stiffness in the lower back, especially after waking up</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Pain that radiates to the buttocks</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Difficulty bending backward</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span><strong>Warning Sign:</strong> Numbness or weakness in legs (suggests nerve compression)</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Diagnostic Approach</h3>
          <p className="text-gray-700 mb-4">
            We use advanced imaging to distinguish simple wear and tear from more serious conditions like nerve compression.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>X-Rays:</strong> To see bone spurs and disc height loss</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>MRI Scan:</strong> To check for disc herniation or nerve pinching</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Clinical Exam:</strong> To test flexibility and nerve function</span>
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

      {/* Cost Transparency Section */}
      <CostTransparencySection
        costs={spondylosisCosts}
        disclaimer="Estimates for general guidance. Treatment plans are customized based on the severity of degeneration and symptoms."
      />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Start Your Pain-Free Journey</h2>
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 mb-6">
            Don't let back pain limit your life. Get a personalized spondylosis management plan from Dr. Sayuj Krishnan.
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

  <LocalPathways mode="condition" />

  <section className="mb-12 space-y-6">
    <ReviewedBy />
    <NAP />
  </section>

  {/* Schema Markup */}
  <MedicalWebPageSchema
        title="Lumbar Spondylosis Treatment in Hyderabad | Non-Surgical Care"
        description="Expert management of Lumbar Spondylosis by Dr. Sayuj Krishnan. Holistic approach with physiotherapy, lifestyle changes, and minimally invasive options."
        pageSlug="/conditions/lumbar-spondylosis-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Lumbar Spondylosis Treatment"
        breadcrumbs={breadcrumbs}
      />

      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/conditions/lumbar-spondylosis-treatment-hyderabad/`}
      />

      <AuthorByline
        publishedOn="2026-01-30"
        updatedOn="2026-01-30"
      />

      <SourceList sources={sources['lumbar-spondylosis-treatment-hyderabad'] || []} />
</main>
  );
}
