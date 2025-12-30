'use client';

import { useState, useEffect } from 'react';
import { FileText, Code, Copy, Check, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DraftContent {
  content: string;
  type: 'markdown' | 'json';
  filename: string;
  lastModified: string;
}

export function DraftViewer() {
  const [content, setContent] = useState<DraftContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'source'>('preview');

  // Listen for draft selection from parent component
  useEffect(() => {
    const handleDraftSelect = (event: CustomEvent) => {
      const draftPath = event.detail;
      if (draftPath) {
        fetchDraftContent(draftPath);
      }
    };

    window.addEventListener('draftSelect', handleDraftSelect as EventListener);
    return () => {
      window.removeEventListener('draftSelect', handleDraftSelect as EventListener);
    };
  }, []);

  const fetchDraftContent = async (draftPath: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/drafts/content?path=${encodeURIComponent(draftPath)}`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
        setViewMode(data.type === 'json' ? 'source' : 'preview');
      }
    } catch (error) {
      console.error('Failed to fetch draft content:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (content) {
      await navigator.clipboard.writeText(content.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadFile = () => {
    if (content) {
      const blob = new Blob([content.content], { 
        type: content.type === 'json' ? 'application/json' : 'text/markdown' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = content.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!content) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="text-center text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Select a Draft</h3>
          <p>Choose a content or schema draft from the list to preview it here.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              {content.type === 'json' ? (
                <Code className="w-5 h-5 mr-2 text-green-600" />
              ) : (
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {content.filename}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Last modified: {formatDate(content.lastModified)}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {content.type === 'markdown' && (
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('source')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === 'source'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Source
                </button>
              </div>
            )}
            
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            
            <button
              onClick={downloadFile}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {content.type === 'json' ? (
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{JSON.stringify(JSON.parse(content.content), null, 2)}</code>
            </pre>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            {viewMode === 'preview' ? (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-medium text-gray-900 mb-2 mt-4">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-800">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  ),
                }}
              >
                {content.content}
              </ReactMarkdown>
            ) : (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-gray-300 text-sm">
                  <code>{content.content}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

