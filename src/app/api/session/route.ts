import { NextResponse } from 'next/server'
import { db, Session } from '@/lib/db'
import { getContainerId } from '@/lib/supermemory'

// POST /api/session - create a new session
export async function POST(req: Request) {
  try {
    const { clerk_org_id } = await req.json()

    if (!clerk_org_id) {
      return NextResponse.json({ error: 'clerk_org_id required' }, { status: 400 })
    }

    const sessionId = crypto.randomUUID()
    const supermemoryContainer = getContainerId(clerk_org_id, sessionId)

    const { data, error } = await db
      .from('sessions')
      .insert({
        id: sessionId,
        clerk_org_id,
        supermemory_container: supermemoryContainer,
        status: 'active',
        context: {},
      })
      .select()
      .single()

    if (error) {
      console.error('Session create error:', error)
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    }

    return NextResponse.json({ sessionId: data.id, supermemoryContainer })
  } catch (err) {
    console.error('Session POST error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
