import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../src/lib/seo';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import ServicePageTracker from '../../../src/components/ServicePageTracker';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';

const baseMetadata = makeMetadata({
  title: 'Cooled Radiofrequency Ablation Hyderabad | Dr. Sayuj Krishnan',
  description: 'Advanced cooled radiofrequency ablation for chronic pain relief in Hyderabad. Long-lasting nerve ablation for facet joints, sacroiliac joints, and trigeminal neuralgia with Dr. Sayuj Krishnan.',
  canonicalPath: '/services/cooled-radiofrequency-ablation-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'cooled radiofrequency ablation',
    'radiofrequency ablation hyderabad',
    'facet joint ablation',
    'sacroiliac joint ablation',
    'chronic pain treatment',
    'nerve ablation procedure',
    'RFA treatment hyderabad',
    'cooled RFA',
    'facet joint pain treatment',
    'trigeminal neuralgia ablation',
    'minimally invasive pain relief',
    'radiofrequency neurotomy',
  ],
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/cooled-radiofrequency-ablation-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Cooled%20Radiofrequency%20Ablation&subtitle=Advanced%20Chronic%20Pain%20Treatment`,
        width: 1200,
        height: 630,
        alt: 'Cooled Radiofrequency Ablation - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Cooled%20Radiofrequency%20Ablation&subtitle=Advanced%20Chronic%20Pain%20Treatment`],
  },
};

const ARTICLE_SOURCES = getServiceSources('cooled-radiofrequency-ablation-hyderabad');

export default function CooledRadiofrequencyAblationPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Cooled Radiofrequency Ablation', path: '/services/cooled-radiofrequency-ablation-hyderabad' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Cooled Radiofrequency Ablation in Hyderabad</h1>
          <AuthorByline
            publishedOn="2025-01-15"
            updatedOn="2025-01-15"
            className="justify-center"
          />
          <p className="text-lg text-gray-600 mt-4">
            Advanced minimally invasive procedure for long-lasting chronic pain relief through targeted nerve ablation
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
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Cooled Radiofrequency Ablation?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Cooled radiofrequency ablation (cooled RFA) is an advanced, minimally invasive procedure that uses 
              cooled radiofrequency energy to create larger, more effective lesions on targeted nerves, providing 
              long-lasting pain relief for chronic pain conditions. Unlike traditional radiofrequency ablation, the 
              cooling technology allows for larger treatment zones while protecting surrounding tissues.
            </p>
            <p className="text-gray-700 mb-6">
              This innovative technique is particularly effective for treating facet joint pain, sacroiliac joint 
              pain, and certain types of trigeminal neuralgia. The procedure can provide pain relief lasting 12-24 
              months, significantly longer than traditional RFA treatments.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-gray-700">
                <strong>Key Advantage:</strong> Cooled RFA creates lesions up to 3-4 times larger than traditional 
                RFA, resulting in more comprehensive nerve coverage and longer-lasting pain relief.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">How Cooled RFA Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Technology</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Water-cooled radiofrequency probe</li>
                <li>• Precise temperature control (60-80°C)</li>
                <li>• Real-time monitoring via fluoroscopy</li>
                <li>• Larger lesion creation (up to 8mm diameter)</li>
                <li>• Tissue protection through cooling</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Mechanism</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Radiofrequency energy heats nerve tissue</li>
                <li>• Cooling prevents charring and tissue damage</li>
                <li>• Creates controlled nerve lesion</li>
                <li>• Interrupts pain signal transmission</li>
                <li>• Provides long-term pain relief</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Conditions Treated</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Facet Joint Pain</h3>
              <p className="text-gray-700 mb-3">
                Chronic lower back or neck pain originating from facet joints, often caused by arthritis or injury.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cervical facet joint pain</li>
                <li>• Lumbar facet joint pain</li>
                <li>• Thoracic facet joint pain</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Sacroiliac Joint Pain</h3>
              <p className="text-gray-700 mb-3">
                Pain in the sacroiliac joints connecting the spine to the pelvis, often causing lower back and hip pain.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SI joint dysfunction</li>
                <li>• Post-surgical SI joint pain</li>
                <li>• Inflammatory SI joint conditions</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Trigeminal Neuralgia</h3>
              <p className="text-gray-700 mb-3">
                Severe facial pain caused by trigeminal nerve irritation, when other treatments have failed.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Atypical trigeminal neuralgia</li>
                <li>• Refractory facial pain</li>
                <li>• Post-herpetic neuralgia</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Benefits of Cooled Radiofrequency Ablation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Clinical Advantages</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Longer-lasting pain relief (12-24 months vs 6-12 months)</li>
                <li>• Larger treatment area coverage</li>
                <li>• Higher success rates (85-90%)</li>
                <li>• Reduced need for repeat procedures</li>
                <li>• Better outcomes for complex pain patterns</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Patient Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Minimally invasive outpatient procedure</li>
                <li>• No general anesthesia required</li>
                <li>• Quick recovery (same-day discharge)</li>
                <li>• Reduced medication dependence</li>
                <li>• Improved quality of life</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Who is a Candidate?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Ideal Candidates</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Chronic pain lasting 6+ months</li>
                <li>• Positive response to diagnostic nerve blocks</li>
                <li>• Failed conservative treatments (medications, physiotherapy)</li>
                <li>• Confirmed diagnosis via imaging (MRI/CT)</li>
                <li>• No active infection or bleeding disorders</li>
                <li>• Realistic expectations about outcomes</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Pre-Procedure Evaluation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Comprehensive medical history review</li>
                <li>• Physical examination</li>
                <li>• Diagnostic imaging (MRI/CT scan)</li>
                <li>• Diagnostic nerve block (to confirm source)</li>
                <li>• Discussion of risks and benefits</li>
                <li>• Review of alternative treatments</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">The Procedure</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Preparation</h3>
                <p className="text-gray-700">
                  Patient positioned on fluoroscopy table. Local anesthesia administered at the entry site. 
                  Sedation may be provided for comfort.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Needle Placement</h3>
                <p className="text-gray-700">
                  Under fluoroscopic guidance, a specialized needle is precisely positioned near the target nerve 
                  using anatomical landmarks and imaging.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Sensory Testing</h3>
                <p className="text-gray-700">
                  Low-voltage electrical stimulation confirms correct needle placement by reproducing the patient's 
                  pain pattern.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Cooled RFA Application</h3>
                <p className="text-gray-700">
                  The cooled radiofrequency probe is inserted, and controlled heating (60-80°C) is applied for 
                  2.5-3 minutes per lesion. Cooling prevents tissue charring while creating larger lesions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">5</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Multiple Lesions</h3>
                <p className="text-gray-700">
                  Multiple lesions may be created to cover the entire nerve distribution, ensuring comprehensive 
                  pain relief.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">6</div>
              <div>
                <h3 className="font-semibold text-lg text-blue-700">Recovery</h3>
                <p className="text-gray-700">
                  Patient monitored for 30-60 minutes, then discharged. Most patients can resume normal activities 
                  the next day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery Timeline</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Day of Procedure</h3>
                <p className="text-sm text-gray-600">Outpatient procedure, discharge same day. Rest and avoid strenuous activity.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1-3</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Days 1-3</h3>
                <p className="text-sm text-gray-600">Mild soreness at injection site. Ice packs and over-the-counter pain relief as needed.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 1</h3>
                <p className="text-sm text-gray-600">Return to normal activities. Pain relief typically begins within 1-2 weeks.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2-4</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Weeks 2-4</h3>
                <p className="text-sm text-gray-600">Maximum pain relief achieved. Follow-up appointment to assess outcomes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Cooled RFA vs Traditional RFA</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">Feature</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">Cooled RFA</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">Traditional RFA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Lesion Size</td>
                  <td className="border border-gray-300 px-4 py-3">Up to 8mm diameter</td>
                  <td className="border border-gray-300 px-4 py-3">2-3mm diameter</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Pain Relief Duration</td>
                  <td className="border border-gray-300 px-4 py-3">12-24 months</td>
                  <td className="border border-gray-300 px-4 py-3">6-12 months</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Success Rate</td>
                  <td className="border border-gray-300 px-4 py-3">85-90%</td>
                  <td className="border border-gray-300 px-4 py-3">70-80%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Repeat Procedures</td>
                  <td className="border border-gray-300 px-4 py-3">Less frequent</td>
                  <td className="border border-gray-300 px-4 py-3">More frequent</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Procedure Time</td>
                  <td className="border border-gray-300 px-4 py-3">45-90 minutes</td>
                  <td className="border border-gray-300 px-4 py-3">30-60 minutes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Cost</td>
                  <td className="border border-gray-300 px-4 py-3">Higher (but better value)</td>
                  <td className="border border-gray-300 px-4 py-3">Lower</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Risks and Complications</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-gray-700 mb-4">
              Cooled radiofrequency ablation is generally safe with low complication rates when performed by 
              experienced specialists. Potential risks include:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Temporary soreness</strong> at injection site (common, resolves in 1-3 days)</li>
              <li>• <strong>Bruising or swelling</strong> at needle insertion site (rare, resolves quickly)</li>
              <li>• <strong>Numbness or weakness</strong> (rare, usually temporary)</li>
              <li>• <strong>Infection</strong> at injection site (&lt;1% risk)</li>
              <li>• <strong>Nerve injury</strong> (&lt;1% risk with experienced operator)</li>
              <li>• <strong>Incomplete pain relief</strong> (10-15% of cases may require repeat procedure)</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Note:</strong> Dr. Sayuj Krishnan's extensive experience with interventional pain procedures 
                ensures optimal safety and outcomes. All procedures are performed under fluoroscopic guidance with 
                strict sterile technique.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Related Information</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link href="/conditions/chronic-back-pain-treatment-hyderabad" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
              <h3 className="font-semibold text-blue-700 mb-2">Chronic Back Pain</h3>
              <p className="text-sm text-gray-600">Comprehensive guide to chronic back pain treatment options</p>
            </Link>
            <Link href="/services/peripheral-nerve-surgery-hyderabad" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
              <h3 className="font-semibold text-blue-700 mb-2">Peripheral Nerve Surgery</h3>
              <p className="text-sm text-gray-600">Advanced nerve surgery techniques and procedures</p>
            </Link>
            <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
              <h3 className="font-semibold text-blue-700 mb-2">Trigeminal Neuralgia</h3>
              <p className="text-sm text-gray-600">Understanding trigeminal neuralgia and treatment options</p>
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long does cooled RFA pain relief last?</h3>
              <p className="text-gray-700">
                Cooled radiofrequency ablation typically provides pain relief lasting 12-24 months, significantly 
                longer than traditional RFA (6-12 months). Some patients may experience relief for even longer periods.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is cooled RFA painful?</h3>
              <p className="text-gray-700">
                The procedure is performed under local anesthesia with optional sedation for comfort. Most patients 
                experience minimal discomfort during the procedure. Some temporary soreness at the injection site 
                is normal for 1-3 days after the procedure.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How is cooled RFA different from traditional RFA?</h3>
              <p className="text-gray-700">
                Cooled RFA uses water-cooled probes that create larger lesions (up to 8mm vs 2-3mm) while preventing 
                tissue charring. This results in more comprehensive nerve coverage, longer-lasting pain relief, and 
                higher success rates compared to traditional RFA.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">When will I feel pain relief after the procedure?</h3>
              <p className="text-gray-700">
                Most patients begin to experience pain relief within 1-2 weeks after the procedure. Maximum pain 
                relief is typically achieved within 2-4 weeks as the nerve lesion fully develops.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Can cooled RFA be repeated if pain returns?</h3>
              <p className="text-gray-700">
                Yes, cooled RFA can be repeated if pain returns after the initial treatment period. However, because 
                cooled RFA provides longer-lasting relief, repeat procedures are typically needed less frequently 
                than with traditional RFA.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is cooled RFA covered by insurance?</h3>
              <p className="text-gray-700">
                Most insurance plans cover cooled radiofrequency ablation when medically necessary and performed for 
                appropriate indications. Coverage may vary, so it's best to verify with your insurance provider. 
                Our team can assist with insurance pre-authorization.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Explore Cooled RFA for Your Pain?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for chronic pain conditions 
            using advanced cooled radiofrequency ablation techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/services/peripheral-nerve-surgery-hyderabad/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              All Pain Management Services
            </Link>
          </div>
        </section>



      <div className="not-prose mt-12">
        <LocalPathways mode="service" />
      </div>
      <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2025-01-15" />
          <NAP />
        </section>

        {/* Service Page Tracking */}
        <ServicePageTracker service="cooled-radiofrequency-ablation" />
      </div>
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Cooled Radiofrequency Ablation",
            "alternateName": "Cooled RFA",
            "description": "Advanced minimally invasive procedure using cooled radiofrequency energy to create larger nerve lesions for long-lasting chronic pain relief",
            "url": `${SITE_URL}/services/cooled-radiofrequency-ablation-hyderabad`,
            "procedureType": "TherapeuticProcedure",
            "bodyLocation": ["Facet joints", "Sacroiliac joints", "Trigeminal nerve"],
            "medicalSpecialty": "Neurosurgery",
            "performer": {
              "@type": "Physician",
              "@id": `${SITE_URL}/#physician`,
              "name": "Dr. Sayuj Krishnan",
              "url": SITE_URL
            },
            "areaServed": {
              "@type": "City",
              "name": "Hyderabad",
              "containedInPlace": {
                "@type": "State",
                "name": "Telangana"
              }
            },
            "availableAtOrFrom": {
              "@type": "Hospital",
              "@id": `${SITE_URL}/#hospital`,
              "name": "Yashoda Hospital Malakpet"
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does cooled radiofrequency ablation pain relief last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cooled radiofrequency ablation typically provides pain relief lasting 12-24 months, significantly longer than traditional RFA (6-12 months). Some patients may experience relief for even longer periods."
                }
              },
              {
                "@type": "Question",
                "name": "Is cooled RFA different from traditional RFA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cooled RFA uses water-cooled probes that create larger lesions (up to 8mm vs 2-3mm) while preventing tissue charring. This results in more comprehensive nerve coverage, longer-lasting pain relief, and higher success rates compared to traditional RFA."
                }
              },
              {
                "@type": "Question",
                "name": "When will I feel pain relief after cooled RFA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most patients begin to experience pain relief within 1-2 weeks after the procedure. Maximum pain relief is typically achieved within 2-4 weeks as the nerve lesion fully develops."
                }
              },
              {
                "@type": "Question",
                "name": "What conditions can be treated with cooled radiofrequency ablation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cooled RFA is effective for treating facet joint pain (cervical, thoracic, lumbar), sacroiliac joint pain, and certain types of trigeminal neuralgia. It's particularly beneficial for chronic pain that hasn't responded to conservative treatments."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
