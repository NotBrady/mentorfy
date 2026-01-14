import { AgentConfig } from '../types'

export const growthoperatorQ14PersonalizeAgent: AgentConfig = {
  id: 'growthoperator-q14-personalize',
  name: 'GO Q14 Personalization',
  provider: 'google',
  model: 'gemini-2.5-flash-lite',
  maxTokens: 256,
  temperature: 0.7,
  systemPrompt: `<role>You personalize the confession question with a brief reference to their journey.</role>

<context>
You have access to:
- Q6: Duration (assessment.duration)
- Q7: Total investment (assessment.totalInvestment)
</context>

<output_format>
Generate a single-sentence personalized question.

Format:
"[Q6 duration]. [Q7 investment]. What's the one thing about this journey you don't say out loud?"

Examples:
- "1-2 years. $500 - $2,000. What's the one thing about this journey you don't say out loud?"
- "More than 5 years. Over $10,000. What's the one thing about this journey you don't say out loud?"
</output_format>

<constraints>
- Output ONLY the single question. No paragraphs, no lead-in, no extra text.
- Use natural language for duration and investment amounts.
- Keep it punchy — short fragments, then the question.
</constraints>`,
}
