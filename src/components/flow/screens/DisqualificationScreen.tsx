'use client'

import { motion } from 'framer-motion'
import { MentorAvatar } from '../shared/MentorAvatar'
import { MentorfyWatermark } from '../shared/MentorfyWatermark'

const BACKGROUND_COLOR = '#FAF6F0'

interface DisqualificationScreenProps {
  headline: string
  message: string
  flowId?: string
}

export function DisqualificationScreen({
  headline,
  message,
  flowId = 'growthoperator'
}: DisqualificationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100vh',
        backgroundColor: BACKGROUND_COLOR,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{
        maxWidth: '480px',
        textAlign: 'center',
      }}>
        {/* Avatar */}
        <div style={{ marginBottom: '24px' }}>
          <MentorAvatar size={64} flowId={flowId} />
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Lora', Charter, Georgia, serif",
          fontSize: '28px',
          fontWeight: '600',
          color: '#000',
          marginBottom: '20px',
          lineHeight: '1.3',
        }}>
          {headline}
        </h1>

        {/* Message */}
        <div style={{
          fontFamily: "'Lora', Charter, Georgia, serif",
          fontSize: '17px',
          color: '#444',
          lineHeight: '1.7',
          whiteSpace: 'pre-line',
        }}>
          {message}
        </div>

        {/* Watermark */}
        <div style={{ marginTop: '48px' }}>
          <MentorfyWatermark />
        </div>
      </div>
    </motion.div>
  )
}
