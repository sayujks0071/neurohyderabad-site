export interface ConditionResource {
  slug: string;
  name: string;
  summary: string;
  primaryPath: string;
  relatedResources?: Array<{
    href: string;
    label: string;
  }>;
  keywords: string[];
  symptomHighlights?: string[];
  treatmentHighlights?: string[];
  faq?: Array<{ question: string; answer: string }>;
  heroImage?: {
    src: string;
    alt: string;
  };
}

export const CONDITION_RESOURCES: ConditionResource[] = [
  {
    slug: "acoustic-neuroma",
    name: "Acoustic Neuroma",
    summary:
      "Hearing-preserving microsurgery and radiosurgery options for vestibular schwannoma causing imbalance or tinnitus.",
    primaryPath: "/conditions/acoustic-neuroma-treatment-hyderabad",
    relatedResources: [
      {
        href: "/technology-facilities",
        label: "Intraoperative neuromonitoring & skull base technology",
      },
      {
        href: "/services/brain-tumor-surgery-hyderabad",
        label: "Brain tumour surgery programme",
      },
    ],
    keywords: ["acoustic neuroma", "vestibular schwannoma", "tinnitus"],
    heroImage: {
      src: "/images/og-default.jpg",
      alt: "Microsurgical approach for acoustic neuroma treatment",
    },
    symptomHighlights: [
      "Unilateral hearing loss or persistent ringing in the ear",
      "Balance difficulties or vertigo episodes",
      "Facial numbness as tumours enlarge",
    ],
    treatmentHighlights: [
      "Serial MRI surveillance for small, asymptomatic tumours",
      "Hearing-preserving microsurgery with facial nerve monitoring",
      "Focused radiosurgery when surgery is contraindicated",
    ],
    faq: [
      {
        question: "Will surgery affect my hearing?",
        answer:
          "Hearing preservation depends on tumour size, location, and pre-operative hearing level. We use intraoperative monitoring to maximise preservation.",
      },
    ],
  },
  {
    slug: "aneurysm",
    name: "Brain Aneurysm",
    summary:
      "Emergency evaluation and microsurgical or endovascular strategies for ruptured and unruptured aneurysms.",
    primaryPath: "/conditions/brain-aneurysm-treatment-hyderabad",
    relatedResources: [
      {
        href: "/emergency-rehabilitation",
        label: "Emergency neurosurgical rehabilitation",
      },
      {
        href: "/symptoms/signs-of-brain-tumor",
        label: "Warning signs that need urgent care",
      },
      {
        href: "/services/brain-tumor-surgery-hyderabad",
        label: "Brain and vascular neurosurgery services",
      },
    ],
    keywords: ["aneurysm", "subarachnoid hemorrhage", "brain bleed"],
    heroImage: {
      src: "/images/og-default.jpg",
      alt: "Angiography concept illustrating brain aneurysm care",
    },
    symptomHighlights: [
      "Sudden severe headache often described as thunderclap",
      "Vision changes, neck stiffness, or loss of consciousness",
      "Neurological deficits following rupture",
    ],
    treatmentHighlights: [
      "Emergency stabilisation and blood pressure control",
      "Microsurgical clipping or endovascular coiling",
      "Neuro-critical care monitoring for vasospasm",
    ],
    faq: [
      {
        question: "When should an unruptured aneurysm be treated?",
        answer:
          "Size, location, and patient factors determine timing. Symptomatic or enlarging aneurysms require early intervention after multidisciplinary review.",
      },
      {
        question: "What follow-up imaging is needed?",
        answer:
          "Post-treatment MR or CT angiography at 6 and 12 months ensures the aneurysm remains sealed and detects recurrence early.",
      },
    ],
  },
  {
    slug: "brain-tumor",
    name: "Brain Tumor",
    summary:
      "Advanced neuronavigation-guided resections for benign and malignant tumours with functional preservation.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    relatedResources: [
      {
        href: "/symptoms/signs-of-brain-tumor",
        label: "Early signs of brain tumour",
      },
      {
        href: "/stories/minimal-invasive-meningioma-resection",
        label: "Patient story: Returning to work after meningioma surgery",
      },
    ],
    keywords: ["brain tumor", "glioma", "meningioma", "tumour"],
    symptomHighlights: [
      "Persistent headaches, especially in the morning",
      "Seizures or focal neurological deficits",
      "Personality or cognitive changes",
    ],
    treatmentHighlights: [
      "Awake mapping and neuronavigation for maximal safe resection",
      "Multidisciplinary tumour board for adjuvant therapy planning",
      "Rehabilitation and follow-up MRI surveillance",
    ],
    faq: [
      {
        question: "Do all brain tumours need open surgery?",
        answer:
          "No. Some lesions are treated with radiosurgery or endoscopic routes. Decisions depend on tumour type, location, and patient health.",
      },
      {
        question: "How long is recovery?",
        answer:
          "Hospital stay averages 4–7 days followed by targeted physiotherapy. Return to regular activity varies with tumour location and occupation.",
      },
    ],
  },
  {
    slug: "brachial-plexus",
    name: "Brachial Plexus Injury",
    summary:
      "Microsurgical nerve reconstruction and rehabilitation for traumatic upper limb nerve injuries.",
    primaryPath: "/services/peripheral-nerve-surgery-hyderabad",
    keywords: ["brachial plexus", "nerve injury", "weakness"],
    symptomHighlights: [
      "Shoulder and arm weakness or paralysis after trauma",
      "Severe burning nerve pain or altered sensation",
      "Loss of fine motor control in the hand",
    ],
    treatmentHighlights: [
      "MRI neurography and nerve conduction studies for mapping",
      "Microsurgical nerve grafts or transfers in eligible cases",
      "Structured rehabilitation to rebuild strength and dexterity",
    ],
    faq: [
      {
        question: "What is the ideal time window for surgery?",
        answer:
          "Evaluation within 3–6 months yields better outcomes. Delayed presentation reduces the chance of meaningful nerve regeneration.",
      },
    ],
  },
  {
    slug: "carpal-tunnel",
    name: "Carpal Tunnel Syndrome",
    summary:
      "Day-care minimally invasive decompression for wrist nerve compression with rapid functional recovery.",
    primaryPath: "/conditions/carpal-tunnel-syndrome-hyderabad",
    relatedResources: [
      {
        href: "/patient-stories/carpal-tunnel-day-care-success",
        label: "Patient story: Grip strength restored in 14 days",
      },
    ],
    keywords: ["carpal tunnel", "nerve compression", "hand numbness"],
    symptomHighlights: [
      "Numbness and tingling in the thumb, index, and middle fingers",
      "Night-time pain that improves by shaking the hand",
      "Grip weakness making it difficult to hold objects",
    ],
    treatmentHighlights: [
      "Nerve conduction studies to confirm severity",
      "Mini-open release under local anaesthesia with same-day discharge",
      "Ergonomic modifications and hand therapy post procedure",
    ],
    faq: [
      {
        question: "How soon can normal activities resume?",
        answer:
          "Light activities resume within a few days. Most patients regain full strength by 2–3 weeks with physiotherapy guidance.",
      },
    ],
  },
  {
    slug: "chiari-malformation",
    name: "Chiari Malformation",
    summary:
      "Posterior fossa decompression planning for craniovertebral junction disorders causing headaches and imbalance.",
    primaryPath: "/conditions/chiari-malformation-hyderabad",
    keywords: ["chiari", "posterior fossa", "craniovertebral"],
    symptomHighlights: [
      "Occipital headaches worsened by coughing or exertion",
      "Balance difficulties and dizziness",
      "Tingling or weakness in the hands",
    ],
    treatmentHighlights: [
      "MRI with CSF flow studies to assess severity",
      "Posterior fossa decompression with duraplasty if indicated",
      "Post-operative physiotherapy and symptom monitoring",
    ],
    faq: [
      {
        question: "Is surgery always required for Chiari Malformation?",
        answer: "Not always. Asymptomatic cases are often monitored with MRI. Surgery is recommended if there are symptoms like severe headaches, balance issues, or syrinx formation.",
      },
      {
        question: "What is the recovery time after decompression surgery?",
        answer: "Hospital stay is typically 3-5 days. Most patients return to light activities within 2-3 weeks, with full recovery taking 6-12 weeks.",
      },
    ],
  },
  {
    slug: "cervical-disc",
    name: "Cervical Disc Herniation",
    summary:
      "Motion-preserving endoscopic and microscopic techniques to relieve neck pain and arm weakness.",
    primaryPath: "/conditions/cervical-radiculopathy-treatment-hyderabad",
    relatedResources: [
      {
        href: "/services/minimally-invasive-spine-surgery",
        label: "Minimally invasive spine surgery overview",
      },
    ],
    keywords: ["cervical disc", "neck pain", "radiculopathy"],
    symptomHighlights: [
      "Radiating arm pain and tingling in specific dermatomes",
      "Grip weakness or loss of dexterity",
      "Neck stiffness with limited range of motion",
    ],
    treatmentHighlights: [
      "Medications, physiotherapy, and cervical traction initially",
      "Endoscopic or microscopic discectomy for persistent deficits",
      "Rapid mobilisation with customised rehabilitation plan",
    ],
    faq: [
      {
        question: "Can cervical disc herniation heal without surgery?",
        answer:
          "Yes. Many cases improve with conservative care. Surgery is reserved for progressive weakness, intractable pain, or spinal cord compromise.",
      },
    ],
  },
  {
    slug: "cervical-myelopathy",
    name: "Cervical Myelopathy",
    summary:
      "Decompression and stabilisation strategies for cervical spinal cord compression leading to gait disturbance.",
    primaryPath: "/services/cervical-spine-surgery-hyderabad",
    keywords: ["myelopathy", "cervical", "spinal cord"],
    symptomHighlights: [
      "Hand clumsiness and difficulty with buttons or writing",
      "Unsteady gait and frequent falls",
      "Electric shock sensations down the spine on neck flexion",
    ],
    treatmentHighlights: [
      "MRI screening and neuromonitoring for severity",
      "Anterior or posterior decompression with fusion as needed",
      "Physiotherapy focused on balance and strength post-surgery",
    ],
    faq: [
      {
        question: "How is cervical myelopathy different from radiculopathy?",
        answer: "Myelopathy involves compression of the spinal cord itself, causing balance issues and dexterity loss. Radiculopathy is compression of a nerve root, causing pain and numbness in the arm.",
      },
      {
        question: "Can cervical myelopathy be reversed?",
        answer: "Surgery aims to stop progression. Improvement depends on the duration and severity of compression before surgery. Early intervention offers the best outcomes.",
      },
    ],
  },
  {
    slug: "degenerative-disc-disease",
    name: "Degenerative Disc Disease",
    summary:
      "Age-related disc wear causing chronic back or neck pain managed with conservative and minimally invasive techniques.",
    primaryPath: "/disease-guides/degenerative-disc-disease",
    relatedResources: [
      {
        href: "/services/minimally-invasive-spine-surgery",
        label: "Minimally invasive spine solutions",
      },
    ],
    keywords: ["degenerative disc", "disc desiccation", "chronic pain"],
    symptomHighlights: [
      "Chronic axial back or neck pain that fluctuates with activity",
      "Stiffness after prolonged sitting or standing",
      "Occasional radiation to limbs without severe nerve compression",
    ],
    treatmentHighlights: [
      "Core strengthening, posture correction, and physiotherapy",
      "Pain modulation with targeted injections when needed",
      "Motion-preserving procedures or fusion for advanced degeneration",
    ],
  },
  {
    slug: "disc-herniation",
    name: "Disc Herniation (Lumbar)",
    summary:
      "Full endoscopic discectomy and rehabilitation pathways for sciatic pain caused by lumbar disc prolapse.",
    primaryPath: "/conditions/herniated-disc-treatment-hyderabad",
    relatedResources: [
      {
        href: "/conditions/sciatica-pain-treatment-hyderabad",
        label: "Sciatica treatment guidance",
      },
      {
        href: "/stories/endoscopic-discectomy-same-day-hyderabad",
        label: "Patient story: Same-day discharge after endoscopic discectomy",
      },
      {
        href: "/services/endoscopic-discectomy-hyderabad",
        label: "Endoscopic discectomy service details",
      },
    ],
    keywords: ["disc herniation", "lumbar disc", "sciatica"],
    heroImage: {
      src: "/images/og-default.jpg",
      alt: "Endoscopic spine surgery concept for lumbar disc herniation",
    },
    symptomHighlights: [
      "Sharp leg pain radiating below the knee",
      "Foot numbness or weakness in severe cases",
      "Pain aggravated by sitting, coughing, or bending",
    ],
    treatmentHighlights: [
      "Structured physiotherapy and medications for initial care",
      "Full endoscopic discectomy for persistent neurological deficits",
      "Early mobilisation with tele-rehab follow-up",
    ],
    faq: [
      {
        question: "When is surgery necessary?",
        answer:
          "Surgery is advised when conservative care fails after 6–12 weeks or if there is progressive weakness or bladder/bowel involvement.",
      },
    ],
  },
  {
    slug: "epilepsy",
    name: "Drug-Resistant Epilepsy",
    summary:
      "Comprehensive seizure evaluation, stereo-EEG planning, and epilepsy surgery for medication-resistant cases.",
    primaryPath: "/services/epilepsy-surgery-hyderabad",
    relatedResources: [
      {
        href: "/stories/temporal-lobe-epilepsy-control",
        label: "Patient story: Seizure-free after temporal lobectomy",
      },
    ],
    keywords: ["epilepsy", "seizures", "temporal lobectomy"],
    symptomHighlights: [
      "Recurrent seizures despite optimal medication",
      "Post-ictal confusion impacting quality of life",
      "Aura symptoms indicating focal seizure onset",
    ],
    treatmentHighlights: [
      "Video EEG, PET/MRI, and neuropsych assessments",
      "Stereo-EEG or Wada testing for eloquent cortex mapping",
      "Resection, laser ablation, or neurostimulation therapies",
    ],
    faq: [
      {
        question: "What is the success rate?",
        answer:
          "Temporal lobe epilepsy surgery achieves seizure freedom in about 70% of carefully selected patients.",
      },
      {
        question: "How long is hospital stay?",
        answer:
          "Most patients are discharged within 4–5 days and resume light activities in 2–3 weeks.",
      },
    ],
  },
  {
    slug: "glioma",
    name: "Glioma",
    summary:
      "Oncologic neurosurgery combining awake mapping and adjuvant therapies for high-grade and low-grade gliomas.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    keywords: ["glioma", "astrocytoma", "brain cancer"],
    symptomHighlights: [
      "Seizures or progressive neurological deficits",
      "MRI showing infiltrative mass with edema",
      "Cognitive or personality changes",
    ],
    treatmentHighlights: [
      "Maximal safe resection with functional mapping",
      "Molecular profiling for targeted therapies",
      "Participation in clinical trials for recurrent disease",
    ],
  },
  {
    slug: "hydrocephalus",
    name: "Hydrocephalus",
    summary:
      "Endoscopic third ventriculostomy and shunt management for cerebrospinal fluid circulation disorders.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    keywords: ["hydrocephalus", "csf", "ventriculostomy"],
    symptomHighlights: [
      "Headache, vomiting, and papilledema due to raised pressure",
      "Gait disturbance and cognitive decline in adults",
      "Bulging fontanelle or rapid head growth in infants",
    ],
    treatmentHighlights: [
      "Neuroimaging with CSF flow studies",
      "Endoscopic third ventriculostomy for obstructive cases",
      "Programmable shunt systems with infection surveillance",
    ],
    faq: [
      {
        question: "Is endoscopic surgery suitable for all patients?",
        answer:
          "Endoscopic third ventriculostomy works best for obstructive hydrocephalus. Communicating hydrocephalus often requires shunt placement.",
      },
    ],
  },
  {
    slug: "lumbar-stenosis",
    name: "Lumbar Spinal Stenosis",
    summary:
      "Endoscopic ULBD decompression and minimally invasive approaches to treat neurogenic claudication.",
    primaryPath: "/conditions/spinal-stenosis-treatment-hyderabad",
    relatedResources: [
      {
        href: "/stories/endoscopic-ulbd-stenosis-hyderabad",
        label: "Patient story: Walking pain-free after ULBD",
      },
    ],
    keywords: ["lumbar stenosis", "claudication", "ulbd"],
    symptomHighlights: [
      "Leg heaviness or cramping when walking",
      "Relief on sitting or leaning forward",
      "MRI showing canal narrowing at lumbar levels",
    ],
    treatmentHighlights: [
      "Physiotherapy and epidural injections initially",
      "Endoscopic ULBD to decompress while preserving stability",
      "Walking programme and endurance training post-surgery",
    ],
  },
  {
    slug: "meningioma",
    name: "Meningioma",
    summary:
      "Skull base tumour management with neuronavigation, ultrasonic aspirators, and neuro-monitoring support.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    relatedResources: [
      {
        href: "/stories/minimal-invasive-meningioma-resection",
        label: "Patient story: Awake mapping during meningioma surgery",
      },
    ],
    keywords: ["meningioma", "skull base", "brain tumour"],
    symptomHighlights: [
      "Gradual headaches or seizures",
      "Vision or cranial nerve deficits for skull base tumours",
      "MRI showing dural-based enhancing lesion",
    ],
    treatmentHighlights: [
      "Simpson grade-guided resection aiming for dural attachment removal",
      "Reconstruction of skull base defects when needed",
      "Radiation for residual or recurrent lesions",
    ],
  },
  {
    slug: "metastasis",
    name: "Metastatic Brain Lesions",
    summary:
      "Surgical and radiosurgical coordination for metastatic brain disease with multidisciplinary oncology input.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    keywords: ["metastasis", "brain metastases", "radiosurgery"],
    symptomHighlights: [
      "Headache, seizures, or focal neurological deficits",
      "Known primary cancer with new brain lesions",
      "Edema and mass effect on imaging",
    ],
    treatmentHighlights: [
      "Microsurgical resection for symptomatic masses",
      "Radiosurgery or whole-brain radiotherapy as indicated",
      "Systemic therapy coordination with medical oncology",
    ],
  },
  {
    slug: "normal-pressure-hydrocephalus",
    name: "Normal Pressure Hydrocephalus",
    summary:
      "Triad of gait disturbance, cognitive decline, and urinary issues treated with programmable shunt systems.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    keywords: ["nph", "hydrocephalus", "shunt"],
    symptomHighlights: [
      "Magnetic gait with short, shuffling steps",
      "Memory impairment mimicking dementia",
      "Urgency or urinary incontinence",
    ],
    treatmentHighlights: [
      "Diagnostic CSF tap test to confirm benefit",
      "Programmable ventriculo-peritoneal shunt placement",
      "Regular valve adjustments and follow-up",
    ],
  },
  {
    slug: "pituitary-adenoma",
    name: "Pituitary Adenoma",
    summary:
      "Endoscopic endonasal surgery for hormonal and vision-related pituitary tumours with endocrinology support.",
    primaryPath: "/conditions/pituitary-adenoma-hyderabad",
    relatedResources: [
      {
        href: "/services/brain-tumor-surgery-hyderabad",
        label: "Brain tumour surgery and pituitary expertise",
      },
    ],
    keywords: ["pituitary", "adenoma", "endoscopic endonasal"],
    heroImage: {
      src: "/images/og-default.jpg",
      alt: "Endoscopic visualization of pituitary adenoma surgery",
    },
    symptomHighlights: [
      "Hormonal changes such as amenorrhea or acromegaly",
      "Vision loss from optic chiasm compression",
      "Headaches or incidental discovery on imaging",
    ],
    treatmentHighlights: [
      "Endoscopic endonasal resection with ENT collaboration",
      "Endocrine optimisation pre- and post-operatively",
      "Radiosurgery for residual microadenomas when needed",
    ],
    faq: [
      {
        question: "How is pituitary tumor surgery performed?",
        answer: "Most pituitary tumors are removed through the nose (transsphenoidal) using an endoscope. This minimally invasive approach leaves no visible scar.",
      },
      {
        question: "Will my vision improve after surgery?",
        answer: "If vision loss was caused by optic chiasm compression, decompression often leads to significant improvement, especially if treated early.",
      },
    ],
  },
  {
    slug: "radiculopathy",
    name: "Radiculopathy",
    summary:
      "Diagnostics and minimally invasive decompression for nerve root compression causing limb pain and weakness.",
    primaryPath: "/conditions/cervical-radiculopathy-treatment-hyderabad",
    relatedResources: [
      {
        href: "/services/minimally-invasive-spine-surgery",
        label: "Minimally invasive spine surgery approach",
      },
    ],
    keywords: ["radiculopathy", "nerve root", "pain"],
    symptomHighlights: [
      "Sharp, shooting pain following nerve root distribution",
      "Numbness or weakness in corresponding muscle groups",
      "Pain aggravated by specific spine movements",
    ],
    treatmentHighlights: [
      "Targeted physiotherapy and medications",
      "Selective nerve root blocks for diagnostic and therapeutic relief",
      "Endoscopic foraminotomy when deficits persist",
    ],
  },
  {
    slug: "sciatica",
    name: "Sciatica",
    summary:
      "Evidence-based conservative care and surgical escalation for sciatic nerve pain radiating down the leg.",
    primaryPath: "/conditions/sciatica-pain-treatment-hyderabad",
    relatedResources: [
      {
        href: "/services/endoscopic-discectomy-hyderabad",
        label: "Endoscopic discectomy programme",
      },
    ],
    keywords: ["sciatica", "leg pain", "nerve pain"],
    symptomHighlights: [
      "Burning or electric shock pain running down the leg",
      "Numbness, tingling, or weakness in the foot",
      "Pain exacerbated by sitting or long drives",
    ],
    treatmentHighlights: [
      "Physiotherapy, anti-inflammatories, and lifestyle adjustments",
      "Epidural steroid injections for persistent pain",
      "Endoscopic decompression for ongoing neurological deficits",
    ],
  },
  {
    slug: "seizure-disorders",
    name: "Seizure Disorders",
    summary:
      "Holistic seizure management including medication review, EEG monitoring, and epilepsy surgery consideration.",
    primaryPath: "/services/epilepsy-surgery-hyderabad",
    keywords: ["seizures", "epilepsy", "monitoring"],
    symptomHighlights: [
      "Recurrent convulsions or episodes of staring spells",
      "Memory lapses or confusion after events",
      "Triggers such as sleep deprivation or flashing lights",
    ],
    treatmentHighlights: [
      "Comprehensive neurologic evaluation and medication optimisation",
      "Ambulatory EEG and imaging to localise focus",
      "Referral to epilepsy surgery programme when criteria met",
    ],
  },
  {
    slug: "spinal-cord-tumour",
    name: "Spinal Cord Tumour",
    summary:
      "Microsurgical excision and adjuvant therapy for intradural and intramedullary spinal cord tumours.",
    primaryPath: "/services/minimally-invasive-spine-surgery",
    keywords: ["spinal cord tumour", "intradural", "ependymoma"],
    symptomHighlights: [
      "Band-like pain or numbness around the torso",
      "Progressive weakness or spasticity in limbs",
      "Bowel or bladder dysfunction in advanced cases",
    ],
    treatmentHighlights: [
      "MRI with contrast to define tumour extent",
      "Microsurgical resection with neuromonitoring",
      "Adjunct radiotherapy for residual disease",
    ],
  },
  {
    slug: "spondylolisthesis",
    name: "Spondylolisthesis",
    summary:
      "MIS TLIF and stabilization techniques for vertebral slippage causing back pain and radiculopathy.",
    primaryPath: "/conditions/spondylolisthesis-treatment-hyderabad",
    relatedResources: [
      {
        href: "/stories/lumbar-miss-tlif-recovery",
        label: "Patient story: Walking pain-free after TLIF",
      },
    ],
    keywords: ["spondylolisthesis", "fusion", "slipped vertebra"],
    symptomHighlights: [
      "Mechanical back pain with hamstring tightness",
      "Radicular symptoms or neurogenic claudication",
      "Step-off palpable in lumbar spine on exam",
    ],
    treatmentHighlights: [
      "Physiotherapy focusing on core strengthening",
      "Bracing and pain modulation when appropriate",
      "Minimally invasive TLIF to restore alignment and stability",
    ],
  },
  {
    slug: "trigeminal-neuralgia",
    name: "Trigeminal Neuralgia",
    summary:
      "Microvascular decompression and radiosurgery options for severe facial pain refractory to medication.",
    primaryPath: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
    relatedResources: [
      {
        href: "/stories/mvd-trigeminal-neuralgia-hyderabad",
        label: "Patient story: Rapid recovery after MVD",
      },
      {
        href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
        label: "Hyderabad trigeminal neuralgia care",
      },
    ],
    keywords: ["trigeminal neuralgia", "facial pain", "mvd"],
    heroImage: {
      src: "/images/og-default.jpg",
      alt: "Microvascular decompression for trigeminal neuralgia",
    },
    symptomHighlights: [
      "Electric shock-like facial pain lasting seconds",
      "Triggers such as brushing, chewing, or wind exposure",
      "Pain-free intervals that shorten over time",
    ],
    treatmentHighlights: [
      "Medication titration (carbamazepine, oxcarbazepine)",
      "Microvascular decompression for durable relief",
      "Radiosurgery or percutaneous rhizotomy when surgery is contraindicated",
    ],
    faq: [
      {
        question: "Is MVD safe for older adults?",
        answer:
          "With careful pre-operative evaluation and microsurgical technique, microvascular decompression offers long-term relief with low complication rates even in seniors.",
      },
    ],
  },
  {
    slug: "vascular-malformations",
    name: "Vascular Malformations",
    summary:
      "Management of AVMs and cavernomas including radiosurgery, embolization coordination, and microsurgery.",
    primaryPath: "/services/brain-tumor-surgery-hyderabad",
    keywords: ["avm", "cavernoma", "vascular malformation"],
    symptomHighlights: [
      "Seizures or focal deficits due to haemorrhage",
      "Headache or neurological decline",
      "Characteristic MRI/angiography findings",
    ],
    treatmentHighlights: [
      "Multidisciplinary planning with interventional neuroradiology",
      "Microsurgical excision for accessible lesions",
      "Radiosurgery or embolization as adjuncts",
    ],
  },
];

export function groupConditionsByLetter(items = CONDITION_RESOURCES) {
  const grouped = items.reduce<Record<string, ConditionResource[]>>((acc, condition) => {
    const letter = condition.name[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(condition);
    return acc;
  }, {});

  Object.keys(grouped).forEach((letter) => {
    grouped[letter] = grouped[letter].slice().sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  });

  return grouped;
}

export function getConditionResource(slug: string): ConditionResource | undefined {
  return CONDITION_RESOURCES.find((condition) => condition.slug === slug);
}
