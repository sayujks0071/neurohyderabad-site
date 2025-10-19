import { Metadata } from 'next';
import Link from 'next/link';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { SITE_URL } from '../../../src/lib/seo';
import { sources } from '../../blog/sources';
import { makeMetadata } from '@/app/_lib/meta';

const baseMetadata = makeMetadata({
  title: 'Sciatica Treatment in Hyderabad | Expert Pain Relief & Surgery',
  description: 'Conservative care, injections, and endoscopic surgery for sciatica tailored by Dr. Sayuj Krishnan in Hyderabad.',
  canonicalPath: '/conditions/sciatica-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/sciatica-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/sciatica-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/sciatica-treatment-hyderabad/`,
    },
  },
};

export default function SciaticaTreatmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Sciatica Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Expert treatment for sciatic nerve pain and leg pain</p>
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
              <Link href="/services/peripheral-nerve-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 text-sm">
                Peripheral Nerve Surgery
              </Link>
              <Link href="/services/spinal-fusion-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 text-sm">
                Spinal Fusion Surgery
              </Link>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Sciatica?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Sciatica is pain that radiates along the path of the sciatic nerve, which branches from your lower back through your hips and buttocks 
              and down each leg. Typically, sciatica affects only one side of your body.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan provides comprehensive treatment for sciatica, from conservative management to advanced endoscopic surgical procedures 
              when needed.
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
                <li>• Heat and cold therapy</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Surgical Options</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Endoscopic discectomy</li>
                <li>• Microdiscectomy</li>
                <li>• Laminectomy</li>
                <li>• Foraminotomy</li>
                <li>• Spinal fusion (rare cases)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Need Expert Sciatica Treatment?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides personalized treatment plans for sciatica and leg pain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/services/endoscopic-discectomy-hyderabad/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              Endoscopic Surgery
            </Link>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <AuthorByline 
            publishedOn="2025-02-15"
            updatedOn="2025-10-19"
          />
          
          <SourceList sources={sources['sciatica-treatment-hyderabad'] || []} />
          
          <ReviewedBy />
          <NAP />
        </section>
      </div>
    </div>
  );
}
