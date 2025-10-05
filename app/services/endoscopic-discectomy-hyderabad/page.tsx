import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';

const baseMetadata = makeMetadata({
  title: 'Endoscopic Discectomy in Hyderabad | Minimally Invasive Disc Surgery',
  description: 'Expert endoscopic discectomy for herniated discs in Hyderabad. Same-day surgery, faster recovery, less pain.',
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

export default function EndoscopicDiscectomyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Endoscopic Discectomy in Hyderabad</h1>
          <p className="text-lg text-gray-600">Minimally invasive disc surgery for faster recovery and less pain</p>
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
                <li>• Leg pain (sciatica) that hasn't improved with conservative treatment</li>
                <li>• Nerve compression symptoms</li>
                <li>• Failed 6+ weeks of non-surgical treatment</li>
                <li>• No significant spinal instability</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Symptoms Treated</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Severe leg pain (sciatica)</li>
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

        <section className="mt-12 space-y-6">
          <ReviewedBy />
          <NAP />
        </section>
      </div>
    </div>
  );
}
