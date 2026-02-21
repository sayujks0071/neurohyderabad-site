import React from 'react';

interface MedicalCitationsProps {
  className?: string;
}

export default function MedicalCitations({ className = '' }: MedicalCitationsProps) {
  return (
    <section
      className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 my-8 ${className}`}
      aria-label="Medical References"
    >
      <h3 className="text-lg font-bold text-blue-900 mb-4">Medical References</h3>
      <div className="text-sm text-gray-700 space-y-2">
        <p>• American Association of Neurological Surgeons (AANS). "Minimally Invasive Spine Surgery." 2024.</p>
        <p>• National Institute of Neurological Disorders and Stroke (NINDS). "Spinal Cord Injury Information Page." 2024.</p>
        <p>• Mayo Clinic. "Spinal Fusion Surgery: What You Need to Know." 2024.</p>
        <p>• NHS. "Spinal Surgery: Types and Recovery." 2024.</p>
        <p>• World Health Organization (WHO). "Surgical Safety Guidelines." 2024.</p>
      </div>
    </section>
  );
}
