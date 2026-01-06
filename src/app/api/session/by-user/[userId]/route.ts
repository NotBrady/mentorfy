import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

type RouteContext = { params: Promise<{ userId: string }> }

// GET /api/session/by-user/[userId] - get session by clerk_user_id
export async function GET(req: Request, context: RouteContext) {
  const { userId } = await context.params

  const { data, error } = await db
    .from('sessions')
    .select('*')
    .eq('clerk_user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
