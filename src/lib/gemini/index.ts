/**
 * Gemini File API - Main exports
 */

// File Handler
export {
  getGeminiFileManager,
  getGeminiClient,
  validateFile,
  uploadFileToGemini,
  uploadFileBufferToGemini,
  listGeminiFiles,
  getGeminiFile,
  deleteGeminiFile,
  waitForFileActive,
  batchUploadFiles,
} from './file-handler';

// File Search
export {
  searchFiles,
  searchMedicalDocuments,
  generatePatientEducation,
  extractFAQ,
  summarizeDocument,
  compareDocuments,
  extractInformation,
  validateClaim,
} from './file-search';

// Types
export type {
  GeminiFileUploadOptions,
  GeminiFileMetadata,
  GeminiFileUploadResponse,
  GeminiFileListResponse,
  FileSearchQuery,
  FileSearchResponse,
  MedicalDocumentMetadata,
  MedicalFileSearchQuery,
  AllowedMimeType,
} from './types';

export { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from './types';
