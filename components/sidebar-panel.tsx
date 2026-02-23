"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare, X } from "lucide-react"

export interface ChatSession {
  id: string
  title: string
  date: string
  preview: string
}

interface SidebarPanelProps {
  sessions: ChatSession[]
  activeSessionId: string | null
  onSelectSession: (id: string) => void
  onNewChat: () => void
  isOpen: boolean
  onClose: () => void
}

export function SidebarPanel({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  isOpen,
  onClose,
}: SidebarPanelProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3">
          <h2 className="text-[13px] font-semibold tracking-tight">
            {"チャット履歴"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            aria-label="閉じる"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-3 pt-3 pb-1">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-lg bg-sidebar-primary/10 px-3 py-2.5 text-[13px] font-medium text-sidebar-primary transition-colors hover:bg-sidebar-primary/20"
          >
            <Plus className="h-4 w-4" />
            <span>{"新しいチャット"}</span>
          </button>
        </div>
        <ScrollArea className="flex-1 px-2 py-2">
          {sessions.length === 0 ? (
            <p className="px-3 py-6 text-center text-[12px] text-sidebar-foreground/30">
              {"まだチャット履歴がありません"}
            </p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent",
                    activeSessionId === session.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70"
                  )}
                >
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-50" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium leading-snug break-words">{session.title}</p>
                    <p className="mt-0.5 truncate text-[11px] opacity-40">{session.date}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="pb-[env(safe-area-inset-bottom)]" />
      </aside>
    </>
  )
}
