import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';

export const metadata: Metadata = {
  title: 'Neurological Conditions Treated | Dr. Sayuj Krishnan',
  description: 'Expert treatment for neurological conditions including trigeminal neuralgia, brain tumors, epilepsy, and spine disorders in Hyderabad.',
  alternates: {
    canonical: `${SITE_URL}/conditions/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/`,
      'x-default': `${SITE_URL}/conditions/`
    }
  },
  openGraph: {
    title: 'Neurological Conditions Treated | Dr. Sayuj Krishnan',
    description: 'Expert treatment for neurological conditions including trigeminal neuralgia, brain tumors, epilepsy, and spine disorders in Hyderabad.',
    url: `${SITE_URL}/conditions/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Neurological%20Conditions&subtitle=Expert%20Treatment%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Neurological Conditions - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neurological Conditions Treated | Dr. Sayuj Krishnan',
    description: 'Expert treatment for neurological conditions including trigeminal neuralgia, brain tumors, epilepsy, and spine disorders in Hyderabad.',
    images: [`${SITE_URL}/api/og?title=Neurological%20Conditions&subtitle=Expert%20Treatment%20in%20Hyderabad`],
  },
};

export default function ConditionsPage() {
  const conditions = [
    {
      title: 'Trigeminal Neuralgia',
      description: 'Severe facial pain condition treated with advanced surgical techniques including microvascular decompression.',
      href: '/conditions/trigeminal-neuralgia-treatment-hyderabad/',
      symptoms: ['Severe facial pain', 'Electric shock-like sensations', 'Pain triggered by touch', 'Difficulty eating/speaking']
    },
    {
      title: 'Brain Tumors',
      description: 'Comprehensive treatment for benign and malignant brain tumors using advanced surgical techniques.',
      href: '/services/brain-tumor-surgery-hyderabad/',
      symptoms: ['Headaches', 'Seizures', 'Memory problems', 'Personality changes', 'Vision problems']
    },
    {
      title: 'Epilepsy',
      description: 'Surgical treatment for drug-resistant epilepsy with advanced techniques and comprehensive evaluation.',
      href: '/services/epilepsy-surgery-hyderabad/',
      symptoms: ['Recurrent seizures', 'Loss of consciousness', 'Uncontrolled movements', 'Memory loss']
    },
    {
      title: 'Spine Disorders',
      description: 'Minimally invasive treatment for herniated discs, spinal stenosis, and other spine conditions.',
      href: '/services/minimally-invasive-spine-surgery/',
      symptoms: ['Back pain', 'Neck pain', 'Numbness/tingling', 'Weakness in limbs', 'Difficulty walking']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Neurological Conditions We Treat</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert diagnosis and treatment for complex neurological conditions with advanced surgical techniques
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          {conditions.map((condition, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">{condition.title}</h2>
              <p className="text-gray-600 mb-4">{condition.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Common Symptoms:</h3>
                <ul className="space-y-1">
                  {condition.symptoms.map((symptom, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {symptom}</li>
                  ))}
                </ul>
              </div>
              
              <Link 
                href={condition.href}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          ))}
        </section>

        <section className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">When to Seek Medical Attention</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-700 mb-2">Emergency Symptoms:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Sudden severe headache</li>
                <li>• Loss of consciousness</li>
                <li>• Sudden weakness or paralysis</li>
                <li>• Difficulty speaking or understanding</li>
                <li>• Sudden vision changes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">Schedule Consultation:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Persistent headaches</li>
                <li>• Recurrent seizures</li>
                <li>• Chronic back/neck pain</li>
                <li>• Numbness or tingling</li>
                <li>• Memory or cognitive changes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Need Expert Evaluation?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides comprehensive evaluation and personalized treatment plans for neurological conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/contact/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}