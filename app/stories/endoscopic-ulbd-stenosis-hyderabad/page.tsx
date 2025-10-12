import { Metadata } from 'next';
import Link from 'next/link';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import SchemaScript from '@/app/_components/SchemaScript';

export const metadata: Metadata = {
  title: 'Endoscopic ULBD for Lumbar Stenosis — Case Story (Hyderabad)',
  description: 'De-identified case: walking distance and leg pain improved after endoscopic ULBD for stenosis in Hyderabad. Recovery timeline and outcomes.',
  keywords: 'endoscopic ULBD, lumbar stenosis, spinal decompression, walking distance, Hyderabad, case study',
  alternates: {
    canonical: 'https://www.drsayuj.info/stories/endoscopic-ulbd-stenosis-hyderabad',
    languages: {
      'en-IN': 'https://www.drsayuj.info/stories/endoscopic-ulbd-stenosis-hyderabad',
      'x-default': 'https://www.drsayuj.info/stories/endoscopic-ulbd-stenosis-hyderabad',
    },
  },
  openGraph: {
    title: 'Endoscopic ULBD for Lumbar Stenosis — Case Story (Hyderabad)',
    description: 'De-identified case: walking distance and leg pain improved after endoscopic ULBD for stenosis in Hyderabad. Recovery timeline and outcomes.',
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
      "item": "https://www.drsayuj.info/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Patient Stories",
      "item": "https://www.drsayuj.info/patient-stories"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Endoscopic ULBD for Stenosis",
      "item": "https://www.drsayuj.info/stories/endoscopic-ulbd-stenosis-hyderabad"
    }
  ]
};

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Endoscopic ULBD for Lumbar Stenosis — Case Story (Hyderabad)",
  "url": "https://www.drsayuj.info/stories/endoscopic-ulbd-stenosis-hyderabad",
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "about": {
    "@type": "MedicalProcedure",
    "name": "Endoscopic Unilateral Laminotomy Bilateral Decompression (ULBD)"
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
        "name": "Is fusion required with decompression?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not usually for isolated stenosis without instability."
        }
      },
      {
        "@type": "Question",
        "name": "How soon can I resume long walks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many patients build up to longer walks over weeks according to their plan."
        }
      },
      {
        "@type": "Question",
        "name": "Will the symptoms recur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spine degeneration can progress. Core and posture training help maintain results."
        }
      }
    ]
  }
};

export default function EndoscopicULBDStoryPage() {
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
            <li className="text-gray-900 font-medium">Endoscopic ULBD for Stenosis</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                Endoscopic ULBD
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Endoscopic ULBD for Lumbar Stenosis — Case Story (Hyderabad)
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
                Early-60s retired teacher with 1 year of neurogenic claudication—leg heaviness and pain after walking 100–150 meters, 
                relieved by sitting or bending forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment</h3>
                <p className="text-gray-700">Normal motor strength; reduced walking tolerance; no red flags.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Imaging & Tests</h3>
                <p className="text-gray-700">MRI showed multilevel degenerative changes with severe central stenosis at L4–L5; no instability on dynamic X-rays.</p>
              </div>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Decision-Making</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tried physiotherapy, analgesics, epidural injection with temporary relief. Discussed decompression options; 
                chose endoscopic ULBD to preserve stability and minimize tissue disruption.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">Procedure</h3>
              <p className="text-green-800">
                Unilateral endoscopic laminotomy with bilateral decompression (ULBD) at L4–L5. 
                Central and lateral recess decompressed through a small working portal under general anesthesia.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hospital Course</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                1-night stay for pain control and mobilization.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recovery Timeline</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 1:</strong> Walks 500–700 meters with minimal symptoms
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 3:</strong> Daily 1–2 km walk with brief rests
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 6:</strong> Market and temple visits without significant limitation
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Outcome</h3>
              <p className="text-blue-800">
                Walking distance significantly improved; numbness episodes reduced. No new weakness.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Reflections</h3>
              <blockquote className="text-gray-700 italic">
                "Standing and walking to the market again felt like getting my independence back."
              </blockquote>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                ULBD decompresses both sides from one side, preserving stability; rehab and posture matter for long-term comfort.
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is a fusion needed with decompression?</h3>
              <p className="text-gray-700">Not usually for isolated stenosis without instability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How soon can I resume long walks?</h3>
              <p className="text-gray-700">Often within weeks; build up gradually per your plan.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Will symptoms come back?</h3>
              <p className="text-gray-700">Degeneration progresses with age; good posture and core strengthening help maintain results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Schedule Your Spine Consultation
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discuss your spine condition with Dr. Sayuj Krishnan
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
              href="/services/minimally-invasive-spine-surgery"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Minimally Invasive Spine Surgery</h3>
              <p className="text-gray-600 text-sm">Explore all spine options</p>
            </Link>
            <Link 
              href="/services/spinal-fusion-surgery-hyderabad"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Spinal Fusion Surgery</h3>
              <p className="text-gray-600 text-sm">Compare treatment options</p>
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
