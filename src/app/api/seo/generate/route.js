import { NextResponse } from 'next/server'
import { analyzeCompetitors, buildAnalysisReport } from '../../../../lib/seo/analyzer'
import { generateSEOArticle, extractMetadata } from '../../../../lib/seo/generator'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import { randomUUID } from 'crypto'

const TABLE_KEYWORDS = 'seo_keywords'
const TABLE_ARTICLES = 'seo_articles'

// 生成短 UUID（8位）
function generateShortId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

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
    let analysis
    try {
      analysis = await analyzeCompetitors(keyword)
      console.log('[Route] analyzeCompetitors 完成, analysis 结构:', {
        hasKeyword: !!analysis?.keyword,
        hasSources: !!analysis?.sources,
        hasCompetitors: !!analysis?.competitors,
        hasSupplementaryKnowledge: !!analysis?.supplementaryKnowledge,
        sourcesType: typeof analysis?.sources,
        sourcesIsArray: Array.isArray(analysis?.sources)
      })
    } catch (analyzeErr) {
      console.error('[Route] analyzeCompetitors 错误:', analyzeErr)
      throw analyzeErr
    }

    let report
    try {
      report = buildAnalysisReport(analysis)
      console.log('[Route] buildAnalysisReport 完成, report 长度:', report?.length)
    } catch (reportErr) {
      console.error('[Route] buildAnalysisReport 错误:', reportErr)
      console.error('[Route] analysis 对象:', JSON.stringify(analysis)?.slice(0, 500))
      throw reportErr
    }

    // 2. 生成文章
    console.log(`生成文章中: ${keyword}`)
    const content = await generateSEOArticle(keyword, report)

    // 3. 提取元数据
    const metadata = extractMetadata(content, keyword)

    // 4. 生成页面路径（使用 UUID 而不是 keyword）
    const articleId = generateShortId()
    const articlePath = `/article/${articleId}`

    // 5. 更新关键词状态为done
    const now = new Date().toISOString()

    const { error: kwError } = await supabase
      .from(TABLE_KEYWORDS)
      .update({
        status: 'done',
        updated_at: now,
        generated_at: now,
        page_path: articlePath,
        article_id: articleId
      })
      .eq('keyword', keyword)

    if (kwError) {
      console.error('更新关键词状态失败:', kwError)
    }

    // 6. 记录已生成文章（必须成功，否则文章无法访问）
    console.log('[Generate] 开始保存文章记录')
    console.log('[Generate] content 长度:', content.length)
    console.log('[Generate] articleId:', articleId)
    console.log('[Generate] metadata:', JSON.stringify(metadata))

    // 先尝试更新，如果没找到记录则插入
    const updateResult = await supabase
      .from(TABLE_ARTICLES)
      .update({
        title: metadata.title,
        description: metadata.description,
        content: content,
        page_path: articlePath,
        generated_at: now,
        word_count: content.length,
        article_id: articleId
      })
      .eq('keyword', keyword)

    console.log('[Generate] updateResult:', JSON.stringify(updateResult))
    console.log('[Generate] updateResult.count:', updateResult.count)
    console.log('[Generate] updateResult.error:', updateResult.error)

    if (updateResult.error) {
      // 更新失败，尝试插入
      console.log('[Generate] 更新出错，尝试插入新记录:', updateResult.error.message)

      const insertResult = await supabase
        .from(TABLE_ARTICLES)
        .insert({
          keyword,
          title: metadata.title,
          description: metadata.description,
          content: content,
          page_path: articlePath,
          generated_at: now,
          word_count: content.length,
          article_id: articleId
        })

      console.log('[Generate] insertResult:', JSON.stringify(insertResult))

      if (insertResult.error) {
        console.error('[Generate] 插入文章记录失败:', JSON.stringify(insertResult.error))
        return NextResponse.json({
          success: false,
          error: `文章保存失败: ${insertResult.error.message}`,
          pagePath: articlePath
        }, { status: 500 })
      }

      console.log('[Generate] 插入成功, inserted id:', insertResult.data?.[0]?.id)
    } else if (updateResult.count === 0 || updateResult.count === null) {
      // 更新没匹配到任何记录，尝试插入
      console.log('[Generate] 更新未匹配到记录，尝试插入新记录')

      const insertResult = await supabase
        .from(TABLE_ARTICLES)
        .insert({
          keyword,
          title: metadata.title,
          description: metadata.description,
          content: content,
          page_path: articlePath,
          generated_at: now,
          word_count: content.length,
          article_id: articleId
        })

      console.log('[Generate] insertResult:', JSON.stringify(insertResult))

      if (insertResult.error) {
        console.error('[Generate] 插入文章记录失败:', JSON.stringify(insertResult.error))
        return NextResponse.json({
          success: false,
          error: `文章保存失败: ${insertResult.error.message}`,
          pagePath: articlePath
        }, { status: 500 })
      }

      console.log('[Generate] 插入成功, inserted id:', insertResult.data?.[0]?.id)
    } else {
      console.log('[Generate] 更新成功, updated count:', updateResult.count)
    }

    console.log('文章记录保存成功')

    return NextResponse.json({
      success: true,
      keyword,
      articleId,
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
