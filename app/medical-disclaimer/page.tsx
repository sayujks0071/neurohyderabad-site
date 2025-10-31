import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Dr Sayuj Krishnan",
  description: "Important medical disclaimer and terms of use for information provided on Dr Sayuj Krishnan's website.",
  alternates: {
    canonical: "/medical-disclaimer",
  },
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Medical Disclaimer</h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Important Notice</h2>
              <p className="text-lg text-gray-700 mb-4">
                The information provided on this website is for educational and informational purposes only. 
                It is not intended as medical advice, diagnosis, or treatment recommendations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Not a Substitute for Medical Care</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• The content on this website should not be used as a substitute for professional medical advice</li>
                <li>• Always consult with a qualified healthcare provider for medical concerns</li>
                <li>• Do not delay seeking medical attention based on information from this website</li>
                <li>• Individual medical conditions require personalized evaluation and treatment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Medical Information Accuracy</h2>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate and up-to-date medical information:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Medical knowledge and practices evolve continuously</li>
                <li>• Information may not reflect the most current medical standards</li>
                <li>• Individual cases may vary significantly from general information</li>
                <li>• Always verify information with current medical literature and your healthcare provider</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">No Doctor-Patient Relationship</h2>
              <p className="text-gray-700">
                Viewing or using information from this website does not establish a doctor-patient relationship 
                with Dr Sayuj Krishnan or any other healthcare provider. A formal consultation is required to 
                establish such a relationship.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Emergency Situations</h2>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <p className="text-red-800 font-semibold">
                  If you are experiencing a medical emergency, call your local emergency services immediately 
                  or go to the nearest emergency room. Do not rely on this website for emergency medical care.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                Dr Sayuj Krishnan and this website are not liable for any direct, indirect, incidental, 
                or consequential damages arising from the use of information on this website. This includes 
                but is not limited to medical complications, misdiagnosis, or treatment delays.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
              <p className="text-gray-700">
                This website may contain links to third-party websites. We are not responsible for the 
                content, accuracy, or medical advice provided on external websites. Use external links 
                at your own discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact for Medical Concerns</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For medical concerns or to schedule a consultation:
                </p>
                <ul className="space-y-2">
                  <li><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91 9778280044</a></li>
                  <li><strong>Email:</strong> <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">neurospinehyd@drsayuj.com</a></li>
                  <li><strong>Appointments:</strong> <Link href="/appointments" className="text-blue-600 hover:underline">Book Online</Link></li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Last Updated</h2>
              <p className="text-gray-700">
                This medical disclaimer was last updated on October 1, 2025. We reserve the right to 
                update this disclaimer at any time without notice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
