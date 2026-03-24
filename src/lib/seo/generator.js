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

### 结尾
- 核心观点总结（3条加粗金句）
- 一句话行动建议
- 不要废话

## SEO要求

1. **字数**: 1200-1500字（重点突出，言简意赅）
2. **关键词密度**: "${keyword}"自然出现5-6次
3. **准确性**: 基础定义必须与参考的Wikipedia/百度百科一致
4. **图片**: 3-5张
   - **优先使用竞品分析中提供的图片URL**（来自 Pexels/Pixabay/Unsplash/Wikipedia）
   - 格式：![图片描述](图片URL)
   - 必须包含图片来源和摄影师信息（格式：![描述](URL "图片来源: xxx | 摄影师: xxx")）

## 格式

- Markdown格式
- H2: "## "
- H3: "### "
- 加粗: **内容**
- 图片: 标准Markdown语法

## 输出

直接输出文章，不要任何说明。`
}

/**
 * 提取文章中的FAQ
 */
export function extractFAQs(content) {
  const faqMatches = content.matchAll(/###?\s*(.*?(?:吗|呢|怎么|如何|为什么|啥|哪))?\n\n([\s\S]*?)(?=\n##|\n#|$)/gi)
  const faqs = []

  for (const match of faqMatches) {
    const question = match[1]?.trim()
    const answer = match[2]?.trim()

    if (question && answer && answer.length > 20) {
      faqs.push({ question, answer })
    }
  }

  return faqs.slice(0, 6)
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

/**
 * 生成文章页面的代码
 */
export function generatePageCode(keyword, content, metadata) {
  const faqs = extractFAQs(content)
  const faqsJson = JSON.stringify(faqs)
  const escapedContent = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
  const encodedKeyword = encodeURIComponent(keyword)

  return `'use client'

import Head from 'next/head'
import FAQSchema from '../../../components/FAQSchema'

const seoData = {
  title: '${metadata.title.replace(/'/g, "\\'")}',
  description: '${metadata.description.replace(/'/g, "\\'")}',
  keywords: '${keyword.replace(/'/g, "\\'")}',
  url: 'https://www.zkwatcher.top/article/${encodedKeyword}',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '${metadata.title.replace(/'/g, "\\'")}',
  description: '${metadata.description.replace(/'/g, "\\'")}',
  keywords: '${keyword.replace(/'/g, "\\'")}',
  datePublished: '${metadata.generatedAt}',
  author: {
    '@type': 'Person',
    name: '极客观察'
  }
}

const faqs = ${faqsJson}

const articleContent = \`${escapedContent}\`

export default function SEOArticlePage() {
  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.url} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seoData.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <article className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(articleContent) }} />
          </div>

          <FAQSchema faqs={faqs} />
        </article>
      </div>
    </>
  )
}

function markdownToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-6 border-b border-white/10 pb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mb-8">$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong class="text-yellow-400 font-bold">$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\\n\\n/g, '</p><p class="text-white/80 mb-4 leading-relaxed">')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return '<p class="text-white/80 mb-4 leading-relaxed">' + match + '</p>'
    })
}
`
}
