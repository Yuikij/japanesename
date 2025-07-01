'use client'

import { useState, useCallback, useEffect } from 'react'
import { useTranslations, useMessages, useLocale } from 'next-intl'
import { chatClient, generateFamilyCrest } from '../lib/chat-client'
import { 
  basicQuestions, 
  presetAdvancedQuestions,
  getPresetQuestionOptionsPrompt,
  getAIAdvancedQuestionPrompt,
  getFollowUpPrompt, 
  getFinalNamingPrompt 
} from '../lib/naming-questions'
import { ConversationState, QuestionAnswer, NamingResult, AdvancedQuestion, FollowUpQuestion, GeneratedName } from '../types/naming'

// 从markdown格式的响应中解析JSON
const parseJsonFromResponse = (response: string): unknown => {
  try {
    // 尝试直接解析
    return JSON.parse(response)
  } catch {
    // 如果直接解析失败，尝试从markdown中提取JSON
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1])
      } catch (innerError) {
        throw new Error(`Failed to parse JSON from markdown: ${innerError}`)
      }
    }
    
    // 如果没有markdown标记，尝试查找JSON对象
    const jsonObjectMatch = response.match(/\{[\s\S]*\}/)
    if (jsonObjectMatch) {
      try {
        return JSON.parse(jsonObjectMatch[0])
      } catch (innerError) {
        throw new Error(`Failed to parse JSON object: ${innerError}`)
      }
    }
    
    // 如果没有找到JSON对象，尝试查找JSON数组
    const jsonArrayMatch = response.match(/\[[\s\S]*\]/)
    if (jsonArrayMatch) {
      try {
        return JSON.parse(jsonArrayMatch[0])
      } catch (innerError) {
        throw new Error(`Failed to parse JSON array: ${innerError}`)
      }
    }
    
    throw new Error(`No valid JSON found in response: ${response}`)
  }
}

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
  // 国际化翻译
  const t = useTranslations()
  const messages = useMessages()
  const locale = useLocale()
  
  const [state, setState] = useState<ConversationState>(initialState)
  const [basicInput, setBasicInput] = useState('')
  const [advancedInput, setAdvancedInput] = useState('')
  const [followUpInput, setFollowUpInput] = useState('')
  const [namingResult, setNamingResult] = useState<NamingResult | null>(null)

  // 设置系统提示词
  useEffect(() => {
    const systemPrompt = t('aiPrompts.systemPrompt')
    if (systemPrompt) {
      chatClient.setSystemPrompt(systemPrompt)
    }
  }, [t])

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
        const translatedQuestion = t(`presetQuestions.${question.id}`)
        const userPrompt = getPresetQuestionOptionsPrompt(question.id, translatedQuestion, messages)
        const systemPrompt = t('aiPrompts.systemPrompt')
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`
        const response = await chatClient.sendMessage(fullPrompt, 'preset-options')
        
        try {
          const options = parseJsonFromResponse(response) as string[]
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
      question: t(`basicQuestions.${currentQuestion.id}`),
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
      setBasicInput('')
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
      question: state.currentPhase === 'advanced-preset' ? t(`presetQuestions.${currentQuestion.id}`) : currentQuestion.question,
      answer: skipped ? '跳过' : answer,
      type: state.currentPhase === 'advanced-preset' ? 'advanced-preset' : 'advanced-ai',
      skipped
    }

    addAnswer(questionAnswer)
    setAdvancedInput('') // 清空进阶问题输入

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

      const systemPrompt = t('aiPrompts.systemPrompt')
      const userPrompt = getFollowUpPrompt(parentAnswer.question, parentAnswer.answer, 1, allAnswers, messages)
      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`

      const response = await chatClient.sendMessage(fullPrompt, 'follow-up')
      const followUpData = parseJsonFromResponse(response) as FollowUpQuestion
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
    setFollowUpInput('') // 清空追问输入

    if (!skipped && state.currentFollowUpLevel < 3) {
      // 继续下一级追问（最多3个）
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

      const systemPrompt = t('aiPrompts.systemPrompt')
      const userPrompt = getFollowUpPrompt(originalQuestion, originalAnswer, state.currentFollowUpLevel + 1, allAnswers, messages)
      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`

      const response = await chatClient.sendMessage(fullPrompt, 'follow-up')
      const followUpData = parseJsonFromResponse(response) as FollowUpQuestion
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
    const presetQuestionsInState = state.advancedQuestions.filter(q => q.type === 'preset');
    const totalPresetQuestions = presetQuestionsInState.length;
    const totalAIQuestions = state.advancedQuestions.filter(q => q.type === 'ai-generated').length;

    if ((state.currentPhase === 'advanced-preset' || state.currentPhase === 'follow-up') && state.currentAdvancedQuestionIndex < totalPresetQuestions - 1) {
      // 还有预设进阶问题
      setState(prev => ({
        ...prev,
        currentPhase: 'advanced-preset',
        currentAdvancedQuestionIndex: prev.currentAdvancedQuestionIndex + 1,
        currentFollowUpLevel: 0,
        currentFollowUpParent: undefined
      }));
    } else if (state.currentPhase === 'advanced-preset' || state.currentPhase === 'follow-up') {
      // 预设问题完成，或从追问跳过，开始AI生成的进阶问题
      await generateAIAdvancedQuestion();
    } else if (state.currentPhase === 'advanced-ai' && totalAIQuestions < 5) {
      // 如果当前在AI提问阶段，继续生成下一个AI问题（最多5个）
      await generateAIAdvancedQuestion();
    } else {
      // 所有问题完成，生成名字
      await generateFinalNames();
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

      const systemPrompt = t('aiPrompts.systemPrompt')
      const userPrompt = getAIAdvancedQuestionPrompt(allAnswers, state.currentAdvancedQuestionIndex + 1, messages)
      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`

      const response = await chatClient.sendMessage(fullPrompt, 'advanced-ai')
      const newQuestion = parseJsonFromResponse(response) as AdvancedQuestion

      setState(prev => ({
        ...prev,
        advancedQuestions: [...prev.advancedQuestions, newQuestion],
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

      const systemPrompt = t('aiPrompts.systemPrompt')
      const userPrompt = getFinalNamingPrompt(allAnswers, messages)
      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`

      const response = await chatClient.sendMessage(fullPrompt, 'final-naming')
      const resultData = parseJsonFromResponse(response) as NamingResult
      setNamingResult(resultData)
      setState(prev => ({
        ...prev,
        currentPhase: 'complete',
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate names',
        isLoading: false,
        currentPhase: 'complete'
      }))
    }
  }

  // 跳过深度追问，换一个话题
  const handleSkipToNextTopic = async () => {
    setState(prev => ({
      ...prev,
      currentFollowUpLevel: 0,
      currentFollowUpParent: undefined
    }))
    await proceedToNextAdvancedQuestion()
  }

  // 直接跳过所有问题，生成结果
  const handleSkipToResult = async () => {
    await generateFinalNames()
  }

  // 重新开始
  const handleRestart = () => {
    setState(initialState)
    setBasicInput('')
    setAdvancedInput('')
    setFollowUpInput('')
    setNamingResult(null)
    chatClient.clearAllConversations()
    generatePresetAdvancedQuestions()
  }

  // 处理家纹生成
  const handleGenerateFamilyCrest = async (nameIndex: number) => {
    if (!namingResult) return

    const name = namingResult.names[nameIndex]
    
    // 设置生成状态
    setNamingResult(prev => {
      if (!prev) return prev
      const updatedNames = [...prev.names]
      updatedNames[nameIndex] = {
        ...name,
        familyCrest: {
          image: '',
          prompt: '',
          explanation: '',
          generating: true
        }
      }
      return {
        ...prev,
        names: updatedNames
      }
    })

    try {
      const result = await generateFamilyCrest(
        name.fullName,
        name.meaning,
        name.culturalBackground,
        name.personalityMatch,
        locale
      )

      // 更新结果
      setNamingResult(prev => {
        if (!prev) return prev
        const updatedNames = [...prev.names]
        updatedNames[nameIndex] = {
          ...name,
          familyCrest: {
            image: result.image,
            prompt: result.prompt,
            explanation: result.explanation,
            generating: false
          }
        }
        return {
          ...prev,
          names: updatedNames
        }
      })
    } catch (error) {
      console.error('Failed to generate family crest:', error)
      
      // 设置错误状态
      setNamingResult(prev => {
        if (!prev) return prev
        const updatedNames = [...prev.names]
        updatedNames[nameIndex] = {
          ...name,
          familyCrest: {
            image: '',
            prompt: '',
            explanation: '',
            generating: false,
            error: error instanceof Error ? error.message : t('result.familyCrest.error')
          }
        }
        return {
          ...prev,
          names: updatedNames
        }
      })
    }
  }

  // 渲染当前问题
  const renderCurrentQuestion = () => {
    if (state.currentPhase === 'basic') {
      const currentQuestion = basicQuestions[state.currentQuestionIndex]
      
      // 如果当前基本问题不存在，显示错误信息
      if (!currentQuestion) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('errors.questionLoadError')}</h2>
              <p className="text-gray-600 mb-4">{t('errors.questionLoadDescription')}</p>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {t('common.restart')}
              </button>
            </div>
          </div>
        )
      }
      
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              {t('questions.basic')} {state.currentQuestionIndex + 1} / {basicQuestions.length}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t(`basicQuestions.${currentQuestion.id}`)}
            </h2>
          </div>

          {currentQuestion.type === 'select' ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleBasicAnswer(option)}
                  className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[60px] flex items-center"
                >
                  {currentQuestion.id === 'gender' ? t(`basicQuestions.genderOptions.${option}`) : option}
                </button>
              ))}
              
              {/* 换一个话题按钮 */}
              <button
                onClick={handleSkipToNextTopic}
                className="w-full p-4 text-center bg-blue-50 border border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-100 transition-colors min-h-[60px] flex items-center justify-center text-blue-600 hover:text-blue-800"
              >
                {t('buttons.nextTopic')}
              </button>
              
              {/* 直接生成结果按钮 */}
              <button
                onClick={handleSkipToResult}
                className="w-full p-4 text-center text-green-600 hover:text-green-800 border border-green-300 rounded-lg hover:bg-green-50 transition-colors min-h-[60px] flex items-center justify-center"
              >
                {t('buttons.generateResult')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={basicInput}
                onChange={(e) => setBasicInput(e.target.value)}
                placeholder={currentQuestion.id === 'name' ? t('basicQuestions.namePlaceholder') : ''}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleBasicAnswer(basicInput)}
              />
              
              <button
                onClick={() => handleBasicAnswer(basicInput)}
                disabled={currentQuestion.required && !basicInput.trim()}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.next')}
              </button>
              
              {/* 换一个话题按钮 */}
              <button
                onClick={handleSkipToNextTopic}
                className="w-full p-4 text-center bg-blue-50 border border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-100 transition-colors min-h-[60px] flex items-center justify-center text-blue-600 hover:text-blue-800"
              >
                {t('buttons.nextTopic')}
              </button>
              
              {/* 直接生成结果按钮 */}
              <button
                onClick={handleSkipToResult}
                className="w-full p-4 text-center text-green-600 hover:text-green-800 border border-green-300 rounded-lg hover:bg-green-50 transition-colors min-h-[60px] flex items-center justify-center"
              >
                {t('buttons.generateResult')}
              </button>
            </div>
          )}
        </div>
      )
    }

    if (state.currentPhase === 'advanced-preset' || state.currentPhase === 'advanced-ai') {
      const currentQuestion = state.advancedQuestions[state.currentAdvancedQuestionIndex]
      const isPreset = state.currentPhase === 'advanced-preset'
      
      // 计算问题编号
      let questionNumber: number
      if (isPreset) {
        // 预设问题：基于当前索引
        questionNumber = state.currentAdvancedQuestionIndex + 1
      } else {
        // AI问题：基于已回答的AI问题数量 + 1（当前问题）
        const answeredAIQuestions = state.answers.filter(a => a.type === 'advanced-ai').length
        questionNumber = answeredAIQuestions + 1
      }

      // 如果当前问题不存在，显示加载状态
      if (!currentQuestion) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-300 border-t-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('errors.preparingQuestions')}</p>
            </div>
          </div>
        )
      }

      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-blue-600 mb-2">
              {isPreset ? `${t('questions.preset')} ${questionNumber}/2` : `${t('questions.aiGenerated')} ${questionNumber}/5`}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {isPreset ? t(`presetQuestions.${currentQuestion.id}`) : currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAdvancedAnswer(option)}
                className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[60px] flex items-center"
              >
                {option}
              </button>
            ))}
            
            {/* 换一个话题按钮 */}
            <button
              onClick={handleSkipToNextTopic}
              className="w-full p-4 text-center bg-blue-50 border border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-100 transition-colors min-h-[60px] flex items-center justify-center text-blue-600 hover:text-blue-800"
            >
              {t('buttons.nextTopic')}
            </button>
            
            <div className="flex gap-3 pt-4">
              <textarea
                value={advancedInput}
                onChange={(e) => setAdvancedInput(e.target.value)}
                placeholder={t('advancedQuestions.customAnswerPlaceholder')}
                rows={2}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={() => handleAdvancedAnswer(advancedInput)}
                disabled={!advancedInput.trim()}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {t('common.confirm')}
              </button>
            </div>
            
            <div className="pt-4">
              <button
                onClick={handleSkipToResult}
                className="w-full p-4 text-center text-green-600 hover:text-green-800 border border-green-300 rounded-lg hover:bg-green-50 transition-colors min-h-[60px] flex items-center justify-center"
              >
                {t('buttons.generateResult')}
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (state.currentPhase === 'follow-up') {
      const currentFollowUp = state.followUpQuestions[state.followUpQuestions.length - 1]
      
      // 如果当前追问不存在，显示加载状态
      if (!currentFollowUp) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-300 border-t-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('errors.preparingQuestions')}</p>
            </div>
          </div>
        )
      }
      
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-purple-600 mb-2">
              {t('questions.followUp', { level: state.currentFollowUpLevel })}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentFollowUp.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentFollowUp.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleFollowUpAnswer(option)}
                className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors min-h-[60px] flex items-center"
              >
                {option}
              </button>
            ))}
            
            {/* 换一个话题按钮 */}
            <button
              onClick={handleSkipToNextTopic}
              className="w-full p-4 text-center bg-blue-50 border border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-100 transition-colors min-h-[60px] flex items-center justify-center text-blue-600 hover:text-blue-800"
            >
              {t('buttons.nextTopic')}
            </button>
            
            <div className="flex gap-3 pt-4">
              <textarea
                value={followUpInput}
                onChange={(e) => setFollowUpInput(e.target.value)}
                placeholder={t('advancedQuestions.customAnswerPlaceholder')}
                rows={2}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={() => handleFollowUpAnswer(followUpInput)}
                disabled={!followUpInput.trim()}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                {t('common.confirm')}
              </button>
            </div>
            
            <div className="pt-4">
              <button
                onClick={handleSkipToResult}
                className="w-full py-3 text-green-600 hover:text-green-800 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
              >
                {t('buttons.generateResult')}
              </button>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  // 渲染加载状态
  if (state.isLoading) {
    const loadingTexts = {
      'basic': t('loadingMessages.basic'),
      'advanced-preset': t('loadingMessages.advancedPreset'),
      'advanced-ai': t('loadingMessages.advancedAi'),
      'follow-up': t('loadingMessages.followUp'),
      'generating': t('loadingMessages.generating'),
      'complete': t('loadingMessages.complete')
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('result.title')}</h1>
              <p className="text-gray-600">{t('result.subtitle')}</p>
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
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">{t('result.nameFields.surnameOrigin')}</h4>
                          <p className="text-gray-600">{name.surnameOrigin}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">{t('result.nameFields.meaning')}</h4>
                          <p className="text-gray-600">{name.meaning}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">{t('result.nameFields.reason')}</h4>
                          <p className="text-gray-600">{name.reason}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">{t('result.nameFields.personalityMatch')}</h4>
                          <p className="text-gray-600">{name.personalityMatch}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-700 mb-1">{t('result.nameFields.culturalBackground')}</h4>
                          <p className="text-gray-600">{name.culturalBackground}</p>
                        </div>
                      </div>

                      {/* 家纹部分 */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-700">{t('result.familyCrest.title')}</h4>
                          {!name.familyCrest?.image && !name.familyCrest?.generating && (
                            <button
                              onClick={() => handleGenerateFamilyCrest(index)}
                              className="px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors"
                            >
                              {t('result.familyCrest.generateButton')}
                            </button>
                          )}
                        </div>
                        
                        {name.familyCrest?.generating && (
                          <div className="flex items-center justify-center py-8 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-300 border-t-amber-600 mx-auto mb-2"></div>
                              <p className="text-amber-700 text-sm">{t('result.familyCrest.generating')}</p>
                            </div>
                          </div>
                        )}
                        
                        {name.familyCrest?.image && (
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-shrink-0">
                                <img
                                  src={name.familyCrest.image}
                                  alt={`${name.fullName} family crest`}
                                  className="w-32 h-32 object-contain bg-gray-50 rounded-lg border"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-2">
                                  {name.familyCrest.explanation || t('result.familyCrest.description')}
                                </p>
                                <button
                                  onClick={() => handleGenerateFamilyCrest(index)}
                                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                                >
                                  {t('result.familyCrest.regenerate')}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {name.familyCrest?.error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-700 text-sm">{name.familyCrest.error}</p>
                            <button
                              onClick={() => handleGenerateFamilyCrest(index)}
                              className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              {t('result.familyCrest.retry')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">{t('result.sections.namingThoughts')}</h3>
                    <p className="text-blue-700">{namingResult.explanation}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">{t('result.sections.personalityAnalysis')}</h3>
                    <p className="text-green-700">{namingResult.personalityAnalysis}</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">{t('result.sections.culturalContext')}</h3>
                  <p className="text-purple-700">{namingResult.culturalContext}</p>
                </div>
              </div>
            )}

            {state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{t('errors.generationError', { error: state.error })}</p>
              </div>
            )}

            <div className="text-center mt-8">
              <button
                onClick={handleRestart}
                className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {t('buttons.restartNaming')}
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('header.title')}</h1>
            <p className="text-gray-600">{t('header.subtitle')}</p>
          </div>

          {state.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{t('errors.generationError', { error: state.error })}</p>
            </div>
          )}

          {renderCurrentQuestion()}

          {/* 进度指示器 */}
          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">
              {state.currentPhase === 'basic' && `${t('questions.basic')} (${state.currentQuestionIndex + 1}/${basicQuestions.length})`}
              {state.currentPhase === 'advanced-preset' && `${t('questions.preset')} (${state.currentAdvancedQuestionIndex + 1}/2)`}
              {state.currentPhase === 'advanced-ai' && t('questions.aiGenerated')}
              {state.currentPhase === 'follow-up' && t('questions.followUp', { level: state.currentFollowUpLevel })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 