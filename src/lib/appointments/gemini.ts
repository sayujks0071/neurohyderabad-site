import { GoogleGenAI } from "@google/genai";
import type { BookingData } from "@/packages/appointment-form/types";
import { sanitizeForPrompt } from "@/src/lib/validation";

const MODEL_NAME = "gemini-2.5-flash";

const systemInstruction = `You are a friendly and professional medical receptionist for Dr. Sayuj Krishnan, a neurosurgeon.
Your task is to generate a concise, warm, and reassuring confirmation message for an online appointment request based on the patient details provided.

The message must follow these rules:
1. Confirm receipt of the appointment request for the patient.
2. Mention the requested date and time.
3. State clear next steps: the office will call shortly to confirm the final appointment details and provide any instructions.
4. Do not add any greeting such as "Dear [Patient Name]". Start the message directly.
5. Keep the entire message under 50 words.`;

const fallbackMessage = (data: BookingData) =>
  `Thank you for your request for an appointment on ${data.appointmentDate} at ${data.appointmentTime}. We have received your details and our team will contact you shortly to confirm the appointment.`;

// 🛡️ Sentinel: Sanitize input to prevent prompt injection and token exhaustion
function sanitizeForPrompt(text: string | number | undefined | null, maxLength = 500): string {
  if (text === null || text === undefined) return "";
  const str = String(text);
  // Remove control characters (including newlines) to prevent structure injection
  // and truncate to prevent token exhaustion
  return str.replace(/[\x00-\x1F\x7F]/g, " ").trim().substring(0, maxLength);
}

export async function generateBookingConfirmation(
  data: BookingData
): Promise<{ message: string; usedAI: boolean }> {
  const apiKey =
    process.env.GOOGLE_GENAI_API_KEY ??
    process.env.GENAI_API_KEY ??
    process.env.API_KEY;

  if (!apiKey) {
    console.warn(
      "[appointments] Missing Google GenAI API key; returning fallback confirmation message."
    );
    return { message: fallbackMessage(data), usedAI: false };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // 🛡️ Sentinel: Sanitize inputs to prevent prompt injection
    const userPrompt = [
      "Generate a confirmation message for the following appointment request:",
      "",
      `Patient Name: ${sanitizeForPrompt(data.patientName, 100)}`,
      `Age: ${sanitizeForPrompt(data.age, 10)}`,
      `Gender: ${sanitizeForPrompt(data.gender, 20)}`,
      `Requested Date: ${sanitizeForPrompt(data.appointmentDate, 20)}`,
      `Requested Time: ${sanitizeForPrompt(data.appointmentTime, 20)}`,
      `Reason: ${sanitizeForPrompt(data.reason, 1000)}`,
    ].join("\n");

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
      config: {
        systemInstruction,
      },
    });

    let text: string | undefined;

    const responseText = (response as { text?: unknown }).text;

    if (typeof responseText === "function") {
      text = (responseText as () => string)();
    } else if (typeof responseText === "string") {
      text = responseText;
    } else if ("output" in response && Array.isArray(response.output)) {
      text =
        response.output
          .flatMap((it: any) => it?.content ?? [])
          .map((it: any) => it?.text)
          .find((segment: unknown): segment is string => typeof segment === "string") ??
        undefined;
    }

    if (!text || !text.trim()) {
      console.warn(
        "[appointments] Gemini response empty; falling back to static confirmation."
      );
      return { message: fallbackMessage(data), usedAI: false };
    }

    return { message: text.trim(), usedAI: true };
  } catch (error) {
    console.error(
      "[appointments] Error generating booking confirmation:",
      error
    );
    return { message: fallbackMessage(data), usedAI: false };
  }
}
