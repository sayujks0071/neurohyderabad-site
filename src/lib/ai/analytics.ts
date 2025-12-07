/**
 * AI-Powered Analytics and Insights
 * 
 * Provides intelligent insights from:
 * - User behavior patterns
 * - Conversion funnels
 * - Content performance
 * - Patient journey analysis
 */

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export interface AnalyticsData {
  pageViews: number;
  conversions: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: { path: string; views: number }[];
  conversionFunnel: {
    stage: string;
    count: number;
    dropOffRate: number;
  }[];
  userSegments: {
    segment: string;
    count: number;
    characteristics: string[];
  }[];
  timeRange: {
    start: string;
    end: string;
  };
}

export interface AIInsights {
  keyFindings: string[];
  recommendations: {
    action: string;
    priority: 'high' | 'medium' | 'low';
    expectedImpact: string;
    reasoning: string;
  }[];
  trends: {
    trend: string;
    direction: 'up' | 'down' | 'stable';
    significance: string;
  }[];
  opportunities: string[];
  warnings: string[];
  summary: string;
}

/**
 * Generate AI-powered insights from analytics data
 */
export async function generateInsights(
  data: AnalyticsData
): Promise<AIInsights> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackInsights(data);
  }

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are an AI analytics expert analyzing data for a neurosurgery practice website (www.drsayuj.info).

Analytics Data:
- Total Page Views: ${data.pageViews}
- Conversions: ${data.conversions}
- Bounce Rate: ${data.bounceRate}%
- Average Session Duration: ${data.avgSessionDuration}s
- Top Pages: ${JSON.stringify(data.topPages)}
- Conversion Funnel: ${JSON.stringify(data.conversionFunnel)}
- User Segments: ${JSON.stringify(data.userSegments)}
- Time Range: ${data.timeRange.start} to ${data.timeRange.end}

Generate comprehensive insights in JSON format:
{
  "keyFindings": ["key insights from the data"],
  "recommendations": [
    {
      "action": "what to do",
      "priority": "high|medium|low",
      "expectedImpact": "what impact this will have",
      "reasoning": "why this recommendation"
    }
  ],
  "trends": [
    {
      "trend": "what trend is observed",
      "direction": "up|down|stable",
      "significance": "why this matters"
    }
  ],
  "opportunities": ["growth opportunities identified"],
  "warnings": ["potential issues or concerns"],
  "summary": "executive summary of insights"
}

Return ONLY valid JSON, no other text.`,
      temperature: 0.4,
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as AIInsights;
    }

    return fallbackInsights(data);
  } catch (error) {
    console.error('AI analytics error:', error);
    return fallbackInsights(data);
  }
}

function fallbackInsights(data: AnalyticsData): AIInsights {
  const conversionRate = data.pageViews > 0 
    ? (data.conversions / data.pageViews) * 100 
    : 0;

  const recommendations = [];

  if (data.bounceRate > 60) {
    recommendations.push({
      action: 'Improve page engagement and reduce bounce rate',
      priority: 'high' as const,
      expectedImpact: 'Increase time on site and conversions',
      reasoning: `Bounce rate of ${data.bounceRate}% is high`,
    });
  }

  if (conversionRate < 2) {
    recommendations.push({
      action: 'Optimize conversion funnel',
      priority: 'high' as const,
      expectedImpact: 'Increase appointment bookings',
      reasoning: `Conversion rate of ${conversionRate.toFixed(2)}% is below target`,
    });
  }

  return {
    keyFindings: [
      `${data.pageViews} total page views in the period`,
      `${data.conversions} conversions (${conversionRate.toFixed(2)}% rate)`,
      `Bounce rate: ${data.bounceRate}%`,
    ],
    recommendations,
    trends: [
      {
        trend: 'Conversion rate',
        direction: conversionRate > 2 ? 'up' : 'down',
        significance: 'Key metric for practice growth',
      },
    ],
    opportunities: [
      'Optimize top-performing pages',
      'Improve conversion funnel',
      'Enhance user engagement',
    ],
    warnings: data.bounceRate > 70 
      ? ['High bounce rate indicates potential content or UX issues']
      : [],
    summary: `Analysis of ${data.pageViews} page views shows ${data.conversions} conversions. Focus on improving engagement and conversion optimization.`,
  };
}

