import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import RemotionVideoEmbedWrapper from '../_components/RemotionVideoEmbedWrapper';

export const metadata: Metadata = {
  title: 'Neurosurgical Services in Hyderabad | Dr. Sayuj Krishnan',
  description: 'Expert neurosurgical services including endoscopic spine surgery, brain tumor surgery, epilepsy surgery, and trigeminal neuralgia treatment in Hyderabad.',
  keywords: [
    'neurosurgical services hyderabad',
    'spine surgery hyderabad',
    'brain surgery hyderabad',
    'endoscopic spine surgery',
    'minimally invasive spine surgery',
    'brain tumor surgery hyderabad',
    'epilepsy surgery hyderabad',
    'trigeminal neuralgia treatment',
    'neurosurgeon services',
    'spine specialist services',
    'awake brain surgery',
    'ROSA DBS hyderabad'
  ],
  alternates: {
    canonical: `${SITE_URL}/services/`,
    languages: {
      'en-IN': `${SITE_URL}/services/`,
      'x-default': `${SITE_URL}/services/`
    }
  },
  openGraph: {
    title: 'Neurosurgical Services in Hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert neurosurgical services including endoscopic spine surgery, brain tumor surgery, epilepsy surgery, and trigeminal neuralgia treatment in Hyderabad.',
    url: `${SITE_URL}/services/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Neurosurgical Services - Dr. Sayuj Krishnan',
        type: 'image/jpeg'
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neurosurgical Services in Hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert neurosurgical services including endoscopic spine surgery, brain tumor surgery, epilepsy surgery, and trigeminal neuralgia treatment in Hyderabad.',
    images: [`${SITE_URL}/images/og-default.jpg`],
    site: '@drsayuj',
    creator: '@drsayuj'
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Brain Tumor Surgery',
      description: 'Advanced neuronavigation-guided microsurgery with neuromonitoring for safe tumor removal.',
      href: '/services/brain-tumor-surgery-hyderabad/',
      features: ['Neuronavigation', 'Neuromonitoring', 'Awake craniotomy', 'Multidisciplinary care']
    },
    {
      title: 'Endoscopic Spine Surgery (Day-Care MISS)',
      description: 'Full endoscopic discectomy and decompression with same-day discharge protocols in Hyderabad.',
      href: '/services/endoscopic-spine-surgery-hyderabad/',
      features: ['Transforaminal discectomy', 'Interlaminar decompression', 'Cervical endoscopic procedures', 'Enhanced recovery']
    },
    {
      title: 'Awake Spine Surgery (Regional Anaesthesia)',
      description: 'Endoscopic decompression with spinal/epidural anaesthesia for high-risk or elderly patients to avoid general anaesthesia.',
      href: '/services/awake-spine-surgery-hyderabad/',
      features: ['Spinal or epidural blocks', 'Conscious sedation', 'Same-day discharge', 'Ideal for cardiac/pulmonary risk patients']
    },
    {
      title: 'Comprehensive Spine Surgery',
      description: 'Stabilisation, deformity correction, and complex revision spine surgery programmes.',
      href: '/services/spine-surgery-hyderabad/',
      features: ['MISS fusion', 'Deformity correction', 'Revision surgery', 'Navigation-guided fixation']
    },
    {
      title: 'Epilepsy Surgery',
      description: 'Comprehensive surgical treatment for drug-resistant epilepsy with advanced techniques.',
      href: '/services/epilepsy-surgery-hyderabad',
      features: ['LITT', 'Resection surgery', 'VNS', 'Comprehensive evaluation']
    },
    {
      title: 'Microvascular Decompression (MVD)',
      description: 'Microsurgical relief for trigeminal neuralgia and hemifacial spasm while preserving nerve function.',
      href: '/services/microvascular-decompression-hyderabad',
      features: ['Retrosigmoid keyhole', 'Neuromonitoring', 'Teflon interposition', 'Facial pain relief']
    },
    {
      title: 'Gamma Knife Radiosurgery',
      description: 'Stereotactic radiosurgery for brain tumours and trigeminal neuralgia with sub-millimetre precision.',
      href: '/services/gamma-knife-radiosurgery-hyderabad',
      features: ['Non-incisional', 'High-dose precision', 'Outpatient workflow', 'Rapid recovery']
    },
    {
      title: 'Cooled Radiofrequency Ablation',
      description: 'Advanced cooled RFA for long-lasting chronic pain relief in facet joints, sacroiliac joints, and trigeminal neuralgia.',
      href: '/services/cooled-radiofrequency-ablation-hyderabad',
      features: ['12-24 month pain relief', 'Larger lesion creation', 'Outpatient procedure', 'Higher success rates']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Neurosurgical Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert neurosurgical care in Hyderabad with advanced techniques and patient-centered approach
          </p>
        </header>

        <MedicalReviewNotice />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Our Specialized Neurosurgical Services</h2>
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Dr. Sayuj Krishnan offers comprehensive neurosurgical care in Hyderabad, specializing in minimally invasive techniques 
              that reduce recovery time and improve patient outcomes. Our services encompass both brain and spine conditions, 
              utilizing advanced technology and evidence-based approaches.
            </p>
            <p className="text-gray-700 mb-6">
              With over 9 years of experience and specialized training in endoscopic spine surgery, Dr. Sayuj provides 
              personalized treatment plans tailored to each patient's specific needs and condition severity.
            </p>
          </div>

          {/* Animated Service Showcase Video */}
          <div className="mb-12">
            <RemotionVideoEmbedWrapper
              compositionId="ServiceShowcase"
              title="Service Highlights"
              description="Watch an animated overview of our key neurosurgical services."
              controls
              loop
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-semibold text-blue-700 mb-3">{service.title}</h2>
                <p className="text-gray-700 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Key Features:</h3>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={service.href}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Related Conditions</h2>
          <p className="text-gray-700 mb-4">
            Explore detailed condition guides linked to each service so you can understand symptoms, diagnostics, and treatment pathways.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/conditions/brain-tumor-surgery-hyderabad" className="block rounded-lg border p-4 hover:border-blue-300">
              <h3 className="font-semibold text-blue-700">Brain Tumor Surgery</h3>
              <p className="text-sm text-gray-600">Safe resection with awake mapping and neuronavigation.</p>
            </Link>
            <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="block rounded-lg border p-4 hover:border-blue-300">
              <h3 className="font-semibold text-blue-700">Sciatica & Slip Disc</h3>
              <p className="text-sm text-gray-600">Endoscopic discectomy and MISS options for leg-dominant pain.</p>
            </Link>
            <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="block rounded-lg border p-4 hover:border-blue-300">
              <h3 className="font-semibold text-blue-700">Spinal Stenosis</h3>
              <p className="text-sm text-gray-600">ULBD/endoscopic decompression with stability preservation.</p>
            </Link>
            <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="block rounded-lg border p-4 hover:border-blue-300">
              <h3 className="font-semibold text-blue-700">Trigeminal Neuralgia</h3>
              <p className="text-sm text-gray-600">Microvascular decompression and radiosurgery options.</p>
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Detailed Service Overview</h2>
          
          <div className="space-y-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Endoscopic Spine Surgery</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Endoscopic Discectomy</h4>
                  <p className="text-gray-600 mb-4">
                    Minimally invasive removal of herniated disc material through a small 8-10mm incision. 
                    This procedure offers faster recovery, less pain, and reduced risk of complications compared to traditional open surgery.
                  </p>
                  <Link href="/services/endoscopic-discectomy-hyderabad/" className="text-blue-600 hover:underline">
                    Learn more about Endoscopic Discectomy →
                  </Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Endoscopic Foraminotomy</h4>
                  <p className="text-gray-600 mb-4">
                    Decompression of nerve roots through enlarged foraminal openings using endoscopic visualization. 
                    Ideal for patients with foraminal stenosis causing leg pain and weakness.
                  </p>
                  <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline">
                    Learn more about Foraminotomy →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Advanced Spine Procedures</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">ULBD (Lumbar Canal Stenosis)</h4>
                  <p className="text-gray-600 mb-4">
                    Unilateral laminotomy bilateral decompression for spinal stenosis using endoscopic approach. 
                    This technique provides bilateral decompression while preserving spinal stability and reducing tissue damage.
                  </p>
                  <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline">
                    Learn more about ULBD →
                  </Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Cervical Endoscopic Procedures</h4>
                  <p className="text-gray-600 mb-4">
                    Endoscopic cervical discectomy and foraminotomy for neck and arm pain relief. 
                    These procedures preserve motion while effectively treating cervical radiculopathy and myelopathy.
                  </p>
                  <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline">
                    Learn more about Cervical Procedures →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Brain Surgery Services</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Brain Tumor Surgery</h4>
                  <p className="text-gray-600 mb-4">
                    Advanced neuronavigation-guided microsurgery for brain tumors with comprehensive multidisciplinary care. 
                    <Link href="/services/brain-tumor-surgery-hyderabad/" className="text-blue-600 hover:underline"> Dr. Sayuj provides expert consultations for brain tumor surgery in Hyderabad at Yashoda Hospital, Malakpet.</Link>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Epilepsy Surgery</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive surgical treatment for drug-resistant epilepsy including LITT, resection surgery, 
                    and VNS. Our multidisciplinary approach ensures optimal outcomes for patients with uncontrolled seizures.
                  </p>
                  <Link href="/services/epilepsy-surgery-hyderabad" className="text-blue-600 hover:underline">
                    Learn more about Epilepsy Surgery →
                  </Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">MVD and Radiosurgery (TN)</h4>
                  <p className="text-gray-600 mb-4">
                    Advanced treatment for trigeminal neuralgia including microvascular decompression and Gamma Knife radiosurgery. 
                    These procedures offer long-lasting relief for severe facial pain conditions.
                  </p>
                  <Link href="/conditions/trigeminal-neuralgia-treatment" className="text-blue-600 hover:underline">
                    Learn more about Trigeminal Neuralgia Treatment →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Related Procedures and Conditions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Common Conditions We Treat</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 hover:underline">Sciatica and leg pain</Link></li>
                <li>• <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="text-blue-600 hover:underline">Spinal stenosis</Link></li>
                <li>• <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="text-blue-600 hover:underline">Cervical radiculopathy</Link></li>
                <li>• <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="text-blue-600 hover:underline">Trigeminal neuralgia</Link></li>
                <li>• Herniated discs and nerve compression</li>
                <li>• Drug-resistant epilepsy</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Why Choose Our Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Minimally invasive techniques</li>
                <li>• Faster recovery times</li>
                <li>• Advanced technology and equipment</li>
                <li>• Multidisciplinary approach</li>
                <li>• Personalized treatment plans</li>
                <li>• Comprehensive follow-up care</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What makes endoscopic surgery different from traditional surgery?</h3>
              <p className="text-gray-700">Endoscopic surgery uses small incisions (8-10mm) and specialized instruments to access and treat spine conditions. This results in less muscle damage, reduced pain, faster recovery, and lower risk of complications compared to traditional open surgery.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long is the recovery time for endoscopic procedures?</h3>
              <p className="text-gray-700">Recovery times vary by procedure, but most endoscopic spine surgeries allow patients to return to desk work within 1-2 weeks and full activities within 4-6 weeks. This is significantly faster than traditional open surgery.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Are all patients candidates for minimally invasive surgery?</h3>
              <p className="text-gray-700">Not all patients are suitable for endoscopic procedures. We evaluate each case individually based on MRI findings, symptoms, and overall health. Some complex cases may require traditional open surgery for optimal outcomes.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What should I expect during my consultation?</h3>
              <p className="text-gray-700">During your consultation, Dr. Sayuj will review your MRI scans, discuss your symptoms, explain treatment options, and develop a personalized treatment plan. Bring your imaging studies and a list of current medications.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center mb-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Your Treatment Options?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides personalized treatment plans based on your specific condition and needs.
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

        {/* Local Pathways */}
        <LocalPathways mode="service" />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "mainEntityOfPage": `${SITE_URL}/services/`,
            "name": "Neurosurgical Services in Hyderabad | Dr. Sayuj Krishnan",
            "description": "Expert neurosurgical services including endoscopic spine surgery, brain tumor surgery, epilepsy surgery, and trigeminal neuralgia treatment in Hyderabad.",
            "medicalSpecialty": "Neurosurgery",
            "about": [
              {
                "@type": "MedicalProcedure",
                "name": "Endoscopic Spine Surgery",
                "description": "Minimally invasive spine procedures using advanced endoscopic techniques"
              },
              {
                "@type": "MedicalProcedure", 
                "name": "Brain Tumor Surgery",
                "description": "Advanced neuronavigation-guided microsurgery with neuromonitoring"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Epilepsy Surgery", 
                "description": "Comprehensive surgical treatment for drug-resistant epilepsy"
              }
            ],
            "author": {
              "@id": `${SITE_URL}/#physician`
            },
            "publisher": {
              "@id": `${SITE_URL}/#organization`
            },
            "datePublished": "2023-01-01T00:00:00+05:30",
            "dateModified": new Date().toISOString(),
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": `${SITE_URL}/`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": `${SITE_URL}/services/`
                }
              ]
            },
            "potentialAction": {
              "@type": "SeekToAction",
              "target": `${SITE_URL}/appointments`,
              "queryInput": "required name=query"
            },
            "hasPart": [
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What makes endoscopic surgery different from traditional surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Endoscopic surgery uses small incisions (8-10mm) and specialized instruments to access and treat spine conditions. This results in less muscle damage, reduced pain, faster recovery, and lower risk of complications compared to traditional open surgery."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long is the recovery time for endoscopic procedures?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Recovery times vary by procedure, but most endoscopic spine surgeries allow patients to return to desk work within 1-2 weeks and full activities within 4-6 weeks. This is significantly faster than traditional open surgery."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are all patients candidates for minimally invasive surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Not all patients are suitable for endoscopic procedures. We evaluate each case individually based on MRI findings, symptoms, and overall health. Some complex cases may require traditional open surgery for optimal outcomes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I expect during my consultation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "During your consultation, Dr. Sayuj will review your MRI scans, discuss your symptoms, explain treatment options, and develop a personalized treatment plan. Bring your imaging studies and a list of current medications."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}
