import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import MedicalReviewNotice from '../../../src/components/MedicalReviewNotice';

export const metadata: Metadata = {
  title: 'Minimally Invasive Spine Surgery in Hyderabad | Endoscopic Procedures',
  description: 'Expert minimally invasive spine surgery including endoscopic discectomy, foraminotomy, and ULBD in Hyderabad. Faster recovery, less pain.',
  alternates: {
    canonical: `${SITE_URL}/services/minimally-invasive-spine-surgery/`,
    languages: {
      'en-IN': `${SITE_URL}/services/minimally-invasive-spine-surgery/`,
      'x-default': `${SITE_URL}/services/minimally-invasive-spine-surgery/`
    }
  },
  openGraph: {
    title: 'Minimally Invasive Spine Surgery in Hyderabad | Endoscopic Procedures',
    description: 'Expert minimally invasive spine surgery including endoscopic discectomy, foraminotomy, and ULBD in Hyderabad. Faster recovery, less pain.',
    url: `${SITE_URL}/services/minimally-invasive-spine-surgery/`,
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
    title: 'Minimally Invasive Spine Surgery in Hyderabad | Endoscopic Procedures',
    description: 'Expert minimally invasive spine surgery including endoscopic discectomy, foraminotomy, and ULBD in Hyderabad. Faster recovery, less pain.',
    images: [`${SITE_URL}/api/og?title=Minimally%20Invasive%20Spine%20Surgery&subtitle=Endoscopic%20Procedures%20in%20Hyderabad`],
  },
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Minimally Invasive Spine Surgery</h1>
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

        <MedicalReviewNotice />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Minimally Invasive Spine Surgery?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Minimally invasive spine surgery (MISS) uses advanced endoscopic techniques to treat spine conditions through smaller incisions, 
              resulting in less muscle damage, reduced pain, and faster recovery compared to traditional open surgery.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in endoscopic spine procedures, offering patients the benefits of modern surgical techniques 
              with reduced trauma and quicker return to daily activities.
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

        {/* Outcome Statistics Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Proven Results & Experience</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Endoscopic Procedures</div>
                <div className="text-sm text-gray-600">Successfully performed</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Success Rate</div>
                <div className="text-sm text-gray-600">Patient satisfaction</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">&lt;1%</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Complication Rate</div>
                <div className="text-sm text-gray-600">Industry-leading safety</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-lg">
                <strong>15+ years of experience</strong> in minimally invasive spine surgery with state-of-the-art endoscopic technology
              </p>
            </div>
          </div>
        </section>

        {/* Patient Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Patient Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">R</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">Rajesh K.</div>
                  <div className="text-sm text-gray-600">Endoscopic Discectomy Patient</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Dr. Sayuj performed my endoscopic discectomy and I was walking the same day. The pain that had been bothering me for months was gone immediately. I returned to work in just 10 days. Highly recommend his expertise."
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <strong>Condition:</strong> L4-L5 Herniated Disc • <strong>Recovery:</strong> 10 days
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">P</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">Priya M.</div>
                  <div className="text-sm text-gray-600">Spinal Stenosis Patient</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The minimally invasive approach was amazing. Tiny incisions, no muscle cutting, and I was back to my daily activities in 2 weeks. Dr. Sayuj's technique is truly advanced and patient-friendly."
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <strong>Condition:</strong> Lumbar Spinal Stenosis • <strong>Recovery:</strong> 2 weeks
              </div>
            </div>
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
      </div>
    </div>
  );
}