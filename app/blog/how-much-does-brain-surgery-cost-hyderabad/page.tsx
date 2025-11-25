import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getBlogSources } from '../sources';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const baseMetadata = makeMetadata({
  title: 'How Much Does Brain Surgery Cost in Hyderabad? Complete Guide 2025',
  description: 'Complete guide to brain surgery costs in Hyderabad. Learn about pricing factors, insurance coverage, payment options, and cost breakdowns for different brain surgery procedures.',
  canonicalPath: '/blog/how-much-does-brain-surgery-cost-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'brain surgery cost hyderabad',
    'how much does brain surgery cost',
    'brain surgery price hyderabad',
    'brain tumor surgery cost',
    'neurosurgery cost hyderabad',
    'brain surgery cost breakdown',
    'brain surgery insurance coverage hyderabad',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/how-much-does-brain-surgery-cost-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/blog/how-much-does-brain-surgery-cost-hyderabad/`,
      'x-default': `${SITE_URL}/blog/how-much-does-brain-surgery-cost-hyderabad/`,
    },
  },
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/blog/how-much-does-brain-surgery-cost-hyderabad/`,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Brain Surgery Cost in Hyderabad')}&subtitle=${encodeURIComponent('Complete Pricing Guide 2025')}`,
        width: 1200,
        height: 630,
        alt: 'Brain Surgery Cost Guide — Dr Sayuj Krishnan',
      },
    ],
  },
};

export const revalidate = 86400;

const ARTICLE_SOURCES = getBlogSources("how-much-does-brain-surgery-cost-hyderabad");

const faqs = [
  {
    question: "How much does brain surgery cost in Hyderabad?",
    answer: "Brain surgery costs in Hyderabad typically range from ₹5,00,000 to ₹15,00,000 depending on the procedure type. Minimally invasive brain tumor surgery costs ₹5,00,000 - ₹6,75,000, while complex procedures like awake craniotomy or deep brain stimulation can cost ₹8,00,000 - ₹15,00,000. Costs vary based on tumor type, surgical approach, hospital stay, and post-operative care."
  },
  {
    question: "Does insurance cover brain surgery in Hyderabad?",
    answer: "Yes, most health insurance plans in India cover medically necessary brain surgery procedures. Coverage typically includes surgery, anesthesia, hospital stay, and pre/post-operative care. However, pre-authorization is usually required. Our team at Yashoda Hospital assists with insurance coordination and pre-authorization to ensure smooth coverage."
  },
  {
    question: "What factors affect brain surgery cost?",
    answer: "Key factors affecting brain surgery cost include: (1) Procedure complexity - minimally invasive vs traditional open surgery, (2) Tumor type and location - benign vs malignant, accessibility, (3) Hospital stay duration - ICU care, recovery time, (4) Pre and post-operative care - imaging, pathology, rehabilitation, (5) Surgeon expertise and hospital facilities, (6) Insurance coverage and network status."
  },
  {
    question: "Are there payment plans available for brain surgery?",
    answer: "Yes, many hospitals in Hyderabad including Yashoda Hospital offer flexible payment options for brain surgery. These include EMI options, cashless insurance, partial payment plans, and corporate health insurance coverage. Our team provides detailed cost estimates upfront and helps coordinate payment arrangements to make quality brain surgery accessible."
  }
];

export default function HowMuchDoesBrainSurgeryCostPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: 'Brain Surgery Cost Guide', href: '/blog/how-much-does-brain-surgery-cost-hyderabad' },
        ]}
      />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              How Much Does Brain Surgery Cost in Hyderabad?
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Complete Pricing Guide & Cost Breakdown for 2025
            </p>
            <AuthorByline
              publishedOn="2025-11-25"
              updatedOn="2025-11-25"
              className="justify-center"
            />
          </header>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Quick Cost Overview</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded p-4">
                <div className="font-semibold text-gray-700 mb-2">Minimally Invasive</div>
                <div className="text-2xl font-bold text-green-600">₹5-7 Lakhs</div>
                <div className="text-gray-600 text-xs mt-1">Brain tumor surgery</div>
              </div>
              <div className="bg-white rounded p-4">
                <div className="font-semibold text-gray-700 mb-2">Complex Procedures</div>
                <div className="text-2xl font-bold text-blue-600">₹8-12 Lakhs</div>
                <div className="text-gray-600 text-xs mt-1">Awake craniotomy, DBS</div>
              </div>
              <div className="bg-white rounded p-4">
                <div className="font-semibold text-gray-700 mb-2">Emergency Surgery</div>
                <div className="text-2xl font-bold text-orange-600">₹6-10 Lakhs</div>
                <div className="text-gray-600 text-xs mt-1">Brain bleed, trauma</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> Costs are estimates and vary based on individual case complexity, hospital choice, and insurance coverage. Contact us for a personalized cost estimate.
            </p>
          </div>

          <section className="prose prose-lg max-w-none mb-12">
            <p className="lead text-xl text-gray-700">
              Understanding brain surgery costs is crucial when facing a neurosurgical procedure. This comprehensive guide breaks down brain surgery pricing in Hyderabad, covering different procedure types, cost factors, insurance coverage, and payment options to help you make informed decisions.
            </p>
            <p>
              Dr. Sayuj Krishnan at Yashoda Hospital Malakpet provides transparent pricing, detailed cost estimates, and assistance with insurance coordination to ensure quality brain surgery care is accessible to patients in Hyderabad and across India.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Cost Breakdown by Procedure Type</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">Brain Tumor Surgery</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Minimally Invasive Approach</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Surgery & Anesthesia:</span>
                        <span className="font-semibold">₹3,50,000 - ₹4,50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hospital Stay (3-5 days):</span>
                        <span className="font-semibold">₹1,00,000 - ₹1,50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Imaging & Tests:</span>
                        <span className="font-semibold">₹50,000 - ₹75,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-green-600 text-lg">₹5,00,000 - ₹6,75,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Complex/Open Surgery</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Surgery & Anesthesia:</span>
                        <span className="font-semibold">₹4,50,000 - ₹6,00,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hospital Stay (5-10 days):</span>
                        <span className="font-semibold">₹1,50,000 - ₹2,50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Imaging & Tests:</span>
                        <span className="font-semibold">₹75,000 - ₹1,00,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-blue-600 text-lg">₹6,75,000 - ₹9,50,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group rounded-lg bg-gray-50 p-5 shadow-sm transition-all duration-300 ease-in-out open:bg-blue-50 open:shadow-md">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-800 group-open:text-blue-700">
                    {faq.question}
                    <span className="ml-2 transform transition-transform duration-300 group-open:rotate-180">
                      <svg className="h-5 w-5 text-gray-500 group-open:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-3 text-gray-700 group-open:animate-fadeIn">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get a Personalized Cost Estimate</h2>
            <p className="text-xl mb-6 text-blue-100">
              Contact us for a detailed cost breakdown based on your specific condition and treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointments"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </section>

          <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
          <ReviewedBy lastReviewed="2025-11-25" />
          <NAP />
        </div>
      </div>
      <FAQPageSchema faqs={faqs} />
    </>
  );
}
