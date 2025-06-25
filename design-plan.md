# AI日本取名生成器 - 精简项目计划

## 项目概述

### 项目名称
AI日本取名生成器 (AI Japanese Name Generator)

### 项目目标
通过AI智能对话，为用户生成个性化、有文化内涵的日本姓名，让每个人都能拥有属于自己的日本名字。

### 核心理念
- **AI优先**：充分利用大模型的日本文化知识，无需复杂数据库
- **对话体验**：通过智能问答深度了解用户特质
- **文化传承**：AI生成的名字都有详细的文化背景解释
- **轻量高效**：纯前端实现，快速部署，零维护成本

## AI知识利用策略

### 🧠 **LLM已具备的日本文化知识**
现代大语言模型已经包含丰富的日本文化知识，无需额外数据库：

#### 1. 姓氏文化知识
- **来源分类**：地理特征、职业关联、氏族传承、自然元素
- **历史背景**：各姓氏的起源时代和文化背景
- **地域分布**：不同姓氏的地理分布特点
- **现代使用**：当代流行度和使用习惯

#### 2. 名字构成规律
- **性别差异**：男女名字的汉字选择和音韵特点
- **时代特征**：传统与现代名字的区别
- **寓意系统**：汉字含义和文化象征
- **音韵美学**：日语发音的美感规律

#### 3. 文化关联能力
- **历史人物**：与用户喜好的历史人物建立名字关联
- **文学作品**：从古典文学中汲取命名灵感
- **现代文化**：结合动漫、游戏等现代元素
- **价值观匹配**：根据用户性格生成匹配的名字寓意

## 精简技术架构

### 🏗️ **轻量级项目结构**
```
japanese-name-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 主页面（问答流程）
│   │   ├── layout.tsx         # 全局布局
│   │   └── api/               # API路由
│   │       └── ai-chat/
│   │           └── route.ts   # AI对话接口
│   ├── components/            # 组件
│   │   ├── ui/               # 基础UI（shadcn/ui）
│   │   ├── PresetQuestions.tsx    # 预设问题
│   │   ├── DynamicQuestions.tsx   # AI动态问题
│   │   ├── NameResults.tsx        # 结果展示
│   │   └── GeneratingAnimation.tsx # 生成动画
│   ├── lib/                   # 核心逻辑
│   │   ├── ai-engine.ts      # AI引擎（核心）
│   │   └── utils.ts          # 工具函数
│   └── types/                 # TypeScript类型
│       └── index.ts
├── public/
│   └── data/                 # 最小化配置
│       ├── questions.json    # 预设问题配置（<10KB）
│       └── ui-config.json    # UI配置（<5KB）
└── package.json
```

### 📊 **精简数据结构**

#### 用户画像（唯一需要的数据结构）
```typescript
interface UserProfile {
  // 基础信息
  name?: string;
  gender: 'male' | 'female' | 'unisex';
  
  // 预设问题答案
  historicalPreference?: string;
  animeCharacter?: string;
  personality: string[];
  nameStyle: 'traditional' | 'modern' | 'poetic' | 'nature';
  
  // AI动态问题答案
  customQuestions: Array<{
    question: string;
    answer: string;
  }>;
}
```

#### AI生成结果
```typescript
interface NameSuggestion {
  surname: {
    kanji: string;
    hiragana: string;
    romaji: string;
    origin: string;
    meaning: string;
  };
  givenName: {
    kanji: string;
    hiragana: string;
    romaji: string;
    meaning: string;
    reasoning: string;
  };
  overall: {
    fullName: string;
    explanation: string;
    matchingReasons: string[];
    culturalSignificance: string;
  };
}
```

#### 问题配置（静态配置）
```typescript
interface Question {
  id: string;
  type: 'input' | 'select' | 'multiple';
  question: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  optional?: boolean;
}
```

## 核心功能设计

### 🤖 **AI驱动的问答系统**

#### 1. 简化的预设问题
```typescript
// 只需要4-5个核心问题
const coreQuestions = [
  {
    id: 'name',
    question: '你的名字叫什么？',
    type: 'input',
    optional: true
  },
  {
    id: 'gender',
    question: '希望生成什么性别的名字？',
    type: 'select',
    options: ['男性', '女性', '中性']
  },
  {
    id: 'style',
    question: '更喜欢什么风格的名字？',
    type: 'select',
    options: ['传统古典', '现代简约', '诗意雅致', '自然清新']
  },
  {
    id: 'personality',
    question: '你的性格特点？（可多选）',
    type: 'multiple',
    options: ['勇敢', '温柔', '智慧', '坚强', '平和', '艺术气质']
  }
];
```

#### 2. AI智能追问
```typescript
// AI根据用户答案生成个性化问题
const aiQuestionPrompt = `
基于用户回答：${userAnswers}
生成3-5个个性化问题，更深入了解用户特质。
直接返回问题列表。
`;

// 示例AI生成的问题：
// - "你更欣赏武士的勇猛还是文人的雅致？"
// - "希望名字体现内在的力量还是外在的优雅？"
// - "你觉得传统的'子'字结尾怎么样？"
```

### ⚡ **AI生成引擎**

#### 核心生成流程
```typescript
class AINameGenerator {
  async generateNames(userProfile: UserProfile): Promise<NameSuggestion[]> {
    const prompt = this.buildPrompt(userProfile);
    const response = await this.callAI(prompt);
    return this.parseResponse(response);
  }

  private buildPrompt(profile: UserProfile): string {
    return `
    你是日本文化专家，请为用户生成5个日本姓名：
    
    用户信息：
    - 性格：${profile.personality.join('、')}
    - 风格偏好：${profile.nameStyle}
    - 性别：${profile.gender}
    ${profile.customQuestions.map(q => `- ${q.question}: ${q.answer}`).join('\n')}
    
    要求：
    1. 每个名字包含姓+名，附带详细解释
    2. 说明与用户特质的匹配原因
    3. 包含汉字、平假名、罗马音
    4. 解释文化背景和寓意
    
    以JSON格式返回结果。
    `;
  }
}
```

### 🎨 **结果展示组件**

#### 智能结果呈现
```typescript
// AI生成的完整结果包含所有必要信息
interface GeneratedResult {
  names: Array<{
    fullName: string;           // "佐藤雅人"
    readings: {
      hiragana: string;         // "さとう まさと"
      romaji: string;           // "Sato Masato"
    };
    breakdown: {
      surname: {
        kanji: string;          // "佐藤"
        meaning: string;        // "辅佐藤原氏"
        origin: string;         // "职业来源"
      };
      givenName: {
        kanji: string;          // "雅人"
        meaning: string;        // "优雅的人"
        reasoning: string;      // "体现你的艺术气质"
      };
    };
    culturalContext: string;    // AI生成的文化背景
    personalMatch: string[];    // 与用户特质的匹配点
  }>;
  explanation: string;          // AI对整体生成思路的解释
}
```

## UI/UX设计规范

### 设计理念
- **和风美学**：融入日本传统美学元素
- **现代简约**：保持界面简洁清晰
- **渐进体验**：问答流程自然流畅
- **教育启发**：在生成过程中传递文化知识

### 色彩方案
```css
/* 主色调：基于日本传统色彩 */
:root {
  --sakura-pink: #FFB7C5;    /* 樱花粉 */
  --wabi-sabi: #F5F5DC;      /* 米色 */
  --sumi-black: #2F2F2F;     /* 墨黑 */
  --bamboo-green: #68C44C;   /* 竹绿 */
  --sunset-orange: #FF6B35;  /* 夕阳橙 */
  --mountain-blue: #4A90C2;  /* 山青 */
}
```

### 组件风格
- **卡片式布局**：每个问题一个卡片
- **平滑过渡**：问题间切换使用渐变动画
- **响应式设计**：支持移动端和桌面端
- **可访问性**：遵循WCAG 2.1标准

## 🚀 精简开发计划

### 第1周：MVP核心功能
#### Day 1-2: 快速搭建
- ✅ Next.js + TypeScript + Tailwind CSS项目初始化
- ✅ 安装shadcn/ui组件库
- ✅ 创建基础项目结构
- ✅ 配置环境变量（AI API密钥）

#### Day 3-4: AI引擎开发
- ✅ 实现AI对话API路由
- ✅ 编写核心提示词模板
- ✅ 实现问题生成和名字生成逻辑
- ✅ 添加错误处理和重试机制

#### Day 5-7: 用户界面
- ✅ 开发问答流程组件
- ✅ 设计结果展示页面
- ✅ 添加和风美学样式
- ✅ 实现响应式布局

### 第2周：体验优化
#### Day 1-3: 功能完善
- 🔧 优化AI提示词，提高生成质量
- 🔧 添加用户偏好记忆（LocalStorage）
- 🔧 实现结果分享功能
- 🔧 添加加载动画和微交互

#### Day 4-5: 测试调优
- 🧪 用户体验测试
- 🧪 AI生成质量评估
- 🧪 性能优化
- 🧪 移动端测试

#### Day 6-7: 部署发布
- 🚀 Vercel部署配置
- 🚀 域名绑定和SSL配置
- 🚀 SEO优化
- 🚀 分析工具集成

### 可选扩展功能（按需开发）
#### 第3周及以后
- 📱 PWA支持（离线使用）
- 🌍 多语言界面
- 📊 用户使用统计
- 🎨 更多和风主题
- 🔗 社交媒体分享优化
- 🎵 名字发音音频

## ⚡ 技术栈精简

### 核心技术
```json
{
  "framework": "Next.js 14",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "ui": "shadcn/ui",
  "animation": "Framer Motion",
  "state": "Zustand (可选)"
}
```

### AI服务支持
- **OpenAI GPT-4** (推荐)
- **Claude 3** (备选)
- **本地模型** (成本控制)

### 部署方案
- ✅ **Vercel**：零配置部署
- ✅ **零服务器成本**：纯静态 + Edge Functions
- ✅ **全球CDN**：自动优化

### 性能目标
- 🚀 首屏加载 < 1秒
- ⚡ AI响应 < 3秒
- 📱 移动端完美适配
- 🌐 SEO友好

## 🎯 项目优势

### 开发优势
- **快速启动**：2周内完成MVP
- **零数据维护**：无需复杂数据库
- **AI驱动**：智能化程度高
- **成本极低**：几乎零运营成本

### 用户优势  
- **个性化强**：每个人都能得到专属名字
- **文化深度**：AI提供详细文化解释
- **体验流畅**：对话式交互自然友好
- **随时可用**：无需注册，即开即用

### 技术优势
- **架构简单**：易于维护和扩展
- **性能优异**：静态生成 + 智能缓存
- **可扩展**：AI能力可应用到其他文化
- **现代化**：使用最新技术栈

## 🌟 核心价值

### 文化传播
让更多人了解和欣赏日本文化的深层内涵

### 个性化体验
每个生成的名字都是独一无二的文化艺术品

### 技术创新
展示AI在文化领域的创新应用

### 社会价值
促进跨文化理解和文化多样性

---

**项目愿景：** "用AI的智慧，传承文化的美好"

## 🚀 立即开始

这个精简设计让你可以：

1. **今天开始编码**：无需等待数据准备
2. **一周见到成果**：快速原型验证
3. **两周上线产品**：完整可用的应用
4. **零成本运营**：专注产品而非运维

想要开始实现吗？我们可以立即创建第一个版本！ 