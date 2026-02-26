# 實作開發進度 (Badminton Flow)

## 協作與佈署流程 (Workflow)
我們採用 **Local-First** 開發模式，由 AI 協助撰寫本地檔案，再由開發者推送至 GAS。
1. **本機環境**: 確認已安裝 Node.js，執行 `sudo npm install -g @google/clasp` 安裝並用 `clasp login` 登入。
2. **AI 開發**: AI (Gemini) 直接修改 `Code.gs` 或 `index.html` 的本地檔案。
3. **手動推送**: 開發者在終端機執行 `clasp push` 將程式碼同步至 Google Apps Script 專案。
4. **線上測試**: 開發者於 GAS 部署新版本並開啟 Web App 進行測試。

## Phase 1: 後端基礎與資料表架構 (已完成 ✅)
建立穩定且具彈性的 Google Sheets 資料結構，確保 GAS 能正確讀取配置。
- [x] Google Sheet 建立 `Registration`、`Sessions`、`Config` 三個表單。
- [x] GAS 核心開發 (`Code.gs`)
    - [x] 實作 `getFormData()`：抓取 `Sessions` 中啟用的場次與 `Config` 動態資訊。
    - [x] 實作 `postRegistration()`：處理前端 POST 請求，寫入報名資料並更新已報名人數。

## Phase 2: 動態 UI 與 運動風設計 (進行中 ⏳)
實作具備「螢光綠/深藍黑」競技感的極簡前端，並達成3秒報名體驗。
- [x] 基礎佈局: 導入 Tailwind CSS (#0f172a 背景 / #d9f99d 主色) 與響應式容器。
- [x] 動態表單渲染: 從後端 API 獲取場次後，自動生成「場次」與「時段」的連動下拉選單。
- [ ] **[下一步]** 根據 `Config` 表內容，在備註欄上方動態插入「聯絡窗口」或「繳費資訊」。
- [ ] **[下一步]** 名額即時顯示: 在場次選單旁顯示「8/12 人」狀態，若額滿自動切換為「候補中」樣式。
- [ ] 實作「名額進度條」，顏色隨人數增加從綠變紅。

## Phase 3: 互動優化與 Vibe Check (待開發 📝)
加入關鍵的動畫效果與防呆機制，提升系統整體的高級感。
- [x] Vibe Check: 確認報名按鈕點擊時有縮放 (Scale) 的物理回饋感。
- [ ] 防呆機制:
    - [ ] 限制報名人數下拉選單上限為 5 人。
    - [ ] 欄位檢核：姓名、電話、程度、場次、時段為必填。
- [ ] Vibe 動畫實作:
    - [ ] 提交按鈕點擊後的 Loading 狀態。
    - [ ] 報名成功後的「羽毛球轉場動畫」。
- [ ] 測試與佈署:
    - [ ] 測試高併發名額更新準確性。
    - [ ] 確認手機瀏覽器相容性。