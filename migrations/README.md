# Database Migrations

## Running Migrations

Run migrations in the Supabase SQL Editor or via CLI:

```bash
# Via Supabase CLI (if linked)
supabase db push

# Or manually in Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Paste migration contents
# 3. Run
```

## Migration Log

| File | Description | Status |
|------|-------------|--------|
| `001_add_flow_step_answers_columns.sql` | Add flow_id, current_step_id, answers columns for state management refactor | Pending |

## Rollback

The `context` column is preserved. To rollback:
1. Application code can read from `context` instead of `answers`
2. Drop new columns if needed (data loss for new fields)
