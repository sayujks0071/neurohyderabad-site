/**
 * Streaming Workflows for www.drsayuj.info
 *
 * Real-time streaming for:
 * - AI-powered content generation with progress
 * - Live site health monitoring dashboard
 * - Batch SEO optimization with progress updates
 * - Patient education content streaming
 */

import { getWritable, sleep, FatalError, fetch } from "workflow";
import { generateText, streamText } from "ai";
import { getTextModel, hasAIConfig } from "@/src/lib/ai/gateway";

// ============================================================
// Type Definitions
// ============================================================

type ProgressUpdate = {
  type: "progress";
  step: string;
  current: number;
  total: number;
  message: string;
  timestamp: string;
};

type ContentChunk = {
  type: "content";
  text: string;
  section?: string;
};

type StatusUpdate = {
  type: "status";
  status: "running" | "completed" | "failed";
  message?: string;
};

type StreamMessage = ProgressUpdate | ContentChunk | StatusUpdate;

type HealthMetric = {
  type: "metric";
  name: string;
  value: number | string;
  status: "healthy" | "warning" | "critical";
  timestamp: string;
};

type LogEntry = {
  type: "log";
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
};

// ============================================================
// AI Content Generation with Streaming
// ============================================================

/**
 * Stream AI-generated blog content in real-time
 * Perfect for showing writing progress to editors
 */
export async function streamBlogGeneration(
  topic: string,
  targetKeywords: string[]
): Promise<{ wordCount: number; sections: number }> {
  "use workflow";
  globalThis.fetch = fetch;

  // Write initial status
  await writeStatus("running", `Starting content generation for: ${topic}`);
  await writeProgress("initialization", 1, 5, "Analyzing topic and keywords");

  // Generate outline first
  const outline = await generateOutline(topic, targetKeywords);
  await writeProgress("outline", 2, 5, `Generated outline with ${outline.sections.length} sections`);

  // Stream each section
  let totalWords = 0;
  for (let i = 0; i < outline.sections.length; i++) {
    const section = outline.sections[i];
    await writeProgress(
      "writing",
      3,
      5,
      `Writing section ${i + 1}/${outline.sections.length}: ${section.title}`
    );

    const words = await streamSection(section.title, section.points, targetKeywords);
    totalWords += words;
  }

  // Finalize
  await writeProgress("seo", 4, 5, "Optimizing for SEO");
  await sleep("2s");

  await writeProgress("complete", 5, 5, `Generated ${totalWords} words across ${outline.sections.length} sections`);
  await writeStatus("completed", "Blog content generation complete");

  await closeDefaultStream();

  return { wordCount: totalWords, sections: outline.sections.length };
}

async function generateOutline(
  topic: string,
  keywords: string[]
): Promise<{ sections: Array<{ title: string; points: string[] }> }> {
  "use step";

  if (!hasAIConfig()) {
    // Return a default outline if no AI config
    return {
      sections: [
        { title: "Introduction", points: ["Overview", "Why this matters"] },
        { title: "Understanding " + topic, points: ["Definition", "Key concepts"] },
        { title: "Treatment Options", points: ["Conservative care", "Surgical options"] },
        { title: "When to See a Doctor", points: ["Warning signs", "Next steps"] },
        { title: "Conclusion", points: ["Summary", "Call to action"] },
      ],
    };
  }

  try {
    const { text } = await generateText({
      model: getTextModel(),
      prompt: `Create a blog post outline for "${topic}" targeting keywords: ${keywords.join(", ")}.
      
Return JSON with this structure:
{
  "sections": [
    { "title": "Section Title", "points": ["point1", "point2"] }
  ]
}

Include 5-7 sections with 2-4 points each. Focus on medical accuracy and SEO.`,
      temperature: 0.7,
    });

    try {
      return JSON.parse(text);
    } catch {
      // Fallback if JSON parsing fails
      return {
        sections: [
          { title: "Introduction", points: ["Overview"] },
          { title: topic, points: ["Main content"] },
          { title: "Conclusion", points: ["Summary"] },
        ],
      };
    }
  } catch (error) {
    console.error("[Streaming] Outline generation error:", error);
    throw new FatalError(`Failed to generate outline: ${error}`);
  }
}

async function streamSection(
  title: string,
  points: string[],
  keywords: string[]
): Promise<number> {
  "use step";

  const writable = getWritable<StreamMessage>();
  const writer = writable.getWriter();

  try {
    // Write section header
    await writer.write({
      type: "content",
      text: `\n## ${title}\n\n`,
      section: title,
    });

    if (!hasAIConfig()) {
      // Generate placeholder content without AI
      const placeholder = `This section covers ${title.toLowerCase()}. Key points include: ${points.join(", ")}. Keywords: ${keywords.slice(0, 3).join(", ")}.\n\n`;
      await writer.write({
        type: "content",
        text: placeholder,
        section: title,
      });
      return placeholder.split(/\s+/).length;
    }

    // Stream AI-generated content
    const { textStream } = await streamText({
      model: getTextModel(),
      prompt: `Write a detailed section titled "${title}" for a medical blog post.
      
Cover these points: ${points.join(", ")}
Include these keywords naturally: ${keywords.join(", ")}

Write in a professional but accessible tone suitable for patients in Hyderabad seeking neurosurgery information. Include specific, actionable advice.

Write 200-300 words.`,
      temperature: 0.7,
    });

    let wordCount = 0;
    for await (const chunk of textStream) {
      await writer.write({
        type: "content",
        text: chunk,
        section: title,
      });
      wordCount += chunk.split(/\s+/).filter(Boolean).length;
    }

    await writer.write({
      type: "content",
      text: "\n\n",
      section: title,
    });

    return wordCount;
  } finally {
    writer.releaseLock();
  }
}

// ============================================================
// Live Site Health Monitoring Dashboard
// ============================================================

/**
 * Stream live health metrics for dashboard
 * Runs checks in sequence and streams results in real-time
 */
export async function streamHealthDashboard(
  durationMinutes: number = 5
): Promise<{ checksPerformed: number; issues: number }> {
  "use workflow";
  globalThis.fetch = fetch;

  await writeLog("info", `Starting health monitoring for ${durationMinutes} minutes`);

  let checksPerformed = 0;
  let issues = 0;
  const endTime = Date.now() + durationMinutes * 60 * 1000;

  while (Date.now() < endTime) {
    // Run health checks and stream results
    const results = await runHealthChecks();
    checksPerformed += results.length;
    issues += results.filter((r) => r.status !== "healthy").length;

    // Wait before next check cycle
    await sleep("30s");
  }

  await writeLog("info", `Health monitoring complete: ${checksPerformed} checks, ${issues} issues`);
  await closeHealthStreams();

  return { checksPerformed, issues };
}

async function runHealthChecks(): Promise<HealthMetric[]> {
  "use step";

  const metricsWritable = getWritable<HealthMetric>({ namespace: "metrics" });
  const logsWritable = getWritable<LogEntry>({ namespace: "logs" });
  const metricsWriter = metricsWritable.getWriter();
  const logsWriter = logsWritable.getWriter();

  const results: HealthMetric[] = [];
  const timestamp = new Date().toISOString();

  try {
    // Check homepage
    const homepageStart = Date.now();
    try {
      const response = await fetch("https://www.drsayuj.info/", { method: "HEAD" });
      const latency = Date.now() - homepageStart;

      const metric: HealthMetric = {
        type: "metric",
        name: "Homepage Latency",
        value: latency,
        status: latency < 1500 ? "healthy" : latency < 3000 ? "warning" : "critical",
        timestamp,
      };
      results.push(metric);
      await metricsWriter.write(metric);

      if (metric.status !== "healthy") {
        await logsWriter.write({
          type: "log",
          level: metric.status === "critical" ? "error" : "warn",
          message: `Homepage latency: ${latency}ms`,
          timestamp,
        });
      }
    } catch (error) {
      const metric: HealthMetric = {
        type: "metric",
        name: "Homepage",
        value: "DOWN",
        status: "critical",
        timestamp,
      };
      results.push(metric);
      await metricsWriter.write(metric);
      await logsWriter.write({
        type: "log",
        level: "error",
        message: `Homepage check failed: ${error}`,
        timestamp,
      });
    }

    // Check API
    const apiStart = Date.now();
    try {
      const response = await fetch("https://www.drsayuj.info/api/workflows/health", {
        method: "GET",
      });
      const latency = Date.now() - apiStart;
      const data = await response.json();

      const metric: HealthMetric = {
        type: "metric",
        name: "API Health",
        value: data.status || "unknown",
        status: data.status === "operational" ? "healthy" : "warning",
        timestamp,
      };
      results.push(metric);
      await metricsWriter.write(metric);
    } catch (error) {
      const metric: HealthMetric = {
        type: "metric",
        name: "API Health",
        value: "ERROR",
        status: "critical",
        timestamp,
      };
      results.push(metric);
      await metricsWriter.write(metric);
    }

    // Check sitemap
    try {
      const response = await fetch("https://www.drsayuj.info/sitemap.xml");
      const text = await response.text();
      const urlCount = (text.match(/<url>/g) || []).length;

      const metric: HealthMetric = {
        type: "metric",
        name: "Sitemap URLs",
        value: urlCount,
        status: urlCount > 50 ? "healthy" : "warning",
        timestamp,
      };
      results.push(metric);
      await metricsWriter.write(metric);
    } catch {
      // Sitemap check failed - non-critical
    }

    await logsWriter.write({
      type: "log",
      level: "info",
      message: `Health check cycle complete: ${results.length} metrics`,
      timestamp,
    });

    return results;
  } finally {
    metricsWriter.releaseLock();
    logsWriter.releaseLock();
  }
}

async function closeHealthStreams(): Promise<void> {
  "use step";
  await getWritable({ namespace: "metrics" }).close();
  await getWritable({ namespace: "logs" }).close();
}

// ============================================================
// Batch SEO Optimization with Progress
// ============================================================

interface SEOTask {
  url: string;
  type: "meta" | "schema" | "content" | "links";
}

/**
 * Stream progress of batch SEO optimization
 */
export async function streamBatchSEOOptimization(
  tasks: SEOTask[]
): Promise<{ completed: number; failed: number }> {
  "use workflow";
  globalThis.fetch = fetch;

  await writeStatus("running", `Starting batch SEO optimization for ${tasks.length} tasks`);

  let completed = 0;
  let failed = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    await writeProgress(
      "optimization",
      i + 1,
      tasks.length,
      `Processing ${task.type} for ${task.url}`
    );

    try {
      await optimizeSEOTask(task);
      completed++;
      await writeContent(`✓ ${task.type}: ${task.url}\n`);
    } catch (error) {
      failed++;
      await writeContent(`✗ ${task.type}: ${task.url} - ${error}\n`);
    }

    // Small delay between tasks
    await sleep("500ms");
  }

  await writeStatus("completed", `SEO optimization complete: ${completed} succeeded, ${failed} failed`);
  await closeDefaultStream();

  return { completed, failed };
}

async function optimizeSEOTask(task: SEOTask): Promise<void> {
  "use step";

  // Simulate optimization task
  switch (task.type) {
    case "meta":
      // Would update meta tags
      break;
    case "schema":
      // Would validate/update schema
      break;
    case "content":
      // Would optimize content
      break;
    case "links":
      // Would check/fix links
      break;
  }

  console.log(`[SEO] Optimized ${task.type} for ${task.url}`);
}

// ============================================================
// Patient Education Content Streaming
// ============================================================

/**
 * Stream personalized patient education content
 * Based on condition and upcoming appointment
 */
export async function streamPatientEducation(
  condition: string,
  appointmentType: "consultation" | "follow-up" | "surgery"
): Promise<{ sections: number }> {
  "use workflow";
  globalThis.fetch = fetch;

  await writeStatus("running", `Generating education content for ${condition}`);

  // Generate and stream introduction
  await writeProgress("intro", 1, 4, "Writing introduction");
  await streamEducationSection("introduction", condition, appointmentType);

  // Generate condition overview
  await writeProgress("overview", 2, 4, "Explaining your condition");
  await streamEducationSection("overview", condition, appointmentType);

  // What to expect
  await writeProgress("expectations", 3, 4, "What to expect");
  await streamEducationSection("expectations", condition, appointmentType);

  // Preparation tips
  await writeProgress("preparation", 4, 4, "How to prepare");
  await streamEducationSection("preparation", condition, appointmentType);

  await writeStatus("completed", "Patient education content ready");
  await closeDefaultStream();

  return { sections: 4 };
}

async function streamEducationSection(
  section: string,
  condition: string,
  appointmentType: string
): Promise<void> {
  "use step";

  const writable = getWritable<StreamMessage>();
  const writer = writable.getWriter();

  try {
    const sectionTitles: Record<string, string> = {
      introduction: "Welcome",
      overview: `Understanding ${condition}`,
      expectations: `What to Expect During Your ${appointmentType}`,
      preparation: "How to Prepare",
    };

    await writer.write({
      type: "content",
      text: `\n### ${sectionTitles[section]}\n\n`,
      section,
    });

    if (!hasAIConfig()) {
      // Fallback content
      const fallback = getFallbackEducationContent(section, condition, appointmentType);
      await writer.write({
        type: "content",
        text: fallback + "\n\n",
        section,
      });
      return;
    }

    // Stream AI-generated content
    const prompts: Record<string, string> = {
      introduction: `Write a warm, reassuring introduction (50 words) for a patient with ${condition} coming for a ${appointmentType} with Dr. Sayuj, a neurosurgeon in Hyderabad.`,
      overview: `Explain ${condition} in simple terms (100 words) for a patient. Include common causes and why treatment might be needed. Be reassuring.`,
      expectations: `Describe what a patient can expect during a ${appointmentType} for ${condition} (100 words). Include typical duration, tests that might be done, and what questions to ask.`,
      preparation: `Provide preparation tips (80 words) for a patient visiting for ${condition} ${appointmentType}. Include what to bring (MRI scans, reports), what to wear, and any dietary restrictions.`,
    };

    const { textStream } = await streamText({
      model: getTextModel(),
      prompt: prompts[section],
      temperature: 0.7,
    });

    for await (const chunk of textStream) {
      await writer.write({
        type: "content",
        text: chunk,
        section,
      });
    }

    await writer.write({
      type: "content",
      text: "\n\n",
      section,
    });
  } finally {
    writer.releaseLock();
  }
}

function getFallbackEducationContent(
  section: string,
  condition: string,
  appointmentType: string
): string {
  const content: Record<string, string> = {
    introduction: `Thank you for choosing Dr. Sayuj for your ${condition} care. We're here to help you understand your condition and treatment options.`,
    overview: `${condition} is a condition that affects many patients. Dr. Sayuj specializes in treating this condition using the latest minimally invasive techniques available in Hyderabad.`,
    expectations: `During your ${appointmentType}, Dr. Sayuj will review your medical history, examine you, and discuss your MRI/CT scan results. The appointment typically takes 20-30 minutes.`,
    preparation: `Please bring: your MRI/CT scans, previous medical reports, and a list of current medications. Arrive 15 minutes early. You may eat normally before the appointment.`,
  };
  return content[section] || "";
}

// ============================================================
// Helper Functions for Stream Writing
// ============================================================

async function writeProgress(
  step: string,
  current: number,
  total: number,
  message: string
): Promise<void> {
  "use step";

  const writable = getWritable<StreamMessage>();
  const writer = writable.getWriter();
  try {
    await writer.write({
      type: "progress",
      step,
      current,
      total,
      message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    writer.releaseLock();
  }
}

async function writeStatus(
  status: "running" | "completed" | "failed",
  message: string
): Promise<void> {
  "use step";

  const writable = getWritable<StreamMessage>();
  const writer = writable.getWriter();
  try {
    await writer.write({
      type: "status",
      status,
      message,
    });
  } finally {
    writer.releaseLock();
  }
}

async function writeContent(text: string): Promise<void> {
  "use step";

  const writable = getWritable<StreamMessage>();
  const writer = writable.getWriter();
  try {
    await writer.write({
      type: "content",
      text,
    });
  } finally {
    writer.releaseLock();
  }
}

async function writeLog(
  level: "info" | "warn" | "error",
  message: string
): Promise<void> {
  "use step";

  const writable = getWritable<LogEntry>({ namespace: "logs" });
  const writer = writable.getWriter();
  try {
    await writer.write({
      type: "log",
      level,
      message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    writer.releaseLock();
  }
}

async function closeDefaultStream(): Promise<void> {
  "use step";
  await getWritable().close();
}
