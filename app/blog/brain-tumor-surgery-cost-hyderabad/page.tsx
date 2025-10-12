import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import MedicalCitations from '@/app/_components/MedicalCitations';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';

export const metadata = makeMetadata({
  title: 'Brain Tumor Surgery Cost Hyderabad | Transparent Pricing',
  description: 'Brain tumor surgery cost breakdown, insurance coverage, and payment options with Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
  canonicalPath: '/blog/brain-tumor-surgery-cost-hyderabad',
});

export default function Page() {
  const url = 'https://www.drsayuj.info/blog/brain-tumor-surgery-cost-hyderabad';
  
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#blog`,
      url,
      name: 'Brain Tumor Surgery Cost Hyderabad | Transparent Pricing',
      description: 'Brain tumor surgery cost breakdown, insurance coverage, and payment options with Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
      author: { '@id': 'https://www.drsayuj.info/#physician' },
      publisher: { '@id': 'https://www.drsayuj.info/#physician' },
      datePublished: '2025-01-15',
      dateModified: '2025-01-15',
      mainEntityOfPage: url,
      breadcrumb: { '@id': `${url}#breadcrumb` }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drsayuj.info/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.drsayuj.info/blog' },
        { '@type': 'ListItem', position: 3, name: 'Brain Tumor Surgery Cost', item: url }
      ]
    }
  ];

  return (
    <main id="main" className="prose">
      <h1>Brain Tumor Surgery Cost Hyderabad | Transparent Pricing</h1>

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Cost overview</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Brain tumor surgery costs vary based on tumor type, location, surgical approach, and hospital stay duration.</li>
          <li>Most insurance plans cover medically necessary brain tumor surgery with pre-authorization.</li>
          <li>Our team coordinates insurance approvals and provides detailed cost estimates upfront.</li>
          <li>Payment plans and EMI options are available for self-pay patients.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Brain tumor surgery cost consultation"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        Understanding brain tumor surgery costs helps you make informed decisions about your treatment. Dr. Sayuj Krishnan's team at Yashoda Hospital Malakpet provides transparent pricing, insurance coordination, and flexible payment options to ensure quality brain surgery care is accessible.
      </p>

      <h2>Cost breakdown by procedure type</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Minimally Invasive Brain Tumor Surgery</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Surgery & Anesthesia:</span>
              <span className="font-semibold">₹3,50,000 - ₹4,50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Hospital Stay (3-5 days):</span>
              <span className="font-semibold">₹1,00,000 - ₹1,50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Imaging & Tests:</span>
              <span className="font-semibold">₹50,000 - ₹75,000</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-semibold">Total Estimated:</span>
              <span className="font-semibold text-green-600">₹5,00,000 - ₹6,75,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Complex Brain Tumor Surgery</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Surgery & Anesthesia:</span>
              <span className="font-semibold">₹4,50,000 - ₹6,00,000</span>
            </div>
            <div className="flex justify-between">
              <span>Hospital Stay (5-10 days):</span>
              <span className="font-semibold">₹1,50,000 - ₹2,50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Imaging & Tests:</span>
              <span className="font-semibold">₹75,000 - ₹1,00,000</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-semibold">Total Estimated:</span>
              <span className="font-semibold text-green-600">₹6,75,000 - ₹9,50,000</span>
            </div>
          </div>
        </div>
      </div>

      <h2>What affects brain tumor surgery costs?</h2>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Key Cost Factors:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Tumor Type & Location:</strong> Benign vs malignant, accessibility, and complexity</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Surgical Approach:</strong> Minimally invasive vs traditional open surgery</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Hospital Stay Duration:</strong> ICU care, recovery time, and complications</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Pre & Post-operative Care:</strong> Imaging, pathology, rehabilitation</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Insurance Coverage:</strong> Network hospitals, pre-authorization requirements</span>
          </li>
        </ul>
      </div>

      <h2>Insurance coverage for brain tumor surgery</h2>
      <p>
        Most health insurance plans cover brain tumor surgery when medically necessary. Our team helps with:
      </p>
      <ul>
        <li>Pre-authorization and claim processing</li>
        <li>Cashless treatment at network hospitals</li>
        <li>Reimbursement assistance for out-of-network care</li>
        <li>Understanding policy limits and exclusions</li>
      </ul>

      <h2>Payment options and financial assistance</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Insurance & TPA</h3>
          <ul className="space-y-2 text-sm">
            <li>• Cashless treatment available</li>
            <li>• Direct billing to insurance</li>
            <li>• Pre-authorization support</li>
            <li>• Claim settlement assistance</li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-800">Self-Pay Options</h3>
          <ul className="space-y-2 text-sm">
            <li>• EMI plans available</li>
            <li>• Flexible payment schedules</li>
            <li>• Transparent pricing</li>
            <li>• No hidden charges</li>
          </ul>
        </div>
      </div>

      <h2>Frequently asked questions</h2>
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">How much does brain tumor surgery cost in Hyderabad?</h3>
          <p>
            Brain tumor surgery costs in Hyderabad typically range from ₹5,00,000 to ₹9,50,000 depending on the complexity, 
            surgical approach, and hospital stay duration. Minimally invasive techniques often result in lower overall costs 
            due to shorter recovery times.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Does insurance cover brain tumor surgery?</h3>
          <p>
            Yes, most health insurance plans cover brain tumor surgery when medically necessary. Our team provides 
            pre-authorization support and helps with claim processing to ensure smooth insurance coverage.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">What's included in the surgery cost?</h3>
          <p>
            The cost typically includes surgery, anesthesia, hospital stay, pre-operative tests, post-operative care, 
            and follow-up consultations. Additional costs may apply for specialized imaging or extended hospital stays.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Are payment plans available?</h3>
          <p>
            Yes, we offer flexible payment plans and EMI options for self-pay patients. Our team works with you to 
            create a payment schedule that fits your financial situation.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Ready to discuss your brain tumor surgery?</h2>
        <p className="mb-4">
          Get a personalized cost estimate and learn about your treatment options. Dr. Sayuj Krishnan provides 
          transparent pricing and comprehensive care for brain tumor patients.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/appointments" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Book Consultation
          </Link>
          <Link 
            href="/contact" 
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Get Cost Estimate
          </Link>
        </div>
      </div>

      <NAP />
      <ReviewedBy />
      <MedicalCitations />

      {schemas.map((schema, index) => (
        <SchemaScript key={index} data={schema} />
      ))}
    </main>
  );
}
