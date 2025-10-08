'use client';

import { useStatsigEvents } from '../../src/lib/statsig-events';

export default function StatsigTestPage() {
  const { 
    logAppointmentBooking, 
    logServiceInquiry, 
    logContactFormSubmit, 
    logPhoneCallClick, 
    logLocationPageView 
  } = useStatsigEvents();

  const handleTestAppointmentBooking = () => {
    logAppointmentBooking('test_button', 'endoscopic-discectomy');
  };

  const handleTestServiceInquiry = () => {
    logServiceInquiry('endoscopic-discectomy', 'test_button');
  };

  const handleTestContactForm = () => {
    logContactFormSubmit('test_form', true);
  };

  const handleTestPhoneCall = () => {
    logPhoneCallClick('+919778280044', 'test_button');
  };

  const handleTestLocationView = () => {
    logLocationPageView('banjara-hills');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Statsig Events Test Page</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Click the buttons below to test Statsig event logging. Check your browser console and Statsig dashboard for events.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <button
          onClick={handleTestAppointmentBooking}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Test Appointment Booking
        </button>

        <button
          onClick={handleTestServiceInquiry}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Test Service Inquiry
        </button>

        <button
          onClick={handleTestContactForm}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Test Contact Form Submit
        </button>

        <button
          onClick={handleTestPhoneCall}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Test Phone Call Click
        </button>

        <button
          onClick={handleTestLocationView}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Test Location Page View
        </button>

        <a
          href="tel:+919778280044"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors text-center"
        >
          Test Phone Link Click
        </a>
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Open your browser's Developer Tools (F12)</li>
          <li>Go to the Console tab</li>
          <li>Click the test buttons above</li>
          <li>Look for "📊 Statsig Event:" messages in the console</li>
          <li>Check your Statsig dashboard for the events</li>
          <li>Events should move from "setup_incomplete" to "active" status</li>
        </ol>
      </div>
    </div>
  );
}
