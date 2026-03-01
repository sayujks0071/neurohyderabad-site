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
import { LocalPathways } from '@/src/components/locations/LocalPathways';

const baseMetadata = makeMetadata({
  title: 'Epilepsy Surgery in Hyderabad | Drug-Resistant Epilepsy Treatment',
  description: 'Expert epilepsy surgery for drug-resistant epilepsy in Hyderabad. LITT, resection surgery, VNS. Comprehensive evaluation and advanced techniques.',
  canonicalPath: '/services/epilepsy-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/epilepsy-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Epilepsy%20Surgery%20in%20Hyderabad&subtitle=Drug-Resistant%20Epilepsy%20Treatment`,
        width: 1200,
        height: 630,
        alt: 'Epilepsy Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Epilepsy%20Surgery%20in%20Hyderabad&subtitle=Drug-Resistant%20Epilepsy%20Treatment`],
  },
};

const epilepsyStories = patientStories
  .filter((story) => story.tags.includes('epilepsy'))
  .slice(0, 1);

const ARTICLE_SOURCES = getServiceSources('epilepsy-surgery-hyderabad');

export default function EpilepsySurgeryPage() {
  const procedures = [
    {
      title: 'Laser Interstitial Thermal Therapy (LITT)',
      description: 'Minimally invasive laser ablation of epileptic focus using MRI-guided thermal therapy.',
      benefits: ['Minimal invasion', 'Precise targeting', 'Faster recovery', 'Reduced complications'],
      suitable: 'Deep-seated lesions, small epileptic foci'
    },
    {
      title: 'Resection Surgery',
      description: 'Surgical removal of the epileptic focus with advanced mapping and monitoring techniques.',
      benefits: ['High success rate', 'Comprehensive evaluation', 'Advanced monitoring', 'Multidisciplinary approach'],
      suitable: 'Well-localized epileptic foci, accessible lesions'
    },
    {
      title: 'Vagus Nerve Stimulation (VNS)',
      description: 'Implantable device that stimulates the vagus nerve to reduce seizure frequency.',
      benefits: ['Non-destructive', 'Adjustable therapy', 'Gradual improvement', 'Minimal side effects'],
      suitable: 'Multiple seizure types, failed resection'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Epilepsy Surgery in Hyderabad</h1>
          <AuthorByline
            publishedOn="2025-09-06"
            updatedOn="2025-10-19"
            className="justify-center mb-4"
          />
          <p className="text-lg text-gray-600">Advanced surgical treatment for drug-resistant epilepsy</p>
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
          <h2 className="text-3xl font-bold text-blue-800 mb-6">When is Epilepsy Surgery Considered?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Epilepsy surgery is considered when seizures are not adequately controlled with medications (drug-resistant epilepsy). 
              Dr. Sayuj Krishnan works with a multidisciplinary team to evaluate patients and determine the best surgical approach 
              for their specific condition.
            </p>
            <p className="text-gray-700 mb-6">
              The goal of epilepsy surgery is to reduce or eliminate seizures while preserving important brain functions, 
              ultimately improving quality of life for patients and their families.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Surgical Procedures We Offer</h2>
          <div className="space-y-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">{procedure.title}</h3>
                <p className="text-gray-600 mb-4">{procedure.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {procedure.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Best Suited For:</h4>
                    <p className="text-sm text-gray-600">{procedure.suitable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Comprehensive Pre-Surgical Evaluation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Diagnostic Tests</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Video EEG monitoring</li>
                <li>• High-resolution MRI</li>
                <li>• PET/SPECT scans</li>
                <li>• Neuropsychological testing</li>
                <li>• Functional MRI (fMRI)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Team Evaluation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Epileptologist consultation</li>
                <li>• Neurosurgical assessment</li>
                <li>• Neuropsychology evaluation</li>
                <li>• Social work assessment</li>
                <li>• Multidisciplinary conference</li>
              </ul>
            </div>
          </div>
        </section>

        <OutcomeMetricsSection procedure="Epilepsy Surgery" />

        {epilepsyStories.length ? (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Featured Patient Journey</h2>
            <article className="bg-white border border-blue-100 rounded-2xl shadow-sm p-8">
              <header className="mb-4">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{epilepsyStories[0].procedure}</p>
                <h3 className="text-2xl font-bold text-gray-900">{epilepsyStories[0].title}</h3>
              </header>
              <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
                <p className="text-blue-900 italic">“{epilepsyStories[0].quote}”</p>
                <footer className="mt-3 text-sm text-blue-800">— {epilepsyStories[0].patientInitials}</footer>
              </blockquote>
              <p className="text-gray-700 mb-4">{epilepsyStories[0].summary}</p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                {epilepsyStories[0].outcomes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mt-1 mr-2 inline-flex h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/patient-stories/${epilepsyStories[0].slug}`}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Read full story
                <span aria-hidden className="ml-2">→</span>
              </Link>
            </article>
          </section>
        ) : null}

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery and Follow-up</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Immediate Post-Operative</h3>
                <p className="text-gray-700">ICU monitoring, seizure control, neurological assessment, and pain management.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Hospital Stay</h3>
                <p className="text-gray-700">Typically 3-7 days depending on the procedure and recovery progress.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Long-term Follow-up</h3>
                <p className="text-gray-700">Regular EEG monitoring, medication adjustments, and seizure diary maintenance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <TeleconsultationForm pageSlug="/services/epilepsy-surgery-hyderabad" service="Epilepsy Surgery" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Who is a candidate for epilepsy surgery?</h3>
              <p className="text-gray-700">Patients with drug-resistant epilepsy who have failed 2-3 appropriate anti-seizure medications and have a well-localized epileptic focus.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What are the risks of epilepsy surgery?</h3>
              <p className="text-gray-700">Risks include infection, bleeding, neurological deficits, and continued seizures. The specific risks depend on the type of surgery and brain area involved.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Will I still need medications after surgery?</h3>
              <p className="text-gray-700">Many patients can reduce or discontinue medications after successful surgery, but this is determined on a case-by-case basis with careful monitoring.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long does the evaluation process take?</h3>
              <p className="text-gray-700">The comprehensive evaluation typically takes 1-2 weeks, including all necessary tests and multidisciplinary team review.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Epilepsy Surgery Options?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for drug-resistant epilepsy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/services/brain-tumor-surgery-hyderabad/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              Brain Surgery Services
            </Link>
          </div>
        </section>



      <div className="not-prose mt-12">
        <LocalPathways mode="service" currentSlug="epilepsy-surgery-hyderabad" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2025-10-19" />
          <NAP />
        </section>
      </div>
    </div>
  );
}
