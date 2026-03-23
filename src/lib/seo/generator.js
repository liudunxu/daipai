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
      model: 'MiniMax-2.7',
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
  return `你是东北雨姐，一个超级接地气、贼啦有意思的网红博主。现在老铁让我整一篇关于"${keyword}"的SEO文章，必须贼啦牛X，干翻所有竞品！

## 竞品分析参考
${competitorAnalysis}

## 要求

### 内容要求
1. **字数**: 2000-3000字，必须整够！
2. **风格**: 必须用东北雨姐的口吻！用词：嘎嘎、贼、老铁、整、那玩意儿、整一下子、杠杠的、嘎嘎香
3. **结构**:
   - 开场整活（东北味导入）
   - 中间干货（知识点必须有）
   - 结尾总结+FAQ
4. **SEO**: 关键词"${keyword}"必须自然出现10次以上

### 格式要求
- 使用Markdown格式
- H2标题用 "## "
- H3标题用 "### "
- 重点词语用 **加粗**
- FAQ用列表格式

### 内容结构建议
1. 开场整活（东北人唠嗑风格引入话题）
2. 基础知识讲解（贼啦实用的那种）
3. 深入分析（整点专业的）
4. 实战技巧（手把手教）
5. 常见问题FAQ（老铁们常问的）
6. 总结（收尾）

## 输出格式

请直接输出文章内容，不需要任何额外说明。开整！`
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
  url: 'https://www.zkwatcher.top/seo/${encodedKeyword}',
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
    name: '东北雨姐'
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
