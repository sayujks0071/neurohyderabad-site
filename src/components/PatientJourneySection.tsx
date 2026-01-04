import React from 'react';

export interface JourneyStep {
  title: string;
  description: string;
  icon?: string;
}

interface PatientJourneySectionProps {
  title: string;
  steps: JourneyStep[];
}

export default function PatientJourneySection({ title, steps }: PatientJourneySectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">{title}</h2>
      <div className="relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-blue-100 -z-10 transform -translate-y-1/2"></div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-100 text-blue-600 font-bold text-lg flex items-center justify-center mb-4 group-hover:border-blue-500 group-hover:text-blue-700 transition-colors shadow-sm z-10">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
