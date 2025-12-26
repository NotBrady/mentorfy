import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(cors())
app.use(express.json())

const anthropic = new Anthropic()

app.post('/api/claude', async (req, res) => {
  try {
    const { systemPrompt, userContext } = req.body

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `${systemPrompt}\n\nUser context: ${JSON.stringify(userContext)}`
        }
      ]
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''
    res.json({ content })
  } catch (error) {
    console.error('Claude API Error:', error)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
