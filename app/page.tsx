import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-secondary px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Silk Racing AI
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {"※デモ画面です"}
          <br />
          {"右下のチャットアイコンをクリックしてAIアシスタントをお試しください"}
        </p>
      </div>
      <ChatWidget />
    </main>
  )
}
