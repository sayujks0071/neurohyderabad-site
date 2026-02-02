import { NextRequest, NextResponse } from "next/server";
import { locations } from "@/src/data/locations";
import { CONDITION_RESOURCES } from "@/src/data/conditionsIndex";

const API_KEY = process.env.OPENCLAW_API_KEY;

function isAuthenticated(req: NextRequest): boolean {
  if (!API_KEY) return false;
  const authHeader = req.headers.get("authorization");
  const apiKeyHeader = req.headers.get("x-api-key");

  if (apiKeyHeader === API_KEY) return true;
  if (authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1] === API_KEY) return true;

  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized. Set OPENCLAW_API_KEY env var and provide it in headers." }, { status: 401 });
  }

  const clinicData = {
    metadata: {
        description: "Clinic data for Dr. Sayuj Krishnan - Neurosurgeon",
        generatedAt: new Date().toISOString()
    },
    locations: locations.map(loc => ({
      name: loc.name,
      address: loc.address,
      phone: loc.telephone,
      whatsapp: loc.whatsapp,
      mapLink: loc.google_maps_place_url,
      slug: loc.slug,
      directions: loc.directions_url
    })),
    conditions: CONDITION_RESOURCES.map(c => ({
      name: c.name,
      slug: c.slug,
      summary: c.summary,
      symptoms: c.symptomHighlights,
      treatment: c.treatmentHighlights,
      faq: c.faq
    }))
  };

  return NextResponse.json(clinicData);
}
