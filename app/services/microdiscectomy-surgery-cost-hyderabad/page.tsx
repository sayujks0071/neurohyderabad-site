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
  title: 'Microdiscectomy Surgery Cost in Hyderabad | 2026 Price Guide',
  description: 'Detailed guide to microdiscectomy surgery cost in Hyderabad. Compare prices for open vs. tubular microdiscectomy, insurance coverage, and recovery benefits.',
  canonicalPath: '/services/microdiscectomy-surgery-cost-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/microdiscectomy-surgery-cost-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Microdiscectomy%20Surgery%20Cost%20Hyderabad&subtitle=2026%20Price%20Guide`,
        width: 1200,
        height: 630,
        alt: 'Microdiscectomy Surgery Cost - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Microdiscectomy%20Surgery%20Cost%20Hyderabad&subtitle=2026%20Price%20Guide`],
  },
};

const ARTICLE_SOURCES = getServiceSources('microdiscectomy-surgery-cost-hyderabad') || [];

// FAQ Data
const faqs = [
  {
    question: "What is the cost of microdiscectomy in Hyderabad?",
    answer: "The cost of microdiscectomy in Hyderabad typically ranges from ₹2,20,000 to ₹3,50,000. This varies based on room category, hospital choice, and whether implants (if any) are required. It is generally slightly more affordable than fully endoscopic options but offers excellent outcomes."
  },
  {
    question: "Is microdiscectomy covered by insurance?",
    answer: "Yes, microdiscectomy is a standard, medically necessary procedure for herniated discs and is covered by almost all health insurance policies in India. We offer cashless facilities at Yashoda Hospital."
  },
  {
    question: "How does microdiscectomy cost compare to open surgery?",
    answer: "Microdiscectomy may cost ₹20,000–₹40,000 more than traditional open laminectomy due to the use of an operating microscope and specialized instrumentation, but the faster recovery and reduced hospital stay often make the total cost comparable."
  }
];

export default function MicrodiscectomyCostPage() {
  const pageUrl = `${SITE_URL}/services/microdiscectomy-surgery-cost-hyderabad`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Microdiscectomy Surgery Cost Hyderabad', path: '/services/microdiscectomy-surgery-cost-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={pageUrl} />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Microdiscectomy Surgery Cost in Hyderabad</h1>
            <AuthorByline
              publishedOn="2026-01-18"
              updatedOn="2026-01-18"
              className="justify-center"
            />
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              A comprehensive guide to the cost of Microdiscectomy (Lumbar Decompression), typically used for treating severe <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 hover:underline">sciatica</Link> and slip disc. Includes procedure details, insurance coverage, and price comparisons.
            </p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-center">
              <strong>Get a Quote:</strong>
              <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
              <Link href="/appointments" className="text-blue-600 hover:underline ml-2">Book Appointment</Link>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Cost Breakdown: Microdiscectomy vs Open Surgery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Microdiscectomy (Microscope Assisted)</h3>
                <div className="text-2xl font-bold text-green-600 mb-4">₹2,20,000 - ₹3,50,000</div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Package Typically Includes:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Operating Microscope charges</li>
                    <li>• 2-3 days hospital stay</li>
                    <li>• Surgeon & Anesthetist fees</li>
                    <li>• Nursing & OT charges</li>
                  </ul>
                </div>
                <p className="text-sm text-blue-600 font-medium">✓ Gold Standard • High Precision • Minimal Tissue Damage</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Traditional Open Laminectomy</h3>
                <div className="text-2xl font-bold text-green-600 mb-4">₹2,00,000 - ₹3,00,000</div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Package Typically Includes:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Standard surgical equipment</li>
                    <li>• 3-5 days hospital stay</li>
                    <li>• Surgeon & Anesthetist fees</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">Larger incision • Longer recovery</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Factors Influencing the Cost</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">•</span>
                  <div>
                    <strong>Hospital Room Category:</strong> Costs vary significantly between General Ward, Twin Sharing, and Private Rooms.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">•</span>
                  <div>
                    <strong>Duration of Stay:</strong> While microdiscectomy usually requires 1-2 nights, any extended stay due to pre-existing conditions (diabetes, heart issues) can increase costs.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">•</span>
                  <div>
                    <strong>Implants:</strong> Pure decompression/discectomy involves no implants. If stabilization (screws/rods) is needed, costs increase.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12 bg-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Insurance & Financing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Health Insurance</h3>
                <p className="text-gray-700 mb-4">
                  Microdiscectomy is a standard, IRDAI-recognized procedure.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Covered by Star, HDFC Ergo, Max Bupa, etc.</li>
                  <li>• Corporate Group Insurance usually covers it from Day 1.</li>
                  <li>• Cashless processing available.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Self-Pay Options</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Transparent package pricing</li>
                  <li>• No hidden OT charges</li>
                  <li>• EMI options through hospital partners</li>
                </ul>
              </div>
            </div>
          </section>

           {/* Visible FAQ Section */}
           <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Explore More</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/services/minimally-invasive-spine-surgery" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Minimally Invasive Spine Surgery</h3>
                <p className="text-sm text-gray-600">Overview of MISS techniques</p>
              </Link>
              <Link href="/blog/microdiscectomy-vs-laminectomy-recovery-comparison" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Recovery Comparison</h3>
                <p className="text-sm text-gray-600">Microdiscectomy vs Laminectomy</p>
              </Link>
              <Link href="/services/slip-disc-surgery-cost-hyderabad" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Slip Disc Cost</h3>
                <p className="text-sm text-gray-600">General pricing for herniated discs</p>
              </Link>
            </div>
          </section>

          <section className="bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Need a Cost Estimate?</h2>
            <p className="text-gray-600 mb-6">
              Send us your MRI report for a provisional estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointments"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
              <a
                href="https://wa.me/919778280044"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-600 hover:text-white transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </section>

          <section className="mt-12 space-y-6">
            <div className="mt-12">
              <LocalPathways mode="service" />
            </div>
            <SourceList sources={ARTICLE_SOURCES} heading="References" />
            <ReviewedBy lastReviewed="2026-01-18" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
