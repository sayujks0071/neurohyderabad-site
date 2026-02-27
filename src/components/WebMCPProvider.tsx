"use client";

import { useEffect } from "react";
import { CLINIC_INFO } from "@/src/lib/clinic";
import type { BookingData } from "@/packages/appointment-form/types";

// Only run this component in the browser where window.navigator is available
export default function WebMCPProvider() {
  useEffect(() => {
    // Check if the browser supports the WebMCP API
    if (typeof navigator === "undefined" || !navigator.modelContext) {
      console.log("WebMCP API (navigator.modelContext) is not available in this browser.");
      return;
    }

    console.log("WebMCP API detected. Registering tools...");

    // Tool 1: Get Clinic Info
    navigator.modelContext.registerTool({
      name: "get_clinic_info",
      description: "Get the contact details, address, and opening hours of Dr. Sayuj Krishnan's clinic.",
      inputSchema: {
        type: "object",
        properties: {},
      },
      handler: async () => {
        return CLINIC_INFO;
      },
    });

    // Tool 2: Book Appointment
    navigator.modelContext.registerTool({
      name: "book_appointment",
      description: "Book an appointment with Dr. Sayuj Krishnan. Requires patient details.",
      inputSchema: {
        type: "object",
        properties: {
          patientName: {
            type: "string",
            description: "Full name of the patient",
          },
          email: {
            type: "string",
            format: "email",
            description: "Email address for confirmation",
          },
          phone: {
            type: "string",
            description: "10-digit mobile number",
          },
          age: {
            type: "number",
            description: "Age of the patient",
          },
          gender: {
            type: "string",
            enum: ["male", "female", "other"],
            description: "Gender of the patient",
          },
          appointmentDate: {
            type: "string",
            format: "date",
            description: "Preferred date in YYYY-MM-DD format",
          },
          appointmentTime: {
            type: "string",
            description: "Preferred time (e.g., '10:00 AM')",
          },
          reason: {
            type: "string",
            description: "Reason for the visit or chief complaint",
          },
          painScore: {
            type: "number",
            minimum: 1,
            maximum: 10,
            description: "Pain score from 1 (low) to 10 (high)",
          },
          mriScanAvailable: {
            type: "boolean",
            description: "Whether the patient has an MRI scan available",
          },
        },
        required: [
          "patientName",
          "phone",
          "age",
          "gender",
          "appointmentDate",
          "appointmentTime",
          "reason",
          "painScore",
          "mriScanAvailable",
        ],
      },
      handler: async (args: BookingData) => {
        try {
          const response = await fetch("/api/appointments/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-booking-source": "webmcp-agent",
            },
            body: JSON.stringify(args),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to book appointment");
          }

          const result = await response.json();
          return {
            status: "success",
            message: "Appointment request submitted successfully.",
            confirmation: result.confirmationMessage,
          };
        } catch (error) {
          return {
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error occurred",
          };
        }
      },
    });

    console.log("WebMCP tools registered successfully.");
  }, []);

  // This component renders nothing
  return null;
}
