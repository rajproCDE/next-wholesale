import { NextResponse } from 'next/server'

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const push = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Simulate real-time notifications
      const interval = setInterval(() => {
        push({ message: `New notification at ${new Date().toLocaleTimeString()}` })
      }, 5000)

      return () => {
        clearInterval(interval)
        controller.close()
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

