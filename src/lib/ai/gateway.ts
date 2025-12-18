/**
 * AI Gateway Configuration
 * 
 * Provides unified API to multiple AI providers with:
 * - Budget management
 * - Monitoring
 * - Load balancing
 * - Fallbacks
 */

import { createOpenAI } from '@ai-sdk/openai';

/**
 * Create OpenAI client configured for AI Gateway
 * 
 * AI Gateway provides:
 * - Unified API across providers
 * - Budget controls
 * - Rate limiting
 * - Monitoring and analytics
 * - Automatic fallbacks
 */
export function createAIGatewayClient() {
  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.AI_GATEWAY_BASE_URL || 'https://gateway.ai.cloudflare.com/v1';

  if (!apiKey) {
    throw new Error('AI_GATEWAY_API_KEY or OPENAI_API_KEY must be set');
  }

  // Create OpenAI client configured for AI Gateway
  return createOpenAI({
    apiKey,
    baseURL,
  });
}

/**
 * Get the appropriate model identifier for AI Gateway
 * 
 * For Cloudflare Gateway with createOpenAI: use model name directly (e.g., 'gpt-4o-mini')
 * For Vercel AI Gateway: use provider/model format (e.g., 'openai/gpt-4o-mini')
 */
export function getGatewayModel(modelName: string = 'gpt-4o-mini'): string {
  // If using Cloudflare Gateway (custom baseURL), return model name directly
  // If using Vercel AI Gateway, return provider/model format
  const baseURL = process.env.AI_GATEWAY_BASE_URL || '';
  const isCloudflareGateway = baseURL.includes('cloudflare.com');

  if (isCloudflareGateway) {
    // Cloudflare Gateway: use model name directly
    return modelName;
  }

  // Vercel AI Gateway: use provider/model format
  const provider = process.env.AI_GATEWAY_PROVIDER || 'openai';
  return `${provider}/${modelName}`;
}

/**
 * Check if AI Gateway is configured
 */
export function isAIGatewayConfigured(): boolean {
  return !!(
    process.env.AI_GATEWAY_API_KEY ||
    (process.env.AI_GATEWAY_BASE_URL && process.env.OPENAI_API_KEY)
  );
}

/**
 * Check if any AI configuration is available
 */
export function hasAIConfig(): boolean {
  return !!process.env.OPENAI_API_KEY || isAIGatewayConfigured();
}

/**
 * Get AI client function (works like openai() from @ai-sdk/openai)
 * Falls back to direct provider if Gateway is not configured
 */
export function getAIClient() {
  if (isAIGatewayConfigured()) {
    try {
      const gatewayClient = createAIGatewayClient();
      // Return a function that matches the openai() API
      // createOpenAI returns a function that takes a model name
      return (model: string) => gatewayClient(model);
    } catch (error) {
      console.error('Failed to create AI Gateway client, falling back to direct OpenAI:', error);
      // Fallback to direct OpenAI if gateway fails
      const { openai } = require('@ai-sdk/openai');
      return openai;
    }
  }

  // Fallback to direct OpenAI
  const { openai } = require('@ai-sdk/openai');
  return openai;
}

