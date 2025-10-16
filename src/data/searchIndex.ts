import { patientStories } from "../content/stories";

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
    title: "Neurological Conditions Treated",
    description:
      "Overview of brain, spine, and nerve disorders managed at Yashoda Hospital with minimally invasive options.",
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

const CONDITION_PAGES: SearchItem[] = [
  {
    title: "Trigeminal Neuralgia Treatment",
    description:
      "Pain relief strategies and microvascular decompression options for trigeminal neuralgia.",
    href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
    category: "Conditions & Treatments",
    tags: ["facial pain", "mvd", "nerve"],
  },
  {
    title: "Cervical Radiculopathy Care",
    description:
      "Evaluation and minimally invasive procedures for nerve compression causing arm pain and numbness.",
    href: "/conditions/cervical-radiculopathy-treatment-hyderabad",
    category: "Conditions & Treatments",
    tags: ["neck pain", "nerve root", "cervical spine"],
  },
  {
    title: "Sciatica & Lumbar Disc Herniation",
    description:
      "Diagnosis and treatment of sciatica, including endoscopic discectomy and rehabilitation protocol.",
    href: "/conditions/sciatica-treatment-hyderabad",
    category: "Conditions & Treatments",
    tags: ["sciatica", "lumbar", "disc herniation"],
  },
  {
    title: "Lumbar Spinal Stenosis",
    description:
      "Conservative care and minimally invasive ULBD decompression for lumbar spinal stenosis.",
    href: "/conditions/spinal-stenosis-treatment-hyderabad",
    category: "Conditions & Treatments",
    tags: ["stenosis", "lumbar spine", "narrowing"],
  },
  {
    title: "Brain Tumor Warning Signs",
    description:
      "Early symptoms of brain tumors, evaluation pathways, and when to seek urgent care.",
    href: "/symptoms/signs-of-brain-tumor",
    category: "Patient Resources",
    tags: ["symptoms", "brain tumor", "warning signs"],
  },
  {
    title: "Pain on Top of Head Causes",
    description:
      "Comprehensive look at neurological reasons for vertex headaches and when to consult a neurosurgeon.",
    href: "/symptoms/pain-on-top-of-head-causes",
    category: "Patient Resources",
    tags: ["headache", "symptoms", "pain"],
  },
];

const PATIENT_STORY_ITEMS: SearchItem[] = patientStories.map((story) => ({
  title: story.title,
  description: story.summary,
  href: `/patient-stories/${story.slug}`,
  category: "Patient Stories",
  tags: [story.procedure, story.condition, ...(story.tags ?? [])],
}));

export const SEARCH_INDEX: SearchItem[] = [
  ...CORE_PAGES,
  ...CONDITION_PAGES,
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
