'use client';

import { usePathname } from 'next/navigation';
import AuthorBox from '@/components/AuthorBox';
import LastReviewed from '@/components/LastReviewed';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

/**
 * Conditionally renders E-E-A-T (Expertise, Authoritativeness, and Trustworthiness) 
 * components only on content pages where they are contextually relevant.
 * 
 * Excludes these components from:
 * - API routes (/api/*)
 * - Admin/test routes (/test-routes, /admin/*)
 * - Utility routes (/utm-links, /force-*)
 * - Internal test pages (/statsig-test, /cache-test-*)
 * - Standalone policy pages (already have their own specific content)
 */
export default function ConditionalEEATSection() {
  const pathname = usePathname();

  // Define patterns where E-E-A-T components should NOT appear
  const excludePatterns = [
    /^\/api\//,                    // API routes
    /^\/test-routes/,              // Test routes
    /^\/utm-links/,                // UTM link utility page
    /^\/admin\//,                  // Admin routes (if any)
    /^\/force-/,                   // Force redeploy/cache test pages
    /^\/statsig-test/,             // Statsig test pages
    /^\/cache-test/,               // Cache test pages
    /^\/test-compression/,         // Compression test
    /^\/test-inngest/,             // Inngest test
    /^\/simple-statsig-test/,      // Simple statsig test
  ];

  // Check if current pathname matches any exclude pattern
  const shouldExclude = excludePatterns.some(pattern => pattern.test(pathname));

  // Don't render on excluded routes
  if (shouldExclude) {
    return null;
  }

  // Render E-E-A-T components on content pages
  return (
    <div className="container mx-auto mt-16 space-y-8 px-4 pb-12">
      <AuthorBox />
      <LastReviewed date="2025-09-15" />
      <MedicalDisclaimer />
    </div>
  );
}
