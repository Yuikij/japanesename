// 日本取名功能的类型定义

export interface BasicQuestion {
  id: string
  question: string
  type: 'text' | 'select'
  options?: string[]
  placeholder?: string
  required: boolean
}

export interface AdvancedQuestion {
  id: string
  question: string
  options: string[]
  type: 'preset' | 'ai-generated'
}

export interface FollowUpQuestion {
  id: string
  question: string
  options: string[]
  parentQuestionId: string
  level: number // 1, 2, 3
}

export interface QuestionAnswer {
  questionId: string
  question: string
  answer: string
  type: 'basic' | 'advanced-preset' | 'advanced-ai' | 'follow-up'
  followUpLevel?: number
  parentQuestionId?: string
  skipped?: boolean
}

export interface ConversationState {
  currentPhase: 'basic' | 'advanced-preset' | 'advanced-ai' | 'follow-up' | 'generating' | 'complete'
  currentQuestionIndex: number
  currentFollowUpLevel: number
  currentAdvancedQuestionIndex: number
  answers: QuestionAnswer[]
  advancedQuestions: AdvancedQuestion[]
  followUpQuestions: FollowUpQuestion[]
  currentFollowUpParent?: string
  isLoading: boolean
  error?: string
}

export interface GeneratedName {
  fullName: string
  surname: string
  givenName: string
  reading: string
  meaning: string
  surnameOrigin: string
  reason: string
  culturalBackground: string
  personalityMatch: string
  familyCrest?: FamilyCrest
}

export interface FamilyCrest {
  image: string // base64 encoded image
  prompt: string
  generating?: boolean
  error?: string
}

export interface NamingResult {
  names: GeneratedName[]
  explanation: string
  culturalContext: string
  personalityAnalysis: string
} 