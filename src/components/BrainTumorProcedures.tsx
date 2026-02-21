import React from 'react';
import Link from 'next/link';
import { Activity, Crosshair, Microscope, Scan } from 'lucide-react';

const BrainTumorProcedures = () => {
  const procedures = [
    {
      title: 'Awake Craniotomy',
      description: 'Real-time mapping of speech/motor areas during tumor removal.',
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      link: '/blog/awake-craniotomy-guide',
      linkText: 'Read Guide',
    },
    {
      title: 'Neuronavigation Guided Surgery',
      description: 'GPS-like precision to locate deep tumors with millimeter accuracy.',
      icon: <Crosshair className="w-8 h-8 text-blue-600" />,
    },
    {
      title: 'Endoscopic Skull Base Surgery',
      description: 'Removal of pituitary/skull base tumors through the nose (no external scar).',
      icon: <Microscope className="w-8 h-8 text-blue-600" />,
    },
    {
      title: 'Stereotactic Biopsy',
      description: 'Minimally invasive needle biopsy for deep-seated lesions.',
      icon: <Scan className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {procedures.map((proc, index) => (
        <div key={index} className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group">
          <div className="bg-blue-50 p-3 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
            {proc.icon}
          </div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">{proc.title}</h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow">{proc.description}</p>
          {proc.link && (
            <Link
              href={proc.link}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline mt-auto"
            >
              {proc.linkText} →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default BrainTumorProcedures;
