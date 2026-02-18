/**
 * Google Gemini File API Handler
 * Handles file upload, management, and retrieval operations
 */

import { GoogleGenAI } from '@google/genai';
import {
  GeminiFileMetadata,
  GeminiFileUploadResponse,
  GeminiFileListResponse,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  AllowedMimeType,
} from './types';

/**
 * Initialize Gemini API client
 */
export function getGeminiClient(): GoogleGenAI {
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

  return new GoogleGenAI({ apiKey });
}

/**
 * Initialize Gemini API with proper key handling (alias for getGeminiClient)
 */
export function getGeminiFileManager(): GoogleGenAI {
  return getGeminiClient();
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
 * Upload file to Gemini File API using REST API
 */
export async function uploadFileToGemini(
  filePath: string,
  mimeType: string,
  displayName?: string
): Promise<GeminiFileMetadata> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }

  const fs = await import('fs/promises');
  const fileData = await fs.readFile(filePath);

  try {
    const formData = new FormData();
    // Convert Buffer to Uint8Array for Blob compatibility
    const blob = new Blob([new Uint8Array(fileData)], { type: mimeType });
    formData.append('file', blob, displayName || filePath.split('/').pop());
    formData.append('mimeType', mimeType);
    if (displayName) {
      formData.append('displayName', displayName);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { raw: errorText };
      }
      console.error('Gemini upload error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Upload failed: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result.file as GeminiFileMetadata;
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
  // 🛡️ Sentinel: Sanitize filename to prevent path traversal
  const safeFileName = path.basename(fileName);
  const tempFilePath = path.join(tempDir, `gemini-upload-${Date.now()}-${safeFileName}`);

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
 * List all uploaded files using REST API
 */
export async function listGeminiFiles(
  pageSize?: number,
  pageToken?: string
): Promise<GeminiFileListResponse> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }

  try {
    const params = new URLSearchParams();
    if (pageSize) params.append('pageSize', pageSize.toString());
    if (pageToken) params.append('pageToken', pageToken);

    const url = `https://generativelanguage.googleapis.com/v1beta/files?key=${apiKey}&${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`List failed: ${response.status} - ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    return {
      files: (result.files || []) as GeminiFileMetadata[],
      nextPageToken: result.nextPageToken,
    };
  } catch (error) {
    console.error('Error listing Gemini files:', error);
    throw new Error(
      `Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get file metadata by name using REST API
 */
export async function getGeminiFile(
  fileName: string
): Promise<GeminiFileMetadata> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/${fileName}?key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Get file failed: ${response.status} - ${JSON.stringify(error)}`);
    }

    const file = await response.json();
    return file as GeminiFileMetadata;
  } catch (error) {
    console.error('Error getting Gemini file:', error);
    throw new Error(
      `Failed to get file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Delete file from Gemini using REST API
 */
export async function deleteGeminiFile(fileName: string): Promise<void> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/${fileName}?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Delete failed: ${response.status} - ${JSON.stringify(error)}`);
    }
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
