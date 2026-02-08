import { NextResponse } from "next/server";
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { rateLimit } from "../../../src/lib/rate-limit";
import { getClient, extractText } from "../../../lib/gemini";

// TODO: Migrate to Codex CLI/AI Gateway for standardized auth and monitoring.
const SYSTEM_INSTRUCTION = `You are the NeuroLink Assistant for Dr. Sayuj, a world-class neurosurgeon.
Your goal is to answer questions professionally using the provided Google Search tool for accuracy.
- If asked about recent neurosurgery news, clinic location, or Dr. Sayuj's bio, use Google Search.
- Provide information about procedures (Microdiscectomy, Craniotomy).
- NEVER provide a definitive medical diagnosis.
- If you use Google Search grounding, inform the user you have retrieved the latest web data.
- If emergency symptoms are mentioned, tell them to seek immediate emergency care (ER).`;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  // Rate Limiting: 20 requests per minute per IP
  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  const limit = rateLimit(ip, 20, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.reset - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(limit.limit),
          "X-RateLimit-Remaining": String(limit.remaining),
          "X-RateLimit-Reset": String(limit.reset)
        }
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonError("Invalid JSON payload", 400);
  }

  const action = String(body.action || "");
  console.log(`[Neuralink API] Action: ${action}`);
  if (!action) {
    return jsonError("Missing action", 400);
  }

  try {
    const ai = getClient();
    console.log(`[Neuralink API] AI Client initialized`);

    switch (action) {
      case "triage": {
        const symptoms = String(body.symptoms || "").trim();
        const age = Number(body.age || 0);
        const gender = String(body.gender || "").trim();

        if (!symptoms || !Number.isFinite(age) || !gender) {
          return jsonError("Missing triage inputs", 400);
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{ role: "user", parts: [{ text: `Perform a preliminary neurosurgical triage for a ${age}-year-old ${gender} patient with these symptoms: "${symptoms}". Provide a concise professional summary, identify potential neurosurgical concerns as a list of points, and suggest a priority level (LOW, MEDIUM, HIGH, URGENT). Note: This is for doctor assistance, not a diagnosis.` }] }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                suggestedPriority: {
                  type: Type.STRING,
                  description: "One of: LOW, MEDIUM, HIGH, URGENT",
                },
                keyConcerns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["summary", "suggestedPriority", "keyConcerns"],
            },
          },
        });

        const parsed = JSON.parse(extractText(response));
        return NextResponse.json(parsed);
      }

      case "refineSymptoms": {
        const input = String(body.input || "").trim();
        if (!input) {
          return jsonError("Missing symptoms input", 400);
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{
            role: "user", parts: [{
              text: `The following is a patient's draft description of their symptoms: "${input}".
Help them refine it by providing a more structured, clinical, but easy-to-read version.
Ask 2-3 clarifying questions that a neurosurgeon would find helpful (e.g., about radiculopathy, bowel/bladder control, or specific pain triggers).
Return JSON format.` }]
          }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                refinedText: { type: Type.STRING },
                clarifyingQuestions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["refinedText", "clarifyingQuestions"],
            },
          },
        });

        const parsed = JSON.parse(extractText(response));
        return NextResponse.json(parsed);
      }

      case "interpretReport": {
        const reportText = String(body.reportText || "").trim();
        if (!reportText) {
          return jsonError("Missing report text", 400);
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{
            role: "user", parts: [{
              text: `Analyze this neurosurgical report excerpt: "${reportText}".
Translate the complex medical jargon into plain English for a patient.
Identify 3 key takeaway points.
Emphasize that this is an AI interpretation and they must discuss with Dr. Sayuj.` }]
          }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                plainEnglishSummary: { type: Type.STRING },
                keyTakeaways: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["plainEnglishSummary", "keyTakeaways"],
            },
          },
        });

        const parsed = JSON.parse(extractText(response));
        return NextResponse.json(parsed);
      }

      case "searchCenters": {
        const query = String(body.query || "").trim();
        const latitude =
          typeof body.latitude === "number" ? body.latitude : undefined;
        const longitude =
          typeof body.longitude === "number" ? body.longitude : undefined;

        if (!query) {
          return jsonError("Missing search query", 400);
        }

        const config: any = { tools: [{ googleMaps: {} }] };
        if (latitude !== undefined && longitude !== undefined) {
          config.toolConfig = {
            retrievalConfig: {
              latLng: { latitude, longitude },
            },
          };
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{ role: "user", parts: [{ text: query }] }],
          config,
        });

        return NextResponse.json({
          text: extractText(response),
          grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
        });
      }

      case "chat": {
        const message = String(body.message || "").trim();
        const history = Array.isArray(body.history) ? body.history : [];

        if (!message) {
          return jsonError("Missing chat message", 400);
        }

        const contents = history
          .filter((item: any) => item && typeof item.text === "string")
          .map((item: any) => ({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: String(item.text) }],
          }));

        contents.push({ role: "user", parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        return NextResponse.json({
          text: extractText(response),
          sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
        });
      }

      case "speech": {
        const text = String(body.text || "").trim();
        const voiceName = String(body.voiceName || "Kore").trim();
        if (!text) {
          return jsonError("Missing speech text", 400);
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{ parts: [{ text: `Read the following clearly and professionally: ${text}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        console.log(`[Neuralink API] Speech response candidates:`, response.candidates?.length);

        const base64 =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;

        return NextResponse.json({ audio: base64 });
      }

      default:
        return jsonError("Unsupported action", 400);
    }
  } catch (error) {
    console.error("[Neuralink API] Error:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
