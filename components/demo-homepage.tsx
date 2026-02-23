"use client"

import { useState } from "react"
import { Check, Copy, ChevronRight, Trophy, Users, TrendingUp, Star } from "lucide-react"
import Image from "next/image"

function EmbedCodeBanner() {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const embedCode = `<!-- Silk Horse Club AI Chat Widget -->\n<script src="https://YOUR_DOMAIN/widget.js" defer><\/script>`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-900">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2 text-sm font-medium"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500 text-[10px] font-bold text-white">
            {"i"}
          </span>
          <span>
            {"これはAIチャットウィジェットのデモ画面です。右下のアイコンをクリックしてお試しください。"}
          </span>
          <ChevronRight
            className={`ml-auto h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
        {expanded && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-amber-800">
              {"以下のコードを公式サイトの </body> タグの直前に貼り付けると、同じウィジェットが表示されます。YOUR_DOMAIN をデプロイ先URLに置き換えてください。"}
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg bg-amber-900 p-3 text-xs font-mono text-amber-100 leading-relaxed">
                {embedCode}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded bg-amber-700 text-amber-100 transition-colors hover:bg-amber-600"
                aria-label="copy embed code"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function DemoHomepage() {
  return (
    <div className="min-h-dvh bg-white text-gray-900">
      {/* Embed code banner */}
      <EmbedCodeBanner />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-gray-900">
                SILK HORSE CLUB
              </span>
              <span className="ml-2 text-xs text-gray-400">DEMO</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            <span className="cursor-default hover:text-sky-600">{"はじめての方へ"}</span>
            <span className="cursor-default hover:text-sky-600">{"募集馬情報"}</span>
            <span className="cursor-default hover:text-sky-600">{"レース情報"}</span>
            <span className="cursor-default hover:text-sky-600">{"クラブについて"}</span>
            <span className="rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white cursor-default hover:bg-sky-700 transition-colors">
              {"マイページ"}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:py-24">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
              {"Silk Horse Club"}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl text-balance">
              {"愛馬と織りなす"}
              <br />
              {"3つの「よろこび」"}
            </h1>
            <p className="max-w-md text-base leading-relaxed text-gray-500">
              {"シルク・ホースクラブは、あなただけの愛馬とともに競馬の興奮を味わえる一口馬主クラブです。出資の安心・成長の感動・仲間との出会い。"}
            </p>
            <div className="flex gap-3">
              <span className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white cursor-default hover:bg-sky-700 transition-colors">
                {"入会のご案内"}
              </span>
              <span className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 cursor-default hover:bg-gray-50 transition-colors">
                {"募集馬を見る"}
              </span>
            </div>
          </div>
          <div className="relative flex-1">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-horse.jpg"
                alt="Thoroughbred racehorse galloping"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-white py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { icon: Trophy, label: "G1", value: "15+" },
            { icon: Users, label: "Club Members", value: "3,000+" },
            { icon: TrendingUp, label: "Annual Wins", value: "200+" },
            { icon: Star, label: "Years of History", value: "40+" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <stat.icon className="h-6 w-6 text-sky-500" />
              <span className="text-2xl font-bold text-gray-900 md:text-3xl">{stat.value}</span>
              <span className="text-xs uppercase tracking-wider text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Horses */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">{"活躍馬のご紹介"}</h2>
          <p className="mb-10 text-center text-sm text-gray-400">{"クラブが誇る名馬たちの輝かしい戦績"}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "アーモンドアイ",
                record: "G1 9勝 / 牝馬三冠",
                desc: "ジャパンカップレコードを樹立。2018・2020年の年度代表馬。JRA顕彰馬。",
              },
              {
                name: "イクイノックス",
                record: "G1 6勝 / 2年連続年度代表馬",
                desc: "天皇賞秋2回、有馬記念、宝塚記念、ジャパンカップ、ドバイシーマクラシック制覇。JRA顕彰馬。",
              },
              {
                name: "シルクジャスティス",
                record: "1997年 有馬記念優勝",
                desc: "クラブ初のG1制覇を達成。シルクレーシングの名を広く知らしめた名馬。",
              },
            ].map((horse) => (
              <div
                key={horse.name}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-500" />
                  <h3 className="text-lg font-bold text-gray-900">{horse.name}</h3>
                </div>
                <p className="mb-3 text-xs font-medium text-sky-600">{horse.record}</p>
                <p className="text-sm leading-relaxed text-gray-500">{horse.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-600 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl text-balance">
            {"あなたも愛馬のオーナーになりませんか？"}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-sky-100">
            {"入会金11,000円、月会費3,300円から始められます。まずはお気軽にお問い合わせください。"}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-sky-700 cursor-default hover:bg-sky-50 transition-colors">
              {"入会のお申し込み"}
            </span>
            <span className="rounded-full border border-sky-300 px-8 py-3 text-sm font-semibold text-white cursor-default hover:bg-sky-500 transition-colors">
              {"資料請求"}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <span className="text-sm font-bold text-gray-900">SILK HORSE CLUB</span>
              <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                DEMO
              </span>
              <p className="mt-1 text-xs text-gray-400">
                {"※これは埋め込みウィジェットのデモ画面です。実際の公式サイトではありません。"}
              </p>
            </div>
            <p className="text-xs text-gray-400">
              {"右下のチャットアイコンをクリックしてAIアシスタントをお試しください"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
