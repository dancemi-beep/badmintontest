# VS Code + Gemini + GitHub Vibe-Coding 環境設定指南

本指南旨在說明如何設定一個結合 VS Code、Google Gemini AI 助理和 GitHub 的高效開發環境。我們稱之為「Vibe-Coding」，即利用 AI 輔助，讓開發過程更流暢、更具創造力。

## 前置準備 (Prerequisites)

在開始之前，請確保您已安裝或擁有以下項目：
1.  **Visual Studio Code**: [官方網站](https://code.visualstudio.com/)
2.  **Git**: [官方網站](https://git-scm.com/)
3.  **GitHub 帳號**: [官方網站](https://github.com/)

---

## 步驟一：設定 VS Code 與 Gemini 環境

第一步是在 VS Code 中整合 Gemini，使其成為您的開發夥伴。

1.  **安裝 Gemini 擴充功能**:
    *   打開 VS Code。
    *   點擊左側活動欄的「擴充功能」圖示 (Extensions)。
    *   在搜尋框中輸入 `Google Gemini`。
    *   找到由 Google 發布的官方擴充功能，點擊「安裝」(Install)。
    *   安裝後，您可能需要登入您的 Google 帳號。

2.  **開啟 Gemini 聊天介面**:
    *   安裝完成後，您會在 VS Code 的側邊欄看到 Gemini 的圖示。點擊它，即可開啟聊天視窗。
    *   您可以開始在這裡與 Gemini 對話，詢問問題或請求程式碼。

---

## 步驟二：建立專案與連接 GitHub (兩種路徑)

您可以選擇從本地端開始，或從 GitHub 雲端開始。路徑 A 是建立全新專案時的常見作法。

### 路徑 A：從本地端開始 (Local First)

此路徑適合您想在自己的電腦上立即開始編寫程式碼，之後再將其推送到 GitHub。

1.  **建立專案資料夾並初始化 Git**:
    在您的終端機 (Terminal) 中執行以下指令來建立資料夾，並在其中初始化 Git 倉庫。
    ```bash
    mkdir my-vibe-project
    cd my-vibe-project
    git init
    ```

2.  **在 GitHub 上建立空倉庫**:
    *   前往 [GitHub](https://github.com/) 並登入。
    *   點擊右上角的 `+` 圖示，選擇 `New repository`。
    *   為倉庫命名 (例如 `my-vibe-project`)。
    *   **重要**: **不要** 勾選 "Add a README file", "Add .gitignore", 或 "Choose a license"。因為您的本地專案已經存在，直接推送即可。
    *   點擊 `Create repository`。

3.  **連接本地與遠端倉庫**:
    複製 GitHub 頁面上「…or push an existing repository…」區塊中的指令，將您的本地倉庫與遠端連接並推送。
    ```bash
    # 請將 URL 替換為您自己的倉庫 URL
    git remote add origin <YOUR-REPOSITORY-URL>.git
    git branch -M main
    git push -u origin main
    ```

4.  **使用 VS Code 開啟專案**:
    最後，在 VS Code 中開啟您的專案資料夾。
    ```bash
    # 確保您仍在 my-vibe-project 資料夾中
    code .
    ```

### 路徑 B：從 GitHub 網頁開始 (GitHub First)

此路徑適合您想先在 GitHub 上規劃專案（例如新增 README、LICENSE），然後再複製到本地進行開發。

1.  **在 GitHub 上建立完整倉庫**:
    *   前往 [GitHub](https://github.com/) 並登入。
    *   點擊右上角的 `+` 圖示，選擇 `New repository`。
    *   為您的倉庫命名。
    *   這次您可以勾選 "Add a README file"、"Add .gitignore" 等選項來預先設定您的專案。
    *   點擊 `Create repository`。

2.  **複製 (Clone) 倉庫到本地**:
    *   在您剛建立的 GitHub 倉庫頁面上，點擊綠色的 `Code` 按鈕。
    *   複製 HTTPS 或 SSH URL。
    *   打開您的本地終端機，執行 `git clone` 指令：
    ```bash
    # 請將 URL 替換為您複製的倉庫 URL
    git clone <YOUR-REPOSITORY-URL>
    ```

3.  **使用 VS Code 開啟專案**:
    複製完成後，進入新建立的專案資料夾並用 VS Code 開啟它。
    ```bash
    # 將 <repository-name> 替換為您的倉庫名稱
    cd <repository-name>
    code .
    ```
    您的本地專案現在已經與遠端倉庫完全連接。

---

## 步驟三：Vibe-Coding 工作流程

您的環境已經設定完畢！現在可以開始體驗 Vibe-Coding。

1.  **向 Gemini 請求程式碼**:
    假設您想建立一個簡單的 Python Flask 網站。您可以在 Gemini 聊天視窗中輸入：
    > "請幫我寫一個基礎的 Python Flask 應用程式，包含一個顯示 'Hello, Vibe-Coding!' 的首頁。"

2.  **建立與貼上程式碼**:
    *   Gemini 會生成一段程式碼。
    *   在 VS Code 的檔案總管中，建立一個新檔案，例如 `app.py`。
    *   將 Gemini 提供的程式碼複製並貼到 `app.py` 中。

3.  **儲存並提交變更**:
    現在，您已經有了一個新的檔案。讓我們將這個進度保存到 Git 和 GitHub。
    ```bash
    # 將新檔案加入 Git 追蹤
    git add app.py

    # 提交變更並附上描述性訊息
    git commit -m "feat: Add initial Flask app structure"

    # 將變更推送到 GitHub
    git push
    ```

---

## 步驟四：總結與開發核心準則

您已成功建立一個整合了 AI 助理的現代化開發流程。您可以隨時與 Gemini 互動，讓它幫助您除錯、學習新技術、產生程式碼片段或重構現有程式碼。

### 開發核心準則 (遵循您的指示)

在整個開發過程中，請謹記以下與 AI 協作的準則：

*   **事實 vs. 推論**: 明確區分 Gemini 提供的確定事實（例如 API 文件）和它基於模式生成的推論性程式碼。
*   **承認不確定性**: 如果 Gemini 表示不確定或其回答看起來不合理，請信賴您的專業判斷，並尋求其他方式驗證。
*   **提供驗證路徑**: 將 Gemini 視為提供方向的夥伴，而非最終答案的來源。它應該幫助您更快地找到驗證方法（例如，建議您查閱特定文件或使用某個工具）。
*   **追溯來源**: 當 Gemini 提供了來自網路的資訊時，盡可能要求或尋找其原始來源以確保可信度。
*   **用戶確認**: 在 Gemini **實際修改** 任何檔案之前（例如透過 Code Actions），它會請求您的確認。這是確保您對專案有完全控制權的關鍵。
*   **專注請求**: 確保您的指令清晰，讓 Gemini 專注於您當前的任務。
*   **尋求協助**: 如果您發現自己陷入了與 AI 的無效溝通循環中，請嘗試重新組織您的問題，或直接手動完成任務。

祝您 Vibe-Coding 愉快！
