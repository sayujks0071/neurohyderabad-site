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
      'mri-scanner': 'from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
      'ct-scanner': 'from-[var(--color-success-light)] to-[var(--color-success-light)]',
      'digital-xray': 'from-purple-100 to-purple-200',
      'neuronavigation': 'from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
      'ai-planning': 'from-pink-100 to-pink-200',
      '3d-printing': 'from-[var(--color-warning-light)] to-[var(--color-warning-light)]',
      'endoscopic-system': 'from-[var(--color-success-light)] to-[var(--color-success-light)]',
      'spine-endoscopy': 'from-cyan-100 to-cyan-200',
      'neuroendoscopy': 'from-violet-100 to-violet-200',
      'ionm-system': 'from-[var(--color-success-light)] to-[var(--color-success-light)]',
      'ultrasound': 'from-[var(--color-warning-light)] to-[var(--color-warning-light)]',
      'fluorescence': 'from-rose-100 to-rose-200'
    };
    
    return gradientMap[equipment] || 'from-[var(--color-background)] to-[var(--color-border)]';
  };

  return (
    <div className={`h-48 bg-gradient-to-br ${getEquipmentGradient(equipment)} flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-6xl mb-2">{getEquipmentIcon(equipment)}</div>
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">Advanced Equipment</p>
      </div>
    </div>
  );
}
