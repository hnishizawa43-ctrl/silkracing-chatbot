import { EmbedCodeSection } from "@/components/embed-code-section"
import Script from "next/script"

export default function Home() {
  return (
    <div className="flex h-dvh flex-col overflow-auto bg-secondary">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-5">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-lg font-semibold text-foreground">
            Silk Horse Club AI Chat Widget
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            公式サイトにチャットボットを埋め込むための設定ページです。
            右下のアイコンをクリックしてチャットをお試しいただけます。
          </p>
        </div>
      </header>

      {/* Embed Code Section */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <EmbedCodeSection />
        </div>
      </main>

      {/* Live widget demo - loads the actual widget script */}
      <Script src="/widget.js" strategy="lazyOnload" />
    </div>
  )
}
