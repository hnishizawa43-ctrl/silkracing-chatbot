"use client"

import { Button } from "@/components/ui/button"
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
    label: "Next Races",
    query: "Next races?",
    icon: CalendarDays,
  },
  {
    label: "Recent Results",
    query: "How were the recent race results?",
    icon: Trophy,
  },
  {
    label: "Distribution",
    query: "When will dividends be deposited?",
    icon: Banknote,
  },
  {
    label: "Recruiting",
    query: "What horses are currently being recruited?",
    icon: Search,
  },
  {
    label: "Bloodline Search",
    query: "Are there any horses sired by Deep Impact?",
    icon: Dna,
  },
  {
    label: "FAQ",
    query: "What is the procedure for joining?",
    icon: HelpCircle,
  },
]

interface QuickActionsProps {
  onSelect: (query: string) => void
  disabled: boolean
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 md:px-6">
      {/* Hero */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <span className="text-2xl font-bold text-primary-foreground">SR</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground text-balance">
            Silk Racing AI Assistant
          </h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Ask anything about race schedules, results, recruiting, and more.
          </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid w-full max-w-lg grid-cols-2 gap-2 md:grid-cols-3">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            disabled={disabled}
            onClick={() => onSelect(action.query)}
            className="flex h-auto flex-col items-center gap-2 rounded-xl border-border bg-card px-3 py-4 text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <action.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
