import React from 'react';

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
        Dr. Sayuj Krishnan S
      </div>
      <div className="space-y-1">
        <div className="flex items-start">
          <span className="font-medium min-w-[80px]">Hospital:</span>
          <span>Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad 500036</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium min-w-[80px]">Phone:</span>
          <a 
            href="tel:+919778280044" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            +91 9778280044
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
