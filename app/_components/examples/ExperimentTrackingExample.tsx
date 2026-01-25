'use client';

/**
 * Use Case 6: Experiment Tracking & Analytics
 * 
 * Best for: Tracking which variant users see, measuring experiment impact
 * 
 * Example: Track CTA performance, form completion rates, feature usage
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';
import { analytics } from '@/src/lib/analytics';
import { useEffect, useState } from 'react';

export default function ExperimentTrackingExample() {
  const [interactions, setInteractions] = useState(0);

  // Get experiment variants
  const formLayout = useFeatureFlag('formLayout', 'single-column');
  const buttonText = useFeatureFlag('buttonText', 'Submit');
  const showProgressBar = useFeatureFlag('showProgressBar', false);

  // Track experiment exposure on mount
  useEffect(() => {
    analytics.track('Experiment_Exposure', {
      experiment_name: 'formLayout',
      experiment_variant: formLayout,
      page_slug: window.location.pathname,
    });

    analytics.track('Experiment_Exposure', {
      experiment_name: 'buttonText',
      experiment_variant: buttonText,
      page_slug: window.location.pathname,
    });
  }, [formLayout, buttonText]);

  const handleInteraction = (action: string) => {
    setInteractions(prev => prev + 1);
    
    analytics.track('Form_Interaction', {
      action,
      experiment_name: 'formLayout',
      experiment_variant: formLayout,
      button_text: buttonText,
      interactions_count: interactions + 1,
      page_slug: window.location.pathname,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Appointment Form</h2>

      {showProgressBar && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(interactions * 25, 100)}%` }}
          />
        </div>
      )}

      <form 
        className={`space-y-4 ${formLayout === 'two-column' ? 'grid grid-cols-2 gap-4' : ''}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleInteraction('form_submit');
        }}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            onFocus={() => handleInteraction('field_focus')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            onFocus={() => handleInteraction('field_focus')}
          />
        </div>

        {formLayout === 'single-column' && (
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              onFocus={() => handleInteraction('field_focus')}
            />
          </div>
        )}

        <div className={formLayout === 'two-column' ? 'col-span-2' : ''}>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => handleInteraction('button_click')}
          >
            {buttonText}
          </button>
        </div>
      </form>

      <div className="text-xs text-gray-500 space-y-1 border-t pt-4">
        <p><strong>Experiment Tracking:</strong></p>
        <p>Layout: {formLayout}</p>
        <p>Button Text: {buttonText}</p>
        <p>Progress Bar: {showProgressBar ? 'ON' : 'OFF'}</p>
        <p>Interactions: {interactions}</p>
      </div>
    </div>
  );
}
