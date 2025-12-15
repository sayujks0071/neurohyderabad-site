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

const baseMetadata = makeMetadata({
  title: 'Spine Surgery Cost in Hyderabad | Price Guide & Insurance 2025',
  description: 'Complete guide to spine surgery costs in Hyderabad including endoscopic discectomy, spinal fusion, and minimally invasive procedures. Insurance coverage and payment options explained.',
  canonicalPath: '/services/spine-surgery-cost-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/spine-surgery-cost-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan S - Neurosurgeon in Hyderabad',
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

export default function SpineSurgeryCostPage() {
  const pageUrl = `${SITE_URL}/services/spine-surgery-cost-hyderabad`;
  const faqs = [
    {
      question: 'How much does spine surgery cost in Hyderabad?',
      answer:
        'Costs vary by diagnosis (disc vs stenosis vs instability), number of levels, implant needs, and insurance type. In Hyderabad, single-level minimally invasive procedures are often lower than complex multi-level reconstructions. We share a written estimate after MRI review.',
    },
    {
      question: 'What are realistic self-pay ranges for common spine surgeries?',
      answer:
        'As a planning guide: endoscopic discectomy packages are commonly ₹95,000–₹1,35,000; endoscopic stenosis decompression often ₹1,25,000–₹2,25,000; and fusion (TLIF/ACDF) can range ₹2,75,000–₹5,50,000 depending on implants and levels. Final pricing depends on your case and hospital category.',
    },
    {
      question: 'Does insurance cover spine surgery in Hyderabad?',
      answer:
        'Often yes, but coverage depends on your policy, waiting periods, network status, and exclusions. Cashless pathways may be possible if your insurer/TPA supports the hospital. Device/implant and consumables coverage varies widely.',
    },
    {
      question: 'What usually increases the bill?',
      answer:
        'Multi-level surgery, revision surgery, implants, extended hospital stay, ICU monitoring, advanced navigation/monitoring, and added investigations can increase cost. Complex medical conditions can also require additional optimisation and monitoring.',
    },
    {
      question: 'Is endoscopic surgery always cheaper than open surgery?',
      answer:
        'Not always on the “procedure line item”, but it can reduce total cost through shorter stay, fewer opioids, and quicker return to work. The right choice depends on what is safest and most durable for your diagnosis.',
    },
    {
      question: 'How do I get a personalised estimate?',
      answer:
        'Share your MRI report/images and a brief symptom summary (duration, leg pain/weakness, walking limit). If you have insurance, share your insurer/TPA and policy details. We then confirm the likely procedure options and provide an itemised estimate.',
    },
  ];
  const procedures = [
    {
      name: 'Endoscopic Discectomy',
      cost: '₹95,000 – ₹1,35,000',
      includes: ['Surgeon + OT charges', 'Typical day-care/short stay', 'Medications', 'Follow-up plan'],
      notes: 'Same-day discharge possible'
    },
    {
      name: 'Endoscopic Decompression (Stenosis/ULBD)',
      cost: '₹1,25,000 – ₹2,25,000',
      includes: ['Surgeon + OT charges', 'Short stay (often 1 night)', 'Medications', 'Follow-up plan'],
      notes: 'Depends on level count and stenosis complexity'
    },
    {
      name: 'Spinal Fusion (TLIF / ACDF)',
      cost: '₹2,75,000 – ₹5,50,000',
      includes: ['Surgery', 'Implants', '2–4 night stay typical', 'Medications', 'Follow-up plan'],
      notes: 'Range varies mainly by implant system and levels'
    },
    {
      name: 'Open Discectomy',
      cost: '₹1,50,000 – ₹3,50,000',
      includes: ['Surgery', '2–3 night stay typical', 'Medications', 'Follow-up plan'],
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
              <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91 97782 80044</a> •
              <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline ml-2">hellodr@drsayuj.info</a> •
              <Link href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</Link>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">How to read these price ranges</h2>
            <p className="text-gray-700">
              Prices on this page are meant for planning and transparency, not as a final quote. Your final estimate depends on MRI findings,
              nerve compression severity, number of spinal levels involved, medical fitness, and whether implants are required.
            </p>
            <p className="text-gray-700">
              If you’re exploring day-care options, see: <Link href="/services/awake-spine-surgery-hyderabad">Awake Spine Surgery in Hyderabad</Link> and{' '}
              <Link href="/services/endoscopic-spine-surgery-hyderabad">Endoscopic Spine Surgery in Hyderabad</Link>.
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
                Contact us at <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91 97782 80044</a> to verify your insurance eligibility.
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
            <SourceList sources={ARTICLE_SOURCES} heading="References" />
            <ReviewedBy lastReviewed="2025-11-25" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
