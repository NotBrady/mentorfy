import { Langfuse } from 'langfuse'

let langfuseClient: Langfuse | null = null

export function getLangfuse(): Langfuse {
  if (!langfuseClient) {
    langfuseClient = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
      secretKey: process.env.LANGFUSE_SECRET_KEY!,
      baseUrl: process.env.LANGFUSE_HOST,
    })
  }
  return langfuseClient
}

export function createTrace(params: {
  name: string
  sessionId?: string
  userId?: string
  metadata?: Record<string, any>
}) {
  return getLangfuse().trace({
    name: params.name,
    sessionId: params.sessionId,
    userId: params.userId,
    metadata: params.metadata,
  })
}
