// Genshin Impact KQM Artifact Evaluator & Optimizer
// Core Application Logic

let inventory = [];
let currentArtifact = null;
let selectedCharacterKey = "furina";
let activeTab = "optimizer"; // "optimizer" | "single" | "inventory"

// アプリケーション初期化
document.addEventListener("DOMContentLoaded", () => {
  loadInventoryFromStorage();
  initCharacterSelect();
  initEventListeners();
  loadStoredApiKey();
  switchTab("optimizer");

  // 初回オプティマイズを実行
  runBuildOptimizer();
  if (window.lucide) lucide.createIcons();
});

// インベントリの読み込み
function loadInventoryFromStorage() {
  const stored = localStorage.getItem("genshin_kqm_inventory");
  if (stored) {
    try {
      inventory = JSON.parse(stored);
    } catch (e) {
      inventory = [...INITIAL_INVENTORY];
    }
  } else {
    inventory = [...INITIAL_INVENTORY];
    saveInventoryToStorage();
  }
  updateInventoryCounter();
}

function saveInventoryToStorage() {
  localStorage.setItem("genshin_kqm_inventory", JSON.stringify(inventory));
  updateInventoryCounter();
}

function updateInventoryCounter() {
  const countEl = document.getElementById("inv-total-count");
  if (countEl) countEl.textContent = inventory.length;
}

let currentElementFilter = "ALL";
let characterSearchQuery = "";

// キャラクター選択プルダウンの初期化
function initCharacterSelect() {
  populateCharacterOptions();
  updateCharacterProfile(selectedCharacterKey);
}

function populateCharacterOptions() {
  const charSelect = document.getElementById("character-select");
  const countEl = document.getElementById("char-filtered-count");
  charSelect.innerHTML = "";

  const query = characterSearchQuery.toLowerCase().trim();
  const keys = Object.keys(KQM_CHARACTERS).filter(key => {
    const char = KQM_CHARACTERS[key];
    // 元素フィルター
    if (currentElementFilter !== "ALL" && char.element !== currentElementFilter) {
      return false;
    }
    // 検索フィルター (名前, 英語名, ロール)
    if (query) {
      const matchName = char.name.toLowerCase().includes(query);
      const matchEn = char.enName.toLowerCase().includes(query);
      const matchRole = char.role.toLowerCase().includes(query);
      return matchName || matchEn || matchRole;
    }
    return true;
  });

  if (countEl) countEl.textContent = `全${keys.length}名`;

  if (keys.length === 0) {
    const opt = document.createElement("option");
    opt.disabled = true;
    opt.textContent = "該当するキャラクターが見つかりません";
    charSelect.appendChild(opt);
    return;
  }

  keys.forEach(key => {
    const char = KQM_CHARACTERS[key];
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `[${char.element}] ${char.name} (${char.enName}) - ${char.role}`;
    charSelect.appendChild(option);
  });

  // 選択中キャラがリスト内にあればそれを選択、無ければ先頭を選択
  if (keys.includes(selectedCharacterKey)) {
    charSelect.value = selectedCharacterKey;
  } else {
    selectedCharacterKey = keys[0];
    charSelect.value = selectedCharacterKey;
    onCharacterChange(selectedCharacterKey);
  }
}

// キャラクター変更時の処理
function onCharacterChange(charKey) {
  selectedCharacterKey = charKey;
  updateCharacterProfile(charKey);
  runBuildOptimizer();
  if (currentArtifact) {
    evaluateSingleArtifact(currentArtifact, charKey);
  }
}

// キャラクターの原神Wiki推奨情報カードを更新
function updateCharacterProfile(charKey) {
  const char = KQM_CHARACTERS[charKey];
  if (!char) return;

  document.getElementById("char-name-display").textContent = char.name;
  document.getElementById("char-en-name").textContent = char.enName || "";
  document.getElementById("char-role-badge").textContent = char.role;
  document.getElementById("char-element-badge").textContent = char.element;
  document.getElementById("char-kqm-link").href = char.wikiUrl || `https://wikiwiki.jp/genshinwiki/${encodeURIComponent(char.name)}`;

  // ベストセット
  const bestSetsEl = document.getElementById("char-best-sets");
  bestSetsEl.innerHTML = char.bestSets.map(set => `
    <div class="p-2.5 rounded-lg bg-slate-800/80 border border-amber-500/30 text-xs">
      <div class="flex justify-between items-center mb-1">
        <span class="font-bold text-amber-300 text-sm">${set.name} (${set.pieces}セット)</span>
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300">${set.rank}</span>
      </div>
      <p class="text-slate-300 text-xs leading-relaxed">${set.desc}</p>
    </div>
  `).join("");

  // メインステータス推奨
  document.getElementById("char-sands-main").textContent = char.mainStats.sands.join(" / ");
  document.getElementById("char-goblet-main").textContent = char.mainStats.goblet.join(" / ");
  document.getElementById("char-circlet-main").textContent = char.mainStats.circlet.join(" / ");

  // サブステ優先度
  document.getElementById("char-sub-s").textContent = char.substatPriority.tierS.join(", ") || "特になし";
  document.getElementById("char-sub-a").textContent = char.substatPriority.tierA.join(", ") || "なし";
  document.getElementById("char-er-req").textContent = char.erRequirements;
  document.getElementById("char-kqm-tips").textContent = char.wikiAdvice || char.kqmTips;
  if (window.lucide) lucide.createIcons();
}

// タブ切り替え
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.dataset.tab === tab) {
      btn.className = "tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-lg shadow-amber-500/10 flex items-center gap-2";
    } else {
      btn.className = "tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent flex items-center gap-2 transition";
    }
  });

  document.getElementById("section-optimizer").classList.toggle("hidden", tab !== "optimizer");
  document.getElementById("section-single").classList.toggle("hidden", tab !== "single");
  document.getElementById("section-inventory").classList.toggle("hidden", tab !== "inventory");

  if (tab === "optimizer") runBuildOptimizer();
  if (tab === "inventory") renderInventoryTable();
  if (window.lucide) lucide.createIcons();
}

// イベントリスナーの登録
function initEventListeners() {
  // キャラクター変更
  document.getElementById("character-select").addEventListener("change", (e) => {
    onCharacterChange(e.target.value);
  });

  // キャラクター検索
  document.getElementById("char-search-input")?.addEventListener("input", (e) => {
    characterSearchQuery = e.target.value;
    populateCharacterOptions();
  });

  // 元素フィルターチップ
  document.querySelectorAll(".elem-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".elem-chip").forEach(c => {
        c.className = "elem-chip px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700";
      });
      chip.className = "elem-chip px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm";
      currentElementFilter = chip.dataset.elem;
      populateCharacterOptions();
    });
  });

  // タブボタン
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // 画像アップロードドラッグ＆ドロップ
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");

  dropZone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleMultipleFileSelect);

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("border-amber-400", "bg-slate-800/80");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("border-amber-400", "bg-slate-800/80");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("border-amber-400", "bg-slate-800/80");
    if (e.dataTransfer.files.length > 0) {
      handleMultipleFiles(e.dataTransfer.files);
    }
  });

  // クリップボード貼り付け (Ctrl + V)
  window.addEventListener("paste", (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        handleMultipleFiles([file]);
        break;
      }
    }
  });

  // APIキー保存
  document.getElementById("btn-save-key").addEventListener("click", saveApiKey);

  // オプティマイズ再計算ボタン
  document.getElementById("btn-re-optimize")?.addEventListener("click", runBuildOptimizer);

  // 初期インベントリ復元ボタン
  document.getElementById("btn-reset-inventory")?.addEventListener("click", () => {
    if (confirm("インベントリを手持ち初期プリセット（18個）にリセットしますか？")) {
      inventory = [...INITIAL_INVENTORY];
      saveInventoryToStorage();
      renderInventoryTable();
      runBuildOptimizer();
      alert("インベントリをリセットしました。");
    }
  });

  // サンプル聖遺物ボタン（個別診断用）
  document.querySelectorAll(".sample-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => loadSampleArtifact(index));
  });
}

// APIキー関連
function loadStoredApiKey() {
  const key = localStorage.getItem("gemini_api_key");
  if (key) {
    document.getElementById("api-key-input").value = key;
    document.getElementById("key-status").textContent = "✓ APIキー設定済み";
    document.getElementById("key-status").className = "text-xs text-emerald-400 font-medium";
  }
}

function saveApiKey() {
  const key = document.getElementById("api-key-input").value.trim();
  if (key) {
    localStorage.setItem("gemini_api_key", key);
    document.getElementById("key-status").textContent = "✓ 保存しました";
    document.getElementById("key-status").className = "text-xs text-emerald-400 font-medium";
    setTimeout(() => {
      document.getElementById("key-status").textContent = "✓ APIキー設定済み";
    }, 2000);
  } else {
    localStorage.removeItem("gemini_api_key");
    document.getElementById("key-status").textContent = "未設定（サンプルで試せます）";
    document.getElementById("key-status").className = "text-xs text-slate-400";
  }
}

// 複数画像ファイルの処理
function handleMultipleFileSelect(e) {
  if (e.target.files.length > 0) {
    handleMultipleFiles(e.target.files);
  }
}

async function handleMultipleFiles(fileList) {
  const files = Array.from(fileList).filter(f => f.type.startsWith("image/"));
  if (files.length === 0) {
    alert("画像ファイルを選択してください。");
    return;
  }

  const apiKey = localStorage.getItem("gemini_api_key");
  if (!apiKey) {
    alert("画像をAI解析するにはGemini APIキーが必要です。右上の設定欄にAPIキーを入力してください。\n（※APIキーがなくても、初期プリセットのインベントリでオプティマイズ機能を試せます）");
    return;
  }

  const statusEl = document.getElementById("scan-status");
  const spinnerEl = document.getElementById("scan-spinner");
  statusEl.classList.remove("hidden");
  spinnerEl.classList.remove("hidden");

  let successCount = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    statusEl.querySelector("span").textContent = `AI解析中: ${i + 1}/${files.length} 枚目 (${file.name})...`;
    try {
      const parsed = await analyzeImageWithGemini(file, apiKey);
      if (parsed) {
        parsed.id = "user-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5);
        inventory.unshift(parsed); // 先頭に追加
        successCount++;
      }
    } catch (err) {
      console.error(`解析失敗 (${file.name}):`, err);
    }
  }

  spinnerEl.classList.add("hidden");
  statusEl.querySelector("span").textContent = `✓ ${successCount} 枚の聖遺物をインベントリに追加しました！`;
  saveInventoryToStorage();

  // 最新のものを個別プレビュー
  if (inventory.length > 0) {
    currentArtifact = inventory[0];
    renderArtifactCard(currentArtifact);
    evaluateSingleArtifact(currentArtifact, selectedCharacterKey);
  }

  runBuildOptimizer();
  if (activeTab === "inventory") renderInventoryTable();

  setTimeout(() => statusEl.classList.add("hidden"), 4000);
}

// 1枚の画像をGemini APIで解析
function analyzeImageWithGemini(file, apiKey) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const base64Content = dataUrl.split(",")[1];
      const mimeType = file.type;

      const prompt = `
あなたは原神(Genshin Impact)の聖遺物解析エキスパートです。
提供された聖遺物の詳細画面またはインベントリ画面のスクリーンショットから、聖遺物情報を正確に読み取ってJSON形式で出力してください。
インベントリ一覧画面の場合は、選択中（右側に詳細が出ている）聖遺物の情報を抽出してください。

【出力JSONフォーマット】
{
  "slot": "flower" | "plume" | "sands" | "goblet" | "circlet",
  "slotName": "生の花" | "死の羽" | "時の砂" | "空の杯" | "理の冠",
  "setName": "聖遺物セット名（例: 黄金の劇団, ファントムハンター, 絶縁の旗印, 翠緑の影 等）",
  "level": 強化レベル（数値、例: 20）,
  "rarity": 5,
  "mainStat": {
    "name": "メインステータス名（例: HP, 攻撃力, HP%, 攻撃力%, 防御力%, 元素熟知, 元素チャージ効率, 水元素ダメージ, 会心率, 会心ダメージ 等）",
    "value": "数値（例: 46.6% や 4,780）"
  },
  "subStats": [
    { "name": "サブステ名1", "value": 数値（例: 会心率なら3.9, 攻撃力なら19） },
    { "name": "サブステ名2", "value": 数値 },
    { "name": "サブステ名3", "value": 数値 },
    { "name": "サブステ名4", "value": 数値 }
  ]
}

必ずJSONブロック(\`\`\`json ... \`\`\`)のみを出力してください。
`;

      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: base64Content } }
              ]
            }],
            generationConfig: {
              response_mime_type: "application/json",
              temperature: 0.1
            }
          })
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error?.message || "Gemini APIエラー");
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(rawText.replace(/```json/g, "").replace(/```/g, "").trim());
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==========================================
// KQM 5部位ベスト装備自動選定 (Build Optimizer)
// ==========================================

function runBuildOptimizer() {
  const char = KQM_CHARACTERS[selectedCharacterKey];
  if (!char) return;

  const resultContainer = document.getElementById("optimizer-result");
  const slotsContainer = document.getElementById("optimizer-slots");
  const alertContainer = document.getElementById("optimizer-alerts");

  // スロットごとに聖遺物を分類
  const slotGroups = {
    flower: inventory.filter(a => a.slot === "flower" || a.slotName === "生の花"),
    plume: inventory.filter(a => a.slot === "plume" || a.slotName === "死の羽"),
    sands: inventory.filter(a => a.slot === "sands" || a.slotName === "時の砂"),
    goblet: inventory.filter(a => a.slot === "goblet" || a.slotName === "空の杯"),
    circlet: inventory.filter(a => a.slot === "circlet" || a.slotName === "理の冠")
  };

  // 足りない部位のチェック
  const missingSlots = [];
  if (slotGroups.flower.length === 0) missingSlots.push("生の花");
  if (slotGroups.plume.length === 0) missingSlots.push("死の羽");
  if (slotGroups.sands.length === 0) missingSlots.push("時の砂");
  if (slotGroups.goblet.length === 0) missingSlots.push("空の杯");
  if (slotGroups.circlet.length === 0) missingSlots.push("理の冠");

  if (missingSlots.length > 0) {
    alertContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs">
        ⚠️ 以下の部位の手持ち聖遺物がありません: <strong>${missingSlots.join(", ")}</strong><br>
        スクショをアップロードするか、インベントリ画面で追加してください。
      </div>
    `;
  } else {
    alertContainer.innerHTML = "";
  }

  // 各聖遺物のキャラ適合単体スコアを事前計算
  const scoredSlots = {};
  for (let slotKey of ["flower", "plume", "sands", "goblet", "circlet"]) {
    scoredSlots[slotKey] = slotGroups[slotKey].map(art => ({
      art,
      scoreInfo: calculateArtifactFitScore(art, char, slotKey)
    })).sort((a, b) => b.scoreInfo.score - a.scoreInfo.score);
  }

  // 組み合わせ探索（各スロット上位候補から探索）
  const candidatesFlower = scoredSlots.flower.slice(0, 4);
  const candidatesPlume = scoredSlots.plume.slice(0, 4);
  const candidatesSands = scoredSlots.sands.slice(0, 4);
  const candidatesGoblet = scoredSlots.goblet.slice(0, 4);
  const candidatesCirclet = scoredSlots.circlet.slice(0, 4);

  let bestCombination = null;
  let maxTotalScore = -1;

  for (let f of candidatesFlower) {
    for (let p of candidatesPlume) {
      for (let s of candidatesSands) {
        for (let g of candidatesGoblet) {
          for (let c of candidatesCirclet) {
            const comb = [f, p, s, g, c];
            const evalResult = evaluate5PieceCombination(comb, char);
            if (evalResult.totalScore > maxTotalScore) {
              maxTotalScore = evalResult.totalScore;
              bestCombination = evalResult;
            }
          }
        }
      }
    }
  }

  if (!bestCombination) {
    slotsContainer.innerHTML = "<p class='text-slate-400 text-sm'>組み合わせを算出できませんでした。手持ち聖遺物を追加してください。</p>";
    return;
  }

  renderOptimizerResult(bestCombination, char);
}

// 聖遺物の単体適合度計算
function calculateArtifactFitScore(art, char, slotKey) {
  let score = 0;

  // 1. CV (会心スコア)
  let cr = 0, cd = 0;
  art.subStats.forEach(s => {
    if (s.name.includes("会心率")) cr += parseFloat(s.value) || 0;
    if (s.name.includes("会心ダメージ") || s.name.includes("会心ダメ")) cd += parseFloat(s.value) || 0;
  });
  const cv = (cr * 2) + cd;

  // 2. メインステータス適合
  let isMainMatch = false;
  if (slotKey === "flower" || slotKey === "plume") {
    isMainMatch = true;
    score += 20;
  } else {
    const recMains = char.mainStats[slotKey] || [];
    isMainMatch = recMains.some(m => art.mainStat.name.includes(m) || m.includes(art.mainStat.name));
    if (isMainMatch) {
      score += 40; // メインステ一致は最重要
    } else {
      score -= 20; // メインステ不一致は大減点
    }
  }

  // 3. 有効サブステロール数 (RV)
  let rv = 0;
  art.subStats.forEach(s => {
    let cleanName = s.name.replace("+", "").trim();
    let weight = 0;
    if (char.substatPriority.tierS.some(p => cleanName.includes(p) || p.includes(cleanName))) weight = 1.0;
    else if (char.substatPriority.tierA.some(p => cleanName.includes(p) || p.includes(cleanName))) weight = 0.8;
    else if (char.substatPriority.tierB && char.substatPriority.tierB.some(p => cleanName.includes(p) || p.includes(cleanName))) weight = 0.4;

    let maxRoll = 5.0;
    Object.keys(STAT_MAX_ROLLS).forEach(k => {
      if (cleanName.includes(k)) maxRoll = STAT_MAX_ROLLS[k];
    });
    const rolls = parseFloat(s.value) / maxRoll;
    rv += rolls * weight;
  });

  score += (rv * 8) + (cv * 0.4);

  return {
    score,
    cv: cv.toFixed(1),
    rv: rv.toFixed(1),
    isMainMatch
  };
}

// 5部位の組み合わせ評価（セット効果含む）
function evaluate5PieceCombination(comb, char) {
  // comb: [ {art, scoreInfo}, ... 5スロット分 ]
  const pieces = comb.map(c => c.art);

  // セットカウント
  const setCounts = {};
  pieces.forEach(p => {
    setCounts[p.setName] = (setCounts[p.setName] || 0) + 1;
  });

  let setBonusScore = 0;
  let activeSetNames = [];
  let is4pcActive = false;

  // KQM推奨セットと突き合わせ
  char.bestSets.forEach(bs => {
    const count = setCounts[bs.name] || 0;
    if (bs.pieces === 4 && count >= 4) {
      if (bs.rank.includes("Best") || bs.rank.includes("最適")) {
        setBonusScore += 80; // KQM最適4セット
      } else {
        setBonusScore += 55; // 代替4セット
      }
      activeSetNames.push(`${bs.name} (4セット)`);
      is4pcActive = true;
    } else if (bs.pieces === 2 && count >= 2 && !is4pcActive) {
      setBonusScore += 25;
      activeSetNames.push(`${bs.name} (2セット)`);
    }
  });

  // 個別スコアの合算
  let sumPieceScore = 0;
  let totalCV = 0;
  let totalRV = 0;

  comb.forEach(c => {
    sumPieceScore += c.scoreInfo.score;
    totalCV += parseFloat(c.scoreInfo.cv);
    totalRV += parseFloat(c.scoreInfo.rv);
  });

  const totalScore = sumPieceScore + setBonusScore;

  return {
    comb,
    pieces,
    totalScore: Math.round(totalScore),
    totalCV: totalCV.toFixed(1),
    totalRV: totalRV.toFixed(1),
    activeSetNames,
    is4pcActive
  };
}

// オプティマイズ結果の描画
function renderOptimizerResult(res, char) {
  const container = document.getElementById("optimizer-slots");
  const slotLabels = [
    { key: "flower", name: "生の花", icon: "flower-2" },
    { key: "plume", name: "死の羽", icon: "feather" },
    { key: "sands", name: "時の砂", icon: "hourglass" },
    { key: "goblet", name: "空の杯", icon: "cup-soda" },
    { key: "circlet", name: "理の冠", icon: "crown" }
  ];

  // サマリー表示
  document.getElementById("opt-total-cv").textContent = res.totalCV;
  document.getElementById("opt-total-rv").textContent = `${res.totalRV} 回`;
  document.getElementById("opt-active-set").textContent = res.activeSetNames.length > 0 ? res.activeSetNames.join(" + ") : "セット効果未発動 (バラバラ)";
  document.getElementById("opt-verdict-text").textContent = `所持している聖遺物の中から【${char.name}】に最もおすすめの5部位を導き出しました！`;

  // 5スロットのカード描画
  container.innerHTML = res.comb.map((item, idx) => {
    const art = item.art;
    const meta = slotLabels[idx];
    const info = item.scoreInfo;

    return `
      <div class="rounded-xl p-3.5 bg-slate-900/90 border border-slate-700/60 shadow-lg flex flex-col justify-between hover:border-amber-400/50 transition">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <div class="flex items-center gap-1.5">
              <span class="text-amber-400 font-bold text-xs flex items-center gap-1">
                <i data-lucide="${meta.icon}" class="w-3.5 h-3.5"></i> ${meta.name}
              </span>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded font-bold ${info.isMainMatch ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">
              ${info.isMainMatch ? 'メイン適合' : '不一致'}
            </span>
          </div>

          <!-- Set & Main Stat -->
          <div class="mb-2">
            <span class="text-xs font-bold text-amber-200 block truncate">${art.setName}</span>
            <div class="flex items-baseline justify-between mt-0.5">
              <span class="text-[11px] text-slate-300">${art.mainStat.name}</span>
              <span class="text-sm font-black font-cinzel text-amber-300">${art.mainStat.value}</span>
            </div>
          </div>

          <!-- Substats Preview -->
          <div class="space-y-1 text-[11px] bg-slate-950/50 p-2 rounded-lg border border-slate-800/80 mb-2">
            ${art.subStats.map(s => {
              const isCrit = s.name.includes("会心");
              return `
                <div class="flex justify-between items-center ${isCrit ? 'text-amber-200 font-medium' : 'text-slate-400'}">
                  <span>・${s.name}</span>
                  <span>+${s.value}${s.name.includes('%') || isCrit || s.name.includes('効率') ? '%' : ''}</span>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Slot Footer -->
        <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
          <span>CV: <strong class="text-amber-300">${info.cv}</strong></span>
          <span>有効RV: <strong class="text-emerald-300">${info.rv}</strong></span>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// インベントリ一覧テーブルの描画
// ==========================================

function renderInventoryTable() {
  const tbody = document.getElementById("inventory-table-body");
  if (!tbody) return;

  if (inventory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400 text-xs">手持ち聖遺物がありません。スクショをアップロードしてください。</td></tr>`;
    return;
  }

  tbody.innerHTML = inventory.map((art, index) => {
    // 会心スコア
    let cr = 0, cd = 0;
    art.subStats.forEach(s => {
      if (s.name.includes("会心率")) cr += parseFloat(s.value) || 0;
      if (s.name.includes("会心ダメージ") || s.name.includes("会心ダメ")) cd += parseFloat(s.value) || 0;
    });
    const cv = ((cr * 2) + cd).toFixed(1);

    const subText = art.subStats.map(s => `${s.name}: ${s.value}`).join(" / ");

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/40 text-xs transition">
        <td class="py-2.5 px-3 font-medium text-slate-300">${art.slotName || art.slot}</td>
        <td class="py-2.5 px-3 font-bold text-amber-200">${art.setName}</td>
        <td class="py-2.5 px-3 text-slate-200 font-medium">${art.mainStat.name} (${art.mainStat.value})</td>
        <td class="py-2.5 px-3 text-slate-400 text-[11px] max-w-xs truncate" title="${subText}">${subText}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-amber-300 text-center">${cv}</td>
        <td class="py-2.5 px-3 text-right">
          <button class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 mr-1" onclick="previewInventoryItem(${index})">確認</button>
          <button class="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300" onclick="deleteInventoryItem(${index})">削除</button>
        </td>
      </tr>
    `;
  }).join("");
}

function previewInventoryItem(index) {
  currentArtifact = inventory[index];
  switchTab("single");
  renderArtifactCard(currentArtifact);
  evaluateSingleArtifact(currentArtifact, selectedCharacterKey);
}

function deleteInventoryItem(index) {
  if (confirm(`この聖遺物をインベントリから削除しますか？`)) {
    inventory.splice(index, 1);
    saveInventoryToStorage();
    renderInventoryTable();
    runBuildOptimizer();
  }
}

// ==========================================
// 単体聖遺物 診断
// ==========================================

function loadSampleArtifact(index) {
  currentArtifact = SAMPLE_ARTIFACTS[index] || SAMPLE_ARTIFACTS[0];
  renderArtifactCard(currentArtifact);
  evaluateSingleArtifact(currentArtifact, selectedCharacterKey);
  switchTab("single");
}

function renderArtifactCard(art) {
  const card = document.getElementById("artifact-card-container");
  if (!card) return;
  card.classList.remove("hidden");

  document.getElementById("art-slot-badge").textContent = art.slotName || "聖遺物";
  document.getElementById("art-level-badge").textContent = `+${art.level ?? 20}`;
  document.getElementById("art-set-name").textContent = art.setName || "不明なセット";
  document.getElementById("art-main-stat-name").textContent = art.mainStat.name;
  document.getElementById("art-main-stat-val").textContent = art.mainStat.value;

  const subStatsList = document.getElementById("art-substats-list");
  subStatsList.innerHTML = art.subStats.map(s => {
    const isPct = s.name.includes("%") || s.name.includes("会心") || s.name.includes("チャージ") || s.name.includes("効率");
    const valText = isPct ? `+${s.value}%` : `+${s.value}`;
    return `
      <div class="flex justify-between items-center py-1.5 px-3 rounded bg-slate-900/60 border border-slate-700/50 text-sm">
        <span class="text-slate-300">・ ${s.name}</span>
        <span class="font-bold text-amber-200">${valText}</span>
      </div>
    `;
  }).join("");
}

function evaluateSingleArtifact(art, charKey) {
  const char = KQM_CHARACTERS[charKey];
  if (!char || !art) return;

  const res = calculateArtifactFitScore(art, char, art.slot || "sands");

  // メインステータス
  let targetSlotKey = art.slot;
  if (!targetSlotKey) {
    if (art.slotName === "時の砂") targetSlotKey = "sands";
    else if (art.slotName === "空の杯") targetSlotKey = "goblet";
    else if (art.slotName === "理の冠") targetSlotKey = "circlet";
    else targetSlotKey = "sands";
  }
  const recMains = char.mainStats[targetSlotKey] || [];
  const mainDesc = res.isMainMatch
    ? `KQM推奨と一致 (${recMains.join(" / ")})`
    : `KQM非推奨（KQM推奨は ${recMains.join(" / ")}）`;

  // セット判定
  let setTier = "他セット (Off-piece)";
  char.bestSets.forEach(bs => {
    if (art.setName && (art.setName.includes(bs.name) || bs.name.includes(art.setName))) {
      setTier = bs.rank;
    }
  });

  // サブステブレイクダウン
  const subBreakdown = art.subStats.map(s => {
    let statClean = s.name.replace("+", "").trim();
    let weight = 0;
    let label = "不要";
    let cls = "text-slate-500";

    if (char.substatPriority.tierS.some(p => statClean.includes(p) || p.includes(cleanName))) {
      weight = 1.0; label = "最優先 (S)"; cls = "text-amber-400 font-bold";
    } else if (char.substatPriority.tierA.some(p => statClean.includes(p) || p.includes(cleanName))) {
      weight = 0.8; label = "優先 (A)"; cls = "text-emerald-400 font-medium";
    } else if (char.substatPriority.tierB && char.substatPriority.tierB.some(p => statClean.includes(p) || p.includes(cleanName))) {
      weight = 0.4; label = "妥協可 (B)"; cls = "text-sky-400";
    }

    let maxRoll = 5.0;
    Object.keys(STAT_MAX_ROLLS).forEach(k => {
      if (statClean.includes(k)) maxRoll = STAT_MAX_ROLLS[k];
    });
    const rolls = (parseFloat(s.value) / maxRoll).toFixed(1);

    return { name: s.name, value: s.value, label, cls, rolls, weight };
  });

  // ランク付け
  let rank = "B";
  let score = Math.min(100, Math.max(10, Math.round(res.score + 10)));
  if (score >= 90) rank = "SSS";
  else if (score >= 80) rank = "SS";
  else if (score >= 70) rank = "S";
  else if (score >= 55) rank = "A";

  const container = document.getElementById("evaluation-result");
  if (!container) return;
  container.classList.remove("hidden");

  document.getElementById("eval-rank-badge").textContent = `RANK ${rank}`;
  document.getElementById("eval-score-num").textContent = score;
  document.getElementById("eval-verdict-title").textContent = `${char.name} に対する適合度: ${rank}ランク`;
  document.getElementById("eval-cv").textContent = res.cv;
  document.getElementById("eval-effective-rolls").textContent = `${res.rv} 回`;

  const mainBadge = document.getElementById("eval-main-match");
  mainBadge.textContent = res.isMainMatch ? "✓ 推奨一致" : "✕ 非推奨";
  mainBadge.className = res.isMainMatch 
    ? "px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
    : "px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40";
  document.getElementById("eval-main-desc").textContent = mainDesc;
  document.getElementById("eval-set-tier").textContent = setTier;

  // サブブレイクダウン
  document.getElementById("eval-sub-breakdown").innerHTML = subBreakdown.map(s => `
    <div class="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-700/40 text-xs">
      <div class="flex items-center gap-2">
        <span class="text-slate-300 font-medium">${s.name} (+${s.value})</span>
        <span class="${s.cls}">[${s.label}]</span>
      </div>
      <div class="text-slate-400">
        有効換算: <span class="font-bold text-slate-200">${(s.rolls * s.weight).toFixed(1)}</span> (約${s.rolls}回分)
      </div>
    </div>
  `).join("");

  // アドバイス
  let advHtml = `<li>💡 <strong>原神Wiki ビルド解説:</strong> ${char.wikiAdvice || char.kqmTips}</li>`;
  if (!res.isMainMatch) {
    advHtml += `<li class="text-rose-300">⚠️ メインステータスが不一致です。このキャラにはメインステ一致を最優先してください。</li>`;
  }
  document.getElementById("eval-advice-list").innerHTML = advHtml;
}
