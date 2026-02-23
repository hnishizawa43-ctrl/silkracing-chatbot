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

interface ChatSidebarProps {
  sessions: ChatSession[]
  activeSessionId: string | null
  onSelectSession: (id: string) => void
  onNewChat: () => void
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sidebar-primary">
              <span className="text-[11px] font-bold text-sidebar-primary-foreground">S</span>
            </div>
            <div>
              <h2 className="text-[13px] font-semibold leading-tight text-sidebar-foreground">
                Silk Horse Club
              </h2>
              <p className="text-[10px] leading-tight text-sidebar-foreground/50">
                {"AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8"}
              </p>
            </div>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 py-2.5">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-lg bg-sidebar-primary/10 px-3 py-2.5 text-[13px] font-medium text-sidebar-primary transition-colors hover:bg-sidebar-primary/20"
          >
            <Plus className="h-4 w-4" />
            <span>{"\u65B0\u3057\u3044\u30C1\u30E3\u30C3\u30C8"}</span>
          </button>
        </div>

        {/* Session List */}
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-0.5 pb-4">
            {sessions.length === 0 && (
              <p className="px-3 py-8 text-center text-[11px] text-sidebar-foreground/40">
                {"\u4F1A\u8A71\u5C65\u6B74\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093"}
              </p>
            )}
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
                  <p className="truncate text-[13px] font-medium">{session.title}</p>
                  <p className="mt-0.5 truncate text-[11px] opacity-40">{session.date}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Safe area spacer */}
        <div className="pb-[env(safe-area-inset-bottom)]" />
      </aside>
    </>
  )
}
