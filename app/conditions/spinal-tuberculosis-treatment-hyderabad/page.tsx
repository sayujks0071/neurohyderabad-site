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
  title: "Spinal Tuberculosis Treatment Hyderabad | Pott's Spine | Dr Sayuj",
  description: "Expert treatment for Spinal Tuberculosis (Pott's Spine) in Hyderabad. Medical management & surgical fixation for deformity. Dr. Sayuj Krishnan.",
  canonicalPath: '/conditions/spinal-tuberculosis-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "spinal tuberculosis treatment hyderabad",
    "pott's spine treatment hyderabad",
    "spine tb surgery cost hyderabad",
    "spinal tb symptoms",
    "best doctor for spinal tb in hyderabad",
    "spine tb recovery time",
    "pott's paraplegia treatment"
  ],
  alternates: {
    canonical: `${SITE_URL}/conditions/spinal-tuberculosis-treatment-hyderabad/`,
  },
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const FAQ = [
  {
    q: "What is Spinal Tuberculosis (Pott's Spine)?",
    a: "Spinal Tuberculosis, also known as Pott's Spine, is a form of TB that affects the vertebrae. It typically spreads from the lungs to the spine, causing back pain, bone destruction, and potentially spinal cord compression."
  },
  {
    q: "Is Spinal Tuberculosis contagious?",
    a: "The spinal infection itself is not contagious. However, if the patient also has active pulmonary (lung) TB, they can spread the bacteria through coughing or sneezing. A chest X-ray is always done to rule this out."
  },
  {
    q: "Does Spinal TB always require surgery?",
    a: "No. The primary treatment is Anti-Tubercular Therapy (ATT) medication for 9-18 months. Surgery is only required if there is severe spinal instability, deformity (kyphosis), or neurological weakness (paralysis) that doesn't improve with medicines."
  },
  {
    q: "What are the symptoms of Pott's Spine?",
    a: "Common symptoms include chronic back pain, fever (especially in the evening), night sweats, weight loss, and in severe cases, weakness in legs or a visible hunchback deformity (Gibbus)."
  },
  {
    q: "How long is the treatment for Spinal TB?",
    a: "Medical treatment typically lasts 9 to 18 months, depending on the severity and response to drugs. Regular follow-ups with MRI/CT scans and blood tests (ESR/CRP) are needed to monitor progress."
  },
  {
    q: "What is the success rate of Spinal TB treatment?",
    a: "With early diagnosis and proper adherence to medication, the cure rate is over 95%. Surgery, when indicated, also has excellent outcomes in restoring stability and function."
  },
  {
    q: "What is the cost of Spinal TB surgery in Hyderabad?",
    a: "If surgery (stabilization/fixation) is needed, the cost ranges from ₹2.5 Lakhs to ₹4.0 Lakhs depending on the number of levels involved and the type of implants used. Medical management is significantly cheaper."
  },
  {
    q: "Can I walk during Spinal TB treatment?",
    a: "Yes, bed rest is usually not required unless there is severe instability. We often prescribe a customized spinal brace (orthosis) to support your back while walking and allow the bones to heal."
  }
];

const tbCosts = [
  {
    procedure: "Diagnostic Workup",
    range: "₹15,000 - ₹25,000",
    recovery: "N/A",
    includes: ["MRI Spine", "Blood Tests (ESR, CRP)", "Biopsy (if needed)", "Consultation"]
  },
  {
    procedure: "CT-Guided Biopsy",
    range: "₹25,000 - ₹40,000",
    recovery: "Day Care",
    includes: ["Procedure charges", "Pathology testing", "Day care stay", "Local anesthesia"]
  },
  {
    procedure: "Spinal Fixation Surgery",
    range: "₹2.50 Lakh - ₹4.00 Lakh",
    recovery: "2-3 Weeks",
    includes: ["Decompression", "Screw & Rod Fixation", "Hospital Stay (3-5 days)", "General Anesthesia"]
  }
];

export default function SpinalTBTreatmentPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Conditions", path: "/conditions/" },
    { name: "Spinal Tuberculosis", path: "/conditions/spinal-tuberculosis-treatment-hyderabad/" }
  ];

  // Filter relevant stories
  const relatedStories = patientStories.filter(story =>
    story.tags.includes('spine') ||
    story.tags.includes('infection') ||
    story.tags.includes('fusion')
  ).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 leading-tight">
        Spinal Tuberculosis (Pott's Spine) Treatment in Hyderabad <span className="block text-2xl md:text-3xl text-blue-600 mt-2 font-medium">Medical Cure & Surgical Stabilization</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Comprehensive care for Spinal TB by Dr. Sayuj Krishnan. We focus on <strong>complete medical cure</strong> with Anti-Tubercular Therapy (ATT) and offer <strong>advanced reconstruction surgery</strong> for complex deformities.
      </p>

      {/* Medical Management First Highlight */}
      <section className="mb-12 bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Medical Management is the Gold Standard</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
             <p className="text-gray-700 mb-4 text-lg">
               The vast majority of Spinal TB patients <strong>do not need surgery</strong>. The infection can be cured with a strict regimen of antibiotics.
             </p>
             <ul className="space-y-4">
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">1</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Accurate Diagnosis</h3>
                      <p className="text-sm text-gray-600">MRI scans and CT-guided biopsy confirm the diagnosis and drug sensitivity.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">2</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Anti-Tubercular Therapy (ATT)</h3>
                      <p className="text-sm text-gray-600">A multi-drug course lasting 9-18 months to completely eradicate the bacteria.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">3</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Spinal Bracing</h3>
                      <p className="text-sm text-gray-600">Customized braces to support the weakened spine and prevent deformity while healing.</p>
                   </div>
                </li>
             </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
             <div className="text-center mb-6">
                <span className="block text-5xl font-bold text-green-600 mb-2">95%</span>
                <span className="text-gray-600 font-medium">Cure Rate with Medication</span>
             </div>
             <p className="text-sm text-gray-500 text-center italic border-t pt-4">
                *Strict adherence to medication is crucial for success.
             </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Understanding Pott's Spine</h2>
          <p className="text-gray-700 mb-4">
            Tuberculosis of the spine usually affects the thoracic and lumbar regions. The infection eats away the vertebral bone and the disc space between them, leading to collapse and kyphosis (hunchback).
          </p>

          <h3 className="text-xl font-semibold mb-4 text-blue-700">Key Symptoms</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Persistent back pain that worsens at night</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Low-grade fever and night sweats</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Unexplained weight loss</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Weakness or numbness in legs (in advanced cases)</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">When is Surgery Needed?</h3>
          <p className="text-gray-700 mb-4">
            Dr. Sayuj Krishnan recommends surgery only under specific "Red Flag" conditions:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span><strong>Neurological Deficit:</strong> Weakness or paralysis in legs</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span><strong>Severe Deformity:</strong> Rapidly progressing kyphosis</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span><strong>Instability:</strong> Severe destruction of bone risking collapse</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">!</span>
              <span><strong>Failure of Medical Management:</strong> Pain or infection persisting despite ATT</span>
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
        costs={tbCosts}
        disclaimer="Estimates for general guidance. Surgery costs vary based on the number of spinal levels fused and implant types. Government schemes may cover ATT medication."
      />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Book Your Consultation</h2>
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 mb-6">
            Early diagnosis prevents permanent deformity. If you have chronic back pain with fever,
            consult Dr. Sayuj Krishnan immediately.
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
        title="Spinal Tuberculosis Treatment Hyderabad | Medical & Surgical Care"
        description="Comprehensive treatment for Spinal TB (Pott's Spine) by Dr. Sayuj Krishnan. Focus on medical cure with ATT and surgical stabilization for complex cases."
        pageSlug="/conditions/spinal-tuberculosis-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Spinal Tuberculosis Treatment"
        breadcrumbs={breadcrumbs}
      />

      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/conditions/spinal-tuberculosis-treatment-hyderabad/`}
      />

      <AuthorByline
        publishedOn="2026-01-30"
        updatedOn="2026-01-30"
      />

      <SourceList sources={sources['spinal-tuberculosis-treatment-hyderabad'] || []} />
</main>
  );
}
