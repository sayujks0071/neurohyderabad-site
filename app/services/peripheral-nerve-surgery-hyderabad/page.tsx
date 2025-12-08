import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const baseMetadata = makeMetadata({
  title: 'Peripheral Nerve Surgery in Hyderabad | Carpal Tunnel, Ulnar, Peroneal',
  description: 'Carpal tunnel release, ulnar nerve decompression, nerve tumor surgery, and nerve repair options in Hyderabad.',
  canonicalPath: '/services/peripheral-nerve-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'peripheral nerve surgery hyderabad',
    'carpal tunnel surgeon hyderabad',
    'ulnar nerve decompression hyderabad',
    'peroneal nerve decompression hyderabad',
    'nerve tumor surgeon hyderabad',
    'nerve repair surgery hyderabad',
  ],
  openGraph: {
    title: 'Peripheral Nerve Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert peripheral nerve surgery including carpal tunnel release, ulnar nerve decompression, and nerve tumor removal in Hyderabad.',
    url: `${SITE_URL}/services/peripheral-nerve-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Peripheral%20Nerve%20Surgery%20in%20Hyderabad&subtitle=Expert%20Nerve%20Decompression%20and%20Repair`,
        width: 1200,
        height: 630,
        alt: 'Peripheral Nerve Surgery in Hyderabad - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const ARTICLE_SOURCES = getServiceSources('peripheral-nerve-surgery-hyderabad');

const procedures = [
  {
    name: 'Carpal Tunnel Release',
    description: 'Surgical decompression of the median nerve at the wrist',
    techniques: ['Open carpal tunnel release', 'Endoscopic carpal tunnel release'],
    indications: ['Severe carpal tunnel syndrome', 'Failed conservative treatment', 'Muscle wasting'],
    recovery: '2-4 weeks',
    successRate: '95%'
  },
  {
    name: 'Ulnar Nerve Decompression',
    description: 'Release of ulnar nerve compression at the elbow (cubital tunnel)',
    techniques: ['Cubital tunnel release', 'Ulnar nerve transposition'],
    indications: ['Cubital tunnel syndrome', 'Ulnar neuropathy', 'Elbow pain and numbness'],
    recovery: '4-6 weeks',
    successRate: '90%'
  },
  {
    name: 'Peroneal Nerve Decompression',
    description: 'Surgical release of peroneal nerve compression at the knee',
    techniques: ['Peroneal nerve decompression', 'Nerve release at fibular head'],
    indications: ['Foot drop', 'Peroneal neuropathy', 'Knee trauma'],
    recovery: '6-8 weeks',
    successRate: '85%'
  },
  {
    name: 'Nerve Tumor Removal',
    description: 'Microsurgical removal of benign nerve tumors',
    techniques: ['Schwannoma excision', 'Neurofibroma removal', 'Nerve sheath tumor surgery'],
    indications: ['Schwannomas', 'Neurofibromas', 'Malignant nerve tumors'],
    recovery: '4-8 weeks',
    successRate: '95%'
  },
  {
    name: 'Nerve Repair & Grafting',
    description: 'Reconstruction of damaged or severed nerves',
    techniques: ['Direct nerve repair', 'Nerve grafting', 'Nerve transfer'],
    indications: ['Nerve injuries', 'Traumatic nerve damage', 'Nerve gaps'],
    recovery: '6-12 months',
    successRate: '70-80%'
  }
];

const conditions = [
  {
    name: 'Carpal Tunnel Syndrome',
    symptoms: ['Numbness in thumb, index, middle fingers', 'Night pain and tingling', 'Weakness in hand grip', 'Pain radiating to forearm'],
    causes: ['Repetitive hand movements', 'Diabetes', 'Pregnancy', 'Arthritis', 'Obesity']
  },
  {
    name: 'Cubital Tunnel Syndrome',
    symptoms: ['Numbness in ring and little fingers', 'Elbow pain', 'Weakness in hand', 'Claw hand deformity'],
    causes: ['Elbow trauma', 'Repetitive elbow bending', 'Arthritis', 'Previous fractures']
  },
  {
    name: 'Peroneal Neuropathy',
    symptoms: ['Foot drop', 'Numbness on top of foot', 'Difficulty walking', 'Weakness in ankle'],
    causes: ['Knee trauma', 'Prolonged sitting', 'Diabetes', 'Compression at fibular head']
  }
];

const faqs = [
  {
    question: 'Is endoscopic carpal tunnel release better than open surgery?',
    answer: 'Both techniques are effective, but endoscopic carpal tunnel release offers advantages including smaller incisions, less post-operative pain, faster recovery, and reduced scarring. However, open release may be preferred for complex cases or when additional procedures are needed.'
  },
  {
    question: 'How long does numbness take to improve after nerve decompression?',
    answer: 'Numbness improvement varies by individual and condition severity. Some patients notice improvement within days to weeks, while others may take 3-6 months for full recovery. Severe cases with long-standing compression may have permanent residual numbness.'
  },
  {
    question: 'Can nerve function fully recover after surgery?',
    answer: 'Recovery depends on several factors including the duration of compression, severity of damage, and patient age. Early intervention typically yields better outcomes. While many patients achieve significant improvement, complete recovery may not always be possible in severe cases.'
  },
  {
    question: 'Do I need EMG/NCS (nerve conduction studies) before surgery?',
    answer: 'Yes, EMG/NCS are essential for confirming the diagnosis, localizing the problem, and assessing severity. These tests help determine if surgery is indicated and provide baseline measurements for post-operative comparison.'
  },
  {
    question: 'Will insurance cover peripheral nerve decompression surgery?',
    answer: 'Most insurance plans cover peripheral nerve surgery when medically necessary. We work with all major insurance providers and TPAs to ensure coverage. Our team will help verify your benefits and handle pre-authorization if required.'
  },
  {
    question: 'What are the risks of peripheral nerve surgery?',
    answer: 'While generally safe, potential risks include infection, bleeding, nerve injury, incomplete relief, and recurrence. Dr. Sayuj uses microsurgical techniques, nerve monitoring, and careful patient selection to minimize these risks.'
  },
  {
    question: 'When should I consider surgery for carpal tunnel syndrome?',
    answer: 'Surgery is recommended when conservative treatments (splinting, injections, therapy) fail, symptoms are severe, or there is muscle wasting. Early surgical intervention often provides better outcomes than waiting for severe nerve damage.'
  }
];

export default function PeripheralNerveSurgeryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Peripheral Nerve Surgery in Hyderabad",
    "description": "Expert peripheral nerve surgery including carpal tunnel release, ulnar nerve decompression, and nerve tumor removal in Hyderabad.",
    "url": "https://www.drsayuj.info/services/peripheral-nerve-surgery-hyderabad/",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Dr. Sayuj Krishnan - Peripheral Nerve Surgery",
      "description": "Expert peripheral nerve surgery including carpal tunnel release, ulnar nerve decompression, peroneal nerve surgery, and nerve tumor removal.",
      "medicalSpecialty": "Neurosurgery",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Peripheral Nerve Surgery Services",
        "itemListElement": procedures.map(procedure => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": procedure.name,
            "description": procedure.description,
            "bodyLocation": "Peripheral Nerves",
            "procedureType": "Surgical"
          }
        }))
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yashoda Hospital, Malakpet",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500036",
        "addressCountry": "IN"
      },
      "telephone": "+91-9778280044",
      "email": "hellodr@drsayuj.info",
      "url": "https://www.drsayuj.info"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.drsayuj.info/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.drsayuj.info/services/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Peripheral Nerve Surgery",
          "item": "https://www.drsayuj.info/services/peripheral-nerve-surgery-hyderabad/"
        }
      ]
    },
    "about": [
      {
        "@type": "MedicalCondition",
        "name": "Carpal Tunnel Syndrome",
        "signOrSymptom": ["Numbness in fingers", "Hand weakness", "Night pain"],
        "cause": ["Repetitive movements", "Diabetes", "Arthritis"]
      },
      {
        "@type": "MedicalCondition",
        "name": "Cubital Tunnel Syndrome",
        "signOrSymptom": ["Elbow pain", "Finger numbness", "Hand weakness"],
        "cause": ["Elbow trauma", "Repetitive bending", "Arthritis"]
      }
    ],
    "mentions": procedures.map(procedure => ({
      "@type": "MedicalProcedure",
      "name": procedure.name
    }))
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Peripheral Nerve Surgery Hyderabad', path: '/services/peripheral-nerve-surgery-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/peripheral-nerve-surgery-hyderabad`} />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Peripheral Nerve Surgery in Hyderabad
          </h1>
          <AuthorByline
            publishedOn="2025-09-03"
            updatedOn="2025-10-19"
            className="justify-center mb-6"
          />
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Expert peripheral nerve surgery for carpal tunnel syndrome, ulnar nerve compression, 
            peroneal neuropathy, nerve tumors, and traumatic nerve injuries. Advanced microsurgical 
            techniques for optimal outcomes.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-blue-800 font-semibold">
              "Peripheral nerve surgery requires precision and expertise. Our microsurgical approach 
              ensures the best possible outcomes for nerve decompression and repair."
            </p>
            <p className="text-blue-600 mt-2">— Dr. Sayuj Krishnan</p>
          </div>
        </section>

        {/* What is Peripheral Nerve Surgery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Peripheral Nerve Surgery?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Peripheral nerve surgery involves the surgical treatment of nerves outside the brain and spinal cord. 
              These nerves control movement and sensation in the arms, legs, hands, and feet. Common conditions 
              requiring peripheral nerve surgery include compression syndromes, nerve tumors, and traumatic injuries.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in microsurgical techniques for peripheral nerve disorders, 
              offering both open and minimally invasive approaches to achieve optimal outcomes with minimal 
              post-operative discomfort and faster recovery.
            </p>
          </div>
        </section>

        {/* Conditions We Treat */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Conditions We Treat</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {conditions.map((condition, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{condition.name}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Symptoms:</h4>
                  <ul className="space-y-1">
                    {condition.symptoms.map((symptom, symptomIndex) => (
                      <li key={symptomIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Common Causes:</h4>
                  <ul className="space-y-1">
                    {condition.causes.map((cause, causeIndex) => (
                      <li key={causeIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Procedures */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Surgical Procedures</h2>
          <div className="space-y-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{procedure.name}</h3>
                    <p className="text-gray-700 mb-4">{procedure.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Surgical Techniques:</h4>
                      <ul className="space-y-1">
                        {procedure.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Indications:</h4>
                      <ul className="space-y-1">
                        {procedure.indications.map((indication, indIndex) => (
                          <li key={indIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                            {indication}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm font-semibold text-blue-800">Recovery Time</p>
                        <p className="text-blue-600 font-medium">{procedure.recovery}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm font-semibold text-green-800">Success Rate</p>
                        <p className="text-green-600 font-medium">{procedure.successRate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Who Benefits from Peripheral Nerve Surgery?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Good Candidates</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Failed conservative treatment (splinting, therapy, injections)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Severe symptoms affecting daily activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">EMG/NCS confirming nerve compression</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Muscle wasting or weakness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Nerve tumors requiring removal</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-orange-700 mb-4">Conservative Treatment First</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Mild symptoms with recent onset</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Pregnancy-related carpal tunnel (often resolves)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Diabetes-related neuropathy (medical management)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Mild EMG changes without symptoms</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Risks and Mitigation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Risks and How We Mitigate Them</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-4">Potential Risks</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Infection (rare with proper technique)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Nerve injury during surgery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Incomplete symptom relief</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Recurrence of compression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Scar tissue formation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Our Safety Measures</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Microsurgical techniques for precision</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Intraoperative nerve monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Careful tourniquet time management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Strict sterile technique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Thorough pre-operative planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery Timeline by Procedure</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Carpal Tunnel Release</h3>
                <p className="text-sm text-gray-600 mb-2">Return to desk work: 1-2 weeks</p>
                <p className="text-sm text-gray-600">Full activities: 2-4 weeks</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🦴</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Ulnar Nerve Decompression</h3>
                <p className="text-sm text-gray-600 mb-2">Return to desk work: 2-3 weeks</p>
                <p className="text-sm text-gray-600">Full activities: 4-6 weeks</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🦵</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Peroneal Nerve Surgery</h3>
                <p className="text-sm text-gray-600 mb-2">Return to desk work: 3-4 weeks</p>
                <p className="text-sm text-gray-600">Full activities: 6-8 weeks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Costs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Costs in Hyderabad</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Typical Cost Ranges</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Carpal Tunnel Release</span>
                    <span className="font-semibold text-blue-600">₹45,000 - ₹75,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Ulnar Nerve Decompression</span>
                    <span className="font-semibold text-blue-600">₹55,000 - ₹85,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Peroneal Nerve Surgery</span>
                    <span className="font-semibold text-blue-600">₹60,000 - ₹90,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Nerve Tumor Removal</span>
                    <span className="font-semibold text-blue-600">₹70,000 - ₹1,20,000</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Insurance & Payment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Most insurance plans cover peripheral nerve surgery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Cashless treatment available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Flexible payment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Pre-authorization assistance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Dr. Sayuj */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj for Peripheral Nerve Surgery?</h2>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Microsurgical Expertise</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Advanced microsurgical training from Germany</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Precision techniques for nerve preservation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Minimally invasive approaches when possible</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Outcome Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">95% success rate for carpal tunnel release</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">90% success rate for ulnar nerve decompression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Minimal complications and faster recovery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Patient Success Story */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Success Story</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              <Link href="/stories/mvd-trigeminal-neuralgia-hyderabad" className="hover:text-blue-600">
                MVD for Trigeminal Neuralgia — Case Story (Hyderabad)
              </Link>
            </h3>
            <p className="text-gray-700 mb-4">
              Read about a de-identified patient who experienced severe facial pain and was successfully treated with 
              microvascular decompression (MVD), achieving lasting pain relief and improved quality of life.
            </p>
            <Link 
              href="/stories/mvd-trigeminal-neuralgia-hyderabad"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Read the full story →
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Schedule Your Peripheral Nerve Consultation</h2>
          <p className="text-xl mb-6 opacity-90">
            Nerve conduction studies and MRI reviewed • Expert microsurgical treatment available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Consultation
            </Link>
            <a 
              href="https://wa.me/919778280044?text=Hi%20Dr.%20Sayuj,%20I%20have%20questions%20about%20peripheral%20nerve%20surgery."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              WhatsApp Quick Questions
            </a>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />

        <section className="mb-12 space-y-6">
          <ReviewedBy lastReviewed="2025-10-19" />
          <NAP />
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
