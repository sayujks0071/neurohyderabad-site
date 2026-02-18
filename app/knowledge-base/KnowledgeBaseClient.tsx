/**
 * Knowledge Base Client Component
 *
 * Searchable medical library powered by Gemini File API
 */

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { CANONICAL_TELEPHONE } from '@/src/data/locations';

interface SearchResult {
  answer: string;
  sources?: Array<{
    fileName?: string;
    uri?: string;
  }>;
  usedFiles?: string[];
}

export default function KnowledgeBaseClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'standard' | 'medical' | 'patient-education'>('standard');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini-files/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          searchType: searchType,
          maxResults: 10,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.details || errorData.message || errorData.error || `Search failed: ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setResults([data]);
    } catch (err) {
      console.error('Search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to search knowledge base';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Knowledge Base</h1>
              <p className="mt-2 text-gray-600">
                Search our comprehensive library of medical information and documents
              </p>
            </div>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                Search Query
              </label>
              <input
                id="query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., brain tumor treatment options, spine surgery recovery..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-2">
                Search Type
              </label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={loading}
              >
                <option value="standard">Standard Search</option>
                <option value="medical">Medical Search</option>
                <option value="patient-education">Patient Education</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                'Search Knowledge Base'
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <p className="text-sm text-red-600 mt-2">
              Please try again or contact us at {CANONICAL_TELEPHONE}
            </p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700">
                    {result.answer.split('\n').map((paragraph, pIdx) => {
                      // Handle markdown-style headers
                      if (paragraph.startsWith('##')) {
                        return (
                          <h2 key={pIdx} className="text-2xl font-bold mt-6 mb-4 text-gray-900">
                            {paragraph.replace(/^##\s*/, '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('###')) {
                        return (
                          <h3 key={pIdx} className="text-xl font-semibold mt-4 mb-3 text-gray-900">
                            {paragraph.replace(/^###\s*/, '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
                        return (
                          <li key={pIdx} className="ml-4 mb-2">
                            {paragraph.replace(/^[-*]\s*/, '')}
                          </li>
                        );
                      }
                      if (paragraph.trim() === '') {
                        return <br key={pIdx} />;
                      }
                      return (
                        <p key={pIdx} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Sources */}
                {result.sources && result.sources.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Sources:</p>
                    <ul className="space-y-1">
                      {result.sources.map((source, sIdx) => (
                        <li key={sIdx} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2 text-primary-600">•</span>
                          <span>{source.fileName || source.uri || 'Medical document'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Search Medical Information</h3>
            <p className="mt-2 text-sm text-gray-500">
              Enter a query above to search our medical knowledge base
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-blue-800">
            <strong>Medical Disclaimer:</strong> The information provided in this knowledge base
            is for educational purposes only and does not replace professional medical advice,
            diagnosis, or treatment. Always seek the advice of your physician or other qualified
            health provider with any questions you may have regarding a medical condition. For
            immediate medical concerns, please contact Dr. Sayuj at {CANONICAL_TELEPHONE} or visit the
            nearest emergency room.
          </p>
        </div>
      </main>
    </div>
  );
}
