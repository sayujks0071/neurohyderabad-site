import { Metadata } from 'next';
import Link from 'next/link';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import SchemaScript from '@/app/_components/SchemaScript';

export const metadata: Metadata = {
  title: 'Same-Day Endoscopic Discectomy in Hyderabad — Case Story',
  description: 'De-identified story: severe sciatica treated with endoscopic discectomy and same-day discharge in Hyderabad. Recovery timeline and outcomes.',
  keywords: 'endoscopic discectomy, same-day surgery, sciatica treatment, lumbar spine, Hyderabad, case study',
  alternates: {
    canonical: 'https://www.drsayuj.com/stories/endoscopic-discectomy-same-day-hyderabad',
    languages: {
      'en-IN': 'https://www.drsayuj.com/stories/endoscopic-discectomy-same-day-hyderabad',
      'x-default': 'https://www.drsayuj.com/stories/endoscopic-discectomy-same-day-hyderabad',
    },
  },
  openGraph: {
    title: 'Same-Day Endoscopic Discectomy in Hyderabad — Case Story',
    description: 'De-identified story: severe sciatica treated with endoscopic discectomy and same-day discharge in Hyderabad. Recovery timeline and outcomes.',
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
      "name": "Same-Day Endoscopic Discectomy",
      "item": "https://www.drsayuj.com/stories/endoscopic-discectomy-same-day-hyderabad"
    }
  ]
};

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Same-Day Endoscopic Discectomy in Hyderabad — Case Story",
  "url": "https://www.drsayuj.com/stories/endoscopic-discectomy-same-day-hyderabad",
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "about": {
    "@type": "MedicalProcedure",
    "name": "Endoscopic Lumbar Discectomy"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dr. Sayuj Krishnan - Neurosurgeon",
    "url": "https://www.drsayuj.com"
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
        "name": "Is endoscopic discectomy always better than open surgery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The safest, most effective approach depends on your anatomy and goals."
        }
      },
      {
        "@type": "Question",
        "name": "Can pain return after endoscopic discectomy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is a small risk of reherniation. Following the rehab plan reduces risk."
        }
      },
      {
        "@type": "Question",
        "name": "When can I fly after surgery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Often after 2–3 weeks in uncomplicated cases, if you can walk and stretch comfortably."
        }
      }
    ]
  }
};

export default function EndoscopicDiscectomyStoryPage() {
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
            <li className="text-gray-900 font-medium">Same-Day Endoscopic Discectomy</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                Endoscopic Lumbar Discectomy
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Same-Day Endoscopic Discectomy in Hyderabad — Case Story
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
                A mid-40s office professional with 6 weeks of severe left leg pain, numbness in foot, and night pain. 
                Unable to sit &gt;10 minutes despite pain meds and physiotherapy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment</h3>
                <p className="text-gray-700">Positive straight leg raise at 30°, mild dorsiflexion weakness. No bowel/bladder symptoms.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Imaging & Tests</h3>
                <p className="text-gray-700">MRI lumbar spine showed a left paracentral L5–S1 disc herniation contacting the S1 nerve root. No instability on flexion-extension X-rays.</p>
              </div>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Decision-Making</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Conservative care had failed; options discussed were microdiscectomy vs full endoscopic discectomy. 
                Patient prioritized minimal muscle disruption and faster return to desk work; elected endoscopic discectomy.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">Procedure</h3>
              <p className="text-green-800">
                Full endoscopic lumbar discectomy via an 8–10 mm working portal under general anesthesia with fluoroscopic guidance. 
                Herniated fragment removed; nerve decompressed.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hospital Course</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ambulated 3 hours post-op; pain controlled with oral meds. Same-day discharge with wound care instructions.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recovery Timeline</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Day 1–3:</strong> Short walks at home; pain 3/10
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 1:</strong> Driving short distances
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 2:</strong> Returned to desk work with frequent breaks
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <div>
                    <strong>Week 6:</strong> Walking 30–40 minutes without leg pain
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Outcome</h3>
              <p className="text-blue-800">
                Leg pain resolved; mild intermittent low-back ache managed with core-strengthening exercises. No wound issues.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Reflections</h3>
              <blockquote className="text-gray-700 italic">
                "Quick relief and early return to work were most important for me. Understanding the MRI and plan helped."
              </blockquote>
            </div>

            <div className="my-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Early relief is common for leg pain; back comfort improves with rehab. Not every patient is a candidate for endoscopic surgery; 
                imaging and exam guide decisions.
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is endoscopic discectomy always better than open surgery?</h3>
              <p className="text-gray-700">No. We choose the safest option for your anatomy and goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can pain return?</h3>
              <p className="text-gray-700">Reherniation risk exists (typically 5–10%). Following the rehab plan reduces risk.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">When can I fly?</h3>
              <p className="text-gray-700">Often after 2–3 weeks for uncomplicated cases, if comfortable and mobile.</p>
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
              href="/services/endoscopic-discectomy-hyderabad"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Endoscopic Discectomy</h3>
              <p className="text-gray-600 text-sm">Learn about the procedure</p>
            </Link>
            <Link 
              href="/services/minimally-invasive-spine-surgery"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Minimally Invasive Spine Surgery</h3>
              <p className="text-gray-600 text-sm">Explore all spine options</p>
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
