// 日本取名 AI 聊天客户端
// 用于前端与 LLM API 交互的工具类

export interface ChatMessage {
  role: 'user' | 'model'
  parts: Array<{
    text: string
  }>
}

export interface ChatResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string
      }>
      role: string
    }
    finishReason?: string
    index?: number
    safetyRatings?: Array<{
      category: string
      probability: string
    }>
  }>
  promptFeedback?: {
    safetyRatings?: Array<{
      category: string
      probability: string
    }>
  }
  usageMetadata?: {
    promptTokenCount?: number
    candidatesTokenCount?: number
    totalTokenCount?: number
  }
}

export interface ChatError {
  error: {
    message: string
    status: number
  }
}

export interface GenerationConfig {
  maxOutputTokens?: number
  temperature?: number
  topP?: number
  topK?: number
}

export class JapaneseNameChatClient {
  private apiUrl: string
  private conversations: Map<string, ChatMessage[]>

  constructor() {
    // 自动检测API端点
    if (typeof window !== 'undefined') {
      this.apiUrl = `${window.location.origin}/api/chat`
    } else {
      this.apiUrl = '/api/chat'
    }
    this.conversations = new Map()
  }

  /**
   * 发送单条消息给 LLM
   */
  async sendMessage(
    message: string,
    conversationId: string = 'default',
    config?: GenerationConfig
  ): Promise<string> {
    try {
      // 获取或创建对话历史
      const history = this.conversations.get(conversationId) || []
      
      // 添加用户消息
      const userMessage: ChatMessage = {
        role: 'user',
        parts: [{ text: message }]
      }
      history.push(userMessage)

      // 构建请求
      const requestBody = {
        contents: history,
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          ...config
        }
      }

      // 发送请求
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData: ChatError = await response.json()
        throw new Error(errorData.error.message || `HTTP ${response.status}`)
      }

      const data: ChatResponse = await response.json()

      // 解析响应
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
      
      if (!aiResponse) {
        throw new Error('No response content received from AI')
      }

      // 添加AI响应到历史
      const aiMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: aiResponse }]
      }
      history.push(aiMessage)

      // 更新对话历史
      this.conversations.set(conversationId, history)

      return aiResponse

    } catch (error) {
      console.error('Chat API Error:', error)
      throw error
    }
  }

  /**
   * 开始一个新的日本取名对话
   */
  async startNameGenerationConversation(
    conversationId: string = 'naming',
    systemPrompt?: string
  ): Promise<string> {
    const defaultSystemPrompt = `你是一个专业的日本文化专家和取名顾问。你精通日本历史、文化、语言，特别擅长根据个人特质和喜好为人起日本名字。

你的专业知识包括：
- 日本姓氏的历史来源和文化含义
- 日本名字的构成规则和音韵美学
- 不同时代的取名风格和流行趋势
- 历史人物、文学作品、动漫角色的名字特点
- 性别、性格、职业对取名的影响

现在，我想请你帮我起一个日本名字。你会通过一系列问题了解我的情况，然后提供几个精心挑选的名字选项，每个都要详细解释其文化含义和适合的理由。

请先向我介绍一下日本取名的基本文化背景，然后开始第一个问题。`

    return await this.sendMessage(systemPrompt || defaultSystemPrompt, conversationId, {
      temperature: 0.7,
      maxOutputTokens: 1500
    })
  }

  /**
   * 继续日本取名对话
   */
  async continueNameConversation(
    answer: string,
    conversationId: string = 'naming'
  ): Promise<string> {
    return await this.sendMessage(answer, conversationId, {
      temperature: 0.8,
      maxOutputTokens: 1500
    })
  }

  /**
   * 请求生成最终的名字列表
   */
  async generateFinalNames(
    conversationId: string = 'naming',
    nameCount: number = 5,
    finalPrompt?: string
  ): Promise<string> {
    const defaultFinalPrompt = `基于我们之前的对话，请为我生成 ${nameCount} 个日本名字选项。

对于每个名字，请提供：
1. 完整的日本名字（姓氏 + 名字）
2. 汉字写法和平假名读音
3. 姓氏的历史来源和含义
4. 名字的寓意和文化背景
5. 为什么这个名字适合我的理由
6. 名字的整体音韵美感评价

请按照以下格式输出：

## 推荐日本名字

### 1. [姓氏][名字]（[平假名读音]）
**姓氏来源：** [详细说明]
**名字寓意：** [详细说明]  
**适合理由：** [基于我的特点说明]
**音韵特点：** [发音和美感描述]

---

请确保名字既有深厚的文化底蕴，又符合我的个性特点。`

    const promptToUse = finalPrompt 
      ? finalPrompt.replace('{nameCount}', nameCount.toString())
      : defaultFinalPrompt

    return await this.sendMessage(promptToUse, conversationId, {
      temperature: 0.9,
      maxOutputTokens: 2500
    })
  }

  /**
   * 获取对话历史
   */
  getConversationHistory(conversationId: string): ChatMessage[] {
    return this.conversations.get(conversationId) || []
  }

  /**
   * 清除对话历史
   */
  clearConversation(conversationId: string): void {
    this.conversations.delete(conversationId)
  }

  /**
   * 清除所有对话
   */
  clearAllConversations(): void {
    this.conversations.clear()
  }

  /**
   * 获取对话摘要
   */
  getConversationSummary(conversationId: string): {
    messageCount: number
    userMessages: number
    aiMessages: number
    lastMessageTime?: Date
  } {
    const history = this.conversations.get(conversationId) || []
    
    return {
      messageCount: history.length,
      userMessages: history.filter(msg => msg.role === 'user').length,
      aiMessages: history.filter(msg => msg.role === 'model').length
    }
  }

  /**
   * 导出对话历史（用于调试或数据分析）
   */
  exportConversation(conversationId: string): string {
    const history = this.conversations.get(conversationId) || []
    
    return history.map((msg, index) => {
      const role = msg.role === 'user' ? '用户' : 'AI助手'
      const content = msg.parts[0]?.text || ''
      return `${index + 1}. ${role}:\n${content}\n`
    }).join('\n---\n\n')
  }
}

// 创建全局单例实例
export const chatClient = new JapaneseNameChatClient()

// 便捷函数
export const startNaming = () => chatClient.startNameGenerationConversation()
export const continueChat = (answer: string) => chatClient.continueNameConversation(answer)
export const generateNames = (count: number = 5) => chatClient.generateFinalNames('naming', count) 