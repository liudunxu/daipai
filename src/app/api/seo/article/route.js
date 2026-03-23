import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'
import { verifyRequest } from '../../../../lib/seo/auth'
import fs from 'fs/promises'
import path from 'path'

const SEO_ARTICLES_KEY = 'seo:articles:generated'

// 验证token
function authCheck(request) {
  const result = verifyRequest(request)
  if (!result.valid) {
    return { error: result.error, response: NextResponse.json({ error: result.error }, { status: 401 }) }
  }
  return { user: result.payload }
}

// GET 获取文章内容
export async function GET(request) {
  const auth = authCheck(request)
  if (auth.error) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword')

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    const decodedKeyword = decodeURIComponent(keyword)

    // 1. 先从Redis获取文章记录
    const articles = await redis.lrange(SEO_ARTICLES_KEY, 0, -1)
    let articleRecord = null

    for (const a of articles) {
      try {
        const parsed = JSON.parse(a)
        if (parsed.keyword === decodedKeyword) {
          articleRecord = parsed
          break
        }
      } catch {}
    }

    // 2. 尝试读取文件
    const pagePath = path.join(process.cwd(), 'src/app/seo', keyword, 'page.js')

    try {
      const content = await fs.readFile(pagePath, 'utf-8')

      // 提取content变量中的文章内容
      const contentMatch = content.match(/const content = `([\s\S]*?)`;/)
      if (contentMatch) {
        return NextResponse.json({
          success: true,
          keyword: decodedKeyword,
          content: contentMatch[1],
          pagePath: articleRecord?.pagePath
        })
      }
    } catch {}

    if (articleRecord) {
      return NextResponse.json({
        success: true,
        keyword: decodedKeyword,
        content: articleRecord.content || '文章内容加载中...',
        pagePath: articleRecord.pagePath
      })
    }

    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}
