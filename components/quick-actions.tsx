"use client"

import { ChevronRight } from "lucide-react"

const faqCategories = [
  {
    label: "新規入会",
    query: "新規入会に関してよくある質問を教えてください",
  },
  {
    label: "ログイン・HP",
    query: "ログイン・ホームページについてよくある質問を教えてください",
  },
  {
    label: "クラブサービス",
    query: "クラブサービスについてよくある質問を教えてください",
  },
  {
    label: "愛馬・レース",
    query: "愛馬・レースについてよくある質問を教えてください",
  },
  {
    label: "出資申込",
    query: "出資申込についてよくある質問を教えてください",
  },
  {
    label: "確定申告・交付書面",
    query: "確定申告・交付書面についてよくある質問を教えてください",
  },
  {
    label: "ご精算",
    query: "ご精算についてよくある質問を教えてください",
  },
  {
    label: "会員情報",
    query: "会員情報についてよくある質問を教えてください",
  },
  {
    label: "郵送物",
    query: "郵送物についてよくある質問を教えてください",
  },
  {
    label: "マネロン等防止",
    query: "マネロン等防止についてよくある質問を教えてください",
  },
]

interface QuickActionsProps {
  onSelect: (query: string) => void
  disabled: boolean
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto px-4 py-6">
      {/* Hero */}
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold tracking-tight text-foreground text-balance">
          {"Silk Horse Club AIアシスタント"}
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground text-pretty">
          {"よくあるご質問のカテゴリを選択するか、下のメッセージ欄からお気軽にお尋ねください。"}
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <h2 className="text-sm font-medium text-foreground">
          {"カテゴリ別よくあるご質問"}
        </h2>

        <div className="grid w-full grid-cols-2 gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat.label}
              disabled={disabled}
              onClick={() => onSelect(cat.query)}
              className="group flex h-10 w-full items-center justify-between rounded-lg bg-primary/90 px-2.5 text-primary-foreground transition-all hover:bg-primary active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="whitespace-nowrap text-[11px]">{cat.label}</span>
              <ChevronRight className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
