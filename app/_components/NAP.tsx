import React from 'react';
import { getLocationById } from '@/src/data/locations';

interface NAPProps {
  className?: string;
  showEmail?: boolean;
  variant?: 'default' | 'compact' | 'footer';
  locationId?: string;
}

/**
 * Standardized NAP Component
 * Renders Name, Address, Phone (plus WhatsApp & Directions) from the single source of truth.
 * Used in footers, sidebars, and service pages where the full LocationNAPCard is too heavy.
 * Note: JSON-LD Schema is handled separately by LocationSchema or PhysicianSchema components.
 */
export default function NAP({ 
  className = '', 
  showEmail = true, 
  variant = 'default',
  locationId = 'malakpet'
}: NAPProps) {
  const baseClasses = "text-gray-700";
  const compactClasses = "text-sm";
  const footerClasses = "text-gray-600 text-sm";
  
  const location = getLocationById(locationId) || getLocationById('malakpet');

  // Fallback if location data is missing (should not happen with correct data)
  if (!location) return null;

  const getClasses = () => {
    switch (variant) {
      case 'compact':
        return `${baseClasses} ${compactClasses} ${className}`;
      case 'footer':
        return `${baseClasses} ${footerClasses} ${className}`;
      default:
        return `${baseClasses} ${className}`;
    }
  };

  return (
    <div className={getClasses()}>
      <div className="font-semibold text-gray-900 mb-2">
        {location.canonical_display_name}
      </div>
      <div className="space-y-1">
        <div className="flex items-start">
          <span className="font-medium min-w-[80px]">Hospital:</span>
          <span>
            {location.address.streetAddress}, {location.address.addressLocality} {location.address.postalCode}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium min-w-[80px]">Phone:</span>
          <a 
            href={`tel:${location.telephone}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {location.telephone}
          </a>
        </div>
        {location.whatsapp && (
          <div className="flex items-center">
            <span className="font-medium min-w-[80px]">WhatsApp:</span>
            <a
              href={`https://wa.me/${location.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 font-medium"
              aria-label="Chat on WhatsApp"
            >
              Chat Now
            </a>
          </div>
        )}
        <div className="flex items-center">
          <span className="font-medium min-w-[80px]">Map:</span>
          <a
            href={location.directions_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
            aria-label="Get Directions"
          >
            Get Directions
          </a>
        </div>
        {showEmail && (
          <div className="flex items-center">
            <span className="font-medium min-w-[80px]">Email:</span>
            <a 
              href="mailto:hellodr@drsayuj.info" 
              className="text-blue-600 hover:text-blue-800"
            >
              hellodr@drsayuj.info
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
