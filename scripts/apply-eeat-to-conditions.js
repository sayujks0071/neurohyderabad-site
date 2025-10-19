#!/usr/bin/env node

/**
 * Script to apply E-E-A-T components to all condition pages
 */

const fs = require('fs');
const path = require('path');

const CONDITION_PAGES = [
  'sciatica-treatment-hyderabad',
  'slip-disc-treatment-hyderabad', 
  'spinal-stenosis-treatment-hyderabad',
  'trigeminal-neuralgia-treatment-hyderabad'
];

const IMPORTS_TO_ADD = [
  "import AuthorByline from '@/app/_components/AuthorByline';",
  "import SourceList from '@/app/_components/SourceList';",
  "import ReviewedBy from '@/app/_components/ReviewedBy';",
  "import { sources } from '../../blog/sources';"
];

const E_E_A_T_COMPONENTS = `
      <AuthorByline 
        publishedOn="2025-02-15"
        updatedOn="2025-10-19"
      />
      
      <SourceList sources={sources['${'${slug}'}'] || []} />
      
      <ReviewedBy />`;

function updateConditionPage(slug) {
  const filePath = path.join('app/conditions', slug, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already has E-E-A-T components
  if (content.includes('AuthorByline') && content.includes('SourceList')) {
    console.log(`✅ ${slug} already has E-E-A-T components`);
    return true;
  }

  // Add imports if not present
  IMPORTS_TO_ADD.forEach(importLine => {
    if (!content.includes(importLine)) {
      // Find the last import statement
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex) + '\n' + importLine + content.slice(nextLineIndex);
      }
    }
  });

  // Add E-E-A-T components before closing main tag
  const componentsToAdd = E_E_A_T_COMPONENTS.replace('${slug}', slug);
  
  // Find the closing main tag and insert before it
  const mainCloseIndex = content.lastIndexOf('</main>');
  if (mainCloseIndex !== -1) {
    content = content.slice(0, mainCloseIndex) + componentsToAdd + '\n' + content.slice(mainCloseIndex);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${slug} with E-E-A-T components`);
    return true;
  } else {
    console.log(`❌ Could not find closing main tag for ${slug}`);
    return false;
  }
}

function main() {
  console.log('🚀 Applying E-E-A-T components to condition pages...\n');
  
  let successCount = 0;
  let totalCount = CONDITION_PAGES.length;

  CONDITION_PAGES.forEach(slug => {
    if (updateConditionPage(slug)) {
      successCount++;
    }
  });

  console.log(`\n📊 Results: ${successCount}/${totalCount} condition pages updated successfully`);
  
  if (successCount === totalCount) {
    console.log('🎉 All condition pages now have E-E-A-T components!');
  } else {
    console.log('⚠️  Some condition pages may need manual review');
  }
}

if (require.main === module) {
  main();
}

module.exports = { updateConditionPage, CONDITION_PAGES };
