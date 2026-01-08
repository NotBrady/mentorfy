# Rafael TATS Flow - End-to-End Test Plan

**Purpose:** Systematic testing of the complete Rafael TATS user journey using Playwright MCP.

**CRITICAL:** Abort on first failure. Do not continue past any failed assertion - the flow is sequential and later tests depend on earlier state.

---

## Pre-Test Setup

### 1. Start Fresh Dev Server
```bash
pnpm dev
```
Wait for server to be ready on `localhost:3000`.

### 2. Clear All State
Navigate to `localhost:3000` and execute in browser console:
```javascript
localStorage.clear();
sessionStorage.clear();
```
Refresh the page.

---

## Test Execution

### PHASE 0: Homepage Verification

**Navigate to:** `http://localhost:3000`

**Assert the following elements exist with EXACT text:**

| Element | Expected Content |
|---------|------------------|
| Headline | `Steal The Method That Seems Invisible To YOU But Keeps Me Booked Out All Year With $2k-$10k Sessions...` |
| Subheadline | `Without Spending More Than 30 Minutes A Day On Content` |
| Button | `Start Your Diagnosis` |
| Video | Wistia embed present (URL: `https://rafaeltats.wistia.com/medias/4i06zkj7fg`) |

**Action:** Click "Start Your Diagnosis" button.

---

### PHASE 1: "The Diagnosis"

#### Step 1.1 - Multiple Choice Question

**Assert question text:** `What stage is your tattoo business at now?`

**Assert ALL options present with EXACT labels:**
- `Fully booked out 3+ months`
- `Booked out 1-2 months`
- `Booked out about 1 month`
- `Booked out 1-2 weeks`
- `Bookings are inconsistent`

**Action:** Select any option (e.g., "Bookings are inconsistent"). Click continue/submit.

---

#### Step 1.2 - Multiple Choice Question

**Assert question text:** `What's your day rate?`

**Assert ALL options present with EXACT labels:**
- `$4k+`
- `$3k - $4k`
- `$2k - $3k`
- `$1k - $2k`
- `$500 - $1k`
- `Under $500`

**Action:** Select any option (e.g., "$1k - $2k"). Click continue/submit.

---

#### Step 1.3 - Multiple Choice Question

**Assert question text:** `What's stopping you from being booked out?`

**Assert ALL options present with EXACT labels:**
- `Posting but results are unpredictable`
- `DMs are all price shoppers`
- `No time — tattooing all day`
- `Good work but invisible`

**Action:** Select any option (e.g., "Good work but invisible"). Click continue/submit.

---

#### Step 1.4 - Contact Info Form

**Assert question text:** `What's your contact info?`

**Assert form fields present:**
- Name field with placeholder: `Your name`
- Email field with placeholder: `your@email.com`
- Phone field with placeholder: `(555) 123-4567`

**Action:** Fill in test data:
- Name: `Test User`
- Email: `test@example.com`
- Phone: `(555) 999-8888`

Click continue/submit.

---

#### Step 1.5 - Long Answer Question

**Assert question text:** `Be honest: why aren't you booked out yet?`

**Assert placeholder text:** `No wrong answer...`

**Action:** Enter text: `I struggle with consistent content creation and marketing.`

Click continue/submit.

---

#### Step 1.6 - AI Diagnosis Moment

**Assert:** AI response appears (text content from the AI based on answers).

**Assert:** Continue button is visible.

**Action:** Click continue button.

---

#### Step 1.7 - Phase 1 Completion

**Assert:** Congratulations/completion screen for Phase 1 is displayed.

**Assert:** Continue button is visible.

**Action:** Click continue to proceed to chat.

---

### CHECKPOINT 1: Chat - No Booking Widget (Phase 1 Complete)

**Assert:** Chat interface is displayed.

**Action:** Type and send message: `book me`

**Assert:** AI responds with text.

**CRITICAL ASSERT:** Response MUST NOT contain a Calendly booking widget/embed. The booking tool should NOT be available yet (only unlocks after Phase 4).

**Action:** Navigate back to continue Phase 2 (click "Continue to Phase 2" or equivalent).

---

### PHASE 2: "Get Booked Without Going Viral"

#### Step 2.1 - Multiple Choice Question

**Assert question text:** `What do you check first after posting?`

**Assert ALL options present with EXACT labels:**
- `Views and likes`
- `Follower count`
- `Comments and DMs`
- `Saves and shares`

**Action:** Select any option (e.g., "Views and likes"). Click continue/submit.

---

#### Step 2.2 - Multiple Choice Question

**Assert question text:** `If you had 100k followers, what would change?`

**Assert ALL options present with EXACT labels:**
- `Finally be consistently booked`
- `Charge more`
- `Probably not much`
- `Feel like I made it`

**Action:** Select any option (e.g., "Finally be consistently booked"). Click continue/submit.

---

#### Step 2.3 - Multiple Choice Question

**Assert question text:** `When does a post feel like it worked?`

**Assert ALL options present with EXACT labels:**
- `Gets over 10k views`
- `Gets lots of comments`
- `Someone DMs about booking`
- `Nothing feels consistent`

**Action:** Select any option (e.g., "Someone DMs about booking"). Click continue/submit.

---

#### Step 2.4 - Long Answer Question

**Assert question text:** `What would change if views didn't matter?`

**Assert placeholder text:** `Think about it...`

**Action:** Enter text: `I would focus more on quality connections with potential clients.`

Click continue/submit.

---

#### Step 2.5 - AI Diagnosis Moment

**Assert:** AI response appears (should incorporate context from Phase 1 AND Phase 2 answers).

**Assert:** Continue button is visible.

**Action:** Click continue button.

---

#### Step 2.6 - Phase 2 Completion

**Assert:** Congratulations/completion screen for Phase 2 is displayed.

**Assert:** Continue button is visible.

**Action:** Click continue to proceed to chat.

---

### CHECKPOINT 2: Chat - No Booking Widget (Phase 2 Complete)

**Assert:** Chat interface is displayed.

**Action:** Type and send message: `book me`

**Assert:** AI responds with text.

**CRITICAL ASSERT:** Response MUST NOT contain a Calendly booking widget/embed. Booking is still locked (requires Phase 4 completion).

**Action:** Navigate back to continue Phase 3.

---

### PHASE 3: "The 30-Minute Content System"

#### Step 3.1 - Multiple Choice Question

**Assert question text:** `How much time on content each week?`

**Assert ALL options present with EXACT labels:**
- `Almost none`
- `1-2 hours`
- `3-5 hours`
- `5+ hours`

**Action:** Select any option (e.g., "1-2 hours"). Click continue/submit.

---

#### Step 3.2 - Multiple Choice Question

**Assert question text:** `Hardest part about content?`

**Assert ALL options present with EXACT labels:**
- `Don't know what to post`
- `No time`
- `Awkward on camera`
- `Nothing converts`

**Action:** Select any option (e.g., "Don't know what to post"). Click continue/submit.

---

#### Step 3.3 - Multiple Choice Question

**Assert question text:** `Do you see yourself as a content creator?`

**Assert ALL options present with EXACT labels:**
- `No, I'm an artist`
- `Kind of`
- `Yeah, part of the game`
- `Never thought about it`

**Action:** Select any option (e.g., "No, I'm an artist"). Click continue/submit.

---

#### Step 3.4 - Long Answer Question

**Assert question text:** `What would you do with 5 extra hours a week?`

**Assert placeholder text:** `Be specific...`

**Action:** Enter text: `Spend more time perfecting my craft and maybe take on a passion project.`

Click continue/submit.

---

#### Step 3.5 - AI Diagnosis Moment

**Assert:** AI response appears (should incorporate context from Phases 1, 2, AND 3).

**Assert:** Continue button is visible.

**Action:** Click continue button.

---

#### Step 3.6 - Phase 3 Completion

**Assert:** Congratulations/completion screen for Phase 3 is displayed.

**Assert:** Continue button is visible.

**Action:** Click continue to proceed to chat.

---

### CHECKPOINT 3: Chat - No Booking Widget (Phase 3 Complete)

**Assert:** Chat interface is displayed.

**Action:** Type and send message: `book me`

**Assert:** AI responds with text.

**CRITICAL ASSERT:** Response MUST NOT contain a Calendly booking widget/embed. Booking is still locked (requires Phase 4 completion).

**Action:** Navigate back to continue Phase 4.

---

### PHASE 4: "Double Your Revenue"

#### Step 4.1 - Multiple Choice Question

**Assert question text:** `Last time you raised prices?`

**Assert ALL options present with EXACT labels:**
- `Within 3 months`
- `6 months ago`
- `Over a year`
- `Never`

**Action:** Select any option (e.g., "Over a year"). Click continue/submit.

---

#### Step 4.2 - Multiple Choice Question

**Assert question text:** `When someone says 'too expensive'?`

**Assert ALL options present with EXACT labels:**
- `Offer a discount`
- `Explain why I'm worth it`
- `Let them walk`
- `Panic and give in`

**Action:** Select any option (e.g., "Explain why I'm worth it"). Click continue/submit.

---

#### Step 4.3 - Multiple Choice Question

**Assert question text:** `Biggest fear about raising prices?`

**Assert ALL options present with EXACT labels:**
- `Lose clients`
- `Look greedy`
- `Not worth more yet`
- `No fear, just don't know how`

**Action:** Select any option (e.g., "Lose clients"). Click continue/submit.

---

#### Step 4.4 - Long Answer Question

**Assert question text:** `What would you do with double the revenue?`

**Assert placeholder text:** `Dream big...`

**Action:** Enter text: `Open my own studio and hire an apprentice.`

Click continue/submit.

---

#### Step 4.5 - AI Diagnosis Moment

**Assert:** AI response appears (should incorporate context from ALL phases).

**Assert:** Continue button is visible.

**Action:** Click continue button.

---

#### Step 4.6 - Sales Page

**Assert headline:** `You're a great fit for 1-on-1.`

**Assert copy above Calendly includes text:**
```
Based on everything you've shared, I think you'd benefit from working with me directly.

This isn't for everyone. But you've done the work. You understand the framework. Now you need someone to look at your specific situation and tell you exactly what to do.

That's what these calls are for.
```

**Assert:** Calendly booking widget is embedded (URL: `https://calendly.com/brady-mentorfy/30min`).

**Assert copy below Calendly includes text:**
```
Here's how it works:

Book a 30-minute call with my team. We'll look at where you are, where you want to be, and whether working together makes sense.

No pressure. If it's not the right fit, we'll tell you — and point you in the right direction.

If it is the right fit, we'll map out exactly what working together would look like.

This is for artists who are serious about making the jump. If that's you, grab a time:
```

**Assert:** "Continue without booking" option is visible below the Calendly widget.

**Action:** Scroll down and click "Continue without booking" (or equivalent skip option).

---

### CHECKPOINT 4: Chat - Booking Widget NOW Available (Phase 4 Complete)

**Assert:** Chat interface is displayed.

**Action:** Type and send message: `book me`

**Assert:** AI responds with text.

**CRITICAL ASSERT:** Response MUST contain a Calendly booking widget/embed. The booking tool is NOW available after completing Phase 4.

---

## Test Complete

If all assertions pass, the Rafael TATS flow is working correctly.

---

## Issue Reporting Format

When an assertion fails, report using this format:

```
## FAILED: [Phase X, Step Y or Checkpoint N]

**Expected:** [What should have happened]
**Actual:** [What actually happened]
**Screenshot:** [If applicable]
**Console Errors:** [Any JS errors]
```

---

## Summary of Critical Checkpoints

| Checkpoint | Phase Completed | "book me" Result |
|------------|-----------------|------------------|
| 1 | Phase 1 | NO booking widget |
| 2 | Phase 2 | NO booking widget |
| 3 | Phase 3 | NO booking widget |
| 4 | Phase 4 | YES booking widget |

The booking widget ONLY unlocks after Phase 4 completion. This is the primary gate being tested.
