# AI日本取名生成器 - 技术实现指南

## 快速开始

### 1. 项目初始化

```bash
# 创建Next.js项目
npx create-next-app@latest japanese-name-generator --typescript --tailwind --eslint --app
cd japanese-name-generator

# 安装额外依赖
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-radio-group
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install framer-motion # 动画库
npm install zustand # 状态管理
npm install react-hook-form @hookform/resolvers zod # 表单处理
```

### 2. 项目结构搭建

```bash
mkdir -p {components/{ui,forms,questions,results},lib,data,types,hooks,utils}
```

## 核心实现

### 1. 类型定义 (`types/index.ts`)

```typescript
// 基础数据类型
export interface Surname {
  id: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  origin: 'geographic' | 'occupational' | 'clan' | 'nature' | 'directional';
  meaning: string;
  frequency: number; // 1-10, 10最常见
  region?: string;
  historicalFigures?: string[];
}

export interface GivenName {
  id: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  gender: 'male' | 'female' | 'unisex';
  meaning: string;
  traits: PersonalityTrait[];
  era: 'traditional' | 'modern' | 'timeless';
  popularity: number; // 1-10
  endingType?: string; // 如 '郎', '子', '美' 等
}

export type PersonalityTrait = 
  | 'brave' | 'gentle' | 'wise' | 'strong' | 'elegant' | 'lively'
  | 'calm' | 'honest' | 'creative' | 'traditional' | 'free' | 'responsible';

export interface UserProfile {
  name?: string;
  genderPreference?: 'male' | 'female' | 'unisex' | 'both';
  personality: PersonalityTrait[];
  interests: string[];
  historicalFigures: string[];
  animeCharacters: string[];
  values: string[];
  style: 'traditional' | 'modern' | 'mixed';
  length: 'short' | 'medium' | 'long'; // 1-2字 | 2-3字 | 3-4字
  regions?: string[]; // 地域偏好
}

export interface Question {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'select' | 'multiselect' | 'scale';
  question: string;
  description?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => boolean | string;
}

export interface NameResult {
  id: string;
  surname: Surname;
  givenName: GivenName;
  fullName: {
    kanji: string;
    hiragana: string;
    romaji: string;
  };
  score: number; // 匹配度评分
  analysis: {
    overallMeaning: string;
    culturalContext: string;
    personalityMatch: number; // 0-100
    historicalConnection?: string;
    modernRelevance: string;
    pronunciation: {
      difficulty: 'easy' | 'medium' | 'hard';
      tips: string[];
    };
  };
}
```

### 2. 状态管理 (`lib/store.ts`)

```typescript
import { create } from 'zustand';
import { UserProfile, Question, NameResult } from '@/types';

interface AppState {
  // 用户数据
  userProfile: Partial<UserProfile>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  
  // 问答流程
  currentQuestionIndex: number;
  answers: Record<string, any>;
  questions: Question[];
  setAnswer: (questionId: string, answer: any) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  
  // 生成结果
  results: NameResult[];
  isGenerating: boolean;
  setResults: (results: NameResult[]) => void;
  setGenerating: (generating: boolean) => void;
  
  // 应用状态
  currentStep: 'intro' | 'questions' | 'generating' | 'results';
  setStep: (step: 'intro' | 'questions' | 'generating' | 'results') => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userProfile: {},
  updateProfile: (updates) => 
    set(state => ({ 
      userProfile: { ...state.userProfile, ...updates } 
    })),
  
  currentQuestionIndex: 0,
  answers: {},
  questions: [],
  setAnswer: (questionId, answer) => 
    set(state => ({ 
      answers: { ...state.answers, [questionId]: answer } 
    })),
  nextQuestion: () => 
    set(state => ({ 
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1, 
        state.questions.length - 1
      ) 
    })),
  previousQuestion: () => 
    set(state => ({ 
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0) 
    })),
  
  results: [],
  isGenerating: false,
  setResults: (results) => set({ results }),
  setGenerating: (generating) => set({ isGenerating: generating }),
  
  currentStep: 'intro',
  setStep: (step) => set({ currentStep: step }),
}));
```

### 3. 问题配置 (`lib/questions.ts`)

```typescript
import { Question } from '@/types';

export const presetQuestions: Question[] = [
  {
    id: 'user_name',
    type: 'text',
    question: '请问您的姓名是什么？',
    description: '我们会参考您姓名的音韵特点来生成更协调的日本名字',
    placeholder: '请输入您的姓名（可选）',
    required: false,
  },
  {
    id: 'gender_preference',
    type: 'radio',
    question: '您希望生成适合哪种性别的日本名字？',
    options: ['男性', '女性', '中性', '生成两种性别的名字'],
    required: true,
  },
  {
    id: 'personality_traits',
    type: 'checkbox',
    question: '以下哪些词语最能描述您的性格特点？',
    description: '请选择2-5个最符合的特质',
    options: [
      '坚强勇敢', '温和亲切', '聪慧睿智', '优雅高贵', 
      '活泼开朗', '沉静内敛', '正直诚实', '富有创意',
      '传统保守', '自由奔放', '责任感强', '幽默风趣'
    ],
    required: true,
    validation: (value: string[]) => 
      value.length >= 2 && value.length <= 5 || '请选择2-5个特质',
  },
  {
    id: 'historical_figures',
    type: 'checkbox',
    question: '您比较欣赏以下哪些日本历史人物？',
    description: '您的选择将影响生成名字的历史文化风格',
    options: [
      '织田信长', '德川家康', '源义经', '坂本龙马',
      '武田信玄', '上杉谦信', '明治天皇', '圣德太子',
      '紫式部', '清少纳言', '北条政子', '淀殿'
    ],
    required: false,
  },
  {
    id: 'anime_interests',
    type: 'checkbox',
    question: '您对以下哪些动漫主题比较感兴趣？',
    description: '这将帮助我们了解您对现代日本文化的偏好',
    options: [
      '武士/忍者', '魔法/奇幻', '校园/青春', '机甲/科幻',
      '战国/历史', '恋爱/日常', '冒险/热血', '悬疑/推理'
    ],
    required: false,
  },
  {
    id: 'name_style',
    type: 'radio',
    question: '您更偏好哪种风格的日本名字？',
    options: ['传统古典', '现代时尚', '平衡融合'],
    required: true,
  },
  {
    id: 'name_length',
    type: 'radio',
    question: '您偏好的名字长度是？',
    description: '这里指的是名字（不包括姓氏）的汉字数量',
    options: ['1-2个字（简洁）', '2-3个字（平衡）', '3-4个字（丰富）'],
    required: true,
  },
];

// 动态问题生成逻辑
export function generateDynamicQuestions(answers: Record<string, any>): Question[] {
  const dynamicQuestions: Question[] = [];
  
  // 基于历史人物偏好的追问
  if (answers.historical_figures?.includes('织田信长')) {
    dynamicQuestions.push({
      id: 'leadership_style',
      type: 'radio',
      question: '您欣赏织田信长的哪种特质？',
      options: ['革新精神', '领导魅力', '战略头脑', '坚强意志'],
      required: false,
    });
  }
  
  // 基于性格特质的深入了解
  if (answers.personality_traits?.includes('聪慧睿智')) {
    dynamicQuestions.push({
      id: 'wisdom_type',
      type: 'radio',
      question: '您希望名字体现哪种类型的智慧？',
      options: ['学者型智慧', '实践型智慧', '直觉型智慧', '创新型智慧'],
      required: false,
    });
  }
  
  return dynamicQuestions;
}
```

### 4. 核心生成算法 (`lib/name-generator.ts`)

```typescript
import { UserProfile, Surname, GivenName, NameResult } from '@/types';
import { surnames } from '@/data/surnames.json';
import { givenNames } from '@/data/given-names.json';

export class NameGenerator {
  private surnames: Surname[] = surnames;
  private givenNames: GivenName[] = givenNames;
  
  generate(profile: UserProfile, count: number = 6): NameResult[] {
    const weights = this.calculateWeights(profile);
    const selectedSurnames = this.selectSurnames(profile, weights);
    const selectedGivenNames = this.selectGivenNames(profile, weights);
    
    const combinations = this.generateCombinations(
      selectedSurnames, 
      selectedGivenNames, 
      profile
    );
    
    const scored = combinations.map(combo => ({
      ...combo,
      score: this.calculateScore(combo, profile, weights)
    }));
    
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(combo => this.enrichResult(combo, profile));
  }
  
  private calculateWeights(profile: UserProfile) {
    return {
      traditional: profile.style === 'traditional' ? 0.8 : 
                  profile.style === 'modern' ? 0.3 : 0.5,
      meaning: 0.9, // 寓意始终重要
      popularity: profile.style === 'modern' ? 0.7 : 0.4,
      phonetics: 0.6,
      personality: 0.8,
      historical: profile.historicalFigures.length > 0 ? 0.7 : 0.3,
    };
  }
  
  private selectSurnames(profile: UserProfile, weights: any): Surname[] {
    let candidates = [...this.surnames];
    
    // 基于历史人物偏好过滤
    if (profile.historicalFigures.length > 0) {
      const historicalSurnames = candidates.filter(s => 
        s.historicalFigures?.some(fig => 
          profile.historicalFigures.includes(fig)
        )
      );
      if (historicalSurnames.length > 0) {
        candidates = [...historicalSurnames, ...candidates.slice(0, 20)];
      }
    }
    
    // 基于风格偏好
    if (profile.style === 'traditional') {
      candidates = candidates.filter(s => 
        s.origin === 'clan' || s.frequency <= 7
      );
    } else if (profile.style === 'modern') {
      candidates = candidates.filter(s => s.frequency >= 5);
    }
    
    return candidates.slice(0, 15);
  }
  
  private selectGivenNames(profile: UserProfile, weights: any): GivenName[] {
    let candidates = [...this.givenNames];
    
    // 性别过滤
    if (profile.genderPreference && profile.genderPreference !== 'both') {
      candidates = candidates.filter(name => 
        name.gender === profile.genderPreference || name.gender === 'unisex'
      );
    }
    
    // 性格特质匹配
    if (profile.personality.length > 0) {
      candidates = candidates.filter(name =>
        name.traits.some(trait => profile.personality.includes(trait))
      );
    }
    
    // 时代风格
    if (profile.style === 'traditional') {
      candidates = candidates.filter(name => 
        name.era === 'traditional' || name.era === 'timeless'
      );
    } else if (profile.style === 'modern') {
      candidates = candidates.filter(name => 
        name.era === 'modern' || name.era === 'timeless'
      );
    }
    
    return candidates.slice(0, 20);
  }
  
  private generateCombinations(
    surnames: Surname[], 
    givenNames: GivenName[], 
    profile: UserProfile
  ): any[] {
    const combinations = [];
    
    for (const surname of surnames) {
      for (const givenName of givenNames) {
        // 检查音韵搭配
        if (this.checkPhoneticCompatibility(surname, givenName)) {
          combinations.push({
            surname,
            givenName,
            fullName: {
              kanji: surname.kanji + givenName.kanji,
              hiragana: surname.hiragana + givenName.hiragana,
              romaji: `${surname.romaji} ${givenName.romaji}`
            }
          });
        }
      }
    }
    
    return combinations;
  }
  
  private checkPhoneticCompatibility(surname: Surname, givenName: GivenName): boolean {
    // 避免相同音的重复
    const surnameEndSound = surname.hiragana.slice(-1);
    const givenNameStartSound = givenName.hiragana.slice(0, 1);
    
    // 简单的音韵冲突检测
    const conflicts = [
      ['た', 'た'], ['か', 'か'], ['さ', 'さ'],
      ['ん', 'ん'], ['つ', 'つ']
    ];
    
    return !conflicts.some(([end, start]) => 
      surnameEndSound === end && givenNameStartSound === start
    );
  }
  
  private calculateScore(combo: any, profile: UserProfile, weights: any): number {
    let score = 0;
    
    // 性格匹配度
    const personalityMatch = combo.givenName.traits.filter(
      (trait: string) => profile.personality.includes(trait)
    ).length / Math.max(profile.personality.length, 1);
    score += personalityMatch * weights.personality * 30;
    
    // 历史文化匹配
    if (combo.surname.historicalFigures?.some((fig: string) => 
        profile.historicalFigures.includes(fig))) {
      score += weights.historical * 20;
    }
    
    // 风格一致性
    const styleMatch = this.getStyleMatch(combo, profile.style);
    score += styleMatch * weights.traditional * 25;
    
    // 流行度权重
    const popularityScore = combo.surname.frequency + combo.givenName.popularity;
    score += (popularityScore / 20) * weights.popularity * 15;
    
    // 寓意丰富度
    const meaningRichness = combo.surname.meaning.length + combo.givenName.meaning.length;
    score += (meaningRichness / 100) * weights.meaning * 10;
    
    return Math.min(score, 100);
  }
  
  private getStyleMatch(combo: any, style: string): number {
    if (style === 'traditional') {
      return combo.givenName.era === 'traditional' ? 1 : 
             combo.givenName.era === 'timeless' ? 0.7 : 0.3;
    } else if (style === 'modern') {
      return combo.givenName.era === 'modern' ? 1 : 
             combo.givenName.era === 'timeless' ? 0.7 : 0.3;
    }
    return 0.8; // mixed style
  }
  
  private enrichResult(combo: any, profile: UserProfile): NameResult {
    return {
      id: `${combo.surname.id}-${combo.givenName.id}`,
      ...combo,
      analysis: {
        overallMeaning: this.generateOverallMeaning(combo),
        culturalContext: this.generateCulturalContext(combo),
        personalityMatch: this.calculatePersonalityMatch(combo, profile),
        historicalConnection: this.generateHistoricalConnection(combo),
        modernRelevance: this.generateModernRelevance(combo),
        pronunciation: {
          difficulty: this.assessPronunciationDifficulty(combo),
          tips: this.generatePronunciationTips(combo)
        }
      }
    };
  }
  
  private generateOverallMeaning(combo: any): string {
    return `${combo.surname.meaning}与${combo.givenName.meaning}相结合，寓意着...`;
  }
  
  private calculatePersonalityMatch(combo: any, profile: UserProfile): number {
    const matchingTraits = combo.givenName.traits.filter(
      (trait: string) => profile.personality.includes(trait)
    );
    return Math.round((matchingTraits.length / Math.max(profile.personality.length, 1)) * 100);
  }
  
  private assessPronunciationDifficulty(combo: any): 'easy' | 'medium' | 'hard' {
    const totalLength = combo.fullName.hiragana.length;
    if (totalLength <= 6) return 'easy';
    if (totalLength <= 9) return 'medium';
    return 'hard';
  }
  
  private generatePronunciationTips(combo: any): string[] {
    return [
      `姓氏"${combo.surname.romaji}"的发音要点...`,
      `名字"${combo.givenName.romaji}"的发音要点...`
    ];
  }
  
  private generateCulturalContext(combo: any): string {
    return `此名字体现了${combo.surname.origin}文化背景...`;
  }
  
  private generateHistoricalConnection(combo: any): string {
    if (combo.surname.historicalFigures?.length > 0) {
      return `与历史人物${combo.surname.historicalFigures[0]}有文化关联...`;
    }
    return '';
  }
  
  private generateModernRelevance(combo: any): string {
    return `在现代日本社会中，此名字体现了...`;
  }
}
```

### 5. 用户界面组件

#### 问题组件 (`components/questions/QuestionCard.tsx`)

```typescript
import { motion } from 'framer-motion';
import { Question } from '@/types';
import { useAppStore } from '@/lib/store';

interface QuestionCardProps {
  question: Question;
  isActive: boolean;
}

export function QuestionCard({ question, isActive }: QuestionCardProps) {
  const { answers, setAnswer } = useAppStore();
  const currentAnswer = answers[question.id];
  
  const handleAnswer = (value: any) => {
    setAnswer(question.id, value);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        x: isActive ? 0 : -20,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white rounded-2xl shadow-lg p-6 border-2 transition-colors
        ${isActive ? 'border-sakura-pink' : 'border-gray-200'}
      `}
    >
      <h3 className="text-xl font-semibold text-sumi-black mb-2">
        {question.question}
      </h3>
      
      {question.description && (
        <p className="text-gray-600 mb-4 text-sm">
          {question.description}
        </p>
      )}
      
      <div className="space-y-2">
        {question.type === 'radio' && (
          <RadioGroup
            options={question.options || []}
            value={currentAnswer}
            onChange={handleAnswer}
          />
        )}
        
        {question.type === 'checkbox' && (
          <CheckboxGroup
            options={question.options || []}
            value={currentAnswer || []}
            onChange={handleAnswer}
          />
        )}
        
        {question.type === 'text' && (
          <TextInput
            placeholder={question.placeholder}
            value={currentAnswer || ''}
            onChange={handleAnswer}
          />
        )}
      </div>
    </motion.div>
  );
}
```

#### 结果展示组件 (`components/results/NameResultCard.tsx`)

```typescript
import { motion } from 'framer-motion';
import { NameResult } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface NameResultCardProps {
  result: NameResult;
  index: number;
}

export function NameResultCard({ result, index }: NameResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-xl transition-shadow">
        {/* 名字展示区 */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-sumi-black mb-2">
            {result.fullName.kanji}
          </h2>
          <p className="text-lg text-gray-600 mb-1">
            {result.fullName.hiragana}
          </p>
          <p className="text-sm text-gray-500">
            {result.fullName.romaji}
          </p>
          
          <div className="flex justify-center mt-4">
            <Badge variant="secondary">
              匹配度: {result.analysis.personalityMatch}%
            </Badge>
          </div>
        </div>
        
        {/* 分析区 */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-1">
              整体寓意
            </h4>
            <p className="text-sm text-gray-600">
              {result.analysis.overallMeaning}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-1">
              文化背景
            </h4>
            <p className="text-sm text-gray-600">
              {result.analysis.culturalContext}
            </p>
          </div>
          
          {result.analysis.historicalConnection && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                历史关联
              </h4>
              <p className="text-sm text-gray-600">
                {result.analysis.historicalConnection}
              </p>
            </div>
          )}
          
          {/* 发音指导 */}
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-1">
              发音难度: {result.analysis.pronunciation.difficulty}
            </h4>
            <ul className="text-xs text-gray-500 space-y-1">
              {result.analysis.pronunciation.tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
```

### 6. 主要页面实现

#### 生成页面 (`app/generate/page.tsx`)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { QuestionCard } from '@/components/questions/QuestionCard';
import { presetQuestions, generateDynamicQuestions } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function GeneratePage() {
  const {
    currentQuestionIndex,
    answers,
    questions,
    nextQuestion,
    previousQuestion,
    setStep,
    updateProfile
  } = useAppStore();
  
  const [allQuestions, setAllQuestions] = useState(presetQuestions);
  
  useEffect(() => {
    // 动态生成追问
    const dynamicQuestions = generateDynamicQuestions(answers);
    setAllQuestions([...presetQuestions, ...dynamicQuestions]);
  }, [answers]);
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
  const canProceed = answers[currentQuestion?.id] !== undefined;
  
  const handleNext = () => {
    if (isLastQuestion) {
      // 转换答案为用户画像
      const profile = convertAnswersToProfile(answers);
      updateProfile(profile);
      setStep('generating');
    } else {
      nextQuestion();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-wabi-sabi to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>问题进度</span>
            <span>{currentQuestionIndex + 1} / {allQuestions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* 问题卡片 */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              isActive={true}
            />
          )}
        </AnimatePresence>
        
        {/* 导航按钮 */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            上一题
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-sakura-pink hover:bg-sakura-pink/90"
          >
            {isLastQuestion ? '生成日本名字' : '下一题'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function convertAnswersToProfile(answers: Record<string, any>): UserProfile {
  // 实现答案到用户画像的转换逻辑
  return {
    name: answers.user_name,
    genderPreference: answers.gender_preference,
    personality: answers.personality_traits || [],
    historicalFigures: answers.historical_figures || [],
    interests: answers.anime_interests || [],
    style: answers.name_style === '传统古典' ? 'traditional' :
           answers.name_style === '现代时尚' ? 'modern' : 'mixed',
    length: answers.name_length?.includes('1-2') ? 'short' :
            answers.name_length?.includes('3-4') ? 'long' : 'medium',
    values: [],
    animeCharacters: []
  };
}
```

#### 结果页面 (`app/result/page.tsx`)

```typescript
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { NameGenerator } from '@/lib/name-generator';
import { NameResultCard } from '@/components/results/NameResultCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Share } from 'lucide-react';

export default function ResultPage() {
  const {
    userProfile,
    results,
    isGenerating,
    setResults,
    setGenerating,
    setStep
  } = useAppStore();
  
  useEffect(() => {
    generateNames();
  }, [userProfile]);
  
  const generateNames = async () => {
    setGenerating(true);
    
    // 模拟异步生成过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generator = new NameGenerator();
    const newResults = generator.generate(userProfile, 6);
    
    setResults(newResults);
    setGenerating(false);
  };
  
  if (isGenerating) {
    return <GeneratingAnimation />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-wabi-sabi to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-sumi-black mb-2">
            为您生成的日本名字
          </h1>
          <p className="text-gray-600">
            基于您的性格特点和文化偏好，我们为您精心挑选了以下名字
          </p>
        </motion.div>
        
        {/* 结果网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {results.map((result, index) => (
            <NameResultCard
              key={result.id}
              result={result}
              index={index}
            />
          ))}
        </div>
        
        {/* 操作按钮 */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateNames}
            className="bg-bamboo-green hover:bg-bamboo-green/90"
            disabled={isGenerating}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重新生成
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {/* 实现分享功能 */}}
          >
            <Share className="w-4 h-4 mr-2" />
            分享结果
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setStep('questions')}
          >
            重新开始
          </Button>
        </div>
      </div>
    </div>
  );
}

function GeneratingAnimation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wabi-sabi to-white flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          ⛩️
        </motion.div>
        <h2 className="text-2xl font-bold text-sumi-black mb-2">
          正在为您生成日本名字...
        </h2>
        <p className="text-gray-600">
          我们正在结合您的特质和日本传统文化，为您创造独特的名字
        </p>
      </motion.div>
    </div>
  );
}
```

## 数据准备

### 1. 姓氏数据 (`data/surnames.json`)

```json
[
  {
    "id": "sato",
    "kanji": "佐藤",
    "hiragana": "さとう",
    "romaji": "Sato",
    "origin": "occupational",
    "meaning": "佐助藤原氏，寓意辅佐和繁荣",
    "frequency": 10,
    "historicalFigures": ["佐藤义清"]
  },
  {
    "id": "suzuki",
    "kanji": "鈴木",
    "hiragana": "すずき",
    "romaji": "Suzuki",
    "origin": "nature",
    "meaning": "铃铛与树木，象征清脆悦耳与生机",
    "frequency": 9
  },
  // ... 更多姓氏数据
]
```

### 2. 名字数据 (`data/given-names.json`)

```json
[
  {
    "id": "akira_m",
    "kanji": "明",
    "hiragana": "あきら",
    "romaji": "Akira",
    "gender": "male",
    "meaning": "明亮、聪明、清楚",
    "traits": ["wise", "honest", "lively"],
    "era": "timeless",
    "popularity": 8
  },
  {
    "id": "sakura_f",
    "kanji": "桜",
    "hiragana": "さくら",
    "romaji": "Sakura",
    "gender": "female",
    "meaning": "樱花，象征美丽与短暂的珍贵",
    "traits": ["elegant", "gentle", "beautiful"],
    "era": "traditional",
    "popularity": 9
  },
  // ... 更多名字数据
]
```

## 部署配置

### 1. Vercel 部署配置 (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 2. 环境变量配置 (`.env.local`)

```bash
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AI日本取名生成器"

# 分析工具（可选）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx

# API配置（如果需要外部API）
OPENAI_API_KEY=sk-xxxxx
```

这个实现指南提供了完整的技术架构和核心代码实现。您可以按照这个指南逐步构建项目，每个部分都包含了详细的代码示例和实现思路。 