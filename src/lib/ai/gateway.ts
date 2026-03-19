/**
 * AI Provider Configuration
 *
 * Priority:
 * 1. Vercel AI Gateway (if AI_GATEWAY_API_KEY is set and non-empty)
 * 2. Direct OpenAI (if OPENAI_API_KEY is set)
 * 3. Error
 *
 * Previously this assumed any Vercel deployment had gateway access,
 * which caused 500 errors when AI_GATEWAY_API_KEY was empty.
 */

import { createOpenAI } from '@ai-sdk/openai';

const DEFAULT_TEXT_MODEL = process.env.AI_TEXT_MODEL || 'gpt-4o-mini';
const DEFAULT_PROVIDER = process.env.AI_GATEWAY_PROVIDER || 'openai';

/**
 * Get the configured Vercel AI Gateway Base URL
 */
export function getGatewayBaseUrl(): string {
  return process.env.AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh/v1';
}

/**
 * Check if Vercel AI Gateway is configured with a real key
 */
export function isAIGatewayConfigured(): boolean {
  const key = process.env.AI_GATEWAY_API_KEY?.trim();
  return Boolean(key && key.length > 0);
}

/**
 * Check if direct OpenAI is configured
 */
export function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY?.trim();
  return Boolean(key && key.length > 0);
}

/**
 * Check if any AI configuration is available
 */
export function hasAIConfig(): boolean {
  return isAIGatewayConfigured() || isOpenAIConfigured();
}

/**
 * Get the appropriate model identifier
 * For AI Gateway: requires provider/model format (e.g., 'openai/gpt-4o-mini')
 * For direct OpenAI: plain model name (e.g., 'gpt-4o-mini')
 */
export function getGatewayModel(modelName: string = DEFAULT_TEXT_MODEL): string {
  if (isAIGatewayConfigured()) {
    // AI Gateway needs provider/model format
    if (modelName.includes('/') || modelName.includes(':')) {
      return modelName;
    }
    const provider = process.env.AI_GATEWAY_PROVIDER || DEFAULT_PROVIDER;
    return `${provider}/${modelName}`;
  }
  // Direct OpenAI — strip provider prefix if present
  if (modelName.includes('/')) {
    return modelName.split('/').pop() || modelName;
  }
  return modelName;
}

/**
 * Create AI Gateway client (only when gateway key is available)
 */
function createAIGatewayClient(options?: { cache?: boolean }) {
  const apiKey = process.env.AI_GATEWAY_API_KEY!.trim();

  const headers: Record<string, string> = {};
  if (options?.cache) {
    headers['vercel-ai-gateway-cache'] = 'true';
  }

  return createOpenAI({
    apiKey,
    baseURL: getGatewayBaseUrl(),
    headers,
  });
}

/**
 * Create direct OpenAI client
 */
function createDirectOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY!.trim();

  return createOpenAI({
    apiKey,
    // Default OpenAI base URL (no gateway)
  });
}

/**
 * Get AI client function
 * Returns a function that takes a model name and returns a model instance
 */
export function getAIClient(options?: { cache?: boolean }) {
  if (isAIGatewayConfigured()) {
    try {
      const client = createAIGatewayClient(options);
      return (model: string) => client(model);
    } catch (error) {
      console.error('[AI] Gateway client creation failed, trying direct OpenAI:', error);
      // Fall through to direct OpenAI
    }
  }

  if (isOpenAIConfigured()) {
    const client = createDirectOpenAIClient();
    return (model: string) => client(model);
  }

  throw new Error(
    'No AI provider configured. Set AI_GATEWAY_API_KEY (for Vercel AI Gateway) or OPENAI_API_KEY (for direct OpenAI).'
  );
}

/**
 * Get the configured text model name
 */
export function getTextModelName(modelName: string = DEFAULT_TEXT_MODEL): string {
  return getGatewayModel(modelName);
}

/**
 * Get a text model instance
 */
export function getTextModel(modelName: string = DEFAULT_TEXT_MODEL, options?: { cache?: boolean }) {
  const aiClient = getAIClient(options);
  return aiClient(getTextModelName(modelName));
}
