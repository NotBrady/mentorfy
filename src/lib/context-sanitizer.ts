/**
 * Sanitizes session context before sending to AI agents.
 *
 * Transforms implementation-specific keys (phase2, phase3, etc.) into
 * semantic labels that don't reveal the underlying flow structure.
 * This prevents agents from mentioning "phases" or "steps" which breaks immersion.
 */

type SessionContext = {
  // Rafael TATS flow structure
  situation?: {
    bookingStatus?: string
    dayRate?: string
    goal?: string
    blocker?: string
    confession?: string
    experience?: string
    currentIncome?: string
    biggestChallenge?: string
    longAnswer?: string
  }
  phase2?: {
    checkFirst?: string
    hundredKFollowers?: string
    postWorked?: string
    viewsReflection?: string
  }
  phase3?: {
    timeOnContent?: string
    hardestPart?: string
    contentCreatorIdentity?: string
    extraTime?: string
  }
  phase4?: {
    lastPriceRaise?: string
    tooExpensiveResponse?: string
    pricingFear?: string
    doubleRevenue?: string
  }
  // Growth Operator v1 flow structure (legacy)
  assessment?: {
    situation?: string
    background?: string
    experience?: string
    time?: string
    capital?: string
    whatsGoingOn?: string
    whyThis?: string
    whyYou?: string
  }
  // Growth Operator v2 flow structure
  models?: {
    tried?: string
    whatHappened?: string
    whyFailed?: string
  }
  vision?: {
    whatChanges?: string
    whyNow?: string
  }
  commitment?: {
    ready?: string
    capital?: string
  }
  // Common fields
  progress?: {
    currentScreen?: string
    currentPhase?: number
    currentStep?: number
    completedPhases?: number[]
    videosWatched?: string[]
    justCompletedLevel?: boolean
  }
  user?: {
    name?: string
    email?: string
    phone?: string
  }
  [key: string]: any
}

type SanitizedContext = {
  user?: {
    name?: string
    email?: string
  }
  // Rafael TATS sanitized output
  businessStatus?: {
    bookingStatus?: string
    dayRate?: string
    mainBlocker?: string
    selfReflection?: string
  }
  contentStrategy?: {
    primaryMetric?: string
    followerGoalMindset?: string
    successDefinition?: string
    viewsReflection?: string
    weeklyTimeInvested?: string
    biggestChallenge?: string
    creatorIdentity?: string
    timeGoals?: string
  }
  pricingMindset?: {
    lastPriceIncrease?: string
    objectionResponse?: string
    mainFear?: string
    revenueGoals?: string
  }
  // Growth Operator v1 sanitized output (legacy)
  applicantProfile?: {
    currentSituation?: string
    professionalBackground?: string
    entrepreneurExperience?: string
    weeklyTimeAvailable?: string
    startupCapital?: string
    motivation?: string
    whyThisOpportunity?: string
    pitchForSelection?: string
  }
  // Growth Operator v2 sanitized output
  businessModelHistory?: {
    modelTried?: string
    whatHappened?: string
    whyTheyThinkItFailed?: string
  }
  futureVision?: {
    whatWouldChange?: string
    whyNow?: string
  }
  readiness?: {
    isCommitted?: string
    availableCapital?: string
  }
}

/**
 * Removes empty strings and undefined values from an object
 */
function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== '' && value !== null) {
      result[key as keyof T] = value
    }
  }
  return result
}

/**
 * Transforms raw session context into AI-friendly semantic labels.
 * Strips out internal tracking data and renames phase-specific keys.
 */
export function sanitizeContextForAI(context: SessionContext): SanitizedContext {
  const sanitized: SanitizedContext = {}

  // User info (keep name for personalization, omit phone/email for privacy in prompts)
  if (context.user?.name) {
    sanitized.user = { name: context.user.name }
  }

  // Business status from situation
  if (context.situation) {
    const businessStatus = removeEmpty({
      bookingStatus: context.situation.bookingStatus,
      dayRate: context.situation.dayRate,
      mainBlocker: context.situation.blocker,
      selfReflection: context.situation.confession,
    })
    if (Object.keys(businessStatus).length > 0) {
      sanitized.businessStatus = businessStatus
    }
  }

  // Content strategy from phase2 + phase3
  const contentStrategy = removeEmpty({
    // From phase2 (views/metrics mindset)
    primaryMetric: context.phase2?.checkFirst,
    followerGoalMindset: context.phase2?.hundredKFollowers,
    successDefinition: context.phase2?.postWorked,
    viewsReflection: context.phase2?.viewsReflection,
    // From phase3 (content creation)
    weeklyTimeInvested: context.phase3?.timeOnContent,
    biggestChallenge: context.phase3?.hardestPart,
    creatorIdentity: context.phase3?.contentCreatorIdentity,
    timeGoals: context.phase3?.extraTime,
  })
  if (Object.keys(contentStrategy).length > 0) {
    sanitized.contentStrategy = contentStrategy
  }

  // Pricing mindset from phase4
  if (context.phase4) {
    const pricingMindset = removeEmpty({
      lastPriceIncrease: context.phase4.lastPriceRaise,
      objectionResponse: context.phase4.tooExpensiveResponse,
      mainFear: context.phase4.pricingFear,
      revenueGoals: context.phase4.doubleRevenue,
    })
    if (Object.keys(pricingMindset).length > 0) {
      sanitized.pricingMindset = pricingMindset
    }
  }

  // Growth Operator v1: applicant profile from assessment (legacy)
  if (context.assessment) {
    const applicantProfile = removeEmpty({
      currentSituation: context.assessment.situation,
      professionalBackground: context.assessment.background,
      entrepreneurExperience: context.assessment.experience,
      weeklyTimeAvailable: context.assessment.time,
      startupCapital: context.assessment.capital,
      motivation: context.assessment.whatsGoingOn,
      whyThisOpportunity: context.assessment.whyThis,
      pitchForSelection: context.assessment.whyYou,
    })
    if (Object.keys(applicantProfile).length > 0) {
      sanitized.applicantProfile = applicantProfile
    }
  }

  // Growth Operator v2: business model history
  if (context.models) {
    const businessModelHistory = removeEmpty({
      modelTried: context.models.tried,
      whatHappened: context.models.whatHappened,
      whyTheyThinkItFailed: context.models.whyFailed,
    })
    if (Object.keys(businessModelHistory).length > 0) {
      sanitized.businessModelHistory = businessModelHistory
    }
  }

  // Growth Operator v2: future vision
  if (context.vision) {
    const futureVision = removeEmpty({
      whatWouldChange: context.vision.whatChanges,
      whyNow: context.vision.whyNow,
    })
    if (Object.keys(futureVision).length > 0) {
      sanitized.futureVision = futureVision
    }
  }

  // Growth Operator v2: readiness/commitment
  if (context.commitment) {
    const readiness = removeEmpty({
      isCommitted: context.commitment.ready,
      availableCapital: context.commitment.capital,
    })
    if (Object.keys(readiness).length > 0) {
      sanitized.readiness = readiness
    }
  }

  // Explicitly omit: progress (currentPhase, currentStep, completedPhases)
  // These are internal tracking and should never be shared with AI

  return sanitized
}
