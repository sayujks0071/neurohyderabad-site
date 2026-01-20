import { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';

export const metadata: Metadata = makeMetadata({
  title: 'Dr. Sayuj vs Apollo Neuro ICU: Expert Comparison for Brain & Spine Surgery',
  description: 'Compare Dr. Sayuj Krishnan with Apollo Neuro ICU for brain and spine surgery. Expert analysis of techniques, outcomes, and patient care approaches in Hyderabad.',
  canonicalPath: '/services/dr-sayuj-vs-apollo-neuro-icu',
});

const ARTICLE_SOURCES = getServiceSources('dr-sayuj-vs-apollo-neuro-icu');

export default function DrSayujVsApolloNeuroICUPage() {
  const url = 'https://www.drsayuj.info/services/dr-sayuj-vs-apollo-neuro-icu';
  const faqs = [
    {
      question: 'Why compare Dr. Sayuj with Apollo Neuro ICU?',
      answer: 'Patients want to understand surgeon-led minimally invasive options versus ICU-based team care and continuity after discharge.',
    },
    {
      question: 'Can I transfer care mid-treatment?',
      answer: 'Yes. We review your imaging and clinical status, then coordinate a safe transfer plan when appropriate.',
    },
  ];
  
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Dr. Sayuj vs Apollo Neuro ICU: Expert Comparison for Brain & Spine Surgery',
      description: 'Compare Dr. Sayuj Krishnan with Apollo Neuro ICU for brain and spine surgery. Expert analysis of techniques, outcomes, and patient care approaches in Hyderabad.',
      author: { '@id': 'https://www.drsayuj.info/#physician' },
      publisher: { '@id': 'https://www.drsayuj.info/#physician' },
      datePublished: '2025-01-15',
      dateModified: '2025-10-19',
      mainEntityOfPage: url,
      breadcrumb: { '@id': `${url}#breadcrumb` }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drsayuj.info/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.drsayuj.info/services' },
        { '@type': 'ListItem', position: 3, name: 'Dr. Sayuj vs Apollo Neuro ICU', item: url }
      ]
    }
  ];

  return (
    <main id="main" className="prose">
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Dr. Sayuj vs Apollo Neuro ICU', path: '/services/dr-sayuj-vs-apollo-neuro-icu' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={url} />
      <h1>Dr. Sayuj vs Apollo Neuro ICU: Expert Comparison for Brain & Spine Surgery</h1>
      <AuthorByline
        publishedOn="2025-09-11"
        updatedOn="2025-10-19"
        className="mb-6"
      />

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Comparison overview</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Dr. Sayuj specializes in minimally invasive endoscopic techniques with same-day discharge options.</li>
          <li>Apollo Neuro ICU offers comprehensive multi-specialist care with advanced infrastructure.</li>
          <li>Both provide excellent outcomes, but approach differs in technique and patient care model.</li>
          <li>Consider your specific condition, recovery preferences, and care approach when choosing.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Neurosurgery comparison: Dr. Sayuj vs Apollo Neuro ICU"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        Choosing between Dr. Sayuj Krishnan and Apollo Neuro ICU for brain and spine surgery requires understanding 
        their different approaches to neurosurgical care. This comparison helps you make an informed decision based 
        on your specific needs, condition, and preferences.
      </p>

      <h2>Dr. Sayuj Krishnan: Specialized Minimally Invasive Approach</h2>
      
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-green-800">Key Advantages</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Endoscopic Expertise:</strong> 6-8mm incisions for spine surgery with faster recovery</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Same-Day Discharge:</strong> Many procedures allow home recovery the same day</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Personalized Care:</strong> Direct access to your surgeon throughout treatment</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Transparent Pricing:</strong> Clear cost structure without hidden fees</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2 mt-1">✓</span>
            <span><strong>Focused Practice:</strong> Specialized in specific neurosurgical techniques</span>
          </li>
        </ul>
      </div>

      <h2>Apollo Neuro ICU: Comprehensive Multi-Specialist Care</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">Key Advantages</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">•</span>
            <span><strong>Advanced Infrastructure:</strong> State-of-the-art Neuro ICU and surgical facilities</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">•</span>
            <span><strong>Multi-Specialist Team:</strong> Access to various medical specialties under one roof</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">•</span>
            <span><strong>24/7 ICU Care:</strong> Round-the-clock intensive care for complex cases</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">•</span>
            <span><strong>International Standards:</strong> JCI-accredited facility with global protocols</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">•</span>
            <span><strong>Research & Innovation:</strong> Access to latest clinical trials and techniques</span>
          </li>
        </ul>
      </div>

      <h2>Detailed Comparison by Procedure Type</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Endoscopic Spine Surgery</h3>
          <div className="space-y-3">
            <div>
              <strong>Dr. Sayuj:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• 6-8mm incision</li>
                <li>• Same-day discharge</li>
                <li>• 2-4 week recovery</li>
                <li>• ₹1.5-2L cost</li>
              </ul>
            </div>
            <div>
              <strong>Apollo Neuro ICU:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• Traditional approach</li>
                <li>• 2-3 day stay</li>
                <li>• 4-6 week recovery</li>
                <li>• ₹2.5-3.5L cost</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Brain Tumor Surgery</h3>
          <div className="space-y-3">
            <div>
              <strong>Dr. Sayuj:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• Minimally invasive techniques</li>
                <li>• 3-5 day stay</li>
                <li>• Faster recovery</li>
                <li>• ₹4-5.5L cost</li>
              </ul>
            </div>
            <div>
              <strong>Apollo Neuro ICU:</strong>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>• Advanced imaging & monitoring</li>
                <li>• 5-10 day stay</li>
                <li>• Comprehensive ICU care</li>
                <li>• ₹5.5-8L cost</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2>When to Choose Dr. Sayuj Krishnan</h2>
      
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-green-800">Ideal for:</h3>
        <ul className="space-y-2">
          <li>• Slip disc and spinal conditions requiring endoscopic surgery</li>
          <li>• Patients preferring faster recovery and same-day discharge</li>
          <li>• Those seeking personalized, direct surgeon access</li>
          <li>• Cost-conscious patients wanting transparent pricing</li>
          <li>• Individuals preferring minimally invasive approaches</li>
        </ul>
      </div>

      <h2>When to Choose Apollo Neuro ICU</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">Ideal for:</h3>
        <ul className="space-y-2">
          <li>• Complex brain tumors requiring multi-specialist care</li>
          <li>• High-risk patients needing intensive monitoring</li>
          <li>• Cases requiring access to multiple medical specialties</li>
          <li>• Patients wanting comprehensive hospital infrastructure</li>
          <li>• International patients requiring JCI-accredited care</li>
        </ul>
      </div>

      <h2>Patient Success Stories</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Dr. Sayuj Patient</h3>
          <blockquote className="text-gray-700 mb-3">
            "I chose Dr. Sayuj for my endoscopic discectomy. The 6mm incision meant I was walking the same day 
            and back to work in 2 weeks. The personalized care and transparent pricing made the decision easy."
          </blockquote>
          <cite className="text-blue-600 font-semibold">— Rajesh Kumar, Software Engineer</cite>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Apollo Neuro ICU Patient</h3>
          <blockquote className="text-gray-700 mb-3">
            "My complex brain tumor required the advanced ICU care and multi-specialist team at Apollo. 
            The 24/7 monitoring and comprehensive approach gave me confidence in my recovery."
          </blockquote>
          <cite className="text-blue-600 font-semibold">— Priya Sharma, Business Owner</cite>
        </div>
      </div>

      <h2>Making Your Decision</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Questions to Consider:</h3>
        <ul className="space-y-2">
          <li>• <strong>Condition Complexity:</strong> Is your condition straightforward or requires multi-specialist care?</li>
          <li>• <strong>Recovery Preference:</strong> Do you prefer faster recovery or comprehensive monitoring?</li>
          <li>• <strong>Cost Considerations:</strong> What's your budget and preference for transparent pricing?</li>
          <li>• <strong>Care Approach:</strong> Do you want direct surgeon access or institutional care?</li>
          <li>• <strong>Infrastructure Needs:</strong> Do you require advanced ICU facilities?</li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Ready to Make Your Choice?</h2>
        <p className="mb-4">
          Get a personalized consultation to discuss your specific condition and determine the best approach 
          for your neurosurgical care. Both Dr. Sayuj and Apollo Neuro ICU offer excellent outcomes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/appointments" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Book Consultation with Dr. Sayuj
          </Link>
          <Link 
            href="/contact" 
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Get Second Opinion
          </Link>
        </div>
      </div>



      <div className="not-prose mt-12">
        <LocalPathways mode="service" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
      <NAP />
      <ReviewedBy lastReviewed="2025-10-19" />

      {schemas.map((schema, index) => (
        <SchemaScript key={index} data={schema} />
      ))}
    </main>
  );
}
