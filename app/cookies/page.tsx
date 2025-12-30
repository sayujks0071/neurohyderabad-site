import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
  description: "Cookie policy for Dr Sayuj Krishnan's neurosurgical practice website. Learn about how we use cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors interact with our website.</li>
              <li><strong>Performance Cookies:</strong> These help us improve website performance and user experience.</li>
              <li><strong>Functional Cookies:</strong> These remember your preferences and settings.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that set their own cookies:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Google OAuth:</strong> For secure patient verification (when implemented)</li>
              <li><strong>Statsig:</strong> For A/B testing and feature optimization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Most web browsers allow you to refuse cookies or delete them</li>
              <li>You can set your browser to notify you when cookies are being set</li>
              <li>You can disable non-essential cookies through your browser settings</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> hellodr@drsayuj.info<br />
                <strong>Phone:</strong> +91 97782 80044<br />
                <strong>Address:</strong> Yashoda Hospital, Malakpet, Hyderabad
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
