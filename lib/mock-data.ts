import {
  Clock3,
  GalleryHorizontalEnd,
  Home,
  Milestone,
  Network,
  Radar,
  Rocket
} from "lucide-react";
import type {
  CosmicEvent,
  FeaturedExploration,
  GalleryImage,
  HomeFeature,
  HomeHeroSpotlight,
  HomeJourneyRoute,
  InsightCard,
  Mission,
  NavItem,
  StarmapHighlight,
  StatItem,
  StructureLevel
} from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "人类探索", href: "/missions" },
  { label: "宇宙时间线", href: "/cosmic-timeline" },
  { label: "结构层级", href: "/structure" },
  { label: "交互星图", href: "/starmap" },
  { label: "图像库", href: "/gallery" }
];

export const homeStats: StatItem[] = [
  { label: "探索模块", value: "6", detail: "任务、时间线、结构、星图和图像库" },
  { label: "本地条目", value: "40+", detail: "全部页面先由 mock 数据驱动" },
  { label: "视觉系统", value: "3D", detail: "星场、玻璃面板和深空动效" }
];

export const homeFeatures: HomeFeature[] = [
  {
    title: "人类探索时间线",
    kicker: "航天任务",
    description: "追踪从第一颗人造卫星到深空望远镜的关键节点。",
    href: "/missions",
    icon: Milestone,
    iconTone: "border-nebula-amber/30 bg-nebula-amber/10 text-nebula-amber"
  },
  {
    title: "宇宙历史时间线",
    kicker: "深时尺度",
    description: "把宇宙大爆炸、第一束光、恒星形成和太阳系诞生串联起来。",
    href: "/cosmic-timeline",
    icon: Clock3,
    iconTone: "border-nebula-violet/30 bg-nebula-violet/10 text-nebula-violet"
  },
  {
    title: "宇宙结构层级",
    kicker: "尺度对照",
    description: "从行星世界一路放大到星系团、宇宙网和可观测宇宙。",
    href: "/structure",
    icon: Network,
    iconTone: "border-nebula-cyan/30 bg-nebula-cyan/10 text-nebula-cyan"
  },
  {
    title: "交互星图",
    kicker: "天空导航",
    description: "为后续的平移、缩放、筛选和星表叠加建立可视化基础。",
    href: "/starmap",
    icon: Radar,
    iconTone: "border-nebula-rose/30 bg-nebula-rose/10 text-nebula-rose"
  }
];

export const homeJourneyRoutes: HomeJourneyRoute[] = [
  {
    label: "首页",
    eyebrow: "起点",
    description: "从一条清晰路线进入 Cosmos Atlas。",
    href: "/",
    accent: "cyan",
    icon: Home
  },
  {
    label: "人类探索",
    eyebrow: "任务",
    description: "追踪人类离开地球后的关键节点。",
    href: "/missions",
    accent: "amber",
    icon: Rocket
  },
  {
    label: "宇宙时间线",
    eyebrow: "深时",
    description: "把宇宙历史压缩成可阅读的阶段。",
    href: "/cosmic-timeline",
    accent: "violet",
    icon: Clock3
  },
  {
    label: "结构层级",
    eyebrow: "尺度",
    description: "从行星一路放大到宇宙网。",
    href: "/structure",
    accent: "rose",
    icon: Network
  },
  {
    label: "交互星图",
    eyebrow: "星空",
    description: "在三维星图中定位恒星和深空目标。",
    href: "/starmap",
    accent: "cyan",
    icon: Radar
  },
  {
    label: "图像库",
    eyebrow: "影像",
    description: "用图像理解星云、星系和小天体。",
    href: "/gallery",
    accent: "amber",
    icon: GalleryHorizontalEnd
  }
];

export const missionTimeline: Mission[] = [
  {
    slug: "sputnik-1",
    year: "1957",
    name: "斯普特尼克 1 号",
    agency: "苏联航天计划",
    phase: "进入轨道",
    range: "近地轨道",
    destination: "地球低轨道",
    vehicle: "R-7 运载火箭",
    duration: "约 3 个月在轨",
    highlight: "第一次把人造物体送入地球轨道。",
    objective: "验证人造卫星发射、轨道跟踪和无线电信号传输。",
    outcome: "开启现代航天时代，也让轨道飞行从理论方案变成工程现实。",
    summary: "这颗无线电卫星证明了轨道飞行的可行性，也开启了现代航天时代。",
    tags: ["近地轨道", "第一颗卫星", "无线电信号"],
    details: [
      { label: "任务类型", value: "技术验证" },
      { label: "核心载荷", value: "无线电发射器" },
      { label: "历史意义", value: "航天时代起点" }
    ]
  },
  {
    slug: "apollo-11",
    year: "1969",
    name: "阿波罗 11 号",
    agency: "NASA",
    phase: "载人登月",
    range: "地月空间",
    destination: "月球静海",
    vehicle: "土星五号",
    duration: "约 8 天",
    highlight: "人类首次在月面行走并安全返回。",
    objective: "完成载人月面着陆、采样、实验部署和安全返回。",
    outcome: "带回月壤样本、工程经验和深空任务协同流程。",
    summary: "任务带回月壤样本和大量工程经验，让深空探索从想象变成可复用的方法。",
    tags: ["载人航天", "月球", "样本返回"],
    details: [
      { label: "乘组", value: "阿姆斯特朗、奥尔德林、柯林斯" },
      { label: "着陆区", value: "静海" },
      { label: "返回成果", value: "月壤样本与月面实验数据" }
    ]
  },
  {
    slug: "voyager-program",
    year: "1977",
    name: "旅行者计划",
    agency: "NASA / JPL",
    phase: "行星际穿越",
    range: "外太阳系至星际空间",
    destination: "外太阳系与星际空间",
    vehicle: "泰坦 IIIE-半人马座",
    duration: "持续运行中",
    highlight: "持续回传关于巨行星和日球层的数据。",
    objective: "借助行星引力辅助飞掠外太阳系，并长期探测日球层边界。",
    outcome: "刷新人类探测器最远距离记录，留下巨行星系统的基础观测资料。",
    summary: "两艘探测器依次飞掠木星、土星、天王星和海王星，并成为人类最远的信使。",
    tags: ["外太阳系", "引力辅助", "星际空间"],
    details: [
      { label: "探测器", value: "旅行者 1 号、旅行者 2 号" },
      { label: "关键成果", value: "巨行星卫星与环系统观测" },
      { label: "长期价值", value: "日球层和星际介质数据" }
    ]
  },
  {
    slug: "hubble-space-telescope",
    year: "1990",
    name: "哈勃空间望远镜",
    agency: "NASA / ESA",
    phase: "轨道天文台",
    range: "近地轨道",
    destination: "地球低轨道",
    vehicle: "发现号航天飞机",
    duration: "长期运行",
    highlight: "重新定义公众对深空图像的直觉。",
    objective: "在大气层之上进行高分辨率可见光和紫外观测。",
    outcome: "深场图像、星系演化、宇宙膨胀和恒星生命周期研究取得大量成果。",
    summary: "哈勃长期观测星云、星系和深场，为宇宙年龄、膨胀和星系演化提供关键证据。",
    tags: ["空间望远镜", "深场", "可见光"],
    details: [
      { label: "轨道", value: "近地轨道" },
      { label: "代表图像", value: "哈勃深场、创生之柱" },
      { label: "观测重点", value: "星云、星系、宇宙膨胀" }
    ]
  },
  {
    slug: "curiosity-rover",
    year: "2012",
    name: "好奇号火星车",
    agency: "NASA",
    phase: "行星表面实验室",
    range: "火星盖尔陨石坑",
    destination: "火星",
    vehicle: "Atlas V 541",
    duration: "持续运行中",
    highlight: "在火星表面进行长期地质和环境分析。",
    objective: "评估火星过去是否拥有适宜微生物存在的环境条件。",
    outcome: "确认古代火星曾存在可支持宜居环境的沉积记录。",
    summary: "它把火星从远距离影像目标变成可持续采样、钻探和化学分析的现场。",
    tags: ["火星", "地质分析", "行星宜居性"],
    details: [
      { label: "着陆区", value: "盖尔陨石坑" },
      { label: "核心仪器", value: "化学实验室、钻探系统、相机" },
      { label: "研究主题", value: "水环境、岩石化学、辐射环境" }
    ]
  },
  {
    slug: "james-webb-space-telescope",
    year: "2021",
    name: "詹姆斯·韦布空间望远镜",
    agency: "NASA / ESA / CSA",
    phase: "红外深空观测",
    range: "日地 L2 点",
    destination: "日地 L2 拉格朗日点",
    vehicle: "阿丽亚娜 5 号",
    duration: "长期运行",
    highlight: "以前所未有的红外灵敏度观察早期星系和恒星诞生区。",
    objective: "研究第一批星系、恒星形成、行星系统和系外行星大气。",
    outcome: "把深空红外观测推进到更高灵敏度和更早宇宙时期。",
    summary: "韦布把观测窗口推向尘埃之后和更高红移的宇宙，为下一代宇宙学问题打开入口。",
    tags: ["红外观测", "早期星系", "系外行星"],
    details: [
      { label: "位置", value: "日地 L2 点" },
      { label: "主镜", value: "6.5 米分段镜" },
      { label: "观测重点", value: "早期星系、恒星诞生、行星大气" }
    ]
  }
];

export const cosmicEvents: CosmicEvent[] = [
  {
    id: "hot-early-universe",
    epoch: "约 138 亿年前",
    title: "炽热早期宇宙",
    signal: "原初涨落",
    temperature: "极高温高密",
    relativePosition: 2,
    accent: "violet",
    keyPoint: "微小密度涨落成为星系和宇宙网的种子。",
    description: "空间从极热、极密状态快速膨胀并冷却，微小密度差异成为未来结构的种子。",
    evidence: ["宇宙微波背景中的温度起伏", "大尺度结构统计", "轻元素丰度"]
  },
  {
    id: "transparent-universe",
    epoch: "约 38 万年后",
    title: "宇宙变得透明",
    signal: "宇宙微波背景",
    temperature: "约 3000 K",
    relativePosition: 12,
    accent: "cyan",
    keyPoint: "光子开始自由传播，宇宙留下最古老的可观测背景。",
    description: "电子与原子核结合成中性原子，光子开始自由传播，留下今天可观测的背景辐射。",
    evidence: ["宇宙微波背景辐射", "全天微波温度图", "偏振观测"]
  },
  {
    id: "first-stars",
    epoch: "约 1 至 4 亿年后",
    title: "第一代恒星点亮",
    signal: "再电离痕迹",
    temperature: "局部高温辐射区",
    relativePosition: 28,
    accent: "amber",
    keyPoint: "第一代恒星把黑暗宇宙重新点亮，并开始制造重元素。",
    description: "最早的恒星在暗物质晕中形成，强紫外辐射逐步改变星际和星系际介质。",
    evidence: ["高红移星系候选体", "再电离时期吸收线", "早期恒星形成模型"]
  },
  {
    id: "galaxy-network",
    epoch: "约 10 亿年后",
    title: "星系网络成形",
    signal: "高红移星系",
    temperature: "冷热气体并存",
    relativePosition: 48,
    accent: "rose",
    keyPoint: "星系在暗物质骨架上聚集，宇宙网开始显现。",
    description: "星系并合、气体吸积和恒星形成共同塑造宇宙网中明亮的节点。",
    evidence: ["深场巡天", "高红移星系分布", "星系并合痕迹"]
  },
  {
    id: "solar-system-forms",
    epoch: "约 46 亿年前",
    title: "太阳系形成",
    signal: "陨石同位素记录",
    temperature: "原行星盘冷却",
    relativePosition: 86,
    accent: "cyan",
    keyPoint: "原行星盘中的尘埃和冰粒逐步汇聚成行星系统。",
    description: "年轻太阳周围的尘埃与气体盘演化为行星、卫星、小天体和残余碎片带。",
    evidence: ["陨石同位素记录", "原行星盘观测", "太阳系小天体成分"]
  }
];

export const cosmicInsights: InsightCard[] = [
  {
    title: "观测不是回看照片，而是接收迟到的光",
    description: "越遥远的天体，光走到我们这里所需的时间越长。深空观测本质上是在读取宇宙的历史切片。",
    metric: "时间即距离"
  },
  {
    title: "微小涨落塑造宏大结构",
    description: "早期宇宙中的密度差异经过引力放大，最终形成星系、星系团和宇宙网。",
    metric: "涨落到结构"
  },
  {
    title: "多波段观测拼出完整故事",
    description: "可见光、红外、射电和 X 射线分别揭示不同温度、尘埃和能量过程。",
    metric: "同一宇宙，多种窗口"
  }
];

export const structureLevels: StructureLevel[] = [
  {
    id: "planetary-worlds",
    order: "01",
    name: "行星世界",
    scale: "数千至数十万公里",
    scaleValue: 1,
    description: "岩质行星、气态巨行星、矮行星、卫星、环系统和局部大气环境。",
    examples: ["地球", "木星", "泰坦", "冥王星"],
    dominantForce: "地质、大气和局部引力主导。",
    observation: "探测器、光谱、雷达和原位采样。",
    accent: "cyan"
  },
  {
    id: "stellar-systems",
    order: "02",
    name: "恒星系统",
    scale: "天文单位至数光年",
    scaleValue: 3,
    description: "恒星、行星系统、双星、星团、星云和邻近恒星群共同组成局部天体环境。",
    examples: ["太阳系", "半人马座阿尔法", "昴星团"],
    dominantForce: "恒星引力和辐射塑造局部环境。",
    observation: "视差测量、光度变化、红外和可见光观测。",
    accent: "violet"
  },
  {
    id: "galactic-structures",
    order: "03",
    name: "星系结构",
    scale: "数千至数十万光年",
    scaleValue: 6,
    description: "星系把恒星、气体、尘埃、暗物质和中央致密天体组织在一个引力系统内。",
    examples: ["银河系", "仙女座星系", "大麦哲伦云"],
    dominantForce: "暗物质晕、恒星盘和气体循环共同主导。",
    observation: "多波段巡天、恒星运动、气体谱线。",
    accent: "amber"
  },
  {
    id: "galaxy-clusters",
    order: "04",
    name: "星系团",
    scale: "数百万至上千万光年",
    scaleValue: 8,
    description: "大量星系被共同引力束缚，热气体和暗物质晕构成主要质量成分。",
    examples: ["室女座星系团", "后发座星系团"],
    dominantForce: "引力束缚、热气体和暗物质晕主导。",
    observation: "X 射线、引力透镜和星系红移巡天。",
    accent: "rose"
  },
  {
    id: "cosmic-web",
    order: "05",
    name: "宇宙网",
    scale: "数亿光年",
    scaleValue: 10,
    description: "纤维状星系分布和巨大空洞构成可观测宇宙的大尺度骨架。",
    examples: ["星系丝状结构", "巨洞", "拉尼亚凯亚超星系团"],
    dominantForce: "暗物质骨架和大尺度引力增长主导。",
    observation: "大规模红移巡天、弱引力透镜和数值模拟。",
    accent: "violet"
  },
  {
    id: "observable-universe",
    order: "06",
    name: "可观测宇宙",
    scale: "直径约 930 亿光年",
    scaleValue: 12,
    description: "从地球出发，光在宇宙年龄内能够抵达我们的全部区域。",
    examples: ["宇宙微波背景", "深场星系", "大尺度各向同性"],
    dominantForce: "宇宙膨胀、光速视界和大尺度统计主导。",
    observation: "宇宙微波背景、深场观测和星系巡天。",
    accent: "cyan"
  }
];

export const structureInsights: InsightCard[] = [
  {
    title: "尺度变化会改变问题本身",
    description: "行星尺度关注地质和大气，星系尺度关注引力和恒星族群，宇宙网尺度关注暗物质和大尺度统计。",
    metric: "同一物理，不同主导量"
  },
  {
    title: "可见物质只是一部分",
    description: "星系团和宇宙网的结构需要暗物质参与解释，热气体和引力透镜提供重要线索。",
    metric: "暗物质骨架"
  },
  {
    title: "层级不是静态目录",
    description: "小尺度结构会被大尺度环境塑造，星系并合、气体流入和反馈过程持续改变层级关系。",
    metric: "动态演化"
  }
];

export const starmapHighlights: StarmapHighlight[] = [
  {
    id: "sirius",
    name: "天狼星",
    type: "主序星",
    distance: "8.6 光年",
    magnitude: "-1.46",
    coordinates: [1.8, -0.2, 0.4],
    color: "cyan",
    region: "大犬座方向",
    observation: "冬季夜空中最明亮的恒星之一，适合作为星图亮度参照。",
    description: "天狼星是近邻双星系统中较亮的成员，在视觉星图中可作为南天区域的高亮锚点。"
  },
  {
    id: "vega",
    name: "织女星",
    type: "主序星",
    distance: "25 光年",
    magnitude: "0.03",
    coordinates: [-1.2, 1.1, -0.3],
    color: "violet",
    region: "天琴座方向",
    observation: "夏季大三角的重要成员，亮度稳定，颜色偏冷。",
    description: "织女星常被用作光度和颜色校准参考，也适合在教学星图中解释恒星颜色。"
  },
  {
    id: "betelgeuse",
    name: "参宿四",
    type: "红超巨星",
    distance: "约 550 光年",
    magnitude: "0.0-1.6",
    coordinates: [0.2, -1.3, 1.2],
    color: "rose",
    region: "猎户座方向",
    observation: "亮度会发生变化，红色外观明显，适合解释恒星晚期演化。",
    description: "参宿四是一颗体积巨大的红超巨星，代表大质量恒星走向生命末期的阶段。"
  },
  {
    id: "polaris",
    name: "北极星",
    type: "造父变星系统",
    distance: "约 448 光年",
    magnitude: "1.98",
    coordinates: [0.1, 1.8, -0.1],
    color: "amber",
    region: "小熊座方向",
    observation: "接近北天极，常用于解释天球转动和方向定位。",
    description: "北极星并非天空中最亮的星，但它的位置让它成为北半球导航中的重要参照。"
  },
  {
    id: "altair",
    name: "牛郎星",
    type: "主序星",
    distance: "16.7 光年",
    magnitude: "0.77",
    coordinates: [1.1, 0.9, -1.2],
    color: "white",
    region: "天鹰座方向",
    observation: "夏季大三角成员之一，自转速度快。",
    description: "牛郎星距离太阳较近，在交互星图中适合展示近邻恒星和季节星空联系。"
  },
  {
    id: "alpha-centauri",
    name: "南门二",
    type: "三合星系统",
    distance: "4.37 光年",
    magnitude: "-0.27",
    coordinates: [-1.6, -0.7, 0.7],
    color: "cyan",
    region: "半人马座方向",
    observation: "太阳最近的恒星系统，适合作为近邻距离尺度参照。",
    description: "南门二系统包含多颗恒星，其中比邻星是距离太阳最近的已知恒星。"
  },
  {
    id: "andromeda",
    name: "仙女座星系",
    type: "星系",
    distance: "约 254 万光年",
    magnitude: "3.44",
    coordinates: [-2.2, 0.4, -1.4],
    color: "violet",
    region: "仙女座方向",
    observation: "肉眼可见的河外星系之一，适合解释银河系外尺度。",
    description: "仙女座星系是本星系群的重要成员，也会在遥远未来与银河系发生并合。"
  },
  {
    id: "pleiades",
    name: "昴星团",
    type: "疏散星团",
    distance: "约 444 光年",
    magnitude: "1.6",
    coordinates: [1.7, 0.6, -0.8],
    color: "cyan",
    region: "金牛座方向",
    observation: "年轻恒星聚集明显，蓝白色成员星适合解释星团形成。",
    description: "昴星团由一批年轻恒星组成，是理解恒星共同诞生和早期演化的经典目标。"
  },
  {
    id: "orion-nebula",
    name: "猎户座大星云",
    type: "星云",
    distance: "约 1344 光年",
    magnitude: "4.0",
    coordinates: [0.6, -1.5, 0.9],
    color: "rose",
    region: "猎户座方向",
    observation: "恒星形成区明亮，适合展示气体云、尘埃和新生恒星。",
    description: "猎户座大星云是距离较近的大质量恒星形成区，能直观展示恒星诞生环境。"
  },
  {
    id: "crab-nebula",
    name: "蟹状星云",
    type: "超新星遗迹",
    distance: "约 6500 光年",
    magnitude: "8.4",
    coordinates: [-0.8, -1.0, -1.5],
    color: "amber",
    region: "金牛座方向",
    observation: "中心脉冲星和扩张遗迹适合解释高能天体过程。",
    description: "蟹状星云来自一次历史超新星爆发，遗迹中包含高速粒子和强辐射结构。"
  },
  {
    id: "deneb",
    name: "天津四",
    type: "蓝白超巨星",
    distance: "约 2600 光年",
    magnitude: "1.25",
    coordinates: [-1.5, 1.3, 0.9],
    color: "white",
    region: "天鹅座方向",
    observation: "距离远但仍然明亮，适合解释恒星本征亮度。",
    description: "天津四是非常明亮的超巨星，说明视亮度同时受距离和真实光度影响。"
  },
  {
    id: "rigel",
    name: "参宿七",
    type: "蓝超巨星",
    distance: "约 860 光年",
    magnitude: "0.13",
    coordinates: [1.0, -1.1, 1.6],
    color: "violet",
    region: "猎户座方向",
    observation: "蓝白色亮星，常与参宿四形成颜色和演化阶段对比。",
    description: "参宿七是一颗高温蓝超巨星，适合与红超巨星参宿四一起解释恒星颜色差异。"
  }
];

export const galleryImages: GalleryImage[] = [
  {
    slug: "pillars-of-creation",
    title: "创生之柱",
    category: "星云",
    objectType: "恒星形成区",
    wavelength: "可见光 / 红外",
    description: "用模拟视觉呈现稠密气体柱，适合展示恒星形成、尘埃遮蔽和辐射侵蚀。",
    observation: "红外波段可以穿透部分尘埃，让隐藏在气体柱内部和边缘的新生恒星更容易被识别。",
    source: "本地模拟图像",
    tags: ["恒星形成", "尘埃", "红外观测"],
    details: [
      { label: "对象类型", value: "发射星云中的致密柱状结构" },
      { label: "科学主题", value: "恒星诞生、辐射反馈、尘埃遮蔽" },
      { label: "视觉策略", value: "暖色尘埃与冷色电离气体对比" }
    ],
    gradient: "bg-[radial-gradient(circle_at_25%_25%,rgba(247,199,107,0.85),transparent_22%),radial-gradient(circle_at_70%_50%,rgba(109,229,255,0.35),transparent_24%),linear-gradient(135deg,#10172a,#421538)]"
  },
  {
    slug: "spiral-city",
    title: "旋臂之城",
    category: "星系",
    objectType: "旋涡星系",
    wavelength: "可见光",
    description: "用于承载星系形态、旋臂、恒星形成带和中央核球等基础说明。",
    observation: "旋臂中的蓝白色区域通常对应年轻恒星和活跃恒星形成区，中央核球则包含更老的恒星族群。",
    source: "本地模拟图像",
    tags: ["旋涡星系", "恒星形成", "星系结构"],
    details: [
      { label: "对象类型", value: "盘状星系" },
      { label: "科学主题", value: "旋臂密度波、恒星族群、星系盘" },
      { label: "视觉策略", value: "明亮核心与旋臂渐变" }
    ],
    gradient: "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.92),transparent_8%),radial-gradient(circle_at_42%_45%,rgba(167,139,250,0.62),transparent_26%),linear-gradient(135deg,#08111f,#172554)]"
  },
  {
    slug: "aurora-planet",
    title: "极光行星",
    category: "行星",
    objectType: "磁层与大气",
    wavelength: "紫外 / 可见光",
    description: "本地模拟图像卡，用来讲述行星大气、磁场和太阳风相互作用。",
    observation: "极光通常来自带电粒子沿磁力线进入大气并激发原子或分子发光。",
    source: "本地模拟图像",
    tags: ["行星大气", "磁层", "太阳风"],
    details: [
      { label: "对象类型", value: "拥有磁层的行星" },
      { label: "科学主题", value: "带电粒子、磁场、大气发光" },
      { label: "视觉策略", value: "冷色发光环与行星暗面" }
    ],
    gradient: "bg-[radial-gradient(circle_at_54%_58%,rgba(109,229,255,0.8),transparent_19%),radial-gradient(circle_at_40%_42%,rgba(16,185,129,0.45),transparent_26%),linear-gradient(135deg,#031018,#172033)]"
  },
  {
    slug: "cluster-lens",
    title: "星系团透镜",
    category: "深场",
    objectType: "引力透镜",
    wavelength: "近红外",
    description: "为后续展示引力透镜、暗物质分布和遥远星系团信息预留结构。",
    observation: "大质量星系团会弯曲背景星系的光路，形成弧状、拉伸或多重成像。",
    source: "本地模拟图像",
    tags: ["引力透镜", "暗物质", "深场"],
    details: [
      { label: "对象类型", value: "大质量星系团" },
      { label: "科学主题", value: "引力透镜、暗物质分布、背景星系" },
      { label: "视觉策略", value: "暖色透镜弧与深空背景" }
    ],
    gradient: "bg-[radial-gradient(circle_at_60%_40%,rgba(251,113,133,0.6),transparent_18%),radial-gradient(circle_at_36%_60%,rgba(247,199,107,0.38),transparent_22%),linear-gradient(135deg,#090a1a,#2e1065)]"
  },
  {
    slug: "comet-trail",
    title: "彗星尾迹",
    category: "小天体",
    objectType: "彗星 / 小行星",
    wavelength: "可见光",
    description: "用于展示太阳系小天体、尘埃尾、离子尾和轨道演化等主题。",
    observation: "彗星接近太阳时挥发物升华，形成彗发和尾迹；离子尾与尘埃尾通常呈现不同方向和形态。",
    source: "本地模拟图像",
    tags: ["彗星", "小天体", "太阳系"],
    details: [
      { label: "对象类型", value: "富含挥发物的小天体" },
      { label: "科学主题", value: "升华、尘埃释放、太阳风作用" },
      { label: "视觉策略", value: "斜向尾迹与明亮彗核" }
    ],
    gradient: "bg-[linear-gradient(125deg,transparent_35%,rgba(109,229,255,0.75)_36%,transparent_49%),radial-gradient(circle_at_68%_40%,rgba(255,255,255,0.85),transparent_7%),linear-gradient(135deg,#06111f,#0f172a)]"
  },
  {
    slug: "radio-shell",
    title: "射电壳层",
    category: "超新星",
    objectType: "超新星遗迹",
    wavelength: "射电 / X 射线",
    description: "为多波段观测、冲击波结构和元素丰度说明提供未来扩展入口。",
    observation: "超新星爆发后的冲击波会压缩并加热周围介质，不同波段揭示不同温度和粒子能量。",
    source: "本地模拟图像",
    tags: ["超新星遗迹", "多波段", "冲击波"],
    details: [
      { label: "对象类型", value: "恒星爆发后的扩张壳层" },
      { label: "科学主题", value: "元素合成、冲击波、粒子加速" },
      { label: "视觉策略", value: "环状壳层与高能色彩" }
    ],
    gradient: "bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(109,229,255,0.45)_31%,transparent_46%),radial-gradient(circle_at_52%_48%,rgba(167,139,250,0.5),transparent_18%),linear-gradient(135deg,#030712,#1e1b4b)]"
  }
];

export const featuredExplorations: FeaturedExploration[] = [
  {
    label: "推荐任务",
    title: "阿波罗 11 号",
    description: "从地月空间的工程协同理解载人深空探索。",
    href: "/missions/apollo-11"
  },
  {
    label: "推荐图像",
    title: "星系团透镜",
    description: "通过引力透镜理解星系团质量和暗物质线索。",
    href: "/gallery/cluster-lens"
  },
  {
    label: "推荐阶段",
    title: "宇宙变得透明",
    description: "宇宙微波背景是读取早期宇宙状态的核心窗口。",
    href: "/cosmic-timeline"
  }
];

export const homeHeroSpotlight: HomeHeroSpotlight = {
  label: "今日推荐探索",
  title: "从宇宙微波背景开始阅读深时",
  description:
    "先进入宇宙历史时间线，观察第一束自由传播的光如何成为今天理解早期宇宙的关键证据。",
  href: "/cosmic-timeline",
  metrics: [
    { label: "入口", value: "宇宙时间线" },
    { label: "线索", value: "宇宙微波背景" },
    { label: "尺度", value: "约 138 亿年" }
  ]
};
