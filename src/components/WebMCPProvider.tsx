"use client";

import { useEffect } from "react";
import {
  YASHODA_MALAKPET_ADDRESS,
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  YASHODA_GEO
} from "../data/locations";

// Assuming we need to extend Window interface
declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: {
        name: string;
        description: string;
        parameters: any; // Using any for simplicity as I don't know the exact schema yet
        execute: (args: any) => Promise<any>;
      }) => void;
    };
  }
}

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the modelContext API is available
    if (!window.navigator.modelContext) {
      console.warn("WebMCP: window.navigator.modelContext is not available.");
      return;
    }

    const formattedAddress = `${YASHODA_MALAKPET_ADDRESS.streetAddress}, ${YASHODA_MALAKPET_ADDRESS.addressLocality}, ${YASHODA_MALAKPET_ADDRESS.addressRegion} ${YASHODA_MALAKPET_ADDRESS.postalCode}`;

    const tools = [
      {
        name: "get_clinic_info",
        description: "Returns information about the clinic, including address, contact details, and operating hours.",
        parameters: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          return {
            name: CANONICAL_PHYSICIAN_NAME,
            location: formattedAddress,
            coordinates: { lat: YASHODA_GEO.latitude, lng: YASHODA_GEO.longitude },
            hours: "Monday – Saturday: 10:00 AM – 1:00 PM & 5:00 PM – 7:30 PM IST. Sunday: Closed.",
            contact: CANONICAL_TELEPHONE,
            email: "hellodr@drsayuj.info",
            services: ["Endoscopic Spine Surgery", "Brain Tumor Surgery", "Minimally Invasive Spine Surgery"],
          };
        },
      },
      {
        name: "book_appointment",
        description: "Initiates the appointment booking process.",
        parameters: {
          type: "object",
          properties: {
             reason: { type: "string", description: "Reason for visit" }
          },
        },
        execute: async ({ reason }: { reason?: string }) => {
            // In a real scenario, this might open a modal or navigate to booking page with pre-filled data
            // For now, we can redirect to the appointment page
            window.location.href = `/appointments?reason=${encodeURIComponent(reason || '')}`;
            return { success: true, message: "Redirecting to appointment booking page..." };
        }
      }
    ];

    tools.forEach(tool => {
      try {
        window.navigator.modelContext?.registerTool(tool);
        console.log(`WebMCP: Registered tool ${tool.name}`);
      } catch (e) {
        console.error(`WebMCP: Failed to register tool ${tool.name}`, e);
      }
    });

  }, []);

  return null;
}
