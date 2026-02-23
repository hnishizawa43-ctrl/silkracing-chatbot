"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"
import { cn } from "@/lib/utils"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isOpen && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isOpen, hasAnimated])

  return (
    <>
      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 flex h-[min(600px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-border/50 transition-all duration-300 origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        <ChatInterface />
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
          isOpen
            ? "bg-foreground text-background"
            : "bg-primary text-primary-foreground"
        )}
        aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  )
}
