-- Migration: Add flow_id, current_step_id, and answers columns to sessions table
-- Purpose: Replace optimistic sync with server-as-truth model for progress persistence
-- Issue: mentorfy-wb7.1

-- Step 1: Add new columns (nullable initially for existing rows)
ALTER TABLE sessions
ADD COLUMN IF NOT EXISTS flow_id TEXT,
ADD COLUMN IF NOT EXISTS current_step_id TEXT,
ADD COLUMN IF NOT EXISTS answers JSONB DEFAULT '{}';

-- Step 2: Create index on flow_id for efficient lookups
CREATE INDEX IF NOT EXISTS idx_sessions_flow_id ON sessions(flow_id);

-- Step 3: Migrate existing context data to answers column
-- This extracts user answers from the context JSONB into the dedicated answers column
-- The context column is preserved for rollback safety
UPDATE sessions
SET
  answers = COALESCE(context, '{}'),
  flow_id = 'rafael-tats',  -- Default flow for existing sessions
  current_step_id = CASE
    -- Try to infer step from context completeness
    WHEN context ? 'phase4' THEN 'phase-4-complete'
    WHEN context ? 'phase3' THEN 'phase-4-start'
    WHEN context ? 'phase2' THEN 'phase-3-start'
    WHEN context ? 'situation' THEN 'phase-2-start'
    ELSE 'phase-1-start'
  END
WHERE answers IS NULL OR answers = '{}';

-- Note: The context column is intentionally NOT removed.
-- It will be kept for rollback capability and can be deprecated later.

-- Verification query (run manually to check migration):
-- SELECT id, flow_id, current_step_id, answers, context FROM sessions LIMIT 5;
