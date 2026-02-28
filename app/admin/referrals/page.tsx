"use client";

import { useState } from "react";
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react";
import { createContainer } from 'almostnode';

export default function ReferralAnalyzerPage() {
  const [adminKey, setAdminKey] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file || !adminKey) return;

    setLoading(true);
    setError(null);
    setResult(null);

    let extractedText = null;

    try {
      // 1. Attempt client-side extraction first
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const container = createContainer();
        await container.npm.install('pdf-parse@1.1.1');

        container.vfs.writeFileSync('/input.pdf', buffer);

        const extractScript = `
          const fs = require('fs');
          const pdf = require('pdf-parse');

          async function extract() {
            try {
              const dataBuffer = fs.readFileSync('/input.pdf');
              const data = await pdf(dataBuffer);

              const text = data.text ? data.text.replace(/\\u0000/g, '') : '';

              module.exports = { text };
            } catch (err) {
              module.exports = { error: err.message };
            }
          }

          extract();
        `;

        const res = await container.execute(extractScript);

        if (res.exports && res.exports.text) {
          extractedText = res.exports.text;
          console.log("Client-side extraction successful");
        } else {
             console.warn("Client-side extraction failed or empty:", res.exports);
        }

      } catch (clientErr) {
        console.warn("Client-side extraction error:", clientErr);
        // Fallback to server
      }

      // 2. Send to API (either extracted text or original file)
      let body;
      const headers: Record<string, string> = {
          "x-admin-key": adminKey,
      };

      if (extractedText) {
          body = JSON.stringify({ text: extractedText });
          headers['Content-Type'] = 'application/json';
      } else {
          const formData = new FormData();
          formData.append("file", file);
          body = formData;
      }

      const res = await fetch("/api/admin/referral/analyze", {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="space-y-2 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Referral Analyzer (Sandbox)</h1>
        <p className="text-muted-foreground text-lg">
          Securely analyze referral PDFs using an isolated sandbox environment.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-card shadow-sm space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" /> Upload Referral
            </h2>

            <div className="space-y-3">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Admin Access Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter key to authorize..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Referral PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Max size: 10MB. PDF only.
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!file || !adminKey || loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Referral
                </>
              )}
            </button>

            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            <div className="p-6 border rounded-xl bg-card shadow-sm space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-semibold">Analysis Report</h2>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                  result.urgency === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                  result.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                  'bg-green-100 text-green-700 border-green-200'
                }`}>
                  {result.urgency} Priority
                </div>
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient Name</span>
                      <div className="font-medium text-lg">{result.patientName || "Not identified"}</div>
                   </div>
                   <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Referring Doctor</span>
                      <div className="font-medium">{result.referringDoctor || "Not identified"}</div>
                   </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Diagnosis / Condition</span>
                  <div className="font-medium">{result.diagnosis || "Not identified"}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clinical Summary</span>
                  <div className="p-4 bg-muted/50 rounded-md text-sm leading-relaxed text-foreground/90">
                    {result.summary}
                  </div>
                </div>

                <div className="space-y-1">
                   <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Action</span>
                   <div className="font-medium text-primary p-3 bg-primary/5 rounded-md border border-primary/10">
                    {result.recommendedAction}
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl text-muted-foreground bg-muted/10">
              {!loading && (
                <>
                  <FileText className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-center max-w-xs">
                    Analysis results will appear here after processing.
                  </p>
                </>
              )}
               {loading && (
                <div className="space-y-4 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary opacity-50" />
                    <p className="text-sm">Extracting text & analyzing...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
