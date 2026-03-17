import { google } from 'googleapis';

export async function logToSheets(data: any) {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID;

  if (!serviceAccountJson || !spreadsheetId) {
    console.warn('Google Sheets configuration missing. Skipping logging.');
    return { success: false, error: 'Configuration missing' };
  }

  try {
    const credentials = JSON.parse(serviceAccountJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.source || '',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.condition || data.concern || '',
      data.status || 'New',
      data.notes || ''
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Website Leads!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to log to Google Sheets', error);
    return { success: false, error };
  }
}
