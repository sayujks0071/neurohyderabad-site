import type { ConsultationPrepProps } from '../types/ConsultationPrepProps';

/**
 * Surgery preparation steps database
 * Hardcoded mappings for 8 common neurosurgery procedures
 */
const SURGERY_PREP_STEPS: Record<string, ConsultationPrepProps['prepSteps']> = {
  'Endoscopic Spine Surgery': [
    {
      step: 1,
      title: 'Fast 6 hours before surgery',
      description: 'No food or water after midnight before your procedure',
    },
    {
      step: 2,
      title: 'Bring your MRI scans',
      description: 'Physical copies of recent MRI/CT scans are required',
    },
    {
      step: 3,
      title: 'Arrive 15 minutes early',
      description: 'Complete pre-operative paperwork and consent forms',
    },
  ],

  'Brain Tumor Surgery': [
    {
      step: 1,
      title: 'NPO (Nothing by mouth)',
      description: 'No food for 8 hours before surgery, no water after midnight',
    },
    {
      step: 2,
      title: 'Scalp preparation',
      description: 'Hospital staff will prepare the surgical site area',
    },
    {
      step: 3,
      title: 'Family member required',
      description: 'Bring a family member for post-operative support',
    },
  ],

  'Awake Craniotomy': [
    {
      step: 1,
      title: 'Practice speech tests',
      description: 'Familiarize yourself with the language tasks you will perform',
    },
    {
      step: 2,
      title: 'NPO after midnight',
      description: 'No food or liquids after midnight before surgery',
    },
    {
      step: 3,
      title: 'Bring comfort items',
      description: 'Headphones and music selections for the procedure',
    },
  ],

  'Spinal Fusion': [
    {
      step: 1,
      title: 'Stop blood thinners',
      description: 'Discontinue aspirin/blood thinners 7 days before (consult first)',
    },
    {
      step: 2,
      title: 'Complete imaging',
      description: 'Ensure all X-rays, MRI, and CT scans are available',
    },
    {
      step: 3,
      title: 'Arrange mobility aids',
      description: 'Walker or wheelchair may be needed for first week post-op',
    },
  ],

  'Carpal Tunnel Release': [
    {
      step: 1,
      title: 'Local anesthesia only',
      description: 'Light meal 2 hours before is acceptable for this procedure',
    },
    {
      step: 2,
      title: 'Arrange a driver',
      description: 'You cannot drive yourself home after the procedure',
    },
    {
      step: 3,
      title: 'Prepare hand splint',
      description: 'You will need to wear a wrist splint for 1-2 weeks',
    },
  ],

  'Disc Replacement': [
    {
      step: 1,
      title: 'Stop NSAIDs',
      description: 'Stop all anti-inflammatory medications 5 days before',
    },
    {
      step: 2,
      title: 'Review CT scan results',
      description: 'Ensure latest CT scan is available for surgical planning',
    },
    {
      step: 3,
      title: 'Post-op brace fitting',
      description: 'A cervical or lumbar brace will be fitted before discharge',
    },
  ],

  'Skull Base Surgery': [
    {
      step: 1,
      title: 'ENT clearance required',
      description: 'Complete ENT evaluation and clearance before surgery',
    },
    {
      step: 2,
      title: 'Nasal preparation',
      description: 'Special nasal sprays will be prescribed for 3 days prior',
    },
    {
      step: 3,
      title: 'Extended hospital stay',
      description: 'Plan for 3-5 day hospital stay, arrange coverage',
    },
  ],

  'General/Default': [
    {
      step: 1,
      title: 'Fast 6 hours before',
      description: 'No food or liquids 6 hours prior to your appointment',
    },
    {
      step: 2,
      title: 'Bring medical records',
      description: 'All recent imaging, lab reports, and medication lists',
    },
    {
      step: 3,
      title: 'Insurance and ID',
      description: 'Valid insurance card and government-issued photo ID',
    },
  ],
};

/**
 * Keyword patterns for matching appointment reason to surgery type
 */
const SURGERY_TYPE_KEYWORDS: Record<string, RegExp[]> = {
  'Endoscopic Spine Surgery': [
    /endoscopic/i,
    /discectomy/i,
    /herniated\s+disc/i,
    /disc\s+bulge/i,
  ],
  'Brain Tumor Surgery': [
    /brain\s+tumor/i,
    /glioma/i,
    /meningioma/i,
    /tumor\s+removal/i,
    /craniotomy/i,
  ],
  'Awake Craniotomy': [
    /awake/i,
    /awake\s+brain/i,
    /language\s+mapping/i,
  ],
  'Spinal Fusion': [
    /fusion/i,
    /spondylolisthesis/i,
    /spinal\s+instability/i,
  ],
  'Carpal Tunnel Release': [
    /carpal\s+tunnel/i,
    /nerve\s+compression/i,
    /median\s+nerve/i,
  ],
  'Disc Replacement': [
    /disc\s+replacement/i,
    /artificial\s+disc/i,
    /cervical\s+arthroplasty/i,
  ],
  'Skull Base Surgery': [
    /skull\s+base/i,
    /acoustic\s+neuroma/i,
    /petroclival/i,
  ],
};

/**
 * Maps appointment reason to surgery type using keyword matching
 * @param reason - Chief complaint from appointment booking
 * @returns Matched surgery type or 'General/Default'
 */
export function getSurgeryType(reason: string): string {
  if (!reason) return 'General/Default';

  // Check each surgery type's keyword patterns
  for (const [surgeryType, patterns] of Object.entries(SURGERY_TYPE_KEYWORDS)) {
    for (const pattern of patterns) {
      if (pattern.test(reason)) {
        return surgeryType;
      }
    }
  }

  // Default fallback
  return 'General/Default';
}

/**
 * Get preparation steps for a specific surgery type
 * @param surgeryType - Surgery type string (or appointment reason for auto-detection)
 * @returns Array of 3 preparation steps
 */
export function getSurgeryPrepSteps(surgeryType: string): ConsultationPrepProps['prepSteps'] {
  // Try direct lookup first
  if (surgeryType in SURGERY_PREP_STEPS) {
    return SURGERY_PREP_STEPS[surgeryType];
  }

  // Try keyword matching on the reason field
  const detectedType = getSurgeryType(surgeryType);
  return SURGERY_PREP_STEPS[detectedType];
}

/**
 * Get full consultation prep props from appointment data
 */
export function buildConsultationPrepProps(data: {
  patientName: string;
  reason: string;
  appointmentDate: string;
  appointmentTime: string;
}): ConsultationPrepProps {
  const surgeryType = getSurgeryType(data.reason);
  const prepSteps = getSurgeryPrepSteps(surgeryType);

  return {
    patientName: data.patientName,
    surgeryType,
    appointmentDate: data.appointmentDate,
    appointmentTime: data.appointmentTime,
    prepSteps,
  };
}
