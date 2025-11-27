/**
 * Example: Real-world Hypertune Integration
 * 
 * This shows how to use the actual flags created in Hypertune
 * once code generation is complete.
 * 
 * After running `npx hypertune`, uncomment and use these examples.
 */

import getHypertune from '@/src/lib/hypertune/server';

export default async function HypertuneIntegrationExample() {
  // Get Hypertune instance
  const hypertune = await getHypertune();

  // Once flags are published and code is generated, you can use:
  
  // Hero Section A/B Test
  // const heroVariant = hypertune.heroSectionVariant();
  
  // CTA Button Optimization
  // const ctaVariant = hypertune.ctaButtonVariant();
  
  // Feature Toggles
  // const enableContentRecs = hypertune.enableContentRecommendations();
  // const enableAppointment = hypertune.enableAppointmentBooking();
  // const enableBlog = hypertune.enableBlogSection();
  // const enableTestimonials = hypertune.enableTestimonials();
  // const enableSchema = hypertune.enableStructuredDataSchema();
  // const enableGA4 = hypertune.enableGa4EnhancedTracking();
  // const enableWhatsApp = hypertune.enableWhatsappIntegration();
  // const enablePremium = hypertune.enablePremiumFeatures();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Hypertune Integration</h2>
      
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Status:</strong> Flags created in Hypertune. 
          Publish them from draft to main, then run <code>npx hypertune</code> to generate type-safe code.
        </p>
      </div>

      {/* Example conditional rendering */}
      {/* 
      {heroVariant ? (
        <NewHeroDesign />
      ) : (
        <ClassicHeroDesign />
      )}
      
      {enableBlog && <BlogSection />}
      {enableTestimonials && <TestimonialsCarousel />}
      {enableWhatsApp && <WhatsAppFloatingButton />}
      {enablePremium && <PremiumFeaturesBanner />}
      */}
    </div>
  );
}

