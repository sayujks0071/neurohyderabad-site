import { Metadata } from 'next';
import Link from 'next/link';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import SchemaScript from '@/app/_components/SchemaScript';

export const metadata: Metadata = {
  title: 'MVD for Trigeminal Neuralgia — Case Story (Hyderabad)',
  description: 'De-identified story: severe facial pain relieved after microvascular decompression in Hyderabad. Recovery and durability of pain relief.',
  keywords: 'MVD, microvascular decompression, trigeminal neuralgia, facial pain, brain surgery, Hyderabad, case study',
  alternates: {
    canonical: 'https://www.drsayuj.com/stories/mvd-trigeminal-neuralgia-hyderabad',
    languages: {
      'en-IN': 'https://www.drsayuj.com/stories/mvd-trigeminal-neuralgia-hyderabad',
      'x-default': 'https://www.drsayuj.com/stories/mvd-trigeminal-neuralgia-hyderabad',
    },
  },
  openGraph: {
    title: 'MVD for Trigeminal Neuralgia — Case Story (Hyderabad)',
    description: 'De-identified story: severe facial pain relieved after microvascular decompression in Hyderabad. Recovery and durability of pain relief.',
    type: 'article',
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.drsayuj.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Patient Stories",
      "item": "https://www.drsayuj.com/patient-stories"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "MVD for Trigeminal Neuralgia",
      "item": "https://www.drsayuj.com/stories/mvd-trigeminal-neuralgia-hyderabad"
    }
  ]
};

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "MVD for Trigeminal Neuralgia — Case Story (Hyderabad)",
  "url": "https://www.drsayuj.com/stories/mvd-trigeminal-neuralgia-hyderabad",
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "about": {
    "@type": "MedicalProcedure",
    "name": "Microvascular Decompression (MVD)"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dr. Sayuj Krishnan - Neurosurgeon"
  },
  "reviewedBy": {
    "@type": "Physician",
    "name": "Dr. Sayuj Krishnan"
  },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is MVD curative?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It offers the best chance for durable relief in classic TN with vascular compression; individual results vary."
        }
      },
      {
        "@type": "Question",
        "name": "What are the alternatives to MVD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Radiosurgery and percutaneous procedures are options; durability and side effects differ."
        }
      },
      {
        "@type": "Question",
        "name": "How long is recovery after MVD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many daily activities resume in weeks; your plan is individualized."
        }
      }
    ]
  }
};

export default function MVDTrigeminalNeuralgiaStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <SchemaScript data={breadcrumbSchema} />
      <SchemaScript data={medicalWebPageSchema} />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/patient-stories" className="hover:text-blue-600">Patient Stories</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">MVD for Trigeminal Neuralgia</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                Microvascular Decompression (MVD)
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              MVD for Trigeminal Neuralgia — Case Story (Hyderabad)
            </h1>
            <p className="text-xl text-gray-600">
              A de-identified patient success story
            </p>
          </div>
        </div>
      </section>

      {/* Case Narrative */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Narrative (De-identified)</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Chief Concern</h3>
              <p className="text-blue-800">
                Early-50s homemaker with 2 years of electric shock-like facial pain triggered by touch and chewing; 
                partial relief with carbamazepine, intolerable side effects at higher dose.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment</h3>
                <p className="text-gray-700">Classical trigeminal neuralgia pattern without sensory loss; normal neuro exam.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Imaging & Tests</h3>
                <p className="text-gray-700">MRI with high-resolution sequences showed vascular loop contacting the trigeminal nerve root entry zone; labs normal.</p>
              </div>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Decision-Making</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Options discussed—medication optimization, radiosurgery, percutaneous procedures, microvascular decompression. 
                Patient prioritized durable, drug-free relief; elected MVD.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">Procedure</h3>
              <p className="text-green-800">
                Retromastoid craniotomy; offending vessel gently mobilized; Teflon felt placed to separate it from the nerve. 
                Microsurgical technique under general anesthesia.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hospital Course</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                3-day stay. Early mobilization; short course of analgesics; gradual taper of carbamazepine.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recovery Timeline</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 1:</strong> No shock-like pains; mild incision discomfort
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 4:</strong> Normal diet without triggers; off anticonvulsant medication under supervision
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Month 6:</strong> Pain-free; no facial numbness
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Outcome</h3>
              <p className="text-blue-800">
                Durable pain relief with preserved nerve function at 6 months follow-up.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Reflections</h3>
              <blockquote className="text-gray-700 italic">
                "Being able to eat and talk without fear changed my day-to-day life."
              </blockquote>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                MVD offers the highest chance of long-lasting relief when compression is demonstrated; not all patients are candidates—MRI and clinical pattern guide decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is MVD curative?</h3>
              <p className="text-gray-700">It offers the best chance for durable relief in classic TN with vascular compression; individual results vary.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What are alternatives to MVD?</h3>
              <p className="text-gray-700">Radiosurgery or percutaneous procedures; relief may be less durable or involve numbness.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How long is recovery?</h3>
              <p className="text-gray-700">Most routine activities resume in weeks; full recovery varies by patient.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Discuss Trigeminal Neuralgia Surgery Options
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore treatment options with Dr. Sayuj Krishnan
          </p>
          <StandardCTA />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/conditions/trigeminal-neuralgia-treatment-hyderabad"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trigeminal Neuralgia Treatment</h3>
              <p className="text-gray-600 text-sm">Learn about treatment options</p>
            </Link>
            <Link 
              href="/services/brain-tumor-surgery-hyderabad"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Brain Surgery Services</h3>
              <p className="text-gray-600 text-sm">Explore brain surgery options</p>
            </Link>
            <Link 
              href="/appointments"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">Schedule consultation</p>
            </Link>
          </div>
        </div>
      </section>

      {/* NAP Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NAP />
        </div>
      </section>

      {/* Review Notice */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewedBy lastReviewed="2025-01-15" />
        </div>
      </section>
    </div>
  );
}
