import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import MedicalCitations from '@/app/_components/MedicalCitations';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';

export const metadata = makeMetadata({
  title: 'Spinal Fusion Cost Hyderabad | TLIF ACDF',
  description: 'Spinal fusion cost breakdown, insurance coverage, and payment options with Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
  canonicalPath: '/blog/spinal-fusion-cost-hyderabad',
});

export default function Page() {
  const url = 'https://www.drsayuj.info/blog/spinal-fusion-cost-hyderabad';
  
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#blog`,
      url,
      name: 'Spinal Fusion Cost Hyderabad | TLIF ACDF',
      description: 'Spinal fusion cost breakdown, insurance coverage, and payment options with Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
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
        { '@type': 'ListItem', position: 3, name: 'Spinal Fusion Cost', item: url }
      ]
    }
  ];

  return (
    <main id="main" className="prose">
      <h1>Spinal Fusion Cost Hyderabad | TLIF ACDF</h1>

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Cost overview</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Spinal fusion costs vary based on procedure type, implant selection, and hospital stay duration.</li>
          <li>Most insurance plans cover medically necessary fusion procedures with pre-authorization.</li>
          <li>Our team coordinates insurance approvals and provides detailed cost estimates upfront.</li>
          <li>Payment plans and EMI options are available for self-pay patients.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Spinal fusion surgery cost consultation"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        Understanding spinal fusion costs helps you make informed decisions about your treatment. Dr. Sayuj Krishnan's team at Yashoda Hospital Malakpet provides transparent pricing, insurance coordination, and flexible payment options to ensure quality spine care is accessible.
      </p>

      <h2>Cost breakdown by procedure type</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">TLIF (Lumbar Fusion)</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Surgeon fees:</strong> ₹1,50,000 - ₹2,00,000</li>
            <li><strong>Hospital charges:</strong> ₹80,000 - ₹1,20,000</li>
            <li><strong>Implants & hardware:</strong> ₹1,20,000 - ₹1,80,000</li>
            <li><strong>Anaesthesia:</strong> ₹25,000 - ₹35,000</li>
            <li><strong>Total range:</strong> ₹3,75,000 - ₹5,35,000</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">ACDF (Cervical Fusion)</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Surgeon fees:</strong> ₹1,20,000 - ₹1,60,000</li>
            <li><strong>Hospital charges:</strong> ₹60,000 - ₹90,000</li>
            <li><strong>Implants & hardware:</strong> ₹80,000 - ₹1,20,000</li>
            <li><strong>Anaesthesia:</strong> ₹20,000 - ₹30,000</li>
            <li><strong>Total range:</strong> ₹2,80,000 - ₹4,00,000</li>
          </ul>
        </div>
      </div>

      <h2>Factors affecting final cost</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-blue-800">Procedure complexity</h3>
          <p className="text-sm text-gray-700">Single vs multi-level fusion, revision surgery, and deformity correction impact costs.</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-blue-800">Implant selection</h3>
          <p className="text-sm text-gray-700">Premium titanium vs standard implants, bone graft options, and navigation systems.</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-blue-800">Hospital stay</h3>
          <p className="text-sm text-gray-700">Room category, ICU requirements, and length of stay affect total charges.</p>
        </div>
      </div>

      <h2>Insurance coverage & coordination</h2>
      <p>
        Most health insurance plans cover spinal fusion when medically necessary. Our insurance coordination team handles pre-authorization, TPA submissions, and ensures maximum coverage for your procedure.
      </p>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Insurance process</h3>
        <ol className="space-y-2 text-sm text-green-700">
          <li><strong>1. Pre-authorization:</strong> We submit medical records and imaging for approval.</li>
          <li><strong>2. Coverage verification:</strong> Confirm benefits, deductibles, and co-pay amounts.</li>
          <li><strong>3. Cashless processing:</strong> Direct billing to insurance for covered procedures.</li>
          <li><strong>4. Reimbursement support:</strong> Assistance with claim submissions and follow-ups.</li>
        </ol>
      </div>

      <h2>Payment options for self-pay patients</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">EMI plans</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 6, 12, 18, or 24-month payment plans</li>
            <li>• 0% interest for qualified patients</li>
            <li>• Quick approval process</li>
            <li>• No hidden charges</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">Corporate packages</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Group insurance discounts</li>
            <li>• Corporate tie-up benefits</li>
            <li>• Direct billing arrangements</li>
            <li>• Priority scheduling</li>
          </ul>
        </div>
      </div>

      <h2>Cost comparison: Hyderabad vs other cities</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">City</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">TLIF Range</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ACDF Range</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-sm text-gray-700">Hyderabad</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹3.75L - ₹5.35L</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹2.80L - ₹4.00L</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-700">Mumbai</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹4.50L - ₹6.50L</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹3.20L - ₹4.80L</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-700">Delhi</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹4.20L - ₹6.00L</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹3.00L - ₹4.50L</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-700">Bangalore</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹4.00L - ₹5.80L</td>
              <td className="px-4 py-2 text-sm text-gray-700">₹2.90L - ₹4.20L</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Frequently asked questions</h2>
      <dl className="space-y-6">
        <div>
          <dt className="font-semibold text-blue-900">Does insurance cover spinal fusion?</dt>
          <dd className="text-gray-700">Most insurance plans cover medically necessary fusion procedures. We handle pre-authorization and coordinate with your insurance provider for maximum coverage.</dd>
        </div>
        <div>
          <dt className="font-semibold text-blue-900">Are EMI plans available?</dt>
          <dd className="text-gray-700">Yes, we offer flexible EMI plans with 0% interest for qualified patients. Terms range from 6 to 24 months based on your financial situation.</dd>
        </div>
        <div>
          <dt className="font-semibold text-blue-900">What's included in the cost estimate?</dt>
          <dd className="text-gray-700">Our estimates include surgeon fees, hospital charges, implants, anaesthesia, and standard post-operative care. Additional services are clearly outlined.</dd>
        </div>
        <div>
          <dt className="font-semibold text-blue-900">Can I get a second opinion on costs?</dt>
          <dd className="text-gray-700">Absolutely. We encourage patients to compare costs and quality. Our transparent pricing helps you make informed decisions about your spine care.</dd>
        </div>
      </dl>

      <div className="bg-blue-50 p-8 rounded-lg text-center mt-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Get Your Personalized Cost Estimate</h2>
        <p className="text-gray-600 mb-6">
          Contact our team for a detailed cost breakdown based on your specific condition and treatment plan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/appointments/"
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Book Consultation
          </Link>
          <Link 
            href="/services/spinal-fusion/"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          >
            Learn About Procedures
          </Link>
        </div>
      </div>

      <ReviewedBy lastReviewed="2025-01-15" />
      <MedicalCitations />
      <NAP />

      {schemas.map((schema, index) => (
        <SchemaScript key={index} data={schema} />
      ))}
    </main>
  );
}
