"use client"

import {
  CalendarDays,
  Trophy,
  Banknote,
  Search,
  HelpCircle,
  Dna,
} from "lucide-react"

const quickActions = [
  {
    label: "出走予定",
    description: "次のレースはいつ？",
    query: "次の出走予定を教えてください",
    icon: CalendarDays,
  },
  {
    label: "レース結果",
    description: "最近の成績を確認",
    query: "最近のレース結果を教えてください",
    icon: Trophy,
  },
  {
    label: "分配金",
    description: "入金時期について",
    query: "分配金はいつ入金されますか？",
    icon: Banknote,
  },
  {
    label: "募集馬",
    description: "出資馬を探す",
    query: "現在募集中の馬を教えてください",
    icon: Search,
  },
  {
    label: "血統検索",
    description: "産駒を調べる",
    query: "ディープインパクト産駒はいますか？",
    icon: Dna,
  },
  {
    label: "入会案内",
    description: "手続き・費用",
    query: "入会の手続きについて教えてください",
    icon: HelpCircle,
  },
]

interface QuickActionsProps {
  onSelect: (query: string) => void
  disabled: boolean
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-8 md:gap-8 md:px-8 md:py-12">
      {/* Hero */}
      <div className="flex flex-col items-center gap-3 text-center md:gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary md:h-14 md:w-14">
          <span className="text-base font-bold tracking-tight text-primary-foreground md:text-lg">S</span>
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground text-balance md:text-lg">
            {"Silk Horse Club AIアシスタント"}
          </h1>
          <p className="mt-1 max-w-[260px] text-[13px] leading-relaxed text-muted-foreground text-pretty md:mt-1.5 md:max-w-xs">
            {"出走予定・レース結果・募集馬など、お気軽にお尋ねください。"}
          </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid w-full max-w-md grid-cols-2 gap-2 md:grid-cols-3 md:gap-2.5">
        {quickActions.map((action) => (
          <button
            key={action.label}
            disabled={disabled}
            onClick={() => onSelect(action.query)}
            className="group flex flex-col items-start gap-1 rounded-lg border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:bg-primary/[0.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 md:gap-1.5 md:p-3.5"
          >
            <action.icon className="h-4 w-4 text-primary/70 transition-colors group-hover:text-primary" />
            <div>
              <p className="text-[13px] font-medium text-foreground">{action.label}</p>
              <p className="text-[11px] text-muted-foreground">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
