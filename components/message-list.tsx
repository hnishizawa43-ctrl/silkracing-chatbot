"use client"

import { useEffect, useRef } from "react"
import type { UIMessage } from "ai"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

interface MessageListProps {
  messages: UIMessage[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-6 md:px-6">
      {messages.map((message) => {
        const isUser = message.role === "user"
        const text = getMessageText(message)

        return (
          <div
            key={message.id}
            className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
          >
            {/* Avatar */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              )}
            >
              {isUser ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[70%]",
                isUser
                  ? "rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm bg-card text-card-foreground border border-border"
              )}
            >
              <div className="whitespace-pre-wrap break-words">{text}</div>
            </div>
          </div>
        )
      })}

      {/* Loading indicator */}
      {isLoading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Bot className="h-4 w-4" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-card text-card-foreground border border-border px-4 py-3">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
