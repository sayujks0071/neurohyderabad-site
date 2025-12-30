/**
 * Comprehensive Backlink Strategy and Outreach Templates
 * For building high-quality, relevant backlinks
 */

export const backlinkSources = {
  // Tier 1: High Authority Medical Sites
  tier1: {
    medicalDirectories: [
      {
        site: 'Practo',
        url: 'https://www.practo.com',
        da: 72,
        strategy: 'Complete profile with all services, photos, and patient reviews',
        priority: 'HIGH'
      },
      {
        site: 'Justdial',
        url: 'https://www.justdial.com',
        da: 68,
        strategy: 'Claim business listing with complete information',
        priority: 'HIGH'
      },
      {
        site: 'Lybrate',
        url: 'https://www.lybrate.com',
        da: 65,
        strategy: 'Create doctor profile and answer health queries',
        priority: 'HIGH'
      },
      {
        site: 'Credihealth',
        url: 'https://www.credihealth.com',
        da: 58,
        strategy: 'List practice and provide treatment information',
        priority: 'MEDIUM'
      },
      {
        site: 'Medifee',
        url: 'https://www.medifee.com',
        da: 45,
        strategy: 'Create detailed profile with treatment costs',
        priority: 'MEDIUM'
      }
    ],
    
    hospitalNetworks: [
      {
        site: 'Yashoda Hospitals',
        url: 'https://www.yashodahospitals.com',
        da: 52,
        strategy: 'Ensure doctor profile is complete and linked',
        priority: 'HIGH'
      }
    ],
    
    medicalAssociations: [
      {
        site: 'Neurological Society of India',
        url: 'https://www.neurosocietyindia.org',
        da: 45,
        strategy: 'Member directory listing with profile',
        priority: 'HIGH'
      },
      {
        site: 'Indian Spine Society',
        url: 'https://www.indianspinesociety.com',
        da: 38,
        strategy: 'Member profile and conference participation',
        priority: 'MEDIUM'
      }
    ]
  },
  
  // Tier 2: Local Business Directories
  tier2: {
    localDirectories: [
      {
        site: 'Google My Business',
        url: 'https://business.google.com',
        da: 100,
        strategy: 'Complete profile with posts, Q&A, and reviews',
        priority: 'CRITICAL'
      },
      {
        site: 'Bing Places',
        url: 'https://www.bingplaces.com',
        da: 95,
        strategy: 'Claim and optimize business listing',
        priority: 'HIGH'
      },
      {
        site: 'IndiaMART',
        url: 'https://www.indiamart.com',
        da: 72,
        strategy: 'Create service provider profile',
        priority: 'MEDIUM'
      },
      {
        site: 'Sulekha',
        url: 'https://www.sulekha.com',
        da: 65,
        strategy: 'List medical services with location',
        priority: 'MEDIUM'
      }
    ],
    
    reviewPlatforms: [
      {
        site: 'Trustpilot',
        url: 'https://www.trustpilot.com',
        da: 94,
        strategy: 'Claim business and encourage reviews',
        priority: 'MEDIUM'
      },
      {
        site: 'Facebook',
        url: 'https://www.facebook.com',
        da: 96,
        strategy: 'Business page with regular updates and reviews',
        priority: 'HIGH'
      }
    ]
  },
  
  // Tier 3: Content Marketing & Guest Posts
  tier3: {
    healthBlogs: [
      {
        site: 'HealthifyMe Blog',
        topic: 'Spine Health and Posture',
        strategy: 'Guest post on preventive spine care',
        priority: 'MEDIUM'
      },
      {
        site: 'The Health Site',
        topic: 'Latest in Neurosurgery',
        strategy: 'Expert articles on minimally invasive surgery',
        priority: 'MEDIUM'
      }
    ],
    
    localMedia: [
      {
        outlet: 'The Hindu - Hyderabad',
        strategy: 'Health column or expert interviews',
        priority: 'HIGH'
      },
      {
        outlet: 'Deccan Chronicle',
        strategy: 'Medical breakthrough stories',
        priority: 'MEDIUM'
      },
      {
        outlet: 'Times of India - Hyderabad',
        strategy: 'Health awareness articles',
        priority: 'HIGH'
      }
    ],
    
    podcasts: [
      {
        name: 'Indian Health Podcast',
        topic: 'Advances in Spine Surgery',
        strategy: 'Expert interview on endoscopic procedures',
        priority: 'LOW'
      }
    ]
  }
};

// Outreach Email Templates
export const outreachTemplates = {
  guestPost: {
    subject: 'Expert Medical Content Contribution - Neurosurgery Insights',
    template: `Dear [Editor Name],

I'm Dr. Sayuj Krishnan, a German-trained neurosurgeon practicing at Yashoda Hospital, Hyderabad. With over 1000+ successful endoscopic spine surgeries, I specialize in minimally invasive procedures.

I'd like to contribute expert articles to [Website Name] on topics such as:
- "When Is Spine Surgery Really Necessary? A Neurosurgeon's Guide"
- "The Revolution of Endoscopic Spine Surgery: Same-Day Discharge Reality"
- "Understanding Brain Tumors: Early Signs and Modern Treatment Options"

These articles would provide valuable, medically-accurate information to your readers while addressing common concerns about neurological conditions.

I can provide:
- Original, researched content (1500-2000 words)
- Medical illustrations and infographics
- Patient case studies (anonymized)
- Latest treatment guidelines

Would you be interested in featuring expert medical content from a practicing neurosurgeon?

Best regards,
Dr. Sayuj Krishnan S
MCh (Neurosurgery), FEBNS
Senior Consultant Neurosurgeon
Yashoda Hospital, Malakpet
www.drsayuj.info`
  },
  
  localPartnership: {
    subject: 'Healthcare Partnership Opportunity - Neurosurgery Services',
    template: `Dear [Organization Name],

I'm reaching out to explore a potential healthcare partnership between [Organization] and our neurosurgery practice.

We offer:
- Free spine health screening camps for your members/employees
- Educational seminars on preventing back pain
- Priority appointments for referrals
- Special consultation packages

Our expertise includes:
- Minimally invasive spine surgery (same-day discharge)
- Brain tumor surgery
- Treatment for chronic back pain
- German-trained surgical techniques

We've successfully conducted health camps for various organizations in Hyderabad and would be honored to extend our services to your community.

Could we schedule a brief discussion about how we can support your organization's health initiatives?

Regards,
Dr. Sayuj Krishnan
www.drsayuj.info
+91 97782 80044`
  },
  
  medicalDirectory: {
    subject: 'Profile Update - Dr. Sayuj Krishnan, Neurosurgeon',
    template: `Dear [Directory Name] Team,

I'd like to update/claim my professional profile on your platform.

Profile Information:
- Name: Dr. Sayuj Krishnan S
- Specialization: Neurosurgery (Brain & Spine)
- Qualifications: MCh (Neurosurgery), FEBNS, German Fellowship
- Hospital: Yashoda Hospital, Malakpet, Hyderabad
- Experience: 10+ years, 1000+ endoscopic surgeries
- Website: www.drsayuj.info

Unique Expertise:
- Endoscopic spine surgery with same-day discharge
- Awake spine surgery under local anesthesia
- German-trained in minimally invasive techniques
- Brain tumor surgery with neuronavigation

Please let me know if you need any additional information or verification documents.

Thank you,
Dr. Sayuj Krishnan`
  },
  
  testimonialRequest: {
    subject: 'Share Your Recovery Story - Help Others on Their Journey',
    template: `Dear [Patient Name],

I hope this message finds you in good health and fully recovered.

As you've experienced the benefits of minimally invasive surgery firsthand, your story could inspire and reassure others facing similar conditions.

Would you be willing to:
- Share a brief testimonial about your experience?
- Allow us to feature your recovery story (anonymously if preferred)?
- Leave a review on Google/Practo to help others find quality care?

Your journey from diagnosis through recovery could provide hope to patients currently dealing with similar challenges.

If you're comfortable sharing, please reply to this email or leave a review at:
[Google Review Link]
[Practo Review Link]

Thank you for trusting us with your care.

Warm regards,
Dr. Sayuj Krishnan`
  }
};

// Link Building Action Plan
export const linkBuildingPlan = {
  month1: [
    'Claim and optimize Google My Business',
    'Complete Practo and Justdial profiles',
    'Submit to 10 local business directories',
    'Create profiles on medical association sites',
    'Request testimonials from recent patients'
  ],
  
  month2: [
    'Reach out to 5 health blogs for guest posts',
    'Contact local media for health columns',
    'Partner with 2 local organizations for health camps',
    'Create shareable infographics on spine health',
    'Submit to medical directories (Lybrate, Credihealth)'
  ],
  
  month3: [
    'Develop link-worthy research content',
    'Collaborate with other specialists for cross-referrals',
    'Participate in medical conferences (get listed)',
    'Create video content for YouTube (with backlinks)',
    'Implement patient referral program'
  ],
  
  ongoing: [
    'Weekly Google My Business posts',
    'Monthly blog posts targeting link-worthy topics',
    'Quarterly health camps with media coverage',
    'Regular social media engagement',
    'Continuous review generation'
  ]
};

// Anchor Text Strategy
export const anchorTextStrategy = {
  branded: [
    'Dr. Sayuj Krishnan',
    'Dr. Sayuj Krishnan Hyderabad',
    'www.drsayuj.info'
  ],
  
  exact: [
    'neurosurgeon in Hyderabad',
    'best spine surgeon Hyderabad',
    'endoscopic spine surgery Hyderabad'
  ],
  
  partial: [
    'experienced neurosurgeon in Hyderabad',
    'leading spine surgeon',
    'expert in endoscopic surgery'
  ],
  
  generic: [
    'click here',
    'learn more',
    'visit website',
    'read more'
  ],
  
  naked: [
    'https://www.drsayuj.info',
    'www.drsayuj.info'
  ],
  
  distribution: {
    branded: '40%',
    exact: '20%',
    partial: '20%',
    generic: '10%',
    naked: '10%'
  }
};
