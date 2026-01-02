# Security & Rate Limiting Plan

> Preliminary investigation - to be revisited after core MVP is shipped.

## Problem Statement

We're exposing LLM-backed APIs to the public internet. Need to protect against:
1. DDoS attacks that exhaust resources
2. Malicious actors running up LLM costs
3. Bot abuse / scraping
4. Prompt injection / jailbreak attempts

## Proposed Architecture

### Layer 1: Edge Protection (Cloudflare or Vercel Edge)

**Purpose**: Stop attacks before they hit our app.

- IP-based rate limiting at the edge
- Bot detection and challenge pages
- Geographic blocking if needed
- DDoS mitigation (Cloudflare's core competency)

**Decision**: If on Vercel, evaluate if their built-in protection is sufficient. Otherwise, put Cloudflare in front.

### Layer 2: Application-Level Rate Limiting

**Tool**: Upstash Redis with `@upstash/ratelimit`

**Why Upstash**:
- Serverless, works perfectly with Vercel edge/serverless
- Simple SDK, battle-tested
- Built-in analytics
- Cheap (free tier likely sufficient for MVP)

**Implementation Pattern**:

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
})

// In API route
const identifier = userId || ip // Prefer user ID if authenticated
const { success, limit, remaining } = await ratelimit.limit(identifier)
if (!success) {
  return new Response("Rate limited", { status: 429 })
}
```

**Proposed Limits**:

| Endpoint | Anonymous | Authenticated | Rationale |
|----------|-----------|---------------|-----------|
| `/api/chat` | 5/min, 20/hour | 20/min, 100/hour | Most expensive - full LLM call |
| `/api/generate/*` | 3/min, 10/hour | 10/min, 50/hour | Also expensive |
| `/api/memory` | 10/min | 30/min | Supermemory costs, but cheaper |
| `/api/context` | 20/min | 50/min | Mostly DB ops |

**Identifier Strategy**:
- Authenticated: Clerk user ID
- Anonymous: IP address + fingerprint hash (consider using a lightweight fingerprinting lib)

### Layer 3: Provider-Level Spend Caps

**Anthropic**:
- Set hard monthly spend limit in Anthropic console
- Set daily spend alerts (e.g., alert at $10/day, hard cap at $50/day for MVP)

**Supermemory**:
- Monitor usage via their dashboard
- Set up alerts if they support it
- Evaluate if they have hard caps

**Vercel**:
- Set spend limits on the project
- Alert on unusual function invocations

### Layer 4: Abuse Detection (Post-MVP)

Patterns to watch for:
- Repeated identical messages (bot behavior)
- Rapid session creation from same IP
- Known prompt injection patterns
- Unusual geographic patterns

For MVP: Just log these. Build automated blocking later.

### Layer 5: Observability & Alerts

**Langfuse**:
- Track all LLM calls with costs
- Set up alerts on cost anomalies
- Dashboard for daily/weekly spend

**PostHog**:
- Track rate limit hits as events
- Alert on spike in 429 responses
- Monitor by IP/user patterns

## Cost Modeling

### Per-User Journey Cost

| Action | Est. Cost | Frequency | Total |
|--------|-----------|-----------|-------|
| Chat message (Sonnet) | $0.02 | 10 | $0.20 |
| Diagnosis generation | $0.04 | 3 | $0.12 |
| Supermemory search | $0.001 | 15 | $0.015 |
| Supermemory add | $0.002 | 10 | $0.02 |
| **Total per user** | | | **~$0.35** |

### Monthly Projections

| Users/Month | LLM Cost | Supermemory | Total |
|-------------|----------|-------------|-------|
| 100 | $35 | ~$5 | ~$40 |
| 1,000 | $350 | ~$50 | ~$400 |
| 10,000 | $3,500 | ~$500 | ~$4,000 |

### Abuse Scenario

**Without protection**: 10,000 malicious requests = $200+ burned
**With rate limiting**: 50-100 requests slip through = $2-5 max

## Implementation Priority

1. **MVP (ship first)**:
   - Upstash rate limiting on `/api/chat` and `/api/generate/*`
   - Anthropic console spend cap
   - Basic Langfuse cost tracking

2. **Fast Follow**:
   - Cloudflare or enhanced edge protection
   - Rate limiting on all endpoints
   - Abuse pattern logging

3. **Later**:
   - Automated abuse detection
   - IP reputation scoring
   - Prompt injection filtering

## Open Questions

- [ ] Evaluate Vercel's built-in DDoS protection - sufficient for MVP?
- [ ] Supermemory rate limits / spend caps - what do they offer?
- [ ] Fingerprinting for anonymous users - worth the complexity?
- [ ] Should we require Clerk auth earlier in the flow to reduce anonymous abuse surface?

## References

- [Upstash Rate Limiting](https://upstash.com/docs/oss/sdks/ts/ratelimit/overview)
- [Vercel Security](https://vercel.com/docs/security)
- [Cloudflare Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)
