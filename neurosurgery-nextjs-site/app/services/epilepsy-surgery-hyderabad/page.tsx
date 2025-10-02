import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import MedicalReviewNotice from '../../../src/components/MedicalReviewNotice';

export const metadata: Metadata = {
  title: 'Epilepsy Surgery in Hyderabad | Drug-Resistant Epilepsy Treatment',
  description: 'Expert epilepsy surgery for drug-resistant epilepsy in Hyderabad. LITT, resection surgery, VNS. Comprehensive evaluation and advanced techniques.',
  alternates: {
    canonical: `${SITE_URL}/services/epilepsy-surgery-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/services/epilepsy-surgery-hyderabad/`,
      'x-default': `${SITE_URL}/services/epilepsy-surgery-hyderabad/`
    }
  },
  openGraph: {
    title: 'Epilepsy Surgery in Hyderabad | Drug-Resistant Epilepsy Treatment',
    description: 'Expert epilepsy surgery for drug-resistant epilepsy in Hyderabad. LITT, resection surgery, VNS. Comprehensive evaluation and advanced techniques.',
    url: `${SITE_URL}/services/epilepsy-surgery-hyderabad/`,
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
    title: 'Epilepsy Surgery in Hyderabad | Drug-Resistant Epilepsy Treatment',
    description: 'Expert epilepsy surgery for drug-resistant epilepsy in Hyderabad. LITT, resection surgery, VNS. Comprehensive evaluation and advanced techniques.',
    images: [`${SITE_URL}/api/og?title=Epilepsy%20Surgery%20in%20Hyderabad&subtitle=Drug-Resistant%20Epilepsy%20Treatment`],
  },
};

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
          <p className="text-lg text-gray-600">Advanced surgical treatment for drug-resistant epilepsy</p>
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

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Success Rates and Outcomes</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">70%</span>
                </div>
                <h3 className="font-semibold text-green-700 mb-2">Seizure Freedom</h3>
                <p className="text-sm text-gray-600">Patients achieve complete seizure freedom after surgery</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">85%</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Significant Improvement</h3>
                <p className="text-sm text-gray-600">Patients experience 90%+ reduction in seizures</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">95%</span>
                </div>
                <h3 className="font-semibold text-purple-700 mb-2">Quality of Life</h3>
                <p className="text-sm text-gray-600">Patients report improved quality of life</p>
              </div>
            </div>
          </div>
        </section>

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
      </div>
    </div>
  );
}
