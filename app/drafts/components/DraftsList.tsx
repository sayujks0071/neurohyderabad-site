'use client';

import { useState, useEffect } from 'react';
import { FileText, Calendar, Eye } from 'lucide-react';

interface DraftFile {
  name: string;
  path: string;
  type: 'content' | 'schema';
  lastModified: string;
  size: number;
}

export function DraftsList() {
  const [drafts, setDrafts] = useState<DraftFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDraft, setSelectedDraft] = useState<string | null>(null);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await fetch('/api/drafts/list');
      if (response.ok) {
        const data = await response.json();
        setDrafts(data.drafts || []);
      }
    } catch (error) {
      console.error('Failed to fetch drafts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const contentDrafts = drafts.filter(d => d.type === 'content');
  const schemaDrafts = drafts.filter(d => d.type === 'schema');

  return (
    <div className="space-y-6">
      {/* Content Drafts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Content Drafts
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Generated markdown content
          </p>
        </div>
        
        <div className="p-4">
          {contentDrafts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No content drafts found</p>
              <p className="text-sm">Run the GEO bot to generate content</p>
            </div>
          ) : (
            <div className="space-y-2">
              {contentDrafts.map((draft) => (
                <button
                  key={draft.path}
                  onClick={() => {
                    setSelectedDraft(draft.path);
                    // Dispatch custom event to notify DraftViewer
                    window.dispatchEvent(new CustomEvent('draftSelect', { detail: draft.path }));
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedDraft === draft.path
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {draft.name.replace('.md', '')}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(draft.lastModified)}
                        <span className="mx-2">•</span>
                        {formatFileSize(draft.size)}
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schema Drafts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            Schema Drafts
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            JSON-LD structured data
          </p>
        </div>
        
        <div className="p-4">
          {schemaDrafts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No schema drafts found</p>
              <p className="text-sm">Run the GEO bot to generate schemas</p>
            </div>
          ) : (
            <div className="space-y-2">
              {schemaDrafts.map((draft) => (
                <button
                  key={draft.path}
                  onClick={() => {
                    setSelectedDraft(draft.path);
                    // Dispatch custom event to notify DraftViewer
                    window.dispatchEvent(new CustomEvent('draftSelect', { detail: draft.path }));
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedDraft === draft.path
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {draft.name.replace('.jsonld', '')}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(draft.lastModified)}
                        <span className="mx-2">•</span>
                        {formatFileSize(draft.size)}
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchDrafts}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Refresh Drafts
      </button>
    </div>
  );
}
