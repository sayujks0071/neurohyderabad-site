/**
 * Resume Stream API
 * 
 * Resume a workflow stream from a specific point
 * Useful for reconnecting after network interruptions
 */

import { getRun } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/workflows/stream/resume/[runId]?startIndex=N&namespace=name
 * 
 * Resume a stream from a specific chunk index
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId } = await params;
    const { searchParams } = new URL(request.url);
    
    // Get optional parameters
    const startIndexParam = searchParams.get("startIndex");
    const namespace = searchParams.get("namespace") || undefined;
    
    const startIndex = startIndexParam ? parseInt(startIndexParam, 10) : undefined;

    if (startIndex !== undefined && isNaN(startIndex)) {
      return NextResponse.json(
        { error: "startIndex must be a number" },
        { status: 400 }
      );
    }

    // Retrieve the run
    const run = getRun(runId);

    // Check run status
    const status = await run.status;
    
    if (status === "failed") {
      return NextResponse.json(
        { error: "Workflow run failed", runId, status },
        { status: 410 } // Gone
      );
    }

    // Get the readable stream from the specified point
    const stream = run.getReadable({ 
      startIndex,
      namespace,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "X-Run-Id": runId,
        "X-Run-Status": status,
        "X-Start-Index": String(startIndex ?? 0),
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Resume Stream API] Error:", error);
    return NextResponse.json(
      { error: "Failed to resume stream", details: String(error) },
      { status: 500 }
    );
  }
}
