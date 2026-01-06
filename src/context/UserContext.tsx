'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'

const CLERK_ORG_ID = 'org_35wDDMLUgC1nZZLkDLtZ3A8TbJY' // MVP hardcode

const initialState = {
  sessionId: null as string | null,
  sessionLoading: true,

  user: {
    name: "",
    email: "",
    phone: "",
    createdAt: null as string | null
  },

  // Timeline state for horizontal navigation
  timeline: {
    currentPanel: 0, // 0=past, 1=present (only 2 panels)
    profileComplete: false
  },

  situation: {
    bookingStatus: "",
    dayRate: "",
    goal: "",
    blocker: "",
    confession: "",
    // Legacy fields
    experience: "",
    currentIncome: "",
    biggestChallenge: "",
    longAnswer: ""
  },

  // Phase 2: Views Don't Matter
  phase2: {
    checkFirst: "",
    hundredKFollowers: "",
    postWorked: ""
  },

  // Phase 3: Content Creation
  phase3: {
    timeOnContent: "",
    hardestPart: "",
    contentCreatorIdentity: ""
  },

  // Phase 4: Pricing
  phase4: {
    lastPriceRaise: "",
    tooExpensiveResponse: "",
    pricingFear: ""
  },

  // Legacy fields for backwards compatibility
  level2: {
    pricingFeeling: "",
    raisedPrices: "",
    pricingStory: ""
  },

  level3: {
    sellingFeeling: "",
    lostSale: ""
  },

  progress: {
    currentScreen: "welcome",
    currentPhase: 1,
    currentStep: 0,
    completedPhases: [] as number[],
    videosWatched: [] as string[],
    justCompletedLevel: false
  },

  memory: [] as { date: string; insight: string }[],

  conversation: [] as any[],

  lastVisit: null as string | null,
  firstVisit: null as string | null
}

type State = typeof initialState

type Action =
  | { type: 'SET_SCREEN'; payload: string }
  | { type: 'SET_ANSWER'; payload: { key: string; value: any } }
  | { type: 'ADVANCE_STEP' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'COMPLETE_PHASE'; payload: number }
  | { type: 'START_LEVEL' }
  | { type: 'WATCH_VIDEO'; payload: string }
  | { type: 'ADD_MEMORY'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: any }
  | { type: 'SET_USER'; payload: any }
  | { type: 'UPDATE_VISIT' }
  | { type: 'LOAD_STATE'; payload: State }
  | { type: 'RESET' }
  | { type: 'SET_PANEL'; payload: number }
  | { type: 'SET_PROFILE_COMPLETE'; payload: boolean }
  | { type: 'SET_CURRENT_PHASE'; payload: number }
  | { type: 'SET_SESSION'; payload: { sessionId: string; loading?: boolean } }
  | { type: 'SET_SESSION_LOADING'; payload: boolean }
  | { type: 'HYDRATE_FROM_BACKEND'; payload: any }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SCREEN':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentScreen: action.payload,
          justCompletedLevel: false
        }
      }

    case 'SET_ANSWER': {
      const { key, value } = action.payload
      const parts = key.split('.')
      const section = parts[0]
      const field = parts[1]

      // Validate that section exists and is an object
      const currentSection = (state as any)[section]
      if (!currentSection || typeof currentSection !== 'object') {
        console.warn(`SET_ANSWER: Invalid section "${section}" for key "${key}"`)
        return state
      }

      // If no field specified and value is an object, merge into section
      if (!field && typeof value === 'object' && value !== null) {
        return {
          ...state,
          [section]: {
            ...currentSection,
            ...value
          }
        }
      }

      return {
        ...state,
        [section]: {
          ...currentSection,
          [field]: value
        }
      }
    }

    case 'ADVANCE_STEP':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentStep: state.progress.currentStep + 1
        }
      }

    case 'SET_STEP':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentStep: action.payload
        }
      }

    case 'COMPLETE_PHASE': {
      const phaseId = action.payload
      const completedPhases = state.progress.completedPhases.includes(phaseId)
        ? state.progress.completedPhases
        : [...state.progress.completedPhases, phaseId]

      return {
        ...state,
        progress: {
          ...state.progress,
          completedPhases,
          currentPhase: phaseId + 1,
          currentStep: 0,
          justCompletedLevel: true
          // Note: screen is set separately by the caller
        }
      }
    }

    case 'START_LEVEL':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentScreen: 'level',
          currentStep: 0,
          justCompletedLevel: false
        }
      }

    case 'WATCH_VIDEO': {
      const videoKey = action.payload
      const videosWatched = state.progress.videosWatched.includes(videoKey)
        ? state.progress.videosWatched
        : [...state.progress.videosWatched, videoKey]

      return {
        ...state,
        progress: {
          ...state.progress,
          videosWatched
        }
      }
    }

    case 'ADD_MEMORY':
      return {
        ...state,
        memory: [
          ...state.memory,
          {
            date: new Date().toISOString().split('T')[0],
            insight: action.payload
          }
        ]
      }

    case 'ADD_MESSAGE':
      return {
        ...state,
        conversation: [
          ...state.conversation,
          {
            ...action.payload,
            timestamp: new Date().toISOString()
          }
        ]
      }

    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          createdAt: state.user.createdAt || new Date().toISOString()
        }
      }

    case 'UPDATE_VISIT':
      return {
        ...state,
        lastVisit: new Date().toISOString(),
        firstVisit: state.firstVisit || new Date().toISOString()
      }

    case 'LOAD_STATE':
      return {
        ...action.payload,
        lastVisit: new Date().toISOString()
      }

    case 'RESET':
      return initialState

    case 'SET_PANEL':
      return {
        ...state,
        timeline: {
          ...state.timeline,
          currentPanel: action.payload
        }
      }

    case 'SET_PROFILE_COMPLETE':
      return {
        ...state,
        timeline: {
          ...state.timeline,
          profileComplete: action.payload
        }
      }

    case 'SET_CURRENT_PHASE':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentPhase: action.payload
        }
      }

    case 'SET_SESSION':
      return {
        ...state,
        sessionId: action.payload.sessionId,
        sessionLoading: action.payload.loading ?? false
      }

    case 'SET_SESSION_LOADING':
      return {
        ...state,
        sessionLoading: action.payload
      }

    case 'HYDRATE_FROM_BACKEND': {
      const backendData = action.payload
      return {
        ...state,
        sessionId: backendData.id,
        sessionLoading: false,
        user: {
          ...state.user,
          name: backendData.name || state.user.name,
          email: backendData.email || state.user.email,
          phone: backendData.phone || state.user.phone,
        },
        // Merge backend context into local state if it exists
        ...(backendData.context?.situation && { situation: { ...state.situation, ...backendData.context.situation } }),
        ...(backendData.context?.phase2 && { phase2: { ...state.phase2, ...backendData.context.phase2 } }),
        ...(backendData.context?.phase3 && { phase3: { ...state.phase3, ...backendData.context.phase3 } }),
        ...(backendData.context?.phase4 && { phase4: { ...state.phase4, ...backendData.context.phase4 } }),
        ...(backendData.context?.progress && { progress: { ...state.progress, ...backendData.context.progress } }),
      }
    }

    default:
      return state
  }
}

type ContextValue = {
  state: State
  dispatch: React.Dispatch<Action>
  syncToBackend: () => Promise<null>
}

const UserContext = createContext<ContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isSignedIn, isLoaded, userId } = useAuth()

  // Track if we've already initialized for this auth state
  const initializedForUserRef = useRef<string | null>(null)

  // Sync context to backend session
  const syncToBackend = useCallback(async () => {
    if (!state.sessionId) return null

    try {
      const res = await fetch(`/api/session/${state.sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.user.name || undefined,
          email: state.user.email || undefined,
          phone: state.user.phone || undefined,
          context: {
            situation: state.situation,
            phase2: state.phase2,
            phase3: state.phase3,
            phase4: state.phase4,
            progress: state.progress,
          }
        })
      })

      if (!res.ok) {
        console.error('Failed to sync to backend')
        return null
      }

      return null
    } catch (e) {
      console.error('Sync error:', e)
      return null
    }
  }, [state.sessionId, state.user, state.situation, state.phase2, state.phase3, state.phase4, state.progress])

  // Create a new backend session for authenticated user
  const createSessionForUser = useCallback(async (clerkUserId: string) => {
    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_org_id: CLERK_ORG_ID,
          clerk_user_id: clerkUserId,
          // Include current context so it's saved immediately
          context: {
            situation: state.situation,
            phase2: state.phase2,
            phase3: state.phase3,
            phase4: state.phase4,
            progress: state.progress,
          }
        })
      })

      if (res.ok) {
        const data = await res.json()
        dispatch({ type: 'SET_SESSION', payload: { sessionId: data.sessionId, loading: false } })
        return data.sessionId
      } else {
        console.error('Failed to create session')
        dispatch({ type: 'SET_SESSION_LOADING', payload: false })
        return null
      }
    } catch (e) {
      console.error('Session creation error:', e)
      dispatch({ type: 'SET_SESSION_LOADING', payload: false })
      return null
    }
  }, [state.situation, state.phase2, state.phase3, state.phase4, state.progress])

  // Fetch existing session for authenticated user
  const fetchSessionForUser = useCallback(async (clerkUserId: string) => {
    try {
      const res = await fetch(`/api/session/by-user/${clerkUserId}`)
      if (res.ok) {
        const data = await res.json()
        dispatch({ type: 'HYDRATE_FROM_BACKEND', payload: data })
        return true
      }
      return false
    } catch (e) {
      console.error('Failed to fetch user session:', e)
      return false
    }
  }, [])

  // Initialize session based on auth state
  useEffect(() => {
    if (!isLoaded) return

    // Anonymous users: no backend session, just mark as not loading
    if (!isSignedIn) {
      dispatch({ type: 'SET_SESSION_LOADING', payload: false })
      dispatch({ type: 'UPDATE_VISIT' })
      initializedForUserRef.current = null
      return
    }

    // Authenticated user - only initialize once per userId
    if (userId && initializedForUserRef.current !== userId) {
      initializedForUserRef.current = userId

      const initAuthenticatedSession = async () => {
        // Try to fetch existing session first
        const hasExisting = await fetchSessionForUser(userId)

        if (!hasExisting) {
          // No existing session, create one
          await createSessionForUser(userId)
        }
      }

      initAuthenticatedSession()
    }
  }, [isLoaded, isSignedIn, userId, fetchSessionForUser, createSessionForUser])

  // Auto-sync to backend when authenticated and data changes
  const lastSyncedRef = useRef<string>('')
  useEffect(() => {
    if (!state.sessionId || state.sessionLoading) return

    // Create a sync key from data that should trigger sync
    const syncKey = JSON.stringify({
      user: state.user,
      situation: state.situation,
      phase2: state.phase2,
      phase3: state.phase3,
      phase4: state.phase4,
      completedPhases: state.progress.completedPhases,
      currentPhase: state.progress.currentPhase
    })

    // Don't sync if nothing changed
    if (syncKey === lastSyncedRef.current) return
    lastSyncedRef.current = syncKey

    // Debounce sync
    const timer = setTimeout(() => {
      syncToBackend()
    }, 500)

    return () => clearTimeout(timer)
  }, [state.sessionId, state.sessionLoading, state.user, state.situation, state.phase2, state.phase3, state.phase4, state.progress.completedPhases, state.progress.currentPhase, syncToBackend])

  return (
    <UserContext.Provider value={{ state, dispatch, syncToBackend }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function useUserState() {
  const { state } = useUser()
  return state
}

export function useUserDispatch() {
  const { dispatch } = useUser()
  return dispatch
}

export function useSessionId() {
  const { state } = useUser()
  return state.sessionId
}

export function useSyncToBackend() {
  const { syncToBackend } = useUser()
  return syncToBackend
}
