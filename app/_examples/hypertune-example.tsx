/**
 * Example: Using Hypertune in a Server Component
 * 
 * This demonstrates how to use feature flags from Hypertune
 * in Next.js server components.
 */

import getHypertune from '@/src/lib/hypertune/server';

export default async function HypertuneExample() {
  // Get the Hypertune instance (server-side only)
  const hypertune = await getHypertune();

  // Access feature flags (replace with your actual flag names)
  // const flagValue = hypertune.myFeatureFlag();
  // const experimentVariant = hypertune.myExperiment();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">Hypertune Example</h2>
      <p className="text-gray-600">
        This component demonstrates server-side Hypertune usage.
        Uncomment the flag access code above once you have flags configured.
      </p>
      {/* 
      Example usage:
      {flagValue && (
        <div>Feature is enabled!</div>
      )}
      
      {experimentVariant === 'variant_a' && (
        <div>Showing variant A</div>
      )}
      */}
    </div>
  );
}

