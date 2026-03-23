import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import fs from 'fs/promises'
import path from 'path'

const TABLE_ARTICLES = 'seo_articles'

// Markdown 转 HTML
function markdownToHtml(md) {
  if (!md) return ''

  // 先处理图片，转换为响应式样式
  md = md.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-xl w-full max-w-2xl mx-auto my-8 shadow-lg" loading="lazy" />'
  )

  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-10 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mb-8">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-yellow-400 font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="text-white/80 mb-2 ml-4">$1</li>')
    .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-4">$1</ul>')
    .replace(/\n\n/g, '</p><p class="text-white/80 mb-4 leading-relaxed">')
    .replace(/^(?!<[puhl])/gm, '<p class="text-white/80 mb-4 leading-relaxed">')
    .replace(/<p class="text-white\/80 mb-4 leading-relaxed"><\/p>/g, '')
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

    // 如果Supabase没有，尝试读取文件（仅本地开发模式）
    if (!data && decodedKeyword) {
      const safeKeyword = encodeURIComponent(decodedKeyword)
      const pagePath = path.join(process.cwd(), 'src/app/seo', safeKeyword, 'page.js')

      try {
        const fileContent = await fs.readFile(pagePath, 'utf-8')
        const contentMatch = fileContent.match(/const content = `([\s\S]*?)`;/)
        if (contentMatch) {
          return NextResponse.json({
            success: true,
            keyword: decodedKeyword,
            content: markdownToHtml(contentMatch[1]),
            pagePath: `/article/${safeKeyword}`
          })
        }
      } catch {}
    }

    if (data) {
      return NextResponse.json({
        success: true,
        keyword: data.keyword,
        content: markdownToHtml(data.content),
        title: data.title,
        pagePath: data.page_path
      })
    }

    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json({ success: false, error: '获取失败' }, { status: 500 })
  }
}
