'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
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
      { label: "Media Publications", href: "/media" },
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

const PRIMARY_NAV_LABEL = "Primary site navigation";

export default function Header() {
  return (
    <header role="banner" className="relative border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery homepage"
        >
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
          <span className="sr-only">
            Dr Sayuj — Neurosurgeon and Endoscopic Spine Surgery
          </span>
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          <SiteSearch />
          <MobileMenu sections={NAV_SECTIONS} navLabel={PRIMARY_NAV_LABEL} />
        </div>

        <nav
          className="hidden flex-1 items-center justify-end gap-6 md:flex"
          aria-label={PRIMARY_NAV_LABEL}
          role="navigation"
        >
          {NAV_SECTIONS.map((section) => (
            <DesktopNavSection key={section.title} section={section} />
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

interface MobileMenuProps {
  sections: NavSection[];
  navLabel: string;
}

function MobileMenu({ sections, navLabel }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const closeMenu = useCallback(
    (returnFocus = false) => {
      setIsOpen(false);
      if (returnFocus) {
        buttonRef.current?.focus();
      }
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle primary navigation menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`${panelId}-panel`}
        className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <MenuIcon className="h-5 w-5" />
      </button>
      <nav
        id={`${panelId}-panel`}
        role="navigation"
        aria-label={navLabel}
        className="absolute right-0 z-30 mt-3 max-h-[70vh] w-72 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl"
        hidden={!isOpen}
      >
        {sections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="space-y-3"
            role="group"
            aria-labelledby={`${panelId}-${sectionIndex}-title`}
          >
            <div>
              <p
                id={`${panelId}-${sectionIndex}-title`}
                className="text-sm font-semibold text-gray-900"
              >
                {section.title}
              </p>
              <p className="text-xs text-gray-500">{section.description}</p>
            </div>
            <ul className="space-y-2" role="list">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                    onClick={() => closeMenu()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {sectionIndex !== sections.length - 1 && (
              <hr className="border-gray-100" />
            )}
          </div>
        ))}
        <div
          className="flex flex-col gap-3 pt-2"
          role="group"
          aria-label="Booking and contact shortcuts"
        >
          <Link
            href="/appointments"
            aria-label="Book a clinic consultation from the mobile menu"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:from-blue-700 hover:to-purple-700"
            onClick={() => closeMenu()}
          >
            Book Consultation
          </Link>
          <Link
            href="/ai-chat"
            className="rounded-full border border-blue-200 px-4 py-2 text-center text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
            onClick={() => closeMenu()}
          >
            Chat with Care Team
          </Link>
        </div>
      </nav>
    </div>
  );
}

function DesktopNavSection({ section }: { section: NavSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const keyboardOpenRef = useRef(false);
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  const handleBlurCapture = useCallback(
    (event: ReactFocusEvent<HTMLDivElement>) => {
      if (!containerRef.current) {
        return;
      }
      const nextTarget = event.relatedTarget as Node | null;
      if (!nextTarget || !containerRef.current.contains(nextTarget)) {
        setIsOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!isOpen || !keyboardOpenRef.current) {
      return;
    }
    firstLinkRef.current?.focus();
    keyboardOpenRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleButtonKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!isOpen) {
          keyboardOpenRef.current = true;
          setIsOpen(true);
        } else {
          firstLinkRef.current?.focus();
        }
      }

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        keyboardOpenRef.current = true;
        setIsOpen((prev) => !prev);
      }
    },
    [isOpen],
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={handleBlurCapture}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleButtonKeyDown}
      >
        {section.title}
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"
          }`}
        />
      </button>
      <div
        id={panelId}
        role="group"
        aria-labelledby={buttonId}
        className="absolute right-0 top-full z-40 mt-3 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl"
        hidden={!isOpen}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
          {section.title}
        </p>
        <p className="mb-4 text-sm text-gray-600">{section.description}</p>
        <ul className="space-y-2" role="list">
          {section.links.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                onClick={() => setIsOpen(false)}
                ref={index === 0 ? firstLinkRef : undefined}
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
    </div>
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
