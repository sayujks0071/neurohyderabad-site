/**
 * Google Gemini File API Handler
 * Handles file upload, management, and retrieval operations
 */

import { GoogleGenerativeAI, GoogleAIFileManager } from '@google/genai';
import {
  GeminiFileMetadata,
  GeminiFileUploadResponse,
  GeminiFileListResponse,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  AllowedMimeType,
} from './types';

/**
 * Initialize Gemini API with proper key handling
 */
export function getGeminiFileManager(): GoogleAIFileManager {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error(
      'Gemini API key not found. Set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY environment variable.'
    );
  }

  return new GoogleAIFileManager(apiKey);
}

/**
 * Initialize GoogleGenerativeAI client
 */
export function getGeminiClient(): GoogleGenerativeAI {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error(
      'Gemini API key not found. Set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY environment variable.'
    );
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File
): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024 * 1024)}GB`,
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type as AllowedMimeType)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Upload file to Gemini File API
 */
export async function uploadFileToGemini(
  filePath: string,
  mimeType: string,
  displayName?: string
): Promise<GeminiFileMetadata> {
  const fileManager = getGeminiFileManager();

  try {
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName: displayName || filePath.split('/').pop(),
    });

    return uploadResult.file as GeminiFileMetadata;
  } catch (error) {
    console.error('Error uploading file to Gemini:', error);
    throw new Error(
      `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Upload file from buffer (for API routes)
 */
export async function uploadFileBufferToGemini(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  displayName?: string
): Promise<GeminiFileMetadata> {
  const fs = await import('fs/promises');
  const path = await import('path');
  const os = await import('os');

  // Create temporary file
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `gemini-upload-${Date.now()}-${fileName}`);

  try {
    // Write buffer to temp file
    await fs.writeFile(tempFilePath, buffer);

    // Upload to Gemini
    const result = await uploadFileToGemini(tempFilePath, mimeType, displayName);

    return result;
  } finally {
    // Clean up temp file
    try {
      await fs.unlink(tempFilePath);
    } catch (error) {
      console.warn('Failed to delete temporary file:', tempFilePath);
    }
  }
}

/**
 * List all uploaded files
 */
export async function listGeminiFiles(
  pageSize?: number,
  pageToken?: string
): Promise<GeminiFileListResponse> {
  const fileManager = getGeminiFileManager();

  try {
    const listResult = await fileManager.listFiles({
      pageSize,
      pageToken,
    });

    return {
      files: (listResult.files || []) as GeminiFileMetadata[],
      nextPageToken: listResult.nextPageToken,
    };
  } catch (error) {
    console.error('Error listing Gemini files:', error);
    throw new Error(
      `Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get file metadata by name
 */
export async function getGeminiFile(
  fileName: string
): Promise<GeminiFileMetadata> {
  const fileManager = getGeminiFileManager();

  try {
    const file = await fileManager.getFile(fileName);
    return file as GeminiFileMetadata;
  } catch (error) {
    console.error('Error getting Gemini file:', error);
    throw new Error(
      `Failed to get file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Delete file from Gemini
 */
export async function deleteGeminiFile(fileName: string): Promise<void> {
  const fileManager = getGeminiFileManager();

  try {
    await fileManager.deleteFile(fileName);
  } catch (error) {
    console.error('Error deleting Gemini file:', error);
    throw new Error(
      `Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Wait for file to be processed (active state)
 */
export async function waitForFileActive(
  fileName: string,
  maxWaitTime: number = 60000, // 1 minute default
  pollInterval: number = 2000 // 2 seconds
): Promise<GeminiFileMetadata> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitTime) {
    const file = await getGeminiFile(fileName);

    if (file.state === 'ACTIVE') {
      return file;
    }

    if (file.state === 'FAILED') {
      throw new Error(
        `File processing failed: ${file.error?.message || 'Unknown error'}`
      );
    }

    // Wait before polling again
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  throw new Error(`File processing timeout after ${maxWaitTime}ms`);
}

/**
 * Batch upload multiple files
 */
export async function batchUploadFiles(
  files: Array<{ path: string; mimeType: string; displayName?: string }>
): Promise<GeminiFileMetadata[]> {
  const uploadPromises = files.map(file =>
    uploadFileToGemini(file.path, file.mimeType, file.displayName)
  );

  return Promise.all(uploadPromises);
}
