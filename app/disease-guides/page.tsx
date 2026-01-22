import { Metadata } from 'next';
// Updated for deployment
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';
import DiseaseGuidesStructuredData from './structured-data';

export const metadata: Metadata = {
  title: 'Disease Guides & Medical Conditions | Dr. Sayuj Krishnan | Comprehensive Health Information',
  description: 'Comprehensive disease guides for degenerative disc disease, spinal stenosis, trigeminal neuralgia, epilepsy, herniated disc, and other neurological conditions. Expert medical information.',
  keywords: 'disease guides, degenerative disc disease, spinal stenosis, trigeminal neuralgia, epilepsy, herniated disc, neurological conditions, medical information, Hyderabad',
  alternates: {
    canonical: `${SITE_URL}/disease-guides/`,
    languages: {
      'en-IN': `${SITE_URL}/disease-guides/`,
      'x-default': `${SITE_URL}/disease-guides/`
    }
  },
  openGraph: {
    title: 'Disease Guides & Medical Conditions | Dr. Sayuj Krishnan',
    description: 'Comprehensive disease guides for neurological conditions with expert medical information and treatment options.',
    url: `${SITE_URL}/disease-guides/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Disease%20Guides%20%26%20Medical%20Conditions&subtitle=Comprehensive%20Health%20Information`,
        width: 1200,
        height: 630,
        alt: 'Disease Guides & Medical Conditions - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const diseaseGuides = [
  {
    id: 'degenerative-disc-disease',
    title: 'Degenerative Disc Disease',
    description: 'Age-related wear and tear of spinal discs causing chronic back pain',
    icon: '🦴',
    symptoms: ['Chronic back pain', 'Stiffness', 'Reduced flexibility', 'Pain worsens with activity'],
    causes: ['Aging', 'Genetics', 'Repetitive stress', 'Smoking', 'Obesity'],
    treatments: ['Physical therapy', 'Pain management', 'Endoscopic discectomy', 'Spinal fusion'],
    severity: 'Moderate to Severe',
    recovery: '3-6 months',
    link: '/disease-guides/degenerative-disc-disease'
  },
  {
    id: 'spinal-stenosis',
    title: 'Spinal Stenosis',
    description: 'Narrowing of spinal canal causing nerve compression and pain',
    icon: '🔗',
    symptoms: ['Leg pain', 'Numbness', 'Weakness', 'Difficulty walking'],
    causes: ['Aging', 'Arthritis', 'Herniated discs', 'Bone spurs'],
    treatments: ['Physical therapy', 'Epidural injections', 'Endoscopic decompression', 'Laminectomy'],
    severity: 'Moderate to Severe',
    recovery: '2-4 months',
    link: '/conditions/spinal-stenosis-treatment-hyderabad'
  },
  {
    id: 'trigeminal-neuralgia',
    title: 'Trigeminal Neuralgia',
    description: 'Severe facial pain caused by trigeminal nerve compression',
    icon: '😣',
    symptoms: ['Electric shock-like pain', 'Facial spasms', 'Pain triggered by touch', 'Brief episodes'],
    causes: ['Blood vessel compression', 'Multiple sclerosis', 'Tumor pressure', 'Nerve damage'],
    treatments: ['Medication', 'Microvascular decompression', 'Gamma Knife radiosurgery', 'Percutaneous procedures'],
    severity: 'Severe',
    recovery: '1-3 months',
    link: '/conditions/trigeminal-neuralgia-treatment-hyderabad'
  },
  {
    id: 'epilepsy',
    title: 'Epilepsy',
    description: 'Neurological disorder causing recurrent seizures',
    icon: '🧠',
    symptoms: ['Seizures', 'Loss of consciousness', 'Muscle spasms', 'Confusion'],
    causes: ['Brain injury', 'Genetics', 'Stroke', 'Brain tumors', 'Infections'],
    treatments: ['Anti-epileptic drugs', 'Vagus nerve stimulation', 'Epilepsy surgery', 'Ketogenic diet'],
    severity: 'Moderate to Severe',
    recovery: '6-12 months',
    link: '/services/epilepsy-surgery-hyderabad'
  },
  {
    id: 'herniated-disc',
    title: 'Herniated Disc',
    description: 'Bulging or ruptured spinal disc pressing on nerves',
    icon: '💥',
    symptoms: ['Back pain', 'Leg pain', 'Numbness', 'Muscle weakness'],
    causes: ['Aging', 'Lifting injuries', 'Repetitive motion', 'Obesity'],
    treatments: ['Rest and medication', 'Physical therapy', 'Endoscopic discectomy', 'Microdiscectomy'],
    severity: 'Moderate to Severe',
    recovery: '2-6 weeks',
    link: '/conditions/slip-disc-treatment-hyderabad'
  },
  {
    id: 'cervical-radiculopathy',
    title: 'Cervical Radiculopathy',
    description: 'Nerve root compression in the neck causing arm pain and weakness',
    icon: '🦴',
    symptoms: ['Neck pain', 'Arm pain', 'Numbness in arms', 'Muscle weakness'],
    causes: ['Herniated discs', 'Bone spurs', 'Spinal stenosis', 'Arthritis'],
    treatments: ['Physical therapy', 'Cervical traction', 'Endoscopic foraminotomy', 'Cervical fusion'],
    severity: 'Moderate to Severe',
    recovery: '4-8 weeks',
    link: '/conditions/cervical-radiculopathy-treatment-hyderabad'
  },
  {
    id: 'brain-tumors',
    title: 'Brain Tumors',
    description: 'Abnormal growth of cells in the brain requiring surgical intervention',
    icon: '🧠',
    symptoms: ['Headaches', 'Seizures', 'Memory problems', 'Personality changes'],
    causes: ['Genetics', 'Radiation exposure', 'Environmental factors', 'Unknown causes'],
    treatments: ['Surgery', 'Radiation therapy', 'Chemotherapy', 'Targeted therapy'],
    severity: 'Severe',
    recovery: '3-12 months',
    link: '/conditions/brain-tumor-surgery-hyderabad'
  },
  {
    id: 'sciatica',
    title: 'Sciatica',
    description: 'Pain along the sciatic nerve from lower back to leg',
    icon: '🦵',
    symptoms: ['Lower back pain', 'Leg pain', 'Burning sensation', 'Muscle weakness'],
    causes: ['Herniated disc', 'Spinal stenosis', 'Piriformis syndrome', 'Spondylolisthesis'],
    treatments: ['Physical therapy', 'Epidural injections', 'Endoscopic discectomy', 'Microdiscectomy'],
    severity: 'Moderate to Severe',
    recovery: '4-8 weeks',
    link: '/conditions/sciatica-treatment-hyderabad'
  }
];

const conditionSpecificFAQs = [
  {
    condition: 'Degenerative Disc Disease',
    questions: [
      {
        question: 'What is degenerative disc disease and how is it different from normal aging?',
        answer: 'Degenerative disc disease is the breakdown of spinal discs due to aging, wear and tear, or injury. While some disc degeneration is normal with aging, DDD causes significant pain and functional limitations that require medical intervention.'
      },
      {
        question: 'Can degenerative disc disease be reversed?',
        answer: 'While the disc degeneration itself cannot be reversed, symptoms can be effectively managed through physical therapy, pain management, and in severe cases, minimally invasive endoscopic procedures to relieve nerve compression.'
      },
      {
        question: 'What are the surgical options for degenerative disc disease?',
        answer: 'Surgical options include endoscopic discectomy for nerve decompression, spinal fusion for stabilization, and artificial disc replacement. Dr. Sayuj specializes in minimally invasive endoscopic procedures that offer faster recovery.'
      }
    ]
  },
  {
    condition: 'Spinal Stenosis',
    questions: [
      {
        question: 'What causes spinal stenosis and can it be prevented?',
        answer: 'Spinal stenosis is primarily caused by aging, arthritis, and bone spurs. While aging cannot be prevented, maintaining good posture, regular exercise, and avoiding smoking can help slow progression.'
      },
      {
        question: 'How is spinal stenosis diagnosed?',
        answer: 'Diagnosis involves physical examination, MRI or CT scans to visualize the spinal canal, and sometimes nerve conduction studies to assess nerve function.'
      },
      {
        question: 'What is the success rate of endoscopic decompression for spinal stenosis?',
        answer: 'Endoscopic decompression has a success rate of 85-90% for spinal stenosis, with patients typically experiencing significant pain relief and improved mobility within 2-4 months.'
      }
    ]
  },
  {
    condition: 'Trigeminal Neuralgia',
    questions: [
      {
        question: 'What triggers trigeminal neuralgia pain?',
        answer: 'Common triggers include light touch, eating, talking, brushing teeth, or even a breeze on the face. The pain is often described as electric shock-like and can be debilitating.'
      },
      {
        question: 'What is microvascular decompression and when is it recommended?',
        answer: 'Microvascular decompression (MVD) is a surgical procedure that relieves pressure on the trigeminal nerve by placing a cushion between the nerve and compressing blood vessel. It\'s recommended when medications fail to control pain.'
      },
      {
        question: 'How effective is Gamma Knife radiosurgery for trigeminal neuralgia?',
        answer: 'Gamma Knife radiosurgery has a 70-80% success rate for trigeminal neuralgia, with pain relief typically occurring within 2-6 weeks. It\'s a non-invasive alternative to traditional surgery.'
      }
    ]
  },
  {
    condition: 'Epilepsy',
    questions: [
      {
        question: 'When is epilepsy surgery considered?',
        answer: 'Epilepsy surgery is considered when seizures are not controlled by medications (drug-resistant epilepsy) and the seizure focus can be identified and safely removed without affecting critical brain functions.'
      },
      {
        question: 'What types of epilepsy surgery are available?',
        answer: 'Surgical options include temporal lobectomy, lesionectomy, corpus callosotomy, and vagus nerve stimulation. The choice depends on the location and type of seizures.'
      },
      {
        question: 'What is the success rate of epilepsy surgery?',
        answer: 'Epilepsy surgery has a 60-80% success rate for achieving seizure freedom, with temporal lobectomy showing the highest success rates for temporal lobe epilepsy.'
      }
    ]
  }
];

export default function DiseaseGuidesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Disease Guides & Medical Conditions
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Comprehensive information about neurological and spinal conditions, 
            their symptoms, causes, and treatment options available at our practice.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-blue-800 font-semibold">
              "Understanding your condition is the first step toward effective treatment and recovery."
            </p>
            <p className="text-blue-600 mt-2">— Dr. Sayuj Krishnan</p>
          </div>
        </section>

        {/* Disease Cards Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Common Conditions We Treat</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseaseGuides.map((disease) => (
              <div key={disease.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{disease.icon}</div>
                    <p className="text-sm text-blue-600 font-medium">{disease.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">{disease.title}</h3>
                  <p className="text-gray-600 mb-4">{disease.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Severity:</h4>
                      <p className="text-sm text-gray-600">{disease.severity}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Recovery Time:</h4>
                      <p className="text-sm text-gray-600">{disease.recovery}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Symptoms:</h4>
                    <ul className="space-y-1">
                      {disease.symptoms.slice(0, 3).map((symptom, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={disease.link}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Condition-Specific FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Condition-Specific FAQs</h2>
          <div className="space-y-8">
            {conditionSpecificFAQs.map((condition, conditionIndex) => (
              <div key={conditionIndex} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6">{condition.condition}</h3>
                <div className="space-y-6">
                  {condition.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Treatment Options Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Treatment Approaches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Medical Management</h3>
              <p className="text-gray-600 text-sm">Pain medications, anti-inflammatory drugs, and targeted therapies</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏃‍♂️</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Physical Therapy</h3>
              <p className="text-gray-600 text-sm">Exercise programs, manual therapy, and rehabilitation</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Minimally Invasive</h3>
              <p className="text-gray-600 text-sm">Endoscopic procedures with faster recovery and less pain</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Advanced Surgery</h3>
              <p className="text-gray-600 text-sm">Complex procedures for severe cases requiring specialized care</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Need Help with a Specific Condition?</h2>
          <p className="text-xl mb-6 opacity-90">
            Schedule a consultation to discuss your condition and explore the best treatment options for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <MedicalReviewNotice />
      </div>

      {/* Structured Data */}
      <DiseaseGuidesStructuredData />
    </main>
  );
}
