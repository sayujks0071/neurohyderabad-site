/**
 * GET /api/redis-test
 * 
 * Diagnostic endpoint to verify Redis connectivity.
 * Uses the established connection pool from src/lib/patient-kv.ts.
 */

import { NextResponse } from "next/server";
import { getRedis } from "@/src/lib/patient-kv";

export const runtime = "nodejs";

export async function GET() {
  try {
    const redis = getRedis();

    if (!redis) {
      return NextResponse.json(
        { error: "Redis connection not initialized. Check REDIS_URL or openclaw_REDIS_URL environment variables." },
        { status: 500 }
      );
    }

    // Try to fetch a test key
    const value = await redis.get("myKey");

    return NextResponse.json({ 
      success: true,
      value: value ?? "null (key does not exist)",
      status: "connected"
    });
  } catch (error) {
    console.error("[Redis Test API] Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Redis", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
