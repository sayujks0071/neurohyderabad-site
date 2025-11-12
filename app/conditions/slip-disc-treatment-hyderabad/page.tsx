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

const baseMetadata = makeMetadata({
  title: "Slip Disc Treatment in Hyderabad | Endoscopic Discectomy | Dr. Sayuj Krishnan",
  description: "Minimally invasive endoscopic discectomy, rehab, and conservative care plans for slip disc patients in Hyderabad.",
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
    a: "A slip disc (herniated disc) occurs when the soft center of a spinal disc pushes through a crack in the outer ring. Dr. Sayuj Krishnan specializes in endoscopic discectomy, a minimally invasive procedure that removes the herniated portion through a tiny 6-8mm incision, allowing same-day discharge and faster recovery."
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
        Slip Disc Treatment in Hyderabad | Endoscopic Discectomy
      </h1>
      
      <p className="text-lg text-gray-700 mb-8">
        Expert slip disc treatment in Hyderabad with advanced endoscopic discectomy techniques. 
        Dr. Sayuj Krishnan specializes in minimally invasive spine surgery, offering same-day 
        discharge and faster recovery for patients with herniated discs.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">What is a Slip Disc?</h2>
          <p className="text-gray-700 mb-4">
            A slip disc, also known as a herniated disc, occurs when the soft center of a spinal 
            disc pushes through a crack in the outer ring. This can compress nearby nerves, 
            causing pain, numbness, or weakness in the arms or legs.
          </p>
          
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Common Symptoms</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Sharp, shooting pain in the leg or arm</span>
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
              <span>Pain that worsens with sitting or bending</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Endoscopic Discectomy?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Minimal Incision:</strong> Only 6-8mm opening</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Same-day Discharge:</strong> Go home the same day</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Faster Recovery:</strong> Return to work in 1-2 weeks</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Less Pain:</strong> Minimal post-operative discomfort</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Preserved Anatomy:</strong> Maintains normal spinal structure</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Treatment Process</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">1. Initial Consultation</h3>
            <p className="text-gray-700">
              Dr. Krishnan reviews your MRI, examines your symptoms, and discusses 
              treatment options. Most patients benefit from endoscopic discectomy.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">2. Endoscopic Procedure</h3>
            <p className="text-gray-700">
              The herniated disc material is removed through a tiny incision using 
              advanced endoscopic techniques. The procedure takes 45-60 minutes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">3. Recovery & Follow-up</h3>
            <p className="text-gray-700">
              Most patients walk the same day and can return to desk work within 
              1-2 weeks. Dr. Krishnan provides personalized recovery guidelines.
            </p>
          </div>
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
              <span>Those who haven't improved with conservative treatment</span>
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
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Why Choose Dr. Sayuj Krishnan?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Expertise & Experience</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Over 9 years of neurosurgical experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Advanced training in Germany</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Specialized in minimally invasive techniques</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>High success rate with endoscopic procedures</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Patient-Centered Care</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Comprehensive pre-operative evaluation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Personalized treatment plans</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Detailed post-operative care instructions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span>Regular follow-up appointments</span>
              </li>
            </ul>
          </div>
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
        description="Expert slip disc treatment in Hyderabad with endoscopic discectomy. Same-day discharge, minimal pain, faster recovery. Book consultation with Dr. Sayuj Krishnan."
        pageSlug="/conditions/slip-disc-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Slip Disc Treatment"
        breadcrumbs={breadcrumbs}
      />
      
      <FAQPageSchema />
      <BreadcrumbSchema items={breadcrumbs} />
    
      <AuthorByline 
        publishedOn="2025-02-15"
        updatedOn="2025-10-19"
      />
      
      <SourceList sources={sources['slip-disc-treatment-hyderabad'] || []} />
      
      <ReviewedBy />
</main>
  );
}
