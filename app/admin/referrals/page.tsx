"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Lock } from "lucide-react";

export default function ReferralAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!adminKey) {
      setError("Please enter the Admin Key.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/referral/analyze", {
        method: "POST",
        body: formData,
        headers: {
            'x-admin-key': adminKey
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Analysis failed (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Referral Analyzer Sandbox</h1>
        <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <input
                type="password"
                placeholder="Admin Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="border rounded px-2 py-1 text-sm w-32 focus:w-48 transition-all"
            />
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 transition-colors bg-gray-50">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <UploadCloud className="w-12 h-12 text-blue-500 mb-2" />
          <span className="text-lg font-medium text-gray-700">
            {file ? file.name : "Click to upload referral PDF"}
          </span>
          <span className="text-sm text-gray-500 mt-1">
            Max 10MB. Processed in secure, ephemeral sandbox.
          </span>
        </label>
      </div>

      {/* Actions */}
      {file && !loading && !result && (
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors w-full font-semibold shadow-md"
        >
          Analyze Referral
        </button>
      )}

      {loading && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Processing in secure sandbox...</p>
          <p className="text-gray-400 text-sm mt-2">Extracting text & analyzing with Gemini AI</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center shadow-sm">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mt-6">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-green-800 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Analysis Complete
            </h2>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
              result.analysis.urgency === 'High' ? 'bg-red-100 text-red-800 border border-red-200' :
              result.analysis.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              'bg-green-100 text-green-800 border border-green-200'
            }`}>
              {result.analysis.urgency} Urgency
            </span>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Patient</h3>
              <p className="text-xl font-semibold text-gray-900">{result.analysis.patientName}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Referring Doctor</h3>
              <p className="text-xl font-semibold text-gray-900">{result.analysis.referringDoctor}</p>
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Diagnosis</h3>
              <p className="text-xl text-gray-900 font-medium">{result.analysis.diagnosis}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Summary</h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-5 rounded-lg border border-gray-100">
                {result.analysis.summary}
              </p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended Next Steps</h3>
              <ul className="space-y-2">
                {result.analysis.nextSteps.map((step: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3"></span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-400 flex justify-between">
            <span>Pages: {result.extraction.numpages}</span>
            <span>Chars: {result.extraction.extractedChars}</span>
          </div>
        </div>
      )}
    </div>
  );
}
