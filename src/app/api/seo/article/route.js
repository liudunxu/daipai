import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { marked } from 'marked'

const TABLE_ARTICLES = 'seo_articles'

// 配置 marked
marked.setOptions({
  gfm: true,
  breaks: true
})

// Markdown 转 HTML（带 Tailwind 样式）
function markdownToHtml(md) {
  if (!md) return ''

  // 用 marked 解析 markdown
  let html = marked.parse(md)

  // 给 img 标签添加响应式 Tailwind 类
  html = html.replace(/<img([^>]*)>/gi, (match, attrs) => {
    if (attrs.includes('class=')) return match
    return `<img class="rounded-xl w-full max-w-2xl mx-auto my-8 shadow-lg" loading="lazy"${attrs}>`
  })

  // 清理不必要的属性，保留基本结构
  html = html
    .replace(/\s*data-[\w-]+=["'][^"']*["']/gi, '')
    .replace(/\s*class="[^"]*"/gi, (m) => {
      // 保留 img 的 class
      return m
    })
    .replace(/<p>\s*<\/p>/gi, '')

  return html
}

// GET 获取文章内容（公开接口，不需要认证）
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword')
    const articleId = searchParams.get('id')

    if (!keyword && !articleId) {
      return NextResponse.json({ error: '关键词或文章ID不能都为空' }, { status: 400 })
    }

    // 在外部定义 decodedKeyword，确保在所有路径上可用
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : null
    let data, error

    // 优先通过 article_id 查询（新版路径）
    if (articleId) {
      const result = await supabase
        .from(TABLE_ARTICLES)
        .select('*')
        .eq('article_id', articleId)
        .single()
      data = result.data
      error = result.error
    }

    // 如果没找到，通过 keyword 查询（兼容旧版路径）
    if (!data && keyword) {
      const result = await supabase
        .from(TABLE_ARTICLES)
        .select('*')
        .eq('keyword', decodedKeyword)
        .single()
      data = result.data
      error = result.error
    }

    if (error && error.code !== 'PGRST116') {
      console.error('获取文章失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    if (data) {
      return NextResponse.json({
        success: true,
        keyword: data.keyword,
        content: markdownToHtml(data.content),
        title: data.title,
        description: data.description,
        generatedAt: data.generated_at,
        pagePath: data.page_path
      })
    }

    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json({ success: false, error: '获取失败' }, { status: 500 })
  }
}
