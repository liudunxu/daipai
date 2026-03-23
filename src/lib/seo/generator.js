import OpenAI from 'openai'

const minimax = new OpenAI({
  apiKey: process.env.MINIMAX_API_KEY,
  baseURL: 'https://api.longcat.chat/openai/v1',
})

/**
 * 使用东北雨姐风格生成SEO文章
 */
export async function generateSEOArticle(keyword, competitorAnalysis) {
  const prompt = buildGeneratePrompt(keyword, competitorAnalysis)

  try {
    const completion = await minimax.chat.completions.create({
      model: 'LongCat-Flash-Chat',
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
function buildGeneratePrompt(keyword, competitorAnalysis) {
  return `你是一个科普作家，写一篇关于"${keyword}"的通俗易懂的文章。

## 竞品分析参考
${competitorAnalysis}

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
- 每400字插入一张图片（优先使用参考资料中的图片URL）

## 结构要求（微信公众号爆款样式）

### 标题
- 引发好奇或给出承诺
- 如："XX是什么？看完这篇你就懂了"、"5分钟了解一下XX"

### 开头（100字内）
- 痛点切入、颠覆认知、或直接给结论
- 让人想继续读下去

### 正文（4-6个小节）
- 每节聚焦一个点
- H2标题：用数字+核心要点
- H3标题：问句或金句
- 段落：2-3行

### 结尾
- 核心观点总结（3条以内）
- 行动建议或思考
- 不要废话

## SEO要求

1. **字数**: 2000-2500字
2. **关键词密度**: "${keyword}"自然出现8-10次
3. **准确性**: 基础定义必须与参考的Wikipedia/百度百科一致
4. **图片**: 3-5张（优先使用竞品分析中提供的图片URL）
   - 格式：![图片描述](https://images.unsplash.com/photo-图片ID?w=800&h=400&fit=crop)

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
 * 提取文章元数据
 */
export function extractMetadata(content, keyword) {
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const firstParagraph = content.match(/^[^#\n]+$/m)

  return {
    title: titleMatch?.[1] || `${keyword} - 极客观察`,
    description: firstParagraph?.[0]?.slice(0, 160) || `${keyword}专业解读`,
    keyword,
    generatedAt: new Date().toISOString()
  }
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
