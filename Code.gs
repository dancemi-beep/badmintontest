// The ID of the Google Sheet.
const SPREADSHEET_ID = "1aXDAe4ix-4gpk5IPGTrS97C_gTFKUvBx75hdZ9wqh7Y";

/**
 * Sets up the initial sheets and headers in the spreadsheet.
 * This function should be run manually once from the Apps Script editor.
 */
function setupSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // Sheet: Registration
  const registrationSheet = ss.getSheetByName("Registration") || ss.insertSheet("Registration");
  registrationSheet.clear();
  registrationSheet.appendRow([
    "Timestamp", "SessionName", "SessionTime", "Name", "Phone", "Participants", "Level", "Notes"
  ]);
  registrationSheet.setFrozenRows(1);

  // Sheet: Sessions
  const sessionsSheet = ss.getSheetByName("Sessions") || ss.insertSheet("Sessions");
  sessionsSheet.clear();
  sessionsSheet.appendRow([
    "SessionName", "Date", "Time", "TotalSlots", "Registered", "Status"
  ]);
  // Add sample data
  sessionsSheet.appendRow(["週三體驗場", "2024-12-25", "20:00-22:00", 12, 0, "Enabled"]);
  sessionsSheet.setFrozenRows(1);


  // Sheet: Config
  const configSheet = ss.getSheetByName("Config") || ss.insertSheet("Config");
  configSheet.clear();
  configSheet.appendRow([
    "Key", "DisplayName", "Value", "Type"
  ]);
  // Add sample data
  configSheet.appendRow(["contact_person", "聯絡窗口", "李教練 (Line: @coachlee)", "display_text"]);
  configSheet.appendRow(["payment_info", "繳費資訊", "銀行代碼 (007) 帳號 123-456-7890", "display_text"]);
  configSheet.setFrozenRows(1);

  // Delete the default "Sheet1" if it exists
  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet) {
    ss.deleteSheet(defaultSheet);
  }

  SpreadsheetApp.flush(); // Apply all pending changes
  Logger.log("✅ Sheets have been set up successfully in: " + ss.getUrl());
}


/**
 * The main entry point for the web app.
 * Serves the index.html file.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle("羽球流光 (Badminton Flow) 報名系統")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

// Placeholder for future functions
function getFormData() {
  // To be implemented in Phase 1
}

function postRegistration(data) {
  // To be implemented in Phase 1
}
