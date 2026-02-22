"use client"

import { useState, useCallback, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import type { UIMessage } from "ai"
import { ChatSidebar, type ChatSession } from "@/components/chat-sidebar"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { QuickActions } from "@/components/quick-actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PanelLeft, SquarePen } from "lucide-react"

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
  // Store messages per session
  const sessionMessagesRef = useRef<Record<string, UIMessage[]>>({})

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Save current session messages
  const saveCurrentSession = useCallback(() => {
    if (activeSessionId && messages.length > 0) {
      sessionMessagesRef.current[activeSessionId] = [...messages]
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
  }, [activeSessionId, messages])

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return

    const text = input.trim()
    setInput("")
    sendMessage({ text })

    if (!activeSessionId) {
      const newId = Date.now().toString()
      const newSession: ChatSession = {
        id: newId,
        title: text.length > 20 ? text.slice(0, 20) + "..." : text,
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
          title: query.length > 20 ? query.slice(0, 20) + "..." : query,
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
    saveCurrentSession()
    setMessages([])
    setActiveSessionId(null)
    setInput("")
    setSidebarOpen(false)
  }, [saveCurrentSession, setMessages])

  const handleSelectSession = useCallback(
    (id: string) => {
      if (id === activeSessionId) {
        setSidebarOpen(false)
        return
      }
      // Save current before switching
      saveCurrentSession()
      // Restore selected session
      const saved = sessionMessagesRef.current[id]
      setMessages(saved ?? [])
      setActiveSessionId(id)
      setInput("")
      setSidebarOpen(false)
    },
    [activeSessionId, saveCurrentSession, setMessages]
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
        <header className="flex items-center gap-2 border-b border-border bg-background px-2 py-2">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
            aria-label="メニューを開く"
          >
            <PanelLeft className="h-[18px] w-[18px]" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[13px] font-medium text-foreground truncate text-center">
              {activeSessionId
                ? sessions.find((s) => s.id === activeSessionId)?.title ?? "チャット"
                : "Silk Horse Club AI"}
            </h1>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={handleNewChat}
            aria-label="新しいチャット"
          >
            <SquarePen className="h-[18px] w-[18px]" />
          </button>
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
