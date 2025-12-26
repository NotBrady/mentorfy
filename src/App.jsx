import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RAFAEL_IMAGE = '/rafael.jpg'

const QUESTIONS = [
  {
    id: 'stage',
    question: "What stage is your tattoo business at now?",
    options: [
      "Fully booked out 3+ months",
      "Booked out 1-2 months",
      "Booked out 1 month",
      "Booked out 1-2 weeks",
      "Bookings are inconsistent"
    ]
  },
  {
    id: 'dayRate',
    question: "What's your day rate?",
    options: [
      "$4k+",
      "$3k - $4k",
      "$2k - $3k",
      "$1k - $2k",
      "$500 - $1k",
      "Under $500"
    ]
  },
  {
    id: 'goal',
    question: "Where do you want to be in 3-6 months?",
    options: [
      "Hitting $30k-$50k months consistently",
      "Booked out 1-2 months in advance",
      "No more empty chair days",
      "Attracting clients who pay my full rate",
      "Building a brand that brings clients to me"
    ]
  },
  {
    id: 'obstacle',
    question: "What's stopping you from being there now?",
    options: [
      "I've been posting but my results are unpredictable",
      "I'm getting DMs but they're all price shoppers who can't afford me",
      "I don't have time because I'm tattooing all day",
      "I don't actually know who my ideal client is",
      "My work is good enough but I'm just invisible"
    ]
  }
]

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
}

function RafaelAvatar({ size = 'md', showOnline = false }) {
  const [imgError, setImgError] = useState(false)

  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }

  const onlineDotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5'
  }

  const onlineDotPosition = {
    sm: 'bottom-0 right-0',
    md: 'bottom-0 right-0',
    lg: 'bottom-0.5 right-0.5',
    xl: 'bottom-1 right-1'
  }

  return (
    <div className="relative inline-flex">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden`}
        style={{ border: '1px solid var(--color-border)' }}
      >
        {imgError ? (
          <div className="w-full h-full bg-[#000] flex items-center justify-center">
            <span className={`text-white font-medium ${textSizes[size]}`}>R</span>
          </div>
        ) : (
          <img
            src={RAFAEL_IMAGE}
            alt="Rafael"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      {showOnline && (
        <span
          className={`absolute ${onlineDotPosition[size]} ${onlineDotSizes[size]} rounded-full border-2 border-white`}
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      )}
    </div>
  )
}

function ProgressIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="progress-dot"
          style={{
            width: i === current ? '24px' : '6px',
            height: '6px',
            borderRadius: '9999px',
            backgroundColor: i < current
              ? 'var(--color-accent)'
              : i === current
                ? 'var(--color-text-primary)'
                : 'var(--color-border)',
            transition: 'all 200ms ease-out'
          }}
        />
      ))}
    </div>
  )
}

function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center px-6 pt-16 pb-12"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <RafaelAvatar size="lg" />
        </div>

        <p className="text-sm font-medium tracking-widest uppercase mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Rafael AI
        </p>

        <h1 className="text-[32px] md:text-[40px] leading-[1.15] font-semibold tracking-tight mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Steal The Method That Seems Invisible To YOU But Keeps Me Booked Out All Year With $2k-$10k Sessions...
        </h1>

        <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--color-text-secondary)' }}>
          Without Spending More Than 30 Minutes A Day On Content
        </p>

        <button
          onClick={onStart}
          className="btn-primary w-full"
        >
          Start Session
        </button>

        <p className="mt-10 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Trusted by 500+ tattoo artists
        </p>
      </div>
    </motion.div>
  )
}

function QuestionScreen({ question, options, onSelect, onBack, current, total }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative mb-8">
        <button
          onClick={onBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 -ml-2 transition-opacity hover:opacity-60"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <ProgressIndicator current={current - 1} total={total} />
      </div>

      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full">
        <RafaelAvatar size="md" />

        <h2 className="text-[24px] md:text-[28px] leading-[1.3] font-semibold tracking-tight text-center mt-8 mb-10" style={{ color: 'var(--color-text-primary)' }}>
          {question}
        </h2>

        <div className="w-full space-y-3">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className="card-interactive w-full text-left text-[15px] font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function OpenTextScreen({ question, placeholder, buttonText, onSubmit, onBack, current, total }) {
  const [value, setValue] = useState('')

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {total && (
        <div className="relative mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 -ml-2 transition-opacity hover:opacity-60"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <ProgressIndicator current={current - 1} total={total} />
        </div>
      )}

      <div className={`flex-1 flex flex-col items-center max-w-md mx-auto w-full ${!total ? 'pt-8' : ''}`}>
        <RafaelAvatar size="md" />

        <h2 className="text-[24px] md:text-[28px] leading-[1.3] font-semibold tracking-tight text-center mt-8 mb-10" style={{ color: 'var(--color-text-primary)' }}>
          {question}
        </h2>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="input resize-none"
          style={{ height: '144px' }}
        />

        <button
          onClick={() => value.trim() && onSubmit(value)}
          disabled={!value.trim()}
          className="btn-primary w-full mt-6"
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  )
}

function ContactScreen({ onSubmit, onBack }) {
  const [form, setForm] = useState({ firstName: '', email: '', phone: '' })
  const isValid = form.firstName.trim() && form.email.trim()

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 -ml-2 transition-opacity hover:opacity-60"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <ProgressIndicator current={5} total={6} />
      </div>

      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full">
        <RafaelAvatar size="md" />

        <h2 className="text-[24px] md:text-[28px] leading-[1.3] font-semibold tracking-tight text-center mt-8 mb-10" style={{ color: 'var(--color-text-primary)' }}>
          Where should I send your diagnostic?
        </h2>

        <div className="w-full space-y-3">
          <input
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />
          <input
            type="tel"
            placeholder="Phone number (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input"
          />
        </div>

        <button
          onClick={() => isValid && onSubmit(form)}
          disabled={!isValid}
          className="btn-primary w-full mt-6"
        >
          Get My Diagnostic
        </button>
      </div>
    </motion.div>
  )
}

function AIScreen({ title, content, buttonText, onContinue, isLoading }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-8"
      style={{ backgroundColor: 'var(--color-bg-subtle)' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full pt-8">
        <RafaelAvatar size="lg" />
        <p className="text-xs font-medium tracking-widest uppercase mt-4" style={{ color: 'var(--color-text-muted)' }}>
          Rafael AI
        </p>

        {title && (
          <h2 className="text-sm font-medium tracking-wide text-center mt-6" style={{ color: 'var(--color-text-muted)' }}>
            {title}
          </h2>
        )}

        <div className="w-full flex-1 mt-8 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <div
                className="w-5 h-5 rounded-full animate-spin"
                style={{ border: '2px solid var(--color-border)', borderTopColor: 'var(--color-text-primary)' }}
              />
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Rafael is thinking...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[16px] leading-[1.8] whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)' }}>
                {content}
              </p>
            </motion.div>
          )}
        </div>

        {!isLoading && content && (
          <button
            onClick={onContinue}
            className="btn-primary w-full mt-8"
          >
            {buttonText}
          </button>
        )}
      </div>
    </motion.div>
  )
}

function LevelsScreen({ firstName }) {
  const levels = [
    { num: 1, title: "Onboarding", status: "completed" },
    { num: 2, title: "Premium Pricing", status: "current" },
    { num: 3, title: "Sales Psychology", status: "locked" },
    { num: 4, title: '"Booked Out" Funnel', status: "locked" },
    { num: 5, title: "ICM Playbook", status: "locked" },
    { num: 6, title: "Graduation Call With Rafael", status: "locked" }
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center max-w-md mx-auto w-full">
        <RafaelAvatar size="md" />

        <h1 className="text-[24px] font-semibold tracking-tight text-center mt-6" style={{ color: 'var(--color-text-primary)' }}>
          Welcome back, {firstName}
        </h1>

        <div className="w-full mt-12 space-y-3">
          {levels.map((level, i) => (
            <motion.div
              key={level.num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              className={`level-card ${level.status}`}
            >
              <div className={`level-badge ${level.status}`}>
                {level.status === 'completed' ? '✓' : level.num}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-medium text-[15px]"
                  style={{ color: level.status === 'locked' ? 'var(--color-text-muted)' : 'var(--color-text-primary)' }}
                >
                  Level {level.num}
                </p>
                <p
                  className="text-sm truncate"
                  style={{ color: level.status === 'locked' ? 'var(--color-text-muted)' : 'var(--color-text-secondary)' }}
                >
                  {level.title}
                </p>
              </div>

              {level.status === 'locked' && (
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-border)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}

              {level.status === 'current' && (
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-md flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-text-primary)', color: 'white' }}
                >
                  START
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

async function callClaude(systemPrompt, userContext) {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userContext })
  })

  if (!response.ok) throw new Error('Failed to get AI response')
  const data = await response.json()
  return data.content
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [aiResponses, setAiResponses] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleQuestionAnswer = (answer) => {
    const questionId = QUESTIONS[questionIndex].id
    setAnswers({ ...answers, [questionId]: answer })

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setScreen('honestQuestion')
    }
  }

  const handleHonestAnswer = (answer) => {
    setAnswers({ ...answers, honestAnswer: answer })
    setScreen('contact')
  }

  const handleContactSubmit = async (contact) => {
    const updatedAnswers = { ...answers, ...contact }
    setAnswers(updatedAnswers)
    setScreen('diagnosis')
    setIsLoading(true)

    try {
      const systemPrompt = `You are Rafael, a tattoo artist from South Florida who went from struggling to charging $2k-$10k sessions and being booked out all year. You're direct, real, and you've been where they are.

The user just completed a diagnostic. Here's what they shared:
- Business stage: ${updatedAnswers.stage}
- Day rate: ${updatedAnswers.dayRate}
- Goal: ${updatedAnswers.goal}
- What's stopping them: ${updatedAnswers.obstacle}
- What they tell themselves about why they're not there yet: ${updatedAnswers.honestAnswer}

Write a diagnosis that makes them feel SEEN for the first time. Not a summary — an interpretation. Name the pattern you see. Be specific to their situation.

Rules:
- 150-250 words max
- No bullet points or lists
- Speak directly to them (use "you")
- Be warm but direct. No fluff.
- Don't give advice yet — just name what's going on
- End with something that creates relief, like "This isn't a you problem. This is a visibility problem. And that's fixable."`

      const content = await callClaude(systemPrompt, updatedAnswers)
      setAiResponses({ ...aiResponses, diagnosis: content })
    } catch (error) {
      console.error('AI Error:', error)
      setAiResponses({ ...aiResponses, diagnosis: "Look, I see exactly what's going on here. You're doing the work, putting in the hours, and your art is genuinely good. But you're stuck in a pattern I see all the time with talented artists — you're trading time for money and hoping that being good enough will eventually get you noticed.\n\nHere's the thing: the artists who are booked out six months in advance with premium clients? They're not necessarily better than you. They just figured out something that nobody teaches us as artists — visibility isn't about posting more or working harder. It's about positioning.\n\nYou've been operating under the belief that if you just keep grinding, clients will eventually find you. And when they don't show up the way you expected, you start questioning if maybe you're just not cut out for this level. That's the trap.\n\nThis isn't a you problem. This is a visibility problem. And that's fixable." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBeliefQuestion = async (answer) => {
    const updatedAnswers = { ...answers, beliefAnswer: answer }
    setAnswers(updatedAnswers)
    setScreen('beliefShift')
    setIsLoading(true)

    try {
      const systemPrompt = `You are Rafael. The user just told you what would have to change for $30k+ months to feel inevitable.

Here's what they said: ${answer}

And here's their context from earlier:
- Business stage: ${answers.stage}
- Day rate: ${answers.dayRate}
- What they tell themselves: ${answers.honestAnswer}

Your job is to SHIFT their belief. Not with hype or empty affirmations. With truth.

Structure:
1. Name the belief they revealed ("You believe that...")
2. Validate where it came from ("That makes sense because...")
3. Reframe it ("But here's what's actually true...")
4. Create possibility ("What if...")

Rules:
- 200-300 words max
- No bullet points
- Be direct, not preachy
- Sound like a friend who sees them clearly and tells them the truth
- This should feel like a crack in the wall, not a sledgehammer`

      const content = await callClaude(systemPrompt, updatedAnswers)
      setAiResponses({ ...aiResponses, belief: content })
    } catch (error) {
      console.error('AI Error:', error)
      setAiResponses({ ...aiResponses, belief: "You believe that there's something fundamentally different about you — that the artists hitting those numbers have access to something you don't. Maybe it's connections, maybe it's luck, maybe it's some natural gift for business that you just weren't born with.\n\nThat makes sense. You've probably watched artists blow up who you know aren't as skilled as you. It can feel like there's an invisible game being played that everyone else got the rules for except you. When you work hard and don't see results, the easiest explanation is that you're missing something essential.\n\nBut here's what's actually true: every single artist I've worked with who's now hitting $30k+ months started exactly where you are. Same doubts. Same confusion about why it wasn't working. The difference isn't talent or luck — it's that they learned a specific system for getting visible to the right people. That's it.\n\nWhat if hitting $30k months isn't about becoming someone different, but about learning something specific that nobody bothered to teach you? What if the only thing standing between you and being fully booked with premium clients is information — not some fundamental change in who you are?" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleActionQuestion = async (answer) => {
    const updatedAnswers = { ...answers, actionAnswer: answer }
    setAnswers(updatedAnswers)
    setScreen('plan')
    setIsLoading(true)

    try {
      const systemPrompt = `You are Rafael. The user has completed their diagnostic. Here's everything:
- Business stage: ${answers.stage}
- Day rate: ${answers.dayRate}
- Goal: ${answers.goal}
- Obstacle: ${answers.obstacle}
- What they tell themselves: ${answers.honestAnswer}
- What needs to change (belief): ${answers.beliefAnswer}
- What they want to tackle first: ${answer}

Write their personalized plan. This should feel like a clear path forward.

Structure:
1. Acknowledge where they are and where they're going (2-3 sentences)
2. Name the shift that's possible now (1-2 sentences)
3. Give ONE concrete first step based on what they want to tackle (be specific)
4. Connect it to what's ahead: "This is exactly what Level 2 is built for. You'll learn how to [relevant thing]."
5. End with confidence in them: "You're ready for this."

Rules:
- 200-300 words max
- No bullet points or numbered lists
- One clear action, not a list of things
- Sound confident and warm
- End with a clear transition to the Levels screen`

      const content = await callClaude(systemPrompt, updatedAnswers)
      setAiResponses({ ...aiResponses, plan: content })
    } catch (error) {
      console.error('AI Error:', error)
      setAiResponses({ ...aiResponses, plan: `Alright ${answers.firstName}, here's where you're at: you're a skilled artist with real talent, but you've been invisible to the people who would happily pay premium prices for your work. Your goal is clear — you want consistent, high-paying clients who value what you do. That's not just possible, it's inevitable once you have the right system.\n\nThe shift that's happening right now? You're moving from "hoping to be discovered" to "strategically getting in front of the right people." That's everything.\n\nBased on what you said you want to tackle first, here's your immediate focus: stop trying to appeal to everyone. Your next step is to get crystal clear on exactly who your premium client is — not "people who like tattoos," but the specific person who's already looking for what you do and has the budget to pay for it. Write down three characteristics of your dream client today.\n\nThis is exactly what Level 2 is built for. You'll learn how to identify your premium client avatar and position yourself as the obvious choice for them — so they come to you pre-sold, ready to book at your full rate.\n\nYou've done the hard part. You've built the skill. Now it's time to build the visibility. You're ready for this.` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={() => setScreen('questions')} />
        )}

        {screen === 'questions' && (
          <QuestionScreen
            key={`q-${questionIndex}`}
            question={QUESTIONS[questionIndex].question}
            options={QUESTIONS[questionIndex].options}
            onSelect={handleQuestionAnswer}
            onBack={() => {
              if (questionIndex > 0) {
                setQuestionIndex(questionIndex - 1)
              } else {
                setScreen('welcome')
              }
            }}
            current={questionIndex + 1}
            total={6}
          />
        )}

        {screen === 'honestQuestion' && (
          <OpenTextScreen
            key="honest"
            question="Be honest with me: when you see other artists booked out 6+ months with $5k-$10k sessions... what do you tell yourself about why that's not you yet?"
            placeholder="Be real with yourself here..."
            buttonText="Continue"
            onSubmit={handleHonestAnswer}
            onBack={() => {
              setQuestionIndex(QUESTIONS.length - 1)
              setScreen('questions')
            }}
            current={5}
            total={6}
          />
        )}

        {screen === 'contact' && (
          <ContactScreen
            key="contact"
            onSubmit={handleContactSubmit}
            onBack={() => setScreen('honestQuestion')}
          />
        )}

        {screen === 'diagnosis' && (
          <AIScreen
            key="diagnosis"
            title="Your Diagnosis"
            content={aiResponses.diagnosis}
            buttonText="Continue"
            onContinue={() => setScreen('beliefQuestion')}
            isLoading={isLoading}
          />
        )}

        {screen === 'beliefQuestion' && (
          <OpenTextScreen
            key="beliefQ"
            question="What would have to change — about how you see yourself or what you believe is possible — for hitting $30k+ months to feel inevitable instead of like a fantasy?"
            placeholder="Take your time with this one..."
            buttonText="Continue"
            onSubmit={handleBeliefQuestion}
          />
        )}

        {screen === 'beliefShift' && (
          <AIScreen
            key="belief"
            title="The Belief Shift"
            content={aiResponses.belief}
            buttonText="Continue"
            onContinue={() => setScreen('actionQuestion')}
            isLoading={isLoading}
          />
        )}

        {screen === 'actionQuestion' && (
          <OpenTextScreen
            key="actionQ"
            question="If we were going to start fixing this TODAY — not someday, today — what's the one thing you'd want to tackle first?"
            placeholder="What feels most urgent..."
            buttonText="Get My Plan"
            onSubmit={handleActionQuestion}
          />
        )}

        {screen === 'plan' && (
          <AIScreen
            key="plan"
            title="Your Plan"
            content={aiResponses.plan}
            buttonText="See My Path"
            onContinue={() => setScreen('levels')}
            isLoading={isLoading}
          />
        )}

        {screen === 'levels' && (
          <LevelsScreen key="levels" firstName={answers.firstName || 'there'} />
        )}
      </AnimatePresence>
    </div>
  )
}
