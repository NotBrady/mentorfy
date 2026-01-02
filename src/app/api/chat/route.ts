import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { db } from '@/lib/db'
import { searchMemories, writeMemory, getContainerId } from '@/lib/supermemory'
import { getAgent } from '@/agents/registry'
import { createTrace } from '@/lib/langfuse'
import { chatLimiter, checkRateLimit, rateLimitResponse, getIdentifier } from '@/lib/ratelimit'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function POST(req: Request) {
  const startTime = Date.now()

  try {
    // Clone request for rate limiting check (need to read body twice)
    const body = await req.json()
    const { sessionId, messages, agentId = 'rafael-chat' } = body

    // Rate limiting - check before processing
    const { data: session } = sessionId
      ? await db.from('sessions').select('clerk_user_id').eq('id', sessionId).single()
      : { data: null }

    const identifier = getIdentifier(req, session?.clerk_user_id || undefined)
    const { success, reset } = await checkRateLimit(chatLimiter, identifier, !!session?.clerk_user_id)

    if (!success) {
      return rateLimitResponse(reset)
    }

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'sessionId required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Fetch full session (we already have partial from rate limit check)
    const { data: fullSession, error: sessionError } = await db
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (sessionError || !fullSession) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Use fullSession from here
    const sessionData = fullSession

    // Get agent config
    const agent = getAgent(agentId)
    if (!agent) {
      return new Response(JSON.stringify({ error: 'Agent not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create Langfuse trace
    const trace = createTrace({
      name: 'chat',
      sessionId,
      userId: sessionData.clerk_user_id || undefined,
      metadata: { agentId, orgId: sessionData.clerk_org_id },
    })

    const generation = trace.generation({
      name: 'claude-chat',
      model: agent.model,
      input: messages,
    })

    // Get last user message for memory search
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || ''

    // Search Supermemory for relevant context
    const memories = await searchMemories(sessionData.supermemory_container, lastUserMessage)

    // Build context from session + memories
    const contextParts: string[] = []

    if (Object.keys(sessionData.context).length > 0) {
      contextParts.push(`User context: ${JSON.stringify(sessionData.context)}`)
    }

    if (memories.length > 0) {
      contextParts.push(`Relevant memories:\n${memories.join('\n')}`)
    }

    const systemPrompt = contextParts.length > 0
      ? `${agent.systemPrompt}\n\n${contextParts.join('\n\n')}`
      : agent.systemPrompt

    // First chat: write session context to Supermemory
    if (messages.length === 1 && Object.keys(sessionData.context).length > 0) {
      writeMemory(
        sessionData.supermemory_container,
        `User profile and context: ${JSON.stringify(sessionData.context)}`
      )
    }

    // Stream response
    const result = streamText({
      model: anthropic(agent.model),
      system: systemPrompt,
      messages,
      maxOutputTokens: agent.maxTokens,
      temperature: agent.temperature,
      onFinish: ({ text, usage }) => {
        // Write conversation to Supermemory
        writeMemory(
          sessionData.supermemory_container,
          `User: ${lastUserMessage}\nAssistant: ${text}`
        )

        // Complete Langfuse generation
        generation.end({
          output: text,
          usage: {
            input: usage?.inputTokens,
            output: usage?.outputTokens,
          },
        })

        trace.update({
          metadata: {
            latencyMs: Date.now() - startTime,
            inputTokens: usage?.inputTokens,
            outputTokens: usage?.outputTokens,
          },
        })
      },
    })

    return result.toTextStreamResponse()
  } catch (err) {
    console.error('Chat error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
