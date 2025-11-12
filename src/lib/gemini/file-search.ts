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

  // Use gemini-2.0-flash-exp for file search (supports multimodal and file context)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
  });

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

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: requestParts }],
      generationConfig: {
        temperature,
        maxOutputTokens: 2048,
      },
    });

    const response = result.response;
    const text = response.text();

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
    throw new Error(
      `Failed to search files: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
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
): Promise<string> {
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

  return result.answer;
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
