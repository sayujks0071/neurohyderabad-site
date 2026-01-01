/**
 * Patient Education Workflow
 *
 * Orchestrates personalized patient education content delivery including:
 * - Condition-specific education
 * - Pre-operative preparation
 * - Post-operative care instructions
 * - Recovery timeline
 * - FAQ generation
 */

import { sleep } from "workflow";
import { generateObject, generateText, jsonSchema } from "ai";
import {
  getTextModel,
  hasAIConfig,
} from "@/src/lib/ai/gateway";
import { getAllBlogPosts } from "@/src/lib/blog";

interface EducationRequest {
  patientId: string;
  condition: string;
  treatmentPlan?: string;
  surgeryDate?: string;
  email: string;
  language?: string;
}

interface EducationContent {
  overview: string;
  symptoms: string[];
  diagnosis: string;
  treatmentOptions: string[];
  preparation: string;
  recovery: string;
  faqs: Array<{ question: string; answer: string }>;
  resources: Array<{ title: string; url: string; type: string }>;
  timeline: string;
}

interface PatientEducationResult {
  patientId: string;
  content: EducationContent;
  deliveryMethod: "email" | "portal" | "sms";
  deliveryStatus: "sent" | "scheduled" | "failed";
  followUpScheduled: boolean;
  educationScore: number; // 0-100, based on content quality and relevance
}

/**
 * Main patient education workflow
 */
export async function handlePatientEducation(
  request: EducationRequest
): Promise<PatientEducationResult> {
  "use workflow";

  console.log(
    `[Patient Education Workflow] Starting for patient ${request.patientId}, condition: ${request.condition}`
  );

  // Step 1: Generate comprehensive education content
  const overview = await generateConditionOverview(request.condition);

  await sleep("1s");

  // Step 2: Generate symptom guide
  const symptoms = await generateSymptomGuide(request.condition);

  await sleep("1s");

  // Step 3: Generate diagnosis information
  const diagnosis = await generateDiagnosisInfo(request.condition);

  await sleep("1s");

  // Step 4: Generate treatment options
  const treatmentOptions = await generateTreatmentOptions(
    request.condition,
    request.treatmentPlan
  );

  await sleep("1s");

  // Step 5: Generate preparation guide
  const preparation = await generatePreparationGuide(
    request.condition,
    request.treatmentPlan
  );

  await sleep("1s");

  // Step 6: Generate recovery information
  const recovery = await generateRecoveryInfo(request.condition);

  await sleep("2s");

  // Step 7: Generate FAQs
  const faqs = await generateFAQs(request.condition, 10);

  await sleep("1s");

  // Step 8: Find relevant resources (blog posts, videos)
  const resources = await findRelevantResources(request.condition);

  await sleep("1s");

  // Step 9: Generate recovery timeline
  const timeline = await generateRecoveryTimeline(request.condition);

  // Combine all content
  const content: EducationContent = {
    overview,
    symptoms,
    diagnosis,
    treatmentOptions,
    preparation,
    recovery,
    faqs,
    resources,
    timeline,
  };

  // Step 10: Calculate education score
  const educationScore = calculateEducationScore(content);

  // Step 11: Deliver content to patient
  await sleep("2s");
  const deliveryStatus = await deliverEducationContent(
    request.email,
    content,
    request.condition
  );

  // Step 12: Schedule follow-up education
  await sleep("1s");
  const followUpScheduled = await scheduleFollowUpEducation(
    request.patientId,
    request.condition,
    request.surgeryDate
  );

  console.log(
    `[Patient Education Workflow] Completed for patient ${request.patientId}, score: ${educationScore}`
  );

  return {
    patientId: request.patientId,
    content,
    deliveryMethod: "email",
    deliveryStatus,
    followUpScheduled,
    educationScore,
  };
}

/**
 * Step: Generate condition overview
 */
async function generateConditionOverview(condition: string): Promise<string> {
  "use step";

  console.log(`[Patient Education] Generating overview for ${condition}`);

  if (!hasAIConfig()) {
    return `${condition} is a condition that can affect the brain, spine, or nerves. For a personalized explanation and treatment options, schedule a consultation with Dr. Sayuj Krishnan.`;
  }

  const { text } = await generateText({
    model: getTextModel(),
    prompt: `Write a comprehensive but patient-friendly overview of ${condition} in the context of neurosurgery.

Include:
1. What is ${condition}? (simple definition)
2. How common is it?
3. Who is at risk?
4. Why it matters for neurosurgical care
5. How Dr. Sayuj Krishnan's expertise helps

Use simple language, avoid medical jargon, and be reassuring. 3-4 paragraphs.`,
    temperature: 0.7,
  });

  return text;
}

/**
 * Step: Generate symptom guide
 */
async function generateSymptomGuide(condition: string): Promise<string[]> {
  "use step";

  console.log(`[Patient Education] Generating symptom guide for ${condition}`);

  if (!hasAIConfig()) {
    return [
      "Persistent pain",
      "Numbness or tingling",
      "Weakness in limbs",
      "Difficulty walking",
      "Balance problems",
    ];
  }

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: "object",
        properties: {
          symptoms: { type: "array", items: { type: "string" } },
        },
        required: ["symptoms"],
        additionalProperties: false,
      }),
      prompt: `List the common symptoms of ${condition} that patients should watch for.

Return ONLY JSON with a "symptoms" array, e.g., {"symptoms": ["symptom1", "symptom2", ...]}

Include 8-10 symptoms, ordered from most common to less common.`,
      temperature: 0.5,
    });
    return object.symptoms;
  } catch (error) {
    console.error("[Patient Education] Error parsing symptoms:", error);
  }

  return [
    "Persistent pain",
    "Numbness or tingling",
    "Weakness in limbs",
    "Difficulty walking",
    "Balance problems",
  ];
}

/**
 * Step: Generate diagnosis information
 */
async function generateDiagnosisInfo(condition: string): Promise<string> {
  "use step";

  console.log(`[Patient Education] Generating diagnosis info for ${condition}`);

  if (!hasAIConfig()) {
    return `Diagnosis for ${condition} usually begins with a consultation and physical exam, followed by imaging tests such as MRI or CT scans. Bring any prior reports and a list of symptoms to your visit.`;
  }

  const { text } = await generateText({
    model: getTextModel(),
    prompt: `Explain how ${condition} is diagnosed in a patient-friendly way.

Include:
1. Initial consultation process
2. Physical examination
3. Imaging tests (MRI, CT scan, X-ray)
4. Other diagnostic tests
5. What patients should bring to consultation

2-3 paragraphs, simple language.`,
    temperature: 0.6,
  });

  return text;
}

/**
 * Step: Generate treatment options
 */
async function generateTreatmentOptions(
  condition: string,
  treatmentPlan?: string
): Promise<string[]> {
  "use step";

  console.log(`[Patient Education] Generating treatment options for ${condition}`);

  const contextualInfo = treatmentPlan
    ? `\n\nThe patient's recommended treatment plan is: ${treatmentPlan}`
    : "";

  if (!hasAIConfig()) {
    return [
      "Conservative management (medication, physical therapy)",
      "Minimally invasive surgery",
      "Endoscopic spine surgery",
      "Traditional open surgery",
      "Post-operative rehabilitation",
    ];
  }

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: "object",
        properties: {
          treatments: { type: "array", items: { type: "string" } },
        },
        required: ["treatments"],
        additionalProperties: false,
      }),
      prompt: `List the treatment options for ${condition}, focusing on Dr. Sayuj Krishnan's expertise in minimally invasive neurosurgery.${contextualInfo}

Return ONLY JSON with a "treatments" array, e.g., {"treatments": ["treatment1", "treatment2", ...]}

Include 5-7 treatment options, from conservative to surgical.`,
      temperature: 0.6,
    });
    return object.treatments;
  } catch (error) {
    console.error("[Patient Education] Error parsing treatments:", error);
  }

  return [
    "Conservative management (medication, physical therapy)",
    "Minimally invasive surgery",
    "Endoscopic spine surgery",
    "Traditional open surgery",
    "Post-operative rehabilitation",
  ];
}

/**
 * Step: Generate preparation guide
 */
async function generatePreparationGuide(
  condition: string,
  treatmentPlan?: string
): Promise<string> {
  "use step";

  console.log(`[Patient Education] Generating preparation guide for ${condition}`);

  const contextualInfo = treatmentPlan
    ? `\n\nThe treatment plan is: ${treatmentPlan}`
    : "";

  if (!hasAIConfig()) {
    return `Preparation tips for ${condition}: bring past medical records, imaging reports, and a list of medications. Write down your symptoms, their duration, and any questions. Arrive early for registration and avoid heavy meals before the visit.`;
  }

  const { text } = await generateText({
    model: getTextModel(),
    prompt: `Create a preparation guide for a patient with ${condition} who will be seeing a neurosurgeon.${contextualInfo}

Include:
1. What to bring to consultation
2. Medical records needed
3. Questions to ask the doctor
4. Pre-consultation preparation
5. What to expect during the visit

Use bullet points and clear instructions. 2-3 paragraphs.`,
    temperature: 0.6,
  });

  return text;
}

/**
 * Step: Generate recovery information
 */
async function generateRecoveryInfo(condition: string): Promise<string> {
  "use step";

  console.log(`[Patient Education] Generating recovery info for ${condition}`);

  if (!hasAIConfig()) {
    return `Recovery after treatment for ${condition} varies by patient and procedure. Expect gradual improvement over weeks, follow activity restrictions, and contact the clinic if pain, weakness, or fever worsens.`;
  }

  const { text } = await generateText({
    model: getTextModel(),
    prompt: `Provide recovery and post-treatment information for ${condition}.

Include:
1. Typical recovery timeline
2. What to expect in the first week
3. Activity restrictions
4. Pain management
5. When to call the doctor
6. Long-term outlook

Be specific and reassuring. 3-4 paragraphs.`,
    temperature: 0.6,
  });

  return text;
}

/**
 * Step: Generate FAQs
 */
async function generateFAQs(
  condition: string,
  count: number
): Promise<Array<{ question: string; answer: string }>> {
  "use step";

  console.log(`[Patient Education] Generating ${count} FAQs for ${condition}`);

  if (!hasAIConfig()) {
    return [
      {
        question: `What causes ${condition}?`,
        answer:
          "Multiple factors can contribute, including genetics, lifestyle, and environmental factors.",
      },
      {
        question: "How long is the recovery?",
        answer:
          "Recovery times vary, but most patients see significant improvement within 4-6 weeks.",
      },
    ];
  }

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: "object",
        properties: {
          faqs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                answer: { type: "string" },
              },
              required: ["question", "answer"],
              additionalProperties: false,
            },
          },
        },
        required: ["faqs"],
        additionalProperties: false,
      }),
      prompt: `Generate ${count} frequently asked questions and answers about ${condition} from a patient's perspective.

Return as JSON with a "faqs" array: {"faqs": [{"question": "...", "answer": "..."}, ...]}

Focus on practical, common concerns patients have.`,
      temperature: 0.6,
    });
    return object.faqs;
  } catch (error) {
    console.error("[Patient Education] Error parsing FAQs:", error);
  }

  return [
    {
      question: `What causes ${condition}?`,
      answer:
        "Multiple factors can contribute, including genetics, lifestyle, and environmental factors.",
    },
    {
      question: "How long is the recovery?",
      answer:
        "Recovery times vary, but most patients see significant improvement within 4-6 weeks.",
    },
  ];
}

/**
 * Step: Find relevant resources
 */
async function findRelevantResources(
  condition: string
): Promise<Array<{ title: string; url: string; type: string }>> {
  "use step";

  console.log(`[Patient Education] Finding relevant resources for ${condition}`);

  try {
    const allPosts = await getAllBlogPosts();
    const conditionLower = condition.toLowerCase();

    const relevantPosts = allPosts
      .filter((post) => {
        const searchText =
          `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(" ")}`.toLowerCase();
        return searchText.includes(conditionLower);
      })
      .slice(0, 5)
      .map((post) => ({
        title: post.title,
        url: `/blog/${post.slug}`,
        type: "blog",
      }));

    return relevantPosts;
  } catch (error) {
    console.error("[Patient Education] Error finding resources:", error);
    return [];
  }
}

/**
 * Step: Generate recovery timeline
 */
async function generateRecoveryTimeline(condition: string): Promise<string> {
  "use step";

  console.log(`[Patient Education] Generating recovery timeline for ${condition}`);

  if (!hasAIConfig()) {
    return `Recovery timeline for ${condition}:\n- Days 1-3: Rest and follow post-care instructions.\n- Week 1: Gradual mobility, manage pain.\n- Weeks 2-4: Light activity and follow-up visits.\n- Month 2-3: Continued improvement and therapy if advised.\n- Long-term: Periodic check-ins and lifestyle adjustments.`;
  }

  const { text } = await generateText({
    model: getTextModel(),
    prompt: `Create a detailed recovery timeline for ${condition} treatment.

Format as a day-by-day or week-by-week guide:
- Days 1-3: ...
- Week 1: ...
- Week 2-4: ...
- Month 2-3: ...
- Long-term: ...

Be specific about what patients can expect at each stage.`,
    temperature: 0.6,
  });

  return text;
}

/**
 * Calculate education content quality score
 */
function calculateEducationScore(content: EducationContent): number {
  let score = 0;

  // Overview quality (20 points)
  if (content.overview.length > 200) score += 20;
  else score += 10;

  // Symptoms coverage (15 points)
  score += Math.min(content.symptoms.length * 2, 15);

  // Diagnosis info (15 points)
  if (content.diagnosis.length > 150) score += 15;
  else score += 8;

  // Treatment options (15 points)
  score += Math.min(content.treatmentOptions.length * 3, 15);

  // Preparation guide (10 points)
  if (content.preparation.length > 150) score += 10;
  else score += 5;

  // Recovery info (10 points)
  if (content.recovery.length > 150) score += 10;
  else score += 5;

  // FAQs (10 points)
  score += Math.min(content.faqs.length, 10);

  // Resources (5 points)
  score += Math.min(content.resources.length, 5);

  return Math.min(score, 100);
}

/**
 * Step: Deliver education content to patient
 */
async function deliverEducationContent(
  email: string,
  content: EducationContent,
  condition: string
): Promise<"sent" | "scheduled" | "failed"> {
  "use step";

  console.log(`[Patient Education] Delivering content to ${email}`);

  try {
    // In production, this would send via email service
    console.log(
      `Education content for ${condition} delivered to ${email} (${content.overview.length} chars)`
    );
    return "sent";
  } catch (error) {
    console.error("[Patient Education] Error delivering content:", error);
    return "failed";
  }
}

/**
 * Step: Schedule follow-up education
 */
async function scheduleFollowUpEducation(
  patientId: string,
  condition: string,
  surgeryDate?: string
): Promise<boolean> {
  "use step";

  console.log(`[Patient Education] Scheduling follow-up for patient ${patientId}`);

  // In production, this would schedule:
  // - Pre-surgery education (if surgeryDate provided)
  // - Post-surgery care instructions
  // - Recovery milestone check-ins
  // - Long-term care reminders

  console.log(`Follow-up education scheduled for patient ${patientId}`);
  return true;
}
