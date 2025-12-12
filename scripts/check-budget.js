#!/usr/bin/env node

/**
 * Performance Budget Checker
 * 
 * Validates build output against performance-budget.json constraints.
 * Exits with error code 1 if budget is exceeded.
 */

const fs = require('fs');
const path = require('path');

const BUDGET_FILE = path.join(process.cwd(), 'performance-budget.json');
const BUILD_MANIFEST = path.join(process.cwd(), '.next', 'build-manifest.json');
const NEXT_DIR = path.join(process.cwd(), '.next');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    const fullPath = path.join(NEXT_DIR, filePath);
    if (fs.existsSync(fullPath)) {
      return fs.statSync(fullPath).size;
    }
    return 0;
  } catch (error) {
    return 0;
  }
}

function getResourceType(filePath) {
  if (filePath.endsWith('.js')) return 'script';
  if (filePath.endsWith('.css')) return 'stylesheet';
  if (/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(filePath)) return 'image';
  if (filePath.endsWith('.woff') || filePath.endsWith('.woff2') || filePath.endsWith('.ttf') || filePath.endsWith('.otf')) return 'font';
  return 'other';
}

function checkPerformanceBudget() {
  // Check if budget file exists
  if (!fs.existsSync(BUDGET_FILE)) {
    console.log('⚠️  No performance-budget.json found, skipping check');
    return true;
  }

  // Check if build manifest exists
  if (!fs.existsSync(BUILD_MANIFEST)) {
    console.error('❌ Build manifest not found. Run "npm run build" first.');
    process.exit(1);
  }

  const budget = JSON.parse(fs.readFileSync(BUDGET_FILE, 'utf8'));
  const buildManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST, 'utf8'));

  // Get budget constraints (using first budget entry for /*)
  const budgetEntry = budget.budget?.[0];
  if (!budgetEntry) {
    console.log('⚠️  No budget constraints found in performance-budget.json');
    return true;
  }

  const resourceSizes = budgetEntry.resourceSizes || [];
  const resourceCounts = budgetEntry.resourceCounts || [];

  // Collect all assets from build manifest
  const assets = {
    script: { size: 0, count: 0, files: [] },
    stylesheet: { size: 0, count: 0, files: [] },
    image: { size: 0, count: 0, files: [] },
    font: { size: 0, count: 0, files: [] },
    other: { size: 0, count: 0, files: [] },
    total: { size: 0, count: 0, files: [] },
  };

  // Process all pages and their assets
  const processedFiles = new Set();
  
  Object.values(buildManifest.pages || {}).forEach(pageAssets => {
    pageAssets.forEach(asset => {
      if (processedFiles.has(asset)) return;
      processedFiles.add(asset);

      const size = getFileSize(asset);
      const type = getResourceType(asset);

      assets[type].size += size;
      assets[type].count += 1;
      assets[type].files.push({ path: asset, size });

      assets.total.size += size;
      assets.total.count += 1;
    });
  });

  // Process root assets (CSS, JS files in root)
  if (buildManifest.rootMainFiles) {
    buildManifest.rootMainFiles.forEach(asset => {
      if (processedFiles.has(asset)) return;
      processedFiles.add(asset);

      const size = getFileSize(asset);
      const type = getResourceType(asset);

      assets[type].size += size;
      assets[type].count += 1;
      assets[type].files.push({ path: asset, size });

      assets.total.size += size;
      assets.total.count += 1;
    });
  }

  // Check resource size budgets
  let hasErrors = false;
  const errors = [];

  resourceSizes.forEach(constraint => {
    const type = constraint.resourceType;
    const budgetBytes = constraint.budget;
    const actual = assets[type] || assets.total;
    const actualSize = type === 'total' ? assets.total.size : actual.size;

    if (actualSize > budgetBytes) {
      hasErrors = true;
      errors.push({
        type,
        actual: formatBytes(actualSize),
        budget: formatBytes(budgetBytes),
        exceeded: formatBytes(actualSize - budgetBytes),
      });
    }
  });

  // Check resource count budgets
  resourceCounts.forEach(constraint => {
    const type = constraint.resourceType;
    const budgetCount = constraint.budget;
    const actual = assets[type] || assets.total;
    const actualCount = type === 'total' ? assets.total.count : actual.count;

    if (actualCount > budgetCount) {
      hasErrors = true;
      errors.push({
        type,
        metric: 'count',
        actual: actualCount,
        budget: budgetCount,
        exceeded: actualCount - budgetCount,
      });
    }
  });

  // Print summary
  console.log('\n📊 Performance Budget Report\n');
  console.log('Resource Sizes:');
  console.log(`  Scripts:     ${formatBytes(assets.script.size)} (${assets.script.count} files)`);
  console.log(`  Stylesheets: ${formatBytes(assets.stylesheet.size)} (${assets.stylesheet.count} files)`);
  console.log(`  Images:      ${formatBytes(assets.image.size)} (${assets.image.count} files)`);
  console.log(`  Fonts:       ${formatBytes(assets.font.size)} (${assets.font.count} files)`);
  console.log(`  Other:       ${formatBytes(assets.other.size)} (${assets.other.count} files)`);
  console.log(`  Total:       ${formatBytes(assets.total.size)} (${assets.total.count} files)`);

  // Print budget constraints
  console.log('\n📋 Budget Constraints:');
  resourceSizes.forEach(constraint => {
    const type = constraint.resourceType;
    const budgetBytes = constraint.budget;
    const actual = assets[type] || assets.total;
    const actualSize = type === 'total' ? assets.total.size : actual.size;
    const status = actualSize <= budgetBytes ? '✅' : '❌';
    console.log(`  ${status} ${type}: ${formatBytes(actualSize)} / ${formatBytes(budgetBytes)}`);
  });

  resourceCounts.forEach(constraint => {
    const type = constraint.resourceType;
    const budgetCount = constraint.budget;
    const actual = assets[type] || assets.total;
    const actualCount = type === 'total' ? assets.total.count : actual.count;
    const status = actualCount <= budgetCount ? '✅' : '❌';
    console.log(`  ${status} ${type} count: ${actualCount} / ${budgetCount}`);
  });

  // Print errors if any
  if (hasErrors) {
    console.log('\n❌ Performance Budget Violations:\n');
    errors.forEach(error => {
      if (error.metric === 'count') {
        console.log(`  ${error.type} count: ${error.actual} > ${error.budget} (exceeded by ${error.exceeded})`);
      } else {
        console.log(`  ${error.type} size: ${error.actual} > ${error.budget} (exceeded by ${error.exceeded})`);
      }
    });
    console.log('\n');
    return false;
  }

  console.log('\n✅ All performance budget constraints met!\n');
  return true;
}

// Run the check
const passed = checkPerformanceBudget();
process.exit(passed ? 0 : 1);

















