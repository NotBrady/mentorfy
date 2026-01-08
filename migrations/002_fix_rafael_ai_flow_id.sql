-- Migration: Fix rafael-ai flow_id to rafael-tats
-- Purpose: Correct sessions that were migrated with non-existent 'rafael-ai' flow ID
-- Issue: mentorfy-gps

-- Update any sessions that have the old 'rafael-ai' flow_id to 'rafael-tats'
UPDATE sessions
SET flow_id = 'rafael-tats'
WHERE flow_id = 'rafael-ai';

-- Verification query (run manually to check migration):
-- SELECT COUNT(*) FROM sessions WHERE flow_id = 'rafael-ai';
-- Should return 0 after migration
