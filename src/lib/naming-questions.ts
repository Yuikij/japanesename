// 日本取名问题配置和LLM提示模板

import { BasicQuestion, AdvancedQuestion } from '@/types/naming'

// 2个必选的基本问题
export const basicQuestions: BasicQuestion[] = [
  {
    id: 'gender',
    question: 'What is your gender?', // 将使用国际化翻译
    type: 'select',
    options: ['male', 'female', 'other', 'preferNotToSay'], // 使用键名，将通过国际化翻译
    required: true
  },
  {
    id: 'name',
    question: 'What is your name?', // 将使用国际化翻译
    type: 'text',
    placeholder: 'Please enter your name', // 将使用国际化翻译
    required: true
  }
]

// 预设的进阶问题（保留基础必要问题）
export const presetAdvancedQuestions: AdvancedQuestion[] = [
  {
    id: 'historicalPreference',
    question: 'What kind of historical figure qualities do you admire most?', // 将使用国际化翻译
    options: [],
    type: 'preset'
  },
  {
    id: 'animeCharacter',
    question: 'What is your favorite anime character?', // 将使用国际化翻译
    options: [],
    type: 'preset'
  }
]

// 为预设进阶问题生成选项的提示
export const getPresetQuestionOptionsPrompt = (
  questionId: string, 
  question: string, 
  promptMessages: any
): string => {
  const prompts = {
    historicalPreference: promptMessages.aiPrompts.presetQuestionOptions.historicalPreference,
    animeCharacter: promptMessages.aiPrompts.presetQuestionOptions.animeCharacter
  }

  const selectedPrompt = prompts[questionId as keyof typeof prompts] || promptMessages.aiPrompts.presetQuestionOptions.default
  return selectedPrompt.replace('{question}', question)
}

// AI生成进阶问题的提示模板
export const getAIAdvancedQuestionPrompt = (
  answers: Array<{ question: string; answer: string }>,
  questionIndex: number,
  promptMessages: any
): string => {
  const answersContext = answers.map(a => `问题：${a.question}\n回答：${a.answer}`).join('\n\n')
  
  return promptMessages.aiPrompts.aiAdvancedQuestion
    .replace('{answersContext}', answersContext)
    .replace('{questionIndex}', (questionIndex + 1).toString())
}

// AI生成追问的提示模板
export const getFollowUpPrompt = (
  originalQuestion: string,
  answer: string,
  followUpLevel: number,
  allAnswers: Array<{ question: string; answer: string }>,
  promptMessages: any
): string => {
  // 自由发挥的追问引导
  const levelPrompt = promptMessages.aiPrompts.followUpPrompt
    .replace('{followUpLevel}', followUpLevel.toString())

  const answersContext = allAnswers.map(a => `${a.question}: ${a.answer}`).join('\n')

  return promptMessages.aiPrompts.followUpQuestion
    .replace('{originalQuestion}', originalQuestion)
    .replace('{answer}', answer)
    .replace('{answersContext}', answersContext)
    .replace('{levelPrompt}', levelPrompt)
}

// 生成最终名字的提示模板
export const getFinalNamingPrompt = (
  answers: Array<{ question: string; answer: string }>,
  promptMessages: any
): string => {
  const answersContext = answers.map(a => `问题：${a.question}\n回答：${a.answer}`).join('\n\n')
  
  return promptMessages.aiPrompts.finalNaming
    .replace('{answersContext}', answersContext)
} 