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
    question: 'What type of anime character do you like most?', // 将使用国际化翻译
    options: [],
    type: 'preset'
  }
]

// 为预设进阶问题生成选项的提示
export const getPresetQuestionOptionsPrompt = (questionId: string, question: string): string => {
  const prompts = {
    historical_preference: `
请为问题"${question}"生成6个选择选项，每个选项应该代表不同的历史人物品质类型。

要求：
1. 涵盖不同类型的历史人物品质（如智慧、勇气、仁慈、创新等）
2. 每个选项简洁明了（8-15字）
3. 具有日本文化特色
4. 能够反映用户的价值观倾向

请以JSON数组格式返回：["选项1", "选项2", "选项3", "选项4", "选项5", "选项6"]
`,
    anime_character: `
请为问题"${question}"生成6个选择选项，每个选项应该代表不同的动漫角色类型。

要求：
1. 涵盖不同类型的动漫角色特质（如热血少年、智慧型、治愈系、冷静型等）
2. 每个选项简洁明了（8-15字）
3. 体现不同的性格倾向和魅力
4. 有助于了解用户的喜好

请以JSON数组格式返回：["选项1", "选项2", "选项3", "选项4", "选项5", "选项6"]
`
  }

  return prompts[questionId as keyof typeof prompts] || `
请为问题"${question}"生成6个合适的选择选项。
要求简洁明了，每个选项8-15字，以JSON数组格式返回。
`
}

// AI生成进阶问题的提示模板
export const getAIAdvancedQuestionPrompt = (
  answers: Array<{ question: string; answer: string }>,
  questionIndex: number
): string => {
  const answersContext = answers.map(a => `问题：${a.question}\n回答：${a.answer}`).join('\n\n')
  
  return `
作为专业的日本取名顾问，基于用户已有的回答：

${answersContext}

请自由发挥，生成第${questionIndex + 1}个有创意的个性化问题，用于更深入地了解用户的内在特质。

请自由选择任何你认为有助于了解用户个性的角度，可以是：
- 生活态度、价值观念
- 兴趣爱好、审美偏好  
- 人生经历、情感体验
- 性格特质、行为习惯
- 或任何其他你觉得重要的维度

要求：
1. 问题简洁明了（不超过30字）
2. 避免与已有问题重复
3. 提供6个选择选项，每个选项8-15字
4. 发挥创意，从独特角度了解用户

请以JSON格式返回：
{
  "question": "你的问题",
  "options": ["选项1", "选项2", "选项3", "选项4", "选项5", "选项6"]
}
`
}

// AI生成追问的提示模板
export const getFollowUpPrompt = (
  originalQuestion: string,
  answer: string,
  followUpLevel: number,
  allAnswers: Array<{ question: string; answer: string }>
): string => {
  // 自由发挥的追问引导
  const levelPrompt = `请自由发挥，基于用户的回答提出一个有深度的追问（第${followUpLevel}轮）。
  
可以从以下角度或任何你认为有价值的角度切入：
- 深入探索用户的内心想法
- 了解背后的原因和动机  
- 探索相关的经历和感受
- 挖掘更深层的价值观念
- 从不同角度理解用户特质`

  const answersContext = allAnswers.map(a => `${a.question}: ${a.answer}`).join('\n')

  return `
作为日本取名顾问，用户刚才的回答是：

问题：${originalQuestion}
回答：${answer}

用户的其他回答：
${answersContext}

${levelPrompt}

要求：
1. 问题简洁明了（不超过30字）
2. 与前面的回答有逻辑关联（但可以创新角度）
3. 提供5个选择选项，体现不同的观点或倾向
4. 选项简洁（6-12字）
5. 发挥创意，不必拘泥于传统框架

请以JSON格式返回：
{
  "question": "你的追问",
  "options": ["选项1", "选项2", "选项3", "选项4", "选项5"]
}
`
}

// 生成最终名字的提示模板
export const getFinalNamingPrompt = (
  answers: Array<{ question: string; answer: string }>
): string => {
  const answersContext = answers.map(a => `问题：${a.question}\n回答：${a.answer}`).join('\n\n')
  
  return `
作为专业的日本文化专家和取名顾问，我已经通过详细的问答深入了解了用户：

${answersContext}

请基于这些信息，为用户生成10个精心挑选的日本名字。每个名字都要完美契合用户的特质、价值观和审美偏好。

请按照以下JSON格式返回：

\`\`\`json
{
  "names": [
    {
      "fullName": "山田太郎",
      "surname": "山田", 
      "givenName": "太郎",
      "reading": "やまだ たろう",
      "meaning": "名字的整体含义和寓意",
      "surnameOrigin": "姓氏的历史来源和文化背景",
      "reason": "为什么这个名字适合用户的详细理由",
      "culturalBackground": "相关的文化内涵和历史典故",
      "personalityMatch": "这个名字如何体现用户的性格特质"
    }
  ],
  "explanation": "整体的取名思路和文化考量",
  "culturalContext": "日本取名文化的深度解读",
  "personalityAnalysis": "基于问答得出的用户性格分析和取名匹配逻辑"
}
\`\`\`

要求：
1. 10个名字要有不同的风格和特色
2. 每个名字都要有深厚的文化底蕴
3. 符合用户的性格特质和价值观
4. 考虑音韵美感和现代适用性
5. 提供详细的文化解释和适合理由
6. 确保返回有效的JSON格式
7. 名字要体现用户在问答中表现出的独特特质
`
} 