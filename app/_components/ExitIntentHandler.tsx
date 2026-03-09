'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';

interface ExitIntentHandlerProps {
  /** Show exit intent modal/offer when user is about to leave */
  showOffer?: boolean;
  /** Custom message to show on exit intent */
  offerMessage?: string;
}

export default function ExitIntentHandler({ 
  showOffer = false, 
  offerMessage = 'Before you go, would you like to schedule a consultation?' 
}: ExitIntentHandlerProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if user has given consent
    const hasConsent = typeof window !== 'undefined' && 
      localStorage.getItem('analytics-consent') === 'true';
    
    if (!hasConsent) return;

    let isTracking = true;
    let hasTrackedExitIntent = false;

    // Track when mouse leaves the document to detect exit intent (moving mouse toward top of screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (!isTracking || hasTrackedExitIntent) return;
      
      // Exit intent: mouse leaves from the top of the viewport (typically to close tab/window)
      if (e.clientY <= 10) {
        hasTrackedExitIntent = true;
        
        // Track exit intent event
        analytics.exitIntent(pathname || '/', 'mouse_exit_top');
        
        // Optionally show an offer/modal
        if (showOffer) {
          // Create a simple modal (you can enhance this with a proper modal component)
          const modal = document.createElement('div');
          modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
          modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 class="text-xl font-bold mb-4">Before you go...</h3>
              <p class="text-[var(--color-text-secondary)] mb-6">${offerMessage}</p>
              <div class="flex gap-3">
                <a href="/appointments" class="flex-1 bg-[var(--color-primary-500)] text-white px-4 py-2 rounded-lg text-center hover:bg-[var(--color-primary-700)]">
                  Schedule Consultation
                </a>
                <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                  Not Now
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
          
          // Track modal shown
          analytics.track('Exit_Intent_Modal_Shown', {
            page_slug: pathname || '/'
          });
        }
      }
    };

    // Track page visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden && !hasTrackedExitIntent) {
        hasTrackedExitIntent = true;
        analytics.exitIntent(pathname || '/', 'tab_switch');
      }
    };

    // Track beforeunload (user closing tab/window)
    const handleBeforeUnload = () => {
      if (!hasTrackedExitIntent) {
        analytics.exitIntent(pathname || '/', 'page_unload');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      isTracking = false;
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, showOffer, offerMessage]);

  return null;
}

