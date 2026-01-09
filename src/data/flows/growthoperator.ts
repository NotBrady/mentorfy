import type { FlowDefinition } from './types'

export const growthoperatorFlow: FlowDefinition = {
  id: 'growthoperator',

  mentor: {
    name: 'Growth Operator',
    handle: '@growthoperator',
    avatar: '/brady.jpg',
    welcome: {
      headline: "We're Looking For 50 Serious Operators To Partner With Experts To Sell $5k-$15k AI Products",
      subheadline: 'We Train You. We Find The Expert. You Run The Business.\n\nTake Our 5-Minute Assessment To See If You Qualify To Work With Us 1-on-1',
      buttonText: 'See If I Qualify',
      disclaimer: 'Warning: This will analyze your background, explain the model, and show you what you\'d actually be doing whether you qualify or not. Answer thoughtfully for the best experience.',
    },
  },

  agents: {
    chat: { model: 'claude-haiku-4-5-20251001', maxTokens: 1024, temperature: 0.7 },
    diagnosis: { model: 'claude-haiku-4-5-20251001', maxTokens: 2048 },
    summary: { model: 'claude-haiku-4-5-20251001', maxTokens: 1024 },
  },

  embeds: {
    calendlyUrl: 'https://calendly.com/brady-mentorfy/30min',
  },

  phases: [
    {
      id: 1,
      name: 'Assessment',
      steps: [
        // Question 1: Situation
        {
          type: 'question',
          questionType: 'multiple-choice',
          question: "What's your current work situation?",
          options: [
            { value: 'full-time', label: 'Working full-time for someone else' },
            { value: 'part-time', label: 'Working part-time' },
            { value: 'self-employed', label: 'Self-employed or freelancing' },
            { value: 'own-business', label: 'Running my own business' },
            { value: 'in-between', label: 'In between things right now' },
          ],
          stateKey: 'assessment.situation',
        },
        // Question 2: Background
        {
          type: 'question',
          questionType: 'multiple-choice',
          question: "What's your professional background?",
          options: [
            { value: 'sales', label: 'Sales or business development' },
            { value: 'marketing', label: 'Marketing or advertising' },
            { value: 'operations', label: 'Operations or management' },
            { value: 'tech', label: 'Tech or engineering' },
            { value: 'finance', label: 'Finance or consulting' },
            { value: 'creative', label: 'Creative or content' },
            { value: 'other', label: 'Other' },
          ],
          stateKey: 'assessment.background',
        },
        // Question 3: Experience
        {
          type: 'question',
          questionType: 'multiple-choice',
          question: 'Have you tried building a business before?',
          options: [
            { value: 'no', label: 'No, this would be my first' },
            { value: 'one-two', label: 'Yes, one or two attempts' },
            { value: 'several', label: 'Yes, several attempts' },
            { value: 'running-now', label: "Yes, I'm running one now" },
          ],
          stateKey: 'assessment.experience',
        },
        // Question 4: Time
        {
          type: 'question',
          questionType: 'multiple-choice',
          question: "This isn't a \"watch some videos\" thing. It's building a real business. How much time can you actually commit each week?",
          options: [
            { value: 'less-5', label: 'Less than 5 hours' },
            { value: '5-10', label: '5-10 hours' },
            { value: '10-20', label: '10-20 hours' },
            { value: '20-plus', label: '20+ hours' },
          ],
          stateKey: 'assessment.time',
        },
        // Question 5: Capital
        {
          type: 'question',
          questionType: 'multiple-choice',
          question: 'Every real business takes startup capital. What do you have available to invest in building this?',
          options: [
            { value: 'under-1k', label: 'Under $1,000' },
            { value: '1k-5k', label: '$1,000 - $5,000' },
            { value: '5k-10k', label: '$5,000 - $10,000' },
            { value: '10k-plus', label: '$10,000+' },
          ],
          stateKey: 'assessment.capital',
        },
        // Contact Info
        {
          type: 'question',
          questionType: 'contact-info',
          question: 'Almost done. Enter your details to get your personalized analysis.',
          fields: [
            { key: 'name', label: 'First name', type: 'text', placeholder: 'Your first name', autoComplete: 'given-name' },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
            { key: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 123-4567', autoComplete: 'tel' },
          ],
          stateKey: 'user',
        },
        // First AI Diagnosis
        {
          type: 'ai-moment',
          promptKey: 'first-diagnosis',
          skipThinking: true,
        },
        // Question 6: What's Really Going On
        {
          type: 'question',
          questionType: 'long-answer',
          question: "What's actually going on in your life right now that made you stop and pay attention to this?",
          placeholder: 'Be honest...',
          stateKey: 'assessment.whatsGoingOn',
        },
        // Question 7: Why This
        {
          type: 'question',
          questionType: 'long-answer',
          question: "You've probably seen a hundred opportunities. What's different about this one?",
          placeholder: 'What caught your attention...',
          stateKey: 'assessment.whyThis',
        },
        // Question 8: Why You
        {
          type: 'question',
          questionType: 'long-answer',
          question: 'We get hundreds of people through this page. We accept less than 50 to work with us directly. Why should you be one of them?',
          placeholder: 'Make your case...',
          stateKey: 'assessment.whyYou',
        },
        // Final AI Diagnosis (with conditional booking via tool)
        {
          type: 'ai-moment',
          promptKey: 'final-diagnosis',
          skipThinking: true,
        },
      ],
    },
  ],
}
