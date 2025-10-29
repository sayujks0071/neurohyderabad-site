import Link from "next/link";
import OptimizedImage from "../_components/OptimizedImage";
import SiteSearch from "./SiteSearch";

interface NavLink {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  description: string;
  links: NavLink[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "About the Surgeon",
    description:
      "Training, hospital affiliations, and surgical technology that support every procedure.",
    links: [
      { label: "About Dr. Sayuj", href: "/about" },
      { label: "German Training", href: "/german-training" },
      { label: "Technology & Innovation", href: "/technology-innovation" },
      {
        label: "Why Patients Choose Us",
        href: "/best-neurosurgeon-in-hyderabad",
      },
    ],
  },
  {
    title: "Specializations",
    description:
      "Expert neurosurgical care across brain, spine, and pediatric specialties with advanced techniques.",
    links: [
      { label: "Specializations Overview", href: "/specializations" },
      { label: "Spine Surgery", href: "/spine-surgery" },
      { label: "Brain Surgery", href: "/brain-surgery" },
      { label: "Pediatric Neurosurgery", href: "/pediatric-neurosurgery" },
      { label: "Technology & Innovation", href: "/technology-innovation" },
    ],
  },
  {
    title: "Conditions & Treatments",
    description:
      "Guides to brain, spine, and epilepsy care pathways with minimally invasive options.",
    links: [
      { label: "Conditions Overview", href: "/conditions" },
      { label: "All Treatments", href: "/services" },
      {
        label: "Minimally Invasive Spine Surgery",
        href: "/services/minimally-invasive-spine-surgery",
      },
      {
        label: "Brain Tumor Surgery",
        href: "/services/brain-tumor-surgery-hyderabad",
      },
      {
        label: "Epilepsy Surgery",
        href: "/services/epilepsy-surgery-hyderabad",
      },
    ],
  },
  {
    title: "Patient Resources",
    description:
      "Education, recovery stories, and preparation checklists for every stage of care.",
    links: [
      { label: "Disease & Symptom Guides", href: "/disease-guides" },
      { label: "Patient Stories", href: "/patient-stories" },
      { label: "Neurosurgery Blog", href: "/blog" },
      { label: "Emergency & Rehabilitation", href: "/emergency-rehabilitation" },
    ],
  },
  {
    title: "Research & Publications",
    description:
      "Innovation, conference presentations, and academic collaborations that inform our protocols.",
    links: [
      { label: "Research Highlights", href: "/research" },
      {
        label: "Technology & Innovation",
        href: "/technology-innovation",
      },
    ],
  },
  {
    title: "Contact / Appointment",
    description:
      "Schedule a visit, plan teleconsultations, or connect with the coordination team directly.",
    links: [
      { label: "Book Consultation", href: "/appointments" },
      { label: "Clinic Contacts", href: "/contact" },
      { label: "Clinic Locations", href: "/locations" },
      { label: "AI Booking Assistant", href: "/ai-chat" },
    ],
  },
];

export default function Header() {
  return (
    <header className="relative border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery homepage">
          <OptimizedImage
            src="/images/logo.svg"
            alt="Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery"
            width={180}
            height={68}
            className="h-12 w-auto"
            priority
            quality={90}
            sizes="(max-width: 768px) 140px, 180px"
            fetchPriority="high"
            placeholder="empty"
          />
          <span className="sr-only">Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery</span>
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          <SiteSearch />
          <details className="relative">
            <summary
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span className="sr-only">Toggle primary navigation</span>
              <MenuIcon className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 z-30 mt-3 max-h-[70vh] w-72 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
              {NAV_SECTIONS.map((section, index) => (
                <div key={section.title} className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {section.title}
                    </p>
                    <p className="text-xs text-gray-500">{section.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {index !== NAV_SECTIONS.length - 1 && (
                    <hr className="border-gray-100" />
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/appointments"
                  aria-label="Book a clinic consultation from the mobile menu"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:from-blue-700 hover:to-purple-700"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/ai-chat"
                  className="rounded-full border border-blue-200 px-4 py-2 text-center text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  Chat with Care Team
                </Link>
              </div>
            </div>
          </details>
        </div>

        <nav className="hidden flex-1 items-center justify-end gap-6 md:flex">
          {NAV_SECTIONS.map((section) => (
            <details key={section.title} className="group relative">
              <summary
                className="flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {section.title}
                <ChevronDownIcon className="h-4 w-4 text-gray-400 transition group-open:rotate-180 group-hover:text-blue-600" />
              </summary>
              <div className="absolute right-0 top-full z-40 mt-3 hidden w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl group-open:block group-hover:block group-focus-within:block">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {section.title}
                </p>
                <p className="mb-4 text-sm text-gray-600">
                  {section.description}
                </p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        {link.label}
                        <span aria-hidden className="text-gray-300">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
          <SiteSearch />
          <Link
            href="/appointments"
            aria-label="Book a consultation via the primary navigation"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white outline-offset-2 transition hover:from-blue-700 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="m5 7 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
