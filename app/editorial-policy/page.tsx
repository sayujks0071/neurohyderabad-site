import type { Metadata } from "next";
import NAP from "@/app/_components/NAP";

export const metadata: Metadata = {
  title: "Editorial Policy | Dr Sayuj Krishnan",
  description: "Editorial policy and content standards for medical information provided on Dr Sayuj Krishnan's website.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Editorial Policy</h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment to Medical Accuracy</h2>
              <p className="text-lg text-gray-700 mb-4">
                Dr Sayuj Krishnan is committed to providing accurate, evidence-based medical information 
                that helps patients make informed decisions about their healthcare.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content Review Process</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Medical Review Standards</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• All medical content is reviewed by Dr Sayuj Krishnan, MBBS, DNB Neurosurgery</li>
                  <li>• Information is based on current medical literature and clinical guidelines</li>
                  <li>• Content is updated regularly to reflect advances in medical knowledge</li>
                  <li>• Review dates are clearly indicated on all medical pages</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content Standards</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Evidence-Based Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• All medical information is based on peer-reviewed research</li>
                    <li>• Clinical guidelines from recognized medical organizations are followed</li>
                    <li>• Information is presented in clear, patient-friendly language</li>
                    <li>• Complex medical concepts are explained in understandable terms</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Transparency</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Medical reviewer credentials are clearly stated</li>
                    <li>• Review dates are prominently displayed</li>
                    <li>• Sources of information are referenced when appropriate</li>
                    <li>• Limitations and uncertainties are acknowledged</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content Categories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Medical Procedures</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Detailed procedure descriptions</li>
                    <li>• Indications and contraindications</li>
                    <li>• Risks and benefits</li>
                    <li>• Recovery expectations</li>
                    <li>• Cost and insurance information</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Medical Conditions</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Condition overview and symptoms</li>
                    <li>• Diagnostic approaches</li>
                    <li>• Treatment options</li>
                    <li>• Prognosis and outcomes</li>
                    <li>• When to seek medical care</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content Updates</h2>
              <p className="text-gray-700 mb-4">
                Medical information is reviewed and updated regularly to ensure accuracy:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Annual review of all medical content</li>
                <li>• Immediate updates when new guidelines are published</li>
                <li>• Regular monitoring of medical literature for relevant updates</li>
                <li>• Patient feedback incorporation when appropriate</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Editorial Independence</h2>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <p className="text-green-800">
                  <strong>Our editorial content is independent and unbiased.</strong> We do not accept 
                  payment for favorable reviews or recommendations. All treatment recommendations are 
                  based solely on medical evidence and patient best interests.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Corrections and Feedback</h2>
              <p className="text-gray-700 mb-4">
                We welcome feedback and corrections to improve our content:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Report inaccuracies via email: <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">hellodr@drsayuj.info</a></li>
                <li>• Corrections are reviewed by medical professionals</li>
                <li>• Updates are made promptly when errors are identified</li>
                <li>• Correction notices are added when significant changes are made</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For questions about our editorial policy or to report content issues:
                </p>
                <NAP locationId="malakpet" showEmail={true} />
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Last Updated</h2>
              <p className="text-gray-700">
                This editorial policy was last updated on October 1, 2025. We reserve the right to 
                update this policy to reflect changes in our content standards and review processes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
