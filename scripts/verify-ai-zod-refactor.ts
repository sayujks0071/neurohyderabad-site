import { analyzeTriage } from '../src/lib/ai/triage';
import { analyzeSymptoms } from '../src/lib/ai/symptoms';

async function main() {
  console.log('Verifying Triage AI Refactor...');
  try {
    // Test case 1: Triage
    const triageResult = await analyzeTriage({
      symptoms: ['headache', 'mild dizziness'],
      description: 'I have had a mild headache for 2 days.',
    });
    console.log('Triage Result (Success):', JSON.stringify(triageResult, null, 2));

    if (!triageResult.urgencyLevel || !triageResult.recommendedAction) {
      throw new Error('Triage result missing required fields');
    }

  } catch (error) {
    console.error('Triage Verification Failed:', error);
    process.exit(1);
  }

  console.log('\nVerifying Symptoms AI Refactor...');
  try {
    // Test case 2: Symptoms
    const symptomResult = await analyzeSymptoms('persistent back pain', 45, 'female', '1 week');
    console.log('Symptom Result (Success):', JSON.stringify(symptomResult, null, 2));

    if (!symptomResult.analysis.urgency || !symptomResult.analysis.recommendation) {
      throw new Error('Symptom analysis result missing required fields');
    }

  } catch (error) {
    console.error('Symptoms Verification Failed:', error);
    process.exit(1);
  }

  console.log('\nVerification Complete: All checks passed.');
}

main();
