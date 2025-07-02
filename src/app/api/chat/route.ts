import { NextRequest, NextResponse } from 'next/server'
import { getRandomGeminiApiKey } from '@/lib/gemini'

// 日本取名 AI 聊天 API
// 基于 Cloudflare Workers + OpenNext 部署
// 支持域名白名单、频率限制、安全验证

interface ChatRequestBody {
  contents: Array<{
    role: string
    parts: Array<{
      text: string
    }>
  }>
  generationConfig?: {
    maxOutputTokens?: number
    temperature?: number
    topP?: number
    topK?: number
  }
  safetySettings?: Array<{
    category: string
    threshold: string
  }>
}

interface ErrorResponse {
  error: {
    message: string
    status: number
  }
}

// 域名白名单检查函数
function isAllowedOrigin(request: NextRequest): boolean {
  // 从环境变量获取允许的域名列表
  const allowedOrigins = process.env.ALLOWED_ORIGINS
  
  if (!allowedOrigins) {
    // 开发环境允许 localhost
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    console.warn('ALLOWED_ORIGINS not configured, denying all requests')
    return false
  }

  // 解析允许的域名（支持多个域名，用逗号分隔）
  const allowedList = allowedOrigins.split(',').map(origin => origin.trim().toLowerCase())
  
  // 获取请求来源
  const origin = request.headers.get('Origin')
  const referer = request.headers.get('Referer')
  
  // 检查 Origin 头（优先）
  if (origin) {
    const originLower = origin.toLowerCase()
    if (allowedList.includes(originLower)) {
      return true
    }
    
    // 检查是否包含通配符域名
    for (const allowed of allowedList) {
      if (allowed.startsWith('*.')) {
        const domain = allowed.substring(2)
        if (originLower.endsWith('.' + domain) || originLower === domain) {
          return true
        }
      }
    }
  }
  
  // 如果没有 Origin，检查 Referer
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererOrigin = refererUrl.origin.toLowerCase()
      
      if (allowedList.includes(refererOrigin)) {
        return true
      }
      
      // 检查通配符域名
      for (const allowed of allowedList) {
        if (allowed.startsWith('*.')) {
          const domain = allowed.substring(2)
          if (refererOrigin.endsWith('.' + domain) || 
              refererOrigin === `https://${domain}` || 
              refererOrigin === `http://${domain}`) {
            return true
          }
        }
      }
    } catch (error) {
      console.error('Invalid referer URL:', referer, error)
    }
  }
  
  return false
}

// 获取 CORS 头函数
function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('Origin')
  
  // 如果来源在白名单中，返回具体的 Origin
  if (origin && isAllowedOrigin(request)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  
  // 开发环境允许所有来源
  if (process.env.NODE_ENV === 'development') {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
  
  // 否则返回限制性的头
  return {
    'Access-Control-Allow-Origin': 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

// 错误响应创建函数
function createErrorResponse(message: string, status: number = 400): NextResponse<ErrorResponse> {
  return NextResponse.json(
    { 
      error: { 
        message,
        status 
      } 
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'null',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  )
}

// 简单的频率限制检查（基于 IP 和时间窗口）
const rateLimitMap = new Map<string, { windowStart: number; count: number }>()

function checkRateLimit(clientIP: string): boolean {
  try {
    const now = Date.now()
    const windowStart = Math.floor(now / 60000) * 60000 // 1分钟窗口
    const key = clientIP
    
    const current = rateLimitMap.get(key)
    
    if (current) {
      if (current.windowStart === windowStart && current.count >= 20) {
        return false // 超过限制（每分钟20次）
      }
      
      if (current.windowStart === windowStart) {
        rateLimitMap.set(key, {
          windowStart,
          count: current.count + 1
        })
      } else {
        rateLimitMap.set(key, {
          windowStart,
          count: 1
        })
      }
    } else {
      rateLimitMap.set(key, {
        windowStart,
        count: 1
      })
    }
    
    // 清理过期的记录
    if (Math.random() < 0.1) { // 10% 概率清理
      for (const [k, v] of rateLimitMap.entries()) {
        if (now - v.windowStart > 120000) { // 清理2分钟前的记录
          rateLimitMap.delete(k)
        }
      }
    }
    
    return true
  } catch (error) {
    console.error('Rate limit check failed:', error)
    return true // 如果检查失败，允许请求通过
  }
}

// CORS 预检请求处理
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...getCorsHeaders(request),
      'Access-Control-Max-Age': '86400'
    }
  })
}

// POST 请求处理 - LLM 聊天交互
export async function POST(request: NextRequest) {
  try {
    // 域名白名单检查
    if (!isAllowedOrigin(request)) {
      return createErrorResponse('Access denied: Origin not allowed', 403)
    }

    // 获取客户端 IP 进行频率限制
    const clientIP =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      request.headers.get('X-Real-IP') ||
      'unknown'

    if (!checkRateLimit(clientIP)) {
      return createErrorResponse('Rate limit exceeded', 429)
    }

    // 从环境变量获取 API Key
    const apiKey = getRandomGeminiApiKey()
    if (!apiKey) {
      return createErrorResponse('LLM API key not configured', 500)
    }

    // 获取 API 端点
    const apiEndpoint = process.env.API_ENDPOINT || 
                       'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

    // 解析请求体
    const requestBody: ChatRequestBody = await request.json()
    
    // 验证请求体格式
    if (!requestBody.contents || !Array.isArray(requestBody.contents)) {
      return createErrorResponse('Invalid request format: contents array required', 400)
    }

    // 验证 contents 数组不为空
    if (requestBody.contents.length === 0) {
      return createErrorResponse('Invalid request format: contents array cannot be empty', 400)
    }

    // 构建发送到 Gemini API 的请求
    const geminiRequestBody = {
      contents: requestBody.contents,
      generationConfig: {
        maxOutputTokens: requestBody.generationConfig?.maxOutputTokens || 16000,
        temperature: requestBody.generationConfig?.temperature || 0.8,
        topP: requestBody.generationConfig?.topP || 0.9,
        topK: requestBody.generationConfig?.topK || 40,
        ...requestBody.generationConfig
      },
      safetySettings: requestBody.safetySettings || [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }

    // 调用 Gemini API
    const geminiResponse = await fetch(`${apiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'JapaneseName-Generator/1.0'
      },
      body: JSON.stringify(geminiRequestBody)
    })
    
    // 获取响应数据
    const responseData: {
      candidates?: Array<{
        content: { parts: Array<{ text: string }> }
        finishReason?: string
      }>
      error?: { message: string }
    } = await geminiResponse.json()

    // 检查 API 响应状态
    if (!geminiResponse.ok) {
      console.error('Gemini API Error:', responseData)
      return createErrorResponse(
        responseData.error?.message || 'LLM API request failed', 
        geminiResponse.status
      )
    }

    // 返回成功响应
    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders(request),
        'Cache-Control': 'no-cache'
      }
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

// 不支持其他 HTTP 方法
export async function GET() {
  return createErrorResponse('Method not allowed. Use POST to send chat messages.', 405)
}

export async function PUT() {
  return createErrorResponse('Method not allowed. Use POST to send chat messages.', 405)
}

export async function DELETE() {
  return createErrorResponse('Method not allowed. Use POST to send chat messages.', 405)
} 