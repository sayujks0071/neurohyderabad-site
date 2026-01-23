import React from 'react';

export interface CostItem {
  procedure: string;
  range: string;
  recovery: string;
  includes: string[];
}

interface CostTransparencySectionProps {
  costs: CostItem[];
  disclaimer?: string;
}

export default function CostTransparencySection({ costs, disclaimer }: CostTransparencySectionProps) {
  return (
    <section
      className="mb-12 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      aria-label="Estimated Cost of Treatment"
    >
      <div className="p-6 bg-blue-50/50 border-b border-blue-100/50">
        <h2 className="text-2xl font-bold text-blue-800">Estimated Cost of Treatment</h2>
        <p className="text-gray-600 mt-2">
          Transparent pricing for self-pay patients. Insurance packages available.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100/50">
              <th scope="col" className="p-4 font-semibold text-gray-700">Procedure</th>
              <th scope="col" className="p-4 font-semibold text-gray-700">Estimated Cost Range (INR)</th>
              <th scope="col" className="p-4 font-semibold text-gray-700">Typical Recovery</th>
              <th scope="col" className="p-4 font-semibold text-gray-700">Includes</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((item, index) => (
              <tr key={index} className="border-b border-gray-100/50 hover:bg-blue-50/50 transition-colors">
                <th scope="row" className="p-4 font-medium text-blue-900 text-left">{item.procedure}</th>
                <td className="p-4 font-bold text-green-700">{item.range}</td>
                <td className="p-4 text-gray-600">{item.recovery}</td>
                <td className="p-4 text-gray-500 text-sm">
                  <ul className="list-disc pl-4 space-y-1">
                    {item.includes.map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gray-50/50 text-sm text-gray-500">
        <p><strong>Note:</strong> {disclaimer || "These are estimated ranges for standard cases. Final cost may vary based on room category, specific implants required, and medical complexity. Cashless insurance facilities are available with major TPAs."}</p>
      </div>
    </section>
  );
}
