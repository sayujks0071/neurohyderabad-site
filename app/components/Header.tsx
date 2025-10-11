import OptimizedImage from "../_components/OptimizedImage";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <OptimizedImage
            src="/images/logo.png"
            alt="Dr Sayuj Krishnan - Brain & Spine Surgeon"
            width={120}
            height={80}
            className="h-12 w-auto"
            priority
            quality={95}
          />
          <span className="font-semibold text-gray-900">Dr Sayuj Krishnan</span>
          <span className="sr-only">Homepage</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
          <Link href="/conditions" className="text-gray-600 hover:text-blue-600">Conditions</Link>
          <Link href="/disease-guides" className="text-gray-600 hover:text-blue-600">Disease Guides</Link>
          <Link href="/technology-facilities" className="text-gray-600 hover:text-blue-600">Technology</Link>
          <Link href="/emergency-rehabilitation" className="text-gray-600 hover:text-blue-600">Emergency</Link>
          <Link href="/locations" className="text-gray-600 hover:text-blue-600">Locations</Link>
          <Link href="/patient-stories" className="text-gray-600 hover:text-blue-600">Patient Stories</Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
          <Link href="/appointments" className="text-gray-600 hover:text-blue-600">Appointments</Link>
          <Link href="/ai-chat" className="text-gray-600 hover:text-blue-600">🤖 AI Chat</Link>
          <Link 
            href="/ai-chat"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700"
          >
            Chat & Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
