import OpenAI from 'openai'

// OpenRouter 配置（优先使用）
const openrouterClient = process.env.OPENROUTER_API_KEY ? new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
}) : null

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'

// MiniMax 配置（备用）
const minimax = new OpenAI({
  apiKey: process.env.MINIMAX_API_KEY,
  baseURL: 'https://api.longcat.chat/openai/v1',
})

const MINIMAX_MODEL = 'LongCat-Flash-Chat'

/**
 * 使用 OpenRouter 或 MiniMax 生成 SEO 文章
 * 优先级：OpenRouter > MiniMax
 */
export async function generateSEOArticle(keyword, userContent) {
  const prompt = buildGeneratePrompt(keyword, userContent)

  // 优先使用 OpenRouter
  if (openrouterClient) {
    try {
      console.log('[Generator] 尝试使用 OpenRouter:', OPENROUTER_MODEL)
      const completion = await openrouterClient.chat.completions.create({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 8192,
        extra_headers: {
          'HTTP-Referer': 'https://www.zkwatcher.top',
          'X-Title': '极客观察 SEO 文章生成'
        }
      })

      console.log('[Generator] OpenRouter 调用成功')
      return completion.choices[0].message.content
    } catch (error) {
      console.error('[Generator] OpenRouter 调用失败:', error.message)
      console.log('[Generator] 回退到 MiniMax...')
    }
  }

  // 备用：使用 MiniMax
  try {
    const completion = await minimax.chat.completions.create({
      model: MINIMAX_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 8192,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('MiniMax API 调用失败:', error)
    throw new Error(`文章生成失败: ${error.message}`)
  }
}

/**
 * 构建生成提示词
 */
function buildGeneratePrompt(keyword, userContent) {
  const userMaterialSection = userContent
    ? `\n## 用户提供的素材\n${userContent}\n\n请基于以上素材，生成一篇 SEO 文章。如果素材中有明确的网站标题/主题，优先使用素材中的核心内容。\n`
    : ''

  return `你是一个科普作家，写一篇关于"${keyword}"的通俗易懂的文章。${userMaterialSection}

## 风格：罗永浩式表达

### 语气特征
- **有温度**：像跟朋友喝咖啡聊天，不是上课
- **有观点**：敢说真话，不和稀泥
- **有幽默**：自嘲、反讽、意外比喻信手拈来
- **有感染力**：让人想一口气读完
- **工匠精神**：对文字讲究，但不失亲切

### 口头禅（可选使用）
- "说白了"、"说人话就是"
- "你想想看"、"这么一说你可能就明白了"
- "有意思的是"、"有意思的是，这事儿"
- "某种程度上"、"怎么说呢"

### 绝对禁止
- 不要东北话/雨姐语气
- 不要术语堆砌（必须用术语时要立刻解释）
- 不要官话套话
- 不要空洞的"其实很重要"
- 禁止emoji

### 避免AI痕迹
- **不要用"首先"、"其次"、"最后"这种僵硬的过渡词**，用"接下来"、"然后"、"再说"等自然过渡
- **不要用"值得注意的是"、"毋庸置疑"这种套话**
- **不要每段开头都用"实际上"、"其实"**
- **句子要长短相间**，不要全是长句或短句
- **避免重复相同的句式结构**
- **减少机械的列点式输出**，能用自然段落就不用列表

## 内容风格：费曼学习法

### 核心原则
1. **先给结论**：开头就用一句话告诉读者这个东西是什么
2. **类比生活**：用每个人都熟悉的事物来解释陌生概念
3. **拆解本质**：把复杂的东西拆成几个简单部分，逐一解释
4. **澄清误区**：告诉读者常见的错误理解

### 具体写法
- 每介绍一个新概念，先问"为什么需要知道这个？"
- 用"就像...一样"、"相当于..."、"比如..."等句式
- 遇到专业术语必须立即用大白话解释
- 段落控制在3行以内
- 用 **加粗** 强调金句和核心概念

## 结构要求（简洁有力，层次分明）

### 标题
- 引发好奇或给出承诺
- 如："XX是什么？看完这篇你就懂了"、"5分钟了解一下XX"

### 开头（80字内）
- 一句话抛出核心观点
- 直接告诉读者能获得什么
- **重要：这段话将作为微信公众号摘要，务必控制在80字以内！**
- **开头段落与正文之间用空行分隔，形成独立段落**

### 正文（3-4个小节）
- **每节结构：标题 → 核心句(加粗) → 要点列表 → 图片**
- H2标题：数字编号 + 核心问题（如 "## 1. 什么是XX？"）
- H3标题：简短问句
- 段落：每段不超过3行
- **用无序列表列出2-4个要点**，每点一句话，突出重点
- **每节插入一张相关图片**，紧跟文字，不要堆在结尾
- 示例节奏：
  \`\`\`
  ## 1. 什么是AI？

  **AI就是让机器具有人类智能的技术。**

  核心要点：
  - 让机器能"学习"和"思考"
  - 能识别图像、语音、文字
  - 能自主决策和生成内容

  ![AI相关](URL)
  \`\`\`

### 图片要求（重要！）
- **3-4张图片必须分散在文章各处**
- 图片要紧跟相关文字段落
- 格式：![图片描述](图片URL)
- 图片必须来自 Pexels/Pixabay/Unsplash/Wikipedia 等免费图源，必须是可访问的真实URL（不要用占位符或本地路径）
- 必须在图片链接后标注来源，格式：![描述](URL "图片来源: xxx")

### 结尾
- 核心观点总结（3条加粗金句）
- 一句话行动建议
- 不要废话
- **结尾段落与正文之间用空行分隔，形成独立段落**

## SEO要求

1. **字数**: 1500-2000字（内容充实有利于搜索排名）
2. **关键词密度**: "${keyword}"自然出现5-8次，核心关键词放标题、前100字、小标题
3. **准确性**: 基础定义必须与参考的Wikipedia/百度百科一致
4. **图片**: 3-5张，必须是真实可访问的URL（不要占位符）
   - **优先使用 Pexels/Pixabay/Unsplash/Wikipedia 等免费图源**
   - 格式：![图片描述](图片URL "图片来源: xxx")
   - 图片要紧跟相关段落，不要堆在一起

## 格式

- Markdown格式
- H2: "## "
- H3: "### "
- 加粗: **内容**
- 图片: 标准Markdown语法
- **段落之间用空行分隔，特别是开头段、结尾段与正文之间必须有明显间隔**

## 输出

直接输出文章，不要任何说明。文章末尾用一行标注封面图URL，格式：![cover](图片URL)，这张图将用于社交分享展示。`
}

/**
 * 提取文章元数据（生成吸引人的标题和摘要）
 */
export async function extractMetadata(content, keyword, userContent) {
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const firstParagraph = content.match(/^[^#\n]+$/m)
  const originalTitle = titleMatch?.[1] || keyword
  const originalDesc = firstParagraph?.[0]?.slice(0, 120) || `${keyword}专业解读`

  // 使用 LLM 生成更吸引人的标题和摘要
  try {
    const prompt = buildMetadataPrompt(originalTitle, originalDesc, keyword, userContent)

    let result
    if (openrouterClient) {
      const completion = await openrouterClient.chat.completions.create({
        model: OPENROUTER_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
        extra_headers: {
          'HTTP-Referer': 'https://www.zkwatcher.top',
          'X-Title': '极客观察 SEO 元数据生成'
        }
      })
      result = completion.choices[0].message.content
    } else {
      const completion = await minimax.chat.completions.create({
        model: MINIMAX_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512
      })
      result = completion.choices[0].message.content
    }

    // 解析 JSON 响应
    const jsonMatch = result.match(/\{[\s\S]*?\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        title: parsed.title || originalTitle,
        description: parsed.description || originalDesc,
        keyword,
        generatedAt: new Date().toISOString()
      }
    }
  } catch (err) {
    console.error('生成吸引人标题失败，使用原始标题:', err.message)
  }

  // 如果失败，使用原始标题但稍微优化一下
  return {
    title: originalTitle.includes(' - ') ? originalTitle : `${originalTitle} - 极客观察`,
    description: originalDesc,
    keyword,
    generatedAt: new Date().toISOString()
  }
}

function buildMetadataPrompt(originalTitle, originalDesc, keyword, userContent) {
  const materialContext = userContent ? `\n\n用户素材参考：\n${userContent}` : ''

  return `你是一个公众号运营专家，为文章生成吸引人的标题和摘要。

原始标题：${originalTitle}
原始摘要：${originalDesc}${materialContext}

要求：
1. 标题要博人眼球、吸引点击，有悬念或好奇心
2. 可以用数字、疑问、对比等方式吸引眼球
3. 标题长度 15-30 字，不要太长
4. 摘要 80-120 字，要有吸引力，让人想点进去
5. 结合用户素材中的核心信息（如果有）

直接返回 JSON 格式：
{
  "title": "新标题",
  "description": "新摘要"
}

不要有任何解释，直接返回 JSON。`
}

