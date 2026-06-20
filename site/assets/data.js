/* =====================================================================
   創作者專區 Demo — 假資料（前端展示用，無後端）
   欄位命名刻意對齊 internx-me/frontend 既有資料模型：
   Profile / VerifiedRolePitch / BlogPost / ActivityData / RegistrationData
   ===================================================================== */
window.CZ_DATA = {
  // 主角創作者（個人頁範本）
  featured: "lin-yuzhen",

  creators: {
    "lin-yuzhen": {
      id: "lin-yuzhen",
      name: "林宥蓁",
      initials: "宥",
      color: "#0182fd",
      role: "verified-creator",          // BadgeType
      roleLabel: "認證創作者",
      headline: "外商求職教練｜前 McKinsey 商業分析師",
      school: "國立政治大學 企業管理學系",
      location: "台北市",
      followers: 1284,
      bio: "專注幫助大學生與新鮮人準備外商與顧問業求職。3 年帶過 200+ 場履歷健診與模擬面試，相信「把實習經驗講成戰功」是拿到 offer 的關鍵。",
      // VerifiedRolePitch（審核通過後寫入 profile.verifiedRolePitch）
      pitch: {
        organizationText: "前 McKinsey & Company 商業分析師；現為自由職涯教練與 InternX 合作講師。",
        experienceText:
          "畢業於政大企管，曾於 McKinsey 擔任商業分析師 3 年，主導多個策略顧問專案。離職後投入職涯教育，於 InternX、各大學職涯中心開設「外商求職」「Case Interview」工作坊，累積超過 200 場一對一履歷健診，學員 offer 涵蓋四大會計師事務所、外商顧問與快消品牌。",
      },
      socialLinks: [
        { platform: "linkedin", icon: "linkedin-fill", label: "LinkedIn", username: "yuzhen-lin", url: "https://linkedin.com/in/yuzhen-lin" },
        { platform: "instagram", icon: "instagram-line", label: "Instagram", username: "@yuzhen.career", url: "https://instagram.com/yuzhen.career" },
        { platform: "website", icon: "global-line", label: "個人網站", username: "yuzhen.cc", url: "#" },
      ],
      // currentSkills（依分類）→ SkillGroup
      specialties: [
        { category: "求職輔導", skills: ["履歷健診", "Cover Letter", "面試準備", "薪資談判"] },
        { category: "顧問求職", skills: ["Case Interview", "Market Sizing", "邏輯框架", "簡報表達"] },
        { category: "個人品牌", skills: ["LinkedIn 經營", "內容創作", "公開演講"] },
      ],
      stats: { posts: 12, events: 8, featured: 21 },
      blogs: ["b1", "b2", "b3"],
      hostedEvents: ["e1", "e2", "e3"],
      activityLog: [
        { date: "2026/05/18", role: "host", title: "外商求職實戰工作坊（第 6 屆）", desc: "主辦・42 人報名・滿意度 4.8" },
        { date: "2026/04/27", role: "host", title: "履歷健診 Open Office Hour", desc: "主辦・每月固定場・18 人參與" },
        { date: "2026/04/10", role: "join", title: "2026 春季校園職涯博覽會", desc: "受邀講者・主題分享" },
        { date: "2026/03/22", role: "host", title: "Coffee Chat：顧問業學長姐經驗談", desc: "主辦・線上・60 人參與" },
        { date: "2026/02/15", role: "join", title: "LinkedIn 個人品牌講座", desc: "報名參加" },
      ],
      // 心得 / 論壇 串接（依 senderId 撈取）
      featuredPosts: [
        { company: "麥肯錫顧問公司", rating: 4.9, summary: "面試流程很扎實，Case 題目貼近實務。建議事先練習 market sizing 與獲利樹框架，現場會要求邊講邊算。", time: "2026/05/02" },
        { company: "聯合利華 Unilever", rating: 4.5, summary: "MT 計畫關卡多，從線上測驗、AC 到終面。重點在團隊合作展現與商業敏感度。", time: "2026/03/14" },
      ],
      forumPosts: [
        { room: "顧問業求職", content: "整理了一份『Case Interview 常見 8 大框架』的速查表，需要的同學可以留言，我私訊給你～", time: "2026/05/20", reactions: 36 },
        { room: "履歷健診", content: "履歷的每一條 bullet 都用 STAR 寫：情境 → 任務 → 行動 → 量化結果。能量化就量化。", time: "2026/05/06", reactions: 51 },
      ],
    },

    "chen-boyu": {
      id: "chen-boyu", name: "陳柏宇", initials: "柏", color: "#7c3aed",
      role: "verified-creator", roleLabel: "認證創作者",
      headline: "資深前端工程師｜帶你準備技術面試",
      school: "國立台灣大學 資訊工程學系",
      followers: 980,
      bio: "在新創與外商都待過的前端工程師，專長把抽象的演算法講成人話。每週分享一題 LeetCode 解析與系統設計觀念。",
      specialties: [{ category: "技術面試", skills: ["演算法", "系統設計", "白板題", "履歷投遞"] }, { category: "前端開發", skills: ["React", "TypeScript", "效能優化"] }],
      socialLinks: [{ platform: "linkedin", icon: "linkedin-fill", label: "LinkedIn", username: "boyu-chen", url: "#" }, { platform: "instagram", icon: "instagram-line", label: "Instagram", username: "@boyu.codes", url: "#" }],
      stats: { posts: 24, events: 3, featured: 9 },
    },
    "huang-shihan": {
      id: "huang-shihan", name: "黃詩涵", initials: "詩", color: "#e2a200",
      role: "verified-creator", roleLabel: "認證創作者",
      headline: "品牌行銷顧問｜社群經營實戰派",
      school: "國立政治大學 廣告學系",
      followers: 2150,
      bio: "操盤過多個百萬粉專與電商品牌，專注教學生如何把興趣變成個人品牌、把作品變成履歷亮點。",
      specialties: [{ category: "數位行銷", skills: ["社群經營", "內容策略", "投放廣告", "數據分析"] }, { category: "個人品牌", skills: ["IG 經營", "短影音", "文案"] }],
      socialLinks: [{ platform: "instagram", icon: "instagram-line", label: "Instagram", username: "@sophie.brand", url: "#" }, { platform: "linkedin", icon: "linkedin-fill", label: "LinkedIn", username: "shihan-huang", url: "#" }],
      stats: { posts: 31, events: 12, featured: 14 },
    },
    "wang-kaicheng": {
      id: "wang-kaicheng", name: "王凱程", initials: "凱", color: "#0f766e",
      role: "collaboration-partner", roleLabel: "合作夥伴",
      headline: "新創共同創辦人｜聊商業開發與募資",
      school: "國立清華大學 經濟學系",
      followers: 640,
      bio: "連續創業者，分享從 0 到 1 的真實經驗：找題目、做 MVP、跟投資人聊天。歡迎想創業的同學來交流。",
      specialties: [{ category: "創業", skills: ["商業模式", "募資簡報", "商業開發", "產品驗證"] }],
      socialLinks: [{ platform: "linkedin", icon: "linkedin-fill", label: "LinkedIn", username: "kevin-wang", url: "#" }],
      stats: { posts: 8, events: 5, featured: 6 },
    },
    "li-siyu": {
      id: "li-siyu", name: "李思妤", initials: "思", color: "#db2777",
      role: "verified-creator", roleLabel: "認證創作者",
      headline: "資深產品設計師｜作品集健診",
      school: "實踐大學 媒體傳達設計學系",
      followers: 1530,
      bio: "在 B2B SaaS 團隊做產品設計，最愛幫設計系學生看作品集。相信好的作品集是『會說故事的設計決策』。",
      specialties: [{ category: "設計", skills: ["UI/UX", "作品集", "設計思考", "使用者研究", "Figma"] }],
      socialLinks: [{ platform: "instagram", icon: "instagram-line", label: "Instagram", username: "@tina.designs", url: "#" }, { platform: "website", icon: "global-line", label: "Portfolio", username: "tina.design", url: "#" }],
      stats: { posts: 16, events: 6, featured: 11 },
    },
    "chang-jhewei": {
      id: "chang-jhewei", name: "張哲瑋", initials: "哲", color: "#1861a8",
      role: "industry-expert", roleLabel: "產業專家",
      headline: "投資銀行分析師｜金融業實習申請",
      school: "國立台灣大學 財務金融學系",
      followers: 870,
      bio: "在外商投行做 M&A，分享金融業實習怎麼申請、面試考什麼、第一份 PA/IBD 工作的真實樣貌。",
      specialties: [{ category: "金融求職", skills: ["財務分析", "估值建模", "實習申請", "Networking"] }],
      socialLinks: [{ platform: "linkedin", icon: "linkedin-fill", label: "LinkedIn", username: "jhewei-chang", url: "#" }],
      stats: { posts: 10, events: 2, featured: 8 },
    },
  },

  // BlogPost
  blogs: {
    b1: {
      id: "b1", slug: "4-offers-in-3-weeks", category: "職涯規劃",
      title: "我如何在 3 週內拿到 4 個外商 Offer",
      excerpt: "從投履歷到拿到 offer，其實是一套可以複製的系統。這篇拆解我當年的時間表、信件模板，以及面試前一晚我都在做什麼。",
      author: "lin-yuzhen", date: "2026/05/12", readTime: 7, views: 3240, likes: 286,
      content: [
        { t: "h2", v: "求職是一場專案管理" },
        { t: "p", v: "很多人把求職當成「碰運氣」，但其實它更像一個有期限、有里程碑的專案。當我決定要在一個月內拿到 offer 時，第一件事不是投履歷，而是打開試算表，把每一家公司的截止日、關卡、聯絡人都列出來。" },
        { t: "p", v: "把求職視覺化之後，你會發現自己真正能掌控的變數只有三個：履歷品質、面試表現、申請數量。我們一個一個拆。" },
        { t: "h3", v: "1. 履歷：用 STAR 把實習寫成戰功" },
        { t: "p", v: "招募者看一份履歷平均只有 7 秒。所以每一條 bullet 都要能在一行內講完「你做了什麼、帶來什麼結果」。我習慣用 STAR 原則：" },
        { t: "ul", v: ["情境 Situation：當時面對什麼問題", "任務 Task：你被賦予什麼目標", "行動 Action：你具體做了什麼", "結果 Result：盡量量化（成長 %、省下多少時間）"] },
        { t: "quote", v: "如果一條經歷無法量化，那它通常不值得放進履歷的前三條。" },
        { t: "h3", v: "2. 面試：把緊張變成準備" },
        { t: "p", v: "面試前一晚我不會臨時抱佛腳，而是做三件事：重看公司近期新聞、把自己的故事練到能在 90 秒內講完、預想三個最可能被問的刁鑽問題。準備過的緊張，會變成自信。" },
        { t: "h2", v: "結語" },
        { t: "p", v: "Offer 不是運氣，是準備乘以數量。希望這套方法能幫到正在求職路上的你。有問題歡迎在 InternX 論壇標記我，或來我的 Office Hour 聊聊。" },
      ],
    },
    b2: {
      id: "b2", slug: "star-resume", category: "面試技巧",
      title: "履歷的 STAR 原則：把實習經驗寫成戰功",
      excerpt: "「在 OO 公司實習」不是經歷，「讓客訴回覆時間縮短 40%」才是。手把手帶你改寫三條最常見的履歷句子。",
      author: "lin-yuzhen", date: "2026/04/20", readTime: 5, views: 2110, likes: 173,
      content: [
        { t: "h2", v: "為什麼你的履歷沒有記憶點" },
        { t: "p", v: "大部分學生的履歷都長一樣：列出公司、職稱、然後寫「協助主管處理日常事務」。問題是，這句話換成任何人、任何公司都成立——它沒有「你」。" },
        { t: "h3", v: "改寫範例" },
        { t: "p", v: "原句：協助行銷團隊經營社群。改寫：獨立經營品牌 IG，3 個月內將互動率從 1.2% 提升至 4.5%，並企劃 2 檔帶來 300+ 名單的活動。" },
        { t: "quote", v: "好的履歷句子，讀完會讓人想多問一句。" },
        { t: "p", v: "把每一條都套進 STAR，你的履歷就會從「做過什麼」升級成「帶來什麼價值」。" },
      ],
    },
    b3: {
      id: "b3", slug: "case-interview-guide", category: "面試技巧",
      title: "Case Interview 完全攻略：從框架到實戰",
      excerpt: "顧問業面試最讓人害怕的 Case，其實有跡可循。整理我最常用的 4 大框架與一個真實考題的完整拆解。",
      author: "lin-yuzhen", date: "2026/03/30", readTime: 9, views: 1890, likes: 142,
      content: [
        { t: "h2", v: "Case 考的不是答案，是思路" },
        { t: "p", v: "顧問面試官想看的，是你面對一個沒有標準答案的商業問題時，能不能結構化地拆解、有邏輯地推進。" },
        { t: "h3", v: "四大常用框架" },
        { t: "ul", v: ["獲利樹：營收 − 成本，往下拆", "市場進入：市場、競爭、能力、財務", "Market Sizing：由上而下 vs 由下而上", "3C / 4P：情境分析的起手式"] },
        { t: "p", v: "但切記：框架是地圖，不是答案。面試官最怕你硬套框架卻不思考。" },
      ],
    },
  },

  // ActivityData（過往辦過的活動）
  events: {
    e1: { id: "e1", type: "工作坊", typeIcon: "presentation-line", title: "外商求職實戰工作坊（第 6 屆）", date: "2026/05/18", venue: "台北・線下", fee: "NT$ 600", past: true,
      showcase: { headline: "42 人完訓，滿意度 4.8 / 5", rating: 4.8, count: 38 } },
    e2: { id: "e2", type: "講座", typeIcon: "mic-line", title: "履歷健診 Open Office Hour", date: "2026/04/27", venue: "線上 Google Meet", fee: "免費", past: true,
      showcase: { headline: "每月固定場・累積 200+ 份履歷", rating: 4.9, count: 64 } },
    e3: { id: "e3", type: "交流活動", typeIcon: "cup-line", title: "Coffee Chat：顧問業學長姐經驗談", date: "2026/06/28", venue: "線上", fee: "NT$ 200", past: false },
  },

  // 平台導覽（沿用 lib/config.js 的 TOP_BAR_TABS）
  navTabs: [
    { text: "論壇", icon: "chat-1-line", href: "https://internx.me/zh-tw/dashboard/forum", external: true },
    { text: "人脈", icon: "group-2-line", href: "https://internx.me/zh-tw/dashboard/connection", external: true },
    { text: "活動", icon: "suitcase-line", href: "https://internx.me/zh-tw/dashboard/activities", external: true },
    { text: "心得", icon: "sparkling-line", href: "https://internx.me/zh-tw/dashboard/featured", external: true },
    { text: "創作者", icon: "quill-pen-line", href: "/index", external: false, key: "creator" },
  ],
};
