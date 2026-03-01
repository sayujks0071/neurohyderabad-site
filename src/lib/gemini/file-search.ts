/**
 * Google Gemini File Search API
 * Implements semantic search and Q&A over uploaded documents
 */

import { GoogleGenAI } from '@google/genai';
import { generateText } from 'ai';
import { getTextModel } from '@/src/lib/ai/gateway';
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
  // Use Vercel AI Gateway for queries without files (better monitoring/budgeting)
  if (!query.fileUris || query.fileUris.length === 0) {
    try {
      const prompt = `Answer the following medical question. Since no specific documents are currently uploaded, provide general medical information with appropriate disclaimers.

Question: ${query.query}

Please provide:
1. A direct answer based on general medical knowledge
2. Important medical disclaimers
3. Recommendation to consult with a healthcare professional

Note: This answer is based on general medical knowledge. For personalized medical advice, please consult with Dr. Sayuj Krishnan at +91-9778280044.`;

      const { text } = await generateText({
        model: getTextModel('google/gemini-2.0-flash'),
        prompt,
        temperature: query.temperature || 0.7,
      });

      return {
        answer: text,
        usedFiles: [],
        sources: [],
      };
    } catch (error) {
      console.error('AI Gateway search failed:', error);
      throw error;
    }
  }

  // Legacy implementation for file-based search (GoogleGenAI direct usage)
  const genAI = getGeminiClient();

  try {
    const { query: searchQuery, fileUris = [], temperature = 0.7 } = query;

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

    // Use gemini-1.5-flash for file search
    let response: any;
    try {
      response = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: requestParts }],
        config: {
          temperature,
          maxOutputTokens: 2048,
        },
      });
    } catch (apiError) {
      console.error('[Gemini Search] API call failed:', apiError);
      const errorMsg = apiError instanceof Error ? apiError.message : String(apiError);
      if (errorMsg.includes('401') || errorMsg.includes('403') || errorMsg.includes('API key')) {
        throw new Error('Gemini API key is invalid or missing. Please check your GEMINI_API_KEY environment variable.');
      }
      if (errorMsg.includes('404') || errorMsg.includes('model')) {
        throw new Error('Gemini model "gemini-2.0-flash" not found. Please check the model name.');
      }
      throw new Error(`Gemini API call failed: ${errorMsg}`);
    }

    // Extract text from response with fallback logic
    let text: string | undefined;
    
    // Log response structure for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Gemini Search] Response type:', typeof response);
      console.log('[Gemini Search] Response keys:', Object.keys(response || {}));
    }
    
    // Try multiple response extraction patterns
    const anyResponse = response as any;
    
    // Pattern 1: Direct text property (function or string)
    if (anyResponse.text) {
      text = typeof anyResponse.text === 'function' 
        ? anyResponse.text() 
        : anyResponse.text;
    }
    // Pattern 2: response.text
    else if (anyResponse.response?.text) {
      text = typeof anyResponse.response.text === 'function' 
        ? anyResponse.response.text() 
        : anyResponse.response.text;
    }
    // Pattern 3: candidates[0].content.parts[0].text (standard Gemini API structure)
    else if (anyResponse.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = anyResponse.candidates[0].content.parts[0].text;
    }
    // Pattern 4: output array structure
    else if (Array.isArray(anyResponse.output)) {
      text = anyResponse.output
        .flatMap((it: any) => it?.content ?? [])
        .map((it: any) => it?.text)
        .find((segment: unknown): segment is string => typeof segment === 'string') ?? undefined;
    }
    // Pattern 5: Try to find text in nested structures
    else if (anyResponse.output) {
      const output = anyResponse.output;
      if (Array.isArray(output)) {
        for (const item of output) {
          if (item?.text) {
            text = typeof item.text === 'function' ? item.text() : item.text;
            break;
          }
          if (item?.content?.parts) {
            for (const part of item.content.parts) {
              if (part?.text) {
                text = part.text;
                break;
              }
            }
            if (text) break;
          }
        }
      }
    }
    // Pattern 6: Deep search for text property
    else {
      const deepSearch = (obj: any, depth = 0): string | undefined => {
        if (depth > 5) return undefined; // Prevent infinite recursion
        if (typeof obj === 'string' && obj.trim().length > 10) return obj;
        if (typeof obj !== 'object' || obj === null) return undefined;
        
        if (obj.text && typeof obj.text === 'string') return obj.text;
        if (obj.text && typeof obj.text === 'function') return obj.text();
        
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            for (const item of obj[key]) {
              const found = deepSearch(item, depth + 1);
              if (found) return found;
            }
          } else {
            const found = deepSearch(obj[key], depth + 1);
            if (found) return found;
          }
        }
        return undefined;
      };
      text = deepSearch(anyResponse);
    }

    if (!text || !text.trim()) {
      const responseStr = JSON.stringify(response, null, 2).substring(0, 1000); // Limit log size
      console.error('[Gemini Search] Empty response. Response structure:', responseStr);
      
      // Provide a helpful fallback response instead of throwing an error
      text = `I understand you're asking about "${searchQuery}". 

While I don't have specific documents uploaded at the moment, I can provide general information. However, for accurate and personalized medical advice, I recommend:

1. Consulting directly with Dr. Sayuj Krishnan at +91-9778280044
2. Booking an appointment for a proper evaluation
3. Visiting our clinic at Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad

For immediate medical emergencies, please call +91-9778280044 or visit the nearest emergency room.

Note: This response is based on general medical knowledge. For personalized medical advice specific to your condition, please consult with a healthcare professional.`;
    }

    return {
      answer: text,
      usedFiles: fileUris,
      sources: fileUris.map(uri => ({
        fileUri: uri,
        displayName: uri.split('/').pop() || 'Unknown',
        excerpt: text.slice(0, 200), // First 200 chars as excerpt
      })),
    };
  } catch (error) {
    console.error('Error searching files with Gemini:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Provide more helpful error messages
    if (errorMessage.includes('API key') || errorMessage.includes('401') || errorMessage.includes('403')) {
      throw new Error('Gemini API key is invalid or missing. Please check your GEMINI_API_KEY environment variable.');
    }
    
    if (errorMessage.includes('404') || errorMessage.includes('model')) {
      throw new Error('Gemini model not found. Please check the model name (gemini-2.0-flash).');
    }
    
    console.error('[Gemini Search] Full error details:', { errorMessage, errorStack });
    throw new Error(`Failed to search files: ${errorMessage}`);
  }
}

/**
 * Medical-specific search with category filtering
 */
export async function searchMedicalDocuments(
  query: MedicalFileSearchQuery,
  availableFiles: GeminiFileMetadata[]
): Promise<FileSearchResponse> {
  const { category, tags, conditions, ...baseQuery } = query;

  // Filter files based on category/tags if metadata is available
  // This would require storing metadata separately (e.g., in a database)
  // For now, we'll use all files and let Gemini's context handle it

  const filteredFileUris = availableFiles
    .filter(file => file.state === 'ACTIVE')
    .map(file => file.uri);

  // Enhance query with medical context
  const enhancedQuery = {
    ...baseQuery,
    fileUris: query.fileUris || filteredFileUris,
    query: buildMedicalQuery(query.query, category, tags, conditions),
  };

  return searchFiles(enhancedQuery);
}

/**
 * Build enhanced medical query
 */
function buildMedicalQuery(
  query: string,
  category?: MedicalFileSearchQuery['category'],
  tags?: string[],
  conditions?: string[]
): string {
  let enhancedQuery = query;

  if (category) {
    enhancedQuery += `\n\nFocus on: ${category} related information.`;
  }

  if (tags && tags.length > 0) {
    enhancedQuery += `\n\nRelevant topics: ${tags.join(', ')}`;
  }

  if (conditions && conditions.length > 0) {
    enhancedQuery += `\n\nRelated medical conditions: ${conditions.join(', ')}`;
  }

  enhancedQuery += `\n\nPlease provide medically accurate information with appropriate disclaimers.`;

  return enhancedQuery;
}

/**
 * Generate patient education content from documents
 */
export async function generatePatientEducation(
  condition: string,
  fileUris: string[]
): Promise<FileSearchResponse> {
  const query = `Based on the provided medical documents, create patient-friendly educational content about ${condition}.

Include:
1. What is ${condition}? (Simple explanation)
2. Common symptoms
3. When to seek medical attention
4. Treatment options
5. What to expect during treatment
6. Recovery and follow-up

Use simple language suitable for patients without medical background. Include appropriate medical disclaimers.`;

  const result = await searchFiles({
    query,
    fileUris,
    temperature: 0.5, // Lower temperature for more factual content
  });

  return result;
}

/**
 * Extract FAQ from medical documents
 */
export async function extractFAQ(
  topic: string,
  fileUris: string[],
  numQuestions: number = 10
): Promise<Array<{ question: string; answer: string }>> {
  const query = `Based on the provided documents about ${topic}, generate ${numQuestions} frequently asked questions and their answers.

Format each as:
Q: [Question]
A: [Answer]

Focus on common patient concerns and provide clear, accurate answers.`;

  const result = await searchFiles({
    query,
    fileUris,
    temperature: 0.6,
  });

  // Parse Q&A format
  const faqList: Array<{ question: string; answer: string }> = [];
  const lines = result.answer.split('\n');
  let currentQ = '';
  let currentA = '';

  for (const line of lines) {
    if (line.startsWith('Q:')) {
      if (currentQ && currentA) {
        faqList.push({ question: currentQ, answer: currentA });
      }
      currentQ = line.replace('Q:', '').trim();
      currentA = '';
    } else if (line.startsWith('A:')) {
      currentA = line.replace('A:', '').trim();
    } else if (currentA) {
      currentA += ' ' + line.trim();
    }
  }

  // Add last Q&A
  if (currentQ && currentA) {
    faqList.push({ question: currentQ, answer: currentA });
  }

  return faqList;
}

/**
 * Summarize medical document
 */
export async function summarizeDocument(
  fileUri: string,
  summaryType: 'brief' | 'detailed' = 'brief'
): Promise<string> {
  const promptMap = {
    brief: 'Provide a brief 2-3 paragraph summary of this medical document, highlighting key points and main takeaways.',
    detailed: 'Provide a comprehensive summary of this medical document, including all major sections, key findings, recommendations, and important details.',
  };

  const result = await searchFiles({
    query: promptMap[summaryType],
    fileUris: [fileUri],
    temperature: 0.3, // Low temperature for factual summarization
  });

  return result.answer;
}

/**
 * Compare multiple documents
 */
export async function compareDocuments(
  fileUris: string[],
  comparisonTopic: string
): Promise<string> {
  const query = `Compare and contrast the information about ${comparisonTopic} across all provided documents.

Highlight:
1. Common points of agreement
2. Differences or contradictions
3. Unique information in each source
4. Overall consensus or recommendations

Provide a structured comparison.`;

  const result = await searchFiles({
    query,
    fileUris,
    temperature: 0.4,
  });

  return result.answer;
}

/**
 * Extract specific information from documents
 */
export async function extractInformation(
  fileUris: string[],
  extractionPrompt: string
): Promise<string> {
  const result = await searchFiles({
    query: extractionPrompt,
    fileUris,
    temperature: 0.2, // Very low for factual extraction
    maxResults: 1,
  });

  return result.answer;
}

/**
 * Validate information against documents
 */
export async function validateClaim(
  claim: string,
  fileUris: string[]
): Promise<{
  isSupported: boolean;
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
}> {
  const query = `Evaluate the following claim against the provided medical documents:

Claim: "${claim}"

Determine:
1. Is this claim supported by the documents? (Yes/No/Partially)
2. What is your confidence level? (High/Medium/Low)
3. What evidence supports or contradicts this claim?

Provide a clear, structured response.`;

  const result = await searchFiles({
    query,
    fileUris,
    temperature: 0.1, // Very low for factual validation
  });

  const answer = result.answer.toLowerCase();

  // Parse response
  const isSupported =
    answer.includes('yes') ||
    answer.includes('supported') ||
    answer.includes('correct');

  let confidence: 'high' | 'medium' | 'low' = 'medium';
  if (answer.includes('high confidence')) confidence = 'high';
  else if (answer.includes('low confidence')) confidence = 'low';

  return {
    isSupported,
    confidence,
    evidence: result.answer,
  };
}
