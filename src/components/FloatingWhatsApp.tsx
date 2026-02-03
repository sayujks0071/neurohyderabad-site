"use client";
import { useState, useEffect } from 'react';
import { analytics } from '../lib/analytics';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Optimized scroll detection using IntersectionObserver
    // This avoids firing events on every scroll tick
    const sentinel = document.createElement('div');
    // Sentinel element used to trigger visibility state
    // When this element scrolls out of view (at 300px), the button appears
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.height = '300px'; // Show button after scrolling 300px
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';
    sentinel.style.zIndex = '-1';
    sentinel.setAttribute('aria-hidden', 'true');
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(([entry]) => {
      // If sentinel is NOT intersecting (meaning we scrolled past it), show button
      setIsVisible(!entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (document.body.contains(sentinel)) {
        document.body.removeChild(sentinel);
      }
    };
  }, []);

  const handleClick = () => {
    analytics.track('WhatsApp_Click', {
      location: 'floating_button',
      page_type: 'service'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
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
  );
}
