'use client';

import { useState } from 'react';

export default function TestInngestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runTest = async (testType: string, data: any = {}) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/test-inngest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testType,
          data
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Test failed');
      }

      setResult(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Inngest Test Dashboard</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Hello World Test */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Hello World Test</h2>
              <p className="text-gray-600 mb-4">
                Simple test function with 1-second delay
              </p>
              <button
                onClick={() => runTest('hello-world', { email: 'test@drsayuj.com' })}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Running...' : 'Run Hello World'}
              </button>
            </div>

            {/* Appointment Flow Test */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Appointment Flow Test</h2>
              <p className="text-gray-600 mb-4">
                Multi-step appointment workflow with delays
              </p>
              <button
                onClick={() => runTest('appointment-flow', { 
                  patientName: 'John Doe', 
                  patientEmail: 'john@example.com' 
                })}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Running...' : 'Run Appointment Flow'}
              </button>
            </div>

            {/* Error Handling Test */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Error Handling Test</h2>
              <p className="text-gray-600 mb-4">
                Test error handling and retry logic
              </p>
              <button
                onClick={() => runTest('error-handling', { 
                  shouldFail: true, 
                  errorMessage: 'Test error for retry logic' 
                })}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Running...' : 'Run Error Test'}
              </button>
            </div>

            {/* Appointment Created Test */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Appointment Created Test</h2>
              <p className="text-gray-600 mb-4">
                Test appointment creation workflow
              </p>
              <button
                onClick={() => runTest('appointment-created', { 
                  appointmentId: 'apt_' + Date.now(),
                  patientName: 'Jane Smith',
                  patientEmail: 'jane@example.com',
                  appointmentType: 'consultation'
                })}
                disabled={loading}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Running...' : 'Run Appointment Created'}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4 text-green-600">✅ Test Result</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4 text-red-600">❌ Test Error</h2>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">📋 Instructions</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Click any test button to trigger an Inngest function</li>
              <li>• Check the Inngest dashboard to see function executions</li>
              <li>• Functions include delays and multi-step workflows</li>
              <li>• Error handling test demonstrates retry logic</li>
              <li>• All functions are logged and can be monitored</li>
            </ul>
          </div>

          {/* API Info */}
          <div className="bg-gray-100 p-6 rounded-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">🔗 API Endpoints</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Inngest Functions:</strong> <code>/api/inngest</code></p>
              <p><strong>Test API:</strong> <code>/api/test-inngest</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



