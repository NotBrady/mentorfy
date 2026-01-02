import { AgentConfig } from './types'
import { rafaelChatAgent } from './rafael/chat'
import { rafaelDiagnosisAgent } from './rafael/diagnosis'
import { rafaelSummaryAgent } from './rafael/summary'

const agents: Record<string, AgentConfig> = {
  'rafael-chat': rafaelChatAgent,
  'rafael-diagnosis': rafaelDiagnosisAgent,
  'rafael-summary': rafaelSummaryAgent,
}

export function getAgent(id: string): AgentConfig | undefined {
  return agents[id]
}

export function listAgents(): AgentConfig[] {
  return Object.values(agents)
}
