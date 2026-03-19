import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Calendar, Phone } from 'lucide-react';
import doctorPortrait from '@/src/assets/dr-sayuj-krishnan-portrait-v2.jpg';

interface DoctorCardProps {
  priority?: boolean;
}

export default function DoctorCard({ priority = false }: DoctorCardProps) {
  return (
    <div className="bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl motion-safe:hover:-translate-y-1 relative max-w-md mx-auto">
      <div className="text-center">
        {/* Doctor Photo - Professional Portrait */}
        <div className="w-32 h-32 rounded-full mx-auto mb-4 relative overflow-hidden shadow-lg border-2 border-white/50">
          <Image
            src={doctorPortrait}
            alt="Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad"
            sizes="128px"
            className="object-cover w-full h-full rounded-full"
            quality={75}
            priority={priority}
            placeholder="blur"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Dr. Sayuj Krishnan</h2>
        <p className="text-lg text-[var(--color-primary-500)] font-medium mb-3">Neurosurgeon & Spine Surgeon</p>
        
        <div className="space-y-2 text-sm text-[var(--color-text-secondary)] mb-6">
          <p>• 9+ Years Experience</p>
          <p>• MBBS, DNB Neurosurgery</p>
          <p>• Fellowship in Minimally Invasive Surgery</p>
          <p>• Advanced Training in Germany</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link 
            href="/appointments" 
            className="flex-1 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] flex items-center justify-center gap-2"
            aria-label="Book a consultation with Dr. Sayuj Krishnan"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
          <a 
            href="tel:+919778280044" 
            className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)] flex items-center justify-center gap-2"
            aria-label="Call Dr. Sayuj Krishnan's clinic"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
        </div>
        
        <div className="pt-4 border-t border-[var(--color-border)]/60">
          <div className="flex justify-center space-x-6 text-sm text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5 bg-[var(--color-surface)]/50 px-3 py-1 rounded-full border border-white/40 shadow-sm">
              <Star className="w-4 h-4 text-[var(--color-warning)] fill-yellow-500" />
              <span className="font-medium">4.9/5 Rating</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[var(--color-surface)]/50 px-3 py-1 rounded-full border border-white/40 shadow-sm">
              <Users className="w-4 h-4 text-[var(--color-primary-500)]" />
              <span className="font-medium">1000+ Patients</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
