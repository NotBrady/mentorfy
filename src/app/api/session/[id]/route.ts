import { NextResponse } from 'next/server'
import { db, Session } from '@/lib/db'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/session/[id] - get session by ID
export async function GET(req: Request, context: RouteContext) {
  const { id } = await context.params

  const { data, error } = await db
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

// PATCH /api/session/[id] - update session (contact info + context)
export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params
  const body = await req.json()

  // Get existing session
  const { data: existing, error: fetchError } = await db
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // Check for returning user by email
  if (body.email && body.email !== existing.email) {
    const { data: existingByEmail } = await db
      .from('sessions')
      .select('id')
      .eq('email', body.email)
      .eq('clerk_org_id', existing.clerk_org_id)
      .neq('id', id)
      .single()

    if (existingByEmail) {
      return NextResponse.json({
        returning: true,
        existingSessionId: existingByEmail.id,
      })
    }
  }

  // Deep merge context
  const mergedContext = body.context
    ? { ...existing.context, ...body.context }
    : existing.context

  const updateData: Partial<Session> = {
    updated_at: new Date().toISOString(),
  }

  if (body.name !== undefined) updateData.name = body.name
  if (body.email !== undefined) updateData.email = body.email
  if (body.phone !== undefined) updateData.phone = body.phone
  if (body.status !== undefined) updateData.status = body.status
  if (body.context !== undefined) updateData.context = mergedContext

  const { data, error } = await db
    .from('sessions')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Session update error:', error)
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
  }

  return NextResponse.json(data)
}
