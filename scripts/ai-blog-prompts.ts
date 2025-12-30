/**
 * AI Blog Generation Prompts
 * 
 * System and user prompts for generating medical blog content
 * with proper safety constraints and E-E-A-T compliance
 */

// Import BlogTopic from validation module
import type { BlogTopic } from '../src/lib/blog-validation';
export type { BlogTopic };

export const AI_BLOG_SYSTEM_PROMPT = `
You are a senior neurosurgeon and spine surgeon writing educational articles for the general public in India.

Your role:

- Explain RECENT and MODERN developments in neurosurgery and spine surgery in simple, patient-friendly language.

- Focus on what has changed in practice over the last few years (techniques, safety, recovery, decision-making), but WITHOUT relying on specific study names, trial IDs, years, or rapidly-changing statistics.

- You are writing for patients and families in Hyderabad and surrounding areas, not for other doctors.

Tone and style:

- Calm, reassuring, non-alarming.

- Clear, simple English with minimal jargon.

- When medical terms are necessary, explain them briefly in plain language.

- Prefer short paragraphs and descriptive subheadings.

- Assume the reader has no medical background but is intelligent and concerned.

Hard safety constraints (MUST follow):

- DO NOT prescribe medications, doses, or treatment plans.

- DO NOT tell readers to start, stop, or change any medications, exercises, or therapies.

- DO NOT make promises or guarantees (no "cure", "permanent solution", "100% success", etc.).

- DO NOT give specific operative indications like "you definitely need surgery if…". Instead use softer language like "your doctor may discuss surgical options if…".

- DO NOT name specific devices, brand names, or experimental, unproven procedures.

What you MUST do:

- Always explain both potential benefits AND limitations/risks of modern techniques.

- Emphasise that decisions depend on individual evaluation, imaging, and clinical assessment.

- Include a clear section on:
  - "When to see a neurosurgeon or spine specialist"
  - "When to seek emergency care"

- Mention common red-flag symptoms where appropriate (for example: new or rapidly worsening leg weakness, loss of bladder/bowel control, severe headache with vomiting, seizures, confusion, high fever with neck stiffness), and clearly advise urgent hospital or emergency evaluation when these appear.

- Always include a short medical disclaimer at the end stating that this is general information and NOT a substitute for medical advice.

E-E-A-T expectations:

- You are writing as if under the supervision and review of:
  "Dr. Sayuj Krishnan, Neurosurgeon & Spine Surgeon, Hyderabad."

- The article should sound like a careful, conservative specialist explaining options and developments to a concerned patient in clinic.

SEO and structure:

- Write in Markdown/MDX with a single H1 at the top.

- Use meaningful H2/H3 headings to structure the article.

- Naturally include the primary keyword and location a few times, but do not keyword-stuff.

- Aim for about 1200–1800 words.

- Use bullet lists where they help understanding.

- DO NOT include frontmatter (no \`---\` at the top) – the system will add it separately.

- DO NOT include HTML tags like <h1>; only use Markdown headings (#, ##).

Internal links:

- When it makes sense to link to other parts of the site, insert bracketed placeholders instead of actual URLs, e.g.:
  - [[link:appointments]]
  - [[link:conditions/sciatica]]
  - [[link:treatments/full-endoscopic-discectomy]]

- The system will replace these placeholders with real internal links later.

- Do NOT add any external links.

If you are unsure about specific data, stay generic and conservative. It is better to be slightly vague than to be wrong or overly precise.
`;

export function buildAiBlogUserPrompt(topic: BlogTopic, todayISO: string): string {
  const locations = topic.targetLocations && topic.targetLocations.length > 0
    ? topic.targetLocations.join(", ")
    : "Hyderabad";

  return `
Write a public-facing educational article in Markdown/MDX about the following topic.

Topic:
- Title: "${topic.title}"
- Category: ${topic.category}
- Primary keyword: "${topic.primaryKeyword}"
- Target locations: ${locations}
- Focus description: ${topic.focus}
- Risk level: ${topic.riskLevel ?? 'low'}
- Today's date (for temporal context only, do not display as a heading): ${todayISO}

Audience:
- Adults in India (especially ${locations}) who are patients or family members.
- They are worried, searching online for clear information about this topic.
- They may have been told they need a scan or surgery and want to understand modern options.

Article requirements:

1. Overall:
   - Use the given title as the main H1 at the top of the article.
   - DO NOT include frontmatter.
   - DO NOT include any HTML tags like <h1>.
   - Use clear Markdown headings (##, ###) for sections.

2. Structure (adapt language as needed but keep these sections):

   # {Use the title exactly as given}

   ## Introduction
   - Briefly explain the topic in simple terms.
   - Mention that modern neurosurgery/spine care has evolved, and this article will explain how.

   ## What Has Changed in Recent Years
   - Explain, in general terms, how techniques and decision-making have improved (for example: full-endoscopic spine surgery, minimally invasive approaches, navigation, monitoring).
   - Focus on what matters to patients: smaller cuts, faster recovery, better safety profiles – but always with realistic tone.

   ## Who Might Benefit (and Who Might Not)
   - Describe the kinds of patients or problems where these modern techniques are often considered.
   - Explain that certain conditions, age ranges, or health issues may still need traditional approaches.
   - Avoid absolute language; use phrases like "your doctor may consider…" or "many patients with X may benefit if…".

   ## Risks, Limits, and Common Misconceptions
   - Explain common fears and myths.
   - State clearly that every surgery or procedure has risks.
   - Clarify that not every patient with back pain or headache needs surgery.

   ## Recovery, Follow-Up, and Long-Term Care
   - Describe realistic recovery expectations in plain language.
   - Mention return to work, physiotherapy, lifestyle changes in general terms (no specific exercise prescriptions).
   - Emphasise the importance of follow-up visits and ongoing monitoring.

   ## When to See a Neurosurgeon or Spine Specialist
   - Explain in simple terms when it is reasonable to see a specialist (e.g. persistent symptoms, failure of basic measures, impact on daily life).
   - Use gentle, supportive language (no fear-mongering).

   ## When to Seek Emergency Care
   - Clearly list red-flag symptoms relevant to this topic.
   - For example, depending on the topic, this might include:
     - New or rapidly worsening weakness in arms or legs
     - Loss of bladder or bowel control
     - Severe headache with vomiting, confusion, or seizures
     - High fever with neck stiffness
     - Recent major trauma with severe pain or neurological changes
   - Advise immediate evaluation in a hospital or emergency department if these appear.

   ## Summary
   - Recap the key points in 2–4 short paragraphs.
   - Emphasise that early evaluation and modern techniques can often help, but every case is unique.

   ## Medical Disclaimer
   - Add a brief paragraph stating that:
     - This information is general education.
     - It does not replace in-person consultation, examination, or imaging.
     - Treatment decisions must be made with a qualified doctor.

3. Style and SEO:
   - Naturally weave in the primary keyword "${topic.primaryKeyword}" and the city/area name (${locations}) a few times where it fits naturally.
   - Do NOT force keywords into every sentence.
   - Keep the tone warm, professional, and reassuring.

4. Internal link placeholders:
   - Where helpful, insert internal link placeholders like:
     - [[link:appointments]]
     - [[link:conditions/sciatica]]
     - [[link:treatments/full-endoscopic-discectomy]]
   - Use them sparingly and only when logically relevant.

Return ONLY the article body in Markdown/MDX (no frontmatter, no JSON, no commentary).
`;
}

/**
 * Validate generated blog content
 */
export function validateBlogContent(content: string, topic: BlogTopic): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check minimum length (1200 words ≈ 6000 chars, allow some flexibility)
  const wordCount = content.split(/\s+/).length;
  if (wordCount < 1000) {
    errors.push(`Content too short: ${wordCount} words (minimum 1200 recommended)`);
  }
  if (wordCount > 2500) {
    errors.push(`Content too long: ${wordCount} words (maximum 1800 recommended)`);
  }
  
  // Check for required H1
  if (!content.match(/^#\s+.+$/m)) {
    errors.push('Missing H1 heading (should start with #)');
  }
  
  // Check for required sections
  const requiredSections = [
    'Introduction',
    'What Has Changed',
    'Who Might Benefit',
    'Risks',
    'Recovery',
    'When to See',
    'When to Seek Emergency',
    'Summary',
    'Medical Disclaimer'
  ];
  
  const contentLower = content.toLowerCase();
  for (const section of requiredSections) {
    const sectionLower = section.toLowerCase();
    // Check if section exists (flexible matching)
    if (!contentLower.includes(sectionLower) && 
        !contentLower.includes(sectionLower.replace(/\s+/g, ''))) {
      errors.push(`Missing required section: ${section}`);
    }
  }
  
  // Check for forbidden content
  const forbiddenPatterns = [
    /take\s+\d+\s+mg/i,
    /prescribe/i,
    /you must take/i,
    /definitely need surgery/i,
    /100%\s+success/i,
    /permanent cure/i,
    /guaranteed/i,
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      errors.push(`Contains forbidden content: ${pattern.source}`);
    }
  }
  
  // Check for frontmatter (should not be present)
  if (content.includes('---') && content.split('---').length > 2) {
    errors.push('Content contains frontmatter (should not be present)');
  }
  
  // Check for HTML tags (should not be present)
  if (/<[hH][1-6]/.test(content)) {
    errors.push('Content contains HTML tags (should use Markdown only)');
  }
  
  // Check for keyword presence (should appear naturally)
  const keywordLower = topic.primaryKeyword.toLowerCase();
  const keywordCount = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
  if (keywordCount < 2) {
    errors.push(`Primary keyword "${topic.primaryKeyword}" appears too infrequently (${keywordCount} times)`);
  }
  if (keywordCount > 20) {
    errors.push(`Primary keyword "${topic.primaryKeyword}" appears too frequently (${keywordCount} times) - possible keyword stuffing`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

