export interface MediaPublication {
  id: string;
  title: string;
  publication: string;
  url: string;
  date: string;
  type: 'article' | 'interview' | 'expert-column' | 'media-report';
  description: string;
  author?: string;
  featured?: boolean;
}

export const mediaPublications: MediaPublication[] = [
  {
    id: 'socialpost-health-2025-11',
    title: 'What causes Neurological Disorders | Spine Health | Brain Health',
    publication: 'Socialpost Health Podcast',
    url: 'https://www.youtube.com/watch?v=N6_M_nZ0Zs8',
    date: '2025-11-25',
    type: 'interview',
    description: 'Dr. Sayuj Krishnan discusses the causes of neurological disorders, spine health, and brain health in this comprehensive podcast interview, sharing expert insights on prevention, diagnosis, and treatment.',
    featured: true
  },
  {
    id: 'nie-2024-02',
    title: 'Minimally Invasive Spine Surgery is Empowering Aging Indians',
    publication: 'The New Indian Express',
    url: 'https://www.newindianexpress.com/xplore/2024/Feb/06/minimally-invasive-spine-surgery-is-empowering-aging-indians',
    date: '2024-02-06',
    type: 'article',
    description: 'Dr. Sayuj Krishnan discusses how full endoscopic spine surgery is revolutionizing treatment for elderly patients, enabling faster recovery and better outcomes.',
    author: 'Dr. Sayuj Krishnan',
    featured: true
  },
  {
    id: 'apn-2024',
    title: 'Prompt Intervention of Experts at Apollo Adlux Hospital Saves 63-Year-Old Man with Severe Spinal Cord Injury',
    publication: 'APN News',
    url: 'https://www.apnnews.com/prompt-intervention-of-experts-at-apollo-adlux-hospital-saves-63-year-old-man-with-severe-spinal-cord-injury/',
    date: '2024-01-15',
    type: 'media-report',
    description: 'Media coverage of Dr. Sayuj Krishnan and team successfully treating a complex spinal cord injury case, highlighting advanced surgical techniques and patient outcomes.',
    featured: true
  },
  {
    id: 'thip-2024',
    title: 'Healthy Spine: Healthy Aging',
    publication: 'The Healthy India Project',
    url: 'https://www.thip.media/expert-columns/healthy-spine-healthy-aging/126984/',
    date: '2024-03-10',
    type: 'expert-column',
    description: 'Expert column by Dr. Sayuj Krishnan on maintaining spinal health as we age, covering prevention strategies and treatment options for elderly patients.',
    author: 'Dr. Sayuj Krishnan',
    featured: true
  },
  {
    id: 'hcr-2024',
    title: 'Could Keyhole Spine Surgery be Safer for the Elderly?',
    publication: 'Healthcare Radius',
    url: 'https://www.healthcareradius.in/features/surgery/keyhole-spine-surgery',
    date: '2024-04-20',
    type: 'article',
    description: 'Analysis of keyhole (endoscopic) spine surgery benefits for elderly patients, featuring insights from Dr. Sayuj Krishnan on safety and efficacy.',
    featured: false
  }
];
