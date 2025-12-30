import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
  description: "Terms of service for Dr Sayuj Krishnan's neurosurgical practice in Hyderabad. Read our terms and conditions for using our website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using the website {SITE_URL} and the services provided by Dr Sayuj Krishnan, 
              you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
            <p>
              The information provided on this website is for educational and informational purposes only. 
              It is not intended as medical advice, diagnosis, or treatment. Always seek the advice of your 
              physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <p className="mt-4">
              Dr Sayuj Krishnan's services are provided in accordance with applicable medical standards and regulations. 
              Individual results may vary, and no guarantee of specific outcomes is made.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on this website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Appointment Scheduling</h2>
            <p>
              Online appointment scheduling is provided as a convenience service. All appointments are subject to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Availability of Dr Sayuj Krishnan</li>
              <li>Confirmation by our office staff</li>
              <li>Completion of required medical history forms</li>
              <li>Payment of applicable consultation fees</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
            <p>
              Payment for services is due at the time of service unless other arrangements have been made in advance. 
              We accept various forms of payment including cash, credit cards, and insurance where applicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy and Confidentiality</h2>
            <p>
              Your privacy and the confidentiality of your medical information are of utmost importance to us. 
              Please review our Privacy Policy for detailed information about how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              In no event shall Dr Sayuj Krishnan or his representatives be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
              the materials on this website, even if Dr Sayuj Krishnan or an authorized representative has been notified orally 
              or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and the state of Telangana. 
              Any disputes arising from these terms shall be subject to the jurisdiction of the courts in Hyderabad, Telangana.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p><strong>Dr Sayuj Krishnan</strong></p>
              <p>Room No 317, OPD Block, Yashoda Hospital, Malakpet</p>
              <p>Hyderabad, Telangana 500036</p>
              <p>Phone: <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
              <p>Email: <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">hellodr@drsayuj.info</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              Dr Sayuj Krishnan reserves the right to revise these terms of service at any time without notice. 
              By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
