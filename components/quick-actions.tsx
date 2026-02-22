"use client"

import { ChevronRight } from "lucide-react"

const faqCategories = [
  {
    label: "新規入会に関して",
    query: "新規入会に関してよくある質問を教えてください",
  },
  {
    label: "ログイン・ホームページについて",
    query: "ログイン・ホームページについてよくある質問を教えてください",
  },
  {
    label: "クラブサービスについて",
    query: "クラブサービスについてよくある質問を教えてください",
  },
  {
    label: "愛馬・レースについて",
    query: "愛馬・レースについてよくある質問を教えてください",
  },
  {
    label: "出資申込について",
    query: "出資申込についてよくある質問を教えてください",
  },
  {
    label: "確定申告・交付書面について",
    query: "確定申告・交付書面についてよくある質問を教えてください",
  },
  {
    label: "ご精算について",
    query: "ご精算についてよくある質問を教えてください",
  },
  {
    label: "会員情報について",
    query: "会員情報についてよくある質問を教えてください",
  },
  {
    label: "郵送物について",
    query: "郵送物についてよくある質問を教えてください",
  },
  {
    label: "マネロン等防止について",
    query: "マネロン等防止についてよくある質問を教えてください",
  },
]

interface QuickActionsProps {
  onSelect: (query: string) => void
  disabled: boolean
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-8 md:justify-center md:px-8 md:py-12">
      {/* Hero */}
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold tracking-tight text-foreground text-balance md:text-lg">
          {"Silk Horse Club AIアシスタント"}
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground text-pretty">
          {"よくあるご質問のカテゴリを選択するか、下のメッセージ欄からお気軽にお尋ねください。"}
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <h2 className="text-base font-medium text-foreground md:text-lg">
          {"カテゴリ別よくあるご質問"}
        </h2>

        <div className="grid w-full grid-cols-2 gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat.label}
              disabled={disabled}
              onClick={() => onSelect(cat.query)}
              className="group flex w-full items-center justify-between rounded-lg bg-primary/90 px-3 py-2.5 text-primary-foreground transition-all hover:bg-primary hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 md:px-4 md:py-3"
            >
              <span className="text-[12px] leading-tight md:text-[13px]">{cat.label}</span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100 md:h-4 md:w-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
