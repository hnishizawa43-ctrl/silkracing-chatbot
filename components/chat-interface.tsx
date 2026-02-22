"use client"

import { useState, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatSidebar, type ChatSession } from "@/components/chat-sidebar"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { QuickActions } from "@/components/quick-actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

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

    // Create or update session
    if (!activeSessionId) {
      const newId = Date.now().toString()
      const newSession: ChatSession = {
        id: newId,
        title: text.length > 30 ? text.slice(0, 30) + "..." : text,
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
          title: query.length > 30 ? query.slice(0, 30) + "..." : query,
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
    // Save current messages to the session if needed
    if (activeSessionId && messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      const preview = getMessageText(lastMsg.parts)
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, preview: preview.slice(0, 60) }
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
      // For demo purposes, just switch to the session
      setActiveSessionId(id)
      setMessages([])
      setSidebarOpen(false)
    },
    [activeSessionId, setMessages]
  )

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
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
        <header className="flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-foreground truncate">
              {activeSessionId
                ? sessions.find((s) => s.id === activeSessionId)?.title ?? "Chat"
                : "New Conversation"}
            </h1>
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
