'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { InlineWidget } from 'react-calendly'
import { GlassHeader } from '../shared/GlassHeader'
import { StepProgress } from '../shared/StepProgress'
import { COLORS } from '@/config/flow'

function normalizeMarkdown(content: string): string {
  return content.replace(/([^\n])\n?(## )/g, '$1\n\n$2')
}

interface DiagnosisSequenceFlowProps {
  screens: string[]
  calendlyUrl?: string
  onBack?: () => void
  flowId?: string
}

/**
 * DiagnosisSequenceFlow - A nested flow component for multi-screen diagnosis.
 *
 * ARCHITECTURE NOTE: This component implements a "nested flow" pattern where it
 * manages its own internal navigation state independently from the parent PhaseFlow.
 *
 * Key behaviors:
 * - Renders its own GlassHeader and StepProgress (parent hides theirs)
 * - Manages 8 screens with independent back/forward navigation
 * - Progress shows 1-8 instead of continuing from question count
 * - Typing animation on first visit, instant display on revisit
 * - Calendly embed appears on final screen
 *
 * This pattern was chosen to keep the diagnosis experience self-contained,
 * but adds complexity. Consider refactoring if more nested flows are needed.
 * See: bd issue for future refactoring considerations.
 */
export function DiagnosisSequenceFlow({ screens, calendlyUrl, onBack, flowId = 'growthoperator' }: DiagnosisSequenceFlowProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [visitedScreens, setVisitedScreens] = useState<Set<number>>(new Set([0]))
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [typingComplete, setTypingComplete] = useState(false)

  const currentScreen = screens[currentScreenIndex] || ''
  const isLastScreen = currentScreenIndex === screens.length - 1
  const hasVisited = visitedScreens.has(currentScreenIndex)
  const totalScreens = screens.length || 8

  useEffect(() => {
    if (hasVisited && currentScreenIndex !== 0) {
      setDisplayedText(currentScreen)
      setIsTyping(false)
      setTypingComplete(true)
    } else {
      setDisplayedText('')
      setIsTyping(true)
      setTypingComplete(false)
      setVisitedScreens(prev => new Set([...prev, currentScreenIndex]))
    }
  }, [currentScreenIndex, currentScreen])

  useEffect(() => {
    if (!isTyping || !currentScreen) return

    if (displayedText.length < currentScreen.length) {
      const typeSpeed = 6 + Math.random() * 6
      const charsToAdd = 3
      const timeout = setTimeout(() => {
        setDisplayedText(currentScreen.slice(0, displayedText.length + charsToAdd))
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
      setTypingComplete(true)
    }
  }, [isTyping, displayedText, currentScreen])

  const goToNextScreen = () => {
    if (currentScreenIndex < screens.length - 1) {
      setDirection(1)
      setCurrentScreenIndex(currentScreenIndex + 1)
    }
  }

  const goToPreviousScreen = () => {
    if (currentScreenIndex > 0) {
      setDirection(-1)
      setCurrentScreenIndex(currentScreenIndex - 1)
    }
  }

  const screenVariants = {
    initial: { opacity: 0, x: direction * 60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit: { opacity: 0, x: direction * -60, transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const } }
  }

  return (
    <div style={{
      backgroundColor: COLORS.BACKGROUND,
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
    }}>
      <GlassHeader
        onBack={goToPreviousScreen}
        showBackButton={currentScreenIndex > 0}
        flowId={flowId}
      />

      <div style={{
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px',
      }}>
        <StepProgress current={currentScreenIndex + 1} total={totalScreens} />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScreenIndex}
          custom={direction}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            padding: '120px 24px 120px',
          }}
        >
          <div className="diagnosis-markdown" style={{ fontFamily: "'Lora', Charter, Georgia, serif" }}>
            <style>{`
              .diagnosis-markdown h1 { font-size: 28px; font-weight: 600; color: #000; line-height: 1.3; margin: 0 0 24px 0; }
              .diagnosis-markdown h2 { font-size: 22px; font-weight: 600; color: #000; line-height: 1.35; margin: 28px 0 16px 0; }
              .diagnosis-markdown h3 { font-size: 18px; font-weight: 600; color: #111; line-height: 1.4; margin: 24px 0 12px 0; }
              .diagnosis-markdown p { font-size: 17px; line-height: 1.75; color: #222; margin: 0 0 20px 0; }
              .diagnosis-markdown p:last-child { margin-bottom: 0; }
              .diagnosis-markdown strong { font-weight: 600; color: #000; }
              .diagnosis-markdown em { font-style: italic; color: #444; }
              .diagnosis-markdown ul, .diagnosis-markdown ol { font-size: 17px; line-height: 1.75; color: #222; margin: 0 0 16px 0; padding-left: 24px; }
              .diagnosis-markdown li { margin-bottom: 8px; }
              .diagnosis-markdown blockquote { border-left: 3px solid ${COLORS.ACCENT}; padding-left: 16px; margin: 16px 0; font-style: italic; color: #444; }
            `}</style>
            <ReactMarkdown>{normalizeMarkdown(displayedText)}</ReactMarkdown>
            {isTyping && <span className="typing-cursor" style={{ color: '#333' }} />}
          </div>

          {isLastScreen && typingComplete && calendlyUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
              style={{
                width: '100%',
                margin: '32px 0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <InlineWidget
                url={calendlyUrl}
                styles={{ height: '700px', minWidth: '100%' }}
                pageSettings={{
                  backgroundColor: 'FAF6F0',
                  primaryColor: '10B981',
                  textColor: '1a1a1a',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                }}
              />
            </motion.div>
          )}

          {!isLastScreen && typingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}
            >
              <motion.button
                onClick={goToNextScreen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: COLORS.ACCENT,
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  transition: 'all 0.15s ease',
                }}
              >
                Continue <span>→</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
