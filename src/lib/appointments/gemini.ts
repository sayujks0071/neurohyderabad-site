import { generateText } from "ai";
import { getTextModel } from "@/src/lib/ai/gateway";
import type { BookingData } from "@/packages/appointment-form/types";
import { APPOINTMENT_SUCCESS_MESSAGE } from "@/packages/appointment-form/constants";

// Explicitly use Google's Gemini Flash model via Vercel AI Gateway
// Format: provider/model (e.g. google/gemini-2.0-flash)
const MODEL_NAME = "google/gemini-2.0-flash";

const systemInstruction = `You are a friendly and professional medical receptionist for Dr. Sayuj Krishnan, a neurosurgeon.
Your task is to generate a concise, warm, and reassuring confirmation message for an online appointment request based on the patient details provided.

The message must follow these rules:
1. Confirm receipt of the appointment request for the patient.
2. Mention the requested date and time.
3. State clear next steps: the office will call shortly to confirm the final appointment details and provide any instructions.
4. Remind the patient to bring any MRI/CT scans with them.
5. Do not add any greeting such as "Dear [Patient Name]". Start the message directly.
6. Keep the entire message under 50 words.`;

const fallbackMessage = (data: BookingData) => APPOINTMENT_SUCCESS_MESSAGE;

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
  try {
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

    const { text } = await generateText({
      model: getTextModel(MODEL_NAME),
      system: systemInstruction,
      prompt: userPrompt,
    });

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
