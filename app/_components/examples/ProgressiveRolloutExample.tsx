'use client';

/**
 * Use Case 4: Progressive Feature Rollout
 * 
 * Best for: Gradually releasing features to percentage of users
 * 
 * Example: Roll out new appointment system to 10% → 50% → 100% of users
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';
import { useMemo } from 'react';

export default function ProgressiveRolloutExample() {
  // Percentage-based rollout (0-100)
  const newAppointmentFlowRollout = useFeatureFlag('newAppointmentFlowRollout', 0);
  const enableNewPaymentSystem = useFeatureFlag('enableNewPaymentSystem', false);

  // Determine if user should see new feature based on rollout percentage
  const shouldShowNewFlow = useMemo(() => {
    if (newAppointmentFlowRollout === 0) return false;
    if (newAppointmentFlowRollout === 100) return true;
    
    // Hash user ID to get consistent assignment
    const userId = localStorage.getItem('user_id') || 'anonymous';
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const userBucket = hash % 100;
    
    return userBucket < newAppointmentFlowRollout;
  }, [newAppointmentFlowRollout]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Appointment Booking</h2>

      {shouldShowNewFlow ? (
        <div className="border-2 border-blue-500 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              NEW
            </span>
            <span className="text-sm text-gray-600">
              Rollout: {newAppointmentFlowRollout}%
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">New Appointment Flow</h3>
          <p className="text-gray-700 mb-4">
            Experience our improved booking system with faster scheduling and better availability.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Book with New Flow
          </button>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Standard Appointment Flow</h3>
          <p className="text-gray-700 mb-4">
            Use our standard booking system.
          </p>
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Book Appointment
          </button>
        </div>
      )}

      {enableNewPaymentSystem && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-800">
            ✓ New payment system is enabled
          </p>
        </div>
      )}
    </div>
  );
}
