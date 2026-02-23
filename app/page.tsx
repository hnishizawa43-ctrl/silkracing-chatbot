import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <div className="flex h-dvh items-center justify-center overflow-hidden bg-secondary p-4">
      <div className="flex h-[min(700px,calc(100dvh-2rem))] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-border/50">
        <ChatInterface />
      </div>
    </div>
  )
}
