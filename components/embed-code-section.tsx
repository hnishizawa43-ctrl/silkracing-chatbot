"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function EmbedCodeSection() {
  const [copied, setCopied] = useState(false)

  const embedCode = `<!-- Silk Horse Club AI Chat Widget -->
<script src="https://YOUR_DOMAIN/widget.js" defer></script>`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <section className="rounded-xl border border-border bg-background p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            1
          </span>
          <h2 className="text-base font-semibold text-foreground">
            埋め込みコードをコピー
          </h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          {"以下のコードを公式サイトの </body> タグの直前に貼り付けてください。"}
          YOUR_DOMAIN の部分をこのアプリのデプロイ先URLに置き換えてください。
        </p>
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg bg-foreground/5 p-4 text-sm font-mono text-foreground leading-relaxed">
            {embedCode}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-background border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="コードをコピー"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </section>

      {/* Step 2 */}
      <section className="rounded-xl border border-border bg-background p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            2
          </span>
          <h2 className="text-base font-semibold text-foreground">
            動作確認
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          コードを埋め込むと、ページ右下にチャットアイコンが表示されます。
          クリックするとチャットウィンドウがポップアップで開きます。
          このページの右下にもデモが表示されていますのでお試しください。
        </p>
      </section>

      {/* Step 3 */}
      <section className="rounded-xl border border-border bg-background p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            3
          </span>
          <h2 className="text-base font-semibold text-foreground">
            カスタマイズ
          </h2>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            ウィジェットは以下の仕様で動作します:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>PC: 右下に 400x600px のポップアップとして表示</li>
            <li>スマートフォン: フルスクリーンで表示</li>
            <li>開閉アニメーション付き</li>
            <li>チャット履歴はセッション内で保持</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
