import React from 'react';

type ComparisonRow = {
  feature: string;
  traditional: string;
  endoscopic: string;
};

const comparisonData: ComparisonRow[] = [
  {
    feature: 'Incision Size',
    traditional: 'Large (3-5 inches)',
    endoscopic: 'Tiny keyhole (<1 cm)',
  },
  {
    feature: 'Muscle Damage',
    traditional: 'Muscles are cut/retracted',
    endoscopic: 'Muscles are dilated (preserved)',
  },
  {
    feature: 'Blood Loss',
    traditional: 'Moderate to High',
    endoscopic: 'Minimal',
  },
  {
    feature: 'Hospital Stay',
    traditional: '3-5 Days',
    endoscopic: 'Day Care / 1 Day',
  },
  {
    feature: 'Pain & Scarring',
    traditional: 'Significant',
    endoscopic: 'Minimal',
  },
  {
    feature: 'Recovery to Work',
    traditional: '4-6 Weeks',
    endoscopic: '1-2 Weeks',
  },
  {
    feature: 'Infection Risk',
    traditional: 'Moderate',
    endoscopic: 'Very Low (<1%)',
  },
];

export default function SurgeryComparisonTable() {
  return (
    <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <caption className="sr-only">Comparison between Traditional Open Surgery and Endoscopic Spine Surgery</caption>
        <thead>
          <tr className="bg-blue-50">
            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Feature
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Traditional Open Surgery
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
              Endoscopic Spine Surgery
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {comparisonData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.feature}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.traditional}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                {row.endoscopic}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500 italic border-t border-gray-200">
        * Comparison based on typical recovery protocols. Individual results may vary.
      </div>
    </div>
  );
}
