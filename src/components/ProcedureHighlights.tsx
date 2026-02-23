import React from 'react';

const ProcedureHighlights = () => {
  const highlights = [
    { label: 'Procedure Name', value: 'Endoscopic Spine Surgery' },
    { label: 'Type of Surgery', value: 'Minimally Invasive (Keyhole)' },
    { label: 'Duration', value: '45 - 60 Minutes' },
    { label: 'Anesthesia', value: 'Local + Sedation (Awake) or General' },
    { label: 'Incision Size', value: '< 8 mm (Stitchless)' },
    { label: 'Hospital Stay', value: 'Day Care (Same Day Discharge)' },
    { label: 'Recovery Time', value: 'Walk in 2 Hours, Work in 3-5 Days' },
    { label: 'Success Rate', value: '> 90% (Clinical Success)' },
  ];

  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow-sm overflow-hidden mb-12">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
        <h2 className="text-lg font-bold text-blue-900 m-0">Procedure at a Glance</h2>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-px bg-gray-100 border-collapse">
        {highlights.map((item, index) => (
          <div key={index} className="px-6 py-4 flex flex-col justify-center bg-white hover:bg-gray-50 transition-colors">
            <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {item.label}
            </dt>
            <dd className="text-sm font-bold text-gray-900 leading-snug">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProcedureHighlights;
