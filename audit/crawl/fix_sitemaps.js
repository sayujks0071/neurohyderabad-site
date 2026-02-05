const fs = require('fs');
const path = require('path');

const errors = [
  "/conditions/brachial-plexus-injury-hyderabad",
  "/conditions/chronic-back-pain-treatment-hyderabad",
  "/conditions/cubital-tunnel-syndrome-hyderabad",
  "/conditions/degenerative-disc-disease-hyderabad",
  "/conditions/epilepsy-surgery-candidate-hyderabad",
  "/conditions/facet-joint-syndrome-hyderabad",
  "/conditions/facial-nerve-palsy-hyderabad",
  "/conditions/failed-back-surgery-syndrome-hyderabad",
  "/conditions/glioma-treatment-hyderabad",
  "/conditions/hydrocephalus-treatment-hyderabad",
  "/conditions/kyphosis-treatment-hyderabad",
  "/conditions/meningioma-treatment-hyderabad",
  "/conditions/neck-pain-treatment-hyderabad",
  "/conditions/neuropathic-pain-treatment-hyderabad",
  "/conditions/peripheral-neuropathy-hyderabad",
  "/conditions/radicular-pain-treatment-hyderabad",
  "/conditions/spine-tumor-treatment-hyderabad",
  "/services/acoustic-neuroma-surgery-hyderabad",
  "/services/awake-craniotomy-hyderabad",
  "/services/brachial-plexus-surgery-hyderabad",
  "/services/brain-aneurysm-surgery-hyderabad",
  "/services/brain-surgery-cost-hyderabad",
  "/services/carpal-tunnel-surgery-hyderabad",
  "/services/cervical-spine-surgery-hyderabad",
  "/services/deep-brain-stimulation-hyderabad",
  "/services/disc-replacement-surgery-hyderabad",
  "/services/emergency-neurosurgery-hyderabad",
  "/services/endoscopic-surgery-cost-calculator",
  "/services/hydrocephalus-treatment-hyderabad",
  "/services/laser-spine-surgery-hyderabad",
  "/services/lumbar-spine-surgery-hyderabad",
  "/services/microscopic-spine-surgery-hyderabad",
  "/services/navigation-guided-surgery-hyderabad",
  "/services/nerve-decompression-surgery-hyderabad",
  "/services/pituitary-tumor-surgery-hyderabad",
  "/services/scoliosis-surgery-hyderabad",
  "/services/spinal-decompression-hyderabad",
  "/services/spine-fracture-surgery-hyderabad",
  "/services/trauma-neurosurgery-hyderabad",
  "/services/trigeminal-neuralgia-surgery-hyderabad",
  "/symptoms/back-pain-red-flags",
  "/symptoms/numbness-tingling-hands-feet",
  "/symptoms/severe-headache-warning-signs",
  "/symptoms/when-to-see-neurosurgeon"
];

const files = [
  'app/sitemap-services.ts',
  'app/sitemap-conditions.ts',
  'app/sitemap.ts'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalLines = content.split('\n').length;

  errors.forEach(url => {
    // Regex to match lines containing the URL inside quote
    // e.g. { url: '/conditions/brachial-plexus-injury-hyderabad', ... },
    // or string in array
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^.*${escapedUrl}.*$`, 'gm');
    content = content.replace(regex, '');
  });

  // Clean up empty lines
  content = content.replace(/^\s*[\r\n]/gm, '');

  fs.writeFileSync(filePath, content);
  const newLines = content.split('\n').length;
  console.log(`Processed ${file}: Removed ${originalLines - newLines} lines.`);
});
