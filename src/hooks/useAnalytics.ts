'use client'

import { usePostHog } from 'posthog-js/react'
import { useCallback, useMemo, useRef } from 'react'

export interface AnalyticsContext {
  session_id: string
  flow_id: string
}

export function useAnalytics(context: AnalyticsContext) {
  const posthog = usePostHog()

  // Timers for duration tracking
  const stepStartTime = useRef<number>(Date.now())
  const phaseStartTime = useRef<number>(Date.now())

  // Base properties included in every event
  const baseProps = useMemo(() => ({
    session_id: context.session_id,
    flow_id: context.flow_id,
  }), [context.session_id, context.flow_id])

  const startStepTimer = useCallback(() => {
    stepStartTime.current = Date.now()
  }, [])

  const startPhaseTimer = useCallback(() => {
    phaseStartTime.current = Date.now()
  }, [])

  // ─────────────────────────────────────────────────────────────
  // flow_started
  // ─────────────────────────────────────────────────────────────
  const trackFlowStarted = useCallback(
    (props?: { utm_source?: string | null; utm_campaign?: string | null }) => {
      posthog?.capture('flow_started', {
        ...baseProps,
        utm_source: props?.utm_source ?? null,
        utm_campaign: props?.utm_campaign ?? null,
      })
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // step_completed
  // ─────────────────────────────────────────────────────────────
  const trackStepCompleted = useCallback(
    (props: {
      stepIndex: number          // Overall position in flow (0-indexed across all phases)
      phaseId: number
      phaseName: string
      phaseStepIndex: number     // Position within this phase (0-indexed)
      stepType: string
      answerKey?: string         // Which question (null for non-questions)
      answerValue?: string       // Multiple choice value (null for long-form)
      answerText?: string        // Full long-form text (null for multiple choice)
    }) => {
      const timeOnStep = Date.now() - stepStartTime.current
      posthog?.capture('step_completed', {
        ...baseProps,
        step_id: `phase-${props.phaseId}-step-${props.phaseStepIndex}`,
        step_type: props.stepType,
        step_index: props.stepIndex,
        phase_id: props.phaseId,
        phase_name: props.phaseName,
        phase_step_index: props.phaseStepIndex,
        time_on_step_ms: timeOnStep,
        answer_key: props.answerKey ?? null,
        answer_value: props.answerValue ?? null,
        answer_text: props.answerText ?? null,
        answer_length: props.answerText?.length ?? props.answerValue?.length ?? null,
      })
      // Reset timer for next step
      stepStartTime.current = Date.now()
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // phase_completed
  // ─────────────────────────────────────────────────────────────
  const trackPhaseCompleted = useCallback(
    (props: {
      phaseId: number
      phaseName: string
      phasesCompletedSoFar: number[]
    }) => {
      const timeInPhase = Date.now() - phaseStartTime.current
      posthog?.capture('phase_completed', {
        ...baseProps,
        phase_id: props.phaseId,
        phase_name: props.phaseName,
        phases_completed_so_far: props.phasesCompletedSoFar,
        time_in_phase_ms: timeInPhase,
      })
      // Reset timer for next phase
      phaseStartTime.current = Date.now()
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // chat_opened
  // ─────────────────────────────────────────────────────────────
  const trackChatOpened = useCallback(
    (props: { phasesCompleted: number[]; chatAfterPhase: number }) => {
      posthog?.capture('chat_opened', {
        ...baseProps,
        phases_completed: props.phasesCompleted,
        chat_after_phase: props.chatAfterPhase,  // Which phase was just completed
      })
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // chat_message_sent
  // ─────────────────────────────────────────────────────────────
  const trackChatMessage = useCallback(
    (props: {
      messageIndex: number
      messageLength: number
      phasesCompleted: number[]
      chatAfterPhase: number
    }) => {
      posthog?.capture('chat_message_sent', {
        ...baseProps,
        phases_completed: props.phasesCompleted,
        chat_after_phase: props.chatAfterPhase,
        message_index: props.messageIndex,
        message_length: props.messageLength,
      })
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // embed_shown
  // ─────────────────────────────────────────────────────────────
  const trackEmbedShown = useCallback(
    (props: {
      embedType: 'checkout' | 'booking' | 'video'
      source: 'sales_page' | 'chat'
      phasesCompleted: number[]
    }) => {
      posthog?.capture('embed_shown', {
        ...baseProps,
        embed_type: props.embedType,
        source: props.source,
        phases_completed: props.phasesCompleted,
      })
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // booking_clicked
  // ─────────────────────────────────────────────────────────────
  const trackBookingClicked = useCallback(
    (props: {
      source: 'sales_page' | 'chat'
      phasesCompleted: number[]
      stepId?: string            // If source = sales_page
      chatMessageIndex?: number  // If source = chat
    }) => {
      posthog?.capture('booking_clicked', {
        ...baseProps,
        source: props.source,
        phases_completed: props.phasesCompleted,
        step_id: props.stepId ?? null,
        chat_message_index: props.chatMessageIndex ?? null,
      })
    },
    [posthog, baseProps]
  )

  // ─────────────────────────────────────────────────────────────
  // identify (call when contact info submitted)
  // ─────────────────────────────────────────────────────────────
  const identify = useCallback(
    (props: { email: string; name?: string; phone?: string }) => {
      posthog?.identify(context.session_id, {
        email: props.email,
        name: props.name,
        phone: props.phone,
        flow_id: context.flow_id,
      })
    },
    [posthog, context]
  )

  return {
    startStepTimer,
    startPhaseTimer,
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
