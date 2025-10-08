import { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import MedicalCitations from '@/app/_components/MedicalCitations';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';

export const metadata: Metadata = makeMetadata({
  title: 'KIMS Spine Surgery Second Opinion | Dr. Sayuj Krishnan Expert Review',
  description: 'Get a second opinion on KIMS spine surgery recommendations from Dr. Sayuj Krishnan. Expert review of surgical plans, alternative treatments, and minimally invasive options.',
  canonicalPath: '/services/kims-spine-surgery-second-opinion',
});

export default function KIMSSpineSurgerySecondOpinionPage() {
  const url = 'https://www.drsayuj.com/services/kims-spine-surgery-second-opinion';
  
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'KIMS Spine Surgery Second Opinion | Dr. Sayuj Krishnan Expert Review',
      description: 'Get a second opinion on KIMS spine surgery recommendations from Dr. Sayuj Krishnan. Expert review of surgical plans, alternative treatments, and minimally invasive options.',
      author: { '@id': 'https://www.drsayuj.com/#physician' },
      publisher: { '@id': 'https://www.drsayuj.com/#physician' },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drsayuj.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.drsayuj.com/services' },
        { '@type': 'ListItem', position: 3, name: 'KIMS Spine Surgery Second Opinion', item: url }
      ]
    }
  ];

  return (
    <main id="main" className="prose">
      <h1>KIMS Spine Surgery Second Opinion | Dr. Sayuj Krishnan Expert Review</h1>

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Second opinion overview</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Dr. Sayuj provides expert second opinions on KIMS spine surgery recommendations.</li>
          <li>Review includes assessment of surgical necessity, alternative treatments, and technique options.</li>
          <li>Focus on minimally invasive alternatives when clinically appropriate.</li>
          <li>Comprehensive evaluation of your imaging, symptoms, and treatment goals.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Spine surgery second opinion consultation"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        If you've received a spine surgery recommendation from KIMS and want a second opinion, Dr. Sayuj Krishnan 
        provides expert review of your case. With specialized training in minimally invasive spine surgery, 
        Dr. Sayuj can assess whether less invasive alternatives might be appropriate for your condition.
      </p>

      <h2>Why Get a Second Opinion on KIMS Spine Surgery?</h2>
      
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-green-800">Benefits of Second Opinion</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Alternative Approaches:</strong> Explore minimally invasive options not considered</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Treatment Validation:</strong> Confirm if surgery is truly necessary</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Technique Comparison:</strong> Compare traditional vs endoscopic approaches</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Recovery Options:</strong> Understand different recovery timelines and outcomes</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Cost Analysis:</strong> Compare treatment costs and insurance coverage</span>
          </li>
        </ul>
      </div>

      <h2>What Dr. Sayuj Reviews in Your Second Opinion</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Medical Assessment</h3>
          <ul className="space-y-2 text-sm">
            <li>• Review of MRI, CT scans, and X-rays</li>
            <li>• Analysis of symptoms and pain patterns</li>
            <li>• Assessment of conservative treatment options</li>
            <li>• Evaluation of surgical necessity</li>
            <li>• Review of previous treatments and outcomes</li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Surgical Options</h3>
          <ul className="space-y-2 text-sm">
            <li>• Comparison of traditional vs endoscopic techniques</li>
            <li>• Assessment of same-day discharge feasibility</li>
            <li>• Review of recovery timelines and restrictions</li>
            <li>• Analysis of potential complications</li>
            <li>• Evaluation of long-term outcomes</li>
          </ul>
        </div>
      </div>

      <h2>Common KIMS Recommendations Dr. Sayuj Reviews</h2>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Traditional Open Discectomy</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <strong>KIMS Approach:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• 3-5 inch incision</li>
                <li>• 2-3 day hospital stay</li>
                <li>• 4-6 week recovery</li>
                <li>• Traditional muscle dissection</li>
              </ul>
            </div>
            <div>
              <strong>Dr. Sayuj's Alternative:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• 6-8mm endoscopic incision</li>
                <li>• Same-day discharge</li>
                <li>• 2-4 week recovery</li>
                <li>• Minimal muscle disruption</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Spinal Fusion Surgery</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <strong>KIMS Approach:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• Open posterior fusion</li>
                <li>• 5-7 day hospital stay</li>
                <li>• 8-12 week recovery</li>
                <li>• Extensive muscle dissection</li>
              </ul>
            </div>
            <div>
              <strong>Dr. Sayuj's Alternative:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• Minimally invasive TLIF</li>
                <li>• 2-3 day hospital stay</li>
                <li>• 4-6 week recovery</li>
                <li>• Preserved muscle function</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2>Second Opinion Process</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">Step-by-Step Process:</h3>
        <ol className="space-y-3">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
            <span><strong>Initial Consultation:</strong> Bring your KIMS reports, imaging, and treatment plan</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
            <span><strong>Comprehensive Review:</strong> Dr. Sayuj analyzes your case and KIMS recommendations</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
            <span><strong>Alternative Assessment:</strong> Evaluation of minimally invasive options</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
            <span><strong>Detailed Report:</strong> Written second opinion with recommendations</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
            <span><strong>Follow-up Discussion:</strong> Answer questions and explain options</span>
          </li>
        </ol>
      </div>

      <h2>What to Bring for Your Second Opinion</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Required Documents:</h3>
        <ul className="space-y-2">
          <li>• <strong>KIMS Medical Reports:</strong> Discharge summary, operative notes, pathology reports</li>
          <li>• <strong>Imaging Studies:</strong> MRI, CT scans, X-rays (CD or digital copies)</li>
          <li>• <strong>Treatment Plan:</strong> KIMS recommended surgery details and timeline</li>
          <li>• <strong>Previous Treatments:</strong> Records of conservative treatments tried</li>
          <li>• <strong>Current Medications:</strong> List of all medications and supplements</li>
          <li>• <strong>Insurance Information:</strong> Coverage details for second opinion</li>
        </ul>
      </div>

      <h2>Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">How long does a second opinion take?</h3>
          <p>
            A comprehensive second opinion typically takes 1-2 hours, including review of your medical records, 
            imaging studies, and detailed discussion of treatment options. You'll receive a written report within 24-48 hours.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Will insurance cover a second opinion?</h3>
          <p>
            Most insurance plans cover second opinions for major surgeries. Our team will help verify your coverage 
            and assist with pre-authorization if needed. Self-pay options are also available.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">What if Dr. Sayuj agrees with KIMS recommendations?</h3>
          <p>
            If Dr. Sayuj confirms the KIMS recommendation is appropriate, you'll have confidence in your decision. 
            If alternative approaches are available, you'll have options to consider based on your preferences.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Can I get surgery with Dr. Sayuj after the second opinion?</h3>
          <p>
            Yes, if you choose Dr. Sayuj's approach after the second opinion, you can proceed with surgery at 
            Yashoda Hospital Malakpet. The second opinion consultation fee may be applied toward your surgery cost.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Get Your KIMS Second Opinion Today</h2>
        <p className="mb-4">
          Don't proceed with spine surgery without exploring all your options. Dr. Sayuj's second opinion 
          can help you make an informed decision about your treatment approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/appointments" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Book Second Opinion Consultation
          </Link>
          <Link 
            href="/contact" 
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Ask Questions
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
