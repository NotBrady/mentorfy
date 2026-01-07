import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/flow/step
 *
 * Server-as-truth step progression endpoint.
 * Updates current_step_id and merges answer data atomically.
 */
export async function POST(req: Request) {
  try {
    const { sessionId, stepId, answer } = await req.json()

    if (!sessionId || !stepId) {
      return NextResponse.json(
        { error: 'sessionId and stepId required' },
        { status: 400 }
      )
    }

    // Fetch existing session
    const { data: session, error: fetchError } = await db
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (fetchError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Build update payload
    const updateData: Record<string, any> = {
      current_step_id: stepId,
      updated_at: new Date().toISOString(),
    }

    // Merge answer if provided
    if (answer !== undefined) {
      const mergedAnswers = { ...session.answers, ...answer }
      updateData.answers = mergedAnswers
      // Keep context in sync for backward compatibility
      updateData.context = { ...session.context, ...answer }
    }

    // Atomic update
    const { data, error } = await db
      .from('sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single()

    if (error) {
      console.error('Step update error:', error)
      return NextResponse.json(
        { error: 'Failed to update step' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      sessionId: data.id,
      currentStepId: data.current_step_id,
      answers: data.answers,
    })
  } catch (err) {
    console.error('Flow step error:', err)
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }
}
