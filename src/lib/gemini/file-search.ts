<<<<<<< HEAD
    // Extract text from response
    let text: string | undefined;

    const responseText = (result as { text?: unknown }).text;
=======
/**
 * Google Gemini File Search API
 * Implements semantic search and Q&A over uploaded documents
 */

import { GoogleGenAI } from '@google/genai';
import {
  FileSearchQuery,
  FileSearchResponse,
  MedicalFileSearchQuery,
  GeminiFileMetadata,
} from './types';
import { getGeminiClient } from './file-handler';

/**
 * Search across uploaded files using Gemini
 */
export async function searchFiles(
  query: FileSearchQuery
): Promise<FileSearchResponse> {
  const genAI = getGeminiClient();

  try {
    const { query: searchQuery, fileUris = [], temperature = 0.7 } = query;

    // If no specific files provided, this will search across context
    const prompt = `Answer the following question based on the provided documents.
If the information is not available in the documents, say so clearly.

Question: ${searchQuery}

Please provide:
1. A direct answer
2. Supporting evidence from the documents (with references)
3. Confidence level (high/medium/low)`;

    // Build the request with file context
    const requestParts: any[] = [{ text: prompt }];

    // Add file references if provided
    if (fileUris.length > 0) {
      fileUris.forEach(uri => {
        requestParts.push({
          fileData: {
            mimeType: 'application/pdf', // Adjust based on actual file type
            fileUri: uri,
          },
        });
      });
    }

    // Use gemini-2.0-flash-exp for file search (supports multimodal and file context)
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts: requestParts }],
      config: {
        temperature,
        maxOutputTokens: 2048,
      },
    });

    // Extract text from response with fallback logic
    let text: string | undefined;
    const responseText = (response as { text?: unknown }).text;

    if (typeof responseText === 'function') {
      text = (responseText as () => string)();
    } else if (typeof responseText === 'string') {
      text = responseText;
    } else if ('output' in response && Array.isArray(response.output)) {
      text = response.output
        .flatMap((it: any) => it?.content ?? [])
        .map((it: any) => it?.text)
        .find((segment: unknown): segment is string => typeof segment === 'string') ?? undefined;
    }

    if (!text || !text.trim()) {
      throw new Error('Empty response from Gemini');
    }