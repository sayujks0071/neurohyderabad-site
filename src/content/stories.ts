export interface PatientStory {
  id: string;
  slug: string;
  title: string;
  patientInitials: string;
  procedure: string;
  condition: string;
  quote: string;
  summary: string;
  recoveryTime?: string;
  outcomes: string[];
  tags: string[];
  date: string;
  videoUrl?: string; // Optional YouTube URL for video testimonials
}

export const patientStories: PatientStory[] = [
  {
    id: 'brain-001',
    slug: 'minimal-invasive-meningioma-resection',
    title: 'Back to Work After Meningioma Surgery',
    patientInitials: 'S.K.',
    procedure: 'Neuronavigation-guided meningioma resection',
    condition: 'Left frontal meningioma with speech hesitation',
    quote: '“I was speaking normally the next day and felt safe throughout the awake mapping.”',
    summary:
      'A 39-year-old teacher with progressive word-finding difficulty underwent awake craniotomy with mapping. She returned to the classroom in four weeks with no residual tumour on follow-up MRI.',
    recoveryTime: '4 weeks',
    outcomes: ['Gross-total resection confirmed on MRI', 'No neurological deficits', 'Returned to teaching within a month'],
    tags: ['brain', 'awake-surgery', 'meningioma'],
    date: '2025-01-12',
  },
  {
    id: 'video-005',
    slug: 'video-testimonial-1',
    title: 'Patient Testimonial — Recovery After Spine Treatment',
    patientInitials: 'Video',
    procedure: 'Patient Experience',
    condition: 'Recovery journey',
    quote: '“A first-hand account of care, recovery, and outcome.”',
    summary:
      'A brief testimonial capturing expectations, care experience, and recovery milestones following treatment with Dr. Sayuj.',
    outcomes: ['Clear explanation of the process', 'Smooth recovery experience'],
    tags: ['testimonial', 'video'],
    date: '2025-10-29',
    videoUrl: 'https://youtu.be/vqqAHzwZPYw?si=aPy69clyracOFAG-'
  },
  {
    id: 'video-006',
    slug: 'video-testimonial-2',
    title: 'Patient Testimonial — Neurosurgical Care Experience',
    patientInitials: 'Video',
    procedure: 'Patient Experience',
    condition: 'Recovery journey',
    quote: '“Professional care and personalized attention throughout.”',
    summary:
      'A concise testimonial describing the overall experience, what changed after treatment, and advice to others considering care.',
    outcomes: ['Professional care', 'Personalized attention'],
    tags: ['testimonial', 'video'],
    date: '2025-10-29',
    videoUrl: 'https://youtu.be/HPhPB5jY0xk?si=H-Vrx9t1eGeph3an'
  },
  {
    id: 'spine-002',
    slug: 'lumbar-miss-tlif-recovery',
    title: 'Walking Pain-Free After TLIF',
    patientInitials: 'R.M.',
    procedure: 'Minimally invasive TLIF at L4-L5',
    condition: 'Spondylolisthesis with bilateral leg pain',
    quote: '“I could stand straight the very next morning and walked the corridor with the physio.”',
    summary:
      'A 52-year-old operations manager with refractory spondylolisthesis pain underwent single-level TLIF with navigation. She resumed desk work in three weeks and remains symptom-free at 12-month review.',
    recoveryTime: '3 weeks',
    outcomes: ['Oswestry score improved from 58 to 12', 'Fusion confirmed on 6-month CT', 'Returned to work in 3 weeks'],
    tags: ['spine', 'fusion', 'tlif'],
    date: '2024-11-08',
  },
  {
    id: 'epilepsy-003',
    slug: 'temporal-lobe-epilepsy-control',
    title: 'Seizure-Free After Epilepsy Surgery',
    patientInitials: 'A.D.',
    procedure: 'Anterior temporal lobectomy with amygdalohippocampectomy',
    condition: 'Drug-resistant temporal lobe epilepsy',
    quote: '“The team prepared me for every step; I have been seizure-free since the operation.”',
    summary:
      'A 27-year-old software engineer with weekly seizures despite triple therapy underwent comprehensive evaluation followed by resection. He is seizure-free and back to work, tapering medication under supervision.',
    recoveryTime: '6 weeks',
    outcomes: ['ILAE Class I outcome at 9 months', 'No neurocognitive decline on follow-up testing', 'Returned to work in 6 weeks'],
    tags: ['epilepsy', 'brain'],
    date: '2024-08-19',
  },
  {
    id: 'nerve-004',
    slug: 'carpal-tunnel-day-care-success',
    title: 'Grip Strength Back After Carpal Tunnel Release',
    patientInitials: 'N.P.',
    procedure: 'Mini-open carpal tunnel release',
    condition: 'Severe carpal tunnel syndrome with nocturnal numbness',
    quote: '“My splints are finally gone—numbness eased within days.”',
    summary:
      'A 44-year-old designer with severe median nerve compression underwent day-care release. Strength training and ergonomic coaching restored productivity in two weeks.',
    recoveryTime: '2 weeks',
    outcomes: ['Night symptoms resolved', 'Grip strength improved from 16kg to 26kg', 'Back to design work in 14 days'],
    tags: ['peripheral-nerve', 'carpal-tunnel'],
    date: '2025-02-02',
  },
];
