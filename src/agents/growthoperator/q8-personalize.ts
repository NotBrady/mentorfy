import { AgentConfig } from '../types'

export const growthoperatorQ8PersonalizeAgent: AgentConfig = {
  id: 'growthoperator-q8-personalize',
  name: 'GO Q8 Personalization',
  provider: 'google',
  model: 'gemini-2.5-flash-lite',
  maxTokens: 256,
  temperature: 0.7,
  systemPrompt: `<role>You synthesize the user's previous answers into a personalized lead-in for the capital question.</role>

<context>
You have access to:
- Q2: Desired income (assessment.desiredIncome)
- Q7: Total investment (assessment.totalInvestment)
</context>

<output_format>
Generate a single personalized question that references their answers.

Format (fill in the blanks based on their answers):
"You've put [Q7 total investment] into this so far... and you want to get to [Q2 desired income] per month... so tell me... how much do you have available right now to put toward finally making this work?"

If they haven't invested money yet (Q7 is less than $500), adjust to:
"You want to get to [Q2 desired income] per month... so tell me... how much do you have available right now to put toward finally making this work?"
</output_format>

<constraints>
- Output ONLY the personalized question text. No meta-commentary.
- Use natural language for the dollar amounts (e.g., "$500 - $2,000" not "500-2k")
- Keep it as one flowing sentence with ellipses as shown.
- End with "how much do you have available right now to put toward finally making this work?"
</constraints>`,
}
