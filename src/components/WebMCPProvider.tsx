"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locations, CANONICAL_TELEPHONE, YASHODA_MALAKPET_ADDRESS } from "@/src/data/locations";
import { ModelContextTool } from "@/src/types/webmcp";

export default function WebMCPProvider() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !window.navigator.modelContext) {
      return;
    }

    const modelContext = window.navigator.modelContext;

    const tools: ModelContextTool[] = [
      {
        name: "get_clinic_info",
        description: "Get the contact information and address for Dr. Sayuj Krishnan's clinic at Yashoda Hospitals, Malakpet.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: () => {
          return {
            name: "Dr. Sayuj Krishnan - Neurosurgeon",
            hospital: "Yashoda Hospitals, Malakpet",
            address: YASHODA_MALAKPET_ADDRESS,
            phone: CANONICAL_TELEPHONE,
            website: "https://www.drsayuj.info",
          };
        },
        annotations: { readOnlyHint: true },
      },
      {
        name: "book_appointment",
        description: "Navigate to the appointment booking page to schedule a consultation.",
        inputSchema: {
          type: "object",
          properties: {
            reason: {
              type: "string",
              description: "The reason for the appointment (optional).",
            },
          },
        },
        execute: (input: { reason?: string }) => {
          // In a real agent scenario, we might pre-fill the form with 'reason'
          // For now, we just navigate.
          console.log("Agent requested booking with reason:", input.reason);
          router.push("/appointments");
          return { success: true, message: "Navigating to booking page." };
        },
        annotations: { readOnlyHint: false },
      },
      {
        name: "list_locations",
        description: "List all clinic locations where Dr. Sayuj Krishnan is available.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: () => {
          return locations.map((loc) => ({
            name: loc.name,
            area: loc.areaServedName,
            slug: loc.slug,
            address: loc.address,
          }));
        },
        annotations: { readOnlyHint: true },
      },
      {
        name: "get_services",
        description: "List the main neurosurgical services provided.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: () => {
          // Extracted from common services
          return [
            "Endoscopic Spine Surgery",
            "Brain Tumor Surgery",
            "Minimally Invasive Spine Surgery",
            "Microdiscectomy",
            "Spinal Fusion Surgery",
            "Scoliosis Correction",
          ];
        },
        annotations: { readOnlyHint: true },
      },
    ];

    // Register tools
    tools.forEach((tool) => {
      try {
        modelContext.registerTool(tool);
        console.log(`[WebMCP] Registered tool: ${tool.name}`);
      } catch (error) {
        console.error(`[WebMCP] Failed to register tool ${tool.name}:`, error);
      }
    });

    // Cleanup on unmount
    return () => {
      tools.forEach((tool) => {
        try {
          modelContext.unregisterTool(tool.name);
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
    };
  }, [router]);

  return null; // This component renders nothing
}
