import type { FlowDefinition } from './types'

export const growthoperatorFlow: FlowDefinition = {
  id: 'growthoperator',

  mentor: {
    name: 'Brady Badour',
    handle: '@growthoperator',
    avatar: '/brady.jpg',
    welcome: {
      callout: "If online business still hasn't worked for you YET...",
      headline: "It's not your fault. It's not the model. There's something you haven't been told.",
      subheadline: "Take this AI assessment to find out what's actually been in your way.",
      buttonText: 'Start Assessment',
      disclaimer: "Warning: This experience adapts based on your answers. Answer honestly... your diagnosis depends on it.",
    },
  },

  agents: {
    chat: { model: 'claude-haiku-4-5-20251001', maxTokens: 1024, temperature: 0.7 },
    diagnosis: { model: 'claude-opus-4-5-20251101', maxTokens: 4096 },
    summary: { model: 'claude-haiku-4-5-20251001', maxTokens: 1024 },
  },

  embeds: {
    calendlyUrl: 'https://calendly.com/brady-mentorfy/30min',
  },

  webhookUrl: process.env.GROWTHOPERATOR_WEBHOOK_URL,
  webhookFormat: 'slack',

  // Maps session context paths to semantic AI-friendly paths for diagnosis
  // Format: { outputPath: inputPath } - AI receives data at outputPath
  contextMapping: {
    // Section 1: The Dream + Gap
    'assessment.whyHere': 'assessment.whyHere',
    'assessment.desiredIncome': 'assessment.desiredIncome',
    'assessment.currentIncome': 'assessment.currentIncome',
    'assessment.modelsTried': 'assessment.modelsTried',
    'assessment.modelsCount': 'assessment.modelsCount',
    // Section 2: The Weight
    'assessment.duration': 'assessment.duration',
    'assessment.totalInvestment': 'assessment.totalInvestment',
    'assessment.availableCapital': 'assessment.availableCapital',
    'assessment.deeperCost': 'assessment.deeperCost',
    // Section 3: The Pattern + Constellation
    'assessment.positionInEquation': 'assessment.positionInEquation',
    'assessment.teacherMoney': 'assessment.teacherMoney',
    'assessment.aiRelationship': 'assessment.aiRelationship',
    'assessment.thoughtConstellation': 'assessment.thoughtConstellation',
    // Section 4: The Confession
    'assessment.confession': 'assessment.confession',
    // Section 5: Stakes + Fear
    'assessment.whyKeepGoing': 'assessment.whyKeepGoing',
    'assessment.whatWouldChange': 'assessment.whatWouldChange',
    'assessment.urgency': 'assessment.urgency',
    'assessment.biggestFear': 'assessment.biggestFear',
    // Contact
    'user.name': 'user.name',
    'user.email': 'user.email',
    'user.phone': 'user.phone',
  },

  phases: [
    {
      id: 1,
      name: 'Assessment',
      steps: [
        // ============================================================
        // SECTION 1: THE DREAM + GAP
        // Progress Bar Label: "Your Situation"
        // ============================================================

        // Q1: Why are you here?
        {
          stepKey: 'q1-why-here',
          type: 'question',
          questionType: 'multiple-choice',
          question: "Why are you here?",
          options: [
            { value: 'figuring-out', label: "I'm still trying to figure this online business thing out" },
            { value: 'tried-didnt-work', label: "I've tried things that didn't work and I'm looking for what will" },
            { value: 'stuck', label: "I'm stuck and I need a new direction" },
            { value: 'something-told-me', label: 'Something told me to click... so here I am' },
          ],
          stateKey: 'assessment.whyHere',
          sectionLabel: 'Your Situation',
          sectionIndex: 0,
        },

        // Q2: Desired income
        {
          stepKey: 'q2-desired-income',
          type: 'question',
          questionType: 'multiple-choice',
          question: "If this actually worked... what would you want to be making?",
          options: [
            { value: '5k', label: '$5,000/month — enough to breathe' },
            { value: '10k', label: '$10,000/month — real freedom starts here' },
            { value: '25k', label: '$25,000/month — life changing money' },
            { value: '50k', label: '$50,000/month — a completely different life' },
            { value: '100k+', label: '$100,000+/month — the big dream' },
          ],
          stateKey: 'assessment.desiredIncome',
          sectionLabel: 'Your Situation',
          sectionIndex: 0,
        },

        // Q3: Current income
        {
          stepKey: 'q3-current-income',
          type: 'question',
          questionType: 'multiple-choice',
          question: "What are you actually making right now?",
          options: [
            { value: '<1k', label: 'Less than $1,000/month' },
            { value: '1k-3k', label: '$1,000 - $3,000/month' },
            { value: '3k-5k', label: '$3,000 - $5,000/month' },
            { value: '5k-10k', label: '$5,000 - $10,000/month' },
            { value: '10k+', label: 'Over $10,000/month' },
          ],
          stateKey: 'assessment.currentIncome',
          sectionLabel: 'Your Situation',
          sectionIndex: 0,
        },

        // Q4: What have you tried?
        {
          stepKey: 'q4-models-tried',
          type: 'question',
          questionType: 'multiple-choice',
          question: "What have you actually tried?",
          options: [
            { value: 'ecommerce', label: 'Ecommerce — dropshipping, Amazon, print on demand' },
            { value: 'agency', label: 'Agency or services — SMMA, freelancing, lead gen, AI automation' },
            { value: 'sales', label: 'Sales — closing, setting, remote sales roles' },
            { value: 'content', label: 'Content — YouTube, TikTok, podcasts, newsletters' },
            { value: 'coaching', label: 'Coaching or courses — selling what you know' },
            { value: 'affiliate', label: 'Affiliate — promoting other people\'s stuff' },
            { value: 'software', label: 'Software — SaaS, apps, no-code tools' },
            { value: 'trading', label: 'Trading or investing — crypto, forex, stocks' },
            { value: 'nothing-serious', label: "I haven't really tried anything seriously yet" },
          ],
          stateKey: 'assessment.modelsTried',
          sectionLabel: 'Your Situation',
          sectionIndex: 0,
        },

        // Q5: How many models?
        {
          stepKey: 'q5-models-count',
          type: 'question',
          questionType: 'multiple-choice',
          question: "How many different things have you actually gone all-in on?",
          options: [
            { value: '1', label: 'Just one thing so far' },
            { value: '2-3', label: '2-3 different models' },
            { value: '4-5', label: '4-5 different models' },
            { value: '5+', label: "More than 5... I've been searching for a while" },
          ],
          stateKey: 'assessment.modelsCount',
          sectionLabel: 'Your Situation',
          sectionIndex: 0,
        },

        // AI MOMENT 1: Recognition + Forward Pull
        {
          stepKey: 'ai-moment-1',
          type: 'ai-moment',
          promptKey: 'ai-moment-1',
          noBackButton: true,
          endsSection: true,
          sectionIndex: 0,
        },

        // ============================================================
        // SECTION 2: THE WEIGHT
        // Progress Bar Label: "Your Journey"
        // ============================================================

        // Q6: Duration
        {
          stepKey: 'q6-duration',
          type: 'question',
          questionType: 'multiple-choice',
          question: "How long have you been trying to make this work?",
          options: [
            { value: '<6mo', label: 'Less than 6 months' },
            { value: '6mo-1yr', label: '6 months to a year' },
            { value: '1-2yr', label: '1-2 years' },
            { value: '2-3yr', label: '2-3 years' },
            { value: '3-5yr', label: '3-5 years' },
            { value: '5yr+', label: 'More than 5 years' },
          ],
          stateKey: 'assessment.duration',
          sectionLabel: 'Your Journey',
          sectionIndex: 1,
        },

        // Q7: Total investment
        {
          stepKey: 'q7-investment',
          type: 'question',
          questionType: 'multiple-choice',
          question: "When you add it all up — courses, coaching, tools, ads, everything — how much have you put on the line?",
          options: [
            { value: '<500', label: 'Less than $500' },
            { value: '500-2k', label: '$500 - $2,000' },
            { value: '2k-5k', label: '$2,000 - $5,000' },
            { value: '5k-10k', label: '$5,000 - $10,000' },
            { value: '10k-25k', label: '$10,000 - $25,000' },
            { value: '25k+', label: 'More than $25,000' },
          ],
          stateKey: 'assessment.totalInvestment',
          sectionLabel: 'Your Journey',
          sectionIndex: 1,
        },

        // Q8: Available capital (PERSONALIZED)
        {
          stepKey: 'q8-available-capital',
          type: 'question',
          questionType: 'multiple-choice',
          question: "How much do you actually have available right now to put toward finally making this work?",
          baseQuestion: "How much do you actually have available right now to put toward finally making this work?",
          personalizePromptKey: 'q8-personalize',
          options: [
            { value: '<1k', label: 'Less than $1,000' },
            { value: '1k-3k', label: '$1,000 - $3,000' },
            { value: '3k-5k', label: '$3,000 - $5,000' },
            { value: '5k-10k', label: '$5,000 - $10,000' },
            { value: '10k+', label: 'More than $10,000' },
          ],
          stateKey: 'assessment.availableCapital',
          sectionLabel: 'Your Journey',
          sectionIndex: 1,
        },

        // Q9: Deeper cost
        {
          stepKey: 'q9-deeper-cost',
          type: 'question',
          questionType: 'multiple-choice',
          question: "What has this cost you beyond money?",
          options: [
            { value: 'time', label: "Time I'm never getting back" },
            { value: 'confidence', label: 'Confidence in myself' },
            { value: 'relationships', label: 'Relationships — strain with people who matter' },
            { value: 'opportunities', label: 'Other opportunities I let pass' },
            { value: 'peace', label: 'My peace of mind' },
            { value: 'all', label: 'All of the above' },
          ],
          stateKey: 'assessment.deeperCost',
          sectionLabel: 'Your Journey',
          sectionIndex: 1,
        },

        // AI MOMENT 2: Validation + Pattern Tease
        {
          stepKey: 'ai-moment-2',
          type: 'ai-moment',
          promptKey: 'ai-moment-2',
          noBackButton: true,
          endsSection: true,
          sectionIndex: 1,
        },

        // ============================================================
        // SECTION 3: THE PATTERN + CONSTELLATION
        // Progress Bar Label: "Going Deeper"
        // ============================================================

        // Q10: Position in equation
        {
          stepKey: 'q10-position',
          type: 'question',
          questionType: 'multiple-choice',
          question: "In the things you've tried... where were YOU in the equation?",
          options: [
            { value: 'expert', label: 'I was trying to be the expert — the one with the knowledge and credibility' },
            { value: 'marketer', label: 'I was trying to be the marketer — getting attention, building an audience' },
            { value: 'everything', label: 'I was doing everything myself — expert, marketer, operator, all of it' },
            { value: 'someone-elses', label: "I was working in someone else's system — their business, their rules" },
            { value: 'never-thought', label: 'I never really thought about where I was positioned' },
          ],
          stateKey: 'assessment.positionInEquation',
          sectionLabel: 'Going Deeper',
          sectionIndex: 2,
        },

        // Q11: Teacher money
        {
          stepKey: 'q11-teacher-money',
          type: 'question',
          questionType: 'multiple-choice',
          question: "The people who taught you this stuff... how did THEY make most of their money?",
          options: [
            { value: 'teaching', label: 'Teaching it — courses, coaching, content about the thing' },
            { value: 'doing', label: 'Actually doing it — making money from the business model itself' },
            { value: 'both', label: 'Both — doing it AND teaching it' },
            { value: 'never-thought', label: 'I never really thought about it' },
            { value: 'self-taught', label: 'I mostly taught myself' },
          ],
          stateKey: 'assessment.teacherMoney',
          sectionLabel: 'Going Deeper',
          sectionIndex: 2,
        },

        // Q12: AI relationship
        {
          stepKey: 'q12-ai-relationship',
          type: 'question',
          questionType: 'multiple-choice',
          question: "How has AI changed how you think about all of this?",
          options: [
            { value: 'uncertain', label: 'Everything feels more uncertain now' },
            { value: 'opportunity', label: "I see opportunity but I don't know how to capture it" },
            { value: 'left-behind', label: "I'm worried about being left behind" },
            { value: 'hype', label: "I think it's mostly hype — things haven't really changed" },
            { value: 'where-i-fit', label: "I'm trying to figure out where I fit in the new landscape" },
          ],
          stateKey: 'assessment.aiRelationship',
          sectionLabel: 'Going Deeper',
          sectionIndex: 2,
        },

        // Q13: Thought constellation (MULTI-SELECT)
        {
          stepKey: 'q13-constellation',
          type: 'question',
          questionType: 'multi-select',
          question: "Which of these thoughts have actually crossed your mind?",
          instruction: "Select all that apply",
          options: [
            { value: 'not-smart-enough', label: '"Maybe I\'m just not smart enough for this"' },
            { value: 'wasted-time', label: '"I\'ve wasted so much time"' },
            { value: 'everyone-else', label: '"Everyone else seems to figure it out except me"' },
            { value: 'same-place-5yr', label: '"What if I\'m still in the same place in 5 years?"' },
            { value: 'normal-job', label: '"I should have just gotten a normal job"' },
            { value: 'cant-give-up', label: '"I can\'t give up now — I\'ve already put too much in"' },
            { value: 'something-missing', label: '"There has to be something I\'m missing"' },
            { value: 'game-rigged', label: '"The game feels rigged"' },
          ],
          stateKey: 'assessment.thoughtConstellation',
          sectionLabel: 'Going Deeper',
          sectionIndex: 2,
        },

        // AI MOMENT 3: Insight Delivery + Pre-Frame
        {
          stepKey: 'ai-moment-3',
          type: 'ai-moment',
          promptKey: 'ai-moment-3',
          noBackButton: true,
          endsSection: true,
          sectionIndex: 2,
        },

        // ============================================================
        // SECTION 4: THE CONFESSION
        // ============================================================

        // Q14: The confession (OPEN-ENDED)
        {
          stepKey: 'q14-confession',
          type: 'question',
          questionType: 'open-ended',
          question: "In one sentence... what's the most frustrating part of this whole journey that you don't really talk about?",
          placeholder: "Type your answer here...",
          stateKey: 'assessment.confession',
          sectionLabel: 'The Confession',
          noBackButton: true,
          sectionIndex: 3,
        },

        // AI MOMENT 4: Acknowledgment + Bridge
        {
          stepKey: 'ai-moment-4',
          type: 'ai-moment',
          promptKey: 'ai-moment-4',
          noBackButton: true,
          endsSection: true,
          sectionIndex: 3,
        },

        // ============================================================
        // SECTION 5: THE STAKES + FEAR
        // Progress Bar Label: "What's At Stake"
        // ============================================================

        // Q15: What's kept you going
        {
          stepKey: 'q15-why-going',
          type: 'question',
          questionType: 'multiple-choice',
          question: "Despite everything... what's kept you going?",
          options: [
            { value: 'seen-others', label: "I've seen other people make it work — I know it's possible" },
            { value: 'refuse-normal', label: 'I refuse to go back to "normal" — that\'s not an option for me' },
            { value: 'no-backup', label: "I don't have a backup plan — I need this to work" },
            { value: 'believe', label: "I still believe I'll figure it out eventually" },
            { value: 'cant-let-go', label: "I can't explain it — something in me just won't let go" },
          ],
          stateKey: 'assessment.whyKeepGoing',
          sectionLabel: "What's At Stake",
          sectionIndex: 4,
        },

        // Q16: What would change
        {
          stepKey: 'q16-what-changes',
          type: 'question',
          questionType: 'multiple-choice',
          question: "If this actually worked... what would change first?",
          options: [
            { value: 'quit-job', label: "I'd quit my job" },
            { value: 'stop-stress', label: "I'd stop stressing about money all the time" },
            { value: 'made-it', label: "I'd finally feel like I actually made it" },
            { value: 'freedom', label: "I'd have real freedom — my time would be mine" },
            { value: 'take-care', label: "I'd be able to take care of the people I love" },
            { value: 'everything', label: 'Honestly? Everything would change' },
          ],
          stateKey: 'assessment.whatWouldChange',
          sectionLabel: "What's At Stake",
          sectionIndex: 4,
        },

        // Q17: Urgency
        {
          stepKey: 'q17-urgency',
          type: 'question',
          questionType: 'multiple-choice',
          question: "How urgent is this for you?",
          options: [
            { value: 'patient', label: "I'm patient — I just want to find the right thing" },
            { value: '6mo', label: 'I want real progress in the next 6 months' },
            { value: 'this-year', label: 'I need something to work this year' },
            { value: 'urgent', label: "It's urgent — I'm running out of time or money or both" },
            { value: 'ready-now', label: "I'm ready to move now — I'm done waiting" },
          ],
          stateKey: 'assessment.urgency',
          sectionLabel: "What's At Stake",
          sectionIndex: 4,
        },

        // Q18: Biggest fear
        {
          stepKey: 'q18-fear',
          type: 'question',
          questionType: 'multiple-choice',
          question: "What are you most afraid of?",
          options: [
            { value: 'stuck', label: "I'm afraid I'll still be stuck in the same place a year from now" },
            { value: 'waste-money', label: "I'm afraid I'll waste more money on something that doesn't work" },
            { value: 'left-behind', label: "I'm afraid everyone else will figure it out and I'll get left behind" },
            { value: 'give-up', label: "I'm afraid I'll eventually have to give up on this whole dream" },
            { value: 'not-cut-out', label: "I'm afraid that maybe I'm just not cut out for this" },
          ],
          stateKey: 'assessment.biggestFear',
          sectionLabel: "What's At Stake",
          sectionIndex: 4,
        },

        // ============================================================
        // CONTACT CAPTURE
        // ============================================================
        {
          stepKey: 'contact-gate',
          type: 'question',
          questionType: 'contact-info',
          question: "Now I've got what I need.\n\nI'm working on putting together your diagnosis right now.\n\nEnter your contact info below so I can show you what's actually going on...",
          fields: [
            { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
            { key: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 123-4567', autoComplete: 'tel' },
          ],
          stateKey: 'user',
          sectionLabel: 'Almost There',
          sectionIndex: 5,
          noBackButton: true,
        },

        // ============================================================
        // LOADING SCREEN
        // ============================================================
        {
          stepKey: 'loading-diagnosis',
          type: 'loading',
          loadingMessages: {
            initial: [
              'Analyzing your responses...',
              'Identifying patterns in your journey...',
              'This is interesting...',
              'Connecting the dots...',
              'I see what happened here...',
              'Preparing your diagnosis...',
            ],
            waiting: [
              'Almost there...',
              'Just a moment longer...',
              'Putting the finishing touches...',
              'This is taking a bit longer than usual...',
              'Still working on it...',
              'Hang tight...',
            ],
            ready: "Alright it's ready... let's dive in.",
          },
          minDuration: 12000,
          noBackButton: true,
          hideProgressBar: true,
        },

        // ============================================================
        // DIAGNOSIS SEQUENCE (8 Screens)
        // ============================================================
        {
          stepKey: 'diagnosis-sequence',
          type: 'diagnosis-sequence',
          promptKey: 'diagnosis-comprehensive',
          noBackButton: true,
          hideProgressBar: true,
        },
      ],
    },
  ],
}
