// data.js — sample content for 靈感俱樂部 (Riso Zine prototype)
// All copy is placeholder / 示意文字; images are procedurally-generated duotone art.

export const CATEGORIES = [
  { id: 'know',   name: '知識寶典', en: 'Knowledge', no: '01', ink: 'blue',  blurb: '筆記・整理・讀書會' },
  { id: 'draw',   name: '繪圖生態', en: 'Drawing',   no: '02', ink: 'pink',  blurb: '插畫・速寫・數位繪圖' },
  { id: 'code',   name: '程式生態', en: 'Code',      no: '03', ink: 'grape', blurb: '創意程式・互動・自造' },
  { id: 'sport',  name: '運動資訊', en: 'Sport',     no: '04', ink: 'pink',  blurb: '訓練・賽事・身體實驗' },
  { id: 'tabletop', name: '桌遊資訊', en: 'Tabletop', no: '05', ink: 'blue', blurb: '規則・設計・聚會' },
  { id: 'member', name: '成員介紹', en: 'Members',   no: '06', ink: 'grape', blurb: '俱樂部的人們' },
];

export const POSTS = [
  { id: 'p1', cat: 'draw',  title: '用三種顏色畫出一座城市', author: '阿默 Amo', date: '06.04', read: '4 分鐘', seed: 11, inks: ['pink','blue'], tag: '教學',
    excerpt: '限制反而帶來自由。這篇示意文字示範如何只用粉、藍與壓印紫，建構一整座有層次的城市風景。' },
  { id: 'p2', cat: 'code',  title: '一行程式，畫出會呼吸的網格', author: '小柚 Yuzu', date: '06.03', read: '7 分鐘', seed: 22, inks: ['grape','blue'], tag: '實驗',
    excerpt: '從一個 sin 函數開始，讓靜止的格線開始律動。佔位內容，之後替換成真正的程式碼解析。' },
  { id: 'p3', cat: 'know',  title: '把一本厚書，折成一張卡片', author: '林禾 Lin', date: '06.02', read: '5 分鐘', seed: 33, inks: ['blue','pink'], tag: '筆記術',
    excerpt: '知識的密度不在於頁數。示意文字介紹一套把長篇內容濃縮成單張視覺卡片的方法。' },
  { id: 'p4', cat: 'sport', title: '清晨五公里的身體日誌', author: '阿海 Hai', date: '06.01', read: '3 分鐘', seed: 44, inks: ['pink','grape'], tag: '日誌',
    excerpt: '把跑步當成一場田野調查。記錄心率、呼吸與路上的光，這是一段佔位的訓練筆記。' },
  { id: 'p5', cat: 'tabletop', title: '自製一款只有兩張牌的遊戲', author: '默默 Mo', date: '05.30', read: '6 分鐘', seed: 55, inks: ['blue','grape'], tag: '設計',
    excerpt: '最小的規則，最大的可能。示意文字拆解一款極簡桌遊的設計過程與測試心得。' },
  { id: 'p6', cat: 'draw',  title: '錯位印刷的美學筆記', author: '阿默 Amo', date: '05.28', read: '5 分鐘', seed: 66, inks: ['pink','blue'], tag: '美學',
    excerpt: '當粉紅與藍沒有對齊，意外誕生了第三種顏色。這是一篇關於「不完美」的佔位文章。' },
  { id: 'p7', cat: 'code',  title: '把資料變成一座聲音花園', author: '小柚 Yuzu', date: '05.26', read: '8 分鐘', seed: 77, inks: ['grape','pink'], tag: '互動',
    excerpt: '資料不一定要用圖表呈現。示意內容介紹如何用 Web Audio 把數字種成可以聆聽的花園。' },
  { id: 'p8', cat: 'know',  title: '十分鐘畫一張思考地圖', author: '林禾 Lin', date: '05.24', read: '4 分鐘', seed: 88, inks: ['blue','pink'], tag: '方法',
    excerpt: '從一個中心詞往外長。佔位文字示範一套快速展開思緒、整理靈感的視覺筆記法。' },
  { id: 'p9', cat: 'sport', title: '在城市裡找一面攀岩牆', author: '阿海 Hai', date: '05.22', read: '3 分鐘', seed: 99, inks: ['pink','blue'], tag: '探索',
    excerpt: '運動是一種與空間的對話。這段示意文字記錄一次城市抱石的路線與身體感受。' },
  { id: 'p10', cat: 'tabletop', title: '一場關於合作的桌遊夜', author: '默默 Mo', date: '05.20', read: '5 分鐘', seed: 12, inks: ['grape','blue'], tag: '聚會',
    excerpt: '沒有輸贏，只有一起過關。佔位內容分享一個以合作為核心的桌遊聚會側記。' },
];

export const ARTWORKS = [
  { id: 'a1',  title: '霓虹巷弄', author: '阿默',   medium: '數位繪圖', seed: 101, inks: ['pink','blue'] },
  { id: 'a2',  title: '會呼吸的網格', author: '小柚', medium: '生成藝術', seed: 102, inks: ['grape','blue'] },
  { id: 'a3',  title: '紙上的山', author: '林禾',     medium: '版畫', seed: 103, inks: ['blue','pink'] },
  { id: 'a4',  title: '晨跑的光', author: '阿海',     medium: '攝影拼貼', seed: 104, inks: ['pink','grape'] },
  { id: 'a5',  title: '兩張牌', author: '默默',       medium: '平面設計', seed: 105, inks: ['blue','grape'] },
  { id: 'a6',  title: '錯位之三', author: '阿默',     medium: '絹印實驗', seed: 106, inks: ['pink','blue'] },
  { id: 'a7',  title: '聲音花園', author: '小柚',     medium: '互動裝置', seed: 107, inks: ['grape','pink'] },
  { id: 'a8',  title: '思考地圖', author: '林禾',     medium: '手繪', seed: 108, inks: ['blue','pink'] },
  { id: 'a9',  title: '抱石路線', author: '阿海',     medium: '插畫', seed: 109, inks: ['pink','blue'] },
  { id: 'a10', title: '合作之夜', author: '默默',     medium: '海報', seed: 110, inks: ['grape','blue'] },
];

export const PHOTOS = [
  { id: 'ph1', caption: '繪圖之夜・速寫桌', seed: 201, inks: ['pink','blue'] },
  { id: 'ph2', caption: '程式工作坊', seed: 202, inks: ['grape','blue'] },
  { id: 'ph3', caption: '讀書會現場', seed: 203, inks: ['blue','pink'] },
  { id: 'ph4', caption: '清晨團練', seed: 204, inks: ['pink','grape'] },
  { id: 'ph5', caption: '桌遊聚會', seed: 205, inks: ['blue','grape'] },
  { id: 'ph6', caption: '版畫實驗室', seed: 206, inks: ['pink','blue'] },
  { id: 'ph7', caption: '成果展佈展', seed: 207, inks: ['grape','pink'] },
  { id: 'ph8', caption: '戶外寫生', seed: 208, inks: ['blue','pink'] },
  { id: 'ph9', caption: '靈感市集', seed: 209, inks: ['pink','blue'] },
  { id: 'ph10', caption: '深夜共創', seed: 210, inks: ['grape','blue'] },
];

export const MEMBERS = [
  { id: 'm1', name: '阿默 Amo',  role: '繪圖・絹印', seed: 301, inks: ['pink','blue'],  bio: '喜歡用最少的顏色說最多的故事。' },
  { id: 'm2', name: '小柚 Yuzu', role: '創意程式',   seed: 302, inks: ['grape','blue'], bio: '把程式當成畫筆，讓資料開花。' },
  { id: 'm3', name: '林禾 Lin',  role: '知識整理',   seed: 303, inks: ['blue','pink'],  bio: '相信好的筆記是一種設計。' },
  { id: 'm4', name: '阿海 Hai',  role: '運動・探索', seed: 304, inks: ['pink','grape'], bio: '用身體丈量城市的每個角落。' },
  { id: 'm5', name: '默默 Mo',   role: '桌遊設計',   seed: 305, inks: ['blue','grape'], bio: '最小的規則，最大的樂趣。' },
  { id: 'm6', name: '你 You',    role: '即將加入',   seed: 306, inks: ['grape','pink'], bio: '這個位置，留給正在閱讀的你。' },
];

export const NAV = ['網頁最新發佈', '作品展演', '活動花絮'];
export const VERBS = ['學習', '研究', '創造', '製造', '創作'];
