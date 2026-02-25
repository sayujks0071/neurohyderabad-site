import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import MedicalReviewNotice from '../../../src/components/MedicalReviewNotice';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

export const metadata: Metadata = {
  title: 'Degenerative Disc Disease: Symptoms, Causes & Treatment | Dr. Sayuj Krishnan',
  description: 'Comprehensive guide to degenerative disc disease: symptoms, causes, diagnosis, and treatment options including endoscopic discectomy in Hyderabad.',
  keywords: 'degenerative disc disease, DDD, spinal disc degeneration, back pain, endoscopic discectomy, spine surgery, Hyderabad',
  alternates: {
    canonical: `${SITE_URL}/disease-guides/degenerative-disc-disease/`,
    languages: {
      'en-IN': `${SITE_URL}/disease-guides/degenerative-disc-disease/`,
      'x-default': `${SITE_URL}/disease-guides/degenerative-disc-disease/`
    }
  },
  openGraph: {
    title: 'Degenerative Disc Disease: Complete Guide | Dr. Sayuj Krishnan',
    description: 'Expert information about degenerative disc disease, its symptoms, causes, and advanced treatment options.',
    url: `${SITE_URL}/disease-guides/degenerative-disc-disease/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Degenerative%20Disc%20Disease&subtitle=Complete%20Guide%20to%20Symptoms%20and%20Treatment`,
        width: 1200,
        height: 630,
        alt: 'Degenerative Disc Disease Guide - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const symptoms = [
  'Chronic lower back pain that worsens with sitting or bending',
  'Pain that radiates to the buttocks and thighs',
  'Stiffness and reduced flexibility in the spine',
  'Pain that improves with walking or changing positions',
  'Muscle spasms in the back',
  'Numbness or tingling in the legs (if nerves are affected)'
];

const causes = [
  'Natural aging process (most common cause)',
  'Genetics and family history',
  'Repetitive stress from work or sports',
  'Smoking (reduces blood supply to discs)',
  'Obesity (increases stress on spine)',
  'Previous spinal injuries or trauma'
];

const treatments = [
  {
    type: 'Conservative Treatment',
    description: 'Non-surgical approaches for mild to moderate cases',
    options: [
      'Physical therapy and exercise programs',
      'Pain medications and anti-inflammatory drugs',
      'Epidural steroid injections',
      'Lifestyle modifications (weight loss, smoking cessation)',
      'Heat and cold therapy'
    ]
  },
  {
    type: 'Minimally Invasive Surgery',
    description: 'Advanced endoscopic procedures for severe cases',
    options: [
      'Endoscopic discectomy for nerve decompression',
      'Endoscopic foraminotomy for nerve root relief',
      'Percutaneous disc decompression',
      'Radiofrequency ablation for pain relief'
    ]
  },
  {
    type: 'Traditional Surgery',
    description: 'Open procedures for complex cases',
    options: [
      'Spinal fusion for stabilization',
      'Artificial disc replacement',
      'Laminectomy for spinal canal decompression',
      'Discectomy with fusion'
    ]
  }
];

const faqs = [
  {
    question: 'What is the difference between degenerative disc disease and normal aging?',
    answer: 'While some disc degeneration is normal with aging, degenerative disc disease (DDD) causes significant pain and functional limitations. DDD involves the breakdown of disc structure, loss of water content, and development of tears or cracks in the disc wall, leading to chronic pain and reduced mobility.'
  },
  {
    question: 'Can degenerative disc disease be cured?',
    answer: 'While the disc degeneration itself cannot be reversed, symptoms can be effectively managed. Treatment focuses on pain relief, improving function, and preventing further degeneration. Many patients achieve significant improvement with conservative treatment, while others benefit from minimally invasive procedures.'
  },
  {
    question: 'What is endoscopic discectomy and how effective is it for DDD?',
    answer: 'Endoscopic discectomy is a minimally invasive procedure that removes damaged disc material through a small incision using specialized instruments and a camera. It has a success rate of 85-90% for degenerative disc disease, with patients typically experiencing significant pain relief and returning to normal activities within 2-4 weeks.'
  },
  {
    question: 'How long does recovery take after endoscopic discectomy?',
    answer: 'Recovery from endoscopic discectomy is typically much faster than traditional open surgery. Most patients can return to light activities within 1-2 weeks, moderate activities within 4-6 weeks, and full activities within 2-3 months. The small incisions heal quickly with minimal scarring.'
  },
  {
    question: 'What lifestyle changes can help manage degenerative disc disease?',
    answer: 'Key lifestyle changes include maintaining a healthy weight, regular low-impact exercise (swimming, walking), proper posture, ergonomic workplace setup, smoking cessation, and avoiding activities that strain the spine. Physical therapy can also teach specific exercises to strengthen supporting muscles.'
  }
];

export default function DegenerativeDiscDiseasePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": "Degenerative Disc Disease",
    "description": "Age-related wear and tear of spinal discs causing chronic back pain and reduced mobility",
    "signOrSymptom": symptoms,
    "cause": causes,
    "possibleTreatment": treatments.map(t => t.options).flat(),
    "associatedAnatomy": {
      "@type": "AnatomicalStructure",
      "name": "Spinal Discs"
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Degenerative Disc Disease
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            A comprehensive guide to understanding, diagnosing, and treating degenerative disc disease
          </p>
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-lg text-blue-800 font-semibold">
              "Degenerative disc disease is one of the most common causes of chronic back pain, 
              but with proper treatment, most patients can achieve significant relief and return to normal activities."
            </p>
            <p className="text-blue-600 mt-2">— Dr. Sayuj Krishnan</p>
          </div>
        </section>

        {/* What is DDD */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Degenerative Disc Disease?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Degenerative disc disease (DDD) is a condition where the spinal discs between vertebrae 
              break down over time, leading to chronic pain and reduced mobility. While some disc 
              degeneration is normal with aging, DDD causes significant symptoms that interfere with 
              daily activities.
            </p>
            <p className="text-gray-700 mb-6">
              The spinal discs act as shock absorbers between vertebrae, providing flexibility and 
              cushioning. When these discs degenerate, they lose water content, become thinner, and 
              may develop tears or cracks, leading to pain and inflammation.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Symptoms of Degenerative Disc Disease</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ul className="space-y-4">
              {symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Causes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Causes and Risk Factors</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ul className="space-y-4">
              {causes.map((cause, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Treatment Options */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Treatment Options</h2>
          <div className="space-y-8">
            {treatments.map((treatment, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">{treatment.type}</h3>
                <p className="text-gray-700 mb-6">{treatment.description}</p>
                <ul className="space-y-3">
                  {treatment.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Need Help with Degenerative Disc Disease?</h2>
          <p className="text-xl mb-6 opacity-90">
            Schedule a consultation to discuss your symptoms and explore the best treatment options for your condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/services/minimally-invasive-spine-surgery"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn About Treatment
            </Link>
          </div>
        </section>

        <MedicalReviewNotice />
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
    </main>
  );
}
