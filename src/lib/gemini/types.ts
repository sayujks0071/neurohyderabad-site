/**
 * TypeScript types for Google Gemini File API integration
 */

export interface GeminiFileUploadOptions {
  mimeType: string;
  displayName?: string;
}

export interface GeminiFileMetadata {
  name: string;
  displayName: string;
  mimeType: string;
  sizeBytes: string;
  createTime: string;
  updateTime: string;
  expirationTime: string;
  sha256Hash: string;
  uri: string;
  state: 'PROCESSING' | 'ACTIVE' | 'FAILED';
  error?: {
    code: number;
    message: string;
  };
}

export interface GeminiFileUploadResponse {
  file: GeminiFileMetadata;
}

export interface GeminiFileListResponse {
  files: GeminiFileMetadata[];
  nextPageToken?: string;
}

export interface FileSearchQuery {
  query: string;
  fileUris?: string[];
  maxResults?: number;
  temperature?: number;
}

export interface FileSearchResponse {
  answer: string;
  sources?: {
    fileUri: string;
    displayName: string;
    excerpt: string;
  }[];
  usedFiles: string[];
}

export interface MedicalDocumentMetadata {
  category: 'patient-info' | 'medical-research' | 'faq' | 'procedure-guide' | 'policy' | 'other';
  tags: string[];
  uploadedBy?: string;
  uploadedAt: string;
  relatedConditions?: string[];
}

export interface MedicalFileSearchQuery extends FileSearchQuery {
  category?: MedicalDocumentMetadata['category'];
  tags?: string[];
  conditions?: string[];
}

export const ALLOWED_MIME_TYPES = [
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',

  // Images
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',

  // Audio
  'audio/wav',
  'audio/mp3',
  'audio/mpeg',
  'audio/aiff',
  'audio/aac',
  'audio/ogg',
  'audio/flac',
] as const;

export const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB per Gemini API limits

export type AllowedMimeType = typeof ALLOWED_MIME_TYPES[number];
