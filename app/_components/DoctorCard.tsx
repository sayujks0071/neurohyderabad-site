import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Calendar, Phone } from 'lucide-react';

interface DoctorCardProps {
  priority?: boolean;
}

export default function DoctorCard({ priority = false }: DoctorCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative max-w-md mx-auto">
      <div className="text-center">
        {/* Doctor Photo - Professional Portrait */}
        <div className="w-32 h-32 rounded-full mx-auto mb-4 relative overflow-hidden shadow-lg border-2 border-white/50">
          <Image
            src="/images/dr-sayuj-krishnan-portrait-v2.jpg"
            alt="Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad"
            width={128}
            height={128}
            sizes="128px"
            className="object-cover w-full h-full rounded-full"
            quality={75}
            priority={priority}
          />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Dr. Sayuj Krishnan</h2>
        <p className="text-lg text-blue-600 font-medium mb-3">Neurosurgeon & Spine Surgeon</p>
        
        <div className="space-y-2 text-sm text-slate-600 mb-6">
          <p>• 9+ Years Experience</p>
          <p>• MBBS, DNB Neurosurgery</p>
          <p>• Fellowship in Minimally Invasive Surgery</p>
          <p>• Advanced Training in Germany</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link 
            href="/appointments" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            aria-label="Book a consultation with Dr. Sayuj Krishnan"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
          <a 
            href="tel:+919778280044" 
            className="flex-1 bg-white border border-slate-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center gap-2"
            aria-label="Call Dr. Sayuj Krishnan's clinic"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
        </div>
        
        <div className="pt-4 border-t border-slate-200/60">
          <div className="flex justify-center space-x-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full border border-white/40 shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">4.9/5 Rating</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full border border-white/40 shadow-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="font-medium">1000+ Patients</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
