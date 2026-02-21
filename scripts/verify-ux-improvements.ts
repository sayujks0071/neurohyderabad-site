
import fs from 'fs';
import path from 'path';

const filesToCheck = [
  'packages/appointment-form/BookingForm.tsx',
  'packages/appointment-form/AppointmentFormExperience.tsx',
  'app/appointments/_components/neuralink/PatientPortal.tsx',
  'components/LeadForm.tsx',
  'components/TeleconsultationForm.tsx',
];

const requirements = {
  'packages/appointment-form/BookingForm.tsx': [
    { pattern: /isLoading=\{isSubmitting\}/, description: 'Loading state on Button component' },
    { pattern: /reset\(/, description: 'Form reset logic' },
  ],
  'packages/appointment-form/AppointmentFormExperience.tsx': [
     { pattern: /APPOINTMENT_SUCCESS_MESSAGE/, description: 'Uses standard success message constant' }
  ],
  'app/appointments/_components/neuralink/PatientPortal.tsx': [
    { pattern: /isLoading=\{.*(isAnalyzing|isSyncing).*}/, description: 'Loading state on Button component' },
    { pattern: /APPOINTMENT_SUCCESS_MESSAGE/, description: 'Uses standard success message constant' },
    { pattern: /setFormData\(INITIAL_FORM_STATE\)/, description: 'Form reset logic' },
  ],
  'components/LeadForm.tsx': [
    { pattern: /isLoading=\{isSubmitting\}/, description: 'Loading state on Button component' },
    { pattern: /APPOINTMENT_SUCCESS_MESSAGE/, description: 'Uses standard success message constant' },
    { pattern: /reset\(\)/, description: 'Form reset logic' },
  ],
  'components/TeleconsultationForm.tsx': [
    { pattern: /isLoading=\{status === 'submitting'\}/, description: 'Loading state on Button component' },
    { pattern: /APPOINTMENT_SUCCESS_MESSAGE/, description: 'Uses standard success message constant' },
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

// Verify the constant itself
const constantsFile = 'packages/appointment-form/constants.tsx';
const constantsPath = path.join(process.cwd(), constantsFile);
if (fs.existsSync(constantsPath)) {
    const content = fs.readFileSync(constantsPath, 'utf-8');
    // Using loose match for whitespace/newlines
    const successMsgPattern = /Appointment request received\. Please bring any MRI\/CT scans with you\. We will confirm via phone shortly\./;
    if (successMsgPattern.test(content)) {
        console.log(`\nChecking ${constantsFile}...`);
        console.log('  ✅ Success message constant has correct text');
    } else {
        console.error(`\nChecking ${constantsFile}...`);
        console.error('  ❌ Success message constant has INCORRECT text');
        allPassed = false;
    }
} else {
    console.error(`❌ Constants file not found: ${constantsFile}`);
    allPassed = false;
}

if (allPassed) {
  console.log('\n✅ All checks passed! The codebase implements the requested UX improvements.');
  process.exit(0);
} else {
  console.error('\n❌ Some checks failed. Please review the output.');
  process.exit(1);
}
