
import { randomUUID } from "crypto";

export interface LeadData {
  requestId?: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  concern?: string;
  preferredDate?: string;
  preferredTime?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export async function submitToGoogleSheets(data: LeadData): Promise<{ success: boolean; message?: string }> {
  const url = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
  const apiToken = process.env.GOOGLE_APPS_SCRIPT_API_TOKEN;

  if (!url) {
    console.warn("GOOGLE_APPS_SCRIPT_WEBAPP_URL not set; skipping Google Sheet submission.");
    return { success: false, message: "Configuration missing" };
  }

  // Ensure requestId exists
  const requestId = data.requestId ?? randomUUID();

  const payload = {
    ...data,
    requestId,
    apiToken, // Authentication
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Apps Script responded with ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    if (!result.ok) {
       throw new Error(`Google Apps Script error: ${result.error}`);
    }

    console.log(`[GoogleSheets] Lead submitted successfully (Request ID: ${requestId})`);
    return { success: true, message: "Lead submitted to Google Sheet" };
  } catch (error) {
    console.error("[GoogleSheets] Failed to submit lead:", error);
    // Don't throw; we want graceful degradation if Sheets is down
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}
