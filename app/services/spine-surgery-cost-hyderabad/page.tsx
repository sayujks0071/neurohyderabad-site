import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import { makeMetadata } from '@/app/_lib/meta';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';

const baseMetadata = makeMetadata({
  title: 'Spine Surgery Cost Hyderabad | Packages & Insurance',
  description: 'Spine surgery cost in Hyderabad starts ₹95k. Cashless insurance accepted. Get detailed price packages for endoscopic surgery.',
  canonicalPath: '/services/spine-surgery-cost-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/spine-surgery-cost-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Spine%20Surgery%20Cost%20in%20Hyderabad&subtitle=Complete%20Price%20Guide%202025`,
        width: 1200,
        height: 630,
        alt: 'Spine Surgery Cost Guide - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Spine%20Surgery%20Cost%20in%20Hyderabad&subtitle=Complete%20Price%20Guide%202025`],
  },
};

const ARTICLE_SOURCES = getServiceSources('spine-surgery-cost-hyderabad') || [];

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does spine surgery cost in Hyderabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spine surgery costs in Hyderabad vary by procedure type. Endoscopic discectomy typically costs ₹2,50,000-4,00,000, while spinal fusion ranges from ₹3,00,000-5,00,000. Minimally invasive procedures often cost less than open surgery due to shorter hospital stays. Costs include surgery, hospital stay, medications, and follow-up care."
      }
    },
    {
      "@type": "Question",
      "name": "Does insurance cover spine surgery in Hyderabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most health insurance plans cover spine surgery in Hyderabad, including endoscopic and minimally invasive procedures. Cashless insurance options are available at Yashoda Hospital. Our team helps with pre-authorization and understanding your coverage. Contact us to verify your insurance eligibility."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cost difference between endoscopic and open spine surgery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic spine surgery typically costs ₹2,50,000-4,00,000, while traditional open surgery ranges from ₹2,00,000-3,50,000. However, endoscopic surgery often results in lower overall costs due to same-day or 1-night discharge, reduced medication needs, and faster return to work. The minimally invasive approach offers better value despite slightly higher initial cost."
      }
    }
  ]
};

export default function SpineSurgeryCostPage() {
  const pageUrl = `${SITE_URL}/services/spine-surgery-cost-hyderabad`;
  const faqs = faqSchema.mainEntity.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
  const procedures = [
    {
      name: 'Endoscopic Discectomy',
      cost: '₹2,50,000 - ₹4,00,000',
      includes: ['Surgery', '1-night hospital stay', 'Medications', 'Follow-up'],
      notes: 'Same-day discharge possible'
    },
    {
      name: 'Spinal Fusion (TLIF/ACDF)',
      cost: '₹3,00,000 - ₹5,00,000',
      includes: ['Surgery', '2-3 night hospital stay', 'Implants', 'Medications', 'Follow-up'],
      notes: 'Cost varies by implant type'
    },
    {
      name: 'Minimally Invasive Spine Surgery',
      cost: '₹2,50,000 - ₹4,50,000',
      includes: ['Surgery', '1-2 night hospital stay', 'Medications', 'Follow-up'],
      notes: 'Faster recovery, lower overall cost'
    },
    {
      name: 'Open Discectomy',
      cost: '₹2,00,000 - ₹3,50,000',
      includes: ['Surgery', '2-3 night hospital stay', 'Medications', 'Follow-up'],
      notes: 'Traditional approach'
    }
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Spine Surgery Cost Hyderabad', path: '/services/spine-surgery-cost-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={pageUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Spine Surgery Cost in Hyderabad</h1>
            <AuthorByline
              publishedOn="2025-11-25"
              updatedOn="2025-11-25"
              className="justify-center"
            />
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Complete guide to spine surgery costs, insurance coverage, and payment options at Yashoda Hospital, Hyderabad.
            </p>
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
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Spine Surgery Cost Breakdown</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {procedures.map((procedure, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">{procedure.name}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-4">{procedure.cost}</div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {procedure.includes.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 italic">{procedure.notes}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Factors Affecting Cost</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Procedure Type</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Minimally invasive vs open surgery</li>
                  <li>• Single vs multi-level procedures</li>
                  <li>• Use of implants (fusion)</li>
                  <li>• Complexity of case</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Hospital Stay</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Endoscopic: Same-day or 1 night</li>
                  <li>• Open surgery: 2-3 nights</li>
                  <li>• ICU stay (if needed)</li>
                  <li>• Post-operative care</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Insurance Coverage</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Accepted Insurance</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Most major insurance providers</li>
                  <li>• Cashless insurance available</li>
                  <li>• TPA networks supported</li>
                  <li>• Corporate health insurance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Payment Options</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cashless insurance</li>
                  <li>• Reimbursement claims</li>
                  <li>• EMI options available</li>
                  <li>• Cash, UPI, Credit Card</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded border border-green-200">
              <p className="text-gray-700">
                <strong>Note:</strong> Our team helps with insurance pre-authorization and understanding your coverage. 
                Contact us at <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a> to verify your insurance eligibility.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj Krishnan?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold text-blue-700 mb-2">Transparent Pricing</h3>
                <p className="text-sm text-gray-600">No hidden costs, clear cost breakdown provided upfront</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="font-semibold text-blue-700 mb-2">Same-Day Discharge</h3>
                <p className="text-sm text-gray-600">Endoscopic procedures allow same-day discharge, reducing overall cost</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-semibold text-blue-700 mb-2">Insurance Support</h3>
                <p className="text-sm text-gray-600">Expert help with insurance claims and pre-authorization</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Get a Personalized Cost Estimate</h2>
            <p className="text-gray-600 mb-6">
              Contact us for a detailed cost estimate based on your specific condition and treatment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments/"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Book Consultation
              </Link>
              <Link 
                href="/contact/"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </section>

          <section className="mt-12 space-y-6">


      <div className="mt-12">
        <LocalPathways mode="service" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} heading="References" />
            <ReviewedBy lastReviewed="2025-11-25" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
