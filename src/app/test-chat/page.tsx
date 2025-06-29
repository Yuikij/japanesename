'use client'

import { useState } from 'react'
import { chatClient } from '../../lib/chat-client'

export default function TestChatPage() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)
    setError('')

    // 添加用户消息到界面
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await chatClient.sendMessage(userMessage, 'test-chat')
      
      // 添加AI响应到界面
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Chat error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStartNaming = async () => {
    setLoading(true)
    setError('')
    setMessages([])

    try {
      const response = await chatClient.startNameGenerationConversation('test-naming')
      setMessages([{ role: 'assistant', content: response }])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Start naming error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
    setError('')
    chatClient.clearConversation('test-chat')
    chatClient.clearConversation('test-naming')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            LLM 聊天功能测试
          </h1>

          {/* 控制按钮 */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleStartNaming}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              开始日本取名对话
            </button>
            
            <button
              onClick={handleClearChat}
              disabled={loading}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              清除对话
            </button>
          </div>

          {/* 错误信息 */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>错误：</strong> {error}
            </div>
          )}

          {/* 消息列表 */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-100 ml-8'
                    : 'bg-gray-100 mr-8'
                }`}
              >
                <div className="font-semibold text-sm mb-2">
                  {message.role === 'user' ? '👤 用户' : '🤖 AI助手'}
                </div>
                <div className="whitespace-pre-wrap text-gray-800">
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 mr-8 p-4 rounded-lg">
                <div className="font-semibold text-sm mb-2">🤖 AI助手</div>
                <div className="text-gray-600">正在思考中...</div>
              </div>
            )}
          </div>

          {/* 输入框 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入你的消息..."
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              发送
            </button>
          </div>

          {/* 使用说明 */}
          <div className="mt-6 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">使用说明：</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>点击&ldquo;开始日本取名对话&rdquo;开始专门的取名咨询</li>
              <li>可以直接在输入框中发送任何消息进行测试</li>
              <li>支持多轮对话，AI会记住对话历史</li>
              <li>点击&ldquo;清除对话&rdquo;重置所有对话记录</li>
            </ul>
          </div>

          {/* API 状态信息 */}
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-sm mb-2">API 状态信息：</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>API 端点: /api/chat</div>
              <div>环境: {process.env.NODE_ENV || 'unknown'}</div>
              <div>加载状态: {loading ? '请求中' : '就绪'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 