'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '../lib/analytics';

interface AppointmentFormTrackerProps {
  pageSlug: string;
  service?: string;
  condition?: string;
  insuranceFlag?: boolean;
  locationHint?: string;
}

export default function AppointmentFormTracker({
  pageSlug,
  service,
  condition,
  insuranceFlag,
  locationHint
}: AppointmentFormTrackerProps) {
  const hasTrackedStart = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only track if user has given consent
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    if (!hasConsent) return;

    const form = formRef.current;
    if (!form) return;

    // Track appointment start on first field focus
    const handleFirstFocus = () => {
      if (!hasTrackedStart.current) {
        hasTrackedStart.current = true;
        analytics.appointmentStart(pageSlug, service || condition);
      }
    };

    // Track form validation errors (fires when HTML5 validation fails)
    const handleInvalid = (event: Event) => {
      const element = event.target as HTMLInputElement;
      analytics.formError(pageSlug, element.name || element.id || 'unknown_field', 'validation_error');
    };

    // Track successful form submission attempt
    const handleSubmit = (event: Event) => {
      // If we reach here, native validation passed (unless prevented)
      analytics.appointmentSubmit(pageSlug, 'generic_form_tracker', 0);
    };

    // Track rage clicks (rapid clicking on submit button)
    let clickCount = 0;
    let lastClickTime = 0;
    const handleRageClick = (event: Event) => {
      const now = Date.now();
      if (now - lastClickTime < 1000) { // Within 1 second
        clickCount++;
        if (clickCount >= 3) {
          analytics.formRageClicks(pageSlug, clickCount);
          clickCount = 0; // Reset to avoid spam
        }
      } else {
        clickCount = 1;
      }
      lastClickTime = now;
    };

    // Add event listeners
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFirstFocus, { once: true });
    });

    // Use capture phase (true) to catch invalid events from child inputs before they bubble/stop
    form.addEventListener('invalid', handleInvalid, true);
    form.addEventListener('submit', handleSubmit);
    
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener('click', handleRageClick);
    }

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFirstFocus);
      });
      form.removeEventListener('invalid', handleInvalid, true);
      form.removeEventListener('submit', handleSubmit);
      if (submitButton) {
        submitButton.removeEventListener('click', handleRageClick);
      }
    };
  }, [pageSlug, service, condition, insuranceFlag, locationHint]);

  return <div ref={formRef} style={{ display: 'none' }} />;
}
