/**
 * AI-Powered Content Personalization Engine
 * 
 * Personalizes content based on:
 * - User behavior
 * - Medical condition
 * - Location
 * - Language preference
 * - Device type
 * - Previous interactions
 */

import { generateObject, jsonSchema } from 'ai';
import { getTextModel, hasAIConfig } from './gateway';

export interface PersonalizationContext {
  condition?: string;
  location?: string;
  language?: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  previousPages?: string[];
  searchQuery?: string;
  urgencyLevel?: 'emergency' | 'urgent' | 'moderate' | 'routine';
  age?: number;
  referralSource?: string;
}

export interface PersonalizedContent {
  recommendedPages: {
    slug: string;
    title: string;
    reason: string;
    priority: number;
  }[];
  personalizedMessage?: string;
  suggestedActions: {
    action: string;
    url: string;
    reason: string;
  }[];
  contentModifications: {
    highlight?: string[];
    emphasize?: string[];
    hide?: string[];
  };
}

/**
 * Generate personalized content recommendations
 */
export async function personalizeContent(
  context: PersonalizationContext
): Promise<PersonalizedContent> {
  if (!hasAIConfig()) {
    return fallbackPersonalization(context);
  }

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: 'object',
        properties: {
          recommendedPages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                slug: { type: 'string' },
                title: { type: 'string' },
                reason: { type: 'string' },
                priority: { type: 'number' },
              },
              required: ['slug', 'title', 'reason', 'priority'],
              additionalProperties: false,
            },
          },
          personalizedMessage: { type: 'string' },
          suggestedActions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                action: { type: 'string' },
                url: { type: 'string' },
                reason: { type: 'string' },
              },
              required: ['action', 'url', 'reason'],
              additionalProperties: false,
            },
          },
          contentModifications: {
            type: 'object',
            properties: {
              highlight: { type: 'array', items: { type: 'string' } },
              emphasize: { type: 'array', items: { type: 'string' } },
              hide: { type: 'array', items: { type: 'string' } },
            },
            additionalProperties: false,
          },
        },
        required: ['recommendedPages', 'suggestedActions', 'contentModifications'],
        additionalProperties: false,
      }),
      prompt: `You are an AI content personalization engine for a neurosurgery practice website (www.drsayuj.info).

User Context:
${context.condition ? `- Medical Condition: ${context.condition}` : ''}
${context.location ? `- Location: ${context.location}` : ''}
${context.language ? `- Language: ${context.language}` : ''}
${context.deviceType ? `- Device: ${context.deviceType}` : ''}
${context.previousPages ? `- Previous Pages: ${context.previousPages.join(', ')}` : ''}
${context.searchQuery ? `- Search Query: ${context.searchQuery}` : ''}
${context.urgencyLevel ? `- Urgency: ${context.urgencyLevel}` : ''}
${context.age ? `- Age: ${context.age}` : ''}

Available Content Types:
- Service pages (endoscopic spine surgery, brain tumor surgery, etc.)
- Condition pages (sciatica, spinal stenosis, etc.)
- Location pages (near different areas of Hyderabad)
- Blog posts (patient education, recovery guides)
- Appointment booking
- Contact information

Generate personalized recommendations in JSON format:
{
  "recommendedPages": [
    {
      "slug": "page-slug",
      "title": "Page Title",
      "reason": "Why this is relevant",
      "priority": 1-10
    }
  ],
  "personalizedMessage": "A brief personalized message for the user",
  "suggestedActions": [
    {
      "action": "Action text",
      "url": "/path",
      "reason": "Why suggest this"
    }
  ],
  "contentModifications": {
    "highlight": ["keywords to highlight"],
    "emphasize": ["sections to emphasize"],
    "hide": ["sections to hide"]
  }
}

Return ONLY valid JSON, no other text.`,
      temperature: 0.5,
    });

    return object as PersonalizedContent;
  } catch (error) {
    console.error('Personalization error:', error);
    return fallbackPersonalization(context);
  }
}

function fallbackPersonalization(context: PersonalizationContext): PersonalizedContent {
  const recommendedPages = [];

  if (context.condition) {
    // Map common conditions to relevant pages
    const conditionMap: Record<string, string> = {
      'sciatica': '/conditions/sciatica-treatment-hyderabad',
      'spinal stenosis': '/conditions/spinal-stenosis-treatment-hyderabad',
      'back pain': '/services/endoscopic-discectomy-hyderabad',
      'brain tumor': '/services/brain-tumor-surgery-hyderabad',
      'epilepsy': '/services/epilepsy-surgery-hyderabad',
    };

    const conditionLower = context.condition.toLowerCase();
    for (const [key, slug] of Object.entries(conditionMap)) {
      if (conditionLower.includes(key)) {
        recommendedPages.push({
          slug,
          title: key,
          reason: `Relevant to your condition: ${context.condition}`,
          priority: 9,
        });
        break;
      }
    }
  }

  if (context.location) {
    recommendedPages.push({
      slug: `/locations/${context.location.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Near ${context.location}`,
      reason: 'Location-based recommendation',
      priority: 7,
    });
  }

  // Always include appointment booking
  recommendedPages.push({
    slug: '/appointments',
    title: 'Book Appointment',
    reason: 'Schedule a consultation',
    priority: 10,
  });

  return {
    recommendedPages,
    suggestedActions: [
      {
        action: 'Book Appointment',
        url: '/appointments',
        reason: 'Schedule your consultation',
      },
      {
        action: 'Contact Us',
        url: '/contact',
        reason: 'Get in touch with our team',
      },
    ],
    contentModifications: {},
  };
}

/**
 * Personalize messaging based on context
 */
export function personalizeMessage(
  baseMessage: string,
  context: PersonalizationContext
): string {
  let message = baseMessage;

  if (context.condition) {
    message = message.replace(
      /your condition/gi,
      `your ${context.condition}`
    );
  }

  if (context.location) {
    message = message.replace(
      /Hyderabad/gi,
      context.location
    );
  }

  if (context.urgencyLevel === 'emergency' || context.urgencyLevel === 'urgent') {
    message = `⚠️ ${message} For urgent concerns, please call +91-9778280044 immediately.`;
  }

  return message;
}
