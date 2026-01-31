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

const baseMetadata = makeMetadata({
  title: "Degenerative Disc Disease Treatment Hyderabad | Non-Surgical",
  description: "Expert care for 'Black Disc' & lumbar degeneration. Dr. Sayuj uses advanced nerve blocks & physiotherapy. 90% avoid surgery. Elderly-friendly protocols.",
  canonicalPath: '/conditions/degenerative-disc-disease-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "degenerative disc disease treatment hyderabad",
    "lumbar degenerative disc disease symptoms",
    "non-surgical treatment for degenerative disc disease",
    "spine surgery for elderly hyderabad",
    "black disc disease treatment",
    "lumbar spondylosis treatment hyderabad",
    "back pain in elderly treatment"
  ],
  alternates: {
    canonical: `${SITE_URL}/conditions/degenerative-disc-disease-treatment-hyderabad/`,
  },
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const FAQ = [
  {
    q: "What is Degenerative Disc Disease (DDD)?",
    a: "DDD is not actually a 'disease' but a natural aging process where the spinal discs lose hydration (drying out) and height. This can lead to instability, nerve compression, and chronic back pain."
  },
  {
    q: "Can degenerated discs be repaired without surgery?",
    a: "While we cannot 'regrow' a disc, we can eliminate the pain it causes. 90% of patients achieve long-term relief through targeted physiotherapy, lifestyle changes, and precise nerve root blocks, without needing surgery."
  },
  {
    q: "What is 'Black Disc' disease?",
    a: "On an MRI scan, a healthy disc looks white (hydrated). A degenerated disc looks dark or black because it has lost water content. This is a common finding and doesn't always require surgery unless it causes severe pain."
  },
  {
    q: "Is surgery safe for elderly patients with DDD?",
    a: "Yes, we specialize in 'Awake Spine Surgery' and endoscopic techniques for patients over 60. This avoids the risks of general anesthesia and minimizes recovery time, making it safe for elderly patients with co-morbidities."
  },
  {
    q: "What are the symptoms of lumbar degenerative disc disease?",
    a: "Common symptoms include chronic low back pain that worsens with sitting, pain radiating to the hips or thighs, and occasional 'locking' of the back. Numbness or weakness in the legs indicates nerve involvement."
  },
  {
    q: "How does Dr. Sayuj treat DDD?",
    a: "We follow a step-ladder approach: 1) Medications & Physio to strengthen the spine. 2) Radiofrequency Ablation (RFA) to silence painful nerves. 3) Endoscopic surgery or Fusion only if instability is severe."
  },
  {
    q: "What is the cost of DDD treatment in Hyderabad?",
    a: "Conservative care starts from ₹5,000. Pain interventions like RFA cost ₹40,000–₹60,000. If surgical fusion (TLIF) is needed, it ranges from ₹2.5 Lakhs to ₹4.5 Lakhs depending on the implants and hospital category."
  },
  {
    q: "Does walking help degenerative disc disease?",
    a: "Yes, gentle walking increases blood flow to the spine and strengthens the muscles that support your back. We recommend 20-30 minutes of walking daily, avoiding high-impact activities."
  },
  {
    q: "When is spinal fusion necessary for DDD?",
    a: "Fusion is reserved for cases where the spine is 'unstable' (bones slipping over each other, like Spondylolisthesis) or when simple decompression isn't enough to relieve the pain."
  },
  {
    q: "Can I ignore Degenerative Disc Disease?",
    a: "Ignoring it can lead to worsening stiffness and nerve damage. Early intervention with physiotherapy can slow the progression and prevent the need for major surgery later in life."
  }
];

const dddCosts = [
  {
    procedure: "Conservative Management",
    range: "₹5,000 - ₹15,000",
    recovery: "Ongoing",
    includes: ["Consultation", "X-ray/MRI Review", "Medication Plan", "Physio Guidance"]
  },
  {
    procedure: "Radiofrequency Ablation (Pain Management)",
    range: "₹40,000 - ₹60,000",
    recovery: "Same Day Discharge",
    includes: ["Procedure Charges", "RF Probe Kit", "Day Care Stay", "Local Anesthesia"]
  },
  {
    procedure: "Minimally Invasive Fusion (TLIF)",
    range: "₹2.50 Lakh - ₹4.50 Lakh",
    recovery: "3-5 Days Hospital",
    includes: ["Surgery Charges", "Implants (Screws/Cage)", "Anesthesia", "Hospital Stay"]
  }
];

export default function DegenerativeDiscDiseasePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Conditions", path: "/conditions/" },
    { name: "Degenerative Disc Disease", path: "/conditions/degenerative-disc-disease-treatment-hyderabad/" }
  ];

  // Filter relevant stories (spine, fusion, back pain)
  const relatedStories = patientStories.filter(story =>
    story.tags.includes('spine') ||
    story.tags.includes('fusion') ||
    story.condition.toLowerCase().includes('back pain') ||
    story.condition.toLowerCase().includes('spondylolisthesis')
  ).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 leading-tight">
        Degenerative Disc Disease Treatment <span className="block text-2xl md:text-3xl text-blue-600 mt-2 font-medium">Restoring Quality of Life</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-3xl">
        Don't let chronic back pain limit your golden years. Dr. Sayuj Krishnan offers specialized <strong>geriatric spine care</strong> focused on keeping you active.
        Treat "Black Disc" disease and lumbar degeneration effectively with our <strong>Non-Surgical First</strong> protocol.
      </p>

      {/* New Non-Surgical Highlight Section */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Can You Avoid Surgery for DDD?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
             <p className="text-gray-700 mb-4 text-lg">
               Most "age-related" spine changes do not require metal screws or rods. We focus on managing the pain source so you can live comfortably.
             </p>
             <ul className="space-y-4">
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">1</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Diagnosis Beyond MRI</h3>
                      <p className="text-sm text-gray-600">We correlate your "Black Disc" MRI findings with physical tests to ensure we treat the <em>pain</em>, not just the image.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">2</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Radiofrequency Ablation</h3>
                      <p className="text-sm text-gray-600">A needle-hole procedure that uses heat to silence the tiny nerves causing chronic back pain. No cuts, no stitches.</p>
                   </div>
                </li>
                <li className="flex items-start">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">3</div>
                   <div>
                      <h3 className="font-bold text-gray-900">Core Strengthening</h3>
                      <p className="text-sm text-gray-600">Customized physiotherapy to build a "natural corset" of muscle around your degenerating spine.</p>
                   </div>
                </li>
             </ul>
             <div className="mt-8">
                <Link
                  href="/appointments"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Consult Dr. Sayuj
                </Link>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
             <div className="text-center mb-6">
                <span className="block text-5xl font-bold text-green-600 mb-2">60+</span>
                <span className="text-gray-600 font-medium">Specialized Elderly Care Program</span>
             </div>
             <p className="text-sm text-gray-500 text-center italic border-t pt-4">
                *We prioritize minimal anesthesia and rapid mobilization for senior citizens.
             </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Understanding Degeneration</h2>
          <p className="text-gray-700 mb-4">
            Degenerative Disc Disease is the medical term for the natural wear-and-tear of spinal discs.
            As we age, discs lose their water content and shock-absorbing ability.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-blue-700">Who is at Risk?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Individuals over 40 years of age</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Those with jobs involving heavy lifting</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>People with sedentary lifestyles (weak core)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Smokers (smoking accelerates disc dehydration)</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Dr. Sayuj?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Fellowship Trained:</strong> Specialized in Germany for advanced spine techniques</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Patient-Centric:</strong> Honest advice on when NOT to operate</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Advanced Technology:</strong> Neuronavigation and Endoscopy</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">✓</span>
              <span><strong>Safety Focus:</strong> Protocols specifically designed for elderly patients</span>
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
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h3 className="text-lg font-bold mb-3 text-gray-900">Conservative</h3>
            <p className="text-gray-700 mb-3">
              Lifestyle modification, ergonomic adjustments, and targeted physiotherapy are effective for mild to moderate cases.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
            <h3 className="text-lg font-bold mb-3 text-gray-900">Interventional</h3>
            <p className="text-gray-700 mb-3">
              For persistent pain, <strong>Radiofrequency Ablation</strong> or <strong>Epidural Steroid Injections</strong> can provide significant relief without surgery.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 className="text-lg font-bold mb-3 text-gray-900">Surgical</h3>
            <p className="text-gray-700 mb-3">
              <strong>Minimally Invasive Fusion (TLIF)</strong> stabilizes the spine if there is slippage or severe instability.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Transparency Section */}
      <CostTransparencySection
        costs={dddCosts}
        disclaimer="Estimates for general guidance. Final cost depends on hospital category, specific implants used (e.g. titanium vs PEEK cages), and medical complexity."
      />

      <section className="mb-12 rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Worried About "Black Disc" on MRI?</h2>
        <p className="text-gray-700 mb-4">
          A "Black Disc" diagnosis can be scary, but it's very common. Dr. Sayuj can explain what your MRI report actually means for your health.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog/understanding-mri-spine-report-guide" className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors">
            Read MRI Guide
          </Link>
          <a
            href="https://wa.me/919778280044"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-300 px-5 py-2 text-sm font-semibold text-green-800 hover:bg-green-100 transition-colors"
          >
            Send MRI on WhatsApp
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Patient Education Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/blog/spondylolisthesis-vs-herniated-disc-difference" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-blue-800 mb-2">Spondylolisthesis vs Disc Herniation</h3>
            <p className="text-gray-600 text-sm">Understand the difference between a "slipped disc" and a "slipped bone" and why it matters.</p>
          </Link>
          <Link href="/blog/life-after-spinal-fusion-surgery-recovery-hyderabad" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-blue-800 mb-2">Life After Spine Fusion</h3>
            <p className="text-gray-600 text-sm">Read about the recovery timeline and return to normal activities after fusion surgery.</p>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Book Your Consultation</h2>
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 mb-6">
            Chronic back pain doesn't have to be your "new normal". Schedule a comprehensive
            spine evaluation with Dr. Sayuj Krishnan.
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
        title="Degenerative Disc Disease Treatment Hyderabad | Non-Surgical & Endoscopic"
        description="Expert treatment for Degenerative Disc Disease in Hyderabad by Dr. Sayuj Krishnan. Non-surgical options and minimally invasive fusion for lasting relief."
        pageSlug="/conditions/degenerative-disc-disease-treatment-hyderabad/"
        pageType="condition"
        serviceOrCondition="Degenerative Disc Disease Treatment"
      />

      <BreadcrumbSchema items={breadcrumbs} />

      <FAQPageSchema
        faqs={FAQ.map(item => ({ question: item.q, answer: item.a }))}
        pageUrl={`${SITE_URL}/conditions/degenerative-disc-disease-treatment-hyderabad/`}
      />

      <AuthorByline
        publishedOn="2026-01-23"
        updatedOn="2026-01-23"
      />

      <SourceList sources={sources['degenerative-disc-disease-treatment-hyderabad'] || []} />
</main>
  );
}
