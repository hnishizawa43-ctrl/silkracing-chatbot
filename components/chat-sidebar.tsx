"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Plus,
  MessageSquare,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"

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
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
              <span className="text-sm font-bold text-sidebar-primary-foreground">SR</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">Silk Racing</h2>
              <p className="text-xs text-sidebar-foreground/60">AI Assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={onNewChat}
            className="w-full justify-start gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>

        {/* Session List */}
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-1 pb-4">
            {sessions.length === 0 && (
              <p className="px-3 py-6 text-center text-xs text-sidebar-foreground/50">
                No conversations yet
              </p>
            )}
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-sidebar-accent",
                  activeSessionId === session.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80"
                )}
              >
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{session.title}</p>
                  <p className="mt-0.5 truncate text-xs opacity-50">{session.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
