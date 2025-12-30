interface TechnologyImageProps {
  equipment: string;
  className?: string;
}

export default function TechnologyImage({ equipment, className = "" }: TechnologyImageProps) {
  const getEquipmentIcon = (equipment: string) => {
    const iconMap: { [key: string]: string } = {
      'mri-scanner': '🧲',
      'ct-scanner': '📡',
      'digital-xray': '📷',
      'neuronavigation': '🧭',
      'ai-planning': '🤖',
      '3d-printing': '🖨️',
      'endoscopic-system': '🔍',
      'spine-endoscopy': '🦴',
      'neuroendoscopy': '🧠',
      'ionm-system': '📊',
      'ultrasound': '📡',
      'fluorescence': '💡'
    };
    
    return iconMap[equipment] || '🔬';
  };

  const getEquipmentGradient = (equipment: string) => {
    const gradientMap: { [key: string]: string } = {
      'mri-scanner': 'from-blue-100 to-blue-200',
      'ct-scanner': 'from-green-100 to-green-200',
      'digital-xray': 'from-purple-100 to-purple-200',
      'neuronavigation': 'from-indigo-100 to-indigo-200',
      'ai-planning': 'from-pink-100 to-pink-200',
      '3d-printing': 'from-orange-100 to-orange-200',
      'endoscopic-system': 'from-teal-100 to-teal-200',
      'spine-endoscopy': 'from-cyan-100 to-cyan-200',
      'neuroendoscopy': 'from-violet-100 to-violet-200',
      'ionm-system': 'from-emerald-100 to-emerald-200',
      'ultrasound': 'from-amber-100 to-amber-200',
      'fluorescence': 'from-rose-100 to-rose-200'
    };
    
    return gradientMap[equipment] || 'from-gray-100 to-gray-200';
  };

  return (
    <div className={`h-48 bg-gradient-to-br ${getEquipmentGradient(equipment)} flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-6xl mb-2">{getEquipmentIcon(equipment)}</div>
        <p className="text-sm text-gray-600 font-medium">Advanced Equipment</p>
      </div>
    </div>
  );
}
