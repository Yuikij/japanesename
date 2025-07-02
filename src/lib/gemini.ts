import { GoogleGenerativeAI } from '@google/generative-ai'

export function getRandomGeminiApiKey(): string | undefined {
  const apiKeys = process.env.GEMINI_API_KEY
  if (!apiKeys) {
    return undefined
  }

  const keys = apiKeys
    .split(',')
    .map(key => key.trim())
    .filter(key => key)
  if (keys.length === 0) {
    return undefined
  }

  const randomIndex = Math.floor(Math.random() * keys.length)
  return keys[randomIndex]
}

export function getGeminiClient(apiKey?: string) {
  const key = apiKey || getRandomGeminiApiKey()
  if (!key) {
    throw new Error('GEMINI_API_KEY is not set')
  }
  return new GoogleGenerativeAI(key)
} 