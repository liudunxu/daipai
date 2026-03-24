import { NextResponse } from 'next/server'
import { generateSEOArticle, extractMetadata } from '../../../../lib/seo/generator'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'

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
    const { keyword, content: userContent } = await request.json()

    if (!keyword && !userContent) {
      return NextResponse.json({ error: '关键词或内容不能都为空' }, { status: 400 })
    }

    // 如果有用户输入的内容，从内容中提取一个简短关键词用于文件名和竞品分析
    let effectiveKeyword = keyword
    if (!effectiveKeyword && userContent) {
      // 从内容中提取前50个字符作为临时关键词
      effectiveKeyword = userContent.slice(0, 50).replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ' ').trim() || '主题文章'
    }

    console.log(`开始生成文章: ${effectiveKeyword}`)

    // 生成文章（直接生成，不做竞品分析）
    console.log(`生成文章中: ${effectiveKeyword}`)
    const content = await generateSEOArticle(effectiveKeyword, userContent)

    // 提取元数据
    const metadata = await extractMetadata(content, effectiveKeyword, userContent)

    // 4. 生成页面路径（使用 UUID 而不是 keyword）
    const articleId = generateShortId()
    const articlePath = `/article/${articleId}`

    // 5. 更新关键词状态为done（如果有匹配的关键词）
    const now = new Date().toISOString()

    if (keyword) {
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
    }

    // 6. 使用 UPSERT 保存文章记录（基于 article_id，冲突时更新）
    console.log('[Generate] 使用 UPSERT 保存文章记录')
    console.log('[Generate] articleId:', articleId)

    const { error: upsertError } = await supabase
      .from(TABLE_ARTICLES)
      .upsert({
        keyword: effectiveKeyword,
        title: metadata.title,
        description: metadata.description,
        content: content,
        page_path: articlePath,
        generated_at: now,
        word_count: content.length,
        article_id: articleId
      }, {
        onConflict: 'keyword'
      })

    if (upsertError) {
      console.error('[Generate] UPSERT 失败:', upsertError)
      return NextResponse.json({
        success: false,
        error: `文章保存失败: ${upsertError.message}`,
        pagePath: articlePath
      }, { status: 500 })
    }

    console.log('[Generate] UPSERT 成功')

    console.log('文章记录保存成功')

    return NextResponse.json({
      success: true,
      keyword: effectiveKeyword,
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
