import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../../src/lib/seo";
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { sources } from '../sources';

export const metadata: Metadata = {
  title: "Sciatica Pain Management in Hyderabad | Dr. Sayuj Krishnan",
  description: "Comprehensive guide to sciatica pain management in Hyderabad. Learn about conservative treatments, when surgery is needed, and recovery expectations.",
  keywords: "sciatica pain management hyderabad, sciatica treatment, nerve pain relief, endoscopic discectomy hyderabad",
  alternates: {
    canonical: `${SITE_URL}/blog/sciatica-pain-management-hyderabad`,
  },
  openGraph: {
    title: "Sciatica Pain Management in Hyderabad | Expert Treatment Guide",
    description: "Complete guide to sciatica pain management with Dr. Sayuj Krishnan. Conservative treatments, surgical options, and recovery timeline.",
    url: `${SITE_URL}/blog/sciatica-pain-management-hyderabad`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Sciatica Pain Management in Hyderabad: Complete Treatment Guide",
  "description": "Comprehensive guide to sciatica pain management in Hyderabad. Learn about conservative treatments, when surgery is needed, and recovery expectations.",
  "image": `${SITE_URL}/images/og-default.jpg`,
  "author": {
    "@type": "Person",
    "name": "Dr. Sayuj Krishnan",
    "url": `${SITE_URL}/about`
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dr. Sayuj Krishnan",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/icon.svg`
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-10-19",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/sciatica-pain-management-hyderabad`
  }
};

export default function SciaticaPainManagementPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Sciatica Pain Management in Hyderabad: Complete Treatment Guide
              </h1>
              <div className="flex items-center text-gray-600 mb-6">
                <span>By Dr. Sayuj Krishnan</span>
                <span className="mx-2">•</span>
                <time dateTime="2025-10-10">October 10, 2025</time>
                <span className="mx-2">•</span>
                <span>8 min read</span>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Sciatica affects millions of people worldwide, causing debilitating pain that radiates from the lower back down through the leg. In Hyderabad, Dr. Sayuj Krishnan specializes in both conservative and surgical treatment of sciatica, helping patients return to pain-free living.
              </p>
            </header>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-800 mb-6">Understanding Sciatica</h2>
              <p className="mb-6">
                Sciatica occurs when the sciatic nerve, the longest nerve in your body, becomes compressed or irritated. This nerve runs from your lower spine through your hips and down each leg. When compressed, it causes pain, numbness, tingling, or weakness along its path.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Common Sciatica Symptoms</h3>
                <ul className="space-y-2">
                  <li>• Sharp, burning pain that radiates from lower back to leg</li>
                  <li>• Numbness or tingling in the affected leg</li>
                  <li>• Weakness in leg or foot muscles</li>
                  <li>• Pain that worsens with sitting or standing</li>
                  <li>• Difficulty moving the leg or foot</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-800 mb-6">Conservative Treatment Options</h2>
              
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Physical Therapy</h3>
              <p className="mb-4">
                Physical therapy is often the first line of treatment for sciatica. Our physiotherapists at Yashoda Hospital develop personalized exercise programs that:
              </p>
              <ul className="mb-6 space-y-2">
                <li>• Strengthen core muscles to support the spine</li>
                <li>• Improve flexibility and range of motion</li>
                <li>• Correct posture and movement patterns</li>
                <li>• Reduce nerve compression through targeted exercises</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Medication Management</h3>
              <p className="mb-4">
                Anti-inflammatory medications, muscle relaxants, and nerve pain medications can provide significant relief. We carefully monitor medication effectiveness and adjust dosages as needed.
              </p>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Epidural Steroid Injections</h3>
              <p className="mb-6">
                For severe pain, epidural steroid injections can provide targeted relief by reducing inflammation around the compressed nerve. These injections are performed under image guidance for precision and safety.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-800 mb-6">When Surgery is Recommended</h2>
              <p className="mb-6">
                Surgery is considered when conservative treatments fail to provide adequate relief after 6-12 weeks, or when there are signs of severe nerve compression such as:
              </p>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">Warning Signs Requiring Immediate Attention</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Progressive weakness in leg or foot</li>
                  <li>• Loss of bowel or bladder control</li>
                  <li>• Severe pain that doesn't respond to medication</li>
                  <li>• Numbness in the saddle area</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Endoscopic Discectomy</h3>
              <p className="mb-4">
                Dr. Sayuj Krishnan specializes in endoscopic discectomy, a minimally invasive procedure that removes the herniated disc material compressing the sciatic nerve. <Link href="/services/endoscopic-spine-surgery-hyderabad/" className="text-blue-600 hover:underline">In severe cases, an endoscopic spine surgery in Hyderabad may be the fastest path to relief.</Link> This procedure offers:
              </p>
              <ul className="mb-6 space-y-2">
                <li>• 6-8mm incision (much smaller than traditional surgery)</li>
                <li>• Same-day discharge for most patients</li>
                <li>• Faster recovery and return to activities</li>
                <li>• Reduced risk of complications</li>
                <li>• 85-90% success rate for sciatica relief</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-800 mb-6">Recovery and Rehabilitation</h2>
              
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Immediate Post-Surgery (Week 1)</h3>
              <ul className="mb-6 space-y-2">
                <li>• Light walking as tolerated</li>
                <li>• Pain management with prescribed medications</li>
                <li>• Wound care and monitoring</li>
                <li>• Gradual increase in daily activities</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Early Recovery (Weeks 2-4)</h3>
              <ul className="mb-6 space-y-2">
                <li>• Return to light office work</li>
                <li>• Begin physical therapy program</li>
                <li>• Core strengthening exercises</li>
                <li>• Posture correction training</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Full Recovery (Weeks 6-8)</h3>
              <ul className="mb-6 space-y-2">
                <li>• Return to normal activities</li>
                <li>• Gradual resumption of exercise</li>
                <li>• Long-term spine health maintenance</li>
                <li>• Follow-up appointments as needed</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-800 mb-6">Prevention Strategies</h2>
              <p className="mb-6">
                Preventing sciatica recurrence involves maintaining a healthy spine through:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Lifestyle Modifications</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Regular exercise and core strengthening</li>
                    <li>• Proper lifting techniques</li>
                    <li>• Ergonomic workspace setup</li>
                    <li>• Maintaining healthy weight</li>
                    <li>• Quitting smoking</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Ongoing Care</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Regular physical therapy sessions</li>
                    <li>• Annual spine health checkups</li>
                    <li>• Stress management techniques</li>
                    <li>• Proper sleep posture</li>
                    <li>• Staying active and mobile</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-800 mb-6">Why Choose Dr. Sayuj Krishnan for Sciatica Treatment?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Expertise & Experience</h3>
                  <ul className="space-y-2">
                    <li>• Over 9 years of neurosurgical experience</li>
                    <li>• Fellowship in minimally invasive spine surgery</li>
                    <li>• Advanced training in Germany</li>
                    <li>• Specialized in endoscopic procedures</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Patient-Centered Care</h3>
                  <ul className="space-y-2">
                    <li>• Comprehensive evaluation and diagnosis</li>
                    <li>• Personalized treatment plans</li>
                    <li>• 24/7 post-operative support</li>
                    <li>• Multilingual consultation support</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Get Expert Sciatica Treatment in Hyderabad</h2>
              <p className="mb-6">
                Don't let sciatica pain control your life. Dr. Sayuj Krishnan offers comprehensive treatment options from conservative management to advanced endoscopic surgery. Book a consultation to discuss your symptoms and explore the best treatment approach for your condition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointments"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Book Consultation
                </Link>
                <a
                  href="tel:+919778280044"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  Call: +91 97782 80044
                </a>
              </div>
            </section>
          
      <AuthorByline 
        
        
        publishedOn="2025-01-15"
        updatedOn="2025-10-19"
      />
      
      <SourceList sources={sources['sciatica-pain-management-hyderabad']} />
      
      <NAP />
      <ReviewedBy />
</article>
        </div>
      </div>
    </div>
  );
}







