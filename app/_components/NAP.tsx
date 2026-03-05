import React from 'react';
import { getLocationById } from '@/src/data/locations';

interface NAPProps {
  className?: string;
  showEmail?: boolean;
  variant?: 'default' | 'compact' | 'footer';
  locationId?: string;
}

export default function NAP({ 
  className = '', 
  showEmail = true, 
  variant = 'default',
  locationId = 'malakpet'
}: NAPProps) {
  const baseClasses = "text-[var(--color-text-secondary)]";
  const compactClasses = "text-sm";
  const footerClasses = "text-[var(--color-text-secondary)] text-sm";
  
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
      <div className="font-semibold text-[var(--color-text-primary)] mb-2">
        {location.canonical_display_name}
      </div>
      <div className="space-y-1">
        <div className="flex items-start">
          <span className="font-medium min-w-[80px]">Hospital:</span>
          <span>{location.address.streetAddress}, {location.address.addressLocality} {location.address.postalCode}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium min-w-[80px]">Phone:</span>
          <a 
            href={`tel:${location.telephone}`}
            className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium"
          >
            {location.telephone}
          </a>
        </div>
        {showEmail && (
          <div className="flex items-center">
            <span className="font-medium min-w-[80px]">Email:</span>
            <a 
              href="mailto:hellodr@drsayuj.info" 
              className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)]"
            >
              hellodr@drsayuj.info
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
