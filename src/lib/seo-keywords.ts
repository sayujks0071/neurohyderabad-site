/**
 * Comprehensive SEO Keyword Strategy
 * Based on search volume, competition, and user intent
 */

export const seoKeywords = {
  // Primary keywords (highest priority)
  primary: {
    branded: [
      'dr sayuj krishnan',
      'dr sayuj krishnan s',
      'dr sayuj neurosurgeon',
      'dr sayuj krishnan hyderabad',
      'dr sayuj yashoda hospital',
      'dr sayuj spine surgeon',
    ],
    
    specialty: [
      'neurosurgeon hyderabad',
      'best neurosurgeon hyderabad',
      'brain surgeon hyderabad',
      'spine surgeon hyderabad',
      'best spine surgeon hyderabad',
      'neurologist hyderabad',
      'brain specialist hyderabad',
      'spine specialist hyderabad',
    ],
    
    procedures: [
      'endoscopic spine surgery',
      'minimally invasive spine surgery',
      'brain tumor surgery',
      'awake brain surgery',
      'spine surgery',
      'disc surgery',
      'sciatica treatment',
      'slip disc treatment',
    ]
  },
  
  // Location-based keywords
  location: {
    primary: [
      'neurosurgeon malakpet',
      'neurosurgeon yashoda hospital',
      'spine surgeon malakpet',
      'brain surgeon malakpet',
    ],
    
    secondary: [
      'neurosurgeon jubilee hills',
      'neurosurgeon banjara hills',
      'neurosurgeon hitech city',
      'neurosurgeon gachibowli',
      'neurosurgeon secunderabad',
      'neurosurgeon lb nagar',
      'neurosurgeon madhapur',
      'neurosurgeon kondapur',
    ],
    
    nearMe: [
      'neurosurgeon near me',
      'spine surgeon near me',
      'brain surgeon near me',
      'neurologist near me',
      'spine specialist near me',
      'back pain doctor near me',
    ]
  },
  
  // Service-specific keywords
  services: {
    endoscopic: [
      'endoscopic spine surgery hyderabad',
      'endoscopic discectomy hyderabad',
      'endoscopic spine surgery cost',
      'keyhole spine surgery',
      'minimally invasive discectomy',
      'endoscopic foraminotomy',
    ],
    
    brainSurgery: [
      'brain tumor surgery hyderabad',
      'brain tumor removal cost',
      'awake craniotomy hyderabad',
      'brain surgery specialist',
      'neuro oncology hyderabad',
      'glioma surgery hyderabad',
    ],
    
    spinalFusion: [
      'spinal fusion surgery hyderabad',
      'spinal fusion cost hyderabad',
      'lumbar fusion surgery',
      'cervical fusion surgery',
      'tlif surgery hyderabad',
      'spine fusion recovery',
    ],
    
    emergency: [
      'emergency neurosurgeon hyderabad',
      'urgent spine surgery',
      'emergency brain surgery',
      'head injury treatment',
      'spine trauma surgery',
      '24 hour neurosurgeon',
    ]
  },
  
  // Condition-based keywords
  conditions: {
    spine: [
      'herniated disc treatment',
      'bulging disc surgery',
      'spinal stenosis treatment',
      'spondylolisthesis surgery',
      'degenerative disc disease',
      'failed back surgery syndrome',
      'spine tumor surgery',
    ],
    
    brain: [
      'brain tumor symptoms',
      'meningioma surgery',
      'pituitary tumor surgery',
      'acoustic neuroma treatment',
      'brain aneurysm surgery',
      'hydrocephalus treatment',
      'epilepsy surgery',
    ],
    
    nerve: [
      'trigeminal neuralgia treatment',
      'carpal tunnel surgery',
      'peripheral nerve surgery',
      'nerve compression treatment',
      'facial pain treatment',
      'brachial plexus surgery',
    ],
    
    pain: [
      'chronic back pain treatment',
      'sciatica pain relief',
      'neck pain treatment',
      'lower back pain surgery',
      'radiculopathy treatment',
      'neuropathic pain treatment',
    ]
  },
  
  // Cost-related keywords (high commercial intent)
  cost: [
    'spine surgery cost hyderabad',
    'brain surgery cost hyderabad',
    'neurosurgery cost india',
    'endoscopic surgery cost',
    'slip disc surgery cost',
    'affordable spine surgery',
    'insurance covered neurosurgery',
    'cashless treatment neurosurgery',
    'esi panel neurosurgeon',
    'cghs empaneled neurosurgeon',
  ],
  
  // Question-based keywords (voice search & featured snippets)
  questions: {
    what: [
      'what is endoscopic spine surgery',
      'what causes back pain',
      'what is spinal stenosis',
      'what is a herniated disc',
      'what is minimally invasive surgery',
    ],
    
    how: [
      'how much spine surgery cost',
      'how long spine surgery recovery',
      'how to prepare for brain surgery',
      'how to choose neurosurgeon',
      'how endoscopic surgery works',
    ],
    
    when: [
      'when to see neurosurgeon',
      'when spine surgery needed',
      'when to worry about back pain',
      'when to get mri for back pain',
    ],
    
    which: [
      'which is best hospital neurosurgery',
      'which surgery for herniated disc',
      'which doctor for spine problems',
    ],
    
    can: [
      'can herniated disc heal without surgery',
      'can spine surgery be avoided',
      'can sciatica be cured permanently',
    ]
  },
  
  // Competitor keywords
  vs: [
    'endoscopic vs open spine surgery',
    'neurosurgeon vs orthopedic surgeon',
    'surgery vs physiotherapy spine',
    'microdiscectomy vs endoscopic',
    'fusion vs disc replacement',
  ],
  
  // LSI (Latent Semantic Indexing) keywords
  lsi: [
    'minimally invasive',
    'keyhole surgery',
    'german trained',
    'fellowship trained',
    'board certified',
    'experienced surgeon',
    'patient testimonials',
    'success rate',
    'recovery time',
    'same day discharge',
    'outpatient surgery',
    'advanced technology',
    'robotic surgery',
    'navigation guided',
    'microscopic surgery',
  ]
};

// Keyword density recommendations
export const keywordDensity = {
  primaryKeyword: '1-2%',
  secondaryKeywords: '0.5-1%',
  lsiKeywords: '0.3-0.5%',
  totalKeywordDensity: '3-4%'
};

// Content length recommendations by page type
export const contentLength = {
  homePage: '1500-2000 words',
  servicePage: '2000-3000 words',
  conditionPage: '2500-3500 words',
  blogPost: '1500-2500 words',
  locationPage: '1000-1500 words',
  aboutPage: '800-1200 words'
};
