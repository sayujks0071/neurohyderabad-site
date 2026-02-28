'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function WebMCPProvider() {
  useEffect(() => {
    // We register tools after the polyfill script loads and initializes window.navigator.modelContext
    const registerWebMCPTools = () => {
      if (typeof window === 'undefined' || !window.navigator || !(window.navigator as any).modelContext) {
        return;
      }

      const modelContext = (window.navigator as any).modelContext;

      // Tool 1: Get Clinic Information
      modelContext.registerTool({
        name: 'get_clinic_info',
        description: 'Get basic information about Dr. Sayuj Krishnan and the clinic (address, phone, hours).',
        inputSchema: {
          type: 'object',
          properties: {}
        },
        async execute() {
          return {
            content: [{
              type: 'text',
              text: `Dr. Sayuj Krishnan - Neurosurgeon & Endoscopic Spine Specialist
Location: Yashoda Hospital, Malakpet, Hyderabad, Telangana 500036
Phone: +91 80088 84080
Hours: Monday to Saturday, 10:00 AM - 5:00 PM
Specialties: Minimally Invasive Spine Surgery, Brain Tumor Surgery, Endoscopic Spine Surgery, Trigeminal Neuralgia.`
            }]
          };
        }
      });

      // Tool 2: Book Appointment Interaction
      modelContext.registerTool({
        name: 'book_appointment',
        description: 'Helps the AI agent navigate the user to the appointment booking section or provide booking instructions.',
        inputSchema: {
          type: 'object',
          properties: {
            service: {
              type: 'string',
              description: 'The medical service the patient is interested in (e.g., Spine Surgery)'
            }
          }
        },
        async execute(args: any) {
          // Scroll to the booking form if it exists on the page
          const bookingSection = document.getElementById('book-appointment') || document.querySelector('form');

          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return {
              content: [{
                type: 'text',
                text: `I have navigated to the booking form on the current page for ${args.service || 'consultation'}. The user can now fill in their details.`
              }]
            };
          }

          // Otherwise, direct them to the contact page
          window.location.href = '/contact';

          return {
            content: [{
              type: 'text',
              text: `Navigating to the contact and booking page for ${args.service || 'consultation'}.`
            }]
          };
        }
      });

      // Tool 3: Get Services list
      modelContext.registerTool({
        name: 'get_services',
        description: 'Get a list of medical services and treatments offered by Dr. Sayuj Krishnan.',
        inputSchema: {
          type: 'object',
          properties: {}
        },
        async execute() {
          return {
            content: [{
              type: 'text',
              text: `Available Services:
1. Endoscopic Spine Surgery (Microdiscectomy, Spinal Decompression)
2. Brain Tumor Surgery (Gliomas, Meningiomas, Metastases)
3. Minimally Invasive Spine Surgery (MISS)
4. Trigeminal Neuralgia Treatment (Microvascular Decompression)
5. Epilepsy Surgery
6. Pediatric Neurosurgery
7. Cerebrovascular Surgery (Aneurysms, AVMs)`
            }]
          };
        }
      });
    };

    // Attach event listener to know when the polyfill is ready, or run immediately if already loaded
    window.addEventListener('load', registerWebMCPTools);
    // Also try immediately in case the script loaded very fast or we navigated
    setTimeout(registerWebMCPTools, 1000);

    return () => {
      window.removeEventListener('load', registerWebMCPTools);
    };
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@mcp-b/global@latest/dist/index.iife.js"
        strategy="afterInteractive"
      />
    </>
  );
}
