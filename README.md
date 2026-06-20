# InternX 創作者專區 — 前端 Demo（工程交接）

實習通（InternX）「創作者專區」的**前端互動 Demo**。純前端、假資料、無後端，作為給工程師的交接素材：示範介面與使用者流程，並附上完整串接規格。

> 設計直接沿用 `internx-me/frontend` 的 `globals.css` 設計 token 與既有元件樣式，力求與現有平台「一模一樣」。

## 線上 Demo

部署於 Zeabur（一次性交接站）。本機執行：

```bash
npm start          # node server.js，預設 http://localhost:8080
```

## 頁面導覽

| 路徑 | 內容 |
|---|---|
| `/` | 創作者專區首頁（介紹 + 精選創作者 + 三步驟成為創作者） |
| `/directory` | 探索創作者（搜尋 / 專長篩選） |
| `/creator?id=lin-yuzhen` | **創作者主頁（核心頁）**：標章 / 關於我 / 專長 / 部落格 / 主辦活動 / 活動紀錄 / 心得・論壇 |
| `/register` | 註冊身分選擇 → 創作者認證表單 → 送審 / 通過 狀態 |
| `/blog` · `/blog-article?id=b1` · `/blog-editor` | 部落格列表 / 文章頁（作者署名帶認證標章）/ 撰寫頁 |
| `/handoff` | **工程交接文件**（線上閱讀，內容同 `HANDOFF.md`） |

## 對應的七項需求

1. 註冊選「創作者」身分 + 填可驗證資料送審 → `register.html`
2. 創作者名字旁專屬標籤（金色「認證創作者」膠囊）→ 全站 `CZ.badgePill()`
3. 撰寫部落格並連結平台 → `blog-editor.html` / `blog-article.html`
4. 顯示創作者活動紀錄 → `creator.html`「活動紀錄」分頁
5. 過往辦過的活動 + 專長 → `creator.html`「主辦活動」/「專長」分頁
6. 整合 LinkedIn + IG → `creator.html`「關於我」社群連結
7. 與部落格 / 論壇 / 人脈 / 活動 / 心得 串接 → 見 **[`HANDOFF.md`](./HANDOFF.md)**

## 給工程師：怎麼接到現有平台

詳見 **[`HANDOFF.md`](./HANDOFF.md)**。一句話總結：創作者專區幾乎不需要新發明任何系統，平台已具備 `verified-creator` 標章、`verifiedRoleApplications` 申請、`BlogPost`、`ActivityData`、`SocialLinkChip`、`MergedSenderBadges` 等；工作集中在「把既有系統接起來」+ onboarding 身分選擇 + Profile 新增分頁。

## 檔案結構

```
server.js              零依賴 Node 靜態伺服器（Zeabur Node 服務）
package.json           start = node server.js
HANDOFF.md             工程交接規格（完整）
site/
  index/creator/directory/blog/blog-article/blog-editor/register/handoff .html
  assets/  app.css(設計系統) app.js(外框/互動) data.js(假資料) render.js(卡片)
  img/branding/  internx logo
```

---
_本專案為交接用一次性 Demo，非正式產品；請勿直接部署到 internx.me 正式站。_
