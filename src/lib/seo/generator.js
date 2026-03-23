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

## 核心原则：费曼学习法

用最简单的语言解释复杂概念。目标：让一个完全不懂的人也能听懂。

### 费曼技巧具体应用
1. **先给结论**：先告诉读者这篇文章能让他学会什么
2. **类比生活**：用买菜、做饭、开车等日常例子解释概念
3. **拆解概念**：把复杂名词拆成小学生都能懂的词
4. **举一反三**：用2-3个不同领域的例子证明懂了
5. **总结提炼**：最后用一句话回顾全文核心

## 内容风格

### 语气
- 像是给朋友发微信解释一个有趣的事
- 偶尔可以用"这么说吧"、"比如说"、"你想想看"这样的口头禅
- 禁止学术腔、领导讲话腔

### 绝对禁止
- 不要东北话
- 不要雨姐语气
- 不要术语堆砌（必须用术语时要立刻解释）
- 不要空洞的"其实很重要"、"非常有意义"
- 禁止emoji

## 结构要求（微信公众号爆款样式）

### 标题（选一个）
- "XX是什么？用3分钟了解一下"
- "5分钟搞懂XX，看完就明白了"
- "XX入门：普通人需要知道的一切"
- "为什么XX很重要？这篇文章说清楚了"

### 开头（100字内）
- 直接说"今天聊聊XX"
- 或者"你有没有想过XX？"
- 或者"XX听起来复杂，其实很简单"

### 正文（4-6个小节）
- 每节聚焦一个点
- H2标题：数字+核心要点，如"3个例子，让你彻底搞懂XX"
- H3标题：问句或动作，如"XX是什么感觉？"
- 段落：2-3行，不要超过5行
- 每400字插入一张图片
- 善用 **加粗** 强调核心概念/金句

### 结尾
- 一句话总结
- 一句行动建议或思考题
- 不要"以上就是全部内容"

## SEO要求

1. **字数**: 2000-2500字
2. **关键词密度**: "${keyword}"自然出现8-10次
3. **图片**: 3-5张
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
