import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import fs from 'fs/promises'
import path from 'path'

const TABLE_ARTICLES = 'seo_articles'

// 验证token
async function authCheck(request) {
  const result = await verifyRequest(request)
  if (!result.valid) {
    return { error: result.error, response: NextResponse.json({ error: result.error }, { status: 401 }) }
  }
  return { user: result.payload }
}

// GET 获取文章内容
export async function GET(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword')

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    const decodedKeyword = decodeURIComponent(keyword)

    // 从Supabase获取文章
    const { data, error } = await supabase
      .from(TABLE_ARTICLES)
      .select('*')
      .eq('keyword', decodedKeyword)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('获取文章失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // 如果Supabase没有，尝试读取文件
    if (!data) {
      const safeKeyword = encodeURIComponent(decodedKeyword)
      const pagePath = path.join(process.cwd(), 'src/app/seo', safeKeyword, 'page.js')

      try {
        const content = await fs.readFile(pagePath, 'utf-8')
        const contentMatch = content.match(/const content = `([\s\S]*?)`;/)
        if (contentMatch) {
          return NextResponse.json({
            success: true,
            keyword: decodedKeyword,
            content: contentMatch[1],
            pagePath: `/seo/${safeKeyword}`
          })
        }
      } catch {}
    }

    if (data) {
      return NextResponse.json({
        success: true,
        keyword: data.keyword,
        content: data.content,
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
