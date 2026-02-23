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

      {/* Main area with centered hint */}
      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-sky-50 to-white px-6">
        <p className="text-center text-sm leading-relaxed text-gray-400">
          {"※デモ画面です"}
          <br />
          {"右下のチャットアイコンをクリックして"}
          <br />
          {"AIアシスタントをお試しください"}
        </p>
      </main>
    </div>
  )
}
