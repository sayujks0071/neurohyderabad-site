import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { sources } from '../sources';

const baseMetadata = makeMetadata({
  title: 'Endoscopic vs Microdiscectomy in Hyderabad | Which is Right for You?',
  description: 'Compare incision size, recovery, and candidacy for endoscopic discectomy versus microdiscectomy in Hyderabad.',
  canonicalPath: '/blog/endoscopic-vs-microdiscectomy-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/blog/endoscopic-vs-microdiscectomy-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/blog/endoscopic-vs-microdiscectomy-hyderabad/`,
      'x-default': `${SITE_URL}/blog/endoscopic-vs-microdiscectomy-hyderabad/`,
    },
  },
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/blog/endoscopic-vs-microdiscectomy-hyderabad/`,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Endoscopic vs Microdiscectomy')}&subtitle=${encodeURIComponent('Which is Right for You?')}`,
        width: 1200,
        height: 630,
        alt: 'Endoscopic vs Microdiscectomy — Dr Sayuj Krishnan',
      },
    ],
  },
};

export const revalidate = 86400;

export default function EndoscopicVsMicrodiscectomyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog/" },
          { name: "Endoscopic vs Microdiscectomy", href: "/blog/endoscopic-vs-microdiscectomy-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Endoscopic vs Microdiscectomy: Choosing the Right Approach for Your Herniated Disc</h1>
            <div className="text-sm text-gray-600 mb-4">
              <span>Published: October 2, 2025</span>
              <span className="mx-2">•</span>
              <span>Last reviewed by Dr Sayuj Krishnan</span>
            </div>
          </header>

          <div className="prose max-w-none">
            <section className="mb-8">
              <p className="text-lg text-gray-700">
                When facing herniated disc surgery (typically for <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 hover:underline">sciatica</Link> relief), you'll often hear about two main techniques: endoscopic discectomy and microdiscectomy. Both are effective, minimally invasive procedures, but they differ in approach, incision size, and recovery. Understanding these differences helps you make an informed decision with your surgeon.
              </p>
            </section>

            <section className="mb-8">
              <h2>Quick Comparison at a Glance</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-4 text-left">Feature</th>
                      <th className="p-4 text-left">Endoscopic Discectomy</th>
                      <th className="p-4 text-left">Microdiscectomy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Incision Size</td>
                      <td className="p-4">7-8 mm (keyhole)</td>
                      <td className="p-4">15-25 mm (small open)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Muscle Damage</td>
                      <td className="p-4">Minimal (dilated, not cut)</td>
                      <td className="p-4">Mild (some retraction)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Hospital Stay</td>
                      <td className="p-4">Day-care to 1 night</td>
                      <td className="p-4">1-2 nights typically</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Return to Desk Work</td>
                      <td className="p-4">7-14 days</td>
                      <td className="p-4">14-21 days</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Post-op Pain</td>
                      <td className="p-4">Generally lower</td>
                      <td className="p-4">Mild to moderate</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Anesthesia</td>
                      <td className="p-4">Local/sedation or general</td>
                      <td className="p-4">General anesthesia</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Best For</td>
                      <td className="p-4">Soft disc herniation, foraminal stenosis</td>
                      <td className="p-4">Larger fragments, canal stenosis, complex cases</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold">Success Rate</td>
                      <td className="p-4">85-95% (comparable)</td>
                      <td className="p-4">85-95% (gold standard)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2>What is Endoscopic Discectomy?</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-4">
                  Endoscopic discectomy uses a narrow tube (7-8 mm) with a built-in camera and instruments. The surgeon makes a tiny incision, dilates the tissues (rather than cutting), and removes the herniated disc fragment under direct video visualization.
                </p>
                
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Key Advantages:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Smaller Incision:</strong> Less than 1 cm, often heals with minimal scarring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Muscle-Sparing:</strong> Tissues are dilated, not cut, preserving muscle integrity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Less Post-op Pain:</strong> Reduced tissue trauma leads to faster pain relief</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Faster Recovery:</strong> Many patients return to light activities within days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Day-Care Potential:</strong> Often performed as same-day discharge procedure</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3 text-blue-700">Considerations:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Learning Curve:</strong> Requires specialized training and experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Patient Selection:</strong> Best for soft disc herniations without extensive canal stenosis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Equipment:</strong> Requires dedicated endoscopic spine surgery setup</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2>What is Microdiscectomy?</h2>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-4">
                  Microdiscectomy is the gold-standard open procedure performed through a small (1.5-2.5 cm) incision. The surgeon uses a surgical microscope for magnification and carefully retracts muscles to access the spine, remove the herniated disc, and decompress the nerve.
                </p>
                
                <h3 className="text-lg font-semibold mb-3 text-green-700">Key Advantages:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Gold Standard:</strong> Decades of proven outcomes and research</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Versatile:</strong> Handles complex cases, large fragments, bony stenosis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Direct Visualization:</strong> Broader surgical field for thorough decompression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Widely Available:</strong> Most spine surgeons are trained in this technique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Excellent Outcomes:</strong> 85-95% success rate for leg pain relief</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3 text-green-700">Considerations:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Larger Incision:</strong> 1.5-2.5 cm vs 7-8 mm for endoscopic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Muscle Retraction:</strong> Some temporary muscle disruption, though still minimally invasive</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Recovery Time:</strong> Slightly longer return to activities compared to endoscopic</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2>Which Patients Are Best Candidates for Each?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-500">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Ideal for Endoscopic Discectomy</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Soft, contained disc herniation</li>
                    <li>✓ Single-level pathology</li>
                    <li>✓ Foraminal or far-lateral herniation</li>
                    <li>✓ Minimal canal stenosis</li>
                    <li>✓ Younger patients seeking faster return</li>
                    <li>✓ Patients preferring local anesthesia option</li>
                    <li>✓ Day-care surgery candidates</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-500">
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Ideal for Microdiscectomy</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Large or sequestered disc fragments</li>
                    <li>✓ Significant canal stenosis</li>
                    <li>✓ Multi-level pathology</li>
                    <li>✓ Recurrent herniation</li>
                    <li>✓ Complex anatomy requiring wider exposure</li>
                    <li>✓ Need for concurrent decompression/laminectomy</li>
                    <li>✓ Cases where endoscopic view is limited</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>Recovery Timeline Comparison</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Discectomy Recovery</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-800">First 24 Hours:</p>
                      <p className="text-gray-700">Day-care discharge common. Walking encouraged within hours. Mild incisional discomfort.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Week 1:</p>
                      <p className="text-gray-700">Light household activities. Short walks. Most leg pain resolved or significantly improved.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Weeks 2-4:</p>
                      <p className="text-gray-700">Return to desk work. Gradual increase in activity. Avoid heavy lifting.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Weeks 4-6:</p>
                      <p className="text-gray-700">Return to most activities. Start physical therapy if recommended.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">3 Months:</p>
                      <p className="text-gray-700">Full return to activities including sports and heavy work.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Microdiscectomy Recovery</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-800">First 24-48 Hours:</p>
                      <p className="text-gray-700">1-2 night hospital stay. Walking encouraged. Moderate incisional pain managed with medications.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Week 1-2:</p>
                      <p className="text-gray-700">Home rest with light walking. Leg pain typically much improved. Some back soreness normal.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Weeks 2-4:</p>
                      <p className="text-gray-700">Gradual increase in activities. Return to light desk work around week 2-3.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Weeks 4-6:</p>
                      <p className="text-gray-700">Return to most normal activities. Physical therapy may begin.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">3-6 Months:</p>
                      <p className="text-gray-700">Full recovery. Return to all activities including heavy lifting and sports.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>Success Rates and Outcomes: Are They Equal?</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  <strong>The good news:</strong> When the right technique is chosen for the right patient, both endoscopic and microdiscectomy have excellent, comparable outcomes.
                </p>
                
                <h3 className="font-semibold text-gray-800 mb-3">Clinical Evidence:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pain Relief:</strong> Both achieve 85-95% success in relieving leg pain from herniated discs</li>
                  <li>• <strong>Complication Rates:</strong> Very low for both (infection, bleeding, nerve injury &lt;1-2%)</li>
                  <li>• <strong>Recurrence:</strong> Similar recurrence rates (5-10% over 5 years) when proper technique and patient selection applied</li>
                  <li>• <strong>Patient Satisfaction:</strong> High satisfaction with both, though endoscopic may have slight edge on cosmetic outcome and early recovery</li>
                </ul>

                <p className="text-gray-700 mt-4 font-semibold">
                  The key is not "which is better overall" but "which is better for YOUR specific case." This is determined by your MRI, symptoms, anatomy, and lifestyle goals.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2>Cost Considerations</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Costs vary based on hospital, room category, and insurance coverage. Generally:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Endoscopic Discectomy:</strong> May have slightly higher instrument costs but offset by shorter hospital stay and day-care potential</li>
                  <li>• <strong>Microdiscectomy:</strong> Standard microsurgical equipment, typically 1-2 night stay</li>
                  <li>• <strong>Insurance:</strong> Both are covered by most major health plans when medically indicated</li>
                  <li>• <strong>Net Cost:</strong> Often comparable after considering all factors</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <Link href="/blog/endoscopic-discectomy-cost-hyderabad" className="text-blue-600 hover:underline">
                    Read our detailed guide on endoscopic discectomy costs →
                  </Link>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2>How We Decide: The Consultation Process</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-700 mb-4">
                  During your consultation, Dr Sayuj Krishnan will:
                </p>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                    <div>
                      <p className="font-semibold text-gray-800">Review Your MRI in Detail</p>
                      <p className="text-gray-700">Assess disc fragment size, location, canal stenosis, nerve compression</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                    <div>
                      <p className="font-semibold text-gray-800">Understand Your Symptoms and Goals</p>
                      <p className="text-gray-700">How quickly do you need to return to work? Physical demands of your job? Recovery preferences?</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                    <div>
                      <p className="font-semibold text-gray-800">Discuss Both Options Candidly</p>
                      <p className="text-gray-700">If you're a candidate for both, we'll explain pros/cons specific to your case</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">4</span>
                    <div>
                      <p className="font-semibold text-gray-800">Recommend the Best Approach</p>
                      <p className="text-gray-700">Based on evidence, experience, and your unique situation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">5</span>
                    <div>
                      <p className="font-semibold text-gray-800">Address Your Questions</p>
                      <p className="text-gray-700">No question is too small—we want you fully informed and confident</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <section id="faqs" className="mb-8">
              <h2>Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Is endoscopic always better because it's newer?</h3>
                  <p className="text-gray-700">
                    Not necessarily. Endoscopic is excellent for the right cases, but microdiscectomy remains the gold standard for complex cases. "Newer" doesn't always mean better—the right technique for YOUR case is what matters.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Can you switch from endoscopic to open during surgery if needed?</h3>
                  <p className="text-gray-700">
                    Yes. In rare cases where endoscopic visualization is inadequate or unexpected findings occur, we can convert to microdiscectomy to ensure safe, complete decompression. This is discussed before surgery.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Will I have less back pain long-term with endoscopic?</h3>
                  <p className="text-gray-700">
                    Both techniques spare most back muscles and have low rates of chronic back pain. Endoscopic may have slightly less early post-op back soreness, but long-term outcomes are very similar.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">How do I know if I'm a candidate for endoscopic?</h3>
                  <p className="text-gray-700">
                    Bring your MRI to consultation. Dr Sayuj will assess disc size, location, canal anatomy, and other factors to determine if endoscopic is feasible and advantageous for you.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Ready to Discuss Which Approach is Best for Your Case?</h3>
              <p className="mb-4">
                Bring your MRI for expert review and personalized surgical planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/appointments"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/services/endoscopic-discectomy-hyderabad/"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Learn More About Endoscopic Surgery
                </Link>
              </div>
            </section>

            <section className="mb-8">
              <h2>Disclaimer</h2>
              <p className="text-sm text-gray-600">
                This comparison is educational and not a substitute for personalized medical advice. The best surgical approach depends on individual anatomy, pathology, and clinical factors determined during consultation and MRI review.
              </p>
            </section>

            <section className="mb-8 space-y-4">
              <ReviewedBy />
              <NAP />
            </section>
          </div>
        </article>
      
      <AuthorByline 
        
        
        publishedOn="2025-01-15"
        updatedOn="2025-10-19"
      />
      
      <SourceList sources={sources['endoscopic-vs-microdiscectomy-hyderabad']} />
      
      <NAP />
      <ReviewedBy />
</main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Endoscopic vs Microdiscectomy: Choosing the Right Approach for Your Herniated Disc",
            "description": "Compare endoscopic and microdiscectomy techniques for herniated disc surgery—incision size, recovery, eligibility, and outcomes to help you decide.",
            "author": {
              "@type": "Person",
              "name": "Dr Sayuj Krishnan",
              "url": `${SITE_URL}/about/`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dr Sayuj Krishnan - Neurosurgeon",
              "url": SITE_URL
            },
            "datePublished": "2025-10-02",
            "dateModified": "2025-10-02",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${SITE_URL}/blog/endoscopic-vs-microdiscectomy-hyderabad/`
            },
            "image": `${SITE_URL}/api/og?title=${encodeURIComponent("Endoscopic vs Microdiscectomy")}`
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
                "name": "Is endoscopic always better because it's newer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Not necessarily. Endoscopic is excellent for the right cases, but microdiscectomy remains the gold standard for complex cases. 'Newer' doesn't always mean better—the right technique for YOUR case is what matters."
                }
              },
              {
                "@type": "Question",
                "name": "Can you switch from endoscopic to open during surgery if needed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. In rare cases where endoscopic visualization is inadequate or unexpected findings occur, we can convert to microdiscectomy to ensure safe, complete decompression."
                }
              },
              {
                "@type": "Question",
                "name": "Will I have less back pain long-term with endoscopic?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both techniques spare most back muscles and have low rates of chronic back pain. Endoscopic may have slightly less early post-op back soreness, but long-term outcomes are very similar."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
