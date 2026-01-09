import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Deep merge objects, preserving nested structure.
 * Used to properly merge answers like { assessment: { situation: '...' } }
 * without losing previously saved nested fields.
 */
function deepMerge(target: any, source: any): any {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] !== null &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

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

    // Deep merge answer if provided (preserves nested fields like assessment.*)
    if (answer !== undefined) {
      updateData.answers = deepMerge(session.answers || {}, answer)
      // Keep context in sync for backward compatibility
      updateData.context = deepMerge(session.context || {}, answer)
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
