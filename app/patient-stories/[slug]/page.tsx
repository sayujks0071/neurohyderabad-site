import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { patientStories, PatientStory } from '@/src/content/stories';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import SchemaScript from '@/app/_components/SchemaScript';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return patientStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = patientStories.find((s) => s.slug === slug);
  
  if (!story) {
    return {
      title: 'Patient Story Not Found',
    };
  }

  return {
    title: `${story.title} | Patient Success Story | Dr. Sayuj Krishnan`,
    description: `${story.summary} Read the complete patient story of ${story.patientInitials} who underwent ${story.procedure} in Hyderabad.`,
    keywords: `${story.procedure}, ${story.condition}, patient story, neurosurgery, spine surgery, Hyderabad, Dr. Sayuj Krishnan`,
    alternates: {
      canonical: `https://www.drsayuj.info/patient-stories/${story.slug}`,
    },
    openGraph: {
      title: `${story.title} | Patient Success Story`,
      description: story.summary,
      type: 'article',
      url: `https://www.drsayuj.info/patient-stories/${story.slug}`,
    },
  };
}

export default async function PatientStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = patientStories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.drsayuj.info/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Patient Stories",
        "item": "https://www.drsayuj.info/patient-stories"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": story.title,
        "item": `https://www.drsayuj.info/patient-stories/${story.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "description": story.summary,
    "author": {
      "@type": "Person",
      "name": "Dr. Sayuj Krishnan",
      "url": "https://www.drsayuj.info"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Sayuj Krishnan - Neurosurgeon",
      "url": "https://www.drsayuj.info"
    },
    "datePublished": story.date,
    "dateModified": story.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.drsayuj.info/patient-stories/${story.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SchemaScript data={breadcrumbSchema} />
      <SchemaScript data={articleSchema} />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/patient-stories" className="hover:text-blue-600">Patient Stories</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{story.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {story.procedure}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {story.title}
            </h1>
            <p className="text-xl text-gray-600">
              A patient success story from {story.patientInitials}
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Patient Quote */}
            <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <p className="text-xl text-blue-900 italic mb-4">
                "{story.quote}"
              </p>
              <footer className="text-blue-800 font-medium">
                — {story.patientInitials}
              </footer>
            </blockquote>

            {/* Condition & Treatment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Condition</h3>
                <p className="text-gray-700">{story.condition}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Treatment</h3>
                <p className="text-gray-700">{story.procedure}</p>
              </div>
            </div>

            {/* Story Summary */}
            <div className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Story</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {story.summary}
              </p>
            </div>

            {/* Recovery Time */}
            {story.recoveryTime && (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
                <h3 className="text-lg font-bold text-green-900 mb-2">Recovery Time</h3>
                <p className="text-green-800">{story.recoveryTime}</p>
              </div>
            )}

            {/* Outcomes */}
            <div className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment Outcomes</h2>
              <ul className="space-y-4">
                {story.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Considering Similar Treatment?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a consultation with Dr. Sayuj Krishnan to discuss your treatment options.
          </p>
          <StandardCTA />
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Patient Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patientStories
              .filter((s) => s.slug !== story.slug)
              .slice(0, 2)
              .map((relatedStory) => (
                <Link 
                  key={relatedStory.id}
                  href={`/patient-stories/${relatedStory.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {relatedStory.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {relatedStory.summary.substring(0, 120)}...
                  </p>
                  <span className="text-blue-600 text-sm font-medium">
                    Read Story →
                  </span>
                </Link>
              ))}
          </div>
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
