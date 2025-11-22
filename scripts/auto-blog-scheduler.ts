#!/usr/bin/env ts-node

/**
 * Auto Blog Scheduler
 * 
 * Generates and publishes blog posts automatically based on a schedule
 * Can be run manually or via cron
 * 
 * Usage:
 *   ts-node scripts/auto-blog-scheduler.ts
 *   ts-node scripts/auto-blog-scheduler.ts --generate-today (generate posts for today)
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

import { BlogTopic } from './ai-blog-prompts';
import { validateGeneratedArticle } from '../src/lib/blog-validation';

interface ScheduledBlogTopic extends BlogTopic {
  scheduledDate: string; // YYYY-MM-DD
  useAI?: boolean;
}

// Pre-defined blog topics for automatic generation
// Curated for neurosurgery/spine surgery public awareness in Hyderabad
const BLOG_TOPICS: ScheduledBlogTopic[] = [
  {
    id: "full-endoscopic-lumbar-discectomy-2025",
    title: "Full-Endoscopic Spine Surgery: How Modern Techniques Reduce Recovery Time",
    category: "spine",
    primaryKeyword: "full endoscopic spine surgery in Hyderabad",
    targetLocations: ["Hyderabad", "Malakpet", "Dilsukhnagar"],
    focus:
      "Explain in simple language how full-endoscopic lumbar discectomy and other full-endoscopic techniques work, what has changed in recent years, and why many patients can now go home the same day. Emphasise small incisions, less muscle damage, and faster mobility, but also explain limitations and who may still need traditional surgery.",
    riskLevel: "low",
    scheduledDate: "2024-11-25",
    useAI: true,
  },
  {
    id: "day-care-spine-surgery-awareness-2025",
    title: "Day-Care Spine Surgery: Who Can Safely Go Home the Same Day?",
    category: "spine",
    primaryKeyword: "day care spine surgery in Hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Public awareness article on day-care spine surgery. Explain what 'day-care' means in practical terms, how anaesthesia, pain control, and minimally invasive techniques make it possible, and which patients are usually selected. Emphasise strict selection criteria, safety checks, and when an overnight stay is still better.",
    riskLevel: "low",
    scheduledDate: "2024-11-26",
    useAI: true,
  },
  {
    id: "red-flag-back-pain-2025",
    title: "Back Pain Warning Signs You Should Never Ignore",
    category: "spine",
    primaryKeyword: "back pain specialist in Hyderabad",
    targetLocations: ["Hyderabad", "Kachiguda", "Dilsukhnagar"],
    focus:
      "Public awareness on red-flag back pain symptoms: new or worsening leg weakness, loss of bladder or bowel control, fever with back pain, history of cancer, major trauma. Explain in plain language why these symptoms need urgent evaluation and how early diagnosis can prevent permanent damage.",
    riskLevel: "low",
    scheduledDate: "2024-11-27",
    useAI: true,
  },
  {
    id: "minimally-invasive-spine-stabilisation-2025",
    title: "Minimally Invasive Spine Stabilisation: Smaller Cuts, Strong Fixation",
    category: "spine",
    primaryKeyword: "minimally invasive spine surgery in Hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Explain how percutaneous screws, tubular retractors, and navigation have changed spine stabilisation surgery. Focus on what has actually improved for patients (less blood loss, smaller incision, faster mobilisation) and why the decision to stabilise is still a serious one requiring careful imaging and planning.",
    riskLevel: "medium",
    scheduledDate: "2024-11-28",
    useAI: true,
  },
  {
    id: "awake-craniotomy-awareness-2025",
    title: "Awake Brain Surgery: Why Neurosurgeons Sometimes Keep You Awake",
    category: "brain",
    primaryKeyword: "awake brain surgery in Hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Public explainer on awake craniotomy for brain tumours and epilepsy. Describe, in non-scary language, how modern monitoring, mapping, and anaesthesia make it possible to keep a patient comfortable while testing speech or movement during surgery. Focus on safety, Team preparation, and how this approach protects critical brain functions.",
    riskLevel: "medium",
    scheduledDate: "2024-11-29",
    useAI: true,
  },
  {
    id: "brain-tumour-surgery-navigation-2025",
    title: "How Navigation and Monitoring Have Changed Brain Tumour Surgery",
    category: "brain",
    primaryKeyword: "brain tumour surgery in Hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Explain modern tools like neuronavigation, intraoperative monitoring, and better imaging. Focus on how these help surgeons plan safer approaches, remove more tumour when possible, and protect important areas. Avoid technical device names; keep it conceptual and patient-friendly.",
    riskLevel: "medium",
    scheduledDate: "2024-12-02",
    useAI: true,
  },
  {
    id: "sciatica-explained-2025",
    title: "Sciatica Explained: Modern Treatment Options and When Surgery Is Needed",
    category: "spine",
    primaryKeyword: "sciatica treatment hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Comprehensive guide to sciatica for the public. Explain what sciatica is, common causes like slipped disc, when it improves with rest and physiotherapy, and when modern minimally invasive or full-endoscopic surgery may be discussed. Emphasise that not every sciatica case needs surgery.",
    riskLevel: "low",
    scheduledDate: "2024-12-03",
    useAI: true,
  },
  {
    id: "neck-pain-arm-numbness-2025",
    title: "Neck Pain and Arm Numbness: When Cervical Spine Needs Attention",
    category: "spine",
    primaryKeyword: "cervical spine specialist in Hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Public awareness on cervical disc problems and cervical myelopathy. Describe warning signs like hand clumsiness, gait imbalance, and progressive weakness. Explain how early diagnosis and modern surgical options (including minimally invasive approaches) can help, while stressing that not all neck pain is serious.",
    riskLevel: "medium",
    scheduledDate: "2024-12-04",
    useAI: true,
  },
  {
    id: "spine-fracture-treatment-2025",
    title: "Spine Fractures: Modern Treatment Options and Recovery",
    category: "spine",
    primaryKeyword: "spine fracture treatment in Hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Explain, in simple language, how modern spine surgery and bracing are used for traumatic spine fractures. Mention minimally invasive stabilisation, cement injections (without brand names), bracing, and rehab. Emphasise red-flag symptoms like weakness and bladder/bowel issues that need emergency care.",
    riskLevel: "medium",
    scheduledDate: "2024-12-05",
    useAI: true,
  },
  {
    id: "headache-warning-signs-2025",
    title: "Headache Warning Signs: When to Worry and When to Relax",
    category: "brain",
    primaryKeyword: "neurologist neurosurgeon headache specialist hyderabad",
    targetLocations: ["Hyderabad"],
    focus:
      "Public guide on headache red-flags: sudden severe 'worst headache', headache with vomiting and neck stiffness, headache with weakness or confusion, headaches after injury. Explain when a simple headache can be watched, when to see a doctor, and when to rush to emergency care. Keep it balanced and non-alarming.",
    riskLevel: "low",
    scheduledDate: "2024-12-06",
    useAI: true,
  },
];

/**
 * Generate a blog post using the CLI tool (which uses the new AI prompts and validation)
 */
async function generateBlogPost(topic: ScheduledBlogTopic): Promise<boolean> {
  console.log(`📝 Generating blog post: ${topic.title}`);
  
  const cmdArgs = [
    '--title', topic.title,
    '--category', topic.category,
    '--primaryKeyword', topic.primaryKeyword,
  ];
  
  // Add target locations if provided
  if (topic.targetLocations && topic.targetLocations.length > 0) {
    cmdArgs.push('--targetLocations', topic.targetLocations.join(','));
  }
  
  // Use AI if specified (the CLI tool now uses the new prompts and strict validation)
  if (topic.useAI) {
    cmdArgs.push('--ai');
  }
  
  // Add scheduled date if provided
  if (topic.scheduledDate) {
    cmdArgs.push('--scheduledAt', topic.scheduledDate);
  }
  
  try {
    execSync(`npm run new:blog -- ${cmdArgs.map(arg => `"${arg}"`).join(' ')}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log(`✅ Generated: ${topic.title}`);
    return true;
  } catch (error: any) {
    // Check if error is due to validation failure
    const errorMessage = error?.message || String(error);
    if (errorMessage.includes('validation failed')) {
      console.error(`❌ Validation failed for: ${topic.title}`);
      console.error('   Post will NOT be published. Review topic/prompts if this persists.');
      return false; // Skip this post, but continue with others
    }
    console.error(`❌ Failed to generate: ${topic.title}`, error);
    // For other errors, you might want to throw or return false
    // Returning false allows workflow to continue with other posts
    return false;
  }
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check and publish scheduled posts
 */
async function publishScheduledPosts(): Promise<void> {
  const today = getToday();
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDir);
    const blogFiles = files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    
    for (const file of blogFiles) {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Check for scheduledAt in frontmatter
      const scheduledMatch = content.match(/scheduledAt:\s*["']?([^"'\n]+)["']?/);
      if (scheduledMatch) {
        const scheduledDate = scheduledMatch[1].trim();
        
        if (scheduledDate <= today) {
          console.log(`📅 Publishing scheduled post: ${file} (scheduled for ${scheduledDate})`);
          
          // Update publishedAt to scheduled date
          let updatedContent = content.replace(
            /publishedAt:\s*["']?[^"'\n]+["']?/,
            `publishedAt: "${scheduledDate}"`
          );
          
          // Remove scheduledAt field
          updatedContent = updatedContent.replace(/scheduledAt:\s*["']?[^"'\n]+["']?\n?/g, '');
          
          await fs.writeFile(filePath, updatedContent, 'utf8');
          console.log(`✅ Published: ${file}`);
        }
      }
    }
  } catch (error) {
    console.error('Error publishing scheduled posts:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const generateToday = args.includes('--generate-today');
  
  if (generateToday) {
    // Generate posts scheduled for today
    const today = getToday();
    const topicsForToday = BLOG_TOPICS.filter((topic: ScheduledBlogTopic) => topic.scheduledDate === today);
    
    if (topicsForToday.length === 0) {
      console.log(`No blog posts scheduled for today (${today})`);
      return;
    }
    
    console.log(`📅 Generating ${topicsForToday.length} blog post(s) for today...`);
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const topic of topicsForToday) {
      const success = await generateBlogPost(topic);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    }
    
    console.log(`\n📊 Generation Summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed/Skipped: ${failureCount}`);
    
    // If all failed, we might want to fail the workflow
    // For now, we'll just log and continue (workflow stays green)
    if (failureCount > 0 && successCount === 0) {
      console.warn('⚠️  All blog posts failed validation. No posts published today.');
      // Uncomment to fail workflow:
      // throw new Error('All scheduled blog posts failed validation');
    }
  } else {
    // Just publish already-generated scheduled posts
    await publishScheduledPosts();
  }
  
  // Commit changes if in git repo
  try {
    execSync('git add content/blog/', { stdio: 'inherit' });
    execSync('git commit -m "📝 Auto-generated blog posts" || exit 0', { stdio: 'inherit' });
    execSync('git push origin main || exit 0', { stdio: 'inherit' });
  } catch (error) {
    console.warn('Git operations failed (may not be in a git repo):', error);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

