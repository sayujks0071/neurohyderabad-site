import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="Dr. Sayuj Krishnan"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-semibold text-gray-900">Dr. Sayuj Krishnan</span>
          <span className="sr-only">Homepage</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
          <Link href="/conditions" className="text-gray-600 hover:text-blue-600">Conditions</Link>
          <Link href="/appointments" className="text-gray-600 hover:text-blue-600">Appointments</Link>
          <Link 
            href="/appointments" 
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
