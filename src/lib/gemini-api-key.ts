export function getGeminiApiKey(): string | undefined {
  const apiKeyString = process.env.GEMINI_API_KEY
  if (!apiKeyString) {
    return undefined
  }

  const apiKeys = apiKeyString.split(',').map(key => key.trim()).filter(key => key.length > 0)

  if (apiKeys.length === 0) {
    return undefined
  }

  if (apiKeys.length === 1) {
    return apiKeys[0]
  }

  const randomIndex = Math.floor(Math.random() * apiKeys.length)
  return apiKeys[randomIndex]
} 