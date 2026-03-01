"use client";

import React, { useState } from 'react';
import Section from "../_components/Section";
import Card from "../_components/Card";
import { createContainer } from 'almostnode';

// Note: In a real app, you might want to move this metadata to a layout or use generateMetadata
// but since this is a client component, we'll handle title via standard HTML in return or separate layout
// For now, we focus on the functionality.

export default function MriAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    setError(null);
    setResult(null);

    let extractedText = null;
    let extractedPages = 0;
    let isTruncated = false;

    try {
      // 1. Attempt client-side extraction first
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // Create a lightweight container for extraction
        const container = createContainer();

        // Install pdf-parse
        await container.npm.install('pdf-parse@1.1.1');

        // Write the PDF file to the virtual filesystem
        const fs = container.vfs;
        fs.writeFileSync('/input.pdf', buffer);

        // Create the extraction script
        const extractScript = `
          const fs = require('fs');
          const pdf = require('pdf-parse');

          async function extract() {
            try {
              const dataBuffer = fs.readFileSync('/input.pdf');
              const data = await pdf(dataBuffer);

              const text = data.text || '';
              const numpages = data.numpages || 0;
              const MAX_CHARS = 120000;

              // Simple sanitization
              const sanitized = text.replace(/[\\x00-\\x08\\x0B-\\x1F\\x7F]/g, '');

              const truncated = sanitized.length > MAX_CHARS;
              const finalText = sanitized.slice(0, MAX_CHARS);

              module.exports = {
                text: finalText,
                numpages,
                truncated
              };
            } catch (err) {
              console.error(err);
              module.exports = { error: err.message };
            }
          }

          extract();
        `;

        // Execute the script
        const result = await container.execute(extractScript);

        if (result.exports && !result.exports.error && result.exports.text) {
          extractedText = result.exports.text;
          extractedPages = result.exports.numpages;
          isTruncated = result.exports.truncated;
          console.log("Client-side extraction successful");
        } else {
            console.warn("Client-side extraction returned no text or error:", result.exports);
        }

      } catch (clientSideError) {
        console.warn("Client-side extraction failed, falling back to server:", clientSideError);
        // Continue to server-side fallback
      }

      // 2. Prepare payload
      let body;
      const headers: Record<string, string> = {};

      if (extractedText) {
        body = JSON.stringify({
          text: extractedText,
          numpages: extractedPages,
          truncated: isTruncated
        });
        headers['Content-Type'] = 'application/json';
      } else {
        const formData = new FormData();
        formData.append("file", file);
        body = formData;
      }

      const response = await fetch("/api/mri/analyze", {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Section className="py-16 bg-blue-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">AI MRI Report Analyzer</h1>
          <p className="text-xl opacity-90">
            Upload your MRI PDF report for an instant, AI-powered interpretation.
          </p>
          <p className="text-sm mt-2 opacity-75">
            Note: Do not upload files containing highly sensitive identifiers; redact if possible.
          </p>
        </div>
      </Section>

      <Section className="py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-xl bg-white rounded-xl">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload MRI Report (PDF)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </label>
              </div>
              {file && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md flex items-center">
                  <span className="mr-2">📄</span>
                  {file.name}
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={!file || analyzing}
                className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all ${
                  !file || analyzing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {analyzing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Report"
                )}
              </button>
            </div>
          </Card>

          {error && (
            <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-md">
              <h3 className="text-red-800 font-bold mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6">
              {result.extraction?.truncated && (
                <div className="p-4 bg-orange-50 border-l-4 border-orange-400 text-orange-700">
                  <p>Warning: The document was very large and has been truncated. The analysis may be incomplete.</p>
                </div>
              )}

              <Card className="p-8 shadow-xl bg-white border-t-4 border-blue-500 rounded-xl animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Analysis Result</h2>

                {result.analysis?.plainEnglishSummary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary</h3>
                    <p className="text-gray-700 leading-relaxed">{result.analysis.plainEnglishSummary}</p>
                  </div>
                )}

                {result.analysis?.keyTakeaways && result.analysis.keyTakeaways.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Takeaways</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {result.analysis.keyTakeaways.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="prose prose-blue max-w-none mt-4">
                    {/* Fallback/Legacy display if structure differs */}
                    {!result.analysis && (
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-normal">
                             {JSON.stringify(result, null, 2)}
                        </div>
                    )}
                </div>
              </Card>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm leading-5 font-medium text-yellow-800">
                      Medical Disclaimer
                    </h3>
                    <div className="mt-2 text-sm leading-5 text-yellow-700">
                      <p>
                        This AI analysis is for informational purposes only and does not constitute a medical diagnosis. 
                        Always consult Dr. Sayuj Krishnan or a qualified healthcare professional for clinical interpretation and treatment planning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
