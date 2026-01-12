export interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

interface ChatResponse {
  text: string;
  sources?: any[];
}

async function postAction<T>(payload: Record<string, unknown>): Promise<T> {
  const response = await fetch("/api/neuralink", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    const errorMessage =
      errorPayload?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}

export async function analyzeSymptoms(
  symptoms: string,
  age: number,
  gender: string
) {
  try {
    return await postAction<{
      summary: string;
      suggestedPriority: string;
      keyConcerns: string[];
    }>({
      action: "triage",
      symptoms,
      age,
      gender,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      summary: "AI Triage currently unavailable. Please review manually.",
      suggestedPriority: "MEDIUM",
      keyConcerns: ["System connectivity issues", "Manual review required"],
    };
  }
}

export async function refineSymptomDescription(currentInput: string) {
  try {
    return await postAction<{
      refinedText: string;
      clarifyingQuestions: string[];
    }>({
      action: "refineSymptoms",
      input: currentInput,
    });
  } catch (error) {
    console.error("Refine Symptoms Error:", error);
    return null;
  }
}

export async function interpretReport(reportText: string) {
  try {
    return await postAction<{
      plainEnglishSummary: string;
      keyTakeaways: string[];
    }>({
      action: "interpretReport",
      reportText,
    });
  } catch (error) {
    console.error("Interpret Report Error:", error);
    return null;
  }
}

export async function searchNearbyCenters(
  query: string,
  latitude?: number,
  longitude?: number
) {
  try {
    return await postAction<{ text: string; grounding: any[] }>({
      action: "searchCenters",
      query,
      latitude,
      longitude,
    });
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    throw error;
  }
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<ChatResponse> {
  return postAction<ChatResponse>({
    action: "chat",
    message,
    history,
  });
}

export async function generateSpeech(text: string, voiceName = "Kore") {
  try {
    const result = await postAction<{ audio: string | null }>({
      action: "speech",
      text,
      voiceName,
    });
    return result.audio;
  } catch (error) {
    console.error("Speech Generation Error:", error);
    return null;
  }
}
