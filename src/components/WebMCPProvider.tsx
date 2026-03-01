"use client";

import { useEffect } from "react";
import { CLINIC } from "@/app/_lib/clinic";
import { ModelContextTool } from "@/src/types/webmcp";

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.navigator.modelContext) {
      return;
    }

    const modelContext = window.navigator.modelContext;

    const tools: ModelContextTool[] = [
      {
        name: "get_clinic_info",
        description: "Returns the location, address, and contact details for Dr. Sayuj Krishnan.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          return {
            clinic: "Dr. Sayuj Krishnan | Yashoda Hospitals, Malakpet",
            address: `${CLINIC.street}, ${CLINIC.city}, ${CLINIC.region} ${CLINIC.postalCode}`,
            phone: CLINIC.phone,
            phoneHuman: CLINIC.phoneHuman,
            email: CLINIC.email,
          };
        },
        annotations: { readOnlyHint: true },
      },
      {
        name: "book_appointment",
        description: "Books an appointment for a patient consultation. Provide the patient's name, email, phone, age, gender, preferredDate, preferredTime, chiefComplaint.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Patient's full name" },
            email: { type: "string", description: "Patient's email address" },
            phone: { type: "string", description: "Patient's phone number" },
            age: { type: "string", description: "Patient's age" },
            gender: { type: "string", enum: ["male", "female", "other"], description: "Patient's gender" },
            preferredDate: { type: "string", description: "Preferred date for the appointment in YYYY-MM-DD format" },
            preferredTime: { type: "string", description: "Preferred time for the appointment" },
            appointmentType: { type: "string", enum: ["new-consultation", "follow-up", "second-opinion"], description: "Type of appointment" },
            chiefComplaint: { type: "string", description: "Patient's symptoms or chief complaint" },
            painScore: { type: "number", description: "Current pain score from 1 to 10" },
            mriScanAvailable: { type: "boolean", description: "Whether the patient has recent MRI/CT scan reports available" },
          },
          required: ["name", "phone", "preferredDate", "preferredTime", "chiefComplaint"]
        },
        execute: async (input) => {
          try {
            const response = await fetch("/api/workflows/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-booking-source": "webmcp",
              },
              body: JSON.stringify({
                name: input.name || "",
                email: input.email || "",
                phone: input.phone || "",
                age: input.age || "",
                gender: input.gender || "other",
                preferredDate: input.preferredDate || "",
                preferredTime: input.preferredTime || "",
                appointmentType: input.appointmentType || "new-consultation",
                chiefComplaint: input.chiefComplaint || "",
                intakeNotes: `Appointment Type: ${input.appointmentType || "new-consultation"}\nPreferred Date: ${input.preferredDate || ""}\nPreferred Time: ${input.preferredTime || ""}\nSymptoms: ${input.chiefComplaint || ""}\nPain Score: ${input.painScore || 5}/10\nMRI Available: ${input.mriScanAvailable ? "Yes" : "No"}\nBooked via WebMCP.`,
                painScore: input.painScore || 5,
                mriScanAvailable: input.mriScanAvailable || false,
                source: "webmcp",
              }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => null);
              throw new Error(errorData?.error || `Error: ${response.statusText}`);
            }

            return await response.json();
          } catch (error) {
            console.error("Error booking appointment via WebMCP:", error);
            throw error;
          }
        },
      }
    ];

    tools.forEach((tool) => {
      try {
        modelContext.registerTool(tool);
        console.log(`[WebMCP] Registered tool: ${tool.name}`);
      } catch (error) {
        console.error(`[WebMCP] Failed to register tool ${tool.name}:`, error);
      }
    });

    return () => {
      tools.forEach((tool) => {
        try {
          modelContext.unregisterTool(tool.name);
        } catch (e) {
          // Ignore errors
        }
      });
    };
  }, []);

  return null;
}
