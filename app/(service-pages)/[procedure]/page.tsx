import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/src/lib/seo';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import { getLocationById } from '@/src/data/locations';

type ProcedureKey =
  | 'endoscopic-discectomy'
  | 'minimally-invasive-spine-surgery'
  | 'awake-brain-surgery'
  | 'cervical-disc-replacement'
  | 'lumbar-stenosis-surgery'
  | 'spinal-fracture-fixation'
  | 'endoscopic-cervical-spine-surgery'
  | 'spinal-cord-compression-surgery'
  | 'brain-tumor-surgery'
  | 'endoscopic-lumbar-fusion'
  | 'craniovertebral-junction-surgery'
  | 'neuro-endoscopy';

type ProcedurePageContent = {
  name: string;
  heroDescription: string;
  metaDescription: string;
  canonical: string;
  schema: Record<string, unknown>;
  benefits: string[];
  candidates: string[];
  relatedService?: {
    label: string;
    href: string;
  };
};

const BOOK_URL = 'https://www.drsayuj.info/book';

const PROCEDURE_CONTENT: Record<ProcedureKey, ProcedurePageContent> = {
  'endoscopic-discectomy': {
    name: 'Endoscopic Discectomy',
    heroDescription:
      'Minimally invasive removal of herniated disc fragments using a working channel endoscope that preserves muscle and speeds recovery.',
    metaDescription:
      'Minimally invasive removal of herniated disc using an endoscope for faster recovery and minimal pain.',
    canonical: `${SITE_URL}/endoscopic-discectomy`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/endoscopic-discectomy#procedure',
      name: 'Endoscopic Discectomy',
      url: 'https://www.drsayuj.info/endoscopic-discectomy',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Minimally invasive removal of herniated disc using an endoscope for faster recovery and minimal pain.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/endoscopic-discectomy' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/endoscopic-discectomy',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      '8–10 mm access corridor with minimal muscle disruption and less postoperative pain.',
      'Same-day ambulation protocols and structured return-to-work guidance.',
      'Performed by Dr. Sayuj using high-definition endoscopic visualization for precision removal.',
    ],
    candidates: [
      'Lumbar disc herniation confirmed on MRI with correlating leg pain or numbness.',
      'Patients who failed physiotherapy, medication, or injections but prefer minimally invasive surgery.',
      'Working professionals needing a rapid recovery timeline to return to activity quickly.',
    ],
    relatedService: {
      label: 'Detailed Endoscopic Discectomy Program',
      href: '/services/endoscopic-discectomy-hyderabad',
    },
  },
  'minimally-invasive-spine-surgery': {
    name: 'Minimally Invasive Spine Surgery',
    heroDescription:
      'Keyhole spine procedures that use tubular retractors or endoscopes to decompress nerves and stabilize segments with less trauma.',
    metaDescription:
      'Keyhole spine procedures using tubular retractors or endoscopes to reduce pain, blood loss, and hospital stay.',
    canonical: `${SITE_URL}/minimally-invasive-spine-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/minimally-invasive-spine-surgery#procedure',
      name: 'Minimally Invasive Spine Surgery',
      url: 'https://www.drsayuj.info/minimally-invasive-spine-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Keyhole spine procedures using tubular retractors or endoscopes to reduce pain, blood loss, and hospital stay.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.drsayuj.info/minimally-invasive-spine-surgery',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/minimally-invasive-spine-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Muscle-sparing access that significantly reduces postoperative discomfort.',
      'Lower blood loss and shorter hospitalization compared with open techniques.',
      'Advanced navigation and endoscopic imaging to protect nerves during decompression.',
    ],
    candidates: [
      'Patients with herniated discs, spinal stenosis, or foraminal narrowing needing surgical relief.',
      'People who wish to minimise downtime and get back to work or sport sooner.',
      'Individuals seeking second opinions on fusion vs. motion-preserving MISS options.',
    ],
    relatedService: {
      label: 'Explore Our MISS Protocol',
      href: '/services/minimally-invasive-spine-surgery',
    },
  },
  'awake-brain-surgery': {
    name: 'Awake Brain Surgery',
    heroDescription:
      'Awake craniotomy that keeps critical speech or motor pathways under real-time monitoring while tumor or epilepsy focus is removed.',
    metaDescription:
      'Awake craniotomy to preserve critical functions like speech and movement during tumor or epilepsy surgery.',
    canonical: `${SITE_URL}/awake-brain-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/awake-brain-surgery#procedure',
      name: 'Awake Brain Surgery',
      url: 'https://www.drsayuj.info/awake-brain-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Awake craniotomy to preserve critical functions like speech and movement during tumor or epilepsy surgery.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/awake-brain-surgery' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/awake-brain-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Continuous speech or motor mapping to preserve eloquent cortex during tumor resection.',
      'Anaesthesia and neuropsychology teams trained in awake protocols for patient comfort.',
      'Neuronavigation and intraoperative monitoring to maximise resection while protecting function.',
    ],
    candidates: [
      'Patients with low-grade or high-grade tumors near speech, motor, or visual pathways.',
      'Individuals with drug-resistant epilepsy needing resective surgery in eloquent cortex.',
      'People seeking advanced functional preservation strategies with an experienced neurosurgeon.',
    ],
    relatedService: {
      label: 'Meet the Brain Surgery Program',
      href: '/brain-surgery',
    },
  },
  'cervical-disc-replacement': {
    name: 'Cervical Disc Replacement',
    heroDescription:
      'Motion-preserving artificial disc implantation for cervical disc disease and spondylosis when conservative care fails.',
    metaDescription:
      'Motion-preserving artificial disc replacement for cervical disc disease and spondylosis.',
    canonical: `${SITE_URL}/cervical-disc-replacement`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/cervical-disc-replacement#procedure',
      name: 'Cervical Disc Replacement',
      url: 'https://www.drsayuj.info/cervical-disc-replacement',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description: 'Motion-preserving artificial disc replacement for cervical disc disease and spondylosis.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/cervical-disc-replacement' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/cervical-disc-replacement',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Preserves cervical motion unlike fusion, reducing adjacent segment stress.',
      'Tiny anterior cervical incision with minimal blood loss and quick swallowing recovery.',
      'Implant selection tailored by Dr. Sayuj for long-term durability and biomechanics.',
    ],
    candidates: [
      'Single-level cervical disc herniation or degeneration causing arm pain or myelopathy.',
      'Patients without severe facet arthropathy or instability who prefer motion preservation.',
      'Individuals comparing ACDF vs. disc replacement and seeking personalised evaluation.',
    ],
    relatedService: {
      label: 'Understand Cervical Fusion & Replacement',
      href: '/services/spinal-fusion-surgery-hyderabad',
    },
  },
  'lumbar-stenosis-surgery': {
    name: 'Lumbar Canal Stenosis Surgery',
    heroDescription:
      'Endoscopic decompression protocols that open the lumbar canal with minimal tissue disruption and rapid mobilisation.',
    metaDescription:
      'Endoscopic decompression to relieve leg pain and numbness due to lumbar canal stenosis.',
    canonical: `${SITE_URL}/lumbar-stenosis-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/lumbar-stenosis-surgery#procedure',
      name: 'Lumbar Canal Stenosis Surgery',
      url: 'https://www.drsayuj.info/lumbar-stenosis-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description: 'Endoscopic decompression to relieve leg pain and numbness due to lumbar canal stenosis.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/lumbar-stenosis-surgery' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/lumbar-stenosis-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'ULBD and foraminotomy techniques that decompress both sides through a unilateral corridor.',
      'Enhanced visualisation to protect dura and nerves while removing hypertrophied ligament and bone.',
      'Postoperative walking protocols to restore endurance and confidence quickly.',
    ],
    candidates: [
      'Neurogenic claudication with MRI-confirmed lumbar canal narrowing.',
      'Patients limited by leg pain and numbness despite physiotherapy or injections.',
      'Older adults seeking day-care or short-stay option with minimal blood loss.',
    ],
    relatedService: {
      label: 'Endoscopic MISS Pathway',
      href: '/services/minimally-invasive-spine-surgery',
    },
  },
  'spinal-fracture-fixation': {
    name: 'Spinal Fracture Fixation',
    heroDescription:
      'Stabilisation of traumatic spine fractures using minimally invasive pedicle screw systems that enable early mobilisation.',
    metaDescription:
      'Stabilization of traumatic spine fractures using minimally invasive techniques to enable early mobilization.',
    canonical: `${SITE_URL}/spinal-fracture-fixation`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/spinal-fracture-fixation#procedure',
      name: 'Spinal Fracture Fixation',
      url: 'https://www.drsayuj.info/spinal-fracture-fixation',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Stabilization of traumatic spine fractures using minimally invasive techniques to enable early mobilization.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/spinal-fracture-fixation' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/spinal-fracture-fixation',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Percutaneous pedicle screws that minimise blood loss and soft tissue trauma.',
      'Navigation and neuromonitoring to ensure accurate screw placement in unstable fractures.',
      'Enhanced recovery collaboration with physiotherapy for early brace-free mobilisation.',
    ],
    candidates: [
      'Thoracolumbar burst fractures or flexion-distraction injuries requiring fixation.',
      'Patients with osteoporosis-related fractures needing cement-augmented screws.',
      'Polytrauma cases needing rapid stabilisation to start rehabilitation safely.',
    ],
    relatedService: {
      label: 'Comprehensive Spine Trauma Care',
      href: '/services/spine-surgery-hyderabad',
    },
  },
  'endoscopic-cervical-spine-surgery': {
    name: 'Endoscopic Cervical Spine Surgery',
    heroDescription:
      'Ultra-minimally invasive cervical discectomy and decompression through a 5–7 mm incision with rapid recovery expectations.',
    metaDescription:
      'Ultra-minimally invasive cervical discectomy/decompression through a 5–7 mm incision with rapid recovery.',
    canonical: `${SITE_URL}/endoscopic-cervical-spine-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/endoscopic-cervical-spine-surgery#procedure',
      name: 'Endoscopic Cervical Spine Surgery',
      url: 'https://www.drsayuj.info/endoscopic-cervical-spine-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Ultra-minimally invasive cervical discectomy/decompression through a 5–7 mm incision with rapid recovery.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.drsayuj.info/endoscopic-cervical-spine-surgery',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/endoscopic-cervical-spine-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Anterior and posterior endoscopic corridors tailored to soft or bony compression.',
      'Immediate visualisation of nerve roots with minimal muscle or ligament disruption.',
      'Day-care discharge with structured neck strengthening and ergonomics counselling.',
    ],
    candidates: [
      'Cervical disc prolapse with persistent arm pain or weakness despite conservative care.',
      'Patients with foraminal stenosis seeking motion-preserving decompression.',
      'Busy professionals wanting faster recovery than traditional open surgery allows.',
    ],
    relatedService: {
      label: 'Cervical MISS Expertise',
      href: '/services/minimally-invasive-spine-surgery',
    },
  },
  'spinal-cord-compression-surgery': {
    name: 'Spinal Cord Compression Surgery',
    heroDescription:
      'Comprehensive decompression and stabilisation strategies to relieve spinal cord pressure from tumor, trauma, or degeneration.',
    metaDescription:
      'Decompression and stabilization to relieve spinal cord pressure from tumor, trauma, or degeneration.',
    canonical: `${SITE_URL}/spinal-cord-compression-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/spinal-cord-compression-surgery#procedure',
      name: 'Spinal Cord Compression Surgery',
      url: 'https://www.drsayuj.info/spinal-cord-compression-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Decompression and stabilization to relieve spinal cord pressure from tumor, trauma, or degeneration.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.drsayuj.info/spinal-cord-compression-surgery',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/spinal-cord-compression-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Multimodal imaging review to plan decompression while maintaining spinal stability.',
      'Combination of tumor debulking, instrumentation, or laminoplasty tailored to diagnosis.',
      'Postoperative neuro-rehabilitation partners to restore gait, balance, and independence.',
    ],
    candidates: [
      'Patients with progressive myelopathy from degenerative or ossified ligaments.',
      'Spinal metastasis cases requiring decompression and stabilisation for pain relief.',
      'Traumatic spinal cord compression needing urgent surgical decompression.',
    ],
    relatedService: {
      label: 'Advanced Spine Surgery Consult',
      href: '/services/spine-surgery-hyderabad',
    },
  },
  'brain-tumor-surgery': {
    name: 'Brain Tumor Surgery',
    heroDescription:
      'Microsurgical and endoscopic tumor removal with neuronavigation, neuromonitoring, and functional preservation strategies.',
    metaDescription:
      'Microsurgical/endoscopic tumor removal with neuronavigation to maximize safety and functional preservation.',
    canonical: `${SITE_URL}/brain-tumor-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/brain-tumor-surgery#procedure',
      name: 'Brain Tumor Surgery',
      url: 'https://www.drsayuj.info/brain-tumor-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Microsurgical/endoscopic tumor removal with neuronavigation to maximize safety and functional preservation.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/brain-tumor-surgery' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/brain-tumor-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Neuronavigation and intraoperative monitoring to remove tumours safely.',
      'Awake and endoscopic techniques available for eloquent or deep-seated lesions.',
      'Multidisciplinary tumour board, pathology, and rehab support for continuity of care.',
    ],
    candidates: [
      'Patients with operable benign or malignant brain tumours seeking maximal safe resection.',
      'Individuals requiring reoperation or second opinions on complex cranial pathology.',
      'People who value functional preservation, rapid recovery, and clear follow-up planning.',
    ],
    relatedService: {
      label: 'Comprehensive Brain Tumor Service',
      href: '/services/brain-tumor-surgery-hyderabad',
    },
  },
  'endoscopic-lumbar-fusion': {
    name: 'Endoscopic Lumbar Fusion',
    heroDescription:
      'Keyhole lumbar fusion for instability or spondylolisthesis combining endoscopic decompression with percutaneous fixation.',
    metaDescription:
      'Keyhole fusion for instability or spondylolisthesis enabling small incisions and faster recovery.',
    canonical: `${SITE_URL}/endoscopic-lumbar-fusion`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/endoscopic-lumbar-fusion#procedure',
      name: 'Endoscopic Lumbar Fusion',
      url: 'https://www.drsayuj.info/endoscopic-lumbar-fusion',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Keyhole fusion for instability or spondylolisthesis enabling small incisions and faster recovery.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.drsayuj.info/endoscopic-lumbar-fusion',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/endoscopic-lumbar-fusion',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Transforaminal or lateral endoscopic approach reduces muscle stripping and blood loss.',
      'Percutaneous pedicle screws with real-time navigation for accurate alignment.',
      'Enhanced recovery with early standing and tailored physiotherapy from day one.',
    ],
    candidates: [
      'Low-grade spondylolisthesis with mechanical back pain and nerve compression.',
      'Recurrent disc herniation where motion preservation is no longer feasible.',
      'Patients evaluating fusion options but seeking the least invasive alternative.',
    ],
    relatedService: {
      label: 'Fusion & Stabilisation Options',
      href: '/services/spinal-fusion-surgery-hyderabad',
    },
  },
  'craniovertebral-junction-surgery': {
    name: 'Craniovertebral Junction Surgery',
    heroDescription:
      'Correction and fixation of congenital or traumatic CVJ anomalies using advanced imaging, navigation, and fusion techniques.',
    metaDescription:
      'Correction and fixation for congenital or traumatic CVJ anomalies using advanced techniques.',
    canonical: `${SITE_URL}/craniovertebral-junction-surgery`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/craniovertebral-junction-surgery#procedure',
      name: 'Craniovertebral Junction Surgery',
      url: 'https://www.drsayuj.info/craniovertebral-junction-surgery',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Correction and fixation for congenital or traumatic CVJ anomalies using advanced techniques.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.drsayuj.info/craniovertebral-junction-surgery',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/craniovertebral-junction-surgery',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Detailed 3D planning with CT angiography to protect vertebral arteries during fixation.',
      'Occipito-cervical fusion constructs tailored to instability and neural compression.',
      'Neuro-rehabilitation support for balance, gait, and respiratory recovery post-surgery.',
    ],
    candidates: [
      'Congenital anomalies like atlantoaxial instability or basilar invagination.',
      'Traumatic CVJ fractures with ligament injury requiring surgical stabilisation.',
      'Rheumatoid or degenerative pannus causing compressive myelopathy.',
    ],
    relatedService: {
      label: 'Complex Cervical Spine Program',
      href: '/services/spine-surgery-hyderabad',
    },
  },
  'neuro-endoscopy': {
    name: 'Neuro Endoscopy (Brain & Spine)',
    heroDescription:
      'Endoscopic treatment for intracranial cysts, hydrocephalus, and spinal lesions through keyhole corridors with rapid recovery.',
    metaDescription:
      'Endoscopic treatment for tumors, cysts, and hydrocephalus with minimal access and rapid recovery.',
    canonical: `${SITE_URL}/neuro-endoscopy`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://www.drsayuj.info/neuro-endoscopy#procedure',
      name: 'Neuro Endoscopy (Brain & Spine)',
      url: 'https://www.drsayuj.info/neuro-endoscopy',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      description:
        'Endoscopic treatment for tumors, cysts, and hydrocephalus with minimal access and rapid recovery.',
      provider: { '@id': 'https://www.drsayuj.info/#physician' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Hyderabad, Telangana, India' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.drsayuj.info/neuro-endoscopy' },
      offers: {
        '@type': 'Offer',
        url: 'https://www.drsayuj.info/neuro-endoscopy',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://www.drsayuj.info/#physician' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book Appointment',
          target: BOOK_URL,
        },
      },
    },
    benefits: [
      'Ventricular and skull-base access with minimal cortical disruption or retraction.',
      'Endoscopic spine techniques for cysts, tethered cord, and intradural lesions.',
      'Faster recovery, shorter hospital stay, and reduced post-operative discomfort.',
    ],
    candidates: [
      'Patients with arachnoid cysts, colloid cysts, or hydrocephalus requiring ETV or cyst fenestration.',
      'Skull-base lesions amenable to endonasal or keyhole endoscopic approaches.',
      'Spinal intradural pathology suited for minimal access decompression.',
    ],
    relatedService: {
      label: 'Discuss Endoscopic Options',
      href: '/appointments',
    },
  },
};

const CTA_LINKS = [
  {
    href: BOOK_URL,
    label: 'Book Appointment',
    variant: 'primary' as const,
  },
  {
    href: 'tel:+919778280044',
    label: 'Call +91-97782-80044',
    variant: 'secondary' as const,
  },
  {
    href: 'mailto:hellodr@drsayuj.info',
    label: 'Email Care Team',
    variant: 'outline' as const,
  },
];

type GenerateMetadataProps = {
  params: Promise<{ procedure: string }>;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { procedure } = await params;
  const key = procedure as ProcedureKey;
  const entry = PROCEDURE_CONTENT[key];

  if (!entry) {
    return {};
  }

  const title = `${entry.name} | Dr. Sayuj Krishnan S`;

  return {
    title,
    description: entry.metaDescription,
    alternates: {
      canonical: entry.canonical,
      languages: {
        'en-IN': entry.canonical,
        'x-default': entry.canonical,
      },
    },
    openGraph: {
      title,
      description: entry.metaDescription,
      url: entry.canonical,
      siteName: 'Dr. Sayuj Krishnan S - Neurosurgeon Hyderabad',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: entry.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(PROCEDURE_CONTENT).map((procedure) => ({
    procedure,
  }));
}

export default async function ProcedurePage({ params }: { params: Promise<{ procedure: string }> }) {
  const { procedure } = await params;
  
  // Early return for sitemap routes to prevent matching
  if (procedure.includes('sitemap') || procedure.endsWith('.xml')) {
    notFound();
  }
  
  const key = procedure as ProcedureKey;
  const entry = PROCEDURE_CONTENT[key];

  // Reuse main location for services pages (Hyderabad context)
  const location = getLocationById("hyderabad");

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd id={`${key}-schema`} data={entry.schema} />
      <main className="container mx-auto px-4 py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Specialist Procedure</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{entry.name}</h1>
          <p className="mt-4 text-lg text-gray-600">{entry.heroDescription}</p>
        </header>

        <section className="mt-8 flex flex-wrap gap-4">
          {CTA_LINKS.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className={[
                'inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                cta.variant === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500'
                  : cta.variant === 'secondary'
                  ? 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500'
                  : 'border border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50 focus-visible:ring-blue-500',
              ].join(' ')}
            >
              {cta.label}
            </a>
          ))}
        </section>

        <section className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800">Why patients choose this procedure</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {entry.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800">Who benefits most</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {entry.candidates.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {entry.relatedService && (
          <section className="mt-12 rounded-xl bg-blue-50 p-8">
            <h2 className="text-2xl font-semibold text-blue-900">Explore the full care pathway</h2>
            <p className="mt-3 text-gray-700">
              Learn how our multidisciplinary team supports you before, during, and after the procedure with personalised rehab,
              insurance coordination, and long-term follow-up.
            </p>
            <Link
              href={entry.relatedService.href}
              className="mt-6 inline-flex items-center text-blue-700 hover:text-blue-900"
            >
              {entry.relatedService.label} →
            </Link>
          </section>
        )}

        {location && (
            <div className="mt-16 border-t pt-10">
                <h2 className="text-2xl font-bold mb-6">Visit Our Clinics</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="mb-4 text-gray-700">
                            Looking for {entry.name.toLowerCase()} in your area? We serve patients across Hyderabad.
                        </p>
                        <Link href="/locations" className="text-blue-700 hover:underline font-semibold">
                            View all locations &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
