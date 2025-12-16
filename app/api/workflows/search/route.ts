/**
 * Patient Search Workflow API Route
 *
 * Triggers the patient search workflow
 */

import { start } from "workflow/api";
import { handlePatientSearch } from "@/workflows/patient-search";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, userContext } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    console.log(`[API] Starting patient search workflow for query: "${query}"`);

    // Start the workflow (executes asynchronously)
    const result = await start(handlePatientSearch, [query, userContext]);

    return NextResponse.json({
      message: "Search workflow started successfully",
      workflowId: result.id,
      query,
      status: "processing",
    });
  } catch (error) {
    console.error("[API] Error starting search workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to start search workflow",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
