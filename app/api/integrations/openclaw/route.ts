import { NextRequest, NextResponse } from "next/server";
import { db, appointments, patients } from "@/src/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Auth Check
  const apiKey = request.headers.get("x-api-key") || request.headers.get("authorization")?.replace("Bearer ", "");

  if (!process.env.OPENCLAW_API_KEY) {
      console.warn("[OpenClaw] OPENCLAW_API_KEY not set in environment");
      return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
  }

  if (apiKey !== process.env.OPENCLAW_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const tool = searchParams.get("tool");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const query = searchParams.get("query") || "";

  try {
    switch (tool) {
      case "dashboard": {
        const stats = await appointments.getStats();
        return NextResponse.json({
          tool: "dashboard",
          stats
        });
      }

      case "appointments": {
        const recent = await appointments.getRecent(limit);
        return NextResponse.json({
          tool: "appointments",
          data: recent
        });
      }

      case "patients": {
        if (!query) {
           return NextResponse.json({ error: "Query parameter required for patients tool" }, { status: 400 });
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query);

        if (isEmail) {
          const patientData = await patients.findByEmail(query);
          return NextResponse.json({
             tool: "patients",
             searchType: "email",
             data: patientData ? [patientData] : []
          });
        } else {
          // Name search using raw query
          const rows = await db.queryRows(
            "SELECT * FROM patients WHERE name ILIKE $1 LIMIT $2",
            [`%${query}%`, limit]
          );
           return NextResponse.json({
             tool: "patients",
             searchType: "name",
             data: rows
          });
        }
      }

      default:
        return NextResponse.json({
          error: "Invalid tool. Available: dashboard, appointments, patients",
          usage: "GET /api/integrations/openclaw?tool=<name>&query=<...>&limit=<...>"
        }, { status: 400 });
    }
  } catch (error) {
    console.error("[OpenClaw] API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown" }, { status: 500 });
  }
}
