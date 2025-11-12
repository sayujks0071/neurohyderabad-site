import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../src/lib/seo";

export const metadata: Metadata = {
  title: "Content Integrity & Editorial Process | Dr. Sayuj Krishnan",
  description: "Learn about our rigorous editorial process, medical review standards, and commitment to accurate, evidence-based neurosurgical content.",
  alternates: {
    canonical: `${SITE_URL}/content-integrity`,
  },
};

export default function ContentIntegrityPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Content Integrity & Editorial Process
            </h1>
            <p className="text-xl text-blue-100">
              Our commitment to accurate, evidence-based medical information
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Who Creates the Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Who Creates Our Content?</h2>
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600 mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                All medical content on this website is written or reviewed by{" "}
                <Link href="/about" className="text-blue-600 font-semibold hover:underline">
                  Dr. Sayuj Krishnan, MBBS, DNB Neurosurgery
                </Link>
                , a board-certified neurosurgeon with over 9 years of clinical experience 
                in brain and spine surgery.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Board-Certified Neurosurgeon:</strong> DNB Neurosurgery (Direct 6 Years)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>International Training:</strong> Fellowship in Germany (Full Endoscopic Spine Surgery)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Active Practice:</strong> Consultant Neurosurgeon at Yashoda Hospital, Malakpet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Professional Memberships:</strong> AO Spine (International Member), Neurological Society of India (NSI), Congress of Neurological Surgeons (CNS)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How Content is Created */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">How We Create Content</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Clinical Experience</h3>
                    <p className="text-gray-700">
                      All content is based on Dr. Krishnan's direct clinical experience treating thousands 
                      of patients with neurological and spinal conditions. Real-world patient outcomes inform 
                      every piece of advice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Evidence-Based Medicine</h3>
                    <p className="text-gray-700">
                      Every medical statement is supported by current peer-reviewed research, clinical 
                      guidelines from professional organizations (AANS, CNS, WFNS), and established medical literature.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Medical Review Process</h3>
                    <p className="text-gray-700">
                      Dr. Krishnan personally reviews all medical content before publication and updates 
                      existing content regularly to reflect current clinical guidelines and treatment protocols.
                      Each page displays the date of last medical review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Patient-Centered Language</h3>
                    <p className="text-gray-700">
                      While maintaining medical accuracy, we translate complex neurosurgical concepts into 
                      clear, accessible language that empowers patients to make informed decisions about their care.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      5
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Regular Updates</h3>
                    <p className="text-gray-700">
                      Medical knowledge evolves constantly. We commit to reviewing and updating our content 
                      at least annually, or more frequently when significant new research or treatment guidelines 
                      are published.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why We Create Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Why We Create Content</h2>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-600">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our primary goal is to <strong>help and inform patients</strong>, not simply to attract them. 
                We believe that:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Informed patients make better healthcare decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Clear, accurate information reduces anxiety and uncertainty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Patients have the right to understand their conditions and treatment options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Education empowers patients to participate actively in their care</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                We avoid promotional, alarmist, or exaggerated language. Instead, we provide balanced, 
                evidence-based information that reflects the realities of neurosurgical practice.
              </p>
            </div>
          </section>

          {/* Content Categories */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Content Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Medical Procedures</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Detailed procedure descriptions</li>
                  <li>• Indications and contraindications</li>
                  <li>• Risks and benefits</li>
                  <li>• Recovery expectations</li>
                  <li>• Cost and insurance information</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Medical Conditions</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Condition overview and symptoms</li>
                  <li>• Diagnostic approaches</li>
                  <li>• Treatment options</li>
                  <li>• Prognosis and outcomes</li>
                  <li>• When to seek medical care</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Patient Education</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Pre-operative preparation</li>
                  <li>• Post-operative care instructions</li>
                  <li>• Recovery timelines</li>
                  <li>• Warning signs and emergencies</li>
                  <li>• Lifestyle modifications</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Research & Innovation</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• New surgical techniques</li>
                  <li>• Technology advancements</li>
                  <li>• Clinical research findings</li>
                  <li>• Conference presentations</li>
                  <li>• Peer-reviewed publications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sources & Citations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Sources & Citations</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6">
                We cite authoritative sources including:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Professional Organizations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• American Association of Neurological Surgeons (AANS)</li>
                    <li>• Congress of Neurological Surgeons (CNS)</li>
                    <li>• World Federation of Neurosurgical Societies (WFNS)</li>
                    <li>• Neurological Society of India (NSI)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Medical Databases</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• PubMed/MEDLINE</li>
                    <li>• Cochrane Library</li>
                    <li>• Peer-reviewed medical journals</li>
                    <li>• Clinical practice guidelines</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 mt-6 text-sm">
                All cited sources are listed at the bottom of relevant articles, providing full transparency 
                about the evidence supporting our medical information.
              </p>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Important Disclaimer</h2>
            <div className="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-600">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>This content is for educational purposes only.</strong> It is not a substitute for 
                professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Always seek the advice of Dr. Sayuj Krishnan or another qualified healthcare provider with 
                any questions you may have regarding a medical condition. Never disregard professional medical 
                advice or delay seeking it because of something you have read on this website.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you think you may have a medical emergency, call your doctor or emergency services immediately.
              </p>
            </div>
          </section>

          {/* Contact for Corrections */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Corrections & Feedback</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                We are committed to maintaining the highest standards of accuracy. If you identify any errors 
                or have suggestions for improving our content, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">
                    neurospinehyd@drsayuj.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+919778280044" className="text-blue-600 hover:underline">
                    +91 9778280044
                  </a>
                </p>
              </div>
              <p className="text-gray-700 mt-4 text-sm">
                We review all feedback and will make corrections promptly when warranted.
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center text-sm text-gray-600 mt-12 p-6 bg-gray-50 rounded-lg">
            <p><strong>Last Updated:</strong> November 1, 2025</p>
            <p className="mt-2">This editorial policy is reviewed annually to ensure continued adherence to best practices.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
