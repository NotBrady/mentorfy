'use client'

import { usePostHog } from 'posthog-js/react'
import { useCallback } from 'react'

export interface AnalyticsContext {
  sessionId?: string
  flowId?: string
}

export function useAnalytics(context?: AnalyticsContext) {
  const posthog = usePostHog()

  const trackFlowStarted = useCallback(
    (props: { flowId: string; sessionId: string }) => {
      posthog?.capture('flow_started', {
        flow_id: props.flowId,
        session_id: props.sessionId,
        ...context,
      })
    },
    [posthog, context]
  )

  const trackStepCompleted = useCallback(
    (props: {
      stepIndex: number
      phaseId: number
      phaseName: string
      stepType: string
      answerText?: string
      answerValue?: string
    }) => {
      posthog?.capture('step_completed', {
        step_index: props.stepIndex,
        phase_id: props.phaseId,
        phase_name: props.phaseName,
        step_type: props.stepType,
        answer_text: props.answerText,
        answer_value: props.answerValue,
        ...context,
      })
    },
    [posthog, context]
  )

  const trackPhaseCompleted = useCallback(
    (props: {
      phaseId: number
      phaseName: string
      phasesCompletedSoFar: number[]
    }) => {
      posthog?.capture('phase_completed', {
        phase_id: props.phaseId,
        phase_name: props.phaseName,
        phases_completed_so_far: props.phasesCompletedSoFar,
        ...context,
      })
    },
    [posthog, context]
  )

  const trackChatOpened = useCallback(
    (props: { phasesCompleted: number[]; chatVersion: string }) => {
      posthog?.capture('chat_opened', {
        phases_completed: props.phasesCompleted,
        chat_version: props.chatVersion,
        ...context,
      })
    },
    [posthog, context]
  )

  const trackChatMessage = useCallback(
    (props: { messageIndex: number; messageLength: number }) => {
      posthog?.capture('chat_message_sent', {
        message_index: props.messageIndex,
        message_length: props.messageLength,
        ...context,
      })
    },
    [posthog, context]
  )

  const trackEmbedShown = useCallback(
    (props: {
      embedType: 'checkout' | 'booking' | 'video'
      source: 'sales_page' | 'chat'
    }) => {
      posthog?.capture('embed_shown', {
        embed_type: props.embedType,
        source: props.source,
        ...context,
      })
    },
    [posthog, context]
  )

  const trackBookingClicked = useCallback(
    (props: {
      source: 'sales_page' | 'chat'
      stepId?: string
      chatMessageIndex?: number
    }) => {
      posthog?.capture('booking_clicked', {
        source: props.source,
        step_id: props.stepId,
        chat_message_index: props.chatMessageIndex,
        ...context,
      })
    },
    [posthog, context]
  )

  const identify = useCallback(
    (userId: string, traits?: Record<string, any>) => {
      posthog?.identify(userId, traits)
    },
    [posthog]
  )

  return {
    trackFlowStarted,
    trackStepCompleted,
    trackPhaseCompleted,
    trackChatOpened,
    trackChatMessage,
    trackEmbedShown,
    trackBookingClicked,
    identify,
  }
}
