import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import ServicePageTracker from '../../../src/components/ServicePageTracker';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import MedicalWebPageSchema from '../../components/schemas/MedicalWebPageSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const baseMetadata = makeMetadata({
  title: 'Endoscopic Discectomy Hyderabad',
  description: 'Expert endoscopic discectomy for herniated discs in Hyderabad. Same-day surgery, faster recovery, less pain with Dr. Sayuj Krishnan.',
  canonicalPath: '/services/endoscopic-discectomy-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/endoscopic-discectomy-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Endoscopic%20Discectomy%20in%20Hyderabad&subtitle=Minimally%20Invasive%20Disc%20Surgery`,
        width: 1200,
        height: 630,
        alt: 'Endoscopic Discectomy - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Endoscopic%20Discectomy%20in%20Hyderabad&subtitle=Minimally%20Invasive%20Disc%20Surgery`],
  },
};

const ARTICLE_SOURCES = getServiceSources('endoscopic-discectomy-hyderabad');

export default function EndoscopicDiscectomyPage() {
  const faqs = [
    {
      question: "How long does endoscopic discectomy surgery take?",
      answer: "Endoscopic discectomy typically takes 45-90 minutes depending on the complexity of the case. The procedure is performed under general anesthesia and uses a small endoscope to remove the herniated disc material through a tiny 8-10mm incision."
    },
    {
      question: "What is the recovery time after endoscopic discectomy?",
      answer: "Most patients can return to desk work within 1-2 weeks after endoscopic discectomy. Physical jobs may require 4-8 weeks. The procedure allows for same-day or 1-night hospital stay, with most patients walking the same day. Full recovery typically takes 4-6 weeks."
    },
    {
      question: "Is endoscopic discectomy better than open surgery?",
      answer: "Endoscopic discectomy offers several advantages over traditional open surgery: smaller incision (8-10mm vs 3-4cm), less muscle damage, reduced blood loss, lower infection risk, faster recovery, and same-day discharge. Success rates are comparable (85-90%) with less post-operative pain."
    },
    {
      question: "What are the risks of endoscopic discectomy?",
      answer: "Endoscopic discectomy is generally safe with low complication rates. Potential risks include infection (<1%), nerve injury (<1%), dural tear (<2%), and recurrence (5-10%). Dr. Sayuj Krishnan's experience with 1000+ endoscopic procedures results in excellent safety outcomes."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Endoscopic Discectomy', path: '/services/endoscopic-discectomy-hyderabad' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MedicalWebPageSchema
        title="Endoscopic Discectomy Hyderabad | Dr. Sayuj Krishnan"
        description="Expert endoscopic discectomy for herniated discs in Hyderabad. Same-day surgery, faster recovery, less pain with Dr. Sayuj Krishnan."
        pageSlug="/services/endoscopic-discectomy-hyderabad"
        pageType="service"
        serviceOrCondition="Endoscopic Discectomy"
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/endoscopic-discectomy-hyderabad`} />

      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Endoscopic Discectomy in Hyderabad</h1>
          <AuthorByline
            publishedOn="2025-09-12"
            updatedOn="2025-10-19"
            className="justify-center"
          />
          <p className="text-lg text-gray-600 mt-4">Minimally invasive disc surgery for faster recovery and less pain</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline ml-2">hellodr@drsayuj.info</a> •
            <Link href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</Link>
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Endoscopic Discectomy?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Endoscopic discectomy is a minimally invasive surgical procedure to remove herniated disc material that's compressing spinal nerves. 
              Using a small endoscope and specialized instruments, Dr. Sayuj Krishnan can access and remove the problematic disc material through 
              a tiny incision, resulting in less tissue damage and faster recovery.
            </p>
            <p className="text-gray-700 mb-6">
              This advanced technique offers significant advantages over traditional open discectomy, including reduced post-operative pain, 
              shorter hospital stays, and quicker return to normal activities.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Benefits of Endoscopic Discectomy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Surgical Advantages</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Smaller incision (8-10mm vs 3-4cm)</li>
                <li>• Less muscle and tissue damage</li>
                <li>• Reduced blood loss</li>
                <li>• Lower infection risk</li>
                <li>• Better visualization with endoscope</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Recovery Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Same-day or 1-night hospital stay</li>
                <li>• Less post-operative pain</li>
                <li>• Faster return to work (1-2 weeks)</li>
                <li>• Reduced scarring</li>
                <li>• Lower risk of complications</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">When is Endoscopic Discectomy Recommended?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Suitable Candidates</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Herniated lumbar disc confirmed on MRI</li>
                <li>• <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 hover:underline">Leg pain (sciatica)</Link> that hasn't improved with conservative treatment</li>
                <li>• Nerve compression symptoms</li>
                <li>• Failed 6+ weeks of non-surgical treatment</li>
                <li>• No significant spinal instability</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Symptoms Treated</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Severe leg pain (
                  <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 underline">
                    sciatica
                  </Link>
                  )
                </li>
                <li>• Numbness or tingling in legs/feet</li>
                <li>• Muscle weakness</li>
                <li>• Difficulty walking or standing</li>
                <li>• Pain that worsens with sitting</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">The Procedure</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Pre-operative Planning</h3>
                <p className="text-gray-700">MRI review, patient positioning, and precise entry point planning using fluoroscopic guidance.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Minimal Access</h3>
                <p className="text-gray-700">Small incision (8-10mm) and insertion of working cannula under fluoroscopic guidance.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Endoscopic Visualization</h3>
                <p className="text-gray-700">High-definition endoscope provides clear view of the herniated disc and nerve structures.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Disc Removal</h3>
                <p className="text-gray-700">Precise removal of herniated disc material using specialized endoscopic instruments.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">5</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Closure</h3>
                <p className="text-gray-700">Minimal sutures required due to small incision size.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery Timeline</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Day 0</h3>
                <p className="text-sm text-gray-600">Same-day discharge or 1-night stay</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 1</h3>
                <p className="text-sm text-gray-600">Light walking, wound care</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 2</h3>
                <p className="text-sm text-gray-600">Return to desk work</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 4</h3>
                <p className="text-sm text-gray-600">Full activity, driving</p>
              </div>
            </div>
          </div>
        </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Related Information</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Link href="/services/slip-disc-surgery-cost-hyderabad" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
                  <h3 className="font-semibold text-blue-700 mb-2">Surgery Cost Guide</h3>
                  <p className="text-sm text-gray-600">Learn about endoscopic discectomy costs and insurance coverage</p>
                </Link>
                <Link href="/conditions/slip-disc-treatment-hyderabad" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
                  <h3 className="font-semibold text-blue-700 mb-2">Slip Disc Treatment</h3>
                  <p className="text-sm text-gray-600">Comprehensive guide to herniated disc treatment options</p>
                </Link>
                <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
                  <h3 className="font-semibold text-blue-700 mb-2">Sciatica Treatment</h3>
                  <p className="text-sm text-gray-600">Understanding sciatica causes and treatment</p>
                </Link>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long does the surgery take?</h3>
              <p className="text-gray-700">Endoscopic discectomy typically takes 45-90 minutes, depending on the complexity of the case.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Will I need general anesthesia?</h3>
              <p className="text-gray-700">Yes, endoscopic discectomy is performed under general anesthesia for patient comfort and safety.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What's the success rate?</h3>
              <p className="text-gray-700">Endoscopic discectomy has a success rate of 85-90% for appropriately selected patients with herniated discs.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Can the disc herniate again?</h3>
              <p className="text-gray-700">There's a 5-10% chance of reherniation, which is similar to traditional discectomy. Proper post-operative care reduces this risk.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Success Story</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              <Link
                href="/stories/endoscopic-discectomy-same-day-hyderabad"
                className="underline underline-offset-4 decoration-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
              >
                Same-Day Endoscopic Discectomy in Hyderabad — Case Story
              </Link>
            </h3>
            <p className="text-gray-700 mb-4">
              Read about a de-identified patient who experienced severe sciatica and was successfully treated with endoscopic discectomy, 
              achieving same-day discharge and quick return to work.
            </p>
            <Link 
              href="/stories/endoscopic-discectomy-same-day-hyderabad"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Read the full story →
            </Link>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Your Treatment Options?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for herniated discs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/services/minimally-invasive-spine-surgery/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              All Spine Services
            </Link>
          </div>
        </section>



      <div className="not-prose mt-12">
        <LocalPathways mode="service" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2025-10-19" />
          <NAP />
        </section>

        {/* Service Page Tracking */}
        <ServicePageTracker service="endoscopic-discectomy" />
      </div>
    </div>
  );
}
