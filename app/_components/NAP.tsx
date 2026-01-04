import React from 'react';
import { getLocationById, CANONICAL_PHYSICIAN_NAME } from '@/src/data/locations';

interface NAPProps {
  className?: string;
  showEmail?: boolean;
  variant?: 'default' | 'compact' | 'footer';
}

export default function NAP({ 
  className = '', 
  showEmail = true, 
  variant = 'default' 
}: NAPProps) {
  // Default to Malakpet as the main location for generic NAP
  const location = getLocationById("malakpet");

  if (!location) return null;

  const baseClasses = "text-gray-700";
  const compactClasses = "text-sm";
  const footerClasses = "text-gray-600 text-sm";
  
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
        {CANONICAL_PHYSICIAN_NAME}
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
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {location.telephone}
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
