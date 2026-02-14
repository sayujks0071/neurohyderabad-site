import React from 'react';

const MicroVsEndoTable = () => {
  return (
    <div className="my-8 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Comparison of Endoscopic vs. Microscopic Surgery</caption>
          <thead>
            <tr className="bg-blue-50/50 text-blue-900 border-b border-blue-100/50">
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3">Feature</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-blue-700">Microdiscectomy (Gold Standard)</th>
              <th scope="col" className="p-4 font-bold text-sm uppercase tracking-wide w-1/3 text-green-700">Endoscopic (Keyhole)</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-blue-100/50">
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Incision Size</th>
              <td className="p-4 text-gray-700">Small (2-3 cm)</td>
              <td className="p-4 font-medium text-green-700">Ultra-Small (0.8 cm)</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Visualization</th>
              <td className="p-4 font-medium text-blue-700">3D (Microscope)</td>
              <td className="p-4 text-gray-700">2D (Camera/Screen)</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Muscle Trauma</th>
              <td className="p-4 text-gray-700">Low (Split & Retracted)</td>
              <td className="p-4 font-medium text-green-700">Minimal (Dilated)</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Hospital Stay</th>
              <td className="p-4 text-gray-700">1-2 Days</td>
              <td className="p-4 font-medium text-green-700">Day Care / 24 Hours</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Best For</th>
              <td className="p-4 font-medium text-blue-700">Complex/Calcified Discs, Recurrent Herniations</td>
              <td className="p-4 text-gray-700">Soft Disc Herniations, Foraminal Stenosis</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <th scope="row" className="p-4 font-semibold text-blue-900 bg-blue-50/30 text-left">Anesthesia</th>
              <td className="p-4 text-gray-700">General Anesthesia</td>
              <td className="p-4 text-gray-700">Local or General</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MicroVsEndoTable;
