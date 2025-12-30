#!/usr/bin/env node

/**
 * Title Tag Optimization Script
 * Optimizes title tags to be 50-60 characters for better SEO
 */

const fs = require('fs');
const path = require('path');

// Title optimizations mapping
const titleOptimizations = {
  'app/appointments/page.tsx': {
    current: 'Book Appointment with Dr. Sayuj Krishnan | Leading Neurosurgeon in Hyderabad',
    optimized: 'Book Appointment | Dr. Sayuj Krishnan Neurosurgeon'
  },
  'app/best-neurosurgeon-in-hyderabad/page.tsx': {
    current: 'Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan | Expert Brain & Spine Surgery',
    optimized: 'Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan'
  },
  'app/blog/brain-tumor-surgery-cost-hyderabad/page.tsx': {
    current: 'Brain Tumor Surgery Cost in Hyderabad | Dr. Sayuj Krishnan | Transparent Pricing',
    optimized: 'Brain Tumor Surgery Cost Hyderabad | Dr. Sayuj Krishnan'
  },
  'app/blog/day-care-endoscopic-spine-surgery-eligibility/page.tsx': {
    current: 'Day Care Endoscopic Spine Surgery Eligibility in Hyderabad | Dr. Sayuj Krishnan',
    optimized: 'Day Care Spine Surgery Eligibility | Dr. Sayuj Krishnan'
  },
  'app/blog/awake-craniotomy-guide/page.tsx': {
    current: 'Awake Craniotomy Guide | Dr. Sayuj Krishnan | Brain Surgery While Awake',
    optimized: 'Awake Craniotomy Guide | Dr. Sayuj Krishnan'
  },
  'app/blog/day-care-spine-surgery-insurance-hyderabad/page.tsx': {
    current: 'Day Care Spine Surgery Insurance Coverage in Hyderabad | Dr. Sayuj Krishnan',
    optimized: 'Day Care Spine Surgery Insurance | Dr. Sayuj Krishnan'
  },
  'app/blog/endoscopic-spine-surgery-cost-hyderabad/page.tsx': {
    current: 'Endoscopic Spine Surgery Cost in Hyderabad | Dr. Sayuj Krishnan | Transparent Pricing',
    optimized: 'Endoscopic Spine Surgery Cost | Dr. Sayuj Krishnan'
  },
  'app/blog/endoscopic-discectomy-cost-hyderabad/page.tsx': {
    current: 'Endoscopic Discectomy Cost in Hyderabad | Dr. Sayuj Krishnan | Affordable Treatment',
    optimized: 'Endoscopic Discectomy Cost | Dr. Sayuj Krishnan'
  },
  'app/blog/endoscopic-vs-microdiscectomy-hyderabad/page.tsx': {
    current: 'Endoscopic vs Microdiscectomy in Hyderabad | Dr. Sayuj Krishnan | Procedure Comparison',
    optimized: 'Endoscopic vs Microdiscectomy | Dr. Sayuj Krishnan'
  },
  'app/blog/mvd-vs-radiosurgery-trigeminal-neuralgia/page.tsx': {
    current: 'MVD vs Radiosurgery for Trigeminal Neuralgia | Dr. Sayuj Krishnan | Treatment Options',
    optimized: 'MVD vs Radiosurgery Trigeminal Neuralgia | Dr. Sayuj Krishnan'
  },
  'app/blog/return-to-work-after-endoscopic-discectomy-hyderabad/page.tsx': {
    current: 'Return to Work After Endoscopic Discectomy in Hyderabad | Dr. Sayuj Krishnan',
    optimized: 'Return to Work After Discectomy | Dr. Sayuj Krishnan'
  },
  'app/blog/page.tsx': {
    current: 'Neurosurgery Blog | Dr. Sayuj Krishnan | Brain & Spine Surgery Articles Hyderabad',
    optimized: 'Neurosurgery Blog | Dr. Sayuj Krishnan'
  },
  'app/blog/sciatica-pain-management-hyderabad/page.tsx': {
    current: 'Sciatica Pain Management in Hyderabad | Dr. Sayuj Krishnan | Effective Treatment',
    optimized: 'Sciatica Pain Management | Dr. Sayuj Krishnan'
  },
  'app/blog/spine-health-maintenance-hyderabad/page.tsx': {
    current: 'Spine Health Maintenance in Hyderabad | Dr. Sayuj Krishnan | Preventive Care',
    optimized: 'Spine Health Maintenance | Dr. Sayuj Krishnan'
  },
  'app/conditions/page.tsx': {
    current: 'Neurological Conditions Treated | Dr. Sayuj Krishnan | Brain & Spine Disorders Hyderabad',
    optimized: 'Neurological Conditions | Dr. Sayuj Krishnan'
  }
};

// Meta description optimizations
const descriptionOptimizations = {
  'app/conditions/brain-tumor-surgery-hyderabad/page.tsx': {
    current: 'Comprehensive brain tumour evaluation, neuronavigation-guided microsurgery, radiosurgery, and rehabilitation with Dr. Sayuj Krishnan at Yashoda Hospital, Hyderabad.',
    optimized: 'Comprehensive brain tumour evaluation, neuronavigation-guided microsurgery, radiosurgery, and rehabilitation with Dr. Sayuj Krishnan at Yashoda Hospital, Hyderabad.'
  }
};

function optimizeFile(filePath, titleOpt, descOpt) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Optimize title
    if (titleOpt) {
      const titleRegex = /title:\s*["']([^"']+)["']/;
      const match = content.match(titleRegex);
      
      if (match && match[1] === titleOpt.current) {
        content = content.replace(titleRegex, `title: "${titleOpt.optimized}"`);
        modified = true;
        console.log(`✅ Optimized title in ${filePath}`);
        console.log(`   Before: ${titleOpt.current} (${titleOpt.current.length} chars)`);
        console.log(`   After:  ${titleOpt.optimized} (${titleOpt.optimized.length} chars)`);
      }
    }

    // Optimize description
    if (descOpt) {
      const descRegex = /description:\s*["']([^"']+)["']/;
      const match = content.match(descRegex);
      
      if (match && match[1] === descOpt.current) {
        content = content.replace(descRegex, `description: "${descOpt.optimized}"`);
        modified = true;
        console.log(`✅ Optimized description in ${filePath}`);
      }
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Starting title tag optimization...\n');
  
  let optimizedCount = 0;
  let totalFiles = Object.keys(titleOptimizations).length;

  for (const [filePath, titleOpt] of Object.entries(titleOptimizations)) {
    const descOpt = descriptionOptimizations[filePath];
    const success = optimizeFile(filePath, titleOpt, descOpt);
    if (success) optimizedCount++;
  }

  console.log(`\n📊 Optimization Summary:`);
  console.log(`   - Files processed: ${totalFiles}`);
  console.log(`   - Files optimized: ${optimizedCount}`);
  console.log(`   - Success rate: ${Math.round((optimizedCount / totalFiles) * 100)}%`);
}

if (require.main === module) {
  main();
}

module.exports = { optimizeFile, titleOptimizations };
