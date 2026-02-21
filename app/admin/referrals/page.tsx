'use client';

import React, { useState } from 'react';
import Section from '@/app/_components/Section';
import Button from '@/app/_components/Button';
import { Loader2, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReferralProcessorPage() {
  const [adminKey, setAdminKey] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !adminKey) {
      setError('Please provide both the Admin Key and a PDF file.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/referral/analyze', {
        method: 'POST',
        headers: {
          'x-admin-key': adminKey,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze referral');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section background="gray" className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Processor (Admin)</h1>
          <p className="text-gray-600">
            Securely upload referral PDFs to extract patient data using Sandbox Isolation & AI.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Admin Key Input */}
              <div>
                <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Access Key
                </label>
                <input
                  type="password"
                  id="adminKey"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter secure admin key"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  id="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  {file ? (
                    <>
                      <FileText className="w-12 h-12 text-blue-600" />
                      <div className="text-lg font-medium text-gray-900">{file.name}</div>
                      <div className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      <span className="text-blue-600 text-sm font-medium">Click to change file</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <div className="text-lg font-medium text-gray-900">Drop PDF here or click to upload</div>
                      <div className="text-sm text-gray-500">Max size 10MB</div>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!file || !adminKey || isLoading}
                fullWidth
                size="lg"
              >
                {isLoading ? 'Processing in Sandbox...' : 'Analyze Referral'}
              </Button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-t border-red-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6 text-green-700">
                <CheckCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Analysis Complete</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Extraction Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sandbox Extraction</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Pages:</dt>
                      <dd className="font-medium">{result.extraction.numpages}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Characters:</dt>
                      <dd className="font-medium">{result.extraction.extractedChars}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Truncated:</dt>
                      <dd className={`font-medium ${result.extraction.truncated ? 'text-amber-600' : 'text-green-600'}`}>
                        {result.extraction.truncated ? 'Yes' : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Structured Data */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Structured Data (AI)</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Patient Name" value={result.referral.patientName} />
                    <Field label="DOB" value={result.referral.patientDob} />
                    <Field label="Referring Doctor" value={result.referral.referringDoctor} />
                    <Field label="Urgency" value={result.referral.urgency} highlight={result.referral.urgency === 'Emergency'} />
                    <Field label="Diagnosis" value={result.referral.suspectedDiagnosis} className="md:col-span-2" />
                    <Field label="Reason" value={result.referral.reasonForReferral} className="md:col-span-2" />
                    <Field label="Insurance" value={result.referral.insurance} />
                  </div>
                </div>
              </div>

               {/* Raw JSON Toggle (Optional) */}
               <details className="mt-6">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">View Raw JSON</summary>
                <pre className="mt-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-xs font-mono">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function Field({ label, value, highlight = false, className = '' }: { label: string, value: string | null | undefined, highlight?: boolean, className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</dt>
      <dd className={`text-base font-medium ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
        {value || <span className="text-gray-400 italic">Not found</span>}
      </dd>
    </div>
  );
}
