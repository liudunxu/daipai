import { NextResponse } from 'next/server'
import { generateSEOArticle, extractMetadata } from '../../../../lib/seo/generator'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import { proxyFetch } from '../../../../lib/seo/proxy'

const TABLE_KEYWORDS = 'seo_keywords'
const TABLE_ARTICLES = 'seo_articles'

// 生成短 UUID（8位）
function generateShortId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

/**
 * 检查图片URL是否可访问
 * 先尝试直接访问，失败后尝试代理
 */
async function checkImageAccessible(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    })
    if (response.ok) return true
  } catch {
    // 直接访问失败，尝试代理
  }

  // 尝试代理访问
  try {
    const proxyResponse = await proxyFetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(8000)
    })
    return proxyResponse.ok
  } catch {
    return false
  }
}

/**
 * 获取可用的备用图片URL
 */
function getFallbackImageUrl(keyword, index) {
  // 使用 LoremPicsum，基于关键词生成稳定的随机图片
  const seed = encodeURIComponent(keyword.slice(0, 15) + index)
  return `https://picsum.photos/seed/${seed}/800/400`
}

/**
 * 验证并修复文章中的图片
 * 检查所有图片是否可访问，不可访问的替换为备用图片
 */
async function validateAndFixImages(content, keyword) {
  // 提取所有 markdown 图片格式 ![描述](URL)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  const images = []
  let match

  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      fullMatch: match[0],
      alt: match[1],
      url: match[2]
    })
  }

  if (images.length === 0) {
    console.log('[ImageFix] 文章中没有图片，无需修复')
    return content
  }

  console.log(`[ImageFix] 发现 ${images.length} 张图片，开始验证...`)

  let fixedContent = content
  let fixCount = 0

  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    const isAccessible = await checkImageAccessible(img.url)

    if (!isAccessible) {
      console.log(`[ImageFix] 图片不可访问: ${img.url}`)
      const fallbackUrl = getFallbackImageUrl(keyword, i)
      const newImage = `![${img.alt}](${fallbackUrl})`
      fixedContent = fixedContent.replace(img.fullMatch, newImage)
      fixCount++
    }
  }

  console.log(`[ImageFix] 修复完成，共替换 ${fixCount} 张图片`)
  return fixedContent
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

    // 验证并修复文章中的图片
    const fixedContent = await validateAndFixImages(content, effectiveKeyword)

    // 提取元数据（使用修复后的内容）
    const metadata = await extractMetadata(fixedContent, effectiveKeyword, userContent)

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
        content: fixedContent,
        page_path: articlePath,
        generated_at: now,
        word_count: fixedContent.length,
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
