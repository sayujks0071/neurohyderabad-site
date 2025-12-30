/**
 * Google Apps Script for Google Sheets Integration
 * 
 * READY TO USE - Just copy and paste into your Google Apps Script editor
 * 
 * Your Spreadsheet ID: 199u_nKqE9lOjT-B0RlSmmfmIqImiT5fawasHxbbbLkU
 * Your Sheet: Dr Sayuj Appointments
 */

// ✅ CONFIGURATION: Already set for your spreadsheet
const SPREADSHEET_ID = '199u_nKqE9lOjT-B0RlSmmfmIqImiT5fawasHxbbbLkU';
const SHEET_NAME = 'Dr Sayuj Appointments';

/**
 * Handle POST requests from Next.js
 */
function doPost(e) {
  try {
    // Parse the JSON payload
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Check if sheet exists
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'error',
          message: `Sheet "${SHEET_NAME}" not found. Available sheets: ${spreadsheet.getSheets().map(s => s.getName()).join(', ')}`
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append row with appointment data
    sheet.appendRow([
      data.name || '',                    // Column A: Name
      data.email || '',                   // Column B: Email
      data.phone || '',                   // Column C: Phone
      data.condition || '',               // Column D: Condition
      data.message || '',                 // Column E: Message
      data.appointmentDate || '',         // Column F: Appointment Date
      data.appointmentTime || '',         // Column G: Appointment Time
      data.age || '',                     // Column H: Age
      data.gender || '',                  // Column I: Gender
      data.timestamp || new Date().toISOString() // Column J: Timestamp
    ]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Appointment data added successfully',
        timestamp: new Date().toISOString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString(),
        stack: error.stack
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - Run this in Apps Script editor to verify setup
 */
function testSetup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log('ERROR: Sheet not found');
      Logger.log('Available sheets: ' + spreadsheet.getSheets().map(s => s.getName()).join(', '));
      return;
    }
    
    Logger.log('✅ Setup verified successfully!');
    Logger.log('Spreadsheet: ' + spreadsheet.getName());
    Logger.log('Sheet: ' + sheet.getName());
    Logger.log('Last row: ' + sheet.getLastRow());
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
  }
}
