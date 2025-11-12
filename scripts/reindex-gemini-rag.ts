#!/usr/bin/env ts-node

/**
 * RAG Reindex Script for Gemini File API
 *
 * This script reindexes documents for the RAG (Retrieval-Augmented Generation) system.
 * It's designed to be run as a cron job to keep the file search index up to date.
 *
 * Usage: npx ts-node scripts/reindex-gemini-rag.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import {
  listGeminiFiles,
  uploadFileToGemini,
  deleteGeminiFile,
  getGeminiFile,
} from '../src/lib/gemini/file-handler';
import { GeminiFileMetadata } from '../src/lib/gemini/types';

interface ReindexConfig {
  documentsPath: string;
  fileExtensions: string[];
  maxFileAge?: number; // in days
  deleteOldFiles: boolean;
}

const DEFAULT_CONFIG: ReindexConfig = {
  documentsPath: process.env.RAG_DOCUMENTS_PATH || './documents',
  fileExtensions: ['.pdf', '.txt', '.md', '.doc', '.docx'],
  maxFileAge: 30, // Delete files older than 30 days
  deleteOldFiles: true,
};

/**
 * Get all files from a directory recursively
 */
async function getAllFiles(
  dirPath: string,
  extensions: string[]
): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getAllFiles(fullPath, extensions);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return files;
}

/**
 * Get MIME type from file extension
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Calculate file hash for comparison
 */
async function getFileHash(filePath: string): Promise<string> {
  const crypto = await import('crypto');
  const fileBuffer = await fs.readFile(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/**
 * Check if file needs to be reindexed
 */
async function needsReindex(
  localFilePath: string,
  remoteFile?: GeminiFileMetadata
): Promise<boolean> {
  if (!remoteFile) return true;

  // Check if file content has changed
  const localHash = await getFileHash(localFilePath);
  return localHash !== remoteFile.sha256Hash;
}

/**
 * Delete old files from Gemini
 */
async function deleteOldFiles(
  files: GeminiFileMetadata[],
  maxAgeDays: number
): Promise<number> {
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  let deletedCount = 0;

  for (const file of files) {
    const fileAge = now - new Date(file.createTime).getTime();
    if (fileAge > maxAgeMs) {
      try {
        await deleteGeminiFile(file.name);
        console.log(`Deleted old file: ${file.displayName} (${file.name})`);
        deletedCount++;
      } catch (error) {
        console.error(`Failed to delete file ${file.name}:`, error);
      }
    }
  }

  return deletedCount;
}

/**
 * Main reindex function
 */
async function reindex(config: ReindexConfig = DEFAULT_CONFIG) {
  console.log('Starting RAG reindex...');
  console.log(`Documents path: ${config.documentsPath}`);
  console.log(`File extensions: ${config.fileExtensions.join(', ')}`);

  const stats = {
    totalLocal: 0,
    totalRemote: 0,
    uploaded: 0,
    skipped: 0,
    deleted: 0,
    errors: 0,
  };

  try {
    // Get all remote files
    console.log('\nFetching remote files...');
    const remoteFilesResult = await listGeminiFiles();
    const remoteFiles = remoteFilesResult.files;
    stats.totalRemote = remoteFiles.length;
    console.log(`Found ${stats.totalRemote} remote files`);

    // Create a map of remote files by display name
    const remoteFileMap = new Map<string, GeminiFileMetadata>();
    for (const file of remoteFiles) {
      remoteFileMap.set(file.displayName, file);
    }

    // Delete old files if configured
    if (config.deleteOldFiles && config.maxFileAge) {
      console.log(`\nDeleting files older than ${config.maxFileAge} days...`);
      stats.deleted = await deleteOldFiles(remoteFiles, config.maxFileAge);
      console.log(`Deleted ${stats.deleted} old files`);
    }

    // Check if documents directory exists
    try {
      await fs.access(config.documentsPath);
    } catch {
      console.log(`\nDocuments directory not found: ${config.documentsPath}`);
      console.log('Creating directory...');
      await fs.mkdir(config.documentsPath, { recursive: true });
    }

    // Get all local files
    console.log('\nScanning local files...');
    const localFiles = await getAllFiles(
      config.documentsPath,
      config.fileExtensions
    );
    stats.totalLocal = localFiles.length;
    console.log(`Found ${stats.totalLocal} local files`);

    // Process each local file
    console.log('\nProcessing files...');
    for (const localFile of localFiles) {
      const fileName = path.basename(localFile);
      const displayName = fileName;

      try {
        const remoteFile = remoteFileMap.get(displayName);
        const shouldReindex = await needsReindex(localFile, remoteFile);

        if (shouldReindex) {
          console.log(`Uploading: ${displayName}`);
          const mimeType = getMimeType(localFile);

          // Delete old version if exists
          if (remoteFile) {
            await deleteGeminiFile(remoteFile.name);
          }

          // Upload new version
          await uploadFileToGemini(localFile, mimeType, displayName);
          stats.uploaded++;
          console.log(`  ✓ Uploaded successfully`);
        } else {
          console.log(`Skipping: ${displayName} (no changes)`);
          stats.skipped++;
        }
      } catch (error) {
        console.error(`  ✗ Error processing ${displayName}:`, error);
        stats.errors++;
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('Reindex Summary:');
    console.log('='.repeat(50));
    console.log(`Local files found:     ${stats.totalLocal}`);
    console.log(`Remote files (before): ${stats.totalRemote}`);
    console.log(`Files uploaded:        ${stats.uploaded}`);
    console.log(`Files skipped:         ${stats.skipped}`);
    console.log(`Old files deleted:     ${stats.deleted}`);
    console.log(`Errors:                ${stats.errors}`);
    console.log('='.repeat(50));

    if (stats.errors > 0) {
      console.error('\nReindex completed with errors');
      process.exit(1);
    } else {
      console.log('\nReindex completed successfully');
      process.exit(0);
    }
  } catch (error) {
    console.error('Fatal error during reindex:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  reindex().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { reindex, ReindexConfig };
