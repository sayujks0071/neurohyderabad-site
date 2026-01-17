
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import AppointmentSchema from '../app/appointments/_components/AppointmentSchema';
import { metadata } from '../app/appointments/page';

// Mock console.log/error to keep output clean or catch errors if needed,
// but for this script we want to see output.

async function verify() {
  console.log('Starting verification of Appointment Schema and Metadata...');
  const errors: string[] = [];

  // 1. Verify Schema
  try {
    const html = renderToStaticMarkup(<AppointmentSchema />);
    // Extract JSON from script tag
    // Output format: <script type="application/ld+json">...</script>
    const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

    if (!jsonMatch) {
      errors.push("Could not find <script type='application/ld+json'> in AppointmentSchema output.");
    } else {
      const jsonContent = jsonMatch[1];
      const schema = JSON.parse(jsonContent);

      console.log('Schema JSON parsed successfully.');

      // Check context
      if (schema['@context'] !== 'https://schema.org') errors.push("Schema missing @context or incorrect.");

      // Check graph
      const graph = schema['@graph'];
      if (!Array.isArray(graph)) {
        errors.push("Schema should use @graph array.");
      } else {
        // Find Physician
        const physician = graph.find((item: any) => item['@type'] === 'Physician');
        if (!physician) {
          errors.push("Missing 'Physician' object in schema.");
        } else {
          if (physician.name !== 'Dr. Sayuj Krishnan') errors.push(`Physician name incorrect: ${physician.name}`);
          if (physician.medicalSpecialty !== 'Neurosurgeon') errors.push(`Physician specialty incorrect: ${physician.medicalSpecialty}`);
          if (!physician.address) errors.push("Physician missing address.");
          if (!physician.availableService || !physician.availableService.includes('Neurosurgery')) errors.push("Physician missing 'Neurosurgery' service.");
          if (!physician.url || !physician.url.includes('/appointments')) errors.push("Physician URL incorrect.");
        }

        // Find MedicalClinic
        const clinic = graph.find((item: any) => item['@type'] === 'MedicalClinic');
        if (!clinic) {
          errors.push("Missing 'MedicalClinic' object in schema.");
        } else {
          if (!clinic.name.includes('Yashoda')) errors.push("MedicalClinic name should include Yashoda.");
          if (!clinic.address) errors.push("MedicalClinic missing address.");
        }
      }
    }
  } catch (e: any) {
    errors.push(`Error rendering/parsing schema: ${e.message}`);
  }

  // 2. Verify Metadata
  // We imported metadata from page.tsx.
  // Note: If importing page.tsx fails due to other imports, we might need to use a different approach.
  // But assuming it works:
  try {
    if (!metadata) {
      errors.push("Could not import metadata from page.tsx");
    } else {
      const title = String(metadata.title || '');
      const description = String(metadata.description || '');
      const keywords = Array.isArray(metadata.keywords) ? metadata.keywords.join(' ') : String(metadata.keywords || '');

      if (!title.includes('Best Neurosurgeon Hyderabad')) errors.push("Title missing 'Best Neurosurgeon Hyderabad'.");
      if (!description.includes('Book appointment')) errors.push("Description missing 'Book appointment'."); // Case insensitive check might be safer
      if (!keywords.includes('Book Appointment')) errors.push("Keywords missing 'Book Appointment'.");
      if (!keywords.includes('Best Neurosurgeon Hyderabad')) errors.push("Keywords missing 'Best Neurosurgeon Hyderabad'.");
    }
  } catch (e: any) {
    errors.push(`Error verifying metadata: ${e.message}`);
  }

  if (errors.length > 0) {
    console.error('❌ Verification Failed with errors:');
    errors.forEach(e => console.error(` - ${e}`));
    process.exit(1);
  } else {
    console.log('✅ All checks passed!');
  }
}

verify();
