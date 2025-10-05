import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';

const baseMetadata = makeMetadata({
  title: 'Trigeminal Neuralgia Treatment in Hyderabad | MVD & Radiosurgery',
  description: 'Medication, microvascular decompression, radiosurgery, and percutaneous procedures for trigeminal neuralgia in Hyderabad.',
  canonicalPath: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad/`,
    },
  },
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Trigeminal%20Neuralgia%20Treatment&subtitle=MVD%20%26%20Radiosurgery%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Trigeminal Neuralgia Treatment - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Trigeminal%20Neuralgia%20Treatment&subtitle=MVD%20%26%20Radiosurgery%20in%20Hyderabad`],
  },
};

export default function TrigeminalNeuralgiaTreatmentPage() {
  const treatments = [
    {
      title: 'Medical Therapy',
      description: 'First-line treatment with anti-seizure medications to control nerve pain.',
      benefits: ['Non-invasive', 'Effective for many patients', 'Adjustable dosing', 'Minimal side effects'],
      success: '60-70% of patients'
    },
    {
      title: 'Microvascular Decompression (MVD)',
      description: 'Surgical procedure to separate blood vessels compressing the trigeminal nerve.',
      benefits: ['High success rate', 'Long-lasting relief', 'Preserves nerve function', 'Addresses root cause'],
      success: '80-90% success rate'
    },
    {
      title: 'Radiosurgery (Gamma Knife)',
      description: 'Non-invasive treatment using focused radiation to target the trigeminal nerve.',
      benefits: ['No incision required', 'Outpatient procedure', 'Minimal recovery time', 'Low complication rate'],
      success: '70-80% success rate'
    },
    {
      title: 'Percutaneous Procedures',
      description: 'Minimally invasive procedures including glycerol injection and balloon compression.',
      benefits: ['Quick procedure', 'Minimal hospital stay', 'Effective pain relief', 'Suitable for elderly'],
      success: '60-80% success rate'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Trigeminal Neuralgia Treatment in Hyderabad</h1>
          <p className="text-lg text-gray-600">Expert treatment for severe facial pain with advanced surgical techniques</p>
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
              <Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 text-sm">
                Brain Tumor Surgery
              </Link>
              <Link href="/services/peripheral-nerve-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 text-sm">
                Peripheral Nerve Surgery
              </Link>
              <Link href="/services/epilepsy-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 text-sm">
                Epilepsy Surgery
              </Link>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Trigeminal Neuralgia?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Trigeminal neuralgia is a chronic pain condition affecting the trigeminal nerve, which carries sensation from your face to your brain. 
              It causes severe, electric shock-like facial pain that can be triggered by simple activities like eating, talking, or even a light touch.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in the comprehensive treatment of trigeminal neuralgia, offering both medical and surgical options 
              tailored to each patient's specific needs and condition severity.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Symptoms and Diagnosis</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Common Symptoms</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Severe, electric shock-like facial pain</li>
                <li>• Pain triggered by light touch or wind</li>
                <li>• Pain in jaw, cheek, or forehead</li>
                <li>• Difficulty eating or speaking</li>
                <li>• Pain-free periods between attacks</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Diagnostic Process</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Detailed medical history</li>
                <li>• Neurological examination</li>
                <li>• MRI brain with special sequences</li>
                <li>• Response to medication trial</li>
                <li>• Rule out other conditions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Treatment Options</h2>
          <div className="space-y-8">
            {treatments.map((treatment, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">{treatment.title}</h3>
                <p className="text-gray-600 mb-4">{treatment.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {treatment.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Success Rate:</h4>
                    <p className="text-sm text-gray-600">{treatment.success}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Treatment Decision Process</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Medical Therapy First</h3>
                <p className="text-gray-700">Start with anti-seizure medications like carbamazepine or oxcarbazepine to control pain.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Surgical Evaluation</h3>
                <p className="text-gray-700">If medications fail or cause side effects, consider surgical options based on MRI findings.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Personalized Approach</h3>
                <p className="text-gray-700">Choose the best treatment based on age, health, pain severity, and patient preferences.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery and Outcomes</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">80%</span>
                </div>
                <h3 className="font-semibold text-green-700 mb-2">MVD Success</h3>
                <p className="text-sm text-gray-600">Long-term pain relief with microvascular decompression</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">75%</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Radiosurgery Success</h3>
                <p className="text-sm text-gray-600">Significant pain reduction with Gamma Knife</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">65%</span>
                </div>
                <h3 className="font-semibold text-purple-700 mb-2">Medical Therapy</h3>
                <p className="text-sm text-gray-600">Effective pain control with medications</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What causes trigeminal neuralgia?</h3>
              <p className="text-gray-700">Most commonly caused by blood vessels compressing the trigeminal nerve, but can also result from multiple sclerosis, tumors, or nerve damage.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is trigeminal neuralgia curable?</h3>
              <p className="text-gray-700">While not always curable, most patients achieve significant pain relief with appropriate treatment. MVD offers the best chance for long-term cure.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What's the best treatment for me?</h3>
              <p className="text-gray-700">Treatment choice depends on your age, overall health, pain severity, and MRI findings. We'll discuss all options and help you decide.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long does pain relief last?</h3>
              <p className="text-gray-700">MVD provides the longest-lasting relief (often years to decades). Radiosurgery and medications may require periodic adjustments or repeat treatments.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Your Treatment Options?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for trigeminal neuralgia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/conditions/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              All Conditions
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
