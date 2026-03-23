import { NextResponse } from 'next/server'
import { analyzeCompetitors, buildAnalysisReport } from '../../../../lib/seo/analyzer'
import { generateSEOArticle, extractMetadata, generatePageCode } from '../../../../lib/seo/generator'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import fs from 'fs/promises'
import path from 'path'

const TABLE_KEYWORDS = 'seo_keywords'
const TABLE_ARTICLES = 'seo_articles'

// 验证token
async function authCheck(request) {
  const result = await verifyRequest(request)
  if (!result.valid) {
    return { error: result.error, response: NextResponse.json({ error: result.error }, { status: 401 }) }
  }
  return { user: result.payload }
}

// POST 生成文章
export async function POST(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

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
    const safeKeyword = encodeURIComponent(keyword)
    const pagePath = path.join(process.cwd(), 'src/app/seo', safeKeyword, 'page.js')
    const pageDir = path.dirname(pagePath)

    try {
      await fs.mkdir(pageDir, { recursive: true })
      await fs.writeFile(pagePath, pageCode, 'utf-8')
      console.log(`页面已生成: ${pagePath}`)
    } catch (fsError) {
      console.error('文件写入失败（可能是只读环境）:', fsError.message)
    }

    // 6. 更新关键词状态为done
    const now = new Date().toISOString()
    const articlePath = `/seo/${safeKeyword}`

    await supabase
      .from(TABLE_KEYWORDS)
      .update({
        status: 'done',
        updated_at: now,
        generated_at: now,
        page_path: articlePath
      })
      .eq('keyword', keyword)

    // 7. 记录已生成文章
    await supabase
      .from(TABLE_ARTICLES)
      .insert({
        keyword,
        title: metadata.title,
        description: metadata.description,
        content: content,
        page_path: articlePath,
        generated_at: now,
        word_count: content.length
      })

    return NextResponse.json({
      success: true,
      keyword,
      metadata,
      contentLength: content.length,
      pagePath: articlePath,
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
