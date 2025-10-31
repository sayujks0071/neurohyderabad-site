import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';

const baseMetadata = makeMetadata({
  title: 'Spinal Stenosis Treatment in Hyderabad | Expert Care & Surgery',
  description: 'Conservative care, injections, and endoscopic ULBD decompression for spinal stenosis in Hyderabad.',
  canonicalPath: '/conditions/spinal-stenosis-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad/`,
    },
  },
};

export default function SpinalStenosisTreatmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Spinal Stenosis Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Expert treatment for spinal canal narrowing and nerve compression</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
            <Link href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</Link>
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Spinal Stenosis?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Spinal stenosis is a narrowing of the spinal canal that can compress the spinal cord and nerve roots, 
              causing pain, numbness, and weakness in the back, legs, or arms.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in both conservative and surgical treatment of spinal stenosis, 
              including advanced endoscopic decompression procedures.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Treatment Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Conservative Treatment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Physical therapy and exercises</li>
                <li>• Anti-inflammatory medications</li>
                <li>• Epidural steroid injections</li>
                <li>• Activity modification</li>
                <li>• Assistive devices (walkers)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Surgical Options</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Endoscopic ULBD</li>
                <li>• Laminectomy</li>
                <li>• Foraminotomy</li>
                <li>• Spinal fusion (severe cases)</li>
                <li>• Interspinous spacers</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Need Expert Spinal Stenosis Treatment?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides personalized treatment plans for spinal stenosis.
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
              Minimally Invasive Surgery
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
