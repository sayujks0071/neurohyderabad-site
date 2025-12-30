import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
  description: "Medical disclaimer for Dr Sayuj Krishnan's neurosurgical practice in Hyderabad. Important information about medical advice and treatment.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Medical Disclaimer</h1>
        
        <div className="prose max-w-none">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-800 font-semibold">
              <strong>Important:</strong> The information on this website is for educational purposes only and does not constitute medical advice.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No Medical Advice</h2>
            <p>
              The content provided on {SITE_URL} is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Individual Results May Vary</h2>
            <p>
              Every patient is unique, and individual results from neurosurgical procedures may vary. The information provided on this website does not guarantee specific outcomes. Factors such as age, overall health, severity of condition, and adherence to post-operative care instructions can all affect results.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Consultation Required</h2>
            <p>
              Before making any decisions about your medical care, you must consult with Dr Sayuj Krishnan or another qualified neurosurgeon. A proper medical evaluation, including physical examination and review of imaging studies, is essential for accurate diagnosis and treatment planning.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Emergency Situations</h2>
            <p>
              If you are experiencing a medical emergency, call your local emergency services immediately. Do not rely on information from this website for emergency medical care.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Risks and Complications</h2>
            <p>
              All surgical procedures carry inherent risks and potential complications. While Dr Sayuj Krishnan uses advanced minimally invasive techniques to minimize risks, no surgery is without potential complications. These risks will be discussed in detail during your consultation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Content</h2>
            <p>
              This website may contain links to third-party websites or content. Dr Sayuj Krishnan is not responsible for the content, accuracy, or opinions expressed on such websites. Inclusion of any linked website does not imply approval or endorsement by Dr Sayuj Krishnan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              Dr Sayuj Krishnan and his representatives shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the information provided on this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact for Medical Questions</h2>
            <p>
              For specific medical questions or to schedule a consultation, please contact us directly:
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p><strong>Dr Sayuj Krishnan</strong></p>
              <p>Room No 317, OPD Block, Yashoda Hospital, Malakpet</p>
              <p>Hyderabad, Telangana 500036</p>
              <p>Phone: <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
              <p>Email: <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">hellodr@drsayuj.info</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Professional Credentials</h2>
            <p>
              Dr Sayuj Krishnan is a qualified neurosurgeon with the following credentials:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>MBBS (Bachelor of Medicine and Bachelor of Surgery)</li>
              <li>DNB Neurosurgery (Direct 6 years)</li>
              <li>Fellowship in Minimally Invasive and Advanced Spine Surgery</li>
              <li>Observer-ship in Full Endoscopic Spine Surgery (Germany)</li>
              <li>Over 9 years of experience in neurosurgery</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
