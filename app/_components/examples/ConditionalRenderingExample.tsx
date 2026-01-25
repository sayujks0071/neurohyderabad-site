'use client';

/**
 * Use Case 5: Conditional Rendering & Content Management
 * 
 * Best for: Showing/hiding sections, changing layouts, managing content without deployments
 * 
 * Example: Show/hide testimonials, change homepage layout, toggle features
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';

export default function ConditionalRenderingExample() {
  // Content visibility flags
  const showTestimonials = useFeatureFlag('showTestimonials', true);
  const showVideoSection = useFeatureFlag('showVideoSection', false);
  const showPricingTable = useFeatureFlag('showPricingTable', true);
  const enableLiveChat = useFeatureFlag('enableLiveChat', false);

  // Layout variant - explicitly type as string to allow any variant comparison
  const layoutVariant = useFeatureFlag('homepageLayout', 'standard') as string;

  return (
    <div className="space-y-8">
      {/* Dynamic Layout */}
      {layoutVariant === 'compact' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">Compact Layout - Column 1</div>
          <div className="bg-blue-50 p-4 rounded">Compact Layout - Column 2</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">Standard Layout - Full Width</div>
        </div>
      )}

      {/* Conditional Sections */}
      {showTestimonials && (
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Patient Testimonials</h3>
          <div className="space-y-4">
            <blockquote className="border-l-4 border-blue-500 pl-4">
              "Excellent care and professional service. Highly recommended!"
            </blockquote>
            <blockquote className="border-l-4 border-blue-500 pl-4">
              "Dr. Sayuj provided exceptional treatment for my spine condition."
            </blockquote>
          </div>
        </section>
      )}

      {showVideoSection && (
        <section className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Watch Our Introduction Video</h3>
          <div className="aspect-video bg-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-600">Video Player Placeholder</p>
          </div>
        </section>
      )}

      {showPricingTable && (
        <section className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Consultation Fees</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Service</th>
                <th className="text-right p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Initial Consultation</td>
                <td className="text-right p-2">₹1,500</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Follow-up</td>
                <td className="text-right p-2">₹1,000</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Floating Chat Widget */}
      {enableLiveChat && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600">
          💬 Chat
        </div>
      )}

      {/* Debug Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>Layout: {layoutVariant}</p>
        <p>Testimonials: {showTestimonials ? 'ON' : 'OFF'}</p>
        <p>Video: {showVideoSection ? 'ON' : 'OFF'}</p>
        <p>Pricing: {showPricingTable ? 'ON' : 'OFF'}</p>
        <p>Live Chat: {enableLiveChat ? 'ON' : 'OFF'}</p>
      </div>
    </div>
  );
}
