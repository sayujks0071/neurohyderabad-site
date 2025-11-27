/**
 * Example: Using Hypertune in a Client Component
 * 
 * This demonstrates how to use feature flags from Hypertune
 * in Next.js client components using the provider.
 */

'use client';

import { useHypertune } from '@/app/providers/hypertune-provider';

export default function HypertuneClientExample() {
  const { hypertune, isReady } = useHypertune();

  if (!isReady) {
    return <div>Loading feature flags...</div>;
  }

  if (!hypertune) {
    return <div>Hypertune not available</div>;
  }

  // Access feature flags (replace with your actual flag names)
  // const flagValue = hypertune.myFeatureFlag();
  // const experimentVariant = hypertune.myExperiment();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">Hypertune Client Example</h2>
      <p className="text-gray-600">
        This component demonstrates client-side Hypertune usage.
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

