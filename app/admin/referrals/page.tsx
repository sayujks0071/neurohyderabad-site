'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ReferralAnalysisResult {
  patientName: string;
  referringDoctor: string;
  diagnosis: string;
  urgency: 'Low' | 'Medium' | 'High';
  summary: string;
  recommendedAction: string;
}

export default function ReferralAnalyzerPage() {
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReferralAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = searchParams.get('key');
    if (key) {
      setApiKey(key);
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Append key to URL to pass middleware and verifyAdminAccess
      const url = `/api/admin/referral/analyze${apiKey ? `?key=${apiKey}` : ''}`;

      const res = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: apiKey ? { 'x-admin-key': apiKey } : undefined
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Analysis failed: ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Referral Analyzer</h1>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="space-y-4">
             {!apiKey && (
                <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm mb-4">
                  Warning: No Admin Key detected. API calls may fail. Please ensure you accessed this page with ?key=YOUR_KEY.
                </div>
             )}

            <label className="block text-sm font-medium text-gray-700">
              Upload Referral PDF
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleAnalyze}
                disabled={!file || isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Analysis Result</h2>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                result.urgency === 'High' ? 'bg-red-100 text-red-800' :
                result.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {result.urgency} Urgency
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient Name</h3>
                  <p className="mt-1 text-lg text-gray-900">{result.patientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Referring Doctor</h3>
                  <p className="mt-1 text-lg text-gray-900">{result.referringDoctor}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Diagnosis</h3>
                <p className="mt-1 text-gray-900">{result.diagnosis}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Summary</h3>
                <p className="mt-1 text-gray-900 text-sm leading-relaxed">{result.summary}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-blue-800">Recommended Action</h3>
                <p className="mt-1 text-blue-900 font-medium">{result.recommendedAction}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
