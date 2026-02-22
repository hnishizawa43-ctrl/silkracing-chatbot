"use client"

import {
  UserPlus,
  Monitor,
  Headphones,
  Trophy,
  FileText,
  Calculator,
  Wallet,
  UserCog,
  Mail,
  ShieldCheck,
} from "lucide-react"

const faqCategories = [
  {
    label: "新規入会に関して",
    query: "新規入会に関してよくある質問を教えてください",
    icon: UserPlus,
  },
  {
    label: "ログイン・HP",
    query: "ログイン・ホームページについてよくある質問を教えてください",
    icon: Monitor,
  },
  {
    label: "クラブサービス",
    query: "クラブサービスについてよくある質問を教えてください",
    icon: Headphones,
  },
  {
    label: "愛馬・レース",
    query: "愛馬・レースについてよくある質問を教えてください",
    icon: Trophy,
  },
  {
    label: "出資申込",
    query: "出資申込についてよくある質問を教えてください",
    icon: FileText,
  },
  {
    label: "確定申告・交付書面",
    query: "確定申告・交付書面についてよくある質問を教えてください",
    icon: Calculator,
  },
  {
    label: "ご精算",
    query: "ご精算についてよくある質問を教えてください",
    icon: Wallet,
  },
  {
    label: "会員情報",
    query: "会員情報についてよくある質問を教えてください",
    icon: UserCog,
  },
  {
    label: "郵送物",
    query: "郵送物についてよくある質問を教えてください",
    icon: Mail,
  },
  {
    label: "マネロン等防止",
    query: "マネロン等防止についてよくある質問を教えてください",
    icon: ShieldCheck,
  },
]

interface QuickActionsProps {
  onSelect: (query: string) => void
  disabled: boolean
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex h-full flex-col items-center gap-6 overflow-y-auto px-4 py-8 md:justify-center md:gap-8 md:px-8 md:py-12">
      {/* Hero */}
      <div className="flex flex-col items-center gap-3 text-center md:gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary md:h-14 md:w-14">
          <span className="text-base font-bold tracking-tight text-primary-foreground md:text-lg">S</span>
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground text-balance md:text-lg">
            {"Silk Horse Club AIアシスタント"}
          </h1>
          <p className="mt-1 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground text-pretty md:mt-1.5 md:max-w-sm">
            {"よくあるご質問のカテゴリを選択するか、メッセージを入力してください。"}
          </p>
        </div>
      </div>

      {/* FAQ Categories Section */}
      <div className="flex w-full max-w-lg flex-col gap-2">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {"カテゴリ別よくあるご質問"}
        </h2>
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
          {faqCategories.map((cat) => (
            <button
              key={cat.label}
              disabled={disabled}
              onClick={() => onSelect(cat.query)}
              className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-all hover:border-primary/40 hover:bg-primary/[0.04] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              <cat.icon className="h-3.5 w-3.5 shrink-0 text-primary/60 transition-colors group-hover:text-primary" />
              <span className="text-[12px] font-medium leading-tight text-foreground">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
