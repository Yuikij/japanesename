'use client'

import { useState, useCallback, useEffect } from 'react'
import { chatClient } from '@/lib/chat-client'
import { 
  basicQuestions, 
  presetAdvancedQuestions,
  getPresetQuestionOptionsPrompt,
  getAIAdvancedQuestionPrompt,
  getFollowUpPrompt, 
  getFinalNamingPrompt 
} from '@/lib/naming-questions'
import { ConversationState, QuestionAnswer, NamingResult, AdvancedQuestion, FollowUpQuestion } from '@/types/naming'

const initialState: ConversationState = {
  currentPhase: 'basic',
  currentQuestionIndex: 0,
  currentFollowUpLevel: 0,
  currentAdvancedQuestionIndex: 0,
  answers: [],
  advancedQuestions: [],
  followUpQuestions: [],
  isLoading: false
}

export default function JapaneseNameGenerator() {
  const [state, setState] = useState<ConversationState>(initialState)
  const [currentInput, setCurrentInput] = useState('')
  const [namingResult, setNamingResult] = useState<NamingResult | null>(null)

  // 初始化时生成预设进阶问题的选项
  useEffect(() => {
    generatePresetAdvancedQuestions()
  }, [])

  // 生成预设进阶问题的选项
  const generatePresetAdvancedQuestions = async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      const questionsWithOptions: AdvancedQuestion[] = []
      
      for (const question of presetAdvancedQuestions) {
        const prompt = getPresetQuestionOptionsPrompt(question.id, question.question)
        const response = await chatClient.sendMessage(prompt, 'preset-options')
        
        try {
          const options = JSON.parse(response)
          questionsWithOptions.push({
            ...question,
            options: Array.isArray(options) ? options : []
          })
        } catch (error) {
          console.error('Failed to parse options:', error)
          questionsWithOptions.push({
            ...question,
            options: ['传统经典', '现代简约', '文雅深刻', '活力阳光', '沉稳内敛', '其他']
          })
        }
      }
      
      setState(prev => ({ 
        ...prev, 
        advancedQuestions: questionsWithOptions,
        isLoading: false 
      }))
    } catch (error) {
      console.error('Failed to generate preset questions:', error)
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to initialize questions',
        isLoading: false 
      }))
    }
  }

  // 添加答案到状态
  const addAnswer = useCallback((answer: QuestionAnswer) => {
    setState(prev => ({
      ...prev,
      answers: [...prev.answers, answer]
    }))
  }, [])

  // 处理基本问题的回答
  const handleBasicAnswer = async (answer: string) => {
    const currentQuestion = basicQuestions[state.currentQuestionIndex]
    if (!answer.trim() && currentQuestion.required) return

    const questionAnswer: QuestionAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer: answer.trim(),
      type: 'basic'
    }

    addAnswer(questionAnswer)

    // 如果还有基本问题，继续下一个
    if (state.currentQuestionIndex < basicQuestions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }))
      setCurrentInput('')
    } else {
      // 基本问题完成，开始预设进阶问题
      setState(prev => ({
        ...prev,
        currentPhase: 'advanced-preset',
        currentAdvancedQuestionIndex: 0
      }))
    }
  }

  // 处理进阶问题的回答
  const handleAdvancedAnswer = async (answer: string, skipped: boolean = false) => {
    const currentQuestion = state.advancedQuestions[state.currentAdvancedQuestionIndex]
    
    const questionAnswer: QuestionAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer: skipped ? '跳过' : answer,
      type: state.currentPhase === 'advanced-preset' ? 'advanced-preset' : 'advanced-ai',
      skipped
    }

    addAnswer(questionAnswer)

    if (!skipped) {
      // 开始对这个问题进行追问
      await startFollowUp(questionAnswer)
    } else {
      // 跳过则直接进入下一个问题
      await proceedToNextAdvancedQuestion()
    }
  }

  // 开始追问
  const startFollowUp = async (parentAnswer: QuestionAnswer) => {
    setState(prev => ({
      ...prev,
      currentPhase: 'follow-up',
      currentFollowUpLevel: 1,
      currentFollowUpParent: parentAnswer.questionId,
      isLoading: true
    }))

    try {
      const allAnswers = [...state.answers, parentAnswer].map(a => ({
        question: a.question,
        answer: a.answer
      }))

      const prompt = getFollowUpPrompt(parentAnswer.question, parentAnswer.answer, 1, allAnswers)
      const response = await chatClient.sendMessage(prompt, 'follow-up')
      
      const followUpData = JSON.parse(response)
      const followUpQuestion: FollowUpQuestion = {
        id: `followup-${Date.now()}-1`,
        question: followUpData.question,
        options: followUpData.options,
        parentQuestionId: parentAnswer.questionId,
        level: 1
      }

      setState(prev => ({
        ...prev,
        followUpQuestions: [...prev.followUpQuestions, followUpQuestion],
        isLoading: false
      }))
    } catch (error) {
      console.error('Failed to generate follow-up:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate follow-up question',
        isLoading: false
      }))
    }
  }

  // 处理追问的回答
  const handleFollowUpAnswer = async (answer: string, skipped: boolean = false) => {
    const currentFollowUp = state.followUpQuestions[state.followUpQuestions.length - 1]
    
    const questionAnswer: QuestionAnswer = {
      questionId: currentFollowUp.id,
      question: currentFollowUp.question,
      answer: skipped ? '跳过' : answer,
      type: 'follow-up',
      followUpLevel: state.currentFollowUpLevel,
      parentQuestionId: currentFollowUp.parentQuestionId,
      skipped
    }

    addAnswer(questionAnswer)

    if (state.currentFollowUpLevel < 3 && !skipped) {
      // 继续下一级追问
      await generateNextFollowUp(questionAnswer)
    } else {
      // 追问完成，进入下一个进阶问题
      await proceedToNextAdvancedQuestion()
    }
  }

  // 生成下一级追问
  const generateNextFollowUp = async (parentAnswer: QuestionAnswer) => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const allAnswers = [...state.answers, parentAnswer].map(a => ({
        question: a.question,
        answer: a.answer
      }))

      const originalQuestion = state.answers.find(a => a.questionId === state.currentFollowUpParent)?.question || ''
      const originalAnswer = state.answers.find(a => a.questionId === state.currentFollowUpParent)?.answer || ''

      const prompt = getFollowUpPrompt(originalQuestion, originalAnswer, state.currentFollowUpLevel + 1, allAnswers)
      const response = await chatClient.sendMessage(prompt, 'follow-up')
      
      const followUpData = JSON.parse(response)
      const followUpQuestion: FollowUpQuestion = {
        id: `followup-${Date.now()}-${state.currentFollowUpLevel + 1}`,
        question: followUpData.question,
        options: followUpData.options,
        parentQuestionId: state.currentFollowUpParent || '',
        level: state.currentFollowUpLevel + 1
      }

      setState(prev => ({
        ...prev,
        followUpQuestions: [...prev.followUpQuestions, followUpQuestion],
        currentFollowUpLevel: prev.currentFollowUpLevel + 1,
        isLoading: false
      }))
    } catch (error) {
      console.error('Failed to generate follow-up:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate follow-up question',
        isLoading: false
      }))
    }
  }

  // 进入下一个进阶问题
  const proceedToNextAdvancedQuestion = async () => {
    const totalPresetQuestions = state.advancedQuestions.length
    const totalAIQuestions = state.advancedQuestions.filter(q => q.type === 'ai-generated').length

    if (state.currentPhase === 'advanced-preset' && state.currentAdvancedQuestionIndex < totalPresetQuestions - 1) {
      // 还有预设进阶问题
      setState(prev => ({
        ...prev,
        currentPhase: 'advanced-preset',
        currentAdvancedQuestionIndex: prev.currentAdvancedQuestionIndex + 1,
        currentFollowUpLevel: 0,
        currentFollowUpParent: undefined
      }))
    } else if (state.currentPhase === 'advanced-preset') {
      // 预设问题完成，开始AI生成的进阶问题
      await generateAIAdvancedQuestion()
    } else if (totalAIQuestions < 3) {
      // 继续生成AI进阶问题
      await generateAIAdvancedQuestion()
    } else {
      // 所有问题完成，生成名字
      await generateFinalNames()
    }
  }

  // 生成AI进阶问题
  const generateAIAdvancedQuestion = async () => {
    setState(prev => ({
      ...prev,
      currentPhase: 'advanced-ai',
      isLoading: true
    }))

    try {
      const allAnswers = state.answers.map(a => ({
        question: a.question,
        answer: a.answer
      }))

      const aiQuestionIndex = state.advancedQuestions.filter(q => q.type === 'ai-generated').length
      const prompt = getAIAdvancedQuestionPrompt(allAnswers, aiQuestionIndex)
      const response = await chatClient.sendMessage(prompt, 'ai-advanced')
      
      const questionData = JSON.parse(response)
      const aiQuestion: AdvancedQuestion = {
        id: `ai-${Date.now()}`,
        question: questionData.question,
        options: questionData.options,
        type: 'ai-generated'
      }

      setState(prev => ({
        ...prev,
        advancedQuestions: [...prev.advancedQuestions, aiQuestion],
        currentAdvancedQuestionIndex: prev.advancedQuestions.length,
        currentFollowUpLevel: 0,
        isLoading: false
      }))
    } catch (error) {
      console.error('Failed to generate AI question:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate AI question',
        isLoading: false
      }))
    }
  }

  // 生成最终的名字结果
  const generateFinalNames = async () => {
    setState(prev => ({
      ...prev,
      currentPhase: 'generating',
      isLoading: true
    }))

    try {
      const allAnswers = state.answers.map(a => ({
        question: a.question,
        answer: a.answer
      }))

      const prompt = getFinalNamingPrompt(allAnswers)
      const response = await chatClient.sendMessage(prompt, 'naming-final', {
        temperature: 0.9,
        maxOutputTokens: 4000
      })

      // 解析JSON响应
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        const result: NamingResult = JSON.parse(jsonMatch[1])
        setNamingResult(result)
        setState(prev => ({
          ...prev,
          currentPhase: 'complete',
          isLoading: false
        }))
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate names',
        isLoading: false,
        currentPhase: 'complete'
      }))
    }
  }

  // 重新开始
  const handleRestart = () => {
    setState(initialState)
    setCurrentInput('')
    setNamingResult(null)
    chatClient.clearAllConversations()
    generatePresetAdvancedQuestions()
  }

  // 渲染当前问题
  const renderCurrentQuestion = () => {
    if (state.currentPhase === 'basic') {
      const currentQuestion = basicQuestions[state.currentQuestionIndex]
      
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              基本信息 {state.currentQuestionIndex + 1} / {basicQuestions.length}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {currentQuestion.type === 'select' ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleBasicAnswer(option)}
                  className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={currentQuestion.placeholder || '请输入你的回答...'}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleBasicAnswer(currentInput)}
              />
              
              <button
                onClick={() => handleBasicAnswer(currentInput)}
                disabled={currentQuestion.required && !currentInput.trim()}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          )}
        </div>
      )
    }

    if (state.currentPhase === 'advanced-preset' || state.currentPhase === 'advanced-ai') {
      const currentQuestion = state.advancedQuestions[state.currentAdvancedQuestionIndex]
      const isPreset = state.currentPhase === 'advanced-preset'
      const questionNumber = isPreset 
        ? state.currentAdvancedQuestionIndex + 1
        : state.advancedQuestions.filter(q => q.type === 'ai-generated').length

      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-blue-600 mb-2">
              {isPreset ? `预设进阶问题 ${questionNumber}/3` : `AI 个性化问题 ${questionNumber}/3`}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAdvancedAnswer(option)}
                className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
            
            <div className="flex gap-3 pt-4">
              <textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="或者输入自定义答案..."
                rows={2}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={() => handleAdvancedAnswer(currentInput)}
                disabled={!currentInput.trim()}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                提交
              </button>
            </div>
            
            <button
              onClick={() => handleAdvancedAnswer('', true)}
              className="w-full py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              跳过这个问题
            </button>
          </div>
        </div>
      )
    }

    if (state.currentPhase === 'follow-up') {
      const currentFollowUp = state.followUpQuestions[state.followUpQuestions.length - 1]
      
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-purple-600 mb-2">
              深度追问 {state.currentFollowUpLevel}/3
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentFollowUp.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentFollowUp.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleFollowUpAnswer(option)}
                className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                {option}
              </button>
            ))}
            
            <div className="flex gap-3 pt-4">
              <textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="或者输入自定义答案..."
                rows={2}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={() => handleFollowUpAnswer(currentInput)}
                disabled={!currentInput.trim()}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                提交
              </button>
            </div>
            
            <button
              onClick={() => handleFollowUpAnswer('', true)}
              className="w-full py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              跳过这个追问
            </button>
          </div>
        </div>
      )
    }

    return null
  }

  // 渲染加载状态
  if (state.isLoading) {
    const loadingTexts = {
      'basic': '正在初始化问题...',
      'advanced-preset': '正在生成进阶问题选项...',
      'advanced-ai': 'AI 正在为您定制个性化问题...',
      'follow-up': 'AI 正在思考深度追问...',
      'generating': '正在生成您的专属日本名字...',
      'complete': '处理完成'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-300 border-t-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{loadingTexts[state.currentPhase]}</p>
        </div>
      </div>
    )
  }

  // 渲染结果页面
  if (state.currentPhase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🌸 您的专属日本名字 🌸</h1>
              <p className="text-gray-600">基于深度问答精心为您定制的10个名字</p>
            </div>

            {namingResult && (
              <div className="space-y-8">
                <div className="grid gap-6">
                  {namingResult.names.map((name, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-red-600">
                          {index + 1}. {name.fullName}
                        </h3>
                        <span className="text-lg text-gray-500">{name.reading}</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">姓氏来源</h4>
                          <p className="text-gray-600">{name.surnameOrigin}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">名字寓意</h4>
                          <p className="text-gray-600">{name.meaning}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">适合理由</h4>
                          <p className="text-gray-600">{name.reason}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">性格契合</h4>
                          <p className="text-gray-600">{name.personalityMatch}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-700 mb-1">文化背景</h4>
                          <p className="text-gray-600">{name.culturalBackground}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">取名思路</h3>
                    <p className="text-blue-700">{namingResult.explanation}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">性格分析</h3>
                    <p className="text-green-700">{namingResult.personalityAnalysis}</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">文化解读</h3>
                  <p className="text-purple-700">{namingResult.culturalContext}</p>
                </div>
              </div>
            )}

            {state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">生成过程中出现错误：{state.error}</p>
              </div>
            )}

            <div className="text-center mt-8">
              <button
                onClick={handleRestart}
                className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                重新开始取名
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 主界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🌸 AI 日本取名生成器 🌸</h1>
            <p className="text-gray-600">通过深度智能问答，为您生成最适合的日本名字</p>
          </div>

          {state.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">错误：{state.error}</p>
            </div>
          )}

          {renderCurrentQuestion()}

          {/* 进度指示器 */}
          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">
              {state.currentPhase === 'basic' && `基本信息阶段 (${state.currentQuestionIndex + 1}/${basicQuestions.length})`}
              {state.currentPhase === 'advanced-preset' && `预设进阶问题阶段 (${state.currentAdvancedQuestionIndex + 1}/3)`}
              {state.currentPhase === 'advanced-ai' && 'AI 个性化问题阶段'}
              {state.currentPhase === 'follow-up' && `深度追问阶段 (${state.currentFollowUpLevel}/3)`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 