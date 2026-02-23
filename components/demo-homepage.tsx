import Image from "next/image"

export function DemoHomepage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white text-gray-900">
      {/* Navigation */}
      <nav className="shrink-0 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">
              SILK HORSE CLUB
            </span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            <span className="cursor-default">{"はじめての方へ"}</span>
            <span className="cursor-default">{"募集馬情報"}</span>
            <span className="cursor-default">{"レース情報"}</span>
            <span className="rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white cursor-default">
              {"マイページ"}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero - fills remaining space */}
      <main className="flex flex-1 items-center overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 md:flex-row">
          <div className="flex-1 space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
              {"Silk Horse Club"}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl text-balance">
              {"愛馬と織りなす"}
              <br />
              {"3つの「よろこび」"}
            </h1>
            <p className="max-w-md text-base leading-relaxed text-gray-500">
              {"あなただけの愛馬とともに競馬の興奮を味わえる一口馬主クラブです。"}
            </p>
            <div className="flex gap-3 pt-2">
              <span className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white cursor-default">
                {"入会のご案内"}
              </span>
              <span className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 cursor-default">
                {"募集馬を見る"}
              </span>
            </div>
          </div>
          <div className="hidden flex-1 md:block">
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
      </main>

      {/* Minimal footer hint */}
      <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-3 text-center text-xs text-gray-400">
        {"※デモ画面です  |  右下のチャットアイコンをクリックしてAIアシスタントをお試しください"}
      </div>
    </div>
  )
}
