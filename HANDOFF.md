# 創作者專區｜工程交接文件

> InternX 實習通 — 創作者專區（Creator Zone）前端 Demo 與後端串接規格
> 對象：接手實作的前端 / 後端工程師
> 版本：v1（2026-06）
> 配套 Demo：本 repo `site/`（純前端、假資料、無後端）

---

## 0. TL;DR（先看這段）

創作者專區**幾乎不需要新發明任何系統**——平台 `internx-me/frontend` 內已具備：

| 創作者需求 | 既有可重用的系統 | 檔案 |
|---|---|---|
| 創作者專屬標籤 | `verified-creator` 標章（金色膠囊、quill-pen 圖示、`認證創作者`）+ `VerifiedRolePitchModal` | `components/Badge/ProfileBadge.tsx`、`data/profile.ts` |
| 註冊選身分 + 送審 | `verifiedRoleApplications` 申請集合 + 管理員審核頁 | `data/verified-role-application.ts`、`pages/[lang]/admin/verified-role-applications.jsx` |
| 撰寫部落格 | `BlogPost` 模型 + `BlockEditor` 編輯器 | `data/blog.ts`、`components/Blog/*` |
| 顯示專長 | `Profile.currentSkills`（分類）+ `SkillGroup` | `components/Profile/Profile.tsx` |
| LinkedIn / IG | `Profile.socialLinks` + `SocialLinkChip` | `components/Chip/SocialLinkChip.tsx` |
| 主辦活動 / 活動紀錄 | `ActivityData`（`createdBy`）+ `RegistrationData`（`userUid`）| `data/activity.ts`、`data/registration.ts` |
| 論壇 / 心得 / 人脈 顯示標籤 | `MergedSenderBadges`、`PostCard`、`ConnectionCard` | `components/Badge/*`、`components/Post/*`、`components/Connection/*` |

**所以工作量集中在三件事：**
1. 在 onboarding 加入「身分選擇」步驟，把「創作者」接到既有的 `verifiedRoleApplications`。
2. 在 `Profile` 元件新增 3 個分頁（部落格 / 主辦活動 / 活動紀錄），並把既有資料以 `userId` / `senderId` / `createdBy` 撈進來。
3. 把目前「admin only」的部落格發佈權，放寬給帶有 `verified-creator` 標章的使用者。

其餘（標章、社群連結、專長、心得、論壇足跡）都是「把既有元件接上資料」而已。

---

## 1. 設計系統（Demo 如何 1:1 對齊現有平台）

Demo 直接沿用 `page-styles/globals.css` 的設計 token，沒有任何新色票或字體。實作時請**直接用現有 CSS module，不要照抄 Demo 的 class 名稱**（Demo 為了純靜態才把 module class 攤平）。

| Token | 值 | 用途 |
|---|---|---|
| `--theme-color` | `#0182fd` | 主色（按鈕、連結、tab selected） |
| `--theme-color-dark` | `#1861a8` | hover |
| `--theme-color-black` | `#004aad` | 標題深色 |
| `--theme-white` | `#deefff` | tab/標籤淺底 |
| `--complementary-color` | `#e2a200` | 金色強調（活動回顧、認證） |
| `--background-color-theme` | `#fff6ef` | 暖色背景 |
| `--border-radius` | `10px` | 全站圓角 |
| `--top-bar-height` | `64px` | 導覽列高度 |
| 字體 | `Poppins` + `Noto Sans TC` | — |
| 圖示 | Remix Icon（`ri-*`） | — |
| Logo | `/img/branding/internx-logo-long-black.svg` | 藍 `#006aff` / 黃 `#ffc82c` |

**認證創作者金色膠囊**（直接用既有 `ProfileBadge.module.css`）：
```
border: 2px solid #ffd700;  background: #fffdf5;  color: #1f2937;
border-radius: 999px;  圖示: ri-quill-pen-line;  文字: 認證創作者
```

---

## 2. 資料模型對照表

### 2.1 既有模型（直接使用，無需改動）

**`VerifiedRoleApplication`**（`data/verified-role-application.ts`）— 創作者申請
```ts
{
  id: string;
  userId: string;
  applicationType: 'verified-creator' | 'industry-expert' | 'collaboration-partner';
  organizationText: string;   // 所在產業/公司，max 300
  experienceText: string;     // 相關經歷，max 4000
  expertiseForumIds?: string[];   // 專長領域（論壇 tag）
  status: 'pending' | 'approved' | 'rejected';
  createdAt, reviewedAt, reviewedBy, reviewNote;
}
```
> 一位使用者同時只能有一筆 `pending` 申請。

**`VerifiedRoleApplicationPrivate`**（同檔）— 證明（管理員限定）
```ts
{ applicationId, userId, evidenceLink?, evidenceFiles?: string[] }
```

**`Profile`**（`data/profile.ts`）— 核准後寫入
```ts
{
  badges: BadgeType[];                 // 核准後加入 'verified-creator'
  verifiedRolePitch?: VerifiedRolePitch; // { applicationType, organizationText, experienceText }
  socialLinks[]; portfolios[];
  currentSkills[]; currentActivities[]; // {category, value}，即「專長」
  realProfile: RealProfileExtension;
}
// BadgeType = admin | kol | early-access | business | school-org
//           | verified-creator | industry-expert | collaboration-partner
```

**`BlogPost`**（`data/blog.ts`）
```ts
{
  id, title, content, excerpt,
  category: '實習心得'|'職涯規劃'|'面試技巧'|'職場文化'|'技能提升'|'其他';
  slug, status: 'draft'|'published'|'archived', publishedAt?;
  authorId, authorName, authorAvatar?;   // ← 連回創作者
  viewCount, likeCount, userLikes;
  attachments[];
}
// 既有靜態方法：fetchUserPosts(db, userId) ← 創作者主頁的部落格分頁就用這個
```

**`ActivityData`**（`data/activity.ts`）+ **`RegistrationData`**（`data/registration.ts`）
```ts
ActivityData    { id, title, activityType, startDateTime, venueType, feeType,
                  createdBy /*主辦者 userId*/, companyId, approvalStatus,
                  showcaseHeadline, showcaseAverageRating, showcaseFeedbackCount }
RegistrationData{ id, userUid /*參與者*/, activityId, ... }
```

### 2.2 需新增的欄位（唯一的 schema 變更）

**`users` 集合新增**
```ts
userRole?: 'student' | 'professional' | 'creator';   // onboarding 身分選擇結果
```
> 僅作為分析與功能 gating 用。標章本身仍以 `profiles.badges` 為準。

---

## 3. 功能一：註冊與身份識別

### 3.1 流程（在既有 onboarding 中插入一步）

`pages/[lang]/account/onboarding.jsx` 現有步驟：
`Step0 介紹 → Step1 社群守則 → Step2 基本資料 → Step3 學生信箱驗證 → Step4 驗證碼 → Step5 完成`

**插入 `Step 2B：身分選擇**（對應 Demo `register.html` 的 Step 1–2）：

```
Step2 基本資料
  ↓
Step2B 身分選擇（學生 / 專業人士 / 認證創作者）
  ├─ 學生 / 專業人士 → 設定 users.userRole → 直接進 Step3
  └─ 認證創作者 → 顯示認證表單（organizationText / experienceText /
       expertiseForumIds / evidenceLink / evidenceFiles）
       → submitVerifiedRoleApplication()  // 寫入 verifiedRoleApplications(status='pending')
       → users.userRole = 'creator'
       → 顯示「待審核中」狀態，仍可繼續 Step3
  ↓
Step3~5 既有流程
```

> 「填寫讓我們可以驗證的東西」= 既有的學生信箱 / 身分驗證（`pages/api/student-verification/*`），創作者再額外填認證表單。兩者**互相獨立**，不互相阻擋。

### 3.2 審核（後端，幾乎全部已存在）

1. 管理員於 `pages/[lang]/admin/verified-role-applications.jsx` 看到 `pending` 申請。
2. 核准 → `grantVerifiedBadgeToUser()`：
   - `profiles.badges` 加入 `'verified-creator'`
   - 寫入 `profiles.verifiedRolePitch = { applicationType, organizationText, experienceText }`
   - 同步 `profiles/{uid}/subprofiles/realProfile.badges`
   - `verifiedRoleApplications.status = 'approved'`
3. 駁回 → `status='rejected'` + `reviewNote`。
4. （建議補）核准 / 駁回各發一封 Email 通知（文案見 §10）。

### 3.3 前端要做的事

- [ ] onboarding 新增 Step2B UI（重用 `Card`、`Input`、`TextArea`、`FileUpload`、`Chip`）。
- [ ] 串 `submitVerifiedRoleApplication()`。
- [ ] 寫入 `users.userRole`。
- [ ] 「待審核中」狀態卡：`<Chip type="pending">待審核中</Chip>`（Demo `register.html` Step 3）。
- [ ] Firestore rules：`verifiedRolePitch` / `badges` **只能由後端寫**，使用者不可改。

> Demo 對應：`register.html`（3 步驟 stepper + 角色卡 + 認證表單 + 待審/通過狀態）。

---

## 4. 功能二：創作者專屬標籤

完全沿用既有標章系統，**不需新增元件**。

| 情境 | 元件 | 說明 |
|---|---|---|
| 個人頁標題旁 | `<ProfileBadge badgeType="verified-creator" verifiedRolePitch={profile.verifiedRolePitch} resolvePitchUserId={uid} />` | 金色膠囊，可點開 `VerifiedRolePitchModal` |
| 論壇訊息 / 貼文作者列 | `<MergedSenderBadges senderId={post.senderId} senderBadges={post.badges} show />` | `size='small'` 緊湊膠囊 |
| 部落格作者署名 | 同上（**目前缺，需補**，見 §5.3） | — |

- 圖示：`getVerifiedRolePillIconName('verified-creator') === 'quill-pen-line'`
- 點擊膠囊 → `VerifiedRolePitchModal` 顯示 `organizationText` + `experienceText`
- `MergedSenderBadges` 會把貼文建立當下的 `senderBadges` 與即時 `Profile.load()` 的 badges 合併，避免標章過期。

> Demo 對應：`CZ.badgePill()`（`render.js`）與 `CZ.showPitch()`（`app.js`）即模擬 `ProfileBadge` + `VerifiedRolePitchModal`。

---

## 5. 功能三：部落格串接

### 5.1 開放發佈權給創作者

目前 `pages/[lang]/blog/create.jsx`、`/blog/manage` 檢查 `appStates.userData?.admin`。改為：
```js
const canPublish = userData?.admin
  || userProfile?.badges?.includes('verified-creator');
```
Firestore rules 同步放寬 create/update：`admin || verified-creator`，且只能改自己的 `authorId`。

### 5.2 創作者主頁「部落格」分頁

`Profile` 元件新增分頁，資料來源：
```js
const myPosts = await BlogPost.fetchUserPosts(db, creatorId);
const published = myPosts.filter(p => p.isPublished());
// 用 <BlogPostsGrid posts={published} /> 渲染
```

### 5.3 作者署名顯示標章（目前缺，需補）

`pages/[lang]/blog/[slug].tsx` 的 byline 目前只有 `authorAvatar` + `authorName`。補上：
```jsx
<Link href={`/${lang}/user/${post.authorId}`}>
  <MergedSenderAvatar senderId={post.authorId} embeddedAvatar={post.authorAvatar} show size={46} linkable />
  <span>{post.authorName}</span>
  <MergedSenderBadges senderId={post.authorId} show />   {/* ← 新增 */}
</Link>
```
> `authorId` 即 `profileUserIdFromSenderId` 的來源，作者名/頭像點擊導向 `/[lang]/user/[authorId]`。

### 5.4 編輯器

直接用既有 `components/Blog/BlockEditor.tsx`（工具列：標題 / 粗體 / 清單 / 連結 / 引用 / 上傳圖片，markdown ↔ HTML 互轉，支援 IME）。

> Demo 對應：`blog.html`（列表 + 分類篩選）、`blog-article.html`（文章 + 作者署名帶金標 + 按讚）、`blog-editor.html`（工具列 + 編輯/預覽切換 + 字數）。

---

## 6. 功能四：活動串接（主辦活動 + 活動紀錄）

創作者主頁顯示**兩種**活動視角：

| 分頁 | 資料來源 | 元件 |
|---|---|---|
| 主辦活動（過往辦過的活動） | `Activity.loadAllForAdmin()` filter `createdBy === creatorId`（或 `companyId`） | `ActivityCard`（`editable=false`），過去活動帶 `showcase*` 回顧 |
| 活動紀錄（參與） | `registrations` where `userUid === creatorId` → 取 `activityId` 撈 `ActivityData` | `ActivityCard` 唯讀 / 時間軸 |

- 活動詳情頁既有：`/[lang]/activity/[activityId]`
- 主辦者後台既有：`/[lang]/professional/home`、`/professional/activity-showcase`

> Demo 對應：creator.html「主辦活動」分頁（`CZ.activityCard`，含活動回顧 showcase）、「活動紀錄」分頁（時間軸，host/join 兩種標記）。

---

## 7. 功能五：專長 + 社群整合（LinkedIn / IG）

兩者**個人頁已原生支援**，創作者主頁直接重用：

- **專長**：`Profile.currentSkills`（`{category, value}` 分類）→ `SkillGroup` 渲染分類 + 藍色 `chip`。
- **LinkedIn / IG**：`Profile.socialLinks` → `SocialLinkChip`
  - `platform="linkedin"` → `ri-linkedin-*`，連到 `linkedin.com/in/{username}`
  - `platform="instagram"` → `ri-instagram-line`，連到 `instagram.com/{username}`
  - 由 `getSocialLinkUrl(platform, username)` 產生網址；行動版收合為 icon-only。

> Demo 對應：creator.html「關於我」（`CZ.socialChip`）、「專長」（`CZ.skillGroups`）。

---

## 8. 功能六：論壇 / 心得 / 人脈 串接

| 系統 | 創作者如何被串連 | 元件 / 路由 |
|---|---|---|
| 論壇 | 訊息作者列以 `senderId` 撈標章 | `ChatMessageItem` → `MergedSenderBadges` / `MergedSenderAvatar`；`/[lang]/dashboard/forum/[chatRoomId]` |
| 心得（featured） | `post.senderId === creatorUid` 的貼文集結到主頁 | `PostCard` / `PostBottom`；`/[lang]/dashboard/featured` |
| 人脈 | 創作者出現在推薦卡，帶標章 | `ConnectionCard` / `NetworkRecommendation`；`/[lang]/dashboard/connection` |

**統一導向規則**：以上所有作者名 / 頭像點擊一律導向 `/[lang]/user/[uid]`（= 創作者主頁）。`senderId` 可能是 `{uid}` 或 `{uid}--{suffix}`，請用 `profileUserIdFromSenderId()` 取 uid（`data/profile.ts`）。

> 創作者主頁「心得 / 論壇」分頁即把這些以 `senderId` 反查、集中呈現（Demo creator.html 已示意）。

---

## 9. 創作者主頁（Profile 元件改造）

主頁 = 既有 `components/Profile/Profile.tsx` 兩欄式版面（側欄 300px + 主內容分頁）。

```
側欄 sidebarCard
  ├─ Avatar 96px
  ├─ 名稱 + sidebarBadgeStrip（ProfileBadge: verified-creator 金標）
  ├─ headline / 學校 / 地區
  ├─ 追蹤 / 私訊 按鈕
  └─ 統計（追蹤者 / 文章 / 活動）

主內容 sectionTabs（既有 3 分頁 → 擴充為 6）
  關於我 → bio + 認證資訊(pitch) + socialLinks(SocialLinkChip)
  專長   → SkillGroup（既有）
  部落格 → BlogPost.fetchUserPosts + BlogPostsGrid   ← 新增
  主辦活動 → Activity by createdBy + ActivityCard      ← 新增
  活動紀錄 → registrations by userUid                  ← 新增
  心得/論壇 → ratings/interviews/messages by senderId   ← 新增
```
分頁切換沿用既有 `activeSectionTab` state 與 `.sectionTab` / `.mainCard` 樣式。

> Demo 對應：`creator.html`（完整 6 分頁）。

---

## 10. 路由表

### 既有（直接重用）
```
/[lang]/user/[profileId]                 創作者主頁（擴充分頁）
/[lang]/blog                             部落格列表
/[lang]/blog/[slug]                      文章頁（byline 補標章）
/[lang]/blog/create                      撰寫（開放給 verified-creator）
/[lang]/blog/manage                      管理
/[lang]/activity/[activityId]            活動詳情
/[lang]/professional/home                主辦者後台
/[lang]/dashboard/forum/[chatRoomId]     論壇
/[lang]/dashboard/featured               心得
/[lang]/dashboard/connection             人脈
/[lang]/admin/verified-role-applications 審核後台
/[lang]/account/onboarding               註冊引導（加 Step2B）
```

### 建議新增
```
/[lang]/creators            創作者專區首頁（探索 + 介紹）   ← Demo index.html / directory.html
/[lang]/dashboard/verified-role-apply  創作者認證申請（若不放在 onboarding）
```
並在 `lib/config.js` 的 `TOP_BAR_TABS` / `BOTTOM_BAR_TABS` 視需要加入「創作者」入口（icon `quill-pen-line`）。

---

## 11. Demo 頁面 ↔ 真實實作 對照

| Demo 頁面 | 對應真實元件 / 路由 |
|---|---|
| `index.html` | 新增 `/[lang]/creators` 專區首頁 |
| `directory.html` | `/[lang]/creators`（搜尋/篩選）；可用 `NetworkRecommendation` 卡片 |
| `creator.html` | `/[lang]/user/[id]` + `Profile.tsx`（新增分頁） |
| `blog.html` | `/[lang]/blog` + `BlogPostsGrid` |
| `blog-article.html` | `/[lang]/blog/[slug]` + `BlogView`（byline 補 `MergedSenderBadges`） |
| `blog-editor.html` | `/[lang]/blog/create` + `BlogForm` / `BlockEditor` |
| `register.html` | `/[lang]/account/onboarding` Step2B + `verifiedRoleApplications` |
| 金色標籤 | `ProfileBadge` + `VerifiedRolePitchModal` |

---

## 12. 通知文案（建議）

- 送出申請：`認證創作者申請已送出 — 我們將於 3–5 個工作天內審核。`
- 核准：`🎉 恭喜！您已成為認證創作者 — 已解鎖創作者主頁與部落格發佈。` → CTA `/[lang]/user/[uid]`
- 駁回：`認證創作者申請結果 — {reviewNote}。可於 30 天後重新申請。`

---

## 13. 實作順序與檢查清單

**Phase 1 — 身分與標章（後端大多已就緒）**
- [ ] onboarding 加 Step2B，串 `submitVerifiedRoleApplication()` + `users.userRole`
- [ ] 「待審核中」狀態顯示
- [ ] 驗證審核 → 標章 → 個人頁金標顯示

**Phase 2 — 創作者主頁**
- [ ] `Profile.tsx` 新增 部落格 / 主辦活動 / 活動紀錄 / 心得 分頁
- [ ] 部落格分頁串 `BlogPost.fetchUserPosts`
- [ ] 主辦活動串 `Activity by createdBy`；活動紀錄串 `registrations by userUid`

**Phase 3 — 內容發佈與串接**
- [ ] 部落格發佈權放寬給 `verified-creator`
- [ ] 文章 byline 補 `MergedSenderBadges`
- [ ] 論壇 / 心得 / 人脈 作者列確認標章顯示（多為既有，驗證即可）

**Phase 4 — 專區入口與探索**
- [ ] 新增 `/[lang]/creators` 首頁 + 探索頁
- [ ] `TOP_BAR_TABS` 加入創作者入口

**Phase 5 — 通知 / 分析**
- [ ] 核准 / 駁回 Email 通知
- [ ] 追蹤 userRole 轉換率、審核時間、創作者內容互動

---

## 14. Firestore 安全規則重點

- `verifiedRoleApplications`：使用者可建立自己的（`userId == auth.uid`、`status=='pending'`）；只有 admin 可改 `status` / `reviewNote`。
- `verifiedRoleApplicationPrivate`：僅 admin 可讀。
- `profiles.badges` / `profiles.verifiedRolePitch`：僅後端（admin / Cloud Function）可寫。
- `blogPosts`：`create/update` 限 `admin || verified-creator` 且 `authorId == auth.uid`。

---

_本文件描述的是「把既有系統接起來」的整合工程，而非從零開發。實作前請先閱讀 `frontend/data/README.md`（BaseModelController 架構）與 `frontend/CLAUDE.md`。_
