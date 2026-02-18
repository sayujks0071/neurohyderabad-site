export const NETWORK_POLICIES = {
  PDF_EXTRACTION: {
    deny: ['0.0.0.0/0'],
    allow: [
      'registry.npmjs.org',
      '*.npmjs.org',
      'registry.yarnpkg.com', // Often useful fallback
    ],
  },
  ADMIN_JOB: {
    deny: ['0.0.0.0/0'],
    allow: [
      'registry.npmjs.org',
      '*.npmjs.org',
      'generativelanguage.googleapis.com',
      '*.googleapis.com',
      'api.drsayuj.com',
      'github.com', // Needed for git clone if not using token
      '*.github.com',
    ],
  },
  DICOM_EXTRACTION: {
    deny: ['0.0.0.0/0'],
    allow: [
      'registry.npmjs.org',
      '*.npmjs.org',
      'registry.yarnpkg.com',
    ],
  },
};
