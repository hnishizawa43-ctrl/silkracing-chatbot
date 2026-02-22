"use client"

import { useEffect, useRef } from "react"
import type { UIMessage } from "ai"
import { cn } from "@/lib/utils"

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
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 py-4 md:gap-5 md:px-6 md:py-6">
      {messages.map((message) => {
        const isUser = message.role === "user"
        const text = getMessageText(message)

        return (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-1",
              isUser ? "items-end" : "items-start"
            )}
          >
            {/* Label */}
            <span className="px-1 text-[11px] font-medium text-muted-foreground">
              {isUser ? "You" : "Silk AI"}
            </span>

            {/* Bubble */}
            <div
              className={cn(
                "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed md:max-w-[75%] md:px-4 md:py-3 md:text-[13px]",
                isUser
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-card text-card-foreground shadow-sm ring-1 ring-border"
              )}
            >
              <div className="whitespace-pre-wrap break-words">{text}</div>
            </div>
          </div>
        )
      })}

      {/* Loading indicator */}
      {isLoading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex flex-col items-start gap-1">
          <span className="px-1 text-[11px] font-medium text-muted-foreground">
            Silk AI
          </span>
          <div className="rounded-2xl rounded-bl-md bg-card shadow-sm ring-1 ring-border px-4 py-3.5">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
