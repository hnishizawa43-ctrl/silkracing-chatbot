export interface Horse {
  id: string
  name: string
  nameEn: string
  sire: string
  dam: string
  damSire: string
  age: number
  sex: string
  trainer: string
  status: "active" | "retired" | "recruiting"
  totalRuns: number
  wins: number
  earnings: number
}

export interface RaceEntry {
  id: string
  horseId: string
  horseName: string
  date: string
  racecourse: string
  raceNumber: number
  raceName: string
  distance: string
  jockey: string
  weight: number
}

export interface RaceResult {
  id: string
  horseId: string
  horseName: string
  date: string
  racecourse: string
  raceName: string
  distance: string
  position: number
  jockey: string
  time: string
  prize: number
}

export interface RecruitHorse {
  id: string
  name: string
  sire: string
  dam: string
  damSire: string
  sex: string
  birthYear: number
  price: number
  totalShares: number
  remainingShares: number
  trainer: string
  comment: string
}

export const horses: Horse[] = [
  {
    id: "h1",
    name: "シルクアリエス",
    nameEn: "Silk Aries",
    sire: "エピファネイア",
    dam: "シルクプリマヴェーラ",
    damSire: "ディープインパクト",
    age: 4,
    sex: "牡",
    trainer: "友道康夫",
    status: "active",
    totalRuns: 12,
    wins: 3,
    earnings: 85000000,
  },
  {
    id: "h2",
    name: "シルクノーブル",
    nameEn: "Silk Noble",
    sire: "ロードカナロア",
    dam: "シルクレジーナ",
    damSire: "キングカメハメハ",
    age: 3,
    sex: "牝",
    trainer: "矢作芳人",
    status: "active",
    totalRuns: 6,
    wins: 2,
    earnings: 42000000,
  },
  {
    id: "h3",
    name: "シルクドリーム",
    nameEn: "Silk Dream",
    sire: "ディープインパクト",
    dam: "シルクフェアリー",
    damSire: "ハーツクライ",
    age: 5,
    sex: "牡",
    trainer: "池江泰寿",
    status: "active",
    totalRuns: 20,
    wins: 5,
    earnings: 156000000,
  },
  {
    id: "h4",
    name: "シルクグランツ",
    nameEn: "Silk Grants",
    sire: "ハーツクライ",
    dam: "シルクエレガンス",
    damSire: "サンデーサイレンス",
    age: 7,
    sex: "牡",
    trainer: "藤原英昭",
    status: "retired",
    totalRuns: 32,
    wins: 8,
    earnings: 320000000,
  },
]

export const raceEntries: RaceEntry[] = [
  {
    id: "e1",
    horseId: "h1",
    horseName: "シルクアリエス",
    date: "2026-03-01",
    racecourse: "中山",
    raceNumber: 11,
    raceName: "弥生賞ディープインパクト記念",
    distance: "芝2000m",
    jockey: "C.ルメール",
    weight: 57,
  },
  {
    id: "e2",
    horseId: "h2",
    horseName: "シルクノーブル",
    date: "2026-02-28",
    racecourse: "阪神",
    raceNumber: 10,
    raceName: "チューリップ賞",
    distance: "芝1600m",
    jockey: "川田将雅",
    weight: 54,
  },
  {
    id: "e3",
    horseId: "h3",
    horseName: "シルクドリーム",
    date: "2026-03-01",
    racecourse: "中山",
    raceNumber: 9,
    raceName: "オーシャンステークス",
    distance: "芝1200m",
    jockey: "横山武史",
    weight: 57,
  },
]

export const raceResults: RaceResult[] = [
  {
    id: "r1",
    horseId: "h1",
    horseName: "シルクアリエス",
    date: "2026-02-15",
    racecourse: "東京",
    raceName: "共同通信杯",
    distance: "芝1800m",
    position: 2,
    jockey: "C.ルメール",
    time: "1:46.8",
    prize: 22000000,
  },
  {
    id: "r2",
    horseId: "h2",
    horseName: "シルクノーブル",
    date: "2026-02-08",
    racecourse: "京都",
    raceName: "エルフィンステークス",
    distance: "芝1600m",
    position: 1,
    jockey: "川田将雅",
    time: "1:34.2",
    prize: 32000000,
  },
  {
    id: "r3",
    horseId: "h3",
    horseName: "シルクドリーム",
    date: "2026-02-09",
    racecourse: "東京",
    raceName: "東京新聞杯",
    distance: "芝1600m",
    position: 3,
    jockey: "横山武史",
    time: "1:33.5",
    prize: 8000000,
  },
  {
    id: "r4",
    horseId: "h1",
    horseName: "シルクアリエス",
    date: "2026-01-18",
    racecourse: "中山",
    raceName: "京成杯",
    distance: "芝2000m",
    position: 1,
    jockey: "C.ルメール",
    time: "2:01.5",
    prize: 42000000,
  },
]

export const recruitHorses: RecruitHorse[] = [
  {
    id: "rec1",
    name: "エピファネイアの2024",
    sire: "エピファネイア",
    dam: "シルクスターダスト",
    damSire: "ディープインパクト",
    sex: "牡",
    birthYear: 2024,
    price: 60000000,
    totalShares: 500,
    remainingShares: 120,
    trainer: "友道康夫",
    comment: "父譲りの力強い馬体。大型馬でクラシックが楽しみ。",
  },
  {
    id: "rec2",
    name: "ロードカナロアの2024",
    sire: "ロードカナロア",
    dam: "シルクブリリアント",
    damSire: "ハーツクライ",
    sex: "牝",
    birthYear: 2024,
    price: 40000000,
    totalShares: 500,
    remainingShares: 230,
    trainer: "矢作芳人",
    comment: "スピード感あふれる馬体。母系からスタミナも期待。",
  },
  {
    id: "rec3",
    name: "ディープインパクトの2024",
    sire: "ディープインパクト",
    dam: "シルクメモリー",
    damSire: "キングカメハメハ",
    sex: "牡",
    birthYear: 2024,
    price: 80000000,
    totalShares: 500,
    remainingShares: 50,
    trainer: "池江泰寿",
    comment: "最終世代。バランスの良い好馬体で人気が高い。",
  },
]

export const faqData = [
  {
    question: "入会方法",
    answer:
      "シルクレーシングへのご入会は、公式サイトの入会申込フォームから承っております。審査の上、ご案内をお送りいたします。年会費は33,000円（税込）です。",
  },
  {
    question: "出資手順",
    answer:
      "募集馬をお選びいただき、口数を指定してお申し込みください。1口の価格は総額を500口で割った金額となります。月々の維持費（会費）もかかります。",
  },
  {
    question: "分配金の入金タイミング",
    answer:
      "賞金の分配は、レース開催月の翌々月末にご登録の口座へお振込みいたします。なお、分配金はJRAからクラブへの入金を確認後の処理となります。",
  },
  {
    question: "馬の近況確認",
    answer:
      "マイページにログインいただくと、出資馬の近況報告や調教情報をご確認いただけます。重要なお知らせはメールでもお送りしております。",
  },
]

export function buildSystemPrompt(): string {
  const horseInfo = horses
    .map(
      (h) =>
        `- ${h.name}（${h.nameEn}）: ${h.sex}${h.age}歳, 父${h.sire}, 母${h.dam}, 母父${h.damSire}, 調教師: ${h.trainer}, 状態: ${h.status === "active" ? "現役" : h.status === "retired" ? "引退" : "募集中"}, ${h.totalRuns}戦${h.wins}勝, 獲得賞金: ${(h.earnings / 10000).toLocaleString()}万円`
    )
    .join("\n")

  const entryInfo = raceEntries
    .map(
      (e) =>
        `- ${e.horseName}: ${e.date} ${e.racecourse}${e.raceNumber}R ${e.raceName}（${e.distance}）, 騎手: ${e.jockey}, 斤量: ${e.weight}kg`
    )
    .join("\n")

  const resultInfo = raceResults
    .map(
      (r) =>
        `- ${r.horseName}: ${r.date} ${r.racecourse} ${r.raceName}（${r.distance}）, ${r.position}着, 騎手: ${r.jockey}, タイム: ${r.time}, 賞金: ${(r.prize / 10000).toLocaleString()}万円`
    )
    .join("\n")

  const recruitInfo = recruitHorses
    .map(
      (rh) =>
        `- ${rh.name}: 父${rh.sire}, 母${rh.dam}, 母父${rh.damSire}, ${rh.sex}, 総額${(rh.price / 10000).toLocaleString()}万円, 残り${rh.remainingShares}/${rh.totalShares}口, 調教師: ${rh.trainer}, コメント: ${rh.comment}`
    )
    .join("\n")

  const faqInfo = faqData
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n")

  return `あなたはシルクレーシング（一口馬主クラブ）のAIアシスタントです。
会員の方々からの質問に丁寧で分かりやすい日本語で回答してください。
競馬に詳しく、フレンドリーで専門的な口調で応答してください。
回答は簡潔に、しかし必要な情報は漏れなくお伝えしてください。

【所属馬情報】
${horseInfo}

【出走予定】
${entryInfo}

【最近のレース結果】
${resultInfo}

【募集馬情報】
${recruitInfo}

【FAQ】
${faqInfo}

上記の情報に基づいて回答してください。情報にない質問には、「申し訳ございません、現在その情報は手元にございません。公式サイトまたはマイページをご確認ください。」と案内してください。`
}
