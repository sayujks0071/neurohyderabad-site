import { SITE_URL } from "@/src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Calendar, Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You for Your Appointment Request | Dr Sayuj Krishnan",
  description: "Your appointment request has been received. Our team will contact you shortly to confirm your consultation with Dr Sayuj Krishnan.",
  alternates: {
    canonical: "/appointments/thank-you",
  },
  robots: {
    index: false, // Don't index thank you pages
    follow: true,
  },
  openGraph: {
    title: "Thank You for Your Appointment Request | Dr Sayuj Krishnan",
    description: "Your appointment request has been received. Our team will contact you shortly.",
    url: `${SITE_URL}/appointments/thank-you`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function AppointmentThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-16">
        {/* Success Message */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Thank You for Reaching Out!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your appointment request has been successfully received. Our team will contact you shortly to confirm your consultation.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              What Happens Next?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Confirmation Call</h3>
                  <p className="text-gray-600">Our team will call you within 24 hours to confirm your appointment details and answer any questions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Prepare for Your Visit</h3>
                  <p className="text-gray-600">Bring any relevant medical records, imaging reports (MRI/CT scans), and current medications list.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Consultation with Dr. Sayuj</h3>
                  <p className="text-gray-600">Meet with Dr. Sayuj Krishnan for a thorough evaluation and personalized treatment plan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Need to Speak Now?
              </h3>
              <p className="text-blue-800 mb-3">For urgent inquiries or to modify your appointment:</p>
              <a
                href="tel:+919778280044"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                +91 9778280044
              </a>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </h3>
              <p className="text-green-800 mb-3">For non-urgent questions:</p>
              <a
                href="mailto:hellodr@drsayuj.info"
                className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors break-all"
              >
                hellodr@drsayuj.info
              </a>
            </div>
          </div>

          {/* Clinic Details */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              Clinic Locations
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Jubilee Hills</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Continental Hospitals<br />
                  IT & Financial District<br />
                  Hyderabad, Telangana
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Banjara Hills</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Apollo Health City<br />
                  Jubilee Hills Road<br />
                  Hyderabad, Telangana
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-blue-100">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm">Consultation Hours: Mon-Sat, 9:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">While You Wait</h3>
            <p className="text-gray-600 mb-6">Learn more about our treatments and what to expect:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/services"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
              >
                <div className="font-semibold text-blue-600 mb-1">Our Services</div>
                <div className="text-sm text-gray-600">Explore treatment options</div>
              </Link>
              <Link
                href="/conditions"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
              >
                <div className="font-semibold text-blue-600 mb-1">Conditions We Treat</div>
                <div className="text-sm text-gray-600">Learn about your condition</div>
              </Link>
              <Link
                href="/patient-stories"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
              >
                <div className="font-semibold text-blue-600 mb-1">Patient Stories</div>
                <div className="text-sm text-gray-600">Read success stories</div>
              </Link>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-red-900 mb-2">Medical Emergency?</h3>
            <p className="text-red-800 mb-3">
              If you are experiencing a medical emergency (severe headache, loss of consciousness, numbness, weakness),
              please call emergency services immediately or visit the nearest emergency room.
            </p>
            <div className="font-bold text-red-900 text-xl">
              Emergency: 108 or +91 9778280044
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
