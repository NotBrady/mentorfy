# Growth Operator V2 Flow - End-to-End Test Plan

**Purpose:** Systematic testing of the complete Growth Operator v2 assessment journey using Playwright MCP.

**Version:** 2.0 (7-question conversational structure with personalized questions and 3 disqualification points)

**CRITICAL:** Abort on first failure. Do not continue past any failed assertion - the flow is sequential and later tests depend on earlier state.

---

## Pre-Test Setup

### 1. Start Fresh Dev Server
```bash
bun dev
```
Wait for server to be ready on `localhost:3000`.

### 2. Clear All State
Navigate to `localhost:3000/growthoperator` and execute in browser console:
```javascript
localStorage.clear();
sessionStorage.clear();
```
Refresh the page.

---

## Flow Overview

The v2 flow consists of:
- **7 Questions** (3 multiple-choice, 4 long-answer)
- **5 AI Moments** (diagnosis-1, diagnosis-2, diagnosis-3, path-reveal, fit-assessment)
- **3 Disqualification Exit Points** (Q1, Q6, Q7)
- **2 Dynamically Personalized Questions** (Q2, Q3 adapt based on previous answers)

---

## Test Execution

### PHASE 0: Landing Page Verification

**Navigate to:** `http://localhost:3000/growthoperator`

**Assert the following elements exist with EXACT text:**

| Element | Expected Content |
|---------|------------------|
| Mentor Avatar | Brady Badour avatar image visible |
| Callout (italic) | `In the next 5-10 minutes I'll show you why online business hasn't worked for you yet...` |
| Headline | `Then I'll show you the best business model for your situation in the new 2026 AI economy` |
| Button | `Start Conversation` with arrow |
| Disclaimer (italic) | `Warning: This experience adapts based on your answers. Please thoughtfully respond to get the most value from this. Enjoy :)` |

**Action:** Click "Start Conversation" button.

---

### STEP 1: Q1 - Business Model Selection (Multiple Choice)

**Assert question text:** `Let's start easy. What have you tried?`

**Assert ALL options present with EXACT labels:**
- `Ecommerce (dropshipping, Amazon FBA, print on demand, reselling)`
- `Agency / Services (SMMA, lead gen, web dev, AI automation, freelancing)`
- `Sales (high ticket closing, appointment setting, dialing)`
- `Content Creation (YouTube, TikTok, podcast, newsletter, blog)`
- `Education Products (courses, coaching, consulting, communities)`
- `Affiliate Marketing (Amazon, ClickBank, niche sites, network marketing)`
- `Software (SaaS, apps, Chrome extensions, no-code tools)`
- `Investing (crypto, forex, stocks, options, real estate)`
- `I have not tried a business model yet`

**Action:** Select "Agency / Services" option. (Clicking option auto-advances)

**EXIT CONDITION TEST (Scenario 2):** If `I have not tried a business model yet` is selected, assert DisqualificationScreen appears with:
- Headline: `This is not for you`
- Message containing: `This experience is designed for people who've already tried building something online.`

---

### STEP 2: Q2 - What Happened (Long Answer, Personalized)

**Assert:** A personalized question appears that:
1. Mirrors back the selected business model ("Agency. Got it.")
2. Shows understanding of that model ("The outreach, the client work, the churn...")
3. Ends with: `Tell me what happened. How far did you get? What made you stop?`

**Assert:** Typing animation occurs (blinking cursor, text appears character by character)

**Assert placeholder text:** `Be honest about what happened...`

**Action:** Enter text: `I ran an agency for about a year. Got up to 5 clients but the churn was brutal. Every month felt like starting over. I was doing all the fulfillment myself and couldn't figure out how to scale without burning out.`

**Assert:** Continue button becomes enabled (green) after minimum text entered.

**Action:** Click "Continue" button.

---

### STEP 3: Q3 - Why It Failed (Long Answer, Personalized)

**Assert:** A personalized question appears that:
1. Mirrors back specific details from Q2 answer ("So you got some traction..." or similar)
2. Shows insight about their situation
3. Ends with: `Why didn't it work?`

**Assert:** Typing animation occurs for the personalized question

**Assert placeholder text:** `What do you think went wrong...`

**Action:** Enter text: `I think I was trying to do everything myself. Sales, fulfillment, client management, all of it. I didn't have systems or processes. Every client was custom work and I couldn't step away without things falling apart.`

**Action:** Click "Continue" button.

---

### STEP 4: AI Moment - Diagnosis 1 (Model Breakdown)

**Assert:** AI response streams in with blinking cursor while generating

**Assert:** Response should:
1. Reference their specific business model (Agency)
2. Use conversational formatting (short paragraphs, **bold** for emphasis, *italics* for their words)
3. Explain the structural flaw of the agency model
4. End with absolution line: "You weren't failing. You were..."

**Markdown Rendering Verification:**
1. **Assert** `**bold text**` renders as bold (no asterisks visible)
2. **Assert** `*italic text*` renders as italic (no asterisks visible)
3. **Assert** short paragraphs with blank lines between them

**CRITICAL ASSERT:** No Calendly booking widget at this stage.

**Assert:** Continue button appears after streaming completes.

**Action:** Click "Continue" button.

---

### STEP 5: AI Moment - Diagnosis 2 (The Reframe)

**Assert:** AI response streams in

**Assert:** Response should:
1. Connect their specific model to a bigger pattern ("It's not just Agency. It's all of them.")
2. Reference their actual words from Q2/Q3
3. Explain the "five people" concept (Expert, Marketer, Salesperson, Operator, Fulfillment)
4. Use numbered list (1-5) for the five roles
5. End with hope: "And there's a different way to do this."

**Markdown Rendering Verification:**
1. **Assert** numbered list renders properly (1. 2. 3. 4. 5.)
2. **Assert** **bold** renders correctly for role names
3. **Assert** proper paragraph spacing

**Assert:** Continue button appears after streaming completes.

**Action:** Click "Continue" button.

---

### STEP 6: AI Moment - Diagnosis 3 (Setup for Path)

**Assert:** AI response streams in

**Assert:** Response should contain:
1. "Now you see the real problem."
2. "It was never about effort. It was never about intelligence. **It was about structure.**"
3. "**By being a Growth Operator.**" (on its own line, bold)
4. Future pacing about people making $15K-$50K/month
5. "A few more questions. **Answer them like your future depends on it.**"

**Markdown Rendering Verification:**
1. **Assert** **bold** key phrases render correctly
2. **Assert** proper paragraph spacing

**Assert:** Continue button appears after streaming completes.

**Action:** Click "Continue" button.

---

### STEP 7: Q4 - Vision (Long Answer)

**Assert question text (multi-line):**
```
Imagine this works. You're making $15K-$25K a month six months from now.

What would actually change in your life?
```

**Assert placeholder text:** `What would be different...`

**Action:** Enter text: `I'd finally have the freedom I've been chasing. I could work from anywhere, spend more time with family, and not stress about where the next client is coming from. I'd have actual systems instead of just me grinding.`

**Action:** Click "Continue" button.

---

### STEP 8: Q5 - Why Now (Long Answer)

**Assert question text (multi-line):**
```
You've seen opportunities before. You've scrolled past 100s of ads.

But you're still here.

Why today? What's actually going on that made you stop and pay attention to this?
```

**Assert placeholder text:** `Be real about what brought you here...`

**Action:** Enter text: `I just hit a wall with my current situation. The agency is dead, I'm back to consulting gigs, and I know there has to be a better model. The AI angle caught my attention because I can see where things are heading.`

**Action:** Click "Continue" button.

---

### STEP 9: Q6 - Commitment (Multiple Choice)

**Assert question text (multi-line):**
```
This is NOT a side project.

This is building a real business. It takes real commitment. Real focus. Real work.

Are you ready for that?
```

**Assert ALL options present with EXACT labels:**
- `Yes, I'm ready`
- `Not yet`

**Action:** Select "Yes, I'm ready" option. (Clicking option auto-advances)

**EXIT CONDITION TEST (Scenario 3):** If `Not yet` is selected, assert DisqualificationScreen appears with:
- Headline: `That's honest`
- Message containing: `Most people aren't ready. And there's no shame in that.`

---

### STEP 10: Q7 - Investment Capital (Multiple Choice)

**Assert question text (multi-line):**
```
Building a real business takes capital. The more you have, the faster you can move.

How much do you have available to invest in building this?
```

**Assert ALL options present with EXACT labels:**
- `Less than $1K`
- `$1K - $5K`
- `$5K - $10K`
- `$10K - $25K`
- `$25K+`

**Action:** Select "$5K - $10K" option. (Clicking option auto-advances)

**EXIT CONDITION TEST (Scenario 4):** If `Less than $1K` is selected, assert DisqualificationScreen appears with:
- Headline: `Not quite yet`
- Message containing: `Every real business takes startup capital. Under $1K makes it nearly impossible to move fast enough.`

---

### STEP 11: AI Moment - Path Reveal

**Assert:** AI response streams in

**Assert:** Response should:
1. Open with: "**Something changed in the last two years.** And most people missed it."
2. Explain the AI economy shift (AI can clone expertise)
3. Explain the expert gap (millions of experts, almost no operators)
4. Reference their specific model from Q1 ("You tried *Agency*...")
5. Reference their vision from Q4
6. Reference their "why now" from Q5
7. Frame Growth Operator as the solution
8. End with: "And right now, the experts need you more than you need them."

**Markdown Rendering Verification:**
1. **Assert** **bold** key phrases render correctly
2. **Assert** *italics* for referencing user's words
3. **Assert** proper paragraph spacing (short paragraphs, 2-3 sentences max)

**Assert:** Continue button appears after streaming completes.

**Action:** Click "Continue" button.

---

### STEP 12: AI Moment - Fit Assessment (Final + Booking)

**Assert:** AI response streams in

**Assert:** Response should:
1. Open with: "**So now you see the opportunity.**"
2. Reference their model, vision, and "why now" using their actual words
3. Stack the offer with "What if..." questions:
   - AI that finds the right expert
   - AI that guides every step
   - AI experience built for you
   - 1-on-1 mentorship
   - 5 calls a week with operators
   - Every playbook and script already built
4. Include: "**Not information. Infrastructure.**"
5. Selection frame: "We're looking for serious Growth Operators"
6. Personalized close: "**Based on everything you've shared, I think that's you.**"

**Markdown Rendering Verification:**
1. **Assert** proper **bold** rendering throughout
2. **Assert** *italics* when quoting user's words
3. **Assert** each "What if" question gets its own paragraph

**CRITICAL ASSERT - Qualified Path:**
- **Assert:** Calendly booking widget appears inline below the diagnosis
- **Assert:** Booking widget URL contains: `https://calendly.com/brady-mentorfy/30min`
- **Assert:** Transition text appears: "Pick a time below. 30 minutes. They'll see everything we talked about..."

---

## Test Scenarios

### Scenario 1: Qualified Applicant (Happy Path)

Use test data that meets ALL qualification criteria:
- **Q1:** Any business model EXCEPT "I have not tried a business model yet"
- **Q2-Q5:** Thoughtful, specific responses (3+ sentences each)
- **Q6:** "Yes, I'm ready"
- **Q7:** "$1K - $5K" or higher ($1k+ capital)

**Expected Result:** Calendly widget appears in final diagnosis (Step 12).

---

### Scenario 2: Disqualified - Never Tried (Q1)

**Q1 Selection:** `I have not tried a business model yet`

**Expected Result:** DisqualificationScreen with:
- Headline: `This is not for you`
- Message: `This experience is designed for people who've already tried building something online...`
- No further progression possible

---

### Scenario 3: Disqualified - Not Ready (Q6)

Complete Q1-Q5 with qualifying answers, then:

**Q6 Selection:** `Not yet`

**Expected Result:** DisqualificationScreen with:
- Headline: `That's honest`
- Message: `Most people aren't ready. And there's no shame in that...`
- No further progression possible

---

### Scenario 4: Disqualified - Insufficient Capital (Q7)

Complete Q1-Q6 with qualifying answers, then:

**Q7 Selection:** `Less than $1K`

**Expected Result:** DisqualificationScreen with:
- Headline: `Not quite yet`
- Message: `Every real business takes startup capital. Under $1K makes it nearly impossible...`
- No further progression possible

---

### Scenario 5: Vague/Low-Effort Answers

Use qualifying MC answers but provide minimal long-answer responses:
- **Q2:** "It didn't work out"
- **Q3:** "idk"
- **Q4:** "money"
- **Q5:** "saw it"

**Expected Result:** AI responses may be less personalized. Fit assessment may still show Calendly (AI makes final call based on commitment + capital), but ideally would call out low engagement.

---

## Navigation Verification

### Back Button Behavior

Back button works **within phases only**. It should NOT render at phase boundaries or during AI moments.

**Phases:**
- Phase A: Landing Page (Step 0)
- Phase B: Q1 (Step 1) - single step, no back within phase
- Phase C: Q2-Q3 (Steps 2-3) - personalized questions
- Phase D: Diagnosis 1-2-3 (Steps 4-6) - AI moments
- Phase E: Q4-Q7 (Steps 7-10) - remaining questions
- Phase F: Path Reveal + Fit Assessment (Steps 11-12) - final AI moments

| Current Step | Back Button State | Behavior |
|--------------|-------------------|----------|
| Step 1 (Q1) | **Not rendered** | First step of phase, no back |
| Step 2 (Q2) | **Not rendered** | First step of Phase C, cannot go back to Phase B |
| Step 3 (Q3) | **Rendered** | Returns to Q2 (within Phase C) |
| Steps 4-6 (AI Moments) | **Not rendered** | AI response phase, no navigation |
| Step 7 (Q4) | **Not rendered** | First step of Phase E, cannot go back to Phase D |
| Step 8 (Q5) | **Rendered** | Returns to Q4 (within Phase E) |
| Step 9 (Q6) | **Rendered** | Returns to Q5 (within Phase E) |
| Step 10 (Q7) | **Rendered** | Returns to Q6 (within Phase E) |
| Steps 11-12 (AI Moments) | **Not rendered** | AI response phase, no navigation |

**Back Button Test Cases:**

**TEST: Back button NOT rendered at phase boundaries**
1. On Step 1 (Q1): Assert back button is NOT visible
2. On Step 2 (Q2): Assert back button is NOT visible
3. On Step 7 (Q4): Assert back button is NOT visible

**TEST: Back button NOT rendered during AI moments**
1. On Step 4 (Diagnosis 1): Assert back button is NOT visible
2. On Step 5 (Diagnosis 2): Assert back button is NOT visible
3. On Step 6 (Diagnosis 3): Assert back button is NOT visible
4. On Step 11 (Path Reveal): Assert back button is NOT visible
5. On Step 12 (Fit Assessment): Assert back button is NOT visible

**TEST: Back button works within Phase C (Q2-Q3)**
1. Complete Q2, arrive at Q3
2. Assert back button IS visible
3. Click back button
4. Assert returns to Q2 with previous answer preserved

**TEST: Back button works within Phase E (Q4-Q7)**
1. Complete Q4, arrive at Q5
2. Assert back button IS visible
3. Click back button
4. Assert returns to Q4 with previous answer preserved
5. Re-submit Q4, continue to Q5, Q6, Q7
6. On Q6: Assert back returns to Q5
7. On Q7: Assert back returns to Q6

### Progress Indicator

**Assert:** Progress bar visible at top of screen throughout flow
**Assert:** Progress advances with each step (12 total steps)

---

## Disqualification Screen Verification

For each disqualification screen, verify:

1. **Layout:**
   - Mentor avatar (Brady) centered at top
   - Headline in large serif font
   - Message with proper line breaks
   - Mentorfy watermark at bottom

2. **No Escape:**
   - No back button visible
   - No continue button
   - No way to proceed (must refresh and restart)

---

## Test Complete

If all assertions pass for Scenario 1 (Happy Path), the Growth Operator v2 flow is working correctly.

---

## Issue Reporting Format

When an assertion fails, report using this format:

```
## FAILED: [Step X or Scenario Y]

**Expected:** [What should have happened]
**Actual:** [What actually happened]
**Screenshot:** [If applicable]
**Console Errors:** [Any JS errors]
```

---

## Summary of Key Checkpoints

| Checkpoint | Step | Expected Behavior |
|------------|------|-------------------|
| Landing Page | 0 | Callout, headline, button, disclaimer all visible |
| Q1 Exit Condition | 1 | "Not tried yet" → Disqualification |
| Q2 Personalization | 2 | Question adapts based on Q1 model selection |
| Q3 Personalization | 3 | Question adapts based on Q2 answer |
| Diagnosis 1 | 4 | Model-specific breakdown, markdown renders correctly |
| Diagnosis 2 | 5 | Five roles concept, numbered list |
| Diagnosis 3 | 6 | "By being a Growth Operator" bold, future pacing |
| Q6 Exit Condition | 9 | "Not yet" → Disqualification |
| Q7 Exit Condition | 10 | "Less than $1K" → Disqualification |
| Path Reveal | 11 | References user's model, vision, why now |
| Fit Assessment (Qualified) | 12 | Calendly widget appears inline |
| Fit Assessment (Unqualified) | 12 | No widget, kind explanation |

---

## Markdown Rendering Failure Examples

**FAIL - Raw syntax visible:**
```
**Bold text** not rendered        ← asterisks visible
*Italic text* not rendered        ← asterisks visible
```

**FAIL - No visual hierarchy:**
- All text runs together without paragraph breaks
- Bold/italic indistinguishable from regular text

**PASS - Proper rendering:**
- **Bold** appears visually bold
- *Italics* appear visually italic
- Clear paragraph separation
- Short paragraphs with breathing room

---

## Personalized Question Verification

### Q2 Personalization (based on Q1)

| Q1 Selection | Expected Q2 Opening |
|--------------|---------------------|
| Ecommerce | "Ecommerce. Got it. The product research, the ads, the suppliers..." |
| Agency / Services | "Agency. Got it. The outreach, the client work, the churn..." |
| Sales | "Sales. Got it. The dials, the commission, the grind..." |
| Content Creation | "Content. Got it. The posting, the algorithm, the waiting..." |
| Education Products | "Education products. Got it. The course, the launch, the audience problem..." |
| Affiliate Marketing | "Affiliate. Got it. The links, the traffic, the commissions..." |
| Software | "Software. Got it. The building, the launching, the crickets..." |
| Investing | "Investing. Got it. The charts, the plays, the uncertainty..." |

### Q3 Personalization (based on Q2)

Q3 should:
1. Mirror back something specific from Q2 answer
2. Show insight about their situation
3. End with "Why didn't it work?"

---

## Key Differences from V1 Flow

| Aspect | V1 | V2 |
|--------|----|----|
| Questions | 6 (5 MC, 1 contact form) | 7 (3 MC, 4 long-answer) |
| AI Moments | 2 (first + final diagnosis) | 5 (diagnosis-1/2/3, path-reveal, fit-assessment) |
| Personalization | None | Q2/Q3 dynamically personalized |
| Exit Points | None (always reaches final) | 3 (Q1, Q6, Q7) |
| Contact Collection | Yes (Step 6) | No |
| Qualification Logic | AI decides at end | MC-based hard gates + AI final call |
| Booking Trigger | AI tool call | AI tool call (only if qualified) |
