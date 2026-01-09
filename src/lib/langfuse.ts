import { Langfuse } from 'langfuse'

let langfuseClient: Langfuse | null = null

export function getLangfuse(): Langfuse {
  if (!langfuseClient) {
    langfuseClient = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
      secretKey: process.env.LANGFUSE_SECRET_KEY!,
      baseUrl: process.env.LANGFUSE_BASE_URL || process.env.LANGFUSE_HOST,
    })
  }
  return langfuseClient
}

// Flush traces - call this after trace operations in serverless
export async function flushLangfuse(): Promise<void> {
  if (langfuseClient) {
    await langfuseClient.flushAsync()
  }
}

export function createTrace(params: {
  name: string
  sessionId?: string
  userId?: string
  metadata?: Record<string, any>
  input?: any
}) {
  return getLangfuse().trace({
    name: params.name,
    sessionId: params.sessionId,
    userId: params.userId,
    metadata: params.metadata,
    input: params.input,
  })
}
