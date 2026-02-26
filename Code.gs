/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setTitle('羽球流光 (Badminton Flow) 報名系統')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 從 Google Sheet 抓取場次與配置資訊回傳前端。
 * @returns {String} 包含場次與設定的 JSON 字串。
 */
function getFormData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sessionSheet = ss.getSheetByName('Sessions');
    const configSheet = ss.getSheetByName('Config');

    // 取得 Sessions 資料，並過濾出 "啟用" 狀態的場次
    const sessionsData = sessionSheet.getDataRange().getValues();
    const sessionHeaders = sessionsData.shift(); // 移除標題列
    const enabledSessions = sessionsData.filter(row => row[5] === '啟用'); // 假設 "狀態" 在第 6 欄 (索引 5)

    // 取得 Config 資料
    const configData = configSheet.getDataRange().getValues();
    configData.shift(); // 移除標題列

    return JSON.stringify({
      sessions: enabledSessions,
      config: configData
    });
  } catch (error) {
    Logger.log(`Error in getFormData: ${error.toString()}`);
    return JSON.stringify({ error: error.toString() });
  }
}

/**
 * 將報名資料寫入 Google Sheet 並更新場次人數。
 * @param {Object} formData 從前端傳來的表單資料。
 * @returns {String} 包含成功或失敗訊息的 JSON 字串。
 */
function postRegistration(formData) {
  const lock = LockService.getScriptLock();
  // 嘗試鎖定 15 秒，若失敗則回傳系統忙碌訊息
  if (!lock.tryLock(15000)) {
    Logger.log('Could not obtain lock after 15 seconds.');
    return JSON.stringify({ success: false, message: '系統忙碌中，請稍後再試。' });
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sessionSheet = ss.getSheetByName('Sessions');
    const registrationSheet = ss.getSheetByName('Registration');

    // 為了找到正確的資料列，需要重新取得一次啟用中的場次
    const allSessionsData = sessionSheet.getDataRange().getValues();
    const sessionsDataRows = allSessionsData.slice(1); // 取得資料列

    const enabledSessions = sessionsDataRows.filter(row => row[5] === '啟用');
    
    // 從前端傳來的 index 找到對應的場次資料
    const selectedSession = enabledSessions[formData.sessionIndex];
    if (!selectedSession) {
      throw new Error('選擇的場次無效或已不存在。');
    }

    // 在完整的場次資料中找到該場次的原始行數
    let originalRowIndex = -1;
    for (let i = 0; i < sessionsDataRows.length; i++) {
      // 比較 [場次名稱, 日期, 時段] 是否完全相符
      if (sessionsDataRows[i][0] === selectedSession[0] && 
          new Date(sessionsDataRows[i][1]).getTime() === new Date(selectedSession[1]).getTime() &&
          sessionsDataRows[i][2] === selectedSession[2]) {
        originalRowIndex = i + 2; // +1 for 1-based index, +1 for header row
        break;
      }
    }

    if (originalRowIndex === -1) {
      throw new Error('無法在 Sessions 表中定位到該場次。');
    }

    // 在鎖定狀態下，重新讀取最新人數並執行更新，防止 race condition
    const totalSlots = sessionSheet.getRange(originalRowIndex, 4).getValue(); // 總名額在 D 欄
    const currentRegistrants = sessionSheet.getRange(originalRowIndex, 5).getValue();
    const participants = parseInt(formData.participants, 10) || 1; // 從前端取得報名人數，預設為 1

    if (currentRegistrants + participants > totalSlots) {
      throw new Error(`報名失敗，剩餘名額不足！(目前剩餘 ${totalSlots - currentRegistrants} 位)`);
    }

    // 更新已報名人數
    sessionSheet.getRange(originalRowIndex, 5).setValue(currentRegistrants + participants);

    // 將報名資料寫入 Registration 表
    const newRegistrationRow = [new Date(), selectedSession[0], selectedSession[2], formData.name, formData.phone, participants, formData.level, formData.notes || ''];
    registrationSheet.appendRow(newRegistrationRow);

    return JSON.stringify({ success: true, message: '報名成功！' });

  } catch (error) {
    Logger.log(`Error in postRegistration: ${error.toString()}`);
    return JSON.stringify({ success: false, message: error.toString() });
  } finally {
    lock.releaseLock(); // 無論成功或失敗，最後都釋放鎖
  }
}