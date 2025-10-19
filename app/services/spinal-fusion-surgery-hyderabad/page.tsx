import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';

const baseMetadata = makeMetadata({
  title: 'Spinal Fusion Surgery in Hyderabad | TLIF, PLIF, ALIF, ACDF',
  description: 'Fusion options for instability, spondylolisthesis, and deformity with Dr. Sayuj Krishnan in Hyderabad.',
  canonicalPath: '/services/spinal-fusion-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'spinal fusion hyderabad',
    'TLIF hyderabad',
    'PLIF hyderabad',
    'ALIF hyderabad',
    'ACDF hyderabad',
    'cervical fusion hyderabad',
    'lumbar fusion cost hyderabad',
    'spine fusion surgeon hyderabad',
  ],
  openGraph: {
    title: 'Spinal Fusion Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert spinal fusion surgery including TLIF, PLIF, ALIF, and ACDF procedures for spinal instability and deformity in Hyderabad.',
    url: `${SITE_URL}/services/spinal-fusion-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Spinal%20Fusion%20Surgery%20in%20Hyderabad&subtitle=Expert%20TLIF%2C%20PLIF%2C%20ALIF%2C%20ACDF%20Procedures`,
        width: 1200,
        height: 630,
        alt: 'Spinal Fusion Surgery in Hyderabad - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const ARTICLE_SOURCES = getServiceSources('spinal-fusion-surgery-hyderabad');

const fusionTechniques = [
  {
    name: 'TLIF (Transforaminal Lumbar Interbody Fusion)',
    description: 'Posterior approach with cage placement through the foramen',
    approach: 'Posterior',
    advantages: ['Less muscle damage', 'Better nerve visualization', 'Reduced blood loss'],
    indications: ['Lumbar instability', 'Spondylolisthesis', 'Recurrent disc herniation'],
    recovery: '6-12 weeks',
    successRate: '85-90%'
  },
  {
    name: 'PLIF (Posterior Lumbar Interbody Fusion)',
    description: 'Traditional posterior approach with bilateral cage placement',
    approach: 'Posterior',
    advantages: ['Proven technique', 'Good fusion rates', 'Familiar approach'],
    indications: ['Severe disc degeneration', 'Spinal stenosis', 'Deformity correction'],
    recovery: '8-12 weeks',
    successRate: '80-85%'
  },
  {
    name: 'ALIF (Anterior Lumbar Interbody Fusion)',
    description: 'Anterior approach through the abdomen for cage placement',
    approach: 'Anterior',
    advantages: ['No muscle cutting', 'Large cage placement', 'Better lordosis restoration'],
    indications: ['L5-S1 fusion', 'Deformity correction', 'Failed posterior fusion'],
    recovery: '6-10 weeks',
    successRate: '90-95%'
  },
  {
    name: 'ACDF (Anterior Cervical Discectomy and Fusion)',
    description: 'Anterior approach for cervical disc removal and fusion',
    approach: 'Anterior Cervical',
    advantages: ['Direct disc access', 'No muscle cutting', 'Excellent outcomes'],
    indications: ['Cervical disc herniation', 'Cervical stenosis', 'Cervical instability'],
    recovery: '4-8 weeks',
    successRate: '90-95%'
  }
];

const indications = [
  {
    condition: 'Spinal Instability',
    description: 'Abnormal movement between vertebrae causing pain and nerve compression',
    symptoms: ['Mechanical back pain', 'Pain with movement', 'Muscle spasms', 'Nerve symptoms'],
    fusionBenefit: 'Stabilizes the spine and eliminates painful motion'
  },
  {
    condition: 'Spondylolisthesis',
    description: 'Slippage of one vertebra over another',
    symptoms: ['Lower back pain', 'Leg pain', 'Difficulty walking', 'Muscle weakness'],
    fusionBenefit: 'Prevents further slippage and stabilizes the spine'
  },
  {
    condition: 'Recurrent Disc Herniation',
    description: 'Multiple episodes of disc herniation at the same level',
    symptoms: ['Recurrent leg pain', 'Failed previous surgery', 'Persistent symptoms'],
    fusionBenefit: 'Eliminates the disc space to prevent future herniations'
  },
  {
    condition: 'Spinal Deformity',
    description: 'Abnormal curvature or alignment of the spine',
    symptoms: ['Progressive deformity', 'Pain', 'Neurological symptoms', 'Cosmetic concerns'],
    fusionBenefit: 'Corrects deformity and prevents progression'
  }
];

const alternatives = [
  {
    name: 'Endoscopic Decompression',
    description: 'Minimally invasive nerve decompression without fusion',
    advantages: ['Preserves motion', 'Faster recovery', 'Less invasive'],
    limitations: ['Not suitable for instability', 'May not address deformity'],
    whenToChoose: 'Stable spine with isolated nerve compression'
  },
  {
    name: 'Artificial Disc Replacement',
    description: 'Replaces damaged disc with artificial device',
    advantages: ['Preserves motion', 'Prevents adjacent segment disease'],
    limitations: ['Limited availability', 'Specific indications', 'Higher cost'],
    whenToChoose: 'Single level disease with preserved motion'
  },
  {
    name: 'Dynamic Stabilization',
    description: 'Flexible stabilization system that allows some motion',
    advantages: ['Preserves some motion', 'Less rigid than fusion'],
    limitations: ['Limited long-term data', 'Specific indications'],
    whenToChoose: 'Selected cases of mild instability'
  }
];

const faqs = [
  {
    question: 'When should I consider fusion instead of decompression?',
    answer: 'Fusion is considered when there is spinal instability, spondylolisthesis, recurrent disc herniation, or spinal deformity. If the spine is stable and only nerve compression is present, decompression alone may be sufficient. Dr. Sayuj follows a "motion-preserving first" approach, recommending fusion only when necessary.'
  },
  {
    question: 'How long does bone fusion take?',
    answer: 'Bone fusion typically takes 3-6 months to become solid, though this varies by individual. Factors affecting fusion time include patient age, smoking status, bone quality, and the specific fusion technique used. X-rays and CT scans are used to monitor fusion progress.'
  },
  {
    question: 'Will I lose motion after spinal fusion?',
    answer: 'Yes, fusion eliminates motion at the fused levels. However, the impact on overall spinal function depends on the number of levels fused and their location. Single-level fusions typically have minimal impact on daily activities, while multi-level fusions may result in more noticeable motion restriction.'
  },
  {
    question: 'What about adjacent segment disease?',
    answer: 'Adjacent segment disease refers to degeneration at levels above or below a fusion. While this can occur, the risk is relatively low (5-15% over 10 years). Dr. Sayuj uses techniques to minimize this risk, including preserving natural spinal alignment and using appropriate fusion techniques.'
  },
  {
    question: 'Is disc replacement an option for me?',
    answer: 'Disc replacement may be an option for single-level cervical or lumbar disc disease in patients with preserved motion and no significant instability. Dr. Sayuj will evaluate your specific condition to determine if disc replacement is appropriate for your case.'
  },
  {
    question: 'What is the hospital stay and return-to-work timeline?',
    answer: 'Hospital stay is typically 3-5 days for lumbar fusion and 1-2 days for cervical fusion. Return to desk work is usually possible within 4-6 weeks, while return to manual labor may take 3-6 months. Recovery time varies based on the specific procedure and individual factors.'
  },
  {
    question: 'Will insurance cover spinal fusion implants?',
    answer: 'Most insurance plans cover spinal fusion surgery including implants when medically necessary. We work with all major insurance providers and TPAs to ensure coverage. Our team will help verify your benefits and handle pre-authorization if required.'
  },
  {
    question: 'What are the risks of spinal fusion surgery?',
    answer: 'Potential risks include infection, bleeding, nerve injury, implant failure, non-union (failure to fuse), and adjacent segment disease. Dr. Sayuj uses advanced techniques including neuromonitoring, careful patient selection, and optimal surgical planning to minimize these risks.'
  }
];

export default function SpinalFusionSurgeryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Spinal Fusion Surgery in Hyderabad",
    "description": "Expert spinal fusion surgery including TLIF, PLIF, ALIF, and ACDF procedures for spinal instability and deformity in Hyderabad.",
    "url": "https://www.drsayuj.info/services/spinal-fusion-surgery-hyderabad/",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Dr. Sayuj Krishnan - Spinal Fusion Surgery",
      "description": "Expert spinal fusion surgery including TLIF, PLIF, ALIF, and ACDF procedures for spinal instability, spondylolisthesis, and deformity.",
      "medicalSpecialty": "Neurosurgery",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Spinal Fusion Surgery Services",
        "itemListElement": fusionTechniques.map(technique => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": technique.name,
            "description": technique.description,
            "bodyLocation": "Spine",
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
      "email": "neurospinehyd@drsayuj.com",
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
          "name": "Spinal Fusion Surgery",
          "item": "https://www.drsayuj.info/services/spinal-fusion-surgery-hyderabad/"
        }
      ]
    },
    "about": [
      {
        "@type": "MedicalCondition",
        "name": "Spinal Instability",
        "signOrSymptom": ["Mechanical back pain", "Pain with movement", "Muscle spasms"],
        "cause": ["Degenerative changes", "Trauma", "Previous surgery"]
      },
      {
        "@type": "MedicalCondition",
        "name": "Spondylolisthesis",
        "signOrSymptom": ["Lower back pain", "Leg pain", "Difficulty walking"],
        "cause": ["Degenerative changes", "Congenital defects", "Trauma"]
      }
    ],
    "mentions": fusionTechniques.map(technique => ({
      "@type": "MedicalProcedure",
      "name": technique.name
    }))
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Spinal Fusion Surgery in Hyderabad
          </h1>
          <AuthorByline
            publishedOn="2025-09-09"
            updatedOn="2025-10-19"
            className="justify-center mb-6"
          />
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Expert spinal fusion surgery for spinal instability, spondylolisthesis, recurrent disc herniation, 
            and spinal deformity. Advanced techniques including TLIF, PLIF, ALIF, and ACDF procedures.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-blue-800 font-semibold">
              "We follow a motion-preserving first approach. Fusion is recommended only when necessary 
              for spinal stability and optimal patient outcomes."
            </p>
            <p className="text-blue-600 mt-2">— Dr. Sayuj Krishnan</p>
          </div>
        </section>

        {/* What is Spinal Fusion */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Spinal Fusion Surgery?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Spinal fusion is a surgical procedure that permanently connects two or more vertebrae 
              to eliminate motion between them. This is achieved by placing bone graft material between 
              the vertebrae and using metal hardware (screws, rods, cages) to hold them together until 
              the bone heals and fuses.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in advanced fusion techniques, using a "motion-preserving 
              first" approach. Fusion is recommended only when necessary for spinal stability, while 
              preferring minimally invasive decompression when appropriate.
            </p>
          </div>
        </section>

        {/* Indications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">When is Spinal Fusion Recommended?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {indications.map((indication, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{indication.condition}</h3>
                <p className="text-gray-700 mb-4">{indication.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Symptoms:</h4>
                  <ul className="space-y-1">
                    {indication.symptoms.map((symptom, symptomIndex) => (
                      <li key={symptomIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm font-semibold text-green-800">Fusion Benefit:</p>
                  <p className="text-sm text-green-700">{indication.fusionBenefit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fusion Techniques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Spinal Fusion Techniques</h2>
          <div className="space-y-8">
            {fusionTechniques.map((technique, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{technique.name}</h3>
                    <p className="text-gray-700 mb-4">{technique.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Advantages:</h4>
                      <ul className="space-y-1">
                        {technique.advantages.map((advantage, advIndex) => (
                          <li key={advIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Indications:</h4>
                      <ul className="space-y-1">
                        {technique.indications.map((indication, indIndex) => (
                          <li key={indIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {indication}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm font-semibold text-blue-800">Recovery Time</p>
                        <p className="text-blue-600 font-medium">{technique.recovery}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm font-semibold text-green-800">Success Rate</p>
                        <p className="text-green-600 font-medium">{technique.successRate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fusion vs Alternatives */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Fusion vs Motion-Preserving Alternatives</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Decision Tree</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  <strong>Step 1:</strong> Is there spinal instability, spondylolisthesis, or deformity? 
                  If YES → Consider fusion
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Step 2:</strong> Is the spine stable with only nerve compression? 
                  If YES → Consider endoscopic decompression first
                </p>
                <p className="text-gray-700">
                  <strong>Step 3:</strong> Single level disease with preserved motion? 
                  If YES → Consider disc replacement
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {alternatives.map((alternative, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">{alternative.name}</h3>
                  <p className="text-gray-700 mb-4 text-sm">{alternative.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Advantages:</h4>
                    <ul className="space-y-1">
                      {alternative.advantages.map((advantage, advIndex) => (
                        <li key={advIndex} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Limitations:</h4>
                    <ul className="space-y-1">
                      {alternative.limitations.map((limitation, limIndex) => (
                        <li key={limIndex} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-800">When to Choose:</p>
                    <p className="text-xs text-blue-700">{alternative.whenToChoose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Imaging and Planning */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Imaging and Surgical Planning</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Pre-operative Imaging</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">MRI for soft tissue and nerve assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">CT scan for bone anatomy and planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">X-rays for alignment and motion assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">DEXA scan for bone quality assessment (if needed)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Surgical Planning</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">3D reconstruction for optimal approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Implant sizing and positioning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Risk assessment and mitigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Patient-specific approach selection</span>
                  </li>
                </ul>
              </div>
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
                    <span className="text-gray-700">Nerve injury or damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Blood loss (minimized with techniques)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Non-union (failure to fuse)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Adjacent segment disease</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Our Safety Measures</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Intraoperative neuromonitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Careful blood loss control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Strict infection prevention protocols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Optimal bone graft techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Careful patient selection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery Timeline</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Return to Work</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Desk Work</span>
                    <span className="font-semibold text-blue-600">4-6 weeks</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Light Manual Work</span>
                    <span className="font-semibold text-blue-600">8-12 weeks</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Heavy Manual Work</span>
                    <span className="font-semibold text-blue-600">3-6 months</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Activity Restrictions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">No heavy lifting for 6-12 weeks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Bracing may be required for 6-12 weeks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Gradual return to activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Physical therapy for 3-6 months</span>
                  </li>
                </ul>
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
                    <span className="text-gray-700">TLIF (1 level)</span>
                    <span className="font-semibold text-blue-600">₹2,50,000 - ₹4,00,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">PLIF (1 level)</span>
                    <span className="font-semibold text-blue-600">₹2,00,000 - ₹3,50,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">ALIF (1 level)</span>
                    <span className="font-semibold text-blue-600">₹2,50,000 - ₹4,50,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">ACDF (1 level)</span>
                    <span className="font-semibold text-blue-600">₹1,50,000 - ₹2,50,000</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Insurance & Payment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Most insurance plans cover spinal fusion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Cashless treatment available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Implant coverage included</span>
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
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj for Spinal Fusion?</h2>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">MISS-First Approach</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Minimally invasive techniques when possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Fusion only when medically indicated</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Motion-preserving alternatives considered first</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Expertise & Outcomes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Advanced training in spinal fusion techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">High fusion success rates (85-95%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Comprehensive pre and post-operative care</span>
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

        {/* CTA Section */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Discuss Spinal Fusion Options</h2>
          <p className="text-xl mb-6 opacity-90">
            Minimally invasive options first—fusion only when needed • Expert evaluation and personalized treatment plan
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
              Learn About MISS Options
            </Link>
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
