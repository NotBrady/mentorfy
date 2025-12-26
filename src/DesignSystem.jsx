import React, { useState, useEffect, useRef } from 'react'

// ============================================================================
// Mentorfy Design System
// Precision in service of warmth. A reference for every visual decision.
// ============================================================================

const RAFAEL_IMAGE = '/rafael.jpg'

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
  background: [
    { name: 'White', var: '--white', hex: '#FFFFFF', usage: 'Primary background' },
    { name: 'Gray 50', var: '--gray-50', hex: '#FAFAFA', usage: 'Subtle background, AI moments' },
  ],
  borders: [
    { name: 'Gray 100', var: '--gray-100', hex: '#F5F5F5', usage: 'Subtle borders' },
    { name: 'Gray 200', var: '--gray-200', hex: '#EBEBEB', usage: 'Default borders' },
    { name: 'Gray 300', var: '--gray-300', hex: '#E0E0E0', usage: 'Emphasized borders' },
  ],
  textMuted: [
    { name: 'Gray 400', var: '--gray-400', hex: '#CCCCCC', usage: 'Disabled, placeholders' },
    { name: 'Gray 500', var: '--gray-500', hex: '#AAAAAA', usage: 'Muted text, hints' },
    { name: 'Gray 600', var: '--gray-600', hex: '#888888', usage: 'Secondary labels' },
  ],
  textPrimary: [
    { name: 'Gray 700', var: '--gray-700', hex: '#666666', usage: 'Secondary text' },
    { name: 'Gray 800', var: '--gray-800', hex: '#444444', usage: 'Strong secondary' },
    { name: 'Gray 900', var: '--gray-900', hex: '#222222', usage: 'Near-black text' },
    { name: 'Black', var: '--black', hex: '#000000', usage: 'Headlines, primary text' },
  ],
  accent: [
    { name: 'Accent', var: '--accent', hex: '#10B981', usage: 'Primary accent, user bubbles' },
    { name: 'Accent Light', var: '--accent-light', hex: 'rgba(16, 185, 129, 0.08)', usage: 'Selected states' },
    { name: 'Accent Border', var: '--accent-border', hex: 'rgba(16, 185, 129, 0.4)', usage: 'Accent borders' },
  ],
}

const spacing = [
  { name: 'space-1', value: '4px', usage: 'Tight gaps, icon padding' },
  { name: 'space-2', value: '8px', usage: 'Related elements, button padding' },
  { name: 'space-3', value: '12px', usage: 'Between options, label to input' },
  { name: 'space-4', value: '16px', usage: 'Card padding, section padding' },
  { name: 'space-6', value: '24px', usage: 'Between groups, major spacing' },
  { name: 'space-8', value: '32px', usage: 'Section breaks' },
  { name: 'space-12', value: '48px', usage: 'Major section spacing' },
  { name: 'space-16', value: '64px', usage: 'Page section dividers' },
  { name: 'space-24', value: '96px', usage: 'Hero spacing' },
]

const shadows = [
  { name: 'shadow-xs', value: '0 1px 2px rgba(0,0,0,0.03)', usage: 'Subtle lift' },
  { name: 'shadow-sm', value: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', usage: 'Cards, hover' },
  { name: 'shadow-md', value: '0 4px 12px rgba(0,0,0,0.05)', usage: 'Elevated cards' },
  { name: 'shadow-lg', value: '0 8px 24px rgba(0,0,0,0.08)', usage: 'Modals' },
]

const radii = [
  { name: 'radius-sm', value: '8px', usage: 'Buttons, inputs' },
  { name: 'radius-md', value: '12px', usage: 'Cards, options' },
  { name: 'radius-lg', value: '16px', usage: 'Large cards' },
  { name: 'radius-full', value: '9999px', usage: 'Avatars, pills' },
]

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    WebkitFontSmoothing: 'antialiased',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '64px 48px 96px',
  },
  sectionHeader: {
    backgroundColor: '#111111',
    color: '#FFFFFF',
    padding: '20px 48px',
    marginLeft: '-48px',
    marginRight: '-48px',
    marginTop: '64px',
    marginBottom: '32px',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  sectionHeaderFirst: {
    marginTop: '48px',
  },
  subsection: {
    marginBottom: '48px',
  },
  subsectionTitle: {
    fontSize: '21px',
    fontWeight: '600',
    color: '#000000',
    marginBottom: '12px',
    letterSpacing: '-0.01em',
  },
  subsectionDesc: {
    fontSize: '15px',
    color: '#666666',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  showcase: {
    backgroundColor: '#FAFAFA',
    borderRadius: '12px',
    padding: '32px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '8px',
  },
}

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

function ColorSwatch({ color }) {
  const isTransparent = color.hex.includes('rgba')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          backgroundColor: color.hex,
          borderRadius: '8px',
          border: isTransparent || color.hex === '#FFFFFF' ? '1px solid #EBEBEB' : 'none',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '2px' }}>
          {color.name}
        </div>
        <div style={{ fontSize: '12px', color: '#888888', fontFamily: "'Geist Mono', monospace" }}>
          {color.hex}
        </div>
        <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }}>
          {color.usage}
        </div>
      </div>
    </div>
  )
}

function SpacingBlock({ space }) {
  const size = parseInt(space.value)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div
        style={{
          width: `${Math.min(size, 96)}px`,
          height: '24px',
          backgroundColor: '#000000',
          borderRadius: '4px',
          flexShrink: 0,
          minWidth: '4px',
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>{space.name}</span>
          <span style={{ fontSize: '12px', color: '#888888', fontFamily: "'Geist Mono', monospace" }}>{space.value}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }}>{space.usage}</div>
      </div>
    </div>
  )
}

function ShadowCard({ shadow }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '100%',
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: shadow.value,
          marginBottom: '10px',
        }}
      />
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#000000' }}>{shadow.name}</div>
      <div style={{ fontSize: '11px', color: '#888888', marginTop: '2px' }}>{shadow.usage}</div>
    </div>
  )
}

function RadiusBox({ radius }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#000000',
          borderRadius: radius.value,
          margin: '0 auto 10px',
        }}
      />
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#000000' }}>{radius.name}</div>
      <div style={{ fontSize: '11px', color: '#888888', fontFamily: "'Geist Mono', monospace" }}>{radius.value}</div>
    </div>
  )
}

function Avatar({ size = 64, showOnline = false, accentColor = '#10B981' }) {
  const [imgError, setImgError] = useState(false)
  const borderWidth = size <= 32 ? 1 : 2

  // Convert hex to rgba for glow
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 16, g: 185, b: 129 }
  }
  const rgb = hexToRgb(accentColor)
  const glowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}`

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '9999px',
          overflow: 'hidden',
          border: `${borderWidth}px solid #FFFFFF`,
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Dynamic glow radiating from the border
          boxShadow: `0 0 6px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), 0 0 16px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25), 0 0 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
        }}
      >
        {imgError ? (
          <span style={{ color: '#FFFFFF', fontSize: size * 0.4, fontWeight: '500' }}>R</span>
        ) : (
          <img
            src={RAFAEL_IMAGE}
            alt="Rafael"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      {showOnline && (
        <span
          style={{
            position: 'absolute',
            bottom: size > 60 ? '4px' : '2px',
            right: size > 60 ? '4px' : '2px',
            width: size > 60 ? '14px' : '10px',
            height: size > 60 ? '14px' : '10px',
            borderRadius: '9999px',
            backgroundColor: accentColor,
            border: '2px solid #FFFFFF',
          }}
        />
      )}
    </div>
  )
}

function ProgressIndicator({ current, total, accentColor = '#10B981' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? '24px' : '6px',
            height: '6px',
            borderRadius: '9999px',
            backgroundColor: i < current ? accentColor : i === current ? '#000000' : '#D4D4D4',
            transition: 'all 200ms ease-out',
          }}
        />
      ))}
    </div>
  )
}

function RafaelLabel({ small = false, accentColor = '#10B981' }) {
  const badgeSize = small ? 14 : 16

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
    }}>
      <span style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#444444',
        fontFamily: "'Lora', Charter, Georgia, serif",
      }}>
        Rafael Tats
      </span>
      {/* Verified badge - Twitter-style 8-scallop seal */}
      <svg
        width={badgeSize}
        height={badgeSize}
        viewBox="0 0 24 24"
        fill="none"
        style={{ display: 'block' }}
      >
        {/* 8 overlapping circles to create scalloped edge */}
        <g fill={accentColor}>
          <circle cx="12" cy="4.5" r="3.5" />
          <circle cx="17.3" cy="6.7" r="3.5" />
          <circle cx="19.5" cy="12" r="3.5" />
          <circle cx="17.3" cy="17.3" r="3.5" />
          <circle cx="12" cy="19.5" r="3.5" />
          <circle cx="6.7" cy="17.3" r="3.5" />
          <circle cx="4.5" cy="12" r="3.5" />
          <circle cx="6.7" cy="6.7" r="3.5" />
          <circle cx="12" cy="12" r="6" />
        </g>
        {/* Sharp checkmark - skinny and elongated */}
        <path
          d="M8 12.5l2.5 2.5 5-6"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  )
}

function ThinkingStateDemo({ accentColor = '#10B981' }) {
  // Convert hex to rgba
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 16, g: 185, b: 129 }
  }
  const rgb = hexToRgb(accentColor)
  const accentRgba = (opacity) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`

  const thinkingMessages = [
    { text: "Give me a second...", pauseAfter: 800 },
    { text: "I'm thinking about what you shared with me...", pauseAfter: 1200 },
    { text: "Crafting a response for your situation...", pauseAfter: 1500, transitionToResponse: true }
  ]

  const responseContent = {
    headline: "Here's what I see.",
    paragraphs: [
      "You're doing the work. Showing up. Putting in the hours when nobody's watching.",
      "Your art is good — genuinely good. I can tell you take this seriously. You're not here because you're lazy or untalented. That's not the problem.",
      "The problem is you've been playing a game you were never taught the rules to."
    ]
  }

  // Unified state for the entire flow
  const [displayText, setDisplayText] = useState('')
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing', 'pausing', 'deleting', 'transitioning', 'streaming'
  const [streamedResponse, setStreamedResponse] = useState({ headline: '', paragraphs: [] })
  const [currentStreamParagraph, setCurrentStreamParagraph] = useState(0)

  const typeSpeed = 45 // ms per character
  const deleteSpeed = 12 // FAST backspace
  const streamSpeed = 30 // ms per chunk

  useEffect(() => {
    if (!isPlaying) return

    let timeout

    if (phase === 'typing') {
      const currentMessage = thinkingMessages[currentMessageIndex]
      if (displayText.length < currentMessage.text.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentMessage.text.slice(0, displayText.length + 1))
        }, typeSpeed + (Math.random() * 30 - 15))
      } else {
        setPhase('pausing')
      }
    } else if (phase === 'pausing') {
      const currentMessage = thinkingMessages[currentMessageIndex]
      timeout = setTimeout(() => {
        if (currentMessage.transitionToResponse) {
          setPhase('transitioning')
        } else {
          setPhase('deleting')
        }
      }, currentMessage.pauseAfter)
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
      } else {
        setCurrentMessageIndex(currentMessageIndex + 1)
        setPhase('typing')
      }
    } else if (phase === 'transitioning') {
      // Quick fade then start streaming
      timeout = setTimeout(() => {
        setDisplayText('')
        setPhase('streaming')
      }, 400)
    } else if (phase === 'streaming') {
      // Stream the response
      const { headline, paragraphs } = responseContent

      // First stream the headline
      if (streamedResponse.headline.length < headline.length) {
        timeout = setTimeout(() => {
          const chunkSize = Math.floor(Math.random() * 3) + 2
          setStreamedResponse(prev => ({
            ...prev,
            headline: headline.slice(0, prev.headline.length + chunkSize)
          }))
        }, streamSpeed)
      }
      // Then stream paragraphs
      else if (currentStreamParagraph < paragraphs.length) {
        const currentPara = paragraphs[currentStreamParagraph]
        const streamedPara = streamedResponse.paragraphs[currentStreamParagraph] || ''

        if (streamedPara.length < currentPara.length) {
          timeout = setTimeout(() => {
            const chunkSize = Math.floor(Math.random() * 4) + 3
            setStreamedResponse(prev => {
              const newParagraphs = [...prev.paragraphs]
              newParagraphs[currentStreamParagraph] = currentPara.slice(0, streamedPara.length + chunkSize)
              return { ...prev, paragraphs: newParagraphs }
            })
          }, streamSpeed)
        } else {
          setCurrentStreamParagraph(currentStreamParagraph + 1)
        }
      } else {
        // Done streaming, wait then loop
        timeout = setTimeout(() => {
          handleRestart()
        }, 4000)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, phase, currentMessageIndex, isPlaying, streamedResponse, currentStreamParagraph])

  const handleRestart = () => {
    setDisplayText('')
    setCurrentMessageIndex(0)
    setPhase('typing')
    setStreamedResponse({ headline: '', paragraphs: [] })
    setCurrentStreamParagraph(0)
    setIsPlaying(true)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const isInThinkingPhase = phase === 'typing' || phase === 'pausing' || phase === 'deleting' || phase === 'transitioning'
  const isInStreamingPhase = phase === 'streaming'

  return (
    <>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Unified Demo: Thinking → Response Flow */}
      <div style={{ marginBottom: '32px' }}>
        <div style={styles.label}>Complete Flow: Thinking → Response Streaming</div>
        <div style={{
          backgroundColor: '#FAF9F8',
          borderRadius: '12px',
          padding: '48px 24px',
          minHeight: '400px',
        }}>
          <div style={{
            maxWidth: '640px',
            margin: '0 auto',
          }}>
            {/* Progress Indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <ProgressIndicator accentColor={accentColor} current={4} total={6} />
            </div>

            {/* Avatar + Label */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '32px',
            }}>
              <Avatar accentColor={accentColor} size={64} />
              <div style={{ marginTop: '12px' }}>
                <RafaelLabel accentColor={accentColor} />
              </div>
            </div>

            {/* Thinking Phase - Centered typing */}
            {isInThinkingPhase && (
              <div style={{
                textAlign: 'center',
                opacity: phase === 'transitioning' ? 0 : 1,
                transition: 'opacity 0.3s ease-out',
              }}>
                <p style={{
                  fontFamily: "'Lora', Charter, Georgia, serif",
                  fontSize: '20px',
                  fontWeight: '400',
                  color: '#333333',
                  lineHeight: '1.5',
                  margin: 0,
                  display: 'inline',
                }}>
                  {displayText}
                  <span style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.2em',
                    backgroundColor: '#333333',
                    marginLeft: '2px',
                    verticalAlign: 'text-bottom',
                    animation: 'cursorBlink 1s step-end infinite',
                  }} />
                </p>
              </div>
            )}

            {/* Streaming Phase - Left-aligned response */}
            {isInStreamingPhase && (
              <div style={{ fontFamily: "'Lora', Charter, Georgia, serif" }}>
                {/* Headline */}
                {streamedResponse.headline && (
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#000',
                    lineHeight: '1.2',
                    margin: 0,
                    marginBottom: '24px',
                  }}>
                    {streamedResponse.headline}
                    {streamedResponse.headline.length < responseContent.headline.length && (
                      <span style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '0.9em',
                        backgroundColor: '#333333',
                        marginLeft: '3px',
                        verticalAlign: 'baseline',
                        animation: 'cursorBlink 1s step-end infinite',
                      }} />
                    )}
                  </h1>
                )}

                {/* Paragraphs */}
                {streamedResponse.paragraphs.map((para, i) => (
                  <p key={i} style={{
                    fontSize: '17px',
                    lineHeight: '1.75',
                    color: '#222',
                    margin: 0,
                    marginTop: i > 0 ? '20px' : 0,
                  }}>
                    {para}
                    {i === streamedResponse.paragraphs.length - 1 &&
                     (para.length < responseContent.paragraphs[i]?.length ||
                      currentStreamParagraph < responseContent.paragraphs.length) && (
                      <span style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '1em',
                        backgroundColor: '#333333',
                        marginLeft: '2px',
                        verticalAlign: 'text-bottom',
                        animation: 'cursorBlink 1s step-end infinite',
                      }} />
                    )}
                  </p>
                ))}

                {/* Show cursor after headline if no paragraphs yet */}
                {streamedResponse.headline.length >= responseContent.headline.length &&
                 streamedResponse.paragraphs.length === 0 && (
                  <p style={{
                    fontSize: '17px',
                    lineHeight: '1.75',
                    color: '#222',
                    margin: 0,
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1em',
                      backgroundColor: '#333333',
                      animation: 'cursorBlink 1s step-end infinite',
                    }} />
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '16px',
        }}>
          <button
            onClick={handlePlayPause}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #E0E0E0',
              backgroundColor: '#FFFFFF',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isPlaying ? '⏸' : '▶'} {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleRestart}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #E0E0E0',
              backgroundColor: '#FFFFFF',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ↻ Restart
          </button>
          <div style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: phase === 'streaming' ? accentRgba(0.1) : '#F5F5F5',
            fontSize: '13px',
            color: phase === 'streaming' ? accentColor : '#888',
            fontWeight: '500',
          }}>
            {phase === 'typing' && 'Typing...'}
            {phase === 'pausing' && 'Paused'}
            {phase === 'deleting' && 'Erasing...'}
            {phase === 'transitioning' && 'Transitioning...'}
            {phase === 'streaming' && 'Streaming Response'}
          </div>
        </div>
      </div>

      {/* Specs Table */}
      <div style={{
        backgroundColor: '#FAFAFA',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '48px',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F0F0F0' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Element</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Avatar', '64px, centered, glow treatment'],
              ['Name', '"Rafael Tats ✓", Lora 13px/600'],
              ['Thinking text', 'Lora 20px, #333, centered'],
              ['Response text', 'H1: Lora 32px/600, Body: Lora 17px/400'],
              ['Cursor', '2px wide, #333, blinks 1s'],
              ['Type speed', '45ms per character (±15ms randomness)'],
              ['Backspace speed', '12ms per character (fast!)'],
              ['Stream speed', '30ms per 2-4 character chunk'],
              ['Message 1 pause', '0.8 seconds'],
              ['Message 2 pause', '1.2 seconds'],
              ['Message 3 pause', '1.5 seconds → fade → stream'],
            ].map(([el, details], i) => (
              <tr key={i} style={{ borderTop: '1px solid #E8E8E8' }}>
                <td style={{ padding: '10px 16px', color: '#111', fontWeight: '500' }}>{el}</td>
                <td style={{ padding: '10px 16px', color: '#666' }}>{details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flow Documentation */}
      <div style={{
        backgroundColor: '#FAFAFA',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '48px',
      }}>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#000', marginBottom: '16px' }}>Complete Animation Flow</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Typing', '→', 'Pause', '→', 'Erase', '→', 'Typing', '→', 'Pause', '→', 'Erase', '→', 'Typing', '→', 'Pause', '→', 'Fade', '→', 'Stream Response'].map((step, i) => (
            <span key={i} style={{
              padding: step === '→' ? '0' : '4px 8px',
              borderRadius: '4px',
              backgroundColor: step === '→' ? 'transparent' : step === 'Stream Response' ? accentColor : '#E8E8E8',
              color: step === '→' ? '#888' : step === 'Stream Response' ? '#fff' : '#333',
              fontSize: '12px',
              fontWeight: step === 'Stream Response' ? '600' : '400',
            }}>
              {step}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {thinkingMessages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: msg.transitionToResponse ? accentColor : '#888',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '600',
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '14px',
                  color: '#111',
                  marginBottom: '2px',
                }}>
                  "{msg.text}"
                </div>
                <div style={{ fontSize: '11px', color: '#888' }}>
                  {msg.pauseAfter / 1000}s pause{msg.transitionToResponse ? ' → fade → start streaming' : ' → erase'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ============================================================================
// CHAT COMPONENTS
// ============================================================================

function UserBubble({ children, accentColor = '#10B981' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{
        backgroundColor: accentColor,
        color: '#FFFFFF',
        padding: '14px 18px',
        borderRadius: '18px 18px 6px 18px',
        maxWidth: '75%',
        fontSize: '15px',
        lineHeight: '1.5',
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}>
        {children}
      </div>
    </div>
  )
}

function RafaelMessage({ children, accentColor = '#10B981' }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, paddingTop: '3px' }}>
        <Avatar accentColor={accentColor} size={32} />
      </div>
      <div style={{ flex: 1, fontFamily: "'Lora', Charter, Georgia, serif" }}>
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DesignSystem() {
  const [accentColor, setAccentColor] = useState('#10B981')

  // Generate lighter/transparent versions of accent color
  const accentLight = `${accentColor}14` // 8% opacity
  const accentBorder = `${accentColor}66` // 40% opacity
  const accentGlow = `${accentColor}40` // 25% opacity
  const accentGlowStrong = `${accentColor}66` // 40% opacity

  return (
    <div style={styles.page}>
      {/* Font Imports */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      <style>{`
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/Geist-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist Mono';
          src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-mono/GeistMono-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        :root {
          --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          --font-serif: 'Lora', Charter, Georgia, serif;
        }
      `}</style>

      <div style={styles.container}>
        {/* ================================================================ */}
        {/* HEADER */}
        {/* ================================================================ */}
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            marginBottom: '16px',
          }}>
            Mentorfy Design System
          </h1>
          <p style={{
            fontSize: '21px',
            color: '#666666',
            lineHeight: '1.5',
            maxWidth: '600px',
          }}>
            Precision in service of warmth. A reference for every visual decision.
          </p>
          <p style={{
            fontSize: '13px',
            color: '#AAAAAA',
            marginTop: '24px',
            fontFamily: "'Geist Mono', monospace",
          }}>
            v1.0 — December 2025
          </p>

          {/* Accent Color Picker */}
          <div style={{
            marginTop: '32px',
            padding: '20px 24px',
            backgroundColor: '#FAFAFA',
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#666',
              letterSpacing: '0.02em',
            }}>
              Accent Color
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: accentColor,
                boxShadow: `0 0 0 3px white, 0 0 0 4px #E5E5E5`,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </div>
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '13px',
                color: '#888',
                textTransform: 'uppercase',
              }}>
                {accentColor}
              </span>
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginLeft: '8px',
            }}>
              {['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444'].map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: accentColor === color ? '2px solid #000' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        </header>

        {/* ================================================================ */}
        {/* PHILOSOPHY */}
        {/* ================================================================ */}
        <div style={{ ...styles.sectionHeader, ...styles.sectionHeaderFirst }}>Philosophy</div>

        <div style={{ marginBottom: '48px' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#000',
            lineHeight: '1.25',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            fontFamily: "'Lora', Charter, Georgia, serif",
          }}>
            "Finally, someone who gets it."
          </div>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', maxWidth: '640px' }}>
            That's what this product delivers. That's what the design must enable. If the design gets in the way of this feeling, it has failed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '48px' }}>
          <div style={{ padding: '24px', backgroundColor: '#FAFAFA', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: accentColor, marginBottom: '8px', letterSpacing: '0.05em' }}>01</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>Relief</div>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              "Someone sees my situation. I'm not alone in this."
            </p>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#FAFAFA', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: accentColor, marginBottom: '8px', letterSpacing: '0.05em' }}>02</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>Belief</div>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              "This is different. This might actually work for me."
            </p>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#FAFAFA', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: accentColor, marginBottom: '8px', letterSpacing: '0.05em' }}>03</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>Action</div>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              "I know exactly what to do next."
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#000', marginBottom: '12px' }}>
              The Aesthetic: 2050
            </h3>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.65' }}>
              So refined you don't notice the refinement. Like a Tesla interior — you can't point to what makes it good. No decoration. Just the exact right things in the exact right places.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#000', marginBottom: '12px' }}>
              The Hierarchy
            </h3>
            <ol style={{ fontSize: '15px', color: '#666', lineHeight: '1.9', paddingLeft: '20px', margin: 0 }}>
              <li><strong style={{ color: '#000' }}>The mentor</strong> — face, presence</li>
              <li><strong style={{ color: '#000' }}>The content</strong> — the question being asked</li>
              <li><strong style={{ color: '#000' }}>Their response</strong> — what they're contributing</li>
              <li><strong style={{ color: '#888' }}>Chrome</strong> — felt, not seen</li>
            </ol>
          </div>
        </div>

        {/* ================================================================ */}
        {/* TYPOGRAPHY */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Typography</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Two Voices, Two Fonts</h3>
          <p style={styles.subsectionDesc}>
            The UI speaks in Geist (sans-serif). Rafael speaks in Lora (serif). The font shift signals: "This isn't a chatbot. This is someone who sat down to write to you."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ backgroundColor: '#FAFAFA', borderRadius: '12px', padding: '32px' }}>
              <div style={styles.label}>Interface Font</div>
              <div style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#000',
                marginTop: '8px',
                marginBottom: '16px',
                fontFamily: "'Geist', sans-serif",
              }}>
                Geist
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Used for UI elements, buttons, labels, navigation, and user input. Clean, precise, engineered.
              </p>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '400' }}>Regular 400</span>
                <span style={{ fontSize: '15px', fontWeight: '500' }}>Medium 500</span>
                <span style={{ fontSize: '15px', fontWeight: '600' }}>Semibold 600</span>
                <span style={{ fontSize: '15px', fontWeight: '700' }}>Bold 700</span>
              </div>
            </div>
            <div style={{ backgroundColor: '#FAFAFA', borderRadius: '12px', padding: '32px' }}>
              <div style={styles.label}>Mentor Voice Font</div>
              <div style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#000',
                marginTop: '8px',
                marginBottom: '16px',
                fontFamily: "'Lora', Charter, Georgia, serif",
              }}>
                Lora
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0, fontFamily: "'Lora', serif" }}>
                Used for AI responses, diagnosis moments, anywhere Rafael is speaking. Warm, thoughtful, personal.
              </p>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: "'Lora', serif" }}>
                <span style={{ fontSize: '15px', fontWeight: '400' }}>Regular 400</span>
                <span style={{ fontSize: '15px', fontWeight: '500' }}>Medium 500</span>
                <span style={{ fontSize: '15px', fontWeight: '600' }}>Semibold 600</span>
                <span style={{ fontSize: '15px', fontWeight: '400', fontStyle: 'italic' }}>Italic 400</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Type Scale</h3>
          <div style={{ backgroundColor: '#FAFAFA', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { size: '48px', name: 'Display', weight: '700', tracking: '-0.03em', usage: 'Page titles' },
                { size: '30px', name: 'H1', weight: '700', tracking: '-0.02em', usage: 'Section headlines' },
                { size: '23px', name: 'H2', weight: '600', tracking: '-0.01em', usage: 'Subsection headlines' },
                { size: '17px', name: 'Body', weight: '400', tracking: '0', usage: 'Main content' },
                { size: '15px', name: 'UI', weight: '400', tracking: '0', usage: 'Buttons, inputs' },
                { size: '13px', name: 'Small', weight: '400', tracking: '0', usage: 'Secondary text' },
                { size: '11px', name: 'Label', weight: '500', tracking: '0.06em', usage: 'Labels, caps' },
              ].map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    color: '#000',
                    letterSpacing: t.tracking,
                  }}>
                    {t.name}
                  </span>
                  <span style={{ fontSize: '12px', color: '#888', fontFamily: "'Geist Mono', monospace" }}>
                    {t.size} · {t.usage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* COLORS */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Colors</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <div>
            <div style={{ ...styles.label, marginBottom: '16px' }}>Background</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {colors.background.map(c => <ColorSwatch key={c.var} color={c} />)}
            </div>
          </div>
          <div>
            <div style={{ ...styles.label, marginBottom: '16px' }}>Accent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {colors.accent.map(c => <ColorSwatch key={c.var} color={c} />)}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          <div>
            <div style={{ ...styles.label, marginBottom: '16px' }}>Text</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {colors.textPrimary.map(c => <ColorSwatch key={c.var} color={c} />)}
            </div>
          </div>
          <div>
            <div style={{ ...styles.label, marginBottom: '16px' }}>Borders</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {colors.borders.map(c => <ColorSwatch key={c.var} color={c} />)}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SPACING & SHADOWS */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Spacing & Effects</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            <h3 style={styles.subsectionTitle}>Spacing Scale</h3>
            <p style={{ ...styles.subsectionDesc, marginBottom: '16px' }}>
              Space is confidence. Generous whitespace says: "We respect your attention."
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {spacing.map(s => <SpacingBlock key={s.name} space={s} />)}
            </div>
          </div>
          <div>
            <h3 style={styles.subsectionTitle}>Shadows</h3>
            <p style={{ ...styles.subsectionDesc, marginBottom: '16px' }}>
              Shadows create depth without decoration. Barely there, but felt.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {shadows.map(s => <ShadowCard key={s.name} shadow={s} />)}
            </div>

            <h3 style={{ ...styles.subsectionTitle, marginTop: '32px' }}>Border Radius</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {radii.map(r => <RadiusBox key={r.name} radius={r} />)}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* COMPONENTS */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Components</div>

        {/* Avatar */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Avatar</h3>
          <div style={styles.showcase}>
            <div style={{ display: 'flex', alignItems: 'end', gap: '24px' }}>
              {[
                { size: 88, label: '88px', usage: 'AI Moment' },
                { size: 64, label: '64px', usage: 'Questions' },
                { size: 48, label: '48px', usage: 'Home' },
                { size: 32, label: '32px', usage: 'Chat' },
              ].map(a => (
                <div key={a.size} style={{ textAlign: 'center' }}>
                  <Avatar accentColor={accentColor} size={a.size} />
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>{a.label}</div>
                  <div style={{ fontSize: '11px', color: '#AAA' }}>{a.usage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Buttons</h3>
          <div style={styles.showcase}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}>
                Primary
              </button>
              <button style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                border: '1px solid #E0E0E0',
                cursor: 'pointer',
              }}>
                Secondary
              </button>
              <button style={{
                backgroundColor: accentColor,
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}>
                Accent
              </button>
              <button style={{
                backgroundColor: '#F5F5F5',
                color: '#AAA',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                border: 'none',
                cursor: 'not-allowed',
              }}>
                Disabled
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Progress Indicator</h3>
          <div style={styles.showcase}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <ProgressIndicator accentColor={accentColor} current={0} total={6} />
                <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>Step 1</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <ProgressIndicator accentColor={accentColor} current={3} total={6} />
                <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>Step 4</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <ProgressIndicator accentColor={accentColor} current={5} total={6} />
                <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>Step 6</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* WELCOME SCREEN */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Welcome Screen</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>The First Impression</h3>
          <p style={styles.subsectionDesc}>
            This is the hook. Rafael introduces himself. The headline promises transformation.
            One clear action: start.
          </p>
        </div>

        <div style={styles.showcase}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '64px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '600px',
          }}>
            {/* Avatar */}
            <div style={{ marginBottom: '12px' }}>
              <Avatar accentColor={accentColor} size={88} />
            </div>

            {/* Name + Badge */}
            <div style={{ marginBottom: '24px' }}>
              <RafaelLabel accentColor={accentColor} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Lora', Charter, Georgia, serif",
              fontSize: '30px',
              fontWeight: '600',
              color: '#000000',
              lineHeight: '1.3',
              margin: '0 0 12px 0',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Steal The Method That Seems Invisible To YOU But Keeps Me Booked Out All Year With $2k-$10k Sessions...
            </h1>

            {/* Subheadline */}
            <p style={{
              fontFamily: "'Lora', Charter, Georgia, serif",
              fontSize: '18px',
              fontWeight: '400',
              color: '#666666',
              lineHeight: '1.5',
              margin: '0 0 32px 0',
            }}>
              Without Spending More Than 30 Minutes A Day On Content
            </p>

            {/* Button */}
            <button style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '400px',
              fontFamily: "'Geist', -apple-system, sans-serif",
            }}>
              Start Session
            </button>

            {/* Social Proof */}
            <div style={{
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <span style={{ color: accentColor, fontSize: '14px', letterSpacing: '2px' }}>★★★★★</span>
              <span style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: '14px',
                color: '#888888',
              }}>
                Trusted by 500+ tattoo artists
              </span>
            </div>

            {/* Debossed Branding - pressed into the page, anchored at bottom */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '56px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}>
              {/* Eyeball Logo - debossed */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 78 81"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.95)) drop-shadow(0 -0.5px 0 rgba(0,0,0,0.1))',
                }}
              >
                <path d="M12.4312 40.1327L16.5263 43.4243C13.7358 42.8254 10.8878 42.4617 8.03099 42.1423C6.49201 41.9515 4.95746 41.7652 3.4229 41.5567C2.59592 41.4414 1.77779 41.3438 0.941961 41.2063C0.340521 41.1087 0.0221118 40.6296 0 40.1416C0.0221118 39.6359 0.349366 39.1479 0.981762 39.068C3.06469 38.7974 5.15646 38.5224 7.23497 38.2518H7.25708C9.73802 37.99 12.2101 37.715 14.6468 37.2803C15.2615 37.1827 15.8409 37.0762 16.3848 36.9564L12.4312 40.1327Z" fill="#E0E0E0"/>
                <path d="M57.7296 57.5314C58.3133 58.4852 57.3139 59.5942 56.3277 59.1639C56.2967 59.155 56.2658 59.1417 56.2348 59.124C55.5671 58.7646 54.9435 58.4319 54.3509 58.1214C54.3376 58.117 54.3288 58.1081 54.3155 58.1036C53.8291 57.8153 53.3293 57.5358 52.8208 57.2741C51.7859 56.7417 50.8174 56.3514 49.9109 56.0985C47.2398 55.3577 45.1613 55.8412 43.7373 57.5358C42.7157 58.738 42.0258 60.5568 41.6809 62.979C40.9246 68.36 40.447 73.7766 39.8235 79.1754L39.8146 79.273C39.6864 80.3288 38.457 80.5461 37.8688 79.9251C37.7184 79.7654 37.6079 79.548 37.5769 79.2774C37.2452 76.5004 36.9711 73.7145 36.6748 70.933C36.4404 68.7415 36.1927 66.5545 35.8876 64.3719C35.808 63.7863 35.7195 63.2008 35.6267 62.6152C35.18 59.7051 34.3265 57.7443 33.0042 56.6841C32.9998 56.6796 32.9909 56.6752 32.9865 56.6663C31.5802 55.5484 29.6476 55.4464 27.1136 56.2981C27.1004 56.3026 27.0738 56.3114 27.0561 56.3203C26.468 56.5199 25.84 56.7728 25.1899 57.0745C24.0357 57.6024 22.9301 58.2101 21.6166 58.9376C21.5194 58.9953 21.4132 59.053 21.3071 59.1106C20.3121 59.6696 19.2197 58.565 19.777 57.5669C20.4757 56.3203 21.0506 55.2778 21.5768 54.2087C22.6471 52.0172 23.1999 50.2339 23.191 48.7744L26.3707 51.3296C29.6963 54.1998 34.0965 55.7747 38.7533 55.7747C41.1546 55.7747 43.4852 55.3577 45.63 54.5636C47.7793 53.7651 49.7428 52.5939 51.4233 51.0812L54.2669 48.7966C54.1961 50.9348 55.3415 53.7207 57.619 57.3406C57.65 57.4027 57.6942 57.4648 57.7296 57.5314Z" fill="#E0E0E0"/>
                <path d="M77.4745 40.1327C77.4568 40.6384 77.1295 41.1264 76.4927 41.2063C76.4618 41.2107 76.422 41.2151 76.3866 41.2196C76.2981 41.2639 76.192 41.2906 76.0814 41.3083C75.9974 41.3172 75.9134 41.3305 75.8338 41.3394C74.6442 41.4946 73.4457 41.6321 72.2428 41.7564C71.6237 41.8406 70.9957 41.9205 70.3722 42.0003C70.3633 42.0048 70.3589 42.0048 70.3589 42.0048C67.9089 42.2621 65.4678 42.5371 63.062 42.9541C63.0355 42.9541 63.0134 42.9586 62.9913 42.963C62.3147 43.065 61.6823 43.1804 61.0897 43.3134L65.0477 40.1327L60.9614 36.85C63.7298 37.44 66.5469 37.8037 69.3772 38.1232C70.6066 38.2784 71.8448 38.4248 73.0654 38.5845C73.8703 38.6777 74.6751 38.7753 75.48 38.8817C75.6879 38.9084 75.8869 38.935 76.0814 38.966C76.1876 38.9793 76.276 39.0059 76.3601 39.0414C76.4175 39.0503 76.475 39.0592 76.5325 39.0681C77.1428 39.1656 77.4612 39.6448 77.4745 40.1327Z" fill="#E0E0E0"/>
                <path d="M19.7991 22.7387C19.2154 21.7849 20.2148 20.6759 21.201 21.1062C21.232 21.1151 21.2629 21.1284 21.2939 21.1461C21.9617 21.5055 22.5852 21.8382 23.1778 22.1487C23.1911 22.1532 23.1999 22.162 23.2132 22.1665C23.6997 22.4548 24.1994 22.7343 24.7079 22.996C25.7428 23.5284 26.7113 23.9187 27.6179 24.1716C30.289 24.9124 32.3675 24.4289 33.7915 22.7343C34.813 21.5321 35.5029 19.7133 35.8479 17.2911C36.6041 11.9101 37.0817 6.49354 37.7052 1.09474L37.7141 0.997148C37.8423 -0.0586559 39.0718 -0.276027 39.6599 0.345034C39.8103 0.504735 39.9208 0.722107 39.9518 0.992712C40.2835 3.76974 40.5577 6.55564 40.854 9.33711C41.0883 11.5286 41.336 13.7156 41.6411 15.8982C41.7207 16.4837 41.8092 17.0693 41.9021 17.6549C42.3487 20.565 43.2022 22.5258 44.5245 23.586C44.5289 23.5905 44.5378 23.5949 44.5422 23.6038C45.9485 24.7217 47.8811 24.8237 50.4151 23.972C50.4284 23.9675 50.4549 23.9587 50.4726 23.9498C51.0607 23.7502 51.6887 23.4973 52.3388 23.1956C53.493 22.6677 54.5986 22.06 55.9121 21.3325C56.0094 21.2748 56.1155 21.2171 56.2216 21.1595C57.2167 20.6005 58.309 21.7051 57.7518 22.7032C57.053 23.9498 56.4781 24.9923 55.9519 26.0614C54.8817 28.2529 54.3289 30.0362 54.3377 31.4957L51.158 28.9405C47.8324 26.0703 43.4322 24.4954 38.7755 24.4954C36.3741 24.4954 34.0435 24.9124 31.8987 25.7065C29.7494 26.505 27.7859 27.6762 26.1054 29.1889L23.2618 31.4735C23.3326 29.3353 22.1872 26.5494 19.9097 22.9295C19.8787 22.8674 19.8345 22.8053 19.7991 22.7387Z" fill="#E0E0E0"/>
                <path d="M31.788 50.4783C30.7753 49.9593 29.8245 49.3338 28.9621 48.593L19.4142 40.914C18.9101 40.5103 18.9101 39.7384 19.4142 39.3347L28.9488 31.6779L28.9754 31.6602C29.8333 30.9149 30.7841 30.2805 31.8057 29.7704C28.4535 32.024 26.3087 35.8523 26.3087 40.1288C26.3087 44.4052 28.4491 48.2248 31.788 50.4783Z" fill="#E0E0E0"/>
                <path d="M58.0613 40.9184L48.8008 48.3578L48.7655 48.3933C47.8147 49.2406 46.7577 49.9592 45.6079 50.5271C48.9954 48.2868 51.1668 44.4362 51.1668 40.1243C51.1668 35.8123 49.0043 31.9884 45.6344 29.7393C46.7754 30.3071 47.8279 31.0257 48.7743 31.8775L58.0613 39.3391C58.5654 39.7428 58.5654 40.5147 58.0613 40.9184Z" fill="#E0E0E0"/>
                <path d="M46.1381 40.2792C46.1381 40.2792 46.1204 40.288 46.1116 40.288C45.4925 40.4034 44.8999 40.5764 44.3338 40.8071C44.1083 40.9002 43.8827 41.0023 43.666 41.1176C43.5599 41.1708 43.4494 41.2285 43.3432 41.2906C43.2194 41.3616 43.1 41.4326 42.9806 41.508H42.9762C42.6622 41.7076 42.3615 41.925 42.074 42.1601C41.8794 42.3154 41.6981 42.4751 41.5212 42.6525C41.4328 42.7368 41.3443 42.8255 41.2603 42.9142C41.0922 43.0917 40.9286 43.2736 40.7694 43.4643C40.6898 43.5619 40.6146 43.6595 40.5394 43.7571C40.2431 44.1564 39.9778 44.5822 39.7478 45.0258C39.5975 45.3142 39.4648 45.6114 39.3498 45.9175C39.2879 46.0772 39.2304 46.2414 39.1729 46.4099C39.058 46.7737 38.9651 47.1463 38.8943 47.5278C38.8634 47.6964 38.629 47.6964 38.598 47.5323C38.598 47.5323 38.5966 47.5293 38.5936 47.5234C38.5494 47.2705 38.4919 47.0221 38.4211 46.7737C38.3813 46.6229 38.3371 46.472 38.284 46.3212C38.1337 45.8776 37.9524 45.4428 37.7445 45.0303C37.2802 44.1431 36.6787 43.3401 35.9667 42.6525C35.7014 42.3952 35.4184 42.1557 35.1221 41.9338C34.9231 41.7875 34.724 41.6455 34.5118 41.5168C33.8838 41.1176 33.1983 40.7938 32.4775 40.5675C32.1149 40.4522 31.7478 40.359 31.3675 40.288C31.3586 40.288 31.3498 40.2836 31.3454 40.2792C31.1994 40.2348 31.2083 40.0219 31.3675 39.9908C32.9286 39.7025 34.3526 39.006 35.5156 38.0079C35.5687 37.9724 35.6174 37.928 35.666 37.8792C35.7147 37.8393 35.7677 37.7949 35.8119 37.7506C35.9225 37.6485 36.0331 37.5509 36.1348 37.4445C36.2763 37.3069 36.409 37.1605 36.5372 37.0097C36.5461 36.9964 36.5593 36.9875 36.5682 36.9742C36.6168 36.9166 36.661 36.8589 36.7097 36.8012C36.7937 36.7081 36.8689 36.606 36.9396 36.5084C37.0148 36.4108 37.09 36.3088 37.1608 36.2068C37.3067 35.9894 37.4482 35.7676 37.5765 35.5369C37.6693 35.3772 37.7534 35.2175 37.833 35.0534C37.9922 34.7207 38.1337 34.3791 38.2575 34.0286C38.3194 33.8512 38.3725 33.6737 38.4211 33.4919C38.4211 33.4919 38.4256 33.4874 38.4256 33.483C38.4963 33.239 38.5538 32.9906 38.598 32.7377C38.629 32.5691 38.8634 32.5691 38.8943 32.7333C38.9651 33.1192 39.058 33.4919 39.1729 33.8556C39.2304 34.0242 39.2879 34.1883 39.3498 34.348C39.4648 34.6541 39.5975 34.9513 39.7478 35.2353C40.1503 36.016 40.6588 36.7302 41.2603 37.3557C41.6008 37.7106 41.9634 38.0345 42.3526 38.3273C42.4543 38.4027 42.5516 38.4736 42.6533 38.5446C42.9585 38.7576 43.2813 38.9528 43.6086 39.1213C43.7235 39.179 43.8429 39.2367 43.9579 39.2943C44.1039 39.3609 44.2498 39.4274 44.4002 39.4851C44.4842 39.5206 44.5726 39.5516 44.6611 39.5871C44.6788 39.5916 44.6965 39.6004 44.7141 39.6049C44.7274 39.6093 44.7407 39.6137 44.7584 39.6182C44.9529 39.6936 45.1564 39.7601 45.3598 39.8089C45.4615 39.8444 45.5632 39.871 45.6649 39.8888C45.7667 39.911 45.8728 39.9376 45.9789 39.9598C46.0232 39.9731 46.0718 39.9819 46.116 39.9908C46.2708 40.0219 46.2797 40.2304 46.1426 40.2792H46.1381Z" fill="#E0E0E0"/>
                <path d="M46.1381 40.2792C45.5102 40.3901 44.9087 40.5675 44.3338 40.8071C44.1083 40.9002 43.8827 41.0023 43.666 41.1176C43.5599 41.1708 43.4494 41.2285 43.3432 41.2906C43.2194 41.3616 43.1 41.4326 42.9806 41.508H42.9762C42.6622 41.7076 42.3615 41.925 42.074 42.1601C41.8794 42.3154 41.6981 42.4751 41.5212 42.6525C41.4283 42.7368 41.3399 42.8255 41.2603 42.9142C41.0834 43.0917 40.9242 43.2736 40.7694 43.4643C40.6898 43.5619 40.6146 43.6595 40.5394 43.7571C40.2431 44.1564 39.9778 44.5822 39.7478 45.0258C39.5975 45.3142 39.4648 45.6114 39.3498 45.9175C39.2879 46.0772 39.2304 46.2414 39.1729 46.4099C39.058 46.7737 38.9651 47.1463 38.8943 47.5278C38.8634 47.6964 38.629 47.6964 38.598 47.5323C38.598 47.5323 38.5966 47.5293 38.5936 47.5234C38.5494 47.2705 38.4919 47.0221 38.4211 46.7737C38.3813 46.6229 38.3371 46.472 38.284 46.3212C38.1381 45.8776 37.9568 45.4428 37.7445 45.0303C37.2802 44.1431 36.6787 43.3401 35.9667 42.6525C35.7014 42.3952 35.4184 42.1557 35.1221 41.9338C34.9231 41.7875 34.724 41.6455 34.5118 41.5168C33.8838 41.1176 33.1983 40.7938 32.4775 40.5675C32.1104 40.4477 31.7301 40.3501 31.3454 40.2792C31.1994 40.2348 31.2083 40.0219 31.3675 39.9908C32.9286 39.7025 34.3526 39.006 35.5156 38.0079C35.5643 37.9635 35.6174 37.9236 35.666 37.8792C35.7147 37.8393 35.7677 37.7949 35.8119 37.7506C35.9225 37.6485 36.0331 37.5509 36.1348 37.4445C36.2763 37.3069 36.409 37.1605 36.5372 37.0097C36.5461 36.9964 36.5593 36.9875 36.5682 36.9742C36.6168 36.9166 36.661 36.8589 36.7097 36.8012C36.7849 36.7036 36.8645 36.606 36.9396 36.5084C37.0148 36.4108 37.09 36.3088 37.1608 36.2068C37.3067 35.9894 37.4482 35.7676 37.5765 35.5369C37.6693 35.3772 37.7534 35.2175 37.833 35.0534C37.9966 34.7207 38.1381 34.3791 38.2575 34.0286C38.3194 33.8512 38.3725 33.6737 38.4211 33.4919C38.4211 33.4919 38.4256 33.4874 38.4256 33.483C38.4963 33.239 38.5538 32.9906 38.598 32.7377C38.629 32.5691 38.8634 32.5691 38.8943 32.7333C38.9651 33.1192 39.058 33.4919 39.1729 33.8556C39.226 34.0198 39.2835 34.1883 39.3498 34.348C39.4648 34.6541 39.5975 34.9513 39.7478 35.2353C40.1503 36.016 40.6588 36.7302 41.2603 37.3557C41.6008 37.7106 41.9634 38.0345 42.3526 38.3273C42.4543 38.4027 42.5516 38.4736 42.6533 38.5446C42.9585 38.7531 43.2769 38.9483 43.6086 39.1213C43.7235 39.179 43.8429 39.2367 43.9579 39.2943C44.1039 39.3609 44.2498 39.4274 44.4002 39.4851C44.4842 39.5206 44.5726 39.5516 44.6611 39.5871C44.6788 39.5916 44.6965 39.6004 44.7141 39.6049C44.7274 39.6093 44.7407 39.6137 44.7584 39.6182C44.9574 39.6892 45.1564 39.7513 45.3598 39.8089C45.4615 39.8355 45.5632 39.8622 45.6649 39.8888C45.7667 39.911 45.8728 39.9376 45.9789 39.9598C46.0232 39.9731 46.0718 39.9819 46.116 39.9908C46.2708 40.0219 46.2797 40.2304 46.1426 40.2792H46.1381Z" fill="#E0E0E0"/>
              </svg>
              {/* Text - debossed letterpress effect */}
              <span style={{
                fontFamily: "'Lora', Charter, Georgia, serif",
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                color: '#E0E0E0',
                textTransform: 'uppercase',
                textShadow: '0 1px 1px rgba(255,255,255,0.95), 0 -1px 1px rgba(0,0,0,0.08)',
              }}>
                Mentorfy AI Experience
              </span>
            </div>
          </div>
        </div>

        {/* Welcome Screen Specs */}
        <div style={{ marginTop: '32px', marginBottom: '48px' }}>
          <div style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '12px',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#000', marginBottom: '8px' }}>Layout</div>
              <ul style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', paddingLeft: '16px', margin: 0 }}>
                <li>All centered</li>
                <li>64px vertical padding</li>
                <li>Max-width 600px</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#000', marginBottom: '8px' }}>Typography</div>
              <ul style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', paddingLeft: '16px', margin: 0 }}>
                <li>Headline: Lora 30px/600</li>
                <li>Subhead: Lora 18px/400</li>
                <li>Button: Geist 16px/500</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#000', marginBottom: '8px' }}>Spacing</div>
              <ul style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', paddingLeft: '16px', margin: 0 }}>
                <li>Avatar → Name: 12px</li>
                <li>Name → Headline: 24px</li>
                <li>Subhead → Button: 32px</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* QUESTIONS */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Questions</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Rafael Asks</h3>
          <p style={styles.subsectionDesc}>
            Questions aren't data collection — they're invitations to reflect. The avatar is present.
            The question is in his voice. Answering feels like a conversation, not a form.
          </p>
        </div>

        {/* Multiple Choice Question */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Multiple Choice Question</h3>
          <p style={styles.subsectionDesc}>
            Quick, direct. Rafael diagnosing. "Where are you at?"
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Default State */}
            <div>
              <div style={styles.label}>Default State</div>
              <div style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '12px',
                padding: '32px 24px',
              }}>
                <div style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                }}>
                  {/* Progress */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <ProgressIndicator accentColor={accentColor} current={1} total={6} />
                  </div>

                  {/* Avatar + Label */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar accentColor={accentColor} size={64} />
                    <div style={{ marginTop: '8px' }}>
                      <RafaelLabel accentColor={accentColor} />
                    </div>
                  </div>

                  {/* Question */}
                  <div style={{
                    fontFamily: "'Lora', Charter, Georgia, serif",
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    marginBottom: '24px',
                  }}>
                    What stage is your tattoo business at right now?
                  </div>

                  {/* Options - Default */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Fully booked out 3+ months',
                      'Booked out 1-2 months',
                      'Booked about a month ahead',
                      'Booked 1-2 weeks out',
                      'Bookings are inconsistent',
                    ].map((option, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #EBEBEB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontFamily: "'Lora', Charter, Georgia, serif",
                          fontSize: '17px',
                          color: '#111',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                          cursor: 'pointer',
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected State */}
            <div>
              <div style={styles.label}>Selected State</div>
              <div style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '12px',
                padding: '32px 24px',
              }}>
                <div style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                }}>
                  {/* Progress */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <ProgressIndicator accentColor={accentColor} current={1} total={6} />
                  </div>

                  {/* Avatar + Label */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar accentColor={accentColor} size={64} />
                    <div style={{ marginTop: '8px' }}>
                      <RafaelLabel accentColor={accentColor} />
                    </div>
                  </div>

                  {/* Question */}
                  <div style={{
                    fontFamily: "'Lora', Charter, Georgia, serif",
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    marginBottom: '24px',
                  }}>
                    What stage is your tattoo business at right now?
                  </div>

                  {/* Options - With Selection */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Fully booked out 3+ months',
                      'Booked out 1-2 months',
                      'Booked about a month ahead',
                      'Booked 1-2 weeks out',
                      'Bookings are inconsistent',
                    ].map((option, i) => {
                      const isSelected = i === 3 // "Booked 1-2 weeks out" selected
                      return (
                        <div
                          key={i}
                          style={{
                            backgroundColor: isSelected ? accentLight : '#FFFFFF',
                            border: isSelected ? `2px solid ${accentBorder}` : '1px solid #EBEBEB',
                            borderRadius: '12px',
                            padding: isSelected ? '15px 19px' : '16px 20px',
                            fontFamily: "'Lora', Charter, Georgia, serif",
                            fontSize: '17px',
                            color: '#111',
                            boxShadow: isSelected
                              ? '0 4px 12px rgba(0,0,0,0.05)'
                              : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                            cursor: 'pointer',
                          }}
                        >
                          {option}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Long Answer Question */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Long Answer Question</h3>
          <p style={styles.subsectionDesc}>
            Slower. Reflective. Rafael creating space. "Tell me more."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Empty State */}
            <div>
              <div style={styles.label}>Empty State</div>
              <div style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '12px',
                padding: '32px 24px',
              }}>
                <div style={{
                  maxWidth: '480px',
                  margin: '0 auto',
                }}>
                  {/* Progress */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <ProgressIndicator accentColor={accentColor} current={4} total={6} />
                  </div>

                  {/* Avatar + Label */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar accentColor={accentColor} size={64} />
                    <div style={{ marginTop: '8px' }}>
                      <RafaelLabel accentColor={accentColor} />
                    </div>
                  </div>

                  {/* Question */}
                  <div style={{
                    fontFamily: "'Lora', Charter, Georgia, serif",
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    marginBottom: '24px',
                    maxWidth: '600px',
                  }}>
                    Be honest with me: when you see other artists booked out 6+ months with $5k-$10k sessions... what do you tell yourself about why that's not you yet?
                  </div>

                  {/* Text Area - Empty */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '140px',
                    marginBottom: '16px',
                  }}>
                    <div style={{
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: '16px',
                      color: '#AAAAAA',
                      fontStyle: 'italic',
                    }}>
                      Be real with yourself here...
                    </div>
                  </div>

                  {/* Continue Button - Disabled */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{
                      backgroundColor: '#F5F5F5',
                      color: '#AAAAAA',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      Continue <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filled State */}
            <div>
              <div style={styles.label}>Filled State</div>
              <div style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '12px',
                padding: '32px 24px',
              }}>
                <div style={{
                  maxWidth: '480px',
                  margin: '0 auto',
                }}>
                  {/* Progress */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <ProgressIndicator accentColor={accentColor} current={4} total={6} />
                  </div>

                  {/* Avatar + Label */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar accentColor={accentColor} size={64} />
                    <div style={{ marginTop: '8px' }}>
                      <RafaelLabel accentColor={accentColor} />
                    </div>
                  </div>

                  {/* Question */}
                  <div style={{
                    fontFamily: "'Lora', Charter, Georgia, serif",
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    marginBottom: '24px',
                    maxWidth: '600px',
                  }}>
                    Be honest with me: when you see other artists booked out 6+ months with $5k-$10k sessions... what do you tell yourself about why that's not you yet?
                  </div>

                  {/* Text Area - Filled */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #000000',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '140px',
                    marginBottom: '16px',
                  }}>
                    <div style={{
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: '16px',
                      color: '#111',
                      lineHeight: '1.65',
                    }}>
                      I tell myself they got lucky, or they started earlier, or they have connections I don't have. But if I'm being really honest... I think I'm scared that even if I do everything right, it still won't work for me. Like there's something about them that I just don't have.
                    </div>
                  </div>

                  {/* Continue Button - Active */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      Continue <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Typography Specs */}
        <div style={{ marginTop: '32px', marginBottom: '48px' }}>
          <div style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F0F0F0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Element</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Font</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Size</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Avatar', '—', '64px', 'Centered, shadow-md'],
                  ['Label', 'Geist', '11px / 500', 'Letterspaced 0.1em, #888'],
                  ['Question', 'Lora', '22px / 600', 'Centered, max-width 600px'],
                  ['Option text', 'Lora', '17px / 400', 'Left-aligned in card'],
                  ['Text area', 'Geist', '16px / 400', 'User input is always Geist'],
                  ['Placeholder', 'Geist', '16px / italic', '#AAAAAA'],
                  ['Button', 'Geist', '15px / 500', 'Right-aligned'],
                ].map(([el, font, size, notes], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #E8E8E8' }}>
                    <td style={{ padding: '10px 16px', color: '#111' }}>{el}</td>
                    <td style={{ padding: '10px 16px', color: '#666' }}>{font}</td>
                    <td style={{ padding: '10px 16px', color: '#666' }}>{size}</td>
                    <td style={{ padding: '10px 16px', color: '#666' }}>{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================================ */}
        {/* CHAT CONVERSATION */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Chat Conversation</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Two Voices in Conversation</h3>
          <p style={styles.subsectionDesc}>
            User input is contained (Geist, green bubble). Rafael's words flow freely (Lora, no container).
            The asymmetry signals: "This isn't a chatbot. This is someone who sat down to write to you."
          </p>
        </div>

        <div style={styles.showcase}>
          <div style={{
            maxWidth: '720px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}>
            {/* User message */}
            <UserBubble accentColor={accentColor}>
              What's the most important thing I should focus on first?
            </UserBubble>

            {/* Rafael short response */}
            <RafaelMessage accentColor={accentColor}>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#111', margin: 0 }}>
                Your positioning.
              </p>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#111', margin: 0, marginTop: '20px' }}>
                Everything else — content, pricing, sales — gets 10x easier once you're positioned correctly. We need to make you the <em>only</em> choice for a specific type of client.
              </p>
            </RafaelMessage>

            {/* User follow-up */}
            <UserBubble accentColor={accentColor}>
              How do I actually do that?
            </UserBubble>

            {/* Rafael long response with full formatting */}
            <RafaelMessage accentColor={accentColor}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.3',
                margin: 0,
                marginBottom: '16px',
              }}>
                Start with your signature work
              </h2>

              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#111', margin: 0 }}>
                Look at your best client results. Find the intersection of three things:
              </p>

              {/* Numbered list with accent color */}
              <ol style={{
                fontSize: '17px',
                lineHeight: '1.7',
                color: '#111',
                margin: '16px 0 0 0',
                paddingLeft: '8px',
                listStyle: 'none',
              }}>
                {['What people respond to most strongly', 'What people specifically ask you for', 'What you genuinely love doing'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '10px', display: 'flex', gap: '12px' }}>
                    <span style={{ color: accentColor, fontWeight: '600', flexShrink: 0 }}>{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#111', margin: 0, marginTop: '20px' }}>
                <strong style={{ fontWeight: '600' }}>That's your signature.</strong> Don't overthink it — you probably already know what it is. The work that feels effortless to you but <em>remarkable</em> to others.
              </p>

              {/* Divider */}
              <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', margin: '24px 0' }} />

              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.35',
                margin: 0,
                marginBottom: '12px',
              }}>
                Then narrow your audience
              </h3>

              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#111', margin: 0 }}>
                This feels counterintuitive, but <strong style={{ fontWeight: '600' }}>specificity creates demand</strong>. Here's what to focus on:
              </p>

              {/* Bullet list with accent color */}
              <ul style={{
                fontSize: '17px',
                lineHeight: '1.7',
                color: '#111',
                margin: '16px 0 0 0',
                paddingLeft: '8px',
                listStyle: 'none',
              }}>
                {[
                  'Pick one industry or niche you understand deeply',
                  'Identify the specific problem you solve better than anyone',
                  'Name the transformation — before and after'
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: '10px', display: 'flex', gap: '12px' }}>
                    <span style={{ color: accentColor, fontWeight: '600', flexShrink: 0 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#111', margin: 0, marginTop: '20px', fontStyle: 'italic' }}>
                The goal isn't to appeal to everyone. It's to be the obvious choice for someone.
              </p>
            </RafaelMessage>
          </div>
        </div>

        {/* ================================================================ */}
        {/* THINKING STATE */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Thinking State</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>The Pause Before Insight</h3>
          <p style={styles.subsectionDesc}>
            Rafael doesn't respond instantly. He pauses. He thinks. This screen builds anticipation and respect — the wait makes the response feel earned.
          </p>
        </div>

        <ThinkingStateDemo accentColor={accentColor} />

        {/* ================================================================ */}
        {/* AI MOMENT */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>AI Moment</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>The Sacred Moment</h3>
          <p style={styles.subsectionDesc}>
            This is THE moment. The user just answered vulnerable questions. They're waiting to see if this thing actually gets them.
            This screen either confirms their cynicism or shatters it. The feeling: "Someone finally sees me."
          </p>
        </div>

        <div style={{
          backgroundColor: '#FAF9F8',
          borderRadius: '12px',
          padding: '32px 24px 48px',
        }}>
          <div style={{
            maxWidth: '640px',
            margin: '0 auto',
          }}>
            {/* Progress Indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <ProgressIndicator accentColor={accentColor} current={4} total={6} />
            </div>

            {/* Avatar + Label */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '32px',
            }}>
              <Avatar accentColor={accentColor} size={64} />
              <div style={{ marginTop: '12px' }}>
                <RafaelLabel accentColor={accentColor} />
              </div>
            </div>

            {/* Content - Sales letter style */}
            <div style={{ fontFamily: "'Lora', Charter, Georgia, serif" }}>

              {/* Opening */}
              <h1 style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.2',
                margin: 0,
                marginBottom: '24px',
              }}>
                Here's what I see.
              </h1>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                You're doing the work. Showing up. Putting in the hours when nobody's watching.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                Your art is good — genuinely good. I can tell you take this seriously. You're not here because you're lazy or untalented. That's not the problem.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                The problem is you've been playing a game you were never taught the rules to.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', margin: '40px 0' }} />

              {/* Section 2 */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.35',
                margin: 0,
                marginBottom: '16px',
              }}>
                You're stuck in a pattern I see all the time with talented artists.
              </h2>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                You're trading time for money. Hoping that if you just keep getting better, keep posting, keep grinding — eventually the right people will notice.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                They won't. Not like this.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                I know that's hard to hear. You've been told your whole life that hard work pays off. And it does — but only when it's visible to the right people.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                Right now, your work is invisible to the people who would pay premium prices for it.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', margin: '40px 0' }} />

              {/* Section 3 */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.35',
                margin: 0,
                marginBottom: '16px',
              }}>
                The artists who are booked out 6+ months with $5k-$10k sessions?
              </h2>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                They're not more talented than you. I've seen their work. Some of them aren't even close to your level technically.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                But they figured out something that nobody teaches us as artists:
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#000', margin: 0, marginTop: '20px' }}>
                <strong style={{ fontWeight: '600' }}>Visibility isn't about posting more. It's about positioning.</strong>
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                They're not competing with every other tattoo artist in their city. They carved out a space where they're the ONLY choice for a specific type of client.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                When you're the only choice, price becomes irrelevant. Clients don't negotiate. They just ask when you're available.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', margin: '40px 0' }} />

              {/* Section 4 */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.35',
                margin: 0,
                marginBottom: '16px',
              }}>
                Here's what's actually happening in your business right now.
              </h2>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                You're one of many. A talented artist in a sea of talented artists. And when clients see a sea, they shop on price — because nothing tells them why YOU are worth more than anyone else.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                That's why you get price shoppers. That's why bookings are inconsistent. That's why you feel like you're working harder than people who are making more.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#000', margin: 0, marginTop: '20px' }}>
                <strong style={{ fontWeight: '600' }}>That's not a you problem. That's a visibility problem.</strong>
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                And visibility problems are fixable.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', margin: '40px 0' }} />

              {/* Section 5 - The Plan */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.35',
                margin: 0,
                marginBottom: '16px',
              }}>
                Here's what we're going to do together.
              </h2>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                Over the next few levels, I'm going to show you exactly how I went from struggling to get bookings to being booked out all year with premium clients who never negotiate.
              </p>

              {/* Level List */}
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                  <strong style={{ fontWeight: '600', color: '#000' }}>Level 2: Premium Pricing</strong> — How to set prices that attract better clients, not scare them away.
                </p>
                <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                  <strong style={{ fontWeight: '600', color: '#000' }}>Level 3: Sales Psychology</strong> — Why people actually buy, and how to make saying yes feel easy.
                </p>
                <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                  <strong style={{ fontWeight: '600', color: '#000' }}>Level 4: The "Booked Out" Funnel</strong> — The simple system that keeps your calendar full without constantly hustling for clients.
                </p>
                <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                  <strong style={{ fontWeight: '600', color: '#000' }}>Level 5: The ICM Playbook</strong> — My exact content method that takes 30 minutes a day and attracts clients who are ready to book.
                </p>
              </div>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '24px' }}>
                This isn't theory. This isn't motivation. This is the exact method — the same one that works for hundreds of artists I've helped.
              </p>

              {/* Section 6 - Closing (no divider) */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '1.35',
                margin: 0,
                marginTop: '40px',
                marginBottom: '16px',
              }}>
                Your work is already good enough.
              </h2>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                You don't need another course on technique. You don't need to "find your style." Your style is there. Your skill is there.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                What's missing is the visibility. The positioning. The system that puts your work in front of people who will pay what it's worth.
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#000', margin: 0, marginTop: '20px' }}>
                <strong style={{ fontWeight: '600' }}>That's what I'm going to help you build.</strong>
              </p>

              <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                Let's get started.
              </p>

              {/* Continue button - bottom right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px' }}>
                <button style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  Continue <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* CHAT HOME */}
        {/* ================================================================ */}
        <div style={styles.sectionHeader}>Chat Home</div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>The Hub</h3>
          <p style={styles.subsectionDesc}>
            This is home. Users return here every time. Rafael's message is already waiting — personalized, aware, ready.
            Two paths forward: start the next level, or type to chat. The relationship lives here.
          </p>
        </div>

        {/* State 1: Next Level Ready - Mobile + Desktop Views */}
        <div style={{ marginBottom: '48px' }}>
          <div style={styles.label}>State 1: Next Level Ready</div>
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>

            {/* MOBILE VIEW */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center' }}>MOBILE (375px)</div>
              <div style={{
                width: '375px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '667px',
              }}>
                {/* Top Reserved Space */}
                <div style={{ height: '48px', flexShrink: 0 }} />

                {/* Content Area */}
                <div style={{
                  flex: 1,
                  padding: '0 24px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  {/* Avatar */}
                  <Avatar accentColor={accentColor} size={80} />

                  {/* Name + Badge */}
                  <div style={{ marginTop: '16px', marginBottom: '32px' }}>
                    <RafaelLabel accentColor={accentColor} />
                  </div>

                  {/* Message - LEFT ALIGNED */}
                  <div style={{
                    width: '100%',
                    maxWidth: '340px',
                    textAlign: 'left',
                    fontFamily: "'Lora', Charter, Georgia, serif",
                  }}>
                    <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                      You finished Level 2 yesterday — nice work.
                    </p>
                    <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                      You've got pricing down. Now let's talk about why people actually buy.
                    </p>
                    <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                      Level 3 is <strong style={{ fontWeight: '600', color: '#111' }}>Sales Psychology</strong>. This is where it clicks for most people.
                    </p>
                    <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                      Ready to keep going?
                    </p>

                    {/* CTA Button - Full Width */}
                    <button style={{
                      width: '100%',
                      backgroundColor: '#000',
                      color: '#fff',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '500',
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}>
                      Start Level 3 <span>→</span>
                    </button>
                  </div>

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />
                </div>

                {/* Input Area - Modern, refined */}
                <div style={{ padding: '12px 16px' }}>
                  <div style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #EBEBEB',
                    borderRadius: '16px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    height: '44px',
                    boxSizing: 'border-box',
                  }}>
                    {/* Plus Icon */}
                    <div style={{ width: '20px', height: '20px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>

                    {/* Text Field */}
                    <span style={{
                      flex: 1,
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: '15px',
                      color: '#AAA',
                    }}>
                      Message Rafael...
                    </span>

                    {/* Mic Icon */}
                    <div style={{ width: '18px', height: '18px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                    </div>

                    {/* Send Icon - No background when inactive */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#CCC',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center' }}>DESKTOP (800px)</div>
              <div style={{
                width: '800px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Top Reserved Space */}
                <div style={{ height: '64px', flexShrink: 0 }} />

                {/* Content Area */}
                <div style={{
                  flex: 1,
                  padding: '0 48px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  {/* Avatar */}
                  <Avatar accentColor={accentColor} size={96} />

                  {/* Name + Badge */}
                  <div style={{ marginTop: '16px', marginBottom: '40px' }}>
                    <RafaelLabel accentColor={accentColor} />
                  </div>

                  {/* Message - LEFT ALIGNED */}
                  <div style={{
                    width: '100%',
                    maxWidth: '440px',
                    textAlign: 'left',
                    fontFamily: "'Lora', Charter, Georgia, serif",
                  }}>
                    <p style={{ fontSize: '19px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                      You finished Level 2 yesterday — nice work.
                    </p>
                    <p style={{ fontSize: '19px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                      You've got pricing down. Now let's talk about why people actually buy.
                    </p>
                    <p style={{ fontSize: '19px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                      Level 3 is <strong style={{ fontWeight: '600', color: '#111' }}>Sales Psychology</strong>. This is where it clicks for most people.
                    </p>
                    <p style={{ fontSize: '19px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                      Ready to keep going?
                    </p>

                    {/* CTA Button - Full Width */}
                    <button style={{
                      width: '100%',
                      backgroundColor: '#000',
                      color: '#fff',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '500',
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}>
                      Start Level 3 <span>→</span>
                    </button>
                  </div>

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />

                  {/* Input Area - Modern, refined */}
                  <div style={{ width: '100%', maxWidth: '440px', marginTop: '48px' }}>
                    <div style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #EBEBEB',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      height: '44px',
                      boxSizing: 'border-box',
                    }}>
                      {/* Plus Icon */}
                      <div style={{ width: '20px', height: '20px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>

                      {/* Text Field */}
                      <span style={{
                        flex: 1,
                        fontFamily: "'Geist', -apple-system, sans-serif",
                        fontSize: '15px',
                        color: '#AAA',
                      }}>
                        Message Rafael...
                      </span>

                      {/* Mic Icon */}
                      <div style={{ width: '18px', height: '18px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                      </div>

                      {/* Send Icon - No background when inactive */}
                      <div style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#CCC',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State 2: Just Finished */}
        <div style={{ marginBottom: '48px' }}>
          <div style={styles.label}>State 2: Just Finished a Level</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '375px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px',
            }}>
              {/* Top Reserved Space */}
              <div style={{ height: '48px', flexShrink: 0 }} />

              {/* Content Area */}
              <div style={{
                flex: 1,
                padding: '0 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Avatar */}
                <Avatar accentColor={accentColor} size={80} />

                {/* Name + Badge */}
                <div style={{ marginTop: '16px', marginBottom: '32px' }}>
                  <RafaelLabel accentColor={accentColor} />
                </div>

                {/* Message - LEFT ALIGNED */}
                <div style={{
                  width: '100%',
                  maxWidth: '340px',
                  textAlign: 'left',
                  fontFamily: "'Lora', Charter, Georgia, serif",
                }}>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                    <strong style={{ fontWeight: '600', color: '#111' }}>That was a big one.</strong>
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                    You just learned why most artists treat sales like a dirty word — and how to reframe it entirely.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                    Take a breath. Let it sink in.
                  </p>

                  {/* CTA Button - Full Width */}
                  <button style={{
                    width: '100%',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                    Start Level 4 <span>→</span>
                  </button>

                  <p style={{ fontSize: '14px', color: '#888', margin: 0, marginTop: '16px', textAlign: 'center' }}>
                    Or let's talk about it.
                  </p>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />
              </div>

              {/* Input Area - Modern */}
              <div style={{ padding: '12px 16px' }}>
                <div style={{
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #EBEBEB',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  height: '44px',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ width: '20px', height: '20px', color: '#AAA', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <span style={{ flex: 1, fontFamily: "'Geist', -apple-system, sans-serif", fontSize: '15px', color: '#AAA' }}>
                    Message Rafael...
                  </span>
                  <div style={{ width: '18px', height: '18px', color: '#AAA', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CCC', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State 3: Time Away */}
        <div style={{ marginBottom: '48px' }}>
          <div style={styles.label}>State 3: Returning After Time Away</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '375px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px',
            }}>
              {/* Top Reserved Space */}
              <div style={{ height: '48px', flexShrink: 0 }} />

              {/* Content Area */}
              <div style={{
                flex: 1,
                padding: '0 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Avatar */}
                <Avatar accentColor={accentColor} size={80} />

                {/* Name + Badge */}
                <div style={{ marginTop: '16px', marginBottom: '32px' }}>
                  <RafaelLabel accentColor={accentColor} />
                </div>

                {/* Message - LEFT ALIGNED */}
                <div style={{
                  width: '100%',
                  maxWidth: '340px',
                  textAlign: 'left',
                  fontFamily: "'Lora', Charter, Georgia, serif",
                }}>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                    Been a minute. No stress — life happens.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                    Last time we talked, you'd just finished Level 3. You were thinking about that client who always negotiates.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                    Did you try anything? How'd it go?
                  </p>

                  {/* CTA Button - Full Width */}
                  <button style={{
                    width: '100%',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                    Start Level 4 <span>→</span>
                  </button>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />
              </div>

              {/* Input Area - Modern */}
              <div style={{ padding: '12px 16px' }}>
                <div style={{
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #EBEBEB',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  height: '44px',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ width: '20px', height: '20px', color: '#AAA', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <span style={{ flex: 1, fontFamily: "'Geist', -apple-system, sans-serif", fontSize: '15px', color: '#AAA' }}>
                    Message Rafael...
                  </span>
                  <div style={{ width: '18px', height: '18px', color: '#AAA', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CCC', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State 4: All Complete */}
        <div style={{ marginBottom: '48px' }}>
          <div style={styles.label}>State 4: All Levels Complete</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '375px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px',
            }}>
              {/* Top Reserved Space */}
              <div style={{ height: '48px', flexShrink: 0 }} />

              {/* Content Area */}
              <div style={{
                flex: 1,
                padding: '0 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Avatar */}
                <Avatar accentColor={accentColor} size={80} />

                {/* Name + Badge */}
                <div style={{ marginTop: '16px', marginBottom: '32px' }}>
                  <RafaelLabel accentColor={accentColor} />
                </div>

                {/* Message - LEFT ALIGNED */}
                <div style={{
                  width: '100%',
                  maxWidth: '340px',
                  textAlign: 'left',
                  fontFamily: "'Lora', Charter, Georgia, serif",
                }}>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0 }}>
                    <strong style={{ fontWeight: '600', color: '#111' }}>You did it. All 6 levels.</strong>
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                    You came in unsure if your work was good enough to charge more. Now you've got pricing, sales psychology, a funnel, and a content system.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#222', margin: 0, marginTop: '20px' }}>
                    I'm proud of you.
                  </p>

                  {/* CTA Button - Full Width - Accent for completion */}
                  <button style={{
                    width: '100%',
                    backgroundColor: accentColor,
                    color: '#fff',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                    Book Graduation Call <span>→</span>
                  </button>

                  <p style={{ fontSize: '14px', color: '#888', margin: 0, marginTop: '16px', textAlign: 'center' }}>
                    Or I'm always here to chat.
                  </p>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />
              </div>

              {/* Input Area - Modern */}
              <div style={{ padding: '12px 16px' }}>
                <div style={{
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #EBEBEB',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  height: '44px',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ width: '20px', height: '20px', color: '#AAA', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <span style={{ flex: 1, fontFamily: "'Geist', -apple-system, sans-serif", fontSize: '15px', color: '#AAA' }}>
                    Message Rafael...
                  </span>
                  <div style={{ width: '18px', height: '18px', color: '#AAA', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CCC', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Field Detail View */}
        <div style={{ marginBottom: '48px' }}>
          <div style={styles.label}>Input Field States</div>
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>

            {/* Default State */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center' }}>DEFAULT</div>
              <div style={{
                width: '340px',
                backgroundColor: '#FAFAFA',
                border: '1px solid #EBEBEB',
                borderRadius: '16px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '44px',
                boxSizing: 'border-box',
              }}>
                {/* Plus Icon - Refined */}
                <div style={{ width: '20px', height: '20px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>

                {/* Text Field */}
                <span style={{
                  flex: 1,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  fontSize: '15px',
                  color: '#AAA',
                }}>
                  Message Rafael...
                </span>

                {/* Mic Icon - Refined */}
                <div style={{ width: '18px', height: '18px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>

                {/* Send Icon - Just arrow, no background when inactive */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CCC',
                  cursor: 'pointer',
                  flexShrink: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Focused State (Empty) */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center' }}>FOCUSED</div>
              <div style={{
                width: '340px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DDD',
                borderRadius: '16px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '44px',
                boxSizing: 'border-box',
                boxShadow: '0 0 0 3px rgba(0,0,0,0.04)',
              }}>
                {/* Plus Icon */}
                <div style={{ width: '20px', height: '20px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>

                {/* Cursor indicator */}
                <span style={{
                  flex: 1,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  fontSize: '15px',
                  color: '#333',
                }}>
                  <span style={{ borderRight: '1.5px solid #333', paddingRight: '1px' }}></span>
                </span>

                {/* Mic Icon */}
                <div style={{ width: '18px', height: '18px', color: '#AAA', cursor: 'pointer', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>

                {/* Send Icon - Still inactive */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CCC',
                  cursor: 'pointer',
                  flexShrink: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active State (Typing) */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center' }}>TYPING</div>
              <div style={{
                width: '340px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DDD',
                borderRadius: '16px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '44px',
                boxSizing: 'border-box',
                boxShadow: '0 0 0 3px rgba(0,0,0,0.04)',
              }}>
                {/* Plus Icon - Faded when typing */}
                <div style={{ width: '20px', height: '20px', color: '#CCC', cursor: 'pointer', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>

                {/* Text Field - With Content */}
                <span style={{
                  flex: 1,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  fontSize: '15px',
                  color: '#333',
                }}>
                  I've been thinking about my pricing<span style={{ borderRight: '1.5px solid #333', paddingRight: '1px' }}></span>
                </span>

                {/* Mic Icon - Hidden when typing */}
                <div style={{ width: '18px', height: '18px', color: '#DDD', cursor: 'pointer', flexShrink: 0, opacity: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>

                {/* Send Icon - Active with accent background */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: accentColor,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  cursor: 'pointer',
                  flexShrink: 0
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Field Anatomy */}
        <div style={{ marginBottom: '48px' }}>
          <div style={styles.label}>Input Field Anatomy</div>
          <div style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#FFF',
                  border: '1px solid #EBEBEB',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div style={{ fontSize: '10px', color: '#888', fontWeight: '500', letterSpacing: '0.02em' }}>Attach</div>
                <div style={{ fontSize: '9px', color: '#BBB', marginTop: '2px' }}>20px</div>
              </div>

              <div style={{ textAlign: 'center', flex: 1, minWidth: '140px' }}>
                <div style={{
                  height: '36px',
                  backgroundColor: '#FFF',
                  border: '1px solid #EBEBEB',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  padding: '0 16px',
                }}>
                  <span style={{ fontSize: '13px', color: '#AAA', fontFamily: "'Geist', -apple-system, sans-serif" }}>Message Rafael...</span>
                </div>
                <div style={{ fontSize: '10px', color: '#888', fontWeight: '500', letterSpacing: '0.02em' }}>Message Field</div>
                <div style={{ fontSize: '9px', color: '#BBB', marginTop: '2px' }}>Geist 15px</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#FFF',
                  border: '1px solid #EBEBEB',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <div style={{ fontSize: '10px', color: '#888', fontWeight: '500', letterSpacing: '0.02em' }}>Voice</div>
                <div style={{ fontSize: '9px', color: '#BBB', marginTop: '2px' }}>18px</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: accentColor,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>
                <div style={{ fontSize: '10px', color: '#888', fontWeight: '500', letterSpacing: '0.02em' }}>Send</div>
                <div style={{ fontSize: '9px', color: '#BBB', marginTop: '2px' }}>28px circle</div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Table - Updated */}
        <div style={{
          backgroundColor: '#FAFAFA',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '48px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F0F0F0' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Element</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Mobile</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>Desktop</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Top reserved space', '48px', '64px'],
                ['Avatar', '80px, centered, full glow', '96px, centered, full glow'],
                ['Name badge gap', '16px below avatar', '16px below avatar'],
                ['Message text', 'Lora 18px/400, #222, max-width 340px', 'Lora 19px/400, #222, max-width 440px'],
                ['Line-height', '1.75', '1.75'],
                ['Paragraph spacing', '20px', '20px'],
                ['Text alignment', 'LEFT', 'LEFT'],
                ['CTA button', 'Black, Geist 16px/500, 12px radius, 100% width', 'Same as mobile'],
                ['CTA margin-top', '32px from last paragraph', '32px'],
                ['Input container', '#FAFAFA bg, 1px #EBEBEB, 16px radius, 44px height', 'Same as mobile'],
                ['Input padding', '10px 14px', 'Same as mobile'],
                ['Input typography', 'Geist 15px, #AAA placeholder, #333 text', 'Same as mobile'],
                ['Plus icon', '20px, 1.5px stroke, #AAA', 'Same as mobile'],
                ['Mic icon', '18px, 1.5px stroke, #AAA', 'Same as mobile'],
                ['Send button', '28px, no bg when inactive (#CCC arrow)', '28px circle, #10B981 when active'],
                ['Focus state', 'White bg, 1px #DDD, subtle shadow ring', 'Same as mobile'],
              ].map(([el, mobile, desktop], i) => (
                <tr key={i} style={{ borderTop: '1px solid #E8E8E8' }}>
                  <td style={{ padding: '10px 16px', color: '#111', fontWeight: '500' }}>{el}</td>
                  <td style={{ padding: '10px 16px', color: '#666' }}>{mobile}</td>
                  <td style={{ padding: '10px 16px', color: '#666' }}>{desktop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Design Decisions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '48px' }}>
          <div style={{
            backgroundColor: '#F0F9FF',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#0369A1', marginBottom: '12px' }}>Layout Changes</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#0284C7', lineHeight: '1.8' }}>
              <li>Text now LEFT aligned</li>
              <li>Avatar increased to 80/96px</li>
              <li>Top reserved space (48/64px)</li>
              <li>Full-width CTA buttons</li>
              <li>12px border-radius on buttons</li>
            </ul>
          </div>
          <div style={{
            backgroundColor: '#ECFDF5',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#065F46', marginBottom: '12px' }}>Modern Input</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#047857', lineHeight: '1.8' }}>
              <li>Subtle container: #FAFAFA, 1px #EBEBEB</li>
              <li>Thinner icons: 1.5px stroke, 18-20px</li>
              <li>Tighter: 44px height, 10px padding</li>
              <li>Send: no bg inactive, accent circle active</li>
              <li>Focus: white bg + subtle shadow ring</li>
            </ul>
          </div>
          <div style={{
            backgroundColor: '#FDF4FF',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#86198F', marginBottom: '12px' }}>Philosophy</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#A21CAF', lineHeight: '1.8' }}>
              <li>Radical simplicity</li>
              <li>No navigation clutter</li>
              <li>Avatar feels present</li>
              <li>Message feels personal</li>
              <li>Two clear paths forward</li>
            </ul>
          </div>
        </div>

        {/* Philosophy Note */}
        <div style={{
          backgroundColor: '#FAFAFA',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '48px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Lora', Charter, Georgia, serif",
            fontSize: '17px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0,
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            It's Rafael. A message. An action. An input.<br />
            <strong style={{ fontWeight: '600', color: '#111' }}>The simplicity IS the design.</strong>
          </p>
        </div>

        {/* ================================================================ */}
        {/* FOOTER */}
        {/* ================================================================ */}
        <div style={{
          marginTop: '96px',
          paddingTop: '32px',
          borderTop: '1px solid #EBEBEB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: '13px', color: '#AAA' }}>
            Mentorfy Design System
          </div>
          <div style={{ fontSize: '13px', color: '#AAA' }}>
            Precision in service of warmth.
          </div>
        </div>
      </div>
    </div>
  )
}
