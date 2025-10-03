import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import MedicalReviewNotice from '../../../src/components/MedicalReviewNotice';

export const metadata: Metadata = {
  title: 'Cervical Radiculopathy Treatment in Hyderabad | Neck & Arm Pain Relief',
  description: 'Expert cervical radiculopathy treatment in Hyderabad. Conservative care, injections, and endoscopic cervical surgery. Book consultation with Dr. Sayuj Krishnan.',
  alternates: {
    canonical: `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad/`
    }
  },
};

export default function CervicalRadiculopathyTreatmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Cervical Radiculopathy Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Expert treatment for neck and arm pain from nerve compression</p>
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
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Cervical Radiculopathy?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Cervical radiculopathy occurs when a nerve root in the cervical spine becomes compressed or irritated, 
              causing pain, numbness, and weakness that radiates from the neck into the shoulder, arm, and hand.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan provides comprehensive treatment for cervical radiculopathy, from conservative management 
              to advanced endoscopic cervical procedures.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Treatment Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Conservative Treatment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Physical therapy and neck exercises</li>
                <li>• Anti-inflammatory medications</li>
                <li>• Cervical epidural injections</li>
                <li>• Cervical traction</li>
                <li>• Activity modification</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Surgical Options</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Endoscopic cervical discectomy</li>
                <li>• Cervical foraminotomy</li>
                <li>• Anterior cervical discectomy</li>
                <li>• Cervical fusion</li>
                <li>• Artificial disc replacement</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Need Expert Cervical Radiculopathy Treatment?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides personalized treatment plans for neck and arm pain.
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
              Cervical Surgery
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}