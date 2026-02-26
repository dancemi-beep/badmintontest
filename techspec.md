# 技術架構：動態配置系統

## 1. 技術棧 (The Stack)
* **Backend**: Google Apps Script (GAS) - 負責處理 `doGet` 與 `doPost`。
* **Database**: Google Sheets (作為 NoSQL 資料庫使用)。
* **Frontend**: HTML5 + Tailwind CSS (透過 CDN 載入)。
* **Icons**: Lucide-react 或 FontAwesome。

## 2. Database 設計 (Google Sheets)
系統將包含三個主要分頁：
* **`Registration` (報名紀錄)**: 存儲所有報名資料。
* **`Sessions` (場次維護)**: 
  * 欄位：[場次名稱, 日期, 時段, 總名額, 已報名人數, 狀態(啟用/停用)]。
* **`Config` (欄位與資訊配置)**: 
  * 欄位：[項目關鍵字, 顯示名稱, 內容, 類型(文字/下拉/顯示文字)]。

## 3. 前端開發規範 (Frontend Vibe)
* **動態渲染**: JavaScript 會先 Fetch `Config` 與 `Sessions` 分頁，動態產生 HTML Form 元素。
* **UI 組件**: 
  * 使用 **Select2** 或原生自定義樣式處理下拉選單，確保在手機上易於點擊。
  * 程度選單內容：[新手, 初級, 中下, 中級, 中上, 高級]。

## 4. Backend (GAS) 邏輯
* `getFormData()`: 一次性抓取場次與配置資訊回傳前端。
* `postRegistration()`: 寫入報名表，並同步更新 `Sessions` 表中的已報名人數。

## 5. 檔案結構
* `Code.gs`: 處理伺服器端邏輯（寫入、讀取試算表）。
* `index.html`: 包含 UI 結構、Tailwind 樣式與前端 JavaScript。