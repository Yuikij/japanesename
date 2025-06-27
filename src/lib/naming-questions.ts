// 日本取名问题配置和LLM提示模板

import { BasicQuestion, AdvancedQuestion } from '@/types/naming'

// 2个必选的基本问题
export const basicQuestions: BasicQuestion[] = [
  {
    id: 'gender',
    question: '你的性别是？',
    type: 'select',
    options: ['男性', '女性', '其他', '不愿透露'],
    required: true
  },
  {
    id: 'name',
    question: '你的名字叫什么？',
    type: 'text',
    placeholder: '请输入你的姓名',
    required: true
  }
]

// 3个预设的进阶问题
export const presetAdvancedQuestions: AdvancedQuestion[] = [
  {
    id: 'historical_preference',
    question: '你最欣赏哪种历史人物的品质？',
    options: [],
    type: 'preset'
  },
  {
    id: 'cultural_aesthetic',
    question: '你更喜欢哪种日本文化美学？',
    options: [],
    type: 'preset'
  },
  {
    id: 'personality_aspiration',
    question: '你希望自己的名字体现什么样的性格特质？',
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
    cultural_aesthetic: `
请为问题"${question}"生成6个选择选项，每个选项应该代表不同的日本文化美学风格。

要求：
1. 涵盖传统与现代的日本美学（如侘寂、雅致、禅意、武士道等）
2. 每个选项简洁明了（8-15字）
3. 体现不同的审美倾向
4. 有助于了解用户的文化偏好

请以JSON数组格式返回：["选项1", "选项2", "选项3", "选项4", "选项5", "选项6"]
`,
    personality_aspiration: `
请为问题"${question}"生成6个选择选项，每个选项应该代表不同的性格特质期望。

要求：
1. 涵盖不同的正面性格特质（如坚韧、温和、睿智、活力等）
2. 每个选项简洁明了（8-15字）
3. 具有普遍的正面价值
4. 适合在日本名字中体现

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
作为专业的日本文化专家和取名顾问，基于用户已有的回答：

${answersContext}

请生成第${questionIndex + 1}个深度个性化问题，用于更好地了解用户的特质以便起日本名字。

要求：
1. 问题应该与日本文化、历史、美学或价值观相关
2. 能够深入了解用户的性格、偏好或人生态度
3. 问题简洁明了（不超过30字）
4. 避免与已有问题重复
5. 提供6个选择选项，每个选项8-15字

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
  const levels = [
    '请基于用户的回答，提出一个更深入的相关问题，探索他们的深层想法和价值观。',
    '请继续深入，问一个能揭示用户内在理念或人生哲学的问题。',
    '请提出最后一个深度问题，探索用户的核心品格或精神追求，这将是取名的重要参考。'
  ]

  const answersContext = allAnswers.map(a => `${a.question}: ${a.answer}`).join('\n')

  return `
作为日本文化专家和取名顾问，用户刚才的回答是：

问题：${originalQuestion}
回答：${answer}

用户的其他回答：
${answersContext}

${levels[followUpLevel - 1]}

要求：
1. 问题简洁明了（不超过30字）
2. 与前面的回答有逻辑关联
3. 提供5个选择选项，体现不同的观点或倾向
4. 选项简洁（6-12字）

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