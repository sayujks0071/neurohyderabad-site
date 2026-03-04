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
    <section
      className="mb-12 relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      aria-label={title}
    >
      <h2 className="text-3xl font-bold text-[var(--color-primary-800)] mb-8 text-center">{title}</h2>
      <div className="relative">
        {/* Connector Line (Desktop) */}
        <div
          className="hidden md:block absolute top-12 left-0 w-full h-1 bg-[var(--color-primary-100)] -z-10 transform -translate-y-1/2"
          aria-hidden="true"
        ></div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border-4 border-[var(--color-primary-100)] text-[var(--color-primary-500)] font-bold text-lg flex items-center justify-center mb-4 group-hover:border-[var(--color-primary-500)] group-hover:text-[var(--color-primary-700)] transition-colors shadow-sm z-10">
                {index + 1}
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{step.title}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
