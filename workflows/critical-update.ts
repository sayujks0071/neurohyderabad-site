/**
 * Critical Update Workflow with Rollback Support
 *
 * For operations that modify data and need rollback on failure
 * Uses saga pattern for distributed transactions
 */

import { FatalError, RetryableError, getStepMetadata } from "workflow";

interface UpdateResult {
  runId: string;
  status: "success" | "failed" | "rolled_back";
  steps: {
    name: string;
    status: "completed" | "failed" | "rolled_back";
    duration: number;
  }[];
  error?: string;
}

/**
 * Critical content update with automatic rollback
 * Example: Updating multiple related pages atomically
 */
export async function criticalContentUpdate(
  updates: Array<{ path: string; content: string }>
): Promise<UpdateResult> {
  "use workflow";

  const runId = `critical-${Date.now()}`;
  console.log(`[Critical Update] Starting ${runId} with ${updates.length} updates`);

  const steps: UpdateResult["steps"] = [];
  const rollbacks: Array<() => Promise<void>> = [];
  const originalContent: Map<string, string> = new Map();

  try {
    // Step 1: Backup original content
    for (const update of updates) {
      const start = Date.now();
      const original = await backupContent(update.path);
      originalContent.set(update.path, original);
      steps.push({
        name: `Backup ${update.path}`,
        status: "completed",
        duration: Date.now() - start,
      });
    }

    // Step 2: Apply updates with rollback registration
    for (const update of updates) {
      const start = Date.now();
      
      await applyContentUpdate(update.path, update.content);
      
      // Register rollback for this update
      const original = originalContent.get(update.path)!;
      rollbacks.push(async () => {
        await rollbackContent(update.path, original);
      });
      
      steps.push({
        name: `Update ${update.path}`,
        status: "completed",
        duration: Date.now() - start,
      });
    }

    // Step 3: Validate all updates
    const start = Date.now();
    await validateUpdates(updates.map(u => u.path));
    steps.push({
      name: "Validate updates",
      status: "completed",
      duration: Date.now() - start,
    });

    // Step 4: Invalidate cache
    await invalidateCache(updates.map(u => u.path));
    steps.push({
      name: "Invalidate cache",
      status: "completed",
      duration: 0,
    });

    console.log(`[Critical Update] Completed ${runId} successfully`);
    return { runId, status: "success", steps };

  } catch (error) {
    console.error(`[Critical Update] Error in ${runId}, rolling back...`, error);

    // Execute rollbacks in reverse order
    for (const rollback of rollbacks.reverse()) {
      try {
        const start = Date.now();
        await rollback();
        steps.push({
          name: "Rollback",
          status: "rolled_back",
          duration: Date.now() - start,
        });
      } catch (rollbackError) {
        console.error(`[Critical Update] Rollback failed:`, rollbackError);
        steps.push({
          name: "Rollback",
          status: "failed",
          duration: 0,
        });
      }
    }

    return {
      runId,
      status: "rolled_back",
      steps,
      error: String(error),
    };
  }
}

/**
 * Step: Backup content before modification
 */
async function backupContent(path: string): Promise<string> {
  "use step";
  
  const metadata = getStepMetadata();
  console.log(`[Critical Update] Backing up ${path} (attempt ${metadata.attempt + 1})`);
  
  try {
    // In production, would fetch current content from CMS/DB
    const response = await fetch(`https://www.drsayuj.info${path}`, {
      method: "GET",
      headers: { "User-Agent": "DrSayuj-Backup/1.0" },
    });
    
    if (!response.ok) {
      if (response.status >= 500) {
        throw new RetryableError(`Server error backing up ${path}`, {
          retryAfter: (metadata.attempt ** 2) * 2000,
        });
      }
      throw new FatalError(`Cannot backup ${path}: HTTP ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    if (error instanceof FatalError || error instanceof RetryableError) {
      throw error;
    }
    throw new RetryableError(`Backup failed for ${path}: ${error}`, {
      retryAfter: 3000,
    });
  }
}
backupContent.maxRetries = 3;

/**
 * Step: Apply content update
 */
async function applyContentUpdate(path: string, content: string): Promise<void> {
  "use step";
  
  const metadata = getStepMetadata();
  console.log(`[Critical Update] Updating ${path} (attempt ${metadata.attempt + 1})`);
  
  // In production, would update CMS/DB
  // Simulate update with validation
  if (!content || content.length < 10) {
    throw new FatalError(`Invalid content for ${path}: too short`);
  }
  
  console.log(`[Critical Update] Updated ${path} (${content.length} chars)`);
}
applyContentUpdate.maxRetries = 2;

/**
 * Step: Rollback content to original
 */
async function rollbackContent(path: string, original: string): Promise<void> {
  "use step";
  
  const metadata = getStepMetadata();
  console.log(`[Critical Update] Rolling back ${path} (attempt ${metadata.attempt + 1})`);
  
  // In production, would restore original content
  // This step MUST be idempotent - safe to run multiple times
  console.log(`[Critical Update] Restored ${path} to original (${original.length} chars)`);
}
rollbackContent.maxRetries = 5; // More retries for rollback - critical to succeed

/**
 * Step: Validate updates were applied correctly
 */
async function validateUpdates(paths: string[]): Promise<void> {
  "use step";
  
  const metadata = getStepMetadata();
  console.log(`[Critical Update] Validating ${paths.length} updates (attempt ${metadata.attempt + 1})`);
  
  // In production, would verify content was updated correctly
  for (const path of paths) {
    // Simulate validation
    console.log(`[Critical Update] Validated ${path}`);
  }
}
validateUpdates.maxRetries = 2;

/**
 * Step: Invalidate CDN/cache for updated paths
 */
async function invalidateCache(paths: string[]): Promise<void> {
  "use step";
  
  const metadata = getStepMetadata();
  console.log(`[Critical Update] Invalidating cache for ${paths.length} paths`);
  
  // In production, would call Vercel/CDN purge API
  // This is idempotent - safe to retry
  try {
    // Simulate cache invalidation
    for (const path of paths) {
      console.log(`[Critical Update] Cache invalidated: ${path}`);
    }
  } catch (error) {
    // Cache invalidation failure is not fatal - content will eventually refresh
    console.warn(`[Critical Update] Cache invalidation failed, will expire naturally:`, error);
  }
}
invalidateCache.maxRetries = 3;

/**
 * Schema migration with rollback
 * For database/content schema changes
 */
export async function schemaMigration(
  migrationId: string,
  forward: () => Promise<void>,
  backward: () => Promise<void>
): Promise<{ success: boolean; rolledBack: boolean }> {
  "use workflow";

  console.log(`[Schema Migration] Starting ${migrationId}`);
  
  let rolledBack = false;

  try {
    // Run forward migration
    await runMigrationStep(migrationId, "forward", forward);
    
    // Validate migration
    await validateMigration(migrationId);
    
    console.log(`[Schema Migration] Completed ${migrationId}`);
    return { success: true, rolledBack: false };
    
  } catch (error) {
    console.error(`[Schema Migration] Failed ${migrationId}, rolling back...`, error);
    
    try {
      await runMigrationStep(migrationId, "backward", backward);
      rolledBack = true;
    } catch (rollbackError) {
      console.error(`[Schema Migration] Rollback failed:`, rollbackError);
      throw new FatalError(
        `Migration ${migrationId} failed and rollback failed: ${rollbackError}`
      );
    }
    
    return { success: false, rolledBack };
  }
}

async function runMigrationStep(
  migrationId: string,
  direction: "forward" | "backward",
  fn: () => Promise<void>
): Promise<void> {
  "use step";
  
  const metadata = getStepMetadata();
  console.log(`[Schema Migration] Running ${direction} for ${migrationId} (attempt ${metadata.attempt + 1})`);
  
  await fn();
}
runMigrationStep.maxRetries = 3;

async function validateMigration(migrationId: string): Promise<void> {
  "use step";
  
  console.log(`[Schema Migration] Validating ${migrationId}`);
  // In production, would run validation queries/checks
}
validateMigration.maxRetries = 2;
