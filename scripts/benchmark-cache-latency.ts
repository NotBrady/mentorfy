/**
 * Cache Latency Benchmark: Measure impact of Anthropic prompt caching
 *
 * Usage:
 *   bun scripts/benchmark-cache-latency.ts
 *
 * This script:
 *   1. Makes a first call (cache miss - creates cache)
 *   2. Makes a second call (cache hit - reads from cache)
 *   3. Reports latency and cache metrics for comparison
 *
 * Requires:
 *   ANTHROPIC_API_KEY in .env
 */

import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// The diagnosis-comprehensive system prompt (~8KB)
const systemPrompt = `You are generating a personalized 8-screen diagnosis for someone who has just completed a 17-question assessment about their online business journey.

This is NOT a typical quiz result. This is a personalized sales letter disguised as a diagnosis. By the end, the person should feel more seen and understood than they've ever felt by any piece of marketing. That feeling of being deeply understood is what drives them to book the call.

<meta-instruction>
You are not filling in a template. You are not matching this person to a bucket or type.

You are thinking deeply about a specific human being and writing directly to them.

Before writing anything, consider:
- What has this person's life been like for the past [duration] years?
- What do they think about at 2am when they can't sleep?
- What have they stopped talking about because it's too painful?
- What do they believe about themselves that isn't true?
- What would they cry about if someone finally said the right words?

Then write to THAT person.
</meta-instruction>

<customer-psychology>
WHO THEY ARE: The "Burned Believer"
- 25-40 years old
- Has tried to make money online before. At least once. Often multiple times.
- Has consumed content, bought courses, maybe joined coaching programs
- Has TRIED. Late nights. Early mornings. Refreshing dashboards. Sending cold DMs.
- It didn't work. Or it worked for a while and then stopped. Or it worked but burned them out.

WHAT THEY CARRY:
1. Sunk Cost Shame - They've spent money, sometimes thousands, with nothing to show
2. Stubborn Hope - Despite everything, they haven't quit. They're still looking.

WHAT THEY FEEL RIGHT NOW:
- Skeptical of anything that sounds like an opportunity
- Frustrated that nothing has worked despite real effort
- Exhausted in a way that sleep doesn't fix
- Embarrassed about how long this has taken
- Ashamed of money spent with nothing to show
- Quietly desperate but trying not to show it
- Confused about what actually went wrong
- Still hopeful underneath everything

WHAT THEY NEED FROM THIS EXPERIENCE:
1. Recognition - To feel like someone finally SEES them
2. Absolution - To be released from the shame
3. Insight - A new way of understanding their journey
4. A Path - A clear picture of what this could look like for THEM
5. Permission - To believe again. To try again.
</customer-psychology>

<the-offer>
A Growth Operator partners with an expert who already has knowledge, audience, and credibility. They help the expert turn what they know into income. They handle the growth and business side. They take a percentage of everything.

KEY INSIGHT: The "gurus" make their money teaching, not doing. The dropshipping guru isn't making money dropshipping - they're selling courses. You don't need to BE an expert. You partner with one.

PROOF (Case Studies):
- Kade: Was an artist. Tried different things. Now $30K/month partnered with an AI YouTube creator.
- Nick: Was a server, borrowing money for rent. Now $50K/month partnered with a woodworking expert.
- Carson: Paid $7K for a program that didn't work. Skeptical. Now $100K/month partnered with a tattoo creator.

These are real, verifiable people.

THE CTA: Book a 30-minute call. Selection frame, not sales frame.
</the-offer>

<copywriting-principles>
1. SPECIFICITY CREATES RECOGNITION
Bad: "You've tried online business."
Good: "You started with dropshipping. When that didn't work, you tried SMMA. Then content. Three models. Four years. Same wall every time."

2. INSIGHT BEATS ACCURACY
Don't just reflect data. INTERPRET it. Find the meaning beneath the facts.
"You keep switching because you're looking for something you can't name. A model where you're not the bottleneck."

3. CONTRADICTIONS ARE GOLD
When their stated belief doesn't match their evidence, that's where insight lives.
"You blame yourself for not executing. But look at your answers. Five models. Four years. $15K. That's not a lack of execution."

4. THEIR STATED BELIEF IS THE THING TO REFRAME
Whatever they said caused their failure (Q11) - that's what you challenge.

5. CONNECT THE THROUGH-LINE
Q3 (why they started) → Q15 (what they want) → Q17 (biggest fear)
These form a story. Connect them.

6. NAME WHAT THEY FEEL BUT HAVEN'T ARTICULATED
The "holy shit" moment comes from putting words to something they experience but never expressed.

7. THE SHAME THEY ADMITTED IS THE SHAME YOU ADDRESS
Q13 tells you exactly what they're embarrassed about. Name it. Then release them.

8. MAKE THE PROOF RESONATE
Weight case studies based on who they'll identify with:
- High investment + skeptical → Lead with Carson
- Starting from nothing → Lead with Nick
- Creative background → Lead with Kade

9. PERSONALIZE THE EXPERT PICTURE
Match the expert example to what they've tried.

10. EARN EVERY CLAIM
Don't just assert. Use their data as evidence.

11. NO HYPE. NO GURU ENERGY.
Never use exclamation points. Never say "amazing opportunity." Never be salesy.
</copywriting-principles>

<tone-and-voice>
OVERALL: Knowing. Direct. Slightly understated. Not salesy.
Like someone who has seen this exact situation a hundred times.

CALIBRATE TO Q12 (emotional state):
- "Extremely skeptical" → Be very direct. "I know you don't believe this yet. Good. You shouldn't."
- "Frustrated" → Validate. "You're frustrated. Doing the work and not getting results will do that."
- "Cautiously open" → Give permission. "Part of you thinks this might be real. That part is right."
- "Exhausted but not quitting" → Be warm but not soft. "You're tired. Not the kind sleep fixes."
- "Want something that makes sense" → Be logical. Clear. Explain rather than sell.

NEVER:
- Use exclamation points
- Say "amazing opportunity"
- Use guru/hype language
- Be overly enthusiastic
- Sound like a sales page
- Be generic in any way
</tone-and-voice>

<output-format>
Generate exactly 8 screens. Each screen must be wrapped in tags:

<screen_1>
[Screen 1 content - The Mirror - 150-250 words]
</screen_1>

<screen_2>
[Screen 2 content - The Pattern - 100-150 words]
</screen_2>

<screen_3>
[Screen 3 content - The Paradigm Shift - 100-150 words]
</screen_3>

<screen_4>
[Screen 4 content - The Absolution - 80-120 words]
</screen_4>

<screen_5>
[Screen 5 content - The Proof - 100-150 words]
</screen_5>

<screen_6>
[Screen 6 content - The Reveal - 150-200 words]
</screen_6>

<screen_7>
[Screen 7 content - The Stakes - 100-150 words]
</screen_7>

<screen_8>
[Screen 8 content - The Close - 150-200 words]
</screen_8>

Use markdown formatting within each screen: **bold** for emphasis, line breaks for pacing.
</output-format>

<screen-blueprints>
SCREEN 1: THE MIRROR
Goal: Trust through recognition. "This thing sees me."

Include:
- Their specific models tried (list them)
- How many things they've tried (Q2)
- How far they got / their ceiling (Q4)
- What went wrong (Q5)
- Duration (Q6)
- Money invested (Q7)
- The deeper cost (Q8)
- The shame they carry (Q13)
- Their current emotional state (Q12)
- The turn: "But you're still here"
- Why they're still here (Q14)

End with: "That's not weakness. That's signal." or similar.

---

SCREEN 2: THE PATTERN
Goal: Insight. The "holy shit" moment.

Look for contradictions. Find patterns across multiple answers.

Example patterns:
- Serial Searcher (4+ models, doesn't know what went wrong): "You keep switching because you're looking for something you can't name. A model where you're not the bottleneck."
- Burned Out Winner (hit $5K+ but burned out): "You actually made it work. That's the painful part. You proved you could execute. And then the model ate you alive."
- Self-Blamer (blames execution, but evidence contradicts): "You blame yourself for not executing. But look at your answers. [X] models. [Y] years. $[Z] invested. That's someone executing inside the wrong container."

End by setting up the revelation.

---

SCREEN 3: THE PARADIGM SHIFT
Goal: Reveal why they failed. The shovel-sellers insight.

If Q10 = "I never really thought about it":
Full revelation about how their teachers made money teaching, not doing.
"The dropshipping guru isn't making money dropshipping. They're selling dropshipping courses."
"It's like the gold rush. Everyone was digging. The people who got rich were selling shovels."

If Q10 = "Teaching, not doing":
Validation and extension.
"You already knew something was off. You saw the game. But you never made the leap to the obvious question..."

---

SCREEN 4: THE ABSOLUTION
Goal: Release from shame. "It wasn't my fault."

Core statement: "You weren't failing. You were [reframe]."

Match to their model and failure mode:
- Ecommerce: "playing a game where the treasure keeps moving"
- Agency + burned out: "succeeding at building a prison with good pay"
- Content + no traction: "waiting for permission from an algorithm that doesn't care"
- Sales: "winning at a game with no finish line"
- Coaching + no sales: "You had the product. You just didn't have the distribution."

End with: "That changes now."

---

SCREEN 5: THE PROOF
Goal: Credibility. "This is real."

Structure:
1. Acknowledge skepticism
2. "So let me show you people who were exactly where you are."
3. Case studies (weighted to who they'll identify with)
4. "These are real people. You can DM them after this."

---

SCREEN 6: THE REVEAL
Goal: Vision they can step into.

Structure:
1. Name it: "It's called being a Growth Operator."
2. Simple explanation
3. Personalized expert picture based on Q1
4. The math: 50K followers → 2% convert → $50K/month → 20% is yours → $10K/month
5. Contrast based on Q5 (what they escape)
6. "Just you. Finally on the right side."

---

SCREEN 7: THE STAKES
Goal: Make it personal. "This is MY path."

Structure:
1. Callback to Q3: "You got into this because [original motivation]."
2. Time: "That was [duration from Q6] ago."
3. Callback to Q15: "You still want [their vision]."
4. Callback to Q17: "And your biggest fear is [their fear]."
5. Connection: "This is how [their vision] actually happens."
6. Protection: "And it's how you make sure [their fear] doesn't come true."

---

SCREEN 8: THE CLOSE
Goal: Make booking feel inevitable.

Structure:
1. "Here's where we are."
2. Honor their journey using data
3. "That tells me something about you."
4. Selection frame: "You might be exactly who we're looking for."
5. The ask: "Book a call. 30 minutes."
6. What happens on the call
7. Permission to say no: "If not, I'll tell you straight."
8. Future pace: "Once you book, I'll start mapping your path."
9. Closing: "You've been searching for [duration]. Let's find out what happens when you stop digging and start operating."
</screen-blueprints>

<anti-patterns>
NEVER be generic.
NEVER use hype language.
NEVER sound like a sales page.
NEVER fill in templates mechanically.
NEVER ignore their data - use specific numbers.
NEVER skip emotional beats.
NEVER assert without evidence from their answers.
NEVER be pitying - be knowing.
NEVER forget the goal is a booked call.
</anti-patterns>

Now generate all 8 screens based on the user's answers provided in the context.`

// ============================================================
// USER CONTEXT - PASTE YOUR INPUT HERE
// ============================================================
const userContext = {
  // PASTE YOUR USER CONTEXT JSON HERE
  // Example structure:
  // user: { name: "John" },
  // journey: { ... },
  // etc.
}

// ============================================================
// BENCHMARK LOGIC
// ============================================================

interface CacheMetrics {
  latencyMs: number
  ttftMs: number
  inputTokens?: number
  outputTokens?: number
  cacheCreationInputTokens?: number
  cacheReadInputTokens?: number
}

interface RunResult {
  cacheMiss: CacheMetrics
  cacheHit: CacheMetrics
}

/**
 * Make a single LLM call with cache control
 * @param runId - Unique identifier for this test run (used to invalidate cache)
 * @param callNumber - 1 for cache miss, 2 for cache hit within same run
 * @param context - User context to include in the prompt
 */
async function makeCall(runId: string, callNumber: number, context: any): Promise<CacheMetrics> {
  const startTime = performance.now()
  let ttft: number | null = null

  // Add a unique nonce to the system prompt to control cache behavior
  // Same runId = cache hit, different runId = cache miss
  const promptWithNonce = `${systemPrompt}\n\n<!-- cache-key: ${runId} -->`

  const userMessage = `User context:
${JSON.stringify(context, null, 2)}
Prompt key: diagnosis-comprehensive

Generate the diagnosis based on this information.`

  // Build messages with cache control (same as production)
  const messages = [
    {
      role: 'system' as const,
      content: promptWithNonce,
      providerOptions: {
        anthropic: { cacheControl: { type: 'ephemeral' } },
      },
    },
    { role: 'user' as const, content: userMessage },
  ]

  let metrics: CacheMetrics = {
    latencyMs: 0,
    ttftMs: 0,
  }

  const result = streamText({
    model: anthropic('claude-opus-4-5-20251101'),
    messages,
    maxOutputTokens: 4096,
    temperature: 0.4,
    onFinish: ({ usage, providerMetadata }) => {
      const anthropicUsage = providerMetadata?.anthropic?.usage as any
      metrics.inputTokens = usage?.inputTokens
      metrics.outputTokens = usage?.outputTokens
      metrics.cacheCreationInputTokens = anthropicUsage?.cache_creation_input_tokens
      metrics.cacheReadInputTokens = anthropicUsage?.cache_read_input_tokens
    },
  })

  // Stream and measure TTFT
  let outputPreview = ''
  for await (const chunk of result.textStream) {
    if (ttft === null) {
      ttft = performance.now() - startTime
    }
    if (outputPreview.length < 200) {
      outputPreview += chunk
    }
  }

  const endTime = performance.now()
  metrics.latencyMs = endTime - startTime
  metrics.ttftMs = ttft || 0

  // Only show preview for first call of first run
  if (callNumber === 1) {
    console.log(`   Preview: "${outputPreview.slice(0, 80).replace(/\n/g, ' ')}..."`)
  }

  return metrics
}

/**
 * Run a single cache miss/hit test pair
 */
async function runSingleTest(runNumber: number, context: any): Promise<RunResult> {
  // Generate unique run ID to force cache miss on first call
  const runId = `run-${runNumber}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  // Call 1: Cache miss (new runId = new cache key)
  process.stdout.write(`   Run ${runNumber} - Cache miss...`)
  const cacheMiss = await makeCall(runId, 1, context)
  const missStatus = (cacheMiss.cacheCreationInputTokens ?? 0) > 0 ? '✓' : '✗'
  console.log(` ${cacheMiss.latencyMs.toFixed(0)}ms (TTFT: ${cacheMiss.ttftMs.toFixed(0)}ms) ${missStatus}`)

  // Brief pause to ensure cache is ready
  await new Promise((r) => setTimeout(r, 500))

  // Call 2: Cache hit (same runId = same cache key)
  process.stdout.write(`   Run ${runNumber} - Cache hit... `)
  const cacheHit = await makeCall(runId, 2, context)
  const hitStatus = (cacheHit.cacheReadInputTokens ?? 0) > 0 ? '✓' : '✗'
  console.log(` ${cacheHit.latencyMs.toFixed(0)}ms (TTFT: ${cacheHit.ttftMs.toFixed(0)}ms) ${hitStatus}`)

  return { cacheMiss, cacheHit }
}

// ============================================================
// STATISTICS HELPERS
// ============================================================

function avg(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function stdDev(arr: number[]): number {
  const mean = avg(arr)
  const squareDiffs = arr.map((x) => Math.pow(x - mean, 2))
  return Math.sqrt(avg(squareDiffs))
}

function percentile(arr: number[], p: number): number {
  const sorted = [...arr].sort((a, b) => a - b)
  const index = (p / 100) * (sorted.length - 1)
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  if (lower === upper) return sorted[lower]
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower)
}

// ============================================================
// MAIN BENCHMARK
// ============================================================

const NUM_RUNS = 5 // Number of test pairs to run

async function runBenchmark() {
  // Validate context is set
  if (Object.keys(userContext).length === 0) {
    console.error('\n ERROR: userContext is empty!')
    console.error(' Edit this file and paste your user context JSON into the userContext variable.\n')
    process.exit(1)
  }

  console.log('\n' + '='.repeat(70))
  console.log(' CACHE LATENCY BENCHMARK - Anthropic Prompt Caching')
  console.log('='.repeat(70))
  console.log('\nModel: claude-opus-4-5-20251101')
  console.log(`System prompt size: ~${Math.round(systemPrompt.length / 1024)}KB`)
  console.log(`Number of test runs: ${NUM_RUNS}`)
  console.log('\nEach run:')
  console.log('  1. Cache miss → New cache key forces cache creation')
  console.log('  2. Cache hit  → Same cache key reads from cache')
  console.log('\n' + '-'.repeat(70))

  const results: RunResult[] = []

  for (let i = 1; i <= NUM_RUNS; i++) {
    console.log(`\n Run ${i}/${NUM_RUNS}`)
    const result = await runSingleTest(i, userContext)
    results.push(result)

    // Pause between runs
    if (i < NUM_RUNS) {
      await new Promise((r) => setTimeout(r, 1000))
    }
  }

  // Aggregate metrics
  const missLatencies = results.map((r) => r.cacheMiss.latencyMs)
  const hitLatencies = results.map((r) => r.cacheHit.latencyMs)
  const missTTFTs = results.map((r) => r.cacheMiss.ttftMs)
  const hitTTFTs = results.map((r) => r.cacheHit.ttftMs)

  // Summary
  console.log('\n' + '='.repeat(70))
  console.log(' RESULTS SUMMARY')
  console.log('='.repeat(70))

  console.log('\n TOTAL LATENCY (ms)')
  console.log('-'.repeat(50))
  console.log('                    Cache Miss      Cache Hit')
  console.log(`   Mean:            ${avg(missLatencies).toFixed(0).padStart(8)}        ${avg(hitLatencies).toFixed(0).padStart(8)}`)
  console.log(`   Median:          ${median(missLatencies).toFixed(0).padStart(8)}        ${median(hitLatencies).toFixed(0).padStart(8)}`)
  console.log(`   Std Dev:         ${stdDev(missLatencies).toFixed(0).padStart(8)}        ${stdDev(hitLatencies).toFixed(0).padStart(8)}`)
  console.log(`   Min:             ${Math.min(...missLatencies).toFixed(0).padStart(8)}        ${Math.min(...hitLatencies).toFixed(0).padStart(8)}`)
  console.log(`   Max:             ${Math.max(...missLatencies).toFixed(0).padStart(8)}        ${Math.max(...hitLatencies).toFixed(0).padStart(8)}`)
  console.log(`   P95:             ${percentile(missLatencies, 95).toFixed(0).padStart(8)}        ${percentile(hitLatencies, 95).toFixed(0).padStart(8)}`)

  console.log('\n TIME TO FIRST TOKEN (ms)')
  console.log('-'.repeat(50))
  console.log('                    Cache Miss      Cache Hit')
  console.log(`   Mean:            ${avg(missTTFTs).toFixed(0).padStart(8)}        ${avg(hitTTFTs).toFixed(0).padStart(8)}`)
  console.log(`   Median:          ${median(missTTFTs).toFixed(0).padStart(8)}        ${median(hitTTFTs).toFixed(0).padStart(8)}`)
  console.log(`   Std Dev:         ${stdDev(missTTFTs).toFixed(0).padStart(8)}        ${stdDev(hitTTFTs).toFixed(0).padStart(8)}`)
  console.log(`   Min:             ${Math.min(...missTTFTs).toFixed(0).padStart(8)}        ${Math.min(...hitTTFTs).toFixed(0).padStart(8)}`)
  console.log(`   Max:             ${Math.max(...missTTFTs).toFixed(0).padStart(8)}        ${Math.max(...hitTTFTs).toFixed(0).padStart(8)}`)
  console.log(`   P95:             ${percentile(missTTFTs, 95).toFixed(0).padStart(8)}        ${percentile(hitTTFTs, 95).toFixed(0).padStart(8)}`)

  // Improvement calculations
  const latencyImprovement = avg(missLatencies) - avg(hitLatencies)
  const latencyPct = (latencyImprovement / avg(missLatencies)) * 100
  const ttftImprovement = avg(missTTFTs) - avg(hitTTFTs)
  const ttftPct = (ttftImprovement / avg(missTTFTs)) * 100

  console.log('\n CACHE IMPACT')
  console.log('-'.repeat(50))
  console.log(`   Latency reduction:  ${latencyImprovement.toFixed(0)}ms (${latencyPct.toFixed(1)}% faster)`)
  console.log(`   TTFT reduction:     ${ttftImprovement.toFixed(0)}ms (${ttftPct.toFixed(1)}% faster)`)

  // Token stats from first successful run
  const sampleMiss = results[0].cacheMiss
  const sampleHit = results[0].cacheHit
  if ((sampleMiss.cacheCreationInputTokens ?? 0) > 0) {
    console.log('\n TOKEN USAGE (from run 1)')
    console.log('-'.repeat(50))
    console.log(`   Input tokens:       ${sampleMiss.inputTokens}`)
    console.log(`   Output tokens:      ${sampleMiss.outputTokens}`)
    console.log(`   Tokens cached:      ${sampleMiss.cacheCreationInputTokens}`)
    console.log(`   Tokens from cache:  ${sampleHit.cacheReadInputTokens}`)
    console.log(`   Cache coverage:     ${(((sampleHit.cacheReadInputTokens ?? 0) / (sampleMiss.inputTokens ?? 1)) * 100).toFixed(1)}%`)
  }

  // Raw data for analysis
  console.log('\n RAW DATA')
  console.log('-'.repeat(50))
  console.log('   Run  | Miss (ms) | Hit (ms)  | TTFT Miss | TTFT Hit')
  results.forEach((r, i) => {
    console.log(
      `   ${(i + 1).toString().padStart(3)}  | ${r.cacheMiss.latencyMs.toFixed(0).padStart(9)} | ${r.cacheHit.latencyMs.toFixed(0).padStart(9)} | ${r.cacheMiss.ttftMs.toFixed(0).padStart(9)} | ${r.cacheHit.ttftMs.toFixed(0).padStart(8)}`
    )
  })

  console.log('\n' + '='.repeat(70) + '\n')
}

// Run it
runBenchmark().catch(console.error)
