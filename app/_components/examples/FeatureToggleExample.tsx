'use client';

/**
 * Use Case 1: Feature Toggle
 * 
 * Best for: Gradually rolling out new features, enabling/disabling features
 * without code deployment
 * 
 * Example: Toggle a new AI chat widget, new appointment flow, etc.
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';

export default function FeatureToggleExample() {
  // Toggle feature on/off
  const enableNewChatWidget = useFeatureFlag('enableNewChatWidget', false);
  const enableAdvancedBooking = useFeatureFlag('enableAdvancedBooking', false);

  return (
    <div>
      {enableNewChatWidget && (
        <div className="bg-blue-100 p-4 rounded">
          <h3>New AI Chat Widget</h3>
          <p>This feature is enabled via feature flag</p>
        </div>
      )}

      {enableAdvancedBooking && (
        <div className="bg-green-100 p-4 rounded mt-4">
          <h3>Advanced Booking Flow</h3>
          <p>New booking experience is active</p>
        </div>
      )}

      {!enableNewChatWidget && !enableAdvancedBooking && (
        <p className="text-gray-500">No new features enabled</p>
      )}
    </div>
  );
}
