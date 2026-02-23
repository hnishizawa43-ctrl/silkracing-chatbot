import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai"
import { buildSystemPrompt } from "@/lib/mock-data"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  console.log("[v0] API /api/chat called, message count:", messages.length)

  try {
    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: buildSystemPrompt(),
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
    })

    console.log("[v0] streamText initiated, returning response")

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
