"use client"

import { useRef, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function MessageInput({ value, onChange, onSubmit, isLoading }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = "36px"
      const newHeight = Math.min(ta.scrollHeight, 100)
      ta.style.height = `${newHeight}px`
    }
  }, [value])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // IME変換中は何もしない（1回目のEnterで確定させる）
    if (e.nativeEvent.isComposing) return

    if (e.key === "Enter") {
      // Shift+Enter → 改行
      if (e.shiftKey) return // デフォルト動作で改行が入る

      // Enter（Shiftなし）→ 送信
      e.preventDefault()
      if (value.trim() && !isLoading) {
        onSubmit()
      }
    }
  }, [value, isLoading, onSubmit])

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <div className="shrink-0 border-t border-border bg-background px-3 py-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (canSend) onSubmit()
        }}
        className="mx-auto flex max-w-2xl items-end gap-2"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"メッセージを入力..."}
            disabled={isLoading}
            rows={1}
            style={{ minHeight: "36px", maxHeight: "100px" }}
            className="w-full resize-none rounded-xl border border-input bg-secondary px-3.5 py-2 text-sm leading-5 text-secondary-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring/50 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={!canSend}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
            canSend
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">{"送信"}</span>
        </button>
      </form>
    </div>
  )
}
