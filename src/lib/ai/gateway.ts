/**
 * Vercel AI Gateway Configuration
 * 
 * Provides unified API to multiple AI providers with:
 * - Budget management
 * - Monitoring
 * - Load balancing
 * - Fallbacks
 * - OIDC token authentication (auto-refreshes every 12 hours)
 * 
 * Setup:
 * 1. Option A: API Key - Set AI_GATEWAY_API_KEY in Vercel
 * 2. Option B: OIDC Token - Run `vercel link` and `vercel env pull` (auto-refreshes)
 * 
 * Model format: Use provider/model (e.g., 'openai/gpt-4o-mini')
 */

import { createOpenAI } from '@ai-sdk/openai';

const DEFAULT_TEXT_MODEL = process.env.AI_TEXT_MODEL || 'gpt-4o-mini';
const DEFAULT_PROVIDER = process.env.AI_GATEWAY_PROVIDER || 'openai';

/**
 * Get the configured Vercel AI Gateway Base URL
 * Official endpoint: https://ai-gateway.vercel.sh/v1
 */
export function getGatewayBaseUrl(): string {
  return process.env.AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh/v1';
}

/**
 * Check if Vercel AI Gateway is configured
 * 
 * Supports both:
 * - API Key: AI_GATEWAY_API_KEY
 * - OIDC Token: Automatically available when deployed on Vercel (via vercel link)
 */
export function isAIGatewayConfigured(): boolean {
  // Check for API key
  if (process.env.AI_GATEWAY_API_KEY) {
    return true;
  }
  
  // Check for OIDC token (available when deployed on Vercel)
  // Vercel automatically provides this when using `vercel link`
  if (process.env.VERCEL && process.env.AI_GATEWAY_BASE_URL) {
    return true;
  }
  
  // If on Vercel and using provider/model format, assume gateway is available
  // This check is a bit loose but maintains backward compatibility
  if (process.env.VERCEL) {
    return true;
  }
  
  return false;
}

/**
 * Check if any AI configuration is available
 */
export function hasAIConfig(): boolean {
  return !!process.env.OPENAI_API_KEY || isAIGatewayConfigured();
}

/**
 * Get the appropriate model identifier for Vercel AI Gateway
 * 
 * Vercel AI Gateway requires provider/model format (e.g., 'openai/gpt-4o-mini')
 * If already in correct format, returns as-is
 */
export function getGatewayModel(modelName: string = DEFAULT_TEXT_MODEL): string {
  // If already in provider/model format, return as-is
  if (modelName.includes('/') || modelName.includes(':')) {
    return modelName;
  }
  
  // Convert to provider/model format for Vercel AI Gateway
  const provider = process.env.AI_GATEWAY_PROVIDER || DEFAULT_PROVIDER;
  return `${provider}/${modelName}`;
}

/**
 * Create OpenAI client configured for Vercel AI Gateway
 * 
 * When using Vercel AI Gateway:
 * - Use provider/model format in model names (e.g., 'openai/gpt-4o-mini')
 * - API key or OIDC token is automatically used
 * - Base URL points to Vercel AI Gateway
 */
export function createAIGatewayClient() {
  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;
  
  if (!apiKey && !process.env.VERCEL) {
    throw new Error('AI_GATEWAY_API_KEY or OPENAI_API_KEY must be set, or deploy on Vercel for OIDC token');
  }

  // Create OpenAI client configured for Vercel AI Gateway
  return createOpenAI({
    apiKey: apiKey || undefined, // OIDC token is used automatically on Vercel if no API key
    baseURL: VERCEL_AI_GATEWAY_BASE_URL,
  });
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
 * Get the configured text model name, accounting for gateway formatting and fallback logic.
 * 
 * For Vercel AI Gateway: returns provider/model format (e.g., 'openai/gpt-4o-mini')
 * For direct OpenAI (Fallback):
 *  - Strips 'openai/' prefix if present
 *  - Falls back to DEFAULT_TEXT_MODEL (e.g. 'gpt-4o-mini') if a non-OpenAI model is requested (e.g. 'google/gemini')
 */
export function getTextModelName(modelName: string = DEFAULT_TEXT_MODEL): string {
  if (isAIGatewayConfigured()) {
    return getGatewayModel(modelName);
  }

  // Fallback Logic for Direct OpenAI Usage

  // 1. Strip 'openai/' prefix if present (e.g. 'openai/gpt-4' -> 'gpt-4')
  if (modelName.startsWith('openai/')) {
    return modelName.replace('openai/', '');
  }

  // 2. If using another provider (e.g. 'google/gemini') but Gateway is not configured,
  // we must fall back to a supported OpenAI model to avoid crashing.
  if (modelName.includes('/') && !modelName.startsWith('openai/')) {
    console.warn(`[AI Gateway] Gateway not configured. Falling back from '${modelName}' to '${DEFAULT_TEXT_MODEL}' to use direct OpenAI connection.`);
    return DEFAULT_TEXT_MODEL;
  }

  // 3. Return as-is (e.g. 'gpt-4', 'gpt-4o-mini')
  return modelName;
}

/**
 * Get a text model instance for the configured provider.
 * 
 * Works with both Vercel AI Gateway (provider/model format) and direct OpenAI
 */
export function getTextModel(modelName: string = DEFAULT_TEXT_MODEL) {
  const aiClient = getAIClient();
  return aiClient(getTextModelName(modelName));
}
