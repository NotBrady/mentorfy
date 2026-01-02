import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

type RouteContext = { params: Promise<{ id: string }> }

// POST /api/session/[id]/link - link session to authenticated user
export async function POST(req: Request, context: RouteContext) {
  const { id } = await context.params
  const { clerk_user_id } = await req.json()

  if (!clerk_user_id) {
    return NextResponse.json({ error: 'clerk_user_id required' }, { status: 400 })
  }

  const { data, error } = await db
    .from('sessions')
    .update({
      clerk_user_id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Session link error:', error)
    return NextResponse.json({ error: 'Failed to link session' }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
