'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/src/lib/auth';
import { Upload, FileText, AlertTriangle, Loader2, Key } from 'lucide-react';

export default function ReferralAnalyzerPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'complete' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth.isAuthenticated();
      if (!authenticated) {
        router.push('/admin/login');
        return;
      }
      setIsAuthenticated(true);
    };
    checkAuth();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setStatus('idle');
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    if (!adminKey) {
        setError("Please enter the Admin Access Key");
        return;
    }

    setStatus('uploading');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('analyzing');
      const res = await fetch('/api/admin/referral/analyze', {
        method: 'POST',
        body: formData,
        headers: {
            'x-admin-key': adminKey
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const data = await res.json();
      setResult(data);
      setStatus('complete');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus('error');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Referral Analyzer (Sandbox)
            </h2>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
           <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Admin Key</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Key className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter Admin Key"
                />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <span className="text-gray-900 font-medium">Click to upload PDF referral</span>
              <span className="text-gray-500 text-sm mt-1">Maximum size 10MB</span>
            </label>
            {file && (
              <div className="mt-4 flex items-center justify-center text-blue-600">
                <FileText className="h-5 w-5 mr-2" />
                {file.name}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-red-50 p-4 rounded-md flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleAnalyze}
              disabled={!file || status === 'uploading' || status === 'analyzing'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {status === 'analyzing' || status === 'uploading' ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                'Analyze Referral'
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Analysis Result</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Extracted from {result.extraction.pages} pages ({result.extraction.truncated ? 'Truncated' : 'Full text'})
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Patient Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.analysis.patientName}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Referring Doctor</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.analysis.referringDoctor}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Diagnosis</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.analysis.diagnosis}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Urgency</dt>
                  <dd className={`mt-1 text-sm font-bold sm:mt-0 sm:col-span-2 ${
                    result.analysis.urgency === 'High' ? 'text-red-600' :
                    result.analysis.urgency === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>{result.analysis.urgency}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Summary</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.analysis.summary}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Recommended Action</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.analysis.recommendedAction}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
