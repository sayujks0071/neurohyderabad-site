import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
  description: "Privacy policy for Dr. Sayuj Krishnan's neurosurgical practice in Hyderabad. Learn how we protect your personal and medical information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Dr. Sayuj Krishnan ("we," "our," or "us") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
              our website {SITE_URL} or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Name, contact information (phone, email, address)</li>
              <li>Medical history and health information</li>
              <li>Appointment scheduling information</li>
              <li>Insurance and billing information</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">Website Information</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on site</li>
              <li>Device and operating system information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide medical services and treatment</li>
              <li>Schedule and manage appointments</li>
              <li>Process payments and insurance claims</li>
              <li>Communicate about your care and treatment</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>With your explicit consent</li>
              <li>With healthcare providers involved in your treatment</li>
              <li>With insurance companies for billing purposes</li>
              <li>When required by law or legal process</li>
              <li>To protect the health and safety of patients or others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
              internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Object to certain processing of your information</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p><strong>Dr. Sayuj Krishnan</strong></p>
              <p>Room No 317, OPD Block, Yashoda Hospital, Malakpet</p>
              <p>Hyderabad, Telangana 500036</p>
              <p>Phone: <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
              <p>Email: <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">neurospinehyd@drsayuj.com</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
