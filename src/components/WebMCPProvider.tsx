"use client";

import { useEffect } from "react";
import { locations } from "@/src/data/locations";

interface Tool {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
  execute: (args: any) => Promise<any>;
}

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.navigator.modelContext) {
      return;
    }

    const tools: Tool[] = [
      {
        name: "get_clinic_info",
        description:
          "Returns the list of clinic locations, addresses, and contact details for Dr. Sayuj Krishnan.",
        parameters: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          return locations;
        },
      },
      {
        name: "book_appointment",
        description:
          "Books an appointment with Dr. Sayuj Krishnan. Requires patient details and preferred time.",
        parameters: {
          type: "object",
          properties: {
            patientName: {
              type: "string",
              description: "Full name of the patient",
            },
            email: {
              type: "string",
              description: "Email address of the patient",
            },
            phone: {
              type: "string",
              description: "Phone number of the patient",
            },
            age: {
              type: "string",
              description: "Age of the patient",
            },
            gender: {
              type: "string",
              enum: ["male", "female", "other"],
              description: "Gender of the patient",
            },
            appointmentDate: {
              type: "string",
              description: "Preferred appointment date (YYYY-MM-DD)",
            },
            appointmentTime: {
              type: "string",
              description: "Preferred appointment time (e.g., 10:00 AM)",
            },
            reason: {
              type: "string",
              description: "Reason for visit or chief complaint",
            },
            painScore: {
              type: "number",
              description: "Pain score from 1 to 10",
            },
            mriScanAvailable: {
              type: "boolean",
              description: "Whether MRI scan reports are available",
            },
          },
          required: [
            "patientName",
            "email",
            "phone",
            "appointmentDate",
            "reason",
          ],
        },
        execute: async (args: any) => {
          try {
            const response = await fetch("/api/workflows/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(args),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.message || `Error: ${response.statusText}`
              );
            }

            return await response.json();
          } catch (error) {
            console.error("Error booking appointment via WebMCP:", error);
            throw error;
          }
        },
      },
    ];

    tools.forEach((tool) => {
      try {
        window.navigator.modelContext.registerTool(tool);
        console.log(`[WebMCP] Registered tool: ${tool.name}`);
      } catch (error) {
        console.error(`[WebMCP] Failed to register tool ${tool.name}:`, error);
      }
    });
  }, []);

  return null;
}
