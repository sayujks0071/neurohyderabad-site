import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import StandardCTA from '@/app/_components/StandardCTA';
import MedicalCitations from '@/app/_components/MedicalCitations';
import { makeMetadata } from '@/app/_lib/meta';

const baseMetadata = makeMetadata({
  title: 'Cervical Radiculopathy Treatment in Hyderabad | Neck & Arm Pain Relief',
  description: 'Expert treatment for cervical radiculopathy, neck pain, and arm numbness with Dr. Sayuj Krishnan in Hyderabad.',
  canonicalPath: '/conditions/cervical-radiculopathy-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad/`,
    },
  },
};

export default function CervicalRadiculopathyTreatmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Cervical Radiculopathy Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Expert treatment for neck pain, arm pain, and nerve compression</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
          </p>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Related Services:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-600 hover:text-blue-800 text-sm">
                Endoscopic Spine Surgery
              </Link>
              <Link href="/services/spinal-fusion" className="text-blue-600 hover:text-blue-800 text-sm">
                Spinal Fusion Surgery
              </Link>
              <Link href="/services/peripheral-nerve-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 text-sm">
                Peripheral Nerve Surgery
              </Link>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is Cervical Radiculopathy?</h2>
            <p className="text-gray-700 mb-4">
              Cervical radiculopathy occurs when a nerve root in the cervical spine (neck) becomes compressed or irritated, 
              causing pain, numbness, and weakness that radiates down the arm. This condition is commonly caused by 
              herniated discs, bone spurs, or spinal stenosis in the neck region.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Common Symptoms</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Sharp, burning pain in the neck, shoulder, and arm</li>
              <li>Numbness or tingling in the fingers and hand</li>
              <li>Weakness in the arm or hand muscles</li>
              <li>Loss of coordination in the affected arm</li>
              <li>Pain that worsens with certain neck movements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Treatment Options</h2>
            
            <h3 className="text-xl font-semibold mb-3">Conservative Treatment</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Physical therapy and neck exercises</li>
              <li>Anti-inflammatory medications</li>
              <li>Cervical epidural steroid injections</li>
              <li>Neck traction and bracing</li>
              <li>Activity modification</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Surgical Treatment</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Anterior cervical discectomy and fusion (ACDF)</li>
              <li>Posterior cervical foraminotomy</li>
              <li>Artificial disc replacement</li>
              <li>Minimally invasive endoscopic procedures</li>
            </ul>
          </div>
        </div>

        <section className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose Dr. Sayuj Krishnan?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Expertise & Experience</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Specialized training in spine surgery</li>
                <li>• Advanced minimally invasive techniques</li>
                <li>• Comprehensive evaluation and diagnosis</li>
                <li>• Personalized treatment plans</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Patient-Centered Care</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Conservative approach when possible</li>
                <li>• Clear communication and education</li>
                <li>• Comprehensive follow-up care</li>
                <li>• Support throughout recovery</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recovery & Outcomes</h2>
          <p className="text-gray-700 mb-4">
            Most patients with cervical radiculopathy respond well to conservative treatment. When surgery is necessary, 
            modern techniques allow for faster recovery with minimal scarring. Dr. Sayuj Krishnan provides comprehensive 
            post-operative care to ensure optimal outcomes.
          </p>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Expected Recovery Timeline</h3>
            <ul className="text-green-700 space-y-1">
              <li>• Conservative treatment: 4-8 weeks for significant improvement</li>
              <li>• Surgical recovery: 2-4 weeks for return to light activities</li>
              <li>• Full recovery: 3-6 months depending on the procedure</li>
            </ul>
          </div>
        </section>

        <section className="text-center mb-8">
          <StandardCTA />
        </section>

        <section className="mb-8">
          <NAP />
        </section>

        <section className="mb-8">
          <MedicalCitations />
        </section>

        <section className="mb-8">
          <ReviewedBy lastReviewed="2025-01-15" />
        </section>
      </div>
    </div>
  );
}
