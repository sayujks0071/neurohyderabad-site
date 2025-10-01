import { Metadata } from 'next';
import { DraftsList } from './components/DraftsList';
import { DraftViewer } from './components/DraftViewer';

export const metadata: Metadata = {
  title: 'Content Drafts | Dr. Sayuj - Brain & Spine Surgeon',
  description: 'Preview generated content drafts for SEO optimization',
  robots: 'noindex, nofollow', // Don't index draft content
};

export default function DraftsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Drafts
          </h1>
          <p className="text-gray-600">
            Preview generated content from the GEO bot before publishing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drafts List */}
          <div className="lg:col-span-1">
            <DraftsList />
          </div>

          {/* Draft Viewer */}
          <div className="lg:col-span-2">
            <DraftViewer />
          </div>
        </div>
      </div>
    </div>
  );
}

