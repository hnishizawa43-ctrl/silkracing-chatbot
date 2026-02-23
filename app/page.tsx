import { FloatingChat } from "@/components/floating-chat"

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-secondary p-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {"※デモ画面です"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {"右下のチャットアイコンをクリックしてAIアシスタントをお試しください"}
        </p>
      </div>
      <FloatingChat />
    </main>
  )
}
