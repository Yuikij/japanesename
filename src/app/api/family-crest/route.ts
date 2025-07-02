import { NextRequest, NextResponse } from 'next/server'
import { getRandomGeminiApiKey } from '@/lib/gemini'

interface FamilyCrestRequest {
  name: string
  meaning: string
  culturalBackground: string
  personalityMatch: string
  locale?: string // 添加可选的语言参数
}

interface ErrorResponse {
  error: {
    message: string
    status: number
  }
}

// 域名白名单检查函数
function isAllowedOrigin(request: NextRequest): boolean {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
  
  if (!allowedOrigins) {
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    console.warn('ALLOWED_ORIGINS not configured, denying all requests')
    return false
  }

  const allowedList = allowedOrigins.split(',').map(origin => origin.trim().toLowerCase())
  const origin = request.headers.get('Origin')
  const referer = request.headers.get('Referer')
  
  if (origin) {
    const originLower = origin.toLowerCase()
    if (allowedList.includes(originLower)) {
      return true
    }
    
    for (const allowed of allowedList) {
      if (allowed.startsWith('*.')) {
        const domain = allowed.substring(2)
        if (originLower.endsWith('.' + domain) || originLower === domain) {
          return true
        }
      }
    }
  }
  
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererOrigin = refererUrl.origin.toLowerCase()
      
      if (allowedList.includes(refererOrigin)) {
        return true
      }
      
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
  
  if (origin && isAllowedOrigin(request)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  
  if (process.env.NODE_ENV === 'development') {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
  
  return {
    'Access-Control-Allow-Origin': 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

// 错误响应创建函数
function createErrorResponse(message: string, status: number = 400, request?: NextRequest): NextResponse<ErrorResponse> {
  const headers = request ? getCorsHeaders(request) : {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

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
        ...headers,
        'Content-Type': 'application/json'
      }
    }
  )
}

// 获取用户语言偏好
function getUserLocale(request: NextRequest): string {
  // 首先检查URL参数
  const url = new URL(request.url)
  const localeParam = url.searchParams.get('locale')
  if (localeParam && ['zh', 'en'].includes(localeParam)) {
    return localeParam
  }

  // 检查Accept-Language头
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    if (acceptLanguage.includes('zh')) return 'zh'
    if (acceptLanguage.includes('en')) return 'en'
  }

  // 默认返回中文
  return 'zh'
}

// 获取本地化的家纹设计提示词
function getLocalizedPrompt(
  name: string,
  meaning: string,
  culturalBackground: string,
  personalityMatch: string,
  locale: string
): string {
  if (locale === 'en') {
    return `As a professional Japanese family crest (Kamon) designer, please design a traditional Japanese family crest based on the following information for the name "${name}":

Name Information:
- Name: ${name}
- Meaning: ${meaning}
- Cultural Background: ${culturalBackground}
- Personality Match: ${personalityMatch}

Design Requirements:
1. **Style**: Traditional Japanese family crest, circular badge, black and white, simple lines.
2. **Core**: Incorporate symbolic elements that reflect the name's meaning, cultural background, and personality.
3. **Composition**: The design should be harmonious and balanced, embodying Japanese aesthetics.
4. **Image**: Generate a high-resolution image with white background and black crest.
5. **Design Description**: Provide a concise 50-100 word explanation in English, explaining the design concept, symbolic meaning, and connection to the name.

Please provide both the generated image and design description text in your response.`
  } else {
    return `作为一位专业的日本家纹设计师，请基于以下信息为名字"${name}"设计一个传统的日本家纹（家紋/Kamon）：

名字信息：
- 名字：${name}
- 含义：${meaning}
- 文化背景：${culturalBackground}
- 性格匹配：${personalityMatch}

设计要求:
1. **风格**: 传统的日本家纹，圆形徽章，黑白分明，线条简洁。
2. **核心**: 融入反映名字含义、文化背景和性格的象征性元素。
3. **构图**: 设计应和谐平衡，体现日本美学。
4. **图像**: 生成一张高分辨率的图像，白色背景，家纹为黑色。
5. **设计说明**: 提供一段50-100字的简洁中文说明，解释家纹的设计理念、象征意义以及与名字的关联。

请在响应中同时提供生成的图像和设计说明文本。`
  }
}

export async function OPTIONS(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request)
  
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  })
}

export async function POST(request: NextRequest) {
  try {
    // 域名白名单检查
    if (!isAllowedOrigin(request)) {
      console.warn('Request denied - origin not in whitelist')
      return createErrorResponse('Access denied', 403, request)
    }

    // 解析请求体
    const body: FamilyCrestRequest = await request.json()
    const { name, meaning, culturalBackground, personalityMatch, locale } = body

    if (!name) {
      return createErrorResponse('Name is required', 400, request)
    }

    // 检查是否配置了 Gemini API
    const geminiApiKey = getRandomGeminiApiKey()

    if (!geminiApiKey) {
      console.error('Gemini API key not configured')
      return createErrorResponse('AI service not configured', 500, request)
    }

    // 获取用户语言偏好
    const userLocale = locale || getUserLocale(request)

    // 构造本地化的家纹设计提示词
    const designPrompt = getLocalizedPrompt(
      name,
      meaning,
      culturalBackground,
      personalityMatch,
      userLocale
    )

    // 调用 Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: designPrompt
            }]
          }],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"]
          }
        }),
      }
    )

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error:', geminiResponse.status, errorText)
      return createErrorResponse('Failed to generate family crest design', 500, request)
    }

    const geminiData = await geminiResponse.json() as {
      candidates?: Array<{
        content: {
          parts: Array<{
            text?: string
            inlineData?: {
              mimeType: string,
              data: string
            }
          }>
        }
      }>
    }

    const parts = geminiData.candidates?.[0]?.content?.parts || []
    const imagePart = parts.find(part => part.inlineData)
    const textPart = parts.find(part => part.text)

    let finalSvg = ''
    let dataUrl = ''
    let explanation = ''

    if (imagePart && imagePart.inlineData) {
      dataUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
    } else {
      // 如果没有找到图像，尝试从文本中提取SVG或创建默认SVG
      const svgContent = textPart?.text || ''
      const svgMatch = svgContent.match(/<svg[\s\S]*?<\/svg>/i)
      finalSvg = svgMatch ? svgMatch[0] : ''

      if (!finalSvg) {
        finalSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <circle cx="256" cy="256" r="200" fill="none" stroke="black" stroke-width="8"/>
          <circle cx="256" cy="256" r="120" fill="none" stroke="black" stroke-width="6"/>
          <circle cx="256" cy="256" r="60" fill="none" stroke="black" stroke-width="4"/>
          <text x="256" y="276" text-anchor="middle" font-family="serif" font-size="24" fill="black">${name.charAt(0)}</text>
        </svg>`
      }

      // 确保SVG有正确的尺寸
      if (!finalSvg.includes('width=') || !finalSvg.includes('height=')) {
        finalSvg = finalSvg.replace('<svg', '<svg width="512" height="512"')
      }

      // 转换SVG为base64
      const svgBase64 = Buffer.from(finalSvg).toString('base64')
      dataUrl = `data:image/svg+xml;base64,${svgBase64}`
    }
    
    if (textPart && textPart.text) {
      explanation = textPart.text
    }

    // 返回成功响应
    const corsHeaders = getCorsHeaders(request)
    return NextResponse.json(
      {
        success: true,
        image: dataUrl,
        prompt: designPrompt,
        explanation: explanation,
        svg: finalSvg, // May be empty if an image was generated
        text: textPart?.text || '', // Include any text response
        locale: userLocale // 返回使用的语言
      },
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Family crest generation error:', error)
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500,
      request
    )
  }
}

// 不支持的方法
export async function GET() {
  return createErrorResponse('Method not allowed', 405)
}

export async function PUT() {
  return createErrorResponse('Method not allowed', 405)
}

export async function DELETE() {
  return createErrorResponse('Method not allowed', 405)
} 