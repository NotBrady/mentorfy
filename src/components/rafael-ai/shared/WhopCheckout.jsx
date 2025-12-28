import { useState } from 'react'
import { motion } from 'framer-motion'
import { WhopCheckoutEmbed } from '@whop/checkout/react'

const ACCENT_COLOR = '#10B981'

export function WhopCheckout({ planId, isVisible = true, onComplete }) {
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  const handleComplete = (completedPlanId, receiptId) => {
    console.log('Purchase complete:', completedPlanId, receiptId)
    setPurchaseComplete(true)
    onComplete?.(completedPlanId, receiptId)
  }

  if (purchaseComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: '100%',
          margin: '20px 0',
          padding: '24px',
          borderRadius: '12px',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          textAlign: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '8px',
        }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={ACCENT_COLOR}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style={{
            fontFamily: "'Lora', Charter, Georgia, serif",
            fontSize: '18px',
            fontWeight: '600',
            color: ACCENT_COLOR,
          }}>
            Payment successful!
          </span>
        </div>
        <p style={{
          fontFamily: "'Geist', -apple-system, sans-serif",
          fontSize: '14px',
          color: '#666',
          margin: 0,
        }}>
          You now have access to Level 2. Let's get started.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.98 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        width: '100%',
        margin: '20px 0',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      <WhopCheckoutEmbed
        planId={planId}
        theme="light"
        themeAccentColor="green"
        skipRedirect={true}
        onComplete={handleComplete}
      />
    </motion.div>
  )
}
