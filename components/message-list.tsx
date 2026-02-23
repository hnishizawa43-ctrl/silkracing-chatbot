"use client"

import { useEffect, useRef, type ReactNode } from "react"
import type { UIMessage } from "ai"
import { cn } from "@/lib/utils"

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

// URLとして有効な文字のみマッチ（日本語・全角文字・句読点・括弧で区切る）
const URL_REGEX = /(https?:\/\/[A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=%]+)/g

function renderTextWithLinks(text: string): ReactNode[] {
  const parts = text.split(URL_REGEX)
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      // 末尾の句読点や括弧を除去
      const cleaned = part.replace(/[)）。、」』】]+$/, "")
      const trailing = part.slice(cleaned.length)
      return (
        <span key={i}>
          <a
            href={cleaned}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline underline-offset-2 break-all hover:opacity-70 transition-opacity"
          >
            {cleaned}
          </a>
          {trailing}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

interface MessageListProps {
  messages: UIMessage[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return null
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 py-4">
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
                "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                isUser
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-secondary text-secondary-foreground ring-1 ring-border"
              )}
            >
              <div className="whitespace-pre-wrap break-words">{renderTextWithLinks(text)}</div>
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
          <div className="rounded-2xl rounded-bl-md bg-secondary ring-1 ring-border px-4 py-3.5">
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
