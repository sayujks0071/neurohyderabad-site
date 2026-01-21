import { Activity } from "lucide-react";
import Link from 'next/link';

export default function BookingHeroContent() {
  return (
    <>
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-sm font-bold mb-6 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Activity className="w-4 h-4 mr-2 text-blue-500" />
        Advanced Neurosurgical Booking
      </div>

      {/* LCP Optimization: content moved to Server Component for immediate paint */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
        Book your consultation with
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Dr. Sayuj Krishnan
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        Secure your neurosurgical appointment at Yashoda Hospitals, Malakpet. Get AI-assisted triage,
        report interpretation, and a fast confirmation call from our care team.
        <br/><br/>
        <span className="text-sm">
          Specializing in <Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:underline">Brain Tumor Surgery</Link>, Endoscopic Spine Procedures, and more.
        </span>
      </p>
    </>
  );
}
