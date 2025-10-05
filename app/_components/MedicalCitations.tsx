import React from 'react';

interface MedicalCitationsProps {
  className?: string;
}

export default function MedicalCitations({ className = '' }: MedicalCitationsProps) {
  return (
    <div className={`bg-gray-50 border-l-4 border-gray-300 p-4 my-6 ${className}`}>
      <h3 className="text-sm font-medium text-gray-800 mb-2">Medical References</h3>
      <div className="text-xs text-gray-600 space-y-1">
        <p>• American Association of Neurological Surgeons (AANS). "Minimally Invasive Spine Surgery." 2024.</p>
        <p>• National Institute of Neurological Disorders and Stroke (NINDS). "Spinal Cord Injury Information Page." 2024.</p>
        <p>• Mayo Clinic. "Spinal Fusion Surgery: What You Need to Know." 2024.</p>
        <p>• NHS. "Spinal Surgery: Types and Recovery." 2024.</p>
        <p>• World Health Organization (WHO). "Surgical Safety Guidelines." 2024.</p>
      </div>
    </div>
  );
}
