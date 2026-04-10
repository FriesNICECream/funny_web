export const mediaPrimaryNav = [
  { id: "movies", label: "Movies", tone: "热门片库" },
  { id: "series", label: "TV Series", tone: "剧集专区" },
  { id: "trending", label: "Trending", tone: "趋势内容" },
  { id: "arrivals", label: "New Arrivals", tone: "最新入库" },
];

export const mediaSidebarNav = [
  { id: "landing", label: "初始界面", detail: "Fluid Glass 首屏" },
  { id: "media-data", label: "影视数据", detail: "资源总览与链接" },
  { id: "library", label: "Library", detail: "片单归档" },
  { id: "collections", label: "Collections", detail: "精选合集" },
  { id: "requests", label: "Requests", detail: "资源请求" },
];

export const mediaSortOptions = [
  { id: "featured", label: "精选优先" },
  { id: "rating", label: "评分最高" },
  { id: "year", label: "上映时间" },
];

export const mediaQuickFilters = [
  { id: "all", label: "全部资源" },
  { id: "4k", label: "4K 优先" },
  { id: "new", label: "本周更新" },
  { id: "classic", label: "经典收藏" },
];

export const mediaLibraryStats = [
  { id: "titles", label: "资源条目", value: "128" },
  { id: "links", label: "可用链接", value: "386" },
  { id: "refresh", label: "最近同步", value: "10 min" },
];

export const mediaItems = [
  {
    id: "blade-runner-2049",
    title: "银翼杀手 2049",
    subtitle: "未来都市、复制人与记忆迷雾",
    description: "收藏级画质版本，适合用作视觉系科幻片库首页展示。",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASQb_FUqW8-6tPwyQF9cHEA08iSC9SA5cs0RgxsUyIo67K6AGY32SMJ58NSCTcIIvSrxxWlTrer9PNcKJYLgjja1xRStg1D78W5nhSDx8fNRNj8Fk63AFopnIjp2oGixtrTdRO5cvVoKiYz7sPxXIyUiZWjb3HbtNfLcpcmFFPpmpK-yIkDLIPMIFJhtI-ELE_70jCeoM22tKN6WxUFJhbkZCLKM3wPv33jhVECjgJHglVGpJDcJdi6lwrozeSbYvbof574qgsG7k",
    releaseYear: 2024,
    rating: 8.8,
    qualityBadge: "4K UHD",
    genres: ["Sci-Fi", "Drama"],
    category: "movies",
    isNew: true,
    links: [
      { id: "br2049-remux", label: "BD-Remux 4K High Bitrate", detail: "百度网盘 · 原盘封装", href: "https://pan.baidu.com/", status: "available" },
      { id: "br2049-web", label: "WebDL Dolby Vision", detail: "阿里云盘 · 杜比视界", href: "https://www.aliyundrive.com/", status: "available" },
    ],
  },
  {
    id: "dune-part-two",
    title: "沙丘：第二部",
    subtitle: "沙海远征、宗教预言与帝国战争",
    description: "高热度新片，适合作为新入库与趋势内容的双重示例。",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    releaseYear: 2024,
    rating: 8.9,
    qualityBadge: "Dolby Vision",
    genres: ["Epic", "Adventure"],
    category: "arrivals",
    isNew: true,
    links: [
      { id: "dune2-pan", label: "IMAX Enhanced", detail: "夸克网盘 · 中文字幕", href: "https://pan.quark.cn/", status: "available" },
      { id: "dune2-backup", label: "备份链接待校验", detail: "离线备份通道", href: "", status: "pending" },
    ],
  },
  {
    id: "the-bear",
    title: "熊家餐馆 第三季",
    subtitle: "厨房高压、家庭情绪与节奏感剪辑",
    description: "作为剧集卡片示例，突出连续内容与季信息展示。",
    coverImage: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1200&q=80",
    releaseYear: 2025,
    rating: 8.6,
    qualityBadge: "Season Pack",
    genres: ["Drama", "Comedy"],
    category: "series",
    isNew: true,
    links: [{ id: "bear-s03-pack", label: "S03 全集打包", detail: "百度网盘 · 1080P", href: "https://pan.baidu.com/", status: "available" }],
  },
  {
    id: "in-the-mood-for-love",
    title: "花样年华",
    subtitle: "经典修复、胶片质感与氛围收藏",
    description: "用于验证经典片单、长标题和较少链接的卡片样式。",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    releaseYear: 2000,
    rating: 8.7,
    qualityBadge: "Criterion",
    genres: ["Classic", "Romance"],
    category: "classic",
    isNew: false,
    links: [{ id: "ittmfl-restore", label: "4K 修复版", detail: "115 网盘 · 收藏压制", href: "https://115.com/", status: "available" }],
  },
  {
    id: "severance",
    title: "人生切割术",
    subtitle: "办公室悬疑与极简未来感",
    description: "用于验证趋势内容和多标签组合展示。",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    releaseYear: 2025,
    rating: 8.5,
    qualityBadge: "HDR10+",
    genres: ["Thriller", "Mystery"],
    category: "trending",
    isNew: true,
    links: [
      { id: "severance-season", label: "S01-S02 整理合集", detail: "阿里云盘 · 双语字幕", href: "https://www.aliyundrive.com/", status: "available" },
      { id: "severance-note", label: "增补花絮待上传", detail: "制作资料整理中", href: "", status: "pending" },
    ],
  },
  {
    id: "empty-protocol",
    title: "未命名资源样例",
    subtitle: "用于校验字段缺省与占位态",
    description: "",
    coverImage: "",
    releaseYear: null,
    rating: null,
    qualityBadge: "Link Pending",
    genres: ["Archive"],
    category: "movies",
    isNew: false,
    links: [{ id: "empty-note", label: "链接待补充", detail: "当前仅保留条目占位", href: "", status: "missing" }],
  },
];
