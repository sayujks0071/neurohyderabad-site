import { Metadata } from 'next';
import Link from 'next/link';
import { patientStories } from '@/src/content/stories';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import VideoObjectSchema from '@/app/components/schemas/VideoObjectSchema';

export const metadata: Metadata = {
  title: 'Patient Success Stories | Neurosurgery & Spine Surgery Hyderabad',
  description: 'Real patient stories of successful neurosurgery and spine surgery outcomes at Yashoda Hospital Malakpet with Dr. Sayuj Krishnan.',
  keywords: 'patient stories, neurosurgery success, spine surgery outcomes, brain surgery recovery, Hyderabad',
  alternates: {
    canonical: 'https://www.drsayuj.info/patient-stories',
  },
  openGraph: {
    title: 'Patient Success Stories | Dr. Sayuj Krishnan',
    description: 'Real patient stories of successful neurosurgery and spine surgery outcomes in Hyderabad.',
    type: 'website',
  },
};

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

export default function PatientStoriesPage() {
  // Safety check - ensure patientStories exists
  if (!patientStories || patientStories.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Patient Stories</h1>
          <p className="text-gray-600">Content is being updated. Please check back soon.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Home</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Patient Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from patients who have successfully undergone neurosurgery and spine surgery 
              with Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patientStories.map((story) => {
              // Extract video ID for schema
              const getVideoId = (url?: string) => {
                if (!url) return null;
                const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                return match ? match[1] : null;
              };
              
              const videoId = story.videoUrl ? getVideoId(story.videoUrl) : null;
              
              return (
                <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* VideoObject Schema for videos */}
                  {videoId && (
                    <VideoObjectSchema
                      videoId={videoId}
                      title={story.title}
                      description={story.summary}
                      uploadDate={story.date}
                    />
                  )}
                  
                  {/* If story has a videoUrl, embed YouTube above content */}
                  {story.videoUrl ? (
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        className="w-full h-full"
                        src={story.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/').split('&')[0]}
                        title={story.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {story.procedure}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {story.title}
                  </h3>
                  
                  <blockquote className="text-gray-700 italic mb-4">
                    "{story.quote}"
                  </blockquote>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {story.summary}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Outcomes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {story.outcomes.slice(0, 2).map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {!story.videoUrl ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        — {story.patientInitials}
                      </span>
                      <Link 
                        href={`/patient-stories/${story.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Read Full Story →
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        — Video Testimonial
                      </span>
                      <a 
                        href={story.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Watch on YouTube →
                      </a>
                    </div>
                  )}
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a consultation with Dr. Sayuj Krishnan to discuss your treatment options.
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
