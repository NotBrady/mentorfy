import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const db = createClient(supabaseUrl, supabaseServiceKey)

// Type for sessions table
export interface Session {
  id: string
  clerk_user_id: string | null
  clerk_org_id: string
  email: string | null
  phone: string | null
  name: string | null
  supermemory_container: string
  status: 'active' | 'completed' | 'abandoned'
  context: Record<string, any>
  created_at: string
  updated_at: string
}
