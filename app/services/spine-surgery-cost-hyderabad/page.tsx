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
  title: 'Spine Surgery Cost in Hyderabad 2025 | TESS, Fusion & Implants Price',
  description: 'Detailed spine surgery cost guide for Hyderabad. Endoscopic TESS (₹2.5L+), Microdiscectomy, and Implant prices (Indian vs Imported). Cashless Insurance accepted.',
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
        url: `${SITE_URL}/api/og?title=Spine%20Surgery%20Cost%20in%20Hyderabad&subtitle=2025%20Price%20Guide%20%26%20Packages`,
        width: 1200,
        height: 630,
        alt: 'Spine Surgery Cost Guide Hyderabad - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Spine%20Surgery%20Cost%20in%20Hyderabad&subtitle=2025%20Price%20Guide%20%26%20Packages`],
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
      "name": "How much does endoscopic spine surgery cost in Hyderabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The cost of endoscopic spine surgery in Hyderabad typically ranges from ₹2,50,000 to ₹4,00,000 depending on the technique (TESS vs Interlaminar) and hospital category. This includes surgeon fees, theatre charges, and a 1-night hospital stay."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cost of titanium spine implants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spine implants (screws and rods) are charged separately. High-grade Indian titanium implants cost approx. ₹35,000–₹50,000 per level, while imported (US/German) FDA-approved implants range from ₹60,000–₹1,00,000 per level."
      }
    },
    {
      "@type": "Question",
      "name": "Is spine surgery covered by insurance in Hyderabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, nearly all comprehensive health insurance policies cover spine surgery (discectomy, fusion, laminectomy). We accept cashless claims from major providers like Star Health, HDFC Ergo, Niva Bupa, SBI General, and ICICI Lombard at Yashoda Hospital."
      }
    },
    {
      "@type": "Question",
      "name": "Why is endoscopic surgery cost higher than open surgery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic surgery requires specialized disposable kits, high-definition cameras, and advanced burrs, which increases the consumable cost. However, the total cost often balances out due to shorter hospital stays (1 day vs 3-4 days) and faster return to work."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any hidden costs in the package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our cost estimates are transparent. The package includes surgeon fees, OT charges, room rent, and standard consumables. Implants (screws/cages) are charged separately at MRP as per your choice (Indian vs Imported). Pre-op investigations (MRI/Blood tests) and post-discharge medicines are extra."
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
      name: 'Transforaminal Endoscopic (TESS)',
      cost: '₹2,50,000 - ₹3,50,000',
      category: 'Endoscopic (Stitchless)',
      includes: ['Surgeon & Asst Fees', 'OT & C-Arm Charges', 'Endoscope Kit', '1-Day Room Rent'],
      notes: 'Best for lateral disc herniations. Walk same day.'
    },
    {
      name: 'Interlaminar Endoscopic (IESS)',
      cost: '₹2,80,000 - ₹4,00,000',
      category: 'Endoscopic (Stenosis)',
      includes: ['Surgeon Fees', 'OT Charges', 'Burr/Drill Charges', '1-2 Days Room Rent'],
      notes: 'For L5-S1 disc and spinal stenosis.'
    },
    {
      name: 'Cervical Endoscopic Discectomy',
      cost: '₹3,00,000 - ₹4,50,000',
      category: 'Cervical (Neck)',
      includes: ['Anterior Approach', 'Neck Brace', 'Physiotherapy', '1-2 Days Stay'],
      notes: 'Keyhole surgery for neck pain/radiculopathy.'
    },
    {
      name: 'MIS-TLIF (Spinal Fusion)',
      cost: '₹3,50,000 - ₹5,50,000',
      category: 'Fusion Surgery',
      includes: ['Surgery Charges', '3-4 Days Stay', 'Bone Graft', 'Post-op Brace'],
      notes: 'Plus Implant Cost (see below). For instability.'
    },
    {
      name: 'Microdiscectomy (Gold Standard)',
      cost: '₹2,20,000 - ₹3,20,000',
      category: 'Microscopic',
      includes: ['Microscope Usage', '2-Days Stay', 'Medications', 'Follow-up'],
      notes: 'Tried and tested standard approach.'
    },
    {
      name: 'Vertebroplasty (Cement)',
      cost: '₹1,50,000 - ₹2,50,000',
      category: 'Fracture Care',
      includes: ['Bone Cement Kit', 'Needle Kit', 'OT Charges', 'Day Care'],
      notes: 'For osteoporotic compression fractures.'
    }
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Spine Surgery Cost', path: '/services/spine-surgery-cost-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={pageUrl} />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Spine Surgery Cost in Hyderabad <span className="text-blue-600 block text-2xl md:text-3xl mt-2 font-medium">2025 Price Guide</span></h1>
            <AuthorByline
              publishedOn="2025-11-25"
              updatedOn="2025-11-25"
              className="justify-center"
            />
            <p className="text-lg text-gray-700 mt-6 max-w-3xl mx-auto leading-relaxed">
              Transparent pricing for world-class spine care. Compare costs for <strong>Endoscopic Spine Surgery</strong>, <strong>Microdiscectomy</strong>, and <strong>Spinal Fusion</strong> at Yashoda Hospital.
            </p>
          </header>

          <section className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-12 text-center shadow-sm">
            <p className="text-gray-800 font-medium">
              Need a formal medical estimate for insurance approval?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <a href="tel:+919778280044" className="flex items-center bg-white px-4 py-2 rounded-full text-blue-700 border border-blue-200 hover:shadow-md transition-all">
                📞 Call: +91-9778280044
              </a>
              <a href="https://wa.me/919778280044" className="flex items-center bg-[#25D366] px-4 py-2 rounded-full text-white hover:bg-[#128C7E] transition-all">
                💬 WhatsApp Estimate
              </a>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Procedure Cost Breakdown</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {procedures.map((procedure, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{procedure.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{procedure.name}</h3>
                  <div className="text-2xl font-bold text-green-700 mb-4">{procedure.cost}</div>
                  <div className="mb-4 flex-grow">
                    <ul className="space-y-2 text-sm text-gray-600">
                      {procedure.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                           <span className="text-green-500 mr-2">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                     <p className="text-sm text-gray-500 italic">💡 {procedure.notes}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center italic">
              *Prices are indicative estimates for General Ward/Twin Sharing. Final cost depends on medical complexity and room category.
            </p>
          </section>

          <section className="mb-14 bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Implants & Consumables Cost (Extra)</h2>
            <p className="text-gray-700 mb-6">
              For spinal fusion (screws/rods) or stabilization, implant costs are charged separately based on your choice of brand/material.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h3 className="text-lg font-bold text-gray-900 mb-2">🇮🇳 Indian High-Grade Titanium</h3>
                 <p className="text-2xl font-bold text-blue-700 mb-2">₹35,000 - ₹50,000 <span className="text-sm font-normal text-gray-500">/ level</span></p>
                 <p className="text-sm text-gray-600">ISO/CE certified Indian brands. Excellent durability and widely used.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h3 className="text-lg font-bold text-gray-900 mb-2">🇺🇸 Imported (US/German)</h3>
                 <p className="text-2xl font-bold text-blue-700 mb-2">₹60,000 - ₹1,00,000 <span className="text-sm font-normal text-gray-500">/ level</span></p>
                 <p className="text-sm text-gray-600">FDA approved brands (Medtronic, J&J, etc.). Premium finish and extensive R&D.</p>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Insurance & Cashless Facility</h2>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-gray-700 mb-6 text-lg">
                  We accept <strong>Cashless Insurance</strong> from all major TPA and Insurance providers at Yashoda Hospital. Our dedicated desk handles pre-authorization so you can focus on recovery.
                </p>
                <h3 className="font-bold text-gray-900 mb-4">Accepted Partners Include:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                   {['Star Health', 'HDFC Ergo', 'Niva Bupa', 'SBI General', 'ICICI Lombard', 'Care Health', 'United India', 'New India', 'Bajaj Allianz', 'MediAssist', 'Vidal Health', 'FHPL'].map(insurer => (
                     <div key={insurer} className="flex items-center justify-center bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:border-blue-300 transition-colors">
                       <span className="text-sm font-medium text-gray-800">{insurer}</span>
                     </div>
                   ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 italic">*And all other IRDAI approved insurers.</p>
              </div>
              <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Insurance Checklist</h3>
                <ul className="space-y-4">
                   <li className="flex items-start">
                     <span className="bg-blue-500 p-1 rounded mr-3">📄</span>
                     <span className="text-sm"><strong>Policy Copy:</strong> Bring your physical or digital insurance card.</span>
                   </li>
                   <li className="flex items-start">
                     <span className="bg-blue-500 p-1 rounded mr-3">🆔</span>
                     <span className="text-sm"><strong>KYC:</strong> Aadhar Card & PAN Card of the patient.</span>
                   </li>
                   <li className="flex items-start">
                     <span className="bg-blue-500 p-1 rounded mr-3">🕒</span>
                     <span className="text-sm"><strong>History:</strong> Past 2 years treatment records (if any).</span>
                   </li>
                   <li className="flex items-start">
                     <span className="bg-blue-500 p-1 rounded mr-3">👨‍⚕️</span>
                     <span className="text-sm"><strong>Reports:</strong> Previous MRI/X-Ray films or CDs.</span>
                   </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-blue-500">
                   <p className="text-sm opacity-90 mb-3">Not sure if your policy covers surgery?</p>
                   <a
                     href="https://wa.me/919778280044?text=Hi%20Dr%20Sayuj,%20I%20want%20to%20check%20my%20insurance%20eligibility%20for%20spine%20surgery"
                     className="block w-full text-center bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                   >
                     Check Eligibility on WhatsApp
                   </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14 bg-green-50 border border-green-100 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                 <h2 className="text-2xl font-bold text-green-900 mb-3">Financial Aid & EMI Options</h2>
                 <p className="text-gray-700 mb-4">
                   We understand that medical expenses can be unplanned. To make world-class spine care accessible, we support flexible payment options.
                 </p>
                 <ul className="space-y-2 text-sm text-green-800 font-medium">
                    <li className="flex items-center">✓ 0% Interest EMI Options (Bajaj Finserv / Credit Cards)</li>
                    <li className="flex items-center">✓ Medical Loan Assistance</li>
                    <li className="flex items-center">✓ Split Payment (Insurance + Self Pay)</li>
                 </ul>
               </div>
               <div className="flex-shrink-0">
                  <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm text-center">
                     <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">EMI Starting From</p>
                     <p className="text-2xl font-bold text-green-700">₹8,500<span className="text-sm text-gray-400 font-normal">/mo</span></p>
                     <p className="text-xs text-gray-400 mt-1">*Subject to approval</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Cost Varies?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hospital Room Category</h3>
                <p className="text-gray-700">
                   Prices vary significantly between General Ward, Twin Sharing, and Private Rooms. Procedure charges (OT, Surgeon) often scale with the room category in corporate hospitals.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Complexity</h3>
                <p className="text-gray-700">
                   A straightforward single-level disc is cheaper than a multi-level compression or a revision surgery (re-do of previous surgery), which takes more time and skill.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Technology Used</h3>
                <p className="text-gray-700">
                   Use of specialized equipment like <strong>Neuromonitoring</strong> (to protect nerves), <strong>High-speed Burrs</strong>, or <strong>Microscopes</strong> adds consumable costs but increases safety.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Length of Stay</h3>
                <p className="text-gray-700">
                   Endoscopic surgery allows discharge in 24 hours. Open surgery might need 3-4 days. While the endoscopic kit is costly, the saved room rent often balances the total bill.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10 rounded-2xl text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get a Transparent Quote Today</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              No hidden charges. Share your MRI report for a personalized treatment plan and cost estimate from Dr. Sayuj Krishnan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments/"
                className="bg-white text-blue-900 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors font-bold text-lg shadow-md"
              >
                Book Consultation
              </Link>
              <Link 
                href="https://wa.me/919778280044"
                className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-md flex items-center justify-center"
              >
                <span className="mr-2">WhatsApp MRI</span>
              </Link>
            </div>
          </section>

          <section className="mt-16 space-y-8">
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
