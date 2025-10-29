import { Metadata } from 'next';
import Link from 'next/link';
import { mediaPublications } from '@/src/content/media';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';

export const metadata: Metadata = {
  title: 'Media Publications & Expert Articles | Dr. Sayuj Krishnan',
  description: 'Expert articles, media coverage, and publications by Dr. Sayuj Krishnan on neurosurgery, spine surgery, and minimally invasive techniques in leading healthcare publications.',
  keywords: 'media publications, expert articles, spine surgery articles, neurosurgery publications, Dr. Sayuj Krishnan articles',
  alternates: {
    canonical: 'https://www.drsayuj.info/media',
  },
  openGraph: {
    title: 'Media Publications & Expert Articles | Dr. Sayuj Krishnan',
    description: 'Expert articles, media coverage, and publications by Dr. Sayuj Krishnan on neurosurgery and spine surgery.',
    type: 'website',
  },
};

export default function MediaPage() {
  const featuredPublications = mediaPublications.filter(pub => pub.featured);
  const allPublications = mediaPublications;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Media Publications & Expert Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dr. Sayuj Krishnan's expert insights, research contributions, and media coverage 
              in leading healthcare publications and news outlets.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Publications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPublications.map((publication) => (
              <div key={publication.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {publication.type.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {publication.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {publication.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>{publication.publication}</strong>
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    {publication.description}
                  </p>
                  
                  {publication.author && (
                    <p className="text-sm text-gray-500 mb-4">
                      By {publication.author}
                    </p>
                  )}
                  
                  <a 
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read Full Article →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Publications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            All Publications
          </h2>
          <div className="space-y-6">
            {allPublications.map((publication) => (
              <div key={publication.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {publication.type.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {publication.date}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {publication.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>{publication.publication}</strong>
                      {publication.author && ` • By ${publication.author}`}
                    </p>
                    
                    <p className="text-gray-700 text-sm">
                      {publication.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <a 
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Read Article →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Interested in Expert Insights?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a consultation with Dr. Sayuj Krishnan to discuss your treatment options 
            and learn more about advanced neurosurgical techniques.
          </p>
          <StandardCTA />
        </div>
      </section>

      {/* NAP Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NAP />
        </div>
      </section>

      {/* Review Notice */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewedBy lastReviewed="2025-01-15" />
        </div>
      </section>
    </div>
  );
}
