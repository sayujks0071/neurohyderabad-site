'use client';

import { useState } from 'react';

export default function EmailTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const sendTestEmail = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ Test email sent successfully! Message ID: ${data.messageId}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testContactForm = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/api/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Patient',
          email: 'test@example.com',
          phone: '+91 9876543210',
          subject: 'Test Contact Form',
          message: 'This is a test message from the email system.'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ Contact form email sent! Message ID: ${data.messageId}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testAppointment = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/api/email/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Patient',
          email: 'test@example.com',
          phone: '+91 9876543210',
          preferredDate: '2024-11-01',
          condition: 'Back pain',
          urgency: 'Moderate',
          message: 'This is a test appointment request.'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ Appointment emails sent! Admin: ${data.adminMessageId}, Patient: ${data.patientMessageId}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Email System Test</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Test Email System</h2>
              <p className="text-blue-700">Test the Resend API integration for the drsayuj.info website.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={sendTestEmail}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Test Email'}
              </button>

              <button
                onClick={testContactForm}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Test Contact Form'}
              </button>

              <button
                onClick={testAppointment}
                disabled={loading}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Test Appointment'}
              </button>
            </div>

            {result && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Result:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
              </div>
            )}

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Email Configuration:</h3>
              <ul className="text-yellow-700 space-y-1">
                <li>• <strong>From:</strong> Dr. Sayuj Krishnan &lt;noreply@drsayuj.info&gt;</li>
                <li>• <strong>To:</strong> dr.sayujkrishnan@gmail.com</li>
                <li>• <strong>Admin:</strong> neurospinehyd@drsayuj.com</li>
                <li>• <strong>API Key:</strong> re_YJVHwSAs_PxKJHrCFidkmuFAkvNuQL1by</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">What each test does:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Test Email:</strong> Sends a simple test email to verify API connection</li>
                <li>• <strong>Contact Form:</strong> Tests the contact form email template and delivery</li>
                <li>• <strong>Appointment:</strong> Tests appointment request emails (admin + patient confirmation)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

