import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'

const SEO_KEYWORDS_KEY = 'seo:keywords:plan'
const SEO_ARTICLES_KEY = 'seo:articles:generated'

// GET 获取关键词列表
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)
    let list = keywords.map(k => {
      try {
        return JSON.parse(k)
      } catch {
        return null
      }
    }).filter(Boolean)

    // 按状态筛选
    if (status) {
      list = list.filter(k => k.status === status)
    }

    // 按日期排序（今天的优先）
    const today = new Date().toISOString().split('T')[0]
    list.sort((a, b) => {
      if (a.scheduledDate === today && b.scheduledDate !== today) return -1
      if (b.scheduledDate === today && a.scheduledDate !== today) return 1
      return 0
    })

    return NextResponse.json({
      success: true,
      data: list,
      total: list.length
    })
  } catch (error) {
    console.error('获取关键词失败:', error)
    return NextResponse.json({ success: false, error: '获取失败' }, { status: 500 })
  }
}

// POST 添加/更新关键词
export async function POST(request) {
  try {
    const { keyword, category, scheduledDate, status } = await request.json()

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]

    const newKeyword = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      keyword,
      category: category || '未分类',
      status: status || 'pending', // pending | today | done
      scheduledDate: scheduledDate || today,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // 如果设置为today，检查是否已有其他today的关键词
    if (status === 'today') {
      const allKeywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)
      for (const k of allKeywords) {
        try {
          const parsed = JSON.parse(k)
          if (parsed.status === 'today') {
            parsed.status = 'done'
            parsed.updatedAt = new Date().toISOString()
            await redis.lrem(SEO_KEYWORDS_KEY, 0, k)
            await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(parsed))
          }
        } catch {}
      }
    }

    await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(newKeyword))

    return NextResponse.json({ success: true, data: newKeyword })
  } catch (error) {
    console.error('添加关键词失败:', error)
    return NextResponse.json({ success: false, error: '添加失败' }, { status: 500 })
  }
}

// PUT 更新关键词状态
export async function PUT(request) {
  try {
    const { id, status } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID不能为空' }, { status: 400 })
    }

    const keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)

    for (let i = 0; i < keywords.length; i++) {
      try {
        const parsed = JSON.parse(keywords[i])
        if (parsed.id === id) {
          parsed.status = status || parsed.status
          parsed.updatedAt = new Date().toISOString()
          await redis.lrem(SEO_KEYWORDS_KEY, i, keywords[i])
          await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(parsed))
          return NextResponse.json({ success: true, data: parsed })
        }
      } catch {}
    }

    return NextResponse.json({ error: '关键词不存在' }, { status: 404 })
  } catch (error) {
    console.error('更新关键词失败:', error)
    return NextResponse.json({ success: false, error: '更新失败' }, { status: 500 })
  }
}

// DELETE 删除关键词
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID不能为空' }, { status: 400 })
    }

    const keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)

    for (let i = 0; i < keywords.length; i++) {
      try {
        const parsed = JSON.parse(keywords[i])
        if (parsed.id === id) {
          await redis.lrem(SEO_KEYWORDS_KEY, i, keywords[i])
          return NextResponse.json({ success: true })
        }
      } catch {}
    }

    return NextResponse.json({ error: '关键词不存在' }, { status: 404 })
  } catch (error) {
    console.error('删除关键词失败:', error)
    return NextResponse.json({ success: false, error: '删除失败' }, { status: 500 })
  }
}
