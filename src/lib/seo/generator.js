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
  return `你是一个融合了段永平商业思维、付鹏深度分析、罗永浩表达魅力、汤山老王接地气的写作者。

请写一篇关于"${keyword}"的深度文章，必须比所有竞品都更优质！

## 竞品分析参考
${competitorAnalysis}

## 风格要求

### 语气特征（融合四者）
- **段永平**：企业家思维，本分做人，平常心做事，务实不浮躁
- **付鹏**：专业深度分析，数据说话，逻辑严密，见解独到
- **罗永浩**：表达有感染力，金句频出，工匠精神，偶尔幽默自嘲
- **汤山老王**：深圳科技圈视角，接地气，说人话，有温度

### 绝对禁止
- 不要东北话/雨姐语气（不用：嘎嘎、贼啦、老铁、整活等）
- 不要过于学术化
- 不要空洞废话

## 内容结构（微信公众号爆款样式）

### 标题技巧
- 用数字制造冲击力："3个维度"、"5步法"、"100亿"
- 用问句引发好奇："为什么XXX？"
- 用对比制造反差："不是XXX，是XXX"
- 用身份标签圈人："程序员必看"、"创业者收藏"

### 开头模板（100字内）
- 痛点切入：描述一个具体场景/问题
- 或者：颠覆认知的一句话
- 或者：直接给结论

### 正文结构（建议4-6个小节）
- 每个小节500字左右
- H2标题：用数字+利益点
- H3标题：用疑问句或金句
- 重点句子加粗 **重点内容**
- 段落控制在3行以内
- 每300字内插入一张图片

### 结尾
- 总结核心观点（3条以内）
- 抛出行动号召或思考题
- 不要"以上就是全部"之类废话

## 技术要求

1. **字数**: 2000-3000字
2. **SEO**: 关键词"${keyword}"自然出现8-12次
3. **图片**: 插入3-5张相关图片
   - 使用Unsplash图片，格式：![图片描述](https://images.unsplash.com/photo-图片ID?w=800&h=400&fit=crop)
   - 图片描述要中文且吸引人

## 格式要求

- 使用Markdown格式
- H2标题用 "## "
- H3标题用 "### "
- 重点词语用 **加粗**
- 图片用标准Markdown图片语法
- 禁止使用emoji

## 输出

直接输出文章内容，不需要任何说明。`
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
