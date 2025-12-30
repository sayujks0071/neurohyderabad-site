import { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import SchemaScript from '@/app/_schema/Script';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import MedicalCitations from '@/app/_components/MedicalCitations';
import SmartImage from '@/components/SmartImage';
import Link from 'next/link';

export const metadata: Metadata = makeMetadata({
  title: 'Neurosurgeon Near Kondapur FAQ | Dr. Sayuj Krishnan',
  description: 'Frequently asked questions about finding a neurosurgeon near Kondapur, Hyderabad. Expert answers from Dr. Sayuj Krishnan about brain and spine surgery options.',
  canonicalPath: '/locations/neurosurgeon-near-kondapur-faq',
});

export default function NeurosurgeonNearKondapurFAQPage() {
  const url = 'https://www.drsayuj.info/locations/neurosurgeon-near-kondapur-faq';
  
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Neurosurgeon Near Kondapur FAQ | Dr. Sayuj Krishnan',
      description: 'Frequently asked questions about finding a neurosurgeon near Kondapur, Hyderabad. Expert answers from Dr. Sayuj Krishnan about brain and spine surgery options.',
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
        { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.drsayuj.info/locations' },
        { '@type': 'ListItem', position: 3, name: 'Neurosurgeon Near Kondapur FAQ', item: url }
      ]
    }
  ];

  const faqs = [
    {
      question: "Who is the best neurosurgeon near Kondapur?",
      answer: "Dr. Sayuj Krishnan is a leading neurosurgeon accessible from Kondapur, specializing in minimally invasive brain and spine surgery. With over 9 years of experience and advanced training in Germany, he offers endoscopic spine surgery with same-day discharge options."
    },
    {
      question: "How far is Dr. Sayuj's clinic from Kondapur?",
      answer: "Dr. Sayuj practices at Yashoda Hospital Malakpet, approximately 25-30 km from Kondapur. The journey takes 45-60 minutes by road via ORR, or 35-45 minutes by metro from Kondapur to Malakpet."
    },
    {
      question: "What spine conditions can be treated near Kondapur?",
      answer: "Dr. Sayuj treats all spine conditions including slip disc, spinal stenosis, spondylolisthesis, sciatica, and spinal tumors. He specializes in endoscopic spine surgery with 6-8mm incisions and same-day discharge for many procedures."
    },
    {
      question: "Is there emergency neurosurgery available near Kondapur?",
      answer: "Yes, Dr. Sayuj provides 24/7 emergency neurosurgery services. For urgent cases, you can call +91 97782 80044 or visit Yashoda Hospital Malakpet's emergency department, which is easily accessible from Kondapur."
    },
    {
      question: "What are the costs of neurosurgery near Kondapur?",
      answer: "Costs vary by procedure. Endoscopic discectomy costs ₹1.5-2L, spinal fusion ₹3-4L, and brain tumor surgery ₹4-5.5L. Dr. Sayuj offers transparent pricing and works with most insurance providers for cashless treatment."
    },
    {
      question: "How do I book an appointment with a neurosurgeon near Kondapur?",
      answer: "You can book online at www.drsayuj.info/appointments, call +91 97782 80044, or visit Yashoda Hospital Malakpet. Dr. Sayuj offers flexible appointment timings and same-day consultations for urgent cases."
    }
  ];

  return (
    <main id="main" className="prose">
      <h1>Neurosurgeon Near Kondapur FAQ | Dr. Sayuj Krishnan</h1>

      <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Quick answers</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Dr. Sayuj Krishnan is the leading neurosurgeon accessible from Kondapur.</li>
          <li>Located at Yashoda Hospital Malakpet, 25-30 km from Kondapur.</li>
          <li>Specializes in minimally invasive endoscopic spine surgery.</li>
          <li>24/7 emergency services and same-day discharge options available.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Neurosurgeon consultation near Kondapur"
        className="mb-10 rounded-xl"
        priority
      />

      <p>
        If you're looking for a neurosurgeon near Kondapur, Dr. Sayuj Krishnan provides expert brain and spine surgery 
        care at Yashoda Hospital Malakpet. This FAQ addresses common questions about accessing neurosurgical care from Kondapur.
      </p>

      <h2>Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>

      <h2>Getting to Dr. Sayuj from Kondapur</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">By Road</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Distance:</strong> 25-30 km</p>
            <p><strong>Travel Time:</strong> 45-60 minutes</p>
            <p><strong>Route:</strong> Kondapur → ORR → Malakpet → Yashoda Hospital</p>
            <p><strong>Parking:</strong> Ample parking available at hospital</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">By Metro</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Route:</strong> Kondapur Metro → Malakpet Metro</p>
            <p><strong>Travel Time:</strong> 35-45 minutes</p>
            <p><strong>Walk:</strong> 5 minutes from Malakpet Metro to hospital</p>
            <p><strong>Frequency:</strong> Every 5-10 minutes</p>
          </div>
        </div>
      </div>

      <h2>Services Available Near Kondapur</h2>
      
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-green-800">Neurosurgical Services</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Spine Surgery</h4>
            <ul className="text-sm space-y-1">
              <li>• Endoscopic discectomy</li>
              <li>• Spinal fusion (TLIF/ACDF)</li>
              <li>• Spinal decompression</li>
              <li>• Spinal tumor surgery</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Brain Surgery</h4>
            <ul className="text-sm space-y-1">
              <li>• Brain tumor surgery</li>
              <li>• Trigeminal neuralgia treatment</li>
              <li>• Hydrocephalus treatment</li>
              <li>• Aneurysm surgery</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Patient Success Stories from Kondapur</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <blockquote className="text-lg text-gray-700 mb-4">
          "I came from Kondapur for my brain tumor surgery with Dr. Sayuj. The minimally invasive approach 
          meant I was back home in 3 days instead of weeks. The care and expertise were exceptional."
        </blockquote>
        <cite className="text-blue-600 font-semibold">— Priya Sharma, IT Professional, Kondapur</cite>
      </div>

      <h2>Emergency Contact Information</h2>
      
      <div className="bg-red-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-red-800">24/7 Emergency Services</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-red-600 mr-3">📞</span>
            <div>
              <strong>Emergency Hotline:</strong> +91 97782 80044
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-red-600 mr-3">🏥</span>
            <div>
              <strong>Hospital:</strong> Yashoda Hospital Malakpet Emergency Department
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-red-600 mr-3">📍</span>
            <div>
              <strong>Address:</strong> OPD Block, Room No 317, Yashoda Hospital, Malakpet
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Ready to Consult with Dr. Sayuj?</h2>
        <p className="mb-4">
          Get expert neurosurgical care accessible from Kondapur. Dr. Sayuj offers personalized treatment 
          with advanced minimally invasive techniques and same-day discharge options.
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
            Get Directions
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
