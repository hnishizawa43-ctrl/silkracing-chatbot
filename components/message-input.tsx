"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SendHorizontal } from "lucide-react"

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
      ta.style.height = "auto"
      ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !isLoading) {
        onSubmit()
      }
    }
  }

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm px-4 py-3 md:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (value.trim() && !isLoading) {
            onSubmit()
          }
        }}
        className="mx-auto flex max-w-3xl items-end gap-2"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            disabled={isLoading}
            rows={1}
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 pr-12 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim() || isLoading}
          className="h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
