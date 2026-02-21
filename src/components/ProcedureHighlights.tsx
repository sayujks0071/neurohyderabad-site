import React from 'react';

interface ProcedureHighlightsProps {
  duration: string;
  anesthesia: string;
  stay: string;
  recovery: string;
  incision: string;
  className?: string;
}

const ProcedureHighlights: React.FC<ProcedureHighlightsProps> = ({
  duration,
  anesthesia,
  stay,
  recovery,
  incision,
  className = '',
}) => {
  const items = [
    { label: 'Duration', value: duration, icon: '⏱️' },
    { label: 'Anesthesia', value: anesthesia, icon: '💉' },
    { label: 'Hospital Stay', value: stay, icon: '🏥' },
    { label: 'Incision Size', value: incision, icon: '📏' },
    { label: 'Recovery', value: recovery, icon: '🏃' },
  ];

  return (
    <div className={`bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
        <h3 className="text-lg font-bold text-blue-900">Procedure at a Glance</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {items.map((item, index) => (
          <div key={index} className="p-4 text-center hover:bg-blue-50/30 transition-colors">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {item.label}
            </div>
            <div className="text-sm font-bold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcedureHighlights;
