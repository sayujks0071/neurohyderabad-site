import type { BookingData, EmailResult } from "@/packages/appointment-form/types";

interface AppointmentWebhookPayload {
  booking: BookingData;
  confirmationMessage: string;
  emailResult: EmailResult;
  usedAI: boolean;
  triggeredAt: string;
  source: "website" | "embedded-form";
}

function parseWebhookUrls(): string[] {
  const raw = process.env.APPOINTMENT_WEBHOOK_URLS ?? "";
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function notifyAppointmentWebhooks(
  payload: AppointmentWebhookPayload
): Promise<void> {
  const urls = parseWebhookUrls();
  if (!urls.length) return;

  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error(
            `[appointments-webhook] ${url} responded with ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          `[appointments-webhook] Failed to call ${url}:`,
          error
        );
      }
    })
  );
}

export function buildWebhookPayload(options: {
  booking: BookingData;
  confirmationMessage: string;
  emailResult: EmailResult;
  usedAI: boolean;
  source?: string | null;
}): AppointmentWebhookPayload {
  const { booking, confirmationMessage, emailResult, usedAI, source } =
    options;

  return {
    booking,
    confirmationMessage,
    emailResult,
    usedAI,
    triggeredAt: new Date().toISOString(),
    source: source === "embedded" ? "embedded-form" : "website",
  };
}
