import Link from 'next/link';

export default function TeamStrip() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-[var(--color-primary-800)] mb-4 text-center">Our Expert Team</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-[var(--color-primary-500)]">👨‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Dr. Sayuj Krishnan</h4>
          <p className="text-xs text-[var(--color-text-secondary)]">Neurosurgeon</p>
          <p className="text-xs text-[var(--color-text-secondary)]">9+ years</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-success-light)] to-[var(--color-success-light)] rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-[var(--color-success-700)]">👩‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Dr. Priya Sharma</h4>
          <p className="text-xs text-[var(--color-text-secondary)]">Neuro Anesthesiologist</p>
          <p className="text-xs text-[var(--color-text-secondary)]">12+ years</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-purple-600">👨‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Dr. Rajesh Kumar</h4>
          <p className="text-xs text-[var(--color-text-secondary)]">Neuro Physiotherapist</p>
          <p className="text-xs text-[var(--color-text-secondary)]">10+ years</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-warning-light)] to-[var(--color-warning-light)] rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-[var(--color-warning-700)]">👩‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Dr. Anjali Patel</h4>
          <p className="text-xs text-[var(--color-text-secondary)]">Neuro Psychologist</p>
          <p className="text-xs text-[var(--color-text-secondary)]">8+ years</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-[var(--color-border)] text-center">
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">
          <strong>Comprehensive Care Team:</strong> From surgery to recovery, our multidisciplinary team ensures optimal outcomes.
        </p>
        <Link 
          href="/contact" 
          className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-700)] text-sm font-semibold"
        >
          Meet Our Full Team →
        </Link>
      </div>
    </div>
  );
}
