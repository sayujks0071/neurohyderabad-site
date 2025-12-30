import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Cron endpoint for nightly RAG reindexing
 * 
 * Schedule: Daily at 06:30 IST (01:00 UTC)
 * 
 * Vercel Cron config:
 * {
 *   "crons": [{
 *     "path": "/api/cron/reindex-rag",
 *     "schedule": "0 1 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  // Vercel cron requests include this header automatically
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  
  // For manual triggers, allow if CRON_SECRET is set and matches
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  
  if (!isVercelCron) {
    // Manual trigger - check secret if configured
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized. Use Vercel cron or provide CRON_SECRET.' },
        { status: 401 }
      );
    }
  }

  try {
    console.log('🔄 Starting RAG reindex cron job...');
    
      // Run reindex script (uses ts-node shebang)
      const { stdout, stderr } = await execAsync('npx ts-node scripts/reindex-gemini-rag.ts', {
      cwd: process.cwd(),
      env: {
        ...process.env,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        GEMINI_FILE_SEARCH_STORE_NAME: process.env.GEMINI_FILE_SEARCH_STORE_NAME,
      },
      timeout: 600000, // 10 minutes timeout
    });

    if (stderr) {
      console.error('Reindex stderr:', stderr);
    }

    console.log('✅ RAG reindex completed');
    console.log('Output:', stdout);

    return NextResponse.json({
      success: true,
      message: 'RAG reindex completed',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ RAG reindex failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}

