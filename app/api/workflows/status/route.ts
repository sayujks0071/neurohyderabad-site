/**
 * Workflow Status API
 * 
 * Check status of running workflows
 */

import { getRun } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/workflows/status?runId=xxx
 * 
 * Get status of a specific workflow run
 */
export async function GET(request: NextRequest) {
  const runId = request.nextUrl.searchParams.get("runId");

  if (!runId) {
    return NextResponse.json(
      { 
        error: "runId parameter is required",
        usage: "GET /api/workflows/status?runId=your-run-id"
      },
      { status: 400 }
    );
  }

  try {
    // Retrieve the existing run
    const run = getRun(runId);

    // Check its status
    const status = await run.status;

    if (status === "completed") {
      const result = await run.returnValue;
      return NextResponse.json({
        runId,
        status,
        completed: true,
        result,
      });
    }

    if (status === "failed") {
      return NextResponse.json({
        runId,
        status,
        completed: true,
        error: "Workflow execution failed",
      });
    }

    // Still running
    return NextResponse.json({
      runId,
      status,
      completed: false,
      message: "Workflow is still running",
    });
  } catch (error) {
    console.error("[Workflow Status API] Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to get workflow status",
        runId,
        details: String(error)
      },
      { status: 500 }
    );
  }
}
