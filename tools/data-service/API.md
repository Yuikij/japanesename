# Japanese Name Data Service — API 文档

**Base URL**: `https://japanesenamedata.yuisama.top`

**鉴权**: 写操作需在请求头携带 `X-API-Secret: <your-secret>`。读操作在 API_SECRET 为默认值时免鉴权。

---

## 健康检查

```
GET /health
```

响应:
```json
{ "service": "japanesename-data-service", "status": "ok" }
```

---

## Dashboard

```
GET /dashboard
```

浏览器访问即可打开中文数据管理界面。根路径 `/` 会自动重定向到此。

---

## 名字库 `/api/names`

### 列表查询

```
GET /api/names?limit=50&offset=0&gender=female&name_part=given_name&status=complete
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `limit` | int | 每页条数，默认 50，最大 500 |
| `offset` | int | 偏移量，默认 0 |
| `gender` | string | 可选过滤：`male` / `female` / `unisex` |
| `name_part` | string | 可选过滤：`given_name` / `family_name` |
| `status` | string | 可选过滤：`raw` / `llm_enriched` / `reviewed` / `complete` |

响应:
```json
{
  "data": [NameRecord, ...],
  "total": 1234,
  "limit": 50,
  "offset": 0
}
```

### 单条查询

```
GET /api/names/:id
```

响应: `{ "data": NameRecord }`

### 新增（单条或批量）

```
POST /api/names
```

单条:
```json
{
  "romaji": "Sakura",
  "kanji": "桜",
  "reading": "さくら",
  "gender": "female",
  "name_part": "given_name",
  "syllable_count": 3,
  "script": ["hiragana", "kanji"],
  "era": "modern",
  "popularity": "common",
  "vibe": ["elegant", "gentle"],
  "meaning_en": "cherry blossom",
  "meaning_zh": "樱花",
  "status": "complete"
}
```

批量:
```json
{ "items": [NameInput, ...] }
```

响应: `{ "success": true, "count": 1, "ids": ["gn_sakura_a1b2"] }`

### 更新

```
PUT /api/names/:id
```

Body 中传需要更新的字段即可（部分更新）。

### 删除

```
DELETE /api/names/:id
```

### DSL 筛选查询

```
POST /api/names/query
```

```json
{
  "filter_rule": {
    "must": [
      { "field": "gender", "op": "eq", "value": "female" },
      { "field": "vibe", "op": "any_of", "value": ["elegant", "gentle"] }
    ],
    "should": [
      { "field": "era", "op": "eq", "value": "modern" }
    ]
  },
  "limit": 100,
  "offset": 0
}
```

`must` 条件用 AND 连接，是硬过滤。`should` 条件用于排序加分，匹配越多排名越靠前。

**支持的操作符:**

| op | 说明 | 适用字段 |
|----|------|----------|
| `eq` | 精确匹配 | 所有字段 |
| `any_of` | 值在列表中（OR）| 普通字段为 IN，JSON 数组字段为 EXISTS |
| `all_of` | 全部包含（AND） | 仅 JSON 数组字段 |
| `gte` / `lte` / `gt` / `lt` | 数值比较 | `syllable_count` 等数值字段 |
| `starts_with` | 前缀匹配 | `romaji`（单字母时走 `romaji_initial` 索引）|
| `contains` | 包含匹配 | 普通字段 LIKE，JSON 数组字段 EXISTS |
| `is_empty` | 空值检测 | JSON 数组: `IS NULL` 或 `'[]'`；普通字段: `IS NULL` 或空字符串。`value: true` 查空，`false` 查非空 |
| `is_null` | NULL 检测 | `value: true` 查 NULL，`false` 查非 NULL |

**可过滤字段:** `gender`, `name_part`, `era`, `popularity`, `origin_region`, `syllable_count`, `romaji`, `romaji_initial`, `status`, `script`, `use_case`, `vibe`, `element`, `kanji_meaning_tags`

### 统计总览

```
GET /api/names/stats/summary
```

响应:
```json
{
  "total": 1234,
  "by_status": [{ "status": "complete", "count": 800 }, ...],
  "by_gender": [{ "gender": "female", "count": 500 }, ...],
  "by_name_part": [{ "name_part": "given_name", "count": 900 }, ...]
}
```

---

## 关键词库 `/api/keywords`

### 列表查询

```
GET /api/keywords?limit=50&offset=0&status=draft&strategy=category_page&priority=1
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `limit` | int | 每页条数，默认 50，最大 500 |
| `offset` | int | 偏移量，默认 0 |
| `status` | string | `draft` / `seo_ready` / `filter_ready` / `quiz_ready` / `published` |
| `strategy` | string | `category_page` / `blog_post` / `tool_page` / `homepage_seo` |
| `priority` | int | 1-5 |

### 单条查询

```
GET /api/keywords/:id
```

### 新增（单条或批量）

```
POST /api/keywords
```

单条传 KeywordInput 对象；批量传 `{ "items": [KeywordInput, ...] }`。

### 更新

```
PUT /api/keywords/:id
```

### 删除

```
DELETE /api/keywords/:id
```

### 覆盖率检查

```
POST /api/keywords/coverage
```

```json
{ "keyword_ids": ["kw_0001", "kw_0002"] }
```

基于每个关键词的 `filter_rule` 查询 names 表中匹配的记录数，返回覆盖率评估和建议。

响应:
```json
{
  "data": [
    {
      "id": "kw_0001",
      "keyword": "japanese last names",
      "match_count": 150,
      "strategy": "category_page",
      "recommendation": "ok: category_page"
    }
  ],
  "total": 2
}
```

建议级别: `ok` (≥50) → `warning` (≥20) → `downgrade` (≥5) → `block` (<5)

---

## 标签枚举 `/api/tags`

### 查询所有标签（按维度分组）

```
GET /api/tags?dimension=gender
```

`dimension` 为可选过滤。省略则返回所有维度。

响应:
```json
{
  "data": {
    "gender": [
      { "id": 1, "dimension": "gender", "value": "male", "label_en": "Male", "label_zh": "男性", "sort_order": 1 }
    ],
    "vibe": [...]
  },
  "total": 63
}
```

**现有维度:** `gender`, `name_part`, `era`, `popularity`, `origin_region`, `script`, `use_case`, `vibe`, `element`

### 新增/更新单个标签

```
POST /api/tags
```

```json
{
  "dimension": "vibe",
  "value": "mysterious",
  "label_en": "Mysterious",
  "label_zh": "神秘",
  "sort_order": 10
}
```

冲突时自动更新（UPSERT）。

### 批量新增

```
POST /api/tags/batch
```

```json
{
  "items": [
    { "dimension": "vibe", "value": "mysterious", "label_en": "Mysterious", "label_zh": "神秘" }
  ]
}
```

### 删除

```
DELETE /api/tags/:dimension/:value
```

---

## 导出 `/api/export`

### 导出名字

```
POST /api/export/names
```

```json
{ "status": "complete", "gender": "female", "name_part": "given_name", "limit": 5000 }
```

所有字段可选。默认最大 10000 条。

### 导出关键词

```
POST /api/export/keywords
```

```json
{ "status": "published", "strategy": "category_page", "min_priority": 2 }
```

### 导出标签枚举（LLM Prompt 格式）

```
POST /api/export/tags
```

返回结构化的标签枚举注册表。

### 全量导出（构建时用）

```
POST /api/export/all
```

只导出 `reviewed` / `complete` 状态的名字和 `quiz_ready` / `published` 状态的关键词。

响应:
```json
{
  "names": [...],
  "keywords": [...],
  "tag_registry": { "gender": ["male", "female", "unisex"], ... },
  "exported_at": "2026-03-21T...",
  "counts": { "names": 800, "keywords": 50 }
}
```

---

## 数据模型

### NameRecord

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 主键，自动生成如 `gn_sakura_a1b2` |
| `romaji` | string | 罗马音 |
| `kanji` | string | 汉字写法 |
| `reading` | string | 假名读音 |
| `gender` | enum | `male` / `female` / `unisex` |
| `name_part` | enum | `given_name` / `family_name` |
| `syllable_count` | int | 音节数 |
| `script` | string[] | 书写体系标签 |
| `romaji_initial` | string | 自动生成的首字母（大写） |
| `era` | string? | `ancient` / `traditional` / `modern` / `2000s` / `trending` |
| `popularity` | string? | `very_common` / `common` / `uncommon` / `rare` / `unique` |
| `origin_region` | string | `japan_native` / `japanese_american` / `international` |
| `use_case` | string[] | 使用场景标签 |
| `vibe` | string[] | 气质标签 |
| `element` | string[] | 主题元素标签 |
| `kanji_meaning_tags` | string[] | 汉字含义标签 |
| `meaning_en` | string? | 英文含义 |
| `meaning_zh` | string? | 中文含义 |
| `description_en` | string? | 英文描述 |
| `description_zh` | string? | 中文描述 |
| `famous_bearers` | object[] | `[{ "name": "...", "context": "..." }]` |
| `kamon_prompt` | string? | 家纹生图提示词（仅 family_name） |
| `related_names` | string[] | 相关名字 |
| `status` | enum | `raw` / `llm_enriched` / `reviewed` / `complete` |
| `source` | string? | 数据来源 |
| `created_at` | string | 创建时间 |
| `updated_at` | string | 更新时间 |

### KeywordRecord

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 主键，如 `kw_0001` |
| `keyword` | string | 关键词 |
| `search_volume` | int? | 主关键词月搜索量 |
| `search_volume_total` | int? | 含别名总搜索量 |
| `kd` | int? | 关键词难度 0-100 |
| `cpc` | float? | 每次点击成本（美元） |
| `intent` | string? | 搜索意图：`I`(信息) / `T`(事务) / `C`(商业) / `N`(导航) |
| `strategy` | enum? | `category_page` / `blog_post` / `tool_page` / `homepage_seo` |
| `path` | string? | URL 路径 |
| `priority` | int | 1-5，1 最高 |
| `status` | enum | `draft` / `seo_ready` / `filter_ready` / `quiz_ready` / `published` |
| `keyword_aliases` | object[] | 别名及搜索量 |
| `tags_hint` | object? | 标签提示 |
| `seo` | object? | SEO 元数据（title, h1, description） |
| `seo_guidance` | string? | SEO 指导文案 |
| `filter_rule` | object? | 名字筛选 DSL 规则 |
| `quiz` | object[]? | 问答数据 |
| `related_keywords` | object[] | 相关关键词及路径 |
| `page_template_type` | string? | 页面模板类型 |
| `relevance_score` | int? | 相关性评分 |

### FilterRule DSL

```json
{
  "must": [
    { "field": "gender", "op": "eq", "value": "female" },
    { "field": "vibe", "op": "any_of", "value": ["cute", "playful"] },
    { "field": "syllable_count", "op": "lte", "value": 3 }
  ],
  "should": [
    { "field": "popularity", "op": "any_of", "value": ["common", "very_common"] }
  ]
}
```
