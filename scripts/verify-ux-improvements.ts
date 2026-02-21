
import fs from 'fs';
import path from 'path';

const filesToCheck = [
  'packages/appointment-form/BookingForm.tsx',
  'packages/appointment-form/AppointmentFormExperience.tsx', // Success message is here for BookingForm
  'app/appointments/_components/neuralink/PatientPortal.tsx',
  'components/LeadForm.tsx',
  'components/TeleconsultationForm.tsx',
];

const requirements = {
  'packages/appointment-form/BookingForm.tsx': [
    { pattern: /isLoading={isSubmitting}/, description: 'Loading state on button' },
    { pattern: /"Sending..."/, description: 'Sending text' },
    { pattern: /reset\(/, description: 'Form reset logic' },
  ],
  'packages/appointment-form/AppointmentFormExperience.tsx': [
     { pattern: /Appointment request received\. Please bring any MRI\/CT scans with you\. We will confirm via phone shortly\./, description: 'Success message' }
  ],
  'app/appointments/_components/neuralink/PatientPortal.tsx': [
    { pattern: /disabled={.*(isAnalyzing|isSyncing).*}/, description: 'Disabled state on button' },
    { pattern: /Loader2/, description: 'Spinner icon' },
    { pattern: /Sending\.\.\./, description: 'Sending text' },
    { pattern: /Appointment request received\. Please bring any MRI\/CT scans with you\. We will confirm via phone shortly\./, description: 'Success message' },
    { pattern: /setFormData\(INITIAL_FORM_STATE\)/, description: 'Form reset logic' },
  ],
  'components/LeadForm.tsx': [
    { pattern: /disabled={isSubmitting}/, description: 'Disabled state on button' },
    { pattern: /Loader2/, description: 'Spinner icon' },
    { pattern: /"Sending..."/, description: 'Sending text' },
    { pattern: /Appointment request received\. Please bring any MRI\/CT scans with you\. We will confirm via phone shortly\./, description: 'Success message' },
    { pattern: /reset\(\)/, description: 'Form reset logic' },
  ],
  'components/TeleconsultationForm.tsx': [
    { pattern: /disabled={status === 'submitting'}/, description: 'Disabled state on button' },
    { pattern: /Loader2/, description: 'Spinner icon' },
    { pattern: /Sending\.\.\./, description: 'Sending text' },
    { pattern: /Appointment request received\. Please bring any MRI\/CT scans with you\. We will confirm via phone shortly\./, description: 'Success message' },
    { pattern: /setFormState\(initialState\)/, description: 'Form reset logic' },
  ],
};

let allPassed = true;

console.log('Verifying UX improvements...');

for (const file of filesToCheck) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${file}`);
    allPassed = false;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const checks = requirements[file as keyof typeof requirements];

  if (!checks) continue;

  console.log(`\nChecking ${file}...`);
  for (const check of checks) {
    if (check.pattern.test(content)) {
      console.log(`  ✅ ${check.description}`);
    } else {
      console.error(`  ❌ Missing: ${check.description}`);
      allPassed = false;
    }
  }
}

if (allPassed) {
  console.log('\n✅ All checks passed! The codebase already implements the requested UX improvements.');
  process.exit(0);
} else {
  console.error('\n❌ Some checks failed. Please review the output.');
  process.exit(1);
}
