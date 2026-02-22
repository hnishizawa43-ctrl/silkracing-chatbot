"use client"

import { useState, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatSidebar, type ChatSession } from "@/components/chat-sidebar"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { QuickActions } from "@/components/quick-actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PanelLeft } from "lucide-react"

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return

    const text = input.trim()
    setInput("")
    sendMessage({ text })

    if (!activeSessionId) {
      const newId = Date.now().toString()
      const newSession: ChatSession = {
        id: newId,
        title: text.length > 25 ? text.slice(0, 25) + "..." : text,
        date: new Date().toLocaleDateString("ja-JP"),
        preview: text,
      }
      setSessions((prev) => [newSession, ...prev])
      setActiveSessionId(newId)
    }
  }, [input, isLoading, sendMessage, activeSessionId])

  const handleQuickAction = useCallback(
    (query: string) => {
      if (isLoading) return
      sendMessage({ text: query })

      if (!activeSessionId) {
        const newId = Date.now().toString()
        const newSession: ChatSession = {
          id: newId,
          title: query.length > 25 ? query.slice(0, 25) + "..." : query,
          date: new Date().toLocaleDateString("ja-JP"),
          preview: query,
        }
        setSessions((prev) => [newSession, ...prev])
        setActiveSessionId(newId)
      }
    },
    [isLoading, sendMessage, activeSessionId]
  )

  const handleNewChat = useCallback(() => {
    if (activeSessionId && messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      const preview = getMessageText(lastMsg.parts)
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, preview: preview.slice(0, 50) }
            : s
        )
      )
    }
    setMessages([])
    setActiveSessionId(null)
    setSidebarOpen(false)
  }, [activeSessionId, messages, setMessages])

  const handleSelectSession = useCallback(
    (id: string) => {
      if (id === activeSessionId) {
        setSidebarOpen(false)
        return
      }
      setActiveSessionId(id)
      setMessages([])
      setSidebarOpen(false)
    },
    [activeSessionId, setMessages]
  )

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center gap-3 border-b border-border bg-background px-3 py-2.5 md:px-4">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <PanelLeft className="h-[18px] w-[18px]" />
            <span className="sr-only">{"メニューを開く"}</span>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-medium text-foreground truncate md:text-[13px]">
              {activeSessionId
                ? sessions.find((s) => s.id === activeSessionId)?.title ?? "チャット"
                : "新しい会話"}
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground md:text-[11px]">{"オンライン"}</span>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1">
          {messages.length === 0 ? (
            <QuickActions onSelect={handleQuickAction} disabled={isLoading} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </ScrollArea>

        {/* Input */}
        <MessageInput
          value={input}
          onChange={setInput}
          onSubmit={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
