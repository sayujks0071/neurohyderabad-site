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

const DEFAULT_TEXT_MODEL = process.env.AI_TEXT_MODEL || 'gpt-4o-mini';

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
    if (modelName.includes('/')) {
      return modelName.split('/').pop() || modelName;
    }
    return modelName;
  }

  // Vercel AI Gateway: use provider/model format
  if (modelName.includes('/') || modelName.includes(':')) {
    return modelName;
  }
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
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY must be set for direct OpenAI access');
      }
      const directClient = createOpenAI({ apiKey });
      return (model: string) => directClient(model);
    }
  }

  // Fallback to direct OpenAI
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY must be set for direct OpenAI access');
  }
  const directClient = createOpenAI({ apiKey });
  return (model: string) => directClient(model);
}

/**
 * Get the configured text model name, accounting for gateway formatting.
 */
export function getTextModelName(modelName: string = DEFAULT_TEXT_MODEL): string {
  return isAIGatewayConfigured() ? getGatewayModel(modelName) : modelName;
}

/**
 * Get a text model instance for the configured provider.
 */
export function getTextModel(modelName: string = DEFAULT_TEXT_MODEL) {
  const aiClient = getAIClient();
  return aiClient(getTextModelName(modelName));
}
