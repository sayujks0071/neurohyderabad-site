import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

/**
 * Appends patient intake data to a Google Sheet via `gws` CLI.
 *
 * @param spreadsheetId The Google Sheet ID.
 * @param patientData An array of strings containing data such as Date, Name, Age, Gender, Conditions, Phone, Status.
 */
export async function appendIntakeToSheets(spreadsheetId: string, patientData: string[]) {
  const payload = {
    values: [patientData]
  };

  const args = [
    'sheets',
    'spreadsheets',
    'values',
    'append',
    '--params',
    JSON.stringify({ spreadsheetId, range: 'Sheet1!A1', valueInputOption: 'USER_ENTERED' }),
    '--json',
    JSON.stringify(payload)
  ];

  try {
    const { stdout, stderr } = await execFileAsync('gws', args);
    if (stderr) {
      console.warn(`[gws-sheets] Warning: ${stderr}`);
    }
    console.log(`[gws-sheets] Successfully appended intake for ${patientData[1] || 'Patient'}`);
    return stdout;
  } catch (error) {
    console.error(`[gws-sheets] Failed to append intake data:`, error);
    throw error;
  }
}

// Example usage if run directly
if (require.main === module) {
  const SPREADSHEET_ID = process.env.SHEET_ID || "DEFAULT_SHEET_ID";
  appendIntakeToSheets(SPREADSHEET_ID, [
    "2026-03-08",
    "Ravi Kumar",
    "35",
    "M",
    "Hypertension",
    "98XXXXXXXX",
    "New"
  ]).catch(console.error);
}
