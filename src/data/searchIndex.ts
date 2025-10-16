import { patientStories } from "../content/stories";
import { CONDITION_RESOURCES } from "./conditionsIndex";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
  tags?: string[];
}

const CORE_PAGES: SearchItem[] = [
  {
    title: "About Dr. Sayuj Krishnan",
    description:
      "Surgeon profile, qualifications, and philosophy of care for patients seeking advanced brain and spine treatment.",
    href: "/about",
    category: "About the Surgeon",
    tags: ["profile", "experience", "credentials", "education"],
  },
  {
    title: "Neurological Conditions A–Z",
    description:
      "Browse the A–Z index of brain, spine, and nerve disorders treated by Dr. Sayuj Krishnan with links to detailed care pathways.",
    href: "/conditions",
    category: "Conditions & Treatments",
    tags: ["conditions", "neurology", "spine", "brain"],
  },
  {
    title: "Endoscopic & Minimally Invasive Spine Surgery",
    description:
      "Comprehensive guide to minimally invasive spine procedures including indications, recovery, and outcomes.",
    href: "/services/minimally-invasive-spine-surgery",
    category: "Conditions & Treatments",
    tags: ["spine surgery", "miss", "endoscopic", "back pain"],
  },
  {
    title: "Brain Tumor Surgery in Hyderabad",
    description:
      "Information on diagnosis, surgical planning, and recovery for benign and malignant brain tumors.",
    href: "/services/brain-tumor-surgery-hyderabad",
    category: "Conditions & Treatments",
    tags: ["brain tumor", "oncology", "neurosurgery"],
  },
  {
    title: "Epilepsy Surgery & Drug-Resistant Epilepsy Care",
    description:
      "Evaluation pathway, surgical techniques, and seizure control outcomes for complex epilepsy cases.",
    href: "/services/epilepsy-surgery-hyderabad",
    category: "Conditions & Treatments",
    tags: ["epilepsy", "seizures", "neurology"],
  },
  {
    title: "Peripheral Nerve Surgery",
    description:
      "Treatment pathways for carpal tunnel, nerve compression, and peripheral nerve injuries.",
    href: "/services/peripheral-nerve-surgery-hyderabad",
    category: "Conditions & Treatments",
    tags: ["peripheral nerve", "carpal tunnel", "nerve decompression"],
  },
  {
    title: "Patient Stories & Success Cases",
    description:
      "Real patient recovery journeys across brain, spine, and epilepsy procedures with outcome highlights.",
    href: "/patient-stories",
    category: "Patient Resources",
    tags: ["stories", "testimonials", "experience"],
  },
  {
    title: "Disease Guides Library",
    description:
      "Patient-friendly education on neurological symptoms, diagnosis, and conservative vs surgical care.",
    href: "/disease-guides",
    category: "Patient Resources",
    tags: ["education", "guides", "symptoms"],
  },
  {
    title: "Neurosurgery Blog & Updates",
    description:
      "Articles on minimally invasive techniques, recovery timelines, and FAQs for patients and caregivers.",
    href: "/blog",
    category: "Patient Resources",
    tags: ["blog", "news", "education"],
  },
  {
    title: "Book a Consultation",
    description:
      "Schedule in-person or teleconsultation appointments with Dr. Sayuj Krishnan at Yashoda Hospital.",
    href: "/appointments",
    category: "Contact & Appointment",
    tags: ["appointment", "booking", "visit"],
  },
  {
    title: "Contact the Care Team",
    description:
      "Direct phone, WhatsApp, and clinic location details for scheduling appointments or second opinions.",
    href: "/contact",
    category: "Contact & Appointment",
    tags: ["contact", "call", "support"],
  },
  {
    title: "Clinic Locations in Hyderabad",
    description:
      "Addresses, maps, and visiting information for Yashoda Hospital Malakpet and outreach clinics.",
    href: "/locations",
    category: "Contact & Appointment",
    tags: ["location", "directions", "clinic"],
  },
  {
    title: "Technology & Facilities",
    description:
      "Advanced neurosurgical technology, intraoperative monitoring, and imaging capabilities available to patients.",
    href: "/technology-facilities",
    category: "About the Surgeon",
    tags: ["technology", "infrastructure", "innovation"],
  },
  {
    title: "Emergency Neurosurgical Rehabilitation",
    description:
      "24/7 emergency pathways, rapid triage, and post-operative rehabilitation services.",
    href: "/emergency-rehabilitation",
    category: "Patient Resources",
    tags: ["emergency", "rehabilitation", "urgent"],
  },
];

const CONDITION_INDEX_ITEMS: SearchItem[] = CONDITION_RESOURCES.map(
  (condition) => ({
    title: condition.name,
    description: condition.summary,
    href: `/conditions/a-z/${condition.slug}`,
    category: "Conditions & Treatments",
    tags: [
      ...condition.keywords,
      ...(condition.symptomHighlights ?? []),
      ...(condition.treatmentHighlights ?? []),
    ],
  }),
);

const PATIENT_STORY_ITEMS: SearchItem[] = patientStories.map((story) => ({
  title: story.title,
  description: story.summary,
  href: `/patient-stories/${story.slug}`,
  category: "Patient Stories",
  tags: [story.procedure, story.condition, ...(story.tags ?? [])],
}));

export const SEARCH_INDEX: SearchItem[] = [
  ...CORE_PAGES,
  ...CONDITION_INDEX_ITEMS,
  ...PATIENT_STORY_ITEMS,
];

export function searchContent(query: string, limit = 10): SearchItem[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return SEARCH_INDEX.slice(0, limit);
  }

  return SEARCH_INDEX.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.category,
      ...(item.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  }).slice(0, limit);
}
