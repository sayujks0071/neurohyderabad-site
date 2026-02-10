import React from 'react';
import { Minimize2, Layers, Eye, Target } from 'lucide-react';

const steps = [
  {
    icon: Minimize2,
    title: '1. The Tiny Incision',
    description: 'A small keyhole incision (< 1cm) is made under local anesthesia, often covered with just a band-aid.'
  },
  {
    icon: Layers,
    title: '2. Muscle Preservation',
    description: 'Instead of cutting muscle, we use a series of dilators to gently separate fibers, creating a natural corridor to the spine.'
  },
  {
    icon: Eye,
    title: '3. HD Visualization',
    description: 'A high-definition endoscope provides a magnified, crystal-clear view of the nerve root and disc herniation.'
  },
  {
    icon: Target,
    title: '4. Targeted Decompression',
    description: 'Specialized micro-instruments remove only the damaged disc fragment, instantly relieving pressure on the nerve.'
  }
];

export default function EndoscopicProcedureSteps() {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        How Endoscopic Spine Surgery Works
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group text-center h-full"
          >
            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <step.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
