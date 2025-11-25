export type ServiceSource = {
  label: string;
  href: string;
};

const SERVICE_SOURCES: Record<string, ServiceSource[]> = {
  "endoscopic-discectomy-hyderabad": [
    {
      label: "American Association of Neurological Surgeons – Herniated Lumbar Disc Overview",
      href: "https://www.aans.org/en/Patients/Neurosurgical-Conditions-and-Treatments/Lumbar-Disc-Herniation",
    },
    {
      label: "National Health Service (UK) – Lumbar Decompression Surgery",
      href: "https://www.nhs.uk/conditions/lumbar-decompression-surgery/",
    },
  ],
  "endoscopic-spine-surgery-hyderabad": [
    {
      label: "North American Spine Society – Minimally Invasive Spine Surgery Coverage Recommendations",
      href: "https://www.spine.org/PolicyPractice/CoverageRecommendations",
    },
    {
      label: "Hospital for Special Surgery – Endoscopic Spine Surgery FAQs",
      href: "https://www.hss.edu/conditions_endoscopic-spine-surgery.asp",
    },
  ],
  "spine-surgery-hyderabad": [
    {
      label: "American Academy of Orthopaedic Surgeons – Spine Surgery",
      href: "https://orthoinfo.aaos.org/en/treatment/spine-surgery/",
    },
    {
      label: "World Federation of Neurosurgical Societies – Spine Section Guidelines",
      href: "https://www.wfns.org/spine",
    },
  ],
  "minimally-invasive-spine-surgery": [
    {
      label: "Johns Hopkins Medicine – Minimally Invasive Spine Surgery",
      href: "https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/minimally-invasive-spine-surgery",
    },
    {
      label: "North American Spine Society – Clinical Guidelines for Minimally Invasive Spine Procedures",
      href: "https://www.spine.org/ResearchClinicalCare/QualityImprovement/ClinicalGuidelines",
    },
  ],
  "brain-tumor-surgery-hyderabad": [
    {
      label: "National Cancer Institute – Brain Tumor Treatment (PDQ®)",
      href: "https://www.cancer.gov/types/brain/patient/brain-treatment-pdq",
    },
    {
      label: "American Brain Tumor Association – Treatment Planning",
      href: "https://www.abta.org/tumor-treatment/",
    },
  ],
  "epilepsy-surgery-hyderabad": [
    {
      label: "International League Against Epilepsy – Surgical Therapies",
      href: "https://www.ilae.org/guidelines/clinical-practice-resources/surgery",
    },
    {
      label: "Epilepsy Foundation – Epilepsy Surgery Overview",
      href: "https://www.epilepsy.com/treatment/surgery",
    },
  ],
  "peripheral-nerve-surgery-hyderabad": [
    {
      label: "American Society for Peripheral Nerve – Patient Education",
      href: "https://peripheralnerve.org/Patient-Education",
    },
    {
      label: "American Association of Neuromuscular & Electrodiagnostic Medicine – Peripheral Nerve Surgery",
      href: "https://www.aanem.org/Patients/Disorders/Peripheral-Nerve-Disorders",
    },
  ],
  "spinal-fusion-surgery-hyderabad": [
    {
      label: "American Academy of Orthopaedic Surgeons – Spinal Fusion",
      href: "https://orthoinfo.aaos.org/en/treatment/spinal-fusion/",
    },
    {
      label: "North American Spine Society – Lumbar Fusion Coverage Recommendations",
      href: "https://www.spine.org/PolicyPractice/CoverageRecommendations/AboutCoverageRecommendations",
    },
  ],
  "spinal-fusion": [
    {
      label: "Cleveland Clinic – Spinal Fusion Surgery",
      href: "https://my.clevelandclinic.org/health/treatments/15872-spinal-fusion",
    },
    {
      label: "National Institute for Health and Care Excellence – Spinal Fusion Guidance",
      href: "https://www.nice.org.uk/guidance/ipg578",
    },
  ],
  "peripheral-nerve-surgery": [
    {
      label: "American Association of Neurological Surgeons – Peripheral Nerve Disorders",
      href: "https://www.aans.org/en/Patients/Neurosurgical-Conditions-and-Treatments",
    },
    {
      label: "Johns Hopkins Medicine – Peripheral Nerve Surgery",
      href: "https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/peripheral-nerve-surgery",
    },
  ],
  "compare-neurosurgeons-hyderabad": [
    {
      label: "Royal College of Surgeons – Choosing Your Surgeon",
      href: "https://www.rcseng.ac.uk/patient-care/conditions-and-treatments/choosing-your-surgeon/",
    },
    {
      label: "Medical Council of India – Professional Conduct Regulations",
      href: "https://www.nmc.org.in/rules-regulations",
    },
  ],
  "dr-sayuj-vs-apollo-neuro-icu": [
    {
      label: "Indian Society of Critical Care Medicine – Neuro ICU Standards",
      href: "https://isccm.org/",
    },
    {
      label: "World Federation of Neurosurgical Societies – Neurocritical Care Committee Reports",
      href: "https://www.wfns.org/commissions-and-committees/neurocritical-care",
    },
  ],
  "kims-spine-surgery-second-opinion": [
    {
      label: "National Library of Medicine – Value of Surgical Second Opinions",
      href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5126478/",
    },
    {
      label: "American College of Surgeons – Second Opinion Guidance",
      href: "https://www.facs.org/for-patients/the-day-of-your-surgery/the-second-opinion/",
    },
  ],
  "spine-surgery-cost-hyderabad": [
    {
      label: "National Health Service (UK) – Understanding Healthcare Costs",
      href: "https://www.nhs.uk/using-the-nhs/about-the-nhs/understanding-the-cost-of-healthcare/",
    },
    {
      label: "American Academy of Orthopaedic Surgeons – Understanding Your Surgery Costs",
      href: "https://orthoinfo.aaos.org/en/treatment/understanding-your-surgery-costs/",
    },
  ],
  "slip-disc-surgery-cost-hyderabad": [
    {
      label: "Mayo Clinic – Herniated Disc Treatment Costs",
      href: "https://www.mayoclinic.org/diseases-conditions/herniated-disk/diagnosis-treatment/drc-20354101",
    },
    {
      label: "American Association of Neurological Surgeons – Understanding Neurosurgical Costs",
      href: "https://www.aans.org/en/Patients/Neurosurgical-Conditions-and-Treatments",
    },
  ],
};

export function getServiceSources(slug: string): ServiceSource[] {
  return SERVICE_SOURCES[slug] ?? [];
}
