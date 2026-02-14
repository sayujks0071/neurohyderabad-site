"use client";

import { useState, useEffect, useRef } from 'react';
import { analytics } from '../lib/analytics';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Use IntersectionObserver for performant scroll detection
    // The sentinel is a 300px tall invisible div at the top of the page.
    // When it leaves the viewport (scrolled past 300px), we show the button.
    const observer = new IntersectionObserver(([entry]) => {
      // Show button when sentinel is NOT intersecting (scrolled past)
      setIsVisible(!entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    analytics.track('WhatsApp_Click', {
      location: 'floating_button',
      page_type: 'service'
    });
  };

  return (
    <>
      {/* Sentinel element for scroll detection */}
      <div
        ref={sentinelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '300px',
          width: '1px',
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1
        }}
        aria-hidden="true"
      />

      {/* Floating Button - Only rendered when visible */}
      {isVisible && (
        <div className="fixed bottom-24 left-4 z-[55] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <a
            href="https://wa.me/919778280044?text=Hi%20Dr.%20Sayuj,%20I%20would%20like%20to%20book%20a%20consultation%20for%20neurosurgery%20treatment."
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
            aria-label="Contact Dr. Sayuj on WhatsApp for consultation"
          >
            <WhatsAppIcon className="w-6 h-6" />
          </a>
        </div>
      )}
    </>
  );
}
