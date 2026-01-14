# Growth Operator V6 Flow - End-to-End Test Plan

**Purpose:** Systematic testing of the complete Growth Operator v6 assessment journey using Playwright MCP.

**Version:** 6.0 (18-question assessment with 4 AI moments + 8-screen AI diagnosis via Opus 4.5)

**CRITICAL:** Abort on first failure. Do not continue past any failed assertion - the flow is sequential and later tests depend on earlier state.

---

## What Changed from V5

| Aspect | V5 | V6 |
|--------|----|----|
| Question Count | 17 multiple-choice | 18 questions (16 MC + 1 multi-select + 1 open-ended) |
| Question Content | Original question set | Completely restructured questions |
| Progress Indicator | Linear "X of 17" dots | Section-based with labels (e.g., "Your Situation") |
| AI Moments | None | 4 AI-generated reflection screens between sections |
| Disqualification | Q1 exit condition | **Removed** - no disqualification |
| <$1k Handling | N/A | Soft gate - complete quiz but can't book call |
| Q13 Type | Multiple choice | **Multi-select** (thought constellation) |
| Q14 Type | Multiple choice | **Open-ended** text input (confession) |
| Section Structure | Flat | 5 named sections with visual labels |

---

## Pre-Test Setup

### 1. Start Fresh Dev Server
```bash
bun dev
```
Wait for server to be ready on `localhost:3000`.

### 2. Verify Environment
Ensure `ANTHROPIC_API_KEY` and `GOOGLE_AI_API_KEY` are set (diagnosis uses Claude Opus 4.5, AI moments use Gemini Flash).

### 3. Clear All State
Navigate to `localhost:3000/growthoperator` and execute in browser console:
```javascript
localStorage.clear();
sessionStorage.clear();
```
Refresh the page.

---

## Flow Overview

The v6 flow consists of:
- **5 Sections** with labeled progress indicators
- **18 Questions** (Q1-Q18) across sections
- **4 AI Moments** (personalized reflection screens between sections)
- **1 Contact Gate** (name, email, phone)
- **1 Loading Screen** (spinning avatar animation with message cycling)
- **1 Diagnosis Sequence** (8 screens with internal navigation)

**Section Breakdown:**
| Section | Label | Questions | AI Moment |
|---------|-------|-----------|-----------|
| 1 | "Your Situation" | Q1-Q5 | AI Moment 1 |
| 2 | "Your Journey" | Q6-Q9 | AI Moment 2 |
| 3 | "Going Deeper" | Q10-Q13 | AI Moment 3 |
| 4 | "The Confession" | Q14 | AI Moment 4 |
| 5 | "What's At Stake" | Q15-Q18 | (none) |

**Total Steps:** 28 (18 Questions + 4 AI Moments + Contact + Loading + Diagnosis)

---

## Test Execution

### PHASE 0: Landing Page Verification

**Navigate to:** `http://localhost:3000/growthoperator`

**Assert the following elements exist with EXACT text:**

| Element | Expected Content |
|---------|------------------|
| Mentor Avatar | Brady Badour avatar image visible (88px) |
| Callout (italic, green accent) | `If online business still hasn't worked for you YET...` with "still hasn't" in green |
| Headline (green accents) | `It's not your fault. It's not the model. There's something you haven't been told.` with "not" and "haven't been told" in green |
| Subheadline | `Take this AI assessment to find out what's actually been in your way.` |
| Button | `Start Assessment` with arrow |
| Disclaimer (italic) | `Warning: This experience adapts based on your answers. Answer honestly... your diagnosis depends on it.` |

**Visual Verification:**
- Background color should be warm beige (#FAF6F0)
- Green accent color: #10B981
- Staggered animation entrance (elements appear sequentially with 0.12s stagger)

**Action:** Click "Start Assessment" button.

---

## SECTION 1: YOUR SITUATION (Q1-Q5)

### STEP 1: Q1 - Why Are You Here (Multiple Choice)

**Assert:** Progress label shows `YOUR SITUATION`
**Assert:** Progress indicator shows 5 dots (dot 1 active)

**Assert question text:** `Why are you here?`

**Assert ALL options present with EXACT labels:**
- `I'm still trying to figure this online business thing out`
- `I've tried things that didn't work and I'm looking for what will`
- `I'm stuck and I need a new direction`
- `Something told me to click... so here I am`

**Assert:** Back button IS visible (can return to landing page)
**Assert:** Question text is LEFT-ALIGNED (not centered)

**Action:** Select "I've tried things that didn't work and I'm looking for what will" option.

---

### STEP 2: Q2 - Desired Income (Multiple Choice)

**Assert:** Progress indicator: dot 1 green, dot 2 active, dots 3-5 gray

**Assert question text:** `If this actually worked... what would you want to be making?`

**Assert ALL options present:**
- `$5,000/month — enough to breathe`
- `$10,000/month — real freedom starts here`
- `$25,000/month — life changing money`
- `$50,000/month — a completely different life`
- `$100,000+/month — the big dream`

**Action:** Select "$25,000/month — life changing money" option.

---

### STEP 3: Q3 - Current Income (Multiple Choice)

**Assert:** Progress indicator: dots 1-2 green, dot 3 active, dots 4-5 gray

**Assert question text:** `What are you actually making right now?`

**Assert ALL options present:**
- `Less than $1,000/month`
- `$1,000 - $3,000/month`
- `$3,000 - $5,000/month`
- `$5,000 - $10,000/month`
- `Over $10,000/month`

**Action:** Select "$1,000 - $3,000/month" option.

---

### STEP 4: Q4 - Models Tried (Multiple Choice)

**Assert:** Progress indicator: dots 1-3 green, dot 4 active, dot 5 gray

**Assert question text:** `What have you actually tried?`

**Assert ALL options present:**
- `Ecommerce — dropshipping, Amazon, print on demand`
- `Agency or services — SMMA, freelancing, lead gen, AI automation`
- `Sales — closing, setting, remote sales roles`
- `Content — YouTube, TikTok, podcasts, newsletters`
- `Coaching or courses — selling what you know`
- `Affiliate — promoting other people's stuff`
- `Software — SaaS, apps, no-code tools`
- `Trading or investing — crypto, forex, stocks`
- `I haven't really tried anything seriously yet`

**Note:** Unlike V5, selecting "I haven't really tried anything seriously yet" does NOT trigger disqualification. All users continue.

**Action:** Select "Agency or services — SMMA, freelancing, lead gen, AI automation" option.

---

### STEP 5: Q5 - Models Count (Multiple Choice)

**Assert:** Progress indicator: dots 1-4 green, dot 5 active

**Assert question text:** `How many different things have you actually gone all-in on?`

**Assert ALL options present:**
- `Just one thing so far`
- `2-3 different models`
- `4-5 different models`
- `More than 5... I've been searching for a while`

**Action:** Select "2-3 different models" option.

---

### STEP 6: AI Moment 1 - Recognition + Gap Validation

**Assert:** Progress bar is HIDDEN (AI moments don't show section progress)
**Assert:** Back button is NOT visible (`noBackButton: true`)

**Assert:** AI-generated content appears with typing animation
**Assert:** Content references user's answers from Q1-Q5:
- Reference to why they're here (Q1)
- Reference to desired income (Q2) and current income (Q3) gap
- Reference to model tried (Q4)
- Reference to models count (Q5)

**Assert:** Content is personalized, NOT a template
**Assert:** "Continue" button appears after typing completes

**Wait:** Allow 3-8 seconds for AI generation

**Action:** Click "Continue" button.

---

## SECTION 2: YOUR JOURNEY (Q6-Q9)

### STEP 7: Q6 - Duration (Multiple Choice)

**Assert:** Progress label shows `YOUR JOURNEY`
**Assert:** Progress indicator shows 4 dots (dot 1 active) — new section resets progress

**Assert question text:** `How long have you been trying to make this work?`

**Assert ALL options present:**
- `Less than 6 months`
- `6 months to a year`
- `1-2 years`
- `2-3 years`
- `3-5 years`
- `More than 5 years`

**Action:** Select "2-3 years" option.

---

### STEP 8: Q7 - Total Investment (Multiple Choice)

**Assert question text:** `When you add it all up — courses, coaching, tools, ads, everything — how much have you put on the line?`

**Assert ALL options present:**
- `Less than $500`
- `$500 - $2,000`
- `$2,000 - $5,000`
- `$5,000 - $10,000`
- `$10,000 - $25,000`
- `More than $25,000`

**Action:** Select "$5,000 - $10,000" option.

---

### STEP 9: Q8 - Available Capital (Multiple Choice, Personalized)

**Note:** This question may have AI-personalized intro text based on previous answers.

**Assert question contains:** `How much do you actually have available right now to put toward finally making this work?`

**Assert ALL options present:**
- `Less than $1,000`
- `$1,000 - $3,000`
- `$3,000 - $5,000`
- `$5,000 - $10,000`
- `More than $10,000`

**SOFT GATE TEST:** If "Less than $1,000" is selected:
- User continues through entire flow normally
- At diagnosis Screen 8, Calendly widget is REPLACED with soft rejection message
- See "Soft Gate Verification" section below

**Action:** Select "$3,000 - $5,000" option (qualified path).

---

### STEP 10: Q9 - Deeper Cost (Multiple Choice)

**Assert question text:** `What has this cost you beyond money?`

**Assert ALL options present:**
- `Time I'm never getting back`
- `Confidence in myself`
- `Relationships — strain with people who matter`
- `Other opportunities I let pass`
- `My peace of mind`
- `All of the above`

**Action:** Select "All of the above" option.

---

### STEP 11: AI Moment 2 - Honor Investment + Reframe

**Assert:** Progress bar is HIDDEN
**Assert:** Back button is NOT visible

**Assert:** AI-generated content references:
- Duration (Q6)
- Total investment (Q7)
- Available capital (Q8)
- Non-financial cost (Q9)

**Assert:** Content includes "reframe" — honoring their commitment, not positioning as failure

**Action:** Click "Continue" button.

---

## SECTION 3: GOING DEEPER (Q10-Q13)

### STEP 12: Q10 - Position in Equation (Multiple Choice)

**Assert:** Progress label shows `GOING DEEPER`
**Assert:** Progress indicator shows 4 dots (dot 1 active)

**Assert question text:** `In the things you've tried... where were YOU in the equation?`

**Assert ALL options present:**
- `I was trying to be the expert — the one with the knowledge and credibility`
- `I was trying to be the marketer — getting attention, building an audience`
- `I was doing everything myself — expert, marketer, operator, all of it`
- `I was working in someone else's system — their business, their rules`
- `I never really thought about where I was positioned`

**Action:** Select "I was doing everything myself — expert, marketer, operator, all of it" option.

---

### STEP 13: Q11 - Teacher Money (Multiple Choice)

**Assert question text:** `The people who taught you this stuff... how did THEY make most of their money?`

**Assert ALL options present:**
- `Teaching it — courses, coaching, content about the thing`
- `Actually doing it — making money from the business model itself`
- `Both — doing it AND teaching it`
- `I never really thought about it`
- `I mostly taught myself`

**Action:** Select "Teaching it — courses, coaching, content about the thing" option.

---

### STEP 14: Q12 - AI Relationship (Multiple Choice)

**Assert question text:** `How has AI changed how you think about all of this?`

**Assert ALL options present:**
- `Everything feels more uncertain now`
- `I see opportunity but I don't know how to capture it`
- `I'm worried about being left behind`
- `I think it's mostly hype — things haven't really changed`
- `I'm trying to figure out where I fit in the new landscape`

**Action:** Select "I see opportunity but I don't know how to capture it" option.

---

### STEP 15: Q13 - Thought Constellation (MULTI-SELECT)

**Assert:** This is a MULTI-SELECT question (can select multiple options)
**Assert question text:** `Which of these thoughts have actually crossed your mind?`
**Assert instruction text:** `Select all that apply`

**Assert ALL options present:**
- `"Maybe I'm just not smart enough for this"`
- `"I've wasted so much time"`
- `"Everyone else seems to figure it out except me"`
- `"What if I'm still in the same place in 5 years?"`
- `"I should have just gotten a normal job"`
- `"I can't give up now — I've already put too much in"`
- `"There has to be something I'm missing"`
- `"The game feels rigged"`

**Assert:** "Continue" button appears (multi-select requires explicit submit)
**Assert:** Continue button disabled until at least one option selected

**Action:** Select multiple options:
- `"I've wasted so much time"`
- `"There has to be something I'm missing"`
- `"The game feels rigged"`

**Action:** Click "Continue" button.

---

### STEP 16: AI Moment 3 - Insight Delivery + Pre-Frame

**Assert:** Progress bar is HIDDEN
**Assert:** Back button is NOT visible

**Assert:** AI-generated content delivers INSIGHT based on:
- Position in equation (Q10)
- Teacher money source (Q11)
- AI relationship (Q12)
- Thought constellation pattern (Q13) — should reference the COMBINATION

**Assert:** Content includes the paradigm shift setup
**Assert:** Content ends with pre-frame for "one more question"

**Action:** Click "Continue" button.

---

## SECTION 4: THE CONFESSION (Q14)

### STEP 17: Q14 - The Confession (OPEN-ENDED)

**Assert:** Progress label shows `THE CONFESSION`
**Assert:** Progress indicator shows 1 dot (dot 1 active)
**Assert:** Back button is NOT visible (`noBackButton: true`)

**Assert question text:** `In one sentence... what's the most frustrating part of this whole journey that you don't really talk about?`

**Assert:** Text input field (textarea) is present
**Assert:** Placeholder text: `Type your answer here...`
**Assert:** "Continue" button disabled until text is entered

**Action:** Type: `I feel like I've been pretending to have it figured out when I really don't.`

**Assert:** Continue button becomes enabled

**Action:** Click "Continue" button.

---

### STEP 18: AI Moment 4 - Sacred Acknowledgment + Bridge

**Assert:** Progress bar is HIDDEN
**Assert:** Back button is NOT visible

**Assert:** AI-generated content:
- QUOTES user's exact confession text (in quotation marks)
- Does NOT paraphrase or summarize
- Simple acknowledgment ("I hear you" / "Thank you for that")
- Bridges to final section

**Assert:** This is the SHORTEST AI moment (~40-70 words)
**Assert:** Content honors the vulnerability without over-analyzing

**Action:** Click "Continue" button.

---

## SECTION 5: WHAT'S AT STAKE (Q15-Q18)

### STEP 19: Q15 - Why Keep Going (Multiple Choice)

**Assert:** Progress label shows `WHAT'S AT STAKE`
**Assert:** Progress indicator shows 4 dots (dot 1 active)

**Assert question text:** `Despite everything... what's kept you going?`

**Assert ALL options present:**
- `I've seen other people make it work — I know it's possible`
- `I refuse to go back to "normal" — that's not an option for me`
- `I don't have a backup plan — I need this to work`
- `I still believe I'll figure it out eventually`
- `I can't explain it — something in me just won't let go`

**Action:** Select "I refuse to go back to \"normal\" — that's not an option for me" option.

---

### STEP 20: Q16 - What Would Change (Multiple Choice)

**Assert question text:** `If this actually worked... what would change first?`

**Assert ALL options present:**
- `I'd quit my job`
- `I'd stop stressing about money all the time`
- `I'd finally feel like I actually made it`
- `I'd have real freedom — my time would be mine`
- `I'd be able to take care of the people I love`
- `Honestly? Everything would change`

**Action:** Select "I'd quit my job" option.

---

### STEP 21: Q17 - Urgency (Multiple Choice)

**Assert question text:** `How urgent is this for you?`

**Assert ALL options present:**
- `I'm patient — I just want to find the right thing`
- `I want real progress in the next 6 months`
- `I need something to work this year`
- `It's urgent — I'm running out of time or money or both`
- `I'm ready to move now — I'm done waiting`

**Action:** Select "I need something to work this year" option.

---

### STEP 22: Q18 - Biggest Fear (Multiple Choice)

**Assert question text:** `What are you most afraid of?`

**Assert ALL options present:**
- `I'm afraid I'll still be stuck in the same place a year from now`
- `I'm afraid I'll waste more money on something that doesn't work`
- `I'm afraid everyone else will figure it out and I'll get left behind`
- `I'm afraid I'll eventually have to give up on this whole dream`
- `I'm afraid that maybe I'm just not cut out for this`

**Action:** Select "I'm afraid I'll still be stuck in the same place a year from now" option.

---

### STEP 23: Contact Gate

**Assert:** Progress label shows `ALMOST THERE`

**Assert question text contains:** `Now I've got what I need.`
**Assert question text contains:** `I'm working on putting together your diagnosis right now.`
**Assert question text contains:** `Enter your contact info below so I can show you what's actually going on...`

**Assert:** Three input fields present:
- Name field with placeholder "Your name"
- Email field with placeholder "your@email.com"
- Phone field with placeholder "(555) 123-4567"

**Assert:** Back button is NOT visible (`noBackButton: true`)
**Assert:** Continue button is disabled until all fields are filled
**Assert:** Input fields animate in AFTER question text typing completes

**Action:** Fill in:
- Name: `Test User`
- Email: `test@example.com`
- Phone: `5551234567`

**Assert:** Continue button becomes enabled (green)

**Action:** Click "Continue" button.

---

### STEP 24: Loading Screen

**Assert:** Loading screen appears with smooth fade-in transition
**Assert:** Header and progress bar are NOT visible (`hideProgressBar: true`)

**Assert:** Visual elements:
- Brady Badour avatar (100px) centered
- Spinning gradient ring animation around avatar
- "Brady Badour" name with verified badge below avatar

**Assert:** Back button is NOT visible

**Assert initial messages cycle through (shown once each):**
1. `Analyzing your responses...`
2. `Identifying patterns in your journey...`
3. `This is interesting...`
4. `Connecting the dots...`
5. `I see what happened here...`
6. `Preparing your diagnosis...`

**Assert waiting loop messages cycle (if API takes longer):**
1. `Almost there...`
2. `Just a moment longer...`
3. `Putting the finishing touches...`
4. `This is taking a bit longer than usual...`
5. `Still working on it...`
6. `Hang tight...`

**Assert ready message appears when diagnosis completes:**
- `Alright it's ready... let's dive in.`

**Assert:** Messages display with:
- Italic font style (Lora serif)
- 20px font size
- Typing animation (30-50ms per character)

**Assert:** Screen fades out before transitioning to diagnosis

**Wait:** Allow screen to auto-advance after diagnosis generation completes (10-30 seconds)

---

### STEP 25: Diagnosis Sequence (8 Screens)

The diagnosis sequence is a nested flow with its own navigation.

**Progress Indicator:** The diagnosis uses a visual dot-based progress bar (8 dots).

#### Screen 1: The Mirror

**Assert:** Own header with Brady Badour avatar and name
**Assert:** Back button NOT visible on first screen
**Assert:** Visual progress indicator with 1st dot active (black pill), dots 2-8 gray
**Assert:** Typing animation on first visit

**Assert content should include:**
- Quote of their Q14 confession (exact words)
- Reference to the income gap (Q2 vs Q3)
- Reference to their thought constellation (Q13)
- Reference to their position (Q10)
- Model-specific behavioral reconstruction (Q4)
- Journey facts (Q5 models count, Q6 duration, Q7 investment)

**Assert:** Continue button appears after typing completes

**Action:** Click "Continue"

---

#### Screen 2: The Pattern

**Assert:** Back button IS visible
**Assert:** Progress indicator: dot 1 green, dot 2 active (black pill), dots 3-8 gray

**Assert content should:**
- Identify patterns across their answers
- Use Q10 (position) to identify the core pattern
- Interpret their Q13 constellation as a PATTERN (not individual thoughts)
- Weave 3+ data points into unified insight

**Action:** Click "Continue"

---

#### Screen 3: The Paradigm Shift

**Assert:** Progress indicator: dots 1-2 green, dot 3 active, dots 4-8 gray

**Assert content should include:**
- Build directly from Q10 (position answer)
- Reference Q11 (teacher money) for the "shovel sellers" insight
- The key insight: you don't need to BE an expert, partner with one

**Action:** Click "Continue"

---

#### Screen 4: The Absolution

**Assert:** Progress indicator: dots 1-3 green, dot 4 active, dots 5-8 gray

**Assert content should include:**
- **Quote Q14 confession AGAIN** — now with new meaning through paradigm shift lens
- Use Q7 vs Q8 (invested vs available) to honor commitment
- Model-specific absolution based on Q4
- Tie absolution to position (Q10)
- **"You weren't failing."** or similar

**Action:** Click "Continue"

---

#### Screen 5: The Proof

**Assert:** Progress indicator: dots 1-4 green, dot 5 active, dots 6-8 gray

**Assert content should include:**
- Acknowledgment of skepticism
- Case studies with specific names and numbers:
  - **Carson** - paid $7K for failed course, now **$100K/month** with tattoo creator
  - **Nick** - was a server, now **$50K/month** with woodworking expert
  - **Kade** - was an artist, now **$30K/month** with AI YouTube creator

**Action:** Click "Continue"

---

#### Screen 6: The Reveal

**Assert:** Progress indicator: dots 1-5 green, dot 6 active, dots 7-8 gray

**Assert content should include:**
- **"It's called being a Growth Operator."**
- Use Q2 (desired income) for the math
- Personalized expert example based on Q4 (model tried)
- Contrast: "Instead of being the [Q10 position], you become the Growth Operator."

**Action:** Click "Continue"

---

#### Screen 7: The Stakes

**Assert:** Progress indicator: dots 1-6 green, dot 7 active, dot 8 gray

**Assert content should include:**
- Callback to Q15 (what kept them going)
- Callback to Q16 (what would change first)
- VISCERAL fear based on Q18
- Connection to their specific vision

**Action:** Click "Continue"

---

#### Screen 8: The Close

**Assert:** Progress indicator: dots 1-7 green, dot 8 active
**Assert:** No "Continue" button on final screen

**Assert content should include:**
- Honor their full journey using Q5, Q6, Q7 data
- Calibrate to Q17 (urgency level)
- Future pace based on Q2 (desired income)
- Selection frame: "You're exactly who we're looking for."

**CRITICAL ASSERT - Calendly Booking Widget (Qualified Users):**
- **Assert:** Calendly booking widget appears inline after the main copy
- **Assert:** Widget URL contains: `https://calendly.com/brady-mentorfy/30min`
- **Assert:** Widget URL contains `session_id` parameter
- **Assert:** Widget theme colors: backgroundColor FAF6F0, primaryColor 10B981

---

## Soft Gate Verification (<$1k Users)

**Test Scenario:** Run through flow with Q8 = "Less than $1,000"

**At Diagnosis Screen 8:**

**Assert:** Calendly widget is NOT shown
**Assert:** Soft rejection message appears instead:
> "Based on what you shared, now might not be the right time for a call. Focus on building up some capital first, then come back when you're ready to invest in yourself."

**Assert:** Message styled with:
- Warm background (#F5F0E8)
- 18px Lora serif font
- 32px padding
- Centered text

---

## Navigation Verification

### Back Button Behavior in Main Flow

| Step | Back Button State | Notes |
|------|-------------------|-------|
| Q1 | Visible | Returns to landing page |
| Q2-Q5 | Visible | Returns to previous question |
| AI Moment 1 | **Not visible** | `noBackButton: true` |
| Q6-Q9 | Visible | Returns to previous question |
| AI Moment 2 | **Not visible** | `noBackButton: true` |
| Q10-Q13 | Visible | Returns to previous question |
| AI Moment 3 | **Not visible** | `noBackButton: true` |
| Q14 | **Not visible** | `noBackButton: true` (sacred moment) |
| AI Moment 4 | **Not visible** | `noBackButton: true` |
| Q15-Q18 | Visible | Returns to previous question |
| Contact Gate | **Not visible** | `noBackButton: true` |
| Loading Screen | **Not visible** | Cannot interrupt |
| Diagnosis | **Not visible** | Own navigation |

### Progress Bar Visibility

| Step | Progress Visible | Label |
|------|------------------|-------|
| Q1-Q5 | Yes | "YOUR SITUATION" |
| AI Moment 1 | **No** | Hidden |
| Q6-Q9 | Yes | "YOUR JOURNEY" |
| AI Moment 2 | **No** | Hidden |
| Q10-Q13 | Yes | "GOING DEEPER" |
| AI Moment 3 | **No** | Hidden |
| Q14 | Yes | "THE CONFESSION" |
| AI Moment 4 | **No** | Hidden |
| Q15-Q18 | Yes | "WHAT'S AT STAKE" |
| Contact Gate | Yes | "ALMOST THERE" |
| Loading Screen | **No** | `hideProgressBar: true` |
| Diagnosis | **No** | Own 8-dot indicator |

---

## AI Moment Content Verification

Each AI moment should be personalized based on accumulated answers. Verify:

### AI Moment 1 (After Q1-Q5)
- References income gap (Q2 vs Q3) with vivid description
- Acknowledges model history (Q4, Q5)
- Tone: Grounded, direct, no hype
- Length: 60-100 words

### AI Moment 2 (After Q6-Q9)
- States duration (Q6) — let it land
- Honors the bet (Q7 invested, Q8 remaining)
- Acknowledges non-financial cost (Q9)
- Contains THE REFRAME: "This isn't someone who [X]. This is someone who [Y]."
- Length: 80-120 words

### AI Moment 3 (After Q10-Q13)
- Position insight based on Q10
- Teacher insight based on Q11
- Constellation pattern interpretation (Q13 COMBINATION)
- Core insight: "You weren't failing. You were executing in the wrong position."
- Pre-frame: "One more question. The important one."
- Length: 80-120 words

### AI Moment 4 (After Q14)
- Quotes confession EXACTLY (in quotation marks)
- Simple acknowledgment
- Does NOT interpret yet
- Bridges to final section
- Length: 40-70 words (SHORTEST)

---

## Diagnosis Content Verification

### Model-Specific Personalization (Screen 6)

| Q4 Selection | Expected Expert Type |
|--------------|---------------------|
| Agency/services | "agency consultant" or "marketing strategist" |
| Ecommerce | "ecommerce mentor" or "Shopify expert" |
| Content | "content coach" or "YouTube strategist" |
| Sales | "sales trainer" or "closer coach" |
| Coaching | "course creator" or "coaching consultant" |

### Absolution Lines (Screen 4)

| Q4 Selection | Expected Absolution Theme |
|--------------|--------------------------|
| Ecommerce | Playing a game designed to keep you searching |
| Agency/services | Succeeding at something that was never going to free you |
| Sales | Winning at a game with no finish line |
| Content | Waiting for permission from an algorithm |
| Coaching | Had the product, didn't have the distribution |

---

## Error Handling Verification

### Loading Screen Errors

**TEST: Empty session data (400 error)**
- Assert error message: "Your session data is incomplete. Please restart the assessment."
- Assert "Try Again" button appears

**TEST: Rate limit (429 error)**
- Assert error message: "Too many requests. Please wait a moment and try again."
- Assert "Try Again" button appears

**TEST: API overload**
- Assert error message: "Our AI is currently experiencing high demand. Please try again in a moment."

---

## Visual Style Verification

**Colors:**
- Background: #FAF6F0 (warm beige)
- Accent/Buttons: #10B981 (green)
- Text: #000/#111 (primary), #666/#888 (secondary)

**Typography:**
- Headlines: Lora, Charter, Georgia (serif)
- UI/Body: Geist, -apple-system, sans-serif
- Question text: 18px
- Diagnosis content: 17px with 1.75 line-height (responsive: clamp 15px-17px)
- Loading messages: 20px italic
- AI Moment content: 17px (responsive: clamp 15px-17px)

**Progress Indicator:**
- Section label: uppercase, small, gray (#666)
- Dots: completed = small green, current = elongated black pill, future = small gray

---

## Test Scenarios

### Scenario 1: Qualified Applicant (Happy Path)

Use test data selecting qualified answers throughout (Q8 ≥ $1,000).

**Expected Result:** Completes all 8 diagnosis screens with Calendly widget on final screen.

---

### Scenario 2: Under-Capitalized Applicant (Soft Gate)

**Q8 Selection:** `Less than $1,000`

**Expected Result:**
- Completes entire flow normally (no disqualification)
- Sees full 8-screen diagnosis
- On Screen 8: Soft rejection message INSTEAD of Calendly widget
- Message: "Based on what you shared, now might not be the right time for a call..."

---

### Scenario 3: Minimal Input (Q14 Short Answer)

**Q14 Input:** `I don't know`

**Expected Result:**
- AI Moment 4 quotes "I don't know" exactly
- Interprets brevity itself as meaningful
- Diagnosis handles short confession gracefully

---

## Summary of Key Checkpoints

| Checkpoint | Step | Expected Behavior |
|------------|------|-------------------|
| Landing Page | 0 | Green-accented callout/headline, "Start Assessment" button |
| Section Progress | 1-5 | Label "YOUR SITUATION", 5-dot indicator |
| AI Moment 1 | 6 | Personalized reflection, progress hidden |
| Section Transition | 7 | Label changes to "YOUR JOURNEY", dots reset |
| Multi-Select | 15 | Q13 allows multiple selections |
| Open-Ended | 17 | Q14 textarea input |
| AI Moment 4 | 18 | Quotes confession exactly |
| Contact Gate | 23 | Fields animate after typing, no back button |
| Loading Screen | 24 | Spinning ring, 6+6+1 messages, header hidden |
| Diagnosis Screen 1 | 25.1 | Quotes confession, mirrors journey |
| Diagnosis Screen 4 | 25.4 | Re-quotes confession with new meaning |
| Diagnosis Screen 8 | 25.8 | Calendly widget (qualified) OR soft rejection (<$1k) |

---

## Issue Reporting Format

When an assertion fails, report using this format:

```
## FAILED: [Step X or Screen Y]

**Expected:** [What should have happened]
**Actual:** [What actually happened]
**Screenshot:** [Attach screenshot]
**Console Errors:** [Any JS errors]
```

---

## Architecture Note: Component Hierarchy

```
PhaseFlow (parent)
├── GlassHeader (hidden for loading/diagnosis/AI moments with hideProgressBar)
├── StepProgress (section-based with label)
├── MultipleChoiceStepContent (Q1-Q12, Q15-Q18)
├── MultiSelectStepContent (Q13)
├── LongAnswerStepContent (Q14 - open-ended)
├── AIMomentStepContent (AI Moments 1-4)
├── ContactInfoStepContent (Contact Gate)
├── LoadingScreenStepContent (Loading)
│   ├── MentorAvatar with spinning ring
│   ├── MentorBadge
│   └── Message cycling with typing animation
└── DiagnosisSequenceFlow (Diagnosis)
    ├── Own GlassHeader
    ├── Own StepProgress (1-8)
    └── 8 markdown-rendered screens
```

See:
- `src/components/flow/screens/PhaseFlow.tsx` for navigation logic
- `src/components/flow/screens/LoadingScreenStepContent.tsx` for loading
- `src/components/flow/screens/DiagnosisSequenceFlow.tsx` for diagnosis
- `src/data/flows/growthoperator.ts` for flow definition
