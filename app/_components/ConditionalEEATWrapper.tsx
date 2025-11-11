'use client';

import { usePathname } from 'next/navigation';
import AuthorBox from '@/components/AuthorBox';
import LastReviewed from '@/components/LastReviewed';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

/**
 * Routes where E-E-A-T components should NOT be displayed
 */
const EXCLUDED_ROUTE_PATTERNS = [
  /^\/api\//,                    // API routes
  /^\/test-/,                    // Test routes (test-routes, test-compression, test-inngest)
  /^\/utm-links/,                // UTM tracking pages
  /^\/statsig-test/,             // Statsig test pages
  /^\/simple-statsig-test/,      // Simple statsig test
  /^\/cache-test/,               // Cache test pages
  /^\/force-redeploy-test/,      // Force redeploy test
  /^\/force-cache-clear/,        // Cache clear test
];

/**
 * Conditionally renders E-E-A-T components based on current pathname.
 * E-E-A-T components are hidden on admin, test, API routes, and other non-content pages.
 */
export default function ConditionalEEATWrapper() {
  const pathname = usePathname();

  // Check if current pathname matches any excluded pattern
  const isExcluded = EXCLUDED_ROUTE_PATTERNS.some(pattern => pattern.test(pathname));

  // Don't render E-E-A-T components on excluded routes
  if (isExcluded) {
    return null;
  }

  return (
    <div className="container mx-auto mt-16 space-y-8 px-4 pb-12">
      <AuthorBox />
      <LastReviewed date="2025-09-15" />
      <MedicalDisclaimer />
    </div>
  );
}
