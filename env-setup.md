# 环境配置指南

## 必需的环境变量

### 1. LLM API 配置

在 Cloudflare Workers 环境中，需要配置以下密钥变量：

```bash
# Gemini API Key (必需)
wrangler secret put GEMINI_API_KEY
# 输入你的 Google AI Studio API Key

# API 端点 (可选，有默认值)
wrangler secret put GEMINI_API_ENDPOINT
# 默认: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent
```

### 2. 域名白名单配置

```bash
# 允许的域名列表 (生产环境必需)
wrangler secret put ALLOWED_ORIGINS
# 示例: https://yourdomain.com,https://www.yourdomain.com,https://*.yourdomain.com
```

### 3. 本地开发环境

创建 `.env.local` 文件：

```env
# 本地开发用 API Key
GEMINI_API_KEY=your_api_key_here

# 本地开发环境自动允许所有域名，不需要设置 ALLOWED_ORIGINS
NODE_ENV=development
```

## 获取 API Key

### Google AI Studio (Gemini API)

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登录你的 Google 账户
3. 点击 "Create API Key"
4. 复制生成的 API Key

## 部署配置

### 使用 OpenNext + Cloudflare

1. **安装依赖**
```bash
npm install
```

2. **本地开发**
```bash
npm run dev
```

3. **配置密钥**
```bash
# 设置 API Key
wrangler secret put GEMINI_API_KEY

# 设置允许的域名（生产环境）
wrangler secret put ALLOWED_ORIGINS
```

4. **构建和部署**
```bash
npm run deploy
```

### 域名白名单格式

支持以下格式：

```
# 单个域名
https://example.com

# 多个域名（逗号分隔）
https://example.com,https://api.example.com

# 通配符子域名
https://*.example.com

# 混合格式
https://example.com,https://*.subdomain.example.com,http://localhost:3000
```

## 安全建议

1. **API Key 保护**
   - 不要将 API Key 提交到代码仓库
   - 使用 Cloudflare Secrets 存储敏感信息
   - 定期轮换 API Key

2. **域名白名单**
   - 生产环境务必配置 `ALLOWED_ORIGINS`
   - 只允许可信的域名访问 API
   - 避免使用过于宽泛的通配符

3. **频率限制**
   - 当前默认每分钟 20 次请求
   - 可根据需要调整 `checkRateLimit` 函数

## 故障排除

### 常见错误

1. **"API key not configured"**
   - 检查是否正确设置了 `GEMINI_API_KEY`
   - 确认 API Key 有效且有足够的配额

2. **"Access denied: Origin not allowed"**
   - 检查 `ALLOWED_ORIGINS` 配置
   - 确认域名格式正确（包含协议）
   - 开发环境应该自动允许，检查 `NODE_ENV`

3. **"Rate limit exceeded"**
   - 等待一分钟后重试
   - 或调整频率限制设置

### 调试步骤

1. **检查环境变量**
```bash
wrangler secret list
```

2. **查看日志**
```bash
wrangler tail
```

3. **测试 API**
   访问 `/test-chat` 页面进行功能测试

## API 使用示例

### 基本聊天

```typescript
import { chatClient } from '@/lib/chat-client'

// 发送消息
const response = await chatClient.sendMessage('你好', 'conversation-id')
console.log(response)
```

### 日本取名对话

```typescript
// 开始取名对话
const intro = await chatClient.startNameGenerationConversation()

// 继续对话
const response = await chatClient.continueNameConversation('我是男性，喜欢历史')

// 生成最终名字
const names = await chatClient.generateFinalNames('naming', 5)
```

### 直接 API 调用

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [{ text: '请帮我起一个日本名字' }]
      }
    ]
  })
})

const data = await response.json()
``` 