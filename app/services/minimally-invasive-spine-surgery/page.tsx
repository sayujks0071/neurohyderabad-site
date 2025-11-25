import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
import { patientStories } from '../../../src/content/stories';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import JsonLd from '@/components/JsonLd';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const baseMetadata = makeMetadata({
  title: 'Endoscopic Spine Surgery Hyderabad | Dr. Sayuj Krishnan',
  description: 'Expert endoscopic spine surgery in Hyderabad with Dr. Sayuj Krishnan. Minimally invasive procedures with same-day discharge at Yashoda Hospital Malakpet.',
  canonicalPath: '/services/minimally-invasive-spine-surgery',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/minimally-invasive-spine-surgery`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Minimally%20Invasive%20Spine%20Surgery&subtitle=Endoscopic%20Procedures%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Minimally Invasive Spine Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Minimally%20Invasive%20Spine%20Surgery&subtitle=Endoscopic%20Procedures%20in%20Hyderabad`],
  },
};

const spineStoryHighlights = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('endoscopic'))
  .slice(0, 2);

const ARTICLE_SOURCES = getServiceSources('minimally-invasive-spine-surgery');

// Google Business Profile JSON-LD for Minimally Invasive Spine Surgery
const gbpSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Minimally Invasive Spine Surgery | Dr. Sayuj Krishnan",
  "url": "https://www.drsayuj.info/services/minimally-invasive-spine-surgery/?utm_source=google&utm_medium=organic&utm_campaign=gbp_minimally_invasive_spine_surgery",
  "image": "https://www.drsayuj.info/images/og-default.jpg",
  "description": "Minimally invasive spine surgery for lumbar and cervical conditions by Dr. Sayuj Krishnan. Less blood loss, faster recovery, and shorter hospital stay at Yashoda Hospital, Hyderabad.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.drsayuj.info/services/minimally-invasive-spine-surgery/"
  },
  "medicalSpecialty": "Minimally Invasive Spine Surgery",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Hyderabad, Telangana, India"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Room No. 317, OPD Block, Yashoda Hospital, Malakpet",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500036",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 10:00-17:00",
  "telephone": "+91-97782-80044",
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.instagram.com/drsayujneurohyd",
    "https://www.linkedin.com/in/drsayujkrishnan",
    "https://www.youtube.com/@drsayujneurohyd"
  ]
};

export default function MinimallyInvasiveSpineSurgeryPage() {
  const procedures = [
    {
      title: 'Endoscopic Discectomy',
      description: 'Removal of herniated disc material through a small incision using endoscopic visualization.',
      benefits: ['Smaller incision', 'Less muscle damage', 'Faster recovery', 'Reduced pain'],
      recovery: '1-2 weeks'
    },
    {
      title: 'Endoscopic Foraminotomy',
      description: 'Decompression of nerve roots through enlarged foraminal openings using endoscopic techniques.',
      benefits: ['Nerve decompression', 'Minimal tissue disruption', 'Quick return to activity', 'Lower infection risk'],
      recovery: '2-3 weeks'
    },
    {
      title: 'Endoscopic ULBD',
      description: 'Unilateral laminotomy bilateral decompression for spinal stenosis using endoscopic approach.',
      benefits: ['Bilateral decompression', 'Preserved stability', 'Reduced blood loss', 'Shorter hospital stay'],
      recovery: '2-4 weeks'
    },
    {
      title: 'Cervical Procedures',
      description: 'Endoscopic cervical discectomy and foraminotomy for neck and arm pain relief.',
      benefits: ['Anterior approach', 'Preserved motion', 'Minimal scarring', 'Quick mobilization'],
      recovery: '1-2 weeks'
    }
  ];

  const faqs = [
    {
      question: 'What is Minimally Invasive Spine Surgery?',
      answer:
        'Minimally invasive spine surgery (MISS) uses smaller incisions and endoscopic or microscopic instruments to reach the spine while gently moving muscles instead of cutting them. This approach reduces tissue trauma, pain, and blood loss compared to traditional open surgery.'
    },
    {
      question: 'What conditions can be treated with Minimally Invasive Spine Surgery?',
      answer:
        'MISS is recommended when conservative treatments no longer control symptoms from conditions such as herniated discs, spinal stenosis, foraminal stenosis, spinal deformities like scoliosis, and spondylolisthesis. The specific technique is chosen based on the level and nature of the pathology.'
    },
    {
      question: 'What are the core patient benefits of choosing Minimally Invasive Spine Surgery?',
      answer:
        'Patients typically experience less postoperative pain, reduced blood loss, minimal scarring, and faster recovery because the muscles and supporting tissues are preserved. Many MISS procedures allow a shorter hospital stay and an earlier return to normal activity.'
    },
    {
      question: 'How long does endoscopic spine surgery take?',
      answer:
        'Most endoscopic spine procedures take 1-3 hours depending on the complexity. Endoscopic discectomy typically takes 60-90 minutes, while more complex procedures like endoscopic ULBD may take 2-3 hours. The shorter operative time contributes to faster recovery.'
    },
    {
      question: 'What is the success rate of minimally invasive spine surgery?',
      answer:
        'Endoscopic spine surgery has success rates of 85-95% for appropriate candidates. Success depends on proper patient selection, accurate diagnosis, and surgeon experience. Dr. Sayuj Krishnan has performed over 500 endoscopic procedures with excellent outcomes.'
    },
    {
      question: 'When can I return to work after endoscopic spine surgery?',
      answer:
        'Most patients can return to desk work within 1-2 weeks after endoscopic spine surgery. Manual labor may require 4-6 weeks. Recovery time varies based on the specific procedure, your overall health, and the physical demands of your job.'
    },
    {
      question: 'Is endoscopic spine surgery covered by insurance?',
      answer:
        'Yes, endoscopic spine surgery is typically covered by most insurance plans when medically necessary. We provide detailed medical estimates and work with insurance companies for pre-authorization. Cashless insurance approvals are available at Yashoda Hospital.'
    },
    {
      question: 'What are the risks of minimally invasive spine surgery?',
      answer:
        'Endoscopic spine surgery has lower risks compared to open surgery, including reduced infection risk, less blood loss, and minimal muscle damage. Potential risks include nerve injury, bleeding, or infection, but these are significantly lower than traditional open procedures.'
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={gbpSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Services', url: `${SITE_URL}/services` },
          { name: 'Minimally Invasive Spine Surgery', url: `${SITE_URL}/services/minimally-invasive-spine-surgery` },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/minimally-invasive-spine-surgery`} />
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Minimally Invasive Spine Surgery</h1>
          <AuthorByline
            publishedOn="2025-09-10"
            updatedOn="2025-10-19"
            className="justify-center mb-4"
          />
          <p className="text-lg text-gray-600">Advanced endoscopic techniques for faster recovery and better outcomes</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Minimally Invasive Spine Surgery?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Minimally invasive spine surgery (MISS) uses advanced endoscopic techniques to treat spine conditions through smaller incisions, 
              resulting in less muscle damage, reduced pain, and faster recovery compared to traditional open surgery.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in endoscopic spine procedures, offering patients the benefits of modern surgical techniques 
              with reduced trauma and quicker return to daily activities. <Link href="/services/endoscopic-spine-surgery-hyderabad/" className="text-blue-600 hover:underline">Learn more about our local patient journey for endoscopic spine surgery in Hyderabad.</Link>
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Procedures We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{procedure.title}</h3>
                <p className="text-gray-600 mb-4">{procedure.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {procedure.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm text-blue-600 font-medium">
                  Typical Recovery: {procedure.recovery}
                </div>
              </div>
            ))}
          </div>
        </section>

        <OutcomeMetricsSection procedure="Minimally Invasive Spine Surgery" />

        {/* Patient Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Patient Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {spineStoryHighlights.map((story) => (
              <article key={story.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {story.patientInitials.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-800">{story.patientInitials}</div>
                    <div className="text-sm text-gray-600">{story.procedure}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">“{story.quote}”</p>
                <div className="mt-3 text-sm text-gray-600">
                  <strong>Condition:</strong> {story.condition}
                  {story.recoveryTime ? (
                    <>
                      {" "}• <strong>Recovery:</strong> {story.recoveryTime}
                    </>
                  ) : null}
                </div>
                <Link
                  href={`/patient-stories/${story.slug}`}
                  className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  Read full story
                  <span aria-hidden className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">When is MISS Recommended?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Suitable Conditions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Herniated discs (lumbar/cervical)</li>
                <li>• Spinal stenosis</li>
                <li>• Foraminal stenosis</li>
                <li>• Nerve root compression</li>
                <li>• Failed conservative treatment</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Patient Selection</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• MRI-confirmed pathology</li>
                <li>• Symptoms match imaging findings</li>
                <li>• Failed 6+ weeks conservative care</li>
                <li>• No significant instability</li>
                <li>• Realistic expectations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <TeleconsultationForm pageSlug="/services/minimally-invasive-spine-surgery" service="Minimally Invasive Spine Surgery" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <article key={faq.question} className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery and Return to Activity</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 1-2</h3>
                <p className="text-sm text-gray-600">Light walking, wound care, pain management</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 2-4</h3>
                <p className="text-sm text-gray-600">Gradual activity increase, return to desk work</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 4-8</h3>
                <p className="text-sm text-gray-600">Full activity, physical therapy if needed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is endoscopic surgery always better than open surgery?</h3>
              <p className="text-gray-700">Not always. We choose the approach that safely achieves the best outcome for your specific condition. Each case is evaluated individually.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long is the hospital stay?</h3>
              <p className="text-gray-700">Most endoscopic procedures are day-care or require only 1-2 nights in the hospital, compared to 3-5 nights for traditional surgery.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">When can I return to work?</h3>
              <p className="text-gray-700">Desk work can often resume within 1-2 weeks, while manual labor may require 4-6 weeks depending on the procedure and your recovery.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Related Conditions & Symptoms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Conditions We Treat</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Cervical Radiculopathy Treatment
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Neck and arm pain from nerve compression</span>
                </li>
                <li>
                  <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Trigeminal Neuralgia Treatment
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Severe facial pain management</span>
                </li>
                <li>
                  <Link href="/conditions/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Brain Tumor Surgery
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Advanced brain tumor treatment</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Common Symptoms</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/symptoms/signs-of-brain-tumor" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Signs of Brain Tumor
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Early warning signs to watch for</span>
                </li>
                <li>
                  <Link href="/symptoms/pain-on-top-of-head-causes" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Head Pain Causes
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Understanding different types of head pain</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                <Link href="/stories/endoscopic-discectomy-same-day-hyderabad" className="hover:text-blue-600">
                  Same-Day Endoscopic Discectomy
                </Link>
              </h3>
              <p className="text-gray-700 mb-4">
                Read about a patient who achieved same-day discharge after endoscopic discectomy for severe sciatica.
              </p>
              <Link 
                href="/stories/endoscopic-discectomy-same-day-hyderabad"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Read story →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                <Link href="/stories/endoscopic-ulbd-stenosis-hyderabad" className="hover:text-blue-600">
                  Endoscopic ULBD for Lumbar Stenosis
                </Link>
              </h3>
              <p className="text-gray-700 mb-4">
                Learn how endoscopic ULBD improved walking distance and leg pain for a patient with spinal stenosis.
              </p>
              <Link 
                href="/stories/endoscopic-ulbd-stenosis-hyderabad"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Read story →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Your Treatment Options?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for spine conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/about/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              About Dr Sayuj
            </Link>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2025-10-19" />
          <NAP />
        </section>
      </div>
    </div>
    </>
  );
}
