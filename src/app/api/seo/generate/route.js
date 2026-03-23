import { NextResponse } from 'next/server'
import { analyzeCompetitors, buildAnalysisReport } from '../../../../lib/seo/analyzer'
import { generateSEOArticle, extractMetadata, generatePageCode } from '../../../../lib/seo/generator'
import { generateDefaultSEOData, generateDefaultJsonLd } from '../../../../lib/seo/templates'
import { redis } from '../../../../lib/redis'
import fs from 'fs/promises'
import path from 'path'

const SEO_KEYWORDS_KEY = 'seo:keywords:plan'
const SEO_ARTICLES_KEY = 'seo:articles:generated'

// POST 生成文章
export async function POST(request) {
  try {
    const { keyword } = await request.json()

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    console.log(`开始生成文章: ${keyword}`)

    // 1. 分析竞品
    console.log(`分析竞品中: ${keyword}`)
    const analysis = await analyzeCompetitors(keyword)
    const report = buildAnalysisReport(analysis)

    // 2. 生成文章
    console.log(`生成文章中: ${keyword}`)
    const content = await generateSEOArticle(keyword, report)

    // 3. 提取元数据
    const metadata = extractMetadata(content, keyword)

    // 4. 生成页面代码
    const pageCode = generatePageCode(keyword, content, metadata)

    // 5. 保存页面文件
    const pagePath = path.join(process.cwd(), 'src/app/seo', keyword, 'page.js')
    const pageDir = path.dirname(pagePath)

    try {
      await fs.mkdir(pageDir, { recursive: true })
      await fs.writeFile(pagePath, pageCode, 'utf-8')
      console.log(`页面已生成: ${pagePath}`)
    } catch (fsError) {
      console.error('文件写入失败（可能是只读环境）:', fsError.message)
    }

    // 6. 更新关键词状态为done
    const keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)
    for (let i = 0; i < keywords.length; i++) {
      try {
        const parsed = JSON.parse(keywords[i])
        if (parsed.keyword === keyword && parsed.status !== 'done') {
          parsed.status = 'done'
          parsed.updatedAt = new Date().toISOString()
          parsed.generatedAt = new Date().toISOString()
          parsed.pagePath = `/seo/${encodeURIComponent(keyword)}`
          await redis.lrem(SEO_KEYWORDS_KEY, i, keywords[i])
          await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(parsed))
          break
        }
      } catch {}
    }

    // 7. 记录已生成文章
    const articleRecord = {
      id: Date.now().toString(),
      keyword,
      title: metadata.title,
      description: metadata.description,
      pagePath: `/seo/${encodeURIComponent(keyword)}`,
      generatedAt: metadata.generatedAt,
      wordCount: content.length
    }
    await redis.lpush(SEO_ARTICLES_KEY, JSON.stringify(articleRecord))

    return NextResponse.json({
      success: true,
      keyword,
      metadata,
      contentLength: content.length,
      pagePath: articleRecord.pagePath,
      message: '文章生成成功'
    })
  } catch (error) {
    console.error('文章生成失败:', error)
    return NextResponse.json({
      success: false,
      error: `生成失败: ${error.message}`
    }, { status: 500 })
  }
}
