import React from 'react';
import { Stethoscope, Scissors, Microscope, Eye, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Stethoscope,
    title: '1. General Anesthesia',
    description: 'You will be safely asleep under general anesthesia, ensuring total immobility while we work near delicate nerves.'
  },
  {
    icon: Scissors,
    title: '2. Small Incision',
    description: 'A precise 2-3 cm incision is made in the midline of the back, significantly smaller than traditional open surgery.'
  },
  {
    icon: Microscope,
    title: '3. High-Definition View',
    description: 'A Zeiss operating microscope is brought in, magnifying the nerve roots and disc material 10-20 times for maximum safety.'
  },
  {
    icon: Eye,
    title: '4. Precise Decompression',
    description: 'Using specialized micro-instruments, the exact herniated disc fragment pressing on your nerve is carefully removed.'
  },
  {
    icon: CheckCircle,
    title: '5. Hidden Sutures',
    description: 'The incision is closed with absorbable sutures underneath the skin, requiring no stitch removal later.'
  }
];

export default function MicrodiscectomyProcedureSteps() {
  return (
    <div className="my-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group text-center h-full flex flex-col items-center"
          >
            <div className="w-16 h-16 mx-auto bg-[var(--color-primary-50)] rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary-100)] transition-colors">
              <step.icon className="w-8 h-8 text-[var(--color-primary-500)]" />
            </div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Step {index + 1}</div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary-700)] transition-colors">
              {step.title.split('. ')[1]}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-grow">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
