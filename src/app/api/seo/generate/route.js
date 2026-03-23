import { NextResponse } from 'next/server'
import { analyzeCompetitors, buildAnalysisReport } from '../../../../lib/seo/analyzer'
import { generateSEOArticle, extractMetadata } from '../../../../lib/seo/generator'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'

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

    // 4. 生成页面路径
    const safeKeyword = encodeURIComponent(keyword)
    const articlePath = `/article/${safeKeyword}`

    // 5. 更新关键词状态为done
    const now = new Date().toISOString()

    const { error: kwError } = await supabase
      .from(TABLE_KEYWORDS)
      .update({
        status: 'done',
        updated_at: now,
        generated_at: now,
        page_path: articlePath
      })
      .eq('keyword', keyword)

    if (kwError) {
      console.error('更新关键词状态失败:', kwError)
    }

    // 6. 记录已生成文章（必须成功，否则文章无法访问）
    const { data: articleData, error: articleError } = await supabase
      .from(TABLE_ARTICLES)
      .upsert({
        keyword,
        title: metadata.title,
        description: metadata.description,
        content: content,
        page_path: articlePath,
        generated_at: now,
        word_count: content.length
      }, {
        onConflict: 'keyword'
      })

    if (articleError) {
      console.error('插入文章记录失败:', articleError)
      return NextResponse.json({
        success: false,
        error: `文章保存失败: ${articleError.message}`,
        pagePath: articlePath
      }, { status: 500 })
    }

    console.log('文章记录插入成功:', articleData)

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
