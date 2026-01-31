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
  title: 'Slip Disc Surgery Cost in Hyderabad | Endoscopic Discectomy Price 2025',
  description: 'Complete guide to slip disc (herniated disc) surgery cost in Hyderabad. Endoscopic discectomy prices, insurance coverage, and payment options at Yashoda Hospital.',
  canonicalPath: '/services/slip-disc-surgery-cost-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/slip-disc-surgery-cost-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Slip%20Disc%20Surgery%20Cost%20Hyderabad&subtitle=Endoscopic%20Discectomy%20Price%20Guide`,
        width: 1200,
        height: 630,
        alt: 'Slip Disc Surgery Cost - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Slip%20Disc%20Surgery%20Cost%20Hyderabad&subtitle=Endoscopic%20Discectomy%20Price%20Guide`],
  },
};

const ARTICLE_SOURCES = getServiceSources('slip-disc-surgery-cost-hyderabad') || [];

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does slip disc surgery cost in Hyderabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slip disc (herniated disc) surgery costs in Hyderabad range from ₹2,50,000 to ₹4,00,000 for endoscopic discectomy, and ₹2,00,000 to ₹3,50,000 for traditional open discectomy. Endoscopic surgery offers better value with same-day discharge and faster recovery, despite slightly higher initial cost."
      }
    },
    {
      "@type": "Question",
      "name": "Is endoscopic discectomy more expensive than open surgery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic discectomy typically costs ₹2,50,000-4,00,000 compared to ₹2,00,000-3,50,000 for open surgery. However, endoscopic surgery often results in lower overall costs due to same-day discharge, reduced medication needs, and faster return to work. The minimally invasive approach provides better value."
      }
    },
    {
      "@type": "Question",
      "name": "Does insurance cover slip disc surgery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most health insurance plans cover slip disc surgery including endoscopic discectomy. Cashless insurance options are available at Yashoda Hospital. Our team assists with pre-authorization and helps you understand your coverage. Contact us to verify your insurance eligibility."
      }
    }
  ]
};

export default function SlipDiscSurgeryCostPage() {
  const pageUrl = `${SITE_URL}/services/slip-disc-surgery-cost-hyderabad`;
  const faqs = faqSchema.mainEntity.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Slip Disc Surgery Cost Hyderabad', path: '/services/slip-disc-surgery-cost-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={pageUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Slip Disc Surgery Cost in Hyderabad</h1>
            <AuthorByline
              publishedOn="2025-11-25"
              updatedOn="2025-11-25"
              className="justify-center"
            />
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Complete guide to slip disc (herniated disc) surgery costs, including endoscopic discectomy prices, insurance coverage, and payment options.
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
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Slip Disc Surgery Cost Comparison</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Endoscopic Discectomy</h3>
                <div className="text-2xl font-bold text-green-600 mb-4">₹2,50,000 - ₹4,00,000</div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Minimally invasive surgery</li>
                    <li>• Same-day or 1-night stay</li>
                    <li>• All medications</li>
                    <li>• Follow-up consultations</li>
                  </ul>
                </div>
                <p className="text-sm text-blue-600 font-medium">✓ Faster recovery • Less pain • Better value</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Open Discectomy</h3>
                <div className="text-2xl font-bold text-green-600 mb-4">₹2,00,000 - ₹3,50,000</div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Traditional open surgery</li>
                    <li>• 2-3 night hospital stay</li>
                    <li>• All medications</li>
                    <li>• Follow-up consultations</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">Longer recovery • More post-op pain</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Endoscopic Discectomy Offers Better Value</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <strong>Same-Day Discharge:</strong> Most patients go home the same day, reducing hospital stay costs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <strong>Faster Recovery:</strong> Return to work in 1-2 weeks vs 4-6 weeks, reducing income loss
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <strong>Less Medication:</strong> Reduced post-operative pain means less medication needed
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <strong>Lower Complication Risk:</strong> Minimally invasive approach reduces infection and complication risks
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12 bg-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Insurance & Payment Options</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Insurance Coverage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Most insurance plans cover slip disc surgery</li>
                  <li>• Cashless insurance available</li>
                  <li>• TPA networks supported</li>
                  <li>• Pre-authorization assistance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Payment Methods</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cashless insurance</li>
                  <li>• Reimbursement claims</li>
                  <li>• EMI options available</li>
                  <li>• Cash, UPI, Credit/Debit Card</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Related Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/services/endoscopic-discectomy-hyderabad" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Endoscopic Discectomy</h3>
                <p className="text-sm text-gray-600">Learn about the minimally invasive procedure</p>
              </Link>
              <Link href="/conditions/slip-disc-treatment-hyderabad" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Slip Disc Treatment</h3>
                <p className="text-sm text-gray-600">Comprehensive treatment options guide</p>
              </Link>
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Sciatica Treatment</h3>
                <p className="text-sm text-gray-600">Understanding sciatica and treatment options</p>
              </Link>
            </div>
          </section>

          <section className="bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Get a Personalized Cost Estimate</h2>
            <p className="text-gray-600 mb-6">
              Contact us for a detailed cost estimate based on your specific condition and MRI findings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Book Consultation
              </Link>
              <Link 
                href="/contact"
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
