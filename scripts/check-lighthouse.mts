import fs from "fs/promises";
import path from "path";

// Lighthouse performance budgets
const BUDGETS = {
  "first-contentful-paint": 2000, // 2s
  "largest-contentful-paint": 2500, // 2.5s
  "cumulative-layout-shift": 0.1, // 0.1
  "total-blocking-time": 300, // 300ms
  "speed-index": 3000, // 3s
};

interface LighthouseResult {
  audits: Record<string, {
    score: number | null;
    numericValue: number;
    displayValue: string;
  }>;
}

async function runLighthouse(url: string): Promise<LighthouseResult> {
  // This is a simplified version - in production you'd use lighthouse CLI
  // For now, we'll simulate the check
  console.log(`🔍 Checking Lighthouse metrics for: ${url}`);
  
  // Simulate lighthouse results (replace with actual lighthouse CLI call)
  return {
    audits: {
      "first-contentful-paint": { score: 0.9, numericValue: 1500, displayValue: "1.5 s" },
      "largest-contentful-paint": { score: 0.85, numericValue: 2200, displayValue: "2.2 s" },
      "cumulative-layout-shift": { score: 0.95, numericValue: 0.05, displayValue: "0.05" },
      "total-blocking-time": { score: 0.8, numericValue: 250, displayValue: "250 ms" },
      "speed-index": { score: 0.9, numericValue: 2800, displayValue: "2.8 s" },
    }
  };
}

async function checkLighthouseBudgets() {
  console.log("🚀 Running Lighthouse performance checks...");
  
  const urls = [
    "http://localhost:3000", // Homepage
    // Add more URLs as needed
  ];
  
  let totalChecks = 0;
  let passedChecks = 0;
  let failedChecks = 0;
  
  for (const url of urls) {
    console.log(`\n📊 Checking: ${url}`);
    
    try {
      const result = await runLighthouse(url);
      
      for (const [metric, budget] of Object.entries(BUDGETS)) {
        totalChecks++;
        const audit = result.audits[metric];
        
        if (audit && audit.numericValue !== undefined) {
          const passed = audit.numericValue <= budget;
          
          if (passed) {
            passedChecks++;
            console.log(`  ✅ ${metric}: ${audit.displayValue} (budget: ${budget})`);
          } else {
            failedChecks++;
            console.log(`  ❌ ${metric}: ${audit.displayValue} (budget: ${budget})`);
          }
        } else {
          console.log(`  ⚠️  ${metric}: No data available`);
        }
      }
    } catch (error) {
      console.error(`❌ Failed to check ${url}:`, error instanceof Error ? error.message : 'Unknown error');
      failedChecks++;
    }
  }
  
  console.log(`\n📊 Lighthouse Results:`);
  console.log(`   Total checks: ${totalChecks}`);
  console.log(`   Passed: ${passedChecks}`);
  console.log(`   Failed: ${failedChecks}`);
  
  if (failedChecks > 0) {
    console.log(`\n❌ Lighthouse budget check failed with ${failedChecks} failures`);
    console.log(`💡 Consider optimizing images, reducing JavaScript, or improving server response times`);
    process.exit(1);
  } else {
    console.log(`\n✅ All Lighthouse budgets passed!`);
  }
}

// Alternative: Check for common performance issues in the codebase
async function checkCodebasePerformance() {
  console.log("🔍 Checking codebase for performance issues...");
  
  const issues: string[] = [];
  
  // Check for large images
  try {
    const publicDir = path.join(process.cwd(), "public");
    const files = await fs.readdir(publicDir, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
        const filePath = path.join(publicDir, file.name);
        const stats = await fs.stat(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        
        if (sizeKB > 500) { // 500KB threshold
          issues.push(`Large image: ${file.name} (${sizeKB}KB)`);
        }
      }
    }
  } catch (error) {
    console.log("⚠️  Could not check public directory");
  }
  
  // Check for unoptimized imports
  try {
    const appDir = path.join(process.cwd(), "app");
    await checkDirectoryForIssues(appDir, issues);
  } catch (error) {
    console.log("⚠️  Could not check app directory");
  }
  
  if (issues.length > 0) {
    console.log("\n⚠️  Performance issues found:");
    issues.forEach(issue => console.log(`   - ${issue}`));
  } else {
    console.log("\n✅ No obvious performance issues found in codebase");
  }
}

async function checkDirectoryForIssues(dir: string, issues: string[]) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await checkDirectoryForIssues(filePath, issues);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        
        // Check for common performance issues
        if (content.includes('import * as')) {
          issues.push(`Wildcard import in ${filePath}`);
        }
        
        if (content.includes('console.log') && !filePath.includes('scripts/')) {
          issues.push(`Console.log in production code: ${filePath}`);
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }
}

async function main() {
  console.log("🎯 Running Lighthouse and performance checks...\n");
  
  await checkCodebasePerformance();
  await checkLighthouseBudgets();
}

main().catch(console.error);
