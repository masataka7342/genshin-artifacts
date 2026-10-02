// 原神Wiki (https://wikiwiki.jp/genshinwiki/) 準拠データベース
// 各キャラクターのビルド、推奨聖遺物、メイン/サブステータス優先度、解説

const STAT_MAX_ROLLS = {
  "会心率": 3.89,
  "会心ダメージ": 7.77,
  "攻撃力%": 5.83,
  "HP%": 5.83,
  "防御力%": 7.29,
  "元素チャージ効率": 6.48,
  "元素熟知": 23.31,
  "攻撃力": 19.45,
  "HP": 298.75,
  "防御力": 23.15
};

const GENSHIN_WIKI_CHARACTERS = {
  // ==========================================
  // Ver 7.1 最新環境 (ナド・クライ / カーンルイア / スネージナヤ)
  // ==========================================
  "flins": {
    name: "フリンズ",
    enName: "Flins",
    element: "Electro",
    version: "Ver 7.1",
    iconColor: "#9333ea",
    role: "メインアタッカー (月感電特化 / ライトキーパー)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%95%E3%83%AA%E3%83%B3%E3%82%BA",
    bestSets: [
      { name: "天穹の顕現せし夜", pieces: 4, rank: "最適 (専用セット)", desc: "月感電反応ダメージおよび攻撃力を大幅強化。フリンズの圧倒的最適解。" },
      { name: "黒曜の秘典", pieces: 4, rank: "汎用会心", desc: "夜魂/スタンス切り替え時の会心率+40%。" },
      { name: "剣闘士のフィナーレ", pieces: 4, rank: "通常攻撃特化", desc: "通常攻撃ダメージ+35%＆攻撃力+18%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["攻撃力%", "雷元素ダメージ"], // 月感電には与ダメバフが乗らない仕様のため攻撃力杯推奨！
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素熟知", "元素チャージ効率"],
      tierB: ["攻撃力"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "110-130%",
    wikiAdvice: "原神Wiki【Ver 7.1】解説：ナド・クライのライトキーパー。『月感電』反応を軸とする超高火力オンフィールドアタッカー。月感電ダメージには通常の元素ダメバフが乗らない仕様のため、杯は雷バフ杯よりも【攻撃力%杯】が推奨されます。攻撃力2000以上を目標にしつつ、会心系を極限まで伸ばすのが鉄則です。"
  },
  "dainsleif": {
    name: "ダインスレイヴ",
    element: "Geo", // または異界/無属性
    version: "Ver 7.1",
    iconColor: "#3b82f6",
    role: "メインアタッカー (カーンルイアの剣)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%80%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%AC%E3%82%A4%E3%83%B4",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "最適 (会心率40%)", desc: "夜魂/異界の力消費で会心率+40%＆与ダメージ増加。最高峰の会心アタッカーセット。" },
      { name: "剣闘士のフィナーレ", pieces: 4, rank: "汎用最適", desc: "通常攻撃ダメージ+35%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["攻撃力%", "物理ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "110-130%",
    wikiAdvice: "原神Wiki【Ver 7.1】解説：カーンルイアの異界の力を振るうメインアタッカー。基礎倍率が極めて高いため、攻撃力%時計・会心ダメージ冠で火力を最大化するのが理論値です。"
  },
  "tsaritsa": {
    name: "ツァリーツァ (氷神)",
    element: "Cryo",
    version: "Ver 7.1",
    iconColor: "#38bdf8",
    role: "サブアタッカー / 全体バッファー (氷の神)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B9%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%8A%E3%83%A4",
    bestSets: [
      { name: "氷風を彷徨う勇士", pieces: 4, rank: "最適 (凍結・会心率40%)", desc: "敵凍結時に会心率最大+40%。氷神の領域展開と完璧にシナジー。" },
      { name: "絶縁の旗印", pieces: 4, rank: "爆発サポート", desc: "爆発ダメージ強化と味方へのエネルギー供給。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素チャージ効率"],
      goblet: ["氷元素ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "元素チャージ効率"],
      tierA: ["攻撃力%", "元素熟知 (溶解時)"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "140-160%",
    wikiAdvice: "原神Wiki【Ver 7.1】解説：スネージナヤを統べる氷の神。チーム全体への強烈な溶解・凍結反応バフと継続追撃を展開。氷風4セットによる会心率+40%を活かして会心ダメージを限界まで盛るのが基本です。"
  },
  "capitano": {
    name: "カピターノ (隊長)",
    element: "Cryo",
    version: "Ver 7.1",
    iconColor: "#0284c7",
    role: "メインアタッカー (ファデュイ第1位)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%AB%E3%83%94%E3%82%BF%E3%83%BC%E3%83%8E",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "最適 (第一候補)", desc: "会心率+40%と圧倒的なダメージバフ。最強戦士の一撃火力を最大化。" },
      { name: "氷風を彷徨う勇士", pieces: 4, rank: "氷特化", desc: "氷元素ダメージ特化。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["氷元素ダメージ", "攻撃力%"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "攻撃力%", "会心率"],
      tierA: ["元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "110-120%",
    wikiAdvice: "原神Wiki【Ver 7.1】解説：ファデュイ執行官第1位・テイワット最強の人間。天賦による圧倒的基礎攻撃力を活かし、攻撃力%と会心ダメージに完全特化させます。"
  },
  "columbina": {
    name: "コロンビーナ (少女)",
    element: "Hydro",
    version: "Ver 7.1",
    iconColor: "#0284c7",
    role: "サポーター / 領域展開バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%93%E3%83%BC%E3%83%8A",
    bestSets: [
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "最適 (全体40%バフ)", desc: "反応時にチーム全員に対応元素ダメバフ+40%。" },
      { name: "沈淪の心", pieces: 2, rank: "水元素強化", desc: "水元素ダメージ+15%。" }
    ],
    mainStats: {
      sands: ["元素熟知", "元素チャージ効率"],
      goblet: ["水元素ダメージ", "元素熟知"],
      circlet: ["元素熟知", "会心率"]
    },
    substatPriority: {
      tierS: ["元素熟知", "元素チャージ効率 (160-180%)"],
      tierA: ["HP%", "会心率"],
      tierB: [],
      tierTrash: ["攻撃力%", "防御力%"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki【キャラクター一覧：水元素】準拠：第3位の執行官。全元素反応をトリガーにした領域展開バフを展開。元素熟知とチャージ効率を極限まで盛る熟知サポートビルドが推奨です。"
  },
  "dottore": {
    name: "ドットーレ (博士)",
    element: "Electro",
    version: "Ver 7.1",
    iconColor: "#9333ea",
    role: "サブアタッカー / デバッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%89%E3%83%83%E3%83%88%E3%83%BC%E3%83%AC",
    bestSets: [
      { name: "絶縁の旗印", pieces: 4, rank: "最適 (爆発火力)", desc: "元素爆発ダメージ最大+75%。" },
      { name: "黄金の劇団", pieces: 4, rank: "義体スキル追撃", desc: "控えからの義体スキル追撃+70%。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素チャージ効率"],
      goblet: ["雷元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素チャージ効率", "元素熟知"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "150-170%",
    wikiAdvice: "原神Wiki【Ver 7.1】解説：第2位の執行官。義体による多重継続追撃と敵防御力デバフ。爆発を回すチャージ効率と会心率のバランスが重要です。"
  },
  "skirk": {
    name: "スカーク",
    element: "Cryo",
    version: "Ver 7.1",
    iconColor: "#38bdf8",
    role: "メインアタッカー (深淵剣術)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B9%E3%82%AB%E3%83%BC%E3%82%AF",
    bestSets: [
      { name: "氷風を彷徨う勇士", pieces: 4, rank: "最適 (会心率40%)", desc: "凍結時に会心率+40%。" },
      { name: "ファントムハンター", pieces: 4, rank: "自傷シナジー", desc: "HP増減と連動して会心率を底上げ。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["氷元素ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素チャージ効率"],
      tierB: ["元素熟知"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "120-140%",
    wikiAdvice: "原神Wiki【キャラクター一覧：氷元素】準拠：タルタリヤの師匠。深淵の次元斬撃による怒涛の連続氷属性会心攻撃を繰り出すため、攻撃力%時計・氷杯・会心ダメージ冠が最適です。"
  },
  "ineffa": {
    name: "イネファ",
    element: "Electro",
    version: "Ver 7.1",
    iconColor: "#9333ea",
    role: "サブアタッカー / 月感電サポーター",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%A4%E3%83%8D%E3%83%95%E3%82%A1",
    bestSets: [
      { name: "天穹の顕現せし夜", pieces: 4, rank: "最適 (月感電特化)", desc: "月感電反応の頻度とダメージを最大化。" },
      { name: "黄金の劇団", pieces: 4, rank: "スキル追撃", desc: "控えスキル追撃ダメージ+70%。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素チャージ効率"],
      goblet: ["雷元素ダメージ", "攻撃力%"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "会心率", "会心ダメージ"],
      tierA: ["攻撃力%", "元素熟知"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki【キャラクター一覧：雷元素】準拠：フリンズの最高の相棒となる月感電サポーター。天穹4セットを装備して月感電反応を強力に支援します。"
  },
  "iansan": {
    name: "イアンサ",
    element: "Electro",
    version: "Ver 7.1",
    iconColor: "#9333ea",
    role: "メインアタッカー / ナタ打撃",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%A4%E3%82%A2%E3%83%B3%E3%82%B5",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "最適 (必須級)", desc: "夜魂値消費で会心率+40%。" },
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "サポート", desc: "チームへの雷バフ+40%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["雷元素ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素チャージ効率", "元素熟知"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "120-130%",
    wikiAdvice: "原神Wiki【キャラクター一覧：雷元素】準拠：ナタの夜魂バーストを活かした高速格闘アタッカー。黒曜4セットで会心率40%を確保し、会心ダメージに特化させます。"
  },
  "lanyan": {
    name: "藍硯",
    element: "Anemo",
    version: "Ver 7.1",
    iconColor: "#0d9488",
    role: "サポーター / 集敵",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E8%97%8D%E7%A1%AF",
    bestSets: [
      { name: "翠緑の影", pieces: 4, rank: "最適 (必須級)", desc: "拡散した元素の耐性-40%。" }
    ],
    mainStats: {
      sands: ["元素熟知", "元素チャージ効率"],
      goblet: ["元素熟知"],
      circlet: ["元素熟知"]
    },
    substatPriority: {
      tierS: ["元素熟知", "元素チャージ効率"],
      tierA: ["会心率 (西風時)"],
      tierB: [],
      tierTrash: ["攻撃力%", "防御力%", "HP%"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki【キャラクター一覧：風元素】準拠：最新の風サポーター。翠緑4セットによる元素耐性-40%デバフが主軸。トリプル熟知を目指します。"
  },
  "varka": {
    name: "ファルカ (ヴァルカ)",
    element: "Anemo",
    version: "Ver 7.1",
    iconColor: "#0d9488",
    role: "メインアタッカー (北風の大剣)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%95%E3%82%A1%E3%83%AB%E3%82%AB",
    bestSets: [
      { name: "辰砂往生録", pieces: 4, rank: "攻撃力特化", desc: "攻撃力最大+66%。大団長の圧倒的パワーを底上げ。" },
      { name: "剣闘士のフィナーレ", pieces: 4, rank: "通常攻撃特化", desc: "大剣通常攻撃ダメージ+35%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["風元素ダメージ", "攻撃力%"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "120-130%",
    wikiAdvice: "原神Wiki【キャラクター一覧：風元素・ファルカ】準拠：西風騎士団大団長・北風の騎士。圧倒的重量打撃を繰り出す風の大剣アタッカー。"
  },

  // ==========================================
  // ナタ (Natlan) - Ver 5.x
  // ==========================================
  "xilonen": {
    name: "シロネン",
    element: "Geo",
    iconColor: "#d97706",
    role: "サポーター / 耐性デバッファー / ヒーラー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B7%E3%83%AD%E3%83%8D%E3%83%B3",
    bestSets: [
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "最適 (第一候補)", desc: "夜魂バースト発動時、チーム全員に対応元素ダメージ+40%バフ。シロネンのサポーター性能を極限まで引き出す現環境必須セット。" },
      { name: "教官", pieces: 4, rank: "代替 (熟知バフ)", desc: "元素反応を起こすとチーム全員の元素熟知+120。蒸発・溶解パでの選択肢。" }
    ],
    mainStats: {
      sands: ["防御力%", "元素チャージ効率"],
      goblet: ["防御力%"],
      circlet: ["与える治療効果", "防御力%", "会心率 (西風剣時)"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率 (160-180%目標)", "防御力%"],
      tierA: ["会心率 (西風剣発動用)", "防御力 (実数値)"],
      tierB: ["HP%"],
      tierTrash: ["攻撃力%", "会心ダメージ", "元素熟知"]
    },
    erRequirements: "160-180% (西風剣装備時は140-160%)",
    wikiAdvice: "原神Wiki推奨：回復量とバフを最大化するため防御力3000以上を目指します。爆発を毎ローテ発動するためのチャージ効率と、西風剣を持たせる場合は会心率冠で粒子生成を安定させるのが鉄板ビルドです。"
  },
  "mavuika": {
    name: "マーヴィカ",
    element: "Pyro",
    iconColor: "#dc2626",
    role: "メインアタッカー / サブアタッカー / バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%9E%E3%83%BC%E3%83%B4%E3%82%A3%E3%82%AD%E3%83%A3",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "アタッカー最適", desc: "夜魂値消費で会心率+40%＆与ダメ+15%。アタッカー運用時の最適解。" },
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "バッファー運用", desc: "チーム全体へ全元素ダメージ+40%を配るサポート運用時。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素熟知"],
      goblet: ["炎元素ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素熟知 (蒸発/溶解時)", "元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "120-140%",
    wikiAdvice: "原神Wiki推奨：黒曜4セットで会心率が+40%盛られるため、聖遺物画面では会心率60%以下に抑えて会心ダメージと攻撃力/熟知に特化させるのが最高効率です。"
  },
  "chasca": {
    name: "チャスカ",
    element: "Anemo",
    iconColor: "#0d9488",
    role: "メインアタッカー (多元素追撃)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%81%E3%83%A3%E3%82%B9%E3%82%AB",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "最適 (第一候補)", desc: "夜魂値消費で会心率+40%。影追弾の超火力を安定クリティカル化。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["攻撃力%", "風元素ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素熟知", "元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "100-120%",
    wikiAdvice: "原神Wiki推奨：パーティ内の味方属性に応じて弾の元素が変わるため、杯は風バフ杯だけでなく攻撃力%杯も同等以上に強力です。黒曜4による会心率+40%を活かして会心ダメージ冠を優先しましょう。"
  },
  "kinich": {
    name: "キィニチ",
    element: "Dendro",
    iconColor: "#16a34a",
    role: "メインアタッカー (燃焼/列開花)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%AD%E3%82%A3%E3%83%8B%E3%83%81",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "最適 (第一候補)", desc: "夜魂値消費で会心率+40%。スキル大砲火力を最大化。" },
      { name: "遂げられなかった想い", pieces: 4, rank: "燃焼特化", desc: "敵が燃焼状態で与えるダメージ+50%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["草元素ダメージ"],
      circlet: ["会心ダメージ", "攻撃力%"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素チャージ効率"],
      tierB: ["元素熟知"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "110-130%",
    wikiAdvice: "原神Wiki推奨：黒曜4セットで会心率40%が確保できるため、冠は会心ダメージを最優先。燃焼・列開花で夜魂値を溜めて撃つスキル砲撃の火力を攻撃力と会心で伸ばします。"
  },
  "mualani": {
    name: "ムアラニ",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "メインアタッカー (蒸発特化)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%A0%E3%82%A2%E3%83%A9%E3%83%8B",
    bestSets: [
      { name: "黒曜の秘典", pieces: 4, rank: "最適 (第一候補)", desc: "夜魂値消費で会心率+40%。巨大サメ噛み付きを強化。" },
      { name: "沈淪の心", pieces: 4, rank: "代替候補", desc: "通常攻撃ダメージ+35%。" }
    ],
    mainStats: {
      sands: ["HP%", "元素熟知"],
      goblet: ["水元素ダメージ", "HP%"],
      circlet: ["会心ダメージ", "HP%"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "HP%", "元素熟知"],
      tierA: ["会心率 (溢れ注意)"],
      tierB: ["元素チャージ効率"],
      tierTrash: ["攻撃力%", "防御力%"]
    },
    erRequirements: "100-110% (ほぼ不要)",
    wikiAdvice: "原神Wiki推奨：蒸発の単発超火力を叩き出すため、HP%と元素熟知（100〜200目安）が命。攻撃力は完全に無駄ステータスです。黒曜4で率が盛られるため会心率は30-40%台でOK。"
  },
  "olorun": {
    name: "オロルン",
    element: "Electro",
    iconColor: "#9333ea",
    role: "サブアタッカー / サポーター",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%AA%E3%83%AD%E3%83%AB%E3%83%B3",
    bestSets: [
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "最適 (サポーター)", desc: "感電・夜魂反応でチームに元素ダメバフ+40%。" },
      { name: "黄金の劇団", pieces: 4, rank: "個人火力特化", desc: "控えからの追撃スキルダメージ強化。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素チャージ効率"],
      goblet: ["雷元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "会心率", "会心ダメージ"],
      tierA: ["攻撃力%", "元素熟知"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki推奨：感電編成でのサポート兼追撃サブDPS。勇者4セットを装備して味方に強烈な属性バフを供給するのが最もおすすめの運用法です。"
  },
  "citlali": {
    name: "シトラリ",
    element: "Cryo",
    iconColor: "#38bdf8",
    role: "シールドサポーター",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B7%E3%83%88%E3%83%A9%E3%83%AA",
    bestSets: [
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "最適 (第一候補)", desc: "チーム全員への対応元素ダメバフ+40%。" },
      { name: "旧貴族のしつけ", pieces: 4, rank: "攻撃バフ", desc: "元素爆発時の攻撃力+20%バフ。" }
    ],
    mainStats: {
      sands: ["元素熟知", "元素チャージ効率"],
      goblet: ["元素熟知"],
      circlet: ["元素熟知"]
    },
    substatPriority: {
      tierS: ["元素熟知", "元素チャージ効率"],
      tierA: ["HP%"],
      tierB: ["会心率"],
      tierTrash: ["防御力%", "攻撃力%"]
    },
    erRequirements: "160-190%",
    wikiAdvice: "原神Wiki推奨：シールド耐久値が元素熟知に依存するため、時計/杯/冠をすべて元素熟知で統一するのが基本。爆発ループ用のチャージ効率をサブステで稼ぎましょう。"
  },
  "kachina": {
    name: "カチーナ",
    element: "Geo",
    iconColor: "#d97706",
    role: "バッファー / サブアタッカー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%AB%E3%83%81%E3%83%BC%E3%83%8A",
    bestSets: [
      { name: "灰燼の都に立ち栄える勇者", pieces: 4, rank: "最適 (必須級)", desc: "コマちゃん召喚と夜魂バーストで全チームダメバフ+40%。" }
    ],
    mainStats: {
      sands: ["防御力%", "元素チャージ効率"],
      goblet: ["防御力%", "岩元素ダメージ"],
      circlet: ["防御力%", "会心率 (西風槍時)"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "防御力%"],
      tierA: ["会心率 (西風槍時)"],
      tierB: ["防御力"],
      tierTrash: ["攻撃力%", "元素熟知", "HP%"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki推奨：勇者4セットを最も手軽に発動できるサポート枠。スキル設置後にすぐ交代するだけで40%バフを味方に渡せます。"
  },

  // ==========================================
  // フォンテーヌ (Fontaine) - 現環境主力
  // ==========================================
  "arlecchino": {
    name: "アルレッキーノ",
    element: "Pyro",
    iconColor: "#dc2626",
    role: "メインアタッカー (命の契約)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%A2%E3%83%AB%E3%83%AC%E3%83%83%E3%82%AD%E3%83%BC%E3%83%8E",
    bestSets: [
      { name: "諧律奇想の断章", pieces: 4, rank: "最適 (専用セット)", desc: "命の契約増減で与えるダメージ最大+54%。" },
      { name: "剣闘士のフィナーレ", pieces: 4, rank: "即戦力代替", desc: "通常攻撃ダメージ+35%。厳選が進んでいれば諧律とほぼ同等。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["炎元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素熟知 (蒸発/溶解時)"],
      tierB: ["元素チャージ効率"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "100-110% (ほぼ不要)",
    wikiAdvice: "原神Wiki推奨：戦闘中は味方からの回復を受け付けないため、火力に完全特化。攻撃%時計・炎杯・会心冠が基本。剣闘士4セットの良ステがあるなら無理に掘り直さなくても最高峰の火力を発揮します。"
  },
  "neuvillette": {
    name: "ヌヴィレット",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "メインアタッカー (重撃ビーム)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%8C%E3%83%B4%E3%82%A3%E3%83%AC%E3%83%83%E3%83%88",
    bestSets: [
      { name: "ファントムハンター", pieces: 4, rank: "最適 (必須級)", desc: "HP増減で会心率最大+36%と重撃ダメバフ+15%。完全一択。" }
    ],
    mainStats: {
      sands: ["HP%"],
      goblet: ["水元素ダメージ", "HP%"],
      circlet: ["会心ダメージ", "HP%"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "HP%", "会心率 (溢れ注意)"],
      tierA: ["元素チャージ効率"],
      tierB: ["HP (実数値)"],
      tierTrash: ["攻撃力%", "防御力%", "元素熟知"]
    },
    erRequirements: "110-130%",
    wikiAdvice: "原神Wiki推奨：ファントム4で率36%が盛られるため、聖遺物画面での会心率は64%以下に抑えて会心ダメージとHP%に特化させるのが最適。攻撃力は一切ダメージに影響しません。"
  },
  "furina": {
    name: "フリーナ",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "サブアタッカー / 全体バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%95%E3%83%AA%E3%83%BC%E3%83%8A",
    bestSets: [
      { name: "黄金の劇団", pieces: 4, rank: "最適 (完全一強)", desc: "元素スキルのダメージを最大+70%強化。フリーナの主力火力源に完全マッチ。" }
    ],
    mainStats: {
      sands: ["HP%", "元素チャージ効率"],
      goblet: ["水元素ダメージ", "HP%"],
      circlet: ["会心率", "会心ダメージ", "HP%"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "会心率", "会心ダメージ"],
      tierA: ["HP%"],
      tierB: ["HP"],
      tierTrash: ["攻撃力%", "防御力%"]
    },
    erRequirements: "ソロ水: 180-220% / ダブル水: 140-160%",
    wikiAdvice: "原神Wiki推奨：劇団4セットが圧倒的。まずは爆発を毎ローテ回せるだけの元素チャージ効率を確保し、次にHP40,000到達と会心バランス（率:ダメ=1:2）を両立させることが目標です。"
  },
  "navia": {
    name: "ナヴィア",
    element: "Geo",
    iconColor: "#d97706",
    role: "メインアタッカー (結晶散弾)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%8A%E3%83%B4%E3%82%A3%E3%82%A2",
    bestSets: [
      { name: "夜歌の残響", pieces: 4, rank: "最適 (第一候補)", desc: "結晶シールド獲得で岩元素ダメ最大+50%。" },
      { name: "黄金の劇団", pieces: 4, rank: "スキル特化", desc: "散弾スキルの一撃火力を強化。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["岩元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素チャージ効率"],
      tierB: ["攻撃力"],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "120-140%",
    wikiAdvice: "原神Wiki推奨：散弾スキルの一撃が超火力の主軸。会心を外すとダメージが大幅に落ちるため、会心率は70%以上を確保して安定させます。防御力ではなく攻撃力依存です。"
  },
  "clorinde": {
    name: "クロリンデ",
    element: "Electro",
    iconColor: "#9333ea",
    role: "メインアタッカー (銃剣連撃)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%AF%E3%83%AD%E3%83%AA%E3%83%B3%E3%83%87",
    bestSets: [
      { name: "諧律奇想の断章", pieces: 4, rank: "最適 (第一候補)", desc: "命の契約増減で与えるダメージ最大+54%。" },
      { name: "剣闘士のフィナーレ", pieces: 4, rank: "代替候補", desc: "通常攻撃ダメージ+35%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["雷元素ダメージ"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素熟知 (激化運用時)"],
      tierB: ["元素チャージ効率"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "110-120%",
    wikiAdvice: "原神Wiki推奨：固有天賦で会心率が最大+20%盛られるため、100%溢れに注意しながら会心ダメージと攻撃力を伸ばすのがポイントです。"
  },
  "emilie": {
    name: "エミリエ",
    element: "Dendro",
    iconColor: "#16a34a",
    role: "燃焼サブアタッカー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%A8%E3%83%9F%E3%83%AA%E3%82%A8",
    bestSets: [
      { name: "遂げられなかった想い", pieces: 4, rank: "最適 (専用セット)", desc: "敵が燃焼状態で与えるダメージ+50%。" },
      { name: "深林の記憶", pieces: 4, rank: "代替 (耐性デバフ)", desc: "他キャラが深林を持たない場合の選択肢。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["草元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素チャージ効率", "攻撃力"],
      tierB: ["元素熟知"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "130-150%",
    wikiAdvice: "原神Wiki推奨：燃焼状態を維持して控えから火力を出すアタッカー。天賦倍率は攻撃力依存のため、草属性ですが熟知よりも攻撃力%が優先されます。"
  },
  "xianyun": {
    name: "閑雲",
    element: "Anemo",
    iconColor: "#0d9488",
    role: "ヒーラー / 落下攻撃バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E9%96%92%E9%9B%B2",
    bestSets: [
      { name: "翠緑の影", pieces: 4, rank: "最適 (耐性ダウン)", desc: "拡散した元素の耐性-40%。圧倒的汎用性。" },
      { name: "昔日のお手伝い", pieces: 4, rank: "落下ダメ特化", desc: "回復量に応じた基礎ダメージ加算。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素チャージ効率"],
      goblet: ["攻撃力%"],
      circlet: ["攻撃力%", "与える治療効果", "会心率 (西風時)"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率 (最重要)", "攻撃力%"],
      tierA: ["攻撃力", "会心率 (西風時)"],
      tierB: [],
      tierTrash: ["防御力%", "HP%", "会心ダメージ"]
    },
    erRequirements: "ソロ風: 180-220% / 魈同伴時: 140-160%",
    wikiAdvice: "原神Wiki推奨：落下攻撃バフは閑雲の『攻撃力』のみを参照（上限4500）。時計/杯/冠をすべて攻撃力%で揃えつつ、爆発を毎ローテ回すチャージ効率を確保します。"
  },
  "chevreuse": {
    name: "シュヴルーズ",
    element: "Pyro",
    iconColor: "#dc2626",
    role: "過負荷バッファー / ヒーラー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B7%E3%83%A5%E3%83%B4%E3%83%AB%E3%83%BC%E3%82%BA",
    bestSets: [
      { name: "旧貴族のしつけ", pieces: 4, rank: "最適 (攻撃バフ)", desc: "爆発時の全チーム攻撃力+20%バフ。" },
      { name: "千岩牢固2 + 花海甘露2", pieces: 2, rank: "HP特化", desc: "HP40,000達成用。" }
    ],
    mainStats: {
      sands: ["HP%", "元素チャージ効率"],
      goblet: ["HP%"],
      circlet: ["HP%", "与える治療効果", "会心率 (西風時)"]
    },
    substatPriority: {
      tierS: ["HP%", "HP"],
      tierA: ["元素チャージ効率", "会心率 (西風時)"],
      tierB: [],
      tierTrash: ["攻撃力%", "防御力%", "元素熟知"]
    },
    erRequirements: "130-150%",
    wikiAdvice: "原神Wiki推奨：炎と雷のみの過負荷編成で耐性-40%と攻撃力最大+40%を配る強力バッファー。天賦バフ上限の『HP40,000』を最優先で達成させます。"
  },
  "sigewinne": {
    name: "シグウィン",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "ヒーラー / スキルバッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%B7%E3%82%B0%E3%82%A accidentsE3%82%A3%E3%83%B3",
    bestSets: [
      { name: "海染硨磲", pieces: 4, rank: "最適 (回復&泡ダメ)", desc: "回復量に応じた泡ダメージ。" },
      { name: "千岩牢固2 + 花海甘露2", pieces: 2, rank: "HP特化", desc: "天賦上限HP65,000目標。" }
    ],
    mainStats: {
      sands: ["HP%", "元素チャージ効率"],
      goblet: ["HP%"],
      circlet: ["HP%", "与える治療効果"]
    },
    substatPriority: {
      tierS: ["HP%", "HP"],
      tierA: ["元素チャージ効率"],
      tierB: [],
      tierTrash: ["攻撃力%", "防御力%", "元素熟知"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki推奨：味方の控えスキルダメージをバフするため、とにかくHPを盛る（目標50,000〜65,000）。時計/杯/冠はすべてHP%が推奨です。"
  },

  // ==========================================
  // スメール (Sumeru) - 草反応コア
  // ==========================================
  "nahida": {
    name: "ナヒーダ",
    element: "Dendro",
    iconColor: "#16a34a",
    role: "サブアタッカー / 草付着 / バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%8A%E3%83%92%E3%83%BC%E3%83%80",
    bestSets: [
      { name: "深林の記憶", pieces: 4, rank: "最適 (必須級)", desc: "敵の草耐性-30%。パーティに深林持ちが他にいない場合は最優先。" },
      { name: "金メッキの夢", pieces: 4, rank: "個人火力特化", desc: "他キャラが深林4を持つ場合の個人火力用。" }
    ],
    mainStats: {
      sands: ["元素熟知"],
      goblet: ["元素熟知", "草元素ダメージ"],
      circlet: ["元素熟知", "会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素熟知", "会心率", "会心ダメージ"],
      tierA: ["元素チャージ効率", "攻撃力%"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "110-130%",
    wikiAdvice: "原神Wiki推奨：天賦バフ上限の『熟知1000』を目指します。控え運用なら熟知トリプル、表で殴るなら熟知/草バフ/会心が黄金比です。"
  },
  "alhaitham": {
    name: "アルハイゼン",
    element: "Dendro",
    iconColor: "#16a34a",
    role: "メインアタッカー (激化/開花)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%82%A2%E3%83%AB%E3%83%8F%E3%82%A4%E3%82%BC%E3%83%B3",
    bestSets: [
      { name: "金メッキの夢", pieces: 4, rank: "最適 (個人火力)", desc: "高い元素熟知と攻撃力バフを提供。" },
      { name: "深林の記憶", pieces: 4, rank: "パーティ依存", desc: "味方に深林4がいない場合は自身で所持。" }
    ],
    mainStats: {
      sands: ["元素熟知"],
      goblet: ["草元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "元素熟知"],
      tierA: ["元素チャージ効率", "攻撃力%"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "130-150% (草2人なら120-130%)",
    wikiAdvice: "原神Wiki推奨：天賦倍率が熟知に強く依存。熟知時計＋草杯＋会心冠が基本。琢光鏡を3枚維持しながら戦うため、適度なチャージ効率も重要です。"
  },
  "baizhu": {
    name: "白朮",
    element: "Dendro",
    iconColor: "#16a34a",
    role: "ヒーラー / シールド / 草バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E7%99%BD%E6%9C%AF",
    bestSets: [
      { name: "深林の記憶", pieces: 4, rank: "最適 (耐性デバフ)", desc: "スキル・爆発で安定して深林4効果を維持。" },
      { name: "海染硨磲", pieces: 4, rank: "回復＆火力", desc: "回復量に応じた追加ダメージ。" }
    ],
    mainStats: {
      sands: ["HP%", "元素チャージ効率"],
      goblet: ["HP%"],
      circlet: ["HP%", "与える治療効果"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率 (最重要)", "HP%"],
      tierA: ["HP"],
      tierB: [],
      tierTrash: ["攻撃力%", "会心率", "会心ダメージ", "防御力%"]
    },
    erRequirements: "ソロ草: 180-220% / ダブル草: 150-170%",
    wikiAdvice: "原神Wiki推奨：天賦バフ上限の『HP50,000』を達成して開花・激化バフを最大化しつつ、爆発を回すためのERを確保するのが至上命題です。"
  },
  "nilou": {
    name: "ニィロウ",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "豊穣開花サポーター",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%8B%E3%82%A3%E3%83%AD%E3%82%A6",
    bestSets: [
      { name: "千岩牢固2 + 花海甘露2", pieces: 2, rank: "最適 (HP特化)", desc: "豊穣の核ダメージはニィロウのHP上限に直結。" }
    ],
    mainStats: {
      sands: ["HP%"],
      goblet: ["HP%"],
      circlet: ["HP%"]
    },
    substatPriority: {
      tierS: ["HP%", "HP"],
      tierA: ["元素熟知", "元素チャージ効率"],
      tierB: [],
      tierTrash: ["攻撃力%", "防御力%", "会心率", "会心ダメージ"]
    },
    erRequirements: "140-160%",
    wikiAdvice: "原神Wiki推奨：天賦上限の『HP74,440』を目指してトリプルHP%聖遺物に全振りします。会心ステータスは開花ダメージに乗らないため不要です。"
  },
  "kuki_shinobu": {
    name: "久岐忍",
    element: "Electro",
    iconColor: "#9333ea",
    role: "超開花トリガー / ヒーラー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E4%B9%85%E5%B2%90%E5%BF%8D",
    bestSets: [
      { name: "楽園の絶花", pieces: 4, rank: "超開花特化", desc: "開花・超開花ダメージ最大+140%。" },
      { name: "金メッキの夢", pieces: 4, rank: "熟知特化", desc: "元素熟知を大量に盛る定番セット。" }
    ],
    mainStats: {
      sands: ["元素熟知"],
      goblet: ["元素熟知"],
      circlet: ["元素熟知"]
    },
    substatPriority: {
      tierS: ["元素熟知"],
      tierA: ["HP%", "HP"],
      tierB: ["元素チャージ効率"],
      tierTrash: ["攻撃力%", "会心率", "会心ダメージ", "防御力%"]
    },
    erRequirements: "不要 (スキル主体)",
    wikiAdvice: "原神Wiki推奨：超開花トリガー役として熟知1000を目指します。超開花ダメージは忍のLvと元素熟知のみを参照するため、時計/杯/冠すべて元素熟知、サブステも熟知とHP%のみを狙います。"
  },
  "tighnari": {
    name: "ティナリ",
    element: "Dendro",
    iconColor: "#16a34a",
    role: "クイックスワップアタッカー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%86%E3%82%A3%E3%83%8A%E3%83%AA",
    bestSets: [
      { name: "大地を流浪する楽団", pieces: 4, rank: "最適 (重撃特化)", desc: "重撃ダメージ+35%と熟知+80。" },
      { name: "金メッキの夢", pieces: 4, rank: "代替候補", desc: "高い熟知と攻撃力バフ。" }
    ],
    mainStats: {
      sands: ["元素熟知", "攻撃力%"],
      goblet: ["草元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "元素熟知"],
      tierA: ["攻撃力%", "元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "120-130%",
    wikiAdvice: "原神Wiki推奨：スキル後の3連チャージショットを短時間で叩き込むアタッカー。熟知が天賦でダメージバフに変換されるため、熟知と会心が最重要です。"
  },

  // ==========================================
  // 稲妻・璃月・モンド - 定番主力
  // ==========================================
  "kazuha": {
    name: "楓原万葉",
    element: "Anemo",
    iconColor: "#0d9488",
    role: "バッファー / 集敵 / デバッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E6%A5%93%E5%8E%9F%E4%B8%87%E8%91%89",
    bestSets: [
      { name: "翠緑の影", pieces: 4, rank: "最適 (必須級)", desc: "拡散した元素の耐性-40%。万葉の代名詞であり代替不可。" }
    ],
    mainStats: {
      sands: ["元素熟知", "元素チャージ効率"],
      goblet: ["元素熟知"],
      circlet: ["元素熟知"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率 (160-180%)", "元素熟知"],
      tierA: ["会心率 (西風剣時)"],
      tierB: ["攻撃力%"],
      tierTrash: ["HP%", "防御力%", "会心ダメージ"]
    },
    erRequirements: "160-180% (蒼古時) / 140-150% (西風剣時)",
    wikiAdvice: "原神Wiki推奨：翠緑4セットで元素熟知トリプル（時計/杯/冠）を目指します。ただし爆発が回らないとバフ維持が崩れるため、サブステでER160%前後を確保するのが必須です。"
  },
  "yelan": {
    name: "夜蘭",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "サブアタッカー / 与ダメバッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E5%A4%9C%E8%98%AD",
    bestSets: [
      { name: "絶縁の旗印", pieces: 4, rank: "最適 (完全一強)", desc: "爆発ダメージ強化とチャージ効率確保の両立。" }
    ],
    mainStats: {
      sands: ["HP%", "元素チャージ効率"],
      goblet: ["水元素ダメージ", "HP%"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "会心率", "会心ダメージ"],
      tierA: ["HP%"],
      tierB: ["HP"],
      tierTrash: ["攻撃力%", "防御力%", "元素熟知"]
    },
    erRequirements: "無凸西風: 180-200% / 若水: 220-240% / 1凸時: -30%",
    wikiAdvice: "原神Wiki推奨：夜蘭のダメージは100%HP依存。攻撃力は完全に無駄です。爆発が生命線のため、要求ERを満たした上で会心とHP%を伸ばすのが標準です。"
  },
  "raiden": {
    name: "雷電将軍",
    element: "Electro",
    iconColor: "#9333ea",
    role: "メインアタッカー / 味方全体バッテリー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E9%9B%B7%E9%9B%BB%E5%B0%86%E8%BB%8D",
    bestSets: [
      { name: "絶縁の旗印", pieces: 4, rank: "最適 (完全一強)", desc: "元素チャージ効率に応じて元素爆発ダメを最大+75%強化。" }
    ],
    mainStats: {
      sands: ["元素チャージ効率", "攻撃力%"],
      goblet: ["雷元素ダメージ", "攻撃力%"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "元素チャージ効率"],
      tierA: ["攻撃力%"],
      tierB: ["元素熟知", "攻撃力"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "草薙の稲光: 270% / 漁獲: 220-250%",
    wikiAdvice: "原神Wiki推奨：絶縁4セット以外は推奨されません。草薙ならチャージ時計＋雷杯、漁獲ならチャージ時計＋攻撃杯が推奨バランスです。"
  },
  "yae_miko": {
    name: "八重神子",
    element: "Electro",
    iconColor: "#9333ea",
    role: "設置型雷サブアタッカー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E5%85%AB%E9%87%8D%E7%A5%9E%E5%AD%90",
    bestSets: [
      { name: "黄金の劇団", pieces: 4, rank: "スキル火力特化", desc: "殺生櫻の自動追撃ダメージを最大+70%強化。" },
      { name: "金メッキの夢", pieces: 4, rank: "激化特化", desc: "激化反応ダメージ強化。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素熟知"],
      goblet: ["雷元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素熟知", "元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "130-150% (2ローテに1回爆発時)",
    wikiAdvice: "原神Wiki推奨：劇団4セットによるスキル自動砲台としての運用が極めて強力。激化編成で使う場合は元素熟知も攻撃力%と同等の価値を持ちます。"
  },
  "zhongli": {
    name: "鍾離",
    element: "Geo",
    iconColor: "#d97706",
    role: "最強シールドサポーター",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E9%8D%BE%E9%9B%A2",
    bestSets: [
      { name: "千岩牢固", pieces: 4, rank: "最適 (シールド&バフ)", desc: "HP+20%とスキルヒット時の全チーム攻撃力+20%。" }
    ],
    mainStats: {
      sands: ["HP%"],
      goblet: ["HP%"],
      circlet: ["HP%", "会心率 (西風槍時)"]
    },
    substatPriority: {
      tierS: ["HP%", "HP"],
      tierA: ["元素チャージ効率", "会心率 (西風槍時)"],
      tierB: [],
      tierTrash: ["防御力%", "攻撃力%", "元素熟知"]
    },
    erRequirements: "不要 (シールド特化時)",
    wikiAdvice: "原神Wiki推奨：純シールド型なら『HP/HP/HP』のトリプルHPビルドでHP50,000を目指せば絶対に割れないシールドが完成します。西風槍を持つ場合は会心冠で粒子を生成します。"
  },
  "hu_tao": {
    name: "胡桃",
    element: "Pyro",
    iconColor: "#dc2626",
    role: "メインアタッカー (蒸発重撃)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E8%83%A1%E6%A1%83",
    bestSets: [
      { name: "燃え盛る炎の魔女", pieces: 4, rank: "最適 (蒸発特化)", desc: "蒸発反応ダメージ+15%と炎バフ。" },
      { name: "追憶のしめ縄", pieces: 4, rank: "重撃特化", desc: "重撃ダメージ+50%。" }
    ],
    mainStats: {
      sands: ["HP%", "元素熟知"],
      goblet: ["炎元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "元素熟知 (200まで)"],
      tierA: ["HP%"],
      tierB: ["攻撃力%"],
      tierTrash: ["防御力%", "元素チャージ効率"]
    },
    erRequirements: "100-110%",
    wikiAdvice: "原神Wiki推奨：蒸発反応が前提のため、熟知が100〜200未満の場合はHP%よりも元素熟知の優先度が高くなります。基礎攻撃力が非常に低いため、攻撃力%の価値は低めです。"
  },
  "fischl": {
    name: "フィッシュル",
    element: "Electro",
    iconColor: "#9333ea",
    role: "設置型雷サブアタッカー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%95%E3%82%A3%E3%83%83%E3%82%B7%E3%83%A5%E3%83%AB",
    bestSets: [
      { name: "黄金の劇団", pieces: 4, rank: "最適 (完全一強)", desc: "オズの追撃ダメージが常時+70%強化。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["雷元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素熟知 (激化運用時)"],
      tierB: ["元素チャージ効率"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "110-120%",
    wikiAdvice: "原神Wiki推奨：劇団4セットでオズの火力が大幅に跳ね上がります。オズを常時出し続ける運用のため、攻撃%と会心を高めます。"
  },
  "bennett": {
    name: "ベネット",
    element: "Pyro",
    iconColor: "#dc2626",
    role: "攻撃力バッファー / ヒーラー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%99%E3%83%8D%E3%83%83%E3%83%88",
    bestSets: [
      { name: "旧貴族のしつけ", pieces: 4, rank: "最適 (攻撃バフ)", desc: "元素爆発発動時、チーム全員の攻撃力+20%。" }
    ],
    mainStats: {
      sands: ["元素チャージ効率", "HP%"],
      goblet: ["HP%"],
      circlet: ["与える治療効果", "HP%"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率 (220%以上)"],
      tierA: ["HP%", "HP"],
      tierB: ["会心率 (西風剣時)"],
      tierTrash: ["攻撃力%", "防御力%", "元素熟知"]
    },
    erRequirements: "200-240%以上",
    wikiAdvice: "原神Wiki推奨：ベネットの攻撃バフは『自身の基礎攻撃力（キャラLv＋武器基礎攻撃力）』のみを参照するため、聖遺物の攻撃力%は一切バフに乗りません！そのためチャージ効率とHPに全振りするのが鉄則です。"
  },
  "xiangling": {
    name: "香菱",
    element: "Pyro",
    iconColor: "#dc2626",
    role: "炎サブアタッカー (旋火輪)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E9%A6%99%E8%8F%B1",
    bestSets: [
      { name: "絶縁の旗印", pieces: 4, rank: "最適 (完全一強)", desc: "チャージ効率確保と旋火輪ダメージ強化。" }
    ],
    mainStats: {
      sands: ["元素チャージ効率", "元素熟知", "攻撃力%"],
      goblet: ["炎元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "会心率", "会心ダメージ"],
      tierA: ["元素熟知", "攻撃力%"],
      tierB: [],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "ベネット同伴時: 180-200% / ソロ炎: 220-250%",
    wikiAdvice: "原神Wiki推奨：何よりも爆発のチャージ要求を満たすことが最優先。チャージ時計または漁獲等で必要ERをクリアして初めて会心・熟知が活きます。"
  },
  "xingqiu": {
    name: "行秋",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "水サブアタッカー / 水付着",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E8%A1%8C%E7%A7%8B",
    bestSets: [
      { name: "絶縁の旗印", pieces: 4, rank: "最適 (第一候補)", desc: "雨すだれの剣連撃のダメージ強化。" }
    ],
    mainStats: {
      sands: ["攻撃力%", "元素チャージ効率"],
      goblet: ["水元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率", "会心率", "会心ダメージ"],
      tierA: ["攻撃力%"],
      tierB: ["元素熟知"],
      tierTrash: ["HP%", "防御力%"]
    },
    erRequirements: "祭礼の剣: 180% / その他: 220%+",
    wikiAdvice: "原神Wiki推奨：祭礼の剣を持たせて爆発をループさせるのが鉄板。チャージが足りているなら攻撃時計、足りないならチャージ時計を装備します。"
  },
  "faruzan": {
    name: "ファルザン",
    element: "Anemo",
    iconColor: "#0d9488",
    role: "風専用バッファー",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E3%83%95%E3%82%A1%E3%83%AB%E3%82%B6%E3%83%B3",
    bestSets: [
      { name: "千岩牢固", pieces: 4, rank: "6凸時 最適", desc: "6凸の崩壊の矢追撃で千岩4の攻撃力+20%バフを常時維持。" },
      { name: "旧貴族のしつけ", pieces: 4, rank: "攻撃バフ", desc: "元素爆発時の攻撃力+20%バフ。" }
    ],
    mainStats: {
      sands: ["元素チャージ効率"],
      goblet: ["風元素ダメージ", "攻撃力%"],
      circlet: ["会心率 (西風用)", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["元素チャージ効率 (最重要)"],
      tierA: ["会心率 (西風用)"],
      tierB: ["攻撃力%"],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "無凸〜5凸: 280-300%+ / 6凸: 200-220%",
    wikiAdvice: "原神Wiki推奨：風アタッカーの火力を引き上げる専用バッファー。6凸未満ではチャージ要求が非常に重いため、時計とサブステをすべてチャージに捧げます。"
  },
  "wanderer": {
    name: "放浪者",
    element: "Anemo",
    iconColor: "#0d9488",
    role: "メインアタッカー (空中乱射)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E6%94%BE%E6%85%8B%E8%80%85",
    bestSets: [
      { name: "砂上の楼閣の史話", pieces: 4, rank: "最適 (専用セット)", desc: "重撃命中後の通常攻撃速度+10%＆与ダメ+40%。" },
      { name: "追憶のしめ縄", pieces: 4, rank: "代替候補", desc: "通常・重撃ダメージ+50%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["風元素ダメージ"],
      circlet: ["会心率", "会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心率", "会心ダメージ", "攻撃力%"],
      tierA: ["元素チャージ効率"],
      tierB: [],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "100-120%",
    wikiAdvice: "原神Wiki推奨：空中浮遊しながら通常攻撃を連打するアタッカー。会心と攻撃力に特化し、ファルザンやベネットのバフを受けて火力を伸ばします。"
  },
  "xiao": {
    name: "魈",
    element: "Anemo",
    iconColor: "#0d9488",
    role: "メインアタッカー (落下攻撃)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E9%AD%88",
    bestSets: [
      { name: "ファントムハンター", pieces: 4, rank: "閑雲同伴時 最適", desc: "爆発中の自傷で会心率+36%。閑雲・ファルザン編成で最高DPS。" },
      { name: "辰砂往生録", pieces: 4, rank: "専用セット", desc: "HP減少時に攻撃力最大+66%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["風元素ダメージ", "攻撃力%"],
      circlet: ["会心ダメージ", "会心率"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "会心率", "攻撃力%"],
      tierA: ["元素チャージ効率 (120-130%)"],
      tierB: [],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "120-140%",
    wikiAdvice: "原神Wiki推奨：閑雲との組み合わせでファントム4セットの適性が非常に高くなりました。率36%が盛られるため会心ダメージ冠が最適です。"
  },
  "kokomi": {
    name: "珊瑚宮心海",
    element: "Hydro",
    iconColor: "#0284c7",
    role: "ヒーラー / 水付着",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E7%8F%8A%E7%91%9A%E5%AE%AE%E5%BF%83%E6%B5%B7",
    bestSets: [
      { name: "海染硨磲", pieces: 4, rank: "最適 (回復＆泡ダメ)", desc: "回復量に応じた海染泡物理ダメージ最大3万。" },
      { name: "千岩牢固", pieces: 4, rank: "凍結サポート", desc: "クラゲ持続で全チーム攻撃力+20%バフ。" }
    ],
    mainStats: {
      sands: ["HP%", "元素チャージ効率"],
      goblet: ["水元素ダメージ", "HP%"],
      circlet: ["与える治療効果"]
    },
    substatPriority: {
      tierS: ["HP%", "元素チャージ効率"],
      tierA: ["HP", "元素熟知"],
      tierB: ["攻撃力%"],
      tierTrash: ["会心率 (天賦で-100%)", "会心ダメージ", "防御力%"]
    },
    erRequirements: "160-180%",
    wikiAdvice: "原神Wiki推奨：固有天賦で『会心率が-100%』に固定されるため、会心率は完全に無価値です！HP%と治療冠、そして爆発維持のためのERのみを厳選します。"
  },
  "ayaka": {
    name: "神里綾華",
    element: "Cryo",
    iconColor: "#38bdf8",
    role: "メインアタッカー (凍結特化)",
    wikiUrl: "https://wikiwiki.jp/genshinwiki/%E7%A5%9E%E9%87%8C%E7%B6%BE%E8%8F%AF",
    bestSets: [
      { name: "氷風を彷徨う勇士", pieces: 4, rank: "最適 (完全一強)", desc: "凍結敵に対して会心率最大+40%。" }
    ],
    mainStats: {
      sands: ["攻撃力%"],
      goblet: ["氷元素ダメージ"],
      circlet: ["会心ダメージ"]
    },
    substatPriority: {
      tierS: ["会心ダメージ", "攻撃力%"],
      tierA: ["元素チャージ効率 (130-140%)", "会心率 (35-45%目標)"],
      tierB: [],
      tierTrash: ["HP%", "防御力%", "元素熟知"]
    },
    erRequirements: "130-140%",
    wikiAdvice: "原神Wiki推奨：氷風4セット(40%)と氷共鳴(15%)で会心率が合計+55%されるため、聖遺物での会心率は35%〜45%で止め、冠は会心ダメージにして攻撃力2000以上を盛るのが理想です。"
  }
};

const KQM_CHARACTERS = GENSHIN_WIKI_CHARACTERS; // 互換性維持

// 初期インベントリ（初期手持ち聖遺物プール）
const INITIAL_INVENTORY = [
  // 生の花 (Flower)
  {
    id: "inv-1",
    slot: "flower",
    slotName: "生の花",
    setName: "黄金の劇団",
    mainStat: { name: "HP", value: "4,780" },
    subStats: [
      { name: "会心率", value: 3.9 },
      { name: "会心ダメージ", value: 21.0 },
      { name: "元素チャージ効率", value: 11.0 },
      { name: "HP%", value: 9.9 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-2",
    slot: "flower",
    slotName: "生の花",
    setName: "ファントムハンター",
    mainStat: { name: "HP", value: "4,780" },
    subStats: [
      { name: "会心ダメージ", value: 28.8 },
      { name: "HP%", value: 14.6 },
      { name: "元素チャージ効率", value: 5.8 },
      { name: "攻撃力%", value: 4.1 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-3",
    slot: "flower",
    slotName: "生の花",
    setName: "絶縁の旗印",
    mainStat: { name: "HP", value: "4,780" },
    subStats: [
      { name: "会心率", value: 7.0 },
      { name: "会心ダメージ", value: 21.8 },
      { name: "元素チャージ効率", value: 16.8 },
      { name: "攻撃力%", value: 4.7 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-3b",
    slot: "flower",
    slotName: "生の花",
    setName: "黒曜の秘典",
    mainStat: { name: "HP", value: "4,780" },
    subStats: [
      { name: "会心ダメージ", value: 28.0 },
      { name: "攻撃力%", value: 9.9 },
      { name: "会心率", value: 3.9 },
      { name: "元素チャージ効率", value: 11.0 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-3c",
    slot: "flower",
    slotName: "生の花",
    setName: "灰燼の都に立ち栄える勇者",
    mainStat: { name: "HP", value: "4,780" },
    subStats: [
      { name: "防御力%", value: 14.6 },
      { name: "元素チャージ効率", value: 16.8 },
      { name: "会心率", value: 7.0 },
      { name: "防御力", value: 39 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-3d",
    slot: "flower",
    slotName: "生の花",
    setName: "天穹の顕現せし夜",
    mainStat: { name: "HP", value: "4,780" },
    subStats: [
      { name: "会心ダメージ", value: 21.0 },
      { name: "会心率", value: 7.0 },
      { name: "攻撃力%", value: 10.5 },
      { name: "元素熟知", value: 23 }
    ],
    level: 20,
    rarity: 5
  },

  // 死の羽 (Plume)
  {
    id: "inv-4",
    slot: "plume",
    slotName: "死の羽",
    setName: "黄金の劇団",
    mainStat: { name: "攻撃力", value: "311" },
    subStats: [
      { name: "会心率", value: 10.5 },
      { name: "会心ダメージ", value: 14.0 },
      { name: "HP%", value: 11.1 },
      { name: "元素チャージ効率", value: 6.5 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-5",
    slot: "plume",
    slotName: "死の羽",
    setName: "ファントムハンター",
    mainStat: { name: "攻撃力", value: "311" },
    subStats: [
      { name: "会心ダメージ", value: 31.1 },
      { name: "HP%", value: 9.3 },
      { name: "会心率", value: 3.5 },
      { name: "防御力", value: 21 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-6",
    slot: "plume",
    slotName: "死の羽",
    setName: "絶縁の旗印",
    mainStat: { name: "攻撃力", value: "311" },
    subStats: [
      { name: "会心率", value: 9.3 },
      { name: "会心ダメージ", value: 20.2 },
      { name: "元素チャージ効率", value: 11.7 },
      { name: "元素熟知", value: 21 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-6b",
    slot: "plume",
    slotName: "死の羽",
    setName: "黒曜の秘典",
    mainStat: { name: "攻撃力", value: "311" },
    subStats: [
      { name: "会心ダメージ", value: 26.4 },
      { name: "攻撃力%", value: 11.7 },
      { name: "元素熟知", value: 42 },
      { name: "会心率", value: 3.5 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-6c",
    slot: "plume",
    slotName: "死の羽",
    setName: "灰燼の都に立ち栄える勇者",
    mainStat: { name: "攻撃力", value: "311" },
    subStats: [
      { name: "防御力%", value: 16.0 },
      { name: "元素チャージ効率", value: 11.0 },
      { name: "会心率", value: 6.6 },
      { name: "HP%", value: 9.9 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-6d",
    slot: "plume",
    slotName: "死の羽",
    setName: "天穹の顕現せし夜",
    mainStat: { name: "攻撃力", value: "311" },
    subStats: [
      { name: "会心ダメージ", value: 28.0 },
      { name: "会心率", value: 7.0 },
      { name: "攻撃力%", value: 9.9 },
      { name: "元素チャージ効率", value: 5.8 }
    ],
    level: 20,
    rarity: 5
  },

  // 時の砂 (Sands)
  {
    id: "inv-7",
    slot: "sands",
    slotName: "時の砂",
    setName: "黄金の劇団",
    mainStat: { name: "HP%", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 27.2 },
      { name: "会心率", value: 7.0 },
      { name: "元素チャージ効率", value: 5.8 },
      { name: "攻撃力", value: 33 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-8",
    slot: "sands",
    slotName: "時の砂",
    setName: "ファントムハンター",
    mainStat: { name: "HP%", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 21.8 },
      { name: "会心率", value: 7.8 },
      { name: "元素チャージ効率", value: 11.0 },
      { name: "HP", value: 508 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-9",
    slot: "sands",
    slotName: "時の砂",
    setName: "絶縁の旗印",
    mainStat: { name: "元素チャージ効率", value: "51.8%" },
    subStats: [
      { name: "会心率", value: 9.7 },
      { name: "会心ダメージ", value: 14.8 },
      { name: "攻撃力%", value: 9.9 },
      { name: "攻撃力", value: 16 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-9b",
    slot: "sands",
    slotName: "時の砂",
    setName: "黒曜の秘典",
    mainStat: { name: "攻撃力%", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 27.2 },
      { name: "会心率", value: 7.4 },
      { name: "元素チャージ効率", value: 11.0 },
      { name: "攻撃力", value: 18 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-9c",
    slot: "sands",
    slotName: "時の砂",
    setName: "灰燼の都に立ち栄える勇者",
    mainStat: { name: "防御力%", value: "58.3%" },
    subStats: [
      { name: "元素チャージ効率", value: 18.8 },
      { name: "会心率", value: 7.0 },
      { name: "防御力", value: 42 },
      { name: "HP%", value: 9.3 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-9d",
    slot: "sands",
    slotName: "時の砂",
    setName: "天穹の顕現せし夜",
    mainStat: { name: "攻撃力%", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 27.2 },
      { name: "会心率", value: 7.0 },
      { name: "元素熟知", value: 42 },
      { name: "攻撃力", value: 19 }
    ],
    level: 20,
    rarity: 5
  },

  // 空の杯 (Goblet)
  {
    id: "inv-11",
    slot: "goblet",
    slotName: "空の杯",
    setName: "黄金の劇団",
    mainStat: { name: "水元素ダメージ", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 14.0 },
      { name: "会心率", value: 7.0 },
      { name: "HP%", value: 10.5 },
      { name: "元素チャージ効率", value: 5.8 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-12",
    slot: "goblet",
    slotName: "空の杯",
    setName: "ファントムハンター",
    mainStat: { name: "水元素ダメージ", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 28.0 },
      { name: "HP%", value: 10.5 },
      { name: "元素チャージ効率", value: 5.2 },
      { name: "防御力", value: 19 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-14",
    slot: "goblet",
    slotName: "空の杯",
    setName: "絶縁の旗印",
    mainStat: { name: "雷元素ダメージ", value: "46.6%" },
    subStats: [
      { name: "会心率", value: 7.0 },
      { name: "会心ダメージ", value: 22.5 },
      { name: "元素チャージ効率", value: 11.0 },
      { name: "攻撃力%", value: 4.7 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-14b",
    slot: "goblet",
    slotName: "空の杯",
    setName: "黒曜の秘典",
    mainStat: { name: "炎元素ダメージ", value: "46.6%" },
    subStats: [
      { name: "会心ダメージ", value: 25.6 },
      { name: "攻撃力%", value: 10.5 },
      { name: "会心率", value: 6.6 },
      { name: "元素熟知", value: 21 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-14c",
    slot: "goblet",
    slotName: "空の杯",
    setName: "灰燼の都に立ち栄える勇者",
    mainStat: { name: "防御力%", value: "58.3%" },
    subStats: [
      { name: "元素チャージ効率", value: 16.2 },
      { name: "会心率", value: 7.4 },
      { name: "防御力", value: 39 },
      { name: "HP", value: 478 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-14d",
    slot: "goblet",
    slotName: "空の杯",
    setName: "天穹の顕現せし夜",
    mainStat: { name: "攻撃力%", value: "46.6%" }, // フリンズ向け月感電特化攻撃力杯！
    subStats: [
      { name: "会心ダメージ", value: 28.0 },
      { name: "会心率", value: 7.4 },
      { name: "元素熟知", value: 42 },
      { name: "攻撃力", value: 18 }
    ],
    level: 20,
    rarity: 5
  },

  // 理の冠 (Circlet)
  {
    id: "inv-15",
    slot: "circlet",
    slotName: "理の冠",
    setName: "黄金の劇団",
    mainStat: { name: "会心ダメージ", value: "62.2%" },
    subStats: [
      { name: "会心率", value: 10.5 },
      { name: "HP%", value: 9.3 },
      { name: "元素チャージ効率", value: 5.8 },
      { name: "攻撃力", value: 19 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-16",
    slot: "circlet",
    slotName: "理の冠",
    setName: "ファントムハンター",
    mainStat: { name: "会心ダメージ", value: "62.2%" },
    subStats: [
      { name: "会心率", value: 7.0 },
      { name: "HP%", value: 14.0 },
      { name: "元素チャージ効率", value: 6.5 },
      { name: "攻撃力%", value: 5.3 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-17",
    slot: "circlet",
    slotName: "理の冠",
    setName: "絶縁の旗印",
    mainStat: { name: "会心率", value: "31.1%" },
    subStats: [
      { name: "会心ダメージ", value: 21.0 },
      { name: "元素チャージ効率", value: 11.0 },
      { name: "攻撃力%", value: 10.5 },
      { name: "元素熟知", value: 23 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-17b",
    slot: "circlet",
    slotName: "理の冠",
    setName: "黒曜の秘典",
    mainStat: { name: "会心ダメージ", value: "62.2%" },
    subStats: [
      { name: "攻撃力%", value: 15.2 },
      { name: "会心率", value: 6.2 },
      { name: "元素熟知", value: 40 },
      { name: "元素チャージ効率", value: 5.8 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-17c",
    slot: "circlet",
    slotName: "理の冠",
    setName: "灰燼の都に立ち栄える勇者",
    mainStat: { name: "与える治療効果", value: "35.9%" },
    subStats: [
      { name: "防御力%", value: 18.2 },
      { name: "元素チャージ効率", value: 16.8 },
      { name: "会心率", value: 7.0 },
      { name: "防御力", value: 37 }
    ],
    level: 20,
    rarity: 5
  },
  {
    id: "inv-17d",
    slot: "circlet",
    slotName: "理の冠",
    setName: "天穹の顕現せし夜",
    mainStat: { name: "会心ダメージ", value: "62.2%" },
    subStats: [
      { name: "会心率", value: 10.5 },
      { name: "攻撃力%", value: 14.0 },
      { name: "元素熟知", value: 23 },
      { name: "攻撃力", value: 19 }
    ],
    level: 20,
    rarity: 5
  }
];

const SAMPLE_ARTIFACTS = INITIAL_INVENTORY.slice(0, 5);
